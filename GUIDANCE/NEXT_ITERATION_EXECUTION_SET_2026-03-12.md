# Next Iteration Execution Set (2026-03-12 Morning)

Status: Planned  
Owner: Implementation stream after `2.3` closure

## Objective
Harden and close parity gaps for the newly baseline-implemented progression/exception modules:
- `PROGRESS_REPORT`
- `LEAVE_OF_ABSENCE`
- `READMISSION_REQUEST`
- `UPGRADE_MSC_TO_PHD`
- `SUPERVISOR_SUMMATIVE_REPORT`
- `OTHER_REQUEST`

## Scope and Sequence

### 1. Policy/Rule Parity Hardening
1. Implement module-specific prerequisite gates in progression service where policy already defines dependency:
- `LEAVE_OF_ABSENCE` requires prior `PROGRESS_REPORT` submitted/approved context.
- `READMISSION_REQUEST` requires prior `LEAVE_OF_ABSENCE` submitted/approved context.
- `UPGRADE_MSC_TO_PHD` requires MSc context + progress evidence gate.
- `SUPERVISOR_SUMMATIVE_REPORT` requires progression/ITS/exam-outcome readiness context.
2. Keep role gates explicit and symmetric with route authorization:
- student-edit modules remain student edit/submit.
- `SUPERVISOR_SUMMATIVE_REPORT` remains supervisor edit/submit.
- dept/faculty review chain remains canonical.

Acceptance criteria:
- Wrong-order access returns deterministic 400-series messages matching module-gate intent.
- Existing approved paths remain unchanged.

### 2. To-Do/Operations Feed Integration for New Modules
1. Ensure `module_entries` status lifecycle for all six modules is surfaced consistently in:
- pipeline,
- tasks,
- to-do.
2. Validate summary text and status category parity (`in_progress`, `action_required`, `approved`).

Acceptance criteria:
- each module appears in operational surfaces when active.
- return states appear as `action_required`.

### 3. PDF/Form Parity Hardening
1. Validate generated PDF payloads for the six modules against persisted DB values.
2. Standardize module titles/subtitles and key field ordering where currently generic.

Acceptance criteria:
- printed artifacts reflect canonical DB payload fields (no stale client-only state).
- no regressions in existing ROTT/MOU/Phase-B PDF paths.

### 4. UI Workflow Regressions Expansion (Beyond Panel-Load)
1. Extend Playwright coverage from panel visibility to transactional module behavior:
- edit + submit + dept review + faculty review happy path for at least:
  - `PROGRESS_REPORT`
  - `UPGRADE_MSC_TO_PHD`
2. Add one return-and-resubmit UI path for:
- `LEAVE_OF_ABSENCE` or `READMISSION_REQUEST`.
3. Add one supervisor-role UI flow for:
- `SUPERVISOR_SUMMATIVE_REPORT`.

Acceptance criteria:
- at least 4 new UI flows pass deterministically in CI/local run.
- failures produce actionable traces/screenshots.

### 5. Documentation and Contract Sync
1. Update guidance docs after hardening closure:
- `PROJECT_IMPLEMENTATION_PLAN.md`
- `E2E_REGRESSION_STRATEGY.md`
- `POLICY_FIELD_MAP.md` (module field map stubs -> expanded mappings where finalized)
2. Regenerate and commit API contract:
- `server/openapi/openapi.v1.json`

Acceptance criteria:
- no doc drift between implemented behavior and plan/policy references.
- OpenAPI regeneration produces no uncommitted drift after final run.

## Validation Commands (End of Tranche)
Run in this order:
1. `npm run -w server build`
2. `npm run -w server test`
3. `npm run -w client build`
4. `npm run test:e2e:ui`
5. `npm run -w server openapi:generate`
6. `git diff -- server/openapi/openapi.v1.json` (should be expected/intentional only)

## Checkpoint Protocol
1. Create a scoped checkpoint commit after Sections 1-2.
2. Create a scoped checkpoint commit after Sections 3-4.
3. Final sync commit for Section 5 + regenerated OpenAPI and guidance updates.
4. Push each validated checkpoint to `origin/main`.

## Out-of-Scope for This Morning
- New net-new modules beyond the six listed above.
- Major redesign of auth/session model (already closed in debt register scope).
- Non-critical visual restyling not tied to workflow correctness.
