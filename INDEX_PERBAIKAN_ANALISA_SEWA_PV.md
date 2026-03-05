# Index: Perbaikan Analisa Sewa dengan Present Value

## 📚 Dokumentasi Lengkap

### 1. Summary & Overview
- **[SUMMARY_PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md](SUMMARY_PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md)**
  - Ringkasan singkat perubahan
  - File yang dimodifikasi
  - Status dan next steps
  - **Baca ini dulu!** ⭐

### 2. Dokumentasi Detail
- **[PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md](PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md)**
  - Penjelasan lengkap perubahan
  - Konsep Present Value
  - Formula dan perhitungan
  - Logika kelayakan
  - Contoh kasus lengkap
  - **Untuk developer & analyst** 📖

### 3. Quick Guide untuk User
- **[QUICK_GUIDE_ANALISA_SEWA_PV.md](QUICK_GUIDE_ANALISA_SEWA_PV.md)**
  - Cara menggunakan fitur baru
  - Step-by-step tutorial
  - Interpretasi hasil
  - FAQ
  - Tips & best practices
  - **Untuk end user** 👤

### 4. Visual Guide
- **[VISUAL_GUIDE_ANALISA_SEWA_PV.md](VISUAL_GUIDE_ANALISA_SEWA_PV.md)**
  - Mockup UI/UX
  - Perubahan layout
  - Color palette
  - Responsive design
  - Interactive states
  - **Untuk designer & developer** 🎨

### 5. Testing Checklist
- **[CHECKLIST_TESTING_ANALISA_SEWA_PV.md](CHECKLIST_TESTING_ANALISA_SEWA_PV.md)**
  - 35+ test cases
  - Test data
  - Bug tracking template
  - Sign-off section
  - **Untuk QA tester** ✅

## 🎯 Quick Navigation

### Untuk Developer
1. Baca [Summary](SUMMARY_PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md) untuk overview
2. Baca [Dokumentasi Detail](PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md) untuk implementasi
3. Lihat [Visual Guide](VISUAL_GUIDE_ANALISA_SEWA_PV.md) untuk UI/UX
4. Jalankan [Testing Checklist](CHECKLIST_TESTING_ANALISA_SEWA_PV.md)

### Untuk End User
1. Baca [Quick Guide](QUICK_GUIDE_ANALISA_SEWA_PV.md)
2. Lihat contoh kasus di [Dokumentasi Detail](PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md)
3. Coba fitur dengan data test

### Untuk QA Tester
1. Baca [Summary](SUMMARY_PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md)
2. Gunakan [Testing Checklist](CHECKLIST_TESTING_ANALISA_SEWA_PV.md)
3. Referensi [Dokumentasi Detail](PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md) untuk expected behavior

### Untuk Product Owner
1. Baca [Summary](SUMMARY_PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md)
2. Review [Visual Guide](VISUAL_GUIDE_ANALISA_SEWA_PV.md)
3. Approve berdasarkan [Testing Checklist](CHECKLIST_TESTING_ANALISA_SEWA_PV.md)

## 📊 Fitur Utama

### 1. Input Discount Rate
- Field baru untuk tingkat diskonto
- Digunakan untuk perhitungan Present Value
- Mempertimbangkan time value of money

### 2. Feasibility Score (A+ hingga D)
- **A+ (Verifikasi)**: Penawaran terlalu rendah, cek kualitas
- **A (Sangat Baik)**: Penawaran sangat kompetitif
- **B (Wajar)**: Harga wajar dan dapat diterima ✅
- **C (Negosiasi)**: Dapat dinegosiasikan
- **D (Tidak Layak)**: Perlu negosiasi ulang ❌

### 3. Savings Potential
- Potensi penghematan (hijau) atau biaya tambahan (merah)
- Dalam nilai rupiah yang konkret
- Membantu keputusan negosiasi

### 4. Present Value Calculation
- Menghitung nilai sekarang dari biaya sewa
- Perbandingan yang lebih akurat vs harga beli
- Formula: PV = Σ (Biaya Sewa / (1 + r)^t)

## 🔧 File yang Dimodifikasi

### Source Code
- **src/components/RentalAnalysisForm.jsx**
  - Tambah input Discount Rate
  - Ubah tampilan kartu hasil
  - Tambah Feasibility Score system
  - Tambah Savings Potential

### Dokumentasi
- **PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md** (Detail lengkap)
- **QUICK_GUIDE_ANALISA_SEWA_PV.md** (User guide)
- **VISUAL_GUIDE_ANALISA_SEWA_PV.md** (UI/UX guide)
- **CHECKLIST_TESTING_ANALISA_SEWA_PV.md** (Testing)
- **SUMMARY_PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md** (Summary)
- **INDEX_PERBAIKAN_ANALISA_SEWA_PV.md** (This file)

