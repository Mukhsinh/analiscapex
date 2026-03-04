# Checklist Testing - PDF Export Grafik & Discount Rate
**Tanggal:** 3 Maret 2026

## Persiapan Testing

- [ ] Aplikasi sudah running (`npm run dev`)
- [ ] Browser sudah dibuka (Chrome/Edge recommended)
- [ ] Console Developer Tools dibuka (F12)
- [ ] Tidak ada error di console

## Test 1: Discount Rate di PDF

### Langkah Testing
1. [ ] Buka halaman aplikasi
2. [ ] Klik tab "Leasing"
3. [ ] Isi form dengan data:
   - Annual Payment: 280000000
   - Period: 5
   - **Discount Rate: 10**
4. [ ] Klik "Hitung Analisis"
5. [ ] Tunggu hasil muncul
6. [ ] Klik "Unduh PDF"
7. [ ] Tunggu proses download selesai
8. [ ] Buka file PDF yang diunduh

### Verifikasi
- [ ] PDF terbuka tanpa error
- [ ] Halaman 1 menampilkan info box dengan:
  - [ ] Tanggal Laporan: [tanggal hari ini]
  - [ ] Periode Analisis: 5 Tahun
  - [ ] **Discount Rate: 10.00%** ✅ HARUS ADA
- [ ] Nilai discount rate sesuai dengan input (10.00%)

### Hasil Test 1
- [ ] ✅ PASS - Discount rate muncul dengan benar
- [ ] ❌ FAIL - Discount rate tidak muncul / salah

**Catatan:**
```
[Tulis catatan jika ada masalah]
```

---

## Test 2: Grafik di PDF

### Langkah Testing
1. [ ] Pastikan sudah ada hasil analisis (dari Test 1)
2. [ ] Scroll ke bagian "Laporan Analisis & Grafik"
3. [ ] Tunggu 5 detik sampai grafik muncul
4. [ ] Verifikasi 3 grafik terlihat di layar:
   - [ ] Trend PV Expense per Tahun (Line Chart)
   - [ ] Perbandingan Score (Doughnut Chart)
   - [ ] Analisis Multi-Kriteria (Radar Chart)
5. [ ] Klik "Unduh PDF"
6. [ ] Perhatikan loading indicator
7. [ ] Tunggu proses selesai (3-5 detik)
8. [ ] Buka file PDF yang diunduh

### Verifikasi
- [ ] PDF terbuka tanpa error
- [ ] Navigasi ke halaman 5 (Visualisasi & Grafik Analisis)
- [ ] **Grafik 5.1: Trend PV Expense per Tahun** ✅ HARUS ADA
  - [ ] Grafik line chart terlihat jelas
  - [ ] Ada 3 garis (Leasing, Purchase, Revenue Share)
  - [ ] Label sumbu X dan Y terlihat
- [ ] **Grafik 5.2: Perbandingan Score** ✅ HARUS ADA
  - [ ] Grafik doughnut terlihat jelas
  - [ ] Ada 3 segmen dengan warna berbeda
  - [ ] Legend terlihat
- [ ] Navigasi ke halaman 6
- [ ] **Grafik 5.3: Analisis Multi-Kriteria** ✅ HARUS ADA
  - [ ] Grafik radar terlihat jelas
  - [ ] Ada 3 polygon dengan warna berbeda
  - [ ] Label kriteria terlihat

### Hasil Test 2
- [ ] ✅ PASS - Semua grafik muncul dengan benar
- [ ] ⚠️ PARTIAL - Beberapa grafik muncul
- [ ] ❌ FAIL - Grafik tidak muncul

**Grafik yang muncul:**
- [ ] Trend (5.1)
- [ ] Score (5.2)
- [ ] Radar (5.3)

**Catatan:**
```
[Tulis catatan jika ada masalah]
```

---

## Test 3: Console Debugging

### Langkah Testing
1. [ ] Buka Console (F12)
2. [ ] Clear console log
3. [ ] Klik "Unduh PDF"
4. [ ] Perhatikan log yang muncul

