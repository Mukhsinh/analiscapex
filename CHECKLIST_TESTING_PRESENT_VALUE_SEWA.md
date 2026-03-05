# Checklist Testing: Fitur Present Value Analisa Sewa

## 📋 Informasi Testing
- **Tanggal:** 5 Maret 2026
- **Fitur:** Present Value & Analisis Kelayakan Harga Sewa
- **File:** `src/components/RentalAnalysisForm.jsx`
- **Tester:** _[Nama Tester]_

## ✅ Checklist Testing

### 1. Input Field Baru: Discount Rate

- [ ] **Field discount rate muncul** setelah field "Masa Sewa"
- [ ] **Label jelas**: "Discount Rate / Tingkat Diskonto (%)"
- [ ] **Placeholder**: "Contoh: 10"
- [ ] **Validasi**: Hanya menerima angka
- [ ] **Min value**: 0
- [ ] **Step**: 0.1
- [ ] **Helper text**: "Untuk menghitung Present Value biaya sewa"
- [ ] **Required field**: Ada tanda bintang merah (*)

**Test Cases:**
```
✓ Input: 10 → Diterima
✓ Input: 0 → Diterima
✓ Input: 15.5 → Diterima
✓ Input: -5 → Ditolak (min 0)
✓ Input: "abc" → Ditolak (hanya angka)
```

### 2. Perhitungan Present Value

#### Test Case 1: Perhitungan Dasar
**Input:**
- Harga penawaran vendor: Rp 350.000.000
- Masa sewa: 3 tahun
- Discount rate: 10%

**Expected Output:**
```
Tahun 1: 350.000.000 × 0.9091 = 318.181.818
Tahun 2: 350.000.000 × 0.8264 = 289.256.198
Tahun 3: 350.000.000 × 0.7513 = 262.959.998
Total PV: 870.398.014
```

- [ ] **PV Factor tahun 1** = 0.9091 (1/1.1)
- [ ] **PV Factor tahun 2** = 0.8264 (1/1.1²)
- [ ] **PV Factor tahun 3** = 0.7513 (1/1.1³)
- [ ] **Total PV** = Rp 870.398.014

#### Test Case 2: Discount Rate 0%
**Input:**
- Harga penawaran: Rp 350.000.000
- Masa sewa: 3 tahun
- Discount rate: 0%

**Expected:**
- [ ] **Total PV** = Rp 1.050.000.000 (sama dengan total nominal)

#### Test Case 3: Discount Rate Tinggi
**Input:**
- Harga penawaran: Rp 350.000.000
- Masa sewa: 3 tahun
- Discount rate: 20%

**Expected:**
- [ ] **Total PV** < Rp 870.398.014 (lebih rendah dari discount 10%)

### 3. Kartu Hasil: Present Value Biaya Sewa

- [ ] **Kartu muncul** di posisi kedua (setelah Harga Sewa Kalkulasi)
- [ ] **Label**: "Present Value Biaya Sewa"
- [ ] **Nilai**: Format currency (Rp xxx.xxx.xxx)
- [ ] **Warna**: Ungu (purple-700)
- [ ] **Helper text**: "Total PV dengan discount X%"
- [ ] **Background**: Putih dengan shadow
- [ ] **Responsive**: Tampil baik di mobile dan desktop

**Test Cases:**
```
✓ PV = 0 → Tampil "Rp 0"
✓ PV = 870.398.014 → Tampil "Rp 870.398.014"
✓ Discount rate berubah → PV otomatis update
✓ Harga penawaran berubah → PV otomatis update
```

### 4. Kartu Hasil: Efisiensi Biaya

- [ ] **Kartu muncul** di posisi ketiga
- [ ] **Label**: "Efisiensi Biaya"
- [ ] **Nilai**: Format persentase (XX.X%)
- [ ] **Formula**: (PV Sewa / Harga Beli) × 100%
- [ ] **Warna dinamis**:
  - Hijau jika < 100%
  - Orange jika ≥ 100%
- [ ] **Helper text**: "PV Sewa vs Harga Beli"

**Test Cases:**
```
Input: PV = 870.398.014, Harga Beli = 1.300.000.000
✓ Efisiensi = 67.0% (hijau)

Input: PV = 1.400.000.000, Harga Beli = 1.300.000.000
✓ Efisiensi = 107.7% (orange)

Input: PV = 0 atau Harga Beli = 0
✓ Tampil "N/A"
```

