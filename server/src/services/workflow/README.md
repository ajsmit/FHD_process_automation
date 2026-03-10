# Workflow Service Package (Planned Extraction)

Status: Placeholder directory.

Current state:
- Workflow orchestration logic is still concentrated in `../titleRegistrationWorkflowService.ts`.

Target state:
- Move case orchestration/state transition logic into focused modules under this directory.
- Keep `titleRegistrationWorkflowService.ts` as a composition/façade entrypoint.

Suggested first extraction units:
- `titleRegistrationCaseWorkflow.ts`
- `supervisorProfileWorkflow.ts`
- `mouWorkflow.ts`
