# Panduan Singkat: Analisis Present Value Harga Sewa

## 🎯 Apa itu Present Value (PV)?

**Present Value** adalah nilai sekarang dari uang yang akan dibayar di masa depan. Konsep ini penting karena:
- Uang hari ini lebih berharga daripada uang di masa depan
- Membantu membandingkan biaya sewa vs beli secara adil
- Mempertimbangkan opportunity cost dari modal

## 📊 Cara Menggunakan Fitur

### 1. Isi Data Dasar
```
✓ Nama Alat: CT Scan 64 Slice
✓ Harga Beli: Rp 1.300.000.000
✓ Umur Ekonomis: 5 tahun
✓ Nilai Residu: Rp 130.000.000
✓ Tingkat Keuntungan: 20%
✓ Masa Sewa: 3 tahun
```

### 2. Tentukan Discount Rate
**Apa itu Discount Rate?**
- Tingkat pengembalian yang diharapkan dari investasi
- Biasanya menggunakan WACC (Weighted Average Cost of Capital)
- Jika tidak tahu pasti, gunakan 8-12%

**Contoh:**
```
Discount Rate: 10%
```

### 3. Masukkan Harga Penawaran Vendor
**⚠️ PENTING:**
- Ini adalah harga **SEWA per tahun**, bukan harga beli
- Harga yang ditawarkan vendor untuk menyewakan alat kepada Anda

**Contoh:**
```
Harga Penawaran Vendor: Rp 350.000.000/tahun
```

## 📈 Membaca Hasil

### Kartu 1: Harga Sewa per Tahun (Kalkulasi)
```
Rp 350.000.000
```
- Ini adalah harga sewa yang dihitung berdasarkan rumus
- Digunakan sebagai benchmark untuk menilai penawaran vendor

### Kartu 2: Present Value Biaya Sewa
```
Rp 870.398.014
Total PV dengan discount 10%
```
- Nilai sekarang dari total biaya sewa 3 tahun
- Lebih rendah dari total nominal (Rp 1.050.000.000) karena time value of money

### Kartu 3: Efisiensi Biaya
```
67.1%
PV Sewa vs Harga Beli
```
**Interpretasi:**
- **< 100%**: Sewa lebih efisien dari segi nilai waktu uang ✅
- **≥ 100%**: Beli lebih efisien, pertimbangkan pembelian ⚠️

**Contoh:**
- PV Sewa: Rp 870.398.014
- Harga Beli: Rp 1.300.000.000
- Efisiensi: 67.1% → **Sewa lebih menguntungkan!**

### Kartu 4: Skor Kelayakan
```
LAYAK
Selisih: 5.2%
```

**Status Kelayakan:**

| Status | Arti | Tindakan |
|--------|------|----------|
| 🟢 **LAYAK** | Harga penawaran wajar atau lebih rendah | Lanjutkan ke kontrak |
| 🔴 **TIDAK LAYAK** | Harga penawaran terlalu tinggi | Negosiasi ulang |

## 🎨 Analisis Perbandingan Harga

Sistem akan menampilkan analisis detail dengan 5 kategori:

### 1. 🔴 TIDAK LAYAK - PERLU NEGOSIASI ULANG
- Selisih: > +15%
- Penawaran vendor terlalu tinggi
- **Tindakan:** Negosiasi dengan target maksimal (kalkulasi + 10%)

### 2. 🟡 TIDAK LAYAK - DAPAT DINEGOSIASIKAN
- Selisih: +5% s/d +15%
- Penawaran sedikit lebih tinggi
- **Tindakan:** Coba negosiasi mendekati harga kalkulasi

### 3. 🟢 LAYAK - HARGA WAJAR
- Selisih: -5% s/d +5%
- Harga sesuai dengan kalkulasi
- **Tindakan:** Harga kompetitif, lanjut ke kontrak

### 4. 🔵 LAYAK - HARGA SANGAT BAIK
- Selisih: -15% s/d -5%
- Penawaran lebih rendah dari kalkulasi
- **Tindakan:** Segera lakukan kesepakatan!

