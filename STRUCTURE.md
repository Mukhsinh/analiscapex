# 📁 Struktur Proyek

## Overview
```
capex-analysis-app/
├── 📂 src/                      # Source code
├── 📂 node_modules/             # Dependencies (auto-generated)
├── 📂 .kiro/                    # Kiro settings
├── 📄 index.html                # HTML entry point
├── 📄 package.json              # Project config & dependencies
├── 📄 vite.config.js            # Vite configuration
├── 📄 tailwind.config.js        # Tailwind CSS config
├── 📄 postcss.config.js         # PostCSS config
├── 📄 .gitignore                # Git ignore rules
└── 📚 Documentation files       # Various .md files
```

## 📂 Source Code Structure

```
src/
├── 📂 components/               # React Components
│   ├── LeasingForm.jsx         # Form untuk input Leasing
│   ├── PurchaseForm.jsx        # Form untuk input Purchase
│   ├── RevenueShareForm.jsx    # Form untuk input Revenue Share
│   ├── ResultsComparison.jsx   # Komponen hasil & perbandingan
│   └── ExportButtons.jsx       # Tombol export (CSV, JSON, Print)
│
├── 📂 utils/                    # Utility Functions
│   ├── calculations.js         # Core calculation logic
│   │   ├── calculatePVFactor()
│   │   ├── calculateLeasing()
│   │   ├── calculatePurchase()
│   │   ├── calculateRevenueShare()
│   │   ├── formatCurrency()
│   │   └── formatNumber()
│   │
│   ├── validators.js           # Input validation
│   │   ├── validateField()
│   │   ├── validateForm()
│   │   └── validateBusinessLogic()
│   │
│   └── constants.js            # Constants & defaults
│       ├── DEFAULT_VALUES
│       ├── LAB_TESTS
│       ├── CHART_COLORS
│       ├── VALIDATION_RULES
│       └── APP_INFO
│
├── App.jsx                      # Main application component
├── main.jsx                     # React entry point
├── index.css                    # Global styles (Tailwind)
└── print.css                    # Print-specific styles
```

## 📚 Documentation Files

```
📚 Documentation/
├── README.md                    # Main documentation
├── QUICKSTART.md               # Quick start guide (5 min)
├── PANDUAN_APLIKASI.md         # User manual (Bahasa Indonesia)
├── DEPLOYMENT.md               # Deployment guide
├── TESTING.md                  # Testing procedures
├── CONTRIBUTING.md             # Contribution guidelines
├── CHANGELOG.md                # Version history
├── PROJECT_SUMMARY.md          # Project overview
├── STRUCTURE.md                # This file
└── LICENSE                     # MIT License
```

## 🔧 Configuration Files

```
⚙️ Config/
├── package.json                # NPM dependencies & scripts
├── vite.config.js              # Vite build configuration
├── tailwind.config.js          # Tailwind CSS customization
├── postcss.config.js           # PostCSS plugins
└── .gitignore                  # Git ignore patterns
```

## 📊 Data Files

```
📊 Data/
├── Analisis Keputusan Capex... .xlsx    # Original Excel file
└── capex_analysis.xlsx                  # Copy for testing
```

## 🎨 Component Hierarchy

```
App.jsx (Root)
│
├── Header
│   ├── Title
│   └── Subtitle
│
├── Tab Navigation
│   ├── Leasing Tab
│   ├── Purchase Tab
│   └── Revenue Share Tab
│
├── Form Container
│   ├── LeasingForm
│   │   ├── Monthly Payment Input
│   │   ├── Period Input
│   │   └── Discount Rate Input
│   │
│   ├── PurchaseForm
│   │   ├── Loan Amount Input
│   │   ├── Interest Rate Input
│   │   ├── Period Input
│   │   ├── Maintenance Input
│   │   ├── Residual Value Input
│   │   └── Discount Rate Input
│   │
│   └── RevenueShareForm
│       ├── Tariff Input
│       ├── RS Share Input
│       ├── Volume Input
│       ├── Overhead Inputs
│       ├── Tax Rate Input
│       ├── Discount Rate Input
│       └── Period Input
│
├── Calculate Button
│
└── Results Section (conditional)
    ├── ExportButtons
    │   ├── Export CSV
    │   ├── Export JSON
    │   └── Print/PDF
    │
    └── ResultsComparison
        ├── Summary Cards
        │   ├── Leasing Card
        │   ├── Purchase Card
        │   └── Revenue Share Card
        │
        ├── Comparison Chart
        │   └── Bar Chart (Chart.js)
        │
        ├── Recommendation Box
        │   ├── Ranking
        │   ├── Conclusion
        │   └── Warnings
        │
        └── Detail Tables
            ├── Leasing Detail Table
            ├── Purchase Detail Table
            └── Revenue Share Detail Table
```

