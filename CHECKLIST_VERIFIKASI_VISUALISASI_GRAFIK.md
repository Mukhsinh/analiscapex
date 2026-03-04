# Checklist Verifikasi Visualisasi Grafik

## Pre-Testing

### 1. Verifikasi Dependencies
```bash
# Cek package.json
npm list chart.js
npm list react-chartjs-2
npm list html2canvas
npm list jspdf
```

**Expected Output:**
- ✅ chart.js@4.4.0
- ✅ react-chartjs-2@5.2.0
- ✅ html2canvas@1.4.1
- ✅ jspdf@2.5.2

### 2. Verifikasi File Modifications
- ✅ `src/components/AnalyticsReport.jsx` - Updated
- ✅ `src/print.css` - Verified (already has correct styles)
- ✅ `src/components/ExportButtons.jsx` - Verified (already has PDF export)

## Testing Standalone Chart

### Test 1: HTML Test File
```bash
# Buka file test di browser
start test_visualisasi_grafik.html
# atau
open test_visualisasi_grafik.html
```

**Verifikasi:**
- [ ] Trend Line Chart tampil dengan 3 garis berwarna
- [ ] Doughnut Chart tampil dengan 3 segmen
- [ ] Radar Chart tampil dengan 5 axis
- [ ] Semua legend tampil di bawah grafik
- [ ] Animasi smooth saat pertama kali load
- [ ] Button "Test Print Preview" berfungsi
- [ ] Button "Regenerate Charts" berfungsi

## Testing di Aplikasi

### Test 2: Development Server
```bash
# Jalankan dev server
npm run dev
```

**Verifikasi:**
- [ ] Server berjalan di http://localhost:5173
- [ ] Tidak ada error di console
- [ ] Aplikasi load dengan normal

### Test 3: Login & Navigation
```bash
# Di browser:
# 1. Buka http://localhost:5173
# 2. Login dengan credentials
# 3. Navigate ke halaman analisis
```

**Verifikasi:**
- [ ] Login berhasil
- [ ] Dashboard tampil
- [ ] Sidebar navigation berfungsi

### Test 4: Jalankan Analisis Lengkap

**Input Data:**
1. Project Settings:
   - Hospital Name: "RS Test"
   - Equipment Name: "CT Scan"
   - Department: "Radiologi"
   - Equipment Price: 5000 (juta Rp)
   - Discount Rate: 10%

2. Leasing:
   - Lease Period: 5 tahun
   - Annual Payment: 1200 juta Rp

3. Purchase:
   - Loan Period: 5 tahun
   - Interest Rate: 8%
   - Annual Maintenance: 100 juta Rp
   - Trade-in Value: 500 juta Rp

4. Revenue Sharing:
   - Method: Percentage
   - Revenue Share: 30%
   - Annual Revenue: 2000 juta Rp
   - Direct Overhead: 500 juta Rp
   - Allocated Overhead: 300 juta Rp

**Verifikasi:**
- [ ] Semua form terisi dengan benar
- [ ] Tidak ada error saat input
- [ ] Button "Hitung Analisis" aktif

### Test 5: Hasil Analisis

**Klik "Hitung Analisis"**

**Verifikasi:**
- [ ] Hasil perbandingan tampil
- [ ] Tabel detail tampil untuk 3 alternatif
- [ ] Rekomendasi tampil
- [ ] Scroll ke bawah smooth

### Test 6: Visualisasi Grafik di Browser

**Scroll ke section "Laporan Analisis & Grafik"**

**Verifikasi:**
- [ ] Header "Laporan Analisis & Grafik" tampil
- [ ] Score cards tampil (3 cards dengan progress bar)
- [ ] **Trend Line Chart tampil dengan jelas**
  - [ ] 3 garis (Biru, Hijau, Ungu)
  - [ ] X-axis: Tahun 1-5
  - [ ] Y-axis: PV Expense (juta Rp)
  - [ ] Legend di bawah
