# Panduan Analisa Perbandingan Harga Penawaran
## Capex Analyzer - Modul Analisa Sewa

### 📋 Deskripsi
Fitur ini memungkinkan Anda untuk membandingkan harga penawaran dari vendor dengan hasil kalkulasi optimal, sehingga Anda dapat menentukan apakah harga tersebut layak diterima atau perlu dinegosiasikan ulang.

---

## 🎯 Tujuan Fitur

1. **Validasi Harga**: Memastikan harga penawaran vendor sesuai dengan kalkulasi bisnis
2. **Keputusan Cepat**: Memberikan rekomendasi langsung apakah harga layak atau tidak
3. **Panduan Negosiasi**: Menyediakan target harga untuk negosiasi
4. **Dokumentasi**: Menyimpan analisa perbandingan dalam laporan PDF

---

## 📝 Cara Penggunaan

### Langkah 1: Akses Halaman Analisa Sewa
1. Login ke aplikasi Capex Analyzer
2. Klik menu **"Analisa Sewa"** di sidebar
3. Pilih submenu **"Hitung Harga Sewa"**

### Langkah 2: Isi Data Dasar
Masukkan informasi berikut:

| Field | Deskripsi | Contoh |
|-------|-----------|--------|
| **Nama Alat** | Nama alat medis yang akan disewakan | CT Scan 64 Slice |
| **Harga Beli Alat** | Harga pembelian alat | Rp 1.300.000.000 |
| **Umur Ekonomis** | Masa pakai alat (tahun) | 5 tahun |
| **Nilai Residu** | Nilai alat di akhir masa pakai | Rp 130.000.000 |
| **Tingkat Keuntungan** | Margin keuntungan yang diharapkan | 20% |
| **Masa Sewa** | Durasi kontrak sewa | 3 tahun |

### Langkah 3: Masukkan Harga Penawaran (Opsional)
- Field: **"Harga Penawaran dari Vendor (Rp/tahun)"**
- Masukkan harga yang ditawarkan oleh vendor/penyewa
- Contoh: Rp 350.000.000/tahun

### Langkah 4: Lihat Hasil Analisa
Sistem akan otomatis menampilkan:
- ✅ Harga sewa optimal (hasil kalkulasi)
- 📊 Perbandingan dengan harga penawaran
- 🎯 Status kelayakan
- 💡 Rekomendasi tindakan

---

## 📊 Kategori Status Kelayakan

### 1. ✅ HARGA WAJAR (±5%)
**Kondisi:** Harga penawaran dalam range ±5% dari kalkulasi

**Contoh:**
```
Harga Kalkulasi: Rp 300.000.000
Harga Penawaran: Rp 310.000.000
Selisih: +Rp 10.000.000 (+3.3%)
```

**Rekomendasi:**
- Harga sudah kompetitif
- Dapat melanjutkan ke tahap kontrak
- Pastikan terms & conditions sesuai

---

### 2. 🎯 HARGA SANGAT BAIK (-5% s/d -15%)
**Kondisi:** Harga penawaran 5-15% lebih rendah dari kalkulasi

**Contoh:**
```
Harga Kalkulasi: Rp 300.000.000
Harga Penawaran: Rp 270.000.000
Selisih: -Rp 30.000.000 (-10%)
```

**Rekomendasi:**
- Penawaran sangat menguntungkan
- Segera lakukan kesepakatan
- Pastikan tidak ada hidden cost
- Verifikasi kualitas alat dan layanan

---

### 3. 💡 DAPAT DINEGOSIASIKAN (+5% s/d +15%)
**Kondisi:** Harga penawaran 5-15% lebih tinggi dari kalkulasi

**Contoh:**
```
Harga Kalkulasi: Rp 300.000.000
Harga Penawaran: Rp 330.000.000
Selisih: +Rp 30.000.000 (+10%)
```

**Rekomendasi:**
- Coba negosiasi untuk mendekati harga kalkulasi
- Tanyakan kemungkinan diskon
- Pertimbangkan value-added services
- Bandingkan dengan vendor lain

---

### 4. ⚠️ PERLU NEGOSIASI ULANG (>+15%)
**Kondisi:** Harga penawaran lebih dari 15% di atas kalkulasi

**Contoh:**
```
Harga Kalkulasi: Rp 300.000.000
Harga Penawaran: Rp 360.000.000
Selisih: +Rp 60.000.000 (+20%)
```

**Rekomendasi:**
- Harga terlalu tinggi, HARUS dinegosiasi
- Target maksimal: Kalkulasi + 10%
- Minta breakdown detail biaya
- Bandingkan dengan vendor lain
- Pertimbangkan mencari alternatif

---

### 5. 🔍 HARGA TERLALU RENDAH (<-15%)
**Kondisi:** Harga penawaran lebih dari 15% di bawah kalkulasi

**Contoh:**
```
Harga Kalkulasi: Rp 300.000.000
Harga Penawaran: Rp 240.000.000
Selisih: -Rp 60.000.000 (-20%)
```

**Rekomendasi:**
- Harga mencurigakan, perlu verifikasi
- Pastikan tidak ada penurunan kualitas
- Tinjau detail kontrak dengan teliti
- Cek reputasi vendor
- Verifikasi spesifikasi alat
- Pastikan tidak ada hidden cost

---

## 💾 Menyimpan Analisa

### Simpan ke Database
1. Klik tombol **"Simpan Analisis"**
2. Data akan tersimpan di database
3. Dapat diakses kembali di menu **"Riwayat Kalkulasi"**

