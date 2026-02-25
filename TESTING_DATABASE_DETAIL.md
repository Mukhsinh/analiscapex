# Testing Database Detail - Checklist

## Tanggal: 25 Februari 2026

## 1. Test Penyimpanan Data

### A. Test Leasing Analysis ⏳
```javascript
// Test case: Simpan analisis Leasing
const leasingData = {
  monthlyPayment: 280,
  period: 60,
  discountRate: 10
}

// Expected:
// 1. Data tersimpan di analysis_results
// 2. Yearly breakdown tersimpan (5 tahun)
// 3. Setiap row memiliki: year, payment, pv_factor, pv_expense
```

**Verifikasi:**
- [ ] Check `analysis_results` table - 1 row baru
- [ ] Check `analysis_yearly_breakdown` table - 5 rows baru
- [ ] Verify `payment` column terisi
- [ ] Verify `pv_factor` dan `pv_expense` calculated correctly

### B. Test Purchase Analysis ⏳
```javascript
// Test case: Simpan analisis Purchase
const purchaseData = {
  loanAmount: 1300,
  interestRate: 10,
  period: 5,
  maintenanceCost: 20,
  residualValue: 130,
  discountRate: 10
}

// Expected:
// 1. Data tersimpan di analysis_results
// 2. Yearly breakdown tersimpan (5 tahun + 1 trade-in)
// 3. Setiap row memiliki: principal, interest, maintenance, total_expense
// 4. Trade-in row memiliki entry_type = 'trade-in'
```

**Verifikasi:**
- [ ] Check `analysis_results` table - 1 row baru
- [ ] Check `analysis_yearly_breakdown` table - 6 rows baru (5 normal + 1 trade-in)
- [ ] Verify `principal`, `interest`, `maintenance` columns terisi
- [ ] Verify trade-in row memiliki `entry_type = 'Trade-in'`

### C. Test Revenue Share Analysis ⏳
```javascript
// Test case: Simpan analisis Revenue Share
const revenueShareData = {
  rsShare: 15,
  supplierShare: 85,
  directOverhead: 1632,
  allocatedOverhead: 240,
  taxRate: 15,
  discountRate: 10,
  period: 5,
  procedures: [
    { id: 1, name: 'Darah Rutin', tariff: 150000, volume: 68664 },
    { id: 2, name: 'Creatinin', tariff: 150000, volume: 32208 },
    { id: 3, name: 'Urea / BUN', tariff: 150000, volume: 30624 }
  ]
}

// Expected:
// 1. Data tersimpan di analysis_results
// 2. Yearly breakdown tersimpan (5 tahun)
// 3. Procedures tersimpan (3 rows)
// 4. Setiap yearly row memiliki: revenue, overhead, eat
```

**Verifikasi:**
- [ ] Check `analysis_results` table - 1 row baru
- [ ] Check `analysis_yearly_breakdown` table - 5 rows baru
- [ ] Check `revenue_share_procedures` table - 3 rows baru
- [ ] Verify `revenue`, `direct_overhead`, `allocated_overhead`, `eat` columns terisi
- [ ] Verify procedures memiliki `procedure_name`, `tariff`, `volume`, `annual_revenue`

### D. Test Complete Analysis ⏳
```javascript
// Test case: Simpan complete analysis (semua 3 alternatif)
await saveCompleteAnalysis(userId, projectInfo, analysisData, results)

// Expected:
// 1. Project tersimpan/updated
// 2. 3 form inputs tersimpan (leasing, purchase, revenueShare)
// 3. 3 analysis results tersimpan
// 4. Yearly breakdowns tersimpan untuk semua
// 5. Procedures tersimpan (untuk RS)
// 6. Recommendation tersimpan
```

**Verifikasi:**
- [ ] Check `projects` table - 1 row baru/updated
- [ ] Check `form_inputs` table - 3 rows baru
- [ ] Check `analysis_results` table - 3 rows baru
- [ ] Check `analysis_yearly_breakdown` table - 16 rows baru (5+6+5)
- [ ] Check `revenue_share_procedures` table - 3 rows baru
- [ ] Check `analysis_recommendations` table - 1 row baru

---

## 2. Test Pengambilan Data

### A. Test getDetailedAnalysis() ⏳
```javascript
const { data, error } = await getDetailedAnalysis(analysisId)

// Expected:
// - data.analysis_type
// - data.input_data
// - data.results
// - data.yearlyBreakdown (array)
// - data.procedures (array, jika RS)
```

**Verifikasi:**
- [ ] Data analysis lengkap
- [ ] yearlyBreakdown adalah array dengan data per tahun
- [ ] procedures adalah array (jika Revenue Share)
- [ ] Semua field terisi dengan benar

