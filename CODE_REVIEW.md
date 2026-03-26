# Procalyx Web Tests — Code Review Report

## Overall Rating: **6.5 / 10** *(was 5.5/10 on 2026-03-23)*

The project has made genuine, meaningful progress. Security hardening, a full npm scripts layer, new hospital page objects, and smarter waits all show real maturity. The POM architecture and CSV-driven approach remain strong foundations. A few critical blockers (`page.pause()`, commented-out `globalSetup`, lingering hardcoded URLs, and ~9 empty page files) are all that separate this from a 7.5+ rating.

---

## Scorecard Breakdown

| Category | Old Score | **New Score** | Change | Notes |
|---|:---:|:---:|:---:|---|
| **Project Structure** | 7/10 | **7.5/10** | ⬆️ +0.5 | New `pages/hospital/`, `pages/onboarding/`. Roles well separated. |
| **Page Object Model** | 6/10 | **7/10** | ⬆️ +1 | `hospital-dashboard-page`, `hospital-menu-page`, `hospital-quote-mgmt-page`, `manufacturer-dashboard.page` all solid. |
| **Test Coverage** | 4/10 | **5.5/10** | ⬆️ +1.5 | New: `hospital-navigation.spec.js`, `management-console.spec.js`, `manufacturer-nav.spec.js`, cloud tests. |
| **Assertions & Validation** | 4/10 | **5.5/10** | ⬆️ +1.5 | `verifySuccessMessage()`, `waitForPageToLoadComplete()`, pagination assertion, `expect(hospitalUnitCell)`. |
| **Hardcoding** | 3/10 | **5.5/10** | ⬆️ +2.5 | `.env` + `dotenv` used in cloud-grn. But `https://qa.procalyx.net/dashboard` still hardcoded in 2 spec files. |
| **Anti-patterns** | 4/10 | **5/10** | ⬆️ +1 | `page.pause()` still in `exception-handling.spec.js` (line 15) and `cloud-grn-upload.spec.js` (line 50). Heavy `console.log` use. |
| **Data-Driven Testing** | 7/10 | **7.5/10** | ⬆️ +0.5 | Defensive `try/catch` around CSV loading is a good addition. `readCSV` + papaparse solid. |
| **Stability & Reliability** | 4/10 | **5.5/10** | ⬆️ +1.5 | `waitForResponse()`, skeleton loader detection (`waitFor({ state: 'hidden' })`). Smart waits adopted. |
| **CI/CD Readiness** | 3/10 | **5/10** | ⬆️ +2 | Full npm scripts (smoke/regression/per-module). `.env` in `.gitignore`. ESLint added. But no CI YAML, `globalSetup` commented out, `workers: 1`. |
| **Code Quality** | 5/10 | **6/10** | ⬆️ +1 | `await` bug in `goToDashboard()` fixed. Naming improved. `safeSelect.js` still not exported. |

---

## What Improved Since Last Review ✅

| # | Change | Impact |
|---|---|---|
| 1 | **npm scripts fully built** — smoke, regression, and per-module run scripts | DX ⬆⬆ |
| 2 | **`.env` + `dotenv`** in `cloud-grn-upload.spec.js` — no more hardcoded credentials | Security ⬆⬆ |
| 3 | **`.env` + `/storage/` + `/test-data/` in `.gitignore`** | Security ⬆⬆ |
| 4 | **`goToDashboard()` `await` bug fixed** in `manufacturer-dashboard.page.js` | Bug fix ✅ |
| 5 | **Hospital page layer built** — `hospital-dashboard-page.js`, `hospital-menu-page.js`, `hospital-quote-mgmt-page.js` | Coverage ⬆ |
| 6 | **`hospital-navigation.spec.js`** — new test for hospital side navigation and quotes | Coverage ⬆ |
| 7 | **`verifySuccessMessage()`** in `mapping-masters-form` — real UI assertion added | Quality ⬆ |
| 8 | **Smart waits** — skeleton loader detection, `waitForResponse` pattern | Stability ⬆ |
| 9 | **ESLint configured** (`.eslintrc.json`) | Quality ⬆ |
| 10 | **`app.config.json`** supports multi-env (qa/stage/dev) and 11 role definitions | Flexibility ⬆ |

