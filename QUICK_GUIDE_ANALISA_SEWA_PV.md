# Quick Guide: Analisa Sewa dengan Present Value

## 🎯 Apa yang Baru?

Halaman "Hitung Harga Sewa" sekarang dilengkapi dengan:
1. **Input Discount Rate** untuk perhitungan Present Value
2. **Feasibility Score** (A+ hingga D) untuk kelayakan penawaran
3. **Savings Potential** untuk melihat potensi hemat/biaya tambahan

## 📝 Cara Menggunakan

### Step 1: Input Data Dasar
```
✓ Nama Alat: CT Scan 64 Slice
✓ Harga Beli: Rp 1.300.000.000
✓ Umur Ekonomis: 5 tahun
✓ Nilai Residu: Rp 130.000.000
✓ Tingkat Keuntungan Vendor: 20%
✓ Masa Sewa: 3 tahun
```

### Step 2: Input Discount Rate (BARU!)
```
✓ Discount Rate: 10%
```

**💡 Tips Memilih Discount Rate:**
- Gunakan tingkat bunga pinjaman bank (8-12%)
- Atau gunakan WACC perusahaan
- Atau gunakan expected return investasi

### Step 3: Input Harga Penawaran Vendor
```
✓ Harga Penawaran Sewa: Rp 350.000.000/tahun
```

**⚠️ PENTING:** Ini adalah harga SEWA per tahun, BUKAN harga beli!

### Step 4: Lihat Hasil

#### 📊 Kartu Hasil Baru:

**1. Harga Sewa per Tahun (Kalkulasi)**
```
Rp 356.666.667
Hasil perhitungan optimal
```

**2. Present Value Biaya Sewa**
```
Rp 870.489.105
Total PV dengan discount 10%
```
→ Ini adalah nilai sekarang dari total biaya sewa

**3. Feasibility Score** ⭐ BARU!
```
B (Wajar)
Selisih: 1.9%
```

**Score System:**
- **A+ (Verifikasi)**: Penawaran terlalu rendah, cek kualitas
- **A (Sangat Baik)**: Penawaran sangat kompetitif
- **B (Wajar)**: Harga wajar, bisa diterima ✅
- **C (Negosiasi)**: Bisa dinegosiasikan
- **D (Tidak Layak)**: Perlu negosiasi ulang ❌

**4. Savings Potential** 💰 BARU!
```
Rp 20.000.000
Potensi penghematan total
```
→ Hijau = hemat, Merah = biaya tambahan

## 🎯 Interpretasi Hasil

### Skenario 1: Score A atau B (LAYAK) ✅
```
Feasibility Score: B (Wajar)
Savings Potential: Rp 20.000.000 (hemat)
Status: LAYAK
```

**Artinya:**
- Harga penawaran vendor wajar atau lebih murah
- Bisa lanjut ke tahap kontrak
- Ada potensi penghematan

**Action:**
✓ Review terms & conditions
✓ Pastikan SLA sesuai
✓ Lanjutkan proses kontrak

### Skenario 2: Score C (DAPAT DINEGOSIASIKAN) ⚠️
```
Feasibility Score: C (Negosiasi)
Savings Potential: Rp 50.000.000 (biaya tambahan)
Status: TIDAK LAYAK
```

**Artinya:**
- Harga penawaran sedikit lebih tinggi (5-15%)
- Masih bisa dinegosiasikan
- Ada potensi biaya tambahan

**Action:**
✓ Coba negosiasi harga
✓ Minta diskon atau benefit tambahan
✓ Bandingkan dengan vendor lain

### Skenario 3: Score D (TIDAK LAYAK) ❌
```
Feasibility Score: D (Tidak Layak)
Savings Potential: Rp 280.000.000 (biaya tambahan)
Status: TIDAK LAYAK
```

**Artinya:**
- Harga penawaran terlalu tinggi (>15%)
- Sangat tidak layak
- Biaya tambahan signifikan

**Action:**
✓ Negosiasi ulang dengan target lebih rendah
✓ Minta breakdown detail biaya
✓ Cari vendor alternatif

## 💡 Apa itu Present Value?

### Konsep Sederhana
Uang Rp 100 juta hari ini ≠ Rp 100 juta 3 tahun lagi

**Mengapa?**
- Inflasi mengurangi nilai uang
- Uang hari ini bisa diinvestasikan
- Ada opportunity cost

### Contoh Perhitungan

**Tanpa PV (Salah):**
```
Sewa 3 tahun @ Rp 350 juta/tahun
Total = Rp 1.050.000.000
```

**Dengan PV (Benar):**
```
Tahun 1: Rp 350 juta / 1.10¹ = Rp 318.181.818
Tahun 2: Rp 350 juta / 1.10² = Rp 289.256.198
Tahun 3: Rp 350 juta / 1.10³ = Rp 263.051.089
Total PV = Rp 870.489.105
```

**Selisih:** Rp 179.510.895 (nilai waktu uang)

