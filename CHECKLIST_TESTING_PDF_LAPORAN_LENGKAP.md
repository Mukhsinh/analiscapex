# CHECKLIST TESTING PDF LAPORAN LENGKAP

## 📋 OVERVIEW

Checklist untuk memverifikasi fungsi unduh PDF laporan lengkap yang menggabungkan data dari halaman Laporan Grafik dan Hasil Perbandingan.

**Tanggal**: 03 Maret 2026  
**Tester**: [Nama Tester]  
**Environment**: Development / Production

---

## ✅ PRE-TESTING CHECKLIST

- [ ] Development server berjalan (`npm run dev`)
- [ ] Browser modern (Chrome/Edge/Firefox latest)
- [ ] Sudah login ke aplikasi
- [ ] Ada data analisis yang sudah dihitung
- [ ] Buka halaman "Laporan Grafik" (/analisis_capex)

---

## 🧪 TEST CASE 1: BASIC PDF GENERATION

### Setup
1. [ ] Pastikan ada hasil analisis yang valid
2. [ ] Buka halaman "Laporan Grafik"
3. [ ] Verifikasi grafik ter-render dengan baik

### Execution
4. [ ] Klik tombol "Download PDF"
5. [ ] Verifikasi loading indicator muncul dengan teks "⏳ Membuat laporan PDF..."
6. [ ] Tunggu hingga proses selesai (5-15 detik)
7. [ ] Verifikasi file PDF terdownload

### Verification - File Properties
8. [ ] Filename format: `Laporan_Analisis_Capex_[Equipment]_[Date].pdf`
9. [ ] File size reasonable (500KB - 5MB)
10. [ ] File dapat dibuka tanpa error

### Verification - Halaman 1 (Cover & Executive Summary)
11. [ ] Header biru dengan judul "LAPORAN ANALISIS KEPUTUSAN CAPEX"
12. [ ] Nama rumah sakit tampil
13. [ ] Nama equipment dan department tampil
14. [ ] Tanggal pembuatan lengkap (hari, tanggal, bulan, tahun)
15. [ ] Box ringkasan eksekutif (background hijau muda)
16. [ ] Teks ringkasan terbaca dengan baik
17. [ ] Box rekomendasi (background kuning muda)
18. [ ] Rekomendasi dalam huruf kapital
19. [ ] Tabel perbandingan alternatif:
    - [ ] Header tabel (biru)
    - [ ] 3 baris data (Leasing, Purchase, Revenue Share)
    - [ ] Ranking dengan emoji (🥇🥈🥉)
    - [ ] Nilai PV Expense
    - [ ] Selisih dan persentase
20. [ ] Footer dengan copyright
21. [ ] Nomor halaman "Halaman 1"

### Verification - Halaman 2 (Visualisasi Grafik)
22. [ ] Header "VISUALISASI & ANALISIS GRAFIK"
23. [ ] Grafik "Trend PV Expense per Tahun":
    - [ ] Grafik ter-render dengan jelas
    - [ ] Legend tampil (Leasing, Purchase, Revenue Share)
    - [ ] Axis labels terbaca
    - [ ] Warna grafik sesuai (biru, hijau, ungu)
24. [ ] Grafik "Perbandingan Score":
    - [ ] Doughnut chart ter-render
    - [ ] Legend tampil
    - [ ] Proporsi sesuai dengan score
25. [ ] Footer konsisten
26. [ ] Nomor halaman "Halaman 2"

### Verification - Halaman 3 (Analisis Multi-Kriteria)
27. [ ] Header "ANALISIS MULTI-KRITERIA & STATISTIK"
28. [ ] Grafik Radar:
    - [ ] Ter-render dengan jelas
    - [ ] 5 kriteria tampil (Biaya Rendah, Fleksibilitas, dll)
    - [ ] 3 dataset (Leasing, Purchase, Revenue Share)
    - [ ] Legend tampil
29. [ ] Ringkasan Statistik (5 box):
    - [ ] Total PV Terendah (biru)
    - [ ] Total PV Tertinggi (merah)
    - [ ] Selisih Min-Max (hijau)
    - [ ] Rata-rata PV (ungu)
    - [ ] Periode Analisis (kuning)
30. [ ] Nilai statistik akurat
31. [ ] Footer konsisten
32. [ ] Nomor halaman "Halaman 3"

### Verification - Halaman 4 (Detail Leasing)
33. [ ] Header "DETAIL PERHITUNGAN LEASING"
34. [ ] Tabel perhitungan Leasing:
    - [ ] Header tabel terbaca
    - [ ] Kolom: Tahun, Lease Payment, PV Factor, PV Expense
    - [ ] Data per tahun lengkap
    - [ ] Baris total dengan background biru
    - [ ] Nilai total PV Expense akurat
