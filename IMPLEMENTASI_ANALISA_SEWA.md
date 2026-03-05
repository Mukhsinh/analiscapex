# Implementasi Fitur Analisa Sewa

## Ringkasan Perubahan

Telah berhasil diimplementasikan 3 fitur utama sesuai permintaan:

### 1. Menu Baru "Analisis CAPEX" dengan Submenu ✅

Menu sidebar telah diperbarui dengan struktur berikut:
- **Analisis Capex** - Analisis perbandingan Leasing, Borrow & Purchase, dan Revenue Sharing
- **Analisa Sewa** - Kalkulasi harga sewa alat (BARU)
- **Laporan & Grafik** - Visualisasi hasil analisis
- **Riwayat Analisis** - Riwayat semua analisis yang tersimpan
- **Pengaturan Proyek** - Konfigurasi informasi proyek

### 2. Riwayat Analisis dengan Expandable Rows ✅

Komponen `AnalysisHistory.jsx` telah diperbarui dengan fitur:
- **Satu baris per analisis** - Tampilan ringkas dengan informasi utama
- **Expandable rows** - Klik untuk melihat detail lengkap 3 metode analisis
- **Detail per metode** - Leasing, Borrow & Purchase, dan Revenue Sharing
- **Tombol aksi** - Download PDF dan Hapus analisis
- **UI responsif** - Tampilan optimal di desktop dan mobile

### 3. Halaman "Analisa Sewa" ✅

Fitur baru untuk menghitung harga sewa alat dengan:

#### Input Parameters:
- Nama Alat
- Harga Beli Alat (Rp)
- Umur Ekonomis Alat (Tahun)
- Nilai Residu (Rp)
- Tingkat Keuntungan Vendor (%)
- Masa Sewa (Tahun)

#### Rumus Perhitungan:
```
Harga Sewa Tahunan = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa) - Nilai Residu) / Masa Sewa
Harga Sewa Bulanan = Harga Sewa Tahunan / 12
```

#### Output:
- Harga Sewa per Tahun
- Harga Sewa per Bulan
- Total Pendapatan Sewa
- ROI (Return on Investment)

#### Database:
Tabel baru `rental_analysis` dengan kolom:
- `id` - UUID primary key
- `user_id` - Referensi ke users
- `project_id` - Referensi ke projects (optional)
- `equipment_name` - Nama alat
- `purchase_price` - Harga beli
- `economic_life` - Umur ekonomis (tahun)
- `residual_value` - Nilai residu
- `vendor_profit_rate` - Tingkat keuntungan vendor (%)
- `rental_period` - Masa sewa (tahun)
- `annual_rental_price` - Harga sewa tahunan (hasil kalkulasi)
- `monthly_rental_price` - Harga sewa bulanan (hasil kalkulasi)
- `total_rental_revenue` - Total pendapatan sewa
- `notes` - Catatan tambahan
- `created_at`, `updated_at` - Timestamp

#### Fitur Tambahan:
- **Auto-save** - Hasil perhitungan otomatis tersimpan ke database
- **Riwayat** - Menampilkan 10 analisis terakhir
- **Delete** - Hapus analisis yang tidak diperlukan
- **Format mata uang** - Tampilan Rupiah yang rapi

## File yang Dibuat/Dimodifikasi

### File Baru:
1. `src/components/RentalAnalysis.jsx` - Komponen utama analisa sewa
2. `IMPLEMENTASI_ANALISA_SEWA.md` - Dokumentasi ini

### File Dimodifikasi:
1. `src/App.jsx` - Menambahkan import dan route untuk RentalAnalysis
2. `src/components/AnalysisHistory.jsx` - Implementasi expandable rows
3. `src/components/Sidebar.jsx` - Sudah ada menu Analisa Sewa

### Database Migration:
1. Migration `create_rental_analysis_table` - Membuat tabel rental_analysis dengan RLS policies

## Cara Menggunakan

### Analisa Sewa:
1. Login ke aplikasi
2. Klik menu "Analisa Sewa" di sidebar
3. Isi semua field input:
   - Nama alat yang akan disewakan
   - Harga beli alat
   - Umur ekonomis alat
   - Nilai residu (nilai jual akhir)
   - Tingkat keuntungan vendor yang diinginkan
   - Masa sewa yang direncanakan
4. Klik "Hitung Harga Sewa"
5. Lihat hasil perhitungan dan riwayat analisis sebelumnya

### Riwayat Analisis:
1. Klik menu "Riwayat Analisis" di sidebar
2. Lihat daftar analisis dalam format ringkas
3. Klik pada baris analisis untuk melihat detail lengkap
4. Klik lagi untuk menutup detail
5. Gunakan tombol Download untuk mendapatkan laporan PDF
6. Gunakan tombol Hapus untuk menghapus analisis

## Contoh Perhitungan

**Input:**
- Harga Beli: Rp 5.000.000.000
- Umur Ekonomis: 10 tahun
- Nilai Residu: Rp 500.000.000
- Tingkat Keuntungan: 15%
- Masa Sewa: 5 tahun

**Perhitungan:**
```
Total Investasi = 5.000.000.000 × (1 + 0.15) = 5.750.000.000
Harga Sewa Tahunan = (5.750.000.000 - 500.000.000) / 5 = 1.050.000.000
Harga Sewa Bulanan = 1.050.000.000 / 12 = 87.500.000
Total Pendapatan = 1.050.000.000 × 5 = 5.250.000.000
ROI = (5.250.000.000 - 5.000.000.000) / 5.000.000.000 × 100 = 5%
```

**Output:**
- Harga Sewa per Tahun: Rp 1.050.000.000
- Harga Sewa per Bulan: Rp 87.500.000
- Total Pendapatan Sewa: Rp 5.250.000.000
- ROI: 5%

## Security & RLS

Tabel `rental_analysis` dilindungi dengan Row Level Security (RLS):
- Users hanya bisa melihat analisis mereka sendiri
- Users hanya bisa insert/update/delete analisis mereka sendiri
- Policies menggunakan `auth.uid()` untuk validasi

## Testing

Untuk menguji fitur:
1. Jalankan aplikasi: `npm run dev`
2. Login dengan user yang valid
3. Navigasi ke menu "Analisa Sewa"
4. Lakukan perhitungan dengan data sample
5. Verifikasi hasil perhitungan
6. Cek riwayat analisis tersimpan
7. Test expandable rows di "Riwayat Analisis"

## Status

✅ Semua fitur telah diimplementasikan dan siap digunakan
✅ Database migration berhasil dijalankan
✅ RLS policies aktif untuk keamanan data
✅ UI responsif dan user-friendly
✅ Integrasi dengan sistem existing berjalan lancar

---

**Tanggal Implementasi:** 5 Maret 2026
**Developer:** Kiro AI Assistant