### Manfaat PV

1. **Perbandingan Apple-to-Apple**
   - Bandingkan biaya sewa vs harga beli secara adil
   - Pertimbangkan nilai waktu uang

2. **Keputusan Lebih Akurat**
   - Lihat biaya riil, bukan nominal
   - Hindari keputusan yang misleading

3. **Analisis Investasi**
   - Tentukan opsi terbaik: sewa vs beli
   - Hitung ROI yang lebih akurat

## 📊 Contoh Kasus Lengkap

### Input
```
Nama Alat: CT Scan 64 Slice
Harga Beli: Rp 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: Rp 130.000.000
Tingkat Keuntungan: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran Vendor: Rp 350.000.000/tahun
```

### Output
```
┌─────────────────────────────────────────┐
│ Harga Sewa per Tahun (Kalkulasi)       │
│ Rp 356.666.667                          │
│ Hasil perhitungan optimal               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Present Value Biaya Sewa                │
│ Rp 870.489.105                          │
│ Total PV dengan discount 10%            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Feasibility Score                       │
│ B (Wajar) ✅                            │
│ Selisih: 1.9%                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Savings Potential                       │
│ Rp 20.000.000 💰                        │
│ Potensi penghematan total               │
└─────────────────────────────────────────┘
```

### Analisis
```
Status: LAYAK ✅
Rekomendasi: Harga sudah kompetitif, dapat melanjutkan ke tahap kontrak.

Detail:
• Harga penawaran vendor (Rp 350 juta) lebih rendah 1.9% dari kalkulasi
• Ada potensi penghematan Rp 20 juta selama 3 tahun
• Present Value biaya sewa: Rp 870 juta (vs harga beli Rp 1.3 miliar)
• Sewa lebih efisien 33% dibanding beli (dalam nilai PV)
```

## ❓ FAQ

### Q: Berapa discount rate yang sebaiknya digunakan?
**A:** Gunakan 8-12% untuk kondisi normal Indonesia. Sesuaikan dengan:
- Tingkat bunga pinjaman bank
- WACC perusahaan
- Expected return investasi

### Q: Apa bedanya dengan ROI?
**A:** 
- **ROI**: Perbandingan keuntungan vs investasi (untuk vendor)
- **Feasibility Score**: Kelayakan harga penawaran (untuk user)
- **Savings Potential**: Potensi hemat/biaya tambahan (untuk user)

### Q: Kapan harus negosiasi?
**A:** Negosiasi jika:
- Score C atau D
- Savings Potential negatif (biaya tambahan)
- Status TIDAK LAYAK

### Q: Bagaimana jika tidak ada harga penawaran vendor?
**A:** 
- Feasibility Score akan menampilkan "N/A"
- Savings Potential akan menampilkan "N/A"
- Tetap bisa lihat harga kalkulasi dan PV

### Q: Apa arti Score A+ (Verifikasi)?
**A:** Penawaran terlalu rendah (>15% di bawah kalkulasi). Perlu verifikasi:
- Apakah ada hidden cost?
- Apakah kualitas alat sesuai?
- Apakah SLA memadai?

## 🎯 Tips & Best Practices

### 1. Selalu Input Discount Rate
- Jangan skip field ini
- Gunakan rate yang realistis
- Konsultasi dengan finance jika perlu

### 2. Bandingkan Beberapa Penawaran
- Input penawaran dari berbagai vendor
- Lihat score dan savings masing-masing
- Pilih yang terbaik

### 3. Perhatikan Total PV vs Harga Beli
- Jika PV sewa < 70% harga beli → Sewa lebih baik
- Jika PV sewa > 90% harga beli → Beli lebih baik
- Pertimbangkan juga faktor non-finansial

### 4. Gunakan untuk Negosiasi
- Tunjukkan hasil kalkulasi ke vendor
- Minta penyesuaian jika score C atau D
- Gunakan savings potential sebagai argumen

### 5. Simpan dan Bandingkan
- Simpan setiap analisis
- Bandingkan dengan analisis sebelumnya
- Track perubahan harga dari waktu ke waktu

## 📚 Referensi Cepat

### Formula Penting
```
Harga Sewa = ((Harga Beli × (1 + Margin)) - Residu) / Masa Sewa

PV = Σ (Biaya Sewa / (1 + r)^t)

Feasibility Score = f(Selisih %)
```

### Threshold Score
```
A+: < -15%  → Verifikasi
A:  -15% s/d -5%  → Sangat Baik
B:  -5% s/d +5%   → Wajar ✅
C:  +5% s/d +15%  → Negosiasi
D:  > +15%  → Tidak Layak ❌
```

---

**💡 Butuh bantuan?** Lihat dokumentasi lengkap di `PERBAIKAN_ANALISA_SEWA_PV_05_MAR_2026.md`

**📊 Ingin testing?** Gunakan data contoh di atas untuk mencoba fitur baru ini.
