import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function checkBiznestussa() {
  const snap = await getDocs(collection(db, 'businesses'));
  console.log('Total businesses in biznestussa Firestore:', snap.size);
  
  const all = [];
  snap.forEach(d => {
    all.push({ id: d.id, ...d.data() });
  });

  const pending = all.filter(b => (b.status || '').toLowerCase() === 'pending' || b.paymentStatus === 'PENDING');
  console.log('Pending in biznestussa Firestore:', pending.length);

  // Let's print status distribution
  const statuses = {};
  all.forEach(b => {
    const s = `${b.status} | payment: ${b.paymentStatus}`;
    statuses[s] = (statuses[s] || 0) + 1;
  });
  console.log('Statuses in biznestussa:', statuses);

  if (pending.length > 0) {
    console.log(`\nFound ${pending.length} pending businesses!`);
  }
}

checkBiznestussa().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
