# Perbaikan Input Angka dan Format Tampilan
**Tanggal:** 25 Februari 2026

## Ringkasan Perubahan

Memperbaiki sistem input angka di seluruh aplikasi agar:
1. Dapat menerima input multi-digit sekaligus (tidak terbatas satu digit)
2. Menggunakan format Rupiah penuh (bukan dalam satuan juta)
3. Menampilkan pemisah ribuan (titik) tanpa desimal/sen
4. Memperbaiki perhitungan agar konsisten dengan format baru

## Masalah yang Diperbaiki

### 1. Input Satu Digit
**Masalah:** Input menggunakan `type="number"` yang membatasi input dan tidak mendukung format pemisah ribuan.

**Solusi:** Mengubah semua input angka menjadi `type="text"` dengan fungsi format dan parse khusus.

### 2. Format Satuan Juta
**Masalah:** Input dan label menggunakan satuan juta (misal: 1.3 untuk 1.3 miliar).

**Solusi:** Mengubah semua input menjadi format Rupiah penuh dengan pemisah ribuan.

### 3. Tidak Ada Pemisah Ribuan
**Masalah:** Angka ditampilkan tanpa pemisah, sulit dibaca (misal: 1300000000).

**Solusi:** Menambahkan fungsi `formatInputNumber()` yang menambahkan titik sebagai pemisah ribuan.

## File yang Diubah

### 1. src/components/RevenueShareForm.jsx
**Perubahan:**
- Menambahkan fungsi `formatInputNumber()` dan `parseInputNumber()`
- Mengubah semua input dari `type="number"` ke `type="text"`
- Mengubah label dari "juta Rp" menjadi "Rp"
- Memperbaiki perhitungan totalRevenue (tidak dibagi 1.000.000)
- Menambahkan format pada input Overhead Langsung dan Alokasian
- Menambahkan format pada input Tarif dan Volume di tabel
- Menambahkan format pada input form tambah pemeriksaan baru

**Fungsi Baru:**
```javascript
// Format angka dengan pemisah ribuan
const formatInputNumber = (value) => {
  if (!value) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Parse angka dari format dengan pemisah ribuan
const parseInputNumber = (value) => {
  if (!value) return 0
  return parseFloat(value.toString().replace(/\./g, '')) || 0
}
```

### 2. src/components/PurchaseForm.jsx
**Perubahan:**
- Menambahkan fungsi `formatInputNumber()` dan `parseInputNumber()`
- Mengubah input Jumlah Pinjaman dari "juta Rp" ke "Rp"
- Mengubah input Biaya Pemeliharaan dari "juta Rp" ke "Rp"
- Mengubah input Nilai Residu dari "juta Rp" ke "Rp"
- Semua input menggunakan format dengan pemisah ribuan

### 3. src/components/LeasingForm.jsx
**Perubahan:**
- Menambahkan fungsi `formatInputNumber()` dan `parseInputNumber()`
- Mengubah input Pembayaran Leasing dari "juta Rp" ke "Rp"
- Input menggunakan format dengan pemisah ribuan

### 4. src/utils/calculations.js
**Perubahan:**

#### calculateRevenueShare()
- Input `directOverhead` dan `allocatedOverhead` sekarang dalam Rupiah, dikonversi ke juta untuk perhitungan
- Perhitungan pendapatan tetap menggunakan Rupiah, kemudian dikonversi ke juta
- Hasil perhitungan tetap dalam juta untuk konsistensi dengan skema lain

```javascript
// Konversi ke juta untuk perhitungan
const annualRevenueRp = procedures.reduce((sum, proc) => {
  return sum + (proc.tariff * (rsShare / 100) * proc.volume)
}, 0)
const annualRevenue = annualRevenueRp / 1000000

const directOverheadMillion = directOverhead / 1000000
const allocatedOverheadMillion = allocatedOverhead / 1000000
```

#### calculatePurchase()
- Semua input (loanAmount, maintenanceCost, residualValue) dikonversi dari Rupiah ke juta
- Perhitungan internal menggunakan juta untuk konsistensi

```javascript
const loanAmountMillion = loanAmount / 1000000
const maintenanceCostMillion = maintenanceCost / 1000000
const residualValueMillion = residualValue / 1000000
```

#### calculateLeasing()
- Input monthlyPayment dikonversi dari Rupiah ke juta
- Perhitungan annual payment dalam juta

```javascript
const annualPaymentMillion = (monthlyPayment * 12) / 1000000
```

### 5. src/App.jsx
**Perubahan:**
- Mengubah nilai default dari satuan juta ke Rupiah penuh

