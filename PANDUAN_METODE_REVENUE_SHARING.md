# Panduan Penggunaan Metode Revenue Sharing

## Cara Memilih Metode

Aplikasi Capex Analyzer menyediakan 2 metode perhitungan Revenue Sharing:

### 1. Metode Persentase
**Kapan menggunakan:**
- Ketika negosiasi dengan pemasok berdasarkan pembagian persentase
- Ingin risiko dan keuntungan dibagi proporsional
- Tarif pelayanan relatif stabil

**Cara menggunakan:**
1. Pilih radio button "Metode Persentase"
2. Isi "Porsi RS (%)" - contoh: 25 untuk 25%
3. Isi data pemeriksaan (Nama, Tarif, Volume)
4. Sistem akan menghitung: Pendapatan RS = Tarif × Porsi RS% × Volume

### 2. Metode Flat Fee
**Kapan menggunakan:**
- Ketika RS membayar nominal tetap per pemeriksaan ke pihak ketiga
- Ingin biaya lebih pasti dan mudah dibudget
- Tarif pelayanan berpotensi naik (RS dapat seluruh kenaikan)

**Cara menggunakan:**
1. Pilih radio button "Metode Flat Fee"
2. Field "Porsi RS (%)" akan hilang
3. Isi data pemeriksaan dengan kolom tambahan "Biaya ke Pihak Ketiga (Rp)"
4. Sistem akan menghitung: Pendapatan RS = (Tarif - Flat Fee) × Volume


## Contoh Penggunaan

### Contoh 1: Metode Persentase (25%)

**Input:**
- Metode: Persentase
- Porsi RS: 25%
- Pemeriksaan Darah Rutin:
  - Tarif: Rp 150.000
  - Volume: 68.664/tahun

**Hasil:**
```
Pendapatan RS = 150.000 × 25% × 68.664
              = Rp 2.574.900.000/tahun

Pendapatan Pemasok = 150.000 × 75% × 68.664
                   = Rp 7.724.700.000/tahun
```

### Contoh 2: Metode Flat Fee (Rp 30.000)

**Input:**
- Metode: Flat Fee
- Pemeriksaan Darah Rutin:
  - Tarif: Rp 150.000
  - Biaya ke Pihak Ketiga: Rp 30.000
  - Volume: 68.664/tahun

**Hasil:**
```
Pendapatan RS = (150.000 - 30.000) × 68.664
              = 120.000 × 68.664
              = Rp 8.239.680.000/tahun

Biaya ke Pihak Ketiga = 30.000 × 68.664
                      = Rp 2.059.920.000/tahun
```

**Perbandingan:**
- Metode Persentase 25%: RS dapat Rp 2,57 miliar
- Metode Flat Fee Rp 30.000: RS dapat Rp 8,24 miliar
- Selisih: +Rp 5,67 miliar (220% lebih tinggi!)


## Import Data CSV

### Template untuk Metode Persentase
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
Creatinin,150000,32208
Urea / BUN,150000,30624
```

### Template untuk Metode Flat Fee
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee per Pemeriksaan (Rp)
Darah Rutin,150000,68664,30000
Creatinin,150000,32208,30000
Urea / BUN,150000,30624,30000
```

**Cara Import:**
1. Pilih metode perhitungan terlebih dahulu
2. Klik tombol "Unduh Template" untuk mendapatkan template sesuai metode
3. Isi data di Excel/spreadsheet
4. Save as CSV (Comma delimited)
5. Klik "Import Data" dan pilih file CSV

## Tips Penggunaan

### Menentukan Flat Fee yang Setara dengan Persentase

Jika Anda ingin tahu berapa flat fee yang setara dengan persentase tertentu:

```
Flat Fee = Tarif × (100% - Porsi RS%)
```

**Contoh:**
- Tarif: Rp 150.000
- Porsi RS: 25%
- Flat Fee setara = 150.000 × (100% - 25%) = 150.000 × 75% = Rp 112.500

