# Perbaikan Analisa Sewa dengan Present Value - 05 Maret 2026

## 📋 Ringkasan Perubahan

Perbaikan pada halaman "Hitung Harga Sewa" untuk menambahkan konsep Present Value (PV) dan meningkatkan analisis kelayakan harga penawaran vendor dengan score yang lebih informatif.

## 🎯 Tujuan Perbaikan

1. **Menambahkan konsep Present Value** untuk menghitung nilai sekarang dari biaya sewa yang harus dibayar
2. **Menambahkan input Discount Rate** untuk perhitungan PV
3. **Mengubah tampilan hasil** dari "Total Pendapatan Sewa" dan "ROI" menjadi score yang lebih tepat:
   - **Feasibility Score**: Skor kelayakan harga penawaran (A+ hingga D)
   - **Savings Potential**: Potensi penghematan atau biaya tambahan

## ✅ Perubahan yang Dilakukan

### 1. Input Baru: Discount Rate

**File**: `src/components/RentalAnalysisForm.jsx`

Menambahkan field input untuk Discount Rate / Tingkat Diskonto:

```jsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Discount Rate / Tingkat Diskonto (%)
    <span className="text-red-500 ml-1">*</span>
  </label>
  <input
    type="number"
    value={data.discountRate || ''}
    onChange={(e) => handleChange('discountRate', parseFloat(e.target.value) || 0)}
    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    placeholder="Contoh: 10"
    min="0"
    step="0.1"
  />
  <p className="mt-1 text-xs text-gray-500">Tingkat diskonto untuk menghitung Present Value biaya sewa</p>
</div>
```

### 2. Perhitungan Present Value

Fungsi `calculatePresentValue()` sudah ada dan menghitung:
- PV dari biaya sewa yang harus dibayar per tahun
- Menggunakan discount rate yang diinput user
- Formula: PV = Σ (Biaya Sewa Tahunan / (1 + r)^t)

### 3. Kartu Hasil Baru

**Sebelum:**
- Harga Sewa per Tahun
- Total Pendapatan Sewa
- Total Biaya (Beli - Residu)
- Total Keuntungan

**Sesudah:**
- **Harga Sewa per Tahun (Kalkulasi)**: Hasil perhitungan optimal
- **Present Value Biaya Sewa**: Total PV dengan discount rate
- **Feasibility Score**: Skor kelayakan A+ hingga D
- **Savings Potential**: Potensi penghematan atau biaya tambahan

### 4. Feasibility Score System

Score berdasarkan selisih persentase antara harga kalkulasi dan penawaran vendor:

| Score | Selisih | Warna | Keterangan |
|-------|---------|-------|------------|
| **A+ (Verifikasi)** | < -15% | Orange | Penawaran terlalu rendah, perlu verifikasi |
| **A (Sangat Baik)** | -15% s/d -5% | Blue | Penawaran sangat kompetitif |
| **B (Wajar)** | -5% s/d +5% | Green | Harga wajar dan dapat diterima |
| **C (Negosiasi)** | +5% s/d +15% | Yellow | Dapat dinegosiasikan |
| **D (Tidak Layak)** | > +15% | Red | Perlu negosiasi ulang |

### 5. Savings Potential

Menampilkan:
- **Potensi Penghematan** (hijau): Jika penawaran vendor lebih rendah dari kalkulasi
- **Potensi Biaya Tambahan** (merah): Jika penawaran vendor lebih tinggi dari kalkulasi

Perhitungan: `|Selisih Harga| × Masa Sewa`

## 📊 Konsep Present Value

### Apa itu Present Value?

Present Value (PV) adalah nilai sekarang dari uang yang akan diterima atau dibayar di masa depan, dengan mempertimbangkan tingkat diskonto (discount rate).

### Mengapa Penting untuk Analisa Sewa?

1. **Time Value of Money**: Uang yang dibayar di masa depan memiliki nilai lebih rendah dibanding uang saat ini
2. **Perbandingan yang Adil**: Membandingkan biaya sewa dengan harga beli secara apple-to-apple
3. **Keputusan Investasi**: Membantu menentukan apakah lebih baik menyewa atau membeli

### Formula PV dalam Konteks Sewa

```
PV Total = Σ (Biaya Sewa Tahun ke-t / (1 + r)^t)

Dimana:
- t = tahun ke-1 sampai masa sewa
- r = discount rate (tingkat diskonto)
```

### Contoh Perhitungan

**Data Input:**
- Harga Sewa per Tahun: Rp 350.000.000
- Masa Sewa: 3 tahun
- Discount Rate: 10%

**Perhitungan PV:**
```
Tahun 1: 350.000.000 / (1.10)^1 = 318.181.818
Tahun 2: 350.000.000 / (1.10)^2 = 289.256.198
Tahun 3: 350.000.000 / (1.10)^3 = 263.051.089
---------------------------------------------------
Total PV = 870.489.105
```

**Interpretasi:**
- Total biaya nominal: Rp 1.050.000.000 (350 juta × 3 tahun)
- Present Value: Rp 870.489.105
- Selisih: Rp 179.510.895 (nilai waktu uang)

## 🎨 Tampilan UI

### Kartu Feasibility Score

```
┌─────────────────────────────────┐
│ Feasibility Score               │
│                                 │
│ A (Sangat Baik)                 │ <- Warna biru
│ Selisih: 8.5%                   │
└─────────────────────────────────┘
```

### Kartu Savings Potential

```
┌─────────────────────────────────┐
│ Savings Potential               │
│                                 │
│ Rp 90.000.000                   │ <- Hijau jika hemat
│ Potensi penghematan total       │
└─────────────────────────────────┘
```

## 🔍 Logika Kelayakan

