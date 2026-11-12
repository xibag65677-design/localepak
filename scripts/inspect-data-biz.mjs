import fs from 'fs';

const content = fs.readFileSync('d:/localepak/branches/lib/data.ts', 'utf8');

// Find export const MOCK_BUSINESSES: BusinessItem[] = [ ... ];
const startMarker = 'export const MOCK_BUSINESSES: BusinessItem[] = ';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('Marker not found');
  process.exit(1);
}

const arrayStart = startIdx + startMarker.length;
// Find where MOCK_BUSINESSES ends
// It ends where the next top-level export starts or at `];`
const endMarker = '\nexport ';
const nextExport = content.indexOf(endMarker, arrayStart);
const arrayContent = content.slice(arrayStart, nextExport).trim();

// The array ends with semicolon, let's remove trailing semicolon
const cleanJson = arrayContent.replace(/;\s*$/, '');

let businesses;
try {
  businesses = JSON.parse(cleanJson);
  console.log(`Successfully parsed MOCK_BUSINESSES directly as JSON! Total items: ${businesses.length}`);
} catch (e) {
  console.log('Direct JSON parse failed, trying Function eval: ' + e.message);
  try {
    businesses = eval(cleanJson);
    console.log(`Evaluated MOCK_BUSINESSES! Total items: ${businesses.length}`);
  } catch (err) {
    console.error('Eval failed too: ' + err.message);
    process.exit(1);
  }
}

console.log('Total businesses in MOCK_BUSINESSES:', businesses.length);

const statusCounts = {};
businesses.forEach(b => {
  const s = b.status || 'undefined';
  statusCounts[s] = (statusCounts[s] || 0) + 1;
});
console.log('Status counts in MOCK_BUSINESSES:', statusCounts);

// What about the pending filtering logic from Admin page?
// Admin page logic:
// const pendingListings = allBusinesses
//   .filter(b => {
//     const s = (b.status || '').toLowerCase().trim()
//     const ps = (b.paymentStatus || '').toUpperCase().trim()
//     return s === 'pending' || s === 'pending_approval' || (ps === 'PENDING' && s !== 'rejected')
//   })

const adminPending = businesses.filter(b => {
  const s = (b.status || '').toLowerCase().trim();
  const ps = (b.paymentStatus || '').toUpperCase().trim();
  return s === 'pending' || s === 'pending_approval' || (ps === 'PENDING' && s !== 'rejected');
});

console.log(`Admin pending count directly from MOCK_BUSINESSES: ${adminPending.length}`);

// But wait! What if normalizeBusinessDoc was applied?
// Let's test normalizeBusinessDoc logic on MOCK_BUSINESSES:
// If normalizeBusinessDoc was applied on data:
// let itemStatus = 'approved'
// if (rawStatus === 'rejected') itemStatus = 'rejected'
// else if (rawStatus === 'approved' || (data.approvedAt && rawStatus !== 'pending')) itemStatus = 'approved'
// else if (rawStatus === 'pending' || rawStatus === 'pending_approval' || data.submittedAt || data.userId || (data.createdAt && !data.approvedAt) || screenshot || rawPaymentStatus === 'PENDING') itemStatus = 'pending'

const normalizedPending = businesses.filter(data => {
  const rawStatus = (data.status || '').toString().toLowerCase().trim();
  const rawPaymentStatus = (data.paymentStatus || '').toString().toUpperCase().trim();
  const screenshot = data.paymentScreenshot || data.paymentProof || data.screenshotUrl || data.proofDoc || data.paymentDetails?.paymentScreenshot || '';

  let itemStatus = 'approved';
  if (rawStatus === 'rejected') {
    itemStatus = 'rejected';
  } else if (rawStatus === 'approved' || (data.approvedAt && rawStatus !== 'pending')) {
    itemStatus = 'approved';
  } else if (rawStatus === 'pending' || rawStatus === 'pending_approval' || data.submittedAt || data.userId || (data.createdAt && !data.approvedAt) || screenshot || rawPaymentStatus === 'PENDING') {
    itemStatus = 'pending';
  }

  const paymentStatus = rawPaymentStatus || (screenshot ? 'PENDING' : (itemStatus === 'approved' ? 'VERIFIED' : 'UNPAID'));

  const s = itemStatus.toLowerCase().trim();
  const ps = paymentStatus.toUpperCase().trim();
  return s === 'pending' || s === 'pending_approval' || (ps === 'PENDING' && s !== 'rejected');
});

console.log(`Normalized pending count: ${normalizedPending.length}`);

// Also check all-db-dump.json or other files