## 🧪 Test Data

### Data Set 1: Penawaran Layak (Score B)
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran: Rp 350.000.000
```

**Expected:**
- Harga Kalkulasi: Rp 356.666.667
- PV: Rp 870.489.105
- Score: B (Wajar) ✅
- Savings: Rp 20.000.000 (hemat)

### Data Set 2: Penawaran Tidak Layak (Score D)
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran: Rp 450.000.000
```

**Expected:**
- Harga Kalkulasi: Rp 356.666.667
- PV: Rp 1.119.771.849
- Score: D (Tidak Layak) ❌
- Savings: Rp 280.000.000 (biaya tambahan)

## 💡 Key Concepts

### Present Value (PV)
Nilai sekarang dari uang yang akan diterima atau dibayar di masa depan, dengan mempertimbangkan tingkat diskonto.

**Formula:**
```
PV = Σ (CF_t / (1 + r)^t)

Dimana:
- CF_t = Cash Flow tahun ke-t
- r = Discount rate
- t = Tahun
```

### Feasibility Score
Sistem penilaian kelayakan harga penawaran berdasarkan selisih persentase antara harga kalkulasi dan penawaran vendor.

**Threshold:**
- A+: < -15%
- A: -15% s/d -5%
- B: -5% s/d +5%
- C: +5% s/d +15%
- D: > +15%

### Savings Potential
Potensi penghematan atau biaya tambahan dalam nilai rupiah, dihitung dari selisih harga dikalikan masa sewa.

**Formula:**
```
Savings = |Harga Kalkulasi - Harga Penawaran| × Masa Sewa
```

## 📈 Benefits

### 1. Analisis Lebih Akurat
- Mempertimbangkan time value of money
- Perbandingan yang lebih fair antara sewa vs beli
- Keputusan investasi yang lebih baik

### 2. Score yang Mudah Dipahami
- Sistem grading A+ hingga D
- Langsung terlihat kelayakan penawaran
- Tidak perlu interpretasi kompleks

### 3. Informasi Savings yang Jelas
- Tahu berapa potensi hemat atau biaya tambahan
- Dalam nilai rupiah yang konkret
- Membantu argumentasi negosiasi

### 4. Keputusan yang Lebih Baik
- Data lebih lengkap untuk negosiasi
- Rekomendasi yang spesifik dan actionable
- Mengurangi risiko keputusan yang salah

## 🎯 Use Cases

### Use Case 1: Evaluasi Penawaran Vendor
**Scenario:** RS menerima penawaran sewa CT Scan dari vendor

**Steps:**
1. Input data alat dan penawaran
2. Input discount rate (contoh: 10%)
3. Lihat Feasibility Score
4. Lihat Savings Potential
5. Baca rekomendasi
6. Putuskan: terima, negosiasi, atau tolak

### Use Case 2: Perbandingan Multiple Vendor
**Scenario:** RS menerima 3 penawaran dari vendor berbeda

**Steps:**
1. Input penawaran vendor A → Lihat score
2. Input penawaran vendor B → Lihat score
3. Input penawaran vendor C → Lihat score
4. Bandingkan score dan savings
5. Pilih vendor terbaik

### Use Case 3: Negosiasi Harga
**Scenario:** RS ingin negosiasi harga dengan vendor

**Steps:**
1. Input penawaran awal vendor
2. Lihat score dan savings
3. Gunakan harga kalkulasi sebagai argumen
4. Tunjukkan selisih dan potensi biaya tambahan
5. Minta penyesuaian harga

## 📞 Support

### Pertanyaan Teknis
- Lihat [Dokumentasi Detail](PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md)
- Lihat [FAQ di Quick Guide](QUICK_GUIDE_ANALISA_SEWA_PV.md)

### Pertanyaan UI/UX
- Lihat [Visual Guide](VISUAL_GUIDE_ANALISA_SEWA_PV.md)

### Bug Report
- Gunakan template di [Testing Checklist](CHECKLIST_TESTING_ANALISA_SEWA_PV.md)

## ✅ Status

- **Development**: ✅ Selesai
- **Documentation**: ✅ Selesai
- **Testing**: ⏳ Pending
- **Deployment**: ⏳ Pending

## 📅 Timeline

- **05 Mar 2026**: Development & Documentation selesai
- **TBD**: Testing
- **TBD**: Deployment ke production

---

**Last Updated**: 05 Maret 2026  
**Version**: 1.0  
**Maintainer**: Kiro AI
