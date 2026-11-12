// ============================================================
// LocalePak — Seed business listings (FULLY STATIC dataset)
// ------------------------------------------------------------
// Source: ~/workspace/localepak-seed-businesses.md (research list,
// 21 Oct 2026) — dataset now 116 Pakistani businesses (expanded from
// the original 91; added entries' sourcing to be re-confirmed).
//
// INTEGRITY RULES baked into this dataset:
// - Only publicly verified fields are included. Where the source
//   marked a phone "VERIFY" (unconfirmed), the phone is OMITTED
//   entirely — no phone, address, rating or review data is ever
//   invented for these listings.
// - Descriptions are factual from name + category + city, with a
//   generic category-level sentence. No claims about the specific
//   business (no founding years, no stats, no superlatives).
// - `seed: true` marks these as directory-created listings that
//   the business has not yet claimed. Pages for them are fully
//   static (generateStaticParams) and make ZERO Firestore reads.
// ============================================================

export type SeedBusiness = {
  seed: true
  slug: string
  name: string
  /** Category display name, e.g. 'Technology & IT' */
  category: string
  /** Site category id from lib/data CATEGORIES, e.g. 'technology' */
  categorySlug: string
  city: string
  citySlug: string
  /** Present ONLY when the phone was publicly verified in the source list. */
  phone?: string
  description: string
}

