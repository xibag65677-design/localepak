import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/usa-dollar-pr/backups/legacy-pakistan-firestore-backup.json', 'utf8'));
const bizList = d.businesses;

const notRejected = bizList.filter(b => (b.status || '').toLowerCase().trim() !== 'rejected');

console.log('Total:', notRejected.length);

const pending = notRejected.filter(b => (b.status || '').toLowerCase().trim() === 'pending' || (b.paymentStatus || '').toUpperCase().trim() === 'PENDING');
const approved = notRejected.filter(b => !pending.includes(b));

console.log('Pending count:', pending.length);
console.log('Approved count:', approved.length);

console.log('\n--- 19 PENDING BUSINESSES ---');
pending.forEach((b, i) => {
  console.log(`${i+1}. ${b.name || b.businessName} | ${b.email || 'NO EMAIL'} | ${b.phone || 'NO PHONE'} | ${b.city || 'N/A'}`);
});

console.log('\n--- ALL 108 BUSINESSES UNIQUE EMAILS ---');
const allEmails = notRejected.map(b => b.email || b.ownerEmail || '').filter(Boolean);
console.log('Total email entries:', allEmails.length);
const uniqueEmails = Array.from(new Set(allEmails));
console.log('Unique emails count:', uniqueEmails.length);