### 5. Kartu Hasil: Skor Kelayakan

- [ ] **Kartu muncul** di posisi keempat
- [ ] **Label**: "Skor Kelayakan"
- [ ] **Nilai**: LAYAK / TIDAK LAYAK
- [ ] **Warna dinamis**:
  - Hijau untuk LAYAK
  - Merah untuk TIDAK LAYAK
- [ ] **Helper text**: Menampilkan selisih persentase
- [ ] **Fallback**: "Belum Ada Data" jika penawaran vendor kosong

**Test Cases:**
```
✓ Penawaran vendor kosong → "Belum Ada Data"
✓ Kalkulasi ≥ Penawaran → "LAYAK" (hijau)
✓ Kalkulasi < Penawaran → "TIDAK LAYAK" (merah)
✓ Tampil selisih: "Selisih: X.X%"
```

### 6. Analisis Perbandingan Harga Penawaran

#### Kategori 1: TIDAK LAYAK - PERLU NEGOSIASI ULANG
**Test Case:**
- Kalkulasi: Rp 350.000.000
- Penawaran: Rp 420.000.000
- Selisih: +20%

- [ ] **Status**: "TIDAK LAYAK - PERLU NEGOSIASI ULANG"
- [ ] **Badge**: "TIDAK LAYAK" (merah)
- [ ] **Icon**: ⚠️
- [ ] **Warna**: Merah
- [ ] **Rekomendasi**: Menyebutkan target negosiasi maksimal

#### Kategori 2: TIDAK LAYAK - DAPAT DINEGOSIASIKAN
**Test Case:**
- Kalkulasi: Rp 350.000.000
- Penawaran: Rp 380.000.000
- Selisih: +8.6%

- [ ] **Status**: "TIDAK LAYAK - DAPAT DINEGOSIASIKAN"
- [ ] **Badge**: "TIDAK LAYAK" (kuning)
- [ ] **Icon**: 💡
- [ ] **Warna**: Kuning
- [ ] **Rekomendasi**: Saran negosiasi mendekati harga kalkulasi

#### Kategori 3: LAYAK - HARGA WAJAR
**Test Case:**
- Kalkulasi: Rp 350.000.000
- Penawaran: Rp 350.000.000
- Selisih: 0%

- [ ] **Status**: "LAYAK - HARGA WAJAR"
- [ ] **Badge**: "LAYAK" (hijau)
- [ ] **Icon**: ✅
- [ ] **Warna**: Hijau
- [ ] **Rekomendasi**: Lanjut ke kontrak

#### Kategori 4: LAYAK - HARGA SANGAT BAIK
**Test Case:**
- Kalkulasi: Rp 350.000.000
- Penawaran: Rp 330.000.000
- Selisih: -5.7%

- [ ] **Status**: "LAYAK - HARGA SANGAT BAIK"
- [ ] **Badge**: "LAYAK" (biru)
- [ ] **Icon**: 🎯
- [ ] **Warna**: Biru
- [ ] **Rekomendasi**: Segera lakukan kesepakatan

#### Kategori 5: LAYAK - HARGA TERLALU RENDAH
**Test Case:**
- Kalkulasi: Rp 350.000.000
- Penawaran: Rp 280.000.000
- Selisih: -20%

- [ ] **Status**: "LAYAK - HARGA TERLALU RENDAH (PERLU VERIFIKASI)"
- [ ] **Badge**: "LAYAK" (orange)
- [ ] **Icon**: 🔍
- [ ] **Warna**: Orange
- [ ] **Rekomendasi**: Verifikasi kualitas dan hidden cost

### 7. Logika Kelayakan

- [ ] **Box penjelasan** muncul di bawah analisis
- [ ] **Judul**: "📊 Logika Kelayakan:"
- [ ] **Isi**:
  - LAYAK: Harga kalkulasi ≥ harga penawaran
  - TIDAK LAYAK: Harga kalkulasi < harga penawaran

### 8. Deskripsi Halaman

- [ ] **Background**: Biru muda (blue-50)
- [ ] **Border**: Biru (border-blue-500)
- [ ] **Icon**: Info icon
- [ ] **Judul**: "Deskripsi:"
- [ ] **Konten**: Menjelaskan fungsi analisis Present Value
- [ ] **Box tambahan**: Penjelasan konsep PV dengan background biru

### 9. Laporan PDF

