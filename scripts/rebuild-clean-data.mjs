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

const BASE_HEADER = `export const CITIES = Array.from(new Set([
  // Major Metropolitan Cities (Top Priority)
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta',
  'Faisalabad', 'Multan', 'Gujranwala', 'Sialkot', 'Hyderabad', 'Abbottabad',
  
  // Punjab
  'Sargodha', 'Bahawalpur', 'Sahiwal', 'Gujrat', 'Sheikhupura', 'Jhang', 
  'Bahawalnagar', 'Sadiqabad', 'Kasur', 'Okara', 'Rahim Yar Khan', 'Mianwali', 
  'Vehari', 'Khanewal', 'Mandi Bahauddin', 'Toba Tek Singh', 'Jhelum', 'Bhalwal',
  'Daska', 'Burewala', 'Hafizabad', 'Chiniot', 'Kamoke', 'Pattoki',
  'Jaranwala', 'Kamalia', 'Renala Khurd', 'Samundri', 'Wazirabad',
  'Murree', 'Mian Channu', 'Bhakkar', 'Lalamusa', 'Shakargarh', 'Layyah',
  'Dinga', 'Pakpattan', 'Arifwala', 'Baddomalhi', 'Gojra', 'Ahmedpur East', 
  'Chichawatni', 'Chishtian', 'Mailsi', 'Haroonabad', 'Hasilpur', 'Bhera', 
  'Chakwal', 'Attock', 'Fateh Jang', 'Pindigheb', 'Jand', 'Wah Cantonment',
  'Taxila', 'Hazro', 'Hassan Abdal', 'Sarai Alamgir', 'Dina', 'Sohawa',
  'Kallar Syedan', 'Gujar Khan', 'Kahuta',

  // Khyber Pakhtunkhwa
  'Kohat', 'Lakki Marwat', 'Bannu', 'Karak', 'Tank', 'Hangu', 'Dera Ismail Khan',
  'Mansehra', 'Haripur', 'Havelian', 'Batkhela', 'Mardan', 'Swabi',
  'Nowshera', 'Charsadda', 'Timergara', 'Mingora', 'Saidu Sharif',
  'Kabal', 'Chitral',

  // Sindh
  'Sukkur', 'Larkana', 'Nawabshah', 'Khairpur', 'Mirpur Khas', 'Ghotki', 
  'Jacobabad', 'Shikarpur', 'Dadu', 'Moro', 'Tando Adam', 'Tando Allahyar', 
  'Tando Muhammad Khan', 'Matli', 'Kotri', 'Sehwan', 'Gambat', 'Kandhkot', 
  'Kashmor', 'Mehar', 'Shujabad', 'Warah',

  // Balochistan
  'Gwadar', 'Turbat', 'Pasni', 'Ormara', 'Jiwani', 'Khuzdar', 'Hub', 'Uthal', 
  'Belapat', 'Wadh', 'Nushki', 'Dalbandin', 'Taftan', 'Ziarat', 'Sibi', 'Harnai', 
  'Kohlu', 'Duki', 'Barkhan', 'Loralai', 'Mach', 'Bolan', 'Dera Bugti', 
  'Dera Murad Jamali', 'Sui', 'Pir Koh', 'Usta Muhammad', 'Gandakha', 
  'Jhal Magsi', 'Kachhi', 'Sohbatpur', 'Chaman', 'Zhob', 'Mastung', 'Kalat',

  // Gilgit Baltistan & Azad Kashmir
  'Gilgit', 'Skardu', 'Hunza', 'Nagar', 'Diamer', 'Astore', 'Ghanche', 'Kharmang', 
  'Shigar', 'Baltistan', 'Roundu', 'Ghizer', 'Gakuch', 'Khaplu', 'Muzaffarabad', 
  'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber', 'Hattian Bala', 'Haveli', 'Bagh', 
  'Sudhanoti', 'Poonch', 'Neelum Valley', 'Athmuqam', 'Jhelum Valley', 
  'Leepa Valley', 'Pallandri', 'Trarkhel', 'Hajira', 'Sehnsa'
]))

export const TOP_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
  'Hyderabad', 'Abbottabad', 'Sargodha', 'Bahawalpur', 'Sahiwal',
  'Mardan', 'Sukkur', 'Larkana', 'Gwadar', 'Muzaffarabad'
]

export const CATEGORIES = [
  { id: 'professional-job-seeker', name: 'Professional / Job Seeker', icon: 'users', count: 1450, color: '#2563eb', desc: 'Verified personal profiles for professionals, freelancers, doctors, engineers, skilled workers & job seekers' },
  { id: 'hiring-company-hr', name: 'Hiring Company / HR', icon: 'briefcase', count: 980, color: '#0284c7', desc: 'Verified company hiring profiles, recruitment agencies, HR departments & job vacancy postings across Pakistan' },
  { id: 'restaurants', name: 'Restaurants & Food', icon: 'restaurant', count: 8420, color: '#f59e0b', desc: 'Find local cafes, fine dining, fast food, and food caterers' },
  { id: 'real-estate', name: 'Real Estate & Property', icon: 'real-estate', count: 5210, color: '#10b981', desc: 'Verified property dealers, builders, and real estate consultants' },
  { id: 'technology', name: 'Technology & IT', icon: 'technology', count: 4890, color: '#3b82f6', desc: 'Software houses, web developers, mobile apps, and IT agencies' },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: 'healthcare', count: 6320, color: '#ef4444', desc: 'Hospitals, specialist doctors, diagnostic labs, and pharmacies' },
  { id: 'education', name: 'Education & Training', icon: 'education', count: 3780, color: '#8b5cf6', desc: 'Schools, universities, academies, and professional institutes' },
  { id: 'retail', name: 'Retail & Shopping', icon: 'retail', count: 9100, color: '#ec4899', desc: 'Boutiques, wholesale stores, electronic shops, and markets' },
  { id: 'construction', name: 'Construction & Building', icon: 'construction', count: 2340, color: '#f97316', desc: 'Architects, civil engineers, building contractors, and materials' },
  { id: 'automotive', name: 'Automotive & Vehicles', icon: 'automotive', count: 3560, color: '#14b8a6', desc: 'Auto showrooms, workshops, car rental, and spare parts' },
  { id: 'finance', name: 'Finance & Banking', icon: 'finance', count: 1890, color: '#6366f1', desc: 'Chartered accountants, tax consultants, and financial advisors' },
  { id: 'travel', name: 'Travel & Tourism', icon: 'travel', count: 2670, color: '#0ea5e9', desc: 'Travel agencies, Umrah tour operators, and visa consultants' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: 'beauty', count: 4120, color: '#d946ef', desc: 'Beauty salons, spas, fitness gyms, and skincare clinics' },
  { id: 'logistics', name: 'Logistics & Courier', icon: 'logistics', count: 1950, color: '#84cc16', desc: 'Goods transport, freight forwarders, and logistics services' },
  { id: 'home-services', name: 'Home Services & Repairs', icon: 'home-services', count: 3410, color: '#0284c7', desc: 'Plumbers, electricians, AC technicians, painters, and handymen' },
  { id: 'legal', name: 'Legal & Law Consultants', icon: 'legal', count: 1540, color: '#4f46e5', desc: 'Advocates, corporate lawyers, tax attorneys, and legal firms' },
  { id: 'solar-energy', name: 'Solar & Renewable Energy', icon: 'solar-energy', count: 2180, color: '#eab308', desc: 'Solar panel installers, inverter suppliers, and green energy firms' },
  { id: 'events', name: 'Event Management & Wedding', icon: 'events', count: 2890, color: '#f43f5e', desc: 'Marquees, wedding planners, catering, photography, and sound' },
  { id: 'manufacturing', name: 'Manufacturing & Industrial', icon: 'manufacturing', count: 1760, color: '#64748b', desc: 'Factories, industrial machinery, textile mills, and suppliers' },
  { id: 'agriculture', name: 'Agriculture & Farming', icon: 'agriculture', count: 1420, color: '#15803d', desc: 'Agri machinery, fertilizers, seed suppliers, and livestock' },
  { id: 'security', name: 'Security Services & Systems', icon: 'security', count: 1120, color: '#334155', desc: 'CCTV cameras, security guard agencies, and access control' },
  { id: 'printing', name: 'Printing & Packaging', icon: 'printing', count: 1680, color: '#9333ea', desc: 'Offset printing, box packaging, flex printing, and signage' },
  { id: 'furniture', name: 'Furniture & Interior Decor', icon: 'furniture', count: 2310, color: '#b45309', desc: 'Home furniture, office tables, interior designers, and decor' },
  { id: 'media', name: 'Media, PR & Advertising', icon: 'media', count: 1290, color: '#06b6d4', desc: 'Digital marketing agencies, billboards, PR, and video production' },
  { id: 'sports', name: 'Sports & Fitness Gyms', icon: 'sports', count: 1850, color: '#dc2626', desc: 'Fitness centers, sports gear, martial arts, and swimming pools' },
  { id: 'pets', name: 'Pets & Veterinary Clinics', icon: 'pets', count: 980, color: '#d97706', desc: 'Vet doctors, pet shops, animal food, and grooming salons' },
]

export interface BusinessLocation {
  id?: string
  city: string
  address: string
  isPrimary?: boolean
  phone?: string
  lat?: number
  lng?: number
}

export interface BusinessItem {
  id: string
  slug: string
  name: string
  category: string
  categoryId: string
  city: string
  cities?: string[]
  province: string
  rating: number
  reviewCount: number
  verified: boolean
  isClaimed: boolean
  isFeatured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string
  ownerName?: string
  phone: string
  whatsapp: string
  email: string
  website: string
  address: string
  locations?: BusinessLocation[]
  coverImage: string
  logo: string
  description: string
  services: string[]
  operatingHours: { [key: string]: string }
  features: string[]
  reviews: {
    id: string
    userName: string
    rating: number
    date: string
    comment: string
    avatar?: string
  }[]
  faqs: { question: string; answer: string }[]
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: string
  status: 'unread' | 'read'
}

export interface CompanyItem {
  id: string
  slug: string
  name: string
  category: string
  city: string
  cities?: string[]
  province: string
  rating: number
  reviewCount: number
  verified: boolean
  isClaimed: boolean
  isFeatured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  submittedAt?: string
  approvedAt?: string
  phone: string
  whatsapp: string
  email: string
  website: string
  address: string
  coverImage: string
  logo: string
  description: string
  services: string[]
  operatingHours: { [key: string]: string }
  features: string[]
  reviews: { id: string; userName: string; rating: number; date: string; comment: string; avatar?: string }[]
  faqs: { question: string; answer: string }[]
}

export interface JobItem {
  id: string
  slug?: string
  title: string
  company: string
  companyId?: string
  companyLogo: string
  city: string
  cities?: string[]
  type: string
  category: string
  salary: string
  experience: string
  vacancies?: number
  genderPreference?: string
  description: string
  responsibilities?: string[]
  requirements?: string[]
  skills: string[]
  postedAt: string
  expiresAt: string
  status?: 'pending' | 'approved' | 'rejected'
  isFeatured?: boolean
  applicationEmail?: string
  applicationWhatsapp?: string
  applicationWebsite?: string
}

export interface ProfessionalVerificationPaymentDetails {
  method: string
  referenceNumber: string
  amount: number
  screenshotUrl?: string
  paymentDate?: string
  bankAccountName?: string
  verifiedAt?: string
  verifiedBy?: string
  adminNotes?: string
}

export interface ProfessionalVerificationRequest {
  id: string
  professionalProfileId: string
  username: string
  proName: string
  profession: string
  city: string
  avatar: string
  amount: number
  paymentMethod: string
  paymentReference: string
  paymentScreenshot?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string
  approvedAt?: string
  rejectionReason?: string
  reviewedBy?: string
}

export interface ProfessionalInquiry {
  id: string
  proUsername: string
  proName: string
  senderName: string
  senderEmail: string
  senderWhatsApp: string
  message: string
  createdAt: string
  status?: 'new' | 'replied' | 'archived'
}

export interface ProfessionalItem {
  id: string
  userId?: string
  username: string
  slug?: string
  name: string
  fullName?: string
  title: string
  profession: string
  category: string
  specialization?: string
  city: string
  province?: string
  country?: string
  address?: string
  googleMapUrl?: string
  rating: number
  reviewCount: number
  hourlyRate: string
  availability: string
  gender?: string
  avatar: string
  coverImage: string
  bio: string
  about?: string
  description?: string
  skills: string[]
  experienceYears: number
  verified: boolean
  isFeatured?: boolean
  status: 'pending' | 'approved' | 'rejected'
  profileStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  verificationStatus?: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED'
  verificationRequestStatus?: 'NOT_REQUESTED' | 'PENDING' | 'APPROVED' | 'REJECTED'
  verificationPaymentDetails?: ProfessionalVerificationPaymentDetails
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  verifiedAt?: string
  verifiedBy?: string
  rejectionReason?: string
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  portfolio?: string
  linkedin?: string
  github?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
  servicesOffered?: string[]
  experienceList?: {
    id: string
    role: string
    company: string
    period: string
    description?: string
  }[]
  educationList?: {
    id: string
    degree: string
    institution: string
    year: string
  }[]
  currentCompany?: string
  languages?: string[]
  reviews?: {
    id: string
    userName: string
    rating: number
    date: string
    comment: string
    avatar?: string
  }[]
  faqs?: { question: string; answer: string }[]
}
`;

async function rebuildDataTs() {
  console.log("Fetching from Firestore to rebuild lib/data.ts cleanly...");
  
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

  const fullDataTs = `${BASE_HEADER}
export const MOCK_BUSINESSES: BusinessItem[] = ${JSON.stringify(firestoreBiz, null, 2)}

export const MOCK_COMPANIES: CompanyItem[] = []

export const MOCK_JOBS: JobItem[] = ${JSON.stringify(firestoreJobs, null, 2)}

export const MOCK_PROFESSIONALS: ProfessionalItem[] = ${JSON.stringify(firestorePros, null, 2)}

export const MOCK_VERIFICATION_REQUESTS: ProfessionalVerificationRequest[] = []
`;

  fs.writeFileSync(path.join(process.cwd(), "lib", "data.ts"), fullDataTs, "utf8");
  console.log("Successfully rebuilt lib/data.ts cleanly!");
  process.exit(0);
}

rebuildDataTs().catch(e => { console.error(e); process.exit(1); });
