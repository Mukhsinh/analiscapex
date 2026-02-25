# Project Summary - Aplikasi Analisis Keputusan Capex

## 📊 Overview

Aplikasi web modern untuk menganalisis keputusan investasi Capital Expenditure (Capex) dengan membandingkan 3 alternatif pembiayaan menggunakan metode Present Value Analysis.

## 🎯 Tujuan

Membantu manajer laboratorium klinik dalam mengambil keputusan investasi untuk pengadaan Alat Analyzer Kimia dengan analisis finansial yang akurat dan mudah dipahami.

## ✨ Fitur Utama

### 1. Analisis 3 Alternatif Pembiayaan
- **Leasing**: Sewa guna usaha dengan pembayaran bulanan
- **Borrow & Purchase**: Pinjaman bank dengan bunga declining balance
- **Revenue Sharing**: Bagi hasil berdasarkan volume pelayanan

### 2. Perhitungan Finansial
- Present Value (PV) Analysis
- PV Factor: 1/(1+r)^n
- Declining balance interest calculation
- EAT (Earning After Tax) untuk revenue sharing
- Trade-in value consideration

### 3. Visualisasi Data
- Bar chart perbandingan PV Expense
- Summary cards dengan color coding
- Tabel detail perhitungan per tahun
- Ranking otomatis dengan rekomendasi

### 4. Export Functionality
- CSV untuk analisis spreadsheet
- JSON untuk backup data
- Print/PDF untuk laporan

### 5. User Interface
- Modern dan profesional (Tailwind CSS)
- Responsive design (mobile, tablet, desktop)
- Interactive forms dengan validasi
- Tab navigation yang intuitif

## 🏗️ Arsitektur Aplikasi

### Technology Stack
```
Frontend Framework: React 18.2.0
Build Tool: Vite 5.0.8
Styling: Tailwind CSS 3.4.0
Charts: Chart.js 4.4.0 + React Chart.js 2
```

### Struktur Folder
```
capex-analysis-app/
├── src/
│   ├── components/          # React components
│   │   ├── LeasingForm.jsx
│   │   ├── PurchaseForm.jsx
│   │   ├── RevenueShareForm.jsx
│   │   ├── ResultsComparison.jsx
│   │   └── ExportButtons.jsx
│   ├── utils/               # Utility functions
│   │   ├── calculations.js  # Core calculations
│   │   ├── validators.js    # Input validation
│   │   └── constants.js     # Constants & defaults
│   ├── App.jsx              # Main component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── print.css            # Print styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite config
├── tailwind.config.js       # Tailwind config
└── postcss.config.js        # PostCSS config
```

## 📐 Metodologi Perhitungan

### Present Value Factor
```
PV Factor = 1 / (1 + r)^n
```
- r = discount rate (%)
- n = tahun ke-n

### Leasing
```
Annual Payment = Monthly Payment × 12
PV Expense = Annual Payment × PV Factor
Total PV = Σ PV Expense
```

### Borrow & Purchase
```
Principal Payment = Loan Amount / Period
Interest = Remaining Loan × Interest Rate
Total Expense = Principal + Interest + Maintenance
PV Expense = Total Expense × PV Factor
Trade-in PV = Residual Value × PV Factor (last year)
Total PV = Σ PV Expense - Trade-in PV
```

### Revenue Sharing
```
Annual Revenue = Tariff × RS Share % × Volume / 1,000,000
Operating Profit = Revenue - Direct OH - Allocated OH
EAT = Operating Profit × (1 - Tax Rate)
PV Expense = |EAT| × PV Factor
Total PV = Σ PV Expense
```

## 📊 Data Source

Berdasarkan file Excel:
- **Nama**: "Analisis Keputusan Capex - Borrow-Purchase atau Leasing-KSO atau Revenue Sharing.xlsx"
- **Rumah Sakit**: RS MIRACLES - YOGYAKARTA
- **Equipment**: Alat Analyzer Kimia - Laboratorium Klinik
- **Penulis**: Johny Setyawan & Niven A. Setyawan

