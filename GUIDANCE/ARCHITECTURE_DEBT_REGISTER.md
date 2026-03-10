# Architecture Debt Register

Version: 2026-03-10
Status: Active
Purpose: Track structural debt that affects maintainability, refactor planning, and release risk.

## Debt Items
| id | debt | impact | priority | status | target |
|---|---|---|---|---|---|
| AD-001 | Monolithic `server/src/services/titleRegistrationWorkflowService.ts` previously contained orchestration + validation + PDF generation in one service. | High change risk, low cohesion, hard testability. | High | Closed | Extracted workflow transitions to `server/src/services/workflow/titleRegistrationTransitions.ts` and PDF composition to `server/src/services/pdf-generation/*`; monolith now delegates to extracted modules. |
| AD-002 | Residual hard-coded artifact host in client (`http://localhost:3001`) for PDF/CV links. | Environment portability risk. | High | Closed | Replaced localhost fallback with env/browser-origin resolution (`NEXT_PUBLIC_API_BASE` or runtime origin) for API and generated artifact links. |
| AD-003 | Workspace root `.env.example` and `server/.env.example` were not fully reconciled. | Configuration drift/confusion risk. | Medium | Closed | Formalized root `.env.example` as authoritative env contract, and aligned `server/.env.example` + `client/.env.example` as synchronized projection templates. |
| AD-004 | Authentication/authorization coverage is partial: JWT + actor-to-case checks are active for transition routes, and key non-transition workflow endpoints are now protected, but full endpoint coverage and production-grade identity model are still incomplete. | High policy/compliance risk outside transition path. | Critical | In Progress | Extend identity-bound authz coverage across remaining endpoint surface and finalize production identity model per `AUTHORIZATION_MATRIX.md`. |
| AD-005 | Legacy `phase1_workflows.intention_to_submit_status` schema state could conflict with canonical `INTENTION_TO_SUBMIT` module semantics. | Medium conceptual/model drift risk for future module implementation. | High | Closed | Removed `intention_to_submit_status` from legacy phase1 schema contract and bootstrap migration path; legacy ITS endpoints remain retired (`410`). |
| AD-006 | Extracted workflow/PDF modules previously imported canonical TS types from `titleRegistrationWorkflowService.ts` (`FormData`, `MouFormData`, `TitleRegistrationCase`, `ReviewDecision`, `SupervisorProfileForm`). | Coupling back to monolith weakens extraction boundaries and increases refactor friction. | Medium | Closed | Shared contracts extracted to `server/src/services/contracts/titleRegistration.ts`; workflow/PDF/middleware/controller imports now resolve to contracts module. |
| AD-007 | `titleRegistrationWorkflowService.ts` remains a large multi-domain orchestrator (ROTT, external invites, supervisor profiles, MOU, to-do feeds). | Residual low cohesion and elevated regression risk for unrelated changes. | High | In Progress | Split monolith into bounded services (`rottCaseService`, `supervisorProfileService`, `mouService`, `externalInviteService`, `operationsFeedService`) with a thin composition layer. |
| AD-008 | No automated tests covered extracted transition logic (`workflow/titleRegistrationTransitions.ts`) or PDF renderers (`pdf-generation/*`). | Refactor safety risk; regressions likely to be detected late by manual QA only. | High | Closed | Added automated service-level tests for transition gates and PDF smoke generation, wired into `server` test script. |
| AD-009 | Next-wave modules (`ITS`, `APPOINT_EXAMINERS`, `CHANGE_EXAMINERS`, `EXAMINER_SUMMARY_CV`, `APPOINT_ARBITER`) lacked role-scoped approval transitions and printable outputs. | Policy-to-implementation gap for departmental/faculty approval chain and module artifacts. | High | Closed | Implemented role-scoped module state machines (supervisor/dept/chair/faculty as applicable), server-side actor-to-case authorization checks, and ROTT-aligned printable PDF generation endpoints for all Phase-B modules. |
| AD-010 | Client-side module DTO enums are duplicated from server contracts and can drift (example observed: `Role To Change` casing mismatch). | Medium correctness risk causing runtime branch misses or TypeScript inconsistencies across client/server. | Medium | In Progress | Introduce shared cross-workspace contract package or generated API schema/types to eliminate duplicated enum/string-literal contracts. |
| AD-011 | Generated/runtime artifacts are tracked in git (`client/.next/**`, `.next_backup/**`, `server/dist/**`, `server/dev.sqlite3`). | Critical repository hygiene risk: huge diffs, merge noise, accidental binary churn, and slow CI/clones. | Critical | Closed | Added explicit ignore rules, removed generated/runtime artifacts from the git index (`--cached`), and added CI guardrail (`scripts/check-generated-artifacts.sh`) enforced by `.github/workflows/main.yml`. |
| AD-012 | Client orchestration remains heavily concentrated in `client/app/page.tsx` (~2400 lines). | High UI regression risk and low change isolation; policy/UI parity work remains expensive. | High | Closed | Completed page-shell decomposition into module containers/hooks/components, decomposed module panels and orchestration wiring, and enforced CI guardrails for page/hook/panel/helper file sizes. |
| AD-013 | `server/src/db/initDb.ts` (~1100 lines) mixes schema bootstrap, migration-like patching, and seed responsibilities. | High schema-evolution risk across SQLite/MySQL; weak migration traceability and rollout safety. | High | Closed | Canonical schema changes moved to versioned Knex migrations, `initDb` reduced to migration + seed orchestration only, and migration run-order contract documented in tech spec/runbook. |
| AD-014 | Module orchestration/state logic is split across large services (`nextWaveModulesService.ts`, `changeRequestModulesService.ts`) with repeated lifecycle patterns. | Medium-high drift risk: inconsistent validation/transition/audit behavior across modules over time. | High | Closed | Introduced shared lifecycle primitives in `workflow/moduleLifecycleEngine.ts` and migrated next-wave/change-request modules to registry-driven per-module configs for save/submit/review/print flows. |
| AD-015 | Canonical guidance uses `.md`, but generated `.html` guidance artifacts are also tracked and edited, causing dual-source drift pressure. | Medium documentation-governance risk; inconsistent updates and avoidable review overhead. | Medium | Closed | Declared `.md` authoritative in guidance contracts, removed tracked guidance exports from git index, ignored `GUIDANCE/*.html` + `GUIDANCE/*_files/**`, and extended CI guardrails to fail on tracked generated guidance artifacts. |
| AD-016 | Test coverage is minimal across the server layer: only 3 test files exist for ~47 source TypeScript files. No controller tests, no middleware tests, no route-level smoke tests, no client hook tests. AD-008 closed the extracted-module gap; this item tracks the broader service/controller/middleware coverage gap that remains. | High regression risk; error paths, auth integration, and edge cases detected late or only by manual QA. | High | Open | Establish controller smoke tests (happy path + error cases), service-layer unit tests for business logic, middleware tests for auth gates, and client-side hook tests. Target meaningful coverage of critical paths before each release. |
| AD-017 | No schema validation library (zod, joi, express-validator) is in use. All API boundary validation is ad-hoc: manual enum checks, `req.body as Partial<FormData>` casts without field-level validation, and business-rule checks scattered through services rather than enforced at the request boundary. | High correctness risk; invalid or malformed data can persist to the database; client-side validation can be bypassed entirely. | High | Open | Adopt zod (or equivalent) and validate all PATCH/POST request bodies at the controller boundary before passing to services. Enforce enum membership, field presence, length/word-count constraints, and array bounds at the API edge. |
| AD-018 | Error handling is inconsistent across all 6 controllers: HTTP status codes for the same error class vary, error messages leak implementation details (e.g. "Failed to check SASI"), and there is no structured logging framework. Approximately 83 catch blocks each define a custom response shape. No retry/backoff exists for transient failures. | Medium observability and ops risk; production failures are difficult to diagnose; inconsistent client-facing error shapes complicate UI error handling. | Medium | Open | Introduce a centralized error-response middleware and error class hierarchy (validation, auth, not-found, internal). Add structured logging (pino or winston). Standardise HTTP status codes by error class across all controllers. |
| AD-019 | No API contract artefact (OpenAPI/Swagger spec) is generated or maintained. The server's TypeScript types in `server/src/services/contracts/titleRegistration.ts` are the only machine-readable contract, but they are not shared or validated at the transport level. The legacy phase-1 410-Gone endpoints have no documented sunset timeline. This is distinct from AD-010 (enum string-literal drift); that item tracks the synchronisation mechanism, this item tracks the absence of a versioning and documentation strategy. | Medium integration risk; breaking API changes are not caught until client integration; no migration path for consumers of deprecated endpoints. | Medium | Open | Generate an OpenAPI spec from TypeScript types (tsoa, zod-openapi, or similar); enforce it in CI. Document the sunset path for legacy 410 endpoints. Establish a policy for introducing breaking changes under `/api/v2/` or with deprecation headers. |
| AD-025 | Several `Promise.all()` calls are used for parallel fetches where partial failure causes the entire operation to fail. Examples include staff-email lookups in `workflowAuthorization.ts` (dept/chair/faculty fetched in parallel; one DB timeout causes a 403), and notification/profile loads in `operationsFeedService.ts`. No retry, backoff, or circuit-breaker logic exists. | Medium resilience risk; transient database timeouts or directory-service blips cause cascading auth or feed failures that appear as hard errors to the user. | Medium | Open | Audit all `Promise.all()` call sites; replace with `Promise.allSettled()` for non-critical parallel loads where partial results are acceptable. Add retry/backoff for critical external lookups (staff email, SASI check). Document which failures are expected to be fatal vs. degraded. |