## 🔄 Data Flow

```
User Input
    ↓
Form Component (LeasingForm/PurchaseForm/RevenueShareForm)
    ↓
State Management (useState in App.jsx)
    ↓
Calculate Button Click
    ↓
Calculation Functions (utils/calculations.js)
    ↓
    ├── calculateLeasing()
    ├── calculatePurchase()
    └── calculateRevenueShare()
    ↓
Results State Update
    ↓
ResultsComparison Component
    ↓
    ├── Summary Cards
    ├── Chart Visualization
    ├── Recommendation
    └── Detail Tables
    ↓
Export Options
    ├── CSV Export
    ├── JSON Export
    └── Print/PDF
```

## 📦 Dependencies

### Production Dependencies
```json
{
  "react": "^18.2.0",              // UI Framework
  "react-dom": "^18.2.0",          // React DOM renderer
  "chart.js": "^4.4.0",            // Chart library
  "react-chartjs-2": "^5.2.0"      // React wrapper for Chart.js
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.2.1",  // Vite React plugin
  "vite": "^5.0.8",                   // Build tool
  "tailwindcss": "^3.4.0",            // CSS framework
  "postcss": "^8.4.32",               // CSS processor
  "autoprefixer": "^10.4.16"          // CSS autoprefixer
}
```

## 🎯 Key Files Explained

### App.jsx
- Main application component
- Manages state for all forms
- Handles tab navigation
- Triggers calculations
- Renders results

### calculations.js
- Core business logic
- PV Factor calculation
- Leasing calculation
- Purchase calculation (declining balance)
- Revenue Share calculation (with EAT)
- Currency formatting

### ResultsComparison.jsx
- Displays calculation results
- Renders Chart.js visualizations
- Shows recommendation
- Generates detailed tables
- Handles ranking logic

### ExportButtons.jsx
- CSV export functionality
- JSON export functionality
- Print/PDF trigger
- File download handling

## 📏 Code Metrics

```
Total Files: ~25
Total Lines of Code: ~2,500
Components: 5
Utility Functions: 10+
Documentation Pages: 10
```

## 🔐 Security Considerations

```
✅ Input validation on all forms
✅ No sensitive data storage
✅ Client-side only (no backend)
✅ No external API calls
✅ Safe export functionality
```

## 🚀 Build Output

```
dist/
├── index.html                   # Optimized HTML
├── assets/
│   ├── index-[hash].js         # Bundled JavaScript
│   ├── index-[hash].css        # Bundled CSS
│   └── [vendor]-[hash].js      # Vendor chunks
└── favicon.ico                  # (if added)
```

## 📊 Bundle Analysis

```
Estimated Bundle Sizes:
├── React + React DOM: ~140 KB
├── Chart.js: ~200 KB
├── Application Code: ~50 KB
├── Tailwind CSS: ~10 KB (purged)
└── Total (gzipped): ~400-500 KB
```

## 🎨 Styling Architecture

```
Tailwind CSS (Utility-first)
├── Base styles (index.css)
├── Component styles (inline utilities)
├── Print styles (print.css)
└── Custom utilities (tailwind.config.js)
```

## 🧪 Testing Structure (Future)

```
tests/
├── unit/
│   ├── calculations.test.js
│   ├── validators.test.js
│   └── components/
│       ├── LeasingForm.test.jsx
│       └── ResultsComparison.test.jsx
│
├── integration/
│   └── full-flow.test.js
│
└── e2e/
    └── user-journey.spec.js
```

---

**Note:** Struktur ini dirancang untuk:
- ✅ Maintainability
- ✅ Scalability
- ✅ Clear separation of concerns
- ✅ Easy testing
- ✅ Developer-friendly
