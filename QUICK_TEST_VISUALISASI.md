# Quick Test - Visualisasi Grafik

## 🚀 Quick Start (5 Menit)

### 1. Test Standalone Chart (1 menit)
```bash
# Buka file test di browser
start test_visualisasi_grafik.html
```

**Cek:** 3 grafik tampil dengan jelas ✅

### 2. Test di Aplikasi (4 menit)
```bash
# Jalankan dev server
npm run dev
```

**Langkah:**
1. Buka http://localhost:5173
2. Login (jika perlu)
3. Isi form analisis dengan data sample
4. Klik "Hitung Analisis"
5. Scroll ke "Laporan Analisis & Grafik"

**Cek:** 3 grafik tampil di section visualisasi ✅

### 3. Test PDF Export (30 detik)
1. Klik "Unduh PDF" di ExportButtons
2. Tunggu loading
3. Buka PDF yang terdownload
4. Scroll ke halaman 5

**Cek:** Grafik tampil di PDF halaman 5 ✅

---

## 📊 Data Sample untuk Testing

### Project Settings
- Hospital: RS Test
- Equipment: CT Scan 64 Slice
- Department: Radiologi
- Price: 5000 juta
- Discount Rate: 10%

### Leasing
- Period: 5 tahun
- Annual Payment: 1200 juta

### Purchase
- Loan Period: 5 tahun
- Interest: 8%
- Maintenance: 100 juta/tahun
- Trade-in: 500 juta

### Revenue Sharing
- Method: Percentage
- Share: 30%
- Revenue: 2000 juta/tahun
- Direct OH: 500 juta
- Allocated OH: 300 juta

---

## ✅ Expected Results

### Di Browser
```
┌─────────────────────────────────────┐
│  Laporan Analisis & Grafik          │
├─────────────────────────────────────┤
│  [Score Card] [Score Card] [Score]  │
├──────────────────┬──────────────────┤
│  📈 Trend Chart  │  🍩 Doughnut     │
│  (Line)          │  (Score)         │
├──────────────────┴──────────────────┤
│  🎯 Radar Chart (Multi-Kriteria)    │
├─────────────────────────────────────┤
│  [Statistik] [Statistik] [Stats]    │
├─────────────────────────────────────┤
│  ✅ REKOMENDASI: Purchase           │
└─────────────────────────────────────┘
```

### Di PDF (Halaman 5)
```
5. VISUALISASI & GRAFIK ANALISIS

5.1 Trend PV Expense per Tahun
[Gambar Line Chart]

5.2 Perbandingan Score
[Gambar Doughnut Chart]

5.3 Analisis Multi-Kriteria
[Gambar Radar Chart]
```

---

## 🐛 Troubleshooting Cepat

### Grafik Tidak Tampil di Browser
```bash
# Cek console (F12)
# Jika ada error Chart.js:
npm install chart.js react-chartjs-2
npm run dev
```

### Grafik Tidak Tampil di PDF
```javascript
// Di ExportButtons.jsx, increase timeout:
await new Promise(resolve => setTimeout(resolve, 2000)) // dari 1500
```

### Grafik Blur di PDF
```javascript
// Di html2canvas options, increase scale:
const canvas = await html2canvas(container, {
  scale: 3,  // dari 2
  // ...
})
```

---

## 📝 Quick Checklist

- [ ] Standalone test: 3 grafik tampil
- [ ] Browser: Grafik di section visualisasi
- [ ] PDF: Grafik di halaman 5
- [ ] Print: Grafik di preview
- [ ] No errors di console

**Status:** ___________  
**Time:** ___________

---

## 🎯 Success Criteria

✅ **PASS** jika:
1. Trend Line Chart tampil (3 garis berwarna)
2. Doughnut Chart tampil (3 segmen)
3. Radar Chart tampil (5 axis, 3 datasets)
4. Grafik jelas di PDF export
5. No console errors

❌ **FAIL** jika:
- Grafik tidak tampil sama sekali
- Grafik tampil tapi kosong/blank
- Error di console
- PDF tidak memiliki grafik

---

## 📞 Need Help?

Lihat dokumentasi lengkap:
- `PERBAIKAN_VISUALISASI_GRAFIK_03_MAR_2026.md`
- `CHECKLIST_VERIFIKASI_VISUALISASI_GRAFIK.md`
