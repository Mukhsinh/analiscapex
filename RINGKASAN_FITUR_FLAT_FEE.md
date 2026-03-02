# Ringkasan Fitur Flat Fee Revenue Sharing

## Apa yang Ditambahkan?

Aplikasi Capex Analyzer sekarang mendukung **2 metode perhitungan Revenue Sharing**:

### 1. Metode Persentase (Existing)
- RS mendapat porsi % dari tarif pelayanan
- Contoh: RS 25%, Pemasok 75%
- Risiko dibagi dengan Pemasok

### 2. Metode Flat Fee (BARU)
- RS membayar nominal tetap (Rp) per pemeriksaan ke pihak ketiga
- Contoh: RS bayar Rp 30.000 per pemeriksaan
- RS dapat seluruh tarif, lalu bayar flat fee
- Pendapatan Bersih = (Tarif - Flat Fee) × Volume

## Perbandingan Cepat

**Contoh: Pemeriksaan Darah Rutin**
- Tarif: Rp 150.000
- Volume: 68.664/tahun

### Metode Persentase (25%)
```
Pendapatan RS = 150.000 × 25% × 68.664
              = Rp 2.574.900.000
```

### Metode Flat Fee (Rp 30.000)
```
Pendapatan Bersih RS = (150.000 - 30.000) × 68.664
                      = Rp 8.239.680.000
```

**Selisih: +220% lebih tinggi dengan Flat Fee!**

## Kapan Menggunakan?

### Gunakan Metode Persentase:
- ✅ Volume tidak pasti
- ✅ Baru mulai layanan
- ✅ Ingin berbagi risiko
- ✅ Modal terbatas

### Gunakan Metode Flat Fee:
- ✅ Volume stabil & tinggi
- ✅ Yakin dengan demand
- ✅ Ingin maksimalkan pendapatan
- ✅ Modal cukup

## Cara Menggunakan

1. **Buka halaman Revenue Sharing**
2. **Pilih Metode Perhitungan:**
   - Metode Persentase → Input Porsi RS (%)
   - Metode Flat Fee → Input Flat Fee per pemeriksaan (Rp)
3. **Input data pemeriksaan:**
   - Nama, Tarif, Volume
   - [Untuk Flat Fee] Flat Fee per pemeriksaan
4. **Klik Calculate** untuk melihat hasil

## File yang Diubah

1. **src/components/RevenueShareForm.jsx**
   - Tambah pilihan metode perhitungan
   - Tambah kolom Flat Fee
   - Update template CSV
   - Update import/export

2. **src/utils/calculations.js**
   - Update fungsi `calculateRevenueShare()`
   - Support kedua metode perhitungan

3. **src/App.jsx**
   - Tambah field `calculationMethod`
   - Tambah field `flatFee` di procedures

## Template CSV

### Metode Persentase:
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
```

### Metode Flat Fee:
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee per Pemeriksaan (Rp)
Darah Rutin,150000,68664,30000
```

## Break-Even Point

Untuk tarif Rp 150.000 dengan porsi RS 25%:

```
Flat Fee Break-Even = 150.000 - (150.000 × 25%)
                    = 150.000 - 37.500
                    = Rp 112.500
```

- Flat Fee < Rp 112.500 → Flat Fee lebih untung
- Flat Fee > Rp 112.500 → Persentase lebih untung

## Dokumentasi Lengkap

Lihat file berikut untuk detail:
- `ANALISIS_METODE_REVENUE_SHARING.md` - Analisis lengkap kedua metode
- `PENJELASAN_RUMUS_REVENUE_SHARING.md` - Rumus dan perhitungan detail
- `template_revenue_sharing_flatfee.csv` - Template untuk import data

## Testing

Tidak ada error diagnostik:
- ✅ src/components/RevenueShareForm.jsx
- ✅ src/utils/calculations.js
- ✅ src/App.jsx

## Catatan Penting

1. **Risiko:** Metode Flat Fee memiliki risiko lebih tinggi jika volume turun
2. **Modal:** Memerlukan modal kerja yang cukup untuk membayar flat fee
3. **Negosiasi:** Target flat fee 15-25% dari tarif untuk hasil optimal
4. **Monitoring:** Pantau volume aktual vs proyeksi secara berkala

