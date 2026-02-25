# Checklist Testing Perbaikan PV Expense Revenue Sharing

**Tanggal:** 25 Februari 2026  
**Tujuan:** Memverifikasi bahwa perhitungan PV Expense Revenue Sharing sudah benar

## Test Case 1: EAT Negatif (Overhead Tinggi - Rugi)

### Input Data
```
Porsi RS: 25%
Pemeriksaan:
- Ro Thorax: Rp 110.000 × 72.000 volume

Overhead Langsung: Rp 1.320.000.000/tahun
Overhead Alokasi: Rp 200.000.000/tahun
Tax Rate: 13%
Discount Rate: 10%
Periode: 5 tahun
```

### Expected Results
```
Pendapatan RS per tahun = 110.000 × 0.25 × 72.000 = Rp 1.980.000.000 (1.980,00 juta)
Laba Operasi = 1.980,00 - 1.320,00 - 200,00 = 460,00 juta
EAT = 460,00 × (1 - 0.13) = 400,20 juta (POSITIF - UNTUNG)

Tahun 1: PV Expense = |400,20| × 0.9091 = 363,82 juta
Tahun 2: PV Expense = |400,20| × 0.8264 = 330,74 juta
Tahun 3: PV Expense = |400,20| × 0.7513 = 300,67 juta
Tahun 4: PV Expense = |400,20| × 0.6830 = 273,34 juta
Tahun 5: PV Expense = |400,20| × 0.6209 = 248,49 juta

TOTAL PV = 1.517,06 juta ✅ (POSITIF untuk perbandingan)
```

### Verifikasi
- [ ] EAT menunjukkan nilai positif (untung)
- [ ] PV Expense per tahun menunjukkan nilai positif
- [ ] Total PV menunjukkan nilai positif
- [ ] Nilai konsisten untuk perbandingan dengan Leasing dan Purchase

---

## Test Case 2: EAT Negatif (Overhead Sangat Tinggi - Rugi)

### Input Data
```
Porsi RS: 25%
Pemeriksaan:
- Ro Thorax: Rp 110.000 × 72.000 volume

Overhead Langsung: Rp 1.520.000.000/tahun
Overhead Alokasi: Rp 600.000.000/tahun
Tax Rate: 13%
Discount Rate: 10%
Periode: 5 tahun
```

### Expected Results
```
Pendapatan RS per tahun = 110.000 × 0.25 × 72.000 = Rp 1.980.000.000 (1.980,00 juta)
Laba Operasi = 1.980,00 - 1.520,00 - 600,00 = -140,00 juta (RUGI)
EAT = -140,00 × (1 - 0.13) = -121,80 juta (NEGATIF - RUGI)

Tahun 1: PV Expense = |-121,80| × 0.9091 = 110,73 juta
Tahun 2: PV Expense = |-121,80| × 0.8264 = 100,66 juta
Tahun 3: PV Expense = |-121,80| × 0.7513 = 91,51 juta
Tahun 4: PV Expense = |-121,80| × 0.6830 = 83,19 juta
Tahun 5: PV Expense = |-121,80| × 0.6209 = 75,63 juta

TOTAL PV = 461,72 juta ✅ (POSITIF karena merugikan)
```

### Verifikasi
- [ ] EAT menunjukkan nilai negatif (rugi)
- [ ] PV Expense per tahun menunjukkan nilai positif
- [ ] Total PV menunjukkan nilai positif (merugikan)
- [ ] Nilai konsisten untuk perbandingan

---

## Test Case 3: EAT Positif Besar (Overhead Rendah - Sangat Untung)

### Input Data
```
Porsi RS: 25%
Pemeriksaan:
- Darah Rutin: Rp 150.000 × 68.664 volume
- Creatinin: Rp 150.000 × 32.208 volume
- Urea/BUN: Rp 150.000 × 30.624 volume

Overhead Langsung: Rp 50.000.000/tahun
Overhead Alokasi: Rp 50.000.000/tahun
Tax Rate: 13%
Discount Rate: 10%
Periode: 5 tahun
```

### Expected Results
```
Pendapatan RS per tahun = Rp 4.931.100.000 (4.931,10 juta)
Laba Operasi = 4.931,10 - 50,00 - 50,00 = 4.831,10 juta
EAT = 4.831,10 × (1 - 0.13) = 4.203,06 juta (POSITIF - SANGAT UNTUNG)

Tahun 1: PV Expense = |4.203,06| × 0.9091 = 3.821,14 juta
Tahun 2: PV Expense = |4.203,06| × 0.8264 = 3.473,77 juta
Tahun 3: PV Expense = |4.203,06| × 0.7513 = 3.158,06 juta
Tahun 4: PV Expense = |4.203,06| × 0.6830 = 2.871,87 juta
Tahun 5: PV Expense = |4.203,06| × 0.6209 = 2.610,79 juta

TOTAL PV = 15.935,63 juta ✅ (POSITIF - opportunity cost)
```