export const SEED_BUSINESSES: SeedBusiness[] = [
  {
    seed: true,
    slug: "nayatel",
    name: "Nayatel",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-111-144-444",
    description: "Nayatel is listed on LocalePak under Technology & IT in Islamabad, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "tcs-express",
    name: "TCS Express",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-123-456",
    description: "TCS Express is listed on LocalePak under Logistics & Courier in Karachi, Pakistan. Companies in this category handle parcel delivery, shipment tracking and cash-on-delivery services for individuals and online sellers."
  },
  {
    seed: true,
    slug: "daewoo-express",
    name: "Daewoo Express",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    phone: "111-007-008 / 0304-111-7008",
    description: "Daewoo Express is listed on LocalePak under Travel & Tourism in Lahore, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "faisal-movers",
    name: "Faisal Movers",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    phone: "061-111-22-44-88",
    description: "Faisal Movers is listed on LocalePak under Travel & Tourism in Lahore, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "stormfiber",
    name: "StormFiber",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Karachi",
    citySlug: "karachi",
    phone: "111-1-STORM (78676)",
    description: "StormFiber is listed on LocalePak under Technology & IT in Karachi, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "leopards-courier",
    name: "Leopards Courier",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-300-786",
    description: "Leopards Courier is listed on LocalePak under Logistics & Courier in Karachi, Pakistan. Companies in this category handle parcel delivery, shipment tracking and cash-on-delivery services for individuals and online sellers."
  },
  {
    seed: true,
    slug: "chughtai-lab",
    name: "Chughtai Lab",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    phone: "03-111-456-789",
    description: "Chughtai Lab is listed on LocalePak under Healthcare & Medical in Lahore, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "rehman-travels",
    name: "Rehman Travels",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-111-786-785",
    description: "Rehman Travels is listed on LocalePak under Travel & Tourism in Islamabad, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "shaukat-khanum-memorial-cancer-hospital",
    name: "Shaukat Khanum Memorial Cancer Hospital",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35905000",
    description: "Shaukat Khanum Memorial Cancer Hospital is listed on LocalePak under Healthcare & Medical in Lahore, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "postex",
    name: "PostEx",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-32157777",
    description: "PostEx is listed on LocalePak under Logistics & Courier in Lahore, Pakistan. Companies in this category handle parcel delivery, shipment tracking and cash-on-delivery services for individuals and online sellers."
  },
  {
    seed: true,
    slug: "mahir-company",
    name: "Mahir Company",
    category: "Home Services & Repairs",
    categorySlug: "home-services",
    city: "Lahore",
    citySlug: "lahore",
    phone: "0309-6661919",
    description: "Mahir Company is listed on LocalePak under Home Services & Repairs in Lahore, Pakistan. Providers in this category offer repair, maintenance and installation services — such as plumbing, electrical work and appliance servicing — at customers’ homes and offices."
  },
  {
    seed: true,
    slug: "student-biryani",
    name: "Student Biryani",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-111-778",
    description: "Student Biryani is listed on LocalePak under Restaurants & Food in Karachi, Pakistan. Businesses in this category serve dine-in, takeaway and delivery customers in their local area."
  },
  {
    seed: true,
    slug: "inverex-solar-energy",
    name: "Inverex Solar Energy",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-209-988",
    description: "Inverex Solar Energy is listed on LocalePak under Solar & Renewable Energy in Karachi, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "dr-essa-laboratory-and-diagnostic-centre",
    name: "Dr Essa Laboratory & Diagnostic Centre",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-111-786-986",
    description: "Dr Essa Laboratory & Diagnostic Centre is listed on LocalePak under Healthcare & Medical in Karachi, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "savour-foods",
    name: "Savour Foods",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-2348097",
    description: "Savour Foods is listed on LocalePak under Restaurants & Food in Islamabad, Pakistan. Businesses in this category serve dine-in, takeaway and delivery customers in their local area."
  },
  {
    seed: true,
    slug: "ptcl-flash-fiber",
    name: "PTCL Flash Fiber",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Lahore",
    citySlug: "lahore",
    description: "PTCL Flash Fiber is listed on LocalePak under Technology & IT in Lahore, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "transworld-home",
    name: "Transworld Home",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Karachi",
    citySlug: "karachi",
    description: "Transworld Home is listed on LocalePak under Technology & IT in Karachi, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "optix",
    name: "Optix",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Lahore",
    citySlug: "lahore",
    description: "Optix is listed on LocalePak under Technology & IT in Lahore, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "wateen-telecom",
    name: "Wateen Telecom",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Lahore",
    citySlug: "lahore",
    description: "Wateen Telecom is listed on LocalePak under Technology & IT in Lahore, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "m-and-p-express-logistics",
    name: "M&P Express Logistics",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Karachi",
    citySlug: "karachi",
    description: "M&P Express Logistics is listed on LocalePak under Logistics & Courier in Karachi, Pakistan. Companies in this category handle parcel delivery, shipment tracking and cash-on-delivery services for individuals and online sellers."
  },
  {
    seed: true,
    slug: "butt-karahi",
    name: "Butt Karahi",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Lahore",
    citySlug: "lahore",
    phone: "0331-4444726",
    description: "Butt Karahi is listed on LocalePak under Restaurants & Food in Lahore, Pakistan. Businesses in this category serve dine-in, takeaway and delivery customers in their local area."
  },
  {
    seed: true,
    slug: "faisal-movers-multan-terminal",
    name: "Faisal Movers (Multan Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Multan",
    citySlug: "multan",
    description: "Faisal Movers (Multan Terminal) is listed on LocalePak under Travel & Tourism in Multan, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "daewoo-express-karachi-terminal",
    name: "Daewoo Express (Karachi Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Karachi",
    citySlug: "karachi",
    description: "Daewoo Express (Karachi Terminal) is listed on LocalePak under Travel & Tourism in Karachi, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "shaukat-khanum-hospital-peshawar",
    name: "Shaukat Khanum Hospital (Peshawar)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Peshawar",
    citySlug: "peshawar",
    phone: "091-5885000",
    description: "Shaukat Khanum Hospital (Peshawar) is listed on LocalePak under Healthcare & Medical in Peshawar, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "chughtai-lab-karachi",
    name: "Chughtai Lab (Karachi)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Karachi",
    citySlug: "karachi",
    phone: "03-111-456-789",
    description: "Chughtai Lab (Karachi) is listed on LocalePak under Healthcare & Medical in Karachi, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "islamabad-diagnostic-centre-idc",
    name: "Islamabad Diagnostic Centre (IDC)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "0345-0048536",
    description: "Islamabad Diagnostic Centre (IDC) is listed on LocalePak under Healthcare & Medical in Islamabad, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "mahir-company-karachi",
    name: "Mahir Company (Karachi)",
    category: "Home Services & Repairs",
    categorySlug: "home-services",
    city: "Karachi",
    citySlug: "karachi",
    phone: "0309-6661919",
    description: "Mahir Company (Karachi) is listed on LocalePak under Home Services & Repairs in Karachi, Pakistan. Providers in this category offer repair, maintenance and installation services — such as plumbing, electrical work and appliance servicing — at customers’ homes and offices."
  },
  {
    seed: true,
    slug: "mahir-company-islamabad",
    name: "Mahir Company (Islamabad)",
    category: "Home Services & Repairs",
    categorySlug: "home-services",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "0309-6661919",
    description: "Mahir Company (Islamabad) is listed on LocalePak under Home Services & Repairs in Islamabad, Pakistan. Providers in this category offer repair, maintenance and installation services — such as plumbing, electrical work and appliance servicing — at customers’ homes and offices."
  },
  {
    seed: true,
    slug: "nayatel-rawalpindi",
    name: "Nayatel (Rawalpindi)",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    phone: "051-111-144-444",
    description: "Nayatel (Rawalpindi) is listed on LocalePak under Technology & IT in Rawalpindi, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "nayatel-faisalabad",
    name: "Nayatel (Faisalabad)",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Faisalabad",
    citySlug: "faisalabad",
    phone: "051-111-144-444",
    description: "Nayatel (Faisalabad) is listed on LocalePak under Technology & IT in Faisalabad, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "rehman-travels-lahore",
    name: "Rehman Travels (Lahore)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-111-786-785",
    description: "Rehman Travels (Lahore) is listed on LocalePak under Travel & Tourism in Lahore, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "rehman-travels-peshawar",
    name: "Rehman Travels (Peshawar)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Peshawar",
    citySlug: "peshawar",
    phone: "091-7251626",
    description: "Rehman Travels (Peshawar) is listed on LocalePak under Travel & Tourism in Peshawar, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "faisal-movers-karachi-terminal",
    name: "Faisal Movers (Karachi Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Karachi",
    citySlug: "karachi",
    description: "Faisal Movers (Karachi Terminal) is listed on LocalePak under Travel & Tourism in Karachi, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "faisal-movers-peshawar-terminal",
    name: "Faisal Movers (Peshawar Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Peshawar",
    citySlug: "peshawar",
    description: "Faisal Movers (Peshawar Terminal) is listed on LocalePak under Travel & Tourism in Peshawar, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "faisal-movers-hyderabad-terminal",
    name: "Faisal Movers (Hyderabad Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Hyderabad",
    citySlug: "hyderabad",
    description: "Faisal Movers (Hyderabad Terminal) is listed on LocalePak under Travel & Tourism in Hyderabad, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "daewoo-express-abbottabad-terminal",
    name: "Daewoo Express (Abbottabad Terminal)",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Abbottabad",
    citySlug: "abbottabad",
    description: "Daewoo Express (Abbottabad Terminal) is listed on LocalePak under Travel & Tourism in Abbottabad, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "niazi-express",
    name: "Niazi Express",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    description: "Niazi Express is listed on LocalePak under Travel & Tourism in Lahore, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "bookme-pk",
    name: "Bookme.pk",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    description: "Bookme.pk is listed on LocalePak under Travel & Tourism in Lahore, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "karavan-leaders-pakistan",
    name: "Karavan Leaders Pakistan",
    category: "Travel & Tourism",
    categorySlug: "travel",
    city: "Lahore",
    citySlug: "lahore",
    description: "Karavan Leaders Pakistan is listed on LocalePak under Travel & Tourism in Lahore, Pakistan. Businesses in this category include intercity bus companies, travel agencies and tour operators that handle bookings, ticketing and travel planning."
  },
  {
    seed: true,
    slug: "call-courier",
    name: "Call Courier",
    category: "Logistics & Courier",
    categorySlug: "logistics",
    city: "Lahore",
    citySlug: "lahore",
    description: "Call Courier is listed on LocalePak under Logistics & Courier in Lahore, Pakistan. Companies in this category handle parcel delivery, shipment tracking and cash-on-delivery services for individuals and online sellers."
  },
  {
    seed: true,
    slug: "shaukat-khanum-karachi-diagnostic-centre",
    name: "Shaukat Khanum (Karachi Diagnostic Centre)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Karachi",
    citySlug: "karachi",
    phone: "042-35905000",
    description: "Shaukat Khanum (Karachi Diagnostic Centre) is listed on LocalePak under Healthcare & Medical in Karachi, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "dr-essa-laboratory-hyderabad",
    name: "Dr Essa Laboratory (Hyderabad)",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Hyderabad",
    citySlug: "hyderabad",
    phone: "0337-8432688",
    description: "Dr Essa Laboratory (Hyderabad) is listed on LocalePak under Healthcare & Medical in Hyderabad, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "savour-foods-lahore",
    name: "Savour Foods (Lahore)",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Lahore",
    citySlug: "lahore",
    phone: "051-111-728-687",
    description: "Savour Foods (Lahore) is listed on LocalePak under Restaurants & Food in Lahore, Pakistan. Businesses in this category serve dine-in, takeaway and delivery customers in their local area."
  },
  {
    seed: true,
    slug: "baba-kharwari-restaurant-bkr",
    name: "Baba Kharwari Restaurant (BKR)",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    city: "Lahore",
    citySlug: "lahore",
    description: "Baba Kharwari Restaurant (BKR) is listed on LocalePak under Restaurants & Food in Lahore, Pakistan. Businesses in this category serve dine-in, takeaway and delivery customers in their local area."
  },
  {
    seed: true,
    slug: "depilex-group-head-office",
    name: "Depilex Group (Head Office)",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35694233",
    description: "Depilex Group (Head Office) is listed on LocalePak under Beauty & Wellness in Lahore, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "depilex-beauty-clinic-karachi",
    name: "Depilex Beauty Clinic (Karachi)",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-36635729",
    description: "Depilex Beauty Clinic (Karachi) is listed on LocalePak under Beauty & Wellness in Karachi, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "depilex-beauty-clinic-and-institute-faisalabad",
    name: "Depilex Beauty Clinic & Institute (Faisalabad)",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Faisalabad",
    citySlug: "faisalabad",
    phone: "0333-4064332",
    description: "Depilex Beauty Clinic & Institute (Faisalabad) is listed on LocalePak under Beauty & Wellness in Faisalabad, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "depilex-beauty-clinic-f-6",
    name: "Depilex Beauty Clinic (F-6)",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "Depilex Beauty Clinic (F-6) is listed on LocalePak under Beauty & Wellness in Islamabad, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "depilex-beauty-clinic-dha-phase-2",
    name: "Depilex Beauty Clinic (DHA Phase 2)",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "Depilex Beauty Clinic (DHA Phase 2) is listed on LocalePak under Beauty & Wellness in Islamabad, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "amina-z-salon-and-makeup-studio",
    name: "Amina Z Salon & Makeup Studio",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Lahore",
    citySlug: "lahore",
    description: "Amina Z Salon & Makeup Studio is listed on LocalePak under Beauty & Wellness in Lahore, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "modish-hair-salon",
    name: "Modish Hair Salon",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    city: "Lahore",
    citySlug: "lahore",
    description: "Modish Hair Salon is listed on LocalePak under Beauty & Wellness in Lahore, Pakistan. Businesses in this category include salons and beauty clinics offering hair, makeup and skincare services."
  },
  {
    seed: true,
    slug: "aimfit",
    name: "AimFit",
    category: "Sports & Fitness Gyms",
    categorySlug: "sports",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35695696",
    description: "AimFit is listed on LocalePak under Sports & Fitness Gyms in Lahore, Pakistan. Businesses in this category include gyms and fitness studios offering training facilities and exercise classes."
  },
  {
    seed: true,
    slug: "mfit-gym",
    name: "MFit Gym",
    category: "Sports & Fitness Gyms",
    categorySlug: "sports",
    city: "Karachi",
    citySlug: "karachi",
    phone: "0319-0541709",
    description: "MFit Gym is listed on LocalePak under Sports & Fitness Gyms in Karachi, Pakistan. Businesses in this category include gyms and fitness studios offering training facilities and exercise classes."
  },
  {
    seed: true,
    slug: "fit-factory",
    name: "Fit Factory",
    category: "Sports & Fitness Gyms",
    categorySlug: "sports",
    city: "Lahore",
    citySlug: "lahore",
    description: "Fit Factory is listed on LocalePak under Sports & Fitness Gyms in Lahore, Pakistan. Businesses in this category include gyms and fitness studios offering training facilities and exercise classes."
  },
  {
    seed: true,
    slug: "shapes-fitness-center-dha",
    name: "Shapes Fitness Center (DHA)",
    category: "Sports & Fitness Gyms",
    categorySlug: "sports",
    city: "Lahore",
    citySlug: "lahore",
    description: "Shapes Fitness Center (DHA) is listed on LocalePak under Sports & Fitness Gyms in Lahore, Pakistan. Businesses in this category include gyms and fitness studios offering training facilities and exercise classes."
  },
  {
    seed: true,
    slug: "interwood-mobel",
    name: "Interwood Mobel",
    category: "Furniture & Interior Decor",
    categorySlug: "furniture",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-111-203-203",
    description: "Interwood Mobel is listed on LocalePak under Furniture & Interior Decor in Lahore, Pakistan. Businesses in this category manufacture and sell home and office furniture and interior decor."
  },
  {
    seed: true,
    slug: "askari-guards-head-office",
    name: "Askari Guards (Head Office)",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    phone: "051-5517131",
    description: "Askari Guards (Head Office) is listed on LocalePak under Security Services & Systems in Rawalpindi, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "askari-guards-lahore-cantt",
    name: "Askari Guards (Lahore Cantt)",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Lahore",
    citySlug: "lahore",
    description: "Askari Guards (Lahore Cantt) is listed on LocalePak under Security Services & Systems in Lahore, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "askari-guards-karachi",
    name: "Askari Guards (Karachi)",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Karachi",
    citySlug: "karachi",
    description: "Askari Guards (Karachi) is listed on LocalePak under Security Services & Systems in Karachi, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "askari-guards-islamabad-f-8",
    name: "Askari Guards (Islamabad F-8)",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "Askari Guards (Islamabad F-8) is listed on LocalePak under Security Services & Systems in Islamabad, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "askari-guards-multan",
    name: "Askari Guards (Multan)",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Multan",
    citySlug: "multan",
    description: "Askari Guards (Multan) is listed on LocalePak under Security Services & Systems in Multan, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "askari-guards-peshawar-cantt",
    name: "Askari Guards (Peshawar Cantt)",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Peshawar",
    citySlug: "peshawar",
    description: "Askari Guards (Peshawar Cantt) is listed on LocalePak under Security Services & Systems in Peshawar, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "brothers-protection-pvt-ltd",
    name: "Brothers Protection (Pvt) Ltd",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-36315763",
    description: "Brothers Protection (Pvt) Ltd is listed on LocalePak under Security Services & Systems in Lahore, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "eagle-security-guards-pvt-ltd",
    name: "Eagle Security Guards (Pvt) Ltd",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-4448452",
    description: "Eagle Security Guards (Pvt) Ltd is listed on LocalePak under Security Services & Systems in Islamabad, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "dragon-security-services-pvt-ltd",
    name: "Dragon Security Services (Pvt) Ltd",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-35390505",
    description: "Dragon Security Services (Pvt) Ltd is listed on LocalePak under Security Services & Systems in Karachi, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "zims-security-pvt-ltd",
    name: "Zims Security (Pvt) Ltd",
    category: "Security Services & Systems",
    categorySlug: "security",
    city: "Lahore",
    citySlug: "lahore",
    description: "Zims Security (Pvt) Ltd is listed on LocalePak under Security Services & Systems in Lahore, Pakistan. Businesses in this category provide security guards, guarding services and related protection for homes, businesses and institutions."
  },
  {
    seed: true,
    slug: "esa-energy",
    name: "ESA Energy",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Karachi",
    citySlug: "karachi",
    phone: "0331-111-0463",
    description: "ESA Energy is listed on LocalePak under Solar & Renewable Energy in Karachi, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "solaris-engineering-pvt-ltd",
    name: "Solaris Engineering (Pvt) Ltd",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Faisalabad",
    citySlug: "faisalabad",
    description: "Solaris Engineering (Pvt) Ltd is listed on LocalePak under Solar & Renewable Energy in Faisalabad, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "solar-energy-drive-pvt-ltd",
    name: "Solar Energy Drive (Pvt) Ltd",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Lahore",
    citySlug: "lahore",
    description: "Solar Energy Drive (Pvt) Ltd is listed on LocalePak under Solar & Renewable Energy in Lahore, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "shaheen-solar-energy",
    name: "Shaheen Solar Energy",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Lahore",
    citySlug: "lahore",
    description: "Shaheen Solar Energy is listed on LocalePak under Solar & Renewable Energy in Lahore, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "khan-traders-and-solar-energy",
    name: "Khan Traders & Solar Energy",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Sargodha",
    citySlug: "sargodha",
    description: "Khan Traders & Solar Energy is listed on LocalePak under Solar & Renewable Energy in Sargodha, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "saif-tech-engineering-solar",
    name: "SAIF TECH Engineering Solar",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "SAIF TECH Engineering Solar is listed on LocalePak under Solar & Renewable Energy in Rawalpindi, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "pakistan-solar-system-pvt-ltd",
    name: "Pakistan Solar System (Pvt) Ltd",
    category: "Solar & Renewable Energy",
    categorySlug: "solar-energy",
    city: "Dera Ismail Khan",
    citySlug: "dera-ismail-khan",
    description: "Pakistan Solar System (Pvt) Ltd is listed on LocalePak under Solar & Renewable Energy in Dera Ismail Khan, Pakistan. Businesses in this category supply and install solar panels, inverters and complete solar power systems for homes and businesses."
  },
  {
    seed: true,
    slug: "beaconhouse-school-system",
    name: "Beaconhouse School System",
    category: "Education & Training",
    categorySlug: "education",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-111-232-266",
    description: "Beaconhouse School System is listed on LocalePak under Education & Training in Lahore, Pakistan. Institutions in this category include schools, colleges, universities and training institutes offering academic and professional programmes."
  },
  {
    seed: true,
    slug: "university-of-the-punjab",
    name: "University of the Punjab",
    category: "Education & Training",
    categorySlug: "education",
    city: "Lahore",
    citySlug: "lahore",
    description: "University of the Punjab is listed on LocalePak under Education & Training in Lahore, Pakistan. Institutions in this category include schools, colleges, universities and training institutes offering academic and professional programmes."
  },
  {
    seed: true,
    slug: "university-of-engineering-and-technology-uet",
    name: "University of Engineering & Technology (UET)",
    category: "Education & Training",
    categorySlug: "education",
    city: "Lahore",
    citySlug: "lahore",
    description: "University of Engineering & Technology (UET) is listed on LocalePak under Education & Training in Lahore, Pakistan. Institutions in this category include schools, colleges, universities and training institutes offering academic and professional programmes."
  },
  {
    seed: true,
    slug: "descon-engineering",
    name: "Descon Engineering",
    category: "Construction & Building",
    categorySlug: "construction",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35990034",
    description: "Descon Engineering is listed on LocalePak under Construction & Building in Lahore, Pakistan. Businesses in this category include engineering, building and contracting firms working on residential, commercial and industrial projects."
  },
  {
    seed: true,
    slug: "archkit-group",
    name: "Archkit Group",
    category: "Construction & Building",
    categorySlug: "construction",
    city: "Lahore",
    citySlug: "lahore",
    description: "Archkit Group is listed on LocalePak under Construction & Building in Lahore, Pakistan. Businesses in this category include engineering, building and contracting firms working on residential, commercial and industrial projects."
  },
  {
    seed: true,
    slug: "hassan-and-hassan-advocates",
    name: "Hassan & Hassan (Advocates)",
    category: "Legal & Law Consultants",
    categorySlug: "legal",
    city: "Lahore",
    citySlug: "lahore",
    description: "Hassan & Hassan (Advocates) is listed on LocalePak under Legal & Law Consultants in Lahore, Pakistan. Businesses in this category include law firms and advocates providing legal advice, documentation and representation."
  },
  {
    seed: true,
    slug: "zameen-com",
    name: "Zameen.com",
    category: "Real Estate & Property",
    categorySlug: "real-estate",
    city: "Lahore",
    citySlug: "lahore",
    description: "Zameen.com is listed on LocalePak under Real Estate & Property in Lahore, Pakistan. Businesses in this category deal in property buying, selling and renting, and related property services."
  },
  {
    seed: true,
    slug: "estate-ai-by-pixel-perfects-solutions",
    name: "Estate AI by Pixel Perfects Solutions",
    category: "Real Estate & Property",
    categorySlug: "real-estate",
    city: "Lahore",
    citySlug: "lahore",
    description: "Estate AI by Pixel Perfects Solutions is listed on LocalePak under Real Estate & Property in Lahore, Pakistan. Businesses in this category deal in property buying, selling and renting, and related property services."
  },
  {
    seed: true,
    slug: "marham",
    name: "Marham",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    description: "Marham is listed on LocalePak under Healthcare & Medical in Lahore, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "zunf-medicare",
    name: "Zunf Medicare",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Lahore",
    citySlug: "lahore",
    description: "Zunf Medicare is listed on LocalePak under Healthcare & Medical in Lahore, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "holy-family-hospital",
    name: "Holy Family Hospital",
    category: "Healthcare & Medical",
    categorySlug: "healthcare",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "Holy Family Hospital is listed on LocalePak under Healthcare & Medical in Rawalpindi, Pakistan. Providers in this category include hospitals, clinics and diagnostic laboratories offering medical tests, consultations and treatment."
  },
  {
    seed: true,
    slug: "pakistan-auto-detailing",
    name: "Pakistan Auto Detailing",
    category: "Automotive & Vehicles",
    categorySlug: "automotive",
    city: "Lahore",
    citySlug: "lahore",
    description: "Pakistan Auto Detailing is listed on LocalePak under Automotive & Vehicles in Lahore, Pakistan. Businesses in this category include vehicle service providers, workshops and car-care specialists."
  },
  {
    seed: true,
    slug: "iris-productions",
    name: "IRIS Productions",
    category: "Media, PR & Advertising",
    categorySlug: "media",
    city: "Lahore",
    citySlug: "lahore",
    description: "IRIS Productions is listed on LocalePak under Media, PR & Advertising in Lahore, Pakistan. Businesses in this category include production houses and advertising, media and public-relations firms."
  },
  {
    seed: true,
    slug: "pixora-display-solutions",
    name: "Pixora Display Solutions",
    category: "Printing & Packaging",
    categorySlug: "printing",
    city: "Lahore",
    citySlug: "lahore",
    description: "Pixora Display Solutions is listed on LocalePak under Printing & Packaging in Lahore, Pakistan. Businesses in this category provide printing, packaging, display and signage services."
  },
  {
    seed: true,
    slug: "inlinkers-cx",
    name: "InLinkers CX",
    category: "Technology & IT",
    categorySlug: "technology",
    city: "Lahore",
    citySlug: "lahore",
    description: "InLinkers CX is listed on LocalePak under Technology & IT in Lahore, Pakistan. Businesses in this category include internet service providers, software houses and IT companies serving homes and businesses."
  },
  {
    seed: true,
    slug: "bugo-pk",
    name: "Bugo.pk",
    category: "Retail & Shopping",
    categorySlug: "retail",
    city: "Lahore",
    citySlug: "lahore",
    description: "Bugo.pk is listed on LocalePak under Retail & Shopping in Lahore, Pakistan. Businesses in this category sell products directly to customers through shops and stores."
  },
  {
    seed: true,
    slug: "kiddies-and-toys",
    name: "Kiddies and Toys",
    category: "Retail & Shopping",
    categorySlug: "retail",
    city: "Lahore",
    citySlug: "lahore",
    description: "Kiddies and Toys is listed on LocalePak under Retail & Shopping in Lahore, Pakistan. Businesses in this category sell products directly to customers through shops and stores."
  },
  {
    seed: true,
    slug: "the-pool-guy",
    name: "The Pool Guy",
    category: "Home Services & Repairs",
    categorySlug: "home-services",
    city: "Karachi",
    citySlug: "karachi",
    description: "The Pool Guy is listed on LocalePak under Home Services & Repairs in Karachi, Pakistan. Providers in this category offer repair, maintenance and installation services — such as plumbing, electrical work and appliance servicing — at customers’ homes and offices."
  },
  // ----------------------------------------------------------
  // Bank branches (added 2026-10-23): top-5 banks x top-5
  // cities, ONE main/head-office-style branch per bank per
  // city, taken from each bank's OFFICIAL published branch
  // list (MCB Branch Network Jun-2026; UBL Branches Network
  // Dec-2025; NBP Authorized Branches list Apr-2025; HBL and
  // Meezan official branch lists). A phone is included ONLY
  // where the bank's own list publishes one for that branch
  // (UBL, Meezan and NBP lists publish no branch phones, so
  // those listings are phone-less). No addresses, ratings or
  // other fields are recorded for these listings.
  // ----------------------------------------------------------
  {
    seed: true,
    slug: "hbl-plaza-branch-karachi",
    name: "HBL Plaza Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "HBL Plaza Branch is listed on LocalePak under Finance & Banking in Karachi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "hbl-bank-square-branch-lahore",
    name: "HBL Bank Square Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Lahore",
    citySlug: "lahore",
    description: "HBL Bank Square Branch is listed on LocalePak under Finance & Banking in Lahore, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "hbl-jinnah-avenue-branch-islamabad",
    name: "HBL Jinnah Avenue Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "HBL Jinnah Avenue Branch is listed on LocalePak under Finance & Banking in Islamabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "hbl-city-branch-rawalpindi",
    name: "HBL City Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "HBL City Branch is listed on LocalePak under Finance & Banking in Rawalpindi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "hbl-circular-road-branch-faisalabad",
    name: "HBL Circular Road Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Faisalabad",
    citySlug: "faisalabad",
    description: "HBL Circular Road Branch is listed on LocalePak under Finance & Banking in Faisalabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "ubl-main-branch-karachi",
    name: "UBL Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "UBL Main Branch is listed on LocalePak under Finance & Banking in Karachi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "ubl-main-branch-lahore",
    name: "UBL Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Lahore",
    citySlug: "lahore",
    description: "UBL Main Branch is listed on LocalePak under Finance & Banking in Lahore, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "ubl-main-branch-islamabad",
    name: "UBL Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "UBL Main Branch is listed on LocalePak under Finance & Banking in Islamabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "ubl-main-branch-rawalpindi",
    name: "UBL Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "UBL Main Branch is listed on LocalePak under Finance & Banking in Rawalpindi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "ubl-kotwali-road-branch-faisalabad",
    name: "UBL Kotwali Road Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Faisalabad",
    citySlug: "faisalabad",
    description: "UBL Kotwali Road Branch is listed on LocalePak under Finance & Banking in Faisalabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "mcb-main-branch-karachi",
    name: "MCB Karachi Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    phone: "021-32413983",
    description: "MCB Karachi Main Branch is listed on LocalePak under Finance & Banking in Karachi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "mcb-main-boulevard-gulberg-branch-lahore",
    name: "MCB Corporate Main Boulevard Gulberg Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Lahore",
    citySlug: "lahore",
    phone: "042-35790410",
    description: "MCB Corporate Main Boulevard Gulberg Branch is listed on LocalePak under Finance & Banking in Lahore, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "mcb-blue-area-branch-islamabad",
    name: "MCB Blue Area Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Islamabad",
    citySlug: "islamabad",
    phone: "051-2278081",
    description: "MCB Blue Area Branch is listed on LocalePak under Finance & Banking in Islamabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "mcb-saddar-road-branch-rawalpindi",
    name: "MCB Saddar Road Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    phone: "051-5515729",
    description: "MCB Saddar Road Branch is listed on LocalePak under Finance & Banking in Rawalpindi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "mcb-circular-road-branch-faisalabad",
    name: "MCB Circular Road Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Faisalabad",
    citySlug: "faisalabad",
    phone: "041-2636496",
    description: "MCB Circular Road Branch is listed on LocalePak under Finance & Banking in Faisalabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "meezan-bank-gulbai-ho-branch-karachi",
    name: "Meezan Bank Gulbai (HO) Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "Meezan Bank Gulbai (HO) Branch is listed on LocalePak under Finance & Banking in Karachi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "meezan-bank-mall-road-branch-lahore",
    name: "Meezan Bank Mall Road Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Lahore",
    citySlug: "lahore",
    description: "Meezan Bank Mall Road Branch is listed on LocalePak under Finance & Banking in Lahore, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "meezan-bank-jinnah-avenue-branch-islamabad",
    name: "Meezan Bank Jinnah Avenue Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "Meezan Bank Jinnah Avenue Branch is listed on LocalePak under Finance & Banking in Islamabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "meezan-bank-saddar-branch-rawalpindi",
    name: "Meezan Bank Saddar Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "Meezan Bank Saddar Branch is listed on LocalePak under Finance & Banking in Rawalpindi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "meezan-bank-circular-road-branch-faisalabad",
    name: "Meezan Bank Circular Road Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Faisalabad",
    citySlug: "faisalabad",
    description: "Meezan Bank Circular Road Branch is listed on LocalePak under Finance & Banking in Faisalabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "nbp-main-branch-karachi",
    name: "National Bank of Pakistan Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Karachi",
    citySlug: "karachi",
    description: "National Bank of Pakistan Main Branch is listed on LocalePak under Finance & Banking in Karachi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "nbp-main-branch-lahore",
    name: "National Bank of Pakistan Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Lahore",
    citySlug: "lahore",
    description: "National Bank of Pakistan Main Branch is listed on LocalePak under Finance & Banking in Lahore, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "nbp-civic-centre-main-branch-islamabad",
    name: "National Bank of Pakistan Civic Centre Main Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Islamabad",
    citySlug: "islamabad",
    description: "National Bank of Pakistan Civic Centre Main Branch is listed on LocalePak under Finance & Banking in Islamabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "nbp-cantt-branch-rawalpindi",
    name: "National Bank of Pakistan Rawalpindi Cantt Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Rawalpindi",
    citySlug: "rawalpindi",
    description: "National Bank of Pakistan Rawalpindi Cantt Branch is listed on LocalePak under Finance & Banking in Rawalpindi, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  },
  {
    seed: true,
    slug: "nbp-clock-tower-branch-faisalabad",
    name: "National Bank of Pakistan Clock Tower Branch",
    category: "Finance & Banking",
    categorySlug: "finance",
    city: "Faisalabad",
    citySlug: "faisalabad",
    description: "National Bank of Pakistan Clock Tower Branch is listed on LocalePak under Finance & Banking in Faisalabad, Pakistan. Banks in this category provide current and savings accounts, loans and credit cards, money transfers and digital banking services for individuals and businesses."
  }
]

export const SEED_BUSINESS_BY_SLUG: ReadonlyMap<string, SeedBusiness> = new Map(
  SEED_BUSINESSES.map((b) => [b.slug, b])
)

export function getSeedBusiness(slug: string): SeedBusiness | undefined {
  return SEED_BUSINESS_BY_SLUG.get((slug || '').toLowerCase())
}
