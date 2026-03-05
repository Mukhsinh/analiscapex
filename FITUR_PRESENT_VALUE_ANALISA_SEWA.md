# Fitur Present Value dalam Analisa Harga Sewa

## 📋 Ringkasan Perubahan

Halaman "Hitung Harga Sewa" telah ditingkatkan dengan menambahkan konsep **Present Value (PV)** dan analisis kelayakan yang lebih komprehensif untuk membantu user mengevaluasi apakah harga penawaran sewa dari vendor layak atau tidak.

## 🎯 Tujuan

Fitur ini dirancang untuk:
1. **Menghitung nilai sekarang** dari biaya sewa yang akan dibayar di masa depan
2. **Membandingkan efisiensi** antara menyewa vs membeli alat
3. **Menganalisis kelayakan** harga penawaran vendor secara objektif
4. **Memberikan rekomendasi** negosiasi yang spesifik

## ✨ Fitur Baru

### 1. Input Discount Rate
- **Field baru**: Discount Rate / Tingkat Diskonto (%)
- **Fungsi**: Untuk menghitung Present Value dari biaya sewa
- **Contoh nilai**: 10% (sesuai dengan cost of capital atau WACC perusahaan)
- **Lokasi**: Setelah field "Masa Sewa"

### 2. Perhitungan Present Value
```javascript
// Formula PV Factor
PV Factor = 1 / (1 + discount_rate)^year

// Total Present Value
Total PV = Σ (Biaya Sewa Tahunan × PV Factor)
```

**Contoh Perhitungan:**
- Harga sewa vendor: Rp 350.000.000/tahun
- Masa sewa: 3 tahun
- Discount rate: 10%

| Tahun | Biaya Sewa | PV Factor | PV Expense |
|-------|------------|-----------|------------|
| 1 | 350.000.000 | 0.9091 | 318.181.818 |
| 2 | 350.000.000 | 0.8264 | 289.256.198 |
| 3 | 350.000.000 | 0.7513 | 262.959.998 |
| **Total** | **1.050.000.000** | - | **870.398.014** |

### 3. Kartu Hasil yang Diperbarui

#### Sebelum:
- Harga Sewa per Tahun
- Total Pendapatan Sewa
- Total Biaya (Beli - Residu)
- Total Keuntungan

#### Sesudah:
1. **Harga Sewa per Tahun (Kalkulasi)**
   - Hasil perhitungan optimal berdasarkan rumus
   - Warna: Hijau

2. **Present Value Biaya Sewa**
   - Total PV dengan discount rate yang dipilih
   - Menunjukkan nilai sekarang dari total biaya sewa
   - Warna: Ungu

3. **Efisiensi Biaya**
   - Perbandingan PV Sewa vs Harga Beli
   - Formula: `(PV Sewa / Harga Beli) × 100%`
   - Interpretasi:
     - < 100%: Sewa lebih efisien (hijau)
     - ≥ 100%: Beli lebih efisien (orange)
   - Warna: Hijau/Orange (dinamis)

4. **Skor Kelayakan**
   - Status: LAYAK / TIDAK LAYAK
   - Berdasarkan perbandingan harga kalkulasi vs penawaran vendor
   - Menampilkan selisih persentase
   - Warna: Hijau (LAYAK) / Merah (TIDAK LAYAK)

## 📊 Logika Kelayakan

### Kriteria Penilaian

| Selisih | Status | Warna | Rekomendasi |
|---------|--------|-------|-------------|
| > +15% | TIDAK LAYAK - PERLU NEGOSIASI ULANG | Merah | Negosiasi dengan target maks kalkulasi + 10% |
| +5% s/d +15% | TIDAK LAYAK - DAPAT DINEGOSIASIKAN | Kuning | Coba negosiasi mendekati harga kalkulasi |
| -5% s/d +5% | LAYAK - HARGA WAJAR | Hijau | Harga kompetitif, lanjut ke kontrak |
| -15% s/d -5% | LAYAK - HARGA SANGAT BAIK | Biru | Segera lakukan kesepakatan |
| < -15% | LAYAK - HARGA TERLALU RENDAH | Orange | Verifikasi kualitas dan hidden cost |

