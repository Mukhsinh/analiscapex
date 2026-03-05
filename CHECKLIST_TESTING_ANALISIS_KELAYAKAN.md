# ✅ Checklist Testing Analisis Kelayakan Harga Penawaran

## 📋 Informasi Testing

- **Tanggal**: 5 Maret 2026
- **Fitur**: Analisis Kelayakan Harga Penawaran Sewa
- **File Utama**: `src/components/RentalAnalysisForm.jsx`
- **File Test**: `test_analisis_kelayakan_harga.html`

## 🎯 Objektif Testing

Memastikan fitur analisis kelayakan harga penawaran berfungsi dengan benar dan memberikan rekomendasi yang akurat berdasarkan perbandingan harga.

## 📝 Checklist Fungsionalitas

### 1. Input Form

- [ ] Field "Harga Penawaran dari Vendor" muncul di form
- [ ] Field bersifat opsional (tidak wajib diisi)
- [ ] Format currency berfungsi dengan baik
- [ ] Placeholder text informatif
- [ ] Tooltip/helper text menjelaskan tujuan field

### 2. Perhitungan Dasar

- [ ] Kalkulasi harga sewa tetap akurat tanpa input penawaran
- [ ] Kalkulasi harga sewa tetap akurat dengan input penawaran
- [ ] Selisih harga dihitung dengan benar (penawaran - kalkulasi)
- [ ] Persentase selisih dihitung dengan benar
- [ ] Tidak ada error saat penawaran = 0 atau kosong

### 3. Logika Kelayakan

#### Skenario 1: Penawaran >15% Lebih Tinggi
- [ ] Status: "TIDAK LAYAK - PERLU NEGOSIASI ULANG"
- [ ] Badge: "TIDAK LAYAK" (merah)
- [ ] Warna: Merah
- [ ] Icon: ⚠️
- [ ] Rekomendasi sesuai

**Test Case:**
- Input: Kalkulasi = Rp 1.000.000.000, Penawaran = Rp 1.200.000.000
- Expected: Status TIDAK LAYAK, warna merah

#### Skenario 2: Penawaran 5-15% Lebih Tinggi
- [ ] Status: "TIDAK LAYAK - DAPAT DINEGOSIASIKAN"
- [ ] Badge: "TIDAK LAYAK" (kuning)
- [ ] Warna: Kuning
- [ ] Icon: 💡
- [ ] Rekomendasi sesuai

**Test Case:**
- Input: Kalkulasi = Rp 1.000.000.000, Penawaran = Rp 1.080.000.000
- Expected: Status TIDAK LAYAK, warna kuning

#### Skenario 3: Penawaran ±5%
- [ ] Status: "LAYAK - HARGA WAJAR"
- [ ] Badge: "LAYAK" (hijau)
- [ ] Warna: Hijau
- [ ] Icon: ✅
- [ ] Rekomendasi sesuai

**Test Case:**
- Input: Kalkulasi = Rp 1.000.000.000, Penawaran = Rp 1.030.000.000
- Expected: Status LAYAK, warna hijau

#### Skenario 4: Penawaran -5% hingga -15%
- [ ] Status: "LAYAK - HARGA SANGAT BAIK"
- [ ] Badge: "LAYAK" (biru)
- [ ] Warna: Biru
- [ ] Icon: 🎯
- [ ] Rekomendasi sesuai

**Test Case:**
- Input: Kalkulasi = Rp 1.000.000.000, Penawaran = Rp 900.000.000
- Expected: Status LAYAK, warna biru

#### Skenario 5: Penawaran <-15%
- [ ] Status: "LAYAK - HARGA TERLALU RENDAH (PERLU VERIFIKASI)"
- [ ] Badge: "LAYAK" (orange)
- [ ] Warna: Orange
- [ ] Icon: 🔍
- [ ] Rekomendasi sesuai

**Test Case:**
- Input: Kalkulasi = Rp 1.000.000.000, Penawaran = Rp 800.000.000
- Expected: Status LAYAK, warna orange

