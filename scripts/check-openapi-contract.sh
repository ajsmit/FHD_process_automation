#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

npm run openapi:generate --workspace=server >/dev/null

SPEC_FILE="server/openapi/openapi.v1.json"
if [[ ! -f "$SPEC_FILE" ]]; then
  echo "OpenAPI contract missing: $SPEC_FILE"
  exit 1
fi

if ! git diff --exit-code -- "$SPEC_FILE" >/dev/null; then
  echo "OpenAPI contract drift detected. Regenerate and commit $SPEC_FILE."
  git --no-pager diff -- "$SPEC_FILE" || true
  exit 1
fi

echo "OpenAPI contract check passed."

