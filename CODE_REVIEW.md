# Procalyx Web Tests — Code Review Report

## Overall Rating: **5.5 / 10**

The project has a solid foundation with the right architectural ideas (Page Object Model, data-driven testing, CSV-based parameterization). But execution gaps, hardcoded values, incomplete files, and missing best practices keep it from being production-grade.

---

## Scorecard Breakdown

| Category | Score | Notes |
|---|:---:|---|
| **Project Structure** | 7/10 | Good folder layout (`pages/`, `tests/`, `utils/`, `config/`). POM architecture is well organized. |
| **Page Object Model** | 6/10 | Good separation of locators + actions. But 9 page files are completely **empty** (0 bytes). |
| **Test Coverage** | 4/10 | Only ~10 working test specs. Many modules (hospital item master, manufacturer masters, hospital user mgmt) have **zero tests**. |
| **Assertions & Validation** | 4/10 | Many tests lack assertions entirely—they just navigate or fill forms. Only a few verify API responses or check success messages. |
| **Hardcoding** | 3/10 | Credentials in `cloud-grn-upload.spec.js`, hardcoded URLs (`https://qa.procalyx.net`) scattered across tests instead of using `baseURL` from config/playwright. |
| **Anti-patterns** | 4/10 | Heavy use of `page.waitForTimeout()`, `page.pause()` left in tests, `console.log` used for debugging instead of proper test reporting. |
| **Data-Driven Testing** | 7/10 | Nice CSV-based parameterization using `papaparse`. Applied well in onboarding, item creation, and user registration tests. |
| **Stability & Reliability** | 4/10 | Brittle selectors using `.nth(47)`, ordinal `nth()` on comboboxes, and no retry/recovery patterns. |
| **CI/CD Readiness** | 3/10 | `globalSetup` is commented out, `workers: 1`, no npm scripts defined, no CI config file. `page.pause()` calls would freeze CI. |
| **Code Quality** | 5/10 | Inconsistent naming (`safeSelect.js` is not exported), commented-out code everywhere, typos in describe blocks like `'auth tests'` for manufacturer onboarding. |

---

## How Helpful Is It for Reducing Manual Work?

### Currently Automates
- ✅ **Login & OTP Auth** — Auto-intercepts OTP from API and authenticates (clever approach!)
- ✅ **Manufacturer Onboarding** — Full form fill with KYB, SPOC, geography, contract status
- ✅ **Hospital Onboarding** — End-to-end form fill with PAN, GST, SPOC, specialties
- ✅ **User Registration** — Creates users with org details, geography, conditional dropdowns
- ✅ **AP Item Master Creation** — Data-driven item creation with CSV data
- ✅ **Mapping Masters** — GRN field mapping creation
- ✅ **Quote Publishing** — Finds quotable rows and publishes

### Time Savings Estimate
| Manual Task | Manual Time | Automated Time | Savings |
|---|---|---|---|
| Onboard 5 manufacturers | ~25 min | ~3 min | **~88%** |
| Create 10 AP items | ~30 min | ~4 min | **~87%** |
| Register 5 users | ~15 min | ~2 min | **~87%** |
| Full login + auth setup | ~2 min each | ~5 sec | **~96%** |

### **Current Manual Reduction: ~60-65%** of total QA workflows

The remaining **35-40%** is uncovered because:
- Hospital item master, manufacturer item master → empty page objects, no tests
- Hospital user management, manufacturer user management → empty
- Exception handling → half done (pauses mid-test)
- Cloud GRN → hardcoded, non-reusable one-off script
- No **edit/update/delete** flows — only creation flows exist
- No **negative testing** or **validation error testing**

---

## Top Issues Found

### 🔴 Critical

1. **`page.pause()` in test files** — Freezes tests in CI. Found in:
   - `manufacturer-nav.spec.js` line 20
   - `exception-handling.spec.js` line 15
   - `exception-handling-list.page.js` line 19
   - `cloud-grn-upload.spec.js` line 68

2. **Hardcoded credentials** in `cloud-grn-upload.spec.js` lines 11-13:
   ```js
   const email = 'anurag.srivastava@affordplan.com';
   const password = 'affordplan@1902';
   ```

3. **Missing `await`** in `manufacturer-dashboard.page.js` line 13:
   ```js
   async goToDashboard(){
       this.dashboardBtn.click();  // ← missing await!
   }
   ```

4. **`safeSelect.js` is never exported or imported** — Dead code.

### 🟡 Important

