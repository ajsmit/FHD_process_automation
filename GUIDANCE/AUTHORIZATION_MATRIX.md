# Authorization Matrix

Version: 2026-03-10
Status: Policy-complete specification; implementation partially deployed (transition + key non-transition workflow endpoints) — broader coverage tracked as AD-004
Scope: All authenticated workflow actors in the PG Workflow Platform

## Boundaries
- This file is authoritative for role definitions, module access rights, data scoping rules, and security requirements.
- Policy doctrine and lifecycle gates are owned by [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md).
- Endpoint/table inventory is owned by [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md).
- Implementation gaps and timelines are tracked in [ARCHITECTURE_DEBT_REGISTER.md](./ARCHITECTURE_DEBT_REGISTER.md) (AD-004).

---

## 1. Role Definitions

Five login roles are defined for the platform. External academics (supervisors, examiners, arbiters) access the system via tokenized invite only and are not login roles.

### 1.1 `student`
The registered postgraduate student. Initiates and owns the primary workflow forms (ROTT, MOU, ITS, progress reports, progression requests). Can only see and act on their own cases.

Typical person: the PG student who submitted their student number to start SASI lookup.

### 1.2 `supervisor`
An internal UWC academic staff member holding a supervision role on a case. Covers:

- Primary supervisor
- Co-supervisor (co1 or co2)
- Administrative Supervisor (Nominal Role)

All three sub-types share the same login role. Their specific capacity on a given case (primary vs co vs admin-nominal) is captured in the ROTT form data and governs which transitions they may invoke on that case. Supervisors access only the cases where they are named in a supervision field.

Typical persons: named supervisors and co-supervisors listed in the ROTT.

### 1.3 `dept_hd_rep`
The Departmental Higher Degrees Representative — the staff member responsible for vetting postgraduate cases at the departmental level, routing completed cases to the faculty, and monitoring profile and notification compliance within their department. Sees all cases in their assigned department(s).

Typical person: the FHD departmental representative (e.g., "Adriaan" in the current seed data).

### 1.4 `dept_chairperson`
The Departmental Chairperson or Head of Department, responsible for signing off the ROTT after departmental review. Sees all cases in their assigned department(s).

Typical person: the departmental HoD or a delegated chairperson-sign authority.

### 1.5 `faculty_hd_rep`
The Faculty Higher Degrees Representative — responsible for the final faculty-level review and approval of cases forwarded from the department. Sees all cases across all departments.

Typical person: the faculty FHD representative (e.g., "Natalie Isaacs" in the current seed data).

### 1.6 `system_admin`
Platform administrator with full read/write access across all cases, users, and configuration. No specific departmental scope restriction.

### 1.7 External academics (tokenized, not a login role)
External supervisors, examiners, and arbiters who are not UWC staff access the platform exclusively via tokenized invite links (`/external-academic/:token`). They have no general login. Their scope is strictly bounded to the invite form for their assigned role on a specific case. See Section 7.

---

## 2. `users` Table Requirements

The current `users.role` enum (`student | supervisor | admin`) must be migrated to reflect the full role set. Additional fields are required for row-level scoping.

### Required schema
| field | type | purpose |
|---|---|---|
| `id` | int (PK) | internal identity |
| `sasi_id` | string (unique, nullable) | links `student` role to `sasi_students.student_number` |
| `staff_number` | string (unique, nullable) | links `supervisor` role to `uwc_staff_directory.staff_number` for case-assignment scoping |
| `first_name` | string | display |
| `last_name` | string | display |
| `email` | string (unique) | login identity and notification delivery |
| `password_hash` | string | hashed credential (bcrypt) |
| `role` | enum | `student \| supervisor \| dept_hd_rep \| dept_chairperson \| faculty_hd_rep \| system_admin` |
| `departments` | JSON array (nullable) | list of department names for `dept_hd_rep` and `dept_chairperson` scoping |
| `active` | boolean | whether the account may authenticate |
| `created_at`, `updated_at` | timestamps | audit |

