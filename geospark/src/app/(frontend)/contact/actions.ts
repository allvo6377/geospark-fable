'use server'

import { getPayloadClient } from '@/lib/content'

export type EnquiryState = {
  ok: boolean
  error?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitEnquiry(
  _prev: EnquiryState | null,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot — bots fill every field; humans never see this one.
  if (String(formData.get('company') || '').trim() !== '') {
    return { ok: true }
  }

  const name = String(formData.get('name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const service = String(formData.get('service') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || name.length > 200) return { ok: false, error: 'Please enter your name.' }
  if (!EMAIL_RE.test(email) || email.length > 320)
    return { ok: false, error: 'Please enter a valid email address.' }
  if (!message || message.length > 5000)
    return { ok: false, error: 'Please describe your project (max 5000 characters).' }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'submissions',
      data: { name, phone, email, service, message },
      overrideAccess: true,
    })
    return { ok: true }
  } catch (err) {
    console.error('Enquiry submission failed:', err)
    return { ok: false, error: 'Something went wrong — please try again or email us directly.' }
  }
}
