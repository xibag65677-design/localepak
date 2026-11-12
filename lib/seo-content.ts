// SEO Content Template Generator
// Generates 500-800 word unique content blocks for programmatic SEO pages

export const CITY_INFO: Record<string, { province: string; description: string; industries: string[]; districts?: string[] }> = {
  Karachi: {
    province: 'Sindh',
    description: "the biggest city in Pakistan and the country's commercial and financial heart",
    industries: ['finance', 'retail', 'logistics', 'technology', 'manufacturing'],
    districts: ['Clifton', 'DHA', 'Shahrah-e-Faisal', 'Saddar', 'Gulshan-e-Iqbal', 'North Nazimabad'],
  },
  Lahore: {
    province: 'Punjab',
    description: "the country's cultural heart and its second-biggest city",
    industries: ['education', 'retail', 'real-estate', 'food', 'technology'],
    districts: ['Gulberg', 'DHA', 'Johar Town', 'Model Town', 'Mall Road', 'Bahria Town'],
  },
  Islamabad: {
    province: 'ICT',
    description: "the country's planned, modern capital city",
    industries: ['government', 'technology', 'education', 'real-estate', 'healthcare'],
    districts: ['Blue Area', 'F-7 Markaz', 'F-10 Markaz', 'DHA', 'Bahria Town', 'G-11'],
  },
  Rawalpindi: {
    province: 'Punjab',
    description: "Islamabad's twin city, with a long history as a trading and commercial centre",
    industries: ['retail', 'automotive', 'construction', 'food', 'finance'],
  },
  Faisalabad: {
    province: 'Punjab',
    description: "the centre of Pakistan's textile industry and a major manufacturing city",
    industries: ['textile', 'manufacturing', 'retail', 'logistics', 'agriculture'],
  },
  Multan: {
    province: 'Punjab',
    description: 'the historic City of Saints, where a centuries-old trading culture meets a fast-growing economy',
    industries: ['agriculture', 'education', 'retail', 'healthcare', 'food'],
  },
  Peshawar: {
    province: 'Khyber Pakhtunkhwa',
    description: "one of the region's oldest trading cities and the historic gateway toward Central Asia",
    industries: ['trade', 'retail', 'food', 'automotive', 'real-estate'],
  },
  Quetta: {
    province: 'Balochistan',
    description: "Balochistan's capital and the main commercial centre for trade across the province",
    industries: ['trade', 'agriculture', 'retail', 'construction', 'food'],
  },
  Sialkot: {
    province: 'Punjab',
    description: 'an export powerhouse world-famous for its sports goods and surgical instruments',
    industries: ['manufacturing', 'retail', 'logistics', 'finance', 'technology'],
  },
  Hyderabad: {
    province: 'Sindh',
    description: "the second-biggest city in Sindh, with busy bazaars and a lively trading scene",
    industries: ['retail', 'education', 'healthcare', 'food', 'real-estate'],
  },
  Gujranwala: {
    province: 'Punjab',
    description: "one of Pakistan's leading industrial cities, popularly known as the 'City of Wrestlers'",
    industries: ['manufacturing', 'retail', 'automotive', 'food', 'logistics'],
  },
  Bahawalpur: {
    province: 'Punjab',
    description: 'a former princely state capital whose commerce and agriculture keep expanding',
    industries: ['agriculture', 'retail', 'education', 'healthcare', 'food'],
  },
  Sargodha: {
    province: 'Punjab',
    description: "Pakistan's citrus capital, built on a thriving agricultural economy",
    industries: ['agriculture', 'retail', 'food', 'education', 'automotive'],
  },
  Sukkur: {
    province: 'Sindh',
    description: 'an important city on the Indus River where trade keeps expanding',
    industries: ['trade', 'retail', 'agriculture', 'food', 'construction'],
  },
  Larkana: {
    province: 'Sindh',
    description: 'a well-known Sindhi city with deep historical roots and an active commercial life',
    industries: ['agriculture', 'retail', 'healthcare', 'education', 'food'],
  },
  Sheikhupura: {
    province: 'Punjab',
    description: "an industrial neighbour of Lahore whose economy is expanding fast",
    industries: ['manufacturing', 'retail', 'food', 'logistics', 'construction'],
  },
  'Rahim Yar Khan': {
    province: 'Punjab',
    description: 'a south Punjab city powered by strong farming and trade',
    industries: ['agriculture', 'retail', 'food', 'healthcare', 'education'],
  },
  Mardan: {
    province: 'Khyber Pakhtunkhwa',
    description: "KPK's second-biggest city, home to a steadily expanding business scene",
    industries: ['agriculture', 'retail', 'food', 'education', 'healthcare'],
  },
  Gujrat: {
    province: 'Punjab',
    description: 'a manufacturing city celebrated for its electronics and furniture trades',
    industries: ['manufacturing', 'retail', 'electronics', 'food', 'automotive'],
  },
  Kasur: {
    province: 'Punjab',
    description: 'a historic city close to Lahore, recognised for leather production and farming',
    industries: ['manufacturing', 'agriculture', 'retail', 'food', 'education'],
  },
}

