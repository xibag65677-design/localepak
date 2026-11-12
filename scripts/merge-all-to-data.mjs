import fs from "fs";
import path from "path";

const jsonPath = path.join(process.cwd(), "scripts", "firestore-approved.json");
const dataTsPath = path.join(process.cwd(), "lib", "data.ts");

const approvedList = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
let dataTsContent = fs.readFileSync(dataTsPath, "utf-8");

// Read existing MOCK_BUSINESSES array in data.ts
const match = dataTsContent.match(/export const MOCK_BUSINESSES: BusinessItem\[\] = (\[[\s\S]*?\n\]\n)/);

if (match) {
  // Replace MOCK_BUSINESSES with the complete updated array from Firestore
  const newMockStr = `export const MOCK_BUSINESSES: BusinessItem[] = ${JSON.stringify(approvedList, null, 2)}\n`;
  dataTsContent = dataTsContent.replace(
    /export const MOCK_BUSINESSES: BusinessItem\[\] = \[[\s\S]*?\n\]\n/,
    newMockStr
  );
  fs.writeFileSync(dataTsPath, dataTsContent, "utf-8");
  console.log("Successfully updated lib/data.ts MOCK_BUSINESSES with all 18 approved Firestore businesses!");
} else {
  console.error("Could not locate MOCK_BUSINESSES in lib/data.ts");
}
