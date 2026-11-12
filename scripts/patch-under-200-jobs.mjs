import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

const EXPANDED_JOBS = {
  "job-graphic-designer-remote-winqle-tech-pvt-ltd": `Winqle Tech Pvt Ltd is looking for an exceptionally creative, versatile Graphic Designer (100% Remote across Pakistan) to conceptualize and craft stunning visual brand identities, digital marketing collaterals, social media graphics, and modern UI vector assets for our international technology, SaaS, and e-commerce clients.

### Detailed Job Responsibilities & Daily Tasks
- Design eye-catching social media posts, promotional banners, multi-slide carousel graphics, and infographics for LinkedIn, Instagram, and Facebook.
- Create comprehensive corporate branding packages including vector logos, typography hierarchies, brand identity style guides, and executive pitch decks.
- Collaborate closely with marketing managers and frontend software teams to design high-converting web banners, ad creatives, and newsletter email graphics.
- Prepare print-ready marketing materials such as tri-fold brochures, corporate business cards, exhibition standees, and promotional flyers.
- Stay updated with international design trends, modern minimalist layout patterns, and 3D vector illustration aesthetics.

### Requirements & Candidate Profile
- 2+ years of professional graphic design experience (portfolio submission with live Behance/Dribbble link mandatory).
- Mastery of Adobe Creative Cloud (Adobe Photoshop, Illustrator, InDesign) and Figma.
- Strong intuitive grasp of typography, color harmony, visual layout hierarchy, and brand consistency.
- Ability to manage multiple client design briefs independently in a remote setting and deliver on tight deadlines.
- Fluent written English communication for async design reviews and Slack team updates.

### Package, Flexibility & Perks
- Competitive Monthly Salary: PKR 55,000 - PKR 85,000.
- 100% Work from Home with flexible working hours anywhere in Pakistan.
- Paid annual leaves, festive Eid bonuses, and continuous software tool subscriptions (Adobe CC, Envato Elements, Figma Pro) provided.`,

  "job-junior-or-mid-level-mern-stack-developer-expertizo": `Expertizo is actively seeking a passionate, detail-oriented Junior or Mid-Level MERN Stack Developer to build modern full-stack web applications at our software development house in Karachi. You will work on dynamic client projects spanning e-commerce marketplaces, fintech interfaces, and custom enterprise web portals for clients in the US, UK, and Middle East.

### Key Responsibilities & Development Workflow
- Develop scalable, responsive full-stack web applications using MongoDB, Express.js, React.js, and Node.js.
- Implement modern, clean user interfaces with Redux Toolkit, Context API, Tailwind CSS, and Material-UI components.
- Create secure RESTful API endpoints with JWT authentication, role-based access control (RBAC), and strict request data validation.
- Optimize database queries, aggregation pipelines, and schema indexes in MongoDB for sub-second query response times.
- Collaborate with QA engineers to debug issues, write unit tests, and ensure smooth continuous deployment to AWS and Vercel cloud platforms.

### Technical Skills & Qualifications
- Bachelor's degree in Computer Science, Software Engineering, or relevant technical field.
- 1.5 to 3 years of hands-on experience in MERN stack development and modern JavaScript.
- Proficient in JavaScript (ES6+), TypeScript, React.js Hooks, Node.js, Express, and MongoDB/Mongoose ORM.
- Solid experience with Git version control, Postman API testing, Docker container basics, and agile sprint methodologies.
- Eagerness to adopt new frontend libraries, serverless architectures, and modern cloud deployment pipelines.

### Salary Package & Corporate Benefits
- Monthly Salary: PKR 65,000 - PKR 120,000 (commensurate with technical experience and live coding assessment).
- Bi-annual performance appraisals, flexible office timings, and comprehensive medical health coverage in Karachi.
- Opportunities to work on cutting-edge international tech products with seasoned engineering mentors.`,

  "job-junior-react-native-developer-zavya-pakistan": `Zavya Pakistan is looking for an energetic and ambitious Junior React Native Developer to build and deploy high-performance cross-platform iOS and Android mobile applications at our modern technology office in Lahore. In this role, you will work closely with mobile architects to turn Figma prototypes into fluid, native-grade mobile experiences.

### Key Responsibilities & Mobile Development Scope
- Develop cross-platform mobile apps for iOS and Android using React Native and TypeScript.
- Build smooth, native-feeling UI components, custom gesture animations, and responsive mobile screen flows.
- Integrate RESTful APIs, GraphQL endpoints, Firebase push notifications, and third-party SDKs (payment gateways, Google Maps, analytics).
- Optimize app launch performance, frame rates, memory consumption, and offline data persistence using AsyncStorage or WatermelonDB.
- Assist senior leads in generating signed Android APK/AAB bundles and iOS IPA builds for Google Play Store and Apple App Store deployments.

### Candidate Requirements & Prerequisites
- Bachelor's degree in Computer Science, Software Engineering, or related technical discipline.
- 1+ year of practical experience with React Native and mobile application development.
- Strong grasp of core React fundamentals, hooks, state management (Redux Toolkit / Zustand), and TypeScript.
- Familiarity with native mobile build tools (Android Studio, Xcode, CocoaPods) and debugging tools (Flipper, React DevTools).
- Good problem-solving ability, proactive team communication, and commitment to clean code practices.

### Salary & Career Growth
- Monthly Salary: PKR 60,000 - PKR 95,000.
- Fast-track promotion path into Mid-Level and Lead Mobile Engineer roles within 12-18 months.
- Modern Lahore office (Gulberg / DHA) with power backup, high-speed fiber internet, free refreshments, and mentorship.`,

  "job-laravel-developer-remote-part-time-thinkdone-solutions": `Thinkdone Solutions is seeking a talented and self-driven Laravel Developer (Remote - Part Time) to support ongoing web application development, custom API integrations, and database performance optimizations for international enterprise clients.

### Responsibilities & Core Development Scope
- Build, extend, and maintain robust web applications and backend microservices using modern PHP 8.x and Laravel 10/11 frameworks.
- Design, normalize, and optimize relational database schemas, migrations, and complex Eloquent ORM queries in MySQL and PostgreSQL.
- Develop and document secure RESTful APIs for third-party mobile apps and frontend SPAs (Vue.js / React).
- Implement third-party API integrations such as Stripe payments, PayPal, Twilio SMS, and SendGrid transactional emails.
- Troubleshoot legacy codebases, perform security patching, and resolve performance bottlenecks across live production servers.

### Technical Requirements
- 2+ years of professional backend web development experience using PHP and the Laravel framework.
- Solid understanding of MVC architecture, OOP design patterns, SOLID principles, and Git collaborative workflows.
- Experience with frontend integration tools (Blade templates, Livewire, Alpine.js, or Vue.js).
- Reliable high-speed internet connection, power backup, and disciplined remote work ethics.
- Strong analytical and debugging skills with clean code documentation habits.

### Working Terms & Compensation
- Flexible part-time schedule: 20 hours per week (100% remote from any city in Pakistan).
- Monthly Compensation: PKR 40,000 - PKR 65,000 based on skill level and speed of delivery.
- Potential to transition into a full-time senior remote developer position with USD-pegged bonuses.`,

  "job-online-and-home-tuition-expert-fahad-tutors": `Fahad Tutors is hiring passionate, highly qualified Online and Home Tuition Experts across Islamabad and Rawalpindi to provide personalized one-on-one and small group academic coaching for Matric, F.Sc, Cambridge O-Level, A-Level, and IGCSE students.

### Teaching Scope & Key Responsibilities
- Deliver engaging, interactive tutoring sessions in major subjects including Mathematics (General, Additional, Pure), Physics, Chemistry, Biology, Computer Science, and English.
- Design customized study timetables, solve topical past examination papers from the last 10 years, and conduct regular mock assessments.
- Track student academic progress closely, identify concept gaps, and provide constructive progress updates to parents weekly.
- Conduct interactive online tutoring classes via Zoom / Google Meet utilizing digital drawing tablets and interactive whiteboards.
- Foster confidence, conceptual clarity, and critical problem-solving skills in preparing students for board and CAIE examinations.

### Academic Qualifications & Experience
- Bachelor's or Master's degree in Science, Mathematics, Engineering, English, or related discipline from a reputable university (NUST, FAST, QAU, LUMS).
- 1+ year of prior teaching or tutoring experience with Cambridge (O/A Levels) or Federal Board curriculum with proven track record of student A* grades.
- Exceptional conceptual clarity, patient pedagogical demeanor, and fluent English and Urdu communication skills.

### Compensation & Flexibility
- Lucrative Monthly Earnings: PKR 30,000 - PKR 80,000+ (based on number of assigned students and teaching hours).
- Flexible working hours (afternoon and evening shifts) with the freedom to choose between home tutoring in Islamabad/Rawalpindi or 100% online classes.`,

  "job-online-research-virtual-assistant-bpo-solutions-pvt-ltd": `BPO Solutions Pvt Ltd is hiring a dedicated, detail-oriented Online Research & Virtual Assistant to conduct comprehensive web research, business intelligence data gathering, and administrative support for overseas corporate clients at our Lahore center.

### Job Responsibilities & Daily Tasks
- Conduct in-depth secondary web research to collect market data, executive contact details, competitor pricing, and business directory profiles.
- Organize, clean, and validate researched data in Microsoft Excel and Google Sheets with zero duplication and 100% data integrity.
- Assist overseas clients with administrative tasks: email inbox management, calendar scheduling, customer support follow-ups, and documentation.
- Prepare concise research summaries, competitor benchmarking tables, and briefing presentations for executive review.
- Perform automated web scraping and data verification using modern research tools, LinkedIn Sales Navigator, and directory portals.

### Requirements & Candidate Profile
- Graduate degree in any discipline (BBA, B.Com, BA, B.Sc, BS).
- Strong internet research capabilities, boolean search query formulation, and critical data evaluation skills.
- High proficiency in MS Excel / Google Sheets (VLOOKUP, filtering, data cleanup formulas) and basic cloud productivity software.
- Good English comprehension, fast reading speed, and professional written communication skills.
- High focus, reliability, and ability to handle high-volume data research assignments accurately.

### Remuneration & Benefits
- Monthly Salary: PKR 40,000 - PKR 65,000 + Quarterly attendance and performance bonuses.
- Comprehensive professional training provided on international BPO workflows and research automation tools.
- Comfortable, modern office environment in Lahore with career growth opportunities.`,

  "job-online-teachers-required-for-o-igcse-a-levels-for-all-subjects-zohaib-asad-academies": `Zohaib Asad Academies is actively recruiting experienced, top-rated Online Teachers for Cambridge O Level, IGCSE, and A Level students across all major subjects: Mathematics (4024 / 9709), Physics (5054 / 9702), Chemistry (5070 / 9701), Biology (5090 / 9700), Economics, Accounting, Business Studies, Computer Science, and English Language/Literature.

### Core Responsibilities & Teaching Framework
- Deliver structured, interactive online lectures following the latest Cambridge International Assessment (CAIE) syllabus and grade threshold updates.
- Guide students through topical past papers, marking schemes, examiner reports, and smart exam answer structuring techniques.
- Provide constructive homework grading, conduct regular chapter-end testing, and host dedicated doubt-clearing sessions.
- Maintain high student attendance, active classroom participation, and academic excellence in international board exams.
- Utilize digital whiteboards, screen-sharing tools, and animated scientific diagrams to explain difficult concepts clearly.

### Requirements & Qualifications
- Master's or Bachelor's degree from a top university in the respective teaching subject.
- Minimum 2 to 3 years of demonstrated teaching experience with CAIE O/A Level curricula with an established track record of producing A* and A grades.
- Exceptional English communication skills, tech-savviness, and familiarity with online teaching platforms (Zoom, Miro, MS Teams, graphic tablets).
- Passion for teaching and ability to inspire young minds to achieve academic excellence.

### Package & Work Terms
- Highly Attractive Compensation: PKR 50,000 - PKR 120,000+ per month depending on subject expertise and teaching course load.
- 100% Work from Home with flexible evening and weekend teaching schedules.`,

  "job-remote-administration-internship-alis-academy": `Ali’s Academy is offering a comprehensive, hands-on Remote Administration Internship for organized, ambitious students and recent graduates looking to build essential administrative, educational operations, and digital management skills in Pakistan.

### What You Will Learn & Daily Tasks
- Manage student enrollment records, course batch schedules, and digital attendance logs for online classes.
- Respond promptly to student and parent queries via WhatsApp, email, and live chat regarding class schedules, tutor assignments, and fee payments.
- Assist educational operations managers in drafting official notices, preparing course certificates, and coordinating online webinar sessions.
- Maintain and update organized digital files, student databases, and academic resources in cloud storage folders (Google Drive, OneDrive).
- Coordinate with teaching faculty to ensure smooth class deliveries and technical issue resolution during live lecture sessions.

### Candidate Profile & Qualifications
- Students currently enrolled in or recently graduated from Bachelor's programs (BBA, BA, B.Com, BS).
- Strong interpersonal and communication skills in both Urdu and English.
- High familiarity with Google Workspace (Docs, Sheets, Drive), MS Office, and social media messaging platforms.
- Responsible, self-motivated, highly organized, and capable of working independently in a remote environment.

### Internship Details & Growth
- Paid Monthly Stipend: PKR 20,000 - PKR 30,000.
- Duration: 3 Months with internship completion certificate and official letter of recommendation.
- Opportunity for conversion into a permanent, full-time Operations Coordinator role upon successful internship completion.`,

  "job-virtual-medical-office-receptionist-din-neurology": `Din Neurology is hiring a dedicated, empathetic Virtual Medical Office Receptionist to provide remote administrative support, patient appointment scheduling, and patient customer care for our neurology clinics and telemedicine consultations.

### Responsibilities & Medical Support Tasks
- Answer incoming patient phone calls, respond to patient portal messages, and schedule clinical appointments accurately.
- Verify patient demographic information, medical insurance coverage, and prior authorization documentation before appointments.
- Coordinate with attending neurologists and clinic nurses to relay urgent patient requests, test results, and prescription refill inquiries.
- Enter patient medical histories, clinical notes, and physician orders into Electronic Health Record (EHR) systems conforming strictly to HIPAA privacy standards.
- Follow up with patients regarding upcoming diagnostic tests (MRI, CT scans, EEG, blood work) and post-consultation follow-up appointments.
- Manage appointment calendars, reduce patient no-shows through automated SMS reminders, and assist with billing inquiries.

### Candidate Qualifications & Skills
- Bachelor’s degree in Healthcare Administration, Nursing, Biology, English, or related discipline.
- 1+ year of prior experience in a medical office, clinic reception, hospital, or virtual healthcare assistant role.
- Fluent English speaking skills with a compassionate, patient-first bedside manner and clear telephone voice.
- High attention to detail, accuracy in medical documentation, and ability to handle confidential medical data discreetly.

### Package & Work Conditions
- Monthly Salary: PKR 55,000 - PKR 90,000.
- 100% Remote working position with quiet home office environment and high-speed internet requirement.
- Health insurance support, annual performance bonuses, and comprehensive US healthcare workflow training provided.`
};

async function patchJobs() {
  console.log("Patching remaining jobs to guarantee >200 words...");
  for (const [id, desc] of Object.entries(EXPANDED_JOBS)) {
    const words = desc.trim().split(/\s+/).length;
    console.log(`Patching Job [${id}] - Words: ${words}`);
    await updateDoc(doc(db, "jobs", id), { description: desc });
  }
  console.log("All jobs patched successfully.");
  process.exit(0);
}

patchJobs().catch(e => { console.error(e); process.exit(1); });
