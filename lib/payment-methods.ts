// ============================================================
// LocalePak — manual payment methods (payment screen)
// ------------------------------------------------------------
// These are the owner's receiving accounts, shown publicly on
// the listing payment screen so owners can pay for their tier
// and upload a screenshot as proof. The admin verifies each
// proof in /admin/payments before the listing is approved.
// ============================================================

export type PaymentMethodId = 'easypaisa' | 'jazzcash' | 'mashreq'

export type PaymentMethod = {
  id: PaymentMethodId
  label: string
  shortLabel: string
  accountTitle: string
  accountNumber: string
  hint: string
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    shortLabel: 'Easypaisa',
    accountTitle: 'Muhammad Imran',
    accountNumber: '03019316123',
    hint: 'Send the exact tier amount to this Easypaisa account, then upload your payment screenshot below.',
  },
  {
    id: 'jazzcash',
    label: 'JazzCash',
    shortLabel: 'JazzCash',
    accountTitle: 'Muhammad Imran',
    accountNumber: '03019316123',
    hint: 'Send the exact tier amount to this JazzCash account, then upload your payment screenshot below.',
  },
  {
    id: 'mashreq',
    label: 'Mashreq Bank',
    shortLabel: 'Mashreq Bank',
    accountTitle: 'Muhammad Imran',
    accountNumber: '089200179683',
    hint: 'Transfer the exact tier amount to this Mashreq Bank account, then upload your payment screenshot below.',
  },
]

export function paymentMethodById(id?: string | null): PaymentMethod {
  return PAYMENT_METHODS.find((m) => m.id === id) || PAYMENT_METHODS[0]
}
