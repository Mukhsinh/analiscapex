# Checklist Testing: Analisa Sewa dengan Present Value

## 📋 Overview

Testing untuk memverifikasi fitur baru Present Value dan Feasibility Score pada halaman "Hitung Harga Sewa".

**Tanggal**: 05 Maret 2026  
**Tester**: -  
**Status**: Pending

## ✅ Test Cases

### 1. Input Discount Rate

#### TC-01: Field Discount Rate Muncul
- [ ] Field "Discount Rate / Tingkat Diskonto (%)" muncul di form
- [ ] Field berada setelah field "Masa Sewa"
- [ ] Placeholder text: "Contoh: 10"
- [ ] Helper text: "Tingkat diskonto untuk menghitung Present Value biaya sewa"

#### TC-02: Input Discount Rate Valid
- [ ] Bisa input angka desimal (contoh: 10.5)
- [ ] Bisa input angka bulat (contoh: 10)
- [ ] Tidak bisa input angka negatif
- [ ] Tidak bisa input huruf atau karakter khusus

#### TC-03: Discount Rate Default
- [ ] Jika tidak diisi, default = 0
- [ ] Perhitungan tetap jalan dengan discount rate 0

---

### 2. Perhitungan Present Value

#### TC-04: PV Calculation dengan Discount Rate 0%
**Input:**
```
Harga Sewa: Rp 350.000.000/tahun
Masa Sewa: 3 tahun
Discount Rate: 0%
```

**Expected Output:**
```
PV = 350.000.000 × 3 = Rp 1.050.000.000
```

- [ ] PV sama dengan total nominal
- [ ] Tidak ada error

#### TC-05: PV Calculation dengan Discount Rate 10%
**Input:**
```
Harga Sewa: Rp 350.000.000/tahun
Masa Sewa: 3 tahun
Discount Rate: 10%
```

**Expected Output:**
```
Tahun 1: 350.000.000 / 1.10¹ = 318.181.818
Tahun 2: 350.000.000 / 1.10² = 289.256.198
Tahun 3: 350.000.000 / 1.10³ = 263.051.089
Total PV = 870.489.105
```

- [ ] PV = Rp 870.489.105 (±1000 untuk pembulatan)
- [ ] PV lebih kecil dari total nominal
- [ ] Perhitungan akurat

#### TC-06: PV Calculation dengan Discount Rate Tinggi (20%)
**Input:**
```
Harga Sewa: Rp 350.000.000/tahun
Masa Sewa: 3 tahun
Discount Rate: 20%
```

**Expected Output:**
```
PV ≈ Rp 763.888.889
```

- [ ] PV lebih kecil dari kasus 10%
- [ ] Semakin tinggi discount rate, semakin kecil PV
- [ ] Perhitungan akurat

---

### 3. Kartu Hasil Baru

#### TC-07: Kartu "Harga Sewa per Tahun (Kalkulasi)"
- [ ] Judul: "Harga Sewa per Tahun (Kalkulasi)"
- [ ] Nilai dalam format currency (Rp)
- [ ] Warna: hijau (text-green-700)
- [ ] Helper text: "Hasil perhitungan optimal"

#### TC-08: Kartu "Present Value Biaya Sewa"
- [ ] Judul: "Present Value Biaya Sewa"
- [ ] Nilai dalam format currency (Rp)
- [ ] Warna: ungu (text-purple-700)
- [ ] Helper text: "Total PV dengan discount X%"
- [ ] X sesuai dengan input discount rate

#### TC-09: Kartu "Feasibility Score" - Tanpa Penawaran
- [ ] Judul: "Feasibility Score"
- [ ] Nilai: "N/A"
- [ ] Warna: abu-abu (text-gray-400)
- [ ] Helper text: "Masukkan harga penawaran"

#### TC-10: Kartu "Savings Potential" - Tanpa Penawaran
- [ ] Judul: "Savings Potential"
- [ ] Nilai: "N/A"
- [ ] Warna: abu-abu (text-gray-400)
- [ ] Helper text: "Perbandingan dengan penawaran"

---

### 4. Feasibility Score System

