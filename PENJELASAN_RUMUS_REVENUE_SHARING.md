# Penjelasan Lengkap Rumus Revenue Sharing

## Deskripsi Umum
Revenue Sharing adalah skema kerjasama antara Rumah Sakit (RS) dengan Pemasok berdasarkan pembagian pendapatan dari tarif pelayanan. RS mendapatkan persentase tertentu dari setiap tindakan/pemeriksaan yang dilakukan.

## Rumus Perhitungan

### 1. Pendapatan RS per Tahun (Annual Revenue)

```
Pendapatan RS per Tahun = Σ (Tarif × Porsi RS% × Volume per Tahun)
```

**Penjelasan:**
- **Tarif**: Harga per pemeriksaan/tindakan (dalam Rupiah)
- **Porsi RS%**: Persentase bagian RS dari tarif (misalnya 25%)
- **Volume per Tahun**: Jumlah pemeriksaan/tindakan dalam setahun
- **Σ (Sigma)**: Penjumlahan dari semua jenis pemeriksaan/tindakan

**Contoh:**
Jika ada 3 jenis pemeriksaan:
1. Darah Rutin: Rp 150.000 × 25% × 68.664 = Rp 2.574.900.000
2. Creatinin: Rp 150.000 × 25% × 32.208 = Rp 1.207.800.000
3. Urea/BUN: Rp 150.000 × 25% × 30.624 = Rp 1.148.400.000

Total Pendapatan RS = Rp 4.931.100.000 per tahun

### 2. Laba Operasi (Operating Profit)

```
Laba Operasi = Pendapatan RS - Overhead Langsung - Overhead Alokasi
```

**Penjelasan:**
- **Overhead Langsung**: Biaya operasional langsung yang terkait dengan layanan (dalam Rupiah)
  - Contoh: Gaji teknisi, biaya listrik alat, maintenance rutin
- **Overhead Alokasi**: Biaya tidak langsung yang dialokasikan (dalam Rupiah)
  - Contoh: Biaya administrasi, sewa ruangan, utilitas

**Contoh:**
```
Pendapatan RS = Rp 4.931.100.000
Overhead Langsung = Rp 50.000.000
Overhead Alokasi = Rp 50.000.000
Laba Operasi = Rp 4.931.100.000 - Rp 50.000.000 - Rp 50.000.000
Laba Operasi = Rp 4.831.100.000
```

### 3. EAT (Earning After Tax) - Laba Setelah Pajak

```
EAT = Laba Operasi × (1 - Tax Rate%)
```

**Penjelasan:**
- **Tax Rate%**: Persentase pajak yang dikenakan (misalnya 13%)
- **(1 - Tax Rate%)**: Faktor pengali setelah pajak

**Contoh:**
```
Laba Operasi = Rp 4.831.100.000
Tax Rate = 13%
EAT = Rp 4.831.100.000 × (1 - 0.13)
EAT = Rp 4.831.100.000 × 0.87
EAT = Rp 4.203.057.000
```

### 4. PV Factor (Present Value Factor)

```
PV Factor = 1 / (1 + Discount Rate%)^Tahun
```

**Penjelasan:**
- **Discount Rate%**: Tingkat diskonto untuk menghitung nilai sekarang (misalnya 10%)
- **Tahun**: Tahun ke-n dalam periode analisis
- **^**: Pangkat

**Contoh:**
```
Discount Rate = 10%
Tahun 1: PV Factor = 1 / (1 + 0.10)^1 = 1 / 1.10 = 0.9091
Tahun 2: PV Factor = 1 / (1 + 0.10)^2 = 1 / 1.21 = 0.8264
Tahun 3: PV Factor = 1 / (1 + 0.10)^3 = 1 / 1.331 = 0.7513
```

### 5. PV Expense per Tahun (Present Value of Expense)

```
PV Expense = |EAT| × PV Factor
```

**Penjelasan:**
- **|EAT|**: Nilai absolut dari EAT (mengabaikan tanda positif/negatif)
- Dalam analisis Capex, kita membandingkan "biaya" dari ketiga alternatif
- Untuk konsistensi perbandingan, PV Expense selalu dihitung sebagai nilai positif
- Baik EAT positif (untung) maupun negatif (rugi), kita hitung sebagai "expense" untuk perbandingan

**Contoh (EAT Positif - Menguntungkan):**
```
EAT = Rp 4.203.057.000 (dalam juta: 4.203,057)
Tahun 1: PV Expense = |4.203,057| × 0.9091 = 3.821,14 juta
Tahun 2: PV Expense = |4.203,057| × 0.8264 = 3.473,77 juta
Tahun 3: PV Expense = |4.203,057| × 0.7513 = 3.158,06 juta
```

**Contoh (EAT Negatif - Merugikan):**
```
EAT = -Rp 331.300.000 (dalam juta: -331,30)
Tahun 1: PV Expense = |-331,30| × 0.9091 = 312,54 juta
Tahun 2: PV Expense = |-331,30| × 0.8264 = 294,85 juta
Tahun 3: PV Expense = |-331,30| × 0.7513 = 278,16 juta
```

### 6. Total PV (Total Present Value)

```
Total PV = Σ (PV Expense untuk semua tahun)
```

**Penjelasan:**
- Total PV menunjukkan nilai sekarang dari seluruh cash flow selama periode
- **Selalu bernilai positif** untuk konsistensi dengan Leasing dan Borrow & Purchase
- Semakin rendah Total PV, semakin baik alternatif tersebut
- Dalam perbandingan, pilih alternatif dengan Total PV terendah

