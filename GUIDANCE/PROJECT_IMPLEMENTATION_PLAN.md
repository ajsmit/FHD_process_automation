# PG Workflow Platform Implementation Plan

Version: 2026-03-10  
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
- AD-004 security-coverage slice completed (partial):
  - protected key non-transition workflow endpoints with JWT + workflow authorization middleware
  - added case-scoped/profile-scoped authz checks for workflow operations
  - expanded JWT enforcement to previously open internal route families:
    - `/api/v1/directory/{departments,staff,external-academics,external-supervisors,external-academics/invite}`
    - `/api/v1/sasi/students/search`
    - `/api/v1/title-registrations/*`
  - aligned disabled dev-login behavior to `404 Not Found` when `ENABLE_DEV_AUTH=false`
  - added auth endpoint rate limiting (`AUTH_RATE_LIMIT_WINDOW_MS`, `AUTH_RATE_LIMIT_MAX_REQUESTS`) on `/api/v1/auth/dev-login`
  - replaced permissive CORS with environment-driven allowlist (`CORS_ALLOWED_ORIGINS`) in server bootstrap
- AD-011 repository hygiene slice completed:
  - explicit ignore contract added for generated/runtime artifacts (`client/.next`, `client/.next_backup*`, `server/dist`, `server/dev.sqlite3`)
  - tracked generated artifacts removed from git index (`--cached`, local files retained)
  - CI guard added (`scripts/check-generated-artifacts.sh`) and wired in `.github/workflows/main.yml`
- AD-015 guidance-artifact governance slice completed:
  - `.md` declared canonical guidance source in index/spec contracts
  - tracked guidance export artifacts removed from git index (`GUIDANCE/*.html`, `GUIDANCE/*_files/**`)
  - guardrail extended to fail CI when generated guidance artifacts are tracked
- AD-012 UI decomposition slice completed:
  - decomposed dashboard page/panels into bounded components and domain hooks (`page.tsx` reduced from 2411 to 446 lines)
  - split module panel monolith into `PhaseBModulePanels.tsx` + `ChangeRequestModulePanels.tsx`
  - extracted shared panel helpers (`workflowModulePanelTypes.ts`, `moduleFieldRenderers.tsx`, `moduleActionButtons.tsx`)
  - refactored module loading to `moduleLoaders` dispatch map in `useDashboardOrchestration.ts`
  - enforced CI size guardrails for page/hook/panel/helper files (`scripts/check-dashboard-sizes.sh`)

### 2.2 In progress
- Deep role-symmetric refactor of remaining repeated role logic in UI/controller wiring
- Extended UI consistency rollout (same layout contract across all active forms)
- Documentation synchronization across all guidance/policy artifacts
- Post-AD-001 decomposition:
  - split remaining multi-domain orchestration into bounded services
  - operations/feed domain extracted to `server/src/services/operationsFeedService.ts`
- Full authentication + identity-bound authorization enforcement on remaining unprotected endpoint surface
- Phase-B next-wave modules baseline implementation:
  - `INTENTION_TO_SUBMIT`
  - `APPOINT_EXAMINERS`
  - `CHANGE_TITLE`
  - `CHANGE_SUPERVISOR`
  - `ADD_CO_SUPERVISOR`
  - `CHANGE_EXAMINERS`
  - `EXAMINER_SUMMARY_CV`
  - `APPOINT_ARBITER`
  - implemented with canonical tables + prefill + prerequisite gates + save/submit/review/print endpoints + UI cards
  - now extended with role-scoped approval state machines and printable PDF generation per module
- AD-013 migration-first schema tranche:
  - introduced consolidated schema migration `server/src/db/migrations/20260310152000_consolidate_workflow_schema.ts`
  - reduced `server/src/db/initDb.ts` to migration runner + idempotent seed orchestration
  - added explicit migration execution command `npm run db:migrate --workspace=server` via `server/src/db/runMigrations.ts`
  - extracted seed implementation to `server/src/db/seedDemoData.ts`; `initDb.ts` now remains migration + seed wiring orchestration only
  - documented mandatory migration run order in `PG_PLATFORM_TECH_SPEC.md` and `WORKFLOW_ORCHESTRATION_RUNBOOK.md`

### 2.3 Not started (next-wave modules)
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
- Complete supervisor-role refactor pass.
- Finish UI consistency pass across all active forms.
- Add regression checks for:
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
4. Address AD-004: replace dev-login simulation path with production identity/session model and finish full route-surface authorization parity.
5. Completed 2026-03-10 (AD-017): deployed zod-based request boundary validation middleware/schemas across auth, workflow, directory, SASI, and legacy phase1/title-registration route surfaces.
6. Completed 2026-03-10 (AD-016): expanded server coverage with controller smoke, middleware auth/validation, and API route smoke tests alongside existing service-level tests.
7. Address AD-010: eliminate client/server DTO drift via generated/shared API contracts.
8. Complete post-AD-001 decomposition by splitting remaining `titleRegistrationWorkflowService.ts` bounded domains (ROTT case orchestration vs MOU vs profiles).
