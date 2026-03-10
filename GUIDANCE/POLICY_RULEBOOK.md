# POLICY_RULEBOOK

Version: 2026-03-09
Status: Draft-v1.1 (Instructional baseline aligned to implemented ROTT/supervision/MOU flows)
Scope: Postgraduate workflow modules derived from `ridiculous_forms/`

## Boundaries
- This file is authoritative for policy doctrine, lifecycle gates, and cross-module dependency rules.
- Field-by-field canonical mappings are owned by [POLICY_FIELD_MAP.md](./POLICY_FIELD_MAP.md).
- Technical implementation inventory is owned by [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md).
- Delivery sequencing is owned by [PROJECT_IMPLEMENTATION_PLAN.md](./PROJECT_IMPLEMENTATION_PLAN.md).
- Role-to-endpoint enforcement baseline is owned by [AUTHORIZATION_MATRIX.md](./AUTHORIZATION_MATRIX.md).

## 1. Purpose
This rulebook defines the policy contract for implementing all form modules in the web workflow system.

It is designed to be:
- machine-actionable for AI implementation,
- reviewable/refinable by policy owners,
- explicit about cross-form dependencies and data percolation.

## 2. Core Policy Doctrine
1. Authoritative source hierarchy:
- SASI authoritative for student identity/registration baseline.
- Workflow platform authoritative for case state, approvals, validations, generated artifacts.
- Generated forms/PDFs are outputs of canonical stored data.

2. Compliance priority:
- Policy compliance and auditability override convenience.
- Every write/transition must be traceable.

3. Single-capture propagation:
- Data captured once in early modules must flow to later modules.
- Later modules must reference canonical fields, not duplicate free text where avoidable.

4. Controlled mutability:
- Read-only fields cannot be edited in downstream modules if upstream authority exists.
- Derived fields are system-maintained.

## 3. Standard Module Policy Schema (Use For Every Form)
Each module MUST define these sections:

### 3.1 Source-Of-Truth Matrix
For every field:
- `authority`: `SASI | WORKFLOW | DERIVED | EXTERNAL_DOC`
- `editability`: `read_only | editable_at_stage | always_editable`
- `canonical_key`: shared internal field name
- `label`: official template label

### 3.2 Lifecycle Gates
- `prefill_gate`: prerequisites to instantiate module information content
- `save_gate`: validations for draft persistence
- `submit_gate`: validations for role handoff
- `route_gate`: validations for next-actor routing
- `close_gate`: validations for final completion/approval

### 3.3 Validation Layers
- `shape`: format (date, email, numeric bounds)
- `semantic`: policy meaning (eligibility, counts, required declarations)
- `cross_entity`: consistency against related modules/entities
- `stage_specific`: stricter checks at submit/approval stages

### 3.4 Role + State Machine
Each module must declare:
- legal states,
- permitted transitions,
- role permissions per transition,
- return/rework loops.

### 3.5 Side Effects
On save/submit/approve define:
- dependent profile creation/sync,
- notification events,
- module status updates,
- document generation updates,
- audit events.

### 3.6 Dependency Contract
For each module:
- `reads_from`: upstream modules/entities
- `writes_to`: canonical entities/derived outputs
- `blocks`: downstream modules that cannot start until this module state is achieved

