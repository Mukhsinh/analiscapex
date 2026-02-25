# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan aplikasi Analisis Keputusan Capex dalam 5 menit!

## ⚡ Langkah Cepat

### 1. Install Dependencies (1 menit)
```bash
npm install
```

### 2. Jalankan Aplikasi (30 detik)
```bash
npm run dev
```

### 3. Buka Browser
```
http://localhost:5173
```

**Selesai!** Aplikasi sudah berjalan 🎉

## 📝 Cara Menggunakan

### Step 1: Pilih Alternatif
Klik salah satu tab:
- **Leasing** (Biru)
- **Borrow & Purchase** (Hijau)
- **Revenue Sharing** (Ungu)

### Step 2: Input Data
Isi form dengan data penawaran yang Anda terima.

**Contoh untuk Leasing:**
- Pembayaran per Bulan: 280 (juta Rp)
- Periode: 60 (bulan)
- Discount Rate: 10 (%)

### Step 3: Hitung
Klik tombol **"Hitung & Bandingkan Semua Alternatif"**

### Step 4: Lihat Hasil
Aplikasi akan menampilkan:
- ✅ Summary cards (Total PV untuk setiap alternatif)
- 📊 Chart perbandingan
- 🎯 Rekomendasi keputusan
- 📋 Tabel detail perhitungan

### Step 5: Export (Opsional)
Klik salah satu tombol export:
- **CSV** - Untuk analisis di Excel
- **JSON** - Untuk backup data
- **Print/PDF** - Untuk laporan

## 💡 Tips Cepat

### Default Values
Aplikasi sudah memiliki nilai default berdasarkan file Excel:
- Leasing: Rp 280 jt/bulan, 60 bulan
- Purchase: Rp 1.300 jt, bunga 10%, 5 tahun
- Revenue Share: Tarif Rp 150k, porsi RS 15%

### Interpretasi Hasil
- **Semakin rendah PV Expense = Semakin baik**
- Alternatif dengan PV terendah akan direkomendasikan
- Warning akan muncul jika ada alternatif yang tidak feasible

### Skenario Analisis
Coba ubah nilai untuk melihat dampaknya:
- Naikkan discount rate → PV Expense turun
- Naikkan volume (Revenue Share) → Bisa jadi profitable
- Turunkan bunga (Purchase) → PV Expense turun

## 🎯 Contoh Kasus

### Kasus 1: Analisis Default
Gunakan nilai default → Hasil: **Leasing terbaik** (Rp 1.061,42 jt)

### Kasus 2: Volume Tinggi
Revenue Share dengan volume 20.000 → Bisa profitable!

### Kasus 3: Bunga Rendah
Purchase dengan bunga 5% → Bisa lebih baik dari Leasing

## 🐛 Troubleshooting

### Aplikasi tidak jalan?
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
npm run dev
```

### Port 5173 sudah dipakai?
Vite akan otomatis menggunakan port lain (5174, 5175, dll)

### Error saat build?
```bash
# Clear cache
npm run build -- --force
```

## 📚 Dokumentasi Lengkap

Untuk panduan detail, lihat:
- **PANDUAN_APLIKASI.md** - User manual lengkap
- **README.md** - Technical documentation
- **TESTING.md** - Testing guide
- **DEPLOYMENT.md** - Deployment guide

## 🎓 Video Tutorial (Coming Soon)

- [ ] Basic usage
- [ ] Advanced scenarios
- [ ] Export & reporting
- [ ] Deployment

## ❓ FAQ

**Q: Apakah hasil perhitungan akurat?**  
A: Ya, rumus sama persis dengan file Excel original.

**Q: Bisa digunakan untuk alat medis lain?**  
A: Ya, tinggal sesuaikan input data.

**Q: Apakah gratis?**  
A: Ya, open source dengan MIT License.

**Q: Bisa offline?**  
A: Saat ini belum, tapi PWA support akan ditambahkan.

**Q: Support mobile?**  
A: Ya, fully responsive untuk semua device.

## 🆘 Butuh Bantuan?

- 📖 Baca dokumentasi lengkap
- 🐛 Report bug di GitHub Issues
- 💬 Diskusi di GitHub Discussions
- 📧 Email: [support email]

## ⭐ Next Steps

Setelah familiar dengan aplikasi:
1. Coba berbagai skenario
2. Export hasil untuk presentasi
3. Customize untuk kebutuhan spesifik
4. Contribute ke project!

---

**Selamat menggunakan!** 🎉

Jika ada pertanyaan, jangan ragu untuk bertanya.
