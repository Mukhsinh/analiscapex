# Checklist Testing Laporan PDF Analisis Capex

## 📋 Persiapan Testing

### Environment
- [ ] Aplikasi berjalan di development mode (`npm run dev`)
- [ ] Browser terbuka (Chrome/Edge/Firefox)
- [ ] Console browser terbuka untuk monitoring error
- [ ] Koneksi internet stabil (untuk load dependencies)

### Data Testing
- [ ] Siapkan data sample untuk ketiga metode:
  - Leasing
  - Borrow & Purchase
  - Revenue Sharing

## 🧪 Test Cases

### 1. Generate PDF - Struktur Dasar

#### Test 1.1: Jumlah Halaman
- [ ] PDF berisi tepat 4 halaman
- [ ] Tidak ada halaman kosong
- [ ] Tidak ada halaman visualisasi & grafik

#### Test 1.2: Konten Halaman 1 (Cover & Ringkasan)
- [ ] Header biru dengan judul "LAPORAN ANALISIS KEPUTUSAN CAPEX"
- [ ] Nama rumah sakit tampil
- [ ] Nama equipment dan department tampil
- [ ] Tanggal laporan tampil
- [ ] Info box (periode analisis, discount rate)
- [ ] Tabel ringkasan perbandingan (3 alternatif)
- [ ] Statistik komparatif (min, max, avg, selisih)
- [ ] Box rekomendasi dengan alternatif terbaik

#### Test 1.3: Konten Halaman 2 (Detail Leasing)
- [ ] Header section "2. DETAIL ANALISIS LEASING"
- [ ] Tabel dengan kolom: Tahun, Pembayaran, PV Factor, PV Expense
- [ ] Data per tahun tampil lengkap
- [ ] Baris footer dengan TOTAL
- [ ] Nilai total PV sesuai dengan perhitungan

#### Test 1.4: Konten Halaman 3 (Detail Purchase)
- [ ] Header section "3. DETAIL ANALISIS BORROW & PURCHASE"
- [ ] Tabel dengan kolom: Tahun, Principal, Interest, Maintenance, Total Expense, PV Factor, PV Expense
- [ ] Data per tahun tampil lengkap
- [ ] Baris Trade-in Value
- [ ] Baris TOTAL NET PV
- [ ] Nilai total sesuai dengan perhitungan

#### Test 1.5: Konten Halaman 4 (Detail Revenue Sharing)
- [ ] Header section "4. DETAIL ANALISIS REVENUE SHARING"
- [ ] Tabel dengan kolom: Thn, Revenue, Direct OH, Alloc OH, Op. Profit, EAT, PV Factor, PV Expense
- [ ] Data per tahun tampil lengkap
- [ ] Baris footer dengan TOTAL
- [ ] Nilai total PV sesuai dengan perhitungan

### 2. Format dan Styling

#### Test 2.1: Ukuran Huruf
- [ ] Header utama: ~18pt (lebih kecil dari sebelumnya)
- [ ] Section headers: ~13pt
- [ ] Tabel headers: 7-9pt
- [ ] Tabel body: 6.5-8pt
- [ ] Info text: 8pt
- [ ] Semua text terbaca dengan jelas

#### Test 2.2: Spasi Vertikal
- [ ] Header area: ~45mm (lebih ringkas)
- [ ] Info box: ~16mm (lebih ringkas)
- [ ] Rekomendasi box: ~18mm (lebih ringkas)
- [ ] Jarak antar section: 5-8mm (lebih ringkas)
- [ ] Cell padding tabel: 1.5-2mm (lebih ringkas)
- [ ] Tidak ada ruang kosong berlebihan

