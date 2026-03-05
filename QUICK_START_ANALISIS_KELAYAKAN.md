# 🚀 Quick Start: Analisis Kelayakan Harga Penawaran

## ⚡ Testing Cepat (5 Menit)

### Opsi 1: Test File HTML (Recommended)

1. **Buka file test**
   ```
   test_analisis_kelayakan_harga.html
   ```
   Buka di browser (Chrome/Firefox/Edge)

2. **Pilih skenario test**
   - Klik salah satu dari 5 tombol skenario
   - Atau input manual sesuai kebutuhan

3. **Lihat hasil**
   - Status kelayakan dengan warna
   - Badge LAYAK/TIDAK LAYAK
   - Perbandingan harga
   - Rekomendasi

### Opsi 2: Test di Aplikasi

1. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

2. **Buka halaman Analisa Sewa**
   - Login ke aplikasi
   - Pilih menu "Analisa Sewa" → "Hitung Harga Sewa"

3. **Input data**
   ```
   Nama Alat: CT Scan 64 Slice
   Harga Beli: 5000000000
   Umur Ekonomis: 10
   Nilai Residu: 500000000
   Tingkat Keuntungan: 15
   Masa Sewa: 5
   Harga Penawaran Vendor: 1200000000
   ```

4. **Lihat hasil**
   - Scroll ke bawah untuk melihat analisis
   - Coba ubah harga penawaran untuk melihat perubahan status

## 📊 5 Skenario Test Cepat

### 🔴 Skenario 1: Tidak Layak - Negosiasi Ulang
**Input:** Penawaran = Rp 1.260.000.000 (20% lebih tinggi)  
**Expected:** Status merah, badge TIDAK LAYAK

### 🟡 Skenario 2: Tidak Layak - Dapat Dinegosiasi
**Input:** Penawaran = Rp 1.155.000.000 (10% lebih tinggi)  
**Expected:** Status kuning, badge TIDAK LAYAK

### 🟢 Skenario 3: Layak - Harga Wajar
**Input:** Penawaran = Rp 1.081.500.000 (3% lebih tinggi)  
**Expected:** Status hijau, badge LAYAK

### 🔵 Skenario 4: Layak - Harga Sangat Baik
**Input:** Penawaran = Rp 945.000.000 (10% lebih rendah)  
**Expected:** Status biru, badge LAYAK

### 🟠 Skenario 5: Layak - Terlalu Rendah
**Input:** Penawaran = Rp 787.500.000 (25% lebih rendah)  
**Expected:** Status orange, badge LAYAK

## ✅ Checklist Verifikasi Cepat

Pastikan hal-hal berikut berfungsi:

- [ ] Input penawaran vendor muncul di form
- [ ] Kalkulasi harga sewa tetap akurat
- [ ] Box analisis muncul saat ada penawaran
- [ ] Warna sesuai dengan kategori
- [ ] Badge LAYAK/TIDAK LAYAK muncul
- [ ] Selisih harga dihitung dengan benar
- [ ] Rekomendasi sesuai dengan kategori
- [ ] PDF mencakup analisis perbandingan
- [ ] Tidak ada error di console

## 🐛 Troubleshooting

### Analisis tidak muncul?
✅ Pastikan field "Harga Penawaran Vendor" sudah diisi

### Warna tidak sesuai?
✅ Periksa perhitungan persentase selisih

### PDF tidak mencakup analisis?
✅ Pastikan ada input penawaran sebelum generate PDF

### Error di console?
✅ Periksa `src/components/RentalAnalysisForm.jsx`

## 📚 Dokumentasi Lengkap

- **Teknis**: `FITUR_ANALISIS_KELAYAKAN_HARGA_PENAWARAN.md`
- **User Guide**: `PANDUAN_ANALISIS_KELAYAKAN_HARGA.md`
- **Testing**: `CHECKLIST_TESTING_ANALISIS_KELAYAKAN.md`
- **Ringkasan**: `RINGKASAN_IMPLEMENTASI_ANALISIS_KELAYAKAN.md`

## 🎯 Tips Testing

1. **Mulai dari skenario sederhana** (Skenario 3 - Harga Wajar)
2. **Test edge cases** (penawaran = 0, sangat tinggi, sangat rendah)
3. **Verifikasi PDF** untuk setiap kategori
4. **Test di berbagai browser** (Chrome, Firefox, Safari)
5. **Test responsive** di mobile dan tablet

## 🚀 Ready to Test!

Fitur sudah siap untuk testing. Mulai dengan test file HTML untuk verifikasi cepat, kemudian lanjutkan ke aplikasi untuk testing lengkap.

**Estimasi waktu testing**: 15-30 menit untuk semua skenario

---

**Happy Testing!** 🎉
