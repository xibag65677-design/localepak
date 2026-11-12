import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/usa-dollar-pr/backups/legacy-pakistan-firestore-backup.json', 'utf8'));
const bizList = d.businesses;

// Run LocalePak db-service normalizeBusinessDoc logic:
function normalizeBusinessDoc(docId, data) {
  const bName = data.businessName || data.name || 'Verified Business';
  const rawStatus = (data.status || '').toString().toLowerCase().trim();
  const rawPaymentStatus = (data.paymentStatus || '').toString().toUpperCase().trim();
  
  const screenshot = data.paymentScreenshot || 
    data.paymentProof || 
    data.screenshotUrl || 
    data.proofDoc || 
    data.paymentDetails?.paymentScreenshot || 
    data.paymentDetails?.screenshot || 
    data.paymentDetails?.paymentProof || 
    '';

  const paymentMethod = data.paymentMethod || 
    data.paymentDetails?.paymentMethod || 
    'Easypaisa';

  const refNumber = data.paymentReference || 
    data.referenceNumber || 
    data.transactionRef || 
    data.transactionId || 
    data.paymentDetails?.referenceNumber || 
    data.paymentDetails?.transactionRef || 
    '';

  const paymentDetails = data.paymentDetails || (screenshot ? {
    paymentMethod,
    referenceNumber: refNumber,
    paymentScreenshot: screenshot,
    amount: Number(data.amount || data.paymentDetails?.amount || 50),
    paymentDate: data.paymentDate || data.submittedAt || data.createdAt || new Date().toISOString()
  } : undefined);

  let itemStatus = 'approved';
  if (rawStatus === 'rejected') {
    itemStatus = 'rejected';
  } else if (rawStatus === 'approved' || (data.approvedAt && rawStatus !== 'pending')) {
    itemStatus = 'approved';
  } else if (rawStatus === 'pending' || rawStatus === 'pending_approval' || data.submittedAt || data.userId || (data.createdAt && !data.approvedAt) || screenshot || rawPaymentStatus === 'PENDING') {
    itemStatus = 'pending';
  }

  const paymentStatus = rawPaymentStatus || (screenshot || paymentDetails ? 'PENDING' : (itemStatus === 'approved' ? 'VERIFIED' : 'UNPAID'));

  return {
    id: docId || data.id,
    name: bName,
    email: data.email || 'contact@business.pk',
    status: itemStatus,
    paymentStatus: paymentStatus,
    rawStatus: rawStatus,
    approvedAt: data.approvedAt,
    submittedAt: data.submittedAt,
    createdAt: data.createdAt
  };
}

const normalized = bizList.map(b => normalizeBusinessDoc(b.id, b));
const pendingLocalepak = normalized.filter(b => {
  const s = (b.status || '').toLowerCase().trim();
  const ps = (b.paymentStatus || '').toUpperCase().trim();
  return s === 'pending' || s === 'pending_approval' || (ps === 'PENDING' && s !== 'rejected');
});

console.log('LocalePak normalization pending count:', pendingLocalepak.length);

// What about BizNestUSA db-service normalizeBusinessDoc logic?
// In BizNestUSA:
// const isSeed = data.source_type === 'seed_research' || data.ownership_status === 'directory_seed'
// if (rawStatus === 'rejected') itemStatus = 'rejected'
// else if (isSeed || rawStatus === 'approved' || (data.approvedAt && rawStatus !== 'pending')) itemStatus = 'approved'
// else if (rawStatus === 'pending' || ...) itemStatus = 'pending'

// What about if in the UI the user filtered or viewed?
// Or what if the user is looking at all 108?
