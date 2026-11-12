import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBusinessLogoUrl(
  logoUrl?: string,
  businessName?: string,
  slug?: string
): string {
  if (logoUrl && logoUrl.trim() !== '') return logoUrl
  
  const nameLower = businessName?.toLowerCase() || ''
  const slugLower = slug?.toLowerCase() || ''
  
  if (nameLower.includes('yango') || slugLower.includes('yango')) {
    return '/yango-logo.jpg'
  }
  
  if (
    nameLower.includes('ubl') ||
    nameLower.includes('united bank limited') ||
    slugLower.includes('ubl') ||
    slugLower.includes('united-bank-limited')
  ) {
    return '/ubl-logo.png'
  }
  
  return ''
}

