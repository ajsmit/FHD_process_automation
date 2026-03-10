# Workflow Orchestration Runbook

Version: 2026-03-09
Status: Active
Scope: Practical orchestration of design, policy, engineering, and rollout for module delivery.

## 1. Purpose
Provide one operational playbook for how work moves from policy intent to implemented workflow without drift.

## 2. Required Inputs Before Building A Module
1. Policy intent and gates: `POLICY_RULEBOOK.md`.
2. Field-level mappings: `POLICY_FIELD_MAP.md`.
3. Technical constraints/current architecture: `PG_PLATFORM_TECH_SPEC.md`.
4. Current phase priorities: `PROJECT_IMPLEMENTATION_PLAN.md`.
5. UI contract: `UI_DESIGN_GOALS.md`.

## 3. Build Sequence (Mandatory)
1. Confirm module dependency prerequisites and entry gates.
2. Define canonical payload schema (no alias keys).
3. Implement prefill adapters from authoritative sources.
4. Implement save/submit validation gates.
5. Implement transitions/notifications/audit side effects.
6. Implement UI with explicit read-only/required/derived cues.
7. Implement PDF/document generation from canonical DB payload.
8. Execute `REGRESSION_CHECKLIST.md`.
9. Update guidance docs and changelog notes.

## 4. Change Classes And Required Artifacts
1. Policy change:
- update `POLICY_RULEBOOK.md`,
- update affected rows in `POLICY_FIELD_MAP.md`,
- update implementation plan impact.

2. Field/label change:
- update DB/API/UI/PDF mapping in one cycle,
- update `POLICY_FIELD_MAP.md`,
- run full regression.

3. Technical integration change:
- update `PG_PLATFORM_TECH_SPEC.md` env/contracts/routes,
- verify local/production parity.

4. UI contract change:
- update `UI_DESIGN_GOALS.md`,
- verify repeated role blocks remain symmetric.

## 5. Orchestration Gates (Definition Of Done)
1. Policy gate: no conflict with rulebook.
2. Mapping gate: canonical keys and labels aligned across API/UI/PDF.
3. Technical gate: no broken route/table assumptions.
4. UX gate: UI cues and conditional behavior remain coherent.
5. Regression gate: checklist passes for save/prefill/route/PDF/invite flows.
6. Documentation gate: owning docs updated and cross-references intact.

## 6. Weekly Control Loop
1. Reconcile code vs guidance drift.
2. Prioritize gaps from `PROJECT_IMPLEMENTATION_PLAN.md`.
3. Close one high-risk regression gap per cycle.
4. Promote stable module behavior to baseline policy/mapping docs.
