'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Lock, LogIn, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { getFirebaseAuth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

// Only same-site relative paths are accepted as a post-login
// destination (e.g. /add-business). Anything else — absolute URLs,
// protocol-relative URLs, empty values — falls back to /dashboard,
// so a ?next= parameter can never bounce the user to another site.
function safeNext(value: string | null): string {
  if (!value) return '/dashboard'
  if (!value.startsWith('/') || value.startsWith('//')) return '/dashboard'
  return value
}

function mapLoginError(err: any): string {
  switch (err?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Invalid email or password.'
    case 'auth/user-not-found':
      return 'No account found with this email. Please create an account first.'
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

function LoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const justRegistered = searchParams.get('registered') === '1'
  const next = searchParams.get('next')
  const returnTo = safeNext(next)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    try {
      const auth = await getFirebaseAuth()
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
      const sessionPayload = {
        email: email.trim(),
        name: cred.user.displayName || email.split('@')[0],
        uid: cred.user.uid,
        userId: cred.user.uid,
        role: 'member',
      }
      sessionStorage.setItem('localepak_user_session', JSON.stringify(sessionPayload))
      localStorage.setItem('localepak_user_session', JSON.stringify(sessionPayload))
      toast.success('Successfully logged into LocalePak.')
      setTimeout(() => {
        router.push(returnTo)
      }, 500)
    } catch (err: any) {
      setErrorMsg(mapLoginError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-10 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
          <LogIn className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Sign In to LocalePak</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Access your LocalePak account and saved preferences.
        </p>
      </div>

      {justRegistered && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Your account was created. Sign in with your email and password
            {next ? ' to continue.' : ' to open your dashboard.'}
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 text-center space-y-2">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link
            href={next ? `/register?next=${encodeURIComponent(next)}` : '/register'}
            className="text-emerald-600 font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
        <Suspense fallback={<div className="text-center text-slate-400 text-sm">Loading sign in...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
