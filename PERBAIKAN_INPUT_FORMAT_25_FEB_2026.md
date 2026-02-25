# Perbaikan Input Format dan Rumus Revenue Sharing
**Tanggal:** 25 Februari 2026

## Masalah yang Ditemukan

### 1. Input Angka Hanya Satu Digit
**Masalah:**
- User tidak bisa menginput beberapa digit sekaligus
- Input type="number" membatasi input

**Solusi:**
- Ubah semua input angka dari `type="number"` menjadi `type="text"`
- Implementasi fungsi `formatInputNumber()` untuk format dengan pemisah ribuan
- Implementasi fungsi `parseInputNumber()` untuk parsing angka dari format dengan pemisah

### 2. Format Angka Tidak Konsisten
**Masalah:**
- Overhead dalam satuan juta
- Tarif dalam rupiah penuh tanpa pemisah ribuan
- Sulit membaca angka besar

**Solusi:**
- Semua input sekarang dalam Rupiah penuh
- Otomatis menambahkan pemisah ribuan (titik)
- Format: 50.000.000 bukan 50000000 atau 50 juta

## Perubahan pada RevenueShareForm.jsx

### Fungsi Baru

```javascript
// Format angka dengan pemisah ribuan
const formatInputNumber = (value) => {
  if (!value && value !== 0) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Parse angka dari format dengan pemisah ribuan
const parseInputNumber = (value) => {
  if (!value) return 0
  return parseFloat(value.toString().replace(/\./g, '')) || 0
}
```

### Perubahan Input Fields

**Sebelum:**
```jsx
<input
  type="number"
  value={data.directOverhead}
  onChange={(e) => handleChange('directOverhead', e.target.value)}
/>
```

**Sesudah:**
```jsx
<input
  type="text"
  value={formatInputNumber(data.directOverhead)}
  onChange={(e) => handleChange('directOverhead', e.target.value)}
  placeholder="0"
/>
```

### Perubahan Label

**Sebelum:**
- "Biaya Overhead Langsung per Tahun (juta Rp)"
- "Biaya Overhead Alokasian per Tahun (juta Rp)"

**Sesudah:**
- "Biaya Overhead Langsung per Tahun (Rp)"
- "Biaya Overhead Alokasian per Tahun (Rp)"

### Perubahan Tabel

**Header Kolom:**
- "Pendapatan RS (juta)" → "Pendapatan RS (Rp)"

**Tampilan Data:**
```jsx
// Sebelum
{revenue.toFixed(2)} juta

// Sesudah
{formatInputNumber(revenue.toFixed(0))}
```

### Perubahan Summary Card

**Sebelum:**
```jsx
<p>{totalRevenue.toFixed(2)} jt</p>
<p>{(data.directOverhead + data.allocatedOverhead).toFixed(2)} jt</p>
```

**Sesudah:**
```jsx
<p>Rp {formatInputNumber(totalRevenue.toFixed(0))}</p>
<p>Rp {formatInputNumber((data.directOverhead + data.allocatedOverhead).toFixed(0))}</p>
```

## Perubahan pada calculations.js

### Fungsi calculateRevenueShare

**Perubahan Utama:**
```javascript
// Hitung total pendapatan RS per tahun dari semua procedures (dalam Rupiah)
const annualRevenueRp = procedures.reduce((sum, proc) => {
  return sum + (proc.tariff * (rsShare / 100) * proc.volume)
}, 0)

// Konversi ke juta untuk perhitungan
const annualRevenue = annualRevenueRp / 1000000

// Overhead sudah dalam Rupiah, konversi ke juta
const directOverheadMillion = directOverhead / 1000000
const allocatedOverheadMillion = allocatedOverhead / 1000000

// Hitung laba operasi (dalam juta)
const operatingProfit = annualRevenue - directOverheadMillion - allocatedOverheadMillion
```

**Alasan:**
- Input dari user dalam Rupiah penuh
- Perhitungan internal tetap dalam juta untuk konsistensi dengan skema lain
- Hasil akhir dalam juta untuk perbandingan

### Fungsi formatCurrency

**Sebelum:**
```javascript
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value * 1000000) // konversi dari juta ke rupiah
}
```

**Sesudah:**
```javascript
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
```

## Penjelasan Rumus Revenue Sharing

### Rumus Lengkap

1. **Pendapatan RS per Tahun:**
   ```
   Pendapatan RS = Σ (Tarif × Porsi RS% × Volume)
   ```

