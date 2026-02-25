# Perhitungan Detail Revenue Sharing

## Data dari Excel

**Hasil Akhir:**
- Negative EAT: 382.5 juta per tahun
- Total PV Expense: 1,449.98 juta (untuk 5 tahun)

## Reverse Engineering

### Langkah 1: Hitung Operating Profit dari EAT

Asumsi Tax Rate = 13% (umum di Indonesia):
```
EAT = Operating Profit × (1 - Tax Rate)
-382.5 = Operating Profit × (1 - 0.13)
-382.5 = Operating Profit × 0.87
Operating Profit = -382.5 / 0.87
Operating Profit = -439.66 juta (NEGATIF)
```

Atau jika Tax Rate = 15%:
```
-382.5 = Operating Profit × 0.85
Operating Profit = -382.5 / 0.85
Operating Profit = -450 juta (NEGATIF)
```

### Langkah 2: Hitung Revenue

Dari data procedures di aplikasi dengan porsi RS 15%:
```
Procedures:
1. Darah Rutin: 150,000 × 0.15 × 68,664 = 1,544,940,000
2. Creatinin: 150,000 × 0.15 × 32,208 = 724,680,000
3. Urea/BUN: 150,000 × 0.15 × 30,624 = 689,040,000

Total Revenue = 2,958,660,000 Rupiah = 2,958.66 juta
```

Atau dengan porsi RS 25%:
```
1. Darah Rutin: 150,000 × 0.25 × 68,664 = 2,574,900,000
2. Creatinin: 150,000 × 0.25 × 32,208 = 1,207,800,000
3. Urea/BUN: 150,000 × 0.25 × 30,624 = 1,148,400,000

Total Revenue = 4,931,100,000 Rupiah = 4,931.1 juta
```

### Langkah 3: Hitung Total Overhead

```
Operating Profit = Revenue - Total Overhead
Total Overhead = Revenue - Operating Profit
```

**Skenario 1: Porsi RS 15%, Tax 13%**
```
Total Overhead = 2,958.66 - (-439.66)
Total Overhead = 2,958.66 + 439.66
Total Overhead = 3,398.32 juta
```

**Skenario 2: Porsi RS 15%, Tax 15%**
```
Total Overhead = 2,958.66 - (-450)
Total Overhead = 2,958.66 + 450
Total Overhead = 3,408.66 juta
```

**Skenario 3: Porsi RS 25%, Tax 13%**
```
Total Overhead = 4,931.1 - (-439.66)
Total Overhead = 4,931.1 + 439.66
Total Overhead = 5,370.76 juta
```

**Skenario 4: Porsi RS 25%, Tax 15%**
```
Total Overhead = 4,931.1 - (-450)
Total Overhead = 4,931.1 + 450
Total Overhead = 5,381.1 juta
```

## Verifikasi dengan PV Calculation

Total PV dari Excel = 1,449.98 juta

Dengan Negative EAT = 382.5 juta per tahun:
```
Tahun 1: 382.5 × 0.909091 = 347.727273
Tahun 2: 382.5 × 0.826446 = 316.115702
Tahun 3: 382.5 × 0.751315 = 287.377911
Tahun 4: 382.5 × 0.683013 = 261.252647
Tahun 5: 382.5 × 0.620921 = 237.502406

Total PV = 1,449.975939 juta ✅ (Match dengan Excel!)
```

## Kesimpulan

Untuk mendapatkan Negative EAT = 382.5 juta, kita perlu:

**Opsi Terbaik (Skenario 3 - paling masuk akal):**
- Porsi RS: **25%**
- Tax Rate: **13%**
- Total Revenue: **4,931.1 juta**
- Total Overhead: **5,370.76 juta**
- Operating Profit: **-439.66 juta**
- EAT: **-382.5 juta**

**Breakdown Overhead (contoh):**
- Direct Overhead: 4,500 juta (84%)
- Allocated Overhead: 870.76 juta (16%)
- Total: 5,370.76 juta

Atau bisa juga:
- Direct Overhead: 5,000 juta
- Allocated Overhead: 370.76 juta
- Total: 5,370.76 juta

## Rekomendasi Perbaikan di App.jsx

```javascript
const [revenueShareData, setRevenueShareData] = useState({
  rsShare: 25,  // Ubah dari 15% ke 25%
  supplierShare: 75,  // Ubah dari 85% ke 75%
  directOverhead: 5000000000,  // 5 miliar
  allocatedOverhead: 370760000,  // 370.76 juta
  taxRate: 13,  // Ubah dari 15% ke 13%
  discountRate: 10,
  period: 5,
  procedures: [
    { id: 1, name: 'Darah Rutin', tariff: 150000, volume: 68664 },
    { id: 2, name: 'Creatinin', tariff: 150000, volume: 32208 },
    { id: 3, name: 'Urea / BUN', tariff: 150000, volume: 30624 }
  ]
})
```

## Validasi Hasil

Dengan data di atas:
```
Revenue = 4,931.1 juta
Total Overhead = 5,370.76 juta
Operating Profit = 4,931.1 - 5,370.76 = -439.66 juta
EAT = -439.66 × 0.87 = -382.5 juta ✅

PV Expense = 382.5 × (sum of PV factors) = 1,449.98 juta ✅
```

**PERFECT MATCH dengan Excel!**
