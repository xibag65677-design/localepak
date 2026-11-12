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

async function checkPros() {
  const snap = await getDocs(collection(db, "professionals"));
  snap.forEach(d => {
    const data = d.data();
    const bioW = (data.bio || '').trim().split(/\s+/).filter(Boolean).length;
    const aboutW = (data.about || '').trim().split(/\s+/).filter(Boolean).length;
    const descW = (data.description || '').trim().split(/\s+/).filter(Boolean).length;
    console.log(`[${d.id}] ${data.name} | Bio: ${bioW} | About: ${aboutW} | Desc: ${descW} | Total Bio+About: ${bioW + aboutW}`);
  });
  process.exit(0);
}

checkPros().catch(e => { console.error(e); process.exit(1); });
