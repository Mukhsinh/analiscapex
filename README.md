# Aplikasi Analisis Keputusan Capex

Aplikasi web modern untuk menganalisis keputusan investasi Capital Expenditure (Capex) dengan 3 alternatif pembiayaan:
- **Leasing** - Sewa guna usaha
- **Borrow & Purchase** - Pinjaman bank untuk pembelian
- **Revenue Sharing** - Bagi hasil dengan pemasok

## Fitur

✅ Interface modern dan profesional dengan Tailwind CSS  
✅ Form input interaktif untuk setiap alternatif pembiayaan  
✅ Perhitungan otomatis Present Value (PV)  
✅ Visualisasi perbandingan dengan Chart.js  
✅ Rekomendasi keputusan berdasarkan analisis finansial  
✅ Tabel detail untuk setiap alternatif  
✅ Responsive design untuk mobile dan desktop  

## Teknologi

- **React 18** - UI Framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Chart.js** - Visualisasi data
- **React Chart.js 2** - React wrapper untuk Chart.js

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di `http://localhost:5173`

## Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## Cara Penggunaan

1. **Pilih Tab Alternatif** - Pilih salah satu dari 3 tab (Leasing, Borrow & Purchase, atau Revenue Sharing)

2. **Input Data** - Masukkan data sesuai dengan penawaran yang diterima:
   - **Leasing**: Pembayaran bulanan, periode, discount rate
   - **Borrow & Purchase**: Jumlah pinjaman, bunga, periode, maintenance, nilai residu
   - **Revenue Sharing**: Tarif, porsi RS, volume, overhead, tax rate

3. **Hitung & Bandingkan** - Klik tombol "Hitung & Bandingkan Semua Alternatif"

4. **Lihat Hasil** - Aplikasi akan menampilkan:
   - Summary cards untuk setiap alternatif
   - Chart perbandingan
   - Rekomendasi keputusan
   - Tabel detail perhitungan

## Rumus Perhitungan

### Present Value Factor
```
PV Factor = 1 / (1 + r)^n
```
- r = discount rate
- n = tahun ke-n

### Leasing
```
PV Expense = Pembayaran Tahunan × PV Factor
Total PV = Σ PV Expense
```

### Borrow & Purchase
```
Interest = Sisa Pinjaman × Interest Rate
Total Expense = Principal + Interest + Maintenance
PV Expense = Total Expense × PV Factor
Total PV = Σ PV Expense - (Nilai Residu × PV Factor tahun terakhir)
```

### Revenue Sharing
```
Annual Revenue = Tarif × Porsi RS × Volume Proyeksi
Operating Profit = Revenue - Direct Overhead - Allocated Overhead
EAT = Operating Profit × (1 - Tax Rate)
PV Expense = |EAT| × PV Factor
Total PV = Σ PV Expense
```

## Struktur Folder

```
capex-analysis-app/
├── src/
│   ├── components/
│   │   ├── LeasingForm.jsx
│   │   ├── PurchaseForm.jsx
│   │   ├── RevenueShareForm.jsx
│   │   └── ResultsComparison.jsx
│   ├── utils/
│   │   └── calculations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Lisensi

© Copyright Johny Setyawan & Niven A. Setyawan
# analiscapex
# analiscapex
