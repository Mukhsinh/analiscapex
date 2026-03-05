# Fitur Analisis Harga Penawaran - Analisa Sewa

## 📋 Deskripsi

Fitur baru yang ditambahkan pada modul Analisa Sewa untuk membandingkan harga penawaran vendor dengan hasil kalkulasi internal, sehingga dapat menentukan apakah harga layak diterima atau perlu dinegosiasikan ulang.

## ✨ Fitur Utama

### 1. Input Harga Penawaran
- Field baru: **Harga Penawaran dari Vendor (Rp/tahun)**
- Bersifat opsional untuk perbandingan
- Format currency dengan pemisah ribuan otomatis
- Tooltip informatif untuk panduan pengguna

### 2. Analisis Perbandingan Otomatis

Sistem akan otomatis menganalisis dan memberikan status berdasarkan selisih persentase:

#### Status Negosiasi:

| Selisih | Status | Warna | Keterangan |
|---------|--------|-------|------------|
| > +15% | ⚠️ PERLU NEGOSIASI ULANG | Merah | Harga vendor terlalu tinggi |
| +5% s/d +15% | 💡 DAPAT DINEGOSIASIKAN | Kuning | Harga sedikit tinggi, masih wajar |
| -5% s/d +5% | ✅ HARGA WAJAR | Hijau | Harga sesuai kalkulasi |
| -15% s/d -5% | 🎯 HARGA SANGAT BAIK | Biru | Harga lebih rendah, penawaran bagus |
| < -15% | 🔍 HARGA TERLALU RENDAH | Orange | Perlu verifikasi kualitas |

### 3. Rekomendasi Tindakan

Setiap status dilengkapi dengan rekomendasi spesifik:

**PERLU NEGOSIASI ULANG:**
- Target negosiasi maksimal (kalkulasi + 10%)
- Minta breakdown detail biaya
- Bandingkan dengan vendor lain

**DAPAT DINEGOSIASIKAN:**
- Coba negosiasi mendekati harga kalkulasi
- Tanyakan kemungkinan diskon
- Pertimbangkan value-added services

**HARGA WAJAR:**
- Dapat melanjutkan ke tahap kontrak
- Pastikan terms & conditions sesuai
- Review SLA dan support

**HARGA SANGAT BAIK:**
- Segera lakukan kesepakatan
- Pastikan tidak ada hidden cost
- Verifikasi kualitas alat dan layanan

**HARGA TERLALU RENDAH:**
- Tinjau detail kontrak dengan teliti
- Pastikan tidak ada biaya tersembunyi
- Verifikasi kualitas dan spesifikasi
- Cek reputasi vendor

## 📊 Tampilan Analisis

### Di Aplikasi Web:
```
┌─────────────────────────────────────────────────┐
│ ⚠️ PERLU NEGOSIASI ULANG                        │
│                                                  │
│ Harga penawaran vendor terlalu tinggi (>15%)    │
│                                                  │
│ ┌──────────────┬──────────────┬──────────────┐ │
│ │ Kalkulasi    │ Penawaran    │ Selisih      │ │
│ │ Rp 300 juta  │ Rp 350 juta  │ +Rp 50 juta  │ │
│ │              │              │ (+16.7%)     │ │
│ └──────────────┴──────────────┴──────────────┘ │
│                                                  │
│ 💡 Rekomendasi:                                 │
│ Ajukan negosiasi dengan target maksimal         │
│ Rp 330 juta (kalkulasi + 10%)                   │
└─────────────────────────────────────────────────┘
```

### Di Laporan PDF:
- Section VI: ANALISIS PERBANDINGAN HARGA PENAWARAN
- Tabel perbandingan harga
- Status dengan color coding
- Kesimpulan detail
- Rekomendasi tindakan lengkap

## 🔧 Implementasi Teknis

### File yang Dimodifikasi:
- `src/components/RentalAnalysisForm.jsx`

### Fungsi Utama:

```javascript
const getNegotiationStatus = () => {
  // Menghitung selisih persentase
  const priceDifferencePercent = ((vendorQuote - rentalPrice) / rentalPrice) * 100
  
  // Menentukan status berdasarkan threshold
  if (priceDifferencePercent > 15) return 'PERLU NEGOSIASI ULANG'
  if (priceDifferencePercent > 5) return 'DAPAT DINEGOSIASIKAN'
  if (priceDifferencePercent >= -5) return 'HARGA WAJAR'
  if (priceDifferencePercent >= -15) return 'HARGA SANGAT BAIK'
  return 'HARGA TERLALU RENDAH'
}
```

### State Management:
```javascript
// Data input
data.vendorQuote // Harga penawaran vendor

// Kalkulasi
const priceDifference = vendorQuote - rentalPrice
const priceDifferencePercent = (priceDifference / rentalPrice) * 100
const negotiationAnalysis = getNegotiationStatus()
```

## 📝 Cara Penggunaan

### Langkah 1: Input Data Dasar
1. Masukkan nama alat
2. Isi harga beli alat
3. Tentukan umur ekonomis
4. Input nilai residu (opsional)
5. Tentukan tingkat keuntungan vendor
6. Tentukan masa sewa

### Langkah 2: Input Harga Penawaran (Opsional)
1. Scroll ke field "Harga Penawaran dari Vendor"
2. Masukkan harga yang ditawarkan vendor (per tahun)
3. Sistem akan otomatis menampilkan analisis perbandingan

### Langkah 3: Review Analisis
1. Lihat hasil kalkulasi internal
2. Bandingkan dengan harga penawaran vendor
3. Perhatikan status negosiasi (warna dan icon)
4. Baca rekomendasi tindakan