## 4. Global Case Types Registry (From `ridiculous_forms`)
1. `TITLE_REGISTRATION` -> `Title Registration 2026.docx`
2. `MOU` -> `MOU 2026.docx`
3. `PROSPECTIVE_SUPERVISOR_PROFILE` -> `PROSPECTIVE SUPERVISOR PROFILE (ROTT) 2026.docx`
4. `ADD_CO_SUPERVISOR` -> `ADDITION OF CO SUPERVISOR REQUEST 2026.docx`
5. `CHANGE_SUPERVISOR` -> `Request for Change of Supervisor- Co-Supervisor 2026.docx`
6. `CHANGE_TITLE` -> `Request for Change of Thesis Title  2026.docx`
7. `APPOINT_EXAMINERS` -> `Appointment of Examiners 2026.docx`
8. `CHANGE_EXAMINERS` -> `Change of Examiners 2026.docx`
9. `APPOINT_ARBITER` -> `Appointment of Arbiter 2026.docx`
10. `EXAMINER_SUMMARY_CV` -> `Examiners Summary CV 2026.docx`
11. `INTENTION_TO_SUBMIT` -> `Intention to Submit 2026.docx`
12. `PROGRESS_REPORT` -> `Progress Report Template - 2025 - Natural Sciences.docx`
13. `LEAVE_OF_ABSENCE` -> `Leave of Absence 2026.docx`
14. `READMISSION_REQUEST` -> `REQUEST FOR READMISSION 2026.docx`
15. `UPGRADE_MSC_TO_PHD` -> `Request to upgrade from Masters to Doctoral 2026.docx`
16. `SUPERVISOR_SUMMATIVE_REPORT` -> `SUPERVISOR SUMMATIVE REPORT TEMPLATE 2026.docx`
17. `OTHER_REQUEST` -> `OTHER REQUESTS 2026.docx`

## 5. Foundational First-Wave Modules (Already Driving Downstream Data)

### 5.1 TITLE_REGISTRATION (ROTT)
Policy role: foundational master information for thesis registration and supervision setup.

Reads from:
- SASI student identity/registration baseline from `sasi_students`
- UWC internal staff directory from `uwc_staff_directory`
- external academic registry (shared for supervisors, examiners, and arbiters) from `external_academic_registry`

Writes canonical:
- student-thesis definition into `title_registration_cases.form_data_json`
- supervisor/co-supervisor/admin-supervisor assignments into `title_registration_cases.form_data_json`
- ethics/proposal conditions into `title_registration_cases.form_data_json`
- case workflow state into `title_registration_cases.case_status`
- module status snapshots into `module_entries`
- generated print artifact path into `title_registration_cases.pdf_path`
- `Has the MOU been submitted?` state flag (updated when MOU completes) in `title_registration_cases.form_data_json`

Blocks/Unblocks:
- Must be completed in full and saved (completion = 100%) before MOU can start.
- Activates supervisor profile series (main, admin, co-supervisor) in `supervisor_profile_forms`.

### 5.2 PROSPECTIVE_SUPERVISOR_PROFILE
Policy role: capability/compliance evidence for each active supervision role.

Reads from:
- canonical supervision assignments from ROTT (`title_registration_cases.form_data_json`)
- internal person context from `uwc_staff_directory`
- external person context from `external_academic_registry`
- UWC-external members are first searched via ROTT-linked registry lookup; if not found, profile information is sourced from invite completion flow via `external_academic_profile_invites` -> `external_academic_registry`

Writes canonical:
- role-profile records per case/role into `supervisor_profile_forms`
- CV/publication compliance status into `supervisor_profile_forms`
- profile module summary/status into `module_entries` (`module_name = supervisor_profiles`)

Blocks/Unblocks:
- All active profiles must be completed before MOU workflow progression and departmental forwarding gates.

### 5.3 MOU
Policy role: formal agreement payload prefilled from ROTT + completed profiles.

Reads from:
- ROTT canonical student/thesis/supervision data from `title_registration_cases.form_data_json`
- student registration context from `sasi_students`
- supervision profile data from `supervisor_profile_forms`

Writes canonical:
- draft/complete MOU payload into `mou_forms.form_data_json`
- agreement completion/signature states into `mou_forms` (`status`, `completion_percent`, `submitted_at`)
- updates ROTT `Has the MOU been submitted? = Yes` on completion in `title_registration_cases.form_data_json`
- MOU module summary/status into `module_entries` (`module_name = mou`)
- generated MOU artifact path into `mou_forms.pdf_path`

Blocks/Unblocks:
- can open once ROTT is completed in full and saved
- supervisor profile completeness remains a progression/compliance requirement for later approval gates
- completion contributes to readiness for later milestone modules

### 5.4 Implemented Data Origination Pipelines (DB-Linked)
1. ROTT prefill pipeline:
- read `sasi_students` by student number,
- create/update case in `title_registration_cases`,
- maintain module state in `module_entries`.