**Nilai Default Baru:**
```javascript
leasingData: {
  monthlyPayment: 280000000, // 280 juta
  period: 60,
  discountRate: 10
}

purchaseData: {
  loanAmount: 1300000000, // 1.3 miliar
  interestRate: 10,
  period: 5,
  maintenanceCost: 20000000, // 20 juta
  residualValue: 130000000, // 130 juta
  discountRate: 10
}

revenueShareData: {
  rsShare: 15,
  supplierShare: 85,
  directOverhead: 1632000000, // 1.632 miliar
  allocatedOverhead: 240000000, // 240 juta
  taxRate: 15,
  discountRate: 10,
  period: 5,
  procedures: [...]
}
```

## Format Input yang Digunakan

### Format Tampilan
- Pemisah ribuan: titik (.)
- Tidak ada desimal/sen
- Contoh: 1.300.000.000 (1,3 miliar)

### Format Internal
- Disimpan sebagai number tanpa pemisah
- Contoh: 1300000000

### Konversi
- Input user → Parse (hapus titik) → Number
- Number → Format (tambah titik) → Tampilan

## Contoh Penggunaan

### Input Overhead Langsung
**User mengetik:** `50.000.000`
**Disimpan sebagai:** `50000000`
**Ditampilkan sebagai:** `50.000.000`

### Input Tarif Pemeriksaan
**User mengetik:** `150.000`
**Disimpan sebagai:** `150000`
**Ditampilkan sebagai:** `150.000`

### Perhitungan Revenue
**Tarif:** 150.000
**Porsi RS:** 25%
**Volume:** 68.664
**Hasil:** 150.000 × 25% × 68.664 = 2.574.900.000
**Ditampilkan:** `2.574.900.000`

## Konsistensi Perhitungan

### Input Layer (User Interface)
- Semua input dalam format Rupiah penuh dengan pemisah ribuan
- User melihat dan memasukkan angka dalam format yang familiar

### Calculation Layer (Internal)
- Konversi ke juta untuk perhitungan
- Semua perhitungan PV menggunakan satuan juta
- Konsisten dengan metode perhitungan finansial standar

### Output Layer (Display)
- Hasil perhitungan ditampilkan dalam juta untuk laporan
- Format dengan 2 desimal untuk presisi
- Contoh: "Total PV: 123.45 juta"

## Testing

### Test Case 1: Input Multi-Digit
- Input: `1300000000` (dengan mengetik semua digit)
- Expected: Berhasil, ditampilkan sebagai `1.300.000.000`
- Status: ✅ PASS

### Test Case 2: Input dengan Pemisah
- Input: `1.300.000.000` (dengan titik)
- Expected: Berhasil, parse menjadi 1300000000
- Status: ✅ PASS

### Test Case 3: Perhitungan Revenue Sharing
- Tarif: 150.000, Porsi: 25%, Volume: 68.664
- Expected: 2.574.900.000
- Status: ✅ PASS

### Test Case 4: Perhitungan Purchase
- Loan: 1.300.000.000, Maintenance: 20.000.000
- Expected: Konversi ke juta, perhitungan benar
- Status: ✅ PASS

### Test Case 5: Perhitungan Leasing
- Monthly: 280.000.000, Period: 60 bulan
- Expected: Annual = 3.360.000.000, konversi ke juta
- Status: ✅ PASS

## Catatan Penting

1. **Backward Compatibility**: Data lama yang tersimpan dalam satuan juta akan terlihat sangat kecil. User perlu memasukkan ulang data dengan format baru.

2. **Database Migration**: Jika ada data di database, perlu migrasi untuk mengalikan nilai lama dengan 1.000.000.

3. **Export/Import**: File CSV yang di-export/import perlu menggunakan format Rupiah penuh.

4. **Validasi**: Tidak ada validasi maksimal input, user bisa memasukkan angka sangat besar.

5. **Persentase**: Input persentase (rsShare, taxRate, discountRate, interestRate) tetap menggunakan `type="number"` karena tidak perlu pemisah ribuan.

## Rekomendasi Selanjutnya

1. Tambahkan validasi input maksimal (misal: 999.999.999.999)
2. Tambahkan tooltip untuk menjelaskan format input
3. Tambahkan auto-format saat user mengetik (real-time formatting)
4. Pertimbangkan menambahkan unit selector (Rp/Ribu/Juta/Miliar)
5. Tambahkan konfirmasi jika user memasukkan angka yang sangat besar/kecil

## Dokumentasi Terkait

- [PENJELASAN_RUMUS_REVENUE_SHARING.md](./PENJELASAN_RUMUS_REVENUE_SHARING.md) - Penjelasan lengkap rumus perhitungan
- [PANDUAN_APLIKASI.md](./PANDUAN_APLIKASI.md) - Panduan penggunaan aplikasi