35. [ ] Tabel tidak terpotong
36. [ ] Footer konsisten
37. [ ] Nomor halaman "Halaman 4"

### Verification - Halaman 5 (Detail Purchase)
38. [ ] Header "DETAIL PERHITUNGAN BORROW & PURCHASE"
39. [ ] Tabel perhitungan Purchase:
    - [ ] Header tabel terbaca
    - [ ] Kolom: Tahun, Principal, Interest, Maintenance, Total, PV Factor, PV Expense
    - [ ] Data per tahun lengkap
    - [ ] Baris trade-in (background kuning)
    - [ ] Baris total dengan background hijau
    - [ ] Nilai total PV Expense akurat
40. [ ] Tabel tidak terpotong
41. [ ] Footer konsisten
42. [ ] Nomor halaman "Halaman 5"

### Verification - Halaman 6 (Detail Revenue Sharing)
43. [ ] Header "DETAIL PERHITUNGAN REVENUE SHARING"
44. [ ] Summary info boxes (3 box):
    - [ ] Pendapatan Tahunan RS
    - [ ] Laba Operasi
    - [ ] EAT / Negative EAT
45. [ ] Tabel breakdown procedures (jika ada):
    - [ ] Nama pemeriksaan
    - [ ] Tarif
    - [ ] Volume
    - [ ] Porsi RS
    - [ ] Pendapatan
46. [ ] Tabel yearly data:
    - [ ] Header tabel terbaca
    - [ ] Kolom: Tahun, EAT/Negative EAT, PV Factor, PV Expense
    - [ ] Data per tahun lengkap
    - [ ] Baris total dengan background ungu
47. [ ] Rincian overhead (3 kolom)
48. [ ] Footer konsisten
49. [ ] Nomor halaman "Halaman 6"

### Verification - Halaman Akhir (Kesimpulan)
50. [ ] Header "KESIMPULAN & REKOMENDASI"
51. [ ] Box kesimpulan akhir (background hijau):
    - [ ] Judul "KESIMPULAN AKHIR"
    - [ ] Teks kesimpulan lengkap
    - [ ] Rekomendasi dalam huruf kapital
52. [ ] Section "CATATAN PENTING":
    - [ ] 5 poin catatan tampil
    - [ ] Teks terbaca dengan baik
53. [ ] Box peringatan Revenue Sharing (jika negative):
    - [ ] Background merah muda
    - [ ] Border merah
    - [ ] Emoji ⚠️
    - [ ] Teks penjelasan lengkap
54. [ ] Box metodologi (background biru muda):
    - [ ] Emoji 💡
    - [ ] Penjelasan metodologi
55. [ ] Footer akhir:
    - [ ] Garis pemisah
    - [ ] Teks "Laporan ini dihasilkan secara otomatis..."
    - [ ] Copyright
    - [ ] Timestamp lengkap
56. [ ] Nomor halaman terakhir

### Overall Quality
57. [ ] Semua halaman memiliki margin konsisten
58. [ ] Font size dan style konsisten
59. [ ] Warna sesuai dengan color palette
60. [ ] Tidak ada teks terpotong
61. [ ] Tidak ada overlap elemen
62. [ ] Spacing antar elemen proporsional

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 2: REVENUE SHARING NEGATIVE

### Setup
1. [ ] Input data Revenue Sharing dengan overhead tinggi
2. [ ] Pastikan menghasilkan Negative EAT
3. [ ] Hitung analisis

### Execution
4. [ ] Buka halaman "Laporan Grafik"
5. [ ] Klik "Download PDF"
6. [ ] Tunggu hingga selesai

### Verification
7. [ ] PDF terdownload
8. [ ] Halaman Revenue Sharing menampilkan "PROYEKSI NEGATIVE EAT"
9. [ ] Nilai EAT dalam warna merah
10. [ ] Halaman kesimpulan memiliki box peringatan merah
11. [ ] Teks peringatan menjelaskan penyebab negative EAT
12. [ ] Rekomendasi tetap menunjukkan alternatif terbaik

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 3: PERIODE PANJANG (>10 TAHUN)

### Setup
1. [ ] Input data dengan periode 15 tahun
2. [ ] Hitung analisis

### Execution
3. [ ] Buka halaman "Laporan Grafik"
4. [ ] Klik "Download PDF"
5. [ ] Tunggu hingga selesai

