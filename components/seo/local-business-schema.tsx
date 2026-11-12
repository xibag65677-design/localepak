'use client'

// Deprecated shim — the canonical structured data for LocalePak lives in
// lib/organization-schema.ts (Organization + founder Person under one
// canonical @id). This module previously defined a second, conflicting
// Organization schema; it now delegates to the canonical graph so no
// duplicate entity can ever be emitted from here.
import {
  organizationSchema,
  founderPersonSchema,
} from '@/lib/organization-schema'

interface BusinessData {
  name: string
  phone: string
  address: string
  city: string
  category: string
  description?: string
  website?: string
  logo?: string
}

export function DirectorySchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, founderPersonSchema]),
      }}
    />
  )
}

// Business detail pages emit their own per-business schema. The legacy
// per-business component is retired and renders nothing.
export function LocalBusinessSchema(_props: { business: BusinessData }) {
  return null
}
