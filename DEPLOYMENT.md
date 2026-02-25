# Panduan Deployment Aplikasi Capex Analysis

## 🚀 Deployment Options

### 1. Vercel (Recommended)

**Langkah-langkah:**

1. Install Vercel CLI:
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

4. Untuk production:
```bash
vercel --prod
```

**Konfigurasi Otomatis:**
- Vercel akan otomatis mendeteksi Vite
- Build command: `npm run build`
- Output directory: `dist`

### 2. Netlify

**Langkah-langkah:**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy
```

4. Production:
```bash
netlify deploy --prod
```

**Konfigurasi (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

**Langkah-langkah:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update package.json:
```json
{
  "homepage": "https://[username].github.io/[repo-name]",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update vite.config.js:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/[repo-name]/'
})
```

4. Deploy:
```bash
npm run deploy
```

### 4. Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build & Run:**
```bash
docker build -t capex-analysis .
docker run -p 80:80 capex-analysis
```

### 5. Static Hosting (Manual)

1. Build aplikasi:
```bash
npm run build
```

2. Upload folder `dist/` ke hosting:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps
   - Shared hosting (cPanel, dll)

## 🔧 Environment Variables

Jika aplikasi memerlukan environment variables:

**File: `.env`**
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Capex Analysis
```

**Akses di code:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📊 Performance Optimization

### 1. Build Optimization

**vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
})
```

### 2. Lazy Loading

Untuk komponen besar:
```javascript
const ResultsComparison = lazy(() => import('./components/ResultsComparison'))
```

### 3. Image Optimization

Gunakan format modern (WebP, AVIF) untuk gambar

## 🔒 Security

### 1. Content Security Policy

Tambahkan di `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 2. HTTPS

Pastikan deployment menggunakan HTTPS (semua platform modern sudah otomatis)

## 📈 Monitoring

### 1. Google Analytics

Tambahkan di `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking

Install Sentry:
```bash
npm install @sentry/react
```

## 🧪 Pre-Deployment Checklist

- [ ] Build berhasil tanpa error
- [ ] Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Validasi perhitungan dengan data sample
- [ ] Check console untuk error/warning
- [ ] Test performance (Lighthouse score)
- [ ] Verify meta tags untuk SEO
- [ ] Test loading time
- [ ] Backup source code

## 🔄 CI/CD Pipeline

### GitHub Actions

**File: `.github/workflows/deploy.yml`**
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 PWA (Progressive Web App)

Untuk membuat aplikasi installable:

1. Install plugin:
```bash
npm install vite-plugin-pwa -D
```

2. Update vite.config.js:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Capex Analysis',
        short_name: 'Capex',
        description: 'Analisis Keputusan Capex',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## 🌐 Custom Domain

### Vercel
1. Buka project di Vercel dashboard
2. Settings → Domains
3. Add domain dan ikuti instruksi DNS

### Netlify
1. Buka site settings
2. Domain management → Add custom domain
3. Update DNS records

## 📞 Support & Maintenance

- Monitor error logs secara berkala
- Update dependencies: `npm update`
- Security audit: `npm audit`
- Performance monitoring dengan Lighthouse
- User feedback untuk improvement

---

**Catatan:** Pilih platform deployment sesuai kebutuhan:
- **Vercel/Netlify**: Paling mudah, gratis untuk personal project
- **Docker**: Untuk kontrol penuh dan scalability
- **GitHub Pages**: Gratis, cocok untuk open source
- **Cloud Provider**: Untuk enterprise dengan traffic tinggi
