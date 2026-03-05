# Quick Start: Analisis Present Value Harga Sewa

## 🚀 Mulai Cepat (5 Menit)

### Langkah 1: Buka Halaman Analisa Sewa
1. Login ke aplikasi
2. Klik menu "Analisa Sewa" di sidebar
3. Pilih tab "Hitung Harga Sewa"

### Langkah 2: Isi Data (2 menit)
```
✓ Nama Alat: CT Scan 64 Slice
✓ Harga Beli: 1300000000
✓ Umur Ekonomis: 5
✓ Nilai Residu: 130000000
✓ Tingkat Keuntungan: 20
✓ Masa Sewa: 3
✓ Discount Rate: 10
✓ Harga Penawaran Vendor: 350000000
```

### Langkah 3: Lihat Hasil (1 menit)
Sistem akan menampilkan 4 kartu:

**1. Harga Kalkulasi**
```
Rp 350.000.000
```

**2. Present Value**
```
Rp 870.398.014
Total PV dengan discount 10%
```

**3. Efisiensi**
```
67.0% ✅
PV Sewa vs Harga Beli
```

**4. Kelayakan**
```
LAYAK ✅
Selisih: 0%
```

### Langkah 4: Baca Rekomendasi (1 menit)
Scroll ke bawah untuk melihat:
- Analisis perbandingan harga
- Status kelayakan detail
- Rekomendasi negosiasi

### Langkah 5: Simpan & Export (1 menit)
- Klik "Simpan Analisis" → Data tersimpan ke database
- Klik "Unduh PDF" → Laporan lengkap terunduh

## 💡 Tips Cepat

### Discount Rate
- **Tidak tahu berapa?** → Gunakan 10%
- **Punya WACC?** → Gunakan nilai WACC
- **Konservatif?** → Gunakan 8-12%

### Interpretasi Cepat

#### Efisiensi < 100% ✅
```
Sewa lebih efisien dari beli
→ Lanjutkan analisis kelayakan
```

#### Efisiensi ≥ 100% ⚠️
```
Beli lebih efisien dari sewa
→ Pertimbangkan pembelian
```

#### Status LAYAK ✅
```
Harga penawaran wajar
→ Lanjut ke kontrak
```

#### Status TIDAK LAYAK ❌
```
Harga penawaran terlalu tinggi
→ Negosiasi ulang
```

## 🎯 Contoh Cepat

### Skenario: Penawaran Bagus
```
Input:
Harga Beli: Rp 1.300.000.000
Penawaran: Rp 330.000.000/tahun
Discount: 10%

Hasil:
PV: Rp 820.000.000
Efisiensi: 63.1% ✅
Status: LAYAK - HARGA SANGAT BAIK 🔵

Keputusan: TERIMA PENAWARAN
```

### Skenario: Perlu Negosiasi
```
Input:
Harga Beli: Rp 1.300.000.000
Penawaran: Rp 420.000.000/tahun
Discount: 10%

Hasil:
PV: Rp 1.044.000.000
Efisiensi: 80.3% ✅
Status: TIDAK LAYAK - NEGOSIASI 🔴

Keputusan: NEGOSIASI ke Rp 385.000.000
```

## ❓ FAQ Singkat

**Q: Apa itu Present Value?**  
A: Nilai sekarang dari uang yang dibayar di masa depan.

**Q: Kenapa PV lebih rendah dari total?**  
A: Karena time value of money (uang hari ini > uang besok).

**Q: Kapan pilih sewa?**  
A: Jika Efisiensi < 100% dan Status LAYAK.

**Q: Kapan pilih beli?**  
A: Jika Efisiensi ≥ 100% atau butuh ownership.

## 📄 Dokumentasi Lengkap

Butuh detail lebih?
- **Panduan Lengkap:** `PANDUAN_PRESENT_VALUE_SEWA.md`
- **Fitur Detail:** `FITUR_PRESENT_VALUE_ANALISA_SEWA.md`
- **Testing:** `CHECKLIST_TESTING_PRESENT_VALUE_SEWA.md`

---

**Waktu Total:** 5 menit  
**Difficulty:** ⭐⭐☆☆☆ (Easy)  
**Version:** 2.0