### Formula Selisih
```javascript
Selisih = Harga Penawaran Vendor - Harga Kalkulasi
Selisih % = (Selisih / Harga Kalkulasi) × 100%
```

**Logika Dasar:**
- **LAYAK**: Harga kalkulasi ≥ harga penawaran (penawaran lebih rendah atau sama)
- **TIDAK LAYAK**: Harga kalkulasi < harga penawaran (penawaran lebih tinggi)

## 🎨 Tampilan UI

### Kartu Present Value Biaya Sewa
```
┌─────────────────────────────────────┐
│ Present Value Biaya Sewa            │
│ Rp 870.398.014                      │
│ Total PV dengan discount 10%        │
└─────────────────────────────────────┘
```

### Kartu Efisiensi Biaya
```
┌─────────────────────────────────────┐
│ Efisiensi Biaya                     │
│ 67.1%                               │
│ PV Sewa vs Harga Beli               │
└─────────────────────────────────────┘
```

### Kartu Skor Kelayakan
```
┌─────────────────────────────────────┐
│ Skor Kelayakan                      │
│ LAYAK                               │
│ Selisih: 5.2%                       │
└─────────────────────────────────────┘
```

## 📄 Laporan PDF

Laporan PDF telah diperbarui dengan:

### Bagian III: Hasil Perhitungan
- Harga Sewa per Tahun (Kalkulasi)
- Present Value Biaya Sewa
- Efisiensi Biaya (PV vs Harga Beli)
- Skor Kelayakan

### Bagian V: Analisis & Rekomendasi
1. **Present Value Biaya Sewa**
   - Nilai total PV dengan discount rate
   - Penjelasan konsep nilai waktu uang

2. **Efisiensi Biaya**
   - Perbandingan PV terhadap harga beli
   - Interpretasi hasil (lebih efisien sewa/beli)

3. **Skor Kelayakan**
   - Status kelayakan harga penawaran
   - Selisih persentase

4. **Rekomendasi**
   - Berdasarkan efisiensi biaya
   - Berdasarkan kelayakan penawaran
   - Saran negosiasi spesifik

## 🔧 Implementasi Teknis

### File yang Dimodifikasi
- `src/components/RentalAnalysisForm.jsx`

### Fungsi Baru

#### 1. calculatePVFactor
```javascript
const calculatePVFactor = (rate, year) => {
  return 1 / Math.pow(1 + rate / 100, year)
}
```

#### 2. calculatePresentValue
```javascript
const calculatePresentValue = () => {
  const discountRate = data.discountRate || 0
  const rentalPeriod = data.rentalPeriod || 0
  const vendorQuote = data.vendorQuote || 0
  
  if (!vendorQuote || !rentalPeriod || vendorQuote === 0) {
    return 0
  }
  
  let totalPV = 0
  for (let year = 1; year <= rentalPeriod; year++) {
    const pvFactor = calculatePVFactor(discountRate, year)
    const pvExpense = vendorQuote * pvFactor
    totalPV += pvExpense
  }
  
  return totalPV
}
```

### State yang Ditambahkan
```javascript
const presentValueCost = calculatePresentValue()
```

## 📖 Cara Penggunaan

### Langkah 1: Input Data Dasar
1. Masukkan nama alat
2. Masukkan harga beli alat
3. Masukkan umur ekonomis
4. Masukkan nilai residu (opsional)
5. Masukkan tingkat keuntungan vendor
6. Masukkan masa sewa

### Langkah 2: Input Discount Rate
1. Masukkan discount rate (contoh: 10%)
2. Gunakan cost of capital atau WACC perusahaan
3. Jika tidak tahu, gunakan 8-12% sebagai estimasi

