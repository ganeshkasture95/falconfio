#!/usr/bin/env bash
# TRD §4.2: components must use design tokens, never raw colour values.
# Brand hex/rgb values live only in app/globals.css and the Logo component.
set -euo pipefail
cd "$(dirname "$0")/.."
hits=$(grep -rnE "#[0-9A-Fa-f]{3,8}([^0-9A-Za-z]|$)|rgba?\(" app components --include=*.tsx | grep -v "components/brand/Logo.tsx" || true)
if [ -n "$hits" ]; then
  echo "Raw colour values found (use tokens from app/globals.css):"
  echo "$hits"
  exit 1
fi
echo "check-tokens: OK"