const CATEGORY_INFO: Record<string, { label: string; description: string; examples: string[] }> = {
  restaurants: {
    label: 'Restaurant & Food',
    description: 'eateries of every kind, from restaurants and cafes to fast-food outlets, bakeries and caterers',
    examples: ['fast-food outlets', 'family dining restaurants', 'cafes and coffee shops', 'bakeries', 'catering companies', 'food trucks'],
  },
  'real-estate': {
    label: 'Real Estate',
    description: 'property dealers and agents, housing societies, rental agencies and construction companies',
    examples: ['residential developments', 'commercial properties', 'rental agencies', 'housing societies', 'estate agents'],
  },
  technology: {
    label: 'Technology & IT',
    description: 'software houses, web and app development studios, IT support providers and digital marketing agencies',
    examples: ['software development', 'website design', 'mobile app development', 'digital marketing', 'IT support', 'cloud services'],
  },
  healthcare: {
    label: 'Healthcare & Medical',
    description: 'hospitals and clinics, pharmacies, diagnostic laboratories and suppliers of medical equipment',
    examples: ['hospitals', 'private clinics', 'dental practices', 'pharmacies', 'diagnostic laboratories', 'specialist doctors'],
  },
  education: {
    label: 'Education & Training',
    description: 'schools, colleges and universities, plus academies and vocational training institutes',
    examples: ['schools', 'colleges', 'universities', 'training institutes', 'online learning providers', 'tutoring centres'],
  },
  retail: {
    label: 'Retail & Shopping',
    description: 'clothing and electronics stores, grocery outlets and specialist retailers of every kind',
    examples: ['fashion and clothing stores', 'electronics shops', 'grocery outlets', 'furniture shops', 'bookstores', 'sports equipment stores'],
  },
  construction: {
    label: 'Construction',
    description: 'building contractors and construction firms, architects, interior designers and building-material suppliers',
    examples: ['building contractors', 'interior design studios', 'architectural firms', 'renovation specialists', 'building material suppliers'],
  },
  automotive: {
    label: 'Automotive',
    description: 'car dealers, repair workshops, car-wash services and spare-parts retailers',
    examples: ['car dealerships', 'auto repair workshops', 'car wash services', 'spare parts shops', 'motorcycle dealers', 'car rental services'],
  },
  finance: {
    label: 'Finance & Banking',
    description: 'banks and insurers, investment firms and providers of accounting and advisory services',
    examples: ['commercial banks', 'insurance providers', 'investment firms', 'accounting practices', 'tax consultants', 'microfinance institutions'],
  },
  travel: {
    label: 'Travel & Tourism',
    description: 'travel agents, hotels and guest houses, tour operators and other tourism services',
    examples: ['travel agencies', 'hotels and resorts', 'tour operators', 'guest houses', 'car hire', 'adventure tourism operators'],
  },
  beauty: {
    label: 'Beauty & Wellness',
    description: 'beauty salons and spas, gyms and fitness centres, yoga studios and cosmetics retailers',
    examples: ['hair and beauty salons', 'spas', 'gyms and fitness centres', 'yoga studios', 'cosmetics shops', 'barbershops'],
  },
  logistics: {
    label: 'Logistics & Transport',
    description: 'courier and shipping companies, warehousing operators and transport providers',
    examples: ['courier companies', 'freight and shipping firms', 'warehousing', 'freight forwarders', 'house-moving services', 'trucking companies'],
  },
  'home-services': {
    label: 'Home Services',
    description: 'plumbers, electricians, carpenters, painters, cleaners and repair technicians who work in your home',
    examples: ['plumbers', 'electricians', 'carpenters', 'painters', 'AC and appliance repair', 'cleaning services', 'pest control'],
  },
  legal: {
    label: 'Legal Services',
    description: 'law firms, advocates, notaries and legal consultants for individuals and businesses',
    examples: ['law firms and advocates', 'corporate lawyers', 'family lawyers', 'property lawyers', 'tax lawyers', 'notary and documentation services'],
  },
  'solar-energy': {
    label: 'Solar Energy',
    description: 'solar panel installers, inverter and battery suppliers, and renewable-energy system designers',
    examples: ['solar panel installers', 'solar system dealers', 'inverter and battery suppliers', 'net-metering consultants', 'solar maintenance services'],
  },
  events: {
    label: 'Events & Weddings',
    description: 'event planners, wedding venues and marquees, caterers, decorators and photographers',
    examples: ['wedding planners', 'banquet halls and marquees', 'caterers', 'decorators', 'photographers and videographers', 'sound and lighting rentals'],
  },
  manufacturing: {
    label: 'Manufacturing & Industry',
    description: 'factories, industrial units, textile mills, engineering works and industrial suppliers',
    examples: ['textile mills', 'engineering works', 'food processing units', 'packaging manufacturers', 'industrial equipment suppliers', 'export manufacturers'],
  },
  agriculture: {
    label: 'Agriculture',
    description: 'farm suppliers, seed and fertiliser dealers, livestock services and agri-machinery providers',
    examples: ['seed and fertiliser dealers', 'tractor and machinery dealers', 'livestock and dairy services', 'pesticide suppliers', 'cold storage operators'],
  },
  security: {
    label: 'Security Services',
    description: 'private security companies, CCTV and alarm installers, and guarding services',
    examples: ['security guard companies', 'CCTV installers', 'alarm system providers', 'access control installers', 'event security'],
  },
  printing: {
    label: 'Printing & Packaging',
    description: 'printing presses, packaging manufacturers, signage makers and design studios',
    examples: ['offset and digital printing', 'packaging manufacturers', 'signage and flex printing', 'stationery printers', 'label and sticker printing'],
  },
  furniture: {
    label: 'Furniture & Decor',
    description: 'furniture makers and showrooms, carpenters, and home and office decor suppliers',
    examples: ['furniture showrooms', 'custom furniture makers', 'office furniture suppliers', 'curtain and upholstery shops', 'interior decor stores'],
  },
  media: {
    label: 'Media & Marketing',
    description: 'advertising and digital marketing agencies, production houses, photographers and content studios',
    examples: ['digital marketing agencies', 'advertising agencies', 'video production houses', 'photography studios', 'social media agencies', 'graphic design studios'],
  },
  sports: {
    label: 'Sports & Fitness',
    description: 'sports goods manufacturers and retailers, gyms, sports clubs and coaching academies',
    examples: ['sports goods manufacturers', 'sports shops', 'gyms and fitness clubs', 'cricket academies', 'sports coaching centres'],
  },
  pets: {
    label: 'Pets & Animals',
    description: 'veterinary clinics, pet shops, grooming services and animal feed suppliers',
    examples: ['veterinary clinics', 'pet shops', 'pet grooming services', 'animal feed suppliers', 'pet boarding'],
  },
}