### Data Excel yang Dianalisis:
- 77 jenis pemeriksaan laboratorium
- Total volume proyeksi: 9,180 pemeriksaan/tahun
- Tarif per pemeriksaan: Rp 150,000
- Biaya overhead langsung: Rp 1,632 juta/tahun
- Biaya overhead alokasian: Rp 240 juta/tahun

## 🎨 Design Principles

### UI/UX
- **Simplicity**: Interface yang mudah dipahami
- **Clarity**: Label dan instruksi yang jelas
- **Consistency**: Warna dan spacing konsisten
- **Responsiveness**: Bekerja di semua device
- **Accessibility**: Mempertimbangkan aksesibilitas

### Color Scheme
- **Primary (Blue)**: Leasing - #3B82F6
- **Success (Green)**: Borrow & Purchase - #22C55E
- **Warning (Purple)**: Revenue Sharing - #A855F7
- **Neutral (Gray)**: Text dan borders

## 📈 Hasil Analisis (Default Values)

### Ranking Berdasarkan PV Expense:
1. **Leasing**: Rp 1,061.42 juta ✅ (TERBAIK)
2. **Borrow & Purchase**: Rp 1,275.42 juta
3. **Revenue Sharing**: Rp 1,449.98 juta ❌ (TERBURUK - Rugi)

### Rekomendasi:
Pilih **LEASING** karena memiliki total Present Value Expense terendah.

### Catatan Penting:
Revenue Sharing tidak feasible karena biaya overhead (Rp 1,872 M) melebihi pendapatan (Rp 1,377 M), menghasilkan kerugian operasional.

## 📚 Dokumentasi

### File Dokumentasi:
1. **README.md** - Quick start guide
2. **PANDUAN_APLIKASI.md** - User manual lengkap
3. **DEPLOYMENT.md** - Deployment guide
4. **TESTING.md** - Testing procedures
5. **CONTRIBUTING.md** - Contribution guidelines
6. **CHANGELOG.md** - Version history
7. **PROJECT_SUMMARY.md** - This file

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔮 Future Enhancements

### Planned Features:
- [ ] Sensitivity analysis (what-if scenarios)
- [ ] Multiple scenario comparison
- [ ] Historical data tracking
- [ ] Database integration (Supabase)
- [ ] User authentication
- [ ] Advanced charts (line, pie, radar)
- [ ] Excel import functionality
- [ ] Email report sending
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support
- [ ] Mobile app

### Technical Improvements:
- [ ] Unit tests (Jest)
- [ ] E2E tests (Playwright)
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Error tracking (Sentry)

## 📊 Performance Metrics

### Target Metrics:
- Initial load: < 3 seconds
- Calculation time: < 1 second
- Chart render: < 2 seconds
- Lighthouse score: > 90

### Bundle Size:
- Estimated: ~500KB (gzipped)
- Main chunk: React + dependencies
- Vendor chunk: Chart.js
- App chunk: Application code

## 🔒 Security Considerations

- Input validation on all forms
- No sensitive data stored
- HTTPS required for production
- CSP headers recommended
- Regular dependency updates

## 📞 Support & Maintenance

### Maintenance Tasks:
- Weekly: Check for security updates
- Monthly: Update dependencies
- Quarterly: Performance audit
- Yearly: Major version updates

### Support Channels:
- GitHub Issues: Bug reports & features
- Documentation: Comprehensive guides
- Email: Direct support

## 🏆 Credits

### Original Work:
- **Authors**: Johny Setyawan & Niven A. Setyawan
- **Institution**: RS MIRACLES - YOGYAKARTA
- **Model**: Excel-based Capex Analysis

### Web Application:
- **Developer**: [Your Name]
- **Framework**: React + Vite
- **Design**: Tailwind CSS
- **Charts**: Chart.js

## 📄 License

MIT License - See LICENSE file for details

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-25  
**Status**: Production Ready ✅

**Live Demo**: http://localhost:5173  
**Repository**: [GitHub URL]  
**Documentation**: See docs folder
