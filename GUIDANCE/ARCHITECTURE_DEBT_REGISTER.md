# Architecture Debt Register

Version: 2026-03-12
Status: Active
Purpose: Track structural debt that affects maintainability, refactor planning, and release risk.

## Debt Items
| id | debt | impact | priority | status | target |
|---|---|---|---|---|---|
| AD-001 | Monolithic `server/src/services/titleRegistrationWorkflowService.ts` previously contained orchestration + validation + PDF generation in one service. | High change risk, low cohesion, hard testability. | High | Closed | Extracted workflow transitions to `server/src/services/workflow/titleRegistrationTransitions.ts` and PDF composition to `server/src/services/pdf-generation/*`; monolith now delegates to extracted modules. |
| AD-002 | Residual hard-coded artifact host in client (`http://localhost:3001`) for PDF/CV links. | Environment portability risk. | High | Closed | Replaced localhost fallback with env/browser-origin resolution (`NEXT_PUBLIC_API_BASE` or runtime origin) for API and generated artifact links. |
| AD-003 | Workspace root `.env.example` and `server/.env.example` were not fully reconciled. | Configuration drift/confusion risk. | Medium | Closed | Formalized root `.env.example` as authoritative env contract, and aligned `server/.env.example` + `client/.env.example` as synchronized projection templates. |
| AD-004 | Authentication/authorization coverage previously had partial endpoint protection and unresolved production identity hardening. | High policy/compliance risk outside transition path. | Critical | Closed | Enforced authenticated route-family role gates (workflow/non-workflow), finalized production trusted-header identity guardrails, and synchronized authorization documentation/status to deployed state in `AUTHORIZATION_MATRIX.md`. |
| AD-005 | Legacy `phase1_workflows.intention_to_submit_status` schema state could conflict with canonical `INTENTION_TO_SUBMIT` module semantics. | Medium conceptual/model drift risk for future module implementation. | High | Closed | Removed `intention_to_submit_status` from legacy phase1 schema contract and bootstrap migration path; legacy ITS endpoints remain retired (`410`). |
| AD-006 | Extracted workflow/PDF modules previously imported canonical TS types from `titleRegistrationWorkflowService.ts` (`FormData`, `MouFormData`, `TitleRegistrationCase`, `ReviewDecision`, `SupervisorProfileForm`). | Coupling back to monolith weakens extraction boundaries and increases refactor friction. | Medium | Closed | Shared contracts extracted to `server/src/services/contracts/titleRegistration.ts`; workflow/PDF/middleware/controller imports now resolve to contracts module. |
| AD-007 | `titleRegistrationWorkflowService.ts` remains a large multi-domain orchestrator (ROTT, external invites, supervisor profiles, MOU, to-do feeds). | Residual low cohesion and elevated regression risk for unrelated changes. | High | Closed | Split orchestration into bounded domain services (`rottCaseService`, `supervisorProfileService`, `mouService`, `externalAcademicOnboardingService`, `operationsFeedService`) and converted `titleRegistrationWorkflowService.ts` into a thin composition façade. |
| AD-008 | No automated tests covered extracted transition logic (`workflow/titleRegistrationTransitions.ts`) or PDF renderers (`pdf-generation/*`). | Refactor safety risk; regressions likely to be detected late by manual QA only. | High | Closed | Added automated service-level tests for transition gates and PDF smoke generation, wired into `server` test script. |
| AD-009 | Next-wave modules (`ITS`, `APPOINT_EXAMINERS`, `CHANGE_EXAMINERS`, `EXAMINER_SUMMARY_CV`, `APPOINT_ARBITER`) lacked role-scoped approval transitions and printable outputs. | Policy-to-implementation gap for departmental/faculty approval chain and module artifacts. | High | Closed | Implemented role-scoped module state machines (supervisor/dept/chair/faculty as applicable), server-side actor-to-case authorization checks, and ROTT-aligned printable PDF generation endpoints for all Phase-B modules. |
| AD-010 | Client-side module DTO enums are duplicated from server contracts and can drift (example observed: `Role To Change` casing mismatch). | Medium correctness risk causing runtime branch misses or TypeScript inconsistencies across client/server. | Medium | Closed | Consolidated shared DTO/enum contracts into workspace package `@fhd/common-types` and switched server/client contract imports to consume the shared canonical source. |
| AD-011 | Generated/runtime artifacts are tracked in git (`client/.next/**`, `.next_backup/**`, `server/dist/**`, `server/dev.sqlite3`). | Critical repository hygiene risk: huge diffs, merge noise, accidental binary churn, and slow CI/clones. | Critical | Closed | Added explicit ignore rules, removed generated/runtime artifacts from the git index (`--cached`), and added CI guardrail (`scripts/check-generated-artifacts.sh`) enforced by `.github/workflows/main.yml`. |
| AD-012 | Client orchestration remains heavily concentrated in `client/app/page.tsx` (~2400 lines). | High UI regression risk and low change isolation; policy/UI parity work remains expensive. | High | Closed | Completed page-shell decomposition into module containers/hooks/components, decomposed module panels and orchestration wiring, and enforced CI guardrails for page/hook/panel/helper file sizes. |
| AD-013 | `server/src/db/initDb.ts` (~1100 lines) mixes schema bootstrap, migration-like patching, and seed responsibilities. | High schema-evolution risk across SQLite/MySQL; weak migration traceability and rollout safety. | High | Closed | Canonical schema changes moved to versioned Knex migrations, `initDb` reduced to migration + seed orchestration only, and migration run-order contract documented in tech spec/runbook. |
| AD-014 | Module orchestration/state logic is split across large services (`nextWaveModulesService.ts`, `changeRequestModulesService.ts`) with repeated lifecycle patterns. | Medium-high drift risk: inconsistent validation/transition/audit behavior across modules over time. | High | Closed | Introduced shared lifecycle primitives in `workflow/moduleLifecycleEngine.ts` and migrated next-wave/change-request modules to registry-driven per-module configs for save/submit/review/print flows. |
| AD-015 | Canonical guidance uses `.md`, but generated `.html` guidance artifacts are also tracked and edited, causing dual-source drift pressure. | Medium documentation-governance risk; inconsistent updates and avoidable review overhead. | Medium | Closed | Declared `.md` authoritative in guidance contracts, removed tracked guidance exports from git index, ignored `GUIDANCE/*.html` + `GUIDANCE/*_files/**`, and extended CI guardrails to fail on tracked generated guidance artifacts. |
| AD-016 | Test coverage previously lacked controller smoke tests, middleware auth tests, and route-level smoke checks beyond service-level module tests. Coverage has now been expanded across controller/middleware/route surfaces in addition to existing service tests. | High regression risk; error paths, auth integration, and edge cases detected late or only by manual QA. | High | Closed | Added controller smoke tests, middleware auth+validation tests, and API route smoke tests (including validation/auth guard paths) and verified in the server CI test suite. |
| AD-017 | API boundary validation was ad-hoc (manual enum checks, `req.body as Partial<FormData>` casts, and scattered controller/service checks). Request-schema validation middleware is now deployed across route boundaries (auth, workflow, directory, SASI, and legacy phase1/title routes) with shared zod schemas. | High correctness risk; invalid or malformed data can persist to the database; client-side validation can be bypassed entirely. | High | Closed | Implemented shared zod request schemas + validation middleware (`validateBody`, `validateParams`, `validateQuery`) and applied them across POST/PATCH and parameterized/query routes. |
| AD-018 | Error handling was inconsistent across controllers: HTTP status codes for similar failures varied, message/shape drift existed, and logging was mostly ad-hoc console output. Centralized error classes/middleware and structured logging are now applied across controller surfaces with standardized response payloads. | Medium observability and ops risk; production failures are difficult to diagnose; inconsistent client-facing error shapes complicate UI error handling. | Medium | Closed | Implemented centralized `AppError` stack + global error middleware + structured logger and migrated controllers to standardized `{ message, code, details }` error responses. |
| AD-019 | No API contract artefact (OpenAPI/Swagger spec) is generated or maintained. The server's TypeScript types in `server/src/services/contracts/titleRegistration.ts` are the only machine-readable contract, but they are not shared or validated at the transport level. The legacy phase-1 410-Gone endpoints have no documented sunset timeline. This is distinct from AD-010 (enum string-literal drift); that item tracks the synchronisation mechanism, this item tracks the absence of a versioning and documentation strategy. | Medium integration risk; breaking API changes are not caught until client integration; no migration path for consumers of deprecated endpoints. | Medium | Closed | Added route-derived OpenAPI generation (`server/src/contracts/generateOpenApi.ts`) producing `server/openapi/openapi.v1.json`, enforced contract sync in CI (`scripts/check-openapi-contract.sh` + workflow), and documented v1/v2 + legacy `410` sunset policy in tech spec. |
| AD-025 | Several `Promise.all()` calls are used for parallel fetches where partial failure causes the entire operation to fail. Examples include staff-email lookups in `workflowAuthorization.ts` (dept/chair/faculty fetched in parallel; one DB timeout causes a 403), and notification/profile loads in `operationsFeedService.ts`. No retry, backoff, or circuit-breaker logic exists. | Medium resilience risk; transient database timeouts or directory-service blips cause cascading auth or feed failures that appear as hard errors to the user. | Medium | Closed | Introduced shared resilience helpers (`retryWithBackoff`, `settleAll`) and applied degraded partial-failure handling for auth scope/feed enrichment plus retry/backoff on critical SASI/staff lookups. |

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
30. AD-004 progress update on 2026-03-10 (scope-field backfill + login identifier tranche):
- added migration `server/src/db/migrations/20260310224500_backfill_user_scope_fields.ts`:
  - backfills `users.staff_number` from `users.sasi_id` for staff/admin-class roles where missing.
  - backfills `users.departments` JSON arrays for `dept_hd_rep` and `dept_chairperson` from `sasi_staff` departmental assignments.