### 4. Tampilan UI

- [ ] Box analisis muncul hanya jika ada penawaran
- [ ] Warna background sesuai dengan kategori
- [ ] Icon ditampilkan dengan benar
- [ ] Badge kelayakan terlihat jelas
- [ ] Grid perbandingan harga rapi dan informatif
- [ ] Rekomendasi mudah dibaca
- [ ] Penjelasan logika kelayakan ditampilkan
- [ ] Responsive di berbagai ukuran layar

### 5. Perbandingan Harga

- [ ] Harga kalkulasi ditampilkan dengan benar
- [ ] Harga penawaran vendor ditampilkan dengan benar
- [ ] Selisih nominal ditampilkan dengan benar
- [ ] Selisih persentase ditampilkan dengan benar
- [ ] Tanda + untuk selisih positif (penawaran lebih tinggi)
- [ ] Tanda - untuk selisih negatif (penawaran lebih rendah)
- [ ] Warna merah untuk selisih positif
- [ ] Warna hijau untuk selisih negatif
- [ ] Label "Lebih tinggi" / "Lebih rendah" sesuai

### 6. Export PDF

- [ ] PDF mencakup section "Analisis Perbandingan Harga Penawaran"
- [ ] Tabel perbandingan ditampilkan dengan benar
- [ ] Status kelayakan dengan badge berwarna
- [ ] Logika kelayakan dijelaskan
- [ ] Kesimpulan mencantumkan status kelayakan
- [ ] Rekomendasi detail sesuai kategori
- [ ] Format dan layout profesional
- [ ] Tidak ada error saat generate PDF

### 7. Database Integration

- [ ] Data penawaran vendor tersimpan ke database
- [ ] Field `vendor_quote` ada di tabel
- [ ] Data dapat diambil kembali dari history
- [ ] Tidak ada error saat save dengan/tanpa penawaran

## 🧪 Test Cases Detail

### Test Case 1: Tanpa Input Penawaran
**Input:**
- Harga Beli: Rp 5.000.000.000
- Umur Ekonomis: 10 tahun
- Nilai Residu: Rp 500.000.000
- Tingkat Keuntungan: 15%
- Masa Sewa: 5 tahun
- Penawaran Vendor: (kosong)

**Expected:**
- [ ] Kalkulasi berjalan normal
- [ ] Box analisis perbandingan TIDAK muncul
- [ ] Tidak ada error
- [ ] PDF tidak mencakup section perbandingan

### Test Case 2: Penawaran Sangat Tinggi
**Input:**
- (Data sama seperti Test Case 1)
- Penawaran Vendor: Rp 1.300.000.000

**Expected:**
- [ ] Kalkulasi: Rp 1.050.000.000
- [ ] Selisih: +Rp 250.000.000 (+23.8%)
- [ ] Status: TIDAK LAYAK - PERLU NEGOSIASI ULANG
- [ ] Warna: Merah
- [ ] Badge: TIDAK LAYAK
- [ ] Rekomendasi: Target negosiasi Rp 1.155.000.000

### Test Case 3: Penawaran Sedikit Tinggi
**Input:**
- (Data sama seperti Test Case 1)
- Penawaran Vendor: Rp 1.100.000.000

**Expected:**
- [ ] Kalkulasi: Rp 1.050.000.000
- [ ] Selisih: +Rp 50.000.000 (+4.8%)
- [ ] Status: TIDAK LAYAK - DAPAT DINEGOSIASIKAN
- [ ] Warna: Kuning
- [ ] Badge: TIDAK LAYAK

### Test Case 4: Penawaran Wajar
**Input:**
- (Data sama seperti Test Case 1)
- Penawaran Vendor: Rp 1.080.000.000

**Expected:**
- [ ] Kalkulasi: Rp 1.050.000.000
- [ ] Selisih: +Rp 30.000.000 (+2.9%)
- [ ] Status: LAYAK - HARGA WAJAR
- [ ] Warna: Hijau
- [ ] Badge: LAYAK

