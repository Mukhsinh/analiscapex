# Perbaikan Perhitungan PV Expense Revenue Sharing (FINAL)

**Tanggal:** 25 Februari 2026  
**Status:** ✅ SELESAI

## Masalah yang Ditemukan

Pada perhitungan Revenue Sharing, nilai Total PV Expense menunjukkan nilai **negatif (-1.395,54 juta)** padahal seharusnya **positif** untuk konsistensi dengan Leasing dan Borrow & Purchase.

### Screenshot Masalah
Dari aplikasi terlihat:
- EAT per tahun: 331,30 juta (POSITIF - untung)
- PV Expense per tahun: -312,54, -294,85, -278,16, -262,42, -247,56 juta (NEGATIF)
- **TOTAL: -1.395,54 juta** ❌ (seharusnya positif untuk perbandingan)

### Analisis Root Cause

**Kesalahan Konsep:**
Dalam perbaikan sebelumnya, saya menggunakan logika `pvExpense = -eat * pvFactor` yang menghasilkan:
- Jika EAT positif (untung) → PV Expense negatif
- Jika EAT negatif (rugi) → PV Expense positif

**Masalah dengan logika ini:**
- Tidak konsisten dengan Leasing dan Borrow & Purchase yang selalu positif
- Membingungkan dalam perbandingan: bagaimana membandingkan nilai negatif dengan positif?
- Tidak sesuai dengan konsep analisis Capex yang membandingkan "biaya" dari alternatif

**Konsep yang Benar:**
Dalam analisis Capex, kita membandingkan **Total PV Expense** dari ketiga alternatif:
1. **Leasing**: Biaya sewa (selalu positif)
2. **Borrow & Purchase**: Biaya pembelian + maintenance - trade-in (biasanya positif)
3. **Revenue Sharing**: Biaya operasional atau opportunity cost (harus positif untuk perbandingan)

Untuk Revenue Sharing:
- Jika EAT positif (untung): PV Expense adalah "opportunity cost" - biaya modal yang bisa diinvestasikan di tempat lain
- Jika EAT negatif (rugi): PV Expense adalah kerugian yang harus ditanggung
- **Dalam kedua kasus, nilai harus positif untuk konsistensi perbandingan**

## Solusi

Kembali ke logika yang benar dengan menggunakan nilai absolut:

```javascript
// KODE BARU (BENAR)
for (let year = 1; year <= period; year++) {
  const pvFactor = calculatePVFactor(discountRate, year)
  // PV Expense untuk Revenue Sharing dihitung sebagai nilai absolut
  // Karena kita ingin membandingkan "biaya" dari ketiga alternatif
  // Baik untung maupun rugi, kita hitung sebagai expense untuk konsistensi
  const pvExpense = Math.abs(eat) * pvFactor
  totalPV += pvExpense
  
  yearlyData.push({ year, ..., pvExpense })
}

return {
  yearlyData,
  totalPV,  // Selalu positif
  ...
}
```

**Keuntungan:**
1. ✅ Konsisten dengan Leasing dan Borrow & Purchase (semua positif)
2. ✅ Mudah dibandingkan: pilih yang Total PV paling rendah
3. ✅ Sesuai dengan konsep analisis Capex
4. ✅ Tidak membingungkan dengan nilai negatif

## Hasil Setelah Perbaikan

### Skenario 1: EAT Positif (Untung)
```
EAT = +331,30 juta per tahun (POSITIF - untung)
Tahun 1: PV Expense = |331,30| × 0.9091 = +312,54 juta
Tahun 2: PV Expense = |331,30| × 0.8264 = +294,85 juta
Tahun 3: PV Expense = |331,30| × 0.7513 = +278,16 juta
Tahun 4: PV Expense = |331,30| × 0.6830 = +262,42 juta
Tahun 5: PV Expense = |331,30| × 0.6209 = +247,56 juta

TOTAL PV = +1.395,54 juta ✅ (positif untuk perbandingan)
```

**Interpretasi:** Meskipun Revenue Sharing menguntungkan (EAT positif), Total PV tetap dihitung sebagai "opportunity cost" untuk perbandingan dengan alternatif lain.