- aligned seeded demo users with explicit `staff_number` + `departments` scope fields in `server/src/db/seedDemoData.ts`.
- expanded password login identifier matching to include `staff_number` in addition to `sasi_id` and `email` (`server/src/controllers/authController.ts`).
- AD-004 remains In Progress pending production identity provider integration and final role-assignment governance lifecycle.
31. AD-004 progress update on 2026-03-10 (external invite token hardening tranche):
- added migration `server/src/db/migrations/20260310235500_harden_external_invite_tokens.ts` with invite-token security columns:
  - `external_academic_profile_invites.token_hash` (lookup key; unique index)
  - `external_academic_profile_invites.token_ciphertext` (encrypted token at rest)
- introduced `server/src/auth/inviteTokenService.ts` for invite token generation, hashing, and AES-GCM encryption/decryption.
- updated invite onboarding flow (`server/src/services/externalAcademicOnboardingService.ts`) to:
  - persist hash + ciphertext for new invites,
  - validate public invite access by token hash with backward-compatible legacy-token fallback,
  - retain single-use completion semantics (`status=completed`) and expiry handling.
- updated invite status feed (`server/src/services/operationsFeedService.ts`) to build invite links from decrypted ciphertext for hardened rows.
- AD-004 remains In Progress pending production identity provider integration and final role-assignment governance lifecycle.
32. AD-004 progress update on 2026-03-10 (production identity-provider adapter tranche):
- introduced provider-mode auth selector (`AUTH_PROVIDER`) with supported modes:
  - `local_password` (existing credential flow)
  - `trusted_header` (reverse-proxy/IdP header exchange flow)