2. Supervision role resolution pipeline:
- internal role selection resolves against `uwc_staff_directory`,
- external role selection resolves against `external_academic_registry`,
- if missing externally: create invite in `external_academic_profile_invites`, queue/send notification via `notification_queue`, complete profile to upsert `external_academic_registry`, then sync role fields back into `title_registration_cases.form_data_json`.

3. Supervisor profile activation pipeline:
- derive active role set from `title_registration_cases.form_data_json`,
- upsert active role rows in `supervisor_profile_forms`,
- set inactive superseded rows in `supervisor_profile_forms`,
- synchronize module status in `module_entries`.

4. MOU draft pipeline:
- compose prefill from `title_registration_cases.form_data_json` + `supervisor_profile_forms`,
- persist to `mou_forms`,
- on completion, update `title_registration_cases.form_data_json` (`Has the MOU been submitted? = Yes`) and module summary in `module_entries`.

## 6. Cross-Module Data Percolation Policy

### 6.1 Foundational Registry Policy (Authoritative Directories)
1. `sasi_students` remains authoritative for student identity/registration baseline fields.
2. `uwc_staff_directory` is the authoritative internal-person directory for:
- supervision eligibility,
- examiner/arbiter eligibility,
- role-capacity and availability constraints.
3. `external_academic_registry` is the authoritative external-person directory for:
- external supervisors,
- external examiners,
- arbiters.
4. Any role assignment in downstream forms must resolve to one of these directory entities (or create/update a registry record first, with audit trail).

### 6.1.1 `uwc_staff_directory` required field set
Identity and contact:
- `staff_number`, `staff_title`, `first_name`, `last_name`, `staff_name`, `email`, `phone`.
Institution and role:
- `faculty_name`, `department_name`, `position_title`, `employee_type`, `faculty_role`, `office_location`, `campus`.
Academic credentials:
- `highest_qualification`, `orcid`, `google_scholar_url`, `scopus_id`, `research_specialisations`, `is_nrf_rated`, `nrf_rating`.
Eligibility and authorization:
- `available_as_supervisor`, `available_as_co_supervisor`, `available_as_examiner`, `available_as_arbiter`, `can_serve_as_chair`, `can_sign_hod_delegate`.
Capacity and status:
- `max_supervision_load`, `current_supervision_load`, `max_examiner_load`, `current_examiner_load`, `availability_notes`, `active_status`, `is_internal`.

### 6.1.2 `external_academic_registry` required field set
Identity and naming:
- `title`, `first_name`, `middle_names`, `preferred_name`, `last_name`, `full_name`, `normalized_full_name`.
- unique identity key: `unique_identifier_type` (`SA_ID | PASSPORT | OTHER`) + `unique_identifier_value` + `normalized_unique_identifier` (unique across registry).
Contact and location:
- `email`, `alternate_email`, `preferred_contact_method`, `phone`, `address`, `city`, `province_state`, `postal_code`, `country`.
Institution and profile:
- `affiliation_institution`, `affiliation_department`, `affiliation_position_title`, `highest_qualification`, `orcid`, `website_url`, `google_scholar_url`, `scopus_id`, `expertise_keywords`.
Eligibility and policy flags:
- `eligible_as_supervisor`, `eligible_as_examiner`, `eligible_as_arbiter`, `eligible_for_masters`, `eligible_for_phd`, `is_international`, `is_former_uwc_staff`, `is_former_uwc_student`.
Workload and compliance:
- `cv_last_received_on`, `cv_file_path`, `last_appointed_supervisor_on`, `last_appointed_examiner_on`, `last_appointed_arbiter_on`, `max_active_assignments`, `current_active_assignments`, `conflict_of_interest_notes`, `active_status`, `notes`.

### 6.2 Canonical Data Domains
1. `student_identity`: title, names, student number, degree, registration status
2. `research_baseline`: thesis title, keywords, abstract, ethics, proposal, first registration period
3. `supervision_roster`: primary/co/admin supervisors, internal/external classification, qualifications, contacts
4. `supervision_compliance`: profile completion, publication/CV readiness
5. `agreement_status`: MOU completion and signature confirmations
6. `examination_plan`: examiners/arbiter appointments and changes
7. `study_progress`: intention-to-submit, progress reports, leave/readmission, summative outcomes

