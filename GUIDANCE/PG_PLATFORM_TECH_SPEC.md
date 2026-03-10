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
- JWT authentication is now also applied on internal non-workflow route families:
  - directory reads + invite creation (`/api/v1/directory/departments`, `/staff`, `/external-academics`, `/external-supervisors`, `/external-academics/invite`)
  - SASI search endpoint (`/api/v1/sasi/students/search`)
  - legacy title-registration CRUD routes (`/api/v1/title-registrations/*`)
- JWT + workflow authorization middleware now also covers module operation endpoints (read/edit/submit/review/print) for:
  - `INTENTION_TO_SUBMIT`
  - `APPOINT_EXAMINERS`
  - `CHANGE_EXAMINERS`
  - `EXAMINER_SUMMARY_CV`
  - `APPOINT_ARBITER`
  - `CHANGE_TITLE`
  - `CHANGE_SUPERVISOR`
  - `ADD_CO_SUPERVISOR`
- Current production-hardening gap:
  - authorization middleware coverage is substantially expanded across workflow routes; residual gaps are primarily around identity-provider/session hardening and cross-route consistency checks,
  - users-role model now supports authorization-matrix roles in DB/token/middleware paths, but production provisioning/governance for role assignment remains incomplete,
  - dev identity issuance currently uses `/api/v1/auth/dev-login` for local workflow simulation.
  - rate limiting and CORS controls are now environment-driven but still require production policy alignment and operational hardening.

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
- `change_title_forms` (draft/submitted change-title payload)
- `change_supervisor_forms` (draft/submitted change-supervisor payload)
- `add_co_supervisor_forms` (draft/submitted add-co-supervisor payload)
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

Role-state progression (implemented):

- `ITS`: `draft -> awaiting_supervisor_review -> awaiting_dept_review -> approved` with return loops.
- `APPOINT_EXAMINERS`: `draft -> awaiting_dept_review -> awaiting_chairperson_review -> awaiting_faculty_review -> approved` with return loops.
- `CHANGE_EXAMINERS`: same chain as `APPOINT_EXAMINERS`.
- `EXAMINER_SUMMARY_CV`: `draft -> awaiting_dept_review -> awaiting_faculty_review -> approved` with return loops.
- `APPOINT_ARBITER`: `draft -> awaiting_dept_review -> awaiting_faculty_review -> approved` with return loops.

Writes:

- each module table stores `form_data_json`, `completion_percent`, `status`, `submitted_at`.
- `module_entries` status summaries are upserted per module key:
  - `intention_to_submit`
  - `appoint_examiners`
  - `change_examiners`
  - `examiner_summary_cv`
  - `appoint_arbiter`

### 3.6 Change-request modules (baseline)
Read origins:

- `title_registration_cases.form_data_json`

Tables:

- `change_title_forms`
- `change_supervisor_forms`
- `add_co_supervisor_forms`

Role-state progression (implemented):

- all three modules follow:
  - `draft -> awaiting_supervisor_review -> awaiting_dept_review -> awaiting_chairperson_review -> awaiting_faculty_review -> approved`
  - with return loops:
    - `returned_by_supervisor`
    - `returned_by_dept`
    - `returned_by_chairperson`
    - `returned_by_faculty`

Writes:

- each module table stores `form_data_json`, `completion_percent`, `status`, `submitted_at`, `pdf_path`.
- `module_entries` status summaries are upserted per module key:
  - `change_title`
  - `change_supervisor`
  - `add_co_supervisor`
- final-approval writebacks to canonical ROTT payload:
  - `CHANGE_TITLE` updates `title_registration_cases.form_data_json['Thesis title']`.
  - `CHANGE_SUPERVISOR` updates role-targeted supervision roster fields in `title_registration_cases.form_data_json`.
  - `ADD_CO_SUPERVISOR` updates co-supervisor slot fields in `title_registration_cases.form_data_json`.