- added provider exchange endpoint `POST /api/v1/auth/provider-login` (`server/src/controllers/authController.ts`, `server/src/api/v1/routes/authRoutes.ts`) gated by shared-secret header validation and trusted identity headers.
- constrained local password endpoint to local mode: `POST /api/v1/auth/login` returns `404` when provider mode is `trusted_header`.
- synchronized env templates and runbook docs with provider-mode controls and header/secret configuration keys.
- AD-004 remains In Progress pending enterprise IdP/proxy rollout hardening and final role-assignment governance lifecycle.
33. AD-004 progress update on 2026-03-10 (logout token-ownership enforcement tranche):
- tightened `POST /api/v1/auth/logout` to revoke refresh tokens only when the token belongs to the authenticated user (`server/src/controllers/authController.ts`, `server/src/auth/sessionService.ts`).
- added explicit auth-audit event `logout_failed_token_not_owned_or_invalid` for mismatched/invalid logout token attempts.
- expanded auth regression coverage with logout ownership tests (`server/src/services/workflow/changeRequestModulesService.test.ts`) for:
  - valid self-owned token logout success,
  - cross-user token logout rejection.
- AD-004 remains In Progress pending enterprise IdP/proxy rollout hardening and final role-assignment governance lifecycle.
34. AD-004 progress update on 2026-03-10 (legacy phase1 route auth coverage tranche):
- applied `requireAuth` middleware to all legacy `phase1` endpoints (`server/src/api/v1/routes/phase1Routes.ts`) so enabling `ENABLE_LEGACY_PHASE1=true` no longer exposes unauthenticated legacy workflow operations.
- synchronized implementation-status wording in `GUIDANCE/AUTHORIZATION_MATRIX.md` to include legacy `phase1` auth coverage.
- AD-004 remains In Progress pending enterprise IdP/proxy rollout hardening and final role-assignment governance lifecycle.
35. AD-004 progress update on 2026-03-10 (identity conflict hardening tranche):
- hardened local password login identity resolution (`POST /api/v1/auth/login`) to reject ambiguous identifiers that map to multiple user rows, instead of selecting a first-match row.
- hardened trusted-header provider login (`POST /api/v1/auth/provider-login`) to reject conflicting identity headers when email/SASI/staff-number resolve to different users; provider login now requires a single consistent user mapping.
- added audit events for identity-mismatch scenarios:
  - `login_failed_identifier_conflict`
  - `provider_login_failed_identity_conflict`
