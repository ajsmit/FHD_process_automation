# Next Iteration Execution Set (2026-03-13)

Status: Completed (Sections 1-5 completed on 2026-03-13)  
Owner: Post-Phase-C closure stream

## Objective
Stabilize and operationalize the newly completed progression + exception implementation with deterministic regression behavior and stricter role-accurate UI coverage.

## Scope and Sequence

### 1. E2E Determinism and Data Isolation
1. Remove hidden dependency on persisted local `dev.sqlite3` state for UI regressions.
2. Ensure each transactional regression flow can bootstrap its own prerequisites deterministically (or explicitly validate fallback state without false failures).
3. Eliminate flaky baseline assumptions across reruns.

Acceptance criteria:
- Repeated `npm run test:e2e:ui` runs pass consistently without manual DB cleanup.
- No test relies on incidental prior state to pass.

### 2. Role-Accurate UI Regression Expansion
1. Add explicit role-path assertions for progression lifecycle where applicable:
- student authoring flows,
- supervisor-only edit/submit gate checks,
- dept/faculty review transitions.
2. Keep UI assertions focused on state/authorization outcomes, not brittle copy snapshots.

Acceptance criteria:
- At least one deterministic UI regression asserts unauthorized edit/submit rejection for each restricted role path.
- Transactional flows remain green in CI/local run.

Completion note (2026-03-13):
- Added deterministic role-gate UI/API regressions in `e2e/phaseb-modules.spec.ts`:
  - supervisor-only review rejection for `CHANGE_TITLE` when attempted by student actor.
  - dept/faculty review rejection matrix for `PROGRESS_REPORT` (student/supervisor/dept mismatches where applicable).
- Added isolated seeded demo student identities for role-gate transactional tests in `server/src/db/seedDemoData.ts`.
- Verified deterministic reruns with two consecutive full executions of `npm run test:e2e:ui` (both fully passing).

### 3. Operations Feed Behavior Hardening
1. Verify pipeline/tasks/to-do behavior remains coherent under mixed module states and multiple active cases.
2. Add edge-case regressions for summary/status category parity under returned/rework loops.

Acceptance criteria:
- Operational surfaces remain consistent with `module_entries` source-of-truth state.
- Returned states appear as `action_required` across all relevant surfaces.

Completion note (2026-03-13):
- Added mixed-state regression in `server/src/services/workflow/changeRequestModulesService.test.ts`:
  - `operations feed keeps case-scoped status parity across mixed leave states`.
- New assertions verify simultaneous `leave_of_absence` states across two active cases:
  - one case `action_required` (returned),
  - one case `in_progress` (awaiting review),
  - parity confirmed in `pipeline`, `tasks` (case_id-scoped rows), and `to-do`.
- Validated with `npm run test:server` (full suite passing).

### 4. Artifact and Workspace Hygiene
1. Keep generated UI artifacts out of version-control noise (`test-results`, `playwright-report`, temporary traces).
2. Confirm no generated-artifact drift is introduced by expanded regression runs.

Acceptance criteria:
- Working tree remains clean after full regression execution except intentional source changes.

Completion note (2026-03-13):
- Extended ignore contract in `.gitignore` for Playwright runtime artifact variants:
  - `/blob-report`
  - `/.playwright`
  - `/.cache/ms-playwright`
- Re-ran `npm run test:e2e:ui` and confirmed no tracked/untracked VCS noise from UI artifact directories.

### 5. Documentation and Status Sync
1. Update guidance docs after closure:
- `PROJECT_IMPLEMENTATION_PLAN.md`
- `E2E_REGRESSION_STRATEGY.md`
- `REGRESSION_CHECKLIST.md` (if command/order changes)
2. Regenerate OpenAPI if any API-facing changes are introduced.

Acceptance criteria:
- No guidance drift between implemented behavior and documented execution protocol.

Completion note (2026-03-13):
- Updated implementation/status guidance to reflect closure:
  - `PROJECT_IMPLEMENTATION_PLAN.md`
  - `E2E_REGRESSION_STRATEGY.md`
  - `REGRESSION_CHECKLIST.md`
- Closed the reliability/operationalization execution set in plan status tracking.
- OpenAPI regeneration intentionally skipped for this section because no API route/contract surface changed.

## Validation Commands (End of Tranche)
Run in this order:
1. `npm run -w server build`
2. `npm run -w server test`
3. `npm run -w client build`
4. `npm run test:e2e:ui`
5. `npm run -w server openapi:generate` (if API contract touched)
6. `git diff -- server/openapi/openapi.v1.json` (expected/intentional drift only)

## Checkpoint Protocol
1. Create a scoped checkpoint commit after Sections 1-2.
2. Create a scoped checkpoint commit after Sections 3-4.
3. Final sync commit for Section 5 (docs/contracts).
4. Push each validated checkpoint to `origin/main`.

## Out-of-Scope
- Net-new module implementation beyond current Phase-B/Phase-C set.
- Auth model redesign or role schema changes outside regression determinism needs.
