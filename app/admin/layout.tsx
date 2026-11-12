'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { doc, getDoc, collection, query, where, getCountFromServer } from 'firebase/firestore'
import {
  LayoutDashboard, Building2, Factory, Briefcase, Star, CreditCard,
  Mail, FileText, Users, Home, LayoutGrid, LogOut, ShieldAlert,
  Lock, Eye, EyeOff, AlertCircle, ShieldCheck, Pencil, Newspaper, UserRound, Settings,
} from 'lucide-react'
import { toast } from 'sonner'

const NAV = [
  { href: '/admin', label: 'Overview', Icon: LayoutDashboard, exact: true },
  { href: '/admin/businesses', label: 'Businesses', Icon: Building2 },
  { href: '/admin/companies', label: 'Companies', Icon: Factory },
  { href: '/admin/jobs', label: 'Jobs', Icon: Briefcase },
  { href: '/admin/professionals', label: 'Professionals', Icon: UserRound },
  { href: '/admin/reviews', label: 'Reviews', Icon: Star },
  { href: '/admin/payments', label: 'Payment Proofs', Icon: CreditCard },
  { href: '/admin/edit-requests', label: 'Edit Requests', Icon: Pencil },
  { href: '/admin/blog-posts', label: 'Blog Posts', Icon: Newspaper },
  { href: '/admin/messages', label: 'Messages', Icon: Mail },
  { href: '/admin/applications', label: 'Applications', Icon: FileText },
  { href: '/admin/users', label: 'Users', Icon: Users },
  { href: '/admin/settings', label: 'Settings', Icon: Settings },
]

function mapAdminLoginError(err: any): string {
  switch (err?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Invalid email or password.'
    case 'auth/user-not-found':
      return 'No account found with this email.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many failed sign-in attempts. Please wait a while and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.'
    default:
      return 'Sign-in failed. Please try again later.'
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [state, setState] = useState<'loading' | 'login' | 'denied' | 'ok'>('loading')
  const [user, setUser] = useState<User | null>(null)
  const [pendingTotal, setPendingTotal] = useState(0)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginBusy, setLoginBusy] = useState(false)

  useEffect(() => {
    let unsub: (() => void) | undefined
    getFirebaseAuth().then((a) => {
      unsub = onAuthStateChanged(a, async (u) => {
        setUser(u)
        if (!u) {
          setState('login')
          return
        }
        try {
          const snap = await getDoc(doc(db, 'users', u.uid))
          const role = snap.exists() ? (snap.data() as any).role : null
          setState(role === 'admin' ? 'ok' : 'denied')
        } catch {
          setState('denied')
        }
      })
    })
    return () => unsub?.()
  }, [])

  // Total pending badge: businesses + companies + jobs + professionals +
  // reviews + payment proofs + edit requests + blog posts waiting for
  // review. Aggregation counts only (getCountFromServer) — no documents
  // are read. Refreshed whenever the admin moves between pages, so
  // working through a queue drops the number.
  useEffect(() => {
    if (state !== 'ok') return
    let cancelled = false
    const load = async () => {
      const cols = ['businesses', 'companies', 'jobs', 'professionals', 'reviews', 'payment_proofs', 'edit_requests', 'blog_posts']
      const snaps = await Promise.all(
        cols.map((c) =>
          getCountFromServer(query(collection(db, c), where('status', '==', 'pending'))).catch(() => null)
        )
      )
      if (cancelled) return
      setPendingTotal(snaps.reduce((sum, s) => sum + (s ? s.data().count : 0), 0))
    }
    load()
    return () => {
      cancelled = true
    }
  }, [state, pathname])

  const handleSignOut = async () => {
    try {
      await signOut(await getFirebaseAuth())
    } catch {
      // ignore — redirect regardless
    }
    toast.success('You have been signed out.')
    router.push('/')
  }

  // Sign out without leaving /admin — the auth listener flips the screen
  // back to the admin sign-in form (used on the access-denied card when
  // the visitor is signed in with a non-admin account).
  const handleSignOutStay = async () => {
    try {
      await signOut(await getFirebaseAuth())
    } catch {
      // ignore — listener will settle the state
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginBusy(true)
    try {
      await signInWithEmailAndPassword(await getFirebaseAuth(), loginEmail.trim(), loginPassword)
      setLoginPassword('')
      // The auth listener re-checks the account role and either opens the
      // panel or shows access denied.
    } catch (err: any) {
      setLoginError(mapAdminLoginError(err))
    } finally {
      setLoginBusy(false)
    }
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans">
        <p className="text-sm text-slate-500">Checking admin access...</p>
      </div>
    )
  }

  if (state === 'login') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans px-4 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 max-w-md w-full shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3.5 rounded-2xl bg-slate-900 text-white shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Sign In</h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Sign in with your administrator account to open the LocalePak admin panel.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@localepak.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginBusy}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              {loginBusy ? 'Signing in...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-emerald-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 max-w-md w-full">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
          <h1 className="font-extrabold text-slate-900 text-xl">Access denied</h1>
          <p className="text-sm text-slate-500">
            This area is for LocalePak administrators only. Your account does not have the admin role.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link href="/" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
              Back to Home
            </Link>
            <button
              type="button"
              onClick={handleSignOutStay}
              className="px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0 bg-slate-900 text-white lg:min-h-screen">
        <div className="p-5 space-y-1 border-b border-white/10">
          <p className="font-extrabold text-lg tracking-tight">LocalePak Admin</p>
          <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
        </div>
        <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Admin">
          {NAV.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname?.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  active ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {href === '/admin' && pendingTotal > 0 && (
                  <span
                    className="ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-extrabold"
                    aria-label={`${pendingTotal} items pending review`}
                  >
                    {pendingTotal}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 lg:border-t border-white/10 flex lg:flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap">
            <LayoutGrid className="w-4 h-4 shrink-0" /> My Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap">
            <Home className="w-4 h-4 shrink-0" /> Site Home
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main id="main-content" className="flex-1 min-w-0 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