- expanded auth regression coverage with new tests for duplicate-identifier and provider-header conflict paths (`server/src/services/workflow/changeRequestModulesService.test.ts`).
- AD-004 remains In Progress pending enterprise IdP/proxy rollout hardening and final role-assignment governance lifecycle.
36. AD-017 progress update on 2026-03-10 (zod boundary-validation baseline tranche):
- added request-validation middleware (`server/src/middleware/requestValidation.ts`) with schema-driven `validateBody` and `validateParams` handlers returning consistent `400` payloads.
- introduced shared zod request schemas (`server/src/validation/requestSchemas.ts`) for:
  - auth payloads (`dev-login`, `login`, `refresh/logout` refresh-token body),
  - route params (`caseId`, `profileId`, `studentNumber`),
  - transition/module review decisions and common patch payload bodies.
- applied boundary validation middleware to:
  - auth routes (`server/src/api/v1/routes/authRoutes.ts`),
  - high-risk workflow write/review routes (`server/src/api/v1/routes/titleRegistrationWorkflowRoutes.ts`) including form/profile/MOU/module patches and review endpoints.
- added middleware tests (`server/src/middleware/requestValidation.test.ts`) and verified via `npm run build --workspace=server` + `npm run test --workspace=server`.
- AD-017 remains In Progress pending full endpoint-surface schema coverage and migration of remaining ad-hoc controller validations.
37. AD-017 closure update on 2026-03-10 (endpoint-surface completion tranche):
- extended boundary validation to remaining route families/endpoints:
  - `server/src/api/v1/routes/directoryRoutes.ts` (query/params/body coverage)
  - `server/src/api/v1/routes/sasiRoutes.ts` (search query coverage)
  - `server/src/api/v1/routes/phase1Routes.ts` (legacy params/body coverage)
  - `server/src/api/v1/routes/titleRegistrationRoutes.ts` (legacy id/body coverage)
  - `server/src/api/v1/routes/titleRegistrationWorkflowRoutes.ts` (complete `caseId`/`profileId` params + pipeline query + profile CV upload body coverage)
