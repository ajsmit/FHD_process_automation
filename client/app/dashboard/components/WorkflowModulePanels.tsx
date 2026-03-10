import { ChangeRequestModulePanels } from './ChangeRequestModulePanels';
import { PhaseBModulePanels } from './PhaseBModulePanels';
import type { WorkflowModulePanelsProps } from './workflowModulePanelTypes';

export function WorkflowModulePanels(props: WorkflowModulePanelsProps) {
  return (
    <>
      <PhaseBModulePanels {...props} />
      <ChangeRequestModulePanels {...props} />
    </>
  );
}
