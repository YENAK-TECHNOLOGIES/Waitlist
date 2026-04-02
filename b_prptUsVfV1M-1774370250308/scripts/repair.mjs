#!/usr/bin/env node
import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { resolve } from 'path';

const projectRoot = resolve('/vercel/share/v0-project/b_prptUsVfV1M-1774370250308');

console.log('[v0] Starting dependency repair...');

try {
  // Remove corrupted directories
  console.log('[v0] Removing corrupted node_modules...');
  rmSync(`${projectRoot}/node_modules`, { recursive: true, force: true });
  
  console.log('[v0] Clearing build cache...');
  rmSync(`${projectRoot}/.next`, { recursive: true, force: true });
  rmSync(`${projectRoot}/.turbo`, { recursive: true, force: true });
  
  console.log('[v0] Removing lock files...');
  rmSync(`${projectRoot}/pnpm-lock.yaml`, { force: true });
  rmSync(`${projectRoot}/package-lock.json`, { force: true });
  rmSync(`${projectRoot}/yarn.lock`, { force: true });
  
  // Determine package manager
  let cmd = 'npm install';
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    cmd = 'pnpm install';
    console.log('[v0] Using pnpm...');
  } catch {
    console.log('[v0] Using npm...');
  }
  
  console.log(`[v0] Running: ${cmd}`);
  execSync(cmd, { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('[v0] Dependencies installed successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