---

## Issues Still Present

### 🔴 Critical

1. **`page.pause()` still in test files** — will freeze CI:
   - `exception-handling.spec.js` line 15
   - `cloud-grn-upload.spec.js` line 50

2. **`globalSetup` still commented out** in `playwright.config.js` (line 38) — auth setup is still manual, not automated.

3. **Hardcoded URLs still in 2 spec files**:
   ```js
   // exception-handling.spec.js line 12
   await page.goto("https://qa.procalyx.net/dashboard");
   // mapping-master.spec.js line 23
   await page.goto("https://qa.procalyx.net/dashboard");
   ```
   Replace with: `await page.goto('/dashboard');` (uses `baseURL` from playwright config)

4. **Missing `await` in `getTotalItemsFromPagination()`** (`hospital-quote-mgmt-page.js` line 26):
   ```js
   paginationText.waitFor({state:'visible'}); // ← missing await!
   ```

### 🟡 Important

5. **9 completely empty page object files** — false sense of completeness:
   - `hospital-item-master-form.page.js`, `hospital-item-master-list.page.js`
   - `manufacturer-item-master-form.page.js`, `manufacturer-item-master-list.page.js`
   - `manufacturer-master-form.page.js`, `manufacturer-master-list.page.js`
   - `hospital-user-mgmt-form.js`, `hospital-user-mgmt-list.js`
   - `manufacturer-user-mgmt-form.js`, `manufacturer-user-mgmt-list.js`
   - `therapy-master.page.js`, `hospital-dashboard.page.js` (in `affordplan/dashboard/`)

6. **`safeSelect.js` still not exported** — dead utility code. Either export and use it, or delete it.

7. **`hospital-navigation.spec.js`** has 7 commented-out `waitForTimeout` and `page.pause()` calls — development artifacts left behind.

8. **Heavy `console.log` debugging** still across all files instead of using Playwright's built-in reporter.

9. **No CI YAML** — GitHub Actions / GitLab CI still missing. Tests can't run automatically.

10. **`workers: 1`** — no parallelism despite multiple independent test suites.

---

## How Helpful Is It for Reducing Manual Work?

### Currently Automates
- ✅ **Login & OTP Auth** — Auto-intercepts OTP from API and authenticates (clever approach!)
- ✅ **Manufacturer Onboarding** — Full form fill with KYB, SPOC, geography, contract status
- ✅ **Hospital Onboarding** — End-to-end form fill with PAN, GST, SPOC, specialties
- ✅ **User Registration** — Creates users with org details, geography, conditional dropdowns
- ✅ **AP Item Master Creation** — Data-driven item creation with CSV data
- ✅ **Mapping Masters** — GRN field mapping creation with success assertion
- ✅ **Hospital Navigation & Quotes** — Quote management page, pagination, MFS tabs
- ✅ **Manufacturer Navigation** — Dashboard, console, quote repo, user management flows
- ✅ **Management Console** — Dynamic row/column scanning with per-row assertions

### Time Savings Estimate
| Manual Task | Manual Time | Automated Time | Savings |
|---|---|---|---|
| Onboard 5 manufacturers | ~25 min | ~3 min | **~88%** |
| Create 10 AP items | ~30 min | ~4 min | **~87%** |
| Register 5 users | ~15 min | ~2 min | **~87%** |
| Full login + auth setup | ~2 min each | ~5 sec | **~96%** |

### **Current Manual Reduction: ~65-70%** of total QA workflows

The remaining **30-35%** is uncovered because:
- Hospital & manufacturer item master → empty page objects, no tests
- Hospital & manufacturer user management → empty page objects, no tests
- Exception handling → `page.pause()` breaks it mid-test
- No **edit/update/delete** flows — only creation flows exist
- No **negative testing** or **validation error testing**

---

## Improvement Plan

### Phase 1 — Quick Wins (1-2 days) 🏃