#### TC-11: Score A+ (Selisih < -15%)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 280.000.000
Selisih: -20%
```

**Expected:**
- [ ] Score: "A+ (Verifikasi)"
- [ ] Warna: orange (text-orange-600)
- [ ] Helper text: "Selisih: 20.0%"

#### TC-12: Score A (Selisih -15% s/d -5%)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 320.000.000
Selisih: -8.6%
```

**Expected:**
- [ ] Score: "A (Sangat Baik)"
- [ ] Warna: biru (text-blue-600)
- [ ] Helper text: "Selisih: 8.6%"

#### TC-13: Score B (Selisih -5% s/d +5%)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 355.000.000
Selisih: +1.4%
```

**Expected:**
- [ ] Score: "B (Wajar)"
- [ ] Warna: hijau (text-green-600)
- [ ] Helper text: "Selisih: 1.4%"

#### TC-14: Score C (Selisih +5% s/d +15%)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 385.000.000
Selisih: +10%
```

**Expected:**
- [ ] Score: "C (Negosiasi)"
- [ ] Warna: kuning (text-yellow-600)
- [ ] Helper text: "Selisih: 10.0%"

#### TC-15: Score D (Selisih > +15%)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 450.000.000
Selisih: +28.6%
```

**Expected:**
- [ ] Score: "D (Tidak Layak)"
- [ ] Warna: merah (text-red-600)
- [ ] Helper text: "Selisih: 28.6%"

---

### 5. Savings Potential

#### TC-16: Savings Potential - Penghematan (Negatif)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 320.000.000
Masa Sewa: 3 tahun
Selisih: -Rp 30.000.000
```

**Expected:**
- [ ] Nilai: "Rp 90.000.000"
- [ ] Warna: hijau (text-green-700)
- [ ] Helper text: "Potensi penghematan total"
- [ ] Perhitungan: 30.000.000 × 3 = 90.000.000

#### TC-17: Savings Potential - Biaya Tambahan (Positif)
**Input:**
```
Harga Kalkulasi: Rp 350.000.000
Harga Penawaran: Rp 400.000.000
Masa Sewa: 3 tahun
Selisih: +Rp 50.000.000
```

**Expected:**
- [ ] Nilai: "Rp 150.000.000"
- [ ] Warna: merah (text-red-700)
- [ ] Helper text: "Potensi biaya tambahan"
- [ ] Perhitungan: 50.000.000 × 3 = 150.000.000

---

### 6. Integrasi dengan Fitur Existing

#### TC-18: Analisis Perbandingan Harga Penawaran
- [ ] Section "Analisis Perbandingan Harga Penawaran" masih muncul
- [ ] Badge LAYAK/TIDAK LAYAK sesuai logika
- [ ] Rekomendasi negosiasi sesuai score
- [ ] Tidak ada konflik dengan kartu baru

#### TC-19: Simpan Analisis
- [ ] Bisa simpan analisis dengan discount rate
- [ ] Data tersimpan ke database
- [ ] Discount rate tersimpan dengan benar
- [ ] Tidak ada error saat save

#### TC-20: Generate PDF
- [ ] PDF bisa di-generate
- [ ] PDF mencantumkan discount rate
- [ ] PDF mencantumkan Present Value
- [ ] PDF mencantumkan Feasibility Score
- [ ] PDF mencantumkan Savings Potential

---

### 7. Edge Cases

#### TC-21: Discount Rate = 0
- [ ] PV = Total Nominal
- [ ] Tidak ada error
- [ ] Perhitungan tetap akurat

#### TC-22: Discount Rate Sangat Tinggi (>50%)
- [ ] PV sangat kecil
- [ ] Tidak ada error
- [ ] Perhitungan tetap akurat

#### TC-23: Masa Sewa = 1 Tahun
- [ ] PV calculation benar
- [ ] Savings potential benar
- [ ] Tidak ada error

#### TC-24: Masa Sewa Panjang (>10 Tahun)
- [ ] PV calculation benar
- [ ] Tidak ada overflow
- [ ] Performance tetap baik

#### TC-25: Harga Penawaran = Harga Kalkulasi
- [ ] Selisih = 0%
- [ ] Score: B (Wajar)
- [ ] Savings Potential = Rp 0

---

### 8. UI/UX Testing

