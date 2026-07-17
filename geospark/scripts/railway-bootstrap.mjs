/**
 * Railway start command.
 *
 * The build prerenders against an ephemeral SQLite file whose schema is
 * created by scripts/sync-schema.ts (see railway.json buildCommand). At
 * runtime the real database lives on the persistent volume:
 *   1. first boot: create schema + seed content
 *   2. every boot: reconcile the schema via push (idempotent), then serve
 *
 * Schema is managed with Payload's Drizzle "push" (schema diff) rather than
 * generated migrations, so it never fails with "table already exists" on
 * redeploys and automatically picks up new collections/fields. Push only runs
 * when NODE_ENV != 'production', so the schema/seed/reset steps below run in a
 * development env; Next itself is served in production.
 */
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { spawn } from 'child_process'
import path from 'path'

const DATA_DIR = process.env.DATA_DIR || '/data'
const dbTarget = path.join(DATA_DIR, 'geospark.db')
const mediaTarget = path.join(DATA_DIR, 'media')

mkdirSync(DATA_DIR, { recursive: true })
mkdirSync(mediaTarget, { recursive: true })

// Shared DB/media location on the volume.
const dataEnv = {
  DATABASE_URL: `file:${dbTarget}`,
  MEDIA_DIR: mediaTarget,
}

// Schema/seed/reset run outside production so Payload's schema push is active.
const toolEnv = { ...process.env, ...dataEnv, NODE_ENV: 'development' }

if (!existsSync(dbTarget)) {
  console.log('[bootstrap] first boot — creating schema and seeding content')
  // The seed script initialises Payload (push creates the schema) then seeds.
  execSync('npx tsx src/seed/index.ts', { stdio: 'inherit', env: toolEnv })
} else {
  console.log('[bootstrap] reconciling schema via push')
  execSync('npx tsx scripts/sync-schema.ts', { stdio: 'inherit', env: toolEnv })
}

// One-off admin password reset. Set RESET_ADMIN_PASSWORD in the Railway service
// variables (optionally RESET_ADMIN_EMAIL) to reset the admin login on the next
// deploy, then REMOVE the variable so it doesn't run on every boot.
if (process.env.RESET_ADMIN_PASSWORD) {
  console.log('[bootstrap] RESET_ADMIN_PASSWORD detected — resetting admin password')
  execSync('npx tsx scripts/reset-admin-password.ts', { stdio: 'inherit', env: toolEnv })
  console.log('[bootstrap] admin password reset complete — remove RESET_ADMIN_PASSWORD now')
}

// Serve Next in production.
const serveEnv = { ...process.env, ...dataEnv, NODE_ENV: 'production' }
const child = spawn('npx', ['next', 'start'], { stdio: 'inherit', env: serveEnv })
child.on('exit', (code) => process.exit(code ?? 1))
