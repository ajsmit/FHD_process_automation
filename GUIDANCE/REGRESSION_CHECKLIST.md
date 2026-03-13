# Regression Checklist

Version: 2026-03-13
Status: Active
Use: Run before merge/release for any workflow-affecting change.

## 1. Canonical Data Integrity
1. Saved form values persist after reload and re-login.
2. Read-only SASI-derived fields cannot be edited.
3. Derived fields update correctly after source changes.
4. No mismatched label/key usage across API/UI/PDF.

## 2. ROTT Workflow
1. Student fetch (`Check SASI`) succeeds for valid seed/API data.
2. Planned format enforces single selection behavior.
3. Supervisor/admin/co1/co2 internal/external toggles render correct fields.
4. External role minimal requester capture is enforced (`Title`, `First Name`, `Surname`, `Email`).
5. Co-supervisor count behavior (0/1/2) is consistent and stable.

## 3. External Invite Flow
1. Registry lookup works by surname/email/identifier.
2. Invite creation persists role-scoped status and link.
3. Invite status remains visible after reload/re-login.
4. Invite completion updates `external_academic_registry`.
5. Invite completion syncs linked ROTT role fields.

## 4. Supervisor Profile + MOU Gates
1. Supervisor profiles activate correctly from active ROTT roles.
2. Profile completion validation behaves as expected (CV/publications/etc.).
3. MOU open action is blocked until ROTT completion is 100%.
4. MOU completion writes back `Has the MOU been submitted? = Yes`.

## 5. PDF/Artifact Consistency
1. Generated ROTT PDF reflects latest persisted values.
2. Generated MOU PDF reflects latest persisted values.
3. No stale values after edits and re-generation.
4. Artifact URLs resolve correctly for current environment.

## 6. Operational Feed
1. To Do feed includes pending modules.
2. To Do feed includes pending invites.
3. To Do feed includes queued/failed notifications.
4. Returned module states surface as `action_required` in `tasks` and `to-do`.
5. Mixed same-module states across active cases remain case-scoped (no status bleed between cases).

## 7. Environment Portability
1. Local mode works with SQLite + local SASI provider.
2. Production-mode config path works with env-driven DB/SASI settings.
3. No hard-coded localhost assumptions in production code paths.

## 8. Authentication And Authorization (Required Before Production)
1. Unauthenticated requests to protected workflow endpoints are rejected.
2. Authenticated actors can invoke only the endpoints allowed by role matrix.
3. Role-transition endpoints enforce case-stage + actor-role constraints.
4. Tokenized external invite endpoints remain scoped to invite token semantics only.

## 9. Deterministic Regression Protocol
1. UI regression suite passes on consecutive executions without manual DB cleanup.
2. Regression runs do not leave tracked/untracked generated artifact noise.
