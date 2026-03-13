# E2E Regression Strategy (Playwright)

## Purpose
This document explains why and how the E2E/UI regression suite was introduced, and how to maintain it without reintroducing brittle tests.

## Why This Exists
- Protect end-user workflows from regressions that unit/service tests cannot detect.
- Validate UI behavior against real API responses and persisted database state.
- Cover known high-risk sync paths:
  - save/prefill coherence,
  - invite completion synchronization,
  - external invite edge handling,
  - co-supervisor count guard behavior,
  - annual deadline + progress-report warning visibility,
  - ROTT post-approval immutability enforcement.

## Scope of Current Suite
File: `e2e/ui-regressions.spec.ts`

Covered scenarios:
- Invalid SASI lookup shows a clear failure state.
- Save/prefill coherence persists editable values and sanitizes thesis title formatting.
- Faculty process calendar and annual progress-report warning are visible before progression actions.
- Co-supervisor count edge guard rejects invalid direct jump from 0 to 2.
- External invite completion synchronizes invite status and case form data.
- External invite page handles invalid token and invalid SA ID validation.
- Phase-B next-wave module regressions:
  - INTENTION_TO_SUBMIT panel/status telemetry load checks.
  - APPOINT_EXAMINERS / CHANGE_EXAMINERS / EXAMINER_SUMMARY_CV / APPOINT_ARBITER prerequisite-guard API assertions.
  - UI stability checks while opening blocked Phase-B module tabs.
  - CHANGE_TITLE / CHANGE_SUPERVISOR / ADD_CO_SUPERVISOR panel/status load checks.
- Progression/exception module panel regressions:
  - PROGRESS_REPORT / LEAVE_OF_ABSENCE / READMISSION_REQUEST panel/status load checks.
  - UPGRADE_MSC_TO_PHD / SUPERVISOR_SUMMATIVE_REPORT / OTHER_REQUEST panel/status load checks.
- Progression transactional UI/API regressions (`e2e/phaseb-modules.spec.ts`):
  - `PROGRESS_REPORT` approval-path status telemetry parity checks.
  - `UPGRADE_MSC_TO_PHD` approval-path status telemetry parity checks.
  - `LEAVE_OF_ABSENCE` return-and-resubmit path checks.
  - `SUPERVISOR_SUMMATIVE_REPORT` prerequisite/role-gate UI stability checks.
  - explicit role authorization gate regressions:
    - `CHANGE_TITLE` supervisor-review rejection for student actor + supervisor acceptance path,
    - `PROGRESS_REPORT` dept/faculty review endpoint rejection matrix for unauthorized actors.
- Policy administration regressions (`e2e/admin-policy.spec.ts`):
  - faculty annual calendar update flow on `/admin-policy`,
  - landing-page visibility parity for updated current-year faculty notice,
  - department message publish flow and downstream landing visibility,
  - unauthorized student write-path rejection on policy-admin endpoints.

Companion server lifecycle regressions (kept alongside workflow integration tests):
- File: `server/src/services/workflow/changeRequestModulesService.test.ts`
- Added ITS prerequisite hardening coverage:
  - rejects `INTENTION_TO_SUBMIT` creation until `PROGRESS_REPORT` is submitted.
- File: `server/src/services/rottRegressionChecks.test.ts`
- Added canonical immutability + calendar warning coverage:
  - direct ROTT edit is rejected after Faculty approval,
  - case lookup payload includes annual Faculty calendar + progress-report due warning.
- Added progression coverage for `PROGRESS_REPORT`:
  - prefill coherence from canonical ROTT data,
  - submit -> dept -> faculty approval path,
  - review-order gate enforcement and return/resubmit cycle.
- Added progression coverage for `LEAVE_OF_ABSENCE`:
  - prefill coherence from canonical ROTT data,
  - submit -> dept -> faculty approval path,
  - prerequisite rejection before `PROGRESS_REPORT` submission,
  - review-order gate enforcement and return/resubmit cycle.
