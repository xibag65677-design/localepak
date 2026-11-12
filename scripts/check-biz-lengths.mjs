import fs from 'fs';
const dump = JSON.parse(fs.readFileSync('scripts/all-db-dump.json', 'utf8'));

console.log(`Total businesses: ${dump.businesses.length}`);
const shortBusinesses = [];
const longBusinesses = [];

dump.businesses.forEach(b => {
  const words = (b.description || '').trim().split(/\s+/).filter(Boolean).length;
  if (words < 200) {
    shortBusinesses.push({ id: b.id, name: b.name || b.businessName, city: b.city, category: b.category, words, slug: b.slug });
  } else {
    longBusinesses.push({ id: b.id, name: b.name || b.businessName, words });
  }
});

console.log(`\nBusinesses with <200 words (${shortBusinesses.length}):`);
shortBusinesses.forEach((b, i) => {
  console.log(`${i+1}. [${b.id}] "${b.name}" (${b.city}, ${b.category}) - ${b.words} words - slug: ${b.slug}`);
});

console.log(`\nBusinesses with >=200 words (${longBusinesses.length}):`);
longBusinesses.forEach((b, i) => {
  console.log(`${i+1}. [${b.id}] "${b.name}" - ${b.words} words`);
});