> **Migration note**: this schema supersedes the initial `users` table. A migration is required to (a) expand the `role` enum, (b) add `staff_number`, `departments`, `password_hash`, and `active` columns. Tracked as AD-004.

---

## 3. Access Model Overview

- **Default deny**: all protected endpoints require a valid JWT Bearer token. Absence or invalidity returns `401 Unauthorized`.
- **Role check**: after authentication, every endpoint checks whether the actor's role appears in the allowed roles list. Failure returns `403 Forbidden`.
- **Assignment check** (where applicable): even within the correct role, the actor must be assigned to the specific case. A supervisor may not act on a case where they are not named. Failure returns `403 Forbidden`.
- **Stage check** (transitions only): the case must be in the expected state for the transition. Incorrect stage returns `409 Conflict`.
- **UI gates are informational only**: disabled buttons and hidden sections in the UI reflect state, but server-side authorization is always the authoritative gate.

---

## 4. Module Access Matrix

Legend:

- `—` No access
- `R` Read-only
- `RE` Read + edit own sections (draft stage)
- `RES` Read + edit + submit
- `RA` Read + trigger transition/approval action
- `REA` Read + edit own sections + trigger action
- `Full` Read + edit + submit + trigger all permitted actions
- `*` Scope limited (own record, own case, or own dept — see Section 5)

### 4.1 Implemented modules

| module | student | supervisor | dept_hd_rep | dept_chairperson | faculty_hd_rep | system_admin |
|---|---|---|---|---|---|---|
| TITLE_REGISTRATION (ROTT) — edit | RES* | R* | R* | R* | R* | Full |
| TITLE_REGISTRATION — review transitions | RA* (student-vet step) | RA* (supervisor-review) | RA* (dept-review, dept-send-faculty) | RA* (chairperson-sign) | RA* (faculty-review) | Full |
| SUPERVISOR_PROFILES — view | R* (status only, not form content) | REA* (own profile) | R* | R* | R* | Full |
| SUPERVISOR_PROFILES — request/remind | — | — | RA* | — | RA | Full |
| MOU — edit | RE* (student sections + student signature) | RE* (supervisor sections + supervisor signature) | RE* (dept witness signature only) | RE* (chairperson signature only) | R* | Full |
| MOU — complete | RA* (all signatures confirmed) | — | — | — | — | Full |

### 4.2 Next-wave and progression modules (implemented baseline for current Phase-B + change-request modules)

| module | student | supervisor | dept_hd_rep | dept_chairperson | faculty_hd_rep | system_admin |
|---|---|---|---|---|---|---|
| INTENTION_TO_SUBMIT | RES* | RA* (approve/decline) | RA* (final dept approval) | R* | R* | Full |
| APPOINT_EXAMINERS | R* | RES* (primary supervisor submits) | RA* (dept review) | RA* (sign) | RA* (final approval) | Full |
| CHANGE_EXAMINERS | R* | RES* | RA* | RA* | RA* | Full |
| APPOINT_ARBITER | R* | RES* | RA* | RA* | RA* | Full |
| EXAMINER_SUMMARY_CV | R* | RE* (provides evidence) | RA* | R* | RA* | Full |
| CHANGE_TITLE | RES* | RA* | RA* | RA* | RA* | Full |
| CHANGE_SUPERVISOR | RES* | RA* | RA* | RA* | RA* | Full |
| ADD_CO_SUPERVISOR | RES* | RA* | RA* | RA* | RA* | Full |
| PROGRESS_REPORT | RES* | RE* (supervisory section) + RA* | R* | R* | R* | Full |
| LEAVE_OF_ABSENCE | RES* | RA* | RA* | RA* | RA* | Full |
| READMISSION_REQUEST | RES* | RA* | RA* | RA* | RA* | Full |
| UPGRADE_MSC_TO_PHD | RES* | RA* | RA* | RA* | RA* | Full |
| SUPERVISOR_SUMMATIVE_REPORT | R* | RES* (supervisor fills + submits) | RA* | RA* (sign) | RA* | Full |
| OTHER_REQUEST | RES* | RA* | RA* | RA* | RA* | Full |

