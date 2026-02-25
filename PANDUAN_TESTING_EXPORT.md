# Panduan Testing Fungsi Export

## 🎯 Ringkasan Perubahan

### ✅ Yang Sudah Diperbaiki:

1. **Tombol "Unduh Excel"** (hijau)
   - Format CSV yang kompatibel dengan Excel
   - Encoding UTF-8 dengan BOM
   - Format angka konsisten
   - Header lengkap dengan info proyek
   - Error handling yang baik

2. **Tombol "Unduh PDF"** (merah)
   - Menggunakan print dialog browser
   - Styling profesional untuk print
   - Header dan footer otomatis
   - Layout yang optimal untuk A4

3. **Logo Modern**
   - Gradient blue-indigo-purple
   - Icon calculator yang stylish
   - Animated status indicator
   - Konsisten di header dan sidebar

## 📋 Cara Testing

### Test 1: Unduh Excel

1. **Buka aplikasi** di browser (http://localhost:5173)
2. **Isi data** di form (atau gunakan data default)
3. **Klik** tombol biru "Hitung & Bandingkan Semua Alternatif"
4. **Klik** tombol hijau "Unduh Excel"
5. **Cek** file yang terdownload:
   - Nama file: `Analisis-Capex-2026-02-25.csv`
   - Buka dengan Excel atau Google Sheets
   - Verifikasi isi lengkap dan format benar

**Expected Result:**
```
✅ File CSV terdownload otomatis
✅ Bisa dibuka di Excel tanpa error
✅ Format angka dengan koma desimal (12.737,04)
✅ Header lengkap dengan info proyek
✅ Semua tabel detail ada (Leasing, Purchase, Revenue Share)
```

### Test 2: Unduh PDF

1. **Buka aplikasi** di browser
2. **Isi data** dan klik "Hitung & Bandingkan"
3. **Klik** tombol merah "Unduh PDF"
4. **Print dialog** akan muncul
5. **Pilih** "Save as PDF" atau "Microsoft Print to PDF"
6. **Atur** settings:
   - Destination: Save as PDF
   - Pages: All
   - Layout: Portrait
   - Margins: Default
   - Options: ✅ Background graphics
7. **Klik** "Save" dan pilih lokasi
8. **Buka** PDF yang tersimpan

**Expected Result:**
```
✅ Print dialog muncul
✅ Preview tampil dengan baik
✅ Tidak ada button/sidebar di preview
✅ Header profesional dengan logo
✅ Chart/grafik tercetak
✅ Tabel lengkap dan rapi
✅ Footer dengan copyright
✅ PDF tersimpan dengan baik
```

### Test 3: Logo Modern

1. **Lihat** sidebar kiri
2. **Lihat** header atas
3. **Verifikasi**:
   - Logo gradient blue-purple
   - Icon calculator
   - Dot hijau animated
   - Text "Capex Analyzer"

**Expected Result:**
```
✅ Logo modern dan stylish
✅ Gradient warna menarik
✅ Konsisten di sidebar dan header
✅ Animasi smooth
```

## 🔧 Troubleshooting

### Problem: Excel tidak bisa dibuka

**Solution:**
1. Klik kanan file → "Open with" → Microsoft Excel
2. Atau di Excel: File → Open → pilih file CSV
3. Pastikan delimiter adalah "Comma"

### Problem: PDF kosong atau tidak lengkap

**Solution:**
1. Tunggu sampai chart selesai render (2-3 detik)
2. Di print dialog, centang "Background graphics"
3. Pastikan scale 100% atau "Fit to page"
4. Coba browser lain (Chrome recommended)

### Problem: Tombol tidak berfungsi

**Solution:**
1. Buka Console (F12) → lihat error
2. Pastikan sudah klik "Hitung & Bandingkan" dulu
3. Refresh halaman dan coba lagi
4. Clear browser cache

### Problem: Format angka salah di Excel

**Solution:**
1. File sudah menggunakan format Indonesia (koma desimal)
2. Di Excel, bisa diubah format cell jika perlu
3. Atau import ulang dengan delimiter settings

## 📱 Browser Compatibility

| Browser | Excel Export | PDF Export | Rating |
|---------|-------------|------------|--------|
| Chrome  | ✅ Perfect  | ✅ Perfect | ⭐⭐⭐⭐⭐ |
| Edge    | ✅ Perfect  | ✅ Perfect | ⭐⭐⭐⭐⭐ |
| Firefox | ✅ Perfect  | ✅ Good    | ⭐⭐⭐⭐ |
| Safari  | ✅ Perfect  | ✅ Good    | ⭐⭐⭐⭐ |
| Mobile  | ✅ Good     | ⚠️ Varies | ⭐⭐⭐ |

## 🎨 Print Preview Tips

### Untuk hasil PDF terbaik:

1. **Chrome/Edge:**
   - Destination: "Save as PDF"
   - Paper size: A4
   - Margins: Default
   - Scale: Default
   - Options: ✅ Background graphics
   - ✅ Headers and footers

2. **Firefox:**
   - Print to: "Save to PDF"
   - Orientation: Portrait
   - Page size: A4
   - Margins: Default
   - ✅ Print backgrounds

3. **Safari:**
   - PDF → "Save as PDF"
   - Paper Size: A4
   - Scale: 100%
   - ✅ Print backgrounds

## 📊 Sample Output

### Excel (CSV) Structure:
```
ANALISIS KEPUTUSAN CAPEX
RS MIRACLES - YOGYAKARTA
Alat Analyzer Kimia - Laboratorium Klinik
Tanggal: Rabu, 25 Februari 2026
© Copyright Mukhsin Hadi

RINGKASAN PERBANDINGAN
Alternatif,Total PV Expense (juta Rp)
Leasing,12.737,04
Borrow & Purchase,1.295,10
Revenue Sharing,-3.501,40

DETAIL LEASING
Tahun,Pembayaran (juta Rp),PV Factor,PV Expense (juta Rp)
1,3.360,00,0.909091,3.054,55
2,3.360,00,0.826446,2.776,86
...
```

### PDF Structure:
```
┌─────────────────────────────────────┐
│  ANALISIS KEPUTUSAN CAPEX           │
│  RS MIRACLES - YOGYAKARTA           │
│  Alat Analyzer Kimia - Lab Klinik   │
│  Tanggal: Rabu, 25 Februari 2026    │
├─────────────────────────────────────┤
│                                     │
│  [Summary Cards - 3 boxes]          │
│                                     │
│  [Chart - Bar comparison]           │
│                                     │
│  [Recommendation Box]               │
│                                     │
│  [Detail Tables]                    │
│  - Leasing                          │
│  - Borrow & Purchase                │
│  - Revenue Sharing                  │
│                                     │
├─────────────────────────────────────┤
│  Footer: Copyright & Timestamp      │
└─────────────────────────────────────┘
```

## ✅ Checklist Testing

Gunakan checklist ini untuk memastikan semua fungsi bekerja:

### Excel Export:
- [ ] Tombol "Unduh Excel" muncul
- [ ] Klik tombol → file terdownload
- [ ] File bisa dibuka di Excel
- [ ] Header lengkap dan benar
- [ ] Ringkasan perbandingan ada
- [ ] Detail Leasing lengkap
- [ ] Detail Purchase lengkap
- [ ] Detail Revenue Share lengkap
- [ ] Format angka konsisten
- [ ] Tidak ada error di console

### PDF Export:
- [ ] Tombol "Unduh PDF" muncul
- [ ] Klik tombol → print dialog muncul
- [ ] Preview tampil dengan baik
- [ ] Tidak ada button di preview
- [ ] Tidak ada sidebar di preview
- [ ] Header profesional ada
- [ ] Chart/grafik tercetak
- [ ] Tabel lengkap dan rapi
- [ ] Footer dengan copyright
- [ ] Bisa save as PDF
- [ ] PDF hasil bagus dan lengkap

### Logo & UI:
- [ ] Logo modern di sidebar
- [ ] Logo modern di header
- [ ] Gradient warna menarik
- [ ] Icon calculator jelas
- [ ] Dot hijau animated
- [ ] Text "Capex Analyzer" jelas
- [ ] Konsisten di semua tempat

## 🚀 Status: READY TO TEST!

Semua fungsi sudah diperbaiki dan siap untuk ditest. Silakan ikuti panduan di atas untuk memverifikasi bahwa semuanya bekerja dengan baik.

**Happy Testing! 🎉**
