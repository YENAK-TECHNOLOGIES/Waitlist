#!/bin/bash
cd /vercel/share/v0-project/b_prptUsVfV1M-1774370250308
rm -rf node_modules .next .turbo pnpm-lock.yaml package-lock.json yarn.lock
if command -v pnpm &> /dev/null; then
  echo "Installing with pnpm..."
  pnpm install
elif command -v npm &> /dev/null; then
  echo "Installing with npm..."
  npm install
else
  echo "No package manager found"
  exit 1
fi
echo "Dependencies installed successfully"
