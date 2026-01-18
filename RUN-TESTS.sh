#!/bin/bash
# Playwright Test Commands - Copy and paste these directly into your terminal

# ========================================
# MOST COMMON USAGE
# ========================================

# Run all tests and see the report
npm test && npm run report

# ========================================
# BASIC TEST COMMANDS
# ========================================

# Run all tests
npm test

# Run only fixture-based tests (modern approach)
npm run test:fixtures

# Run only basic POM tests
npm run test:pom

# ========================================
# INTERACTIVE TESTING (Best for Development)
# ========================================

# Live test execution with UI - RECOMMENDED
npm run test:ui

# Debug mode - step through tests with inspector
npm run test:debug

# Headed mode - see the browser while tests run
npm run test:headed

# ========================================
# REPORT VIEWING
# ========================================

# View the latest test report
npm run report

# Open the report directory
npm run report:open

# ========================================
# COMBINED WORKFLOWS
# ========================================

# Run tests and show report
npm test && npm run report

# Run fixture tests with report
npm run test:fixtures && npm run report

# Run in headed mode with report
npm run test:headed && npm run report

# ========================================
# TIPS & TRICKS
# ========================================

# Run specific test file directly (without npm)
npx playwright test e2e/saucedemo-pom-fixtures.spec.ts

# Run with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests matching a pattern
npx playwright test -g "authentication"

# Run tests in headed mode with traces
npx playwright test --headed --trace on

# Update snapshots
npx playwright test --update-snapshots

# ========================================
# FOR CONTINUOUS INTEGRATION (CI/CD)
# ========================================

# Run tests in CI mode (parallel, faster)
npx playwright test --workers=4

# Generate test report for CI
npm test

# ========================================
# TROUBLESHOOTING
# ========================================

# Kill any running test processes
pkill -f playwright

# Clear Playwright cache
rm -rf ~/.cache/ms-playwright

# Install browsers again
npx playwright install

# ========================================
# KEYBOARD SHORTCUTS IN UI MODE
# ========================================

# When running "npm run test:ui":
# Space      - Play/Pause execution
# Step Over  - Execute next line
# Step Into  - Dive into function calls
# Step Out   - Exit current function

# ========================================
# EXPECTED OUTPUT
# ========================================

# After running tests, you'll see:
# ✓ 56 passed (2m 34s)
# ✓ 2 skipped
# 
# HTML Report: playwright-report/index.html
