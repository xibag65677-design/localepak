export type DirectorySeoLink = {
  label: string
  href: string
}

export type DirectorySeoCopy = {
  intro: string
  guidance: string
  links: DirectorySeoLink[]
}

const CATEGORY_COPY: Record<string, DirectorySeoCopy> = {
  technology: {
    intro: 'Browse Pakistan’s software houses, IT firms, web developers, product teams and other technology service providers.',
    guidance: 'Weigh up each profile on the services offered, the city it operates from, its public website, portfolio or case-study proof, and its contact details. Profiles are a starting point for comparison — always confirm the details with the business itself before you commit.',
    links: [
      { label: 'Compare Pakistan’s software houses', href: '/blog/best-software-houses-pakistan-2026/' },
      { label: 'View technology company listings', href: '/companies/' },
    ],
  },
  healthcare: {
    intro: 'Locate clinics, pharmacies, laboratories, hospitals and independent medical professionals by city and type of care.',
    guidance: 'Healthcare choices matter, so double-check the essentials first: the provider’s current address, how appointments are booked, exactly which services are offered, and any professional or regulatory credentials — verified through authoritative sources.',
    links: [
      { label: 'How to find professionals you can trust', href: '/blog/how-to-find-trusted-professionals-pakistan/' },
      { label: 'Explore services city by city', href: '/blog/local-services-pakistan-by-city/' },
    ],
  },
  media: {
    intro: 'Meet Pakistan’s digital marketing firms, advertising agencies, PR teams and wider media service providers.',
    guidance: 'Compare agencies on what they genuinely deliver: their service list, the sectors they know, work they have published, where they are based, how to reach them, and the terms attached to any engagement you are considering.',
    links: [
      { label: 'Read our guide to local SEO', href: '/blog/local-seo-pakistan-businesses-google-ranking/' },
      { label: 'See Lahore businesses by category', href: '/blog/businesses-in-lahore-by-category/' },
    ],
  },
  manufacturing: {
    intro: 'Discover factories, industrial manufacturers, suppliers and textile businesses across Pakistan, organised by city and specialism.',
    guidance: 'An industrial profile earns its keep when it spells out the real product or service, the plant’s location, how to make contact, the company website, and any certifications or capabilities that can be publicly checked.',
    links: [
      { label: 'Find businesses by city', href: '/cities/' },
      { label: 'See every business category', href: '/categories/' },
    ],
  },
  restaurants: {
    intro: 'Track down restaurants, cafés, bakeries, caterers and other food businesses by city, cuisine and the services they offer locally.',
    guidance: 'Before you set out, confirm the details that can change: current location, opening hours, menu or website, phone number and recent customer information. Where it really matters, verify directly through the business’s own channels.',
    links: [
      { label: 'Open the Pakistan restaurant guide', href: '/blog/restaurants-in-pakistan/' },
      { label: 'Open the Karachi restaurant guide', href: '/blog/restaurants-in-karachi/' },
    ],
  },
  finance: {
    intro: 'Browse accountants, tax consultants, financial advisers, banks and related finance businesses, organised by location and specialism.',
    guidance: 'Money and tax decisions deserve proper diligence: check current credentials, service terms and official confirmations for yourself. A directory profile is a place to discover a provider — never a replacement for professional or regulatory checks.',
    links: [
      { label: 'Read the city guide to accountant jobs', href: '/blog/accountant-jobs-pakistan-city-guide/' },
      { label: 'Browse company listings', href: '/companies/' },
    ],
  },
  'home-services': {
    intro: 'Find plumbers, electricians, appliance repair technicians, AC specialists, painters and other tradespeople serving your city.',
    guidance: 'Before hiring, compare coverage area, availability, contact details, expected response times and how quotes are calculated. Hold back sensitive personal information until you have verified the provider independently.',
    links: [
      { label: 'Read the guide to local services', href: '/blog/local-services-pakistan-by-city/' },
      { label: 'Browse cities across Pakistan', href: '/cities/' },
    ],
  },
}

const CITY_COPY: Record<string, DirectorySeoCopy> = {
  karachi: {
    intro: 'Discover businesses, companies and local services across Karachi, Pakistan, organised by category.',
    guidance: 'Most Karachi searches pair a trade or industry with the city itself. Work through the category and business links below to narrow the field, then confirm the address, opening hours and contact details straight with the provider.',
    links: [
      { label: 'Guide to restaurants in Karachi', href: '/blog/restaurants-in-karachi/' },
      { label: 'Technology businesses', href: '/category/technology/' },
      { label: 'Healthcare businesses', href: '/category/healthcare/' },
    ],
  },
  lahore: {
    intro: 'Browse businesses, local services and companies in Lahore, Pakistan, organised by category and neighbourhood.',
    guidance: 'People search Lahore by neighbourhood, by service and by category. Treat the listing details as your starting point, and check the business’s current operating information before you visit or hire.',
    links: [
      { label: 'Guide to Lahore businesses by category', href: '/blog/businesses-in-lahore-by-category/' },
      { label: 'Technology businesses', href: '/category/technology/' },
      { label: 'Media and marketing businesses', href: '/category/media/' },
    ],
  },
  islamabad: {
    intro: 'See businesses, local services and companies in Islamabad, Pakistan, organised by category.',
    guidance: 'Pair the city with a category to compare Islamabad providers properly. Confirm the precise office location or service area, up-to-date contact details and — where a trade is regulated — credentials from authoritative sources.',
    links: [
      { label: 'Technology businesses', href: '/category/technology/' },
      { label: 'Company listings', href: '/companies/' },
    ],
  },
  rawalpindi: {
    intro: 'Explore companies and local services in Rawalpindi, Pakistan, organised by category.',
    guidance: 'Start from the service you need, then study each listing’s location, contact route and operating details before you decide.',
    links: [
      { label: 'Local services guide', href: '/blog/local-services-pakistan-by-city/' },
      { label: 'All business categories', href: '/categories/' },
    ],
  },
  faisalabad: {
    intro: 'Discover businesses, local services and companies in Faisalabad, Pakistan, organised by category.',
    guidance: 'Combine this city page with the industry categories that fit to surface local providers — and always check that contact details and service scope are current before you engage one.',
    links: [
      { label: 'Manufacturing businesses', href: '/category/manufacturing/' },
      { label: 'Technology businesses', href: '/category/technology/' },
    ],
  },
  multan: {
    intro: 'Browse local businesses, services and companies in Multan, Pakistan, organised by category.',
    guidance: 'Refine a Multan search by category, service or profession — then confirm the provider’s details are current before you call or visit.',
    links: [
      { label: 'All business categories', href: '/categories/' },
      { label: 'Local services by city guide', href: '/blog/local-services-pakistan-by-city/' },
    ],
  },
  sialkot: {
    intro: 'Find businesses, industrial firms and local services in Sialkot, Pakistan, organised by category.',
    guidance: 'Used together, the city and category pages are a practical first pass over Sialkot’s industrial, commercial and professional providers. Confirm products, services and contact details directly with the business before going further.',
    links: [
      { label: 'Manufacturing businesses', href: '/category/manufacturing/' },
      { label: 'All business categories', href: '/categories/' },
    ],
  },
}

export function getCategorySeoCopy(categoryId: string): DirectorySeoCopy | null {
  return CATEGORY_COPY[categoryId] || null
}

export function getCitySeoCopy(citySlug: string): DirectorySeoCopy | null {
  return CITY_COPY[citySlug.toLowerCase()] || null
}
