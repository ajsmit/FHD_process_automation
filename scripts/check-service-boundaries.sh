#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

STATUS=0
FACADE_FILE="server/src/services/titleRegistrationWorkflowService.ts"
MAX_FACADE_LINES=220

if [[ ! -f "$FACADE_FILE" ]]; then
  echo "Missing service facade file: $FACADE_FILE"
  exit 1
fi

line_count=$(wc -l < "$FACADE_FILE")
line_count=$(echo "$line_count" | tr -d '[:space:]')
if (( line_count > MAX_FACADE_LINES )); then
  echo "Service boundary failed: $FACADE_FILE has $line_count lines (max $MAX_FACADE_LINES)."
  STATUS=1
else
  echo "Service boundary passed: $FACADE_FILE has $line_count lines (max $MAX_FACADE_LINES)."
fi

if rg -n "(from './db/|from '../db/|from \"\\./db/|from \"\\.\\./db/)" "$FACADE_FILE" >/dev/null; then
  echo "Service boundary failed: $FACADE_FILE must not import db modules directly."
  STATUS=1
else
  echo "Service boundary passed: no direct db imports in facade."
fi

if rg -n "\\bawait\\s+db\\b|\\bdb\\(" "$FACADE_FILE" >/dev/null; then
  echo "Service boundary failed: $FACADE_FILE must not execute direct db calls."
  STATUS=1
else
  echo "Service boundary passed: no direct db calls in facade."
fi

if (( STATUS != 0 )); then
  echo "Service boundary guardrails failed (Post-AD-001)."
  exit 1
fi

echo "Service boundary guardrails passed (Post-AD-001)."
