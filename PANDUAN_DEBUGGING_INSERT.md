# Panduan Debugging Insert Data ke Database

## Status Saat Ini

✅ File `.env` sudah dibuat dengan kredensial yang benar
✅ RLS Policies sudah dikonfigurasi dengan benar (mengizinkan semua operasi)
✅ Struktur tabel `projects` sudah sesuai
✅ Koneksi Supabase sudah dikonfigurasi

## Langkah-Langkah Debugging

### 1. Restart Development Server

**PENTING:** Setelah membuat file `.env`, Anda HARUS restart development server agar environment variables terbaca.

```bash
# Stop server yang sedang berjalan (Ctrl+C)
# Kemudian jalankan lagi:
npm run dev
```

### 2. Buka Browser Console

1. Buka aplikasi di browser (biasanya http://localhost:5173)
2. Tekan F12 untuk membuka Developer Tools
3. Pilih tab "Console"

### 3. Test Insert Data

1. Login ke aplikasi (jika belum)
2. Buka halaman "Pengaturan Proyek"
3. Isi form dengan data:
   - Nama Rumah Sakit: `RS Test`
   - Nama Alat: `Alat Test`
   - Departemen: `Dept Test`
   - Copyright: `© Test`
4. Klik tombol "Simpan Perubahan"
5. Perhatikan console log di browser

### 4. Periksa Console Log

Anda akan melihat log seperti ini jika berhasil:

```
=== SAVE PROJECT START ===
User: {id: "...", email: "..."}
User ID: ...
Current Project ID: null (atau UUID jika update)
Local Info: {hospitalName: "...", equipmentName: "...", ...}
User is logged in, saving to database...
Creating new project for user: ...
=== createProject START ===
userId: ...
projectData: {...}
insertData: {...}
Supabase response: {data: {...}, error: null}
=== createProject END ===
Project created successfully: {...}
Setting current project ID: ...
=== SAVE PROJECT SUCCESS ===
```

### 5. Jika Ada Error

Jika muncul error, perhatikan pesan error di console. Error umum:

#### Error: "Invalid API key"
- Pastikan file `.env` ada di root folder
- Restart development server
- Periksa kredensial di `.env` cocok dengan Supabase

#### Error: "new row violates row-level security policy"
- RLS policy tidak mengizinkan insert
- Sudah diperbaiki dengan policy `true`

#### Error: "null value in column violates not-null constraint"
- Ada field required yang tidak diisi
- Pastikan `hospital_name` dan `equipment_name` terisi

### 6. Verifikasi Data Tersimpan

Setelah insert berhasil, verifikasi di Supabase Dashboard:

1. Buka https://supabase.com/dashboard
2. Pilih project Anda
3. Buka Table Editor
4. Pilih tabel `projects`
5. Lihat data yang baru ditambahkan

Atau gunakan SQL:

```sql
SELECT * FROM projects ORDER BY created_at DESC LIMIT 5;
```

## File Test HTML

Saya sudah membuat file `test_insert_debug.html` untuk test insert langsung tanpa aplikasi React.

Cara menggunakan:
1. Buka file `test_insert_debug.html` di browser
2. Klik tombol "Test Insert"
3. Lihat hasil di halaman dan console

## Checklist Debugging

- [ ] File `.env` sudah dibuat
- [ ] Development server sudah di-restart
- [ ] Browser console terbuka
- [ ] Login berhasil (user.id ada)
- [ ] Form terisi lengkap
- [ ] Klik "Simpan Perubahan"
- [ ] Lihat console log
- [ ] Periksa pesan sukses/error
- [ ] Verifikasi di Supabase Dashboard

## Troubleshooting

### Data tidak tersimpan tapi tidak ada error

1. Periksa apakah `user.id` ada:
   ```javascript
   console.log('User:', user)
   console.log('User ID:', user?.id)
   ```

2. Periksa apakah fungsi `createProject` dipanggil:
   - Lihat log `=== createProject START ===`

3. Periksa response dari Supabase:
   - Lihat log `Supabase response:`
   - Jika `error: null` dan `data: {...}`, berarti berhasil

### Environment variables tidak terbaca

Jika `import.meta.env.VITE_SUPABASE_URL` undefined:

1. Pastikan file `.env` di root folder (sejajar dengan `package.json`)
2. Pastikan nama variable dimulai dengan `VITE_`
3. Restart development server (WAJIB!)
4. Clear browser cache

### Network Error

Jika ada error network:
1. Periksa koneksi internet
2. Periksa URL Supabase benar
3. Periksa CORS settings di Supabase (biasanya sudah OK)

## Kontak Support

Jika masih ada masalah, screenshot:
1. Console log lengkap
2. Network tab (filter: supabase.co)
3. Error message yang muncul

Dan kirimkan untuk analisis lebih lanjut.