5. **9 completely empty page object files** — These create a false sense of progress:
   - `hospital-dashboard.page.js`, `therapy-master.page.js`, `manufacturer-item-master-form/list.page.js`, `hospital-user-mgmt-form/list.js`, `manufacturer-user-mgmt-form/list.js`, `manufacturer-master-form/list.page.js`, `hospital-item-master-form/list.page.js`

6. **Brittle selectors** — Will break with any UI change:
   - `.locator('td').nth(47)` in manufacturer onboarding list
   - `.locator('form').getByRole('combobox').nth(2/3/4/5/6/7/8/9)` across multiple forms

7. **Inconsistent URL usage** — Some tests use `baseURL` from playwright config, others hardcode `https://qa.procalyx.net/dashboard`.

8. **No npm scripts** — `"scripts": {}` in `package.json`. No way to run tests conveniently.

9. **`check-login.js`** — Not a `.spec.js` file, so Playwright won't discover it.

---

## Improvement Plan

### Phase 1 — Quick Wins (1-2 days) 🏃

| # | Action | Impact |
|---|---|---|
| 1 | Remove all `page.pause()` and `page.waitForTimeout()` calls; replace with smart waits (`waitForResponse`, `waitForSelector`, `expect().toBeVisible()`) | Stability ⬆⬆ |
| 2 | Add npm scripts: `"test"`, `"test:auth"`, `"test:onboarding"`, `"test:items"` | DX ⬆⬆ |
| 3 | Fix missing `await` in `goToDashboard()` | Bug fix |
| 4 | Move hardcoded URLs to `baseURL` from playwright config everywhere | Maintainability ⬆ |
| 5 | Move cloud credentials to `.env` file + add `.env` to `.gitignore` | Security ⬆⬆ |
| 6 | Delete or properly scaffold empty page files | Clarity ⬆ |
| 7 | Export `safeSelect` properly or remove it | Cleanup |
| 8 | Un-comment `globalSetup` and integrate API-based auth as a proper setup project | Auth reliability ⬆ |

### Phase 2 — Structural Improvements (3-5 days) 🏗️

| # | Action | Impact |
|---|---|---|
| 9 | Create a **base page class** with shared helpers: `waitForTableLoad()`, `selectDropdown(name, value)`, `fillSearchAndSelect(combobox, text)` | DRY ⬆⬆, less duplication |
| 10 | Build a **dropdown utility** — the same "fill → wait for option → click" pattern is repeated 8+ times in `ap-item-master-form.page.js` alone | DRY ⬆⬆ |
| 11 | Add `data-testid` attributes (or ask devs to add them) to replace fragile `.nth()` selectors | Stability ⬆⬆⬆ |
| 12 | Add proper **assertions** to every test — verify success messages, URL changes, API status codes | Confidence ⬆⬆ |
| 13 | Implement a **test data factory** — generate unique test data per run instead of relying on static CSVs | Isolation ⬆⬆ |
| 14 | Add **environment config** — support QA, staging, prod URLs via env variables | Flexibility ⬆ |

### Phase 3 — Coverage Expansion (1-2 weeks) 📈

| # | Action | Impact |
|---|---|---|
| 15 | Implement **hospital item master** tests (form page + list page + spec) | Coverage ⬆ |
| 16 | Implement **manufacturer item master** tests | Coverage ⬆ |
| 17 | Implement **hospital/manufacturer user management** tests | Coverage ⬆ |
| 18 | Add **edit and delete** flows for all entities (not just create) | Coverage ⬆⬆ |
| 19 | Add **negative test cases** — duplicate PAN, invalid email, required field validation | Quality ⬆⬆ |
| 20 | Add **API-level tests** alongside UI tests for faster validation | Speed ⬆⬆ |

### Phase 4 — CI/CD & Reporting (3-5 days) 🚀

| # | Action | Impact |
|---|---|---|
| 21 | Add GitHub Actions / GitLab CI workflow file | Automation ⬆⬆⬆ |
| 22 | Configure **parallel workers** (currently `workers: 1`) | Speed ⬆⬆ |
| 23 | Set up **Playwright HTML reporter** with screenshots on failure | Debugging ⬆⬆ |
| 24 | Add **Slack/email notifications** on test failure | Visibility ⬆⬆ |
| 25 | Add **test tagging** (`@smoke`, `@regression`, `@critical`) for targeted runs | Flexibility ⬆⬆ |

---

## Summary

> **What you've built is a good starting point.** The POM structure, CSV-driven tests, and OTP interception are genuinely smart. But the code is still in a "development/exploration" phase — `page.pause()` calls, empty files, hardcoded values, and missing assertions show it's not yet production-grade.
>
> **Projected rating after Phase 1+2: 7.5/10**
> **Projected rating after all phases: 9/10**
> **Projected manual work reduction: 85-90%**
