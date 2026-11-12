import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// ============================================================
// LocalePak — owner-private contact data (ANTI-SCRAPE, Round 3)
// ------------------------------------------------------------
// A listing owner's login email is CONTACT data, not listing
// data. It used to be stored as `ownerEmail` inside the main
// business/company/job document — but approved documents are
// publicly readable, so the email was exposed to any visitor
// through the data layer even though the UI never showed it.
//
// It now lives in a private subcollection document:
//
//   {collection}/{listingId}/private/contact
//     { ownerEmail: string, ownerId: string }
//
// whose Firestore rules (see firestore.rules) allow reads and
// writes ONLY for the listing's owner and for admins. Public
// surfaces never read this subcollection.
//
// Backward compatibility: listings created before this split may
// still carry `ownerEmail` on the main document; readers fall
// back to that field when the private document is missing.
// ============================================================

/** Subcollection document that holds a listing's private owner contact. */
export function ownerContactRef(col: string, listingId: string) {
  return doc(db, col, listingId, 'private', 'contact')
}

/** Write the owner's private contact right after a listing is created.
 * NEVER throws: the private-contact write must never break the submission
 * itself (or the mail step that follows it). If live rules deny this write,
 * the listing is still created and the submission emails still go out; the
 * admin can still resolve the owner via the listing's ownerId. Returns true
 * when the private document was written. */
export async function writeOwnerContact(
  col: string,
  listingId: string,
  ownerId: string,
  ownerEmail: string
): Promise<boolean> {
  try {
    await setDoc(ownerContactRef(col, listingId), { ownerEmail, ownerId })
    return true
  } catch (err) {
    console.warn('Owner private contact write failed (non-fatal):', err)
    return false
  }
}

/**
 * Resolve a listing's owner email for owner/admin viewers: private
 * subcollection first, legacy main-document field as fallback.
 */
export async function loadOwnerEmail(
  col: string,
  listingId: string,
  mainDocEmail?: string
): Promise<string> {
  try {
    const snap = await getDoc(ownerContactRef(col, listingId))
    if (snap.exists()) {
      const email = (snap.data() as any)?.ownerEmail
      if (email) return email as string
    }
  } catch {
    // Subcollection missing/unreadable — fall back to the legacy field.
  }
  return mainDocEmail || ''
}

/**
 * Fill `data.ownerEmail` on a list of admin items ({ id, data }) by
 * resolving each listing's private contact document in parallel.
 * Items keep every other field untouched.
 */
export async function resolveOwnerEmails<T extends { id: string; data: any }>(
  col: string,
  items: T[]
): Promise<T[]> {
  return Promise.all(
    items.map(async (item) => {
      const ownerEmail = await loadOwnerEmail(col, item.id, item.data?.ownerEmail)
      return { ...item, data: { ...item.data, ownerEmail } }
    })
  )
}
