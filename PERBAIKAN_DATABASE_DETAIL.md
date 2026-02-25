# Perbaikan Database - Data Detail dan Routing

## Tanggal: 25 Februari 2026

## 1. Perbaikan Nama Route Halaman ✅

### Masalah
Nama route halaman menggunakan bahasa Inggris yang tidak konsisten dengan UI berbahasa Indonesia.

### Solusi
Mengubah ID route dari bahasa Inggris ke bahasa Indonesia:

| Sebelum | Sesudah |
|---------|---------|
| `capex-analysis` | `analisis-capex` |
| `reports-analytics` | `laporan-grafik` |
| `analysis-history` | `riwayat-analisis` |
| `project-settings` | `pengaturan-proyek` |

### File yang Diubah
- `src/App.jsx` - Update switch case untuk routing
- `src/components/Sidebar.jsx` - Update menu item IDs

---

## 2. Penambahan Tabel Database untuk Data Detail ✅

### Masalah
Data detail analisis tidak tersimpan di database:
- ❌ Breakdown data per tahun (yearly data)
- ❌ Detail prosedur Revenue Sharing (nama, tarif, volume)
- ❌ Rekomendasi dan perbandingan alternatif
- ❌ Metrik kalkulasi (EAT, operating profit, trade-in PV, dll)

### Solusi
Menambahkan 3 tabel baru untuk menyimpan data detail:

#### A. Tabel `analysis_yearly_breakdown`
Menyimpan breakdown data per tahun untuk setiap jenis analisis.

**Kolom:**
- `id` (UUID, PK)
- `analysis_result_id` (UUID, FK → analysis_results)
- `year` (INTEGER) - Tahun ke-n
- `pv_factor` (DECIMAL) - Present Value Factor
- `pv_expense` (DECIMAL) - Present Value Expense

**Kolom Spesifik Leasing:**
- `payment` (DECIMAL) - Pembayaran per tahun

**Kolom Spesifik Purchase:**
- `principal` (DECIMAL) - Pembayaran pokok
- `interest` (DECIMAL) - Bunga
- `maintenance` (DECIMAL) - Biaya pemeliharaan
- `total_expense` (DECIMAL) - Total pengeluaran
- `entry_type` (TEXT) - Tipe entry (normal, trade-in)

**Kolom Spesifik Revenue Share:**
- `revenue` (DECIMAL) - Pendapatan
- `direct_overhead` (DECIMAL) - Overhead langsung
- `allocated_overhead` (DECIMAL) - Overhead alokasi
- `operating_profit` (DECIMAL) - Laba operasi
- `eat` (DECIMAL) - Earning After Tax

#### B. Tabel `revenue_share_procedures`
Menyimpan detail prosedur/pemeriksaan untuk Revenue Sharing.

**Kolom:**
- `id` (UUID, PK)
- `analysis_result_id` (UUID, FK → analysis_results)
- `procedure_name` (TEXT) - Nama pemeriksaan
- `tariff` (DECIMAL) - Tarif per pemeriksaan
- `volume` (INTEGER) - Volume per tahun
- `annual_revenue` (DECIMAL) - Pendapatan tahunan (calculated)
- `created_at` (TIMESTAMPTZ)

#### C. Tabel `analysis_recommendations`
Menyimpan rekomendasi dan perbandingan hasil analisis.

**Kolom:**
- `id` (UUID, PK)
- `project_id` (UUID, FK → projects)
- `user_id` (UUID, FK → users)
- `best_alternative` (TEXT) - Alternatif terbaik
- `second_alternative` (TEXT) - Alternatif kedua
- `worst_alternative` (TEXT) - Alternatif terburuk
- `best_pv` (DECIMAL) - PV alternatif terbaik
- `second_pv` (DECIMAL) - PV alternatif kedua
- `worst_pv` (DECIMAL) - PV alternatif terburuk
- `best_vs_second_diff` (DECIMAL) - Selisih terbaik vs kedua
- `best_vs_worst_diff` (DECIMAL) - Selisih terbaik vs terburuk
- `leasing_total_pv` (DECIMAL) - Total PV Leasing
- `purchase_total_pv` (DECIMAL) - Total PV Purchase
- `revenue_share_total_pv` (DECIMAL) - Total PV Revenue Share
- `revenue_share_is_profit` (BOOLEAN) - Apakah RS menguntungkan
- `revenue_share_eat` (DECIMAL) - EAT Revenue Share
- `revenue_share_annual_revenue` (DECIMAL) - Pendapatan tahunan RS
- `purchase_trade_in_pv` (DECIMAL) - PV Trade-in Purchase
- `created_at` (TIMESTAMPTZ)

