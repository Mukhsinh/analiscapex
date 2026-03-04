# Checklist Testing Visualisasi Grafik di PDF Export
**Tanggal:** 3 Maret 2026  
**Tujuan:** Memastikan grafik visualisasi muncul dengan benar di PDF

## 🎯 Persiapan Testing

### 1. Environment Setup
- [ ] Aplikasi berjalan di `http://localhost:5173`
- [ ] Database Supabase terkoneksi
- [ ] Browser modern (Chrome/Edge/Firefox) terbuka
- [ ] Console browser terbuka untuk monitoring

### 2. Data Testing
- [ ] User sudah login
- [ ] Data Leasing sudah terisi
- [ ] Data Purchase sudah terisi
- [ ] Data Revenue Sharing sudah terisi

## 📝 Langkah Testing

### Test Case 1: Export PDF dengan Grafik Lengkap

#### Langkah-langkah:
1. [ ] Login ke aplikasi
2. [ ] Buka menu "Analisis Capex"
3. [ ] Isi data di form Leasing:
   - Annual Payment: 280,000,000
   - Period: 5 tahun
   - Discount Rate: 10%
4. [ ] Isi data di form Purchase:
   - Loan Amount: 1,300,000,000
   - Interest Rate: 10%
   - Period: 5 tahun
   - Maintenance: 12,000,000
   - Residual Value: 130,000,000
   - Discount Rate: 10%
5. [ ] Isi data di form Revenue Sharing:
   - Method: Percentage
   - RS Share: 25%
   - Direct Overhead: 5,000,000,000
   - Allocated Overhead: 370,760,000
   - Tax Rate: 13%
   - Period: 5 tahun
6. [ ] Klik "Hitung & Bandingkan Semua Alternatif"
7. [ ] Tunggu hasil muncul
8. [ ] Buka menu "Laporan & Grafik"
9. [ ] Verifikasi grafik muncul di halaman:
   - [ ] Grafik Trend Line
   - [ ] Grafik Score Doughnut
   - [ ] Grafik Radar
10. [ ] Kembali ke menu "Analisis Capex"
11. [ ] Klik tombol "Unduh PDF"
12. [ ] Perhatikan loading indicator:
    - [ ] Spinner muncul
    - [ ] Status berubah-ubah
    - [ ] Substatus informatif
13. [ ] Tunggu PDF selesai diunduh
14. [ ] Buka PDF yang diunduh

#### Verifikasi PDF:
- [ ] **Halaman 1:** Cover dan Ringkasan
  - [ ] Header biru dengan judul
  - [ ] Info box dengan tanggal dan discount rate
  - [ ] Tabel ringkasan perbandingan
  - [ ] Statistik komparatif
  - [ ] Box rekomendasi hijau

- [ ] **Halaman 2:** Detail Leasing
  - [ ] Judul section
  - [ ] Tabel detail leasing
  - [ ] Total PV di footer tabel

- [ ] **Halaman 3:** Detail Purchase
  - [ ] Judul section
  - [ ] Tabel detail purchase
  - [ ] Trade-in value
  - [ ] Total net PV

- [ ] **Halaman 4:** Detail Revenue Sharing
  - [ ] Judul section
  - [ ] Tabel detail revenue sharing
  - [ ] Total PV

- [ ] **Halaman 5:** Visualisasi Grafik (FOKUS TESTING)
  - [ ] Judul "5. VISUALISASI & GRAFIK ANALISIS"
  - [ ] **Section 5.1:** Grafik Trend PV Expense
    - [ ] Grafik muncul
    - [ ] Grafik jelas (tidak blur)
    - [ ] Legend terbaca
    - [ ] Axis labels terbaca
    - [ ] 3 line (Leasing, Purchase, Revenue Share)
  - [ ] **Section 5.2:** Grafik Score
    - [ ] Grafik muncul
    - [ ] Grafik jelas
    - [ ] Legend terbaca
    - [ ] 3 segment dengan warna berbeda

- [ ] **Halaman 6:** Grafik Radar
  - [ ] **Section 5.3:** Grafik Radar Multi-Kriteria
    - [ ] Grafik muncul
    - [ ] Grafik jelas
    - [ ] Legend terbaca
    - [ ] 5 axis labels terbaca
    - [ ] 3 dataset terlihat
  - [ ] Interpretasi grafik ditampilkan

- [ ] **Footer di setiap halaman:**
  - [ ] Copyright text
  - [ ] Nomor halaman

#### Console Verification:
- [ ] Log "Starting chart capture process..."
- [ ] Log "Scrolled to analytics section"
- [ ] Log "Canvas found for Trend Chart..."
- [ ] Log "Successfully captured Trend Chart"
- [ ] Log "Trend chart added to PDF"
- [ ] Log "Successfully captured Score Chart"
- [ ] Log "Score chart added to PDF"
- [ ] Log "Successfully captured Radar Chart"
- [ ] Log "Radar chart added to PDF"
- [ ] Log "All charts processed successfully"
- [ ] Log "PDF komprehensif berhasil dibuat..."

### Test Case 2: Export PDF dengan Data Minimal

#### Langkah-langkah:
1. [ ] Gunakan data minimal (1 tahun, 1 procedure)
2. [ ] Lakukan perhitungan
3. [ ] Export PDF
4. [ ] Verifikasi grafik tetap muncul