- submit gate validation is module-specific:
  - proposed-vs-current title delta checks for `CHANGE_TITLE`.
  - role/replacement/continuity checks for `CHANGE_SUPERVISOR`.
  - duplicate co-supervisor prevention for `ADD_CO_SUPERVISOR`.

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
- `POST /api/v1/title-registration/cases/:caseId/intention-to-submit/supervisor-review`
- `POST /api/v1/title-registration/cases/:caseId/intention-to-submit/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/intention-to-submit/print`
- `GET /api/v1/title-registration/cases/:caseId/appoint-examiners`
- `PATCH /api/v1/title-registration/cases/:caseId/appoint-examiners`
- `POST /api/v1/title-registration/cases/:caseId/appoint-examiners/submit`
- `POST /api/v1/title-registration/cases/:caseId/appoint-examiners/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/appoint-examiners/chairperson-review`
- `POST /api/v1/title-registration/cases/:caseId/appoint-examiners/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/appoint-examiners/print`
- `GET /api/v1/title-registration/cases/:caseId/change-examiners`
- `PATCH /api/v1/title-registration/cases/:caseId/change-examiners`
- `POST /api/v1/title-registration/cases/:caseId/change-examiners/submit`
- `POST /api/v1/title-registration/cases/:caseId/change-examiners/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/change-examiners/chairperson-review`
- `POST /api/v1/title-registration/cases/:caseId/change-examiners/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/change-examiners/print`
- `GET /api/v1/title-registration/cases/:caseId/examiner-summary-cv`
- `PATCH /api/v1/title-registration/cases/:caseId/examiner-summary-cv`
- `POST /api/v1/title-registration/cases/:caseId/examiner-summary-cv/submit`
- `POST /api/v1/title-registration/cases/:caseId/examiner-summary-cv/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/examiner-summary-cv/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/examiner-summary-cv/print`
- `GET /api/v1/title-registration/cases/:caseId/appoint-arbiter`
- `PATCH /api/v1/title-registration/cases/:caseId/appoint-arbiter`
- `POST /api/v1/title-registration/cases/:caseId/appoint-arbiter/submit`
- `POST /api/v1/title-registration/cases/:caseId/appoint-arbiter/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/appoint-arbiter/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/appoint-arbiter/print`
- `GET /api/v1/title-registration/cases/:caseId/change-title`
- `PATCH /api/v1/title-registration/cases/:caseId/change-title`
- `POST /api/v1/title-registration/cases/:caseId/change-title/submit`
- `POST /api/v1/title-registration/cases/:caseId/change-title/supervisor-review`
- `POST /api/v1/title-registration/cases/:caseId/change-title/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/change-title/chairperson-review`
- `POST /api/v1/title-registration/cases/:caseId/change-title/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/change-title/print`
- `GET /api/v1/title-registration/cases/:caseId/change-supervisor`
- `PATCH /api/v1/title-registration/cases/:caseId/change-supervisor`
- `POST /api/v1/title-registration/cases/:caseId/change-supervisor/submit`
- `POST /api/v1/title-registration/cases/:caseId/change-supervisor/supervisor-review`
- `POST /api/v1/title-registration/cases/:caseId/change-supervisor/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/change-supervisor/chairperson-review`
- `POST /api/v1/title-registration/cases/:caseId/change-supervisor/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/change-supervisor/print`
- `GET /api/v1/title-registration/cases/:caseId/add-co-supervisor`
- `PATCH /api/v1/title-registration/cases/:caseId/add-co-supervisor`
- `POST /api/v1/title-registration/cases/:caseId/add-co-supervisor/submit`
- `POST /api/v1/title-registration/cases/:caseId/add-co-supervisor/supervisor-review`
- `POST /api/v1/title-registration/cases/:caseId/add-co-supervisor/dept-review`
- `POST /api/v1/title-registration/cases/:caseId/add-co-supervisor/chairperson-review`
- `POST /api/v1/title-registration/cases/:caseId/add-co-supervisor/faculty-review`
- `POST /api/v1/title-registration/cases/:caseId/add-co-supervisor/print`
- `GET /api/v1/title-registration/cases/:caseId/external-invites`
- `GET /api/v1/title-registration/to-do`
- `GET /api/v1/title-registration/people`
- `GET /api/v1/title-registration/notifications`

