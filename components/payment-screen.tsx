'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { compressImageToDataUrl } from '@/lib/compress-image'
import { Copy, Check, Upload, ShieldCheck, Wallet, ImagePlus, X } from 'lucide-react'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { TIERS, formatPKR, type ListingTier, type ListingType } from '@/lib/tiers'
import { PAYMENT_METHODS, type PaymentMethodId } from '@/lib/payment-methods'
import { notifyAdminNewPaymentProof } from '@/lib/mail'

/**
 * Shared listing payment screen.
 *
 * The parent form has ALREADY saved the listing (status 'pending',
 * paymentStatus 'awaiting_payment') before rendering this screen —
 * so a buyer who stops here loses nothing: the listing waits in
 * their dashboard until the proof is uploaded. After the proof is
 * submitted, the parent sends the submission-confirmation email
 * (via onSubmitted) and routes the buyer to their dashboard.
 */
export default function PaymentScreen({
  tier,
  listingType,
  listingId,
  listingName,
  ownerId,
  ownerEmail,
  onSubmitted,
}: {
  tier: ListingTier
  listingType: ListingType
  listingId: string
  listingName: string
  ownerId: string
  ownerEmail: string
  onSubmitted: () => Promise<void> | void
}) {
  const [method, setMethod] = useState<PaymentMethodId>('easypaisa')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // Live preview of the chosen screenshot, so the user can SEE what they picked.
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const def = TIERS[tier]
  const selected = PAYMENT_METHODS.find((m) => m.id === method) || PAYMENT_METHODS[0]

  const copyNumber = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num)
    } catch {
      // Clipboard API unavailable (older browsers) — select-and-copy fallback.
      const ta = document.createElement('textarea')
      ta.value = num
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(num)
    window.setTimeout(() => setCopied((c) => (c === num ? null : c)), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error('Please choose your payment screenshot first.')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('The proof must be an image file.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error('The image is too large to process — please use a smaller screenshot.')
      return
    }
    setUploading(true)
    try {
      // No Firebase Storage on the free plan: compress in the browser and
      // store the proof directly in Firestore as a data URL.
      const proofUrl = await compressImageToDataUrl(file)
      await addDoc(collection(db, 'payment_proofs'), {
        listingId,
        listingType,
        listingName,
        ownerId,
        ownerEmail,
        tier,
        method,
        amount: def.price,
        proofUrl,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      // Admin notification — queued into `mail`, never throws.
      void notifyAdminNewPaymentProof({
        listingName,
        plan: 'featured',
        tier,
        method,
        amount: def.price,
      })
      toast.success('Payment proof submitted — we will email you once it is verified.')
      await onSubmitted()
    } catch (err: any) {
      toast.error(`Upload failed: ${safeErrorMessage(err)}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
          <Wallet className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Complete Your Payment</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Your {def.label} listing for “{listingName}” is saved. Pay {formatPKR(def.price)} with any method below,
          then upload your payment screenshot — our team verifies it before approval.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">{def.label} listing</p>
          <p className="text-xs text-slate-600 mt-0.5">{def.tagline}</p>
        </div>
        <p className="font-extrabold text-emerald-700 text-lg whitespace-nowrap">{formatPKR(def.price)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-3">
          <p className="block text-sm font-extrabold text-slate-900">Pay with *</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Payment method">
            {PAYMENT_METHODS.map((m) => {
              const active = method === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setMethod(m.id)}
                  className={`text-left min-w-0 rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                    active ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <span className="font-extrabold text-slate-900 text-sm">{m.label}</span>
                  <span className="block text-xs font-bold text-slate-600 mt-1">Account title: {m.accountTitle}</span>
                  <span className="flex flex-wrap items-center gap-1.5 mt-1">
                    <span className="min-w-0 break-all text-sm font-mono font-extrabold text-slate-900">{m.accountNumber}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Copy ${m.label} account number`}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        void copyNumber(m.accountNumber)
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                          ev.preventDefault()
                          ev.stopPropagation()
                          void copyNumber(m.accountNumber)
                        }
                      }}
                      className="inline-flex shrink-0 items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs font-bold text-emerald-700 hover:border-emerald-400 cursor-pointer"
                    >
                      {copied === m.accountNumber ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          <p className="text-sm font-bold text-slate-700 leading-relaxed">{selected.hint}</p>
        </div>

        <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50/60 p-4 space-y-3">
          <p className="text-base font-extrabold text-slate-900">
            Upload payment proof screenshot *
          </p>
          <p className="text-sm font-bold text-slate-700 -mt-2">
            Image only — your screenshot is compressed automatically before saving.
          </p>
          <input
            id="tier-payment-proof"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="sr-only"
          />
          {!file ? (
            <label
              htmlFor="tier-payment-proof"
              className="flex flex-col items-center justify-center gap-2 w-full min-h-[120px] rounded-xl border-2 border-dashed border-emerald-500 bg-white px-4 py-6 text-center cursor-pointer hover:border-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <ImagePlus className="w-10 h-10 text-emerald-600" />
              <span className="text-base font-extrabold text-emerald-700">Tap to choose your screenshot</span>
              <span className="text-xs font-bold text-slate-500">JPG, PNG or any image — compressed automatically</span>
            </label>
          ) : (
            <div className="rounded-xl border-2 border-emerald-600 bg-white p-3 space-y-3">
              <div className="flex items-start gap-3">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Selected payment screenshot preview"
                    className="w-28 h-28 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-extrabold text-emerald-700">
                    <Check className="w-4 h-4 shrink-0" /> Screenshot selected
                  </p>
                  <p className="text-base font-extrabold text-slate-900 break-all mt-1">{file.name}</p>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  aria-label="Remove selected screenshot"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-red-300 hover:text-red-600 cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" /> Change
                </button>
              </div>
              <label
                htmlFor="tier-payment-proof"
                className="block text-center text-sm font-extrabold text-emerald-700 underline underline-offset-2 cursor-pointer"
              >
                Tap here to pick a different screenshot
              </label>
            </div>
          )}
        </div>

        <div className="flex gap-2.5 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl text-sm font-bold text-slate-800 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Send exactly {formatPKR(def.price)} via {selected.label}, then upload the screenshot. Our team verifies
            every payment by hand — once approved, your listing goes live immediately.
            If a payment cannot be verified, the listing is rejected and the reason is shown in your dashboard.
          </span>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Submit Payment Proof'}</span>
        </button>
      </form>
    </div>
  )
}
