/**
 * Railway start command.
 *
 * The build prerenders against a schema-only SQLite file created by
 * `payload migrate` (see railway.json buildCommand). At runtime the real
 * database lives on the persistent volume:
 *   1. first boot: run migrations against the volume DB, then seed content
 *   2. every boot: start Next with DATABASE_URL/MEDIA_DIR on the volume
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

const env = {
  ...process.env,
  DATABASE_URL: `file:${dbTarget}`,
  MEDIA_DIR: mediaTarget,
}

if (!existsSync(dbTarget)) {
  console.log('[bootstrap] first boot — running migrations and seeding content')
  execSync('npx payload migrate', { stdio: 'inherit', env })
  execSync('npx tsx src/seed/index.ts', { stdio: 'inherit', env })
} else {
  // keep schema current on redeploys
  execSync('npx payload migrate', { stdio: 'inherit', env })
}

// One-off admin password reset. Set RESET_ADMIN_PASSWORD in the Railway
// service variables (optionally RESET_ADMIN_EMAIL) to reset the admin login on
// the next deploy, then REMOVE the variable so it doesn't run on every boot.
if (process.env.RESET_ADMIN_PASSWORD) {
  console.log('[bootstrap] RESET_ADMIN_PASSWORD detected — resetting admin password')
  execSync('npx tsx scripts/reset-admin-password.ts', { stdio: 'inherit', env })
  console.log('[bootstrap] admin password reset complete — remove RESET_ADMIN_PASSWORD now')
}

const child = spawn('npx', ['next', 'start'], { stdio: 'inherit', env })
child.on('exit', (code) => process.exit(code ?? 1))