#### TC-26: Responsive Design
- [ ] Desktop: 4 kartu dalam 2 kolom
- [ ] Tablet: 2 kartu per baris
- [ ] Mobile: 1 kartu per baris
- [ ] Tidak ada overflow

#### TC-27: Color Consistency
- [ ] Warna score sesuai dengan severity
- [ ] Warna savings sesuai dengan positif/negatif
- [ ] Kontras warna cukup untuk readability

#### TC-28: Loading State
- [ ] Tidak ada flickering saat perhitungan
- [ ] Transisi smooth
- [ ] No layout shift

#### TC-29: Error Handling
- [ ] Input invalid ditolak dengan graceful
- [ ] Error message jelas
- [ ] Tidak crash aplikasi

---

### 9. Data Validation

#### TC-30: Validasi Input Lengkap
**Input:**
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran: Rp 350.000.000
```

**Expected:**
- [ ] Semua field terisi
- [ ] Perhitungan akurat
- [ ] Semua kartu menampilkan nilai
- [ ] Tidak ada error

#### TC-31: Validasi Input Minimal (Tanpa Penawaran)
**Input:**
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran: (kosong)
```

**Expected:**
- [ ] Harga kalkulasi muncul
- [ ] PV muncul (dari harga kalkulasi)
- [ ] Feasibility Score: N/A
- [ ] Savings Potential: N/A

---

### 10. Cross-Browser Testing

#### TC-32: Chrome
- [ ] Semua fitur berfungsi
- [ ] UI tampil dengan benar
- [ ] Perhitungan akurat

#### TC-33: Firefox
- [ ] Semua fitur berfungsi
- [ ] UI tampil dengan benar
- [ ] Perhitungan akurat

#### TC-34: Edge
- [ ] Semua fitur berfungsi
- [ ] UI tampil dengan benar
- [ ] Perhitungan akurat

#### TC-35: Safari (jika ada)
- [ ] Semua fitur berfungsi
- [ ] UI tampil dengan benar
- [ ] Perhitungan akurat

---

## 📊 Test Data

### Data Set 1: Penawaran Layak (Score B)
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran: Rp 350.000.000
```

**Expected Results:**
- Harga Kalkulasi: Rp 356.666.667
- PV: Rp 870.489.105
- Score: B (Wajar)
- Savings: Rp 20.000.000 (hemat)

### Data Set 2: Penawaran Tidak Layak (Score D)
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran: Rp 450.000.000
```

**Expected Results:**
- Harga Kalkulasi: Rp 356.666.667
- PV: Rp 1.119.771.849
- Score: D (Tidak Layak)
- Savings: Rp 280.000.000 (biaya tambahan)

### Data Set 3: Penawaran Sangat Baik (Score A)
```
Nama Alat: MRI 1.5 Tesla
Harga Beli: Rp 5.000.000.000
Umur Ekonomis: 10 tahun
Nilai Residu: Rp 500.000.000
Tingkat Keuntungan: 15%
Masa Sewa: 5 tahun
Discount Rate: 12%
Harga Penawaran: Rp 1.000.000.000
```

**Expected Results:**
- Harga Kalkulasi: Rp 1.050.000.000
- PV: Rp 3.604.776.202
- Score: A (Sangat Baik)
- Savings: Rp 250.000.000 (hemat)

---

## 🐛 Bug Tracking

### Bug #1: [Judul Bug]
- **Severity**: High/Medium/Low
- **Description**: 
- **Steps to Reproduce**:
  1. 
  2. 
  3. 
- **Expected**: 
- **Actual**: 
- **Status**: Open/Fixed

---

## ✅ Sign-off

### Tester
- **Name**: 
- **Date**: 
- **Signature**: 

### Developer
- **Name**: 
- **Date**: 
- **Signature**: 

### Product Owner
- **Name**: 
- **Date**: 
- **Signature**: 

---

## 📝 Notes

- Semua test case harus PASS sebelum deploy ke production
- Jika ada bug critical, harus di-fix terlebih dahulu
- Dokumentasikan semua issue yang ditemukan
- Update checklist ini jika ada perubahan requirement

---

**Status**: ⏳ Pending Testing  
**Last Updated**: 05 Maret 2026