- expanded shared schemas in `server/src/validation/requestSchemas.ts` and middleware capability with `validateQuery`.
- validation middleware test suite extended in `server/src/middleware/requestValidation.test.ts`.
- verified with `npm run build --workspace=server`, `npm run test --workspace=server`, and `npm run build --workspace=client`.
- AD-017 marked Closed.
38. Post-AD-001 decomposition closure confirmation on 2026-03-11:
- confirmed `server/src/services/titleRegistrationWorkflowService.ts` remains thin composition/facade wiring over bounded services (`rottCaseService`, `supervisorProfileService`, `mouService`, `operationsFeedService`).
- added CI guardrail `scripts/check-service-boundaries.sh` and wired it in `.github/workflows/main.yml` to prevent reintroduction of direct DB coupling or monolithic growth in facade service.
39. AD-016 closure update on 2026-03-10 (coverage expansion tranche):
- expanded server test surface with controller, middleware, and route smoke coverage:
  - `server/src/controllers/titleRegistrationController.test.ts` (happy/error controller smoke cases)
  - `server/src/middleware/auth.test.ts` (auth middleware bearer-token flow)
  - `server/src/middleware/requestValidation.test.ts` (body/params/query validation behavior)
  - `server/src/api/v1/routes/routesSmoke.test.ts` (route-level smoke for health/auth/validation guards)
- retained and re-verified existing service-level transition/module/PDF coverage.
- verification: `npm run build --workspace=server` and `npm run test --workspace=server` now pass with expanded suite (37 passing tests).
- AD-016 marked Closed.
40. AD-018 progress update on 2026-03-10 (central error stack tranche):
- introduced centralized error primitives in `server/src/errors/httpErrors.ts`:
  - `AppError` base + typed subclasses (`ValidationError`, `AuthenticationError`, `AuthorizationError`, `NotFoundError`, `ConflictError`, `InternalServerError`)
  - `toAppError(...)` normalization helper for unknown throws.
- introduced structured JSON logger `server/src/logging/logger.ts`.
- introduced global Express error middleware `server/src/middleware/errorHandler.ts`:
  - `notFoundHandler` for unmatched routes
  - `errorHandler` for standardized `{ message, code, details }` responses and structured error logging.
- wired global middleware into server bootstrap (`server/src/server.ts`) and switched bootstrap logging to structured logger.
- migrated controller error flow for:
  - `server/src/controllers/authController.ts`
  - `server/src/controllers/directoryController.ts`
  - `server/src/controllers/sasiController.ts`
  to use normalized `AppError` fallbacks and consistent error codes/messages.
- verification: `npm run build --workspace=server`, `npm run test --workspace=server`, and `npm run build --workspace=client`.
- AD-018 remains In Progress pending full controller-surface migration (notably `titleRegistrationWorkflowController.ts`, `phase1Controller.ts`, `titleRegistrationController.ts`).
41. AD-018 closure update on 2026-03-10 (full controller migration tranche):
- completed controller-surface migration to centralized error normalization:
  - `server/src/controllers/titleRegistrationWorkflowController.ts`
  - `server/src/controllers/phase1Controller.ts`
  - `server/src/controllers/titleRegistrationController.ts`
  - (plus previously migrated `authController.ts`, `directoryController.ts`, `sasiController.ts`)
- all migrated controller error paths now emit standardized payload shape:
  - `{ message, code, details }`
  via shared normalization helper(s) backed by `toAppError(...)`.
- global Express not-found + error middleware (`server/src/middleware/errorHandler.ts`) remains active in bootstrap (`server/src/server.ts`) with structured JSON logging (`server/src/logging/logger.ts`).
- verification: `npm run build --workspace=server`, `npm run test --workspace=server` (37 passing), and `npm run build --workspace=client`.
- AD-018 marked Closed.
42. AD-019 closure update on 2026-03-10 (OpenAPI contract + versioning policy tranche):
- introduced route-derived contract generator `server/src/contracts/generateOpenApi.ts` and committed canonical artifact `server/openapi/openapi.v1.json`.
- added generation command `npm run openapi:generate --workspace=server`.
- added CI drift guard `scripts/check-openapi-contract.sh` and workflow enforcement step in `.github/workflows/main.yml`.
- documented API versioning + deprecation policy and legacy `410` endpoint sunset timeline in `GUIDANCE/PG_PLATFORM_TECH_SPEC.md` (`5.5 OpenAPI Contract, Versioning, And Sunset Policy`).
- AD-019 marked Closed.
43. AD-025 closure update on 2026-03-10 (resilience and degraded-fallback tranche):
- added shared resilience utilities in `server/src/utils/resilience.ts`:
  - `retryWithBackoff(...)` for bounded transient retries with exponential backoff
  - `settleAll(...)` for non-fail-fast parallel aggregation
