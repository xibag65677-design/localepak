import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/usa-dollar-pr/backups/legacy-pakistan-firestore-backup.json', 'utf8'));
const bizList = d.businesses;

const notRejected = bizList.filter(b => (b.status || '').toLowerCase().trim() !== 'rejected');

console.log('Total notRejected:', notRejected.length);

const items = notRejected.map((b, idx) => {
  return {
    index: idx + 1,
    id: b.id,
    name: b.name || b.businessName || 'N/A',
    email: b.email || b.ownerEmail || b.contactEmail || 'N/A',
    phone: b.phone || 'N/A',
    status: b.status || 'N/A',
    paymentStatus: b.paymentStatus || 'N/A',
    city: b.city || 'N/A',
    category: b.category || 'N/A',
    submittedAt: b.submittedAt || b.createdAt || 'N/A',
    ownerName: b.ownerName || b.fullName || 'N/A'
  };
});

fs.writeFileSync('d:/localepak/branches/scripts/108-businesses-list.json', JSON.stringify(items, null, 2));

console.log('Saved to 108-businesses-list.json');

// Also print the ones where status === 'pending'
const pendingOnly = items.filter(x => (x.status || '').toLowerCase() === 'pending' || (x.paymentStatus || '').toUpperCase() === 'PENDING');
console.log('Count where status === pending or payment === PENDING:', pendingOnly.length);

// Status breakdown
const statusMap = {};
items.forEach(x => {
  statusMap[x.status] = (statusMap[x.status] || 0) + 1;
});
console.log('Status breakdown:', statusMap);
