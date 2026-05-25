# Practice Software Testing - Playwright Test Suite

Automated testing framework for [practicesoftwaretesting.com](https://practicesoftwaretesting.com)
built with Playwright and TypeScript.

---

## 🗂️ Project Structure

practice-testing/
├── pages/                    # Page Object Models
│   ├── BasePage.ts           # Base class for all pages
│   ├── LoginPage.ts          # Login page interactions
│   ├── RegisterPage.ts       # Register page interactions
│   ├── ProductsPage.ts       # Products listing & sort
│   └── CartPage.ts           # Cart interactions
├── tests/                    # Test files
│   ├── auth.setup.ts         # Login session setup (runs once)
│   ├── login.spec.ts         # Login feature tests
│   ├── register.spec.ts      # Register feature tests
│   ├── cart.spec.ts          # Cart feature tests
│   └── sort.spec.ts          # Sort feature tests
├── utils/
│   └── helpers.ts            # Shared utility functions
├── playwright/.auth/         # Saved login session (auto-generated)
├── .env                      # Environment variables (not uploaded to GitHub)
├── .env.example              # Environment variables template
├── playwright.config.ts      # Playwright configuration
└── package.json

---

## ⚙️ Requirements

- Node.js v18 or higher
- npm v9 or higher

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd practice-testing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install browsers

```bash
npx playwright install
```

### 4. Setup environment variables

```bash
cp .env.example .env
```

Then open `.env` and fill in your credentials:

```env
BASE_URL=https://practicesoftwaretesting.com
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
```

### 5. Create auth folder

```bash
mkdir -p playwright/.auth
```

---

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run on specific browser

```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox
```

### Run a specific feature

```bash
# Login tests
npx playwright test tests/login.spec.ts

# Register tests
npx playwright test tests/register.spec.ts

# Cart tests
npx playwright test tests/cart.spec.ts

# Sort tests
npx playwright test tests/sort.spec.ts
```

### Run a specific feature on a specific browser

```bash
npx playwright test tests/login.spec.ts --project=chromium
npx playwright test tests/sort.spec.ts --project=firefox
```

### Run in headed mode (see the browser)

```bash
npx playwright test --headed
```

### Open HTML report

```bash
npx playwright show-report
```

---

## 🧪 Test Cases

### Login (6 tests)
| ID | Description |
|----|-------------|
| TC-LOGIN-01 | Login with valid credentials ✅ |
| TC-LOGIN-02 | Login with wrong password ❌ |
| TC-LOGIN-03 | Login with wrong email ❌ |
| TC-LOGIN-04 | Login with empty fields ❌ |
| TC-LOGIN-05 | Verify login page URL |
| TC-LOGIN-06 | Password field should be masked |

### Register (5 tests)
| ID | Description |
|----|-------------|
| TC-REG-01 | Register with valid data ✅ |
| TC-REG-02 | Register with existing email ❌ |
| TC-REG-03 | Register without email ❌ |
| TC-REG-04 | Register without password ❌ |
| TC-REG-05 | Register without first name ❌ |

### Cart (6 tests)
| ID | Description |
|----|-------------|
| TC-CART-01 | Add a single product to cart |
| TC-CART-02 | Verify product appears in cart page |
| TC-CART-03 | Add multiple products to cart |
| TC-REMOVE-01 | Add one item then remove it → cart empty |
| TC-REMOVE-02 | Add two items and remove one |
| TC-REMOVE-03 | Remove all items one by one → cart empty |

### Sort (5 tests)
| ID | Description |
|----|-------------|
| TC-SORT-01 | Sort products by Name A to Z |
| TC-SORT-02 | Sort products by Name Z to A |
| TC-SORT-03 | Sort products by Price Low to High |
| TC-SORT-04 | Sort products by Price High to Low |
| TC-SORT-05 | Switch sort from A-Z then Price High to Low |

---

## 🏗️ Playwright Concepts Used

| Concept | Where |
|---------|-------|
| Page Object Models | `pages/` directory |
| Hooks (beforeEach) | All spec files |
| Parameterized tests | `sort.spec.ts` |
| Grouping (describe) | All spec files |
| Storage State (auth) | `auth.setup.ts` |
| Environment variables (.env) | All spec files |
| Multi-browser testing | Chrome + Firefox |
| Assertions (expect) | All spec files |
| Screenshots on failure | `playwright.config.ts` |
| HTML Reporter | `playwright.config.ts` |

---

## 📊 Test Results

- ✅ Total: 45 tests
- 🌐 Browsers: Chrome + Firefox
- ⏱️ Duration: ~4 minutes