- hardened legacy-admin scope resolution in:
  - `server/src/middleware/workflowAuthorization.ts`
  - `server/src/services/workflow/nextWaveModulesService.ts`
  - `server/src/services/workflow/changeRequestModulesService.ts`
  by replacing fail-fast parallel role checks with settle-based degraded evaluation.
- hardened critical lookups with retries:
  - `server/src/services/titleRegistrationWorkflowService.ts` staff email lookup (`getStaffEmail`)
  - `server/src/services/sasiService.ts` SASI API requests (network/429/5xx retry policy).
- hardened ops feed enrichment in `server/src/services/operationsFeedService.ts` to return degraded rows when per-case enrichment fails instead of failing the entire pipeline response.
- added resilience unit tests in `server/src/utils/resilience.test.ts`.
- AD-025 marked Closed.
44. AD-007 closure update on 2026-03-10 (service-boundary completion tranche):
- moved primary orchestration implementation to `server/src/services/rottCaseService.ts`.
- introduced bounded domain service entrypoints:
  - `server/src/services/supervisorProfileService.ts`
  - `server/src/services/mouService.ts`
  - existing `server/src/services/externalAcademicOnboardingService.ts`
  - existing `server/src/services/operationsFeedService.ts`
- reduced `server/src/services/titleRegistrationWorkflowService.ts` to composition/facade wiring across bounded services, preserving controller/service call contracts.
- verified with `npm run build --workspace=server` and `npm run test --workspace=server`.
- AD-007 marked Closed.
45. AD-010 closure update on 2026-03-10 (shared contract package tranche):
- implemented canonical cross-workspace DTO/enum package in `packages/common-types/src/index.ts`.
- updated server contract boundary (`server/src/services/contracts/titleRegistration.ts`) to re-export shared contract types from `@fhd/common-types`.
- removed duplicated client DTO/enum declarations in `client/lib/api.ts` and replaced with shared imports/exports from `@fhd/common-types`.
- declared explicit workspace dependencies in `client/package.json` and `server/package.json`.
- verified with `npm run build --workspace=server`, `npm run test --workspace=server`, and `npm run build --workspace=client`.
- AD-010 marked Closed.
46. AD-004 closure update on 2026-03-11 15:42 SAST (route-role enforcement + production auth guardrail completion tranche):
- added route-role authorization middleware `server/src/middleware/roleAuthorization.ts` with audit logging for denied role access.
- enforced explicit role gates on non-workflow route families:
  - `server/src/api/v1/routes/directoryRoutes.ts` (`departments`, `staff`, `external-academics`, `external-supervisors`, and `external-academics/invite`)
  - `server/src/api/v1/routes/sasiRoutes.ts` (`students/search`)
  - `server/src/api/v1/routes/titleRegistrationRoutes.ts` (legacy CRUD endpoints restricted to admin roles)
- strengthened production startup guardrails in `server/src/auth/startupAuthGuardrails.ts`:
  - `AUTH_PROVIDER` must be `trusted_header` in production
  - `CORS_ALLOWED_ORIGINS` must be explicitly configured in production
  - existing trusted-header shared-secret and trusted-proxy-IP requirements remain enforced
- aligned simulated client directory actor to policy-compliant role context in `client/lib/api.ts` (directory reads now use supervisor identity in demo auth flow).
- expanded route regression checks in `server/src/api/v1/routes/routesSmoke.test.ts` for forbidden-role coverage on directory, SASI search, and legacy title-registration surfaces.
- synchronized authorization status reporting in `GUIDANCE/AUTHORIZATION_MATRIX.md` from partial to deployed entries for AD-004 tracked controls.
- AD-004 marked Closed.

## Update Rule
1. Add debt item when structural inconsistency is discovered.
2. Link each debt item to roadmap actions in `PROJECT_IMPLEMENTATION_PLAN.md`.
3. Close item only after code, docs, and regression checks are updated.
4. Timestamp each debt item resolution under "## Resolution Notes" with the resolution date and time.
