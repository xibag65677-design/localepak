import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/usa-dollar-pr/backups/legacy-pakistan-firestore-backup.json', 'utf8'));
const bizList = d.businesses;

console.log('Total businesses in legacy backup:', bizList.length);

// Let's inspect raw status of each
const rawStatuses = {};
bizList.forEach(b => {
  const s = `${b.status}`;
  rawStatuses[s] = (rawStatuses[s] || 0) + 1;
});
console.log('Raw statuses in legacy backup:', rawStatuses);

// Let's check how many have raw status approved vs pending vs undefined
// Let's test the filter from admin page:
// const pendingListings = allBusinesses.filter(b => {
//   const s = (b.status || '').toLowerCase().trim()
//   const ps = (b.paymentStatus || '').toUpperCase().trim()
//   return s === 'pending' || s === 'pending_approval' || (ps === 'PENDING' && s !== 'rejected')
// })

// What if status was not set or what if they all got marked pending?
// Let's check how many match pending under various criteria:
console.log('\n--- Checking pending criteria ---');
const withPendingStatus = bizList.filter(b => (b.status || '').toLowerCase().trim() === 'pending');
console.log('b.status == pending:', withPendingStatus.length);

const notRejected = bizList.filter(b => (b.status || '').toLowerCase().trim() !== 'rejected');
console.log('Not rejected count:', notRejected.length);

const rejected = bizList.filter(b => (b.status || '').toLowerCase().trim() === 'rejected');
console.log('Rejected count:', rejected.length);

console.log('Total - Rejected =', bizList.length - rejected.length);
