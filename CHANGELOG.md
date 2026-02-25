# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-25

### Added
- ✨ Initial release of Capex Analysis Application
- 📊 Three financing alternatives analysis:
  - Leasing calculation with monthly payments
  - Borrow & Purchase with declining balance interest
  - Revenue Sharing with overhead analysis
- 🎨 Modern UI with Tailwind CSS
- 📈 Interactive charts using Chart.js
- 📋 Detailed comparison tables
- 🎯 Automatic recommendation based on PV analysis
- 💾 Export functionality:
  - CSV export for spreadsheet analysis
  - JSON export for data backup
  - Print/PDF export for reports
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔢 Accurate financial calculations matching Excel model
- ⚠️ Warning system for unprofitable scenarios
- 📖 Comprehensive documentation:
  - User guide (PANDUAN_APLIKASI.md)
  - Deployment guide (DEPLOYMENT.md)
  - Testing guide (TESTING.md)
  - README with quick start

### Features
- **Form Inputs:**
  - Leasing: Monthly payment, period, discount rate
  - Purchase: Loan amount, interest rate, maintenance, residual value
  - Revenue Share: Tariff, share percentage, volume, overhead costs

- **Calculations:**
  - Present Value (PV) analysis
  - PV Factor calculation: 1/(1+r)^n
  - Declining balance interest for loans
  - EAT (Earning After Tax) for revenue sharing
  - Trade-in value consideration

- **Visualizations:**
  - Bar chart for PV comparison
  - Summary cards with color coding
  - Detailed yearly breakdown tables
  - Ranking display with medals

- **Export Options:**
  - CSV with complete calculation details
  - JSON for data portability
  - Print-optimized layout for PDF generation

### Technical Stack
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- Chart.js 4.4.0
- React Chart.js 2 5.2.0

### Based On
- Original Excel file: "Analisis Keputusan Capex - Borrow-Purchase atau Leasing-KSO atau Revenue Sharing.xlsx"
- Hospital: RS MIRACLES - YOGYAKARTA
- Equipment: Alat Analyzer Kimia - Laboratorium Klinik
- Authors: Johny Setyawan & Niven A. Setyawan

## [1.1.0] - 2026-02-25

### Fixed
- 🐛 PDF export now generates actual PDF files instead of opening print dialog
- 🐛 Excel export now generates proper .xlsx files instead of CSV format

### Improved
- 📄 PDF export creates professional formatted reports with:
  - Proper header with hospital and equipment information
  - Structured tables with grid layout
  - Multi-page support for detailed analysis
  - Automatic page breaks
  - Color-coded headers
- 📊 Excel export creates multi-sheet workbooks with:
  - Summary sheet with comparison
  - Separate sheets for each financing alternative
  - Proper column widths
  - Formatted numbers and headers

### Technical
- Added jspdf and jspdf-autotable libraries for PDF generation
- Added xlsx library for Excel file generation
- Removed dependency on browser print dialog for PDF export

## [Unreleased]

### Planned Features
- [ ] Sensitivity analysis (what-if scenarios)
- [ ] Multiple scenario comparison
- [ ] Historical data tracking
- [ ] User authentication
- [ ] Database integration (Supabase)
- [ ] Advanced charts (line, pie, radar)
- [ ] Excel import functionality
- [ ] Email report sending
- [ ] Multi-language support (EN, ID)
- [ ] Dark mode
- [ ] Offline PWA support
- [ ] Mobile app (React Native)

### Improvements
- [ ] Add unit tests (Jest)
- [ ] Add E2E tests (Playwright)
- [ ] Improve accessibility (WCAG 2.1 AA)
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Optimize bundle size
- [ ] Add analytics tracking
- [ ] Improve SEO

### Bug Fixes
- None reported yet

## Version History

### Version Numbering
We use [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for new functionality (backwards compatible)
- PATCH version for bug fixes (backwards compatible)

### Release Notes Format
- ✨ New features
- 🐛 Bug fixes
- 🔧 Improvements
- 📚 Documentation
- 🎨 UI/UX changes
- ⚡ Performance
- 🔒 Security

---

**Note:** This changelog follows [Keep a Changelog](https://keepachangelog.com/) format.

For detailed commit history, see: [Git Log](https://github.com/your-repo/commits)
