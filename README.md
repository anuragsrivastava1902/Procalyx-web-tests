# Procalyx Web Tests

End-to-end test automation suite for the **Procalyx** platform, built with [Playwright](https://playwright.dev/).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Authentication – How Login Works](#authentication--how-login-works)
- [Running Tests](#running-tests)
- [Available NPM Scripts](#available-npm-scripts)
- [Writing New Tests](#writing-new-tests)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool    | Version          |
| ------- | ---------------- |
| Node.js | 18 or higher     |
| npm     | comes with Node  |

---

## Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd procalyx-web-tests
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Create your `.env` file

Copy the sample below into a `.env` file at the project root. Update values as needed.

```env
CLOUD_URL=https://cloud-qa.procalyx.net/login
CLOUD_EMAIL=your-email@example.com
CLOUD_PASSWORD=your-password
HOSPITAL_UNIT_CLOUD_ID=HOS-XXXXXXX
```

> **Note:** `.env` is git-ignored, so every developer must create their own.

### 5. Generate auth states (one-time, or whenever tokens expire)

Before running any test you need valid login sessions stored locally. Run this for a single role:

```bash
node scripts/login.js <role> [environment]
```

**Examples:**

```bash
# Login as Affordplan MKAM on QA (default environment)
node scripts/login.js ap_mkam

# Login as Hospital Superadmin on Stage
node scripts/login.js h_superadmin stage
```

This will launch a headless browser, authenticate via OTP, and save the session to `storage/auth.<role>.json`.

---

## Project Structure

```
procalyx-web-tests/
├── config/
│   └── app.config.json        # URLs and user credentials for every role & environment
├── fixtures/                   # Custom Playwright fixtures (currently empty, ready to use)
├── pages/                      # Page Object Model classes
│   ├── affordplan/             #   ├── Affordplan admin pages
│   ├── hospital/               #   ├── Hospital portal pages
│   ├── manufacturer/           #   ├── Manufacturer portal pages
│   └── shared/                 #   └── Shared pages (e.g. login)
├── scripts/
│   ├── login.js                # CLI script – login a single role
│   └── login-service.js        # Core login logic (OTP → token → save state)
├── selectors/                  # Selector definitions (JSON / JS)
├── setup/
│   └── global-setup.js         # Runs before all tests – logs in ALL roles in parallel
├── storage/                    # Saved auth states (git-ignored)
├── test-data/                  # Test data files, CSVs (git-ignored)
├── tests/                      # All test specs
│   ├── ap-masters/             #   ├── Mapping masters, exception handling
│   ├── cloud/                  #   ├── Cloud GRN upload, cloud demo
│   ├── hospital/               #   ├── Navigation, price master, quote management
│   ├── item-masters/           #   ├── AP & hospital item creation
│   ├── login/                  #   ├── Login via API
│   ├── manufacturer/           #   ├── Management console, quotes, navigation
│   ├── onboarding/             #   ├── Hospital & manufacturer onboarding
│   └── user-management/        #   └── User registration (AP, hospital, manufacturer)
├── utils/                      # Helper utilities
│   ├── readConfig.js           #   ├── Reads config/app.config.json
│   ├── readCSV.js              #   ├── CSV file parser
│   ├── generateTestData.js     #   ├── Generates random test data
│   ├── getDropdownListFromApi.js #  ├── Fetches dropdown values from API
│   ├── safeSelect.js           #   └── Safe dropdown selection helper
│   └── helpers/                #   └── Additional helper modules
├── playwright.config.js        # Playwright configuration
├── package.json                # Dependencies and npm scripts
├── .env                        # Environment secrets (git-ignored)
└── .gitignore
```

---

## Environment Configuration

The project supports **4 environments**. The environment is set via the `ENV` variable.

| Environment | Frontend URL                | API URL                        |
| ----------- | --------------------------- | ------------------------------ |
| `qa`        | https://qa.procalyx.net     | https://api-qa.procalyx.net    |
| `stage`     | https://stage.procalyx.net  | https://api-stage.procalyx.net |
| `dev`       | https://dev.procalyx.net    | https://api-dev.procalyx.net   |
| `demo`      | https://demo.procalyx.net   | https://api-demo.procalyx.net  |

If `ENV` is not set, it defaults to **`qa`**.

### Available User Roles

These are the roles defined in `config/app.config.json`:

| Role Key          | Description                        |
| ----------------- | ---------------------------------- |
| `ap_superadmin`   | Affordplan Super Admin             |
| `ap_admin`        | Affordplan Admin                   |
| `ap_hkam`         | Affordplan Hospital KAM            |
| `ap_mkam`         | Affordplan Manufacturer KAM        |
| `ap_operator`     | Affordplan Data Operator           |
| `h_superadmin`    | Hospital Super Admin               |
| `h_cxo`           | Hospital CXO                       |
| `h_operator`      | Hospital Operator                  |
| `m_superadmin`    | Manufacturer Super Admin           |
| `m_businesshead`  | Manufacturer Business Head         |
| `m_cxo`           | Manufacturer CXO                   |
| `m_operator`      | Manufacturer Operator              |

---

## Authentication – How Login Works

Procalyx uses **OTP-based authentication**. Here's what happens under the hood:

1. The login script sends a request to **`/api/v1/auth/otp/send`** with the user's email.
2. The API returns an OTP (on QA/Stage the OTP is included in the response for automation purposes).
3. The OTP is verified via **`/api/v1/auth/otp/verify`**, which returns `token` and `refreshToken`.
4. A headless browser opens the frontend URL and injects the tokens into `localStorage`.
5. The browser state (cookies + localStorage) is saved to **`storage/auth.<role>.json`**.
6. Tests load this saved state to skip login and start authenticated.

### Manual login (single role)

```bash
node scripts/login.js <role> [env]
```

### Automatic login (all roles – via global setup)

When you run `npm test` in **full mode** (default), the `globalSetup` in `playwright.config.js` automatically logs in **all 12 roles** in parallel before any test runs. To skip this during local development, use the `test:local` script:

```bash
npm run test:local
```

This sets `MODE=local` which skips the global setup entirely.

---

## Running Tests

### Run all tests

```bash
npm test
```

This will:
1. Run `globalSetup` (logs in all roles)
2. Execute all `*.spec.js` files under `tests/`
3. Generate an HTML report

### Run tests against a specific environment

```bash
ENV=stage npm test
```

### Run tests in Playwright UI mode (interactive)

```bash
npm run test:ui
```

### Run a specific test file or folder

```bash
# By folder
npx playwright test tests/manufacturer/

# By file
npx playwright test tests/manufacturer/quote.spec.js
```

### Passing extra arguments to npm scripts (the `--` trick)

When you use an npm script like `test:local`, npm eats any extra arguments unless you add a **bare `--`** before them. Everything after `--` gets forwarded to the underlying command (playwright).

```
npm run <script> -- <extra args for playwright>
```

**Examples:**

```bash
# Run a specific file in local mode (no global setup)
npm run test:local -- tests/onboarding/hospital-onboarding-admin.spec.js

# Run a specific file in headed mode (see the browser)
npm run test:local -- tests/onboarding/hospital-onboarding-admin.spec.js --headed

# Run a folder with the default script
npm run test:manufacturer -- --headed

# Run all tests on stage, headed
ENV=stage npm test -- --headed
```

> **Common mistake:** `npm run test:local tests/some-file.spec.js` (without `--`) will **silently ignore** the file path. Always use `--` to forward arguments.

### View the last test report

```bash
npm run test:report
```

---

## Available NPM Scripts

| Script                             | What it does                                            |
| ---------------------------------- | ------------------------------------------------------- |
| `npm test`                         | Run **all** tests (with global setup)                   |
| `npm run test:local`               | Run tests **without global setup** (for local dev)      |
| `npm run test:ui`                  | Open Playwright **UI mode** (interactive test runner)   |
| `npm run test:report`              | Open the last **HTML report** in your browser           |
| `npm run test:auth`                | Run only **login / auth** tests                         |
| `npm run test:onboarding`          | Run all **onboarding** tests                            |
| `npm run test:onboarding:manufacturer` | Run **manufacturer onboarding** tests only          |
| `npm run test:onboarding:hospital` | Run **hospital onboarding** tests only                  |
| `npm run test:items`               | Run all **item creation** tests                         |
| `npm run test:items:ap`            | Run **AP item master creation** tests only              |
| `npm run test:manufacturer`        | Run all **manufacturer** tests                          |
| `npm run test:manufacturer:quote`  | Run **manufacturer quote** tests only                   |
| `npm run test:manufacturer:console`| Run **management console** tests only                   |
| `npm run test:manufacturer:nav`    | Run **manufacturer navigation** tests only              |
| `npm run test:users`               | Run all **user management** tests                       |
| `npm run test:users:register`      | Run **user registration** tests only                    |
| `npm run test:masters`             | Run all **AP master** tests                             |
| `npm run test:masters:mapping`     | Run **mapping master** tests only                       |
| `npm run test:masters:exception`   | Run **exception handling** tests only                   |
| `npm run test:cloud`               | Run all **cloud** tests                                 |
| `npm run test:cloud:grn`           | Run **cloud GRN upload** tests only                     |
| `npm run test:cloud:demo`          | Run **cloud demo** tests only                           |
| `npm run test:smoke`               | Run a **smoke** suite (auth + onboarding + mgmt console)|
| `npm run test:regression`          | Run **full regression** (same as `npm test`)            |

---

## Writing New Tests

### 1. Create (or reuse) a Page Object

Page objects live in `pages/<entity>/`. Each file exports a class that wraps selectors and actions for one page.

```js
// pages/hospital/my-new-page.page.js
export default class MyNewPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator('h1');
  }

  async navigate() {
    await this.page.goto('/my-new-page');
  }
}
```

### 2. Create a spec file

Spec files live in `tests/<module>/` and must end with `.spec.js`.

```js
// tests/hospital/my-new-feature.spec.js
import { test, expect } from '@playwright/test';
import MyNewPage from '../../pages/hospital/my-new-page.page.js';

test.describe('My New Feature', () => {
  test('should display heading', async ({ page }) => {
    // Load saved auth state for the role you need
    const myPage = new MyNewPage(page);
    await myPage.navigate();
    await expect(myPage.heading).toBeVisible();
  });
});
```

### 3. Use saved auth state in tests

To run a test as a specific role, load the stored session:

```js
test.use({ storageState: 'storage/auth.h_superadmin.json' });
```

---

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| **Tests fail with "auth file not found"** | Run `node scripts/login.js <role>` to generate the auth state file. |
| **OTP errors during login** | Make sure the email in `config/app.config.json` is correct and the user exists in the target environment. |
| **Tests run against wrong environment** | Set `ENV` before the command: `ENV=stage npm test` |
| **Global setup runs when I don't want it** | Use `npm run test:local` to skip global setup during development. |
| **Browser not found** | Run `npx playwright install` to download the required browsers. |
| **Timeout errors** | The default timeout is 40 seconds per test. If a page is slow, you can increase it in `playwright.config.js` → `timeout`. |

---

## Tech Stack

- **[Playwright](https://playwright.dev/)** – browser automation & test runner
- **[Node.js](https://nodejs.org/)** – runtime
- **[dotenv](https://www.npmjs.com/package/dotenv)** – loads `.env` variables
- **[PapaParse](https://www.papaparse.com/)** – CSV parsing
- **[Axios](https://axios-http.com/)** – HTTP client for API calls
- **[ESLint](https://eslint.org/)** – code linting