- [ ] **Doughnut Chart tampil dengan jelas**
  - [ ] 3 segmen berwarna
  - [ ] Persentase/nilai tampil
  - [ ] Legend di bawah
- [ ] **Radar Chart tampil dengan jelas**
  - [ ] 5 axis (Biaya Rendah, Fleksibilitas, dll)
  - [ ] 3 dataset overlay
  - [ ] Legend di bawah
- [ ] Ringkasan Statistik tampil (4 boxes)
- [ ] Rekomendasi box tampil (hijau dengan checkmark)

### Test 7: Interaksi Grafik

**Hover pada grafik:**
- [ ] Tooltip tampil saat hover
- [ ] Tooltip menampilkan nilai yang benar
- [ ] Hover effect smooth

**Click pada legend:**
- [ ] Dataset hide/show saat click legend
- [ ] Grafik update smooth

### Test 8: Responsive Design

**Resize browser window:**
- [ ] Grafik resize dengan smooth
- [ ] Layout tetap rapi di berbagai ukuran
- [ ] Tidak ada overflow horizontal

## Testing Export

### Test 9: Excel Export

**Klik "Unduh Excel" di ExportButtons**

**Verifikasi:**
- [ ] File Excel terdownload
- [ ] Nama file: `Analisis-Capex-YYYY-MM-DD.xlsx`
- [ ] Sheet "Ringkasan" ada
- [ ] Sheet "Leasing" ada
- [ ] Sheet "Borrow & Purchase" ada
- [ ] Sheet "Revenue Sharing" ada
- [ ] Data lengkap dan benar

### Test 10: PDF Export (via ExportButtons)

**Klik "Unduh PDF" di ExportButtons**

**Verifikasi:**
- [ ] Loading indicator tampil
- [ ] Loading text: "Membuat PDF Komprehensif..."
- [ ] Tunggu 3-5 detik
- [ ] File PDF terdownload
- [ ] Nama file: `Laporan-Analisis-Capex-[Equipment]-YYYY-MM-DD.pdf`

**Buka PDF dan verifikasi:**
- [ ] **Halaman 1: Cover & Ringkasan**
  - [ ] Header biru dengan judul
  - [ ] Info box (tanggal, periode, discount rate)
  - [ ] Tabel ringkasan perbandingan
  - [ ] Statistik komparatif
  - [ ] Rekomendasi box hijau
- [ ] **Halaman 2: Detail Leasing**
  - [ ] Tabel detail leasing lengkap
  - [ ] Total PV di footer
- [ ] **Halaman 3: Detail Purchase**
  - [ ] Tabel detail purchase lengkap
  - [ ] Trade-in value
  - [ ] Total net PV
- [ ] **Halaman 4: Detail Revenue Sharing**
  - [ ] Tabel detail revenue sharing lengkap
  - [ ] Total PV di footer
- [ ] **Halaman 5: Visualisasi & Grafik** ⭐
  - [ ] **Trend Line Chart tampil sebagai gambar**
  - [ ] **Doughnut Chart tampil sebagai gambar**
  - [ ] **Radar Chart tampil sebagai gambar**
  - [ ] Grafik jelas dan tidak blur
  - [ ] Warna grafik sesuai
- [ ] Footer di setiap halaman (copyright, nomor halaman)

### Test 11: Browser Print

**Klik "Download PDF" di header AnalyticsReport**

**Verifikasi:**
- [ ] Print dialog terbuka
- [ ] Print preview tampil

**Di print preview:**
- [ ] Header aplikasi (gradient biru) TIDAK tampil
- [ ] Print header (text only) TAMPIL
- [ ] Score cards tampil
- [ ] **Grafik tampil di preview**
  - [ ] Trend chart visible
  - [ ] Doughnut chart visible
  - [ ] Radar chart visible
