import fs from 'fs';

const content = fs.readFileSync('d:/localepak/branches/lib/data.ts', 'utf8');

function getArray(startStr, endStr) {
  const s = content.indexOf(startStr);
  if (s === -1) return [];
  const start = content.indexOf('[', s);
  const end = endStr ? content.indexOf(endStr, start) : content.lastIndexOf(']');
  const slice = content.slice(start, end + 1).trim();
  // remove trailing semicolon if any
  const clean = slice.replace(/;\s*$/, '');
  try {
    return JSON.parse(clean);
  } catch (e) {
    try {
      return (new Function(`return ${clean}`))();
    } catch (err) {
      console.log('Error parsing ' + startStr + ': ' + err.message);
      return [];
    }
  }
}

const biz = getArray('export const MOCK_BUSINESSES:', 'export const MOCK_COMPANIES');
const jobs = getArray('export const MOCK_JOBS:', 'export const MOCK_PROFESSIONALS');
const pros = getArray('export const MOCK_PROFESSIONALS:', 'export const MOCK_VERIFICATION_REQUESTS');
const verReqs = getArray('export const MOCK_VERIFICATION_REQUESTS:', null);

console.log('biz:', biz.length);
console.log('jobs:', jobs.length);
console.log('pros:', pros.length);
console.log('verReqs:', verReqs.length);

console.log('Total sum biz + jobs + pros =', biz.length + jobs.length + pros.length);
