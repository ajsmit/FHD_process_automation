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
| AD-009 | Next-wave modules (`ITS`, `APPOINT_EXAMINERS`, `CHANGE_EXAMINERS`, `EXAMINER_SUMMARY_CV`, `APPOINT_ARBITER`) are implemented with student-owned save/submit endpoints only; full role-scoped approval transitions are not yet enforced. | Policy-to-implementation gap for departmental/faculty approval chain in Phase-B modules. | High | Open | Add role-specific transition endpoints + server-side authorization and state machines aligned to `AUTHORIZATION_MATRIX.md` and policy contracts. |

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

## Update Rule
1. Add debt item when structural inconsistency is discovered.
2. Link each debt item to roadmap actions in `PROJECT_IMPLEMENTATION_PLAN.md`.
3. Close item only after code, docs, and regression checks are updated.