### B. Test getLatestRecommendation() ⏳
```javascript
const { data, error } = await getLatestRecommendation(projectId)

// Expected:
// - data.best_alternative
// - data.best_pv, second_pv, worst_pv
// - data.best_vs_second_diff, best_vs_worst_diff
// - data.leasing_total_pv, purchase_total_pv, revenue_share_total_pv
// - data.revenue_share_eat, revenue_share_annual_revenue
```

**Verifikasi:**
- [ ] Recommendation data lengkap
- [ ] Ranking benar (best < second < worst)
- [ ] Differences calculated correctly
- [ ] All PV values present

### C. Test getUserRecommendations() ⏳
```javascript
const { data, error } = await getUserRecommendations(userId, 10)

// Expected:
// - Array of recommendations
// - Each with project info (hospital_name, equipment_name)
// - Sorted by created_at DESC
```

**Verifikasi:**
- [ ] Array of recommendations
- [ ] Join dengan projects berhasil
- [ ] Sorted by date (newest first)

### D. Test getAnalysisProcedures() ⏳
```javascript
const { data, error } = await getAnalysisProcedures(analysisId)

// Expected:
// - Array of procedures
// - Each with: procedure_name, tariff, volume, annual_revenue
```

**Verifikasi:**
- [ ] Array of procedures
- [ ] All fields present
- [ ] annual_revenue calculated correctly

### E. Test getYearlyBreakdown() ⏳
```javascript
const { data, error } = await getYearlyBreakdown(analysisId)

// Expected:
// - Array of yearly data
// - Sorted by year ASC
// - Type-specific fields populated
```

**Verifikasi:**
- [ ] Array of yearly data
- [ ] Sorted by year (1, 2, 3, ...)
- [ ] Correct fields for analysis type

---

## 3. Test Data Integrity

### A. Test Cascade Delete - Analysis Result ⏳
```sql
-- Delete analysis result
DELETE FROM analysis_results WHERE id = 'xxx';

-- Expected:
-- 1. analysis_yearly_breakdown rows deleted (CASCADE)
-- 2. revenue_share_procedures rows deleted (CASCADE)
```

**Verifikasi:**
- [ ] Delete analysis result
- [ ] Check yearly breakdown - should be deleted
- [ ] Check procedures - should be deleted

### B. Test Cascade Delete - Project ⏳
```sql
-- Delete project
DELETE FROM projects WHERE id = 'xxx';

-- Expected:
-- 1. analysis_results deleted (CASCADE)
-- 2. analysis_yearly_breakdown deleted (CASCADE via analysis_results)
-- 3. revenue_share_procedures deleted (CASCADE via analysis_results)
-- 4. analysis_recommendations deleted (CASCADE)
-- 5. form_inputs deleted (CASCADE)
```

**Verifikasi:**
- [ ] Delete project
- [ ] Check analysis_results - should be deleted
- [ ] Check yearly breakdown - should be deleted
- [ ] Check procedures - should be deleted
- [ ] Check recommendations - should be deleted
- [ ] Check form_inputs - should be deleted

### C. Test SET NULL - User Delete ⏳
```sql
-- Delete user
DELETE FROM users WHERE id = 'xxx';

-- Expected:
-- 1. projects.user_id = NULL (SET NULL)
-- 2. analysis_recommendations.user_id = NULL (SET NULL)
-- 3. Data tetap ada, hanya user_id yang NULL
```

**Verifikasi:**
- [ ] Delete user
- [ ] Check projects - should exist with user_id = NULL
- [ ] Check recommendations - should exist with user_id = NULL

---

## 4. Test Performa Query

### A. Test Query dengan Index ⏳
```sql
-- Query 1: Get yearly breakdown by analysis
SELECT * FROM analysis_yearly_breakdown 
WHERE analysis_result_id = 'xxx'
ORDER BY year;

-- Query 2: Get procedures by analysis
SELECT * FROM revenue_share_procedures 
WHERE analysis_result_id = 'xxx';

-- Query 3: Get recommendations by user
SELECT * FROM analysis_recommendations 
WHERE user_id = 'xxx'
ORDER BY created_at DESC;
```

**Verifikasi:**
- [ ] Query 1 menggunakan index `idx_yearly_breakdown_analysis`
- [ ] Query 2 menggunakan index `idx_procedures_analysis`
- [ ] Query 3 menggunakan index `idx_recommendations_user` dan `idx_recommendations_created`
- [ ] Execution time < 10ms untuk dataset kecil

### B. Test Join Performance ⏳
```sql
-- Complex join query
SELECT 
  ar.*,
  ayb.*,
  rsp.*
FROM analysis_results ar
LEFT JOIN analysis_yearly_breakdown ayb ON ar.id = ayb.analysis_result_id
LEFT JOIN revenue_share_procedures rsp ON ar.id = rsp.analysis_result_id
WHERE ar.user_id = 'xxx'
ORDER BY ar.created_at DESC, ayb.year;
```

**Verifikasi:**
- [ ] Query berhasil
- [ ] Data joined correctly
- [ ] Performance acceptable

---

## 5. Test Edge Cases

