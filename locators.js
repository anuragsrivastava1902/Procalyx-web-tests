import { chromium } from '@playwright/test';
import fs from 'fs';

const TARGET_URL = process.argv[2] || 'https://qa.procalyx.net/hospital/price-master';

function getBestLocator(el) {
    if (el.dataTestId) return `[data-testid="${el.dataTestId}"]`;
    if (el.ariaLabel) return `[aria-label="${el.ariaLabel}"]`;
    if (el.id) return `#${el.id}`;
    if (el.name) return `[name="${el.name}"]`;
    if (el.role && el.text) return `role=${el.role} >> text=${el.text}`;
    if (el.text) return `text=${el.text}`;
    if (el.classes) return `[class*="${el.classes.split(' ')[0]}"]`;
    return `${el.tag.toLowerCase()}`;
}

function classifyElement(el) {
    const tag = el.tag.toLowerCase();
    if (tag === 'a') return 'Link';
    if (tag === 'button' || el.role === 'button') return 'Button';
    if (tag === 'input') return `Input[${el.inputType || 'text'}]`;
    if (tag === 'select') return 'Dropdown';
    if (tag === 'textarea') return 'Textarea';
    if (el.role === 'checkbox') return 'Checkbox';
    if (el.role === 'radio') return 'Radio';
    if (el.role === 'navigation') return 'Nav';
    if (el.role === 'dialog') return 'Dialog';
    return 'Element';
}

(async () => {
    console.log(`\n🚀 Launching browser → ${TARGET_URL}\n`);

    const browser = await chromium.launch({ headless: false });
    // ✅ USE AUTH STATE HERE
    const context = await browser.newContext({
        storageState: 'storage/auth.h_superadmin.json'
    });
    const page = await context.newPage();

    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000); // let dynamic content settle

    const elements = await page.evaluate(() => {
        const nodes = document.querySelectorAll(
            'a, button, input, select, textarea, [role], [data-testid], [aria-label]'
        );

        return Array.from(nodes).map(el => ({
            tag: el.tagName,
            id: el.id || null,
            classes: el.className || null,
            name: el.getAttribute('name') || null,
            role: el.getAttribute('role') || null,
            ariaLabel: el.getAttribute('aria-label') || null,
            dataTestId: el.getAttribute('data-testid') || null,
            inputType: el.getAttribute('type') || null,
            text: el.innerText?.trim().slice(0, 60) || el.textContent?.trim().slice(0, 60) || null,
            placeholder: el.getAttribute('placeholder') || null,
            href: el.getAttribute('href') || null,
        }));
    });

    // Enrich with best locator + type
    const enriched = elements.map((el, i) => ({
        index: i + 1,
        type: classifyElement(el),
        bestLocator: getBestLocator(el),
        text: el.text,
        href: el.href,
        placeholder: el.placeholder,
        raw: el
    }));

    // Print to console
    console.log('='.repeat(60));
    console.log(`📋 FOUND ${enriched.length} ELEMENTS ON: ${TARGET_URL}`);
    console.log('='.repeat(60));

    enriched.forEach(el => {
        console.log(`\n[${el.index}] ${el.type}`);
        console.log(` ✅ Best Locator : ${el.bestLocator}`);
        if (el.text) console.log(` 📝 Text : ${el.text}`);
        if (el.placeholder) console.log(` 💬 Placeholder : ${el.placeholder}`);
        if (el.href) console.log(` 🔗 Href : ${el.href}`);
    });

    // Save to JSON for Cursor agent context
    const output = {
        url: TARGET_URL,
        totalElements: enriched.length,
        elements: enriched
    };

    fs.writeFileSync('locators.json', JSON.stringify(output, null, 2));
    console.log('\n\n💾 Full output saved to locators.json');
    console.log('📌 Feed locators.json to Cursor agent for interaction scripts\n');

    await browser.close();
})();