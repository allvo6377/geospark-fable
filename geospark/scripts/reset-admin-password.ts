/* One-off admin password reset.
 *
 * Runs against whatever database DATABASE_URL points at (on Railway that is
 * the SQLite file on the persistent volume). Driven entirely by env vars so
 * no secret is ever committed:
 *
 *   RESET_ADMIN_PASSWORD  (required) — the new password
 *   RESET_ADMIN_EMAIL     (optional) — which admin to reset
 *                                      defaults to admin@geospark.co.ke
 *
 * Behaviour:
 *   - if a user with RESET_ADMIN_EMAIL exists  → reset that user's password
 *   - else if exactly one user exists          → reset that user (forgot email)
 *   - else                                     → create a new admin user
 *
 * Invoke: npx tsx scripts/reset-admin-password.ts
 * It is wired into railway-bootstrap.mjs so it runs on boot whenever
 * RESET_ADMIN_PASSWORD is set. Remove the variable afterwards.
 */

import config from '@payload-config'
import { getPayload } from 'payload'

const DEFAULT_EMAIL = 'admin@geospark.co.ke'

async function resetAdminPassword() {
  const password = process.env.RESET_ADMIN_PASSWORD
  const email = process.env.RESET_ADMIN_EMAIL || DEFAULT_EMAIL

  if (!password) {
    console.error('[reset-admin] RESET_ADMIN_PASSWORD is not set — nothing to do.')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const byEmail = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (byEmail.totalDocs > 0) {
    const user = byEmail.docs[0]
    await payload.update({ collection: 'users', id: user.id, data: { password } })
    console.log(`[reset-admin] Password reset for ${email}.`)
    process.exit(0)
  }

  const all = await payload.find({ collection: 'users', limit: 2 })

  if (all.totalDocs === 1) {
    const user = all.docs[0]
    // Only one admin exists but its email differs from the requested one.
    // Point that account at the requested email + password so the operator can
    // log in with exactly the credentials they asked for.
    await payload.update({ collection: 'users', id: user.id, data: { email, password } })
    console.log(
      `[reset-admin] No user matched ${email}; updated the only existing admin ` +
        `(was ${user.email}) to ${email} with the new password.`,
    )
    process.exit(0)
  }

  if (all.totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email, password } })
    console.log(`[reset-admin] No users existed — created a new admin: ${email}.`)
    process.exit(0)
  }

  console.error(
    `[reset-admin] No user matched ${email} and multiple users exist. ` +
      `Set RESET_ADMIN_EMAIL to the exact admin email you want to reset.`,
  )
  process.exit(1)
}

resetAdminPassword().catch((err) => {
  console.error('[reset-admin] Failed:', err)
  process.exit(1)
})