### 4.3 Operational views

| view | student | supervisor | dept_hd_rep | dept_chairperson | faculty_hd_rep | system_admin |
|---|---|---|---|---|---|---|
| Pipeline (case list) | Own cases | Assigned cases | Dept cases | Dept cases | All cases | All cases |
| To Do feed | Own pending actions | Own assigned pending | Dept pending | Dept pending | All pending | All |
| Notifications | Own case notifications | Assigned case notifications | Dept case notifications | Dept | All | All |
| People / Directory | — | Read (internal dir lookup) | Read | Read | Read | Full |

---

## 5. Data Scoping Rules (Row-Level Security)

Row-level scoping is enforced **server-side in the service layer**, not solely at the middleware level. The following rules determine which `title_registration_cases` rows an actor may read or act on.

| role | scoping rule |
|---|---|
| `student` | `sasi_students.student_number = users.sasi_id` — own student record and associated cases only |
| `supervisor` | `title_registration_cases.form_data_json` contains actor's `staff_number` or registered `email` in any supervision field (`Supervisor`, `Administrative Supervisor (Nominal Role)`, `Co-supervisor`, `Second Co-supervisor`, or corresponding external fields) |
| `dept_hd_rep` | `sasi_students.department` is in actor's `users.departments[]` list |
| `dept_chairperson` | Same scope as `dept_hd_rep` |
| `faculty_hd_rep` | All cases (no department restriction) |
| `system_admin` | All cases |

Additional scoping for sub-entities:

