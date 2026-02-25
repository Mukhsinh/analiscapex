# Instruksi Testing Aplikasi - Setelah Perbaikan Database

## ✅ Status: RLS Policies Sudah Diperbaiki

Database sudah siap menerima data dari aplikasi!

## Langkah Testing

### 1. Start Development Server

```powershell
npm run dev
```

Tunggu sampai muncul:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

### 2. Buka Aplikasi di Browser

Buka: `http://localhost:5173/`

### 3. Login

- Email: `mukhsin9@gmail.com`
- Password: `Jlamprang233!!`
- Klik "Masuk"

**Expected:** Redirect ke halaman Analisis Capex

### 4. Atur Project Settings (PENTING!)

1. Klik menu "⚙️ Pengaturan Proyek" di sidebar
2. Isi form:
   - Nama RS: `RS MIRACLES - YOGYAKARTA`
   - Nama Alat: `Alat Analyzer Kimia`
   - Departemen: `Laboratorium Klinik`
   - Copyright: `© Copyright Mukhsin Hadi`
3. Klik "Simpan Perubahan"
4. **Verifikasi:** Muncul notifikasi hijau "Pengaturan berhasil disimpan ke database!"

**Cek Console Browser (F12):**
```
=== createProject START ===
Project created: { id: "...", ... }
=== createProject END ===
```

### 5. Isi Form Leasing

1. Klik menu "📊 Analisis Capex"
2. Tab "A. Leasing" (sudah aktif)
3. Isi form:
   - Monthly Payment: `280` (juta)
   - Period: `60` (bulan)
   - Discount Rate: `10` (%)

Data akan auto-save ke localStorage dan database.

### 6. Isi Form Purchase

1. Klik tab "B. Borrow & Purchase"
2. Isi form:
   - Loan Amount: `1300` (juta)
   - Interest Rate: `10` (%)
   - Period: `5` (tahun)
   - Maintenance Cost: `20` (juta/tahun)
   - Residual Value: `130` (juta)
   - Discount Rate: `10` (%)

### 7. Isi Form Revenue Share

1. Klik tab "C. Revenue Sharing"
2. Isi form:
   - RS Share: `15` (%)
   - Supplier Share: `85` (%)
   - Direct Overhead: `1632` (juta/tahun)
   - Allocated Overhead: `240` (juta/tahun)
   - Tax Rate: `15` (%)
   - Discount Rate: `10` (%)
   - Period: `5` (tahun)

3. Procedures (sudah ada default):
   - Darah Rutin: Tarif 150,000, Volume 68,664
   - Creatinin: Tarif 150,000, Volume 32,208
   - Urea / BUN: Tarif 150,000, Volume 30,624

### 8. Hitung & Simpan Analisis

1. Scroll ke bawah
2. Klik tombol besar "🧮 Hitung & Bandingkan Semua Alternatif"
3. **Verifikasi:** Tombol berubah jadi "Menyimpan..." dengan spinner
4. Tunggu beberapa detik
5. **Verifikasi:** Muncul notifikasi hijau "Analisis berhasil disimpan ke database"
6. **Verifikasi:** Hasil perhitungan muncul di bawah

**Cek Console Browser (F12):**
```
Starting to save analysis to database...
User ID: 125f7954-f022-4fd2-8f23-39cf679f271a
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

### 9. Verifikasi Data di Database

Buka terminal baru dan jalankan:

```powershell
.\test_database_insert.ps1
```

**Expected Output:**
```
✓ Found 1 user(s)
✓ Found 1 project(s)
✓ Found 3 form input(s)
✓ Found 3 analysis result(s)
✓ Found 1 detailed analysis
✓ Found 1 recommendation(s)
✓ Found 3 procedure(s)

✓ Database has data - Integration working!
```

### 10. Test Refresh Halaman

1. Refresh browser (F5)
2. **Verifikasi:** User tetap login
3. **Verifikasi:** Project info tetap ada di header
4. **Verifikasi:** Form inputs tetap ada di semua tab
5. **Verifikasi:** Hasil perhitungan tetap ditampilkan

### 11. Test Riwayat Analisis

1. Klik menu "📜 Riwayat Analisis"
2. **Verifikasi:** Daftar analisis muncul
3. **Verifikasi:** Data sesuai dengan yang disimpan
4. Klik salah satu untuk lihat detail

### 12. Test Laporan & Grafik

1. Klik menu "📈 Laporan & Grafik"
2. **Verifikasi:** Grafik muncul dengan data yang benar
3. Test tombol "Export PDF"
4. Test tombol "Export Excel"

## Troubleshooting

### Masalah: Notifikasi "Gagal menyimpan ke database"

**Solusi:**
1. Cek console browser (F12) untuk error detail
2. Cek apakah user sudah login (cek localStorage: `user`)
3. Cek apakah project sudah dibuat (cek localStorage: `currentProjectId`)
4. Pastikan sudah simpan Project Settings dulu

### Masalah: Data tidak muncul setelah refresh

**Solusi:**
1. Cek console untuk error saat load data
2. Jalankan `.\test_database_insert.ps1` untuk cek apakah data ada di database
3. Cek Network tab di browser untuk melihat request yang gagal

### Masalah: Error "new row violates row-level security policy"

**Solusi:**
1. RLS policies mungkin belum diterapkan
2. Jalankan migration lagi:
   ```sql
   -- Di Supabase SQL Editor atau via MCP
   -- Lihat file PERBAIKAN_RLS_POLICIES_FINAL_25_FEB_2026.md
   ```

### Masalah: User tidak bisa login

**Solusi:**
1. Pastikan email: `mukhsin9@gmail.com`
2. Pastikan password: `Jlamprang233!!`
3. Cek console untuk error
4. Cek apakah user ada di database:
   ```sql
   SELECT * FROM users WHERE email = 'mukhsin9@gmail.com';
   ```

## Checklist Testing

- [ ] Login berhasil
- [ ] Project Settings tersimpan
- [ ] Form Leasing tersimpan
- [ ] Form Purchase tersimpan
- [ ] Form Revenue Share tersimpan
- [ ] Calculate & Save berhasil
- [ ] Notifikasi sukses muncul
- [ ] Data terverifikasi di database (via script)
- [ ] Refresh halaman - data tetap ada
- [ ] Riwayat Analisis menampilkan data
- [ ] Laporan & Grafik menampilkan data
- [ ] Export PDF berhasil
- [ ] Export Excel berhasil

## Hasil Testing

**Status:** [ ] ✅ PASS / [ ] ❌ FAIL

**Notes:**
```
[Tulis catatan testing di sini]
```

**Tested by:** _______________
**Date:** _______________

## Next Steps Setelah Testing Pass

1. [ ] Commit changes ke git
2. [ ] Push ke repository
3. [ ] Deploy ke production (jika diperlukan)
4. [ ] Update dokumentasi user
5. [ ] Backup database

## Kontak

Jika ada masalah atau pertanyaan:
- Cek dokumentasi: `PERBAIKAN_RLS_POLICIES_FINAL_25_FEB_2026.md`
- Cek checklist: `CHECKLIST_TESTING_INSERT_FINAL.md`
- Cek summary: `SUMMARY_PERBAIKAN_INSERT_DATABASE.md`
