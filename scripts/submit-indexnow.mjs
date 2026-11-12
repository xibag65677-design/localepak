import fs from 'fs';
import path from 'path';

const INDEXNOW_API_KEY = '43b9d5f2de814afe8a49c2551466070d';
const HOST = 'www.localepak.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_API_KEY}.txt`;

async function runIndexNowSubmission() {
  console.log("Gathering all URLs for IndexNow batch submission...");
  
  const urls = new Set([
    `https://${HOST}`,
    `https://${HOST}/prayer-times-pakistan`,
    `https://${HOST}/prayer-times-lahore-today`,
    `https://${HOST}/prayer-times-karachi-today`,
    `https://${HOST}/prayer-times-islamabad-today`,
    `https://${HOST}/prayer-times-rawalpindi-today`,
    `https://${HOST}/prayer-times-faisalabad-today`,
    `https://${HOST}/prayer-times-multan-today`,
    `https://${HOST}/prayer-times-peshawar-today`,
    `https://${HOST}/prayer-times-quetta-today`,
    `https://${HOST}/prayer-times-bahawalpur-today`,
    `https://${HOST}/prayer-times-gujranwala-today`,
    `https://${HOST}/prayer-times-sialkot-today`,
    `https://${HOST}/prayer-times-hyderabad-today`,
    `https://${HOST}/prayer-times-sargodha-today`,
    `https://${HOST}/prayer-times-sukkur-today`,
    `https://${HOST}/prayer-times-abbottabad-today`,
    `https://${HOST}/categories`,
    `https://${HOST}/cities`,
    `https://${HOST}/professionals`,
    `https://${HOST}/jobs`,
    `https://${HOST}/blog`,
    `https://${HOST}/contact`,
    `https://${HOST}/about`,
    `https://${HOST}/terms`,
    `https://${HOST}/privacy`,
    `https://${HOST}/add-business`,
    `https://${HOST}/add-professional`,
  ]);

  // Load database dump
  const dumpPath = path.join(process.cwd(), "scripts", "all-db-dump.json");
  if (fs.existsSync(dumpPath)) {
    const dump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));

    // Professionals
    if (dump.professionals) {
      dump.professionals.forEach(p => {
        const slug = p.username || p.slug || p.id;
        urls.add(`https://${HOST}/professionals/${slug}`);
      });
    }

    // Jobs
    if (dump.jobs) {
      dump.jobs.forEach(j => {
        const slug = j.slug || j.id;
        urls.add(`https://${HOST}/jobs/${slug}`);
      });
    }

    // Businesses
    if (dump.businesses) {
      dump.businesses.forEach(b => {
        const slug = b.slug || b.id;
        urls.add(`https://${HOST}/business/${slug}`);
      });
    }
  }

  const urlList = Array.from(urls);
  console.log(`Total URLs collected for submission: ${urlList.length}`);

  const payload = {
    host: HOST,
    key: INDEXNOW_API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  const endpoints = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/IndexNow'
  ];

  for (const endpoint of endpoints) {
    console.log(`\nSubmitting ${urlList.length} URLs to ${endpoint}...`);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response Status: ${res.status} ${res.statusText}`);
      if (res.ok || res.status === 200 || res.status === 202) {
        console.log(`✓ SUCCESS: Submitted to ${endpoint}`);
      } else {
        const bodyText = await res.text();
        console.log(`Response Body: ${bodyText}`);
      }
    } catch (err) {
      console.error(`Error submitting to ${endpoint}:`, err.message);
    }
  }

  console.log("\nIndexNow batch submission completed.");
  process.exit(0);
}

runIndexNowSubmission().catch(e => { console.error(e); process.exit(1); });
