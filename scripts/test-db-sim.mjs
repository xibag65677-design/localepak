import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

// Let's test with branches (LocalePak) first
const firebaseConfigLocalePak = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456789",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "app-local.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "app-local",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "app-local.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.FIREBASE_APP_ID || "1:000000000000:web:dummy000000000000"
};

// Also BizNestUSA
const firebaseConfigBizNest = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456789",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "app-local.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "app-local",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "app-local.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.FIREBASE_APP_ID || "1:000000000000:web:dummy000000000000"
};

// Read data.ts from branches
const content = fs.readFileSync('d:/localepak/branches/lib/data.ts', 'utf8');
const s = content.indexOf('export const MOCK_BUSINESSES: BusinessItem[] = ');
const start = content.indexOf('[', s);
const end = content.indexOf('export const MOCK_COMPANIES', start);
const mockBiz = JSON.parse(content.slice(start, end).trim().replace(/;\s*$/, ''));

console.log('MOCK_BUSINESSES in LocalePak data.ts:', mockBiz.length);

// What about usa-dollar-pr data.ts?
if (fs.existsSync('d:/usa-dollar-pr/lib/data.ts')) {
  const contentUSA = fs.readFileSync('d:/usa-dollar-pr/lib/data.ts', 'utf8');
  const sUSA = contentUSA.indexOf('export const MOCK_BUSINESSES');
  if (sUSA !== -1) {
    const startUSA = contentUSA.indexOf('[', sUSA);
    const endUSA = contentUSA.indexOf('export const MOCK_COMPANIES', startUSA);
    if (endUSA !== -1) {
      const mockBizUSA = JSON.parse(contentUSA.slice(startUSA, endUSA).trim().replace(/;\s*$/, ''));
      console.log('MOCK_BUSINESSES in BizNestUSA data.ts:', mockBizUSA.length);
    }
  }
}