### Verification
6. [ ] PDF terdownload
7. [ ] Tabel Leasing:
    - [ ] Semua 15 tahun tampil
    - [ ] Jika perlu multiple pages, page break tepat
    - [ ] Tidak ada data hilang
8. [ ] Tabel Purchase:
    - [ ] Semua 15 tahun tampil
    - [ ] Page break tepat
9. [ ] Tabel Revenue Sharing:
    - [ ] Semua 15 tahun tampil
    - [ ] Page break tepat
10. [ ] Grafik trend menampilkan semua tahun
11. [ ] Total halaman bertambah sesuai kebutuhan

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 4: MULTIPLE PROCEDURES (REVENUE SHARING)

### Setup
1. [ ] Input Revenue Sharing dengan 5+ procedures
2. [ ] Hitung analisis

### Execution
3. [ ] Buka halaman "Laporan Grafik"
4. [ ] Klik "Download PDF"
5. [ ] Tunggu hingga selesai

### Verification
6. [ ] PDF terdownload
7. [ ] Tabel breakdown procedures tampil lengkap
8. [ ] Semua procedures terdaftar
9. [ ] Perhitungan per procedure akurat
10. [ ] Total pendapatan sesuai

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 5: NAMA EQUIPMENT PANJANG

### Setup
1. [ ] Input nama equipment yang panjang (>50 karakter)
2. [ ] Hitung analisis

### Execution
3. [ ] Buka halaman "Laporan Grafik"
4. [ ] Klik "Download PDF"
5. [ ] Tunggu hingga selesai

### Verification
6. [ ] PDF terdownload
7. [ ] Filename tidak error (spasi diganti underscore)
8. [ ] Nama equipment di cover tidak terpotong
9. [ ] Nama equipment di header tidak overlap
10. [ ] Text wrapping berfungsi dengan baik

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 6: ERROR HANDLING

### Test 6A: Grafik Belum Ter-render
1. [ ] Buka halaman "Laporan Grafik"
2. [ ] Segera klik "Download PDF" sebelum grafik selesai render
3. [ ] Verifikasi error handling:
    - [ ] Alert muncul dengan pesan error
    - [ ] Loading indicator dihapus
    - [ ] Aplikasi tidak crash

### Test 6B: Network Issue (Simulasi)
1. [ ] Buka Developer Tools
2. [ ] Throttle network ke "Offline"
3. [ ] Klik "Download PDF"
4. [ ] Verifikasi error handling

### Test 6C: Browser Compatibility
Test di berbagai browser:
- [ ] Chrome (latest)
- [ ] Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (jika tersedia)

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 7: PERFORMANCE

### Metrics
1. [ ] Waktu generate PDF < 20 detik
2. [ ] Loading indicator muncul dalam < 1 detik
3. [ ] File size < 10 MB
4. [ ] Memory usage tidak spike drastis
5. [ ] Browser tidak freeze selama proses

### Verification
6. [ ] Buka Performance tab di DevTools
7. [ ] Record saat generate PDF
8. [ ] Analisis:
    - [ ] CPU usage reasonable
    - [ ] Memory tidak leak
    - [ ] No long tasks (>50ms)

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 🧪 TEST CASE 8: PRINT QUALITY

### Verification
1. [ ] Buka PDF di Adobe Reader
2. [ ] Zoom 100%:
    - [ ] Teks tajam dan terbaca
    - [ ] Grafik tidak pixelated
    - [ ] Warna akurat
3. [ ] Zoom 200%:
    - [ ] Grafik masih berkualitas
    - [ ] Teks tidak blur
4. [ ] Print preview:
    - [ ] Layout sesuai
    - [ ] Tidak ada elemen terpotong
5. [ ] Actual print (optional):
    - [ ] Hasil print sesuai preview
    - [ ] Warna akurat

**Result**: ⬜ PASS / ⬜ FAIL  
**Notes**: _______________________________________________

---

## 📊 SUMMARY

### Test Results
- Total Test Cases: 8
- Passed: _____ / 8
- Failed: _____ / 8
- Pass Rate: _____%

### Critical Issues Found
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Minor Issues Found
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Recommendations
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

---

## ✅ SIGN-OFF

**Tester**: _______________________________________________  
**Date**: _______________________________________________  
**Status**: ⬜ APPROVED / ⬜ NEEDS REVISION  
**Signature**: _______________________________________________

---

## 📝 NOTES

Additional observations or comments:

_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________

---

**Document Version**: 1.0  
**Last Updated**: 03 Maret 2026  
**Created by**: Kiro AI Assistant