### Langkah 3: Input Harga Penawaran Vendor
1. Masukkan harga SEWA per tahun dari vendor
2. **PENTING**: Ini adalah harga sewa, bukan harga beli
3. Sistem akan otomatis menghitung PV dan kelayakan

### Langkah 4: Analisis Hasil
1. Lihat kartu "Present Value Biaya Sewa"
2. Lihat kartu "Efisiensi Biaya"
3. Lihat kartu "Skor Kelayakan"
4. Baca analisis perbandingan harga penawaran

### Langkah 5: Ambil Keputusan
- Jika **LAYAK**: Lanjutkan negosiasi/kontrak
- Jika **TIDAK LAYAK**: Negosiasi ulang sesuai rekomendasi

## 💡 Contoh Kasus

### Kasus 1: Penawaran Layak
**Input:**
- Harga beli: Rp 1.300.000.000
- Umur ekonomis: 5 tahun
- Nilai residu: Rp 130.000.000
- Tingkat keuntungan: 20%
- Masa sewa: 3 tahun
- Discount rate: 10%
- Harga penawaran vendor: Rp 330.000.000/tahun

**Hasil:**
- Harga kalkulasi: Rp 350.000.000/tahun
- PV biaya sewa: Rp 820.000.000
- Efisiensi: 63.1% (sewa lebih efisien)
- Skor: **LAYAK - HARGA SANGAT BAIK**
- Selisih: -5.7% (penawaran lebih rendah)

**Rekomendasi:** Segera lakukan kesepakatan!

### Kasus 2: Penawaran Tidak Layak
**Input:**
- Harga beli: Rp 1.300.000.000
- Umur ekonomis: 5 tahun
- Nilai residu: Rp 130.000.000
- Tingkat keuntungan: 20%
- Masa sewa: 3 tahun
- Discount rate: 10%
- Harga penawaran vendor: Rp 420.000.000/tahun

**Hasil:**
- Harga kalkulasi: Rp 350.000.000/tahun
- PV biaya sewa: Rp 1.044.000.000
- Efisiensi: 80.3% (sewa masih efisien)
- Skor: **TIDAK LAYAK - PERLU NEGOSIASI ULANG**
- Selisih: +20% (penawaran terlalu tinggi)

**Rekomendasi:** Negosiasi dengan target maksimal Rp 385.000.000/tahun

## 🎯 Manfaat

### Untuk User
1. **Keputusan lebih objektif** berdasarkan nilai waktu uang
2. **Perbandingan apple-to-apple** antara sewa vs beli
3. **Rekomendasi negosiasi** yang spesifik dan terukur
4. **Dokumentasi lengkap** dalam format PDF profesional

### Untuk Organisasi
1. **Efisiensi biaya** dengan memilih opsi terbaik
2. **Transparansi** dalam proses pengambilan keputusan
3. **Standarisasi** analisis kelayakan sewa
4. **Audit trail** yang jelas

## 📝 Catatan Penting

1. **Discount Rate**: Gunakan cost of capital perusahaan untuk akurasi maksimal
2. **Harga Penawaran**: Pastikan memasukkan harga SEWA per tahun, bukan harga beli
3. **Interpretasi PV**: PV yang lebih rendah dari harga beli menunjukkan sewa lebih efisien
4. **Kelayakan**: Status kelayakan hanya muncul jika harga penawaran vendor diisi

## 🔄 Update Selanjutnya

Fitur yang dapat ditambahkan:
- [ ] Perbandingan multiple vendor quotes
- [ ] Grafik visualisasi PV per tahun
- [ ] Sensitivity analysis untuk discount rate
- [ ] Export ke Excel dengan detail PV per tahun
- [ ] Historical comparison dengan analisis sebelumnya

---

**Tanggal Implementasi:** 5 Maret 2026  
**Versi:** 2.0  
**Status:** ✅ Selesai
