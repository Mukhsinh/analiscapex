# 🚀 Panduan Deployment ke Vercel

## Persiapan Sebelum Deploy

### 1. Pastikan Environment Variables Sudah Dikonfigurasi

File `.env` berisi:
```env
VITE_SUPABASE_URL=https://mwrlfsdyblxqxetqxwhp.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**PENTING:** Jangan commit file `.env` ke Git!

### 2. Test Build Lokal

```bash
npm run build
npm run preview
```

Pastikan tidak ada error dan aplikasi berjalan dengan baik.

## Deployment ke Vercel

### Opsi 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy (pertama kali):
```bash
vercel
```

Ikuti prompt:
- Set up and deploy? **Y**
- Which scope? Pilih account Anda
- Link to existing project? **N**
- Project name? **capex-analysis-app** (atau nama lain)
- In which directory is your code located? **./**
- Want to override settings? **N**

4. Tambahkan Environment Variables:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

Pilih environment: **Production, Preview, Development**

5. Deploy ke Production:
```bash
vercel --prod
```

### Opsi 2: Deploy via Vercel Dashboard

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub/GitLab/Bitbucket
3. Click **"Add New Project"**
4. Import repository Anda
5. Configure Project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Tambahkan Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

7. Click **"Deploy"**

### Opsi 3: Deploy via Git Integration (Auto-Deploy)

1. Push code ke GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. Di Vercel Dashboard:
   - Import repository dari GitHub
   - Vercel akan otomatis detect Vite
   - Tambahkan environment variables
   - Deploy

**Setiap push ke branch `main` akan otomatis trigger deployment baru!**

## Konfigurasi Tambahan

### Custom Domain

1. Di Vercel Dashboard → Project Settings → Domains
2. Add domain Anda
3. Update DNS records sesuai instruksi Vercel

### Environment Variables untuk Multiple Environments

```bash
# Production
vercel env add VITE_SUPABASE_URL production

# Preview (untuk branch lain)
vercel env add VITE_SUPABASE_URL preview

# Development
vercel env add VITE_SUPABASE_URL development
```

## Optimasi Performa

Aplikasi sudah dikonfigurasi dengan:
- ✅ Code splitting untuk vendor chunks
- ✅ Minifikasi dengan Terser
- ✅ Remove console.log di production
- ✅ Cache headers untuk assets
- ✅ SPA routing dengan rewrites

## Monitoring & Debugging

### Melihat Logs

```bash
vercel logs [deployment-url]
```

### Melihat Deployment List

```bash
vercel ls
```

### Rollback ke Deployment Sebelumnya

Di Vercel Dashboard → Deployments → Pilih deployment → Promote to Production

## Troubleshooting

### Build Error: "Cannot find module"

```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Tidak Terbaca

- Pastikan prefix `VITE_` ada di semua env vars
- Restart dev server setelah menambah env vars
- Di Vercel, pastikan env vars sudah ditambahkan untuk environment yang benar

### 404 Error pada Routing

File `vercel.json` sudah dikonfigurasi dengan rewrites untuk SPA routing.

### Build Timeout

Jika build terlalu lama:
1. Vercel Dashboard → Project Settings → General
2. Increase build timeout (untuk Pro plan)

## Checklist Pre-Deployment

- [ ] Test build lokal berhasil (`npm run build`)
- [ ] Test preview lokal (`npm run preview`)
- [ ] Environment variables sudah disiapkan
- [ ] `.env` tidak ter-commit ke Git
- [ ] Database Supabase sudah production-ready
- [ ] RLS policies sudah aktif di Supabase
- [ ] Test semua fitur (login, input, kalkulasi, export)
- [ ] Test responsive design
- [ ] Check browser console untuk errors

## Post-Deployment

1. Test aplikasi di URL production
2. Verify semua fitur berjalan
3. Test dari berbagai device/browser
4. Setup monitoring (Vercel Analytics)
5. Share URL dengan team/client

## URLs

Setelah deployment, Anda akan mendapat:
- **Production URL**: `https://capex-analysis-app.vercel.app`
- **Preview URLs**: Untuk setiap branch/PR
- **Custom Domain**: Jika sudah dikonfigurasi

## Support

Jika ada masalah:
1. Check Vercel deployment logs
2. Check browser console
3. Verify environment variables
4. Test Supabase connection

---

**Selamat! Aplikasi Anda siap di-deploy! 🎉**
