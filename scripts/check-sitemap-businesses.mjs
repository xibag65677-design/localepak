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

async function checkSitemapBusinesses() {
  try {
    const snap = await getDocs(collection(db, "businesses"));
    console.log(`Total businesses in Firestore: ${snap.size}`);
    let approvedCount = 0;
    snap.forEach(d => {
      const data = d.data();
      if ((data.status || 'approved') === 'approved') {
        approvedCount++;
        console.log(`- https://www.localepak.com/business/${data.slug}`);
      }
    });
    console.log(`\nTotal approved businesses accessible for sitemap: ${approvedCount}`);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkSitemapBusinesses();