export function generateCityContent(city: string): string {
  const info = CITY_INFO[city] || {
    province: 'Pakistan',
    description: 'a fast-growing centre of commerce',
    industries: ['retail', 'food', 'healthcare', 'education', 'technology'],
  }

  const districtsText = info.districts 
    ? `Among its liveliest commercial areas are ${info.districts.join(', ')}.` 
    : `Across the city, busy bazaars, markets and commercial centres form the backbone of everyday trade.`

  return `## Businesses in ${city} — A Complete Local Directory Guide

Located in ${info.province}, ${city} is ${info.description}. Businesses of every size operate here, from neighbourhood family shops to national corporations. If you live in the city and need a dependable service, or you run a company and want a foothold in this market, ${city} offers openings in practically every trade.

### Why Look Up Businesses in ${city}?

Tracking down the right service provider should not eat up your afternoon. LocalePak organises ${city}'s trades into one free directory — restaurants, retail stores, healthcare providers, technology companies and much more. Businesses submit their own listings, and every submission is reviewed by our team before it appears. An approved profile carries the business's phone and WhatsApp number, address, opening hours and links to its online presence, so you can call or message it directly, with no sign-up needed.

### Leading Business Sectors in ${city}

Several industries power the local economy, above all ${info.industries.slice(0, 3).join(', ')}, alongside many others. A deep consumer market and a prime location make ${city} attractive to companies of every size, and owners here draw on a trained workforce, dependable supply networks and fast-improving digital connectivity.

Public investment in commerce by the ${info.province} government has strengthened that picture further, so startups and household brands alike can grow side by side. A number of the country's biggest organisations run major operations — in some cases their head offices — from ${city}.

### How to Find a Business in ${city}

Start with the category you need on this page: each category link opens the ${city} page for that trade, with its own guide and the approved businesses listed in it so far. When a profile fits, open it and call the number shown, or send a WhatsApp message straight from the page. Planning a family dinner, facing an urgent repair at home, or hiring consultants for a digital project — that is the fastest route to a local provider.

### Business Districts and Commercial Areas in ${city}

Commerce in ${city} clusters in well-known districts, and each one has its own specialities. ${districtsText} 

Knowing the districts pays off when you search. Business profiles show their area and address, so you can favour a provider near your home or office instead of crossing the city, and compare your options area by area.

### Add Your Business in ${city} — It's Free

Own a business in ${city}? Listing on LocalePak costs nothing. Create a free account, then complete the eight-step Add Business form — contact details, category, location, opening hours, services and products. Our team reviews every submission, and once yours is approved, it goes live immediately, and then appears on this city page, on your category page and in search results, where customers can call or WhatsApp you directly.

Want customers to trust your profile faster? Add the official identifiers you already hold: your FBR NTN if you are tax-registered with the Federal Board of Revenue, your Securities and Exchange Commission of Pakistan incorporation details if you run a registered company, or membership of a local chamber such as the Karachi Chamber of Commerce and Industry or the Lahore Chamber of Commerce and Industry.

There is no subscription and no hidden charges — just a free listing on a business directory built for Pakistan. Add your business, keep your details accurate, and let ${city} customers find you.

### What People Search For in ${city}

Everyday searches in ${city} follow the rhythm of local life. Residents look for restaurants and home-delivery options for family meals, clinics and pharmacies when someone is unwell, and reliable plumbers, electricians and carpenters when something breaks at home. Parents compare schools, academies and tuition centres before admissions season, while professionals search for chartered accountants, law firms, real-estate agents and digital agencies to support their work. Shoppers hunt for clothing, electronics and furniture in the city's bazaars and malls, and anyone planning an event looks for caterers, decorators, photographers and banquet halls. Whatever the need, starting from the right category below is faster than scrolling through scattered social-media posts.

### How to Choose a Provider in ${city}

A short, sensible routine works for almost any trade in ${city}:

1. Shortlist two or three providers from the category you need, and read their full profiles — services, hours and area covered.
2. Check the basics: a working phone number, a real address or service area, and opening hours that suit you.
3. Ask for a written quote or price list on WhatsApp before you commit, and confirm what is included — materials, delivery, warranty or after-service.
4. For larger jobs, ask about registration (FBR NTN or SECP incorporation where relevant) and whether they issue a proper invoice.
5. Start small where you can: a first order or a trial visit tells you more than any advertisement.

### Frequently Asked Questions About Businesses in ${city}

### How do I find a business in ${city} on LocalePak?

Pick the category you need on this page — for example restaurants, healthcare or home services — and open the ${city} page for that trade. Approved businesses listed there show their phone and WhatsApp numbers, address and opening hours, so you can contact them directly without creating an account.

### Is it free to list my business in ${city}?

Yes — completely free, with no subscription and no card details. See "Add Your Business in ${city}" above for the steps and where your profile appears.

### What information does a LocalePak profile show?

An approved profile shows the business name, category, address and area, phone and WhatsApp number, opening hours for the week, the services and products it offers, links to its website and social pages, and a description written by the owner.

### Can I suggest a correction to a listing?

Yes — if you spot an outdated phone number or a business that has moved or closed, tell us through the contact page. Accurate listings are the whole point of the directory, and corrections are checked and applied by our team.`
}

