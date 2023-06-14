#!/usr/bin/env bash

set -euo pipefail

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
yarn install

echo "--- 🚀 Run next build..."
yarn run frontend:build

# For now we only want the static bundle
ls -la ./apps/tutorseekers
# zip -r build.zip out