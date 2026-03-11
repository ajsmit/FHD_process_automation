# GUIDANCE Index And Ownership Matrix

Version: 2026-03-10
Status: Active
Purpose: Keep GUIDANCE docs mutually supporting, non-redundant, and easy to maintain.

## 0. Canonical Location Rule
1. `GUIDANCE/` is the canonical documentation set for project policy/architecture/planning.
2. Parallel documentation trees (for example a separate `docs/` mirror) are not permitted.
3. If auxiliary notes are needed, they must be linked from this index and must not duplicate owner-document content.
4. Markdown (`.md`) files are canonical/editable guidance sources; HTML exports in `GUIDANCE/` are generated artifacts and must not be tracked in git.

## 1. Source-Of-Truth Allocation
1. `POLICY_RULEBOOK.md`
- Policy doctrine, lifecycle gates, dependency doctrine, role/state policy, and module-level policy intent.

2. `POLICY_FIELD_MAP.md`
- Field-level canonical key mappings, source authority, save/submit rules, and propagation targets.

3. `PG_PLATFORM_TECH_SPEC.md`
- Implemented runtime architecture: tables, routes, integration contracts, and known technical gaps.

4. `PROJECT_IMPLEMENTATION_PLAN.md`
- Delivery status, phased roadmap, metrics, and prioritized next actions.

5. `UI_DESIGN_GOALS.md`
- UI system contract (layout, interaction, accessibility/clarity expectations, module UI patterns).

6. `WORKFLOW_ORCHESTRATION_RUNBOOK.md`
- End-to-end implementation orchestration across policy, mapping, code, QA, and release.

7. `REGRESSION_CHECKLIST.md`
- Standard regression checks that must pass before release/merge.

8. `ARCHITECTURE_DEBT_REGISTER.md`
- Tracked structural/maintainability debt with priority and closure targets.

9. `AUTHORIZATION_MATRIX.md`
- Required role-to-endpoint authorization baseline for server-side workflow enforcement.

10. `E2E_REGRESSION_STRATEGY.md`
- E2E/UI regression rationale, scope, and maintenance rules for Playwright-based release safety checks.

## 2. Non-Redundancy Rules
1. Do not duplicate full policy prose outside `POLICY_RULEBOOK.md`; reference it.
2. Do not duplicate field mapping tables outside `POLICY_FIELD_MAP.md`; reference it.
3. Do not duplicate endpoint/table inventory outside `PG_PLATFORM_TECH_SPEC.md`; reference it.
4. Do not duplicate UI pattern contracts outside `UI_DESIGN_GOALS.md`; reference it.
5. Keep each doc concise by linking to the owner document for shared concerns.

## 3. Update Protocol
When behavior changes:
1. Update code.
2. Update the owning guidance document from Section 1.
3. Update any dependent guidance docs with cross-reference-only deltas.
4. Run `REGRESSION_CHECKLIST.md`.
5. Record significant changes in `memory/YYYY-MM-DD.md`.
