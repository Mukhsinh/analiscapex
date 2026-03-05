# Checklist Testing - Fitur Analisa Sewa Lengkap

## Informasi Testing
- **Tanggal**: 5 Maret 2026
- **Fitur**: Analisa Sewa dengan PDF Export, Database Integration, dan Riwayat Kalkulasi
- **Tester**: [Nama Tester]

---

## 1. TOMBOL UNDUH PDF

### 1.1 Tampilan Tombol
- [ ] Tombol "Unduh PDF" muncul setelah hasil perhitungan ditampilkan
- [ ] Tombol memiliki icon download yang jelas
- [ ] Tombol memiliki warna biru gradient (blue-600 to indigo-600)
- [ ] Tombol responsive di mobile dan desktop
- [ ] Tombol disabled saat PDF sedang di-generate

### 1.2 Fungsi Generate PDF
- [ ] Klik tombol memicu proses generate PDF
- [ ] Loading indicator muncul saat generate ("Membuat PDF...")
- [ ] PDF berhasil ter-download ke komputer
- [ ] Nama file format: `Laporan_Analisis_Sewa_[timestamp].pdf`
- [ ] Tidak ada error di console browser

### 1.3 Konten PDF - Header
- [ ] Header dengan background gradient indigo
- [ ] Judul: "LAPORAN ANALISIS HARGA SEWA"
- [ ] Subtitle: "Analisis Perhitungan Harga Sewa Alat Medis"
- [ ] Text berwarna putih dan terbaca jelas

### 1.4 Konten PDF - Informasi Umum
- [ ] Section "I. INFORMASI UMUM" ada
- [ ] Tanggal analisis tampil dengan format Indonesia
- [ ] Nama alat tampil sesuai input
- [ ] Nama analis tampil (dari user login)

### 1.5 Konten PDF - Data Input
- [ ] Section "II. DATA INPUT" ada
- [ ] Tabel data input dengan 5 baris:
  - [ ] Harga Beli Alat (format Rupiah)
  - [ ] Umur Ekonomis Alat (tahun)
  - [ ] Nilai Residu (format Rupiah)
  - [ ] Tingkat Keuntungan Vendor (%)
  - [ ] Masa Sewa (tahun)
- [ ] Format currency Rupiah benar (Rp 1.300.000.000)
- [ ] Tabel dengan striped theme

### 1.6 Konten PDF - Hasil Perhitungan
- [ ] Section "III. HASIL PERHITUNGAN" ada
- [ ] Tabel hasil dengan 4 baris:
  - [ ] Harga Sewa per Tahun
  - [ ] Total Pendapatan Sewa
  - [ ] Total Biaya (Beli - Residu)
  - [ ] Total Keuntungan
- [ ] Semua nilai dalam format Rupiah
- [ ] Tabel dengan grid theme dan highlight warna

### 1.7 Konten PDF - Rumus Perhitungan
- [ ] Section "IV. RUMUS PERHITUNGAN" ada
- [ ] Rumus umum ditampilkan dengan jelas
- [ ] Contoh perhitungan dengan angka aktual
- [ ] Background abu-abu untuk box rumus

### 1.8 Konten PDF - Analisis & Rekomendasi
- [ ] Section "V. ANALISIS & REKOMENDASI" ada
- [ ] ROI (Return on Investment) dihitung dan tampil
- [ ] Margin Keuntungan Aktual dihitung dan tampil
- [ ] Periode Pengembalian Modal tampil
- [ ] Status Kelayakan (LAYAK/TIDAK LAYAK) tampil
- [ ] Rekomendasi bisnis tampil (3 poin)

### 1.9 Konten PDF - Footer
- [ ] Footer di bagian bawah halaman
- [ ] Copyright: "© Copyright Mukhsin Hadi - Capex Analyzer Professional Edition"
- [ ] Timestamp: "Dicetak pada: [tanggal dan waktu]"
- [ ] Text abu-abu dan terpusat