export function generateCategoryContent(categorySlug: string): string {
  const info = CATEGORY_INFO[categorySlug] || {
    label: categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category',
    description: 'businesses supplying everyday services people rely on',
    examples: ['independent service providers', 'local firms', 'shops', 'specialist agencies'],
  }

  return `## ${info.label} Businesses in Pakistan — The Full Directory

Pakistan's ${info.label.toLowerCase()} sector is broad and busy, with providers serving customers in every major city. LocalePak's ${info.label.toLowerCase()} directory covers ${info.description}, organised by city so you can find providers near you — and it grows as businesses submit their own listings.

### Finding the Best ${info.label} Providers

Wherever you are — Karachi, Lahore, Islamabad or a smaller town — start by picking your city below. Every approved profile carries the details you need to judge your options on facts rather than guesswork: a phone and WhatsApp number, a street address, opening hours and links to the business's website or social profiles where it has them.

### What's Inside the ${info.label} Directory

Inside this category you will find ${info.examples.slice(0, 5).join(', ')} — and plenty beyond that list. Each profile shows the business's name, contact details and a fuller description of what it offers, which makes shortlisting the right partner straightforward.

### Sub-Services and Specialisms

The ${info.label.toLowerCase()} category covers a wide range of specialisms, including:

${info.examples.map(e => `- ${e.charAt(0).toUpperCase() + e.slice(1)}`).join('\n')}

Many providers focus on one or two of these niches rather than all of them, so check the services list on each profile — owners write it themselves, and it is the clearest signal of what a business actually does day to day. If your need is unusual, message the business on WhatsApp and ask directly before travelling.

### How to Choose a ${info.label} Provider

Good providers share a few habits, whatever the trade:

1. They answer the phone or reply on WhatsApp promptly, and they explain their process in plain words.
2. They give prices or estimates in writing before work starts, and say clearly what is and is not included.
3. They have a real premises or a clearly stated service area, and their opening hours are published.
4. For regulated work, they can show registration or credentials — an FBR NTN, SECP incorporation, a medical or engineering licence, or chamber-of-commerce membership, as the trade requires.
5. They stand behind the job: a warranty, a return policy or after-service support, stated up front.

### Questions to Ask Before You Hire

Before you commit, it is worth asking: What exactly is included in the price? How long will it take, and what could delay it? Do you provide a written invoice or receipt? What happens if something goes wrong afterwards? A provider who answers these calmly and clearly is usually a safe pair of hands.

### Red Flags to Watch For

Be cautious with any ${info.label.toLowerCase()} provider that refuses to give a price or estimate in writing, demands the full amount in advance in cash with no receipt, has no reachable phone number or physical address, pressures you to decide immediately, or cannot explain what happens if the work or product is faulty. Honest businesses expect these questions and answer them without fuss.

### Frequently Asked Questions About ${info.label} in Pakistan

### How do I find ${info.label.toLowerCase()} providers near me?

Choose your city from the list below to open its dedicated ${info.label.toLowerCase()} page. Listed businesses there show phone and WhatsApp numbers, addresses and opening hours, so you can compare and contact them directly — no account needed.

### Is LocalePak free for customers and for businesses?

Yes, both. Searching and contacting businesses costs nothing, and owners list their businesses free: create an account, complete the eight-step form, and once approved, it goes live immediately, and then appears in this category, on the city page and in search.

### How are listings checked before they appear?

Every submission is reviewed by our team before it goes public. We check that the business name, phone number and category look genuine and consistent. Listings are owner-submitted, so details come from the business itself — if you spot an error, report it through the contact page and we will check it.

### Can I list a business that works from home or has no shop?

Yes, if it genuinely serves customers. Choose the closest matching category, give the city and area you serve, and use your working phone or WhatsApp number as the contact — many freelancers, tutors, home bakers and repair technicians list exactly this way.

### Why Search ${info.label} on LocalePak?

LocalePak is a free directory with guides for cities and towns across Pakistan. Businesses submit their own listings, and our team reviews every submission before it appears — so freelancers, small shops and long-established companies are all listed on the same honest terms, and size is no barrier to being included.

Open a profile, weigh it up, then reach out directly or continue to the provider's own website and social pages. There is nothing to register for — simply browse and make contact.

### ${info.label} in Cities Across Pakistan

Providers cluster most densely in Karachi, Lahore and Islamabad, but strong options exist well beyond the big three — Faisalabad, Multan, Peshawar, Quetta and Sialkot among them. Pick a city below to open its dedicated ${info.label.toLowerCase()} page, with a local guide and the approved businesses listed there.

### List Your ${info.label} Business — Free

Run a ${info.label.toLowerCase()} business anywhere in Pakistan? Listing it on LocalePak is free: create an account, complete the eight-step Add Business form, and once approved, it goes live immediately, and then appears in this category, on your city page and in search. No charge, no card details, no subscription.

Choose your city below to start comparing ${info.label.toLowerCase()} providers near you.`
}

