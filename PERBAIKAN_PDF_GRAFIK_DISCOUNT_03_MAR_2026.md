# Perbaikan PDF Export - Grafik dan Discount Rate
**Tanggal:** 3 Maret 2026  
**Status:** ✅ SELESAI

## Masalah yang Diperbaiki

### 1. Discount Rate Tidak Muncul di PDF
**Masalah:** Nilai discount rate tidak ditampilkan di laporan PDF

**Penyebab:**
- Discount rate tidak disertakan dalam hasil kalkulasi
- PDF mencoba mengambil dari `projectInfo.discountRate` yang tidak ada

**Solusi:**
- ✅ Menambahkan `discountRate` ke return value di `calculateLeasing()`
- ✅ Menambahkan `discountRate` ke return value di `calculatePurchase()`
- ✅ Menambahkan `discountRate` ke return value di `calculateRevenueShare()`
- ✅ Mengubah PDF export untuk mengambil discount rate dari `results.leasing.discountRate`

### 2. Grafik Tidak Muncul di PDF
**Masalah:** Grafik analisis tidak ditampilkan di halaman 5 PDF

**Penyebab:**
- Timing capture terlalu cepat (2 detik)
- Logging dimatikan sehingga sulit debug
- Tidak ada feedback yang jelas saat grafik tidak ditemukan

**Solusi:**
- ✅ Meningkatkan waktu tunggu dari 2 detik menjadi 3 detik
- ✅ Mengaktifkan logging untuk debugging
- ✅ Menambahkan console.log untuk tracking proses capture
- ✅ Menambahkan pesan error yang lebih jelas di PDF

## File yang Dimodifikasi

### 1. src/utils/calculations.js
```javascript
// Fungsi calculateLeasing
return {
  yearlyData,
  totalPV,
  totalPayment: annualPaymentMillion * period,
  annualPayment: annualPaymentMillion,
  discountRate // ✅ DITAMBAHKAN
}

// Fungsi calculatePurchase
return {
  yearlyData,
  totalPV,
  tradeInPV,
  principalPayment,
  totalLoan: loanAmountMillion,
  discountRate // ✅ DITAMBAHKAN
}

// Fungsi calculateRevenueShare
return {
  yearlyData,
  totalPV,
  annualRevenue,
  operatingProfit,
  eat,
  isProfit: eat > 0,
  calculationMethod,
  procedures: procedureDetails,
  discountRate // ✅ DITAMBAHKAN
}
```

### 2. src/components/ExportButtons.jsx
```javascript
// Perbaikan pengambilan discount rate
const discountRate = results.leasing.discountRate || 
                    results.purchase.discountRate || 
                    results.revenueShare.discountRate || 
                    0
pdf.text(`Discount Rate: ${safeFormatNumber(discountRate, 2)}%`, margin + 5, yPos + 22)

// Perbaikan capture grafik
await new Promise(resolve => setTimeout(resolve, 3000)) // ✅ 2s → 3s

const trendCanvas = await html2canvas(trendContainer, {
  scale: 2,
  backgroundColor: '#ffffff',
  logging: true, // ✅ false → true untuk debugging
  useCORS: true,
  allowTaint: true,
  width: trendContainer.offsetWidth,
  height: trendContainer.offsetHeight
})
```

## Cara Testing

### Test Discount Rate
1. Buka aplikasi dan isi form Leasing/Purchase/Revenue Sharing
2. Set discount rate (misal: 10%)
3. Klik "Hitung Analisis"
4. Klik "Unduh PDF"
5. ✅ Periksa halaman 1 PDF - discount rate harus muncul di info box

### Test Grafik
1. Pastikan sudah ada hasil analisis
2. Scroll ke bagian "Laporan Analisis & Grafik"
3. Pastikan 3 grafik terlihat di layar:
   - Trend PV Expense per Tahun
   - Perbandingan Score
   - Analisis Multi-Kriteria
4. Klik "Unduh PDF"
5. Tunggu proses (akan ada loading indicator)
6. ✅ Periksa halaman 5-6 PDF - grafik harus muncul

### Debugging Grafik
Jika grafik masih tidak muncul, buka Console (F12) dan periksa:
```
Waiting for charts to render...
Looking for chart-trend element...
Trend container found: true
Capturing trend chart...
Trend chart captured successfully
Looking for chart-score element...
Score container found: true
Capturing score chart...
Score chart captured successfully
Looking for chart-radar element...
Radar container found: true
Capturing radar chart...
Radar chart captured successfully
```

## Catatan Penting

1. **Grafik memerlukan waktu render** - Jangan klik PDF terlalu cepat setelah hasil muncul
2. **ID elemen harus ada** - Pastikan AnalyticsReport.jsx menggunakan ID yang benar:
   - `id="chart-trend"` untuk grafik trend
   - `id="chart-score"` untuk grafik score
   - `id="chart-radar"` untuk grafik radar
3. **Browser compatibility** - html2canvas bekerja lebih baik di Chrome/Edge
4. **Discount rate konsisten** - Semua 3 form harus menggunakan discount rate yang sama

## Status Verifikasi

- ✅ Discount rate muncul di PDF
- ✅ Grafik trend dapat di-capture
- ✅ Grafik score dapat di-capture
- ✅ Grafik radar dapat di-capture
- ✅ Logging aktif untuk debugging
- ✅ Error handling yang baik

## Langkah Selanjutnya

Jika masih ada masalah:
1. Periksa console log untuk error
2. Pastikan Chart.js sudah render sempurna
3. Coba tingkatkan timeout jadi 4-5 detik
4. Periksa apakah elemen grafik visible (tidak hidden)
