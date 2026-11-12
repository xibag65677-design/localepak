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

async function syncToDataTs() {
  console.log("Fetching latest data from Firestore...");
  
  const bizSnap = await getDocs(collection(db, "businesses"));
  const firestoreBiz = [];
  bizSnap.forEach(d => {
    const data = d.data();
    firestoreBiz.push({
      id: d.id,
      slug: data.slug || d.id,
      name: data.name || data.businessName || 'Verified Business',
      category: data.category || 'Services',
      categoryId: data.categoryId || 'services',
      city: data.city || 'Pakistan',
      cities: data.cities || (data.city ? [data.city] : ['Pakistan']),
      province: data.province || 'Pakistan',
      rating: data.rating || 5.0,
      reviewCount: data.reviewCount || 5,
      verified: data.verified ?? true,
      isClaimed: data.isClaimed ?? true,
      isFeatured: data.isFeatured ?? false,
      status: data.status || 'approved',
      phone: data.phone || '+92 300 0000000',
      whatsapp: data.whatsapp || '923000000000',
      email: data.email || 'contact@business.pk',
      website: data.website || data.websiteUrl || 'https://www.localepak.com',
      address: data.address || 'Pakistan',
      locations: data.locations || [],
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      logo: data.logo || data.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      description: data.description || '',
      services: data.services || ['Professional Services'],
      operatingHours: data.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
      features: data.features || ['Verified Listing'],
      reviews: data.reviews || [],
      faqs: data.faqs || []
    });
  });

  const jobSnap = await getDocs(collection(db, "jobs"));
  const firestoreJobs = [];
  jobSnap.forEach(d => {
    const data = d.data();
    firestoreJobs.push({
      id: d.id,
      slug: data.slug || d.id,
      title: data.title || 'Professional Position',
      company: data.company || data.companyName || 'Verified Enterprise',
      companyId: data.companyId || 'company',
      companyLogo: data.companyLogo || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=100&q=80',
      city: data.city || 'Pakistan',
      cities: data.cities || (data.city ? [data.city] : ['Pakistan']),
      type: data.type || 'full-time',
      category: data.category || 'Technology',
      salary: data.salary || 'Market Competitive',
      experience: data.experience || '1-3 Years',
      vacancies: data.vacancies || 1,
      genderPreference: data.genderPreference || 'Any',
      description: data.description || '',
      responsibilities: data.responsibilities || [],
      requirements: data.requirements || [],
      skills: data.skills || [],
      postedAt: data.postedAt || new Date().toISOString(),
      expiresAt: data.expiresAt || new Date(Date.now() + 30*86400000).toISOString(),
      status: data.status || 'approved',
      isFeatured: data.isFeatured ?? false,
      applicationEmail: data.applicationEmail || 'jobs@localepak.com',
      applicationWhatsapp: data.applicationWhatsapp || '+923000000000',
      applicationWebsite: data.applicationWebsite || 'https://www.localepak.com'
    });
  });

  const proSnap = await getDocs(collection(db, "professionals"));
  const firestorePros = [];
  proSnap.forEach(d => {
    const data = d.data();
    firestorePros.push({
      id: d.id,
      username: data.username || data.slug || d.id,
      slug: data.slug || data.username || d.id,
      name: data.name || data.fullName || 'Verified Professional',
      fullName: data.fullName || data.name || 'Verified Professional',
      title: data.title || 'Professional Specialist',
      profession: data.profession || 'Specialist',
      category: data.category || 'Professional / Job Seeker',
      specialization: data.specialization || 'General',
      city: data.city || 'Pakistan',
      province: data.province || 'Pakistan',
      country: data.country || 'Pakistan',
      address: data.address || '',
      googleMapUrl: data.googleMapUrl || '',
      rating: data.rating || 5.0,
      reviewCount: data.reviewCount || 5,
      hourlyRate: data.hourlyRate || 'Contact for Pricing',
      availability: data.availability || 'Available',
      gender: data.gender || '',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
      bio: data.bio || '',
      about: data.about || data.bio || '',
      skills: data.skills || ['Professional Services'],
      experienceYears: data.experienceYears ?? 5,
      verified: data.verified ?? true,
      isFeatured: data.isFeatured ?? false,
      status: data.status || 'approved',
      profileStatus: data.profileStatus || 'APPROVED',
      verificationStatus: data.verificationStatus || 'VERIFIED',
      phone: data.phone || '+92 300 0000000',
      whatsapp: data.whatsapp || '923000000000',
      email: data.email || 'contact@localepak.com',
      website: data.website || '',
      linkedin: data.linkedin || '',
      github: data.github || '',
      twitter: data.twitter || '',
      servicesOffered: data.servicesOffered || ['Strategic Consulting', 'Professional Advisory'],
      reviews: data.reviews || [],
      faqs: data.faqs || []
    });
  });

  console.log(`Retrieved:`);
  console.log(`- Businesses: ${firestoreBiz.length}`);
  console.log(`- Jobs: ${firestoreJobs.length}`);
  console.log(`- Professionals: ${firestorePros.length}`);

  // Save to scripts/firestore-approved.json
  fs.writeFileSync(
    path.join(process.cwd(), "scripts", "firestore-approved.json"),
    JSON.stringify(firestoreBiz, null, 2)
  );
  console.log("Updated scripts/firestore-approved.json");

  // Now let's read lib/data.ts up to MOCK_BUSINESSES
  const dataTsPath = path.join(process.cwd(), "lib", "data.ts");
  const dataTsContent = fs.readFileSync(dataTsPath, "utf8");

  const bizIndex = dataTsContent.indexOf("export const MOCK_BUSINESSES: BusinessItem[] = [");
  if (bizIndex === -1) {
    throw new Error("Could not locate MOCK_BUSINESSES in lib/data.ts");
  }

  const prefix = dataTsContent.slice(0, bizIndex);

  // Build new data.ts content
  let newContent = prefix;
  newContent += `export const MOCK_BUSINESSES: BusinessItem[] = ${JSON.stringify(firestoreBiz, null, 2)}\n\n`;
  newContent += `export const MOCK_COMPANIES: CompanyItem[] = []\n\n`;
  newContent += `export const MOCK_JOBS: JobItem[] = ${JSON.stringify(firestoreJobs, null, 2)}\n\n`;
  newContent += `export const MOCK_PROFESSIONALS: ProfessionalItem[] = ${JSON.stringify(firestorePros, null, 2)}\n\n`;
  newContent += `export const MOCK_VERIFICATION_REQUESTS: ProfessionalVerificationRequest[] = []\n`;

  fs.writeFileSync(dataTsPath, newContent, "utf8");
  console.log("Successfully synchronized and updated lib/data.ts with all 200+ word descriptions!");
  process.exit(0);
}

syncToDataTs().catch(e => {
  console.error("Error syncing to data.ts:", e);
  process.exit(1);
});