### Langkah 4: Ambil Keputusan
- **Merah/Kuning**: Lakukan negosiasi dengan vendor
- **Hijau**: Lanjutkan ke kontrak
- **Biru**: Segera ambil penawaran
- **Orange**: Verifikasi detail sebelum lanjut

### Langkah 5: Simpan & Export
1. Klik "Simpan Analisis" untuk menyimpan ke database
2. Klik "Unduh PDF" untuk mendapatkan laporan lengkap
3. PDF akan include analisis perbandingan harga

## 🎯 Manfaat

### Untuk Pengambil Keputusan:
- ✅ Keputusan berbasis data objektif
- ✅ Menghindari overpaying
- ✅ Identifikasi peluang negosiasi
- ✅ Dokumentasi lengkap untuk audit

### Untuk Tim Procurement:
- ✅ Panduan negosiasi yang jelas
- ✅ Target harga yang terukur
- ✅ Argumen berbasis kalkulasi
- ✅ Efisiensi waktu negosiasi

### Untuk Manajemen:
- ✅ Transparansi proses pengadaan
- ✅ Kontrol biaya yang lebih baik
- ✅ Laporan yang komprehensif
- ✅ Audit trail yang jelas

## 📈 Contoh Kasus

### Kasus 1: Harga Terlalu Tinggi
```
Kalkulasi Internal: Rp 300.000.000/tahun
Penawaran Vendor:   Rp 360.000.000/tahun
Selisih:            +Rp 60.000.000 (+20%)

Status: ⚠️ PERLU NEGOSIASI ULANG
Rekomendasi: Target maksimal Rp 330 juta
```

### Kasus 2: Harga Wajar
```
Kalkulasi Internal: Rp 300.000.000/tahun
Penawaran Vendor:   Rp 310.000.000/tahun
Selisih:            +Rp 10.000.000 (+3.3%)

Status: ✅ HARGA WAJAR
Rekomendasi: Dapat melanjutkan ke kontrak
```

### Kasus 3: Harga Sangat Baik
```
Kalkulasi Internal: Rp 300.000.000/tahun
Penawaran Vendor:   Rp 270.000.000/tahun
Selisih:            -Rp 30.000.000 (-10%)

Status: 🎯 HARGA SANGAT BAIK
Rekomendasi: Segera ambil penawaran
```

### Kasus 4: Harga Mencurigakan
```
Kalkulasi Internal: Rp 300.000.000/tahun
Penawaran Vendor:   Rp 240.000.000/tahun
Selisih:            -Rp 60.000.000 (-20%)

Status: 🔍 HARGA TERLALU RENDAH
Rekomendasi: Verifikasi kualitas dan detail
```

## 🔍 Validasi & Testing

### Test Case 1: Tanpa Harga Penawaran
- Input: Harga penawaran kosong/0
- Expected: Tidak ada analisis perbandingan
- Result: ✅ Pass

### Test Case 2: Harga Penawaran > 15%
- Input: Penawaran 20% lebih tinggi
- Expected: Status "PERLU NEGOSIASI ULANG" (merah)
- Result: ✅ Pass

### Test Case 3: Harga Penawaran 5-15%
- Input: Penawaran 10% lebih tinggi
- Expected: Status "DAPAT DINEGOSIASIKAN" (kuning)
- Result: ✅ Pass

### Test Case 4: Harga Penawaran ±5%
- Input: Penawaran 3% lebih tinggi
- Expected: Status "HARGA WAJAR" (hijau)
- Result: ✅ Pass

### Test Case 5: Harga Penawaran -5% s/d -15%
- Input: Penawaran 10% lebih rendah
- Expected: Status "HARGA SANGAT BAIK" (biru)
- Result: ✅ Pass

### Test Case 6: Harga Penawaran < -15%
- Input: Penawaran 20% lebih rendah
- Expected: Status "HARGA TERLALU RENDAH" (orange)
- Result: ✅ Pass

### Test Case 7: PDF Export dengan Analisis
- Input: Data lengkap + harga penawaran
- Expected: PDF include section VI dengan analisis
- Result: ✅ Pass

### Test Case 8: Simpan ke Database
- Input: Data lengkap + harga penawaran
- Expected: Data tersimpan termasuk vendorQuote
- Result: ✅ Pass

## 📚 Referensi

### Threshold Persentase:
Berdasarkan best practice procurement:
- ±5%: Range normal variasi harga pasar
- 5-15%: Range negosiasi standar
- >15%: Indikasi markup berlebihan
- <-15%: Indikasi potensi masalah kualitas

### Formula Kalkulasi:
```
Harga Sewa = ((Harga Beli × (1 + Margin)) - Residu) / Masa Sewa
Selisih % = ((Penawaran - Kalkulasi) / Kalkulasi) × 100%
```

## 🚀 Future Enhancement

### Planned Features:
1. **Multi-vendor Comparison**: Bandingkan beberapa penawaran sekaligus
2. **Historical Data**: Tracking harga vendor dari waktu ke waktu
3. **Market Benchmark**: Integrasi dengan data harga pasar
4. **Auto-negotiation Template**: Generate email negosiasi otomatis
5. **Alert System**: Notifikasi jika penawaran di luar threshold
6. **Vendor Rating**: Sistem rating berdasarkan historical performance

## 📞 Support

Untuk pertanyaan atau masalah terkait fitur ini:
- Baca dokumentasi lengkap di `PANDUAN_ANALISA_SEWA.md`
- Check troubleshooting di `QUICK_START_ANALISA_SEWA.md`
- Review test cases di `CHECKLIST_TESTING_ANALISA_SEWA_LENGKAP.md`

---

**Versi**: 1.0.0  
**Tanggal**: 5 Maret 2026  
**Author**: Capex Analyzer Development Team  
**Status**: ✅ Production Ready
