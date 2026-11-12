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

export const PROFESSIONAL_ENHANCED_DATA = {
  "pro-salim-ghauri": {
    bio: "Salim Ghauri is a pioneering Pakistani IT entrepreneur, technology visionary, and the Founder & CEO of NetSol Technologies, Pakistan's first software house listed on the NASDAQ stock exchange.",
    about: `Salim Ghauri is widely celebrated as the visionary pioneer of Pakistan's commercial software export industry. As the Founder and Chief Executive Officer of NetSol Technologies Limited, he transformed a boutique Lahore-based software studio into an internationally renowned enterprise software powerhouse, listed on NASDAQ (NTWK) and the Pakistan Stock Exchange (PSX). Over three decades of technology leadership, Mr. Ghauri has spearheaded mission-critical global leasing, asset finance, and digital banking platforms trusted by Fortune 500 automotive manufacturers, multinational banks, and financial institutions across Europe, North America, Asia-Pacific, and the Middle East.

Recognized frequently as the 'Bill Gates of Pakistan', Salim Ghauri has actively championed the growth of Pakistan's digital economy, IT exports, and startup incubation ecosystems. He has held distinguished advisory roles with the Federal IT Ministry, P@SHA, and prominent higher-education institutions, advocating for technology workforce development, AI integration, and venture investments. Under his guidance, NetSol continues to incubate high-growth tech ventures and nurture top-tier Pakistani engineering talent. 

Key Areas of Expertise:
- Global IT Enterprise Management & Software Exports
- Asset Finance & Enterprise Cloud Solutions Architecture
- Corporate Governance, NASDAQ Compliance & Public Company Leadership
- Venture Incubation, Tech Angel Investing & Strategic Mentorship
- Pakistan IT Sector Policy Development & Digital Transformation Strategy`
  },
  "pro-jehan-ara": {
    bio: "Jehan Ara is a legendary tech ecosystem leader, startup mentor, women-in-tech advocate, and the Founder & CEO of Katalyst Labs, former President of P@SHA, and creator of Nest I/O.",
    about: `Jehan Ara is one of the most respected and influential pioneers of Pakistan's technology and entrepreneurship ecosystem. As the Founder and CEO of Katalyst Labs and former President of the Pakistan Software Houses Association (P@SHA) for over two decades, she has been instrumental in institutionalizing Pakistan's IT export policies, tech startup incubation, and gender diversity initiatives nationwide. She founded The Nest I/O (P@SHA's technology incubator supported by Google for Startups), where she personally mentored hundreds of tech founders, helping Pakistani startups secure millions of dollars in venture financing and international market access.

A passionate champion for cyber freedom, data privacy, and women empowerment in STEM, Jehan Ara serves on multiple global and national advisory boards, including the Prime Minister's Task Force on IT and Telecom. Through Katalyst Labs, she leads premier startup accelerator cohorts, women leadership fellowships, and cross-border investor demo days that connect Pakistani tech innovators with venture capital firms across Silicon Valley, MENA, and Southeast Asia.

Core Competencies & Advisory Focus:
- Technology Startup Incubation, Accelerator Operations & Founder Mentorship
- Public Policy Advocacy for IT Exports, Tech Taxation & Cyber Legislation
- Venture Capital Ecosystem Building & Cross-Border Investor Relations
- Diversity, Equity & Inclusion (DEI) and Women in Technology Initiatives
- Keynote Speaking, Tech Ecosystem Evangelism & Corporate Innovation Consulting`
  },
  "pro-monis-rahman": {
    bio: "Monis Rahman is a premier Pakistani tech entrepreneur, fintech innovator, venture builder, and Founder & Chairman of ROZEE.PK and Dukan.pk, pioneering online recruitment and digital commerce in Pakistan.",
    about: `Monis Rahman is a celebrated digital pioneer, serial tech entrepreneur, and venture builder who fundamentally modernized how Pakistanis find employment and conduct retail commerce. As the Founder and Chairman of ROZEE.PK (Naseeb Networks), he built Pakistan's foremost online job matching platform, connecting tens of millions of job seekers with over 60,000 corporate employers and multinationals. ROZEE.PK achieved international acclaim as one of the first venture capital-backed tech platforms from Pakistan to secure funding from leading Silicon Valley venture capital firms including Draper Fisher Jurvetson and ePlanet Capital.

Building upon his decades of digital marketplace expertise, Monis launched Dukan.pk, an innovative fintech and e-commerce enablement platform designed to digitize micro, small, and medium retail enterprises (MSMEs) across Pakistan with inventory management, digital wallets, and embedded merchant financing. He is a frequent keynote speaker at global tech summits including World Economic Forum, Stanford University, and GSMA Mobile World Congress.

Specialized Expertise & Industry Focus:
- Digital Marketplace Platforms, HR-Tech & Algorithmic Job Matching
- Fintech Enablement, Merchant Digital Lending & MSME Digitization
- Silicon Valley Venture Capital Fundraising & Growth Equity Structuring
- Product Management, Scalable Cloud Infrastructure & User Growth Strategies
- Corporate Turnarounds, Board Governance & Angel Investing across South Asia`
  },
  "pro-kalsoom-lakhani": {
    bio: "Kalsoom Lakhani is a prominent venture capital investor, ecosystem builder, and Co-Founder & General Partner at i2i Ventures, investing in high-growth, early-stage technology startups across Pakistan.",
    about: `Kalsoom Lakhani is a prominent venture capitalist, ecosystem architect, and pioneer of early-stage startup financing in Pakistan. She is the Co-Founder and General Partner at i2i Ventures, an institutional, female-led venture capital fund investing in pre-seed and seed-stage technology founders across Pakistan. Prior to launching i2i Ventures in 2019, Kalsoom founded Invest2Innovate (i2i) in 2011, which operated Pakistan's first private startup accelerator, graduating dozens of high-impact enterprises and publishing ground-breaking ecosystem research and founder data.

Kalsoom is widely recognized across global tech forums for bridging international institutional capital with emerging-market startup ecosystems. She has written for The Washington Post, Foreign Policy, and TechCrunch, and serves as an advisor to international development organizations and angel networks. Her portfolio investments at i2i Ventures span transformative fintech, logistics, B2B SaaS, and healthtech platforms that are reshaping Pakistan's digital economy.

Strategic Domains & Advisory Areas:
- Early-Stage Venture Capital Investment & Portfolio Management
- Seed & Series A Pitch Structuring, Cap Table Advisory & Term Sheet Negotiation
- Emerging Market Innovation Dynamics & Pakistani Startup Ecosystem Data
- Gender-Lens Investing, Female Founder Capital Access & Impact Metrics
- Global LP Relations, Fund Governance & Cross-Border Tech Scaling`
  },
  "pro-muneeb-maayr": {
    bio: "Muneeb Maayr is a visionary Pakistani tech entrepreneur, logistics innovator, and the Founder of Bykea, as well as Co-Founder of Daraz.pk, transforming transport and e-commerce across Pakistan.",
    about: `Muneeb Maayr is one of Pakistan's foremost consumer internet entrepreneurs and operational leaders, having co-founded Daraz.pk (later acquired by Alibaba Group) and founded Bykea, Pakistan's largest on-demand ride-hailing, parcel delivery, and hyper-local cash-collection super-app. Armed with an investment banking background from Bear Stearns and extensive operational expertise, Muneeb pioneered hyper-localized digital solutions tailored to the unique economic realities of Pakistani consumers and informal cash-based economies.

Under his leadership, Bykea raised tens of millions of dollars from premier international venture capital funds including Prosus Ventures (Naspers), MEVP, and Sarmayacar, deploying thousands of two-wheeler motorbike fleets across Karachi, Lahore, Rawalpindi, and Islamabad. Muneeb is a leading authority on last-mile logistics, micro-mobility, digital payments infrastructure, and scaling high-velocity platform operations in high-density South Asian urban centers.

Core Expertise & Advisory Capabilities:
- Hyper-Local Mobility, Ride-Hailing Platforms & Last-Mile Logistics Networks
- E-Commerce Marketplace Operations, Supply Chain Logistics & Fulfillment
- Venture Capital Deal Structuring, Institutional Cap Table Strategy & Scaling
- Cash-on-Delivery (COD) Reconciliation & Fintech Payment Gateway Architecture
- Product Strategy for Mass-Market Frontier Economies & Consumer Onboarding`
  },
  "pro-sania-nishtar": {
    bio: "Dr. Sania Nishtar is an internationally acclaimed global health leader, physician, public policy pioneer, CEO of Gavi, The Vaccine Alliance, and former Federal Minister & Chairperson of Ehsaas Pakistan.",
    about: `Dr. Sania Nishtar (SI, FRCP, Ph.D.) is a globally celebrated physician, cardiologist, health economist, and public policy leader who currently serves as the Chief Executive Officer of Gavi, The Vaccine Alliance in Geneva. She previously served as Special Assistant to the Prime Minister of Pakistan on Poverty Alleviation and Social Safety with the rank of Federal Minister, where she architected and executed the historic Ehsaas Program—Pakistan's largest, most transparent social protection and poverty eradication initiative hailed by the World Bank and United Nations as a global benchmark during the COVID-19 pandemic.

Dr. Nishtar holds a Ph.D. from King's College London and fellowships with the Royal College of Physicians. She has served as Co-Chair of the World Health Organization's (WHO) High-Level Commission on Non-Communicable Diseases, Chair of the World Economic Forum's Global Agenda Council on the Future of Healthcare, and Founder of the civil society think tank Heartfile. Her rigorous work on institutional governance, anti-corruption frameworks, and digital social welfare distribution has influenced healthcare systems globally.

Areas of Global Leadership & Consulting:
- Universal Health Coverage (UHC), Global Immunization Strategy & Pandemic Preparedness
- Large-Scale Digital Social Protection Systems & Biometric Cash Transfers
- Public Sector Institutional Integrity, Governance Reform & Anti-Corruption Mechanisms
- Global Health Diplomacy, Multilateral Fund Allocations & WHO Engagements
- Health Systems Policy Research, Non-Communicable Disease (NCD) Prevention & Analytics`
  },
  "pro-arif-habib": {
    bio: "Arif Habib is an iconic Pakistani business magnate, industrialist, capital markets titan, and Chairman of the Arif Habib Group, driving landmark investments in fertilizer, steel, real estate, and finance.",
    about: `Arif Habib is one of Pakistan's most prominent and respected industrial titans, capital markets strategists, and corporate leaders. As the Founder and Chairman of the Arif Habib Group, he oversees a multibillion-rupee diversified industrial and financial conglomerate spanning fertilizer manufacturing (Fatima Fertilizer), integrated steel production, cement, wind and renewable energy generation, real estate development (Naya Nazimabad), asset management, and securities brokerage. 

Mr. Habib previously served as the President of the Karachi Stock Exchange (now Pakistan Stock Exchange), where he spearheaded monumental capital market reforms, automated electronic trading systems, and established investor protection regulations that modernized Pakistan's equity markets. He has played a crucial advisory role in national economic policy, privatization committees, export promotion councils, and public-private infrastructure partnerships across Pakistan.

Core Industrial & Strategic Competencies:
- Capital Markets Leadership, Equity Underwriting & IPO Management
- Mega-Scale Industrial Project Financing & Heavy Infrastructure Development
- Master-Planned Urban Real Estate & Sustainable Housing Scheme Development
- Corporate Restructuring, Mergers & Acquisitions (M&A) and Joint Ventures
- Macroeconomic Policy Advisory, National Export Strategies & Wealth Management`
  },
  "pro-roshaneh-zafar": {
    bio: "Roshaneh Zafar is an internationally acclaimed development economist, pioneer of microfinance in Pakistan, and Founder & Managing Director of Kashf Foundation, empowering millions of women entrepreneurs.",
    about: `Roshaneh Zafar is a world-renowned social entrepreneur, development economist, and the pioneering Founder and Managing Director of Kashf Foundation, Pakistan's first specialized microfinance and women empowerment institution established in 1996. Inspired by the Grameen model after working with the World Bank, Roshaneh created sustainable microcredit and financial literacy pathways that have lifted millions of low-income Pakistani families and female micro-entrepreneurs out of poverty across urban and rural communities.

Her transformational work has earned her top national and international honors, including the Tamgha-e-Imtiaz from the Government of Pakistan, the Skoll Award for Social Entrepreneurship, and recognition as an Ashoka Fellow and Schwab Foundation Social Entrepreneur. Roshaneh also serves on multiple international councils, advocating for gender equity, women-owned business financing, and climate-resilient community development.

Areas of Expertise & Global Impact:
- Microfinance Institutions (MFI) Governance, Credit Risk & Impact Lending
- Female Entrepreneurship Development, Financial Inclusion & Digital Wallets
- Development Economics, Poverty Alleviation Policies & Social Safety Nets
- Non-Profit Sustainable Financing, Impact Metrics & ESG Standards
- Educational Micro-Loans, Affordable Private School Financing & Gender Advocacy`
  },
  "pro-fiza-farhan": {
    bio: "Fiza Farhan is a distinguished global strategic development advisor, renewable energy pioneer, gender equality champion, and former Member of the Prime Minister's Task Force on Energy.",
    about: `Fiza Farhan is an acclaimed global strategic development advisor, renewable energy evangelist, and social impact champion with over 18 years of cross-sector leadership spanning international development, green financing, and gender equality. She serves on the UN Secretary-General's High-Level Panel on Women's Economic Empowerment and advises multilateral agencies including the United Nations (UN Women, UNDP, UNICEF, UNFPA), Asian Development Bank (ADB), World Bank Group, and bilateral government aid programs across Asia and Africa.

Previously, Fiza served as the Co-Founder and CEO of Buksh Foundation and Director of Buksh Energy, pioneering clean solar electrification projects across hundreds of off-grid rural Pakistani villages and structuring innovative green micro-loans. Listed on Forbes' 30 Under 30 list of Social Entrepreneurs and recipient of numerous global leadership awards, she continues to advise government ministries, multinational corporations, and venture funds on climate financing, clean energy transitions, and inclusive economic growth.

Strategic Advisory & Practice Areas:
- Renewable Energy Integration, Solar Rural Electrification & Climate Finance
- ESG Strategy, Corporate Sustainability Architecture & Impact Investing
- Gender-Responsive Policy Design, Women's Economic Empowerment Programs
- Multilateral Donor Program Management (UN, ADB, World Bank, Foreign Ministries)
- Public-Private Partnership (PPP) Structuring for Social Infrastructure & Clean Tech`
  },
  "pro-nighat-dad": {
    bio: "Nighat Dad is an internationally renowned digital rights lawyer, cyber harassment prevention specialist, and Executive Director of Digital Rights Foundation (DRF), defending internet freedoms in Pakistan.",
    about: `Nighat Dad is an internationally acclaimed human rights attorney, digital safety advocate, and the Executive Director of the Digital Rights Foundation (DRF), a non-profit organization dedicated to safeguarding digital privacy, online free expression, and cyber safety across South Asia. She pioneered Pakistan's first Cyber Harassment Helpline, providing confidential legal, psychological, and technical support to thousands of women, journalists, and marginalized communities facing digital threats and gender-based harassment.

Recognized by Time Magazine as a Next Generation Leader and recipient of the prestigious Human Rights Tulip Award and Atlantic Council Digital Freedom Award, Nighat sits on the global Meta Oversight Board, adjudicating complex content moderation, freedom of expression, and algorithmic policy decisions worldwide. She is a prominent authority on data protection legislation, algorithmic bias, online surveillance, and digital constitutionalism.

Specialized Legal & Policy Capabilities:
- Digital Rights Advocacy, Internet Freedom & Data Protection Legislation
- Cyber Harassment Prevention, Online Violence Response & Helpline Operations
- Global Platform Governance, Meta Oversight Board Adjudication & Content Policy
- Digital Literacy Training, Cyber Hygiene & Investigative Digital Security
- Constitutional Law, Human Rights Defense & Civil Society Strategic Litigation`
  }
};

async function updateProfessionals() {
  console.log("Updating 10 Professional Profiles in Firestore with 200+ word descriptions...");
  const snap = await getDocs(collection(db, "professionals"));
  let updatedCount = 0;

  for (const docSnap of snap.docs) {
    const d = docSnap.data();
    const proId = docSnap.id;
    const updateData = PROFESSIONAL_ENHANCED_DATA[proId];

    if (updateData) {
      const bioWordCount = updateData.bio.trim().split(/\s+/).length;
      const aboutWordCount = updateData.about.trim().split(/\s+/).length;
      const totalWords = bioWordCount + aboutWordCount;
      console.log(`Updating [${proId}] - Total Words: ${totalWords} (Bio: ${bioWordCount}, About: ${aboutWordCount})`);

      await updateDoc(doc(db, "professionals", proId), {
        bio: updateData.bio,
        about: updateData.about,
        description: updateData.about
      });
      updatedCount++;
    } else {
      console.log(`No explicit update key for doc [${proId}] name: ${d.name || d.fullName}`);
    }
  }

  console.log(`Successfully updated ${updatedCount} professionals in Firestore.`);
  process.exit(0);
}

updateProfessionals().catch(err => {
  console.error("Error updating professionals:", err);
  process.exit(1);
});