### 6.3 Percolation Rules
1. Downstream forms MUST consume canonical domains above; avoid recapture.
2. If downstream form requires correction to upstream canonical data:
- either route through dedicated change module (e.g., `CHANGE_TITLE`, `CHANGE_SUPERVISOR`), or
- enforce explicit override with reason + approval trail.
3. PDF generation always reads latest persisted canonical payload.
4. External-person capture rule:
- ROTT must first attempt lookup in `external_academic_registry` by surname/email/identifier.
- If no record is found, ROTT must capture the email and trigger external profile invite workflow.
- Invite completion must update `external_academic_registry` and synchronize any linked open case form fields automatically.
5. External-person minimal-capture rule in ROTT (when not found in registry):
- requester captures only `title`, `first name`, `surname`, `email`,
- requester sends profile link directly from role card,
- external person completes full profile via invite form,
- role-level invite status (`pending|completed|expired` + delivery state) must be persisted and visible after reload/re-login.

## 7. Dependency Graph (Instructional)

Legend:
- `A -> B` means B depends on A as prerequisite or primary data source.
- `A => fieldset` means A contributes canonical fieldset into downstream module prefill.

1. `TITLE_REGISTRATION -> PROSPECTIVE_SUPERVISOR_PROFILE`
- `TITLE_REGISTRATION => supervision_roster, research_baseline`

2. `TITLE_REGISTRATION + PROSPECTIVE_SUPERVISOR_PROFILE -> MOU`
- prefill from student/research/supervision + profile qualifications/compliance

3. `TITLE_REGISTRATION + MOU -> INTENTION_TO_SUBMIT`
- inherits student + thesis + supervision + MOU confirmation baseline

4. `TITLE_REGISTRATION -> CHANGE_TITLE`
- current approved thesis title as baseline for proposed change

5. `TITLE_REGISTRATION -> CHANGE_SUPERVISOR`
- current approved supervision roster baseline

6. `TITLE_REGISTRATION -> ADD_CO_SUPERVISOR`
- current roster baseline; emits updated roster on approval

7. `INTENTION_TO_SUBMIT + TITLE_REGISTRATION -> APPOINT_EXAMINERS`
- candidate readiness + thesis/supervision baseline

8. `APPOINT_EXAMINERS -> CHANGE_EXAMINERS`
- current examiner set baseline

9. `APPOINT_EXAMINERS/CHANGE_EXAMINERS -> APPOINT_ARBITER`
- arbitration context tied to examiner process

10. `APPOINT_EXAMINERS + CHANGE_EXAMINERS -> EXAMINER_SUMMARY_CV`
- examiner roster drives summary CV compilation

11. `TITLE_REGISTRATION + PROGRESS_REPORT -> LEAVE_OF_ABSENCE`
- progress context informs leave decisioning

12. `LEAVE_OF_ABSENCE -> READMISSION_REQUEST`
- readmission linked to prior approved leave/interruption context

13. `TITLE_REGISTRATION (MSc) + PROGRESS_REPORT -> UPGRADE_MSC_TO_PHD`
- upgrade requires existing MSc baseline and progress evidence

14. `PROGRESS_REPORT + INTENTION_TO_SUBMIT + examination outcomes -> SUPERVISOR_SUMMATIVE_REPORT`
- terminal supervisory assessment uses full trajectory

15. `ANY MODULE -> OTHER_REQUEST`
- catch-all module references active case context and prior module states

16. `ANY PENDING FLOW -> TO_DO`
- all pending/in-progress workflow actions must be surfaced in the To Do module feed for operational follow-up.

## 8. Module-by-Module Instructional Specs (Initial)

Note: Field-level mapping for each template should be refined by parsing each `.docx` into canonical keys. This section defines policy skeleton and expected dependencies now.

### 8.1 ADD_CO_SUPERVISOR
- Prefill from current supervision roster.
- Must include justification, proposed role contribution, supervisor/chair approvals.
- On approval: update canonical `supervision_roster` and activate profile for new co-supervisor.

