# PG Workflow Platform Implementation Plan

Version: 2026-03-11  
Status: Rolling plan aligned to implemented code

## Boundaries
- This file is authoritative for delivery phasing, priorities, and execution status.
- Policy rules are owned by [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md).
- Field mappings are owned by [POLICY_FIELD_MAP.md](./POLICY_FIELD_MAP.md).
- Technical architecture/contracts are owned by [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md).
- Workflow execution protocol is owned by [WORKFLOW_ORCHESTRATION_RUNBOOK.md](./WORKFLOW_ORCHESTRATION_RUNBOOK.md).
- Structural debt tracking is owned by [ARCHITECTURE_DEBT_REGISTER.md](./ARCHITECTURE_DEBT_REGISTER.md).

## 1. Objective
Digitize the postgraduate process from ROTT through downstream approvals using canonical data, policy gates, and generated outputs.

## 2. Delivery Status Snapshot
### 2.1 Completed (implemented in code)
- ROTT end-to-end case creation/check/save/submit flow
- Role-based supervision capture (main/admin/co1/co2)
- External registry lookup + invite-based onboarding for missing external people
- Persistent invite lifecycle visibility per role (pending/completed/expired + delivery state)
- Supervisor profile module activation and completion flow (+ CV upload)
- MOU draft module with prefill from ROTT + profiles
- MOU completion writeback to ROTT (`Has the MOU been submitted? = Yes`)
- Printable PDF generation for ROTT and MOU
- To Do aggregation module fed from pending module/profile/invite/notification states
- Env-driven portability for local vs server deployment
- First-slice transition endpoint JWT auth + actor-to-case authorization aligned to authorization matrix
- AD-001 extraction slice completed:
  - transition orchestration extracted to `server/src/services/workflow/titleRegistrationTransitions.ts`
  - PDF generation extracted to `server/src/services/pdf-generation/*`
- AD-002 portability slice completed:
  - removed hard-coded `localhost` fallback for API/artifact links in client runtime
  - links now resolve from `NEXT_PUBLIC_API_BASE` or browser origin
- AD-003 configuration slice completed:
  - root `.env.example` established as authoritative workspace env contract
  - server/client `.env.example` files aligned as synchronized projection templates
- AD-005 legacy-model cleanup completed:
  - removed legacy `phase1_workflows.intention_to_submit_status` schema field from active bootstrap contract
  - retained `410` retirement of legacy phase1 ITS endpoints
- AD-008 test-coverage slice completed:
  - added automated transition gate tests (`titleRegistrationTransitions.test.ts`)
  - added automated PDF smoke tests (`pdfGeneration.test.ts`)
  - wired server test runner (`npm run test --workspace=server`)
  - added integration tests for change-request submit gates + canonical writeback:
    - `CHANGE_TITLE`
    - `CHANGE_SUPERVISOR`
    - `ADD_CO_SUPERVISOR`
  - added Phase-B rework/order/audit assertions for:
    - `INTENTION_TO_SUBMIT`
    - `APPOINT_EXAMINERS`
    - `CHANGE_EXAMINERS`
    - `EXAMINER_SUMMARY_CV`
    - `APPOINT_ARBITER`
  - module-entry audit visibility assertions now included for returned/approved state transitions in integration tests.
- AD-004 authorization + identity hardening closure completed:
  - enforced explicit route-role authorization middleware on non-workflow route families (`directory`, `sasi`, and legacy `title-registration`)
  - completed authenticated route-surface coverage with role-based deny/audit behavior
  - finalized production identity/CORS startup guardrails:
    - production requires `AUTH_PROVIDER=trusted_header`
    - production requires explicit `CORS_ALLOWED_ORIGINS`
    - trusted-header shared-secret + trusted-proxy-IP requirements enforced
  - synchronized authorization status docs (`AUTHORIZATION_MATRIX.md`) and debt register closure (`ARCHITECTURE_DEBT_REGISTER.md`)
- AD-011 repository hygiene slice completed:
  - explicit ignore contract added for generated/runtime artifacts (`client/.next`, `client/.next_backup*`, `server/dist`, `server/dev.sqlite3`)
  - tracked generated artifacts removed from git index (`--cached`, local files retained)
  - CI guard added (`scripts/check-generated-artifacts.sh`) and wired in `.github/workflows/main.yml`
- AD-015 guidance-artifact governance slice completed:
  - `.md` declared canonical guidance source in index/spec contracts
  - tracked guidance export artifacts removed from git index (`GUIDANCE/*.html`, `GUIDANCE/*_files/**`)
  - guardrail extended to fail CI when generated guidance artifacts are tracked
