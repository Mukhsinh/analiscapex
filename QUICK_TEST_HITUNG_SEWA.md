# Quick Test Guide - Hitung Sewa

## Langkah Cepat Testing

### 1. Jalankan Migration Database

```powershell
.\apply_rental_analysis_migration.ps1
```

Tunggu sampai muncul "MIGRATION COMPLETED!"

### 2. Test Form Hitung Sewa

1. Buka aplikasi di browser
2. Login dengan akun Anda
3. Klik menu "Analisa Sewa" → "Hitung Sewa"
4. Isi data berikut:

**Data Test**:
```
Nama Alat: CT Scan 64 Slice
Harga Beli Alat: 1.300.000.000
Umur Ekonomis: 5 tahun
Nilai Residu: 130.000.000
Tingkat Keuntungan Vendor: 20%
Masa Sewa: 3 tahun
Discount Rate: 10%
Harga Penawaran Sewa: 350.000.000
```

5. Hasil yang diharapkan:
   - Harga Sewa per Tahun (Kalkulasi): ~Rp 476.666.667
   - Present Value Biaya Sewa: ~Rp 870.921.053
   - Feasibility Score: C (Negosiasi)
   - Status: TIDAK LAYAK - DAPAT DINEGOSIASIKAN

### 3. Test Analisis Komparasi

Setelah mengisi form, verifikasi muncul:

✅ **Section "Analisis Perbandingan Harga Penawaran"** dengan:
- Harga Kalkulasi
- Harga Penawaran Vendor
- Selisih (dalam Rp dan %)
- Status Kelayakan (LAYAK/TIDAK LAYAK)
- Rekomendasi Negosiasi

### 4. Test Save

1. Klik tombol "Simpan Analisis"
2. Tunggu notifikasi "Analisis berhasil disimpan"
3. Verifikasi tidak ada error di console

### 5. Test Riwayat

1. Klik menu "Analisa Sewa" → "Riwayat Kalkulasi"
2. Verifikasi data yang baru disimpan muncul
3. Cek tampilan card menampilkan:
   - ✅ Harga Beli
   - ✅ Sewa/Tahun (Kalkulasi)
   - ✅ Present Value Biaya
   - ✅ Feasibility (LAYAK/TIDAK LAYAK)

4. Jika ada vendor quote, verifikasi muncul:
   - ✅ Section "Analisis Perbandingan Harga"
   - ✅ Harga Penawaran Vendor
   - ✅ Selisih Harga
   - ✅ Persentase Selisih
   - ✅ Status Kelayakan

5. Klik "Lihat Detail" (icon mata)
6. Verifikasi detail lengkap menampilkan:
   - ✅ Umur Ekonomis
   - ✅ Nilai Residu
   - ✅ Tingkat Keuntungan
   - ✅ Masa Sewa
   - ✅ Discount Rate
   - ✅ Total Biaya
   - ✅ Total Pendapatan
   - ✅ Total Keuntungan

### 6. Test PDF Export

1. Di halaman Riwayat, klik icon PDF (download)
2. Verifikasi PDF berisi:
   - ✅ Data Input lengkap
   - ✅ Hasil Perhitungan dengan PV
   - ✅ Analisis Perbandingan (jika ada vendor quote)
   - ✅ Rekomendasi

## Skenario Test Kelayakan

### Skenario 1: LAYAK - Harga Wajar
```
Harga Kalkulasi: 476.666.667
Harga Penawaran: 480.000.000
Selisih: +3.333.333 (+0.7%)
Status: LAYAK - HARGA WAJAR
```

### Skenario 2: TIDAK LAYAK - Perlu Negosiasi
```
Harga Kalkulasi: 476.666.667
Harga Penawaran: 550.000.000
Selisih: +73.333.333 (+15.4%)
Status: TIDAK LAYAK - PERLU NEGOSIASI ULANG
```

### Skenario 3: LAYAK - Harga Sangat Baik
```
Harga Kalkulasi: 476.666.667
Harga Penawaran: 430.000.000
Selisih: -46.666.667 (-9.8%)
Status: LAYAK - HARGA SANGAT BAIK
```

### Skenario 4: Tanpa Vendor Quote
```
Harga Penawaran: (kosong)
Status: N/A
Analisis Komparasi: Tidak ditampilkan
```

## Checklist Cepat

**Form**:
- [ ] Semua field dapat diisi
- [ ] Field Harga Penawaran Sewa muncul dengan highlight
- [ ] Auto-calculate berfungsi
- [ ] Hasil perhitungan muncul

**Analisis**:
- [ ] Present Value dihitung
- [ ] Feasibility Score ditampilkan
- [ ] Analisis Komparasi muncul (jika ada vendor quote)
- [ ] Status Kelayakan benar

**Save & History**:
- [ ] Data tersimpan tanpa error
- [ ] Notifikasi sukses muncul
- [ ] Data muncul di Riwayat (tanpa reload)
- [ ] Semua field baru ditampilkan

**PDF**:
- [ ] PDF dapat diunduh
- [ ] Semua data tercantum
- [ ] Format rapi dan profesional

## Troubleshooting Cepat

**❌ Migration gagal**
→ Cek .env, pastikan SUPABASE_SERVICE_ROLE_KEY ada

**❌ Data tidak muncul di riwayat**
→ Refresh halaman, cek console untuk error

**❌ Field baru tidak tersimpan**
→ Pastikan migration sudah dijalankan

**❌ Analisis komparasi tidak muncul**
→ Pastikan Harga Penawaran Sewa sudah diisi

## Expected Results

Setelah semua test berhasil:
- ✅ Form lengkap dengan field baru
- ✅ Analisis kelayakan berfungsi
- ✅ Data tersimpan dengan lengkap
- ✅ Riwayat menampilkan semua informasi
- ✅ PDF export mencakup analisis lengkap

---

**Estimasi Waktu**: 10-15 menit  
**Status**: Ready for Testing
