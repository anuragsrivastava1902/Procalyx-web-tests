import { expect } from "@playwright/test";

export default async function clearAndType(input, value) {
  await input.click();
  await input.press('Control+A');
  await input.press('Backspace');
  await input.type(value);

  // ensure correct value
  await expect(input).toHaveValue(value);
}