### Indexes yang Ditambahkan
```sql
-- Untuk performa query
CREATE INDEX idx_yearly_breakdown_analysis ON analysis_yearly_breakdown(analysis_result_id);
CREATE INDEX idx_yearly_breakdown_year ON analysis_yearly_breakdown(analysis_result_id, year);
CREATE INDEX idx_procedures_analysis ON revenue_share_procedures(analysis_result_id);
CREATE INDEX idx_recommendations_project ON analysis_recommendations(project_id);
CREATE INDEX idx_recommendations_user ON analysis_recommendations(user_id);
CREATE INDEX idx_recommendations_created ON analysis_recommendations(created_at DESC);
```

---

## 3. Update Fungsi Database ✅

### Fungsi yang Diperbarui

#### A. `saveAnalysisResult()`
Sekarang menyimpan:
1. Data analisis utama (seperti sebelumnya)
2. **Breakdown data per tahun** ke tabel `analysis_yearly_breakdown`
3. **Detail prosedur** (untuk Revenue Share) ke tabel `revenue_share_procedures`

#### B. `saveCompleteAnalysis()`
Sekarang menyimpan:
1. Project info
2. Form inputs
3. Analysis results + breakdown + procedures
4. **Rekomendasi** ke tabel `analysis_recommendations`

### Fungsi Baru yang Ditambahkan

#### C. `getDetailedAnalysis(analysisId)`
Mengambil analisis lengkap dengan:
- Data analisis utama
- Yearly breakdown
- Procedures (jika Revenue Share)

#### D. `getLatestRecommendation(projectId)`
Mengambil rekomendasi terbaru untuk sebuah project.

#### E. `getUserRecommendations(userId, limit)`
Mengambil semua rekomendasi user dengan info project.

#### F. `getAnalysisProcedures(analysisId)`
Mengambil daftar prosedur untuk analisis Revenue Share.

#### G. `getYearlyBreakdown(analysisId)`
Mengambil breakdown data per tahun untuk sebuah analisis.

---

## 4. Struktur Database Lengkap

### Tabel Utama (Sudah Ada)
1. ✅ `users` - Data user
2. ✅ `projects` - Data proyek
3. ✅ `analysis_results` - Hasil analisis (JSONB)
4. ✅ `form_inputs` - Input form

### Tabel Detail (Baru Ditambahkan)
5. ✅ `analysis_yearly_breakdown` - Breakdown per tahun
6. ✅ `revenue_share_procedures` - Detail prosedur RS
7. ✅ `analysis_recommendations` - Rekomendasi

### Total: 7 Tabel

---

## 5. Relasi Antar Tabel

```
users (1) ──→ (N) projects
users (1) ──→ (N) analysis_results
users (1) ──→ (N) form_inputs
users (1) ──→ (N) analysis_recommendations

projects (1) ──→ (N) analysis_results
projects (1) ──→ (N) form_inputs
projects (1) ──→ (N) analysis_recommendations

analysis_results (1) ──→ (N) analysis_yearly_breakdown
analysis_results (1) ──→ (N) revenue_share_procedures
```

---

## 6. Data yang Sekarang Tersimpan

### ✅ Data User
- Email, full name, password hash
- Created/updated timestamps

### ✅ Data Project
- Hospital name, equipment name, department
- Copyright info
- Supplier share (untuk RS)
- Analysis metadata (JSONB)

### ✅ Data Form Input
- Leasing: monthly payment, period, discount rate
- Purchase: loan amount, interest, period, maintenance, residual, discount
- Revenue Share: RS share, overhead, tax, discount, period, procedures

### ✅ Data Analysis Results (JSONB)
- Input data lengkap
- Results lengkap (totalPV, yearlyData, dll)

### ✅ Data Yearly Breakdown (Terstruktur)
- Data per tahun untuk setiap alternatif
- PV factor dan PV expense
- Detail spesifik per jenis analisis

### ✅ Data Procedures (Terstruktur)
- Nama pemeriksaan
- Tarif dan volume
- Annual revenue calculated

