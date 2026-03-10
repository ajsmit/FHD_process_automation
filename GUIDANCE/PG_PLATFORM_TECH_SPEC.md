# PG Workflow Platform Technical Specification

Version: 2026-03-10  
Status: Implemented-baseline + next-phase guidance  
Scope: Current production code paths for ROTT, supervisor profiles, external onboarding, MOU, next-wave examination modules, and operational modules

## Boundaries
- This file is authoritative for implemented technical architecture and integration contracts.
- Policy semantics/gates are owned by [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md).
- Field-level mapping semantics are owned by [POLICY_FIELD_MAP.md](./POLICY_FIELD_MAP.md).
- UI system contracts are owned by [UI_DESIGN_GOALS.md](./UI_DESIGN_GOALS.md).
- Role authorization baseline is owned by [AUTHORIZATION_MATRIX.md](./AUTHORIZATION_MATRIX.md).

## 1. Runtime Stack
- Client: `Next.js 16` + `React 19` + `Tailwind CSS` + custom UI wrappers + `Framer Motion` + `lucide-react`
- Server: `Node.js` + `Express` + `Knex`
- Databases:
  - local: `sqlite3` (`DB_CLIENT=sqlite3`, `SQLITE_FILE=...`)
  - server: `mysql2` (`DB_CLIENT=mysql2` or `DATABASE_URL`)
- Integration mode:
  - SASI local table mode: `SASI_PROVIDER=local`
  - SASI API mode: `SASI_PROVIDER=api`

## 1.1 Authentication And Authorization Status (Current)
- `users` table exists in DB bootstrap/migrations.
- `JWT_SECRET` and `JWT_EXPIRES_IN` env vars exist in config templates.
- JWT Bearer authentication middleware is now applied to workflow transition endpoints.
- Actor-to-case authorization middleware is now applied to workflow transition endpoints:
  - `student-vet`, `supervisor-review`, `dept-review`, `chairperson-sign`, `dept-send-faculty`, `faculty-review`, `reminder`.
- JWT + workflow authorization middleware are now also applied to key non-transition workflow endpoints:
  - case operations (`/cases/:caseId` read/edit/print, external-invite/status views, MOU operations),
  - supervisor profile operations (`patch/submit/upload-cv`),
  - workflow collection feeds (`pipeline`, `tasks`, `to-do`, `people`, `notifications`).
- Current production-hardening gap:
  - remaining non-transition endpoint coverage is not yet complete across all route families,
  - users-role model is still legacy (`student|supervisor|admin`) vs full authorization-matrix roles,
  - dev identity issuance currently uses `/api/v1/auth/dev-login` for local workflow simulation.

## 2. Implemented Authoritative Tables
### 2.1 Core workflow
- `title_registration_cases` (ROTT payload, case status, completion, print path)
- `module_entries` (module-level progress snapshots)
- `supervisor_profile_forms` (main/admin/co-supervisor profile compliance forms)
- `mou_forms` (draft/completed MOU payload and print path)
- `intention_to_submit_forms` (draft/submitted ITS payload)
- `appoint_examiners_forms` (draft/submitted examiner appointment payload)
- `change_examiners_forms` (draft/submitted examiner-change payload)
- `examiner_summary_cv_forms` (draft/submitted examiner-summary payload)
- `appoint_arbiter_forms` (draft/submitted arbiter appointment payload)
- `notification_queue` (queued/sent/failed notifications)

### 2.2 Source/Directory tables
- `sasi_students` (student baseline authority)
- `sasi_staff` (staff/reminder addressing support)
- `uwc_staff_directory` (internal person directory)
- `external_academic_registry` (external supervisors/examiners/arbiters)
- `external_academic_profile_invites` (tokenized invite lifecycle and completion linkages)

### 2.3 Legacy/Deprecated Tables (Present In Schema)
- `title_registrations` (legacy pre-canonical title registration path)
- `phase1_workflows` (legacy step-flag workflow path)
- `generated_documents` (legacy phase1 artifact tracking)

Status:
- Retained for compatibility with legacy phase1 architecture only.
- Not authoritative for canonical ROTT/MOU/profile module workflow state.
- Scheduled for removal after legacy endpoints and dependencies are fully retired.

## 3. Current Implemented Module Flow
### 3.1 ROTT (`TITLE_REGISTRATION`)
Read origins:
- `sasi_students` (student identity/registration)
- `uwc_staff_directory` (internal supervisor resolution)
- `external_academic_registry` (external person lookup)

Writes:
- `title_registration_cases.form_data_json`
- `title_registration_cases.completion_percent`
- `title_registration_cases.case_status`
- `title_registration_cases.pdf_path` (generated printable form)
- `module_entries` (status summaries)

### 3.2 External role onboarding (ROTT-linked)
Pipeline:
1. User searches external person from role card.
2. If not found, system creates invite in `external_academic_profile_invites`.
3. Notification is queued/sent via `notification_queue`.
4. External person completes `/external-academic/[token]`.
5. Upsert into `external_academic_registry`.
6. Linked ROTT role fields are synchronized back into `title_registration_cases.form_data_json`.

