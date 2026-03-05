# 📘 Perbedaan Harga Beli vs Harga Penawaran Sewa

## ⚠️ PENTING: Jangan Tertukar!

### 🏷️ Harga Beli Alat
**Definisi:** Harga pembelian alat medis yang akan disewakan

**Karakteristik:**
- Biaya investasi awal
- Dibayar sekali di awal
- Digunakan untuk menghitung harga sewa optimal
- Contoh: Rp 5.000.000.000

**Lokasi Input:** Field "Harga Beli Alat (Rp)"

**Fungsi:** Sebagai dasar perhitungan untuk menentukan harga sewa yang harus dikenakan agar menguntungkan

---

### 💰 Harga Penawaran Sewa dari Vendor
**Definisi:** Harga sewa per tahun yang ditawarkan oleh vendor/pihak ketiga

**Karakteristik:**
- Biaya sewa tahunan
- Dibayar berkala (per tahun)
- Digunakan untuk perbandingan dengan hasil kalkulasi
- Contoh: Rp 1.200.000.000/tahun

**Lokasi Input:** Field "Harga Penawaran Sewa dari Vendor (Rp/tahun)" (dengan background kuning)

**Fungsi:** Untuk membandingkan apakah penawaran vendor layak atau tidak dibandingkan dengan hasil kalkulasi

---

## 📊 Contoh Kasus

### Skenario: Rumah Sakit ingin menyewakan CT Scan

#### Data Input:
1. **Harga Beli Alat**: Rp 5.000.000.000
   - Ini adalah harga beli CT Scan yang akan disewakan
   
2. **Umur Ekonomis**: 10 tahun
3. **Nilai Residu**: Rp 500.000.000
4. **Tingkat Keuntungan**: 15%
5. **Masa Sewa**: 5 tahun

#### Hasil Kalkulasi:
- **Harga Sewa Optimal**: Rp 1.050.000.000/tahun
  - Ini adalah harga sewa yang SEHARUSNYA dikenakan

#### Perbandingan dengan Penawaran:
6. **Harga Penawaran Sewa dari Vendor**: Rp 1.200.000.000/tahun
   - Ini adalah harga sewa yang DITAWARKAN oleh vendor

#### Analisis:
- Kalkulasi: Rp 1.050.000.000/tahun
- Penawaran: Rp 1.200.000.000/tahun
- Selisih: +Rp 150.000.000 (+14.3%)
- **Status: TIDAK LAYAK - DAPAT DINEGOSIASIKAN**

---

## 🔍 Cara Membedakan

### Harga Beli Alat
```
✅ Dibayar SEKALI di awal
✅ Nilai dalam MILIARAN (untuk alat besar)
✅ Untuk MEMBELI alat
✅ Contoh: Rp 5.000.000.000
```

### Harga Penawaran Sewa
```
✅ Dibayar BERKALA per tahun
✅ Nilai lebih KECIL dari harga beli
✅ Untuk MENYEWA alat
✅ Contoh: Rp 1.200.000.000/tahun
```

---

## ❌ Kesalahan Umum

### Kesalahan 1: Memasukkan Harga Beli sebagai Penawaran Sewa
**Salah:**
- Harga Beli: Rp 5.000.000.000
- Penawaran Sewa: Rp 5.000.000.000/tahun ❌

**Benar:**
- Harga Beli: Rp 5.000.000.000
- Penawaran Sewa: Rp 1.200.000.000/tahun ✅

### Kesalahan 2: Memasukkan Harga Sewa Bulanan
**Salah:**
- Penawaran Sewa: Rp 100.000.000/bulan ❌

**Benar:**
- Penawaran Sewa: Rp 1.200.000.000/tahun ✅
- (Rp 100.000.000 × 12 bulan)

---

## 💡 Tips Pengisian

### 1. Harga Beli Alat
- Cek invoice pembelian alat
- Termasuk biaya instalasi dan training
- Nilai total investasi awal

### 2. Harga Penawaran Sewa
- Cek quotation/penawaran dari vendor
- Pastikan dalam satuan per tahun
- Jika penawaran per bulan, kalikan 12

---

## 🎯 Alur Penggunaan

```
1. Input Harga Beli Alat
   ↓
2. Input parameter lain (umur ekonomis, dll)
   ↓
3. Sistem menghitung Harga Sewa Optimal
   ↓
4. Input Harga Penawaran Sewa dari Vendor (opsional)
   ↓
5. Sistem membandingkan dan memberikan rekomendasi
```

---

## 📋 Checklist Sebelum Input

### Sebelum mengisi "Harga Beli Alat":
- [ ] Sudah cek invoice pembelian?
- [ ] Sudah termasuk biaya instalasi?
- [ ] Sudah termasuk biaya training?
- [ ] Nilai dalam Rupiah penuh?

### Sebelum mengisi "Harga Penawaran Sewa":
- [ ] Sudah dapat quotation dari vendor?
- [ ] Sudah dalam satuan per tahun?
- [ ] Sudah termasuk maintenance?
- [ ] Sudah termasuk support?

---

## 🔢 Contoh Perhitungan

### Input:
```
Harga Beli Alat: Rp 5.000.000.000
Umur Ekonomis: 10 tahun
Nilai Residu: Rp 500.000.000
Tingkat Keuntungan: 15%
Masa Sewa: 5 tahun
```

### Kalkulasi:
```
Harga Sewa = ((5.000.000.000 × 1.15) - 500.000.000) / 5
           = (5.750.000.000 - 500.000.000) / 5
           = 5.250.000.000 / 5
           = Rp 1.050.000.000/tahun
```

### Perbandingan:
```
Jika Penawaran Vendor = Rp 1.200.000.000/tahun
Maka:
- Selisih = 1.200.000.000 - 1.050.000.000
         = Rp 150.000.000 (+14.3%)
- Status = TIDAK LAYAK - DAPAT DINEGOSIASIKAN
```

---

## 📞 FAQ

### Q: Apakah harus mengisi Harga Penawaran Sewa?
**A:** Tidak, field ini opsional. Jika tidak diisi, sistem hanya menampilkan hasil kalkulasi tanpa analisis perbandingan.

### Q: Bagaimana jika penawaran vendor per bulan?
**A:** Kalikan dengan 12 untuk mendapatkan harga per tahun. Contoh: Rp 100 juta/bulan = Rp 1.200 juta/tahun.

### Q: Apakah bisa memasukkan beberapa penawaran?
**A:** Saat ini hanya bisa satu penawaran. Untuk membandingkan beberapa penawaran, lakukan analisis terpisah untuk masing-masing.

### Q: Bagaimana jika harga beli dan penawaran sewa sama?
**A:** Ini tidak normal. Harga sewa per tahun seharusnya jauh lebih kecil dari harga beli. Periksa kembali data Anda.

---

## ✅ Ringkasan

| Aspek | Harga Beli Alat | Harga Penawaran Sewa |
|-------|----------------|---------------------|
| **Definisi** | Harga pembelian alat | Harga sewa per tahun |
| **Frekuensi** | Sekali | Berkala (tahunan) |
| **Nilai** | Besar (miliaran) | Lebih kecil |
| **Satuan** | Rupiah | Rupiah/tahun |
| **Contoh** | Rp 5.000.000.000 | Rp 1.200.000.000/tahun |
| **Wajib?** | Ya | Tidak (opsional) |
| **Fungsi** | Dasar kalkulasi | Perbandingan |

---

**Dibuat**: 5 Maret 2026  
**Tujuan**: Menghindari kebingungan antara harga beli dan harga penawaran sewa
