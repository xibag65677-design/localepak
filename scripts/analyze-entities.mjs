import fs from 'fs';
const dump = JSON.parse(fs.readFileSync('scripts/all-db-dump.json', 'utf8'));

console.log('=== PROFESSIONALS (' + dump.professionals.length + ') ===');
dump.professionals.forEach((p, i) => {
  const words = (p.bio || p.about || p.description || '').trim().split(/\s+/).filter(Boolean).length;
  console.log(`${i+1}. [${p.id}] ${p.name || p.fullName} | Title: ${p.title} | City: ${p.city} | Words: ${words}`);
});

console.log('\n=== JOBS (' + dump.jobs.length + ') ===');
dump.jobs.forEach((j, i) => {
  const words = (j.description || '').trim().split(/\s+/).filter(Boolean).length;
  console.log(`${i+1}. [${j.id}] ${j.title} @ ${j.companyName || j.company} | City: ${j.city} | Words: ${words}`);
});

console.log('\n=== BUSINESSES (' + dump.businesses.length + ') ===');
dump.businesses.forEach((b, i) => {
  const words = (b.description || '').trim().split(/\s+/).filter(Boolean).length;
  console.log(`${i+1}. [${b.id}] ${b.name || b.businessName} | Cat: ${b.category || b.categoryId} | City: ${b.city} | Words: ${words}`);
});
