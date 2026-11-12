'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { compressImageToDataUrl } from '@/lib/compress-image'
import { User as UserIcon, Mail, ShieldCheck, LogOut, LayoutGrid, MapPin, HelpCircle, Building2, Factory, Briefcase, PlusCircle, ClipboardList, Crown, BadgeCheck, X, Upload, ShieldAlert, UserRound, Pencil, FolderKanban, Newspaper, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { isReleased, releaseDateLabel } from '@/lib/release'
import { notifyAdminNewPaymentProof, queueSubmissionEmails } from '@/lib/mail'
import PaymentScreen from '@/components/payment-screen'
import { tierLabel, tierPrice, formatPKR, canEditTier, projectLimitFor, blogLimitFor, LISTING_COLLECTION, isValidProject, type ListingTier, type Project } from '@/lib/tiers'
import { EDITABLE_FIELDS, EDITABLE_FIELD_LABELS, sanitizeChanges } from '@/lib/edit-requests'

type ListingItem = {
  id: string
  type: 'Business' | 'Company' | 'Job' | 'Professional'
  name: string
  status: string
  approvedAt?: any
  rejectionReasons?: string[]
  rejectionNote?: string
  tier?: string
  paymentStatus?: string
  projects?: Project[]
  city?: string
  slug?: string
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Public page for an approved dashboard listing, or null (pending/rejected/slug-less). */
function publicPath(item: ListingItem): string | null {
  if (item.status !== 'approved' || !item.slug) return null
  if (item.type === 'Company') return `/company/${item.slug}`
  if (item.type === 'Job') return `/job/${item.slug}`
  if (item.type === 'Professional') return `/professional/${item.slug}`
  return `/business/${item.slug}`
}

/** Dashboard listing type → tier-system listing type. */
function typeKey(t: ListingItem['type']): 'business' | 'company' | 'job' | 'professional' {
  if (t === 'Company') return 'company'
  if (t === 'Job') return 'job'
  if (t === 'Professional') return 'professional'
  return 'business'
}

function formatShortDate(value: any): string {
  const ms = typeof value?.toMillis === 'function' ? value.toMillis() : typeof value === 'number' ? value : 0
  if (!ms) return ''
  return new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<ListingItem[]>([])
  const [listingsLoading, setListingsLoading] = useState(false)
  const [role, setRole] = useState<string>('member')
  const [proofs, setProofs] = useState<Record<string, { status: string; plan: string; tier?: string }>>({})
  const [upgradeFor, setUpgradeFor] = useState<string | null>(null)
  const [upgradePlan, setUpgradePlan] = useState<'featured' | 'verified'>('featured')
  const [upgradeFile, setUpgradeFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  // Tier payment panel (unpaid / rejected-proof listings).
  const [payFor, setPayFor] = useState<string | null>(null)
  // Edit-request panel (Premium / Featured approved listings).
  const [editFor, setEditFor] = useState<string | null>(null)
  const [editDoc, setEditDoc] = useState<any>(null)
  const [editFields, setEditFields] = useState<Record<string, string>>({})
  const [editLoading, setEditLoading] = useState(false)
  const [editSaving, setEditSaving] = useState(false)
  const [editReqs, setEditReqs] = useState<Record<string, { status: string; effectiveAt?: any }>>({})
  // Projects panel (Premium / Featured approved listings).
  const [projectsFor, setProjectsFor] = useState<string | null>(null)
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDesc, setProjectDesc] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [projectSaving, setProjectSaving] = useState(false)
  // Blog posts (owners of a Featured listing, max 2).
  const [blogPosts, setBlogPosts] = useState<Array<{ id: string; data: any }>>([])
  const [blogFormOpen, setBlogFormOpen] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogExcerpt, setBlogExcerpt] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogSaving, setBlogSaving] = useState(false)

  useEffect(() => {
    let unsub: (() => void) | undefined
    getFirebaseAuth().then((a) => {
      unsub = onAuthStateChanged(a, (u) => {
        setUser(u)
        setLoading(false)
      })
    })
    return () => unsub?.()
  }, [])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    const loadListings = async () => {
      setListingsLoading(true)
      const sources: Array<{ col: string; type: ListingItem['type'] }> = [
        { col: 'businesses', type: 'Business' },
        { col: 'companies', type: 'Company' },
        { col: 'jobs', type: 'Job' },
        { col: 'professionals', type: 'Professional' },
      ]
      const results: ListingItem[] = []
      for (const source of sources) {
        try {
          const snap = await getDocs(query(collection(db, source.col), where('ownerId', '==', user.uid)))
          snap.forEach((d) => {
            const data = d.data() as any
            results.push({
              id: d.id,
              type: source.type,
              name: data.name || data.title || data.companyName || 'Untitled listing',
              status: data.status || 'pending',
              approvedAt: data.approvedAt ?? null,
              rejectionReasons: Array.isArray(data.rejectionReasons) ? data.rejectionReasons : [],
              rejectionNote: data.rejectionNote || '',
              tier: data.tier || undefined,
              paymentStatus: data.paymentStatus || undefined,
              projects: Array.isArray(data.projects) ? data.projects.filter(isValidProject) : [],
              city: data.city || '',
              slug: data.slug || '',
            })
          })
        } catch {
          // Collection may not exist yet or Firebase may not be configured — treat as empty.
        }
      }
      if (!cancelled) {
        setListings(results)
        setListingsLoading(false)
      }
    }
    loadListings()
    return () => {
      cancelled = true
    }
  }, [user])

  // Role (for the Admin Panel link) + this owner's payment-proof statuses.
  useEffect(() => {
    if (!user) return
    let cancelled = false
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid))
        if (!cancelled && snap.exists()) setRole((snap.data() as any).role || 'member')
      } catch {
        // Role stays 'member' — the admin link simply stays hidden.
      }
      try {
        const snap = await getDocs(query(collection(db, 'payment_proofs'), where('ownerId', '==', user.uid)))
        const map: Record<string, { status: string; plan: string; tier?: string; ts: number }> = {}
        snap.forEach((d) => {
          const data = d.data() as any
          if (!data.listingId) return
          const ts = data.createdAt?.toMillis?.() || 0
          if (!map[data.listingId] || ts > map[data.listingId].ts) {
            map[data.listingId] = { status: data.status || 'pending', plan: data.plan || 'featured', tier: data.tier || undefined, ts }
          }
        })
        if (!cancelled) setProofs(map)
      } catch {
        // No proofs yet, or Firebase not configured — badges stay hidden.
      }
      // Own edit requests (latest per listing) + own blog posts.
      try {
        const snap = await getDocs(query(collection(db, 'edit_requests'), where('ownerId', '==', user.uid)))
        const map: Record<string, { status: string; effectiveAt?: any }> = {}
        snap.forEach((d) => {
          const data = d.data() as any
          if (!data.listingId) return
          const ts = data.createdAt?.toMillis?.() || 0
          const prev = (map as any)[data.listingId] as any
          if (!prev || ts > (prev.ts || 0)) map[data.listingId] = { status: data.status || 'pending', effectiveAt: data.effectiveAt ?? null, ts } as any
        })
        if (!cancelled) setEditReqs(map)
      } catch {
        // ignore — edit notes simply stay hidden
      }
      try {
        const snap = await getDocs(query(collection(db, 'blog_posts'), where('authorId', '==', user.uid)))
        const rows: Array<{ id: string; data: any }> = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        rows.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        if (!cancelled) setBlogPosts(rows)
      } catch {
        // ignore — blog section simply stays empty
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  const handleUpgradeSubmit = async (item: ListingItem) => {
    if (!user) return
    if (!upgradeFile) {
      toast.error('Please choose your payment screenshot first.')
      return
    }
    if (!upgradeFile.type.startsWith('image/')) {
      toast.error('The proof must be an image file.')
      return
    }
    if (upgradeFile.size > 15 * 1024 * 1024) {
      toast.error('The image is too large to process — please use a smaller screenshot.')
      return
    }
    setUploading(true)
    try {
      // No Firebase Storage on the free plan: compress in the browser and
      // store the proof directly in Firestore as a data URL.
      const proofUrl = await compressImageToDataUrl(upgradeFile)
      await addDoc(collection(db, 'payment_proofs'), {
        listingId: item.id,
        listingType: item.type === 'Company' ? 'company' : 'business',
        listingName: item.name,
        ownerId: user.uid,
        ownerEmail: user.email || '',
        plan: upgradePlan,
        proofUrl,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      setProofs((prev) => ({ ...prev, [item.id]: { status: 'pending', plan: upgradePlan } }))
      // Admin notification — queued into `mail`, fire-and-forget, never throws.
      void notifyAdminNewPaymentProof({ listingName: item.name, plan: upgradePlan })
      setUpgradeFor(null)
      setUpgradeFile(null)
      toast.success('Payment proof submitted — our admin will verify it shortly.')
    } catch (err: any) {
      toast.error(`Upload failed: ${safeErrorMessage(err)}`)
    } finally {
      setUploading(false)
    }
  }

  // ---- Tier payment (dashboard re-pay / first pay for saved listings) ----
  const openPayPanel = (item: ListingItem) => {
    setPayFor(payFor === item.id ? null : item.id)
  }

  // ---- Edit requests (Premium / Featured approved listings) ----
  const openEditPanel = async (item: ListingItem) => {
    if (editFor === item.id) {
      setEditFor(null)
      return
    }
    setEditFor(item.id)
    setEditLoading(true)
    setEditDoc(null)
    setEditFields({})
    try {
      const col = LISTING_COLLECTION[typeKey(item.type)]
      const snap = await getDoc(doc(db, col, item.id))
      if (snap.exists()) {
        const data = snap.data() as any
        setEditDoc(data)
        const fields: Record<string, string> = {}
        for (const key of EDITABLE_FIELDS[typeKey(item.type)]) fields[key] = data[key] ?? ''
        setEditFields(fields)
      }
    } catch {
      toast.error('Could not load listing details.')
    } finally {
      setEditLoading(false)
    }
  }

  const handleEditSubmit = async (item: ListingItem) => {
    if (!user) return
    const type = typeKey(item.type)
    // sanitizeChanges drops empty values: an edit sets fields, it
    // cannot blank one out (v1 limitation, keeps requests clean).
    const clean = sanitizeChanges(type, editFields)
    if (Object.keys(clean).length === 0) {
      toast.error('Change at least one field before submitting.')
      return
    }
    setEditSaving(true)
    try {
      await addDoc(collection(db, 'edit_requests'), {
        listingType: type,
        listingId: item.id,
        listingName: item.name,
        ownerId: user.uid,
        ownerEmail: user.email || '',
        changes: clean,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      setEditReqs((prev) => ({ ...prev, [item.id]: { status: 'pending' } }))
      setEditFor(null)
      toast.success('Edit request submitted — our team reviews it, then it goes live at the next weekly release.')
    } catch (err: any) {
      toast.error(`Could not submit edit request: ${safeErrorMessage(err)}`)
    } finally {
      setEditSaving(false)
    }
  }

  // ---- Projects (Premium / Featured approved listings) ----
  const handleProjectAdd = async (item: ListingItem) => {
    const limit = projectLimitFor(item.tier)
    const current = item.projects || []
    if (current.length >= limit) {
      toast.error(`You already have ${limit} projects — the maximum for your plan.`)
      return
    }
    if (!projectTitle.trim() || !projectDesc.trim()) {
      toast.error('Project title and description are required.')
      return
    }
    setProjectSaving(true)
    try {
      const col = LISTING_COLLECTION[typeKey(item.type)]
      const next = [...current, { title: projectTitle.trim(), description: projectDesc.trim(), link: projectLink.trim() }]
      // Firestore rejects undefined — drop an empty link entirely.
      const cleaned = next.map((p) => (p.link ? p : { title: p.title, description: p.description }))
      await updateDoc(doc(db, col, item.id), { projects: cleaned })
      setListings((prev) =>
        prev.map((l) => (l.id === item.id && l.type === item.type ? { ...l, projects: cleaned as Project[] } : l))
      )
      setProjectTitle('')
      setProjectDesc('')
      setProjectLink('')
      toast.success('Project added to your listing.')
    } catch (err: any) {
      toast.error(`Could not add project: ${safeErrorMessage(err)}`)
    } finally {
      setProjectSaving(false)
    }
  }

  const handleProjectRemove = async (item: ListingItem, index: number) => {
    const next = (item.projects || []).filter((_, i) => i !== index)
    setProjectSaving(true)
    try {
      const col = LISTING_COLLECTION[typeKey(item.type)]
      await updateDoc(doc(db, col, item.id), { projects: next })
      setListings((prev) =>
        prev.map((l) => (l.id === item.id && l.type === item.type ? { ...l, projects: next } : l))
      )
      toast.success('Project removed.')
    } catch (err: any) {
      toast.error(`Could not remove project: ${safeErrorMessage(err)}`)
    } finally {
      setProjectSaving(false)
    }
  }

  // ---- Blog posts (owners of a Featured listing, max 2) ----
  const handleBlogSubmit = async () => {
    if (!user) return
    const featuredListing = listings.find((l) => l.tier === 'featured' && l.status === 'approved')
    if (!featuredListing) {
      toast.error('Blog posts are available on Featured listings.')
      return
    }
    const used = blogPosts.filter((p) => p.data.status !== 'rejected').length
    if (used >= blogLimitFor('featured')) {
      toast.error('You have already used your 2 blog posts.')
      return
    }
    if (!blogTitle.trim() || blogContent.trim().length < 100) {
      toast.error('A title is required and the post needs at least 100 characters.')
      return
    }
    setBlogSaving(true)
    try {
      const base = slugify(blogTitle)
      let slug = base
      let n = 2
      while (n <= 6) {
        const snap = await getDocs(query(collection(db, 'blog_posts'), where('slug', '==', slug)))
        if (snap.empty) break
        slug = `${base}-${n}`
        n++
      }
      const ref = await addDoc(collection(db, 'blog_posts'), {
        title: blogTitle.trim(),
        slug,
        excerpt: blogExcerpt.trim() || blogContent.trim().slice(0, 150),
        content: blogContent.trim(),
        authorId: user.uid,
        authorName: user.displayName || '',
        authorEmail: user.email || '',
        listingId: featuredListing.id,
        listingType: typeKey(featuredListing.type),
        listingName: featuredListing.name,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      setBlogPosts((prev) => [{ id: ref.id, data: { title: blogTitle.trim(), slug, status: 'pending' } }, ...prev])
      setBlogTitle('')
      setBlogExcerpt('')
      setBlogContent('')
      setBlogFormOpen(false)
      toast.success('Blog post submitted for review.')
    } catch (err: any) {
      toast.error(`Could not submit blog post: ${safeErrorMessage(err)}`)
    } finally {
      setBlogSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(await getFirebaseAuth())
    } catch {
      // session cleanup below also applies when Firebase is not yet configured
    }
    sessionStorage.removeItem('localepak_user_session')
    localStorage.removeItem('localepak_user_session')
    toast.success('You have been signed out.')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main id="main-content" className="flex-1 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Dashboard</h1>
            <p className="text-sm text-slate-500">Your LocalePak account at a glance.</p>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-sm text-slate-500">
              Loading your account...
            </div>
          ) : !user ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
              <UserIcon className="w-10 h-10 text-slate-300 mx-auto" />
              <h2 className="font-extrabold text-slate-900 text-lg">You are not signed in</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Sign in to view your account details. Browsing the directory is always free and does not need an account.
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <Link href="/login" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 font-bold text-sm rounded-xl transition-colors">
                  Create Account
                </Link>
              </div>
            </div>
          ) : (
            <>
              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5" aria-label="Account details">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 text-lg">{user.displayName || 'LocalePak Member'}</h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </p>
                  </div>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email status</dt>
                    <dd className="font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {user.emailVerified ? 'Verified' : 'Not verified yet'}
                    </dd>
                  </div>
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Account type</dt>
                    <dd className="font-semibold text-slate-800 mt-1 capitalize">{role === 'admin' ? 'Admin' : 'Member'}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3">
                  {role === 'admin' && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Quick links">
                <Link href="/categories" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-colors space-y-2">
                  <LayoutGrid className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Browse Categories</h3>
                  <p className="text-xs text-slate-500">Explore all 24 business categories.</p>
                </Link>
                <Link href="/cities" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-colors space-y-2">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Explore Cities</h3>
                  <p className="text-xs text-slate-500">City guides from across Pakistan.</p>
                </Link>
                <Link href="/help-center" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 transition-colors space-y-2">
                  <HelpCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Help Center</h3>
                  <p className="text-xs text-slate-500">Answers and support options.</p>
                </Link>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Add a listing">
                <Link href="/add-business" className="bg-white rounded-3xl border-2 border-emerald-100 p-6 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Add Business</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Business listing — plans from PKR 99, verified before approval.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <PlusCircle className="w-4 h-4" /> Add now
                  </span>
                </Link>
                <Link href="/add-company" className="bg-white rounded-3xl border-2 border-emerald-100 p-6 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Add Company</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Company profile — plans from PKR 99, verified before approval.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <PlusCircle className="w-4 h-4" /> Add now
                  </span>
                </Link>
                <Link href="/add-job" className="bg-white rounded-3xl border-2 border-amber-100 p-6 hover:border-amber-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Post a Job</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Job post — plans from PKR 99, verified before approval.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
                    <PlusCircle className="w-4 h-4" /> Post now
                  </span>
                </Link>
                <Link href="/add-professional" className="bg-white rounded-3xl border-2 border-emerald-100 p-6 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <UserRound className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Add Professional Profile</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Your professional profile — plans from PKR 99, verified before approval.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <PlusCircle className="w-4 h-4" /> Add now
                  </span>
                </Link>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5" aria-label="My listings">
                <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-emerald-600" />
                  My Listings
                </h2>
                {listingsLoading ? (
                  <p className="text-sm text-slate-500">Loading your listings...</p>
                ) : listings.length === 0 ? (
                  <div className="text-center py-6 space-y-3">
                    <p className="text-sm text-slate-500">No listings yet — add your first business</p>
                    <Link href="/add-business" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors">
                      <PlusCircle className="w-4 h-4" /> Add Business
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {listings.map((item) => {
                      const proof = proofs[item.id]
                      const upgradeable = item.type === 'Business' || item.type === 'Company'
                      const panelOpen = upgradeFor === item.id
                      // Businesses publish in a weekly batch (lib/release.ts):
                      // an approved business whose release is still pending
                      // gets a "goes live on" note instead of looking live.
                      const awaitingRelease =
                        item.type === 'Business' && item.status === 'approved' && !isReleased(item.approvedAt, Date.now())
                      // Tier payment state: a pending tier proof means the
                      // owner already paid and is waiting on verification —
                      // no second upload panel. Otherwise an unpaid or
                      // rejected-proof listing gets the Pay panel.
                      // Rejected tier listings also get the panel: a business
                      // rejected by admin (status 'rejected') with a paid tier
                      // previously had NO proof option at all — only "create
                      // a new listing" — even though a fresh proof for the
                      // SAME listing is exactly what admin needs to approve
                      // it. The owner still only creates a payment_proofs
                      // doc (Firestore rules forbid owners changing a
                      // listing's status/paymentStatus/tier); admin approval
                      // of that proof is what re-approves the listing.
                      const tierProofPending = !!proof?.tier && proof.status === 'pending'
                      const rejectedTierResubmit = item.status === 'rejected' && !!item.tier && !tierProofPending
                      const needsPayment =
                        ((item.paymentStatus === 'awaiting_payment' || item.paymentStatus === 'payment_rejected') &&
                          !tierProofPending) ||
                        rejectedTierResubmit
                      const canEdit = item.status === 'approved' && canEditTier(item.tier)
                      const projectLimit = projectLimitFor(item.tier)
                      const showProjects = item.status === 'approved' && projectLimit > 0
                      const editReq = editReqs[item.id]
                      const editEffMs =
                        editReq?.effectiveAt?.toMillis?.() || (typeof editReq?.effectiveAt === 'number' ? editReq.effectiveAt : 0)
                      return (
                        <li key={`${item.type}-${item.id}`} className="py-3.5 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{item.type}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                              {proof && (
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                    proof.status === 'approved'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : proof.status === 'rejected'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-slate-100 text-slate-600 border-slate-200'
                                  }`}
                                >
                                  {proof.tier
                                    ? `${tierLabel(proof.tier)} payment: ${proof.status === 'approved' ? 'Verified' : proof.status === 'rejected' ? 'Rejected' : 'Under review'}`
                                    : `${proof.plan === 'verified' ? 'Verified' : 'Featured'} proof: ${proof.status === 'approved' ? 'Approved' : proof.status === 'rejected' ? 'Rejected' : 'Pending review'}`}
                                </span>
                              )}
                              {item.tier && (
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border bg-slate-900 text-white border-slate-900">
                                  {tierLabel(item.tier)} · {formatPKR(tierPrice(item.tier))}
                                </span>
                              )}
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                  item.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : item.status === 'rejected'
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                {item.status === 'approved' ? 'Approved' : item.status === 'rejected' ? 'Rejected' : 'Pending review'}
                              </span>
                              {needsPayment && (
                                <button
                                  type="button"
                                  onClick={() => openPayPanel(item)}
                                  aria-expanded={payFor === item.id}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full transition-colors cursor-pointer"
                                >
                                  <Wallet className="w-3.5 h-3.5" /> {item.paymentStatus === 'payment_rejected' ? 'Re-upload Proof' : item.status === 'rejected' ? 'Upload New Proof' : 'Pay Now'}
                                </button>
                              )}
                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() => void openEditPanel(item)}
                                  aria-expanded={editFor === item.id}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5" /> Request Edit
                                </button>
                              )}
                              {showProjects && (
                                <button
                                  type="button"
                                  onClick={() => setProjectsFor(projectsFor === item.id ? null : item.id)}
                                  aria-expanded={projectsFor === item.id}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
                                >
                                  <FolderKanban className="w-3.5 h-3.5" /> Projects ({(item.projects || []).length}/{projectLimit})
                                </button>
                              )}
                              {upgradeable && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUpgradeFor(panelOpen ? null : item.id)
                                    setUpgradeFile(null)
                                  }}
                                  aria-expanded={panelOpen}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-full transition-colors cursor-pointer"
                                >
                                  <Crown className="w-3.5 h-3.5" /> Upgrade
                                </button>
                              )}
                              {publicPath(item) && (
                                <Link
                                  href={publicPath(item)!}
                                  prefetch={false}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 font-bold text-xs rounded-full transition-colors"
                                >
                                  View listing
                                </Link>
                              )}
                            </div>
                          </div>

                          {awaitingRelease && (
                            <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                              Approved — goes live on LocalePak on {releaseDateLabel(Date.now())}
                            </p>
                          )}

                          {needsPayment && (
                            <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                              {item.status === 'rejected' && item.paymentStatus !== 'payment_rejected'
                                ? 'This listing was rejected — upload a new payment screenshot for this same listing below. Admin verifies it against this listing, and approving it approves this listing (no need to create a new one).'
                                : item.paymentStatus === 'payment_rejected'
                                  ? 'Your payment proof was not verified — upload a new screenshot below.'
                                  : `Payment pending — your ${tierLabel(item.tier)} listing (${formatPKR(tierPrice(item.tier))}) waits for its payment proof below.`}
                            </p>
                          )}

                          {tierProofPending && (
                            <p className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2">
                              Payment proof under review — our team verifies it, then approves your listing.
                            </p>
                          )}

                          {editReq && editReq.status === 'pending' && (
                            <p className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2">
                              Edit request under review — approved edits go live at the next weekly release.
                            </p>
                          )}

                          {editReq && editReq.status === 'approved' && (
                            <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                              {editEffMs > Date.now()
                                ? `Edit approved — goes live on ${formatShortDate(editEffMs)}.`
                                : 'Your latest approved edit is live on this listing.'}
                            </p>
                          )}

                          {editReq && editReq.status === 'rejected' && (
                            <p className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                              Your last edit request was not approved — your live listing is unchanged.
                            </p>
                          )}

                          {item.status === 'rejected' && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2" role="alert">
                              <p className="text-xs font-extrabold text-red-700 flex items-center gap-1.5">
                                <ShieldAlert className="w-4 h-4" /> This listing was not approved
                              </p>
                              {item.rejectionReasons && item.rejectionReasons.length > 0 && (
                                <ul className="list-disc pl-5 text-xs text-red-700 space-y-0.5">
                                  {item.rejectionReasons.map((r) => (
                                    <li key={r}>{r}</li>
                                  ))}
                                </ul>
                              )}
                              {item.rejectionNote && (
                                <p className="text-xs text-red-700">Reviewer note: {item.rejectionNote}</p>
                              )}
                              {tierProofPending ? (
                                <p className="text-xs text-red-700">
                                  A new payment proof for this listing is already under review — admin verifies it
                                  against this listing, and approving it approves this listing.
                                </p>
                              ) : item.tier ? (
                                <p className="text-xs text-red-700">
                                  You can upload a new payment proof for this same listing with the “Upload New Proof”
                                  button above — approving it approves this listing. Creating a new listing is only
                                  needed if you want to start over.
                                </p>
                              ) : (
                                <p className="text-xs text-red-700">
                                  Fix these issues and create a new listing — this one cannot be re-approved as it stands.
                                </p>
                              )}
                              <Link
                                href={item.type === 'Company' ? '/add-company' : item.type === 'Job' ? '/add-job' : '/add-business'}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors"
                              >
                                <PlusCircle className="w-3.5 h-3.5" /> Create a New Listing
                              </Link>
                            </div>
                          )}

                          {needsPayment && payFor === item.id && user && (
                            <div className="bg-white border border-slate-200 rounded-2xl p-5">
                              <PaymentScreen
                                tier={(item.tier as ListingTier) || 'basic'}
                                listingType={typeKey(item.type)}
                                listingId={item.id}
                                listingName={item.name}
                                ownerId={user.uid}
                                ownerEmail={user.email || ''}
                                onSubmitted={async () => {
                                  const hadPriorTierProof = !!proofs[item.id]?.tier
                                  setProofs((prev) => ({
                                    ...prev,
                                    [item.id]: { status: 'pending', plan: 'featured', tier: item.tier },
                                  }))
                                  setPayFor(null)
                                  // First-ever tier proof: the submission
                                  // confirmation email goes out now (the
                                  // add-flow sends it at proof time, and a
                                  // re-upload after rejection must not
                                  // duplicate it).
                                  if (!hadPriorTierProof) {
                                    await queueSubmissionEmails({
                                      kind: typeKey(item.type),
                                      name: item.name,
                                      city: item.city,
                                      ownerEmail: user.email || '',
                                      ownerName: user.displayName || '',
                                    })
                                    toast.success('Payment proof submitted — submission received.')
                                  }
                                }}
                              />
                            </div>
                          )}

                          {canEdit && editFor === item.id && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                                  <Pencil className="w-4 h-4 text-emerald-600" />
                                  Request an edit for “{item.name}”
                                </h3>
                                <button
                                  type="button"
                                  onClick={() => setEditFor(null)}
                                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                  aria-label="Close edit panel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {editLoading ? (
                                <p className="text-xs text-slate-500">Loading current details...</p>
                              ) : (
                                <>
                                  <p className="text-xs text-slate-500 leading-relaxed">
                                    Your requested changes go to our team for review. Approved edits go live at the
                                    next weekly release — they never change your live listing instantly.
                                  </p>
                                  <div className="space-y-3">
                                    {EDITABLE_FIELDS[typeKey(item.type)].map((key) => (
                                      <div key={key}>
                                        <label htmlFor={`edit-${item.id}-${key}`} className="block text-xs font-bold text-slate-700 mb-1">
                                          {EDITABLE_FIELD_LABELS[key] || key}
                                        </label>
                                        {key === 'description' ? (
                                          <textarea
                                            id={`edit-${item.id}-${key}`}
                                            rows={3}
                                            value={editFields[key] || ''}
                                            onChange={(e) => setEditFields((prev) => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                                          />
                                        ) : (
                                          <input
                                            id={`edit-${item.id}-${key}`}
                                            type={key === 'phone' || key === 'whatsapp' ? 'tel' : 'text'}
                                            value={editFields[key] || ''}
                                            onChange={(e) => setEditFields((prev) => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    type="button"
                                    disabled={editSaving}
                                    onClick={() => void handleEditSubmit(item)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                                  >
                                    <Pencil className="w-4 h-4" />
                                    {editSaving ? 'Submitting...' : 'Submit Edit Request'}
                                  </button>
                                </>
                              )}
                            </div>
                          )}

                          {showProjects && projectsFor === item.id && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                                  <FolderKanban className="w-4 h-4 text-emerald-600" />
                                  Projects ({(item.projects || []).length}/{projectLimit})
                                </h3>
                                <button
                                  type="button"
                                  onClick={() => setProjectsFor(null)}
                                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                  aria-label="Close projects panel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {(item.projects || []).length > 0 ? (
                                <ul className="space-y-2">
                                  {(item.projects || []).map((project, i) => (
                                    <li key={`${project.title}-${i}`} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start justify-between gap-3">
                                      <div className="min-w-0">
                                        <p className="font-bold text-slate-900 text-xs">{project.title}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{project.description}</p>
                                        {project.link && (
                                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-emerald-600 hover:underline break-all">
                                            {project.link}
                                          </a>
                                        )}
                                      </div>
                                      <button
                                        type="button"
                                        disabled={projectSaving}
                                        onClick={() => void handleProjectRemove(item, i)}
                                        className="text-red-500 hover:text-red-700 shrink-0 cursor-pointer disabled:opacity-50"
                                        aria-label={`Remove project ${project.title}`}
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-xs text-slate-500">No projects yet — showcase your best work below.</p>
                              )}
                              {(item.projects || []).length < projectLimit ? (
                                <div className="space-y-3 pt-1">
                                  <div>
                                    <label htmlFor={`project-title-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">Project title *</label>
                                    <input
                                      id={`project-title-${item.id}`}
                                      type="text"
                                      value={projectTitle}
                                      onChange={(e) => setProjectTitle(e.target.value)}
                                      placeholder="E.g. DHA Phase 9 villa renovation"
                                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor={`project-desc-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                                    <textarea
                                      id={`project-desc-${item.id}`}
                                      rows={2}
                                      value={projectDesc}
                                      onChange={(e) => setProjectDesc(e.target.value)}
                                      placeholder="What did you build, for whom, and what was the outcome?"
                                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor={`project-link-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">Link (optional)</label>
                                    <input
                                      id={`project-link-${item.id}`}
                                      type="url"
                                      value={projectLink}
                                      onChange={(e) => setProjectLink(e.target.value)}
                                      placeholder="https://example.com/project"
                                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    disabled={projectSaving}
                                    onClick={() => void handleProjectAdd(item)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                                  >
                                    <PlusCircle className="w-4 h-4" />
                                    {projectSaving ? 'Adding...' : 'Add Project'}
                                  </button>
                                </div>
                              ) : (
                                <p className="text-xs text-slate-500">
                                  You have reached the {projectLimit}-project limit for your {tierLabel(item.tier)} plan.
                                </p>
                              )}
                            </div>
                          )}

                          {upgradeable && panelOpen && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                  Upgrade “{item.name}”
                                </h3>
                                <button
                                  type="button"
                                  onClick={() => setUpgradeFor(null)}
                                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                  aria-label="Close upgrade panel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div>
                                <label htmlFor={`plan-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">
                                  Choose your upgrade
                                </label>
                                <select
                                  id={`plan-${item.id}`}
                                  value={upgradePlan}
                                  onChange={(e) => setUpgradePlan(e.target.value as 'featured' | 'verified')}
                                  className="w-full sm:w-64 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                                >
                                  <option value="featured">Featured Listing</option>
                                  <option value="verified">Verified Badge</option>
                                </select>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                Pay via the details shared by our team on the{' '}
                                <Link href="/advertise-with-us" className="text-emerald-600 font-semibold hover:underline">Advertise page</Link>{' '}
                                or by contacting us, then upload your payment screenshot here — our admin will verify it.
                                Featured placement and the Verified Badge are rolling out, so an approved upgrade is
                                recorded on your listing now and displayed as each feature goes live.
                              </p>
                              <div>
                                <label htmlFor={`proof-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">
                                  Payment screenshot (image, compressed automatically)
                                </label>
                                <input
                                  id={`proof-${item.id}`}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => setUpgradeFile(e.target.files?.[0] || null)}
                                  className="block w-full text-sm text-slate-600 file:mr-3 file:px-4 file:py-2 file:bg-white file:border file:border-slate-200 file:rounded-xl file:font-bold file:text-xs file:cursor-pointer"
                                />
                                {upgradeFile && <p className="text-[11px] text-slate-400 mt-1">{upgradeFile.name}</p>}
                              </div>
                              <button
                                type="button"
                                disabled={uploading || !upgradeFile}
                                onClick={() => handleUpgradeSubmit(item)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                              >
                                <Upload className="w-4 h-4" />
                                {uploading ? 'Uploading...' : 'Submit Payment Proof'}
                              </button>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>

              {(() => {
                const featuredListing = listings.find((l) => l.tier === 'featured' && l.status === 'approved')
                const used = blogPosts.filter((p) => p.data.status !== 'rejected').length
                const remaining = Math.max(0, blogLimitFor('featured') - used)
                if (!featuredListing) return null
                return (
                  <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5" aria-label="My blog posts">
                    <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-emerald-600" />
                      My Blog Posts
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your Featured listing “{featuredListing.name}” includes up to 2 blog posts. You have used {used} of 2
                      {remaining > 0 ? ` — ${remaining} left.` : '.'} Approved posts appear on the public LocalePak blog.
                    </p>
                    {blogPosts.length > 0 && (
                      <ul className="divide-y divide-slate-100">
                        {blogPosts.map((post) => (
                          <li key={post.id} className="py-3 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 text-sm truncate">{post.data.title || 'Untitled post'}</p>
                              <p className="text-[11px] text-slate-400">/{post.data.slug || post.id}</p>
                            </div>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 ${
                                post.data.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : post.data.status === 'rejected'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {post.data.status === 'approved' ? 'Live' : post.data.status === 'rejected' ? 'Rejected' : 'Pending review'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {remaining > 0 && !blogFormOpen && (
                      <button
                        type="button"
                        onClick={() => setBlogFormOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" /> Write a Blog Post
                      </button>
                    )}
                    {remaining > 0 && blogFormOpen && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-extrabold text-slate-900 text-sm">New blog post</h3>
                          <button
                            type="button"
                            onClick={() => setBlogFormOpen(false)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            aria-label="Close blog form"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
                          <label htmlFor="blog-title" className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                          <input
                            id="blog-title"
                            type="text"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            placeholder="E.g. How to choose the right solar installer in Lahore"
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label htmlFor="blog-excerpt" className="block text-xs font-bold text-slate-700 mb-1">Short summary (optional)</label>
                          <input
                            id="blog-excerpt"
                            type="text"
                            value={blogExcerpt}
                            onChange={(e) => setBlogExcerpt(e.target.value)}
                            placeholder="One line that makes readers click"
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label htmlFor="blog-content" className="block text-xs font-bold text-slate-700 mb-1">Post content * (min 100 characters)</label>
                          <textarea
                            id="blog-content"
                            rows={6}
                            value={blogContent}
                            onChange={(e) => setBlogContent(e.target.value)}
                            placeholder="Write genuinely useful content — tips, guides, or insights from your work. No invented statistics or claims."
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                          />
                          <p className={`text-[11px] mt-1 font-medium ${blogContent.trim().length >= 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {blogContent.trim().length}/100 characters minimum
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={blogSaving}
                          onClick={() => void handleBlogSubmit()}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Newspaper className="w-4 h-4" />
                          {blogSaving ? 'Submitting...' : 'Submit Post for Review'}
                        </button>
                      </div>
                    )}
                  </section>
                )
              })()}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