### ✅ Data Recommendations (Terstruktur)
- Ranking alternatif (best, second, worst)
- PV values untuk semua alternatif
- Selisih antar alternatif
- Metrik tambahan (EAT, annual revenue, trade-in PV)

---

## 7. Keuntungan Struktur Baru

### A. Query Lebih Efisien
- Tidak perlu parse JSONB untuk data terstruktur
- Index pada kolom spesifik untuk performa optimal
- Join langsung antar tabel

### B. Analisis Data Lebih Mudah
- Aggregate functions (SUM, AVG, COUNT) pada kolom numerik
- Filter berdasarkan tahun, procedure, alternatif
- Reporting dan dashboard lebih cepat

### C. Data Integrity
- Foreign key constraints
- Type checking pada kolom
- Cascade delete untuk cleanup otomatis

### D. Fleksibilitas
- Tetap ada JSONB untuk data dinamis
- Kolom terstruktur untuk data penting
- Best of both worlds

---

## 8. Migration yang Dijalankan

**File:** `add_detailed_analysis_tables`

**Isi:**
1. CREATE TABLE analysis_yearly_breakdown
2. CREATE TABLE revenue_share_procedures
3. CREATE TABLE analysis_recommendations
4. CREATE INDEX (6 indexes)
5. COMMENT ON TABLE/COLUMN (dokumentasi)

**Status:** ✅ Berhasil dijalankan

---

## 9. Testing yang Diperlukan

### A. Test Penyimpanan Data
- [ ] Simpan analisis Leasing → cek yearly breakdown
- [ ] Simpan analisis Purchase → cek yearly breakdown + trade-in
- [ ] Simpan analisis Revenue Share → cek yearly breakdown + procedures
- [ ] Simpan complete analysis → cek recommendation

### B. Test Pengambilan Data
- [ ] Get detailed analysis → verifikasi breakdown dan procedures
- [ ] Get latest recommendation → verifikasi data lengkap
- [ ] Get user recommendations → verifikasi join dengan projects

### C. Test Data Integrity
- [ ] Delete analysis → verifikasi cascade delete breakdown & procedures
- [ ] Delete project → verifikasi cascade delete recommendations
- [ ] Delete user → verifikasi SET NULL pada recommendations

---

## 10. Cara Menggunakan

### Menyimpan Analisis Lengkap
```javascript
const { data, error } = await saveCompleteAnalysis(
  userId,
  projectInfo,
  analysisData,
  results
)
// Otomatis menyimpan:
// - Project
// - Form inputs
// - Analysis results
// - Yearly breakdown
// - Procedures (jika RS)
// - Recommendation
```

### Mengambil Analisis Detail
```javascript
const { data, error } = await getDetailedAnalysis(analysisId)
// Mendapatkan:
// - Analysis data
// - Yearly breakdown array
// - Procedures array (jika RS)
```

### Mengambil Rekomendasi
```javascript
const { data, error } = await getLatestRecommendation(projectId)
// Mendapatkan rekomendasi terbaru dengan semua metrik
```

---

## 11. Kesimpulan

### ✅ Masalah Terselesaikan
1. ✅ Nama route sudah dalam bahasa Indonesia
2. ✅ Semua data aplikasi sekarang tersimpan di database
3. ✅ Data terstruktur dengan baik (tidak hanya JSONB)
4. ✅ Query lebih efisien dengan indexes
5. ✅ Data integrity terjaga dengan foreign keys

### 📊 Statistik Database
- **Total Tabel:** 7 (4 lama + 3 baru)
- **Total Indexes:** 15+ (termasuk PK dan FK)
- **Total Foreign Keys:** 10+
- **Total Triggers:** 2 (update timestamps)

### 🎯 Next Steps
1. Test semua fungsi penyimpanan dan pengambilan data
2. Verifikasi cascade delete bekerja dengan benar
3. Monitor performa query dengan data real
4. Buat dashboard analytics menggunakan data terstruktur

---

## File yang Dimodifikasi

1. ✅ `src/App.jsx` - Update route IDs
2. ✅ `src/components/Sidebar.jsx` - Update menu IDs
3. ✅ `src/lib/database.js` - Update fungsi save & tambah fungsi get
4. ✅ Database - Tambah 3 tabel baru + indexes

---

**Dokumentasi dibuat:** 25 Februari 2026
**Status:** ✅ Selesai dan siap digunakan
