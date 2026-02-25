# Checklist Testing Insert Data ke Database - Final

## Status: ✅ RLS POLICIES SUDAH DIPERBAIKI

Tanggal: 25 Februari 2026

## Perbaikan yang Sudah Dilakukan

### 1. ✅ RLS Policies Diperbaiki
- Menghapus policies lama yang restrictive
- Membuat policies baru yang permissive untuk semua tabel
- Policies mengizinkan semua operasi (SELECT, INSERT, UPDATE, DELETE) untuk role `public`

### 2. ✅ Test Insert Berhasil
```sql
INSERT INTO projects (user_id, hospital_name, equipment_name, department, copyright)
VALUES ('125f7954-f022-4fd2-8f23-39cf679f271a', 'Test Hospital', 'Test Equipment', 'Test Department', '© Test')
RETURNING *;
-- ✅ BERHASIL
```

## Testing di Aplikasi

### A. Test Login
- [ ] Buka aplikasi di browser
- [ ] Login dengan email: `mukhsin9@gmail.com`
- [ ] Password: `Jlamprang233!!`
- [ ] Verifikasi login berhasil dan redirect ke halaman analisis
- [ ] Cek console browser untuk log user data
- [ ] Verifikasi user.id tersimpan di localStorage

**Expected Result:**
```javascript
User: { id: "125f7954-f022-4fd2-8f23-39cf679f271a", email: "mukhsin9@gmail.com", fullName: "Mukhsin Hadi" }
```

### B. Test Project Settings
- [ ] Klik menu "Pengaturan Proyek"
- [ ] Isi form dengan data:
  - Nama RS: `RS Test - Jakarta`
  - Nama Alat: `CT Scan 64 Slice`
  - Departemen: `Radiologi`
  - Copyright: `© Test User`
- [ ] Klik "Simpan Perubahan"
- [ ] Verifikasi muncul notifikasi sukses: "Pengaturan berhasil disimpan ke database!"
- [ ] Cek console browser untuk log:
  ```
  === createProject START ===
  Project created: { id: "...", ... }
  === createProject END ===
  ```
- [ ] Refresh halaman dan verifikasi data tetap ada

**Verifikasi di Database:**
```sql
SELECT * FROM projects 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY created_at DESC 
LIMIT 1;
```

### C. Test Form Input - Leasing
- [ ] Klik menu "Analisis Capex"
- [ ] Pilih tab "A. Leasing"
- [ ] Isi form:
  - Monthly Payment: `300`
  - Period: `60`
  - Discount Rate: `10`
- [ ] Data auto-save ke localStorage
- [ ] Jika sudah ada project, data juga auto-save ke database

**Verifikasi di Database:**
```sql
SELECT * FROM form_inputs 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
AND form_type = 'leasing'
ORDER BY updated_at DESC 
LIMIT 1;
```

### D. Test Form Input - Purchase
- [ ] Pilih tab "B. Borrow & Purchase"
- [ ] Isi form:
  - Loan Amount: `1500`
  - Interest Rate: `12`
  - Period: `5`
  - Maintenance Cost: `25`
  - Residual Value: `150`
  - Discount Rate: `10`
- [ ] Data auto-save

**Verifikasi di Database:**
```sql
SELECT * FROM form_inputs 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
AND form_type = 'purchase'
ORDER BY updated_at DESC 
LIMIT 1;
```

### E. Test Form Input - Revenue Share
- [ ] Pilih tab "C. Revenue Sharing"
- [ ] Isi form:
  - RS Share: `20`
  - Supplier Share: `80`
  - Direct Overhead: `1800`
  - Allocated Overhead: `300`
  - Tax Rate: `15`
  - Discount Rate: `10`
  - Period: `5`
- [ ] Tambah prosedur:
  - Nama: `MRI Brain`
  - Tarif: `2000000`
  - Volume: `1000`
- [ ] Data auto-save

**Verifikasi di Database:**
```sql
SELECT * FROM form_inputs 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
AND form_type = 'revenueShare'
ORDER BY updated_at DESC 
LIMIT 1;
```

### F. Test Calculate & Save Complete Analysis
- [ ] Pastikan semua form sudah diisi
- [ ] Klik tombol "Hitung & Bandingkan Semua Alternatif"
- [ ] Verifikasi tombol berubah menjadi "Menyimpan..." dengan spinner
- [ ] Tunggu proses selesai
- [ ] Verifikasi muncul notifikasi: "Analisis berhasil disimpan ke database"
- [ ] Cek console browser untuk log lengkap:
  ```
  === createProject START ===
  Project created: ...
  Saving form inputs...
  Saving analysis results...
  leasing analysis saved: ...
  purchase analysis saved: ...
  revenueShare analysis saved: ...
  Saving detailed analysis results...
  Detailed analysis saved successfully
  Saving revenue share procedures...
  Procedures saved successfully
  Saving recommendation...
  Recommendation saved successfully
  All data saved successfully!
  ```
