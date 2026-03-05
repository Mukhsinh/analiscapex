# Quick Guide: Analisis Harga Penawaran

## 🎯 Tujuan
Membandingkan harga penawaran vendor dengan kalkulasi internal untuk menentukan kelayakan dan strategi negosiasi.

## ⚡ Quick Start (3 Langkah)

### 1️⃣ Input Data Dasar
```
✓ Nama Alat: CT Scan 64 Slice
✓ Harga Beli: Rp 1.300.000.000
✓ Umur Ekonomis: 5 tahun
✓ Nilai Residu: Rp 130.000.000
✓ Tingkat Keuntungan: 20%
✓ Masa Sewa: 3 tahun
```

### 2️⃣ Input Harga Penawaran
```
✓ Harga Penawaran Vendor: Rp 350.000.000/tahun
```

### 3️⃣ Lihat Analisis
Sistem otomatis menampilkan:
- Status negosiasi (dengan warna & icon)
- Perbandingan harga
- Rekomendasi tindakan

## 📊 Interpretasi Status

### ⚠️ PERLU NEGOSIASI ULANG (Merah)
**Kondisi**: Penawaran >15% lebih tinggi  
**Tindakan**: Negosiasi wajib  
**Target**: Maksimal kalkulasi + 10%

### 💡 DAPAT DINEGOSIASIKAN (Kuning)
**Kondisi**: Penawaran 5-15% lebih tinggi  
**Tindakan**: Coba negosiasi  
**Target**: Mendekati harga kalkulasi

### ✅ HARGA WAJAR (Hijau)
**Kondisi**: Penawaran ±5% dari kalkulasi  
**Tindakan**: Lanjut ke kontrak  
**Target**: Finalisasi kesepakatan

### 🎯 HARGA SANGAT BAIK (Biru)
**Kondisi**: Penawaran 5-15% lebih rendah  
**Tindakan**: Segera ambil  
**Target**: Cepat closing

### 🔍 HARGA TERLALU RENDAH (Orange)
**Kondisi**: Penawaran >15% lebih rendah  
**Tindakan**: Verifikasi detail  
**Target**: Pastikan kualitas

## 🧪 Testing

### Cara 1: Manual Input
1. Buka aplikasi → Analisa Sewa → Hitung Harga Sewa
2. Isi semua field termasuk harga penawaran
3. Lihat hasil analisis

### Cara 2: Test File
```bash
# Buka di browser
test_analisis_harga_penawaran.html

# Klik quick test case yang tersedia
```

### Cara 3: Live Testing
```bash
# Jalankan dev server
npm run dev

# Akses: http://localhost:5173
# Navigate: Analisa Sewa → Hitung Harga Sewa
```

## 📋 Checklist Testing

- [ ] Test tanpa harga penawaran (tidak ada analisis)
- [ ] Test harga +20% (status merah)
- [ ] Test harga +10% (status kuning)
- [ ] Test harga ±3% (status hijau)
- [ ] Test harga -10% (status biru)
- [ ] Test harga -20% (status orange)
- [ ] Test simpan ke database
- [ ] Test export PDF dengan analisis

## 💡 Tips Penggunaan

### Untuk Procurement:
1. Selalu input harga penawaran untuk analisis
2. Gunakan rekomendasi sebagai panduan negosiasi
3. Simpan hasil untuk dokumentasi
4. Export PDF untuk presentasi ke manajemen

### Untuk Manajemen:
1. Review status warna untuk quick decision
2. Perhatikan selisih persentase
3. Baca rekomendasi detail di PDF
4. Gunakan untuk approval process

### Untuk Finance:
1. Bandingkan dengan budget
2. Verifikasi kalkulasi internal
3. Track historical pricing
4. Analisis trend harga vendor

## 🔧 Troubleshooting

### Analisis tidak muncul?
✓ Pastikan harga penawaran sudah diisi (>0)  
✓ Pastikan semua field wajib sudah terisi  
✓ Refresh halaman dan coba lagi

### Warna status tidak sesuai?
✓ Cek perhitungan selisih persentase  
✓ Verifikasi input harga penawaran  
✓ Pastikan tidak ada typo di angka

### PDF tidak include analisis?
✓ Pastikan harga penawaran sudah diisi  
✓ Generate PDF setelah melihat analisis  
✓ Check console untuk error

## 📞 Support

**Dokumentasi Lengkap**:
- `FITUR_ANALISIS_HARGA_PENAWARAN.md` - Detail fitur
- `PANDUAN_ANALISA_SEWA.md` - Panduan umum
- `test_analisis_harga_penawaran.html` - Testing tool

**Quick Links**:
- Input Form: Analisa Sewa → Hitung Harga Sewa
- History: Analisa Sewa → Riwayat Kalkulasi
- Settings: Pengaturan Proyek

---

**Update**: 5 Maret 2026  
**Version**: 1.0.0  
**Status**: ✅ Ready to Use
