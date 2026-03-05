# Panduan Singkat - Fitur Analisa Sewa

## 🎯 Tujuan
Fitur Analisa Sewa membantu Anda menghitung harga sewa optimal untuk alat medis yang akan disewakan kepada pihak lain, dengan mempertimbangkan harga beli, umur ekonomis, nilai residu, dan tingkat keuntungan yang diharapkan.

---

## 📋 Menu Analisa Sewa

Fitur ini terdiri dari 2 submenu:

### 1. Hitung Harga Sewa
Untuk melakukan perhitungan harga sewa baru

### 2. Riwayat Kalkulasi
Untuk melihat semua analisis yang pernah dibuat

---

## 🧮 Cara Menghitung Harga Sewa

### Langkah 1: Buka Menu
1. Klik menu **"Analisa Sewa"** di sidebar
2. Pilih submenu **"Hitung Harga Sewa"**

### Langkah 2: Isi Data Input
Lengkapi semua field berikut:

| Field | Deskripsi | Contoh |
|-------|-----------|--------|
| **Nama Alat** | Nama alat yang akan disewakan | CT Scan 64 Slice |
| **Harga Beli Alat** | Harga pembelian alat (Rupiah) | Rp 1.300.000.000 |
| **Umur Ekonomis** | Masa pakai alat (tahun) | 5 tahun |
| **Nilai Residu** | Nilai alat di akhir umur ekonomis | Rp 130.000.000 |
| **Tingkat Keuntungan** | Persentase keuntungan vendor | 20% |
| **Masa Sewa** | Durasi kontrak sewa (tahun) | 3 tahun |

### Langkah 3: Lihat Hasil
Setelah semua field terisi, hasil perhitungan akan muncul otomatis:

- **Harga Sewa per Tahun**: Harga sewa tahunan yang direkomendasikan
- **Total Pendapatan Sewa**: Total pendapatan selama masa sewa
- **Total Biaya**: Biaya investasi (harga beli - nilai residu)
- **Total Keuntungan**: Profit yang akan didapat

### Langkah 4: Simpan Analisis
1. Klik tombol **"Simpan Analisis"** (hijau)
2. Tunggu hingga muncul pesan sukses
3. Data tersimpan ke database dan bisa dilihat di riwayat

### Langkah 5: Unduh Laporan PDF
1. Klik tombol **"Unduh PDF"** (biru)
2. PDF akan otomatis ter-download
3. Buka file PDF untuk melihat laporan lengkap

---

## 📊 Isi Laporan PDF

Laporan PDF yang dihasilkan berisi:

### 1. Informasi Umum
- Tanggal analisis
- Nama alat
- Nama analis

### 2. Data Input
Tabel berisi semua parameter yang diinput

### 3. Hasil Perhitungan
Tabel berisi hasil kalkulasi:
- Harga sewa per tahun
- Total pendapatan
- Total biaya
- Total keuntungan

### 4. Rumus Perhitungan
Formula yang digunakan dan contoh perhitungan

### 5. Analisis & Rekomendasi
- ROI (Return on Investment)
- Margin keuntungan aktual
- Periode pengembalian modal
- Status kelayakan (LAYAK/TIDAK LAYAK)
- Rekomendasi bisnis

---

## 📜 Cara Melihat Riwayat Kalkulasi

### Langkah 1: Buka Menu Riwayat
1. Klik menu **"Analisa Sewa"** di sidebar
2. Pilih submenu **"Riwayat Kalkulasi"**

### Langkah 2: Lihat Daftar Analisis
Anda akan melihat semua analisis yang pernah dibuat, dengan informasi:
- Nama alat
- Tanggal analisis
- Status kelayakan (badge hijau/merah)
- Harga beli
- Harga sewa per tahun
- Total revenue
- Total keuntungan
- Rumah sakit dan departemen

### Langkah 3: Aksi yang Tersedia

#### A. Lihat Detail
1. Klik tombol **"Detail"** (biru)
2. Modal popup akan muncul dengan informasi lengkap
3. Klik **"Tutup"** untuk menutup modal

#### B. Unduh PDF
1. Klik tombol **"PDF"** (hijau)
2. PDF laporan akan otomatis ter-download
3. Buka file untuk melihat laporan lengkap