#### Test 2.3: Warna dan Styling
- [ ] Header biru (#2563EB)
- [ ] Info box biru muda
- [ ] Rekomendasi box hijau muda
- [ ] Tabel leasing: header biru
- [ ] Tabel purchase: header hijau
- [ ] Tabel revenue sharing: header ungu
- [ ] Alternating row colors di tabel

#### Test 2.4: Alignment
- [ ] Judul center-aligned
- [ ] Angka right-aligned
- [ ] Text left-aligned
- [ ] Tahun center-aligned
- [ ] PV Factor center-aligned

### 3. Data Accuracy

#### Test 3.1: Nilai Numerik
- [ ] Semua nilai dalam format Rupiah penuh (bukan juta)
- [ ] Format: "Rp 1.234.567.890"
- [ ] Tidak ada nilai NaN atau undefined
- [ ] Tidak ada nilai 0 yang seharusnya ada nilai
- [ ] PV Factor dengan 4 desimal (0.9091)

#### Test 3.2: Perhitungan
- [ ] Total PV Leasing = sum(PV Expense per tahun)
- [ ] Total PV Purchase = sum(PV Expense) - Trade-in PV
- [ ] Total PV Revenue Sharing = sum(PV Expense per tahun)
- [ ] Alternatif terbaik = yang memiliki total PV terendah
- [ ] Selisih = Total PV tertinggi - Total PV terendah

#### Test 3.3: Konsistensi Data
- [ ] Data di PDF sama dengan data di layar
- [ ] Rekomendasi di PDF sama dengan rekomendasi di layar
- [ ] Jumlah tahun konsisten di semua tabel
- [ ] Discount rate konsisten

### 4. Footer dan Metadata

#### Test 4.1: Footer
- [ ] Setiap halaman memiliki footer
- [ ] Copyright notice tampil
- [ ] Nomor halaman tampil (format: "Halaman X dari 4")
- [ ] Garis pemisah footer

#### Test 4.2: Filename
- [ ] Format: `Laporan-Analisis-Capex-[Equipment]-[Date].pdf`
- [ ] Tanggal dalam format YYYY-MM-DD
- [ ] Nama equipment di-sanitize (spasi → dash)

### 5. Performance

#### Test 5.1: Kecepatan Generate
- [ ] Loading indicator muncul
- [ ] Status progress update (Halaman 1-4)
- [ ] Generate selesai dalam < 3 detik
- [ ] Tidak ada freeze/hang

#### Test 5.2: Ukuran File
- [ ] Ukuran file < 100KB
- [ ] File dapat dibuka dengan PDF reader standar
- [ ] File tidak corrupt

#### Test 5.3: Console
- [ ] Tidak ada error di console
- [ ] Tidak ada warning kritis
- [ ] Log menunjukkan proses berhasil

### 6. Edge Cases

#### Test 6.1: Data Minimal
- [ ] Test dengan 1 tahun periode
- [ ] Test dengan nilai 0 di beberapa field
- [ ] Test dengan discount rate 0%

#### Test 6.2: Data Maksimal
- [ ] Test dengan 20 tahun periode
- [ ] Test dengan nilai sangat besar (milyaran)
- [ ] Test dengan discount rate 100%

#### Test 6.3: Data Negatif
- [ ] Test Revenue Sharing dengan negative EAT
- [ ] Test dengan trade-in value > purchase price
- [ ] Pastikan nilai negatif ditampilkan dengan benar

### 7. Kompatibilitas

#### Test 7.1: Browser
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (jika tersedia)

#### Test 7.2: PDF Reader
- [ ] Adobe Acrobat Reader
- [ ] Browser built-in PDF viewer
- [ ] Windows PDF viewer
- [ ] Mobile PDF viewer

### 8. Perbandingan dengan Laporan Grafik

#### Test 8.1: Konten
- [ ] Laporan Analisis tidak berisi grafik
- [ ] Laporan Grafik berisi grafik lengkap
- [ ] Data numerik konsisten di kedua laporan

#### Test 8.2: Ukuran
- [ ] Laporan Analisis lebih kecil (< 100KB)
- [ ] Laporan Grafik lebih besar (> 200KB)

#### Test 8.3: Halaman
- [ ] Laporan Analisis: 4 halaman
- [ ] Laporan Grafik: 5-7 halaman

## 📊 Test Results Template

```
Tanggal Testing: _______________
Tester: _______________
Browser: _______________
Versi Aplikasi: _______________

HASIL:
[ ] PASS - Semua test berhasil
[ ] FAIL - Ada test yang gagal

Catatan:
_________________________________
_________________________________
_________________________________

Issues Found:
1. _________________________________
2. _________________________________
3. _________________________________
```

## 🐛 Bug Report Template

Jika menemukan bug, gunakan template ini:

```
**Bug Title**: [Deskripsi singkat]

**Severity**: [Critical/High/Medium/Low]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Result**:


**Actual Result**:


**Screenshots**:
[Attach if applicable]

**Environment**:
- Browser: 
- OS: 
- Versi Aplikasi: 

**Additional Notes**:

```

## ✅ Sign-off

Testing completed by: _______________  
Date: _______________  
Status: [ ] Approved [ ] Rejected  
Notes: _________________________________

---

**Dokumen Terkait**:
- `PERBAIKAN_LAPORAN_PDF_ANALISIS_CAPEX_03_MAR_2026.md`
- `RINGKASAN_PERBAIKAN_LAPORAN_ANALISIS_CAPEX.md`
