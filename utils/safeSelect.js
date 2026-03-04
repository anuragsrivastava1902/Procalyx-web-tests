async function safeSelect(page, locatorStr, option) {
  const loc = page.locator(locatorStr);
  if (await loc.count() > 0) {
    await loc.selectOption(option);
  }
}

// Then use: 
// await safeSelect(page, "//div[4]//div[1]//select[1]", { label: user.subsidiary });