#### Bagian Data Input
- [ ] **Field discount rate** muncul di tabel input
- [ ] **Format**: "Discount Rate: X%"

#### Bagian Hasil Perhitungan
- [ ] **Harga Sewa per Tahun (Kalkulasi)**: Ada
- [ ] **Present Value Biaya Sewa**: Ada
- [ ] **Efisiensi Biaya**: Ada dengan format persentase
- [ ] **Skor Kelayakan**: Ada (LAYAK/TIDAK LAYAK)

#### Bagian Analisis & Rekomendasi
- [ ] **Point 1**: Present Value Biaya Sewa dengan penjelasan
- [ ] **Point 2**: Efisiensi Biaya dengan interpretasi
- [ ] **Point 3**: Skor Kelayakan dengan selisih
- [ ] **Rekomendasi**: Berdasarkan efisiensi dan kelayakan

#### Bagian Analisis Perbandingan (jika ada penawaran)
- [ ] **Tabel perbandingan**: Kalkulasi vs Penawaran vs Selisih
- [ ] **Status kelayakan**: Dengan warna yang sesuai
- [ ] **Badge kelayakan**: LAYAK/TIDAK LAYAK
- [ ] **Penjelasan logika**: Box dengan logika kelayakan
- [ ] **Kesimpulan**: Status dan penjelasan
- [ ] **Rekomendasi tindakan**: Spesifik per kategori

### 10. Responsiveness

#### Desktop (≥ 768px)
- [ ] **Grid 2 kolom** untuk kartu hasil
- [ ] **Semua kartu** tampil sejajar
- [ ] **Spacing** proporsional

#### Mobile (< 768px)
- [ ] **Grid 1 kolom** untuk kartu hasil
- [ ] **Kartu stack** secara vertikal
- [ ] **Font size** tetap readable
- [ ] **Padding** tidak terlalu besar

### 11. Interaksi & Update

- [ ] **Real-time calculation**: Hasil update saat input berubah
- [ ] **Discount rate berubah** → PV update
- [ ] **Harga penawaran berubah** → PV dan kelayakan update
- [ ] **Masa sewa berubah** → PV update
- [ ] **Smooth transition**: Tidak ada lag atau freeze

### 12. Edge Cases

#### Case 1: Semua Field Kosong
- [ ] **Kartu hasil**: Tidak muncul atau tampil 0
- [ ] **Tidak ada error**: Aplikasi tidak crash

#### Case 2: Discount Rate = 0
- [ ] **PV** = Total nominal (tidak ada diskonto)
- [ ] **Perhitungan**: Tetap berjalan normal

#### Case 3: Harga Penawaran Kosong
- [ ] **PV**: Tampil 0 atau tidak muncul
- [ ] **Skor Kelayakan**: "Belum Ada Data"
- [ ] **Analisis perbandingan**: Tidak muncul

#### Case 4: Masa Sewa = 0
- [ ] **PV**: Tampil 0
- [ ] **Tidak ada error**: Aplikasi tidak crash

#### Case 5: Harga Beli = 0
- [ ] **Efisiensi**: Tampil "N/A"
- [ ] **Tidak ada division by zero error**

### 13. Simpan ke Database

- [ ] **Field discount_rate** tersimpan
- [ ] **Field vendor_quote** tersimpan
- [ ] **Calculated PV** tersimpan (jika ada field)
- [ ] **Status kelayakan** tersimpan (jika ada field)

### 14. Konsistensi Data

- [ ] **Format currency**: Konsisten di semua tempat
- [ ] **Format persentase**: Konsisten (1 desimal)
- [ ] **Warna**: Konsisten dengan design system
- [ ] **Typography**: Konsisten dengan aplikasi

## 📊 Test Results Summary

### Passed: ___ / 100
### Failed: ___ / 100
### Blocked: ___ / 100

## 🐛 Bugs Found

| No | Deskripsi | Severity | Status |
|----|-----------|----------|--------|
| 1  |           |          |        |
| 2  |           |          |        |
| 3  |           |          |        |

## 📝 Notes

_[Tambahkan catatan testing di sini]_

## ✅ Sign-off

- [ ] **Semua test case passed**
- [ ] **Tidak ada critical bugs**
- [ ] **Dokumentasi lengkap**
- [ ] **Ready for production**

**Tester:** _______________  
**Date:** _______________  
**Signature:** _______________

---

**Versi:** 1.0  
**Tanggal:** 5 Maret 2026
