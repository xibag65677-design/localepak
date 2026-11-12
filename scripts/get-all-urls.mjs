import fs from 'fs';
const dump = JSON.parse(fs.readFileSync('scripts/all-db-dump.json', 'utf8'));

console.log('=== PROFESSIONALS (10) ===');
dump.professionals.forEach((p, i) => {
  const slug = p.username || p.slug || p.id;
  const name = p.name || p.fullName;
  console.log(`${i+1}. ${name} (${p.title || 'Professional'} - ${p.city})`);
  console.log(`   https://www.localepak.com/professionals/${slug}`);
});

console.log('\n=== JOBS (' + dump.jobs.length + ') ===');
dump.jobs.forEach((j, i) => {
  const slug = j.slug || j.id;
  const title = j.title;
  const comp = j.company || j.companyName;
  console.log(`${i+1}. ${title} @ ${comp} (${j.city})`);
  console.log(`   https://www.localepak.com/jobs/${slug}`);
});

console.log('\n=== BUSINESSES (' + dump.businesses.length + ') ===');
dump.businesses.forEach((b, i) => {
  const slug = b.slug || b.id;
  const name = b.name || b.businessName;
  console.log(`${i+1}. ${name} (${b.category || 'Business'} - ${b.city})`);
  console.log(`   https://www.localepak.com/business/${slug}`);
});