- [ ] Verifikasi hasil perhitungan muncul di bawah form

**Verifikasi di Database:**

1. **Projects**
```sql
SELECT * FROM projects 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY created_at DESC 
LIMIT 1;
```

2. **Analysis Results** (harus ada 3 records: leasing, purchase, revenueShare)
```sql
SELECT id, analysis_type, created_at 
FROM analysis_results 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY created_at DESC 
LIMIT 3;
```

3. **Detailed Analysis Results**
```sql
SELECT * FROM detailed_analysis_results 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY created_at DESC 
LIMIT 1;
```

4. **Recommendations**
```sql
SELECT * FROM analysis_recommendations 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY created_at DESC 
LIMIT 1;
```

5. **Revenue Share Procedures**
```sql
SELECT * FROM revenue_share_procedures 
WHERE user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY created_at DESC;
```

6. **Yearly Breakdown**
```sql
SELECT ar.analysis_type, ayb.year, ayb.pv_expense
FROM analysis_yearly_breakdown ayb
JOIN analysis_results ar ON ar.id = ayb.analysis_result_id
WHERE ar.user_id = '125f7954-f022-4fd2-8f23-39cf679f271a'
ORDER BY ar.created_at DESC, ayb.year;
```

### G. Test Load Data After Refresh
- [ ] Refresh halaman browser (F5)
- [ ] Verifikasi user tetap login
- [ ] Verifikasi project info tetap ada di header
- [ ] Verifikasi form inputs tetap ada di semua tab
- [ ] Verifikasi hasil perhitungan tetap ditampilkan

### H. Test Riwayat Analisis
- [ ] Klik menu "Riwayat Analisis"
- [ ] Verifikasi daftar analisis muncul
- [ ] Verifikasi data sesuai dengan yang disimpan
- [ ] Test klik detail untuk melihat hasil lengkap

### I. Test Laporan & Grafik
- [ ] Klik menu "Laporan & Grafik"
- [ ] Verifikasi grafik muncul dengan data yang benar
- [ ] Test export PDF
- [ ] Test export Excel

## Troubleshooting

### Jika Insert Gagal

1. **Cek Console Browser**
   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error messages
   - Cari log yang dimulai dengan `===`

2. **Cek Network Tab**
   - Buka tab Network di Developer Tools
   - Filter: `supabase`
   - Lihat request yang gagal (status code 4xx atau 5xx)
   - Cek response body untuk error detail

3. **Cek Supabase Logs**
   ```bash
   # Di terminal
   supabase logs api
   ```

4. **Cek RLS Policies**
   ```sql
   SELECT tablename, policyname, cmd, qual, with_check
   FROM pg_policies 
   WHERE tablename = 'projects';
   ```
   Expected: `qual: "true"`, `with_check: "true"`

5. **Test Direct Insert**
   ```sql
   INSERT INTO projects (
     user_id, 
     hospital_name, 
     equipment_name, 
     department
   ) VALUES (
     '125f7954-f022-4fd2-8f23-39cf679f271a',
     'Direct Test',
     'Direct Test',
     'Direct Test'
   ) RETURNING *;
   ```

### Common Issues

1. **User ID tidak ada**
   - Cek: `localStorage.getItem('user')`
   - Solusi: Login ulang

2. **Project ID tidak ada**
   - Cek: `localStorage.getItem('currentProjectId')`
   - Solusi: Simpan project settings dulu

3. **RLS Policy Error**
   - Error: "new row violates row-level security policy"
   - Solusi: Jalankan migration `fix_rls_policies_for_anonymous_users` lagi

4. **Network Error**
   - Error: "Failed to fetch"
   - Cek: Koneksi internet
   - Cek: Supabase URL dan API key di `.env`

## Hasil Testing

### Test 1: Login
- Status: [ ] Pass / [ ] Fail
- Notes: 

### Test 2: Project Settings
- Status: [ ] Pass / [ ] Fail
- Notes: 

### Test 3: Form Inputs
- Status: [ ] Pass / [ ] Fail
- Notes: 

### Test 4: Calculate & Save
- Status: [ ] Pass / [ ] Fail
- Notes: 

### Test 5: Load After Refresh
- Status: [ ] Pass / [ ] Fail
- Notes: 

### Test 6: Riwayat Analisis
- Status: [ ] Pass / [ ] Fail
- Notes: 

### Test 7: Laporan & Grafik
- Status: [ ] Pass / [ ] Fail
- Notes: 

## Summary

- Total Tests: 7
- Passed: 
- Failed: 
- Blocked: 

## Sign-off

- Tested by: 
- Date: 
- Status: [ ] Approved / [ ] Needs Fixes

## Next Steps

Setelah semua test pass:
1. [ ] Deploy ke production
2. [ ] Monitor logs untuk 24 jam pertama
3. [ ] Backup database
4. [ ] Update dokumentasi user
5. [ ] Training untuk end users