### Download Laporan PDF
1. Klik tombol **"Unduh PDF"**
2. Laporan lengkap akan terdownload
3. Laporan mencakup:
   - Data input lengkap
   - Hasil perhitungan
   - Rumus kalkulasi
   - Analisa perbandingan harga
   - Status kelayakan
   - Rekomendasi detail

---

## 📈 Contoh Kasus Nyata

### Kasus 1: Penawaran Terlalu Tinggi

**Data Input:**
- Nama Alat: MRI 1.5 Tesla
- Harga Beli: Rp 8.000.000.000
- Umur Ekonomis: 10 tahun
- Nilai Residu: Rp 800.000.000
- Tingkat Keuntungan: 15%
- Masa Sewa: 5 tahun

**Hasil Kalkulasi:**
```
Harga Sewa Optimal: Rp 1.680.000.000/tahun
```

**Harga Penawaran Vendor:**
```
Rp 2.100.000.000/tahun
```

**Analisa:**
```
Selisih: +Rp 420.000.000 (+25%)
Status: ⚠️ PERLU NEGOSIASI ULANG
```

**Rekomendasi:**
- Target negosiasi: Maksimal Rp 1.848.000.000 (kalkulasi + 10%)
- Minta breakdown biaya dari vendor
- Bandingkan dengan vendor lain
- Jika vendor tidak mau turun, pertimbangkan alternatif

---

### Kasus 2: Penawaran Sangat Baik

**Data Input:**
- Nama Alat: USG 4D
- Harga Beli: Rp 500.000.000
- Umur Ekonomis: 7 tahun
- Nilai Residu: Rp 50.000.000
- Tingkat Keuntungan: 18%
- Masa Sewa: 3 tahun

**Hasil Kalkulasi:**
```
Harga Sewa Optimal: Rp 180.000.000/tahun
```

**Harga Penawaran Vendor:**
```
Rp 160.000.000/tahun
```

**Analisa:**
```
Selisih: -Rp 20.000.000 (-11.1%)
Status: 🎯 HARGA SANGAT BAIK
```

**Rekomendasi:**
- Harga sangat kompetitif, segera lakukan kesepakatan
- Pastikan tidak ada hidden cost
- Verifikasi kualitas alat dan layanan support
- Review SLA dengan detail

---

### Kasus 3: Harga Wajar

**Data Input:**
- Nama Alat: X-Ray Digital
- Harga Beli: Rp 300.000.000
- Umur Ekonomis: 8 tahun
- Nilai Residu: Rp 30.000.000
- Tingkat Keuntungan: 20%
- Masa Sewa: 4 tahun

**Hasil Kalkulasi:**
```
Harga Sewa Optimal: Rp 82.500.000/tahun
```

**Harga Penawaran Vendor:**
```
Rp 85.000.000/tahun
```

**Analisa:**
```
Selisih: +Rp 2.500.000 (+3%)
Status: ✅ HARGA WAJAR
```

**Rekomendasi:**
- Harga sudah kompetitif dan dapat diterima
- Lanjutkan ke tahap kontrak
- Pastikan semua terms & conditions sesuai
- Review SLA dan support yang disediakan

---

## 🔧 Tips & Best Practices

### 1. Persiapan Data
- ✅ Pastikan data harga beli akurat
- ✅ Gunakan umur ekonomis yang realistis
- ✅ Hitung nilai residu dengan cermat
- ✅ Tentukan margin keuntungan yang wajar

### 2. Analisa Penawaran
- ✅ Selalu bandingkan dengan kalkulasi
- ✅ Jangan hanya fokus pada harga
- ✅ Pertimbangkan kualitas layanan
- ✅ Review terms & conditions dengan detail

### 3. Negosiasi
- ✅ Gunakan hasil kalkulasi sebagai dasar
- ✅ Siapkan data pendukung
- ✅ Bersikap profesional dan objektif
- ✅ Pertimbangkan win-win solution

### 4. Dokumentasi
- ✅ Simpan semua analisa ke database
- ✅ Download laporan PDF untuk arsip
- ✅ Dokumentasikan proses negosiasi
- ✅ Review berkala untuk evaluasi

---

## ❓ FAQ (Frequently Asked Questions)

### Q1: Apakah harus mengisi harga penawaran?
**A:** Tidak, field harga penawaran bersifat opsional. Jika tidak diisi, sistem hanya akan menampilkan hasil kalkulasi tanpa analisa perbandingan.

### Q2: Bagaimana jika harga penawaran jauh lebih rendah?
**A:** Harga yang terlalu rendah (<-15%) perlu diwaspadai. Pastikan tidak ada penurunan kualitas atau hidden cost. Verifikasi detail kontrak dengan teliti.

### Q3: Apakah bisa mengubah data setelah disimpan?
**A:** Ya, Anda dapat membuat analisa baru dengan data yang diperbarui. Sistem akan menyimpan riwayat semua analisa.

### Q4: Bagaimana cara melihat riwayat analisa?
**A:** Klik menu "Riwayat Kalkulasi" di sidebar untuk melihat semua analisa yang pernah disimpan.

### Q5: Apakah laporan PDF bisa dikustomisasi?
**A:** Saat ini format laporan sudah standar dan profesional. Untuk kebutuhan khusus, silakan hubungi administrator.

---

## 📞 Dukungan

Jika mengalami kesulitan atau memiliki pertanyaan:
- 📧 Email: support@capexanalyzer.com
- 📱 WhatsApp: +62 xxx-xxxx-xxxx
- 🌐 Website: www.capexanalyzer.com

---

**© 2026 Capex Analyzer - Professional Edition**
*Membantu Anda membuat keputusan investasi yang lebih baik*
