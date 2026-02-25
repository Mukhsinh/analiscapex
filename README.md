# Aplikasi Analisis Keputusan Capex

Aplikasi web modern untuk menganalisis keputusan investasi Capital Expenditure (Capex) dengan 3 alternatif pembiayaan:
- **Leasing** - Sewa guna usaha
- **Borrow & Purchase** - Pinjaman bank untuk pembelian
- **Revenue Sharing** - Bagi hasil dengan pemasok

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/capex-analysis-app)

## 🚀 Fitur Utama

✅ **Multi-User Authentication** - Login dengan email  
✅ **Project Management** - Kelola multiple projects  
✅ **3 Metode Analisis** - Leasing, Purchase, Revenue Sharing  
✅ **Database Integration** - Simpan dan load data dari Supabase  
✅ **Visualisasi Data** - Chart interaktif dengan Chart.js  
✅ **Export Functionality** - Export ke PDF dan Excel  
✅ **Analysis History** - Riwayat analisis lengkap  
✅ **Responsive Design** - Mobile-friendly interface  
✅ **Real-time Calculations** - Perhitungan otomatis Present Value  

## 🛠️ Teknologi

- **React 18** - UI Framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling framework
- **Chart.js** - Data visualization
- **Supabase** - Backend & Database
- **jsPDF** - PDF generation
- **XLSX** - Excel export
- **React Router** - Navigation

## 📦 Quick Start

### Development

1. Clone repository:
```bash
git clone <repository-url>
cd capex-analysis-app
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` dan isi dengan credentials Supabase Anda:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di `http://localhost:5173`

## 🏗️ Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

Preview build:
```bash
npm run preview
```

## 🚢 Deployment

### Deploy ke Vercel (Recommended)

**Quick Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/capex-analysis-app)

**Manual Deploy:**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login dan deploy:
```bash
vercel login
vercel
```

3. Untuk production:
```bash
vercel --prod
```

**Atau gunakan script helper:**
```bash
# Pre-deployment check
.\pre-deploy-check.ps1

# Deploy preview
.\deploy.ps1 preview

# Deploy production
.\deploy.ps1 production
```

### Environment Variables di Vercel

Tambahkan di Vercel Dashboard atau via CLI:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Dokumentasi Deployment Lengkap

- 📘 [Quick Start Guide](./DEPLOY_QUICK_START.md) - Deploy dalam 5 menit
- 📗 [Deployment Guide](./README_DEPLOYMENT.md) - Panduan lengkap
- 📋 [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Checklist lengkap
- 📊 [Refactoring Summary](./REFACTORING_SUMMARY.md) - Detail perubahan

## 📖 Cara Penggunaan

### 1. Login
- Masukkan email Anda
- Sistem akan otomatis membuat akun jika belum ada

### 2. Pengaturan Project
- Klik menu "Pengaturan"
- Isi informasi project (Nama RS, Alat, Departemen)
- Data akan tersimpan otomatis

### 3. Input Data Analisis
Pilih salah satu tab dan input data:

**A. Leasing**
- Pembayaran tahunan
- Periode (tahun)
- Discount rate (%)

**B. Borrow & Purchase**
- Jumlah pinjaman
- Interest rate (%)
- Periode (tahun)
- Biaya maintenance tahunan
- Nilai residu
- Discount rate (%)

**C. Revenue Sharing**
- Porsi RS (%)
- Direct overhead
- Allocated overhead
- Tax rate (%)
- Discount rate (%)
- Periode (tahun)
- Daftar prosedur (nama, tarif, volume)

### 4. Hitung & Analisis
- Klik "Hitung & Bandingkan Semua Alternatif"
- Sistem akan menghitung PV untuk semua metode
- Data otomatis tersimpan ke database

### 5. Lihat Hasil
- **Analisis Capex**: Hasil perhitungan dan perbandingan
- **Laporan & Grafik**: Visualisasi data dengan chart
- **Riwayat Analisis**: History semua analisis yang pernah dilakukan

### 6. Export
- Export ke PDF untuk laporan
- Export ke Excel untuk analisis lebih lanjut

## 📐 Rumus Perhitungan

### Present Value Factor
```
PV Factor = 1 / (1 + r)^n
```
- r = discount rate (decimal)
- n = tahun ke-n

### Leasing
```
PV Expense = Pembayaran Tahunan × PV Factor
Total PV = Σ PV Expense (semua tahun)
```

### Borrow & Purchase
```
Interest = Sisa Pinjaman × Interest Rate
Principal = Angsuran Pokok
Total Expense = Principal + Interest + Maintenance
PV Expense = Total Expense × PV Factor
Total PV = Σ PV Expense - (Nilai Residu × PV Factor tahun terakhir)
```

### Revenue Sharing
```
Annual Revenue = Σ (Tarif × Porsi RS × Volume) untuk semua prosedur
Operating Profit = Revenue - Direct Overhead - Allocated Overhead
EAT = Operating Profit × (1 - Tax Rate)
PV Expense = |EAT| × PV Factor
Total PV = Σ PV Expense (semua tahun)
```

## 📁 Struktur Project

```
capex-analysis-app/
├── src/
│   ├── components/          # React components
│   │   ├── Login.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── LeasingForm.jsx
│   │   ├── PurchaseForm.jsx
│   │   ├── RevenueShareForm.jsx
│   │   ├── ResultsComparison.jsx
│   │   ├── AnalyticsReport.jsx
│   │   ├── AnalysisHistory.jsx
│   │   ├── ProjectSettings.jsx
│   │   └── ExportButtons.jsx
│   ├── lib/                 # Libraries & integrations
│   │   ├── supabase.js
│   │   └── database.js
│   ├── utils/               # Utility functions
│   │   ├── calculations.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── print.css            # Print styles
├── public/                  # Static assets
├── dist/                    # Build output
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment template
├── vercel.json              # Vercel configuration
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🗄️ Database Schema

Aplikasi menggunakan Supabase dengan schema berikut:

- **users** - User accounts
- **projects** - Project information
- **analysis_results** - Analysis results
- **analysis_yearly_breakdown** - Yearly breakdown data
- **revenue_share_procedures** - Revenue sharing procedures
- **detailed_analysis_results** - Detailed analysis data
- **analysis_recommendations** - Analysis recommendations
- **form_inputs** - Saved form inputs

Lihat [DATABASE_README.md](./DATABASE_README.md) untuk detail lengkap.

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style

- ESLint untuk linting
- Prettier untuk formatting (optional)
- Follow React best practices

## 🐛 Troubleshooting

### Build Error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection Error
- Cek environment variables di `.env`
- Pastikan Supabase project aktif
- Verifikasi RLS policies

### Data Tidak Tersimpan
- Cek browser console untuk error
- Verifikasi user sudah login
- Cek Supabase logs

## 📝 Changelog

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk history perubahan.

## 🤝 Contributing

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk panduan kontribusi.

## 📄 Lisensi

© Copyright Mukhsin Hadi

## 📞 Support

Untuk pertanyaan atau issue, silakan buat issue di repository ini.

---

**Happy Analyzing! 📊**