#### C. Hapus Analisis
1. Klik tombol **"Hapus"** (merah)
2. Konfirmasi penghapusan
3. Data akan dihapus dari database

---

## 🧮 Rumus Perhitungan

### Formula Utama
```
Harga Sewa per Tahun = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa) - Nilai Residu) / Masa Sewa
```

### Contoh Perhitungan
**Data Input:**
- Harga Beli: Rp 1.300.000.000
- Tingkat Keuntungan: 20%
- Nilai Residu: Rp 130.000.000
- Masa Sewa: 3 tahun

**Perhitungan:**
```
Harga Sewa = ((1.300.000.000 × (1 + 0,20)) - 130.000.000) / 3
           = ((1.300.000.000 × 1,20) - 130.000.000) / 3
           = (1.560.000.000 - 130.000.000) / 3
           = 1.430.000.000 / 3
           = Rp 476.666.667 per tahun
```

**Hasil:**
- Harga Sewa per Tahun: Rp 476.666.667
- Total Pendapatan (3 tahun): Rp 1.430.000.000
- Total Biaya: Rp 1.170.000.000
- Total Keuntungan: Rp 260.000.000
- ROI: 20%

---

## 💡 Tips Penggunaan

### 1. Menentukan Tingkat Keuntungan
- Pertimbangkan kondisi pasar
- Lihat harga kompetitor
- Sesuaikan dengan risiko bisnis
- Biasanya berkisar 15-30%

### 2. Menentukan Nilai Residu
- Konsultasi dengan vendor
- Lihat nilai pasar alat bekas
- Pertimbangkan kondisi alat
- Biasanya 10-20% dari harga beli

### 3. Menentukan Masa Sewa
- Sesuaikan dengan umur ekonomis
- Pertimbangkan kebutuhan rumah sakit
- Biasanya 3-5 tahun
- Jangan melebihi umur ekonomis

### 4. Interpretasi Hasil
- **Total Keuntungan Positif**: Harga sewa layak diterapkan
- **Total Keuntungan Negatif**: Perlu review ulang parameter
- **ROI > 15%**: Investasi cukup menguntungkan
- **ROI < 10%**: Pertimbangkan alternatif lain

---

## ⚠️ Catatan Penting

### Validasi Data
- Semua field harus diisi
- Harga beli harus > 0
- Umur ekonomis harus > 0
- Masa sewa harus > 0
- Tingkat keuntungan harus ≥ 0

### Keamanan Data
- Harus login untuk menyimpan analisis
- Data hanya bisa dilihat oleh user yang membuat
- Data tersimpan aman di database
- Bisa dihapus kapan saja

### Backup Data
- Selalu download PDF sebagai backup
- Simpan PDF di folder terorganisir
- Buat naming convention yang jelas
- Contoh: `Sewa_CTScan_2026-03-05.pdf`

---

## 🆘 Troubleshooting

### Masalah: Tombol "Simpan" tidak berfungsi
**Solusi:**
- Pastikan sudah login
- Pastikan semua field terisi
- Pastikan hasil perhitungan sudah muncul
- Cek koneksi internet

### Masalah: PDF tidak ter-download
**Solusi:**
- Cek browser settings untuk download
- Pastikan tidak ada popup blocker
- Coba browser lain
- Cek space disk komputer

### Masalah: Riwayat tidak muncul
**Solusi:**
- Refresh halaman (F5)
- Pastikan sudah ada data tersimpan
- Cek koneksi internet
- Logout dan login kembali

### Masalah: Data tidak tersimpan
**Solusi:**
- Cek koneksi internet
- Pastikan sudah login
- Coba lagi beberapa saat
- Hubungi administrator jika masih error

---

## 📞 Bantuan Lebih Lanjut

Jika mengalami kendala atau memiliki pertanyaan:
1. Baca dokumentasi lengkap di `FITUR_ANALISA_SEWA_LENGKAP.md`
2. Lihat checklist testing di `CHECKLIST_TESTING_ANALISA_SEWA_LENGKAP.md`
3. Hubungi tim support
4. Email: [email support]

---

**© Copyright Mukhsin Hadi - Capex Analyzer Professional Edition**