#### Expected Result:
- [ ] PDF berhasil dibuat
- [ ] Grafik muncul meski data minimal
- [ ] Tidak ada error di console

### Test Case 3: Export PDF dengan Data Maksimal

#### Langkah-langkah:
1. [ ] Gunakan data maksimal (10 tahun, banyak procedures)
2. [ ] Lakukan perhitungan
3. [ ] Export PDF
4. [ ] Verifikasi grafik tetap muncul

#### Expected Result:
- [ ] PDF berhasil dibuat
- [ ] Grafik muncul dengan banyak data points
- [ ] Layout tetap rapi
- [ ] Tidak ada overflow

### Test Case 4: Export Tanpa Membuka Laporan Grafik

#### Langkah-langkah:
1. [ ] Login dan isi data
2. [ ] Lakukan perhitungan
3. [ ] **JANGAN** buka menu "Laporan & Grafik"
4. [ ] Langsung klik "Unduh PDF"
5. [ ] Verifikasi grafik

#### Expected Result:
- [ ] PDF berhasil dibuat
- [ ] Grafik tetap muncul (auto-render)
- [ ] Kualitas grafik baik

### Test Case 5: Export Berulang Kali

#### Langkah-langkah:
1. [ ] Export PDF pertama kali
2. [ ] Tunggu selesai
3. [ ] Export PDF kedua kali
4. [ ] Tunggu selesai
5. [ ] Export PDF ketiga kali

#### Expected Result:
- [ ] Semua export berhasil
- [ ] Tidak ada memory leak
- [ ] Grafik konsisten di semua PDF
- [ ] Tidak ada error di console

### Test Case 6: Error Handling

#### Langkah-langkah:
1. [ ] Matikan internet (simulasi)
2. [ ] Coba export PDF
3. [ ] Atau: Minimize browser saat export
4. [ ] Atau: Switch tab saat export

#### Expected Result:
- [ ] PDF tetap dibuat (best effort)
- [ ] Jika grafik gagal, muncul pesan error di PDF
- [ ] Tidak crash aplikasi
- [ ] Error message informatif

## 🔍 Kualitas Grafik

### Checklist Kualitas Visual:
- [ ] **Resolusi:** Grafik tidak blur atau pixelated
- [ ] **Warna:** Warna sesuai dengan di web
- [ ] **Text:** Semua text terbaca jelas
- [ ] **Legend:** Legend lengkap dan jelas
- [ ] **Axis:** Axis labels dan ticks terbaca
- [ ] **Layout:** Grafik tidak terpotong
- [ ] **Spacing:** Spacing antar elemen proporsional
- [ ] **Background:** Background putih bersih

### Checklist Konten:
- [ ] **Data Accuracy:** Data di grafik sesuai dengan perhitungan
- [ ] **Labels:** Semua labels akurat
- [ ] **Colors:** Warna konsisten (Leasing=biru, Purchase=hijau, Revenue=ungu)
- [ ] **Scale:** Scale axis sesuai dengan data

## 📊 Performance Testing

### Waktu Export:
- [ ] Catat waktu mulai export
- [ ] Catat waktu selesai export
- [ ] Total waktu: _______ detik
- [ ] Acceptable: < 15 detik

### Resource Usage:
- [ ] Monitor CPU usage
- [ ] Monitor memory usage
- [ ] Tidak ada memory leak setelah export

## 🐛 Bug Tracking

### Jika Menemukan Bug:

**Bug #1:**
- Deskripsi: _______________________
- Langkah reproduksi: _______________________
- Expected: _______________________
- Actual: _______________________
- Screenshot: _______________________
- Console error: _______________________

**Bug #2:**
- Deskripsi: _______________________
- Langkah reproduksi: _______________________
- Expected: _______________________
- Actual: _______________________
- Screenshot: _______________________
- Console error: _______________________

## ✅ Acceptance Criteria

### Must Have (Wajib):
- [x] Grafik Trend muncul di PDF
- [x] Grafik Score muncul di PDF
- [x] Grafik Radar muncul di PDF
- [x] Kualitas grafik tinggi (tidak blur)
- [x] Loading indicator informatif
- [x] Error handling berfungsi

### Should Have (Sebaiknya):
- [x] Interpretasi grafik ditambahkan
- [x] Logging untuk debugging
- [x] Fallback jika grafik gagal
- [x] Progress indicator detail

### Nice to Have (Bonus):
- [x] Console logging lengkap
- [x] Status update real-time
- [x] Graceful degradation

## 📝 Test Results

### Test Date: _______________________
### Tester: _______________________
### Browser: _______________________
### OS: _______________________

### Summary:
- Total Test Cases: 6
- Passed: _____ / 6
- Failed: _____ / 6
- Blocked: _____ / 6

### Overall Status:
- [ ] ✅ PASS - Semua test berhasil
- [ ] ⚠️ PASS WITH ISSUES - Ada minor issues
- [ ] ❌ FAIL - Ada critical issues

### Notes:
_______________________
_______________________
_______________________

## 🚀 Sign Off

### Developer:
- Name: _______________________
- Date: _______________________
- Signature: _______________________

### Tester:
- Name: _______________________
- Date: _______________________
- Signature: _______________________

### Product Owner:
- Name: _______________________
- Date: _______________________
- Signature: _______________________

---
*Checklist dibuat: 3 Maret 2026*  
*Versi: 1.0*
