# 📘 Panduan Analisis Kelayakan Harga Penawaran

## 🎯 Tujuan

Fitur ini membantu Anda menentukan apakah harga penawaran dari vendor layak diterima dengan membandingkannya terhadap hasil kalkulasi harga sewa yang optimal.

## 🚀 Cara Menggunakan

### 1. Input Data Dasar

Masukkan data perhitungan seperti biasa:
- **Nama Alat**: Contoh: CT Scan 64 Slice
- **Harga Beli Alat**: Rp 5.000.000.000
- **Umur Ekonomis**: 10 tahun
- **Nilai Residu**: Rp 500.000.000
- **Tingkat Keuntungan Vendor**: 15%
- **Masa Sewa**: 5 tahun

### 2. Input Harga Penawaran Vendor

Masukkan harga penawaran yang Anda terima dari vendor:
- **Harga Penawaran dari Vendor**: Rp 1.200.000.000/tahun

> 💡 **Tips**: Field ini opsional. Jika tidak diisi, analisis perbandingan tidak akan ditampilkan.

### 3. Lihat Hasil Analisis

Sistem akan menampilkan:

#### A. Hasil Perhitungan
- Harga Sewa per Tahun (Kalkulasi)
- Total Pendapatan Sewa
- Total Biaya
- Total Keuntungan

#### B. Analisis Perbandingan (jika ada penawaran)
- **Status Kelayakan**: LAYAK atau TIDAK LAYAK
- **Kategori**: Dengan warna dan icon yang jelas
- **Perbandingan Harga**: 
  - Harga Kalkulasi
  - Harga Penawaran Vendor
  - Selisih (nominal dan persentase)
- **Rekomendasi**: Tindakan yang disarankan

## 📊 Memahami Status Kelayakan

### ✅ LAYAK
Harga penawaran vendor **lebih rendah atau sama** dengan hasil kalkulasi.

**Artinya**: Penawaran menguntungkan atau wajar untuk diterima.

### ❌ TIDAK LAYAK
Harga penawaran vendor **lebih tinggi** dari hasil kalkulasi.

**Artinya**: Penawaran kurang menguntungkan, perlu negosiasi atau penolakan.

## 🎨 Kategori Status

### 🔴 TIDAK LAYAK - PERLU NEGOSIASI ULANG
- **Kondisi**: Penawaran >15% lebih tinggi dari kalkulasi
- **Contoh**: Kalkulasi Rp 1.000 juta, Penawaran Rp 1.200 juta
- **Tindakan**: Negosiasi ulang dengan target maksimal kalkulasi + 10%

### 🟡 TIDAK LAYAK - DAPAT DINEGOSIASIKAN
- **Kondisi**: Penawaran 5-15% lebih tinggi dari kalkulasi
- **Contoh**: Kalkulasi Rp 1.000 juta, Penawaran Rp 1.080 juta
- **Tindakan**: Negosiasi untuk mendekati harga kalkulasi

### 🟢 LAYAK - HARGA WAJAR
- **Kondisi**: Penawaran dalam range ±5% dari kalkulasi
- **Contoh**: Kalkulasi Rp 1.000 juta, Penawaran Rp 1.030 juta
- **Tindakan**: Lanjutkan ke tahap kontrak

### 🔵 LAYAK - HARGA SANGAT BAIK
- **Kondisi**: Penawaran 5-15% lebih rendah dari kalkulasi
- **Contoh**: Kalkulasi Rp 1.000 juta, Penawaran Rp 900 juta
- **Tindakan**: Segera lakukan kesepakatan

### 🟠 LAYAK - HARGA TERLALU RENDAH
- **Kondisi**: Penawaran >15% lebih rendah dari kalkulasi
- **Contoh**: Kalkulasi Rp 1.000 juta, Penawaran Rp 800 juta
- **Tindakan**: Verifikasi kualitas dan detail kontrak

## 💼 Contoh Kasus

### Kasus 1: Penawaran Terlalu Tinggi

**Input:**
- Harga Beli: Rp 5.000.000.000
- Umur Ekonomis: 10 tahun
- Nilai Residu: Rp 500.000.000
- Tingkat Keuntungan: 15%
- Masa Sewa: 5 tahun
- **Penawaran Vendor: Rp 1.300.000.000/tahun**