### A. Test Empty Procedures ⏳
```javascript
// Revenue Share dengan 0 procedures
const revenueShareData = {
  rsShare: 15,
  procedures: []
}
```

**Verifikasi:**
- [ ] Analysis tersimpan
- [ ] Tidak ada error saat save
- [ ] revenue_share_procedures table tidak ada row baru

### B. Test Negative Values ⏳
```javascript
// Revenue Share dengan kerugian (negative EAT)
const revenueShareData = {
  rsShare: 15,
  directOverhead: 5000, // Sangat tinggi
  allocatedOverhead: 1000,
  // Revenue < Overhead = Rugi
}
```

**Verifikasi:**
- [ ] Analysis tersimpan
- [ ] EAT negative tersimpan dengan benar
- [ ] revenue_share_is_profit = false

### C. Test Large Dataset ⏳
```javascript
// Revenue Share dengan banyak procedures
const procedures = []
for (let i = 0; i < 100; i++) {
  procedures.push({
    id: i,
    name: `Procedure ${i}`,
    tariff: 150000,
    volume: 1000
  })
}
```

**Verifikasi:**
- [ ] Semua 100 procedures tersimpan
- [ ] Performance masih acceptable
- [ ] No timeout errors

---

## 6. Test SQL Queries Manual

### A. Verify Table Structure ✅
```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'analysis_yearly_breakdown',
    'revenue_share_procedures',
    'analysis_recommendations'
  );
```

**Expected:** 3 rows

### B. Verify Indexes ✅
```sql
-- Check indexes exist
SELECT indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN (
    'analysis_yearly_breakdown',
    'revenue_share_procedures',
    'analysis_recommendations'
  );
```

**Expected:** 6 indexes

### C. Verify Foreign Keys ✅
```sql
-- Check foreign keys
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name IN (
    'analysis_yearly_breakdown',
    'revenue_share_procedures',
    'analysis_recommendations'
  );
```

**Expected:** 5 foreign keys

---

## 7. Test Aplikasi End-to-End

### A. Test Flow Lengkap ⏳
1. [ ] Login user
2. [ ] Buat project baru
3. [ ] Input data Leasing
4. [ ] Input data Purchase
5. [ ] Input data Revenue Share (dengan 3 procedures)
6. [ ] Klik "Hitung & Bandingkan"
7. [ ] Verifikasi hasil tampil
8. [ ] Check database - semua data tersimpan
9. [ ] Reload page
10. [ ] Verifikasi data masih ada (dari localStorage)
11. [ ] Check Riwayat Analisis
12. [ ] Verifikasi analisis muncul di history

### B. Test Export ⏳
1. [ ] Lakukan analisis
2. [ ] Export ke Excel
3. [ ] Verifikasi file Excel berisi semua data
4. [ ] Verifikasi yearly breakdown ada di Excel
5. [ ] Verifikasi procedures ada di Excel (untuk RS)

---

## 8. Checklist Akhir

### Database Structure ✅
- [x] Tabel `analysis_yearly_breakdown` created
- [x] Tabel `revenue_share_procedures` created
- [x] Tabel `analysis_recommendations` created
- [x] All indexes created
- [x] All foreign keys created
- [x] Comments added

### Code Updates ✅
- [x] `saveAnalysisResult()` updated
- [x] `saveCompleteAnalysis()` updated
- [x] `getDetailedAnalysis()` added
- [x] `getLatestRecommendation()` added
- [x] `getUserRecommendations()` added
- [x] `getAnalysisProcedures()` added
- [x] `getYearlyBreakdown()` added

### Testing ⏳
- [ ] Test penyimpanan Leasing
- [ ] Test penyimpanan Purchase
- [ ] Test penyimpanan Revenue Share
- [ ] Test penyimpanan Complete Analysis
- [ ] Test pengambilan data detail
- [ ] Test cascade delete
- [ ] Test performa query
- [ ] Test edge cases
- [ ] Test end-to-end flow

### Documentation ✅
- [x] PERBAIKAN_DATABASE_DETAIL.md created
- [x] TESTING_DATABASE_DETAIL.md created
- [x] Migration documented
- [x] Functions documented

---

## Cara Menjalankan Testing

### 1. Test Manual di Supabase SQL Editor
```sql
-- Copy paste queries dari section 6
-- Verify results
```

### 2. Test via Aplikasi
```javascript
// Buka browser console
// Run test functions
const result = await saveCompleteAnalysis(...)
console.log(result)
```

### 3. Test via Database Query
```sql
-- Check data after running app
SELECT COUNT(*) FROM analysis_yearly_breakdown;
SELECT COUNT(*) FROM revenue_share_procedures;
SELECT COUNT(*) FROM analysis_recommendations;
```

---

**Status Testing:** ⏳ Menunggu eksekusi
**Tanggal:** 25 Februari 2026
**Next Step:** Jalankan aplikasi dan test semua fungsi
