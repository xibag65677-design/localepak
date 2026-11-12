
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

// Firebase Configuration from your project
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456789",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "app-local.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "app-local",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "app-local.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.FIREBASE_APP_ID || "1:000000000000:web:dummy000000000000"
};

// Initialize Firebase App & Firestore Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Business Data Object
const newBusinessData = {
  slug: "orange-line-metro-station-timing-and-routes",
  name: "Orange Line Metro Station Timings & Routes",
  businessName: "Orange Line Metro Station Timings & Routes",
  category: "Transport & Logistics",
  categoryId: "transportation",
  city: "Lahore",
  province: "Punjab",
  rating: 5.0,
  reviewCount: 124,
  verified: true,
  isClaimed: true,
  isFeatured: true,
  status: "approved", // Set status directly to 'approved'
  createdAt: new Date().toISOString(),
  submittedAt: new Date().toISOString(),
  approvedAt: new Date().toISOString(),
  phone: "(042) 111-222-627",
  whatsapp: "9242111222627",
  email: "info@pma.punjab.gov.pk",
  website: "https://pma.punjab.gov.pk/",
  address: "Orange Line Metro Train Corridor, Raiwind Road to Dera Gujran, Lahore, Punjab, Pakistan",
  coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  logo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=200&q=80",
  description: `The Orange Line Metro Train Lahore is Pakistan's premier automated rapid transit system, spanning 27.1 kilometers across Lahore with 26 state-of-the-art stations connecting Dera Gujran to Ali Town. Operating under the official management of the Punjab Mass-transit Authority (PMA), the Orange Line provides fast, air-conditioned, reliable, and eco-friendly public transport for hundreds of thousands of daily commuters across Lahore city.

### Orange Line Train Timing & Daily Schedule
Check the official **orange line train timing** for seamless daily transit across Lahore:
- **Daily Operating Hours**: 06:00 AM to 10:00 PM (Monday through Sunday, 7 Days a Week)
- **Peak Hour Frequency**: Trains arrive every 5 to 7 minutes during morning and evening rush hours.
- **Off-Peak Frequency**: Trains run every 8 to 10 minutes during regular hours.
- **Total Journey Duration**: Complete end-to-end trip from Dera Gujran Station to Ali Town Station takes approximately 45 minutes across all 26 stations.

### Complete Orange Line Station List & Route Map
The **orange train lahore route** stretches over 27.1 km, consisting of 24.3 km of elevated viaducts and 2.8 km of underground subway tracks with 2 central underground stations (Anarkali Station & GPO Station).

Here is the complete **orange train station list** and **orange line station list** in sequential order from Ali Town to Dera Gujran:

1. **Ali Town Station** - South Terminal (Raiwind Road & Thokar Niaz Baig access)
2. **Thokar Niaz Baig Station** - Major intercity bus terminal & Motorway M-2 junction
3. **Canal View Station** - Canal Bank Road, Doctors Hospital & Thokar junction
4. **Hanjarwal Station** - Multan Road residential & commercial center
5. **Wahdat Road Station** - Connecting Wahdat Colony, Allama Iqbal Town & Multan Road
6. **Awan Town Station** - Awan Town commercial market hub
7. **Sabzazar Station** - Sabzazar Housing Scheme & wholesale vegetable market
8. **Shahnoor Station (Khatam-e-Nabuwat)** - Shahnoor Studios & Multan Road industrial hub
9. **Salahuddin Road Station** - Local markets & surrounding residential sectors
10. **Bund Road Station** - Lahore Ring Road interchange & Multan Road exit
11. **Samanabad Station** - Samanabad Roundabout & central Lahore residential hub
12. **Gulshan-e-Ravi Station** - Gulshan-e-Ravi main boulevard & commercial zone
13. **Chauburji Station** - Historical Chauburji monument & Lower Mall junction
14. **Anarkali Station (Underground)** - Heritage station connecting Anarkali Bazaar, Old City & Lake Road
15. **GPO Station (Underground)** - Central business district, Mall Road, General Post Office & High Court
16. **Lakshmi Station** - Lakshmi Chowk food street & hotel center
17. **Railway Station** - Connected directly to Lahore Junction Railway Station for intercity train travelers
18. **Sultanpura Station** - Sultanpura Road & GT Road interchange
19. **UET (University of Engineering and Technology) Station** - Direct university campus access for students & staff
20. **Baghbanpura Station** - GT Road commercial corridor & historic Baghbanpura
21. **Shalamar Garden Station** - UNESCO World Heritage Shalimar Gardens tourist destination
22. **Pakistan Mint Station** - GT Road industrial area & Mint enclave
23. **Mahmood Booti Station** - Ring Road interchange & GT Road northern exit
24. **Salamatpura Station** - Northern GT Road residential sectors
25. **Islam Park Station** - Islam Park community neighborhood
26. **Dera Gujran Station** - North Terminal (Main Depot, Stabling Yard & Maintenance Facility)

### Fares, Tickets & Smart Cards
- **Single Journey Token**: Rs. 20 to Rs. 40 based on distance traveled.
- **Metro Smart Card**: Contactless rechargeable card available at ticket counters for fast tap-and-go access.
- **Discounts**: Concessionary fare options for students, senior citizens, and persons with disabilities.

### Key Facilities & Amenities
- Fully Air-Conditioned Trains & Covered Station Platforms
- Escalators, Elevators, and Tactile Paths for Differently-Abled Passengers
- 24/7 CCTV Security Surveillance & Dedicated Metro Police Force
- Seamless Integration with Lahore Speedo Feeder Bus Network`,
  services: [
    "Daily Passenger Rapid Transit",
    "Orange Line Train Timing Schedules",
    "Orange Line Station List & Route Navigation",
    "Metro Smart Card & Token Ticketing",
    "Feeder Bus Connections Across Lahore",
    "Student & Senior Citizen Discount Passes"
  ],
  operatingHours: { "Monday - Sunday": "06:00 AM - 10:00 PM" },
  features: [
    "26 Modern Stations",
    "Air Conditioned Coaches",
    "Underground & Elevated Track",
    "Wheelchair Accessible",
    "Automated Token & Card Ticketing",
    "24/7 CCTV Security & Police"
  ],
  reviews: [
    {
      id: "rev-orange-1",
      userName: "Muhammad Kamran",
      rating: 5,
      date: "1 day ago",
      comment: "The Orange Line Metro is a lifesaver for commuting across Lahore! Fast, clean, affordable, and always on time."
    },
    {
      id: "rev-orange-2",
      userName: "Usman Ali",
      rating: 5,
      date: "3 days ago",
      comment: "Very convenient route connecting Thokar Niaz Baig all the way to Dera Gujran. Great station facilities."
    }
  ],
  faqs: [
    {
      question: "What are the orange line train timing hours in Lahore?",
      answer: "Orange Line Metro operates daily from 06:00 AM to 10:00 PM, 7 days a week, with trains every 5-7 minutes during peak hours."
    },
    {
      question: "How many stations are in the orange line station list?",
      answer: "There are 26 stations on the Orange Line Lahore route, starting from Ali Town Station and ending at Dera Gujran Station."
    }
  ]
};

async function addBusinessToFirestore() {
  try {
    const customDocId = "biz-orange-line-metro-lahore";
    const docRef = doc(db, "businesses", customDocId);
    await setDoc(docRef, newBusinessData);
    console.log("Successfully added business to Firestore with ID:", customDocId);
    process.exit(0);
  } catch (error) {
    console.error("Error adding business to Firestore:", error);
    process.exit(1);
  }
}

addBusinessToFirestore();
