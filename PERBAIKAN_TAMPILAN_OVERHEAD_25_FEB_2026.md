# Perbaikan Tampilan Total Overhead - 25 Februari 2026

## Masalah
Total Overhead hanya menampilkan "Rp 290" padahal nilai sebenarnya adalah Rp 290.000.000. Angka besar tidak ditampilkan secara lengkap.

## Penyebab
Penggunaan `.toFixed(0)` pada angka besar menyebabkan konversi ke format scientific notation atau string yang salah sebelum diformat dengan pemisah ribuan.

Contoh masalah:
```javascript
(280000000).toFixed(0) // menghasilkan "280000000" (string)
formatInputNumber("280000000") // gagal memformat dengan benar
```

## Solusi
Gunakan `Math.round()` sebagai gantinya untuk membulatkan angka sebelum formatting:

```javascript
// Sebelum (salah)
formatInputNumber((data.directOverhead + data.allocatedOverhead).toFixed(0))

// Sesudah (benar)
formatInputNumber(Math.round(data.directOverhead + data.allocatedOverhead))
```

## Perubahan

### RevenueShareForm.jsx

1. **Pendapatan RS per baris tabel**
   - Dari: `formatInputNumber(revenue.toFixed(0))`
   - Ke: `formatInputNumber(Math.round(revenue))`

2. **Total Pendapatan RS di footer tabel**
   - Dari: `formatInputNumber(totalRevenue.toFixed(0))`
   - Ke: `formatInputNumber(Math.round(totalRevenue))`

3. **Total Overhead di summary box**
   - Dari: `formatInputNumber((data.directOverhead + data.allocatedOverhead).toFixed(0))`
   - Ke: `formatInputNumber(Math.round(data.directOverhead + data.allocatedOverhead))`

4. **Ukuran font diperkecil untuk mencegah overflow**
   - Dari: `text-2xl` 
   - Ke: `text-xl`

## Hasil
- Total Overhead sekarang menampilkan nilai lengkap: "Rp 290.000.000"
- Semua angka besar ditampilkan dengan format pemisah ribuan yang benar
- Ukuran font sedikit lebih kecil untuk mencegah overflow pada layar kecil
- Tampilan tetap rapi dan mudah dibaca

## Testing
1. Buka tab Revenue Sharing
2. Input nilai overhead yang besar (misalnya 140.000.000 dan 150.000.000)
3. Periksa tampilan Total Overhead di bagian bawah
4. Pastikan angka ditampilkan lengkap dengan pemisah ribuan
5. Periksa juga tampilan pendapatan RS di tabel dan total