### Kriteria LAYAK
- Harga kalkulasi ≥ harga penawaran
- Penawaran vendor lebih rendah atau sama dengan kalkulasi
- Score: A+, A, atau B

### Kriteria TIDAK LAYAK
- Harga kalkulasi < harga penawaran
- Penawaran vendor lebih tinggi dari kalkulasi
- Score: C atau D

## 📝 Cara Penggunaan

### 1. Input Data Dasar
- Nama Alat
- Harga Beli Alat
- Umur Ekonomis Alat
- Nilai Residu
- Tingkat Keuntungan Vendor
- Masa Sewa

### 2. Input Discount Rate
- Masukkan tingkat diskonto (contoh: 10%)
- Biasanya menggunakan WACC (Weighted Average Cost of Capital) atau tingkat bunga pinjaman

### 3. Input Harga Penawaran Vendor (Opsional)
- Masukkan harga SEWA per tahun yang ditawarkan vendor
- BUKAN harga beli alat

### 4. Lihat Hasil
- **Harga Sewa per Tahun**: Hasil kalkulasi optimal
- **Present Value**: Nilai sekarang dari total biaya sewa
- **Feasibility Score**: Skor kelayakan penawaran
- **Savings Potential**: Potensi hemat/tambahan biaya

### 5. Analisis Kelayakan
- Lihat badge LAYAK/TIDAK LAYAK
- Baca rekomendasi negosiasi
- Pertimbangkan score dan savings potential

## 🎯 Manfaat Perbaikan

### 1. Analisis Lebih Akurat
- Mempertimbangkan time value of money
- Perbandingan yang lebih fair antara sewa vs beli

### 2. Score yang Mudah Dipahami
- Sistem grading A+ hingga D
- Langsung terlihat kelayakan penawaran

### 3. Informasi Savings yang Jelas
- Tahu berapa potensi hemat atau biaya tambahan
- Dalam nilai rupiah yang konkret

### 4. Keputusan yang Lebih Baik
- Data lebih lengkap untuk negosiasi
- Rekomendasi yang spesifik dan actionable

## 📊 Contoh Kasus

### Kasus 1: Penawaran Layak (Score B)

**Input:**
- Harga Beli: Rp 1.300.000.000
- Umur Ekonomis: 5 tahun
- Nilai Residu: Rp 130.000.000
- Tingkat Keuntungan: 20%
- Masa Sewa: 3 tahun
- Discount Rate: 10%
- Harga Penawaran Vendor: Rp 350.000.000/tahun

**Hasil:**
- Harga Kalkulasi: Rp 356.666.667/tahun
- Present Value: Rp 870.489.105
- Feasibility Score: **B (Wajar)** ✅
- Savings Potential: Rp 20.000.000 (penghematan)
- Status: **LAYAK**

**Rekomendasi:** Harga sudah kompetitif, dapat melanjutkan ke tahap kontrak.

### Kasus 2: Penawaran Tidak Layak (Score D)

**Input:**
- Harga Beli: Rp 1.300.000.000
- Umur Ekonomis: 5 tahun
- Nilai Residu: Rp 130.000.000
- Tingkat Keuntungan: 20%
- Masa Sewa: 3 tahun
- Discount Rate: 10%
- Harga Penawaran Vendor: Rp 450.000.000/tahun

**Hasil:**
- Harga Kalkulasi: Rp 356.666.667/tahun
- Present Value: Rp 1.119.771.849
- Feasibility Score: **D (Tidak Layak)** ❌
- Savings Potential: Rp 280.000.000 (biaya tambahan)
- Status: **TIDAK LAYAK**

**Rekomendasi:** Harga penawaran terlalu tinggi (>15%). Sangat disarankan negosiasi ulang dengan target maksimal Rp 392.333.334 (kalkulasi + 10%).

## 🔧 File yang Dimodifikasi

1. **src/components/RentalAnalysisForm.jsx**
   - Menambahkan input Discount Rate
   - Mengubah tampilan kartu hasil
   - Menambahkan Feasibility Score
   - Menambahkan Savings Potential

## 📚 Referensi

- Time Value of Money: https://www.investopedia.com/terms/t/timevalueofmoney.asp
- Present Value: https://www.investopedia.com/terms/p/presentvalue.asp
- Discount Rate: https://www.investopedia.com/terms/d/discountrate.asp

## ✅ Testing

### Test Case 1: Input Lengkap dengan Penawaran
- [x] Input semua field termasuk discount rate
- [x] Input harga penawaran vendor
- [x] Feasibility Score muncul dengan benar
- [x] Savings Potential terhitung akurat
- [x] Badge LAYAK/TIDAK LAYAK sesuai logika

### Test Case 2: Tanpa Harga Penawaran
- [x] Feasibility Score menampilkan "N/A"
- [x] Savings Potential menampilkan "N/A"
- [x] Pesan "Masukkan harga penawaran" muncul

### Test Case 3: Berbagai Skenario Score
- [x] Score A+ untuk selisih < -15%
- [x] Score A untuk selisih -15% s/d -5%
- [x] Score B untuk selisih -5% s/d +5%
- [x] Score C untuk selisih +5% s/d +15%
- [x] Score D untuk selisih > +15%

## 🎉 Kesimpulan

Perbaikan ini meningkatkan kualitas analisis harga sewa dengan:
1. Menambahkan konsep Present Value yang lebih akurat
2. Memberikan score kelayakan yang mudah dipahami
3. Menampilkan potensi penghematan/biaya tambahan secara jelas
4. Membantu user membuat keputusan yang lebih baik dalam negosiasi

---

**Tanggal**: 05 Maret 2026  
**Status**: ✅ Selesai  
**Versi**: 1.0
