# Checklist Testing Update Database

## Persiapan
- [ ] Pastikan dev server berjalan (`npm run dev`)
- [ ] Pastikan sudah login ke aplikasi
- [ ] Buka browser console untuk melihat log

## Test 1: Update Data di Pengaturan

### Langkah-langkah:
1. [ ] Buka menu "Pengaturan Proyek"
2. [ ] Catat data awal yang ditampilkan
3. [ ] Edit semua field:
   - [ ] Hospital Name: ubah menjadi "RS TEST UPDATE"
   - [ ] Equipment Name: ubah menjadi "Alat TEST"
   - [ ] Department: ubah menjadi "Dept TEST"
   - [ ] Copyright: ubah menjadi "© Test Copyright"
4. [ ] Klik tombol "Simpan Perubahan"
5. [ ] Tunggu notifikasi "Pengaturan berhasil disimpan ke database"
6. [ ] Periksa console log - harus ada:
   ```
   === SAVE PROJECT START ===
   === updateProject START ===
   Supabase response: { data: {...}, error: null }
   === updateProject END ===
   === SAVE PROJECT SUCCESS ===
   ```

### Verifikasi Langsung:
7. [ ] Refresh halaman (F5)
8. [ ] Buka kembali menu "Pengaturan Proyek"
9. [ ] **VERIFIKASI:** Data yang baru harus tetap ada (tidak kembali ke data lama)

### Expected Result:
✅ Data yang diedit tersimpan
✅ Setelah refresh, data baru masih ada
✅ Tidak ada error di console

## Test 2: Verifikasi di Database

### Menggunakan Supabase Dashboard:
1. [ ] Buka Supabase Dashboard
2. [ ] Pilih Table Editor → projects
3. [ ] Cari row dengan project_id yang sedang digunakan
4. [ ] **VERIFIKASI:** Data di database sama dengan yang di aplikasi
5. [ ] Periksa kolom `updated_at` - harus berubah ke waktu terbaru

### Menggunakan SQL Query:
```sql
SELECT 
  id,
  hospital_name,
  equipment_name,
  department,
  copyright,
  updated_at
FROM projects
ORDER BY updated_at DESC
LIMIT 5;
```

6. [ ] Jalankan query di SQL Editor
7. [ ] **VERIFIKASI:** Data terbaru ada di hasil query

## Test 3: Update Berulang

### Langkah-langkah:
1. [ ] Edit data lagi dengan nilai berbeda
2. [ ] Simpan
3. [ ] Refresh halaman
4. [ ] **VERIFIKASI:** Data update kedua tersimpan
5. [ ] Ulangi 2-3 kali
6. [ ] **VERIFIKASI:** Setiap update tersimpan dengan benar

## Test 4: Test dengan Test File HTML

### Langkah-langkah:
1. [ ] Buka file `test_project_update.html` di browser
2. [ ] Klik "Load Project" - harus load data terbaru
3. [ ] Edit field yang tersedia
4. [ ] Klik "Update Project"
5. [ ] **VERIFIKASI:** Muncul "Project updated successfully!"
6. [ ] Klik "Verify Update"
7. [ ] **VERIFIKASI:** Data di database sudah berubah

## Test 5: Test Multi-User (Optional)

### Jika ada 2 user:
1. [ ] User A: Edit dan simpan data
2. [ ] User B: Refresh halaman
3. [ ] **VERIFIKASI:** User B tidak melihat perubahan User A (karena beda project)
4. [ ] User A: Refresh halaman
5. [ ] **VERIFIKASI:** User A melihat data yang baru disimpan

## Test 6: Test Error Handling

### Test koneksi error:
1. [ ] Matikan internet/koneksi
2. [ ] Edit data dan coba simpan
3. [ ] **VERIFIKASI:** Muncul error message yang jelas
4. [ ] Nyalakan kembali koneksi
5. [ ] Simpan lagi
6. [ ] **VERIFIKASI:** Data tersimpan dengan benar

## Checklist Hasil

### ✅ Semua Test Passed Jika:
- [ ] Data yang diedit tersimpan ke database
- [ ] Setelah refresh, data baru tetap ada
- [ ] Tidak ada infinite loop atau error di console
- [ ] `updated_at` berubah setiap kali update
- [ ] Parent state dan local state sinkron
- [ ] localStorage juga ter-update

### ❌ Test Failed Jika:
- [ ] Data kembali ke nilai lama setelah refresh
- [ ] Ada error di console
- [ ] Data di database tidak berubah
- [ ] Infinite loop terjadi
- [ ] Notifikasi error muncul padahal seharusnya berhasil

## Troubleshooting

### Jika data tidak tersimpan:
1. Periksa console log untuk error
2. Periksa network tab untuk request ke Supabase
3. Periksa RLS policies di Supabase
4. Periksa apakah user_id dan project_id benar

### Jika data kembali ke nilai lama:
1. Periksa apakah ada useEffect yang overwrite state
2. Periksa apakah parent state di-update saat load
3. Periksa dependency array useEffect

### Jika infinite loop:
1. Periksa dependency array useEffect
2. Pastikan tidak ada circular update antara parent dan child state

## Status Testing
- [ ] Test 1: Update Data di Pengaturan
- [ ] Test 2: Verifikasi di Database
- [ ] Test 3: Update Berulang
- [ ] Test 4: Test dengan Test File HTML
- [ ] Test 5: Test Multi-User (Optional)
- [ ] Test 6: Test Error Handling

## Catatan Testing
_Tulis catatan atau issue yang ditemukan saat testing di sini_

---

**Tanggal Testing:** _________________
**Tester:** _________________
**Status:** [ ] PASSED / [ ] FAILED