- Added progression coverage for `READMISSION_REQUEST`:
  - prefill coherence from canonical ROTT data,
  - submit -> dept -> faculty approval path,
  - prerequisite rejection before `LEAVE_OF_ABSENCE` submission,
  - review-order gate enforcement and return/resubmit cycle.
- Added progression coverage for `UPGRADE_MSC_TO_PHD`:
  - prefill coherence from canonical ROTT data,
  - submit -> dept -> faculty approval path,
  - prerequisite rejection for non-MSc/non-Masters baseline and for missing `PROGRESS_REPORT`,
  - review-order gate enforcement and return/resubmit cycle.
- Added progression coverage for `SUPERVISOR_SUMMATIVE_REPORT`:
  - supervisor-authored submit/dept/faculty approval path,
  - prerequisite rejection before ITS/examiner-context readiness,
  - supervisor edit-role enforcement and return/resubmit cycle.
- Added progression coverage for `OTHER_REQUEST`:
  - prefill coherence from canonical ROTT data,
  - submit -> dept -> faculty approval path,
  - review-order gate enforcement and return/resubmit cycle.
- Added operations-feed regression coverage for progression modules:
  - `pipeline` case visibility,
  - `tasks`/`to-do` module surfacing as `in_progress`,
  - `action_required` propagation on returned states.
  - mixed same-module cross-case parity:
    - simultaneous `leave_of_absence` states (`action_required` vs `in_progress`) remain case-scoped and correctly reflected across `pipeline`/`tasks`/`to-do`.
- Added progression module PDF parity regressions:
  - regenerated module PDFs for all six progression/exception modules after persisted form-data changes,
  - asserted artifact refresh behavior (stable path with updated output metadata).
- Added policy administration service regressions:
  - file: `server/src/services/policyAdministrationRegression.test.ts`
  - annual faculty calendar update/read-back round-trip coverage,
  - landing-message role/scope authorization coverage.
- Added policy endpoint route/controller smoke regressions:
  - file: `server/src/api/v1/routes/routesSmoke.test.ts`
  - calendar and landing-message endpoint success/validation/authorization coverage.

## Design Principles Applied
- Prefer stable selectors (`role`, `label`, heading-scoped sections) over brittle text snapshots.
- Use unique test data (timestamped emails) to avoid collisions across repeated runs.
- For async backend transitions, use bounded polling with explicit timeout and clear failure message.
- Verify synchronization via API state when the intent is data coherence, not visual copy text.
- Keep tests independent and resilient to shared local state where possible.

## Environment and Runtime
Playwright config: `playwright.config.ts`

Current runtime characteristics:
- Chromium-only project for deterministic UI baseline.
- Single worker (`workers: 1`) to reduce nondeterministic cross-test interference.
- Local web servers auto-started for client/server.
- Artifacts retained on failure (`trace`, `video`, `screenshot`).
- `reuseExistingServer: false` to avoid accidental reuse of misconfigured local processes.
- elevated auth test rate-limit allowance in Playwright server env (`AUTH_RATE_LIMIT_MAX_REQUESTS=500`) to avoid false negatives from frequent dev-login calls during suite execution.

## Commands
- UI E2E only:
  - `npm run test:e2e:ui`
- Full regression chain (server tests + E2E + client build):
  - `npm run test:full-regression`

## Known Operational Constraint
Because `reuseExistingServer` is disabled, local ports must be available:
- `3000` (client)
- `3001` (server)

If occupied, stop the conflicting processes and rerun tests.

## Maintenance Rules
- When changing labels/field names, update E2E selectors and assertions in the same tranche.
- When introducing new workflow states, add at least one edge-case E2E assertion for each new gate/transition.
- Keep this suite focused on business-critical user journeys; avoid visual-only assertions unless required.
- If a regression check duplicates a robust service-level test, keep E2E assertion minimal and integration-focused.