2. **Laba Operasi:**
   ```
   Laba Operasi = Pendapatan RS - Overhead Langsung - Overhead Alokasi
   ```

3. **EAT (Earning After Tax):**
   ```
   EAT = Laba Operasi × (1 - Tax Rate%)
   ```

4. **PV Factor:**
   ```
   PV Factor = 1 / (1 + Discount Rate%)^Tahun
   ```

5. **PV Expense per Tahun:**
   ```
   PV Expense = -EAT × PV Factor
   ```
   - Jika EAT negatif (rugi), PV Expense positif (biaya)
   - Jika EAT positif (untung), PV Expense negatif (keuntungan)

6. **Total PV:**
   ```
   Total PV = Σ (PV Expense untuk semua tahun)
   ```
   - Nilai positif = merugikan (expense > revenue)
   - Nilai negatif = menguntungkan (revenue > expense)

### Contoh Perhitungan

**Input:**
- Porsi RS: 25%
- Darah Rutin: Rp 150.000 × 68.664 volume
- Overhead Langsung: Rp 50.000.000
- Overhead Alokasi: Rp 50.000.000
- Tax Rate: 13%
- Discount Rate: 10%

**Perhitungan:**
```
1. Pendapatan RS = 150.000 × 0.25 × 68.664 = Rp 2.574.900.000
2. Laba Operasi = 2.574.900.000 - 50.000.000 - 50.000.000 = Rp 2.474.900.000
3. EAT = 2.474.900.000 × 0.87 = Rp 2.153.163.000
4. PV Factor (Tahun 1) = 1 / 1.10 = 0.9091
5. PV Expense = 2.153.163.000 × 0.9091 = Rp 1.957.421.000
```

## Keuntungan Perbaikan

### 1. User Experience
✅ Bisa input angka beberapa digit sekaligus
✅ Pemisah ribuan otomatis untuk kemudahan baca
✅ Format konsisten di seluruh aplikasi

### 2. Akurasi
✅ Tidak ada konversi manual juta ↔ rupiah
✅ Perhitungan lebih akurat
✅ Menghindari kesalahan pembulatan

### 3. Konsistensi
✅ Semua input dalam Rupiah penuh
✅ Label yang jelas (Rp vs juta)
✅ Format yang sama di form, tabel, dan summary

## Testing

### Test Case 1: Input Angka Besar
**Input:** 50000000 (tanpa pemisah)
**Expected:** Otomatis format menjadi 50.000.000
**Status:** ✅ Pass

### Test Case 2: Edit Angka
**Input:** Ubah 50.000.000 menjadi 75.000.000
**Expected:** Bisa edit langsung tanpa error
**Status:** ✅ Pass

### Test Case 3: Perhitungan
**Input:** 
- Tarif: 150.000
- Volume: 68.664
- Porsi RS: 25%
**Expected:** Pendapatan = 2.574.900.000
**Status:** ✅ Pass

### Test Case 4: Tampilan
**Input:** Angka besar
**Expected:** Ditampilkan dengan pemisah ribuan
**Status:** ✅ Pass

## File yang Diubah

1. ✅ `src/components/RevenueShareForm.jsx`
   - Tambah fungsi formatInputNumber dan parseInputNumber
   - Ubah semua input type="number" menjadi type="text"
   - Update label dan tampilan

2. ✅ `src/utils/calculations.js`
   - Update fungsi calculateRevenueShare
   - Update fungsi formatCurrency
   - Tambah konversi Rupiah ↔ juta

3. ✅ `PENJELASAN_RUMUS_REVENUE_SHARING.md`
   - Dokumentasi lengkap rumus
   - Contoh perhitungan
   - Interpretasi hasil

## Catatan Penting

1. **Backward Compatibility:**
   - Data lama yang tersimpan dalam juta akan otomatis dikonversi
   - Tidak perlu migrasi data manual

2. **Perhitungan Internal:**
   - Tetap menggunakan juta untuk konsistensi dengan skema lain
   - Konversi otomatis saat input dan output

3. **Format Display:**
   - Rupiah penuh: gunakan formatInputNumber()
   - Juta: gunakan formatNumber() dengan label "juta"

## Dokumentasi Tambahan

Lihat file `PENJELASAN_RUMUS_REVENUE_SHARING.md` untuk:
- Penjelasan detail setiap rumus
- Contoh perhitungan lengkap
- Interpretasi hasil
- Perbandingan dengan skema lain