- [ ] Ringkasan statistik tampil
- [ ] Rekomendasi box tampil
- [ ] Footer tampil
- [ ] Page breaks di tempat yang tepat

**Test print ke PDF:**
- [ ] Save as PDF dari print dialog
- [ ] PDF hasil print memiliki grafik yang jelas

## Troubleshooting Tests

### Test 12: Console Errors

**Buka Developer Tools (F12)**

**Verifikasi:**
- [ ] Tidak ada error merah di console
- [ ] Tidak ada warning Chart.js
- [ ] Tidak ada error html2canvas

### Test 13: Network Tab

**Buka Network tab di DevTools**

**Verifikasi:**
- [ ] Chart.js library loaded (200 OK)
- [ ] react-chartjs-2 loaded (200 OK)
- [ ] Tidak ada failed requests

### Test 14: Performance

**Buka Performance tab di DevTools**

**Record saat scroll ke grafik:**
- [ ] FPS stabil (>30 fps)
- [ ] Tidak ada long tasks (>50ms)
- [ ] Memory usage normal

## Edge Cases

### Test 15: Data Kosong

**Jalankan analisis dengan data minimal:**
- [ ] Grafik tetap tampil (meskipun dengan data 0)
- [ ] Tidak ada error
- [ ] Tidak ada NaN di grafik

### Test 16: Data Ekstrem

**Jalankan analisis dengan nilai sangat besar:**
- Equipment Price: 50000 juta Rp
- [ ] Grafik scale dengan benar
- [ ] Axis labels readable
- [ ] Tidak ada overflow

### Test 17: Multiple Analyses

**Jalankan analisis 3x berturut-turut:**
- [ ] Grafik update dengan benar setiap kali
- [ ] Tidak ada memory leak
- [ ] Performance tetap stabil

## Final Verification

### Test 18: Cross-Browser Testing

**Test di berbagai browser:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (jika available)

**Verifikasi di setiap browser:**
- [ ] Grafik tampil
- [ ] PDF export berfungsi
- [ ] Print preview berfungsi

### Test 19: Mobile Responsive

**Test di mobile view (DevTools):**
- [ ] Grafik stack vertical di mobile
- [ ] Touch interaction berfungsi
- [ ] Zoom grafik berfungsi

### Test 20: Production Build

```bash
# Build untuk production
npm run build

# Preview production build
npm run preview
```

**Verifikasi:**
- [ ] Build berhasil tanpa error
- [ ] Preview berjalan
- [ ] Grafik tampil di production build
- [ ] PDF export berfungsi di production

## Summary Checklist

### Critical Features (Must Pass)
- [ ] Grafik tampil di browser ⭐
- [ ] Grafik tampil di PDF export ⭐
- [ ] Grafik tampil di print preview ⭐
- [ ] Data grafik akurat
- [ ] Tidak ada error di console

### Important Features (Should Pass)
- [ ] Animasi smooth
- [ ] Responsive design
- [ ] Cross-browser compatible
- [ ] Performance optimal

### Nice to Have (Can Pass)
- [ ] Touch interaction di mobile
- [ ] Grafik interactive (hover, click legend)
- [ ] Custom tooltips

## Sign-off

**Tested by:** _________________  
**Date:** _________________  
**Status:** [ ] PASS  [ ] FAIL  
**Notes:** _________________

---

## Quick Test Command

```bash
# Run all tests in sequence
npm run dev &
sleep 5
start http://localhost:5173
start test_visualisasi_grafik.html
```

## Expected Final Result

✅ Halaman "5. VISUALISASI & GRAFIK ANALISIS" menampilkan:
1. Trend PV Expense per Tahun (Line Chart)
2. Perbandingan Score (Doughnut Chart)
3. Analisis Multi-Kriteria (Radar Chart)

✅ Semua grafik tampil di:
- Browser (web app)
- PDF export (via html2canvas)
- Print preview (via print.css)

✅ Grafik professional, jelas, dan mudah dibaca.
