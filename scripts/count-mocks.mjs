import fs from 'fs';

const content = fs.readFileSync('d:/localepak/branches/lib/data.ts', 'utf8');

function extractExport(name) {
  const marker = `export const ${name}`;
  const idx = content.indexOf(marker);
  if (idx === -1) return null;
  const start = content.indexOf('[', idx);
  // find matching closing bracket
  let depth = 0;
  let end = -1;
  let inString = false;
  let stringChar = '';
  let escape = false;
  for (let i = start; i < content.length; i++) {
    const ch = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === '\\') {
      escape = true;
      continue;
    }
    if (inString) {
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;
  const jsonStr = content.slice(start, end);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    try {
      return eval(`(${jsonStr})`);
    } catch (err) {
      return null;
    }
  }
}

const businesses = extractExport('MOCK_BUSINESSES') || [];
const companies = extractExport('MOCK_COMPANIES') || [];
const jobs = extractExport('MOCK_JOBS') || [];
const professionals = extractExport('MOCK_PROFESSIONALS') || [];
const verReqs = extractExport('MOCK_VERIFICATION_REQUESTS') || [];

console.log('MOCK_BUSINESSES count:', businesses.length);
console.log('MOCK_COMPANIES count:', companies.length);
console.log('MOCK_JOBS count:', jobs.length);
console.log('MOCK_PROFESSIONALS count:', professionals.length);
console.log('MOCK_VERIFICATION_REQUESTS count:', verReqs.length);

console.log('Total businesses + companies + jobs + pros:', businesses.length + companies.length + jobs.length + professionals.length);