### 1.10 Layout PDF
- [ ] Semua konten tidak terpotong
- [ ] Spacing antar section proporsional
- [ ] Font size readable (tidak terlalu kecil)
- [ ] Tidak ada overlap text
- [ ] Multi-page handling jika konten panjang

---

## 2. PENYIMPANAN KE DATABASE

### 2.1 Validasi User
- [ ] Jika belum login, muncul alert "Anda harus login untuk menyimpan analisis"
- [ ] Jika sudah login, proses save berjalan
- [ ] User ID tersimpan dengan benar

### 2.2 Validasi Data
- [ ] Jika data belum lengkap, muncul alert "Silakan lengkapi data terlebih dahulu"
- [ ] Jika hasil perhitungan = 0, tidak bisa save
- [ ] Semua field required terisi

### 2.3 Proses Penyimpanan
- [ ] Klik tombol "Simpan Analisis" memicu save
- [ ] Loading indicator muncul ("Menyimpan...")
- [ ] Tombol disabled saat proses save
- [ ] Console log menampilkan proses save

### 2.4 Feedback Success
- [ ] Success message muncul: "Analisis berhasil disimpan ke database"
- [ ] Message berwarna hijau dengan icon checkmark
- [ ] Message hilang otomatis setelah 3 detik
- [ ] Event refresh di-trigger untuk halaman riwayat

### 2.5 Feedback Error
- [ ] Error message muncul jika save gagal
- [ ] Message berwarna merah dengan icon X
- [ ] Error message menampilkan detail error
- [ ] Message hilang setelah 5 detik

### 2.6 Data Tersimpan di Database
- [ ] Buka Supabase dashboard
- [ ] Tabel `rental_analysis` ada record baru
- [ ] Semua field terisi dengan benar:
  - [ ] user_id
  - [ ] project_id
  - [ ] equipment_name
  - [ ] purchase_price
  - [ ] economic_life
  - [ ] residual_value
  - [ ] profit_margin
  - [ ] rental_period
  - [ ] rental_price_per_year
  - [ ] total_revenue
  - [ ] total_cost
  - [ ] total_profit
  - [ ] created_at

### 2.7 Row Level Security (RLS)
- [ ] User hanya bisa melihat data mereka sendiri
- [ ] User tidak bisa melihat data user lain
- [ ] RLS policies berfungsi dengan benar

---

## 3. HALAMAN RIWAYAT KALKULASI

### 3.1 Menu Sidebar
- [ ] Menu "Analisa Sewa" menjadi group menu (bisa expand/collapse)
- [ ] Submenu "Hitung Harga Sewa" ada
- [ ] Submenu "Riwayat Kalkulasi" ada
- [ ] Icon untuk setiap submenu tampil
- [ ] Active state highlight dengan benar
- [ ] Expand/collapse animation smooth

### 3.2 Routing
- [ ] URL `/riwayat_kalkulasi` berfungsi
- [ ] Klik menu membuka halaman yang benar
- [ ] Browser back button berfungsi
- [ ] Direct URL access berfungsi

### 3.3 Header Halaman
- [ ] Header dengan gradient purple-indigo
- [ ] Judul: "Riwayat Kalkulasi Harga Sewa"
- [ ] Subtitle menampilkan total analisis
- [ ] Text berwarna putih

### 3.4 Loading State
- [ ] Saat load data, muncul spinner
- [ ] Text "Memuat riwayat..." tampil
- [ ] Loading tidak terlalu lama

### 3.5 Empty State
- [ ] Jika belum ada data, tampil empty state
- [ ] Icon dokumen besar tampil
- [ ] Text: "Belum Ada Riwayat"
- [ ] Subtitle: "Belum ada analisis harga sewa yang tersimpan"

### 3.6 List Analisis - Card Layout
- [ ] Setiap analisis tampil dalam card
- [ ] Card dengan shadow dan rounded corners
- [ ] Hover effect pada card (shadow lebih besar)
- [ ] Layout responsive (1 kolom di mobile, bisa lebih di desktop)

