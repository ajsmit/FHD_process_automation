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
- AD-004 security-coverage slice completed (partial):
  - protected key non-transition workflow endpoints with JWT + workflow authorization middleware
  - added case-scoped/profile-scoped authz checks for workflow operations

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
  - `CHANGE_EXAMINERS`
  - `EXAMINER_SUMMARY_CV`
  - `APPOINT_ARBITER`
  - implemented with canonical tables + prefill + prerequisite gates + save/submit endpoints + UI draft cards

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
1. Finish role-symmetric refactor in ROTT supervisor cards and supporting mapping logic.
2. Complete UI-contract rollout (`1/6/12` grid + required cues + section headers) in active modules.
3. Start `INTENTION_TO_SUBMIT` module implementation from current canonical fields/tables.
4. Extend Phase-B next-wave modules from student-draft baseline to full role approval state machines.
5. Complete post-AD-001 decomposition (contracts extraction + bounded service split + tests).
6. Extend JWT/identity-bound authorization coverage beyond transition endpoints, including module operations and read APIs by role.
7. Replace dev-login simulation path with production identity provider/session model.
8. Add module-level regression checklist to CI/manual release gate.
