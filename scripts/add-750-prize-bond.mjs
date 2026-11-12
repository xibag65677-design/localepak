import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

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

const prizeBond750Data = {
  name: "750 Prize Bond List 2025",
  businessName: "750 Prize Bond List 2025",
  slug: "750-prize-bond-list-2025",
  category: "Finance & Banking",
  categoryId: "finance",
  city: "Lahore",
  province: "Pakistan",
  address: "State Bank of Pakistan Islamabad",
  phone: "03038548545",
  whatsapp: "03038548545",
  email: "contact@business.pk",
  website: "https://www.localepak.com",
  coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
  rating: 5.0,
  reviewCount: 5,
  verified: true,
  isClaimed: true,
  isFeatured: false,
  status: "approved",
  ownerName: "Business Representative",
  approvedBy: "FR4rvkUjubQ316hvvHyeR44bI8n1",
  approvedAt: new Date().toISOString(),
  submittedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  services: [
    "Prize Bonds",
    "750 Prize Bond Draw Search",
    "Quarterly Draw Schedules",
    "SBP Official Winner List PDF"
  ],
  operatingHours: {
    "Monday - Saturday": "09:00 AM - 07:00 PM"
  },
  features: [
    "Verified Listing",
    "Instant Online Result Search",
    "Official SBP Draw Schedules"
  ],
  description: `If you are looking to check the official winning numbers and draw schedules for the **Rs. 750 Prize Bond List 2025**, keeping track of balloting results is essential. Issued and backed by the Central Directorate of National Savings (CDNS) and the State Bank of Pakistan (SBP), the Rs. 750 prize bond is one of the most widely held financial securities in Pakistan.

### About the Rs. 750 Prize Bond

The Rs. 750 denomination prize bond offers investors a completely safe capital investment with zero risk to the principal amount, along with the opportunity to win substantial cash rewards through quarterly lucky draws.

### Rs. 750 Prize Bond Draw Schedule & Balloting

The State Bank of Pakistan conducts the official draw for the Rs. 750 prize bond four times a year on a quarterly basis:
- **January**
- **April**
- **July**
- **October**

Draws rotate across SBP Banking Services Corporation branches in major cities, including Lahore, Karachi, Rawalpindi, Peshawar, Multan, and Faisalabad.

### Prize Money & Prize Pool Distribution

Each draw of the Rs. 750 prize bond awards thousands of lucky winners across three main categories:

- **1st Prize:** 1 lucky winner receives **Rs. 1,500,000 (15 Lakh PKR)**
- **2nd Prize:** 3 lucky winners receive **Rs. 500,000 (5 Lakh PKR)** each
- **3rd Prize:** 1,696 winners receive **Rs. 9,300** each

### How to Check 750 Prize Bond Draw Results Online

1. **Search Bond Serial Number**: Enter your specific 6-digit prize bond number into our online search tool to check instant matches.
2. **Download PDF Winner Lists**: Access full official draw result lists published directly following SBP balloting.
3. **Verify Historical Draw Results**: Look up previous 750 prize bond lists from 2024, 2025, and upcoming 2026 draw schedules.`,
  reviews: [
    {
      id: "rev-pb-1",
      userName: "Tariq Mehmood",
      rating: 5,
      date: "Just now",
      comment: "Excellent platform for checking 750 Prize Bond List 2025 draw results quickly and accurately."
    },
    {
      id: "rev-pb-2",
      userName: "Saima Khan",
      rating: 5,
      date: "1 day ago",
      comment: "Very easy to search bond numbers for Rs 750 prize bond. Highly recommended!"
    }
  ],
  faqs: [
    {
      question: "When is the next draw for Rs 750 prize bond in 2025?",
      answer: "Draws for the Rs. 750 prize bond take place quarterly in January, April, July, and October."
    },
    {
      question: "What is the first prize amount for 750 Prize Bond?",
      answer: "The 1st prize for the Rs. 750 Prize Bond is Rs. 1,500,000 (15 Lakh PKR)."
    }
  ]
};

async function add750PrizeBond() {
  try {
    const customDocId = "biz-750-prize-bond-list-2025";
    const docRef = doc(db, "businesses", customDocId);
    await setDoc(docRef, prizeBond750Data);
    console.log("Successfully added 750 Prize Bond List 2025 to Firestore ID:", customDocId);
    process.exit(0);
  } catch (err) {
    console.error("Error inserting 750 Prize Bond into Firestore:", err);
    process.exit(1);
  }
}

add750PrizeBond();
