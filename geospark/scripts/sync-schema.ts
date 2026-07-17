/* Idempotent schema sync.
 *
 * Initialising Payload with the SQLite adapter outside production mode runs
 * Drizzle's schema *push*, which diffs the code schema against the actual
 * database and applies only the difference. Unlike replaying generated
 * migrations, push never fails with "table already exists", so it is safe to
 * run on every deploy against the persistent volume — and it picks up new
 * collections/fields automatically.
 *
 * Must be invoked with NODE_ENV != 'production' (see railway-bootstrap.mjs).
 */

import config from '@payload-config'
import { getPayload } from 'payload'

async function syncSchema() {
  await getPayload({ config })
  console.log('[sync-schema] schema is up to date')
  process.exit(0)
}

syncSchema().catch((err) => {
  console.error('[sync-schema] failed:', err)
  process.exit(1)
})