export function generateCityCategoryContent(city: string, categorySlug: string): string {
  const cityInfo = CITY_INFO[city] || {
    province: 'Pakistan',
    description: "one of Pakistan's well-known urban centres",
    industries: ['retail', 'food', 'services'],
  }
  const catInfo = CATEGORY_INFO[categorySlug] || {
    label: categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category',
    description: 'businesses serving the local community',
    examples: ['local providers', 'firms', 'shops'],
  }

  return `## ${catInfo.label} Businesses in ${city} — Your Local Directory

Hunting for dependable ${catInfo.label.toLowerCase()} services in ${city}? Start here. This page is LocalePak's home for ${catInfo.description} operating in ${city}, ${cityInfo.province}: a local guide plus the businesses that have been submitted and approved in this trade so far.

### Why ${city} Stands Out for ${catInfo.label}

Because ${city} is ${cityInfo.description}, it has built a deep bench of ${catInfo.label.toLowerCase()} businesses serving both local customers and the wider region. The city keeps growing, and its ${catInfo.label.toLowerCase()} providers have grown with it — in number and in quality — so customers today enjoy more choice than at any point in the past.

### What ${city}'s ${catInfo.label} Businesses Offer

Expect variety: the ${catInfo.label.toLowerCase()} sector in ${city} spans ${catInfo.examples.slice(0, 4).join(', ')}. Quick one-off jobs and long-term arrangements are both easy to arrange, with price points and service levels for nearly every budget and requirement.

Modern ${catInfo.label.toLowerCase()} businesses in ${city} increasingly take bookings online, consult over WhatsApp and deliver at home or on site, which makes them easier to reach than ever. When a business is listed on this page, its profile shows its phone and WhatsApp number and full address, so getting in touch takes seconds.

### Choosing the Right ${catInfo.label} Provider in ${city}

Before you commit to a ${catInfo.label.toLowerCase()} business in ${city}, weigh these four checks:

1. Location — favour a provider based near you in ${city}; shorter distances mean faster visits and lower travel costs.
2. Contact options — pick businesses you can reach several ways: phone, WhatsApp and email.
3. Online presence — an active website and social profiles usually signal a transparent, accountable operation.
4. Service fit — read the description closely and confirm the exact service you need is actually offered.

For extra confidence, check legal registration: many businesses publish their FBR NTN or cite their Securities and Exchange Commission of Pakistan registration, and membership of a chamber of commerce — the Lahore Chamber of Commerce and Industry or the Karachi Chamber of Commerce and Industry, for example — is another good sign.

On LocalePak you can line up the ${catInfo.label.toLowerCase()} businesses listed in ${city} and compare them at a glance before you decide.

### What to Expect When You Hire in ${city}

Prices and timelines for ${catInfo.label.toLowerCase()} work vary with the job, the materials involved and the provider's workload — there is no single going rate, and any provider quoting without asking about your requirements deserves a second look. Ask two or three providers for written estimates, confirm whether materials, delivery and after-service are included, and agree the schedule before work starts. Paying in stages against completed work is normal practice for larger jobs, and a proper invoice or receipt protects both sides.

### Frequently Asked Questions About ${catInfo.label} in ${city}

### How do I contact a ${catInfo.label.toLowerCase()} business in ${city}?

Open its profile from the listings on this page and use the call or WhatsApp button — you speak to the business directly, and LocalePak never charges you or takes a commission on the enquiry.

### How much does ${catInfo.label.toLowerCase()} cost in ${city}?

It depends on the exact service, scale and materials — see "What to Expect When You Hire in ${city}" above for how to compare written quotes.

### Are the businesses on this page reviewed before listing?

Yes. Owners submit their own listings and our team reviews each one before it appears — checking the business name, a working phone number and the correct category and city. Details are provided by the business itself, so confirm anything critical when you make contact.

### I run a ${catInfo.label.toLowerCase()} business in ${city}. How do I get listed here?

Create a free account and complete the eight-step Add Business form. Once approved, it goes live immediately, and then appears on this page, on the ${city} page and in search — free, with your call and WhatsApp buttons live.

### Own a ${catInfo.label} Business in ${city}? List It Free

Run a ${catInfo.label.toLowerCase()} business in ${city}? A LocalePak listing is completely free — see "How do I get listed here?" above for the steps.`
}
