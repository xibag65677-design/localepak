// ============================================================
// LocalePak — professional profile professions
// ------------------------------------------------------------
// The profession dropdown on the add-professional form: 55
// common professions plus an "Other" choice that lets the
// user type their own profession freehand. The stored value
// is always the plain profession string (the dropdown choice
// or the custom text) — nothing here is an enum enforced
// anywhere else, so older free-text values keep working.
// Gap 4 (2026-11-04): the five trades below were added so
// plumbers, electricians, AC technicians, tailors and beauticians
// are findable through the professionals surface instead of
// being reachable only via the freehand "Other" field, which
// creates no landing or filter value. No trade listings are
// invented by this list — it only offers the choice.
// ============================================================

export const PROFESSIONS: string[] = [
  'Doctor',
  'Dentist',
  'Physiotherapist',
  'Psychologist',
  'Nutritionist',
  'Pharmacist',
  'Veterinarian',
  'Lawyer',
  'Accountant',
  'Chartered Accountant',
  'Financial Advisor',
  'Software Developer',
  'Web Developer',
  'Mobile App Developer',
  'UI/UX Designer',
  'Graphic Designer',
  'SEO Expert',
  'Digital Marketer',
  'Social Media Manager',
  'Content Writer',
  'Video Editor',
  'Photographer',
  'Videographer',
  'Architect',
  'Interior Designer',
  'Civil Engineer',
  'Electrical Engineer',
  'Mechanical Engineer',
  'Data Analyst',
  'Data Scientist',
  'AI Engineer',
  'Cybersecurity Expert',
  'Network Engineer',
  'Teacher',
  'Tutor',
  'Professor',
  'Translator',
  'Consultant',
  'Business Consultant',
  'Project Manager',
  'HR Manager',
  'Real Estate Agent',
  'Insurance Agent',
  'Event Planner',
  'Fashion Designer',
  'Fitness Trainer',
  'Chef',
  'Makeup Artist',
  'Journalist',
  'Banker',
  'Plumber',
  'Electrician',
  'AC Technician',
  'Tailor',
  'Beautician',
]

/** Select value for the freehand profession choice. */
export const PROFESSION_OTHER = 'Other'
