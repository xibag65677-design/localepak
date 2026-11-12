import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/usa-dollar-pr/backups/legacy-pakistan-firestore-backup.json', 'utf8'));
const bizList = d.businesses;

const notRejected = bizList.filter(b => (b.status || '').toLowerCase().trim() !== 'rejected');

let md = `# All 108 Business Listings in Database\n\n`;
md += `This document lists all 108 active / pending business listings found in the database, including the 19 submissions specifically marked as \`pending\` review and the 89 listings.\n\n`;

md += `## 1. Specifically Pending Listings (19 Businesses)\n\n`;
md += `| # | Business Name | Email | Phone | City | Status |\n`;
md += `|---|---|---|---|---|---|\n`;

const pending = notRejected.filter(b => (b.status || '').toLowerCase().trim() === 'pending' || (b.paymentStatus || '').toUpperCase().trim() === 'PENDING');
pending.forEach((b, i) => {
  const name = (b.name || b.businessName || 'N/A').replace(/\|/g, '-');
  const email = b.email || b.ownerEmail || 'N/A';
  const phone = b.phone || 'N/A';
  const city = b.city || 'N/A';
  const status = b.status || 'pending';
  md += `| ${i + 1} | **${name}** | \`${email}\` | ${phone} | ${city} | ${status} |\n`;
});

md += `\n\n## 2. All 108 Businesses (Complete List)\n\n`;
md += `| # | Business Name | Email | Phone | City | Status |\n`;
md += `|---|---|---|---|---|---|\n`;

notRejected.forEach((b, i) => {
  const name = (b.name || b.businessName || 'N/A').replace(/\|/g, '-');
  const email = b.email || b.ownerEmail || 'N/A';
  const phone = b.phone || 'N/A';
  const city = b.city || 'N/A';
  const status = b.status || 'approved';
  md += `| ${i + 1} | ${name} | \`${email}\` | ${phone} | ${city} | ${status} |\n`;
});

fs.writeFileSync('d:/localepak/branches/scripts/108-businesses-report.md', md);
console.log('Report written to scripts/108-businesses-report.md');
