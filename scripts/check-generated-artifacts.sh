#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PATTERN='^(client/\.next/|client/\.next_backup[^/]+/|server/dist/|server/dev\.sqlite3$|GUIDANCE/[^/]+\.html$|GUIDANCE/[^/]+_files/)'

TRACKED="$(git ls-files | grep -E "$PATTERN" || true)"

if [[ -n "$TRACKED" ]]; then
  echo "Tracked generated/runtime artifacts detected (AD-011/AD-015):"
  echo "$TRACKED"
  echo
  echo "Remove from index with:"
  echo "  git rm -r --cached -- client/.next client/.next_backup* server/dist server/dev.sqlite3 GUIDANCE/*.html GUIDANCE/*_files"
  exit 1
fi

echo "Generated artifact tracking check passed."