### Test Case 5: Penawaran Sangat Baik
**Input:**
- (Data sama seperti Test Case 1)
- Penawaran Vendor: Rp 950.000.000

**Expected:**
- [ ] Kalkulasi: Rp 1.050.000.000
- [ ] Selisih: -Rp 100.000.000 (-9.5%)
- [ ] Status: LAYAK - HARGA SANGAT BAIK
- [ ] Warna: Biru
- [ ] Badge: LAYAK

### Test Case 6: Penawaran Terlalu Rendah
**Input:**
- (Data sama seperti Test Case 1)
- Penawaran Vendor: Rp 850.000.000

**Expected:**
- [ ] Kalkulasi: Rp 1.050.000.000
- [ ] Selisih: -Rp 200.000.000 (-19.0%)
- [ ] Status: LAYAK - HARGA TERLALU RENDAH
- [ ] Warna: Orange
- [ ] Badge: LAYAK

### Test Case 7: Penawaran Sama dengan Kalkulasi
**Input:**
- (Data sama seperti Test Case 1)
- Penawaran Vendor: Rp 1.050.000.000

**Expected:**
- [ ] Kalkulasi: Rp 1.050.000.000
- [ ] Selisih: Rp 0 (0%)
- [ ] Status: LAYAK - HARGA WAJAR
- [ ] Warna: Hijau
- [ ] Badge: LAYAK

## 🔍 Edge Cases

- [ ] Penawaran = 0 (tidak menampilkan analisis)
- [ ] Penawaran sangat besar (misal 999 triliun)
- [ ] Penawaran sangat kecil (misal Rp 1)
- [ ] Kalkulasi = 0 (tidak error, tidak menampilkan analisis)
- [ ] Input negatif (validasi)
- [ ] Input non-numeric (validasi)

## 📱 Responsive Testing

- [ ] Desktop (>1024px): Layout grid 3 kolom
- [ ] Tablet (768-1024px): Layout grid 2 kolom
- [ ] Mobile (<768px): Layout grid 1 kolom
- [ ] Badge kelayakan tidak overflow
- [ ] Text rekomendasi terbaca dengan baik
- [ ] Button tidak terpotong

## 🎨 Visual Testing

- [ ] Warna sesuai dengan kategori
- [ ] Kontras text cukup untuk dibaca
- [ ] Icon muncul dengan benar
- [ ] Border dan shadow konsisten
- [ ] Spacing antar elemen proporsional
- [ ] Font size dan weight sesuai hierarki

## ⚡ Performance Testing

- [ ] Perhitungan instant (<100ms)
- [ ] Tidak ada lag saat input
- [ ] PDF generate dalam waktu wajar (<3 detik)
- [ ] Tidak ada memory leak
- [ ] Smooth scrolling ke hasil

## 🔒 Security Testing

- [ ] Input sanitization untuk prevent XSS
- [ ] Validasi numeric input
- [ ] Tidak ada SQL injection risk
- [ ] Data penawaran tersimpan dengan aman

## 📊 Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## 📝 Documentation

- [ ] Dokumentasi fitur lengkap
- [ ] Panduan pengguna tersedia
- [ ] Test file berfungsi
- [ ] Checklist testing lengkap
- [ ] Contoh kasus jelas

## ✅ Final Checklist

- [ ] Semua test case passed
- [ ] Tidak ada bug critical
- [ ] UI/UX sesuai design
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Ready for production

## 📌 Notes

**Catatan Testing:**
- Gunakan `test_analisis_kelayakan_harga.html` untuk quick testing
- Verifikasi di aplikasi utama sebelum deploy
- Test dengan data real untuk validasi
- Dokumentasikan bug yang ditemukan

**Bug Found:**
(Catat bug yang ditemukan di sini)

---

**Tested By**: _________________  
**Date**: _________________  
**Status**: [ ] PASS [ ] FAIL  
**Notes**: _________________
