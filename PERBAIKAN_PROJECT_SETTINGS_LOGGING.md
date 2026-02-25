# Perbaikan Project Settings - Enhanced Logging

## Masalah
User melaporkan bahwa data di halaman Pengaturan Proyek menampilkan notifikasi "Pengaturan berhasil disimpan!" tetapi data tidak tersimpan ke database.

## Investigasi

### 1. Cek Database
- ✅ Tabel `users` ada data: user `mukhsin9@gmail.com` dengan ID `125f7954-f022-4fd2-8f23-39cf679f271a`
- ❌ Tabel `projects` kosong - tidak ada data

### 2. Cek RLS dan Permissions
- ✅ RLS sudah enabled pada semua tabel
- ✅ RLS policies sudah dibuat (SELECT, INSERT, UPDATE, DELETE)
- ✅ Anon role memiliki semua privileges (INSERT, SELECT, UPDATE, DELETE)
- ✅ Test insert dari server side berhasil

### 3. Kemungkinan Penyebab
Karena semua konfigurasi database sudah benar, kemungkinan masalahnya adalah:
1. **Error tidak tertangkap** di client-side
2. **User ID tidak terdeteksi** saat save
3. **Silent failure** tanpa error message yang jelas

## Solusi yang Diterapkan

### 1. Enhanced Logging di ProjectSettings.jsx

Menambahkan logging detail di fungsi `handleSave`:

```javascript
console.log('=== SAVE PROJECT START ===')
console.log('User:', user)
console.log('User ID:', user?.id)
console.log('Current Project ID:', currentProjectId)
console.log('Local Info:', localInfo)
```

Dan di setiap step:
- Log saat create/update project
- Log response dari Supabase
- Log error dengan detail lengkap (message, code, details, hint)
- Log success dengan project ID

### 2. Enhanced Logging di database.js

#### createProject Function
```javascript
console.log('=== createProject START ===')
console.log('userId:', userId)
console.log('projectData:', projectData)
console.log('insertData:', insertData)
console.log('Supabase response:', { data, error })
console.log('=== createProject END ===')
```

#### updateProject Function
```javascript
console.log('=== updateProject START ===')
console.log('projectId:', projectId)
console.log('updates:', updates)
console.log('updateData:', updateData)
console.log('Supabase response:', { data, error })
console.log('=== updateProject END ===')
```

### 3. Better Error Handling

Menambahkan error details yang lebih lengkap:
```javascript
console.error('Error details:', {
  message: err.message,
  code: err.code,
  details: err.details,
  hint: err.hint
})
```

## Cara Testing

### 1. Buka Browser Console
- Tekan F12 atau Ctrl+Shift+I
- Pilih tab "Console"
- Clear console (Ctrl+L)

### 2. Login ke Aplikasi
- Login dengan email: `mukhsin9@gmail.com`
- Password: `Jlamprang233!!`
- Perhatikan console untuk log messages

### 3. Buka Halaman Pengaturan
- Klik menu "Pengaturan Proyek"
- Isi form dengan data:
  - Nama Rumah Sakit: `CR - Radiologi`
  - Nama Alat: `Test Equipment`
  - Departemen: `Radiologi`
  - Copyright: `© Copyright Mukhsin Hadi`

### 4. Klik Simpan Perubahan
Perhatikan console log yang muncul:

#### Expected Logs (Success):
```
=== SAVE PROJECT START ===
User: {id: "125f7954-f022-4fd2-8f23-39cf679f271a", email: "mukhsin9@gmail.com", ...}
User ID: 125f7954-f022-4fd2-8f23-39cf679f271a
Current Project ID: null (atau UUID jika update)
Local Info: {hospitalName: "CR - Radiologi", ...}
User is logged in, saving to database...
Creating new project for user: 125f7954-f022-4fd2-8f23-39cf679f271a
=== createProject START ===
userId: 125f7954-f022-4fd2-8f23-39cf679f271a
projectData: {hospitalName: "CR - Radiologi", ...}
insertData: {user_id: "125f7954-f022-4fd2-8f23-39cf679f271a", ...}
Supabase response: {data: {...}, error: null}
=== createProject END ===
Create response: {data: {...}, error: null}
Project created successfully: {id: "...", ...}
Setting current project ID: ...
=== SAVE PROJECT SUCCESS ===
```

#### Expected Logs (Error):
```
=== SAVE PROJECT START ===
...
=== SAVE PROJECT ERROR ===
Error saving project: ...
Error details: {message: "...", code: "...", ...}
```

### 5. Verifikasi di Database
Setelah save berhasil, cek di Supabase Dashboard:
- Buka tabel `projects`
- Seharusnya ada 1 record baru dengan data yang diinput

## Kemungkinan Error dan Solusi

### Error 1: "User ID is undefined"
**Penyebab**: User tidak login atau session hilang
**Solusi**: 
- Logout dan login ulang
- Clear localStorage dan login ulang

### Error 2: "RLS policy violation"
**Penyebab**: RLS policy tidak mengizinkan insert
**Solusi**: 
- Sudah diperbaiki dengan policies yang permisif
- Jika masih error, cek policies dengan query:
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public' AND tablename = 'projects';
```

### Error 3: "No data returned from createProject"
**Penyebab**: Insert berhasil tapi tidak return data
**Solusi**: 
- Cek apakah `.select().single()` ada di query
- Sudah diperbaiki di kode

### Error 4: "Permission denied"
**Penyebab**: Anon role tidak punya akses
**Solusi**: 
- Sudah diperbaiki dengan GRANT ALL
- Verifikasi dengan:
```sql
SELECT * FROM information_schema.role_table_grants 
WHERE grantee = 'anon' AND table_name = 'projects';
```

## File yang Dimodifikasi

1. `src/components/ProjectSettings.jsx`
   - Enhanced logging di handleSave
   - Better error handling
   - More detailed console logs

2. `src/lib/database.js`
   - Enhanced logging di createProject
   - Enhanced logging di updateProject
   - Better error details

## Next Steps

1. **User harus test** dengan langkah-langkah di atas
2. **Screenshot console logs** jika masih ada error
3. **Laporkan error message** yang muncul di console
4. **Cek Network tab** untuk melihat request/response dari Supabase

## Status

✅ **LOGGING ENHANCED** - Siap untuk testing dan debugging

Silakan test ulang dan perhatikan console logs untuk menemukan penyebab masalah yang sebenarnya.
