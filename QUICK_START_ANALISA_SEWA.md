# 🚀 Quick Start: Analisa Sewa

Panduan cepat untuk menggunakan fitur Analisa Sewa dalam 5 menit.

## 📋 Persiapan (Hanya Sekali)

### 1. Jalankan Migration Database
```sql
-- Buka Supabase Dashboard → SQL Editor
-- Copy-paste dan execute:
```
File: `migrations/create_rental_analysis_table.sql`

### 2. Verifikasi
```sql
-- Jalankan untuk memastikan setup berhasil:
```
File: `verify_rental_analysis.sql`

## 🎯 Cara Menggunakan

### Langkah 1: Akses Menu
1. Login ke aplikasi
2. Klik **"Analisa Sewa"** di sidebar (icon dollar)

### Langkah 2: Input Data
Isi 5 field berikut:

| Field | Contoh | Keterangan |
|-------|--------|------------|
| Harga Beli Alat | 1.300.000.000 | Harga pembelian alat |
| Umur Ekonomis | 5 | Masa pakai alat (tahun) |
| Nilai Residu | 130.000.000 | Nilai akhir alat (opsional) |
| Tingkat Keuntungan | 20 | Margin profit (%) |
| Masa Sewa | 3 | Durasi kontrak sewa (tahun) |

### Langkah 3: Lihat Hasil
Sistem otomatis menghitung:
- 💰 **Harga Sewa per Tahun** - Biaya sewa tahunan
- 📊 **Total Pendapatan** - Total uang yang diterima
- 💸 **Total Biaya** - Biaya bersih investasi
- 📈 **Total Keuntungan** - Profit yang diperoleh

### Langkah 4: Simpan
1. Klik tombol **"Simpan Analisis"**
2. Tunggu notifikasi sukses
3. Data tersimpan di database

### Langkah 5: Lihat Riwayat
1. Buka menu **"Riwayat Analisis"**
2. Klik row untuk expand detail
3. Download PDF jika diperlukan

## 🧮 Rumus Perhitungan

```
Harga Sewa = ((Harga Beli × (1 + Margin)) - Residu) / Periode
```

### Contoh:
```
Harga Beli: Rp 1.300.000.000
Margin: 20%
Residu: Rp 130.000.000
Periode: 3 tahun

Harga Sewa = ((1.300.000.000 × 1,20) - 130.000.000) / 3
           = (1.560.000.000 - 130.000.000) / 3
           = Rp 476.666.667 per tahun
```

## 🧪 Test Cepat

### Opsi 1: Test di Aplikasi
1. Buka aplikasi
2. Masuk ke "Analisa Sewa"
3. Gunakan data contoh di atas
4. Verifikasi hasil

### Opsi 2: Test dengan HTML
1. Buka file `test_analisa_sewa.html` di browser
2. Klik "Test Case 1"
3. Lihat hasil perhitungan
4. Bandingkan dengan expected output

## ✅ Checklist Testing

- [ ] Migration database berhasil
- [ ] Menu "Analisa Sewa" muncul
- [ ] Form dapat diisi
- [ ] Perhitungan otomatis bekerja
- [ ] Hasil ditampilkan benar
- [ ] Simpan ke database berhasil
- [ ] Data muncul di riwayat
- [ ] Expand/collapse berfungsi

## 🎯 Test Cases

### Test Case 1: Analyzer Kimia ✅
```
Input:
Harga Beli: 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: 130.000.000
Margin: 20%
Periode: 3 tahun

Expected:
Harga Sewa: Rp 476.666.667/tahun
Total Revenue: Rp 1.430.000.000
Total Cost: Rp 1.170.000.000
Total Profit: Rp 260.000.000
```

### Test Case 2: CT Scan ✅
```
Input:
Harga Beli: 5.000.000.000
Umur Ekonomis: 10 tahun
Nilai Residu: 500.000.000
Margin: 15%
Periode: 5 tahun

Expected:
Harga Sewa: Rp 1.050.000.000/tahun
Total Revenue: Rp 5.250.000.000
Total Cost: Rp 4.500.000.000
Total Profit: Rp 750.000.000
```

### Test Case 3: USG 4D ✅
```
Input:
Harga Beli: 800.000.000
Umur Ekonomis: 7 tahun
Nilai Residu: 80.000.000
Margin: 25%
Periode: 2 tahun

Expected:
Harga Sewa: Rp 460.000.000/tahun
Total Revenue: Rp 920.000.000
Total Cost: Rp 720.000.000
Total Profit: Rp 200.000.000
```

## 🐛 Troubleshooting Cepat

### Masalah: Menu tidak muncul
**Solusi**: Refresh browser (Ctrl+F5)

### Masalah: Tidak bisa simpan
**Solusi**: 
1. Pastikan sudah login
2. Periksa migration database
3. Lihat console browser (F12)

### Masalah: Hasil salah
**Solusi**: 
1. Periksa input data
2. Pastikan semua field terisi
3. Gunakan test case untuk verifikasi

### Masalah: Data tidak muncul di riwayat
**Solusi**:
1. Refresh halaman riwayat
2. Klik tombol "Refresh"
3. Periksa filter user

## 📚 Dokumentasi Lengkap

Untuk informasi lebih detail:

- **User Guide**: [PANDUAN_ANALISA_SEWA.md](./PANDUAN_ANALISA_SEWA.md)
- **Technical Docs**: [IMPLEMENTASI_ANALISA_SEWA.md](./IMPLEMENTASI_ANALISA_SEWA.md)
- **Feature Summary**: [FITUR_BARU_ANALISA_SEWA.md](./FITUR_BARU_ANALISA_SEWA.md)
- **Full Summary**: [RINGKASAN_FITUR_ANALISA_SEWA.md](./RINGKASAN_FITUR_ANALISA_SEWA.md)

## 💡 Tips

1. **Nilai Residu**: Gunakan 10% dari harga beli sebagai default
2. **Margin Keuntungan**: 15-25% adalah range umum
3. **Masa Sewa**: Lebih panjang = harga per tahun lebih rendah
4. **Simpan Skenario**: Simpan berbagai skenario untuk perbandingan

## 🎉 Selesai!

Anda sekarang siap menggunakan fitur Analisa Sewa. Selamat mencoba!

---

**Need Help?**
- 📖 Baca dokumentasi lengkap
- 🧪 Gunakan test page untuk eksperimen
- 💬 Hubungi support jika ada masalah

**Version**: 1.0.0  
**Last Updated**: 5 Maret 2026