### 5.2 Directories + external onboarding
- `GET /api/v1/directory/departments` (requires Bearer token)
- `GET /api/v1/directory/staff` (requires Bearer token)
- `GET /api/v1/directory/external-academics` (requires Bearer token)
- `GET /api/v1/directory/external-supervisors` (compatibility alias, requires Bearer token)
- `POST /api/v1/directory/external-academics/invite` (requires Bearer token)
- `GET /api/v1/directory/external-academics/invites/:token`
- `POST /api/v1/directory/external-academics/invites/:token/complete`

### 5.3 Auth
- `POST /api/v1/auth/dev-login` (development identity simulation; when `ENABLE_DEV_AUTH=false`, route returns `404 Not Found`)
- `POST /api/v1/auth/login` (local password mode; `AUTH_PROVIDER=local_password`)
- `POST /api/v1/auth/provider-login` (trusted-header provider mode; `AUTH_PROVIDER=trusted_header`)
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/logout-all`
- `GET /api/v1/auth/me` (requires Bearer token)
- auth endpoint protection:
  - `/auth/dev-login`, `/auth/login`, and `/auth/provider-login` are rate-limited (window/max via `AUTH_RATE_LIMIT_WINDOW_MS` and `AUTH_RATE_LIMIT_MAX_REQUESTS`).

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
  - `CORS_ALLOWED_ORIGINS`
  - `DB_CLIENT`, `DATABASE_URL`/`SQLITE_FILE`
  - `SASI_PROVIDER`, `SASI_API_ENDPOINT`, `SASI_API_KEY`
  - `AUTH_RATE_LIMIT_WINDOW_MS`, `AUTH_RATE_LIMIT_MAX_REQUESTS`
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

## 8.1 Repository Artifact Hygiene Contract (AD-011)
- Generated/runtime artifacts are not allowed in git history for active branches:
  - `client/.next/**`
  - `client/.next_backup*/**`
  - `server/dist/**`
  - `server/dev.sqlite3`
- Enforcement mechanisms:
  - root `.gitignore` includes explicit rules for all paths above.
  - CI workflow `.github/workflows/main.yml` executes `scripts/check-generated-artifacts.sh` on `push` and `pull_request`.
- check failure is release-blocking until generated/runtime files are removed from the git index.

## 8.2 Guidance Artifact Governance (AD-015)
- `GUIDANCE/*.md` files are the only authoritative guidance sources.
- `GUIDANCE/*.html` and `GUIDANCE/*_files/**` are generated export artifacts:
  - allowed for local/offline reading only,
  - excluded from git tracking via `.gitignore`,
  - blocked by CI guard if tracked.

## 8.3 Database Migration Run Order Contract (AD-013)
- Canonical schema evolution must be executed through Knex migrations in `server/src/db/migrations/*`.
- `server/src/db/initDb.ts` is orchestration-only:
  - executes `db.migrate.latest(...)`,
  - delegates optional idempotent demo/CSV seeding to `seedDemoData`.
- Local/CI/server startup run order:
  1. Configure DB env (`DB_CLIENT` + `SQLITE_FILE` or `DATABASE_URL`).
  2. Run migrations: `npm run db:migrate --workspace=server`.
  3. Start server (with `AUTO_INIT_DB=true` only when startup bootstrap should also apply migrations).
  4. Enable demo seed flow only when explicitly required (`ENABLE_DEMO_DATA=true`).
- Operational rule:
  - never add new canonical table/column evolution directly in `initDb.ts`; add a versioned migration instead.

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
- Next-wave role-chain enforcement:
  - role-scoped approval state machines are implemented for current Phase-B and change-request modules.
  - edge-case assertion depth is now implemented across module review chains (wrong-state rejection, return/resubmit loops, module-entry status/summary assertions).
- Add broader regression coverage for save/prefill/PDF parity across role variants and approval outcomes.