### Verifikasi
- [ ] EAT menunjukkan nilai positif besar (sangat untung)
- [ ] PV Expense per tahun menunjukkan nilai positif
- [ ] Total PV menunjukkan nilai positif (opportunity cost)
- [ ] Bisa dibandingkan dengan Leasing dan Purchase

---

## Test Case 4: Perbandingan dengan Alternatif Lain

### Skenario: Revenue Sharing Menguntungkan
```
Leasing:           1.200,00 juta (positif - biaya)
Borrow & Purchase: 1.150,00 juta (positif - biaya)
Revenue Sharing:   15.935,63 juta (positif - opportunity cost tinggi)

Rekomendasi: Borrow & Purchase ✅ (nilai paling rendah)
```

### Skenario: Revenue Sharing Merugikan
```
Leasing:           1.200,00 juta (positif - biaya)
Borrow & Purchase: 1.150,00 juta (positif - biaya)
Revenue Sharing:   461,72 juta (positif - biaya, paling rendah)

Rekomendasi: Revenue Sharing ✅ (nilai paling rendah)
```

### Skenario: Revenue Sharing Sangat Menguntungkan dengan Opportunity Cost Rendah
```
Leasing:           1.200,00 juta (positif - biaya)
Borrow & Purchase: 1.150,00 juta (positif - biaya)
Revenue Sharing:   500,00 juta (positif - opportunity cost rendah)

Rekomendasi: Revenue Sharing ✅ (nilai paling rendah)
```

### Verifikasi
- [ ] Perbandingan menunjukkan nilai yang masuk akal
- [ ] Rekomendasi sesuai dengan nilai Total PV terendah
- [ ] Penjelasan di UI jelas dan konsisten

---

## Checklist Umum

### Perhitungan
- [ ] EAT dihitung dengan benar: (Revenue - Overhead) × (1 - Tax Rate)
- [ ] PV Factor dihitung dengan benar: 1 / (1 + Discount Rate)^Year
- [ ] PV Expense dihitung dengan benar: -EAT × PV Factor
- [ ] Total PV adalah penjumlahan semua PV Expense

### Tampilan UI
- [ ] EAT ditampilkan dengan warna yang benar (hijau untuk positif, merah untuk negatif)
- [ ] PV Expense per tahun ditampilkan dengan benar
- [ ] Total PV ditampilkan dengan benar
- [ ] Label "Proyeksi Negative EAT" muncul jika EAT negatif
- [ ] Rincian overhead ditampilkan dengan benar

### Export
- [ ] PDF export menampilkan nilai yang benar
- [ ] Excel export menampilkan nilai yang benar
- [ ] Format angka konsisten (pemisah ribuan, desimal)

### Konsistensi
- [ ] Tidak ada perubahan tanda yang tidak konsisten
- [ ] Logika perhitungan sama dengan dokumentasi
- [ ] Test case di test_calculations_verification.html lulus

---

## Catatan Testing

### Cara Test Manual
1. Buka aplikasi di browser
2. Pilih tab "Revenue Sharing"
3. Input data sesuai test case
4. Klik "Hitung Analisis"
5. Periksa hasil di tab "Hasil Perbandingan"
6. Verifikasi nilai EAT, PV Expense per tahun, dan Total PV
7. Periksa rekomendasi keputusan

### Cara Test Otomatis
1. Buka file `test_calculations_verification.html` di browser
2. Periksa apakah semua test case lulus (✅)
3. Jika ada yang gagal (❌), periksa nilai yang berbeda

### Expected Behavior
- **Semua Total PV selalu POSITIF** untuk konsistensi perbandingan
- **Pilih alternatif dengan Total PV terendah**
  
**Interpretasi:**
- **EAT Positif (Untung):**
  - PV Expense per tahun: POSITIF
  - Total PV: POSITIF (opportunity cost)
  - Meskipun menguntungkan, tetap dihitung sebagai "biaya" untuk perbandingan
  
- **EAT Negatif (Rugi):**
  - PV Expense per tahun: POSITIF
  - Total PV: POSITIF (kerugian)
  - Kerugian yang harus ditanggung

---

## Status Testing

- [ ] Test Case 1: EAT Positif (Overhead Rendah)
- [ ] Test Case 2: EAT Negatif (Overhead Tinggi)
- [ ] Test Case 3: EAT Positif Besar (Sangat Untung)
- [ ] Test Case 4: Perbandingan dengan Alternatif
- [ ] Checklist Umum
- [ ] Export PDF
- [ ] Export Excel

**Tested By:** _________________  
**Date:** _________________  
**Result:** ☐ PASS ☐ FAIL  
**Notes:** _________________