### 8.2 CHANGE_SUPERVISOR
- Prefill current supervisor/co-supervisor/admin set.
- Must capture reason, continuity plan, student impact, replacement profile readiness requirements.
- On approval: supersede prior assignment, preserve history, reactivate profile checks.

### 8.3 CHANGE_TITLE
- Prefill current approved title and registration context.
- Must capture rationale, scope drift impact, ethics impact, supervisor/chair approvals.
- On approval: update canonical thesis title and propagate to all downstream modules/documents.

### 8.4 INTENTION_TO_SUBMIT
- Prefill student/thesis/supervision baseline + MOU flag.
- Validate minimum readiness evidence and timeline feasibility.
- Gates examiner appointment readiness.

### 8.5 APPOINT_EXAMINERS
- Prefill candidate and thesis context from canonical baseline.
- Validate examiner count/role composition, conflict declarations, external/internal policy.
- On approval: lock examiner plan version for this submission cycle.

### 8.6 CHANGE_EXAMINERS
- Prefill current approved examiner plan.
- Must capture replacement reason and conflict/compliance revalidation.
- On approval: supersede examiner plan version, keep full history.

### 8.7 APPOINT_ARBITER
- Prefill from current examination context.
- Enforce arbiter eligibility/conflict criteria.

### 8.8 EXAMINER_SUMMARY_CV
- Prefill examiner list from current active plan.
- Aggregate required CV/summary evidence for all examiners.
- Must remain consistent with latest examiner plan version.

### 8.9 PROGRESS_REPORT
- Prefill identity/thesis/supervision baseline.
- Capture period-specific progress, outputs, risks, and supervisory feedback.
- Feeds leave/readmission/upgrade/summative decisions.

### 8.10 LEAVE_OF_ABSENCE
- Prefill student/candidature/progress status.
- Validate leave reason, timing, approvals, and funding/scholarship impacts.
- On approval: update candidature status windows.

### 8.11 READMISSION_REQUEST
- Prefill prior registration + leave/interruption context.
- Validate eligibility window, motivation, supervisory support, department recommendation.

### 8.12 UPGRADE_MSC_TO_PHD
- Prefill MSc registration and current project/thesis baseline.
- Validate upgrade criteria, proposal quality, supervisory capacity, committee approvals.
- On approval: update degree-level canonical state and downstream requirements.

### 8.13 SUPERVISOR_SUMMATIVE_REPORT
- Prefill full candidature trajectory (progress reports, supervision history, examination milestones).
- Validate completeness and sign-off chain for closure/final recommendation.

### 8.14 OTHER_REQUEST
- Generic policy envelope with strict mandatory metadata:
  - request category,
  - reason,
  - impacted canonical domains,
  - proposed action,
  - required approvers by category.
- Must never bypass normal approval/audit standards.

## 9. Shared State Machine Contract (Default)
Base states (module can specialize):
1. `DRAFT`
2. `PREFILLED`
3. `IN_PROGRESS`
4. `VALIDATION_FAILED`
5. `READY_FOR_SUBMISSION`
6. `PENDING_ROLE_APPROVAL` (role-specific)
7. `RETURNED_FOR_CORRECTION`
8. `APPROVED`
9. `CLOSED`

Return loops are mandatory for quality-control resilience.

## 10. Audit + Notification Contract
1. Every write emits structured audit event with actor, role, entity, diff metadata.
2. Every transition emits status event and role-targeted notification.
3. Reminders are policy-timed for overdue pending role actions.
4. Generated PDFs/doc packs are versioned artifacts with checksum and timestamp.

## 10.1 Authentication/Authorization Policy Requirement
1. All role-scoped workflow transitions must be server-authorized against authenticated actor identity and role.
2. Client-visible state labels are informational only and cannot substitute for server-side authorization checks.
3. No module transition endpoint may remain unauthenticated in production mode.
4. Current implementation status:
- first-slice transition route authorization is implemented via JWT Bearer auth + actor-to-case authorization checks.
- broader endpoint-surface coverage and production identity integration remain tracked as architecture debt (`AD-004`).
- required role-action mapping baseline is maintained in [AUTHORIZATION_MATRIX.md](./AUTHORIZATION_MATRIX.md).

