#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

STATUS=0

check_max_lines() {
  local file="$1"
  local max="$2"

  if [[ ! -f "$file" ]]; then
    echo "Missing file for size guard: $file"
    STATUS=1
    return
  fi

  local lines
  lines=$(wc -l < "$file")
  lines=$(echo "$lines" | tr -d '[:space:]')

  if (( lines > max )); then
    echo "Size guard failed: $file has $lines lines (max $max)."
    STATUS=1
  else
    echo "Size guard passed: $file has $lines lines (max $max)."
  fi
}

check_max_lines "client/app/page.tsx" 600
check_max_lines "client/app/dashboard/hooks/useDashboardOrchestration.ts" 450
check_max_lines "client/app/dashboard/hooks/useDashboardCoreCase.ts" 900
check_max_lines "client/app/dashboard/hooks/useDashboardProfilesMou.ts" 320
check_max_lines "client/app/dashboard/hooks/useDashboardPhaseBModules.ts" 900
check_max_lines "client/app/dashboard/hooks/useDashboardOpsFeeds.ts" 200
check_max_lines "client/app/dashboard/components/WorkflowModulePanels.tsx" 120
check_max_lines "client/app/dashboard/components/PhaseBModulePanels.tsx" 500
check_max_lines "client/app/dashboard/components/ChangeRequestModulePanels.tsx" 350
check_max_lines "client/app/dashboard/components/workflowModulePanelTypes.ts" 120
check_max_lines "client/app/dashboard/components/moduleFieldRenderers.tsx" 140
check_max_lines "client/app/dashboard/components/moduleActionButtons.tsx" 120

if (( STATUS != 0 )); then
  echo "Dashboard size guardrails failed (AD-012)."
  exit 1
fi

echo "Dashboard size guardrails passed (AD-012)."
