# Panduan Deployment ke Vercel

## Persiapan

### 1. Pastikan Semua File Sudah Siap
- ✅ `vercel.json` - Konfigurasi routing untuk SPA
- ✅ `.env.example` - Template environment variables
- ✅ `vite.config.js` - Optimasi build untuk production
- ✅ `.gitignore` - Mengabaikan file yang tidak perlu

### 2. Environment Variables yang Diperlukan
Anda perlu menyiapkan environment variables berikut di Vercel:

```
VITE_SUPABASE_URL=https://mwrlfsdyblxqxetqxwhp.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Langkah Deployment

### Opsi 1: Deploy via Vercel CLI

1. Install Vercel CLI (jika belum):
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Untuk production deployment:
```bash
vercel --prod
```

### Opsi 2: Deploy via Vercel Dashboard (Recommended)

1. Push kode ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Klik "Add New Project"
4. Import repository GitHub Anda
5. Konfigurasi project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Tambahkan Environment Variables:
   - Klik "Environment Variables"
   - Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
   - Pastikan environment variables tersedia untuk Production, Preview, dan Development

7. Klik "Deploy"

## Setelah Deployment

### 1. Verifikasi Deployment
- Buka URL yang diberikan Vercel
- Test login functionality
- Test semua fitur utama:
  - Input data Leasing
  - Input data Purchase
  - Input data Revenue Sharing
  - Perhitungan dan perbandingan
  - Export PDF/Excel
  - Riwayat analisis

### 2. Custom Domain (Opsional)
1. Di Vercel Dashboard, buka project Anda
2. Klik tab "Settings" → "Domains"
3. Tambahkan custom domain Anda
4. Ikuti instruksi untuk konfigurasi DNS

### 3. Monitoring
- Vercel menyediakan analytics dan monitoring built-in
- Cek tab "Analytics" untuk melihat traffic
- Cek tab "Logs" untuk debugging

## Optimasi yang Sudah Diterapkan

### 1. Code Splitting
- React vendor bundle terpisah
- Chart.js vendor bundle terpisah
- Supabase vendor bundle terpisah
- Export libraries (PDF/Excel) bundle terpisah

### 2. Build Optimization
- Minifikasi dengan Terser
- Drop console.log di production
- Drop debugger statements
- Chunk size warning limit: 1000KB

### 3. Caching
- Static assets di-cache selama 1 tahun
- Immutable cache headers untuk assets

### 4. Routing
- SPA routing dengan fallback ke index.html
- Semua routes di-handle oleh React Router

## Troubleshooting

### Build Gagal
- Pastikan semua dependencies terinstall: `npm install`
- Test build lokal: `npm run build`
- Cek error message di Vercel logs

### Environment Variables Tidak Terbaca
- Pastikan prefix `VITE_` ada di semua env vars
- Rebuild project setelah menambah env vars
- Vercel memerlukan rebuild untuk apply env vars baru

### 404 Error pada Refresh
- Pastikan `vercel.json` sudah ada dan benar
- Vercel harus redirect semua routes ke index.html

### Supabase Connection Error
- Verifikasi SUPABASE_URL dan ANON_KEY benar
- Cek Supabase dashboard untuk status service
- Pastikan RLS policies sudah dikonfigurasi dengan benar

## Performance Tips

### 1. Lazy Loading
Pertimbangkan untuk menambahkan lazy loading untuk routes:
```javascript
const AnalyticsReport = lazy(() => import('./components/AnalyticsReport'))
```

### 2. Image Optimization
- Gunakan format WebP untuk images
- Compress images sebelum upload

### 3. Bundle Analysis
Jalankan bundle analyzer untuk melihat ukuran bundle:
```bash
npm install -D rollup-plugin-visualizer
```

## Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
```

### Redeploy
- Push ke GitHub akan trigger auto-deploy
- Atau manual deploy via Vercel CLI: `vercel --prod`

## Support

Jika ada masalah:
1. Cek Vercel logs
2. Cek browser console
3. Cek Supabase logs
4. Hubungi support Vercel jika diperlukan

## Checklist Pre-Deployment

- [ ] Test semua fitur di local
- [ ] Build berhasil: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Environment variables sudah disiapkan
- [ ] Repository sudah di push ke GitHub
- [ ] Supabase database sudah production-ready
- [ ] RLS policies sudah dikonfigurasi
- [ ] Test data sudah dihapus (jika ada)

## Post-Deployment Checklist

- [ ] URL deployment bisa diakses
- [ ] Login berfungsi
- [ ] Semua form input berfungsi
- [ ] Perhitungan akurat
- [ ] Export PDF/Excel berfungsi
- [ ] Database connection berfungsi
- [ ] Riwayat analisis tampil
- [ ] Mobile responsive
- [ ] Performance acceptable (< 3s load time)
