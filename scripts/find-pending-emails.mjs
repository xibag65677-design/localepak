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

async function run() {
  // Check businesses in firestore
  const bizSnap = await getDocs(collection(db, 'businesses'));
  console.log('Businesses count in firestore:', bizSnap.size);

  const bizList = [];
  bizSnap.forEach(d => {
    bizList.push({ id: d.id, ...d.data() });
  });

  // Check all collections if any other collections exist or what data is there
  console.log('\n--- Checking status of all businesses in Firestore ---');
  bizList.forEach((b, i) => {
    console.log(`${i+1}. id: ${b.id}, name: ${b.name || b.businessName}, status: ${b.status}, paymentStatus: ${b.paymentStatus}, approvedAt: ${b.approvedAt}, submittedAt: ${b.submittedAt}, email: ${b.email}`);
  });

  process.exit(0);
}

run().catch(console.error);
