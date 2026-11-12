import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

export const JOBS_ENHANCED_DATA = {
  "CJhXp8M0QIa6Ava9bO02": `Faisalabad Textile Outlets is currently seeking an energetic, target-driven Wholesale Sales Representative to lead our wholesale distribution and B2B textile sales operations across Faisalabad, Lahore, and regional Punjab fabric markets. In this dynamic role, you will be the frontline face of our premium textile manufacturing and distribution unit, establishing long-term business partnerships with wholesale cloth merchants, apparel retailers, boutique chains, and regional garment distributors. 

### Key Responsibilities & Daily Workflow
- Spearhead B2B sales outreach, client prospecting, and account management across wholesale markets including Clock Tower Bazaar, Rail Bazaar, and Montgomery Bazaar Faisalabad.
- Pitch seasonal fabric catalogs, unstitched lawn collections, cotton fabric, khaddar, and dyed yarn to high-volume commercial buyers.
- Negotiate volume pricing tiers, credit terms, delivery schedules, and bulk order supply contracts.
- Coordinate closely with textile warehouse logistics teams to guarantee timely order dispatch, invoice generation, and payment recovery.
- Analyze competitor pricing, market trends, and emerging customer fabric preferences to advise management on inventory planning.

### Candidate Requirements & Qualifications
- Minimum Bachelor’s degree in Business Administration, Marketing, Commerce, or equivalent experience.
- 2+ years of proven sales experience in the textile, apparel, or wholesale retail sector in Pakistan.
- Strong negotiation, relationship-building, and communication skills in Urdu and English.
- Valid motorcycle/car driving license and willingness to conduct client visits across Faisalabad and nearby industrial zones.
- High ethical standards, target orientation, and familiarity with wholesale invoicing and ledger management.

### Compensation & Benefits
- Competitive Base Salary: PKR 45,000 - PKR 75,000 per month + High Performance Commissions.
- Fuel and mobile allowance provided.
- Annual performance bonuses, paid leaves, and career advancement into Regional Sales Manager roles.`,

  "b29Lp34auuEqNNoyNHOK": `Rawalpindi Realtors & Builders is hiring a creative and performance-oriented Digital Marketing Executive to manage our real estate marketing campaigns across Rawalpindi and Islamabad. As property demand surges across DHA Islamabad, Bahria Town Rawalpindi, and New Metro City, this role requires an experienced digital strategist to generate high-intent buyer leads, run targeted paid media campaigns, and create engaging property showcase content.

### Key Responsibilities
- Plan, execute, and optimize paid lead-generation campaigns on Meta Ads (Facebook & Instagram), Google Search Ads, and YouTube for luxury housing societies and commercial plots.
- Produce high-converting property video walkthroughs, reels, drone footage overlays, and interactive carousel ads showcasing residential villas and investment opportunities.
- Monitor lead pipelines within CRM, qualify prospective home buyers and overseas Pakistani investors, and route hot inquiries to our real estate sales advisory team.
- Manage search engine optimization (SEO) and content writing for our property portal and real estate listing landing pages.
- Track return on ad spend (ROAS), cost per qualified lead (CPL), and campaign analytics to continuously maximize marketing budgets.

### Ideal Candidate Profile
- Bachelor's degree in Marketing, Digital Media, Computer Science, or relevant field.
- 2 to 4 years of proven hands-on experience in paid digital advertising, preferably within the Pakistan real estate or high-ticket sales sector.
- Proficiency with Meta Ads Manager, Google Ads, Canva / Adobe Premiere, and CRM lead workflows.
- Excellent copywriting skills in English and Urdu tailored to attract overseas Pakistani investors from GCC, UK, and North America.

### Salary & Perks
- Lucrative monthly salary: PKR 60,000 - PKR 95,000 + Attractive per-deal closing commissions.
- Professional modern office environment on Main GT Road Rawalpindi.
- Annual bonuses, company laptop, and continuous digital marketing training sponsorships.`,

  "job-accountant-barlas-sale-service": `Barlas Sale & Service is urgently looking for an experienced, detail-focused Accountant to oversee our daily accounting operations, financial reporting, and tax compliance at our Karachi head office. As our wholesale and retail sales operations continue to expand across Sindh, we require a skilled financial professional capable of handling end-to-end bookkeeping, accounts payable and receivable, and tax documentation.

### Scope of Work & Core Duties
- Maintain general ledger entries, cash flow statements, and balance sheets in accordance with Pakistan accounting standards using QuickBooks and Excel.
- Reconcile daily vendor supplier invoices, bank statements, client receivables, and petty cash disbursements.
- Manage monthly payroll processing, employee salary disbursements, and commission adjustments for our sales force.
- Prepare and submit monthly withholding tax, Federal Board of Revenue (FBR) sales tax returns, and Sindh Revenue Board (SRB) filings in collaboration with external tax auditors.
- Prepare monthly financial summaries and budget variance reports for executive management review.

### Requirements & Qualifications
- B.Com, BBA (Finance), M.Com, or part-qualified CA / ACCA / CMA.
- Minimum 3 to 5 years of hands-on accounting experience in a trading, wholesale, or retail business in Karachi.
- In-depth mastery of QuickBooks, Microsoft Excel (VLOOKUP, Pivot Tables, financial modeling), and ERP accounting software.
- Thorough understanding of FBR tax laws, active taxpayer requirements, and withholding tax regimes.
- High integrity, analytical thinking, and meticulous attention to detail.

### Package & Working Conditions
- Monthly Salary: PKR 50,000 - PKR 80,000 depending on qualifications and test performance.
- Standard working hours: Monday to Saturday, 9:30 AM to 6:30 PM.
- Annual bonus, gratuity fund, and friendly corporate work culture in Saddar / Clifton commercial area.`,

  "job-accountant-bm-collection": `BM Collection, a prominent fashion and retail apparel brand in Karachi, is seeking an organized and meticulous Accountant to join our accounts and finance division. This full-time role is responsible for maintaining inventory accounting, retail POS register reconciliation, supplier accounts, and tax reporting for our retail outlets and e-commerce operations.

### Key Responsibilities
- Monitor and reconcile daily cash, debit card, and digital payment receipts across all retail store branches and online courier Cash-on-Delivery (COD) remittances.
- Record accounts payable for fabric suppliers, embroidery units, dying mills, packaging vendors, and logistic partners.
- Conduct periodic physical stock audits and inventory valuation reconciliations against ERP inventory records to eliminate stock discrepancies.
- Assist in calculating cost of goods sold (COGS), gross margins per collection, and operational overheads.
- Assist the Head of Finance in annual financial auditing, tax filing preparations, and banking operations.

### Eligibility Criteria
- Bachelor’s Degree in Commerce (B.Com), Accounting & Finance, or ACCA/CAF finalist.
- 2+ years of relevant accounting experience in retail apparel, fashion houses, or manufacturing businesses.
- Proficient in accounting ERP systems (e.g. Odoo, Candela, Retail Pro, QuickBooks) and advanced Excel functions.
- Strong numerical aptitude, problem-solving skills, and ability to work under tight month-end closing deadlines.

### Remuneration & Benefits
- Competitive monthly compensation: PKR 45,000 - PKR 70,000.
- Employee discounts on all BM Collection designer clothing lines.
- Medical coverage, paid annual leave, and rapid growth prospects within a fast-scaling fashion brand.`,

  "job-amazon-virtual-assistant-nasksoft-private-limited": `NaskSoft Private Limited is on the lookout for a talented and results-driven Amazon Virtual Assistant (VA) to manage Private Label (PL) and Wholesale FBA accounts for international e-commerce clients in US, UK, and European marketplaces. If you are passionate about e-commerce growth, Amazon PPC optimization, and product hunting, this position offers an exceptional platform to scale your career in Lahore.

### Detailed Job Responsibilities
- Perform advanced product hunting and market validation using Helium 10, Jungle Scout, Keepa, and Brand Analytics.
- Find reliable manufacturers on Alibaba, negotiate unit pricing, inspect sample quality, and oversee freight logistics to Amazon fulfillment centers.
- Create SEO-optimized Amazon product listings with high-volume keyword placement in titles, bullet points, backend search terms, and A+ Content (EBC).
- Launch, monitor, and scale Amazon Sponsored Products, Sponsored Brands, and Video PPC campaigns to maximize sales velocity while maintaining target ACoS and TACoS.
- Manage day-to-day Seller Central operations: inventory replenishment forecasts, stranded inventory resolution, customer service messaging, and case log follow-ups.

### Required Skills & Experience
- 1 to 3 years of proven experience managing Amazon Seller Central accounts for US or UK marketplaces.
- Certified knowledge or proven portfolio demonstrating successful product launches and PPC management.
- Excellent written English communication for customer support and supplier negotiations.
- Self-motivated, analytical, and proficient with spreadsheets and e-commerce analytics dashboards.

### Perks & Package
- Attractive Salary: PKR 60,000 - PKR 110,000 per month + Performance bonuses on account milestones.
- Convenient Lahore office location (Johar Town / Gulberg) with power backup and high-speed fiber internet.
- Opportunities to work on multi-million-dollar international e-commerce brands.`,

  "job-back-end-developer-meshsquare": `MeshSquare is hiring a skilled, highly motivated Back End Developer to architect, develop, and maintain resilient server-side microservices, RESTful APIs, and distributed database systems in Rawalpindi. In this position, you will collaborate with our frontend engineers, mobile app developers, and DevOps specialists to build high-scale cloud platforms for enterprise clients in the UK, UAE, and North America.

### Responsibilities
- Design, implement, and maintain scalable backend services using Node.js (TypeScript) / Python / Go.
- Architect high-performance database schemas and optimize query performance across PostgreSQL, MongoDB, and Redis caching layers.
- Build secure, documented RESTful and GraphQL APIs with OAuth2, JWT authentication, and rate limiting.
- Write clean, modular, test-driven code (unit and integration tests with Jest/Mocha) adhering to software design patterns.
- Deploy and monitor microservices on AWS (ECS, Lambda, S3, CloudWatch) and Docker containerized environments.

### Requirements & Tech Stack
- Bachelor’s or Master’s in Computer Science, Software Engineering, or equivalent practical experience.
- 2+ years of professional backend engineering experience in high-traffic web applications.
- Strong proficiency in Node.js/Express/NestJS, TypeScript, relational SQL databases, and NoSQL databases.
- Familiarity with message brokers (RabbitMQ, Kafka) and CI/CD automated pipelines.
- Solid understanding of data structures, algorithms, system architecture, and cybersecurity best practices.

### Salary & Work Environment
- Salary Package: PKR 100,000 - PKR 180,000 per month based on technical assessment.
- Hybrid work flexibility (Rawalpindi office + work from home days).
- Health insurance, annual bonuses, paid leaves, and international project exposure.`,

  "job-content-writer-content-management-executive-texas-lab-technologies": `Texas Lab Technologies is looking for a creative, detail-oriented Content Writer & Content Management Executive to join our digital marketing team in Karachi. You will produce captivating, SEO-optimized articles, whitepapers, website copy, and thought-leadership materials for our international software products, SaaS tools, and health-tech service solutions.

### Core Duties
- Research complex technological and healthcare subjects to write engaging, original, and search-optimized blog posts, service pages, and case studies.
- Implement comprehensive on-page SEO best practices (keyword density, search intent mapping, meta tags, and internal linking strategies).
- Publish, format, and maintain articles across WordPress, Webflow, and custom CMS platforms.
- Craft persuasive ad copy, email newsletters, social media captions, and video scripts to fuel multi-channel marketing campaigns.
- Collaborate with UI/UX designers and marketing strategists to refine messaging for product landing pages.

### Candidate Requirements
- Bachelor's degree in English Literature, Mass Communication, Journalism, Marketing, or related field.
- 1 to 3 years of experience writing high-quality content for international B2B/B2C technology or SaaS audiences.
- Exceptional command of written English grammar, tone adjustment, and storytelling.
- Familiarity with SEO tools such as Semrush, Ahrefs, SurferSEO, and Google Search Console.
- Portfolio of published online articles or copywriting samples.

### Benefits & Compensation
- Monthly Salary: PKR 50,000 - PKR 85,000.
- Health insurance, bi-annual performance appraisals, and paid vacations.
- Professional, creative, and growth-oriented work environment in Karachi.`,

  "job-data-entry-operator-bahria-town-karachi": `Bahria Town Karachi is seeking a reliable, detail-oriented Data Entry Operator to join our customer management and documentation office in Bahria Town Karachi. In this role, you will be responsible for digitizing property registration files, updating customer ownership records, entering utility billing data, and ensuring 100% accuracy across our centralized property management database.

### Responsibilities
- Accurately input customer registration details, plot transfer records, allotment letters, and installment vouchers into Bahria Town's internal management software.
- Review physical documents, customer CNIC copies, and payment deposit slips for errors or discrepancies prior to digital archiving.
- Maintain electronic file indexes, perform routine data backups, and retrieve property files for customer support officers upon request.
- Generate weekly data entry completion reports and verify ledger accuracy with the accounts verification team.
- Adhere strictly to institutional data security, privacy guidelines, and confidentiality protocols.

### Requirements
- Intermediate (FA / F.Sc / I.Com) or Bachelor’s degree (BA / B.Com / B.Sc).
- Proven typing speed of 40+ words per minute with minimum 98% accuracy.
- Proficiency with Microsoft Office suite, especially MS Excel, MS Word, and cloud spreadsheets.
- Strong attention to detail, organizational skills, and ability to handle high-volume data entry tasks smoothly.
- Preference will be given to candidates residing within or near Bahria Town Karachi or surrounding sectors.

### Compensation & Facilities
- Monthly Salary: PKR 35,000 - PKR 50,000.
- Company transportation facility (selected routes) / fuel subsidy.
- Medical facility access at Bahria Town Hospital and subsidized housing benefits.`,

  "job-digital-marketing-executive-ags-leads": `AGS Leads is searching for a passionate and proactive Digital Marketing Executive to join our performance marketing team in Islamabad. We specialize in B2B lead generation, inbound sales funnels, and paid advertising for international technology clients across North America and Europe.

### Key Responsibilities
- Plan and manage paid advertising campaigns across LinkedIn Ads, Google Search & Display Network, and Meta Ads Manager.
- Build high-converting landing pages, lead capture forms, and email drip sequences using HubSpot, Mailchimp, and WordPress.
- Conduct keyword research, competitive intelligence, and audience segmentation to target high-intent B2B decision-makers.
- Monitor daily ad spend, cost per acquisition (CPA), conversion rates, and ROI metrics across all live campaigns.
- Prepare weekly performance dashboards and actionable optimization insights for client account managers.

### Qualifications
- Bachelor's degree in Marketing, Media Sciences, IT, or Business Administration.
- 1 to 3 years of hands-on digital marketing and paid acquisition experience in an agency or B2B SaaS environment.
- Demonstrated expertise in LinkedIn Campaign Manager, Google Ads, Google Analytics (GA4), and Tag Manager.
- Strong creative copywriting skills and ability to design basic ad creatives on Canva or Figma.

### Salary & Perks
- Monthly Salary: PKR 60,000 - PKR 100,000 + Lucrative quarterly performance incentives.
- Modern co-working office environment in Islamabad with flexible work culture.
- Professional development budget for Google/Meta/HubSpot certifications.`,

  "job-digital-marketing-manager-moldech": `Moldech is hiring an experienced, visionary Digital Marketing Manager to lead our growth marketing strategies, brand positioning, and customer acquisition funnels in Lahore. As a premier technology solutions and design studio, we need a strategic leader to direct our marketing team, scale inbound lead volume, and enhance brand authority across international markets.

### Job Responsibilities
- Architect comprehensive omnichannel marketing strategies encompassing SEO, SEM, content marketing, LinkedIn outreach, and PR.
- Lead and mentor a team of content creators, graphic designers, SEO specialists, and media buyers.
- Establish growth experiments, A/B tests, and conversion rate optimization (CRO) frameworks on corporate web properties.
- Manage marketing budgets, forecast monthly customer acquisition targets, and maximize ROAS across paid channels.
- Partner with executive leadership and sales teams to build high-converting B2B enterprise client acquisition funnels.

### Desired Qualifications
- Master's or Bachelor's degree in Marketing, Business, or related discipline.
- 4+ years of digital marketing experience with at least 1-2 years in a leadership or managerial capacity within the IT/Software industry.
- Deep expertise in GA4, Semrush, Google Ads, LinkedIn Ads, and marketing automation software.
- Exceptional communication, team management, analytical, and presentation skills.

### Remuneration & Benefits
- Lucrative Salary: PKR 120,000 - PKR 200,000 per month.
- Annual profit-sharing bonus, company-provided laptop, and comprehensive family health insurance.
- Dynamic leadership role with rapid upward career progression.`,

  "job-e-commerce-data-entry-offneo": `Offneo is looking for a meticulous, fast-paced E-Commerce Data Entry Specialist to manage online product catalog listings, inventory updates, and pricing matrices for our multi-channel e-commerce storefronts in Lahore (Shopify, Daraz, WooCommerce, and eBay).

### Responsibilities
- Upload and update hundreds of product listings with accurate titles, descriptions, categories, specifications, SKUs, and variant pricing.
- Edit and resize product images, remove backgrounds, and ensure visual consistency across product catalog galleries.
- Monitor stock levels across inventory management sheets and sync availability across all active retail sales channels.
- Research competitor pricing and promotional discounts to adjust catalog pricing rules under manager guidance.
- Review customer reviews and feedback to flag listing defects, missing dimensions, or description inaccuracies.

### Requirements
- Intermediate or Bachelor’s degree in any discipline.
- Prior experience in e-commerce data entry, Shopify admin, Daraz Seller Center, or WordPress/WooCommerce is highly preferred.
- Good typing speed (35+ WPM) and intermediate proficiency with Microsoft Excel (VLOOKUP, sorting, filtering).
- Basic image editing skills using Canva or Photoshop.
- Detail-oriented mindset with high commitment to quality and deadlines.

### Compensation
- Monthly Salary: PKR 35,000 - PKR 50,000.
- Performance allowances, friendly team atmosphere, and convenient office location in Lahore.`,

  "job-email-marketing-intern-iyrix-technologies": `Iyrix Technologies is offering an exciting Email Marketing Internship at our software development and digital marketing center in Lahore. This program is tailored for fresh graduates and early-career marketers who want to master cold email outreach, B2B lead generation funnels, email automation, and enterprise deliverability techniques.

### What You Will Learn & Execute
- Build targeted B2B prospect email lists using LinkedIn Sales Navigator, Apollo.io, and Hunter.
- Write persuasive, personalized cold email outreach copy that achieves high open and reply rates.
- Set up and manage automated email outreach campaigns using tools like Instantly, Lemlist, or HubSpot.
- Monitor email deliverability health: SPF, DKIM, DMARC records, domain warmup, and bounce rate minimization.
- Analyze campaign open rates, click-through rates (CTR), and booked client demo calls.

### Qualifications
- Fresh graduates in Marketing, Business Administration, Mass Communication, or Computer Science.
- Excellent English writing skills with an emphasis on concise, engaging business communication.
- Fast learner with natural curiosity for digital tools, sales funnels, and growth hacking.
- Basic understanding of email marketing concepts and spreadsheets.

### Internship Details
- Paid Internship Stipend: PKR 25,000 - PKR 35,000 per month.
- 3-Month duration leading to a permanent full-time employment offer for top-performing interns.
- Certificate of completion and mentorship from experienced digital marketing professionals.`,

  "job-evening-shift-call-center-agent-students-freshers-smarthubinnovations": `SmartHubInnovations is hiring energetic, fluent English speakers for Evening Shift Call Center Agent positions at our modern customer support center in Islamabad. This role is perfectly suited for university students and fresh graduates looking for a well-paying, professional evening job with international client exposure.

### Key Responsibilities
- Handle inbound and outbound customer inquiries for international campaigns (USA, UK, and Canada).
- Provide accurate product information, assist with order status tracking, and resolve customer grievances courteously.
- Maintain detailed call logs, update CRM records, and escalate technical issues to senior tier-2 support.
- Meet daily and weekly customer satisfaction (CSAT) scores and target key performance indicators (KPIs).

### Candidate Requirements
- Intermediate (F.A / F.Sc / I.Com / A-Levels) or Bachelor's degree (ongoing or completed).
- Fluent spoken English with clear pronunciation and confident conversational ability.
- Active listening skills, patience, and professional telephone etiquette.
- Willingness to work evening / night shifts (e.g., 6:00 PM to 2:00 AM or 8:00 PM to 4:00 AM).
- Prior call center or customer support experience is a plus, but freshers with strong English are warmly welcomed.

### Compensation & Facilities
- Basic Fixed Salary: PKR 45,000 - PKR 75,000 + Daily and Monthly Performance Bonuses (Earn up to PKR 100,000+).
- Free office dinner, snacks, and tea.
- Safe, comfortable working environment with high security.`,

  "job-front-end-engineer-remote-eventmobi": `EventMobi is seeking an experienced, talented Front-End Engineer (Remote) based in Pakistan to develop modern, interactive, and ultra-fast web user interfaces for our global virtual and hybrid event platforms. You will work within a distributed international engineering team crafting intuitive interfaces used by millions of conference attendees worldwide.

### Responsibilities
- Develop state-of-the-art web applications and interactive widgets using React, TypeScript, Next.js, and Tailwind CSS.
- Transform Figma design systems into pixel-perfect, accessible, and responsive components conforming to WCAG 2.1 AA guidelines.
- Optimize client-side performance, core web vitals, bundle sizes, and cross-browser compatibility.
- Write thorough unit and end-to-end tests using Jest, React Testing Library, and Cypress/Playwright.
- Collaborate with backend engineers to integrate GraphQL and RESTful APIs, WebSockets, and real-time streaming services.

### Qualifications
- 3+ years of professional front-end software development experience building production React applications.
- Deep expertise in Modern JavaScript (ES6+), TypeScript, React Hooks, and state management (Zustand, Redux Toolkit, or TanStack Query).
- Strong command of modern CSS architecture, animations, and responsive layouts.
- Excellent English communication skills for daily async remote collaboration and agile standups.

### Compensation & Perks
- Generous Remuneration: PKR 150,000 - PKR 260,000 per month (US Dollar equivalent / competitive global pay).
- 100% Fully Remote work environment with home office setup stipend.
- Paid time off, wellness allowance, and international company retreats.`,

  "job-full-stack-developer-exora-ai": `Exora AI is hiring an exceptional Full Stack Developer to build next-generation AI-powered enterprise applications and SaaS platforms in Islamabad. In this role, you will be instrumental in integrating Large Language Models (LLMs), real-time vector search pipelines, and intuitive user interfaces for enterprise automation clients.

### Responsibilities
- Architect and develop scalable web applications using Next.js (React), TypeScript, Node.js/FastAPI, and Python.
- Integrate AI models, OpenAI / Claude APIs, LangChain, and vector databases (Pinecone, pgvector) into production workflows.
- Design resilient database schemas across PostgreSQL, MongoDB, and Redis.
- Build clean RESTful and streaming WebSocket APIs for real-time AI conversational interfaces.
- Implement CI/CD pipelines, containerized Docker deployments, and cloud infrastructure on AWS/GCP.

### Requirements
- Bachelor’s or Master’s in Computer Science or Software Engineering.
- 3+ years of full-stack engineering experience with strong command over React/Next.js and Node.js or Python backend frameworks.
- Demonstrated hands-on experience building or integrating AI/LLM applications, embeddings, and prompt orchestration.
- Solid grounding in cloud architectures, microservices, and automated testing frameworks.

### Salary & Benefits
- Highly Competitive Package: PKR 140,000 - PKR 230,000 per month.
- Hybrid working schedule (Islamabad office + remote options).
- Annual equity incentives, health insurance, and paid conference attendance.`,

  "job-full-stack-developer-intern-nextjs-claude-code-iyrix-technologies": `Iyrix Technologies is launching a cutting-edge Full Stack Developer Internship focusing on Next.js 15, TypeScript, AI Agent Workflows, and Claude Code integration at our technology development hub in Lahore. This is a rare opportunity for ambitious young developers to master future-proof modern full-stack development.

### What You Will Build & Learn
- Build production-ready web applications using Next.js App Router, Server Components, TypeScript, and Tailwind CSS.
- Harness generative AI developer tools (Claude Code, GitHub Copilot, Cursor AI) to accelerate development velocity and automated code testing.
- Design database models with Prisma / Drizzle ORM and connect relational PostgreSQL/Supabase databases.
- Develop secure authentication systems with NextAuth/Clerk and process API webhooks.
- Participate in code reviews, sprint plannings, and GitHub collaborative workflows.

### Who Should Apply
- Final-year students or fresh graduates with degrees in Computer Science, Software Engineering, or IT.
- Foundational programming knowledge in JavaScript/TypeScript, React basics, HTML, and CSS.
- Passion for modern web frameworks and enthusiasm for artificial intelligence development tooling.
- Active GitHub repository or academic portfolio projects.

### Program Details
- Paid Internship: PKR 30,000 - PKR 45,000 monthly stipend.
- Duration: 3 to 6 Months leading to full-time Associate Software Engineer role upon review.
- Hands-on mentorship from senior engineering architects in Lahore.`,

  "job-graphic-designer-remote-winqle-tech-pvt-ltd": `Winqle Tech Pvt Ltd is looking for a creative, versatile Graphic Designer (100% Remote) to create stunning visual branding, marketing collaterals, social media assets, and digital UI illustrations for our international software and e-commerce clients.

### Responsibilities
- Design eye-catching social media posts, promotional banners, carousel graphics, and infographics for LinkedIn, Instagram, and Facebook.
- Create corporate branding packages including logos, typography guides, brand identity mockups, and pitch decks.
- Collaborate with marketing and web development teams to design high-converting web banners, ad creatives, and newsletter graphics.
- Prepare print-ready marketing materials such as brochures, business cards, standees, and exhibition flyers.
- Stay updated with international design trends, modern minimalism, and 3D illustration aesthetics.

### Requirements
- 2+ years of professional graphic design experience (portfolio submission mandatory).
- Mastery of Adobe Creative Cloud (Photoshop, Illustrator, InDesign) and Figma.
- Strong sense of typography, color harmony, visual hierarchy, and brand consistency.
- Ability to manage multiple projects independently in a remote setting and deliver on tight timelines.

### Package & Perks
- Monthly Salary: PKR 55,000 - PKR 85,000.
- 100% Work from Home anywhere in Pakistan.
- Paid annual leaves, festive bonuses, and continuous software tool subscriptions provided.`,

  "job-junior-developer-contentstudio": `ContentStudio is hiring an enthusiastic Junior Developer to join our core product engineering team in Islamabad. ContentStudio is a globally acclaimed social media management and content marketing platform serving over 100,000 businesses worldwide.

### Responsibilities
- Write maintainable, clean code for our core SaaS platform under the guidance of senior software engineers.
- Build new features, optimize user dashboards, and fix bugs using Vue.js / React, Laravel / Node.js, and MySQL.
- Integrate third-party social media APIs (Meta Graph API, X/Twitter API, LinkedIn Marketing API, TikTok API, Pinterest API).
- Write automated tests and participate in continuous deployment cycles.
- Monitor application performance and troubleshoot customer-reported platform anomalies.

### Requirements
- Bachelor’s degree in Computer Science, Software Engineering, or related field.
- 1 to 2 years of professional or strong project experience in modern JavaScript frameworks and backend PHP/Laravel or Node.js.
- Solid understanding of relational database design, REST APIs, and version control with Git.
- Eagerness to learn complex SaaS architectures and distributed systems.

### What We Offer
- Competitive Salary: PKR 70,000 - PKR 110,000 per month.
- Health insurance for employee and immediate dependents.
- Annual retreats, gym allowance, learning budget, and vibrant tech culture in Islamabad.`,

  "job-junior-or-mid-level-mern-stack-developer-expertizo": `Expertizo is actively seeking a passionate Junior or Mid-Level MERN Stack Developer to build full-stack web applications at our software development house in Karachi. You will work on dynamic client projects spanning e-commerce, fintech, and custom web portals.

### Job Responsibilities
- Develop scalable full-stack applications using MongoDB, Express.js, React.js, and Node.js.
- Implement responsive user interfaces with Redux/Context API, Tailwind CSS, and Material-UI.
- Create secure RESTful API endpoints with JWT authentication, role-based access control, and data validation.
- Optimize database queries and schema indexes in MongoDB for fast response times.
- Collaborate with QA engineers to resolve defects and ensure smooth deployment to AWS / Vercel.

### Skills & Qualifications
- Bachelor's in CS / IT or relevant software engineering diploma.
- 1.5 to 3 years of hands-on experience in MERN stack development.
- Proficient in JavaScript (ES6+), TypeScript, React, Node.js, Express, and MongoDB/Mongoose.
- Experience with Git, Postman, Docker basics, and agile methodologies.

### Salary & Benefits
- Monthly Salary: PKR 65,000 - PKR 120,000 (commensurate with experience and coding test).
- Bi-annual performance reviews, flexible office hours, and medical coverage in Karachi.`,

  "job-junior-react-native-developer-zavya-pakistan": `Zavya Pakistan is looking for a talented Junior React Native Developer to develop and publish high-performance cross-platform iOS and Android mobile applications at our Lahore tech office.

### Key Responsibilities
- Develop cross-platform mobile apps for iOS and Android using React Native and TypeScript.
- Build smooth, native-feeling UI components, custom animations, and responsive screen flows.
- Integrate REST APIs, GraphQL, Firebase push notifications, and third-party SDKs (payment gateways, maps).
- Optimize app launch times, frame rates, memory usage, and offline data persistence (AsyncStorage/WatermelonDB).
- Assist in preparing mobile app builds and deploying them to Google Play Store and Apple App Store.

### Requirements
- Bachelor's degree in Computer Science or Software Engineering.
- 1+ year of experience with React Native and mobile app development.
- Strong grasp of React fundamentals, state management (Redux / Zustand), and JavaScript/TypeScript.
- Familiarity with native build tools (Android Studio, Xcode) is an asset.

### Salary & Perks
- Monthly Salary: PKR 60,000 - PKR 95,000.
- Fast-track career growth into Mid-Level and Mobile Lead roles.
- Modern Lahore office with free refreshments and continuous mentorship.`,

  "job-laravel-developer-remote-part-time-thinkdone-solutions": `Thinkdone Solutions is seeking a proficient Laravel Developer (Remote - Part Time) to support ongoing web application development, API integrations, and maintenance for international enterprise clients.

### Responsibilities
- Build, extend, and maintain robust web applications and microservices using PHP 8.x and Laravel 10/11.
- Design and optimize relational database schemas, migrations, and complex Eloquent ORM queries in MySQL/PostgreSQL.
- Develop and document secure RESTful APIs for third-party mobile apps and frontend SPAs (Vue/React).
- Implement third-party API integrations such as Stripe, PayPal, Twilio, and SendGrid.
- Troubleshoot legacy codebases, perform security patching, and resolve performance bottlenecks.

### Requirements
- 2+ years of professional web development experience using PHP and Laravel framework.
- Solid understanding of MVC architecture, OOP principles, design patterns, and Git workflows.
- Experience with frontend integration (Blade, Livewire, Alpine.js or Vue.js).
- Reliable high-speed internet connection, power backup, and disciplined remote work ethics.

### Working Terms & Compensation
- Flexible part-time hours: 20 hours per week (remote from any city in Pakistan).
- Monthly Compensation: PKR 40,000 - PKR 65,000 based on skill level and speed of delivery.
- Potential to transition into a full-time senior remote developer position.`,

  "job-online-and-home-tuition-expert-fahad-tutors": `Fahad Tutors is hiring passionate, qualified Online and Home Tuition Experts across Islamabad and Rawalpindi to provide personalized academic coaching for Matric, F.Sc, O-Level, A-Level, and IGCSE students.

### Responsibilities
- Deliver engaging one-on-one and small group tutoring sessions in subjects such as Mathematics, Physics, Chemistry, Biology, Computer Science, and English.
- Design customized study plans, solve past examination papers, and conduct regular mock assessments.
- Track student academic progress and communicate feedback regularly with parents.
- Conduct interactive online tutoring classes via Zoom / Google Meet with digital whiteboards.

### Qualifications
- Bachelor's or Master's degree in Science, Mathematics, Engineering, English, or related discipline from a reputable university.
- 1+ year of prior teaching or tutoring experience with Cambridge (O/A Levels) or Federal Board curriculum.
- Exceptional conceptual clarity, patient pedagogical approach, and fluent English/Urdu communication.

### Compensation & Flexibility
- Lucrative Earnings: PKR 30,000 - PKR 80,000+ per month (based on number of assigned students and teaching hours).
- Flexible working hours (afternoon and evening shifts) with option for home tutoring or 100% online teaching.`,

  "job-online-research-virtual-assistant-bpo-solutions-pvt-ltd": `BPO Solutions Pvt Ltd is hiring a dedicated Online Research & Virtual Assistant to conduct comprehensive web research, business intelligence data gathering, and administrative support for overseas corporate clients at our Lahore center.

### Responsibilities
- Conduct in-depth secondary web research to collect market data, executive contact details, competitor pricing, and business directory profiles.
- Organize, clean, and validate researched data in Microsoft Excel and Google Sheets with zero duplication.
- Assist overseas clients with administrative tasks: email management, calendar scheduling, customer support follow-ups, and documentation.
- Prepare concise research summaries and briefing presentations for executive review.

### Requirements
- Graduate degree in any discipline (BBA, B.Com, BA, B.Sc, BS).
- Strong internet research skills, boolean search query formulation, and critical data evaluation.
- Proficient in MS Excel / Google Sheets and basic cloud productivity software.
- Good English comprehension and written communication skills.

### Remuneration & Benefits
- Monthly Salary: PKR 40,000 - PKR 65,000 + Quarterly attendance and performance bonuses.
- Professional training provided on international BPO workflows and research automation tools.
- Comfortable office environment in Lahore.`,

  "job-online-teachers-required-for-o-igcse-a-levels-for-all-subjects-zohaib-asad-academies": `Zohaib Asad Academies is actively recruiting experienced Online Teachers for Cambridge O Level, IGCSE, and A Level students across all major subjects: Mathematics (4024 / 9709), Physics (5054 / 9702), Chemistry (5070 / 9701), Biology (5090 / 9700), Economics, Accounting, Business Studies, Computer Science, and English.

### Responsibilities
- Deliver structured, interactive online lectures following the latest Cambridge International Assessment (CAIE) syllabus.
- Guide students through topical past papers, marking schemes, examiner reports, and exam techniques.
- Provide constructive homework grading, conduct regular testing, and host dedicated doubt-clearing sessions.
- Maintain a high standard of student engagement and academic excellence.

### Requirements
- Master's or Bachelor's degree from a top university in the respective teaching subject.
- Minimum 2 to 3 years of demonstrated teaching experience with CAIE O/A Level curricula with track record of producing A* and A grades.
- Excellent English communication skills and familiarity with online teaching platforms (Zoom, Miro, MS Teams, graphic tablets).

### Package
- Highly Attractive Compensation: PKR 50,000 - PKR 120,000+ per month depending on subject expertise and teaching load.
- 100% Work from Home with flexible schedules.`,

  "job-remote-administration-internship-alis-academy": `Ali’s Academy is offering a comprehensive Remote Administration Internship for organized, ambitious students and recent graduates looking to build essential administrative, operations, and organizational management skills in Pakistan.

### What You Will Do
- Manage student enrollment records, course schedules, and digital attendance logs.
- Respond to student queries via WhatsApp, email, and live chat regarding class timings and fee payments.
- Assist operations managers in drafting official notices, preparing certificates, and coordinating online webinar sessions.
- Maintain and update digital files in cloud storage folders (Google Drive, OneDrive).

### Candidate Profile
- Students enrolled in or recently graduated from Bachelor's programs (BBA, BA, B.Com, BS).
- Strong communication skills in Urdu and English.
- Familiarity with Google Workspace, MS Office, and social media platforms.
- Responsible, organized, and capable of working independently in a remote environment.

### Internship Details
- Paid Monthly Stipend: PKR 20,000 - PKR 30,000.
- Duration: 3 Months with internship completion certificate and letter of recommendation.`,

  "job-virtual-medical-office-receptionist-din-neurology": `Din Neurology is hiring a dedicated Virtual Medical Office Receptionist to provide remote administrative support, patient scheduling, and customer service for our neurology clinics and healthcare consultations.

### Responsibilities
- Answer patient phone calls, respond to portal messages, and schedule clinical appointments accurately.
- Verify patient demographic information, medical insurance coverage, and prior authorization forms.
- Coordinate with attending neurologists and clinic nurses to relay urgent patient requests and prescription refill inquiries.
- Enter patient medical records into Electronic Health Record (EHR) systems conforming to HIPAA privacy standards.
- Follow up with patients regarding upcoming diagnostic tests (MRI, EEG, blood work) and post-consultation appointments.

### Qualifications
- Bachelor’s degree in Healthcare Administration, Nursing, Biology, English, or related discipline.
- 1+ year of experience in a medical office, clinic reception, or virtual healthcare assistant role.
- Fluent English speaking skills with a compassionate, patient-first bedside manner.
- High attention to detail and ability to handle confidential medical data discreetly.

### Package & Conditions
- Monthly Salary: PKR 55,000 - PKR 90,000.
- 100% Remote working position with quiet home office requirement.
- Health insurance support and comprehensive US healthcare training provided.`,

  "jpmE5jqP3cuAjJ6wRS8i": `Islamabad Diagnostic Clinic (IDC) is seeking a qualified, certified Medical Lab Technician to join our state-of-the-art diagnostic laboratory team in Islamabad. As one of the most trusted diagnostic testing networks in Pakistan, IDC offers advanced pathology, biochemistry, hematology, and microbiology services requiring rigorous quality control and diagnostic precision.

### Responsibilities
- Perform laboratory diagnostic tests in hematology, clinical chemistry, serology, microbiology, and molecular pathology.
- Collect biological specimens (blood, urine, swabs) following standard biosafety and aseptic phlebotomy procedures.
- Calibrate, operate, and maintain automated lab analyzers (Roche, Abbott, Sysmex) and document daily quality control runs.
- Enter test results into the Laboratory Information Management System (LIMS) and report critical panic values immediately to pathologist consultants.
- Comply strictly with ISO 15189 laboratory standards, biomedical waste disposal protocols, and patient confidentiality policies.

### Requirements & Qualifications
- B.Sc / BS in Medical Laboratory Technology (MLT) or Diploma in Lab Technology from a recognized medical institute.
- 1 to 3 years of clinical lab experience in a hospital or diagnostic center.
- Thorough knowledge of lab safety, sample handling, and operating automated diagnostic equipment.
- Ability to work rotational shifts (morning, evening, night) with dedication and accuracy.

### Compensation & Benefits
- Competitive Salary: PKR 45,000 - PKR 75,000 per month.
- Comprehensive medical coverage for employee and family.
- Annual increments, gratuity, and opportunities to work with leading pathologists in Pakistan.`,

  "umfFJXlDQrEkZyxNtdpl": `Lahore Tech Systems is hiring a skilled, passionate Senior React Developer to lead the development of our enterprise web platforms, fintech interfaces, and SaaS dashboards in Lahore. In this senior role, you will architect modular frontend codebases, mentor junior engineers, and drive modern UI engineering standards across high-impact client projects.

### Core Responsibilities
- Lead the architecture and implementation of large-scale React.js and Next.js applications using TypeScript and modern component patterns.
- Design performant client state management architectures using Redux Toolkit, Zustand, or TanStack Query.
- Optimize frontend web performance, achieving sub-second page loads and 90+ Google Lighthouse performance scores.
- Conduct thorough peer code reviews, establish linting standards, and enforce automated testing (Jest, Cypress).
- Collaborate with UI/UX designers, backend software architects, and product managers to deliver seamless user experiences.

### Candidate Requirements
- Bachelor’s or Master’s in Computer Science, Software Engineering, or equivalent.
- 4+ years of professional front-end engineering experience with deep expertise in React.js, TypeScript, Next.js, and Tailwind CSS.
- Proven track record of architecting scalable web applications from scratch through deployment.
- Strong knowledge of WebSockets, REST/GraphQL APIs, micro-frontends, and CI/CD pipelines.
- Exceptional problem-solving skills, leadership capability, and technical communication.

### Compensation & Perks
- High-Tier Salary: PKR 160,000 - PKR 280,000 per month.
- Bi-annual bonuses, company laptop, and full health insurance coverage.
- Lahore office (Gulberg / DHA) with hybrid work options and progressive tech culture.`
};

async function updateJobs() {
  console.log("Updating 28 Jobs in Firestore with 200+ word descriptions...");
  const snap = await getDocs(collection(db, "jobs"));
  let count = 0;

  for (const docSnap of snap.docs) {
    const jId = docSnap.id;
    const desc = JOBS_ENHANCED_DATA[jId];
    if (desc) {
      const words = desc.trim().split(/\s+/).length;
      console.log(`Updating Job [${jId}] - Word Count: ${words}`);
      await updateDoc(doc(db, "jobs", jId), {
        description: desc
      });
      count++;
    } else {
      console.log(`No job key for doc [${jId}] title: ${docSnap.data().title}`);
    }
  }

  console.log(`Successfully updated ${count} jobs in Firestore.`);
  process.exit(0);
}

updateJobs().catch(e => {
  console.error("Error updating jobs:", e);
  process.exit(1);
});
