#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Remove broken node_modules symlink if present
if [ -L "node_modules" ] && [ ! -e "node_modules" ]; then
  rm node_modules
fi

# Install dependencies using pnpm
pnpm install