| # | Action | Impact |
|---|---|---|
| 1 | Remove all remaining `page.pause()` calls (`exception-handling.spec.js` line 15, `cloud-grn-upload.spec.js` line 50) | CI Readiness ⬆⬆ |
| 2 | Fix hardcoded URLs in `exception-handling.spec.js` and `mapping-master.spec.js` → use `page.goto('/dashboard')` | Maintainability ⬆ |
| 3 | Fix missing `await` on `paginationText.waitFor()` in `hospital-quote-mgmt-page.js` line 26 | Bug fix |
| 4 | Un-comment `globalSetup` in `playwright.config.js` and wire up proper storage-state auth project | Auth reliability ⬆⬆ |
| 5 | Export `safeSelect.js` properly or delete it | Cleanup |
| 6 | Delete or properly scaffold the 12 empty page files | Clarity ⬆ |
| 7 | Clean up commented-out `waitForTimeout` and `page.pause()` blocks left in spec files | Code quality ⬆ |

### Phase 2 — Structural Improvements (3-5 days) 🏗️

| # | Action | Impact |
|---|---|---|
| 8 | Create a **base page class** with shared helpers: `waitForTableLoad()`, `selectDropdown(name, value)` | DRY ⬆⬆ |
| 9 | Extract the dropdown fill-wait-click pattern (repeated 9x in `ap-item-master-form.page.js`) into a shared utility | DRY ⬆⬆ |
| 10 | Add `data-testid` attributes (or ask devs) to replace any remaining fragile selectors | Stability ⬆⬆ |
| 11 | Add proper **assertions** to every test — verify success messages, URL changes, API status codes | Confidence ⬆⬆ |
| 12 | Replace `console.log` debugging with Playwright's `test.info().annotations` or structured logging | Quality ⬆ |
| 13 | Add **environment config** — support QA, staging, prod URLs via env variables (already in `app.config.json`, just wire it up) | Flexibility ⬆ |

### Phase 3 — Coverage Expansion (1-2 weeks) 📈

| # | Action | Impact |
|---|---|---|
| 14 | Implement **hospital item master** tests (form page + list page + spec) | Coverage ⬆ |
| 15 | Implement **manufacturer item master** tests | Coverage ⬆ |
| 16 | Implement **hospital/manufacturer user management** tests | Coverage ⬆ |
| 17 | Add **edit and delete** flows for all entities (not just create) | Coverage ⬆⬆ |
| 18 | Add **negative test cases** — duplicate PAN, invalid email, required field validation | Quality ⬆⬆ |
| 19 | Fix and complete **exception handling** test (currently breaks at `page.pause()`) | Coverage ⬆ |

### Phase 4 — CI/CD & Reporting (3-5 days) 🚀

| # | Action | Impact |
|---|---|---|
| 20 | Add **GitHub Actions / GitLab CI** workflow file | Automation ⬆⬆⬆ |
| 21 | Configure **parallel workers** (currently `workers: 1`) | Speed ⬆⬆ |
| 22 | Set up **Playwright HTML reporter** with screenshots on failure | Debugging ⬆⬆ |
| 23 | Add **test tagging** (`@smoke`, `@regression`, `@critical`) for targeted runs | Flexibility ⬆⬆ |
| 24 | Add **Slack/email notifications** on test failure | Visibility ⬆ |

---

## Summary

> **What you've built is a solidly growing automation suite.** The POM structure, CSV-driven tests, OTP interception, `.env` security, multi-role config, and smart waits are all genuinely professional patterns.
>
> The code is moving out of "exploration phase" and into "structured automation" — but two `page.pause()` calls, a commented-out `globalSetup`, two hardcoded URLs, and 12 empty files are the last remnants of the old phase. Clearing those in one focused session would push this to a **7.5/10**.
>
> **Current rating: 6.5/10**
> **Projected after Phase 1: 7.5/10**
> **Projected after all phases: 9/10**
> **Current manual work reduction: ~65-70%**
> **Projected after Phase 3: ~85-90%**

---

*Last reviewed: 2026-03-27*