### Verifikasi Console Log
Harus muncul log berikut (urutan):
- [ ] "Waiting for charts to render..."
- [ ] "Looking for chart-trend element..."
- [ ] "Trend container found: true"
- [ ] "Capturing trend chart..."
- [ ] "Trend chart captured successfully"
- [ ] "Looking for chart-score element..."
- [ ] "Score container found: true"
- [ ] "Capturing score chart..."
- [ ] "Score chart captured successfully"
- [ ] "Looking for chart-radar element..."
- [ ] "Radar container found: true"
- [ ] "Capturing radar chart..."
- [ ] "Radar chart captured successfully"

### Hasil Test 3
- [ ] ✅ PASS - Semua log muncul dengan benar
- [ ] ⚠️ PARTIAL - Beberapa log muncul
- [ ] ❌ FAIL - Log tidak muncul / ada error

**Error yang muncul:**
```
[Copy paste error dari console jika ada]
```

---

## Test 4: Berbagai Skenario

### Skenario A: Discount Rate Berbeda
1. [ ] Test dengan discount rate 5%
2. [ ] Test dengan discount rate 15%
3. [ ] Test dengan discount rate 20%

**Hasil:**
- [ ] Semua discount rate muncul dengan benar di PDF

### Skenario B: Periode Berbeda
1. [ ] Test dengan periode 3 tahun
2. [ ] Test dengan periode 7 tahun
3. [ ] Test dengan periode 10 tahun

**Hasil:**
- [ ] Grafik menyesuaikan dengan periode
- [ ] Discount rate tetap muncul

### Skenario C: Browser Berbeda
1. [ ] Test di Chrome
2. [ ] Test di Edge
3. [ ] Test di Firefox

**Hasil:**
- [ ] Chrome: ✅ / ❌
- [ ] Edge: ✅ / ❌
- [ ] Firefox: ✅ / ❌

---

## Troubleshooting

### Jika Discount Rate = 0.00%
**Kemungkinan penyebab:**
- [ ] Form belum diisi
- [ ] Belum klik "Hitung Analisis"
- [ ] Data tidak tersimpan di state

**Solusi:**
1. Refresh halaman
2. Isi form lagi dengan lengkap
3. Klik "Hitung Analisis"
4. Tunggu hasil muncul
5. Coba unduh PDF lagi

### Jika Grafik Tidak Muncul
**Kemungkinan penyebab:**
- [ ] Grafik belum selesai render
- [ ] ID elemen tidak ditemukan
- [ ] html2canvas error

**Solusi:**
1. Tunggu lebih lama (10 detik) sebelum klik PDF
2. Scroll ke bagian grafik dulu
3. Periksa console untuk error
4. Refresh halaman dan coba lagi

### Jika Console Log Tidak Muncul
**Kemungkinan penyebab:**
- [ ] Console filter aktif
- [ ] Logging tidak diaktifkan

**Solusi:**
1. Clear console filter
2. Pastikan "All levels" dipilih
3. Refresh halaman

---

## Ringkasan Hasil Testing

### Status Keseluruhan
- [ ] ✅ SEMUA TEST PASS
- [ ] ⚠️ BEBERAPA TEST PASS
- [ ] ❌ SEMUA TEST FAIL

### Detail Hasil
| Test | Status | Catatan |
|------|--------|---------|
| Discount Rate | ✅ / ❌ | |
| Grafik Trend | ✅ / ❌ | |
| Grafik Score | ✅ / ❌ | |
| Grafik Radar | ✅ / ❌ | |
| Console Log | ✅ / ❌ | |

### Rekomendasi
```
[Tulis rekomendasi berdasarkan hasil testing]
```

---

## Sign Off

**Tester:** ___________________  
**Tanggal:** ___________________  
**Signature:** ___________________

**Status Akhir:**
- [ ] ✅ APPROVED - Siap production
- [ ] ⚠️ CONDITIONAL - Perlu perbaikan minor
- [ ] ❌ REJECTED - Perlu perbaikan major