## Resolution Notes
1. AD-001 closed on 2026-03-10 after extraction wiring:
- `generatePdf` now delegates to `pdf-generation/titleRegistrationPdfService.ts`.
- `generateMouPdf` now delegates to `pdf-generation/mouPdfService.ts`.
- transition functions delegate to `workflow/titleRegistrationTransitions.ts`.
- helper text layout moved to `pdf-generation/pdfTextLayout.ts`.
2. AD-006 closed on 2026-03-10 after contract extraction:
- introduced `server/src/services/contracts/titleRegistration.ts` as the shared canonical type contract.
- removed type coupling from extracted modules back to monolith service.
3. AD-002 closed on 2026-03-10 after client host decoupling:
- removed `http://localhost:3001` hard-coded fallback from `client/app/page.tsx` and `client/lib/api.ts`.
- client now derives API/artifact origin from `NEXT_PUBLIC_API_BASE` or current browser origin.
4. AD-003 closed on 2026-03-10 after env template reconciliation:
- root `.env.example` declared as single authoritative contract.
- `server/.env.example` and `client/.env.example` marked and maintained as projection files.
5. AD-006 verification on 2026-03-10:
- extracted workflow/PDF/middleware/controller services continue to import canonical contracts from `server/src/services/contracts/titleRegistration.ts` (no reintroduction of monolith type coupling).
6. AD-005 closed on 2026-03-10 after legacy ITS shadow-state removal:
- removed `intention_to_submit_status` from `phase1_workflows` table creation contract.
- added bootstrap migration drop for existing local databases where that column still exists.
- retained `410 Gone` behavior on legacy phase1 ITS routes to enforce canonical ITS module authority.
7. AD-007 progress update on 2026-03-10:
- extracted operations/feed domain into `server/src/services/operationsFeedService.ts`.
- `titleRegistrationWorkflowService.ts` now delegates pipeline/tasks/invites/to-do/people/notifications retrieval to bounded operations service.
8. AD-008 closed on 2026-03-10 after test harness implementation:
- added `server` test script (`tsx --test \"src/**/*.test.ts\"`).
- added transition tests in `server/src/services/workflow/titleRegistrationTransitions.test.ts`.
- added PDF smoke tests in `server/src/services/pdf-generation/pdfGeneration.test.ts`.
9. AD-004 progress update on 2026-03-10:
- added non-transition workflow authorization middleware (`server/src/middleware/workflowAuthorization.ts`) with case-scoped and profile-scoped checks.
- protected non-transition workflow routes in `server/src/api/v1/routes/titleRegistrationWorkflowRoutes.ts` (case ops, profile ops, and collection feeds).
- updated client API calls to include JWT Bearer headers for newly protected operations (`client/lib/api.ts`).
10. Testing progress update on 2026-03-10 (Immediate Actions execution):
- added integration tests in `server/src/services/workflow/changeRequestModulesService.test.ts` for:
  - `CHANGE_TITLE` submit-gate validation + canonical title writeback
  - `CHANGE_SUPERVISOR` canonical supervision roster writeback
  - `ADD_CO_SUPERVISOR` duplicate prevention + canonical roster writeback
  - `INTENTION_TO_SUBMIT` return-and-resubmit rework loop
  - `APPOINT_EXAMINERS` wrong-state rejection + return/resubmit + module-entry audit assertions
  - `CHANGE_EXAMINERS` return/resubmit + module-entry audit assertions
  - `EXAMINER_SUMMARY_CV` wrong-state rejection + return/resubmit assertions
  - `APPOINT_ARBITER` wrong-state rejection + return/resubmit assertions