## 11. Implementation Rules For AI (Strict)
1. Never write directly to generated PDFs as source of truth.
2. Never allow edits to fields marked `authority = SASI` except through sync pipeline.
3. Always run `save_gate` before persistence and `submit_gate` before transitions.
4. Always sync dependent modules/entities after canonical updates.
5. If a field label changes, update API, UI, persistence, validation, and document mapping together.
6. Avoid introducing aliases for canonical keys unless explicitly versioned.

## 12. Backlog For Human Refinement
1. Template-by-template field extraction/mapping from each `.docx` into canonical keys.
2. Final role-by-role sign-off matrix for each case type.
3. Faculty/Senate-specific gating differences per module.
4. Module-specific SLA/reminder rules.
5. Exact legal signature requirements (digital vs confirmation flags).

## 13. Immediate Design Guidance For Remaining Module Build-Out
1. Next-wave module baseline is now implemented in dependency order:
- `INTENTION_TO_SUBMIT`
- `APPOINT_EXAMINERS`
- `CHANGE_EXAMINERS`
- `EXAMINER_SUMMARY_CV`
- `APPOINT_ARBITER`
- implemented scope is canonical table + prefill + save/submit + prerequisite gates.
- next step is full role-specific approval/routing state machines per module.

2. For each new module, build in this order:
- canonical payload schema,
- prefill adapters from upstream modules,
- validation gates,
- transition endpoints,
- UI with explicit read-only vs editable sections,
- PDF mapping from canonical payload.

3. Treat dependency breakage as defects:
- if upstream change does not percolate into downstream prefill/generation, block release.

## 14. Deployment Portability Policy (Local vs Production)
1. All integrations must be environment-configurable; no hard-coded localhost assumptions in production code paths.
2. SASI access must support:
- `local` provider (development/testing),
- `api` provider (remote production integration).
3. Database access must support:
- local SQLite for developer workflow,
- remote managed SQL (e.g., MySQL) for server deployment.
4. Demo seed/bootstrap behavior must be switchable by environment flags and disabled in production by default.
5. Generated artifacts, prefill logic, and module transitions must remain identical across environments.

## 15. Phase-2 UI Architecture Alignment (Implemented)
1. `TITLE_REGISTRATION` UI must be modularized into dedicated components under `client/app/title-registration/components/`:
- `TitleRegistrationModule` (module shell and section rendering),
- `ExternalRegistryLookup` (shared external-person lookup control),
- role-card inline `Send Profile Link` actions (current invite trigger path).
2. Behavior parity is mandatory during refactor:
- no policy gate or validation behavior may change without explicit rulebook update,
- save, prefill, route, and PDF-generation behavior must remain consistent with canonical persistence rules.
3. External registry behavior must remain role-scoped and deterministic:
- lookup shown only when selected role is external,
- lookup must resolve by canonical registry identity,
- invite flow must remain available from role card when no match exists.
4. Future module refactors must follow the same standard:
- extract repeated UI blocks into reusable components,
- keep canonical keys unchanged,
- run regression checks on save/prefill/PDF outputs before release.

## 16. Role-Symmetric Card Policy (Mandatory)
1. Where multiple cards represent the same policy shape for different roles, implementation must use a single reusable role-card pattern.
2. For ROTT supervision roles, the following must be treated as one logical pattern:
- primary supervisor,
- administrative supervisor (nominal),
- co-supervisor 1,
- co-supervisor 2.
3. Allowed per-role variance is configuration-only:
- labels/headings,
- canonical field prefixes (`supervision.primary.*`, `supervision.admin.*`, `supervision.co1.*`, `supervision.co2.*`),
- eligibility/validation deltas,
- downstream propagation targets.
4. Prohibited variance:
- copy-pasted business logic per role card,
- divergent validation behavior for structurally identical fields without explicit policy rule,
- manual downstream mapping outside canonical config.
5. This policy applies to later modules with repeated role structures (examiners, arbiters, multi-role approvals, signatory blocks).
