# Checklist Verifikasi Integrasi Database & Frontend

## 📋 Panduan Testing Lengkap

### Persiapan Testing

1. **Buka Browser Developer Tools**
   - Tekan F12 atau Ctrl+Shift+I
   - Buka tab "Console" untuk melihat log
   - Buka tab "Network" untuk melihat request ke Supabase

2. **Login ke Aplikasi**
   - Email: mukhsin9@gmail.com
   - Password: (password yang sudah diset)

---

## ✅ BAGIAN 1: Verifikasi Input Form → Database

### A. Test Form Leasing

- [ ] Buka menu "Analisis Capex"
- [ ] Pilih tab "A. Leasing"
- [ ] Isi data:
  - Pembayaran Leasing per Tahun: 280.000.000
  - Periode: 5 tahun
  - Discount Rate: 10%
- [ ] Cek console log - tidak ada error
- [ ] Refresh halaman
- [ ] Verifikasi data masih ada (auto-load dari database)

**Expected Result:** ✅ Data tersimpan dan dimuat kembali dengan benar

### B. Test Form Purchase

- [ ] Pilih tab "B. Borrow & Purchase"
- [ ] Isi data:
  - Jumlah Pinjaman: 1.300.000.000
  - Bunga per Tahun: 10%
  - Periode: 5 tahun
  - Biaya Pemeliharaan: 12.000.000
  - Nilai Residu: 130.000.000
  - Discount Rate: 10%
- [ ] Cek console log - tidak ada error
- [ ] Refresh halaman
- [ ] Verifikasi data masih ada

**Expected Result:** ✅ Data tersimpan dan dimuat kembali dengan benar

### C. Test Form Revenue Share

- [ ] Pilih tab "C. Revenue Sharing"
- [ ] Pilih Metode: "Metode Persentase"
- [ ] Isi data umum:
  - Porsi RS: 25%
  - Biaya Overhead Langsung: 5.000.000.000
  - Biaya Overhead Alokasian: 370.760.000
  - Tax Rate: 13%
  - Discount Rate: 10%
  - Periode: 5 tahun
- [ ] Tambah prosedur (minimal 3):
  1. Darah Rutin - Tarif: 150.000 - Volume: 68.664
  2. Creatinin - Tarif: 150.000 - Volume: 32.208
  3. Urea / BUN - Tarif: 150.000 - Volume: 30.624
- [ ] Cek total volume dan pendapatan RS
- [ ] Cek console log - tidak ada error
- [ ] Refresh halaman
- [ ] Verifikasi data dan prosedur masih ada

**Expected Result:** ✅ Data dan prosedur tersimpan dengan benar

---

## ✅ BAGIAN 2: Verifikasi Kalkulasi & Penyimpanan Hasil

### A. Test Kalkulasi

- [ ] Pastikan semua 3 form sudah terisi lengkap
- [ ] Klik tombol "Hitung & Bandingkan Semua Alternatif"
- [ ] Tunggu proses kalkulasi (lihat loading indicator)
- [ ] Cek console log untuk:
  - "Starting to save analysis to database..."
  - "Successfully saved! Project ID: ..."
  - Tidak ada error message
- [ ] Verifikasi hasil muncul di bawah form:
  - Tabel perbandingan 3 alternatif
  - Grafik perbandingan
  - Rekomendasi alternatif terbaik
  - Detail breakdown per tahun

**Expected Result:** ✅ Kalkulasi berhasil dan hasil ditampilkan

### B. Test Penyimpanan ke Database

- [ ] Setelah kalkulasi, cek notifikasi:
  - "Analisis berhasil disimpan ke database" (hijau)
- [ ] Buka file `test_complete_analysis_save.html` di browser
- [ ] Klik "Check Existing Data"
- [ ] Verifikasi data yang tersimpan:
  - Analysis Results: > 0 records
  - Detailed Analysis Results: > 0 records
  - Recommendations: > 0 records
  - Form Inputs: 3 records (leasing, purchase, revenueShare)

**Expected Result:** ✅ Semua data tersimpan di database

---

## ✅ BAGIAN 3: Verifikasi Tampilan Riwayat

### A. Test Riwayat Analisis

- [ ] Klik menu "Riwayat Analisis" di sidebar
- [ ] Verifikasi tampilan:
  - Menampilkan list analisis yang pernah dilakukan
  - Setiap item menampilkan:
    - Jenis analisis (Leasing/Purchase/Revenue Share)
    - Tanggal & waktu
    - Nama proyek & equipment
    - Total PV
  - Tombol "Lihat Detail" berfungsi
  - Tombol "Hapus" berfungsi
- [ ] Klik "Lihat Detail" pada salah satu analisis
- [ ] Verifikasi detail ditampilkan:
  - Input data lengkap
  - Daftar prosedur (untuk Revenue Share)
  - Parameter kalkulasi
  - Hasil analisis

**Expected Result:** ✅ Riwayat ditampilkan dengan lengkap dan detail

### B. Test Refresh Riwayat

- [ ] Klik tombol "Refresh" di halaman Riwayat
- [ ] Verifikasi data di-reload dari database
- [ ] Lakukan kalkulasi baru
- [ ] Kembali ke halaman Riwayat
- [ ] Verifikasi analisis baru muncul di list

**Expected Result:** ✅ Refresh dan auto-update berfungsi

---

## ✅ BAGIAN 4: Verifikasi Laporan & Grafik

### A. Test Laporan Grafik

- [ ] Klik menu "Laporan & Grafik" di sidebar
- [ ] Verifikasi tampilan:
  - Grafik perbandingan PV (bar chart)
  - Grafik breakdown per tahun (line chart)
  - Tabel detail per tahun
  - Ringkasan rekomendasi
