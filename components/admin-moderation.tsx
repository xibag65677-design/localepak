'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { queueOwnerEmail, buildRejectionEmail, buildDeletionEmail } from '@/lib/owner-mail'
import { loadOwnerEmail, ownerContactRef } from '@/lib/owner-contact'
import { dangerBtn, neutralBtn } from '@/components/admin-shared'

export const REJECTION_REASONS = [
  'Incomplete or unclear business information',
  'Invalid or unreachable phone number',
  'Wrong category selected',
  'Duplicate listing',
  'Business details do not match / could not be verified',
  'Prohibited or inappropriate content',
  'Low-quality or misleading description',
  'Payment not received / not verified',
] as const

export type ModItem = { id: string; data: any }

function listingDisplayName(data: any): string {
  return data.name || data.title || 'your listing'
}

/**
 * Reject a listing with reasons: stores the reasons on the doc and queues
 * the owner notification email. Returns whether the email was queued.
 */
export async function moderateReject(
  col: string,
  item: ModItem,
  reasons: string[],
  note: string
): Promise<boolean> {
  await updateDoc(doc(db, col, item.id), {
    status: 'rejected',
    rejectionReasons: reasons,
    rejectionNote: note,
    rejectedAt: serverTimestamp(),
  })
  const email = buildRejectionEmail({
    listingName: listingDisplayName(item.data),
    ownerName: item.data.ownerName || '',
    reasons,
    note: note || undefined,
  })
  // Owner email comes from the private subcollection (Round 3) — the
  // list pages pre-resolve it onto item.data, but resolve here too so a
  // stale item can never silently skip the notification.
  const ownerEmail = item.data.ownerEmail || (await loadOwnerEmail(col, item.id))
  return queueOwnerEmail(ownerEmail, email.subject, email.text, email.html)
}

/**
 * Delete a listing, queueing the owner notification email BEFORE the
 * document (and its owner details) are removed.
 */
export async function moderateDelete(col: string, item: ModItem, note: string): Promise<boolean> {
  const email = buildDeletionEmail({
    listingName: listingDisplayName(item.data),
    ownerName: item.data.ownerName || '',
    note: note || undefined,
  })
  const ownerEmail = item.data.ownerEmail || (await loadOwnerEmail(col, item.id))
  const queued = await queueOwnerEmail(ownerEmail, email.subject, email.text, email.html)
  // Firestore does not cascade-delete subcollections — remove the
  // private owner-contact document explicitly so no orphaned private
  // data survives the listing.
  try {
    await deleteDoc(ownerContactRef(col, item.id))
  } catch {
    // Best effort only; deleting the listing itself must not fail on this.
  }
  await deleteDoc(doc(db, col, item.id))
  return queued
}

export function RejectPanel({
  item,
  busy,
  onConfirm,
  onCancel,
}: {
  item: ModItem
  busy: boolean
  onConfirm: (reasons: string[], note: string) => void
  onCancel: () => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const toggle = (reason: string) =>
    setSelected((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))

  const confirm = () => {
    if (selected.length === 0 && !note.trim()) {
      setError('Select at least one reason, or write an additional note.')
      return
    }
    onConfirm(selected, note.trim())
  }

  return (
    <div className="w-full bg-red-50/60 border border-red-200 rounded-2xl p-5 space-y-4">
      <h3 className="font-extrabold text-slate-900 text-sm">
        Reject “{listingDisplayName(item.data)}” — tell the owner why
      </h3>
      <fieldset className="space-y-2">
        <legend className="sr-only">Rejection reasons</legend>
        {REJECTION_REASONS.map((reason) => (
          <label key={reason} className="flex items-start gap-2.5 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(reason)}
              onChange={() => toggle(reason)}
              className="mt-0.5 w-4 h-4 accent-red-600"
            />
            <span>{reason}</span>
          </label>
        ))}
      </fieldset>
      <div>
        <label htmlFor={`reject-note-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">
          Additional note (optional)
        </label>
        <textarea
          id={`reject-note-${item.id}`}
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything specific the owner should fix before resubmitting..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-300"
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-600" role="alert">{error}</p>}
      <p className="text-[11px] text-slate-500">
        The owner will see these reasons in their dashboard, and an email explaining them will be queued for sending.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={confirm}
          className="px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer disabled:opacity-50 bg-red-600 border-red-600 text-white hover:bg-red-700"
        >
          Confirm Rejection
        </button>
        <button type="button" disabled={busy} onClick={onCancel} className={neutralBtn}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export function DeletePanel({
  item,
  busy,
  onConfirm,
  onCancel,
}: {
  item: ModItem
  busy: boolean
  onConfirm: (note: string) => void
  onCancel: () => void
}) {
  const [note, setNote] = useState('')
  return (
    <div className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-4">
      <h3 className="font-extrabold text-slate-900 text-sm">
        Delete “{listingDisplayName(item.data)}” permanently?
      </h3>
      <p className="text-xs text-slate-500">
        This cannot be undone. The owner will be emailed first, explaining that the listing was removed.
      </p>
      <div>
        <label htmlFor={`delete-note-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">
          Reason / note for the owner (optional)
        </label>
        <input
          id={`delete-note-${item.id}`}
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Duplicate of an existing listing"
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => onConfirm(note.trim())}
          className="px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer disabled:opacity-50 bg-red-600 border-red-600 text-white hover:bg-red-700"
        >
          Delete Permanently
        </button>
        <button type="button" disabled={busy} onClick={onCancel} className={neutralBtn}>
          Cancel
        </button>
      </div>
    </div>
  )
}
