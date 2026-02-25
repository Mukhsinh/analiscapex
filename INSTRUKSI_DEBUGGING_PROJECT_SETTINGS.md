# Instruksi Debugging - Project Settings

## 🔍 Masalah
Data di halaman Pengaturan Proyek menampilkan "Pengaturan berhasil disimpan!" tetapi tidak tersimpan ke database.

## ✅ Yang Sudah Diperbaiki

1. ✅ RLS (Row Level Security) sudah enabled
2. ✅ RLS Policies sudah dibuat untuk semua operasi
3. ✅ Anon role sudah punya semua privileges
4. ✅ Test insert dari server berhasil
5. ✅ Enhanced logging ditambahkan di kode

## 📋 Langkah Testing

### Opsi 1: Test dengan File HTML (Paling Mudah)

1. **Buka file** `test_supabase_insert.html` di browser
2. **Klik tombol** "Test Insert Project"
3. **Lihat hasil**:
   - ✅ Hijau = Insert berhasil
   - ❌ Merah = Ada error
4. **Klik tombol** "Test Select Projects" untuk melihat data yang tersimpan

File ini akan test insert langsung ke database menggunakan anon key (sama seperti aplikasi).

### Opsi 2: Test di Aplikasi dengan Console Logging

1. **Refresh aplikasi** (Ctrl+F5 atau Cmd+Shift+R)
2. **Buka Developer Console** (F12 atau Ctrl+Shift+I)
3. **Pilih tab Console**
4. **Clear console** (Ctrl+L)
5. **Login** ke aplikasi
6. **Buka menu** "Pengaturan Proyek"
7. **Isi form** dengan data test
8. **Klik** "Simpan Perubahan"
9. **Perhatikan console logs**

### Console Logs yang Diharapkan

#### Jika Berhasil:
```
=== SAVE PROJECT START ===
User: {id: "125f7954-f022-4fd2-8f23-39cf679f271a", ...}
User ID: 125f7954-f022-4fd2-8f23-39cf679f271a
Current Project ID: null
Local Info: {hospitalName: "CR - Radiologi", ...}
User is logged in, saving to database...
Creating new project for user: 125f7954-f022-4fd2-8f23-39cf679f271a
=== createProject START ===
userId: 125f7954-f022-4fd2-8f23-39cf679f271a
projectData: {hospitalName: "CR - Radiologi", ...}
insertData: {user_id: "125f7954-f022-4fd2-8f23-39cf679f271a", ...}
Supabase response: {data: {id: "...", ...}, error: null}
=== createProject END ===
Create response: {data: {id: "...", ...}, error: null}
Project created successfully: {id: "...", ...}
Setting current project ID: ...
=== SAVE PROJECT SUCCESS ===
```

#### Jika Ada Error:
```
=== SAVE PROJECT START ===
...
=== SAVE PROJECT ERROR ===
Error saving project: [error message]
Error details: {
  message: "...",
  code: "...",
  details: "...",
  hint: "..."
}
```

## 🐛 Kemungkinan Error dan Solusi

### Error 1: User ID is undefined
**Console Log:**
```
User ID: undefined
```

**Penyebab:** User tidak login atau session hilang

**Solusi:**
1. Logout dari aplikasi
2. Clear localStorage (Console: `localStorage.clear()`)
3. Login ulang
4. Test lagi

### Error 2: RLS Policy Violation
**Console Log:**
```
Error details: {
  code: "42501",
  message: "new row violates row-level security policy"
}
```

**Penyebab:** RLS policy tidak mengizinkan insert

**Solusi:** Sudah diperbaiki, tapi jika masih error:
```sql
-- Cek policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'projects';
```

### Error 3: Network Error
**Console Log:**
```
Error: Failed to fetch
```

**Penyebab:** Koneksi ke Supabase gagal

**Solusi:**
1. Cek koneksi internet
2. Cek apakah Supabase URL dan anon key benar di `src/lib/supabase.js`
3. Cek Network tab di DevTools untuk melihat request yang gagal

### Error 4: Invalid Input
**Console Log:**
```
Error details: {
  code: "23502",
  message: "null value in column ... violates not-null constraint"
}
```

**Penyebab:** Ada field required yang kosong

**Solusi:** Pastikan semua field terisi:
- Hospital Name
- Equipment Name
- Department
- Copyright

## 📊 Verifikasi di Database

Setelah insert berhasil, verifikasi di Supabase Dashboard:

1. Buka https://supabase.com/dashboard/project/mwrlfsdyblxqxetqxwhp/editor
2. Pilih tabel `projects`
3. Seharusnya ada record baru dengan:
   - `user_id`: 125f7954-f022-4fd2-8f23-39cf679f271a
   - `hospital_name`: sesuai input
   - `equipment_name`: sesuai input
   - `department`: sesuai input
   - `copyright`: sesuai input
   - `created_at`: timestamp terbaru

## 🔧 Debugging Tools

### 1. Check User Session
Buka Console dan jalankan:
```javascript
console.log('User:', JSON.parse(localStorage.getItem('user')))
```

Expected output:
```javascript
{
  id: "125f7954-f022-4fd2-8f23-39cf679f271a",
  email: "mukhsin9@gmail.com",
  fullName: "Mukhsin Hadi"
}
```

### 2. Check Project ID
```javascript
console.log('Project ID:', localStorage.getItem('currentProjectId'))
```

### 3. Check Project Info
```javascript
console.log('Project Info:', JSON.parse(localStorage.getItem('projectInfo')))
```

### 4. Test Supabase Connection
```javascript
const { createClient } = supabase
const supabaseUrl = 'https://mwrlfsdyblxqxetqxwhp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cmxmc2R5Ymx4cXhldHF4d2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzA5NTksImV4cCI6MjA4NzU0Njk1OX0.8tUPNjjbVdXJX-2c0TC9Nlg-CJWArTtVl4Ib7K0CwC0'
const client = createClient(supabaseUrl, supabaseKey)

// Test select
client.from('projects').select('*').limit(1).then(console.log)
```

## 📝 Laporan Error

Jika masih ada masalah, laporkan dengan informasi berikut:

1. **Screenshot Console Logs** (semua log dari === SAVE PROJECT START === sampai END/ERROR)
2. **Screenshot Network Tab** (filter: supabase.co)
3. **Data yang diinput** di form
4. **Browser dan versi** yang digunakan
5. **Error message** yang muncul (jika ada)

## 📄 File yang Dimodifikasi

1. `src/components/ProjectSettings.jsx` - Enhanced logging
2. `src/lib/database.js` - Enhanced logging di createProject dan updateProject
3. `test_supabase_insert.html` - Test file untuk debugging

## 🚀 Next Steps

1. **Test dengan file HTML** terlebih dahulu untuk memastikan insert berfungsi
2. **Jika HTML test berhasil** tapi aplikasi gagal, berarti masalah di aplikasi (bukan database)
3. **Jika HTML test gagal**, berarti masalah di RLS atau permissions
4. **Screenshot console logs** dan laporkan hasil testing

---

**Status:** ✅ Siap untuk testing dengan enhanced logging