### 3.7 List Analisis - Konten Card
- [ ] Nama alat tampil sebagai judul (bold)
- [ ] Tanggal analisis dengan format lengkap Indonesia
- [ ] Status badge (LAYAK/TIDAK LAYAK):
  - [ ] Hijau untuk LAYAK
  - [ ] Merah untuk TIDAK LAYAK
- [ ] Grid 4 kolom untuk metrics:
  - [ ] Harga Beli
  - [ ] Sewa/Tahun (purple)
  - [ ] Total Revenue (blue)
  - [ ] Keuntungan (hijau/merah)
- [ ] Info rumah sakit dan departemen (jika ada)

### 3.8 List Analisis - Action Buttons
- [ ] 3 tombol per card:
  - [ ] Detail (biru)
  - [ ] PDF (hijau)
  - [ ] Hapus (merah)
- [ ] Icon untuk setiap tombol
- [ ] Tombol responsive (stack di mobile)
- [ ] Hover effect pada tombol

### 3.9 Fungsi Detail
- [ ] Klik "Detail" membuka modal
- [ ] Modal muncul dengan animasi
- [ ] Background overlay gelap
- [ ] Modal bisa di-scroll jika konten panjang

### 3.10 Modal Detail - Header
- [ ] Header modal dengan gradient purple-indigo
- [ ] Judul: "Detail Analisis"
- [ ] Tombol close (X) di kanan atas
- [ ] Tombol close berfungsi

### 3.11 Modal Detail - Informasi Umum
- [ ] Section "Informasi Umum" ada
- [ ] Background abu-abu muda
- [ ] Data tampil:
  - [ ] Nama Alat
  - [ ] Tanggal
  - [ ] Rumah Sakit (jika ada)
  - [ ] Departemen (jika ada)

### 3.12 Modal Detail - Data Input
- [ ] Section "Data Input" ada
- [ ] Background biru muda
- [ ] Semua 5 field input tampil dengan benar
- [ ] Format currency dan unit benar

### 3.13 Modal Detail - Hasil Perhitungan
- [ ] Section "Hasil Perhitungan" ada
- [ ] Grid 2x2 untuk 4 metrics
- [ ] Setiap metric dalam card dengan border warna
- [ ] Warna sesuai jenis metric:
  - [ ] Purple untuk Harga Sewa
  - [ ] Blue untuk Total Pendapatan
  - [ ] Orange untuk Total Biaya
  - [ ] Hijau/Merah untuk Keuntungan

### 3.14 Modal Detail - Analisis
- [ ] Section "Analisis" ada
- [ ] ROI dihitung dan tampil
- [ ] Margin Keuntungan dihitung dan tampil
- [ ] Status (LAYAK/TIDAK LAYAK) dengan warna

### 3.15 Modal Detail - Actions
- [ ] Tombol "Unduh PDF" ada dan berfungsi
- [ ] Tombol "Tutup" ada dan berfungsi
- [ ] Layout tombol proporsional

### 3.16 Fungsi PDF dari Riwayat
- [ ] Klik "PDF" di card memicu download
- [ ] PDF ter-generate dengan data dari riwayat
- [ ] Konten PDF sama dengan PDF dari form
- [ ] Nama file include nama alat
- [ ] Success alert muncul setelah download

### 3.17 Fungsi Delete
- [ ] Klik "Hapus" memunculkan konfirmasi
- [ ] Dialog konfirmasi: "Yakin ingin menghapus analisis ini?"
- [ ] Jika Cancel, tidak ada yang terjadi
- [ ] Jika OK, data terhapus dari database
- [ ] List refresh otomatis setelah delete
- [ ] Success alert: "Analisis berhasil dihapus"

### 3.18 Auto Refresh
- [ ] Setelah save di form, riwayat auto-refresh
- [ ] Data baru muncul di paling atas
- [ ] Tidak perlu manual refresh halaman
- [ ] Event listener berfungsi dengan benar

### 3.19 Responsive Design
- [ ] Layout baik di desktop (1920px)
- [ ] Layout baik di tablet (768px)
- [ ] Layout baik di mobile (375px)
- [ ] Tombol stack vertikal di mobile
- [ ] Modal fit di layar kecil
- [ ] Text tidak terpotong