### 3.3 Prospective supervisor profile module
Read origins:
- `title_registration_cases.form_data_json`

Writes:
- `supervisor_profile_forms` (active/draft/requested/completed/inactive)
- `module_entries` (`module_name=supervisor_profiles`)

### 3.4 MOU module
Read origins:
- `title_registration_cases.form_data_json`
- `supervisor_profile_forms`
- `sasi_students` (for baseline prefill context)

Writes:
- `mou_forms.form_data_json`
- `mou_forms.status`, `mou_forms.completion_percent`, `mou_forms.submitted_at`
- `mou_forms.pdf_path`
- `title_registration_cases.form_data_json` (`Has the MOU been submitted? = Yes` on completion)
- `module_entries` (`module_name=mou`)

### 3.5 Next-wave examination chain modules (baseline)
Read origins:
- `title_registration_cases.form_data_json`
- upstream next-wave module form tables according to gate order.

Tables and gate order:
1. `intention_to_submit_forms` (requires MOU submitted flag from ROTT payload).
2. `appoint_examiners_forms` (requires ITS submitted).
3. `change_examiners_forms` (requires APPOINT_EXAMINERS submitted).
4. `examiner_summary_cv_forms` (requires APPOINT_EXAMINERS or CHANGE_EXAMINERS submitted).
5. `appoint_arbiter_forms` (requires APPOINT_EXAMINERS or CHANGE_EXAMINERS submitted).

Writes:
- each module table stores `form_data_json`, `completion_percent`, `status`, `submitted_at`.
- `module_entries` status summaries are upserted per module key:
  - `intention_to_submit`
  - `appoint_examiners`
  - `change_examiners`
  - `examiner_summary_cv`
  - `appoint_arbiter`

## 4. Gating Rules Implemented in Code
- MOU open gate: ROTT completion must be `100%` and saved.
- External role save gate in ROTT:
  - minimal requester capture: `Title`, `First Name`, `Surname`, `Email`
  - full external profile capture happens in invite form.
- Supervisor profile gate:
  - active profiles must be completed for downstream progression expectations.
- PDF generation reads latest persisted canonical payload from DB; no PDF-first writes.

## 5. API Surface (Implemented)
### 5.1 Title registration workflow
- `GET /api/v1/title-registration/sasi/:studentNumber/check`
- `GET /api/v1/title-registration/cases/:caseId`
- `PATCH /api/v1/title-registration/cases/:caseId/form`
- `POST /api/v1/title-registration/cases/:caseId/print`
- `POST /api/v1/title-registration/cases/:caseId/student-vet`
- `POST /api/v1/title-registration/cases/:caseId/supervisor-review`
- `POST /api/v1/title-registration/cases/:caseId/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/chairperson-sign`
- `POST /api/v1/title-registration/cases/:caseId/dept-send-faculty`
- `POST /api/v1/title-registration/cases/:caseId/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/reminder`
- `GET /api/v1/title-registration/pipeline`
- `GET /api/v1/title-registration/tasks`
- `GET /api/v1/title-registration/cases/:caseId/supervisor-profiles`
- `POST /api/v1/title-registration/cases/:caseId/supervisor-profiles/request`
- `POST /api/v1/title-registration/cases/:caseId/supervisor-profiles/reminder`
- `PATCH /api/v1/title-registration/supervisor-profiles/:profileId`
- `POST /api/v1/title-registration/supervisor-profiles/:profileId/submit`
- `POST /api/v1/title-registration/supervisor-profiles/:profileId/upload-cv`
- `GET /api/v1/title-registration/cases/:caseId/mou`
- `PATCH /api/v1/title-registration/cases/:caseId/mou`
- `POST /api/v1/title-registration/cases/:caseId/mou/complete`
- `POST /api/v1/title-registration/cases/:caseId/mou/print`
- `GET /api/v1/title-registration/cases/:caseId/intention-to-submit`
- `PATCH /api/v1/title-registration/cases/:caseId/intention-to-submit`
- `POST /api/v1/title-registration/cases/:caseId/intention-to-submit/submit`
- `GET /api/v1/title-registration/cases/:caseId/appoint-examiners`
- `PATCH /api/v1/title-registration/cases/:caseId/appoint-examiners`
- `POST /api/v1/title-registration/cases/:caseId/appoint-examiners/submit`
- `GET /api/v1/title-registration/cases/:caseId/change-examiners`
- `PATCH /api/v1/title-registration/cases/:caseId/change-examiners`
- `POST /api/v1/title-registration/cases/:caseId/change-examiners/submit`
- `GET /api/v1/title-registration/cases/:caseId/examiner-summary-cv`
- `PATCH /api/v1/title-registration/cases/:caseId/examiner-summary-cv`
- `POST /api/v1/title-registration/cases/:caseId/examiner-summary-cv/submit`
- `GET /api/v1/title-registration/cases/:caseId/appoint-arbiter`
- `PATCH /api/v1/title-registration/cases/:caseId/appoint-arbiter`
- `POST /api/v1/title-registration/cases/:caseId/appoint-arbiter/submit`
- `GET /api/v1/title-registration/cases/:caseId/external-invites`
- `GET /api/v1/title-registration/to-do`
- `GET /api/v1/title-registration/people`
- `GET /api/v1/title-registration/notifications`

