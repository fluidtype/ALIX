#!/usr/bin/env node
const { spawnSync } = require('node:child_process');

const connectionUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (connectionUrl) {
  console.log('Running `prisma migrate deploy` before Next.js build...');
  const migrateResult = spawnSync('npx', ['prisma', 'migrate', 'deploy'], {
    stdio: 'inherit',
    env: process.env,
  });

  if (migrateResult.status !== 0) {
    console.error('`prisma migrate deploy` failed; aborting build.');
    process.exit(migrateResult.status ?? 1);
  }
} else {
  console.log('Skipping `prisma migrate deploy` because no database URL is configured.');
}

const buildResult = spawnSync('next', ['build'], {
  stdio: 'inherit',
  env: process.env,
});

if (buildResult.status !== 0) {
  process.exit(buildResult.status ?? 1);
}
