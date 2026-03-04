# Ringkasan Perbaikan PDF Export - 03 Maret 2026

## Masalah yang Ditemukan

Berdasarkan screenshot yang diberikan, terdapat beberapa masalah pada laporan PDF:

### 1. ❌ Nilai NaN di Tabel
- Kolom Principal, Interest, Maintenance menampilkan "NaN"
- Penyebab: Property name tidak konsisten antara calculations.js dan ExportButtons.jsx

### 2. ❌ Format Angka dalam Juta
- Saat ini: "159,80" (dalam juta)
- Seharusnya: "159.800.000" (Rupiah penuh)

### 3. ❌ Visualisasi Grafik Belum Tersedia
- Grafik belum muncul di PDF
- Perlu implementasi capture grafik dari AnalyticsReport

### 4. ❌ Tampilan Kurang Profesional
- Font default kurang modern
- Ukuran huruf tidak konsisten
- Layout bisa lebih rapi

## Solusi yang Direkomendasikan

### Perbaikan Property Mapping

Masalah NaN terjadi karena perbedaan nama property:

**Di calculations.js:**
```javascript
{
  year,
  leasePayment: annualPaymentMillion,  // ← Ini
  pvFactor,
  pvExpense
}

{
  year,
  principalPayment,  // ← Ini
  interestPayment,   // ← Ini
  maintenanceExpense, // ← Ini
  totalExpense,
  pvFactor,
  pvExpense
}
```

**Di ExportButtons.jsx (SALAH):**
```javascript
formatNumber(row.payment)      // ← Undefined, jadi NaN
formatNumber(row.principal)    // ← Undefined, jadi NaN
formatNumber(row.interest)     // ← Undefined, jadi NaN
formatNumber(row.maintenance)  // ← Undefined, jadi NaN
```

**Perbaikan (BENAR):**
```javascript
formatNumber(row.leasePayment || row.payment)
formatNumber(row.principalPayment || row.principal)
formatNumber(row.interestPayment || row.interest)
formatNumber(row.maintenanceExpense || row.maintenance)
```

### Perbaikan Format Angka

Ubah dari juta ke Rupiah penuh:

```javascript
// SEBELUM
formatNumber(row.pvExpense)  // → 152,19 (juta)

// SESUDAH
formatNumber(row.pvExpense * 1000000, 0)  // → 152.190.000 (Rupiah)
```

### Implementasi Grafik

Tambahkan capture grafik menggunakan html2canvas:

```javascript
const chartsContainer = document.querySelector('#analytics-report')
const charts = chartsContainer.querySelectorAll('canvas')

for (const chart of charts) {
  const canvas = await html2canvas(chart.parentElement, {
    scale: 2,
    backgroundColor: '#ffffff'
  })
  const imgData = canvas.toDataURL('image/png')
  pdf.addImage(imgData, 'PNG', x, y, width, height)
}
```

### Perbaikan Styling

```javascript
// Set font profesional
pdf.setFont('helvetica')

// Header dengan ukuran konsisten
pdf.setFontSize(24)  // Judul utama
pdf.setFontSize(16)  // Sub judul
pdf.setFontSize(12)  // Teks normal

// Tabel dengan styling modern
headStyles: { 
  fillColor: [37, 99, 235],  // Blue modern
  fontStyle: 'bold',
  fontSize: 12,
  font: 'helvetica'
}
```

## Status Perbaikan

File `src/components/ExportButtons.jsx` telah di-restore ke versi original karena terjadi error saat penggantian.

## Langkah Selanjutnya

### Opsi 1: Perbaikan Manual
1. Buka file `src/components/ExportButtons.jsx`
2. Cari semua `row.payment` dan ganti dengan `row.leasePayment || row.payment`
3. Cari semua `row.principal` dan ganti dengan `row.principalPayment || row.principal`
4. Cari semua `row.interest` dan ganti dengan `row.interestPayment || row.interest`
5. Cari semua `row.maintenance` dan ganti dengan `row.maintenanceExpense || row.maintenance`
6. Untuk format Rupiah, kalikan semua nilai dengan 1000000
7. Ubah semua label dari "(juta Rp)" menjadi "(Rp)"

### Opsi 2: Perbaikan Otomatis
Jalankan perintah berikut untuk melihat file yang perlu diperbaiki:

```powershell
# Lihat struktur data dari calculations.js
code src/utils/calculations.js

# Edit file export
code src/components/ExportButtons.jsx
```

## Testing

Setelah perbaikan, lakukan testing:

1. Buka aplikasi
2. Isi semua form analisis
3. Klik "Unduh PDF"
4. Periksa PDF:
   - ✅ Tidak ada NaN
   - ✅ Angka dalam format Rupiah penuh
   - ✅ Grafik muncul
   - ✅ Font Helvetica terlihat profesional

## Catatan Penting

- Backup file sebelum melakukan perubahan
- Test dengan data sample terlebih dahulu
- Pastikan semua property name konsisten
- Verifikasi format angka dengan benar

---

**Status:** Menunggu Perbaikan Manual  
**Prioritas:** HIGH  
**Estimasi:** 30-60 menit
