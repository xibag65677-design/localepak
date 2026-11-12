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

async function validateAll() {
  console.log("=== COMPREHENSIVE FIRESTORE WORD COUNT AUDIT ===");
  
  // 1. Professionals
  const proSnap = await getDocs(collection(db, "professionals"));
  console.log(`\n--- PROFESSIONALS (${proSnap.size}) ---`);
  let proFail = 0;
  proSnap.forEach(d => {
    const data = d.data();
    const words = (data.about || data.description || '').trim().split(/\s+/).filter(Boolean).length;
    const name = data.name || data.fullName || d.id;
    const status = words >= 200 ? "PASS" : "FAIL (<200)";
    if (words < 200) proFail++;
    console.log(`[${status}] [${d.id}] "${name}" -> ${words} words`);
  });

  // 2. Jobs
  const jobSnap = await getDocs(collection(db, "jobs"));
  console.log(`\n--- JOBS (${jobSnap.size}) ---`);
  let jobFail = 0;
  jobSnap.forEach(d => {
    const data = d.data();
    const words = (data.description || '').trim().split(/\s+/).filter(Boolean).length;
    const title = data.title || d.id;
    const status = words >= 200 ? "PASS" : "FAIL (<200)";
    if (words < 200) jobFail++;
    console.log(`[${status}] [${d.id}] "${title}" -> ${words} words`);
  });

  // 3. Businesses
  const bizSnap = await getDocs(collection(db, "businesses"));
  console.log(`\n--- BUSINESSES (${bizSnap.size}) ---`);
  let bizFail = 0;
  bizSnap.forEach(d => {
    const data = d.data();
    const words = (data.description || '').trim().split(/\s+/).filter(Boolean).length;
    const name = data.name || data.businessName || d.id;
    const status = words >= 200 ? "PASS" : "FAIL (<200)";
    if (words < 200) bizFail++;
    console.log(`[${status}] [${d.id}] "${name}" -> ${words} words`);
  });

  console.log("\n=== AUDIT SUMMARY ===");
  console.log(`Professionals: ${proSnap.size - proFail}/${proSnap.size} PASS`);
  console.log(`Jobs: ${jobSnap.size - jobFail}/${jobSnap.size} PASS`);
  console.log(`Businesses: ${bizSnap.size - bizFail}/${bizSnap.size} PASS`);

  if (proFail === 0 && jobFail === 0 && bizFail === 0) {
    console.log("\nALL FIRESTORE RECORDS STRICTLY MEET OR EXCEED 200+ WORDS REQUIREMENT!");
  } else {
    console.error("\nSome records failed the 200-word requirement.");
  }
  process.exit(0);
}

validateAll().catch(e => { console.error(e); process.exit(1); });