### 5.2 Directories + external onboarding
- `GET /api/v1/directory/departments`
- `GET /api/v1/directory/staff`
- `GET /api/v1/directory/external-academics`
- `GET /api/v1/directory/external-supervisors` (compatibility alias)
- `POST /api/v1/directory/external-academics/invite`
- `GET /api/v1/directory/external-academics/invites/:token`
- `POST /api/v1/directory/external-academics/invites/:token/complete`

### 5.3 Auth
- `POST /api/v1/auth/dev-login` (development identity simulation; disabled when `ENABLE_DEV_AUTH=false`)
- `GET /api/v1/auth/me` (requires Bearer token)

### 5.4 Legacy APIs (Deprecated / Disabled By Default)
- `GET/POST /api/v1/title-registrations/*` (legacy plural route family)
- `POST /api/v1/phase1/*` (legacy phase1 workflow route family)

Control:
- runtime flag `ENABLE_LEGACY_PHASE1=false` (default) returns `410 Gone` for these legacy route families.
- set `ENABLE_LEGACY_PHASE1=true` only for migration/compatibility windows.

## 6. Service Architecture (Current)
- `server/src/services/titleRegistrationWorkflowService.ts` remains the main composition service for active ROTT/MOU/profile operations.
- Operations/feed domain is extracted and active in:
  - `server/src/services/operationsFeedService.ts` (pipeline, tasks, to-do, people, notifications, external invite status views)
- Workflow transition logic is extracted and active in:
  - `server/src/services/workflow/titleRegistrationTransitions.ts`
- Next-wave module workflow orchestration is extracted and active in:
  - `server/src/services/workflow/nextWaveModulesService.ts`
- PDF generation logic is extracted and active in:
  - `server/src/services/pdf-generation/titleRegistrationPdfService.ts`
  - `server/src/services/pdf-generation/mouPdfService.ts`
  - shared text helpers in `server/src/services/pdf-generation/pdfTextLayout.ts`

## 7. UI Architecture (Current)
- ROTT moved to modular component shell:
  - `TitleRegistrationModule`
  - role-scoped `ExternalRegistryLookup`
- External invite form uses section cards and deterministic grid:
  - responsive `1/6/12` layout
  - explicit required cues and icon-led section headers
- Same layout system now being extended across ROTT, supervisor profiles, and MOU.

## 8. Deployment Portability Contract
- Policy requires no hard dependency on localhost in production logic.
- Environment-driven startup:
  - `AUTO_INIT_DB`, `ENABLE_DEMO_DATA`
  - `DB_CLIENT`, `DATABASE_URL`/`SQLITE_FILE`
  - `SASI_PROVIDER`, `SASI_API_ENDPOINT`, `SASI_API_KEY`
- External profile links:
  - controlled by `EXTERNAL_PROFILE_BASE_URL`
- Email delivery:
  - `SMTP_*` for sent mode
  - graceful queue fallback when SMTP is not configured
- Client-side API/artifact URL resolution:
  - derives from `NEXT_PUBLIC_API_BASE` when configured,
  - otherwise resolves against current browser origin at runtime (no hard-coded localhost fallback).
- Environment template ownership:
  - root `.env.example` is authoritative for full workspace env contract,
  - `server/.env.example` and `client/.env.example` are synchronized projection templates.

## 9. Known Gaps / Next Build Targets
- Structural extraction follow-through:
  - AD-001 extraction is implemented for transition and PDF responsibilities.
  - remaining structural debt is tracked as:
    - AD-007 (service still multi-domain and large)
  - see [ARCHITECTURE_DEBT_REGISTER.md](./ARCHITECTURE_DEBT_REGISTER.md).
- Authentication/authorization enforcement gap:
  - transition endpoints now require JWT Bearer auth.
  - remaining gap: complete identity-to-assignment authorization coverage across broader non-transition actions and production login model hardening.
  - tracked as `AD-004` in [ARCHITECTURE_DEBT_REGISTER.md](./ARCHITECTURE_DEBT_REGISTER.md).
- Complete role-symmetric refactor of all repeated role card logic in ROTT (reduce remaining per-role branching in page wiring).
- Extend next-wave modules from draft/submitted baseline to full role-scoped approval state machines.
- Next-wave role-chain enforcement is pending:
  - current endpoints use student-owned save/submit baseline.
  - role-specific supervisor/dept/chair/faculty transitions for these modules are tracked as `AD-009`.
- Add broader regression coverage for save/prefill/PDF parity across role variants.
