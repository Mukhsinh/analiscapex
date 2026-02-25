# Testing Checklist - Perbaikan Route & Data Persistence

## 🔍 Pre-Testing Setup

- [ ] Pastikan Supabase sudah running
- [ ] Pastikan database sudah ter-setup dengan benar
- [ ] Clear localStorage browser: `localStorage.clear()`
- [ ] Clear cache browser
- [ ] Buka Developer Console untuk monitoring

## 📋 Test 1: Route Navigation

### Test 1.1: Analisis Capex
- [ ] Klik menu "Analisis Capex"
- [ ] URL berubah menjadi `/analisis_capex` (bukan `/analisis-capex`)
- [ ] Halaman menampilkan form Leasing, Purchase, Revenue Share
- [ ] Tab switching berfungsi dengan baik

### Test 1.2: Laporan & Grafik
- [ ] Klik menu "Laporan & Grafik"
- [ ] URL berubah menjadi `/laporan_grafik` (bukan `/laporan-grafik`)
- [ ] Jika belum ada data: Tampil pesan "Belum Ada Data Analisis"
- [ ] Jika sudah ada data: Tampil grafik dan laporan

### Test 1.3: Riwayat Analisis
- [ ] Klik menu "Riwayat Analisis"
- [ ] URL berubah menjadi `/riwayat_analisis` (bukan `/riwayat-analisis`)
- [ ] Halaman menampilkan riwayat analisis dari database

### Test 1.4: Pengaturan Proyek
- [ ] Klik menu "Pengaturan Proyek"
- [ ] URL berubah menjadi `/pengaturan` (bukan `/pengaturan-proyek`)
- [ ] Form pengaturan proyek tampil dengan benar

## 💾 Test 2: Data Persistence - Leasing Form

### Test 2.1: Input Data Leasing
- [ ] Login ke aplikasi
- [ ] Buka tab "Leasing"
- [ ] Isi data:
  - Pembayaran Leasing: 280 juta
  - Periode: 60 bulan
  - Discount Rate: 10%
- [ ] Buka Developer Console
- [ ] Cek tidak ada error di console
- [ ] Tunggu 2 detik

### Test 2.2: Verifikasi Auto-Save
- [ ] Buka tab Network di Developer Tools
- [ ] Lihat ada request ke Supabase
- [ ] Status request: 200 OK atau 201 Created
- [ ] Tidak ada error message

### Test 2.3: Refresh Browser
- [ ] Tekan F5 atau Ctrl+R untuk refresh
- [ ] Login kembali jika diperlukan
- [ ] Buka tab "Leasing"
- [ ] ✅ Data yang diisi masih ada
- [ ] ✅ Nilai sama dengan yang diinput sebelumnya

## 💰 Test 3: Data Persistence - Purchase Form

### Test 3.1: Input Data Purchase
- [ ] Buka tab "Borrow & Purchase"
- [ ] Isi data:
  - Jumlah Pinjaman: 1300 juta
  - Bunga: 10%
  - Periode: 5 tahun
  - Biaya Pemeliharaan: 20 juta
  - Nilai Residu: 130 juta
  - Discount Rate: 10%
- [ ] Cek console tidak ada error

### Test 3.2: Refresh Browser
- [ ] Refresh browser (F5)
- [ ] Login kembali
- [ ] Buka tab "Borrow & Purchase"
- [ ] ✅ Data masih ada dan sesuai

## 📊 Test 4: Data Persistence - Revenue Share Form

### Test 4.1: Input Data Revenue Share
- [ ] Buka tab "Revenue Sharing"
- [ ] Isi data umum:
  - Porsi RS: 15%
  - Direct Overhead: 1632 juta
  - Allocated Overhead: 240 juta
  - Tax Rate: 15%
  - Discount Rate: 10%
  - Periode: 5 tahun

### Test 4.2: Tambah Procedures
- [ ] Klik "Tambah Manual"
- [ ] Tambah procedure:
  - Nama: "Darah Rutin"
  - Tarif: 150000
  - Volume: 68664
- [ ] Klik "Simpan"
- [ ] Procedure muncul di tabel

### Test 4.3: Refresh Browser
- [ ] Refresh browser (F5)
- [ ] Login kembali
- [ ] Buka tab "Revenue Sharing"
- [ ] ✅ Data umum masih ada
- [ ] ✅ Procedures masih ada di tabel

## 🔄 Test 5: Complete Workflow

### Test 5.1: Isi Semua Form
- [ ] Isi form Leasing dengan data lengkap
- [ ] Isi form Purchase dengan data lengkap
- [ ] Isi form Revenue Share dengan data lengkap
- [ ] Klik "Hitung & Bandingkan Semua Alternatif"
- [ ] Muncul notifikasi "Analisis berhasil disimpan ke database"

### Test 5.2: Verifikasi Hasil
- [ ] Hasil perhitungan muncul di bawah form
- [ ] Tabel perbandingan tampil dengan benar
- [ ] Rekomendasi tampil dengan benar

### Test 5.3: Refresh dan Cek Persistence
- [ ] Refresh browser (F5)
- [ ] Login kembali
- [ ] ✅ Semua data form masih ada
- [ ] ✅ Hasil perhitungan hilang (normal, perlu hitung ulang)
- [ ] Klik "Hitung & Bandingkan" lagi
- [ ] ✅ Hasil sama dengan sebelumnya

