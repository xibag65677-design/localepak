import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import type { Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456789",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "app-local.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "app-local",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "app-local.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:dummy000000000000"
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

/**
 * True when no real Firebase project is configured: local builds
 * without .env.local fall back to the "app-local" dummy project.
 * Server-side listing reads short-circuit to empty in that case —
 * the Firestore SDK otherwise retries its Listen stream against a
 * project that will never answer, and a single static page can
 * hang past Next's 60s generation timeout (proven 2026-10-27:
 * the tiers build died on /city/mardan/finance after 3 attempts).
 * Production (Vercel) always sets NEXT_PUBLIC_FIREBASE_PROJECT_ID,
 * so live behavior is unchanged — and the short-circuit returns
 * exactly what the failing read's catch block returned anyway.
 */
export const isDummyFirebase = firebaseConfig.projectId === 'app-local'

export const db = getFirestore(app)

/**
 * Firebase Auth, loaded lazily (perf, 2026-11-11).
 *
 * PageSpeed flagged the Firebase auth iframe (localepak.firebaseapp.com
 * /__/auth/iframe.js, 93 KiB) in the homepage critical path: 1,590ms of
 * the 1,971ms critical chain, before any user had signed in. The cause
 * was the old module-scope `getAuth(app)` here: every page that imported
 * this module — including the homepage, via the protection guard in the
 * root layout — paid for Auth initialisation and its iframe fetch.
 *
 * Auth is now created only when something actually needs it: sign-in /
 * sign-up handlers and the auth-state listeners on the login, register,
 * dashboard, admin and add-* pages. All of those call this getter, which
 * dynamic-imports `firebase/auth` once (cached promise) and returns the
 * shared Auth instance. Sign-in, session restore and sign-out behaviour
 * are unchanged — only the timing moved, from page load to first use.
 *
 * `getFirestore` stays eager: it performs no network I/O at
 * initialisation and is needed by the listing reads. (Firebase Storage
 * was removed 2026-11-11: nothing in the codebase imports it — proof
 * screenshots are stored as data URLs in Firestore, not in Storage —
 * so the Storage SDK was dead weight in the shared Firebase chunk.)
 */
let authPromise: Promise<Auth> | null = null
export function getFirebaseAuth(): Promise<Auth> {
  if (!authPromise) {
    authPromise = import("firebase/auth").then(({ getAuth }) => getAuth(app))
  }
  return authPromise
}
export default app
