# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Code Quality
- [x] Build berhasil: `npm run build`
- [x] Preview berjalan: `npm run preview`
- [ ] Test semua fitur di local
- [ ] Tidak ada error di console
- [ ] Tidak ada warning kritis

### 2. Environment Setup
- [x] `.env.example` sudah dibuat
- [x] `.env` berisi credentials yang benar
- [ ] Credentials Supabase sudah dicatat untuk Vercel
- [ ] Backup `.env` ke tempat aman

### 3. Git Repository
- [ ] Repository sudah dibuat di GitHub
- [ ] `.gitignore` sudah benar
- [ ] Commit semua perubahan
- [ ] Push ke GitHub

### 4. Vercel Account
- [ ] Akun Vercel sudah dibuat
- [ ] Login ke vercel.com
- [ ] Siap untuk import project

## Deployment Steps

### 1. Import Project ke Vercel
- [ ] Klik "Add New Project" di Vercel
- [ ] Pilih repository dari GitHub
- [ ] Vercel detect Vite framework otomatis

### 2. Configure Build Settings
Vercel akan auto-detect, tapi pastikan:
- [ ] Framework Preset: **Vite**
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### 3. Environment Variables
Tambahkan di Vercel:
- [ ] `VITE_SUPABASE_URL` = `https://mwrlfsdyblxqxetqxwhp.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = `[your-anon-key]`
- [ ] Pilih environment: Production, Preview, Development (semua)

### 4. Deploy
- [ ] Klik "Deploy"
- [ ] Tunggu build selesai (~2-3 menit)
- [ ] Cek build logs jika ada error

## Post-Deployment Testing

### 1. Basic Functionality
- [ ] URL deployment bisa diakses
- [ ] Halaman login tampil
- [ ] Bisa login dengan email
- [ ] Redirect ke dashboard setelah login

### 2. Form Input Testing
- [ ] Form Leasing bisa diisi
- [ ] Form Purchase bisa diisi
- [ ] Form Revenue Sharing bisa diisi
- [ ] Tambah/hapus prosedur berfungsi
- [ ] Input validation berfungsi

### 3. Calculation Testing
- [ ] Klik "Hitung & Bandingkan" berfungsi
- [ ] Hasil perhitungan tampil
- [ ] Chart tampil dengan benar
- [ ] Rekomendasi tampil
- [ ] Data tersimpan ke database

### 4. Database Integration
- [ ] Data tersimpan ke Supabase
- [ ] Riwayat analisis tampil
- [ ] Load data dari database berfungsi
- [ ] Update project settings berfungsi

### 5. Export Functionality
- [ ] Export PDF berfungsi
- [ ] Export Excel berfungsi
- [ ] File ter-download dengan benar
- [ ] Content PDF/Excel benar

### 6. Navigation
- [ ] Sidebar navigation berfungsi
- [ ] Semua menu bisa diakses
- [ ] Back button browser berfungsi
- [ ] Refresh page tidak error

### 7. Responsive Design
- [ ] Desktop view OK
- [ ] Tablet view OK
- [ ] Mobile view OK
- [ ] Landscape mode OK

### 8. Performance
- [ ] Load time < 3 detik
- [ ] Tidak ada lag saat input
- [ ] Chart render smooth
- [ ] Export tidak freeze

## Vercel Configuration

### 1. Domain (Optional)
- [ ] Custom domain sudah disiapkan
- [ ] Domain ditambahkan di Vercel
- [ ] DNS dikonfigurasi
- [ ] SSL certificate aktif

### 2. Analytics
- [ ] Vercel Analytics enabled
- [ ] Web Vitals monitoring aktif

### 3. Deployment Protection (Optional)
- [ ] Password protection untuk preview
- [ ] Vercel Authentication untuk production

## Supabase Configuration

### 1. Database
- [ ] RLS policies aktif
- [ ] Tables sudah dibuat
- [ ] Indexes sudah optimal
- [ ] Backup policy aktif

### 2. Authentication
- [ ] Email auth enabled
- [ ] Rate limiting configured
- [ ] Session timeout configured

### 3. API
- [ ] API rate limits checked
- [ ] CORS configured
- [ ] API keys secured

## Monitoring & Maintenance

### 1. Error Tracking
- [ ] Check Vercel logs regularly
- [ ] Check Supabase logs
- [ ] Setup error alerts (optional)

### 2. Performance Monitoring
- [ ] Monitor Vercel Analytics
- [ ] Check Core Web Vitals
- [ ] Monitor API response times

### 3. Updates
- [ ] Plan for dependency updates
- [ ] Plan for feature updates
- [ ] Plan for security patches

## Rollback Plan

### If Deployment Fails:
1. Check Vercel build logs
2. Check environment variables
3. Test build locally: `npm run build`
4. Fix issues and redeploy

### If Production Has Issues:
1. Rollback to previous deployment di Vercel
2. Fix issues di local
3. Test thoroughly
4. Redeploy

## Success Criteria

✅ Deployment berhasil jika:
- [ ] Build success tanpa error
- [ ] Semua fitur berfungsi
- [ ] Database connection OK
- [ ] Export berfungsi
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] No critical errors

## Quick Commands

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Deploy via CLI (optional)
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **GitHub Repository**: [your-repo-url]
- **Production URL**: [will-be-assigned-by-vercel]

## Notes

- Vercel memberikan URL otomatis: `your-project.vercel.app`
- Setiap push ke GitHub akan trigger auto-deploy
- Preview deployments dibuat untuk setiap PR
- Production deployment dari main/master branch

## Support

Jika ada masalah:
1. 📖 Baca DEPLOYMENT_GUIDE.md
2. 🔍 Check Vercel documentation
3. 💬 Vercel support chat
4. 📧 Supabase support

---

**Good luck with your deployment! 🚀**