Artinya:
- Metode Persentase 25% = Metode Flat Fee Rp 112.500
- Keduanya menghasilkan pendapatan RS yang sama

### Menentukan Persentase yang Setara dengan Flat Fee

Jika Anda ingin tahu berapa persentase yang setara dengan flat fee tertentu:

```
Porsi RS% = (Tarif - Flat Fee) / Tarif × 100%
```

**Contoh:**
- Tarif: Rp 150.000
- Flat Fee: Rp 30.000
- Porsi RS setara = (150.000 - 30.000) / 150.000 × 100% = 80%

Artinya:
- Metode Flat Fee Rp 30.000 = Metode Persentase 80%
- Keduanya menghasilkan pendapatan RS yang sama


## Analisis Sensitivitas

### Skenario: Tarif Naik 10%

**Metode Persentase (25%):**
- Tarif lama: Rp 150.000 → Pendapatan RS: Rp 2.574.900.000
- Tarif baru: Rp 165.000 → Pendapatan RS: Rp 2.832.390.000
- Kenaikan: +Rp 257.490.000 (+10%)

**Metode Flat Fee (Rp 30.000):**
- Tarif lama: Rp 150.000 → Pendapatan RS: Rp 8.239.680.000
- Tarif baru: Rp 165.000 → Pendapatan RS: Rp 9.269.640.000
- Kenaikan: +Rp 1.029.960.000 (+12,5%)

**Kesimpulan:** Dengan flat fee, RS mendapat keuntungan lebih besar dari kenaikan tarif.

### Skenario: Volume Turun 20%

**Metode Persentase (25%):**
- Volume lama: 68.664 → Pendapatan RS: Rp 2.574.900.000
- Volume baru: 54.931 → Pendapatan RS: Rp 2.059.920.000
- Penurunan: -Rp 514.980.000 (-20%)

**Metode Flat Fee (Rp 30.000):**
- Volume lama: 68.664 → Pendapatan RS: Rp 8.239.680.000
- Volume baru: 54.931 → Pendapatan RS: Rp 6.591.744.000
- Penurunan: -Rp 1.647.936.000 (-20%)

**Kesimpulan:** Kedua metode sama-sama terpengaruh proporsional terhadap perubahan volume.

## Rekomendasi Pemilihan Metode

### Pilih Metode Persentase jika:
- ✅ Tarif pelayanan stabil atau cenderung turun
- ✅ Ingin pembagian risiko yang adil dengan pemasok
- ✅ Negosiasi lebih mudah dengan persentase
- ✅ Pemasok menyediakan investasi besar (alat mahal)

### Pilih Metode Flat Fee jika:
- ✅ Tarif pelayanan cenderung naik
- ✅ Ingin biaya yang pasti untuk budgeting
- ✅ RS memiliki posisi negosiasi yang kuat
- ✅ Biaya operasional pemasok relatif tetap
- ✅ Ingin mendapat keuntungan penuh dari kenaikan tarif

## Pertanyaan Umum (FAQ)

**Q: Bisakah saya menggunakan flat fee yang berbeda untuk setiap pemeriksaan?**
A: Ya! Pada metode Flat Fee, setiap pemeriksaan bisa memiliki flat fee yang berbeda sesuai kompleksitas dan biaya operasional.

**Q: Bagaimana jika saya ingin mengganti metode di tengah analisis?**
A: Anda bisa mengganti metode kapan saja dengan memilih radio button yang berbeda. Data pemeriksaan akan tetap tersimpan, hanya perhitungannya yang berubah.

**Q: Apakah overhead dihitung sama untuk kedua metode?**
A: Ya, overhead langsung dan alokasi dihitung sama untuk kedua metode. Yang berbeda hanya cara menghitung pendapatan RS.

**Q: Metode mana yang lebih menguntungkan?**
A: Tergantung pada nilai flat fee atau persentase yang dinegosiasikan. Gunakan tabel ekuivalensi di dokumen ANALISIS_METODE_REVENUE_SHARING.md untuk membandingkan.

