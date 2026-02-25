# 🚀 Quick Deploy Guide - 5 Menit ke Production!

## Step 1: Persiapan (2 menit)

### A. Pastikan Build Berhasil
```bash
npm run build
```
✅ Harus success tanpa error!

### B. Catat Environment Variables
Buka file `.env` dan catat:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Step 2: Push ke GitHub (1 menit)

```bash
# Add semua file
git add .

# Commit
git commit -m "Ready for deployment to Vercel"

# Push ke GitHub
git push origin main
```

## Step 3: Deploy ke Vercel (2 menit)

### Opsi A: Via Dashboard (Recommended)

1. **Buka** https://vercel.com
2. **Login** dengan GitHub
3. **Klik** "Add New Project"
4. **Import** repository Anda
5. **Configure**:
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Add Environment Variables**:
   ```
   VITE_SUPABASE_URL = [paste dari .env]
   VITE_SUPABASE_ANON_KEY = [paste dari .env]
   ```
7. **Klik** "Deploy"
8. **Tunggu** ~2 menit
9. **Done!** 🎉

### Opsi B: Via CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Step 4: Test Deployment

1. Buka URL yang diberikan Vercel
2. Test login
3. Test input data
4. Test perhitungan
5. Test export

## ✅ Success!

Aplikasi Anda sekarang live di:
`https://your-project.vercel.app`

## 🔧 Jika Ada Masalah

### Build Failed?
```bash
# Test di local
npm run build

# Cek error message
# Fix error
# Push lagi
```

### Environment Variables Error?
1. Cek di Vercel Dashboard → Settings → Environment Variables
2. Pastikan prefix `VITE_` ada
3. Redeploy

### 404 Error?
- Pastikan `vercel.json` ada
- Redeploy

## 📱 Auto-Deploy

Setelah setup awal, setiap push ke GitHub akan auto-deploy!

```bash
# Edit code
# ...

# Push
git add .
git commit -m "Update feature"
git push

# Vercel akan auto-deploy! 🚀
```

## 🎯 Next Steps

- [ ] Setup custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Monitor performance
- [ ] Share dengan team!

---

**That's it! Aplikasi Anda sudah production-ready! 🎉**
