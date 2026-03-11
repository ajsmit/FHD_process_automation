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
  - co-supervisor count guard behavior.

## Scope of Current Suite
File: `e2e/ui-regressions.spec.ts`

Covered scenarios:
- Invalid SASI lookup shows a clear failure state.
- Save/prefill coherence persists editable values and sanitizes thesis title formatting.
- Co-supervisor count edge guard rejects invalid direct jump from 0 to 2.
- External invite completion synchronizes invite status and case form data.
- External invite page handles invalid token and invalid SA ID validation.

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