## 📈 Test 6: Laporan & Grafik

### Test 6.1: Setelah Perhitungan
- [ ] Setelah melakukan perhitungan
- [ ] Klik menu "Laporan & Grafik"
- [ ] ✅ Grafik tampil dengan benar
- [ ] ✅ Data sesuai dengan perhitungan

### Test 6.2: Refresh Browser
- [ ] Refresh browser di halaman Laporan
- [ ] ✅ Pesan "Belum Ada Data" muncul (normal)
- [ ] Kembali ke "Analisis Capex"
- [ ] Klik "Hitung & Bandingkan"
- [ ] Kembali ke "Laporan & Grafik"
- [ ] ✅ Grafik tampil kembali

## 🕐 Test 7: Riwayat Analisis

### Test 7.1: Cek Riwayat
- [ ] Klik menu "Riwayat Analisis"
- [ ] ✅ Daftar analisis tampil
- [ ] ✅ Data sesuai dengan yang pernah disimpan
- [ ] Klik salah satu riwayat
- [ ] ✅ Detail analisis tampil

### Test 7.2: Load dari Riwayat
- [ ] Klik tombol "Load" pada salah satu riwayat
- [ ] ✅ Data ter-load ke form
- [ ] Kembali ke "Analisis Capex"
- [ ] ✅ Form terisi dengan data dari riwayat

## ⚙️ Test 8: Pengaturan Proyek

### Test 8.1: Update Pengaturan
- [ ] Klik menu "Pengaturan Proyek"
- [ ] Ubah data:
  - Nama RS: "RS Test Hospital"
  - Equipment: "Test Equipment"
  - Department: "Test Department"
  - Copyright: "© Test User"
- [ ] Klik "Simpan Perubahan"
- [ ] Muncul notifikasi "Pengaturan berhasil disimpan"

### Test 8.2: Verifikasi Update
- [ ] Cek header aplikasi
- [ ] ✅ Nama RS berubah di header
- [ ] Refresh browser
- [ ] ✅ Perubahan masih ada

## 🔍 Test 9: Database Verification

### Test 9.1: Cek Projects Table
```sql
SELECT * FROM projects 
WHERE user_id = '[your_user_id]' 
ORDER BY created_at DESC 
LIMIT 1;
```
- [ ] ✅ Project ada di database
- [ ] ✅ Data sesuai dengan yang diinput

### Test 9.2: Cek Form Inputs Table
```sql
SELECT * FROM form_inputs 
WHERE user_id = '[your_user_id]' 
ORDER BY updated_at DESC;
```
- [ ] ✅ Ada 3 records (leasing, purchase, revenueShare)
- [ ] ✅ Data sesuai dengan yang diinput

### Test 9.3: Cek Analysis Results Table
```sql
SELECT * FROM analysis_results 
WHERE user_id = '[your_user_id]' 
ORDER BY created_at DESC 
LIMIT 3;
```
- [ ] ✅ Ada records untuk setiap perhitungan
- [ ] ✅ Results tersimpan dengan benar

## 🚨 Test 10: Error Handling

### Test 10.1: Offline Mode
- [ ] Disconnect internet
- [ ] Isi form data
- [ ] ✅ Data tersimpan di localStorage
- [ ] ✅ Tidak ada error yang mengganggu UX
- [ ] Connect internet kembali
- [ ] Refresh browser
- [ ] ✅ Data sync ke database

### Test 10.2: Database Error
- [ ] Stop Supabase (jika local)
- [ ] Isi form data
- [ ] ✅ Data tersimpan di localStorage
- [ ] ✅ Aplikasi tetap berfungsi
- [ ] Start Supabase kembali
- [ ] Refresh browser
- [ ] ✅ Data sync ke database

## 📱 Test 11: Responsive & Mobile

### Test 11.1: Mobile View
- [ ] Buka di mobile browser atau resize window
- [ ] ✅ Sidebar collapse dengan benar
- [ ] ✅ Form responsive
- [ ] ✅ Tabel scrollable horizontal

### Test 11.2: Tablet View
- [ ] Resize ke tablet size
- [ ] ✅ Layout adjust dengan baik
- [ ] ✅ Semua fungsi bekerja

## ✅ Final Checklist

- [ ] Semua route menggunakan underscore (_)
- [ ] Data tersimpan ke database saat diisi
- [ ] Data persistent setelah refresh
- [ ] Project otomatis dibuat saat login
- [ ] Error handling berfungsi dengan baik
- [ ] Tidak ada error di console
- [ ] Tidak ada warning di console
- [ ] Performance baik (tidak lag)
- [ ] Database queries efisien

## 📝 Notes

Catat semua issue yang ditemukan:

1. Issue: _______________________________________________
   Status: [ ] Fixed / [ ] Pending
   
2. Issue: _______________________________________________
   Status: [ ] Fixed / [ ] Pending
   
3. Issue: _______________________________________________
   Status: [ ] Fixed / [ ] Pending

## 🎯 Success Criteria

✅ Semua test case passed
✅ Tidak ada critical bug
✅ Data persistence bekerja 100%
✅ Route names sesuai requirement
✅ User experience smooth dan intuitif
