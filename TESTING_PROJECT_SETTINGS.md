# Testing Checklist - Project Settings

## Persiapan Testing

1. Pastikan aplikasi sudah running (`npm run dev`)
2. Buka browser dan login ke aplikasi
3. Buka Developer Console (F12) untuk melihat log
4. Buka Supabase Dashboard untuk verifikasi database

## Test Case 1: Simpan Data Baru

### Langkah:
1. Buka menu "Pengaturan Proyek"
2. Ubah semua field:
   - Nama Rumah Sakit: "RS Test Hospital"
   - Nama Alat: "Test Equipment"
   - Departemen: "Test Department"
   - Copyright: "© Test Copyright"
3. Klik "Simpan Perubahan"

### Expected Result:
- ✅ Muncul loading indicator "Menyimpan..."
- ✅ Muncul notifikasi hijau "Pengaturan berhasil disimpan ke database"
- ✅ Di console muncul log: "Project updated successfully" atau "Project created successfully"
- ✅ Preview menampilkan data yang baru

### Verifikasi Database:
```sql
SELECT * FROM projects ORDER BY updated_at DESC LIMIT 1;
```
- ✅ Data di database sesuai dengan yang diinput

## Test Case 2: Refresh Halaman

### Langkah:
1. Setelah menyimpan data (Test Case 1)
2. Tekan F5 atau refresh browser
3. Buka menu "Pengaturan Proyek"

### Expected Result:
- ✅ Muncul loading indicator "Memuat data proyek..."
- ✅ Data yang ditampilkan sama dengan yang disimpan sebelumnya
- ✅ Di console muncul log: "Loading project data from database"
- ✅ Di console muncul log: "Project data loaded"

## Test Case 3: Ubah Data dan Simpan Lagi

### Langkah:
1. Ubah salah satu field (misalnya Nama Rumah Sakit)
2. Klik "Simpan Perubahan"
3. Refresh halaman

### Expected Result:
- ✅ Data berhasil disimpan
- ✅ Setelah refresh, data yang ditampilkan adalah data terbaru
- ✅ Di database, field `updated_at` berubah

### Verifikasi Database:
```sql
SELECT id, hospital_name, updated_at 
FROM projects 
WHERE id = 'YOUR_PROJECT_ID'
ORDER BY updated_at DESC;
```

## Test Case 4: Reset ke Default

### Langkah:
1. Klik tombol "Reset ke Default"
2. Periksa field yang ditampilkan

### Expected Result:
- ✅ Semua field kembali ke nilai default:
  - Nama Rumah Sakit: "RS MIRACLES - YOGYAKARTA"
  - Nama Alat: "Alat Analyzer Kimia"
  - Departemen: "Laboratorium Klinik"
  - Copyright: "© Copyright Mukhsin Hadi"
- ✅ Data belum tersimpan (hanya di form)
- ✅ Klik "Simpan Perubahan" untuk menyimpan nilai default

## Test Case 5: Error Handling

### Langkah:
1. Matikan koneksi internet atau Supabase
2. Ubah data dan klik "Simpan Perubahan"

### Expected Result:
- ✅ Muncul notifikasi merah dengan error message
- ✅ Di console muncul error log
- ✅ Data tidak hilang dari form (masih bisa diedit)

## Test Case 6: Multi-Device/Browser

### Langkah:
1. Login di browser pertama dan simpan data
2. Buka browser kedua (atau incognito mode)
3. Login dengan user yang sama
4. Buka menu "Pengaturan Proyek"

### Expected Result:
- ✅ Data yang ditampilkan sama di kedua browser
- ✅ Ubah data di browser pertama dan simpan
- ✅ Refresh browser kedua
- ✅ Data di browser kedua ikut berubah

## Test Case 7: Logout dan Login Lagi

### Langkah:
1. Simpan data di "Pengaturan Proyek"
2. Logout dari aplikasi
3. Login lagi dengan user yang sama
4. Buka menu "Pengaturan Proyek"

### Expected Result:
- ✅ Data yang ditampilkan sama dengan sebelum logout
- ✅ Project ID tetap sama

## Test Case 8: Integrasi dengan Header

### Langkah:
1. Ubah data di "Pengaturan Proyek"
2. Klik "Simpan Perubahan"
3. Periksa header aplikasi

### Expected Result:
- ✅ Header menampilkan data yang baru
- ✅ Nama alat dan departemen di header berubah sesuai input

## Test Case 9: Integrasi dengan Analisis

### Langkah:
1. Ubah data di "Pengaturan Proyek" dan simpan
2. Buka menu "Analisis Capex"
3. Lakukan perhitungan
4. Periksa hasil di "Laporan & Grafik"

### Expected Result:
- ✅ Laporan menampilkan project info yang baru
- ✅ Export PDF/Excel menggunakan project info yang baru

## Test Case 10: Console Logging

### Langkah:
1. Buka Developer Console (F12)
2. Lakukan semua operasi di atas
3. Periksa log yang muncul

### Expected Log Messages:
- ✅ "Loading project data from database, ID: xxx"
- ✅ "Project data loaded: {...}"
- ✅ "Saving project... {currentProjectId: xxx, localInfo: {...}}"
- ✅ "Updating existing project: xxx" atau "Creating new project for user: xxx"
- ✅ "Project updated successfully: {...}" atau "Project created successfully: {...}"

## Verifikasi Database Lengkap

Jalankan query berikut di Supabase SQL Editor:

```sql
-- 1. Cek project terbaru
SELECT * FROM projects ORDER BY updated_at DESC LIMIT 5;

-- 2. Cek apakah updated_at berubah setelah update
SELECT 
  id,
  hospital_name,
  equipment_name,
  created_at,
  updated_at,
  EXTRACT(EPOCH FROM (updated_at - created_at)) / 60 as minutes_between_create_update
FROM projects
ORDER BY updated_at DESC
LIMIT 5;

-- 3. Cek project dengan user info
SELECT 
  p.*,
  u.email,
  u.full_name
FROM projects p
JOIN users u ON p.user_id = u.id
ORDER BY p.updated_at DESC
LIMIT 5;
```

## Hasil Testing

| Test Case | Status | Catatan |
|-----------|--------|---------|
| 1. Simpan Data Baru | ⏳ Pending | |
| 2. Refresh Halaman | ⏳ Pending | |
| 3. Ubah Data dan Simpan Lagi | ⏳ Pending | |
| 4. Reset ke Default | ⏳ Pending | |
| 5. Error Handling | ⏳ Pending | |
| 6. Multi-Device/Browser | ⏳ Pending | |
| 7. Logout dan Login Lagi | ⏳ Pending | |
| 8. Integrasi dengan Header | ⏳ Pending | |
| 9. Integrasi dengan Analisis | ⏳ Pending | |
| 10. Console Logging | ⏳ Pending | |

## Catatan Tambahan

- Pastikan untuk memeriksa console log di setiap langkah
- Jika ada error, catat error message lengkap
- Verifikasi database setelah setiap operasi save
- Test dengan koneksi internet yang stabil
- Test juga dengan koneksi lambat untuk melihat loading state

## Troubleshooting

### Masalah: Data tidak tersimpan
- Cek console untuk error message
- Cek apakah user sudah login
- Cek apakah currentProjectId ada
- Verifikasi koneksi ke Supabase

### Masalah: Data hilang setelah refresh
- Cek apakah data benar-benar tersimpan di database
- Cek localStorage untuk currentProjectId
- Cek console log saat loading data

### Masalah: Loading terus-menerus
- Cek apakah ada infinite loop di useEffect
- Cek network tab untuk request yang berulang
- Cek console untuk error
