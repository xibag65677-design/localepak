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

async function fetchAll() {
  try {
    const snap = await getDocs(collection(db, "businesses"));
    console.log("Total docs in Firestore 'businesses':", snap.size);
    snap.forEach(doc => {
      const data = doc.data();
      console.log(`ID: ${doc.id} | Name: ${data.name || data.businessName} | Slug: ${data.slug}`);
    });
    process.exit(0);
  } catch (err) {
    console.error("Error fetching docs:", err);
    process.exit(1);
  }
}

fetchAll();
