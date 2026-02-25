# Testing Guide - Aplikasi Capex Analysis

## 🧪 Test Cases

### 1. Test Perhitungan Leasing

**Input:**
- Monthly Payment: 280 juta
- Period: 60 bulan
- Discount Rate: 10%

**Expected Output:**
- Total PV Expense: ~1,061.42 juta Rp
- Yearly Data: 5 tahun dengan PV menurun setiap tahun

**Validasi:**
- PV Factor tahun 1: 0.909091
- PV Expense tahun 1: 254.545455 juta
- Total harus match dengan Excel

### 2. Test Perhitungan Borrow & Purchase

**Input:**
- Loan Amount: 1,300 juta
- Interest Rate: 10%
- Period: 5 tahun
- Maintenance: 20 juta/tahun
- Residual Value: 130 juta
- Discount Rate: 10%

**Expected Output:**
- Total PV Expense: ~1,275.42 juta Rp
- Interest declining setiap tahun
- Trade-in mengurangi total PV

**Validasi:**
- Interest tahun 1: 130 juta (1300 × 10%)
- Interest tahun 2: 104 juta (1040 × 10%)
- Principal payment konstan: 260 juta/tahun

### 3. Test Perhitungan Revenue Sharing

**Input:**
- Tariff: 150,000
- RS Share: 15%
- Projected Volume: 9,180
- Direct Overhead: 1,632 juta
- Allocated Overhead: 240 juta
- Tax Rate: 15%
- Discount Rate: 10%
- Period: 5 tahun

**Expected Output:**
- Annual Revenue: ~206.55 juta
- Operating Profit: Negatif (revenue < overhead)
- EAT: Negatif
- Total PV Expense: ~1,449.98 juta (tertinggi)

**Validasi:**
- Revenue = 150,000 × 0.15 × 9,180 / 1,000,000
- Operating Profit = Revenue - 1,632 - 240
- EAT = Operating Profit × (1 - 0.15)

### 4. Test Perbandingan Alternatif

**Expected Ranking:**
1. Leasing: ~1,061.42 juta (TERBAIK)
2. Borrow & Purchase: ~1,275.42 juta
3. Revenue Sharing: ~1,449.98 juta (TERBURUK)

**Validasi:**
- Rekomendasi harus menunjuk ke Leasing
- Warning untuk Revenue Sharing (negative EAT)
- Chart menampilkan 3 bar dengan tinggi berbeda

## 🔍 Manual Testing Checklist

### UI/UX Testing

- [ ] **Layout Responsive**
  - [ ] Desktop (1920×1080)
  - [ ] Laptop (1366×768)
  - [ ] Tablet (768×1024)
  - [ ] Mobile (375×667)

- [ ] **Form Input**
  - [ ] Semua field dapat diisi
  - [ ] Validasi input (hanya angka)
  - [ ] Placeholder text jelas
  - [ ] Label informatif

- [ ] **Tab Navigation**
  - [ ] Klik tab Leasing
  - [ ] Klik tab Borrow & Purchase
  - [ ] Klik tab Revenue Sharing
  - [ ] Active state terlihat jelas

- [ ] **Button Interaction**
  - [ ] Hover effect
  - [ ] Click feedback
  - [ ] Disabled state (jika ada)

### Functional Testing

- [ ] **Perhitungan**
  - [ ] Input default menghasilkan hasil yang benar
  - [ ] Ubah nilai, hasil berubah sesuai
  - [ ] Perhitungan match dengan Excel
  - [ ] PV Factor dihitung dengan benar

- [ ] **Hasil Display**
  - [ ] Summary cards menampilkan angka benar
  - [ ] Chart ter-render dengan benar
  - [ ] Tabel detail lengkap
  - [ ] Rekomendasi sesuai dengan ranking

- [ ] **Export Functionality**
  - [ ] Export CSV berhasil
  - [ ] Export JSON berhasil
  - [ ] Print/PDF berfungsi
  - [ ] File name dengan timestamp

### Edge Cases

- [ ] **Input Ekstrem**
  - [ ] Nilai 0
  - [ ] Nilai sangat besar (999,999)
  - [ ] Nilai negatif (harus ditolak)
  - [ ] Decimal numbers

- [ ] **Skenario Khusus**
  - [ ] Revenue Sharing dengan volume tinggi (profitable)
  - [ ] Revenue Sharing dengan volume rendah (loss)
  - [ ] Discount rate 0%
  - [ ] Discount rate 100%

### Browser Compatibility

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

### Performance Testing

- [ ] **Load Time**
  - [ ] Initial load < 3 detik
  - [ ] Calculation < 1 detik
  - [ ] Chart render < 2 detik

- [ ] **Lighthouse Score**
  - [ ] Performance: > 90
  - [ ] Accessibility: > 90
  - [ ] Best Practices: > 90
  - [ ] SEO: > 90

## 🐛 Bug Report Template

```markdown
**Bug Title:** [Deskripsi singkat]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**


**Actual Result:**


**Screenshots:**


**Environment:**
- Browser: 
- OS: 
- Screen Size: 

**Additional Notes:**

```

## ✅ Test Results Log

### Test Run: [Date]

| Test Case | Status | Notes |
|-----------|--------|-------|
| Leasing Calculation | ✅ Pass | Match dengan Excel |
| Purchase Calculation | ✅ Pass | Interest declining benar |
| Revenue Share Calculation | ✅ Pass | Negative EAT detected |
| Comparison Ranking | ✅ Pass | Leasing ranked #1 |
| Export CSV | ✅ Pass | File downloaded |
| Export JSON | ✅ Pass | Valid JSON format |
| Print/PDF | ✅ Pass | Layout preserved |
| Responsive Mobile | ✅ Pass | All features accessible |
| Chart Display | ✅ Pass | Data visualized correctly |
| Form Validation | ⚠️ Warning | Need better error messages |

## 🔄 Regression Testing

Setelah setiap update, test ulang:
1. Core calculations (3 alternatif)
2. Export functionality
3. Responsive layout
4. Browser compatibility

## 📊 Test Coverage

Target coverage:
- Unit tests: 80%
- Integration tests: 60%
- E2E tests: Critical paths

## 🚀 Automated Testing (Future)

### Unit Tests (Jest + React Testing Library)

```javascript
describe('Calculations', () => {
  test('calculateLeasing returns correct PV', () => {
    const data = {
      monthlyPayment: 280,
      period: 60,
      discountRate: 10
    }
    const result = calculateLeasing(data)
    expect(result.totalPV).toBeCloseTo(1061.42, 2)
  })
})
```

### E2E Tests (Playwright/Cypress)

```javascript
test('Complete analysis flow', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.fill('[name="monthlyPayment"]', '280')
  await page.click('button:has-text("Hitung")')
  await expect(page.locator('.recommendation')).toContainText('Leasing')
})
```

## 📝 Test Documentation

Simpan hasil testing di:
- `test-results/` folder
- Screenshots di `test-screenshots/`
- Video recordings (untuk E2E)

---

**Last Updated:** 2026-02-25  
**Tested By:** QA Team  
**Version:** 1.0.0
