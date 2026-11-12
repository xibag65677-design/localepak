import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const internshipJob = {
  id: "job-remote-seo-internship",
  slug: "remote-seo-internship",
  title: "Remote SEO Internship (On-Page & Off-Page)",
  company: "LocalePak Digital",
  companyId: "company",
  companySlug: "localepak",
  companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=200&q=80",
  city: "Remote",
  cities: [
    "Remote",
    "Islamabad",
    "Lahore",
    "Karachi",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta"
  ],
  province: "Nationwide",
  country: "Pakistan",
  department: "Digital Marketing & SEO",
  category: "Technology & IT",
  type: "Internship",
  employmentType: "Internship",
  salary: "Unpaid (2 Months) — Monthly Paid Job Offer Upon Performance",
  experience: "Fresh / No Prior Experience Required",
  education: "Matric / Intermediate (No Graduation Required)",
  ageRequirement: "16 - 30 Years",
  deadline: "Open until filled",
  joiningDate: "Immediate",
  workingHours: "Flexible Timings (Self-Paced / Task-Based)",
  shiftType: "Flexible Timing (Remote)",
  vacancies: 10,
  genderPreference: "Any",
  description: `LocalePak is urgently hiring for **10 open positions for our 2-Month Remote SEO Internship** specializing in On-Page and Off-Page Search Engine Optimization. This is a 2-month unpaid internship designed as an intensive hands-on practical training and evaluation period.

### 10 Open Positions Available Nationwide
We have 10 dedicated internship slots open for ambitious candidates across Pakistan. Each selected intern will receive dedicated practical training, live website assignments, and direct feedback.

### Career Advancement: Performance-to-Paid Hiring Guarantee
During this 2-month internship, you will execute real SEO tasks on active digital platforms. When you demonstrate complete work, consistency, and dedication by completing all assigned tasks on schedule, we will immediately hire you on a monthly salary-based paid position!

### No Degree or Graduation Required (Matric & Intermediate Welcome)
There is absolutely no requirement for a university degree or graduation. Candidates with Matric (10th) or Intermediate (FA / FSc / ICS / I.Com) qualifications are 100% eligible to apply. Your commitment to learning, curiosity, and consistency matter far more than academic credentials.

### 100% Remote with Fully Flexible Working Hours
- Work completely from home from any city, town, or village across Pakistan.
- Flexible timing: You have total freedom to decide when you want to work during the day.
- Task-focused delivery: Although work hours are flexible, all assigned SEO tasks and milestones must be submitted accurately and on time.

### What You Will Learn & Practice
- **On-Page SEO**: In-depth keyword research, meta title and meta description crafting, heading hierarchy (H1-H3), internal linking strategies, image alt tag optimization, and URL structuring.
- **Off-Page SEO**: High-authority backlink creation, local directory submissions, business citations, social bookmarking, guest outreach, and profile links.
- **Search Tools & Analytics**: Practical use of Google Search Console, website indexation checks, keyword tracking, and competitor backlink analysis.
- **Documentation & Reporting**: Maintaining structured Google Sheets / Excel work logs, link verification, and weekly milestone submissions.`,
  responsibilities: [
    "Execute On-Page SEO optimizations including keyword research, meta tags, and content structuring.",
    "Carry out Off-Page SEO link-building campaigns, directory submissions, and local citations.",
    "Conduct competitor keyword analysis to uncover high-opportunity search terms.",
    "Monitor site indexing and search performance via Google Search Console.",
    "Maintain a clear daily/weekly Google Sheets log of all completed SEO tasks and live URLs.",
    "Submit all assigned deliverables accurately and on time."
  ],
  requirements: [
    "Minimum qualification: Matric (10th) or Intermediate (FA / FSc / ICS / I.Com). No Graduation Required.",
    "Enthusiasm for digital marketing, blogs, and Search Engine Optimization.",
    "Access to a computer/laptop and a stable internet connection.",
    "Basic understanding of English reading, writing, and computer usage.",
    "Reliability and discipline: flexible timing with strict adherence to task deadlines.",
    "Full dedication to complete the 2-month unpaid internship to secure the monthly paid role."
  ],
  skills: [
    "On-Page SEO",
    "Off-Page SEO",
    "Keyword Research",
    "Link Building",
    "Content Optimization",
    "Meta Tags",
    "Google Search Console",
    "Directory Submission",
    "Google Sheets"
  ],
  benefits: [
    "100% Remote / Work from Home anywhere in Pakistan",
    "Guaranteed transition to a Monthly Salary Paid Job upon successful task completion",
    "Completely flexible working hours (self-paced schedule)",
    "Real-world practical experience working on live web portals",
    "Official Internship Completion Certificate & Professional Recommendation",
    "Mentorship and constructive feedback from experienced SEO leads"
  ],
  postedAt: new Date().toISOString(),
  postedDate: "Just now",
  expiresAt: "2027-12-31T23:59:59.000Z",
  status: "approved",
  isFeatured: true,
  verified: true,
  applicationMethod: "both",
  applicationEmail: "careers@localepak.com",
  applicationWhatsapp: "+923345636230",
  applicationWebsite: "https://www.localepak.com/jobs/remote-seo-internship"
};

async function syncToFirestore() {
  try {
    const docRef = doc(db, "jobs", "remote-seo-internship");
    await setDoc(docRef, internshipJob, { merge: true });
    console.log("Successfully added job to Firestore: jobs/remote-seo-internship");
    process.exit(0);
  } catch (err) {
    console.error("Error writing to Firestore:", err);
    process.exit(1);
  }
}

syncToFirestore();
