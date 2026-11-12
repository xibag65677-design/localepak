export const CITIES = Array.from(new Set([
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
  { id: 'restaurants', name: 'Restaurants & Food', icon: 'restaurant', color: '#f59e0b', desc: 'Find local cafes, fine dining, fast food, and food caterers' },
  { id: 'real-estate', name: 'Real Estate & Property', icon: 'real-estate', color: '#10b981', desc: 'Property dealers, builders, and real estate consultants' },
  { id: 'technology', name: 'Technology & IT', icon: 'technology', color: '#3b82f6', desc: 'Software houses, web developers, mobile apps, and IT agencies' },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: 'healthcare', color: '#ef4444', desc: 'Hospitals, specialist doctors, diagnostic labs, and pharmacies' },
  { id: 'education', name: 'Education & Training', icon: 'education', color: '#8b5cf6', desc: 'Schools, universities, academies, and professional institutes' },
  { id: 'retail', name: 'Retail & Shopping', icon: 'retail', color: '#ec4899', desc: 'Boutiques, wholesale stores, electronic shops, and markets' },
  { id: 'construction', name: 'Construction & Building', icon: 'construction', color: '#f97316', desc: 'Architects, civil engineers, building contractors, and materials' },
  { id: 'automotive', name: 'Automotive & Vehicles', icon: 'automotive', color: '#14b8a6', desc: 'Auto showrooms, workshops, car rental, and spare parts' },
  { id: 'finance', name: 'Finance & Banking', icon: 'finance', color: '#6366f1', desc: 'Chartered accountants, tax consultants, and financial advisors' },
  { id: 'travel', name: 'Travel & Tourism', icon: 'travel', color: '#0ea5e9', desc: 'Travel agencies, Umrah tour operators, and visa consultants' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: 'beauty', color: '#d946ef', desc: 'Beauty salons, spas, fitness gyms, and skincare clinics' },
  { id: 'logistics', name: 'Logistics & Courier', icon: 'logistics', color: '#84cc16', desc: 'Goods transport, freight forwarders, and logistics services' },
  { id: 'home-services', name: 'Home Services & Repairs', icon: 'home-services', color: '#0284c7', desc: 'Plumbers, electricians, AC technicians, painters, handymen, and home-visit tailors and beauticians' },
  { id: 'legal', name: 'Legal & Law Consultants', icon: 'legal', color: '#4f46e5', desc: 'Advocates, corporate lawyers, tax attorneys, and legal firms' },
  { id: 'solar-energy', name: 'Solar & Renewable Energy', icon: 'solar-energy', color: '#eab308', desc: 'Solar panel installers, inverter suppliers, and green energy firms' },
  { id: 'events', name: 'Event Management & Wedding', icon: 'events', color: '#f43f5e', desc: 'Marquees, wedding planners, catering, photography, and sound' },
  { id: 'manufacturing', name: 'Manufacturing & Industrial', icon: 'manufacturing', color: '#64748b', desc: 'Factories, industrial machinery, textile mills, and suppliers' },
  { id: 'agriculture', name: 'Agriculture & Farming', icon: 'agriculture', color: '#15803d', desc: 'Agri machinery, fertilizers, seed suppliers, and livestock' },
  { id: 'security', name: 'Security Services & Systems', icon: 'security', color: '#334155', desc: 'CCTV cameras, security guard agencies, and access control' },
  { id: 'printing', name: 'Printing & Packaging', icon: 'printing', color: '#9333ea', desc: 'Offset printing, box packaging, flex printing, and signage' },
  { id: 'furniture', name: 'Furniture & Interior Decor', icon: 'furniture', color: '#b45309', desc: 'Home furniture, office tables, interior designers, and decor' },
  { id: 'media', name: 'Media, PR & Advertising', icon: 'media', color: '#06b6d4', desc: 'Digital marketing agencies, billboards, PR, and video production' },
  { id: 'sports', name: 'Sports & Fitness Gyms', icon: 'sports', color: '#dc2626', desc: 'Fitness centers, sports gear, martial arts, and swimming pools' },
  { id: 'pets', name: 'Pets & Veterinary Clinics', icon: 'pets', color: '#d97706', desc: 'Vet doctors, pet shops, animal food, and grooming salons' },
]
