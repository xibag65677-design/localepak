import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


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

async function inspect() {
  const collections = ['businesses', 'professionals', 'jobs', 'companies'];
  for (const colName of collections) {
    const snap = await getDocs(collection(db, colName));
    console.log(`\n=== FIRESTORE COLLECTION: ${colName} (${snap.size} docs) ===`);
    snap.forEach(doc => {
      const d = doc.data();
      const name = d.name || d.fullName || d.title || d.companyName || doc.id;
      const desc = d.description || d.bio || d.about || '';
      const wordCount = desc.trim().split(/\s+/).filter(Boolean).length;
      console.log(`- [${doc.id}] "${name}" | Words: ${wordCount} | slug: ${d.slug || d.username || 'no-slug'}`);
    });
  }

  console.log(`\n=== LOCAL lib/data.ts ===`);
  console.log(`MOCK_BUSINESSES: ${MOCK_BUSINESSES.length}`);
  console.log(`MOCK_COMPANIES: ${MOCK_COMPANIES.length}`);
  console.log(`MOCK_JOBS: ${MOCK_JOBS.length}`);
  console.log(`MOCK_PROFESSIONALS: ${MOCK_PROFESSIONALS.length}`);
  process.exit(0);
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});