**Hasil:**
- Harga Kalkulasi: Rp 1.050.000.000/tahun
- Selisih: +Rp 250.000.000 (+23.8%)
- **Status: TIDAK LAYAK - PERLU NEGOSIASI ULANG** 🔴

**Rekomendasi:**
- Target negosiasi: maksimal Rp 1.155.000.000 (kalkulasi + 10%)
- Minta breakdown detail biaya
- Bandingkan dengan vendor lain

---

### Kasus 2: Penawaran Wajar

**Input:**
- (Data sama seperti Kasus 1)
- **Penawaran Vendor: Rp 1.080.000.000/tahun**

**Hasil:**
- Harga Kalkulasi: Rp 1.050.000.000/tahun
- Selisih: +Rp 30.000.000 (+2.9%)
- **Status: LAYAK - HARGA WAJAR** 🟢

**Rekomendasi:**
- Harga sudah kompetitif
- Lanjutkan ke tahap kontrak
- Review SLA dan support

---

### Kasus 3: Penawaran Sangat Baik

**Input:**
- (Data sama seperti Kasus 1)
- **Penawaran Vendor: Rp 950.000.000/tahun**

**Hasil:**
- Harga Kalkulasi: Rp 1.050.000.000/tahun
- Selisih: -Rp 100.000.000 (-9.5%)
- **Status: LAYAK - HARGA SANGAT BAIK** 🔵

**Rekomendasi:**
- Segera lakukan kesepakatan
- Pastikan tidak ada hidden cost
- Verifikasi kualitas alat

## 📄 Export PDF

Laporan PDF akan mencakup:

1. **Informasi Umum**
   - Tanggal analisis
   - Nama alat
   - Analis

2. **Data Input**
   - Semua parameter yang diinput

3. **Hasil Perhitungan**
   - Harga sewa kalkulasi
   - Total pendapatan
   - Total biaya
   - Total keuntungan

4. **Rumus Perhitungan**
   - Formula lengkap
   - Breakdown perhitungan

5. **Analisis & Rekomendasi**
   - ROI dan margin keuntungan
   - Status kelayakan proyek

6. **Analisis Perbandingan Harga Penawaran** (jika ada)
   - Tabel perbandingan
   - Status kelayakan dengan badge berwarna
   - Logika kelayakan
   - Kesimpulan dan rekomendasi detail

## 🧪 Testing

Gunakan file `test_analisis_kelayakan_harga.html` untuk testing:

1. Buka file di browser
2. Pilih salah satu skenario test atau input manual
3. Klik "Analisis Kelayakan"
4. Verifikasi hasil sesuai dengan kategori yang diharapkan

**Skenario Test:**
- Skenario 1: Penawaran >15% (Tidak Layak - Merah)
- Skenario 2: Penawaran 5-15% (Tidak Layak - Kuning)
- Skenario 3: Penawaran ±5% (Layak - Hijau)
- Skenario 4: Penawaran -5 s/d -15% (Layak - Biru)
- Skenario 5: Penawaran <-15% (Layak - Orange)

## ❓ FAQ

### Q: Apakah harus mengisi harga penawaran vendor?
**A**: Tidak, field ini opsional. Jika tidak diisi, sistem hanya menampilkan hasil kalkulasi tanpa analisis perbandingan.

### Q: Bagaimana jika penawaran vendor lebih rendah dari kalkulasi?
**A**: Ini adalah situasi yang baik! Sistem akan menandai sebagai "LAYAK" dengan rekomendasi untuk segera melakukan kesepakatan, namun tetap memverifikasi kualitas dan detail kontrak.

### Q: Apakah threshold persentase bisa diubah?
**A**: Threshold saat ini fixed (±5%, ±15%) berdasarkan praktik industri. Untuk kebutuhan khusus, bisa dikustomisasi di kode.

### Q: Bagaimana jika saya punya beberapa penawaran dari vendor berbeda?
**A**: Lakukan analisis terpisah untuk setiap penawaran, kemudian bandingkan hasilnya untuk menentukan penawaran terbaik.

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Periksa dokumentasi lengkap di `FITUR_ANALISIS_KELAYAKAN_HARGA_PENAWARAN.md`
2. Jalankan test file untuk memverifikasi fitur
3. Hubungi tim support untuk bantuan lebih lanjut

---

**Dibuat**: 5 Maret 2026  
**Versi**: 1.0  
**Status**: ✅ Production Ready
