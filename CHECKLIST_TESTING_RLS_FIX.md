# Checklist Testing Perbaikan RLS - 25 Februari 2026

## ✅ Perbaikan yang Sudah Dilakukan

1. ✅ RLS (Row Level Security) diaktifkan pada semua tabel
2. ✅ RLS Policies dibuat untuk operasi SELECT, INSERT, UPDATE, DELETE
3. ✅ Test insert berhasil untuk tabel `users` dan `projects`

## 📋 Langkah Testing untuk User

### 1. Persiapan
- [ ] Refresh browser (Ctrl+F5 atau Cmd+Shift+R)
- [ ] Buka Developer Console (F12)
- [ ] Buka tab Network untuk monitoring request

### 2. Login
- [ ] Login dengan email dan password yang sudah terdaftar
- [ ] Pastikan tidak ada error di console
- [ ] Pastikan redirect ke halaman Analisis Capex

### 3. Input Data - Tab Leasing
- [ ] Isi Monthly Payment (contoh: 280)
- [ ] Isi Period (contoh: 60)
- [ ] Isi Discount Rate (contoh: 10)
- [ ] Pastikan data tersimpan (cek localStorage di console)

### 4. Input Data - Tab Borrow & Purchase
- [ ] Isi Loan Amount (contoh: 1300)
- [ ] Isi Interest Rate (contoh: 10)
- [ ] Isi Period (contoh: 5)
- [ ] Isi Maintenance Cost (contoh: 20)
- [ ] Isi Residual Value (contoh: 130)
- [ ] Isi Discount Rate (contoh: 10)

### 5. Input Data - Tab Revenue Sharing
- [ ] Isi RS Share (contoh: 15)
- [ ] Isi Supplier Share (contoh: 85)
- [ ] Isi Direct Overhead (contoh: 1632)
- [ ] Isi Allocated Overhead (contoh: 240)
- [ ] Isi Tax Rate (contoh: 15)
- [ ] Isi Discount Rate (contoh: 10)
- [ ] Isi Period (contoh: 5)
- [ ] Tambah/edit procedures jika perlu

### 6. Simpan Data ke Database
- [ ] Klik tombol "Hitung & Bandingkan Semua Alternatif"
- [ ] Tunggu proses (tombol akan menampilkan "Menyimpan...")
- [ ] Perhatikan notifikasi:
  - ✅ Hijau: "Analisis berhasil disimpan ke database"
  - ❌ Merah: "Gagal menyimpan ke database"

### 7. Verifikasi di Console Browser
Buka Console dan cek log messages:
- [ ] "Starting to save analysis to database..."
- [ ] "User ID: [uuid]"
- [ ] "Project Info: {...}"
- [ ] "Analysis Data: {...}"
- [ ] "Calculated Results: {...}"
- [ ] "Save response: {data: {...}, error: null}"
- [ ] "Successfully saved! Project ID: [uuid]"

### 8. Verifikasi di Supabase Dashboard

#### Tabel `users`
- [ ] Buka https://supabase.com/dashboard/project/mwrlfsdyblxqxetqxwhp/editor
- [ ] Pilih tabel `users`
- [ ] Cari user berdasarkan email
- [ ] Pastikan ada record user

#### Tabel `projects`
- [ ] Pilih tabel `projects`
- [ ] Cari project berdasarkan `user_id`
- [ ] Verifikasi data:
  - [ ] `hospital_name` sesuai
  - [ ] `equipment_name` sesuai
  - [ ] `department` sesuai
  - [ ] `copyright` sesuai
  - [ ] `created_at` timestamp terbaru

#### Tabel `analysis_results`
- [ ] Pilih tabel `analysis_results`
- [ ] Cari berdasarkan `project_id` yang baru dibuat
- [ ] Harus ada **3 records**:
  - [ ] 1 record dengan `analysis_type` = 'leasing'
  - [ ] 1 record dengan `analysis_type` = 'purchase'
  - [ ] 1 record dengan `analysis_type` = 'revenueShare'
- [ ] Verifikasi `input_data` dan `results` berisi data yang benar