- AD-019 API-contract/versioning slice completed:
  - added route-derived OpenAPI generator (`server/src/contracts/generateOpenApi.ts`) with canonical artifact `server/openapi/openapi.v1.json`
  - wired `npm run openapi:generate --workspace=server` and root contract check `npm run check:openapi-contract`
  - enforced contract drift check in CI (`scripts/check-openapi-contract.sh`)
  - documented `/api/v1` versioning policy and legacy `410` sunset timeline in `PG_PLATFORM_TECH_SPEC.md`
- AD-025 resilience slice completed:
  - introduced shared retry/degraded-settlement helpers (`server/src/utils/resilience.ts`)
  - replaced fail-fast parallel admin-scope checks with settle-based fallback in workflow/module authorization paths
  - added retry/backoff for critical staff email lookup + SASI API calls
  - hardened operations feed pipeline enrichment to return partial/degraded rows instead of failing full response
- AD-012 UI decomposition slice completed:
  - decomposed dashboard page/panels into bounded components and domain hooks (`page.tsx` reduced from 2411 to 446 lines)
  - split module panel monolith into `PhaseBModulePanels.tsx` + `ChangeRequestModulePanels.tsx`
  - extracted shared panel helpers (`workflowModulePanelTypes.ts`, `moduleFieldRenderers.tsx`, `moduleActionButtons.tsx`)
  - refactored module loading to `moduleLoaders` dispatch map in `useDashboardOrchestration.ts`
  - enforced CI size guardrails for page/hook/panel/helper files (`scripts/check-dashboard-sizes.sh`)
- Post-AD-001 decomposition completed:
  - retained `titleRegistrationWorkflowService.ts` as thin composition façade over bounded services:
    - `server/src/services/rottCaseService.ts`
    - `server/src/services/supervisorProfileService.ts`
    - `server/src/services/mouService.ts`
    - `server/src/services/operationsFeedService.ts`
  - added CI-enforced service-boundary guardrail (`scripts/check-service-boundaries.sh`) to prevent façade re-monolithization.
- Supervisor-role refactor pass completed:
  - refactored remaining role-branch review routing in `useDashboardPhaseBModules.ts` to role-handler maps for symmetric supervisor/dept/chair/faculty dispatch.
  - refactored external academic role lookup dispatch in `useDashboardCoreCase.ts` to role-map patch/persist wiring for supervisor/admin/co1/co2 parity.
  - validated with `npm --prefix client run build` and `npm --prefix server test`.
- UI consistency pass across active forms completed:
  - introduced shared form style contract in `client/components/ui/formFieldStyles.ts` and reused it across dashboard and ROTT form components.
  - standardized control styling/label treatment in active form surfaces:
    - `client/app/dashboard/components/WorkflowSupportPanels.tsx`
    - `client/app/dashboard/components/moduleFieldRenderers.tsx`
    - `client/app/title-registration/components/TitleRegistrationModule.tsx`
    - `client/app/title-registration/components/SupervisorRoleCard.tsx`
    - `client/app/title-registration/components/ExternalRegistryLookup.tsx`
    - `client/app/title-registration/components/ExternalInviteModal.tsx`
  - aligned form container/control contrast in supervisor profile cards to match active module form conventions.
- Regression checks for Phase A coherence/compliance completed:
  - added `server/src/services/rottRegressionChecks.test.ts` covering:
    - save/prefill coherence for ROTT immutable vs editable fields,
    - external invite completion synchronization into canonical case form fields,
    - PDF regeneration parity signal against persisted DB form-state changes.
  - validated in `server` test suite (`npm --prefix server test`).
- Phase-B next-wave modules baseline implementation completed:
  - completed baseline module surfaces and orchestration for:
    - `INTENTION_TO_SUBMIT`
    - `APPOINT_EXAMINERS`
    - `CHANGE_TITLE`
    - `CHANGE_SUPERVISOR`
    - `ADD_CO_SUPERVISOR`
    - `CHANGE_EXAMINERS`
    - `EXAMINER_SUMMARY_CV`
    - `APPOINT_ARBITER`
  - verified role-scoped state-machine routes and module cards remain wired to canonical service endpoints.
  - extended E2E/UI coverage (`e2e/phaseb-modules.spec.ts`) for:
    - module panel/status rendering on active baseline tabs,
    - explicit prerequisite guard behavior for blocked next-wave modules,
    - UI stability when opening blocked module tabs.
- AD-013 migration-first schema tranche completed:
  - introduced consolidated schema migration `server/src/db/migrations/20260310152000_consolidate_workflow_schema.ts`
  - reduced `server/src/db/initDb.ts` to migration runner + idempotent seed orchestration
  - added explicit migration execution command `npm run db:migrate --workspace=server` via `server/src/db/runMigrations.ts`
  - extracted seed implementation to `server/src/db/seedDemoData.ts`; `initDb.ts` now remains migration + seed wiring orchestration only
  - documented mandatory migration run order in `PG_PLATFORM_TECH_SPEC.md` and `WORKFLOW_ORCHESTRATION_RUNBOOK.md`
