# Playwright Scripts Quick Reference

## 🚀 One-Command Test Execution

### Run Tests + View Report (All-in-One)
```bash
npm test && npm run report
```
✅ Runs all tests → Opens HTML report automatically

---

## 📋 All Available Commands

### Test Execution
```bash
npm test                    # Run all tests
npm run test:fixtures       # Run fixture-based tests only
npm run test:pom            # Run basic POM tests only
```

### Interactive Testing
```bash
npm run test:ui             # Live test execution (best for development)
npm run test:debug          # Step-through debugging with inspector
npm run test:headed         # Tests with visible browser windows
```

### Reporting
```bash
npm run report              # View the latest test report
npm run report:open         # Open report directory
```

---

## 🎯 Recommended Workflows

| Use Case | Command |
|----------|---------|
| **First Time / Quick Check** | `npm test && npm run report` |
| **Development & Debugging** | `npm run test:ui` |
| **Troubleshoot Failures** | `npm run test:debug` |
| **Check Visual Behavior** | `npm run test:headed` |
| **Modern Tests Only** | `npm run test:fixtures && npm run report` |

---

## ⚡ Quick Tips

- 🎬 **test:ui** shows live execution with time-travel debuggingbest for development
- 🔧 **test:debug** pauses at breakpoints for inspection
- 👁️ **test:headed** lets you see the browser (normally hidden)
- 📊 **report** auto-opens after test runs

---

## 📊 Expected Output

```
 Testing → 56 tests across all browsers
✓ 56 passed (2m 34s)
📄 HTML Report: playwright-report/index.html
```

Click "npm run report" to view detailed results with:
- ✅ Pass/Fail status
- 🎥 Screenshots at each step
- ⏱️ Test timing
- 📝 Logs & traces