### 5. 🟠 LAYAK - HARGA TERLALU RENDAH
- Selisih: < -15%
- Penawaran jauh lebih rendah
- **Tindakan:** Verifikasi kualitas dan hidden cost

## 💡 Contoh Praktis

### Skenario A: Penawaran Bagus
```
Input:
- Harga Beli: Rp 1.300.000.000
- Masa Sewa: 3 tahun
- Discount Rate: 10%
- Penawaran Vendor: Rp 330.000.000/tahun

Hasil:
- Harga Kalkulasi: Rp 350.000.000/tahun
- PV Biaya Sewa: Rp 820.000.000
- Efisiensi: 63.1% ✅
- Status: LAYAK - HARGA SANGAT BAIK 🔵
- Selisih: -5.7%

Rekomendasi:
✓ Sewa lebih efisien dari beli (PV < Harga Beli)
✓ Harga penawaran sangat kompetitif
✓ Segera lakukan kesepakatan sebelum vendor mengubah penawaran
```

### Skenario B: Perlu Negosiasi
```
Input:
- Harga Beli: Rp 1.300.000.000
- Masa Sewa: 3 tahun
- Discount Rate: 10%
- Penawaran Vendor: Rp 420.000.000/tahun

Hasil:
- Harga Kalkulasi: Rp 350.000.000/tahun
- PV Biaya Sewa: Rp 1.044.000.000
- Efisiensi: 80.3% ✅
- Status: TIDAK LAYAK - PERLU NEGOSIASI ULANG 🔴
- Selisih: +20%

Rekomendasi:
✓ Sewa masih efisien dari beli (PV < Harga Beli)
✗ Harga penawaran terlalu tinggi
→ Negosiasi dengan target maksimal Rp 385.000.000/tahun
```

## 📄 Laporan PDF

Klik tombol "Unduh PDF" untuk mendapatkan laporan lengkap berisi:
- Data input lengkap
- Hasil perhitungan detail
- Analisis Present Value
- Analisis kelayakan harga penawaran
- Rekomendasi negosiasi spesifik
- Rumus dan perhitungan step-by-step

## ❓ FAQ

### Q: Berapa discount rate yang harus saya gunakan?
**A:** Gunakan WACC perusahaan Anda. Jika tidak tahu, gunakan 8-12% sebagai estimasi konservatif.

### Q: Mengapa PV lebih rendah dari total nominal?
**A:** Karena time value of money. Uang yang dibayar di masa depan memiliki nilai lebih rendah dalam nilai sekarang.

### Q: Apa bedanya harga kalkulasi dengan harga penawaran?
**A:** 
- **Harga Kalkulasi**: Hasil perhitungan sistem berdasarkan rumus
- **Harga Penawaran**: Harga yang ditawarkan vendor kepada Anda

### Q: Kapan saya harus memilih sewa vs beli?
**A:** 
- **Pilih Sewa** jika: Efisiensi < 100% dan status LAYAK
- **Pilih Beli** jika: Efisiensi ≥ 100% atau Anda butuh ownership jangka panjang

### Q: Bagaimana jika status TIDAK LAYAK tapi PV lebih rendah dari harga beli?
**A:** Sewa masih lebih efisien dari beli, tapi harga penawaran vendor terlalu tinggi. Negosiasi untuk mendapat harga lebih baik.

## 🎯 Tips Negosiasi

1. **Gunakan harga kalkulasi** sebagai benchmark
2. **Tunjukkan analisis PV** kepada vendor
3. **Minta breakdown biaya** dari vendor
4. **Bandingkan dengan vendor lain** jika memungkinkan
5. **Pertimbangkan value-added services** dalam negosiasi
6. **Dokumentasikan semua penawaran** untuk perbandingan

## 📞 Butuh Bantuan?

Jika ada pertanyaan atau butuh asistensi:
1. Review dokumentasi lengkap di `FITUR_PRESENT_VALUE_ANALISA_SEWA.md`
2. Lihat contoh kasus di file dokumentasi
3. Konsultasikan dengan tim finance untuk discount rate yang tepat

---

**Versi:** 2.0  
**Terakhir Diperbarui:** 5 Maret 2026
