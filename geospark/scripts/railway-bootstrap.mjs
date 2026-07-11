/**
 * Railway start command.
 *
 * The build runs against the seeded SQLite file bundled with the deploy
 * (DATABASE_URL=file:./geospark.db). At runtime we must use the persistent
 * volume instead, so this script:
 *   1. copies the bundled seeded DB + media to the volume on first boot only
 *   2. starts Next with DATABASE_URL/MEDIA_DIR pointing at the volume
 */
import { cpSync, existsSync, mkdirSync } from 'fs'
import { spawn } from 'child_process'
import path from 'path'

const DATA_DIR = process.env.DATA_DIR || '/data'
const dbTarget = path.join(DATA_DIR, 'geospark.db')
const mediaTarget = path.join(DATA_DIR, 'media')

mkdirSync(DATA_DIR, { recursive: true })

if (!existsSync(dbTarget) && existsSync('geospark.db')) {
  console.log(`[bootstrap] first boot — seeding volume: geospark.db -> ${dbTarget}`)
  cpSync('geospark.db', dbTarget)
}
if (!existsSync(mediaTarget)) {
  if (existsSync('media')) {
    console.log(`[bootstrap] first boot — copying media -> ${mediaTarget}`)
    cpSync('media', mediaTarget, { recursive: true })
  } else {
    mkdirSync(mediaTarget, { recursive: true })
  }
}

const child = spawn('npx', ['next', 'start'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DATABASE_URL: `file:${dbTarget}`,
    MEDIA_DIR: mediaTarget,
  },
})
child.on('exit', (code) => process.exit(code ?? 1))
