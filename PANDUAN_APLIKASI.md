# Panduan Penggunaan Aplikasi Analisis Keputusan Capex

## 🎯 Tujuan Aplikasi

Aplikasi ini membantu manajer dalam mengambil keputusan investasi Capital Expenditure (Capex) dengan membandingkan 3 alternatif pembiayaan menggunakan metode Present Value Analysis.

## 📊 Alternatif Pembiayaan

### 1. Leasing (Sewa Guna Usaha)
**Karakteristik:**
- Pembayaran tetap per bulan
- Sudah termasuk biaya pemeliharaan
- Tidak ada kepemilikan aset di akhir periode
- Cocok untuk: Cash flow yang stabil, tidak ingin risiko kepemilikan

**Input yang Diperlukan:**
- Pembayaran Leasing per Bulan (juta Rp)
- Periode (bulan)
- Discount Rate (%)

**Contoh Default:**
- Pembayaran: Rp 280 juta/bulan
- Periode: 60 bulan (5 tahun)
- Discount Rate: 10%

### 2. Borrow & Purchase (Pinjaman Bank)
**Karakteristik:**
- Pinjaman bank dengan bunga declining balance
- Kepemilikan aset sejak awal
- Ada nilai residu/trade-in di akhir periode
- Biaya pemeliharaan terpisah
- Cocok untuk: Ingin memiliki aset, ada rencana upgrade

**Input yang Diperlukan:**
- Jumlah Pinjaman (juta Rp)
- Bunga per Tahun (%)
- Periode (tahun)
- Biaya Pemeliharaan per Tahun (juta Rp)
- Nilai Residu/Trade-in (juta Rp)
- Discount Rate (%)

**Contoh Default:**
- Pinjaman: Rp 1.300 juta
- Bunga: 10% per tahun
- Periode: 5 tahun
- Maintenance: Rp 20 juta/tahun
- Residu: Rp 130 juta (10% dari harga)
- Discount Rate: 10%

### 3. Revenue Sharing (Bagi Hasil)
**Karakteristik:**
- Tidak ada investasi awal
- Pembagian pendapatan berdasarkan persentase
- Risiko operasional ditanggung bersama
- Perlu volume tinggi untuk profitable
- Cocok untuk: Cash flow terbatas, volume tinggi

**Input yang Diperlukan:**
- Tarif per Pemeriksaan (Rp)
- Porsi RS (%)
- Proyeksi Volume per Tahun
- Biaya Overhead Langsung per Tahun (juta Rp)
- Biaya Overhead Alokasian per Tahun (juta Rp)
- Tax Rate (%)
- Discount Rate (%)
- Periode (tahun)

**Contoh Default:**
- Tarif: Rp 150.000
- Porsi RS: 15%
- Volume: 9.180 pemeriksaan/tahun
- Overhead Langsung: Rp 1.632 juta (34 personel × Rp 4 jt × 12 bulan)
- Overhead Alokasian: Rp 240 juta
- Tax Rate: 15%
- Discount Rate: 10%
- Periode: 5 tahun

## 🔢 Metodologi Perhitungan

### Present Value (PV) Analysis
Aplikasi menggunakan metode Present Value untuk membandingkan nilai uang di masa depan dengan nilai saat ini.

**Rumus PV Factor:**
```
PV Factor = 1 / (1 + r)^n
```
- r = discount rate (tingkat diskonto)
- n = tahun ke-n

**Interpretasi:**
- PV Factor menurun setiap tahun (nilai uang berkurang di masa depan)
- Discount rate 10% = asumsi opportunity cost atau WACC perusahaan

### Perhitungan per Alternatif

#### Leasing
```
Pembayaran Tahunan = Pembayaran Bulanan × 12
PV Expense per Tahun = Pembayaran Tahunan × PV Factor
Total PV = Σ PV Expense (semua tahun)
```

#### Borrow & Purchase
```
Principal Payment = Jumlah Pinjaman / Periode
Interest per Tahun = Sisa Pinjaman × Interest Rate
Total Expense = Principal + Interest + Maintenance
PV Expense = Total Expense × PV Factor
Trade-in PV = Nilai Residu × PV Factor (tahun terakhir)
Total PV = Σ PV Expense - Trade-in PV
```

**Catatan:** Bunga declining balance = bunga dihitung dari sisa pinjaman yang menurun setiap tahun

#### Revenue Sharing
```
Annual Revenue = Tarif × (Porsi RS / 100) × Volume / 1.000.000
Operating Profit = Revenue - Direct Overhead - Allocated Overhead
EAT = Operating Profit × (1 - Tax Rate / 100)
PV Expense = |EAT| × PV Factor
Total PV = Σ PV Expense
```

**Catatan:** Jika EAT negatif (rugi), maka dianggap sebagai expense

