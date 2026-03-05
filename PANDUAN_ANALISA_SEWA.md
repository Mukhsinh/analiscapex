# Panduan Analisa Sewa Alat Medis

## Deskripsi
Fitur Analisa Sewa membantu Anda menghitung harga sewa yang optimal untuk alat medis yang akan disewakan kepada pihak lain. Perhitungan mempertimbangkan berbagai faktor seperti harga beli, umur ekonomis, nilai residu, dan tingkat keuntungan yang diharapkan.

## Cara Menggunakan

### 1. Akses Menu Analisa Sewa
- Login ke aplikasi
- Klik menu "Analisa Sewa" di sidebar

### 2. Input Data
Masukkan data berikut:

#### a. Harga Beli Alat (Rp) *
- Harga pembelian alat medis
- Contoh: Rp 1.300.000.000

#### b. Umur Ekonomis Alat (tahun) *
- Perkiraan masa pakai alat
- Contoh: 5 tahun

#### c. Nilai Residu (Rp)
- Nilai alat di akhir umur ekonomis
- Contoh: Rp 130.000.000
- Opsional, default: 0

#### d. Tingkat Keuntungan Vendor (%) *
- Persentase keuntungan yang diharapkan
- Contoh: 20%

#### e. Masa Sewa (tahun) *
- Durasi kontrak sewa
- Contoh: 3 tahun

*) Field wajib diisi

### 3. Hasil Perhitungan
Sistem akan menampilkan:
- **Harga Sewa per Tahun**: Biaya sewa tahunan yang harus dibayar penyewa
- **Total Pendapatan Sewa**: Total pendapatan selama masa sewa
- **Total Biaya**: Biaya bersih (Harga Beli - Nilai Residu)
- **Total Keuntungan**: Profit yang akan diperoleh

### 4. Simpan Analisis
- Klik tombol "Simpan Analisis" untuk menyimpan ke database
- Data tersimpan dapat dilihat di menu Riwayat Analisis

## Rumus Perhitungan

```
Harga Sewa per Tahun = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa) - Nilai Residu) / Masa Sewa
```

### Contoh Perhitungan:
- Harga Beli: Rp 1.300.000.000
- Tingkat Keuntungan: 20%
- Nilai Residu: Rp 130.000.000
- Masa Sewa: 3 tahun

```
Harga Sewa = ((1.300.000.000 × 1,20) - 130.000.000) / 3
           = (1.560.000.000 - 130.000.000) / 3
           = 1.430.000.000 / 3
           = Rp 476.666.667 per tahun
```

## Interpretasi Hasil

### Harga Sewa per Tahun
- Ini adalah biaya yang harus dibayar penyewa setiap tahun
- Sudah termasuk margin keuntungan vendor

### Total Pendapatan
- Total uang yang akan diterima selama masa sewa
- Harga Sewa × Masa Sewa

### Total Biaya
- Biaya bersih investasi alat
- Harga Beli - Nilai Residu

### Total Keuntungan
- Profit yang akan diperoleh
- Total Pendapatan - Total Biaya
- Jika positif: menguntungkan
- Jika negatif: merugi

## Tips Penggunaan

1. **Riset Pasar**: Bandingkan harga sewa dengan kompetitor
2. **Pertimbangkan Maintenance**: Pastikan harga sewa mencakup biaya perawatan
3. **Nilai Residu Realistis**: Gunakan estimasi nilai residu yang wajar
4. **Margin Keuntungan**: Sesuaikan dengan kondisi pasar dan risiko
5. **Kontrak Jangka Panjang**: Masa sewa lebih lama = harga per tahun lebih rendah

## Integrasi Database

### Tabel: rental_analysis
Data yang disimpan:
- Input data (harga beli, umur ekonomis, dll)
- Hasil perhitungan (harga sewa, revenue, profit)
- Metadata (user, project, timestamp)

### Fitur:
- Auto-save ke database
- Riwayat analisis tersimpan
- Export ke PDF (coming soon)
- Perbandingan dengan analisis lain

## Troubleshooting

### Tombol Simpan Tidak Aktif
- Pastikan semua field wajib sudah diisi
- Pastikan Anda sudah login

### Hasil Perhitungan Tidak Muncul
- Periksa kembali input data
- Pastikan nilai numerik valid
- Refresh halaman jika perlu

### Gagal Menyimpan ke Database
- Periksa koneksi internet
- Pastikan session login masih aktif
- Coba logout dan login kembali

## Contoh Kasus Penggunaan

### Kasus 1: Sewa Alat CT Scan
```
Harga Beli: Rp 5.000.000.000
Umur Ekonomis: 10 tahun
Nilai Residu: Rp 500.000.000
Tingkat Keuntungan: 15%
Masa Sewa: 5 tahun

Hasil:
Harga Sewa/Tahun: Rp 1.050.000.000
Total Pendapatan: Rp 5.250.000.000
Total Biaya: Rp 4.500.000.000
Total Keuntungan: Rp 750.000.000
```

### Kasus 2: Sewa Alat Analyzer Kimia
```
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun

Hasil:
Harga Sewa/Tahun: Rp 476.666.667
Total Pendapatan: Rp 1.430.000.000
Total Biaya: Rp 1.170.000.000
Total Keuntungan: Rp 260.000.000
```

## Fitur Mendatang

- [ ] Export hasil ke PDF
- [ ] Perbandingan multiple skenario
- [ ] Grafik visualisasi cash flow
- [ ] Template kontrak sewa
- [ ] Reminder pembayaran sewa
- [ ] Integrasi dengan modul maintenance

## Dukungan

Jika mengalami kendala, hubungi:
- Email: support@capexanalyzer.com
- Dokumentasi: [DOCS_INDEX.md](./DOCS_INDEX.md)
