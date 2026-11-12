import fs from 'fs';
import path from 'path';

// Let's parse lib/data.ts
const content = fs.readFileSync(path.join(process.cwd(), "lib", "data.ts"), "utf8");

// Simple regex extractions of MOCK_BUSINESSES, MOCK_JOBS, MOCK_PROFESSIONALS
const getArray = (varName) => {
  const marker = `export const ${varName}:`;
  const start = content.indexOf(marker);
  if (start === -1) return [];
  const jsonStart = content.indexOf('[', start);
  let depth = 0;
  let inString = false;
  let escape = false;
  let jsonEnd = -1;

  for (let i = jsonStart; i < content.length; i++) {
    const char = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"' || char === "'") {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '[') depth++;
      else if (char === ']') {
        depth--;
        if (depth === 0) {
          jsonEnd = i + 1;
          break;
        }
      }
    }
  }

  if (jsonEnd !== -1) {
    const jsonStr = content.slice(jsonStart, jsonEnd);
    return JSON.parse(jsonStr);
  }
  return [];
};

const businesses = getArray('MOCK_BUSINESSES');
const jobs = getArray('MOCK_JOBS');
const professionals = getArray('MOCK_PROFESSIONALS');

console.log("=== LOCAL lib/data.ts WORD COUNT AUDIT ===");
console.log(`\n--- PROFESSIONALS (${professionals.length}) ---`);
let pFail = 0;
professionals.forEach(p => {
  const w = (p.about || p.description || p.bio || '').trim().split(/\s+/).filter(Boolean).length;
  const status = w >= 200 ? "PASS" : "FAIL (<200)";
  if (w < 200) pFail++;
  console.log(`[${status}] [${p.id}] "${p.name}" -> ${w} words`);
});

console.log(`\n--- JOBS (${jobs.length}) ---`);
let jFail = 0;
jobs.forEach(j => {
  const w = (j.description || '').trim().split(/\s+/).filter(Boolean).length;
  const status = w >= 200 ? "PASS" : "FAIL (<200)";
  if (w < 200) jFail++;
  console.log(`[${status}] [${j.id}] "${j.title}" -> ${w} words`);
});

console.log(`\n--- BUSINESSES (${businesses.length}) ---`);
let bFail = 0;
businesses.forEach(b => {
  const w = (b.description || '').trim().split(/\s+/).filter(Boolean).length;
  const status = w >= 200 ? "PASS" : "FAIL (<200)";
  if (w < 200) bFail++;
  console.log(`[${status}] [${b.id}] "${b.name}" -> ${w} words`);
});

console.log("\n=== LOCAL AUDIT SUMMARY ===");
console.log(`Professionals: ${professionals.length - pFail}/${professionals.length} PASS`);
console.log(`Jobs: ${jobs.length - jFail}/${jobs.length} PASS`);
console.log(`Businesses: ${businesses.length - bFail}/${businesses.length} PASS`);

if (pFail === 0 && jFail === 0 && bFail === 0) {
  console.log("\nALL RECORDS IN lib/data.ts 100% PASS THE 200+ WORD REQUIREMENT!");
} else {
  console.error("\nSome records in lib/data.ts failed the 200+ word requirement.");
}