11. AD-004 progress update on 2026-03-10 (module-route authorization coverage):
- extended `workflowAuthorization` action model with module-scoped operations (`module_student_edit_submit`, `module_supervisor_edit_submit`, `module_review_*`, `module_print`).
- applied explicit route-level authorization middleware to Phase-B and change-request module endpoints (edit/submit/review/print), reducing reliance on service-layer checks alone.
- AD-004 remains In Progress pending production identity/session replacement and final role-model alignment.
12. New priority tranche added on 2026-03-10 after code-vs-guidance audit:
- AD-011 (tracked build/runtime artifacts in repo) added as Critical.
- AD-012 (client `page.tsx` monolith) added as High.
- AD-013 (`initDb.ts` schema/seed coupling) added as High.
- AD-014 (repeated module-lifecycle orchestration across services) added as High.
- AD-015 (guidance `.md` vs `.html` dual-source drift) added as Medium.
13. AD-011 closed on 2026-03-10 after repository hygiene enforcement:
- updated root `.gitignore` with explicit subproject artifact rules (`/client/.next`, `/client/.next_backup*`, `/server/dist`, `/server/dev.sqlite3`).
- removed tracked generated/runtime artifacts from git index via `git rm --cached` (local files retained).
- introduced CI enforcement in `.github/workflows/main.yml` running `scripts/check-generated-artifacts.sh`.
14. AD-015 closed on 2026-03-10 after guidance source-of-truth enforcement:
- set `.md` as canonical guidance source in `GUIDANCE/GUIDANCE_INDEX.md`.
- removed tracked HTML guidance exports from git index (`GUIDANCE/*.html`, `GUIDANCE/*_files/**`) while retaining local generated files.
- extended `scripts/check-generated-artifacts.sh` and CI to block tracked guidance export artifacts.
15. AD-014 closed on 2026-03-10 after module lifecycle engine extraction:
- introduced shared module lifecycle primitives in `server/src/services/workflow/moduleLifecycleEngine.ts` for create/update/submit/review/print + module entry sync.
- converted `nextWaveModulesService.ts` to registry-driven per-module configs (table, title, prerequisites, prefill, completion, submit target, review transitions).
- converted `changeRequestModulesService.ts` to registry-driven per-module configs while preserving module-specific submit validations and final approval side effects.
- verified behavior parity with full `server` test suite (`tsx --test \"src/**/*.test.ts\"`) and strict TypeScript build (`tsc`).
16. AD-012 progress update on 2026-03-10 (dashboard decomposition tranche):
- extracted dashboard chrome/sidebar and case lookup into dedicated components:
  - `client/app/dashboard/components/DashboardSidebar.tsx`
  - `client/app/dashboard/components/CaseLookupCard.tsx`
