# ✅ Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] Semua fitur sudah ditest dan berfungsi
- [ ] Tidak ada console.log yang tidak perlu (akan dihapus otomatis di production)
- [ ] Tidak ada TODO atau FIXME yang critical
- [ ] Code sudah di-review
- [ ] Dependencies sudah up-to-date (`npm outdated`)

### Build & Test
- [ ] `npm install` berhasil tanpa error
- [ ] `npm run build` berhasil tanpa error
- [ ] `npm run preview` berjalan dengan baik
- [ ] Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test semua form input dan validasi
- [ ] Test semua perhitungan dan kalkulasi
- [ ] Test export PDF dan Excel
- [ ] Test login dan authentication
- [ ] Test database operations (CRUD)

### Configuration
- [ ] File `vercel.json` sudah ada
- [ ] File `.env.example` sudah dibuat
- [ ] File `.env` tidak ter-commit ke Git
- [ ] File `.gitignore` sudah dikonfigurasi
- [ ] File `.vercelignore` sudah ada
- [ ] `package.json` sudah lengkap (name, version, description)
- [ ] `vite.config.js` sudah dioptimasi

### Database (Supabase)
- [ ] Database schema sudah final
- [ ] RLS policies sudah aktif dan ditest
- [ ] Indexes sudah dibuat untuk performa
- [ ] Backup database sudah dilakukan
- [ ] Connection pooling sudah dikonfigurasi
- [ ] API keys sudah disiapkan (production keys)

### Security
- [ ] Environment variables tidak hardcoded
- [ ] API keys tidak ter-commit ke Git
- [ ] RLS policies sudah aktif di Supabase
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] Input validation sudah diterapkan
- [ ] SQL injection prevention sudah diterapkan

### Performance
- [ ] Images sudah dioptimasi
- [ ] Code splitting sudah dikonfigurasi
- [ ] Lazy loading untuk komponen besar
- [ ] Bundle size < 1MB (check dengan `npm run build`)
- [ ] Lighthouse score > 80

## Deployment

### Vercel Setup
- [ ] Vercel CLI sudah terinstall (`npm install -g vercel`)
- [ ] Login ke Vercel (`vercel login`)
- [ ] Project sudah dibuat di Vercel Dashboard (atau akan dibuat otomatis)

### Environment Variables
- [ ] `VITE_SUPABASE_URL` sudah ditambahkan di Vercel
- [ ] `VITE_SUPABASE_ANON_KEY` sudah ditambahkan di Vercel
- [ ] Environment variables sudah diset untuk Production, Preview, Development

### Deploy
- [ ] Run pre-deployment check: `.\pre-deploy-check.ps1`
- [ ] Deploy preview: `vercel` atau `.\deploy.ps1 preview`
- [ ] Test preview URL
- [ ] Deploy production: `vercel --prod` atau `.\deploy.ps1 production`

## Post-Deployment

### Verification
- [ ] Production URL accessible
- [ ] Homepage loads correctly
- [ ] Login berfungsi
- [ ] Semua form berfungsi
- [ ] Perhitungan akurat
- [ ] Export PDF berfungsi
- [ ] Export Excel berfungsi
- [ ] Database operations berfungsi
- [ ] Responsive design OK di mobile
- [ ] No console errors di browser

### Performance Check
- [ ] Run Lighthouse audit
- [ ] Check loading time (< 3 seconds)
- [ ] Check bundle size
- [ ] Check API response time
- [ ] Check database query performance

### Monitoring
- [ ] Setup Vercel Analytics (optional)
- [ ] Setup error tracking (optional)
- [ ] Setup uptime monitoring (optional)
- [ ] Check deployment logs

### Documentation
- [ ] Update README.md dengan production URL
- [ ] Document deployment process
- [ ] Document environment variables
- [ ] Create user guide (if needed)

### Backup & Rollback Plan
- [ ] Backup current production (if updating)
- [ ] Document rollback procedure
- [ ] Keep previous deployment accessible

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Check performance metrics monthly
- [ ] Update dependencies monthly (`npm update`)
- [ ] Security audit quarterly (`npm audit`)
- [ ] Database backup weekly
- [ ] Review and optimize queries monthly

### Updates
- [ ] Test updates in preview environment first
- [ ] Deploy during low-traffic hours
- [ ] Monitor after deployment
- [ ] Have rollback plan ready

## Troubleshooting

### Common Issues

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment variables not working:**
- Check prefix `VITE_`
- Redeploy after adding env vars
- Check Vercel Dashboard settings

**404 errors:**
- Check `vercel.json` rewrites configuration
- Verify routing in React Router

**Database connection fails:**
- Check Supabase URL and keys
- Verify RLS policies
- Check network connectivity

**Slow performance:**
- Check bundle size
- Optimize images
- Enable caching
- Use CDN for assets

## Emergency Contacts

- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Team Lead: [contact info]
- DevOps: [contact info]

---

**Last Updated:** 25 Feb 2026
**Version:** 1.0.0