## 📱 Cara Menggunakan Aplikasi

### Langkah 1: Akses Aplikasi
1. Buka browser
2. Akses `http://localhost:5173`
3. Aplikasi akan menampilkan halaman utama

### Langkah 2: Input Data
1. **Pilih Tab** - Klik salah satu tab (Leasing, Borrow & Purchase, atau Revenue Sharing)
2. **Isi Form** - Masukkan data sesuai penawaran yang diterima
3. **Validasi** - Pastikan semua field terisi dengan benar

### Langkah 3: Analisis
1. Klik tombol **"Hitung & Bandingkan Semua Alternatif"**
2. Aplikasi akan menghitung ketiga alternatif sekaligus
3. Hasil akan ditampilkan di bawah form

### Langkah 4: Interpretasi Hasil

#### Summary Cards
- Menampilkan Total PV Expense untuk setiap alternatif
- Warna berbeda untuk setiap alternatif (Biru, Hijau, Ungu)
- Warning jika Revenue Sharing menghasilkan kerugian

#### Chart Perbandingan
- Bar chart untuk membandingkan Total PV Expense
- Semakin rendah = semakin baik
- Visual yang mudah dipahami

#### Rekomendasi
- 🥇 Menampilkan alternatif terbaik (PV terendah)
- Kesimpulan lengkap dengan angka
- Catatan khusus jika ada alternatif yang tidak feasible

#### Tabel Detail
- **Leasing**: Pembayaran per tahun, PV Factor, PV Expense
- **Borrow & Purchase**: Principal, Interest, Maintenance, Trade-in, PV Expense
- **Revenue Sharing**: Revenue, Overhead, EAT, PV Expense

## 💡 Tips Penggunaan

### 1. Menentukan Discount Rate
- Gunakan WACC (Weighted Average Cost of Capital) perusahaan
- Atau gunakan tingkat bunga pinjaman bank
- Biasanya berkisar 8-12% untuk Indonesia

### 2. Proyeksi Volume (Revenue Sharing)
- Gunakan data historis jika ada
- Pertimbangkan growth rate
- Buat skenario konservatif, moderat, dan optimis

### 3. Biaya Overhead
- **Direct Overhead**: Biaya langsung (gaji personel, reagent, dll)
- **Allocated Overhead**: Alokasi biaya bersama (listrik, air, administrasi)
- Hitung dengan akurat untuk hasil yang valid

### 4. Nilai Residu
- Biasanya 10-20% dari harga beli
- Tergantung kondisi pasar alat bekas
- Konsultasikan dengan vendor

## ⚠️ Hal yang Perlu Diperhatikan

### Asumsi dalam Analisis
1. **Pendapatan diabaikan** - Untuk Leasing vs Purchase, pendapatan dianggap sama
2. **Inflasi tidak diperhitungkan** - Gunakan nilai nominal
3. **Pajak** - Hanya diperhitungkan di Revenue Sharing (EAT)
4. **Risiko** - Tidak diperhitungkan dalam model ini

### Keterbatasan
- Tidak memperhitungkan aspek kualitatif (kualitas layanan, reputasi vendor)
- Tidak ada analisis sensitivitas otomatis
- Tidak memperhitungkan tax shield dari bunga pinjaman

### Rekomendasi Tambahan
1. **Lakukan analisis sensitivitas** - Ubah discount rate, volume, dll
2. **Pertimbangkan aspek non-finansial** - Kualitas alat, after-sales service
3. **Konsultasi dengan tim keuangan** - Validasi asumsi dan hasil
4. **Buat beberapa skenario** - Best case, base case, worst case

## 🔄 Skenario Analisis

### Skenario 1: Volume Rendah
Jika proyeksi volume rendah:
- Revenue Sharing kemungkinan tidak profitable
- Leasing atau Purchase lebih aman
- Fokus pada fixed cost yang rendah

### Skenario 2: Cash Flow Terbatas
Jika cash flow terbatas:
- Revenue Sharing tidak perlu investasi awal
- Leasing dengan pembayaran bulanan lebih mudah dikelola
- Hindari Purchase dengan pinjaman besar

### Skenario 3: Volume Tinggi
Jika proyeksi volume tinggi:
- Revenue Sharing bisa profitable
- Purchase untuk kepemilikan jangka panjang
- Pertimbangkan ROI jangka panjang

### Skenario 4: Teknologi Cepat Berubah
Jika teknologi cepat berubah:
- Leasing lebih fleksibel untuk upgrade
- Hindari Purchase (risiko obsolescence)
- Revenue Sharing dengan kontrak pendek

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: [email support]
- Dokumentasi: README.md
- Source code: GitHub repository

---

**Versi:** 1.0.0  
**Terakhir diupdate:** 2026-02-25  
**© Copyright Johny Setyawan & Niven A. Setyawan**