- extracted operational/queue panel rendering into `client/app/dashboard/components/OperationalPanels.tsx`.
- extracted supervisor-profile + MOU support panels into `client/app/dashboard/components/WorkflowSupportPanels.tsx`.
- reduced orchestration concentration in `client/app/page.tsx` (from 2411 to 2122 lines) while preserving behavior; AD-012 remains In Progress pending full module-panel + hook decomposition.
17. AD-012 progress update on 2026-03-10 (next decomposition tranche):
- extracted remaining Phase-B/change-request module cards into `client/app/dashboard/components/WorkflowModulePanels.tsx`:
  - `INTENTION_TO_SUBMIT`
  - `APPOINT_EXAMINERS`
  - `CHANGE_EXAMINERS`
  - `CHANGE_TITLE`
  - `CHANGE_SUPERVISOR`
  - `ADD_CO_SUPERVISOR`
  - `EXAMINER_SUMMARY_CV`
  - `APPOINT_ARBITER`
- moved page-level orchestration/state handlers into dedicated `client/app/dashboard/hooks/useDashboardOrchestration.ts`.
- reduced `client/app/page.tsx` from 2122 to 446 lines while preserving behavior and successful `client` production build; AD-012 remains In Progress pending decomposition of hook internals and final guardrail enforcement.
18. AD-012 progress update on 2026-03-10 (domain-hook split + guardrails tranche):
- split orchestration internals into domain hooks:
  - `client/app/dashboard/hooks/useDashboardCoreCase.ts` (ROTT/core case)
  - `client/app/dashboard/hooks/useDashboardProfilesMou.ts` (supervisor profiles + MOU)
  - `client/app/dashboard/hooks/useDashboardPhaseBModules.ts` (Phase-B/change-request modules)
  - `client/app/dashboard/hooks/useDashboardOpsFeeds.ts` (pipeline/to-do/tasks/people/notifications)
