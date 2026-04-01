import { expect } from "@playwright/test";

export default class HospitalQuoteDetailPage {
    constructor(page) {
        this.page = page;
        this.annualConsumptionText = page.getByText(/Annual consumption/i);
        this.weightedAverageText = page.getByText(/Weighted average cost per unit/i);
        // This targets the specific table handling Quotations Received.
        this.quotationsTable = page.locator('table').nth(1);
    }

    async parseCurrency(str) {
        if(!str) return 0;
        let isNegative = str.includes('-');
        let multiplier = 1;
        if (str.toUpperCase().includes('L')) multiplier = 100000;
        else if (str.toUpperCase().includes('K')) multiplier = 1000;
        else if (str.toUpperCase().includes('CR')) multiplier = 10000000;

        let cleanStr = str.replace(/[^0-9.]/g, ''); 
        let val = parseFloat(cleanStr) * multiplier;
        return isNegative ? -val : val;
    }

    async verifyImpactCalculations(brandName) {
        await this.annualConsumptionText.waitFor({state: 'visible'});
        const consumptionStr = await this.annualConsumptionText.textContent();
        const annualQuantity = await consumptionStr.split("=")[1].trim()

        const weightedStr = await this.weightedAverageText.textContent(); 
        const parts = weightedStr.split('|'); 
        const weightedAvgCost = await this.parseCurrency(parts[0]);
        const weightedAvgMargin = await this.parseCurrency(parts[1]);

        const row = this.quotationsTable.locator('tbody tr', { hasText: brandName });
        await row.waitFor({state: 'visible'});

        const mrpPerUnitRaw = await row.locator('td').nth(4).textContent(); 
        const costPerUnitRaw = await row.locator('td').nth(6).textContent(); 
        const annualMarginImpactUiRaw = await row.locator('td').nth(8).textContent(); 
        const annualCostImpactUiRaw = await row.locator('td').nth(9).textContent(); 

        const mrpPerUnit = await this.parseCurrency(mrpPerUnitRaw);
        const costPerUnit = await this.parseCurrency(costPerUnitRaw);
        const annualMarginImpactUi = await this.parseCurrency(annualMarginImpactUiRaw);
        const annualCostImpactUi = await this.parseCurrency(annualCostImpactUiRaw);
        console.log("mrpPerUnit,costPerUnit,annualMarginImpactUi,annualCostImpactUi",mrpPerUnit,costPerUnit,annualMarginImpactUi,annualCostImpactUi)

        const expectedCostImpactRaw = (weightedAvgCost - costPerUnit) * annualQuantity;
        const newMargin = mrpPerUnit - costPerUnit;
        const expectedMarginImpactRaw = (newMargin - weightedAvgMargin) * annualQuantity;

        console.log(`\n--- Verification for ${brandName} ---`);
        console.log(`Annual Quantity: ${annualQuantity} | Unit Cost: ${costPerUnit} | Avg Cost: ${weightedAvgCost} | New Margin: ${newMargin} | Avg Margin: ${weightedAvgMargin}`);
        console.log(`Cost Impact - Calc: ${expectedCostImpactRaw} vs UI: ${annualCostImpactUi}`);
        console.log(`Margin Impact - Calc: ${expectedMarginImpactRaw} vs UI: ${annualMarginImpactUi}\n`);

        expect(Math.abs(expectedCostImpactRaw - annualCostImpactUi)).toBeLessThan(15000); 
        expect(Math.abs(expectedMarginImpactRaw - annualMarginImpactUi)).toBeLessThan(15000);
    }
}
