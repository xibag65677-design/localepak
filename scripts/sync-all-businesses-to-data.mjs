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

async function syncBusinesses() {
  try {
    const snap = await getDocs(collection(db, "businesses"));
    const firestoreApproved = [];
    snap.forEach(docSnap => {
      const data = docSnap.data();
      const status = data.status || 'approved';
      if (status === 'approved') {
        const bName = data.name || data.businessName || 'Verified Business';
        firestoreApproved.push({
          id: docSnap.id,
          slug: data.slug,
          name: bName,
          category: data.category || 'Services',
          categoryId: data.categoryId || 'services',
          city: data.city || 'Lahore',
          province: data.province || 'Pakistan',
          rating: data.rating || 5.0,
          reviewCount: data.reviewCount || 5,
          verified: data.verified ?? true,
          isClaimed: data.isClaimed ?? true,
          isFeatured: data.isFeatured ?? false,
          status: 'approved',
          phone: data.phone || '+92 300 0000000',
          whatsapp: data.whatsapp || '923000000000',
          email: data.email || 'contact@business.pk',
          website: data.website || data.websiteUrl || 'https://www.localepak.com',
          address: data.address || 'Pakistan',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
          logo: data.logo || data.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
          description: data.description || 'Verified business listing on LocalePak.',
          services: data.services || ['Professional Services'],
          operatingHours: data.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
          features: data.features || ['Verified Listing'],
          reviews: data.reviews || [],
          faqs: data.faqs || []
        });
      }
    });

    console.log(`Found ${firestoreApproved.length} approved businesses in Firestore.`);
    fs.writeFileSync(
      path.join(process.cwd(), "scripts", "firestore-approved.json"),
      JSON.stringify(firestoreApproved, null, 2)
    );
    console.log("Saved to scripts/firestore-approved.json");
    process.exit(0);
  } catch (err) {
    console.error("Error syncing businesses:", err);
    process.exit(1);
  }
}

syncBusinesses();