- converted `client/app/dashboard/hooks/useDashboardOrchestration.ts` into composition/wiring layer over domain hooks.
- added dashboard size guardrail script `scripts/check-dashboard-sizes.sh` and CI enforcement in `.github/workflows/main.yml`.
19. AD-012 progress update on 2026-03-10 (module panel decomposition tranche):
- split `client/app/dashboard/components/WorkflowModulePanels.tsx` into focused components:
  - `client/app/dashboard/components/PhaseBModulePanels.tsx`
  - `client/app/dashboard/components/ChangeRequestModulePanels.tsx`
  - shared props contract in `client/app/dashboard/components/workflowModulePanelTypes.ts`
- reduced `WorkflowModulePanels.tsx` to composition-only wrapper.
- expanded `scripts/check-dashboard-sizes.sh` guardrails to include module-panel component files and shared panel types.
- verified with `./scripts/check-dashboard-sizes.sh` and `npm run build --workspace=client`.
20. AD-012 progress update on 2026-03-10 (field-render helper extraction tranche):
- extracted reusable helper `client/app/dashboard/components/moduleFieldRenderers.tsx` (`ModuleField` + select option model) for module form controls.
- adopted helper across:
  - `client/app/dashboard/components/PhaseBModulePanels.tsx`
  - `client/app/dashboard/components/ChangeRequestModulePanels.tsx`
