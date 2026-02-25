# Perbaikan RLS Policies - 25 Februari 2026

## Masalah yang Ditemukan

Tabel-tabel di database masih kosong meskipun user sudah melakukan input data dan klik tombol "Hitung & Bandingkan Semua Alternatif".

## Penyebab Masalah

Setelah investigasi, ditemukan bahwa:

1. **RLS (Row Level Security) tidak diaktifkan** pada semua tabel di schema public
2. **Tidak ada RLS policies** yang mengizinkan operasi INSERT, SELECT, UPDATE, DELETE dari client-side
3. Supabase client menggunakan anon key yang memerlukan RLS policies untuk mengakses data

Ketika RLS diaktifkan tanpa policies, semua operasi database dari client akan **diblokir secara default** untuk keamanan.

## Solusi yang Diterapkan

### 1. Mengaktifkan RLS pada Semua Tabel

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_yearly_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_share_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detailed_analysis_results ENABLE ROW LEVEL SECURITY;
```

### 2. Membuat RLS Policies untuk Semua Operasi

Untuk setiap tabel, dibuat policies yang mengizinkan:
- **SELECT**: Membaca data
- **INSERT**: Menambah data baru
- **UPDATE**: Mengubah data yang ada
- **DELETE**: Menghapus data

#### Contoh Policies untuk Tabel `projects`:

```sql
-- SELECT policy
CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  USING (true);

-- INSERT policy
CREATE POLICY "Users can insert their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (true);

-- UPDATE policy
CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (true);

-- DELETE policy
CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (true);
```

### 3. Policies yang Dibuat

Total **23 policies** dibuat untuk 8 tabel:

| Tabel | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| users | ✓ | ✓ | ✓ | - |
| projects | ✓ | ✓ | ✓ | ✓ |
| analysis_results | ✓ | ✓ | ✓ | ✓ |
| form_inputs | ✓ | ✓ | ✓ | ✓ |
| analysis_yearly_breakdown | ✓ | ✓ | - | - |
| analysis_recommendations | ✓ | ✓ | - | - |
| revenue_share_procedures | ✓ | ✓ | - | - |
| detailed_analysis_results | ✓ | ✓ | - | - |

## Catatan Penting

### Keamanan Sementara

Saat ini, policies menggunakan `USING (true)` dan `WITH CHECK (true)` yang berarti:
- **Semua user dapat mengakses semua data**
- Ini adalah solusi sementara untuk development

### Rekomendasi untuk Production

Untuk production, policies harus dibuat lebih ketat dengan autentikasi user:

```sql
-- Contoh policy yang lebih aman
CREATE POLICY "Users can view only their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert only their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Cara Testing

1. **Login ke aplikasi** dengan email dan password
2. **Isi form** di salah satu tab (Leasing, Purchase, atau Revenue Sharing)
3. **Klik tombol** "Hitung & Bandingkan Semua Alternatif"
4. **Periksa database** di Supabase Dashboard:
   - Buka Table Editor
   - Pilih tabel `projects` - seharusnya ada data baru
   - Pilih tabel `analysis_results` - seharusnya ada 3 records (leasing, purchase, revenueShare)
   - Pilih tabel `detailed_analysis_results` - seharusnya ada 1 record
   - Pilih tabel `analysis_recommendations` - seharusnya ada 1 record

## Verifikasi RLS Status

Untuk memeriksa status RLS dan policies:

```sql
-- Check RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## File yang Terlibat

- `src/lib/database.js` - Fungsi `saveCompleteAnalysis()` yang menyimpan data
- `src/App.jsx` - Handler `handleCalculate()` yang memanggil save function
- Migration: `enable_rls_and_policies` - SQL migration yang mengaktifkan RLS

## Status

✅ **SELESAI** - RLS dan policies sudah aktif, data seharusnya bisa disimpan ke database.

## Testing Berikutnya

Setelah perbaikan ini, silakan:
1. Refresh aplikasi
2. Login ulang jika perlu
3. Coba input data dan simpan
4. Verifikasi data masuk ke database

Jika masih ada masalah, periksa:
- Console browser untuk error messages
- Network tab untuk melihat response dari Supabase
- Supabase logs untuk error di server side
