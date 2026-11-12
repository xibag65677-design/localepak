import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/usa-dollar-pr/backups/legacy-pakistan-firestore-backup.json', 'utf8'));
const bizList = d.businesses;

console.log('Timestamp of legacy backup:', d.timestamp);

// Filter the 108 not-rejected businesses
const notRejected = bizList.filter(b => (b.status || '').toLowerCase().trim() !== 'rejected');
console.log('Total not rejected:', notRejected.length);

// Check how many have paymentStatus == 'PENDING'
const pendingPayment = notRejected.filter(b => (b.paymentStatus || '').toUpperCase().trim() === 'PENDING');
console.log('paymentStatus == PENDING:', pendingPayment.length);

// Check how many have paymentScreenshot or proof
const withProof = notRejected.filter(b => b.paymentScreenshot || b.paymentProof || b.screenshotUrl || b.proofDoc || b.paymentDetails?.paymentScreenshot);
console.log('with payment screenshot:', withProof.length);

// Print all 108 businesses and their emails
console.log('\n--- ALL 108 BUSINESSES IN BACKUP ---');
notRejected.forEach((b, i) => {
  console.log(`${i+1}. [${b.id}] "${b.name || b.businessName}" | status: ${b.status} | payment: ${b.paymentStatus} | email: ${b.email || b.ownerEmail || 'N/A'}`);
});
