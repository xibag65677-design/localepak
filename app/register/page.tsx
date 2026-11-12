'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Lock, UserPlus, Building2, Phone, User, ArrowRight, Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { isValidPakistaniPhone, normalizePakistaniPhone, sanitizePhoneInput } from '@/lib/validation'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { queueWelcomeEmail } from '@/lib/mail'

const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { key: 'lowercase', label: 'One lowercase letter (a-z)', test: (p: string) => /[a-z]/.test(p) },
  { key: 'uppercase', label: 'One uppercase letter (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'number', label: 'One number (0-9)', test: (p: string) => /\d/.test(p) },
  { key: 'special', label: 'One special character (!@#$ etc.)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function mapRegisterError(err: any): string {
  switch (err?.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password is too weak. Please follow all the password rules below.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.'
    default:
      return 'Registration failed. Please try again later.'
  }
}

function RegisterForm() {
  const searchParams = useSearchParams()
  // Where to send the user after sign-in (e.g. /add-business): kept
  // through signup so the chain ends back at the page they came from.
  const next = searchParams.get('next')
  const [ownerName, setOwnerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const router = useRouter()

  const passwordChecks = PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(password) }))
  const passwordValid = passwordChecks.every((c) => c.passed)

  const validatePhone = (value: string): boolean => isValidPakistaniPhone(value)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setPhoneError('')

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 300 1234567).')
      return
    }

    if (!passwordValid) {
      setErrorMsg('Your password does not meet all the requirements yet. Please complete the checklist below.')
      return
    }

    setIsLoading(true)
    try {
      const auth = await getFirebaseAuth()
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
      const uid = cred.user.uid

      await setDoc(doc(db, 'users', uid), {
        ownerName: ownerName.trim(),
        email: email.trim(),
        phone: normalizePakistaniPhone(phone),
        company: company.trim() || '',
        role: 'member',
        createdAt: serverTimestamp(),
      })

      await updateProfile(cred.user, { displayName: ownerName.trim() })

      // Welcome email — sent via the site's /api/send-mail route (Brevo).
      // queueWelcomeEmail never throws, so it cannot break registration.
      await queueWelcomeEmail(email.trim(), ownerName.trim())

      // Owner flow: account is created signed-out; the user signs in separately.
      await signOut(auth)

      toast.success('Account created successfully. Please sign in to continue.')
      router.push(next ? `/login?registered=1&next=${encodeURIComponent(next)}` : '/login?registered=1')
    } catch (err: any) {
      const friendly = mapRegisterError(err)
      setErrorMsg(friendly)
      toast.error(friendly)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-3">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Register LocalePak Account</h1>
            <p className="text-xs text-slate-500 mt-1">List your business and connect with customers across Pakistan</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Owner Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Muhammad Ali"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ali@company.pk"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                  placeholder="+92 300 1234567"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
              {phoneError && <p className="text-[11px] text-red-600 font-medium mt-1">{phoneError}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Store Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Pak Tech Solutions"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
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
              <ul className="mt-2.5 space-y-1.5" aria-label="Password requirements">
                {passwordChecks.map((check) => (
                  <li
                    key={check.key}
                    className={`flex items-center gap-2 text-[11px] font-medium ${check.passed ? 'text-emerald-600' : 'text-slate-400'}`}
                  >
                    {check.passed ? (
                      <Check className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{check.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating Account...' : 'Register Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link
              href={next ? `/login?next=${encodeURIComponent(next)}` : '/login'}
              className="text-emerald-600 font-bold hover:underline"
            >
              Sign In Here
            </Link>
          </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
        <Suspense fallback={<div className="text-center text-slate-400 text-sm">Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