- removed duplicated input/select/textarea rendering blocks while preserving module-specific labels, options, read-only gates, and status locks.
- verified with `./scripts/check-dashboard-sizes.sh` and `npm run build --workspace=client`.
21. AD-012 progress update on 2026-03-10 (review-action + module-loader map tranche):
- extracted shared review action helper `client/app/dashboard/components/moduleActionButtons.tsx` (`ReviewActionButtons`) and replaced repeated approve/return button chains across:
  - `client/app/dashboard/components/PhaseBModulePanels.tsx`
  - `client/app/dashboard/components/ChangeRequestModulePanels.tsx`
- refactored module loader condition chain in `client/app/dashboard/hooks/useDashboardOrchestration.ts` into a `moduleLoaders` dispatch map.
- extended `scripts/check-dashboard-sizes.sh` guardrails to include `moduleActionButtons.tsx`.
- verified with `./scripts/check-dashboard-sizes.sh` and `npm run build --workspace=client`.
22. AD-012 closure update on 2026-03-10:
- reduced page-level concentration from `client/app/page.tsx` 2411 -> 446 lines with orchestration and panel extraction completed.
- split dashboard orchestration by domain hooks and reduced `useDashboardOrchestration.ts` to composition/wiring + module dispatch map.
- decomposed module UI into focused panel components with shared field/review helpers:
  - `PhaseBModulePanels.tsx`
  - `ChangeRequestModulePanels.tsx`
  - `workflowModulePanelTypes.ts`
  - `moduleFieldRenderers.tsx`
  - `moduleActionButtons.tsx`
- enforced CI guardrails for dashboard page/hook/panel/helper sizes via `scripts/check-dashboard-sizes.sh`.
- verified closure with `./scripts/check-dashboard-sizes.sh` and `npm run build --workspace=client`.
23. AD-013 progress update on 2026-03-10 (migration-first schema tranche):
- added migration `server/src/db/migrations/20260310152000_consolidate_workflow_schema.ts` to own canonical workflow schema creation/evolution previously embedded in `initDb`.
- reduced `server/src/db/initDb.ts` to migration execution (`db.migrate.latest`) plus idempotent demo/CSV seed orchestration.
- added dedicated migration runner `server/src/db/runMigrations.ts` and `npm run db:migrate --workspace=server`.
- verified with `npm run build --workspace=server`, `npm run test --workspace=server`, and `npm run db:migrate --workspace=server`.

24. AD-013 closure update on 2026-03-10 (orchestration-only bootstrap tranche):
- extracted demo/CSV seed implementation into `server/src/db/seedDemoData.ts`; `server/src/db/initDb.ts` now only orchestrates migration + seed wiring.
- documented mandatory migration run order in:
  - `GUIDANCE/PG_PLATFORM_TECH_SPEC.md` (`8.3 Database Migration Run Order Contract`)
  - `GUIDANCE/WORKFLOW_ORCHESTRATION_RUNBOOK.md` (`3.1 Database Migration Run Order`)
- re-verified with `npm run build --workspace=server`, `npm run test --workspace=server`, and `npm run db:migrate --workspace=server`.

25. New items added on 2026-03-10 after cross-cutting code audit:
- AD-016 (insufficient test coverage beyond extracted modules) added as High.
- AD-017 (no schema validation library at API boundary) added as High.
- AD-018 (inconsistent error handling and no structured logging) added as Medium.
- AD-019 (no API contract artefact or versioning strategy) added as Medium.
- AD-025 (Promise.all() fail-fast in auth and feed paths without retry) added as Medium.
- AD-020 through AD-024 were considered but collapsed: AD-020 overlaps with AD-013, AD-021/AD-022 are already tracked within AD-012/AD-014 resolution paths, AD-023 is covered by AD-004 In Progress, and AD-024 (loose TypeScript practices) was assessed as Low impact relative to existing priorities.
26. AD-004 progress update on 2026-03-10 (route-surface auth + dev-login behavior tranche):
- enforced authentication on previously open internal route families:
  - `server/src/api/v1/routes/directoryRoutes.ts` (`departments`, `staff`, `external-academics`, `external-supervisors`, `external-academics/invite`)
  - `server/src/api/v1/routes/sasiRoutes.ts` (`students/search`)
  - `server/src/api/v1/routes/titleRegistrationRoutes.ts` (legacy title-registration CRUD routes)
  - `server/src/api/v1/routes/titleRegistrationWorkflowRoutes.ts` (`/sasi/:studentNumber/check`)