**Contoh 1 (periode 5 tahun - Menguntungkan):**
```
Total PV = 3.821,14 + 3.473,77 + 3.158,06 + 2.871,87 + 2.610,79
Total PV = 15.935,63 juta (positif, tapi ini adalah "opportunity cost")
```

**Contoh 2 (periode 5 tahun - Merugikan):**
```
Total PV = 312,54 + 294,85 + 278,16 + 262,42 + 247,56
Total PV = 1.395,53 juta (positif, ini adalah kerugian)
```

**Interpretasi:**
- Jika EAT positif (untung): Total PV adalah "opportunity cost" - biaya modal yang bisa diinvestasikan di tempat lain
- Jika EAT negatif (rugi): Total PV adalah kerugian yang harus ditanggung
- Dalam kedua kasus, nilai yang lebih rendah lebih baik

## Interpretasi Hasil

### Skenario 1: EAT Positif (Menguntungkan)
- **Pendapatan RS > Total Overhead**
- **Total PV bernilai positif** → Ini adalah "opportunity cost" atau biaya modal
- Meskipun menguntungkan, tetap dihitung sebagai expense untuk perbandingan dengan alternatif lain
- Semakin rendah Total PV, semakin baik

### Skenario 2: EAT Negatif (Merugikan)
- **Pendapatan RS < Total Overhead**
- **Total PV bernilai positif** → Ini adalah kerugian yang harus ditanggung
- Perlu evaluasi ulang: tingkatkan volume, kurangi overhead, atau ubah porsi RS

## Perbandingan dengan Skema Lain

Dalam analisis Capex, Total PV dari ketiga skema dibandingkan:
1. **Borrow & Purchase**: Total PV biaya pembelian dan maintenance (positif)
2. **Leasing**: Total PV biaya sewa (positif)
3. **Revenue Sharing**: Total PV dari operasional (positif)

**Keputusan:**
- Pilih skema dengan **Total PV paling rendah**
- Semua nilai positif untuk konsistensi perbandingan
- Pertimbangkan juga faktor non-finansial: fleksibilitas, risiko, dll.

## Contoh Lengkap Perhitungan

### Input Data:
- Porsi RS: 25%
- Pemeriksaan:
  - Darah Rutin: Rp 150.000 × 68.664 volume
  - Creatinin: Rp 150.000 × 32.208 volume
  - Urea/BUN: Rp 150.000 × 30.624 volume
- Overhead Langsung: Rp 50.000.000/tahun
- Overhead Alokasi: Rp 50.000.000/tahun
- Tax Rate: 13%
- Discount Rate: 10%
- Periode: 5 tahun

### Perhitungan:

**Tahun 1:**
```
1. Pendapatan RS = (150.000 × 0.25 × 68.664) + (150.000 × 0.25 × 32.208) + (150.000 × 0.25 × 30.624)
   = 2.574.900.000 + 1.207.800.000 + 1.148.400.000
   = Rp 4.931.100.000 (dalam juta: 4.931,10)

2. Laba Operasi = 4.931,10 - 50,00 - 50,00
   = 4.831,10 juta

3. EAT = 4.831,10 × (1 - 0.13)
   = 4.831,10 × 0.87
   = 4.203,06 juta

4. PV Factor = 1 / (1.10)^1 = 0.9091

5. PV Expense = |4.203,06| × 0.9091
   = 3.821,14 juta (positif untuk konsistensi perbandingan)
```

**Tahun 2-5:** (Perhitungan serupa dengan PV Factor yang berbeda)

**Total PV (5 tahun):**
```
Total PV = 3.821,14 + 3.473,77 + 3.158,06 + 2.871,87 + 2.610,79
Total PV = 15.935,63 juta (positif untuk perbandingan dengan alternatif lain)
```

## Catatan Penting

1. **Format Input:**
   - Semua nilai dalam Rupiah penuh (bukan juta)
   - Gunakan pemisah ribuan (titik) untuk kemudahan baca
   - Contoh: 50.000.000 bukan 50

2. **Asumsi:**
   - Volume pemeriksaan konstan setiap tahun
   - Tarif tidak berubah selama periode
   - Overhead tetap setiap tahun
   - Tax rate dan discount rate konstan

3. **Sensitivitas:**
   - Hasil sangat sensitif terhadap volume pemeriksaan
   - Perubahan kecil pada overhead bisa signifikan mempengaruhi EAT
   - Discount rate mempengaruhi nilai PV

## Perbaikan yang Dilakukan (25 Feb 2026)

1. **Format Input:**
   - ✅ Input sekarang dalam Rupiah penuh (bukan juta)
   - ✅ Pemisah ribuan otomatis (titik)
   - ✅ Bisa input beberapa digit sekaligus

2. **Perhitungan:**
   - ✅ Overhead dalam Rupiah (dikonversi ke juta untuk perhitungan internal)
   - ✅ Pendapatan dalam Rupiah (dikonversi ke juta untuk perhitungan internal)
   - ✅ Hasil akhir tetap dalam juta untuk konsistensi dengan skema lain

3. **Tampilan:**
   - ✅ Semua angka ditampilkan dengan pemisah ribuan
   - ✅ Pendapatan RS ditampilkan dalam Rupiah penuh
   - ✅ Label yang jelas: "Rp" untuk Rupiah, "juta" untuk juta Rupiah