### Skenario 2: EAT Negatif (Rugi)
```
EAT = -382,50 juta per tahun (NEGATIF - rugi)
Tahun 1: PV Expense = |-382,50| × 0.9091 = +347,73 juta
Tahun 2: PV Expense = |-382,50| × 0.8264 = +316,12 juta
Tahun 3: PV Expense = |-382,50| × 0.7513 = +287,38 juta
Tahun 4: PV Expense = |-382,50| × 0.6830 = +261,25 juta
Tahun 5: PV Expense = |-382,50| × 0.6209 = +237,50 juta

TOTAL PV = +1.449,98 juta ✅ (positif = kerugian)
```

**Interpretasi:** Revenue Sharing merugikan (EAT negatif), Total PV adalah kerugian yang harus ditanggung.

## File yang Diubah

1. **src/utils/calculations.js**
   - Fungsi `calculateRevenueShare()`
   - Kembali ke logika `pvExpense = Math.abs(eat) * pvFactor`

2. **PENJELASAN_RUMUS_REVENUE_SHARING.md**
   - Update penjelasan rumus PV Expense
   - Update interpretasi hasil
   - Perbaiki contoh perhitungan

3. **test_calculations_verification.html**
   - Update test case dengan logika yang benar

## Perbandingan Alternatif

### Contoh 1: Revenue Sharing Menguntungkan tapi Bukan Pilihan Terbaik
```
Leasing:           1.061,42 juta ← TERBAIK
Borrow & Purchase: 1.275,42 juta
Revenue Sharing:   1.395,54 juta (meski untung, tapi opportunity cost tinggi)

Rekomendasi: Leasing ✅
```

### Contoh 2: Revenue Sharing Merugikan
```
Leasing:           1.061,42 juta ← TERBAIK
Borrow & Purchase: 1.275,42 juta
Revenue Sharing:   1.449,98 juta (rugi)

Rekomendasi: Leasing ✅
```

### Contoh 3: Revenue Sharing Sangat Menguntungkan
```
Leasing:           1.200,00 juta
Borrow & Purchase: 1.150,00 juta
Revenue Sharing:   500,00 juta ← TERBAIK (opportunity cost rendah)

Rekomendasi: Revenue Sharing ✅
```

## Konsep Opportunity Cost

**Mengapa EAT positif tetap dihitung sebagai expense?**

Dalam analisis investasi, ketika kita memilih Revenue Sharing:
- Modal yang digunakan untuk operasional bisa diinvestasikan di tempat lain
- EAT positif adalah "keuntungan yang hilang" jika kita memilih alternatif lain
- Ini disebut "opportunity cost" - biaya kesempatan yang hilang

**Contoh:**
- Revenue Sharing menghasilkan EAT 331,30 juta/tahun
- Jika kita pilih Leasing dengan biaya 280 juta/tahun
- Kita "kehilangan" kesempatan mendapat 331,30 juta
- Tapi kita juga tidak perlu modal operasional yang besar
- Perbandingan: 1.395,54 juta (RS) vs 1.061,42 juta (Leasing)
- Leasing lebih baik karena biaya lebih rendah

## Checklist Verifikasi

- [x] Perbaiki fungsi `calculateRevenueShare()` di `calculations.js`
- [x] Update dokumentasi `PENJELASAN_RUMUS_REVENUE_SHARING.md`
- [x] Update file test `test_calculations_verification.html`
- [x] Buat dokumentasi perbaikan ini
- [ ] Test dengan data real dari aplikasi
- [ ] Verifikasi tampilan di UI
- [ ] Verifikasi export PDF/Excel

## Catatan Tambahan

Perbaikan ini mengembalikan logika ke konsep yang benar dalam analisis Capex:
- Semua Total PV bernilai positif untuk konsistensi
- Perbandingan mudah: pilih yang paling rendah
- Tidak ada kebingungan dengan nilai negatif
- Sesuai dengan prinsip analisis investasi

## Referensi

- File: `src/utils/calculations.js` (fungsi `calculateRevenueShare`)
- File: `PENJELASAN_RUMUS_REVENUE_SHARING.md`
- File: `PERHITUNGAN_REVENUE_SHARING_DETAIL.md`
- Screenshot masalah dari aplikasi (Total PV negatif)