- Documentation synchronization across guidance/policy artifacts completed:
  - synchronized closure/state tracking across:
    - `PROJECT_IMPLEMENTATION_PLAN.md`
    - `ARCHITECTURE_DEBT_REGISTER.md`
    - `E2E_REGRESSION_STRATEGY.md`
  - aligned in-progress backlog so `2.3` is the sole next-iteration execution queue.

### 2.2 In progress
- None (closed on 2026-03-11).

### 2.3 Next Iteration (tomorrow)
- Remaining change/progression forms from `ridiculous_forms`

## 3. Execution Guardrails
1. Follow policy and mapping owners before implementation:
- [POLICY_RULEBOOK.md](./POLICY_RULEBOOK.md)
- [POLICY_FIELD_MAP.md](./POLICY_FIELD_MAP.md)

2. Enforce technical portability and integration contracts:
- [PG_PLATFORM_TECH_SPEC.md](./PG_PLATFORM_TECH_SPEC.md)

3. Execute delivery flow and release checks:
- [WORKFLOW_ORCHESTRATION_RUNBOOK.md](./WORKFLOW_ORCHESTRATION_RUNBOOK.md)
- [REGRESSION_CHECKLIST.md](./REGRESSION_CHECKLIST.md)

## 4. Current Roadmap
### Phase A (stabilize current wave)
- Completed 2026-03-11: supervisor-role refactor pass.
- Completed 2026-03-11: UI consistency pass across all active forms.
- Completed 2026-03-11: regression checks added for:
  - save/prefill coherence
  - invite completion synchronization
  - PDF content parity with DB state.

Exit criteria:
- No known behavior drift between policy docs and live ROTT/profiles/MOU flows.

### Phase B (next-wave form buildout)
- Build `INTENTION_TO_SUBMIT` from canonical ROTT/MOU/profile state.
- Build examiner appointment/change chain with registry-linked identities.
- Build examiner summary/arbiter modules with conflict/capacity gates.

Exit criteria:
- first examination-focused workflow chain runs end-to-end with route gating.

### Phase C (progression + exception modules)
- Implement progression modules:
  - progress reports
  - leave/readmission
  - upgrade
  - summative report
  - other requests.

Exit criteria:
- full module registry represented in system with policy-level skeletons and active routing.

## 5. Operational Metrics
- ROTT-to-MOU readiness cycle time
- First-pass validation pass rate (no correction loop)
- External invite completion rate and turnaround
- Profile completion latency by role
- PDF regeneration consistency incidents (target: zero)
- Service-layer regression escape rate after refactors (target: zero)

## 6. Immediate Next Actions
1. Completed 2026-03-10 (AD-012): decomposed dashboard page/orchestration/module panels into bounded components/hooks and enforced CI size guardrails.
2. Completed 2026-03-10 (AD-013): migrated canonical schema evolution to versioned migrations, reduced `initDb` to orchestration-only, and documented migration run order.
3. Completed 2026-03-10 (AD-014): introduced registry-driven module lifecycle primitives to remove repeated save/submit/review/print orchestration logic across module services.
4. Completed 2026-03-11 (AD-004): finalized route-surface authorization parity and production identity-provider guardrails; AD-004 moved to Closed in the debt register.
5. Completed 2026-03-10 (AD-017): deployed zod-based request boundary validation middleware/schemas across auth, workflow, directory, SASI, and legacy phase1/title-registration route surfaces.
6. Completed 2026-03-10 (AD-016): expanded server coverage with controller smoke, middleware auth/validation, and API route smoke tests alongside existing service-level tests.
7. Completed 2026-03-10 (AD-018): standardized controller error handling via centralized error classes/middleware and structured logging with unified `{ message, code, details }` responses.
8. Completed 2026-03-10 (AD-010): eliminated client/server DTO enum drift by moving shared workflow contract types to `@fhd/common-types` and wiring both server/client to the shared canonical source.
9. Completed 2026-03-10 (AD-007): finalized service-boundary decomposition with `rottCaseService`, `mouService`, and `supervisorProfileService`, leaving `titleRegistrationWorkflowService.ts` as composition façade.
10. Completed 2026-03-11: finalized supervisor-role symmetry refactor in dashboard hook wiring (`useDashboardPhaseBModules.ts`, `useDashboardCoreCase.ts`) and validated with full server tests plus client production build.
11. Completed 2026-03-11: closed Post-AD-001 decomposition stream by adding CI service-boundary guardrails (`scripts/check-service-boundaries.sh`) and wiring them into `.github/workflows/main.yml`.
12. Completed 2026-03-11: closed Phase-B next-wave modules baseline stream and extended E2E/UI regressions with prerequisite-guard and panel-telemetry coverage (`e2e/phaseb-modules.spec.ts`).
