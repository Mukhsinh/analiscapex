# Checklist Testing Layout PDF Proporsional

## Persiapan Testing

- [ ] Jalankan development server: `npm run dev`
- [ ] Buka aplikasi di browser
- [ ] Login ke aplikasi

## Test 1: Header Halaman

- [ ] Unduh PDF
- [ ] Buka PDF dan periksa halaman 1
- [ ] **Verifikasi:**
  - [ ] Header tinggi ~30mm (tidak terlalu besar)
  - [ ] Judul "LAPORAN ANALISIS KEPUTUSAN CAPEX" ukuran 14pt
  - [ ] Nama rumah sakit, equipment, dan tanggal terlihat jelas
  - [ ] Tidak ada space kosong berlebihan di bawah header

## Test 2: Info Box

- [ ] Periksa info box di bawah header
- [ ] **Verifikasi:**
  - [ ] Tinggi box ~10mm (compact)
  - [ ] Format: "Periode: X Tahun | Discount Rate: X% | Tanggal: DD/MM/YYYY"
  - [ ] Semua info dalam 1 baris
  - [ ] Background biru muda dengan border

## Test 3: Tabel Ringkasan Perbandingan

- [ ] Periksa tabel perbandingan 3 alternatif
- [ ] **Verifikasi:**
  - [ ] Font header 8pt (tidak terlalu besar)
  - [ ] Cell padding 1.5mm (compact tapi masih rapi)
  - [ ] Kolom proporsional: 55mm, 75mm, 40mm
  - [ ] Nilai dalam format Rupiah penuh (bukan juta)
  - [ ] Status "✓ Terbaik" terlihat jelas

## Test 4: Statistik Komparatif

- [ ] Periksa bagian statistik di bawah tabel
- [ ] **Verifikasi:**
  - [ ] Font judul 9pt, isi 7.5pt
  - [ ] Line spacing 3.5mm (compact)
  - [ ] Label ringkas: "PV Terendah", "PV Tertinggi", dll
  - [ ] Tidak ada space kosong berlebihan

## Test 5: Rekomendasi Box

- [ ] Periksa box rekomendasi hijau
- [ ] **Verifikasi:**
  - [ ] Tinggi box ~14mm (compact)
  - [ ] Font judul 10pt, isi 8pt
  - [ ] Background hijau muda dengan border hijau
  - [ ] Alternatif terbaik dan penghematan terlihat jelas

## Test 6: Halaman 2 - Detail Leasing

- [ ] Buka halaman 2
- [ ] **Verifikasi:**
  - [ ] Margin atas 15mm (tidak terlalu besar)
  - [ ] Header section 11pt
  - [ ] Tabel font: header 8pt, body 7.5pt
  - [ ] Cell padding 1.5mm/1.2mm
  - [ ] Kolom proporsional: 22, 52, 32, 52mm
  - [ ] Tidak ada space kosong berlebihan

## Test 7: Halaman 3 - Detail Purchase

- [ ] Buka halaman 3
- [ ] **Verifikasi:**
  - [ ] Margin atas 15mm
  - [ ] Header section 11pt
  - [ ] Tabel font: header 7.5pt, body 6.8pt
  - [ ] Cell padding 1.5mm/1.2mm
  - [ ] 7 kolom proporsional
  - [ ] Footer: "Trade-in" dan "TOTAL" (ringkas)
  - [ ] Semua angka terbaca dengan jelas

## Test 8: Halaman 4 - Detail Revenue Sharing

- [ ] Buka halaman 4
- [ ] **Verifikasi:**
  - [ ] Margin atas 15mm
  - [ ] Header section 11pt
  - [ ] Tabel font: header 7pt, body 6.5pt
  - [ ] Cell padding 1.5mm/1.2mm
  - [ ] 8 kolom proporsional
  - [ ] Tidak ada duplikasi tabel
  - [ ] Semua angka terbaca dengan jelas

## Test 9: Footer Semua Halaman

- [ ] Periksa footer di semua halaman (1-4)
- [ ] **Verifikasi:**
  - [ ] Garis separator terlihat
  - [ ] Copyright di kiri bawah
  - [ ] Nomor halaman di kanan bawah
  - [ ] Format: "Halaman X dari 4"

## Test 10: Proporsi Keseluruhan

- [ ] Lihat semua halaman secara keseluruhan
- [ ] **Verifikasi:**
  - [ ] Tidak ada space kosong berlebihan
  - [ ] Layout seimbang dan proporsional
  - [ ] Konten fit dengan baik di kertas A4
  - [ ] Tampilan profesional dan rapi
  - [ ] Semua teks mudah dibaca

## Test 11: Print Preview

- [ ] Buka print preview di PDF reader
- [ ] **Verifikasi:**
  - [ ] Layout fit dengan kertas A4
  - [ ] Tidak ada konten terpotong
  - [ ] Margin kiri-kanan 20mm
  - [ ] Margin atas-bawah proporsional

## Test 12: Berbagai Skenario Data

### Skenario A: Data Minimal (3 tahun)
- [ ] Isi form dengan periode 3 tahun
- [ ] Unduh PDF
- [ ] **Verifikasi:** Layout tetap proporsional

### Skenario B: Data Sedang (5 tahun)
- [ ] Isi form dengan periode 5 tahun
- [ ] Unduh PDF
- [ ] **Verifikasi:** Layout tetap proporsional

### Skenario C: Data Maksimal (10 tahun)
- [ ] Isi form dengan periode 10 tahun
- [ ] Unduh PDF
- [ ] **Verifikasi:** Layout tetap proporsional, tabel tidak overflow

## Test 13: Nilai Ekstrem

### Test dengan nilai besar
- [ ] Isi form dengan nilai milyaran
- [ ] Unduh PDF
- [ ] **Verifikasi:** Format Rupiah tetap rapi, tidak overflow

### Test dengan nilai kecil
- [ ] Isi form dengan nilai ribuan
- [ ] Unduh PDF
- [ ] **Verifikasi:** Format Rupiah tetap rapi

## Test 14: Perbandingan Sebelum-Sesudah

- [ ] Bandingkan dengan PDF versi lama (jika ada)
- [ ] **Verifikasi:**
  - [ ] Space kosong berkurang signifikan
  - [ ] Layout lebih compact
  - [ ] Tetap mudah dibaca
  - [ ] Lebih profesional

## Hasil Testing

### Summary
- Total test cases: 14
- Passed: ___
- Failed: ___
- Notes: ___

### Issues Found
1. ___
2. ___
3. ___

### Recommendations
1. ___
2. ___
3. ___

## Status Akhir

- [ ] ✅ Semua test passed
- [ ] ⚠️ Ada minor issues (dokumentasikan)
- [ ] ❌ Ada major issues (perlu perbaikan)

## Catatan Testing

```
Tanggal: ___________
Tester: ___________
Browser: ___________
OS: ___________

Catatan tambahan:
___________________
___________________
___________________
```