- **Supervisor profiles**: supervisor may only read/edit the `supervisor_profile_forms` row linked to their own identity (matched by `staff_number` or email against the profile's `person_name` / case form data).
- **Notifications**: actors see only notifications targeted at their role/case scope.
- **External invites**: actors see invite records only for cases within their scope.

---

## 6. Workflow Transition Authorization Map

All transition endpoints additionally require:

1. JWT authentication (returns `401` if absent/invalid).
2. Role is in the allowed list below (returns `403` if not).
3. Actor is assigned to the case (returns `403` if not scoped).
4. Case is in the correct state for the transition (returns `409` if not).

| endpoint | action | allowed roles |
|---|---|---|
| `POST /cases/:id/student-vet` | Submit ROTT for supervisor review | `student` |
| `POST /cases/:id/supervisor-review` | Supervisor review decision (approve/return) | `supervisor` (primary; co-supervisor if policy designates joint review) |
| `POST /cases/:id/dept-review` | Departmental FHD vet (approve/return) | `dept_hd_rep` |
| `POST /cases/:id/chairperson-sign` | Chairperson sign-off | `dept_chairperson` |
| `POST /cases/:id/dept-send-faculty` | Route case to Faculty FHD | `dept_hd_rep` |
| `POST /cases/:id/faculty-review` | Faculty FHD review (approve/return) | `faculty_hd_rep` |
| `POST /cases/:id/reminder` | Trigger overdue reminder | `dept_hd_rep`, `faculty_hd_rep`, `system_admin` |
| `POST /supervisor-profiles/:id/submit` | Submit supervisor profile | profile owner (`supervisor`) |
| `POST /cases/:id/mou/complete` | Mark MOU complete (all signatures confirmed) | `student` (initiates; system validates all signature flags) |

---

## 7. Module Operation Endpoint Authorization

Read/edit endpoints require authentication and role + scoping checks but no state gate.

| endpoint | action | allowed roles |
|---|---|---|
| `GET /cases/:id` | Read case | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/form` | Save ROTT edits | `student*` (draft/in-progress stages only) |
| `POST /cases/:id/print` | Generate ROTT PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/supervisor-profiles` | Read profiles | all roles (scoped per role) |
| `POST /cases/:id/supervisor-profiles/request` | Request profile completion | `student*`, `dept_hd_rep*`, `system_admin` |
| `POST /cases/:id/supervisor-profiles/reminder` | Send profile reminder | `dept_hd_rep*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /supervisor-profiles/:id` | Edit profile | profile owner (`supervisor*`) |
| `POST /supervisor-profiles/:id/upload-cv` | Upload CV | profile owner (`supervisor*`) |
| `GET /cases/:id/mou` | Read MOU | all roles (scoped per role) |
| `PATCH /cases/:id/mou` | Save MOU draft | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*` |
| `POST /cases/:id/mou/print` | Generate MOU PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/intention-to-submit` | Read ITS module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/intention-to-submit` | Save ITS draft | `student*` |
| `POST /cases/:id/intention-to-submit/submit` | Submit ITS | `student*` |
| `POST /cases/:id/intention-to-submit/supervisor-review` | Supervisor review ITS | `supervisor*` |
| `POST /cases/:id/intention-to-submit/dept-review` | Department review ITS | `dept_hd_rep*` |
| `POST /cases/:id/intention-to-submit/print` | Generate ITS PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/appoint-examiners` | Read appoint examiners module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/appoint-examiners` | Save appoint examiners draft | `supervisor*` |
| `POST /cases/:id/appoint-examiners/submit` | Submit appoint examiners | `supervisor*` |
| `POST /cases/:id/appoint-examiners/dept-review` | Department review appoint examiners | `dept_hd_rep*` |
| `POST /cases/:id/appoint-examiners/chairperson-review` | Chair review appoint examiners | `dept_chairperson*` |
| `POST /cases/:id/appoint-examiners/faculty-review` | Faculty review appoint examiners | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/appoint-examiners/print` | Generate appoint examiners PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/change-examiners` | Read change examiners module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/change-examiners` | Save change examiners draft | `supervisor*` |
| `POST /cases/:id/change-examiners/submit` | Submit change examiners | `supervisor*` |
| `POST /cases/:id/change-examiners/dept-review` | Department review change examiners | `dept_hd_rep*` |
| `POST /cases/:id/change-examiners/chairperson-review` | Chair review change examiners | `dept_chairperson*` |
| `POST /cases/:id/change-examiners/faculty-review` | Faculty review change examiners | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/change-examiners/print` | Generate change examiners PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/examiner-summary-cv` | Read examiner summary CV module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/examiner-summary-cv` | Save examiner summary CV draft | `supervisor*` |
| `POST /cases/:id/examiner-summary-cv/submit` | Submit examiner summary CV | `supervisor*` |
| `POST /cases/:id/examiner-summary-cv/dept-review` | Department review summary CV | `dept_hd_rep*` |
| `POST /cases/:id/examiner-summary-cv/faculty-review` | Faculty review summary CV | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/examiner-summary-cv/print` | Generate examiner summary CV PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/appoint-arbiter` | Read appoint arbiter module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/appoint-arbiter` | Save appoint arbiter draft | `supervisor*` |
| `POST /cases/:id/appoint-arbiter/submit` | Submit appoint arbiter | `supervisor*` |
| `POST /cases/:id/appoint-arbiter/dept-review` | Department review appoint arbiter | `dept_hd_rep*` |
| `POST /cases/:id/appoint-arbiter/faculty-review` | Faculty review appoint arbiter | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/appoint-arbiter/print` | Generate appoint arbiter PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/change-title` | Read change title module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/change-title` | Save change title draft | `student*` |
| `POST /cases/:id/change-title/submit` | Submit change title | `student*` |
| `POST /cases/:id/change-title/supervisor-review` | Supervisor review change title | `supervisor*` |
| `POST /cases/:id/change-title/dept-review` | Department review change title | `dept_hd_rep*` |
| `POST /cases/:id/change-title/chairperson-review` | Chair review change title | `dept_chairperson*` |
| `POST /cases/:id/change-title/faculty-review` | Faculty review change title | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/change-title/print` | Generate change title PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/change-supervisor` | Read change supervisor module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/change-supervisor` | Save change supervisor draft | `student*` |
| `POST /cases/:id/change-supervisor/submit` | Submit change supervisor | `student*` |
| `POST /cases/:id/change-supervisor/supervisor-review` | Supervisor review change supervisor | `supervisor*` |
| `POST /cases/:id/change-supervisor/dept-review` | Department review change supervisor | `dept_hd_rep*` |
| `POST /cases/:id/change-supervisor/chairperson-review` | Chair review change supervisor | `dept_chairperson*` |
| `POST /cases/:id/change-supervisor/faculty-review` | Faculty review change supervisor | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/change-supervisor/print` | Generate change supervisor PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/add-co-supervisor` | Read add co-supervisor module | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `PATCH /cases/:id/add-co-supervisor` | Save add co-supervisor draft | `student*` |
| `POST /cases/:id/add-co-supervisor/submit` | Submit add co-supervisor | `student*` |
| `POST /cases/:id/add-co-supervisor/supervisor-review` | Supervisor review add co-supervisor | `supervisor*` |
| `POST /cases/:id/add-co-supervisor/dept-review` | Department review add co-supervisor | `dept_hd_rep*` |
| `POST /cases/:id/add-co-supervisor/chairperson-review` | Chair review add co-supervisor | `dept_chairperson*` |
| `POST /cases/:id/add-co-supervisor/faculty-review` | Faculty review add co-supervisor | `faculty_hd_rep`, `system_admin` |
| `POST /cases/:id/add-co-supervisor/print` | Generate add co-supervisor PDF | `student*`, `supervisor*`, `dept_hd_rep*`, `dept_chairperson*`, `faculty_hd_rep`, `system_admin` |
| `GET /cases/:id/external-invites` | Read invite statuses | `student*`, `supervisor*`, `dept_hd_rep*`, `system_admin` |
| `POST /directory/external-academics/invite` | Create external invite | `student*`, `dept_hd_rep*`, `system_admin` |
| `GET /pipeline` | Read case pipeline | all roles (scoped per role) |
| `GET /to-do` | Read To Do feed | all roles (scoped per role) |
| `GET /notifications` | Read notifications | all roles (scoped per role) |
| `GET /directory/staff` | Read internal staff directory | `supervisor`, `dept_hd_rep`, `dept_chairperson`, `faculty_hd_rep`, `system_admin` |
| `GET /directory/external-academics` | Read external registry | `supervisor*`, `dept_hd_rep`, `faculty_hd_rep`, `system_admin` |

`*` = also subject to row-level scoping from Section 5.

---

## 8. External / Tokenized Access

External academics (supervisors, examiners, arbiters) never hold a platform login. Their access is:

| endpoint | access model | security rules |
|---|---|---|
| `GET /directory/external-academics/invites/:token` | Token-validated public endpoint | Token must be `pending`, not expired. Returns salutation context only — no full case data. |
| `POST /directory/external-academics/invites/:token/complete` | Token-validated public write | Token must be `pending`, not expired. Write scope is bounded to updating the specific `external_academic_registry` record and syncing the linked case role fields only. Token status is set to `completed` on success (single-use). |

Token security requirements:

- Tokens are cryptographically random and sufficiently long (minimum 32 bytes, URL-safe encoded).
- Tokens must be stored as hashes (or at minimum not in plaintext) in production.
- Tokens expire according to `external_academic_profile_invites.expires_at`.
- Expired tokens return `410 Gone`.
- Completed tokens return `409 Conflict` if resubmitted.
- The invite endpoint must not expose case-level data (thesis content, student details) beyond the minimum required salutation context.

---

## 9. Security Requirements

### 9.1 Transport and session
1. HTTPS required for all endpoints in production (`NODE_ENV=production`). HTTP connections must be redirected.
2. JWT access tokens: short-lived (15–60 minute TTL).
3. JWT refresh tokens: httpOnly Secure cookie, 7-day TTL, rotated on use.
4. Token revocation: maintain a short-lived blocklist (Redis or equivalent) for logout/revocation until natural expiry; or use sufficiently short TTL with no persistent sessions.
5. `/auth/dev-login` endpoint is gated by `ENABLE_DEV_AUTH=true` (local only). Must be disabled (`false`) in production. Any request to this endpoint in production must return `404 Not Found`.

### 9.2 Transport hardening
1. CORS: restrict `Access-Control-Allow-Origin` to the known client origin. No wildcard (`*`) in production.
2. Secure cookie flags: `Secure`, `HttpOnly`, `SameSite=Strict` for all auth cookies.
3. Set `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy` headers.

### 9.3 Credential and input security
1. Passwords hashed with bcrypt (minimum cost factor 12).
2. No credentials, tokens, or secrets in query strings or response bodies beyond the initial auth handshake.
3. All user-supplied input validated and sanitised server-side before persistence (no raw string interpolation into SQL).
4. Rate limiting on `/auth/*` endpoints to prevent brute force (e.g., max 10 attempts per 15 min per IP).

### 9.4 Audit and observability
1. Every workflow transition records: `actor_id`, `actor_role`, `case_id`, `from_state`, `to_state`, `timestamp`, `comments`. This feeds into the existing notification/audit infrastructure.
2. Unauthorized access attempts (`401`, `403`) are logged with actor identity (if available), endpoint, and timestamp.
3. External invite completion events record: `invite_id`, `token_hash`, `submitted_at`, `registry_id_created_or_updated`.

### 9.5 Principle of least privilege
1. Default deny: no endpoint is accessible without an explicit allow rule in the authorization layer.
2. Supervisors cannot read cases outside their named assignments, regardless of department.
3. Dept-scoped roles cannot read cases outside their assigned department(s).
4. Profile owners cannot edit other supervisors' profiles, even within the same case.
5. External invite tokens are scoped to a single invite, role, and case — they cannot be used to access any other resource.

---

## 10. Implementation Status and Gaps

| item | status | tracking |
|---|---|---|
| JWT Bearer auth on transition endpoints | Deployed | — |
| Actor-to-case assignment checks on transition endpoints | Deployed | — |
| `ENABLE_DEV_AUTH` flag for dev identity issuance | Deployed | — |
| `users` table role enum expansion (5 roles + admin) | **Deployed** (DB migration + legacy-admin backfill + token/middleware/service support) | AD-004 |
| `users.staff_number` + `users.departments` fields | **Deployed (baseline)** (schema + backfill migration + seed alignment in place; production governance lifecycle still pending) | AD-004 |
| JWT auth middleware on non-transition endpoints | **Partial** (workflow case/profile/feed endpoints protected; internal directory/SASI/legacy title-registration routes now also protected) | AD-004 |
| Row-level scoping enforcement in service layer | **Partial** (case/profile scoped workflow middleware deployed for protected workflow endpoints) | AD-004 |
| Password hash storage + login endpoint | **Deployed** (`POST /api/v1/auth/login`, seeded demo password hash) | AD-004 |
| Production identity provider integration (replace dev login) | **Partial** (`AUTH_PROVIDER=trusted_header` + `/auth/provider-login` adapter seam + trusted source IP enforcement implemented; enterprise IdP/proxy rollout and ops hardening pending) | AD-004 |
| Refresh token rotation + revocation | **Deployed** (`/auth/refresh`, `/auth/logout`, `/auth/logout-all`) | AD-004 |
| Audit logging for unauthorized attempts | **Deployed** (`auth_audit_events` + auth/authorization middleware/controller events) | AD-004 |
| External invite token hardening (hash storage, single-use) | **Deployed (baseline)** (hash-validated token lookup + encrypted token at rest + single-use completion state) | AD-004 |
| CORS production lock-down | **Partial** (environment allowlist `CORS_ALLOWED_ORIGINS` enforced; production policy hardening still required) | AD-004 |
| Rate limiting on auth endpoints | **Deployed (baseline)** (`/auth/dev-login`, `/auth/login`, `/auth/refresh` rate-limited via `AUTH_RATE_LIMIT_WINDOW_MS` + `AUTH_RATE_LIMIT_MAX_REQUESTS`) | AD-004 |

All items above are required before production deployment. The current dev-login flow (`/auth/dev-login`) must not reach production.
