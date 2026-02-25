# 🚀 Quick Start - Deploy ke Vercel

## Langkah Cepat (5 Menit)

### 1. Persiapan

```bash
# Install dependencies
npm install

# Test build
npm run build
npm run preview
```

### 2. Deploy ke Vercel

**Opsi A: Via CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

**Opsi B: Via Dashboard**

1. Buka [vercel.com](https://vercel.com)
2. Import repository
3. Tambahkan environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click Deploy

### 3. Environment Variables

Di Vercel Dashboard atau via CLI:

```bash
vercel env add VITE_SUPABASE_URL
# Paste: https://mwrlfsdyblxqxetqxwhp.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste: your_anon_key_here
```

## Script Helper

```bash
# Pre-deployment check
.\pre-deploy-check.ps1

# Deploy preview
.\deploy.ps1 preview

# Deploy production
.\deploy.ps1 production
```

## Troubleshooting

**Build Error?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment Variables tidak terbaca?**
- Pastikan prefix `VITE_` ada
- Restart deployment setelah menambah env vars

**404 Error?**
- File `vercel.json` sudah dikonfigurasi untuk SPA routing

## Checklist

- [ ] Build lokal berhasil
- [ ] Environment variables sudah disiapkan
- [ ] Test semua fitur
- [ ] `.env` tidak ter-commit

## Selesai! 🎉

URL Production: `https://your-app.vercel.app`

---

**Dokumentasi lengkap:** Lihat `README_DEPLOYMENT.md`
