const { chromium } = require('playwright');
const { default: axios } = require('axios');

(async () => {
  // Fetch drug data from openFDA API
  const item_name = 'dolo'
  const apiUrl = `https://api.fda.gov/drug/label.json?search=${item_name}`;
  const response = await axios.get(apiUrl, { family: 4 });
  const data = response.data;

  // Extract medicine names and manufacturer names
  const drugs = data.results.map((item) => {
    return {
      drugName: item.openfda.brand_name ? item.openfda.brand_name[0] : 'Unknown',
      manufacturer: item.openfda.manufacturer_name ? item.openfda.manufacturer_name[0] : 'Unknown',
    };
  });

  console.log('Medicine Names and Manufacturers:');
  drugs.forEach((drug, index) => {
    console.log(`${index + 1}. ${drug.drugName} - Manufacturer: ${drug.manufacturer}`);
  });

  // Now use Playwright to interact with a web page (optional)
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // For example, go to a page and input data (just as an example)
  await page.goto('https://your-testing-url.com');
  await page.fill('input[name="medicine"]', drugs[0].drugName); // Filling in the first drug name
  await page.click('button#submit'); // Submit or interact with the page

  // Close the browser
  await browser.close();
})();