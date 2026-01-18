# Running Tests with Playwright

## Quick Start

### Run All Tests
```bash
npm test
```

### Run Tests with Report
```bash
npm test && npm run report
```

## Available Scripts

### Basic Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in the project |
| `npm run test:fixtures` | Run tests using fixtures pattern (POM + Fixtures) |
| `npm run test:pom` | Run tests using basic POM pattern |

### Interactive Test Commands

| Command | Description |
|---------|-------------|
| `npm run test:ui` | Run tests in interactive UI mode (shows live test execution) |
| `npm run test:debug` | Run tests in debug mode (opens Playwright Inspector) |
| `npm run test:headed` | Run tests with browser visible (headless: false) |

### Report Commands

| Command | Description |
|---------|-------------|
| `npm run report` | View the HTML test report from the latest test run |
| `npm run report:open` | Open the report directory directly |

## Recommended Workflows

### 1. **Full Test Run + Report**
```bash
npm test && npm run report
```
Run all tests, then automatically open the HTML report showing results.

### 2. **Interactive Development**
```bash
npm run test:ui
```
Perfect for developing and debugging tests. Shows live test execution with time-travel debugging.

### 3. **Debug Specific Test**
```bash
npm run test:debug
```
Opens Playwright Inspector for step-by-step execution. Great for troubleshooting failing tests.

### 4. **Visual Verification**
```bash
npm run test:headed
```
Runs tests with browsers visible. Useful for watching tests execute and verifying behavior visually.

### 5. **Fixtures-Based Tests Only**
```bash
npm run test:fixtures && npm run report
```
Run only the modern fixture-based tests with report generation.

## Test Report Details

After running tests, the HTML report includes:

- ✅ **Test Results**: Pass/Fail status for each test
- 🎥 **Screenshots**: Captured at key test points
- 📊 **Timing**: Execution time for each test
- 🔄 **Retries**: Information about retried tests
- 📝 **Logs**: Console logs and test details
- 🎬 **Video Traces**: Optional video recordings (if configured)

## Report Location

Test reports are generated in: `playwright-report/`

To view a previous report:
```bash
npm run report
```

## Test Files

| File | Purpose |
|------|---------|
| `e2e/saucedemo-pom-fixtures.spec.ts` | Modern approach: Uses fixtures + POM (recommended) |
| `e2e/saucedemo-pom.spec.ts` | Legacy approach: Basic POM pattern |

## Example Output

```
Running 56 tests across all browsers...

✅ Authentication & User Accounts (6 tests)
✅ Product Browsing & Filtering (8 tests)
✅ Product Details (5 tests)
✅ Shopping Cart Management (8 tests)
✅ Checkout Process (12 tests)
✅ Error Handling (10 tests)
✅ Performance & UX (4 tests)
✅ Logout (3 tests)

📊 Summary: 56 passed, 0 failed in 2m 34s
📄 Report: playwright-report/index.html
```

## Tips

- 💡 Use `npm run test:ui` during development for best experience
- 📱 Tests run in Chrome by default (configure in `playwright.config.ts`)
- 🔐 Credentials are loaded from `e2e/testdata/credentials.json`
- 📦 Test data is managed in JSON files for easy updates
- ⚡ Tests use Page Object Model for maintainability

## Troubleshooting

### Port Already in Use
If you see "Port already in use" error, the previous test process might still be running:
```bash
# Kill any running test processes
pkill -f playwright
```

### Report Not Opening
Manually open the report:
```bash
open playwright-report/index.html
```

### Tests Timing Out
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds per test
```

## Next Steps

1. ✅ Run tests: `npm test`
2. ✅ View report: `npm run report`
3. ✅ Try interactive mode: `npm run test:ui`
4. ✅ Debug failing tests: `npm run test:debug`
