# ⚠️ PENTING: Perbedaan Harga Beli vs Harga Sewa

## 🎯 Penjelasan Singkat

Dalam fitur Analisa Harga Sewa, ada **DUA jenis harga** yang berbeda:

### 1. 💵 Harga Beli Alat
- **Lokasi**: Field pertama di form "Data Input"
- **Definisi**: Harga pembelian alat medis (investasi awal)
- **Contoh**: Rp 5.000.000.000 (harga beli CT Scan)
- **Digunakan untuk**: Menghitung harga sewa yang optimal

### 2. 💰 Harga Penawaran SEWA dari Vendor
- **Lokasi**: Field terakhir di form (dengan background kuning/orange)
- **Definisi**: Harga sewa PER TAHUN yang ditawarkan oleh vendor
- **Contoh**: Rp 350.000.000/tahun (penawaran sewa dari vendor)
- **Digunakan untuk**: Membandingkan dengan hasil kalkulasi

## 📊 Ilustrasi Perbedaan

```
┌─────────────────────────────────────────────────────────┐
│  HARGA BELI ALAT                                        │
│  Rp 5.000.000.000                                       │
│  ↓                                                       │
│  [SISTEM MENGHITUNG]                                    │
│  ↓                                                       │
│  HARGA SEWA KALKULASI: Rp 1.050.000.000/tahun          │
└─────────────────────────────────────────────────────────┘
                    ↓ DIBANDINGKAN DENGAN
┌─────────────────────────────────────────────────────────┐
│  HARGA PENAWARAN SEWA DARI VENDOR                       │
│  Rp 1.200.000.000/tahun                                 │
│  ↓                                                       │
│  [SISTEM MENGANALISIS]                                  │
│  ↓                                                       │
│  STATUS: TIDAK LAYAK (+14.3%)                           │
│  REKOMENDASI: Negosiasi ulang                           │
└─────────────────────────────────────────────────────────┘
```

## 🔍 Contoh Kasus Nyata

### Skenario: Rumah Sakit ingin menyewakan CT Scan

**Data Input:**
1. **Harga Beli Alat**: Rp 5.000.000.000
   - Ini adalah harga yang dibayar rumah sakit untuk membeli CT Scan

2. **Umur Ekonomis**: 10 tahun
3. **Nilai Residu**: Rp 500.000.000
4. **Tingkat Keuntungan**: 15%
5. **Masa Sewa**: 5 tahun

**Hasil Kalkulasi:**
- **Harga Sewa Kalkulasi**: Rp 1.050.000.000/tahun
  - Ini adalah harga sewa optimal yang seharusnya dikenakan

**Penawaran dari Vendor:**
6. **Harga Penawaran SEWA dari Vendor**: Rp 1.200.000.000/tahun
   - Ini adalah harga sewa yang ditawarkan oleh vendor/penyewa

**Analisis:**
- Selisih: +Rp 150.000.000 (+14.3%)
- Status: TIDAK LAYAK - DAPAT DINEGOSIASIKAN
- Rekomendasi: Negosiasi untuk mendekati Rp 1.050.000.000

## ❌ Kesalahan Umum

### Kesalahan 1: Memasukkan Harga Beli di Field Penawaran Sewa
```
❌ SALAH:
Harga Beli Alat: Rp 5.000.000.000
Harga Penawaran Sewa: Rp 5.000.000.000  ← SALAH!

✅ BENAR:
Harga Beli Alat: Rp 5.000.000.000
Harga Penawaran Sewa: Rp 1.200.000.000  ← Harga sewa per tahun
```

### Kesalahan 2: Memasukkan Harga Sewa Bulanan
```
❌ SALAH:
Harga Penawaran Sewa: Rp 100.000.000  ← Harga per bulan

✅ BENAR:
Harga Penawaran Sewa: Rp 1.200.000.000  ← Harga per TAHUN
```

## 🎨 Visual Cue di Aplikasi

Field "Harga Penawaran SEWA dari Vendor" memiliki:
- ✅ Background kuning/orange yang mencolok
- ✅ Icon kalkulator
- ✅ Label dengan emoji 💰
- ✅ Warning box dengan border orange
- ✅ Placeholder yang jelas: "Contoh: 350.000.000 (harga SEWA per tahun dari vendor)"
- ✅ Penjelasan lengkap di bawah field

## 📝 Checklist Sebelum Input

Sebelum mengisi form, pastikan:

- [ ] Saya sudah tahu harga beli alat (investasi awal)
- [ ] Saya sudah tahu harga penawaran SEWA dari vendor (per tahun)
- [ ] Saya tidak mencampurkan harga beli dengan harga sewa
- [ ] Saya menggunakan harga sewa TAHUNAN, bukan bulanan
- [ ] Saya memahami bahwa field penawaran sewa adalah OPSIONAL

## 💡 Tips

1. **Field Penawaran Sewa adalah OPSIONAL**
   - Jika tidak ada penawaran dari vendor, kosongkan saja
   - Sistem tetap akan menghitung harga sewa optimal

2. **Gunakan Satuan yang Sama**
   - Semua harga dalam Rupiah
   - Harga sewa dalam per TAHUN (bukan per bulan)

3. **Perhatikan Visual Cue**
   - Field dengan background kuning/orange = Harga SEWA
   - Field dengan background putih = Harga BELI atau data lain

## 🚀 Workflow yang Benar

```
1. Input Harga Beli Alat (Rp 5.000.000.000)
   ↓
2. Input Data Lainnya (umur ekonomis, residu, dll)
   ↓
3. Sistem Menghitung Harga Sewa Optimal
   ↓
4. (Opsional) Input Harga Penawaran SEWA dari Vendor
   ↓
5. Sistem Membandingkan & Memberikan Rekomendasi
```

## 📞 Bantuan

Jika masih bingung:
1. Lihat placeholder di setiap field
2. Baca penjelasan di bawah field
3. Perhatikan warning box dengan background orange
4. Lihat contoh di dokumentasi

---

**Ingat**: 
- **Harga Beli** = Investasi awal untuk membeli alat
- **Harga Sewa** = Biaya sewa per tahun yang dikenakan/ditawarkan

**Jangan sampai tertukar!** ⚠️