#### Tabel `detailed_analysis_results`
- [ ] Pilih tabel `detailed_analysis_results`
- [ ] Cari berdasarkan `project_id`
- [ ] Harus ada **1 record** dengan semua field terisi:
  - [ ] Leasing fields (monthly_payment, period, discount_rate, total_pv)
  - [ ] Purchase fields (loan_amount, interest_rate, etc.)
  - [ ] Revenue Share fields (rs_share, supplier_share, etc.)
  - [ ] Recommendation fields (recommended_option, worst_option, pv_difference)

#### Tabel `analysis_recommendations`
- [ ] Pilih tabel `analysis_recommendations`
- [ ] Cari berdasarkan `project_id`
- [ ] Harus ada **1 record** dengan:
  - [ ] `best_alternative` terisi
  - [ ] `second_alternative` terisi
  - [ ] `worst_alternative` terisi
  - [ ] PV values untuk ketiga alternatif

#### Tabel `revenue_share_procedures`
- [ ] Pilih tabel `revenue_share_procedures`
- [ ] Cari berdasarkan `project_id`
- [ ] Harus ada records sesuai jumlah procedures yang diinput
- [ ] Verifikasi data procedures (name, tariff, volume, annual_revenue)

#### Tabel `form_inputs`
- [ ] Pilih tabel `form_inputs`
- [ ] Cari berdasarkan `project_id`
- [ ] Harus ada **3 records**:
  - [ ] 1 record dengan `form_type` = 'leasing'
  - [ ] 1 record dengan `form_type` = 'purchase'
  - [ ] 1 record dengan `form_type` = 'revenueShare'

### 9. Test Fitur Lainnya

#### Riwayat Analisis
- [ ] Klik menu "Riwayat Analisis"
- [ ] Pastikan analisis yang baru disimpan muncul di list
- [ ] Klik "Lihat Detail" pada salah satu analisis
- [ ] Verifikasi semua data tampil dengan benar

#### Laporan & Grafik
- [ ] Klik menu "Laporan & Grafik"
- [ ] Pastikan grafik dan tabel tampil
- [ ] Test export ke Excel
- [ ] Test export ke PDF

#### Pengaturan Proyek
- [ ] Klik menu "Pengaturan"
- [ ] Ubah salah satu field (contoh: Hospital Name)
- [ ] Klik "Simpan Perubahan"
- [ ] Verifikasi notifikasi sukses
- [ ] Refresh halaman
- [ ] Pastikan perubahan tersimpan

### 10. Test Error Handling

#### Test Tanpa Login
- [ ] Logout dari aplikasi
- [ ] Coba akses halaman analisis
- [ ] Pastikan redirect ke login

#### Test dengan Data Tidak Lengkap
- [ ] Login kembali
- [ ] Kosongkan salah satu field required
- [ ] Coba simpan
- [ ] Pastikan ada validasi error

## 🐛 Jika Masih Ada Masalah

### Error di Console
Jika ada error di console browser:
1. Screenshot error message
2. Copy full error stack trace
3. Cek tab Network untuk melihat failed request
4. Cek response body dari Supabase

### Error di Supabase
Jika data tidak masuk ke database:
1. Buka Supabase Dashboard
2. Klik "Logs" di sidebar
3. Pilih "Postgres Logs"
4. Cari error messages terkait INSERT atau RLS
5. Screenshot error untuk debugging

### Periksa RLS Policies
Jika suspect masalah RLS:
```sql
-- Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 📞 Kontak

Jika menemukan masalah, laporkan dengan informasi:
1. Screenshot error (console & UI)
2. Data yang diinput
3. Expected behavior vs actual behavior
4. Browser dan versi yang digunakan

## ✅ Status Akhir

Setelah semua checklist di atas selesai dan berhasil:
- [ ] Semua data tersimpan ke database
- [ ] Tidak ada error di console
- [ ] Semua fitur berfungsi normal
- [ ] RLS policies bekerja dengan baik

---

**Tanggal Testing**: _____________
**Tester**: _____________
**Status**: [ ] PASS / [ ] FAIL
**Catatan**: _____________________________________________
