# Panduan Login & Autentikasi

## Kredensial Login

Untuk masuk ke aplikasi, gunakan kredensial berikut:

- **Email**: mukhsin9@gmail.com
- **Password**: Jlamprang233!!

## Fitur Login

### 1. Halaman Login
- Tampilan modern dengan gradient background
- Form login dengan validasi
- Feedback error jika kredensial salah
- Loading state saat proses login

### 2. Session Management
- Session disimpan di localStorage
- Otomatis login jika session masih aktif
- Tombol logout tersedia di sidebar

### 3. Protected Routes
- Aplikasi hanya bisa diakses setelah login
- Redirect otomatis ke halaman login jika belum login

## Struktur Database Supabase

### Tabel Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel Projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  hospital_name TEXT NOT NULL,
  equipment_name TEXT NOT NULL,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel Analysis Results
```sql
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Row Level Security (RLS)

Semua tabel dilindungi dengan RLS policies:

- Users hanya bisa melihat dan mengupdate data mereka sendiri
- Projects hanya bisa diakses oleh pemiliknya
- Analysis results hanya bisa diakses oleh user yang membuatnya

## Cara Menggunakan

1. Buka aplikasi di browser
2. Masukkan email dan password
3. Klik tombol "Masuk"
4. Setelah login berhasil, Anda akan diarahkan ke dashboard
5. Untuk logout, klik tombol "Keluar" di sidebar

## Keamanan

- Password tidak disimpan dalam plain text
- Session management menggunakan localStorage
- RLS policies melindungi data user
- Validasi input di client dan server side

## Pengembangan Selanjutnya

Fitur yang bisa ditambahkan:
- [ ] Register user baru
- [ ] Forgot password
- [ ] Email verification
- [ ] Multi-factor authentication
- [ ] User profile management
- [ ] Password change
- [ ] Session timeout
- [ ] Remember me functionality