- [ ] Test tombol export:
  - Export to PDF
  - Export to Excel
  - Print

**Expected Result:** ✅ Laporan dan grafik ditampilkan dengan benar

---

## ✅ BAGIAN 5: Verifikasi Project Settings

### A. Test Update Project Settings

- [ ] Klik menu "Pengaturan" di sidebar
- [ ] Ubah data:
  - Nama Rumah Sakit: (ubah ke nama lain)
  - Nama Alat: (ubah ke nama lain)
  - Departemen: (ubah ke nama lain)
- [ ] Klik "Simpan Perubahan"
- [ ] Verifikasi notifikasi: "Pengaturan berhasil disimpan ke database"
- [ ] Cek header aplikasi - nama berubah
- [ ] Refresh halaman
- [ ] Verifikasi perubahan masih ada

**Expected Result:** ✅ Project settings tersimpan dan ditampilkan

### B. Test Reset to Default

- [ ] Klik "Reset ke Default"
- [ ] Verifikasi data kembali ke default
- [ ] Klik "Simpan Perubahan"
- [ ] Refresh halaman
- [ ] Verifikasi data default tersimpan

**Expected Result:** ✅ Reset berfungsi dengan benar

---

## ✅ BAGIAN 6: Verifikasi Database Langsung

### A. Cek Data di Supabase Dashboard

- [ ] Login ke Supabase Dashboard
- [ ] Buka Table Editor
- [ ] Cek tabel `users`:
  - Ada 1 user (mukhsin9@gmail.com)
- [ ] Cek tabel `projects`:
  - Ada minimal 1 project
  - Data lengkap (hospital_name, equipment_name, dll)
- [ ] Cek tabel `form_inputs`:
  - Ada 3 records (leasing, purchase, revenueShare)
  - input_data berisi JSON lengkap
- [ ] Cek tabel `analysis_results`:
  - Ada minimal 3 records (1 per tipe)
  - results berisi JSON lengkap
- [ ] Cek tabel `analysis_yearly_breakdown`:
  - Ada records untuk setiap tahun
  - Data lengkap per tahun
- [ ] Cek tabel `detailed_analysis_results`:
  - Ada minimal 1 record
  - Semua field terisi
- [ ] Cek tabel `analysis_recommendations`:
  - Ada minimal 1 record
  - best_alternative, worst_alternative terisi

**Expected Result:** ✅ Semua tabel berisi data yang benar

### B. Test Query SQL

Jalankan query berikut di SQL Editor Supabase:

```sql
-- Check complete data
SELECT 
  p.hospital_name,
  p.equipment_name,
  COUNT(DISTINCT ar.id) as total_analyses,
  COUNT(DISTINCT dar.id) as total_detailed,
  COUNT(DISTINCT rec.id) as total_recommendations
FROM projects p
LEFT JOIN analysis_results ar ON ar.project_id = p.id
LEFT JOIN detailed_analysis_results dar ON dar.project_id = p.id
LEFT JOIN analysis_recommendations rec ON rec.project_id = p.id
WHERE p.user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
GROUP BY p.id, p.hospital_name, p.equipment_name;
```

**Expected Result:** ✅ Query mengembalikan data lengkap

---

## ✅ BAGIAN 7: Test Edge Cases

### A. Test Tanpa Login

- [ ] Logout dari aplikasi
- [ ] Coba akses halaman Analisis
- [ ] Verifikasi redirect ke halaman Login

**Expected Result:** ✅ Redirect ke login berfungsi

### B. Test dengan Data Kosong

- [ ] Login kembali
- [ ] Hapus semua prosedur di Revenue Share
- [ ] Coba kalkulasi
- [ ] Verifikasi error handling

**Expected Result:** ✅ Error handling berfungsi

### C. Test dengan Data Invalid

- [ ] Isi form dengan nilai negatif
- [ ] Isi form dengan nilai 0
- [ ] Coba kalkulasi
- [ ] Verifikasi validasi input

**Expected Result:** ✅ Validasi input berfungsi

---

## 📊 Hasil Testing

### Summary

| Bagian | Status | Catatan |
|--------|--------|---------|
| Input Form → Database | ⬜ | |
| Kalkulasi & Penyimpanan | ⬜ | |
| Tampilan Riwayat | ⬜ | |
| Laporan & Grafik | ⬜ | |
| Project Settings | ⬜ | |
| Database Verification | ⬜ | |
| Edge Cases | ⬜ | |

### Issues Found

1. 
2. 
3. 

### Recommendations

1. 
2. 
3. 

---

## 🔧 Troubleshooting

### Jika Data Tidak Tersimpan

1. Cek console log untuk error message
2. Cek Network tab untuk failed requests
3. Verifikasi RLS policies di Supabase
4. Cek user_id dan project_id valid
5. Jalankan `test_complete_analysis_save.html` untuk testing isolated

### Jika Data Tidak Muncul di Frontend

1. Cek console log saat load data
2. Verifikasi data ada di database (Supabase Dashboard)
3. Cek fungsi `getUserAnalyses` dipanggil
4. Cek response dari Supabase
5. Refresh halaman dengan Ctrl+F5 (hard refresh)

### Jika Kalkulasi Error

1. Cek semua field terisi lengkap
2. Cek format angka (tidak ada karakter invalid)
3. Cek console log untuk error detail
4. Verifikasi fungsi kalkulasi di `src/utils/calculations.js`

---

*Checklist dibuat: 2 Maret 2026*
*Untuk testing lengkap integrasi database dan frontend*