---

## 4. INTEGRASI ANTAR FITUR

### 4.1 Flow: Form → Save → Riwayat
- [ ] Isi form di "Hitung Harga Sewa"
- [ ] Klik "Simpan Analisis"
- [ ] Buka "Riwayat Kalkulasi"
- [ ] Data baru muncul di list

### 4.2 Flow: Form → PDF
- [ ] Isi form di "Hitung Harga Sewa"
- [ ] Klik "Unduh PDF"
- [ ] PDF ter-download dengan data yang benar

### 4.3 Flow: Riwayat → Detail → PDF
- [ ] Buka "Riwayat Kalkulasi"
- [ ] Klik "Detail" pada salah satu item
- [ ] Klik "Unduh PDF" di modal
- [ ] PDF ter-download dengan data yang benar

### 4.4 Flow: Riwayat → PDF Direct
- [ ] Buka "Riwayat Kalkulasi"
- [ ] Klik "PDF" pada salah satu item
- [ ] PDF ter-download langsung

### 4.5 Flow: Riwayat → Delete
- [ ] Buka "Riwayat Kalkulasi"
- [ ] Klik "Hapus" pada salah satu item
- [ ] Konfirmasi delete
- [ ] Item hilang dari list

---

## 5. ERROR HANDLING

### 5.1 Network Error
- [ ] Matikan internet
- [ ] Coba save data
- [ ] Error message muncul dengan jelas
- [ ] Aplikasi tidak crash

### 5.2 Database Error
- [ ] Simulasi error database
- [ ] Error message informatif
- [ ] User bisa retry

### 5.3 PDF Generation Error
- [ ] Simulasi error PDF
- [ ] Error alert muncul
- [ ] Aplikasi tidak crash

### 5.4 Invalid Data
- [ ] Input data tidak valid (negatif, dll)
- [ ] Validasi mencegah save
- [ ] Error message jelas

---

## 6. PERFORMANCE

### 6.1 Load Time
- [ ] Halaman riwayat load < 2 detik
- [ ] PDF generate < 3 detik
- [ ] Save to database < 1 detik

### 6.2 Large Data
- [ ] Test dengan 50+ analisis di riwayat
- [ ] Scroll smooth
- [ ] Tidak ada lag

### 6.3 Memory
- [ ] Tidak ada memory leak
- [ ] Browser tidak slow setelah lama digunakan

---

## 7. SECURITY

### 7.1 Authentication
- [ ] Harus login untuk akses fitur
- [ ] Redirect ke login jika belum login
- [ ] Session persistent

### 7.2 Authorization
- [ ] User hanya bisa lihat data sendiri
- [ ] User tidak bisa edit data user lain
- [ ] RLS policies enforce

### 7.3 Data Validation
- [ ] Input validation di frontend
- [ ] Input validation di backend
- [ ] SQL injection prevention

---

## 8. BROWSER COMPATIBILITY

### 8.1 Chrome
- [ ] Semua fitur berfungsi
- [ ] Layout benar
- [ ] PDF download benar

### 8.2 Firefox
- [ ] Semua fitur berfungsi
- [ ] Layout benar
- [ ] PDF download benar

### 8.3 Safari
- [ ] Semua fitur berfungsi
- [ ] Layout benar
- [ ] PDF download benar

### 8.4 Edge
- [ ] Semua fitur berfungsi
- [ ] Layout benar
- [ ] PDF download benar

---

## HASIL TESTING

### Summary
- **Total Test Cases**: [Jumlah]
- **Passed**: [Jumlah]
- **Failed**: [Jumlah]
- **Blocked**: [Jumlah]

### Issues Found
1. [Deskripsi issue 1]
2. [Deskripsi issue 2]
3. [Deskripsi issue 3]

### Recommendations
1. [Rekomendasi 1]
2. [Rekomendasi 2]
3. [Rekomendasi 3]

### Status
- [ ] Ready for Production
- [ ] Need Fixes
- [ ] Need More Testing

---

**Tester**: ___________________  
**Date**: ___________________  
**Signature**: ___________________
