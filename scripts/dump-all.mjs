import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from "fs";
import path from "path";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456789",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "app-local.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "app-local",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "app-local.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.FIREBASE_APP_ID || "1:000000000000:web:dummy000000000000"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function dumpAll() {
  const result = {};
  const collections = ['businesses', 'professionals', 'jobs'];
  for (const col of collections) {
    const snap = await getDocs(collection(db, col));
    result[col] = [];
    snap.forEach(d => {
      result[col].push({ id: d.id, ...d.data() });
    });
  }
  fs.writeFileSync(path.join(process.cwd(), "scripts", "all-db-dump.json"), JSON.stringify(result, null, 2));
  console.log(`Dumped:`);
  console.log(`- Businesses: ${result.businesses.length}`);
  console.log(`- Professionals: ${result.professionals.length}`);
  console.log(`- Jobs: ${result.jobs.length}`);
  process.exit(0);
}

dumpAll().catch(e => { console.error(e); process.exit(1); });
