# Checklist Verifikasi Insert Data

## ✅ Persiapan

### 1. File Environment
- [x] File `.env` sudah dibuat di root folder
- [x] Berisi `VITE_SUPABASE_URL`
- [x] Berisi `VITE_SUPABASE_ANON_KEY`
- [ ] Development server sudah di-restart setelah membuat `.env`

### 2. Konfigurasi Database
- [x] Tabel `projects` sudah ada
- [x] RLS enabled pada tabel `projects`
- [x] RLS policies mengizinkan INSERT (policy: `true`)
- [x] RLS policies mengizinkan SELECT (policy: `true`)
- [x] RLS policies mengizinkan UPDATE (policy: `true`)

### 3. Kode Aplikasi
- [x] File `src/lib/supabase.js` menggunakan `import.meta.env`
- [x] File `src/lib/database.js` memiliki fungsi `createProject`
- [x] File `src/components/ProjectSettings.jsx` memanggil `createProject`
- [x] Console.log sudah ditambahkan untuk debugging

## 🔍 Testing

### Langkah 1: Restart Server
```bash
# Jalankan script PowerShell
.\restart_dev_server.ps1

# Atau manual:
# 1. Stop server (Ctrl+C)
# 2. npm run dev
```

### Langkah 2: Buka Aplikasi
- [ ] Buka http://localhost:5173
- [ ] Buka Developer Tools (F12)
- [ ] Pilih tab Console

### Langkah 3: Login
- [ ] Klik menu "Login"
- [ ] Masukkan email (contoh: test@example.com)
- [ ] Klik "Login"
- [ ] Pastikan muncul pesan "Login berhasil"
- [ ] Pastikan nama user muncul di header

### Langkah 4: Isi Form Project Settings
- [ ] Klik menu "Pengaturan Proyek"
- [ ] Isi Nama Rumah Sakit: `RS Test Insert`
- [ ] Isi Nama Alat: `Alat Test Insert`
- [ ] Isi Departemen: `Dept Test`
- [ ] Isi Copyright: `© Test 2026`

### Langkah 5: Simpan Data
- [ ] Klik tombol "Simpan Perubahan"
- [ ] Perhatikan console log di browser
- [ ] Pastikan muncul log: `=== SAVE PROJECT START ===`
- [ ] Pastikan muncul log: `User is logged in, saving to database...`
- [ ] Pastikan muncul log: `Creating new project for user: ...`
- [ ] Pastikan muncul log: `=== createProject START ===`
- [ ] Pastikan muncul log: `Supabase response: {data: {...}, error: null}`
- [ ] Pastikan muncul log: `=== SAVE PROJECT SUCCESS ===`
- [ ] Pastikan muncul pesan sukses di UI: "Pengaturan berhasil disimpan ke database!"

### Langkah 6: Verifikasi di Database
- [ ] Buka Supabase Dashboard: https://supabase.com/dashboard
- [ ] Pilih project: `analisacapex`
- [ ] Buka Table Editor
- [ ] Pilih tabel `projects`
- [ ] Lihat data terbaru (sort by `created_at` DESC)
- [ ] Pastikan data yang diinput muncul

## 🐛 Troubleshooting

### Jika Console Log Tidak Muncul
```javascript
// Tambahkan di awal fungsi handleSave di ProjectSettings.jsx
console.log('=== DEBUGGING ===')
console.log('User:', user)
console.log('User ID:', user?.id)
console.log('Current Project ID:', currentProjectId)
console.log('Local Info:', localInfo)
```

### Jika Error: "Invalid API key"
1. Periksa file `.env` ada di root folder
2. Periksa isi file `.env` benar
3. Restart development server (WAJIB!)
4. Clear browser cache (Ctrl+Shift+Delete)
5. Refresh halaman (Ctrl+F5)

### Jika Error: "new row violates row-level security policy"
```sql
-- Jalankan query ini di Supabase SQL Editor:
DROP POLICY IF EXISTS "Users can insert their own projects" ON projects;

CREATE POLICY "Users can insert their own projects"
ON projects FOR INSERT
TO public
WITH CHECK (true);
```

### Jika Data Tidak Tersimpan Tapi Tidak Ada Error
1. Periksa apakah `user.id` ada:
   - Lihat console log: `User ID: ...`
   - Jika `undefined`, login ulang

2. Periksa apakah fungsi dipanggil:
   - Lihat console log: `=== createProject START ===`
   - Jika tidak muncul, ada masalah di kondisi if

3. Periksa response Supabase:
   - Lihat console log: `Supabase response:`
   - Jika `error: {...}`, ada error dari Supabase
   - Jika `data: null`, insert gagal

## 📝 Test dengan HTML Sederhana

Jika masih gagal, test dengan file HTML sederhana:

```bash
# Buka file test_insert_debug.html di browser
# Klik tombol "Test Insert"
# Lihat hasil di console dan halaman
```

Jika test HTML berhasil tapi aplikasi React gagal, berarti masalah di:
- Environment variables tidak terbaca
- User state tidak ter-set dengan benar
- Kondisi if yang salah

## ✅ Kriteria Sukses

Insert data berhasil jika:
1. ✅ Console log menunjukkan `=== SAVE PROJECT SUCCESS ===`
2. ✅ UI menampilkan pesan "Pengaturan berhasil disimpan ke database!"
3. ✅ Data muncul di Supabase Dashboard
4. ✅ Tidak ada error di console
5. ✅ `currentProjectId` ter-set dengan UUID baru

## 📊 Monitoring

### Console Logs yang Harus Muncul (Urutan)
```
1. === SAVE PROJECT START ===
2. User: {id: "...", email: "..."}
3. User ID: ...
4. Current Project ID: null
5. Local Info: {...}
6. User is logged in, saving to database...
7. Creating new project for user: ...
8. === createProject START ===
9. userId: ...
10. projectData: {...}
11. insertData: {...}
12. Supabase response: {data: {...}, error: null}
13. === createProject END ===
14. Project created successfully: {...}
15. Setting current project ID: ...
16. === SAVE PROJECT SUCCESS ===
```

### Network Requests yang Harus Muncul
Di tab Network (filter: supabase.co):
1. POST request ke `/rest/v1/projects`
2. Status: 201 Created
3. Response: JSON dengan data project baru

## 🎯 Next Steps Setelah Berhasil

Setelah insert berhasil:
1. Test update data (ubah form, simpan lagi)
2. Test refresh halaman (data harus tetap ada)
3. Test logout dan login lagi (data harus tetap ada)
4. Test dari device/browser lain (data harus sinkron)

## 📞 Bantuan

Jika masih ada masalah setelah mengikuti checklist ini:
1. Screenshot console log lengkap
2. Screenshot network tab
3. Screenshot error message
4. Kirimkan untuk analisis lebih lanjut