- aligned dev-login disable behavior to policy: `/api/v1/auth/dev-login` now returns `404 Not Found` when `ENABLE_DEV_AUTH=false` (`server/src/controllers/authController.ts`).
- updated client API auth wiring so protected directory + SASI-check calls include Bearer tokens (`client/lib/api.ts`).
- AD-004 remains In Progress pending production identity/session model replacement and role-model schema expansion per `AUTHORIZATION_MATRIX.md`.
27. AD-004 progress update on 2026-03-10 (rate-limit + CORS hardening tranche):
- added auth endpoint rate limiting middleware (`server/src/middleware/rateLimit.ts`) and applied it to `/api/v1/auth/dev-login`:
  - `AUTH_RATE_LIMIT_WINDOW_MS` (default `60000`)
  - `AUTH_RATE_LIMIT_MAX_REQUESTS` (default `20`)
- replaced permissive `cors()` setup with environment-driven origin allowlisting in `server/src/server.ts`:
  - `CORS_ALLOWED_ORIGINS` (comma-separated origins)
  - non-production fallback includes localhost client origins
  - production with empty allowlist logs warning and rejects browser origins
- synchronized env templates (`.env.example`, `server/.env.example`) and technical spec docs with new auth/CORS controls.
- AD-004 remains In Progress pending production identity/session replacement and full authorization-matrix role schema implementation.
28. AD-004 progress update on 2026-03-10 (password/session + role-compatibility tranche):
- implemented password-based login and refresh-token lifecycle endpoints:
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/refresh`
  - `POST /api/v1/auth/logout`
  - `POST /api/v1/auth/logout-all`
- added credential/session/audit storage primitives:
  - `users.password_hash`, `users.active`, `users.staff_number`, `users.departments`
  - `auth_refresh_tokens` table
  - `auth_audit_events` table
- expanded token + authorization-layer role handling to support authorization-matrix roles (`dept_hd_rep`, `dept_chairperson`, `faculty_hd_rep`, `system_admin`) while retaining legacy `admin` compatibility for existing data.
- AD-004 remains In Progress pending production identity provider integration and complete database role-schema migration/backfill.
29. AD-004 progress update on 2026-03-10 (role-schema migration + backfill tranche):
- added migration `server/src/db/migrations/20260310212000_expand_user_role_model.ts`:
  - expands `users.role` to authorization-matrix roles (`student`, `supervisor`, `dept_hd_rep`, `dept_chairperson`, `faculty_hd_rep`, `system_admin`) while retaining `admin` compatibility.
  - backfills legacy `admin` users into scoped roles using `sasi_staff` role mappings (`dept_fhd_rep`, `hod`, `faculty_fhd_rep`) with fallback to `system_admin`.
  - supports both SQLite (table rebuild) and MySQL (enum alter) migration paths.
- aligned demo seed user roles in `server/src/db/seedDemoData.ts` to scoped matrix roles (`dept_hd_rep`, `faculty_hd_rep`, `dept_chairperson`).
- AD-004 remains In Progress pending production identity provider integration and full staff/departments assignment-governance model.

## Update Rule
1. Add debt item when structural inconsistency is discovered.
2. Link each debt item to roadmap actions in `PROJECT_IMPLEMENTATION_PLAN.md`.
3. Close item only after code, docs, and regression checks are updated.
