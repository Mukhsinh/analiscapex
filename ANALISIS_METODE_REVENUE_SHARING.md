# Analisis Metode Revenue Sharing

## Ringkasan

Dokumen ini menjelaskan dua alternatif metode perhitungan Revenue Sharing yang tersedia dalam aplikasi Capex Analyzer.

## Metode 1: Persentase (Percentage-Based)

### Deskripsi
RS mendapatkan persentase tertentu dari tarif pelayanan. Pemasok mendapat sisanya.

### Rumus Perhitungan

```
Pendapatan RS per Pemeriksaan = Tarif × Porsi RS%
Pendapatan Pemasok per Pemeriksaan = Tarif × (100% - Porsi RS%)

Total Pendapatan RS per Tahun = Σ (Tarif × Porsi RS% × Volume)
```

### Contoh Perhitungan

**Input:**
- Porsi RS: 25%
- Pemeriksaan Darah Rutin:
  - Tarif: Rp 150.000
  - Volume per tahun: 68.664

**Perhitungan:**
```
Pendapatan RS = 150.000 × 25% × 68.664
              = 150.000 × 0.25 × 68.664
              = Rp 2.574.900.000 per tahun

Pendapatan Pemasok = 150.000 × 75% × 68.664
                   = Rp 7.724.700.000 per tahun
```

### Keuntungan
- Fleksibel: Pendapatan RS naik seiring kenaikan tarif
- Sederhana: Hanya perlu satu parameter (porsi RS%)
- Proporsional: Risiko dan keuntungan dibagi sesuai porsi

### Kekurangan
- Tidak pasti: Pendapatan RS bergantung pada tarif yang bisa berubah
- Kompleks untuk negosiasi: Perlu kesepakatan porsi yang adil


## Metode 2: Flat Fee (Fixed Payment per Procedure)

### Deskripsi
RS membayar nominal tetap per pemeriksaan kepada pihak ketiga (Pemasok). RS mendapat sisa dari tarif setelah dikurangi flat fee.

### Rumus Perhitungan

```
Pendapatan RS per Pemeriksaan = Tarif - Flat Fee
Pendapatan Pemasok per Pemeriksaan = Flat Fee

Total Pendapatan RS per Tahun = Σ ((Tarif - Flat Fee) × Volume)
Total Pembayaran ke Pemasok = Σ (Flat Fee × Volume)
```

### Contoh Perhitungan

**Input:**
- Pemeriksaan Darah Rutin:
  - Tarif: Rp 150.000
  - Flat Fee ke Pemasok: Rp 30.000
  - Volume per tahun: 68.664

**Perhitungan:**
```
Pendapatan RS per pemeriksaan = 150.000 - 30.000
                               = Rp 120.000

Total Pendapatan RS = 120.000 × 68.664
                    = Rp 8.239.680.000 per tahun

Total Pembayaran ke Pemasok = 30.000 × 68.664
                             = Rp 2.059.920.000 per tahun
```

### Keuntungan
- Pasti: Biaya ke pemasok tetap dan mudah diprediksi
- Sederhana untuk budgeting: Biaya per pemeriksaan jelas
- Menguntungkan jika tarif naik: RS dapat seluruh kenaikan tarif
- Mudah dinegosiasikan: Nominal jelas per pemeriksaan

### Kekurangan
- Risiko tarif turun: RS menanggung seluruh penurunan
- Kurang fleksibel: Perlu renegosiasi jika kondisi berubah
- Perlu analisis per jenis pemeriksaan: Flat fee bisa berbeda-beda


## Perbandingan Kedua Metode

### Skenario: 3 Jenis Pemeriksaan

| Pemeriksaan | Tarif | Volume/Tahun |
|-------------|-------|--------------|
| Darah Rutin | Rp 150.000 | 68.664 |
| Creatinin | Rp 150.000 | 32.208 |
| Urea/BUN | Rp 150.000 | 30.624 |

### Metode 1: Persentase (Porsi RS = 25%)

| Pemeriksaan | Pendapatan RS | Pendapatan Pemasok |
|-------------|---------------|-------------------|
| Darah Rutin | Rp 2.574.900.000 | Rp 7.724.700.000 |
| Creatinin | Rp 1.207.800.000 | Rp 3.623.400.000 |
| Urea/BUN | Rp 1.148.400.000 | Rp 3.445.200.000 |
| **TOTAL** | **Rp 4.931.100.000** | **Rp 14.793.300.000** |

**Porsi RS: 25% dari total revenue**

### Metode 2: Flat Fee (Flat Fee = Rp 30.000/pemeriksaan)

| Pemeriksaan | Pendapatan RS | Pembayaran ke Pemasok |
|-------------|---------------|----------------------|
| Darah Rutin | Rp 8.239.680.000 | Rp 2.059.920.000 |
| Creatinin | Rp 3.864.960.000 | Rp 966.240.000 |
| Urea/BUN | Rp 3.674.880.000 | Rp 918.720.000 |
| **TOTAL** | **Rp 15.779.520.000** | **Rp 3.944.880.000** |

**Porsi RS: 80% dari total revenue**

### Analisis Perbandingan

| Aspek | Metode Persentase (25%) | Metode Flat Fee (Rp 30.000) |
|-------|------------------------|------------------------------|
| Pendapatan RS | Rp 4.931.100.000 | Rp 15.779.520.000 |
| Pembayaran ke Pemasok | Rp 14.793.300.000 | Rp 3.944.880.000 |
| Porsi RS | 25% | 80% |
| Porsi Pemasok | 75% | 20% |
| **Selisih Pendapatan RS** | - | **+Rp 10.848.420.000** |

**Kesimpulan:**
Dengan flat fee Rp 30.000, RS mendapat pendapatan **220% lebih tinggi** dibanding metode persentase 25%.


## Mencari Flat Fee yang Setara

Untuk mendapatkan pendapatan RS yang sama dengan metode persentase 25%, berapa flat fee yang harus dibayar?

### Perhitungan Flat Fee Setara

```
Target Pendapatan RS = Rp 4.931.100.000
Total Volume = 68.664 + 32.208 + 30.624 = 131.496

Pendapatan RS = (Tarif - Flat Fee) × Total Volume
4.931.100.000 = (150.000 - Flat Fee) × 131.496

Flat Fee = 150.000 - (4.931.100.000 / 131.496)
Flat Fee = 150.000 - 37.500
Flat Fee = Rp 112.500 per pemeriksaan
```

### Tabel Ekuivalensi

| Porsi RS (%) | Flat Fee Setara | Pendapatan RS | Pembayaran ke Pemasok |
|--------------|-----------------|---------------|----------------------|
| 10% | Rp 135.000 | Rp 1.972.440.000 | Rp 17.752.000.000 |
| 15% | Rp 127.500 | Rp 2.958.660.000 | Rp 16.765.380.000 |
| 20% | Rp 120.000 | Rp 3.944.880.000 | Rp 15.778.760.000 |
| 25% | Rp 112.500 | Rp 4.931.100.000 | Rp 14.792.140.000 |
| 30% | Rp 105.000 | Rp 5.917.320.000 | Rp 13.805.520.000 |
| 35% | Rp 97.500 | Rp 6.903.540.000 | Rp 12.818.900.000 |
| 40% | Rp 90.000 | Rp 7.889.760.000 | Rp 11.832.280.000 |

**Rumus Konversi:**
```
Flat Fee = Tarif × (1 - Porsi RS%)
Porsi RS% = (Tarif - Flat Fee) / Tarif
```


## Dampak pada Perhitungan EAT dan PV Expense

### Asumsi Overhead
- Overhead Langsung: Rp 50.000.000/tahun
- Overhead Alokasi: Rp 50.000.000/tahun
- Total Overhead: Rp 100.000.000/tahun
- Tax Rate: 13%
- Discount Rate: 10%
- Periode: 5 tahun

### Skenario 1: Metode Persentase (25%)

```
Pendapatan RS = Rp 4.931.100.000
Total Overhead = Rp 100.000.000
Operating Profit = 4.931.100.000 - 100.000.000 = Rp 4.831.100.000
EAT = 4.831.100.000 × (1 - 0.13) = Rp 4.203.057.000

PV Expense per tahun:
Tahun 1: 4.203,06 × 0.9091 = 3.821,14 juta
Tahun 2: 4.203,06 × 0.8264 = 3.473,77 juta
Tahun 3: 4.203,06 × 0.7513 = 3.158,06 juta
Tahun 4: 4.203,06 × 0.6830 = 2.871,69 juta
Tahun 5: 4.203,06 × 0.6209 = 2.610,08 juta

Total PV Expense = 15.934,74 juta
```

### Skenario 2: Metode Flat Fee (Rp 30.000)

```
Pendapatan RS = Rp 15.779.520.000
Total Overhead = Rp 100.000.000
Operating Profit = 15.779.520.000 - 100.000.000 = Rp 15.679.520.000
EAT = 15.679.520.000 × (1 - 0.13) = Rp 13.641.182.400

PV Expense per tahun:
Tahun 1: 13.641,18 × 0.9091 = 12.401,07 juta
Tahun 2: 13.641,18 × 0.8264 = 11.273,70 juta
Tahun 3: 13.641,18 × 0.7513 = 10.248,82 juta
Tahun 4: 13.641,18 × 0.6830 = 9.316,93 juta
Tahun 5: 13.641,18 × 0.6209 = 8.470,03 juta

Total PV Expense = 51.710,55 juta
```

### Skenario 3: Metode Flat Fee Setara (Rp 112.500)

```
Pendapatan RS = Rp 4.931.100.000 (sama dengan metode persentase 25%)
Total Overhead = Rp 100.000.000
Operating Profit = 4.931.100.000 - 100.000.000 = Rp 4.831.100.000
EAT = 4.831.100.000 × (1 - 0.13) = Rp 4.203.057.000

Total PV Expense = 15.934,74 juta (sama dengan metode persentase 25%)
```

### Perbandingan Total PV Expense

| Metode | Total PV Expense | Selisih vs Persentase 25% |
|--------|------------------|---------------------------|
| Persentase 25% | 15.934,74 juta | - |
| Flat Fee Rp 30.000 | 51.710,55 juta | +35.775,81 juta (+224%) |
| Flat Fee Rp 112.500 | 15.934,74 juta | 0 (setara) |

**Catatan:** Total PV Expense yang lebih tinggi menunjukkan "opportunity cost" yang lebih besar, namun ini karena pendapatan RS jauh lebih tinggi.


## Rekomendasi Implementasi

### 1. Perubahan pada State Data

Tambahkan field baru pada `revenueShareData`:

```javascript
const [revenueShareData, setRevenueShareData] = useState({
  calculationMethod: 'percentage', // 'percentage' atau 'flatFee'
  rsShare: 25,
  supplierShare: 75,
  directOverhead: 50000000,
  allocatedOverhead: 50000000,
  taxRate: 13,
  discountRate: 10,
  period: 5,
  procedures: [
    { 
      id: 1, 
      name: 'Darah Rutin', 
      tariff: 150000, 
      volume: 68664,
      flatFee: 0  // Tambahan untuk metode flat fee
    },
    // ...
  ]
})
```

### 2. Perubahan pada Fungsi Perhitungan

File: `src/utils/calculations.js`

```javascript
export const calculateRevenueShare = (data) => {
  const { 
    calculationMethod,
    rsShare, 
    procedures,
    directOverhead, 
    allocatedOverhead, 
    taxRate, 
    discountRate,
    period 
  } = data
  
  // Hitung pendapatan berdasarkan metode
  let annualRevenueRp
  let totalPaymentToSupplier = 0
  
  if (calculationMethod === 'flatFee') {
    // Metode Flat Fee: RS dapat (Tarif - Flat Fee) × Volume
    annualRevenueRp = procedures.reduce((sum, proc) => {
      const rsRevenue = (proc.tariff - (proc.flatFee || 0)) * proc.volume
      totalPaymentToSupplier += (proc.flatFee || 0) * proc.volume
      return sum + rsRevenue
    }, 0)
  } else {
    // Metode Persentase: RS dapat Tarif × Porsi RS% × Volume
    annualRevenueRp = procedures.reduce((sum, proc) => {
      return sum + (proc.tariff * (rsShare / 100) * proc.volume)
    }, 0)
    
    // Hitung pembayaran ke supplier
    totalPaymentToSupplier = procedures.reduce((sum, proc) => {
      return sum + (proc.tariff * ((100 - rsShare) / 100) * proc.volume)
    }, 0)
  }
  
  // Konversi ke juta
  const annualRevenue = annualRevenueRp / 1000000
  const directOverheadMillion = directOverhead / 1000000
  const allocatedOverheadMillion = allocatedOverhead / 1000000
  
  // Hitung laba operasi
  const operatingProfit = annualRevenue - directOverheadMillion - allocatedOverheadMillion
  
  // Hitung EAT
  const eat = operatingProfit * (1 - taxRate / 100)
  
  // Hitung PV
  const yearlyData = []
  let totalPV = 0
  
  for (let year = 1; year <= period; year++) {
    const pvFactor = calculatePVFactor(discountRate, year)
    const pvExpense = Math.abs(eat) * pvFactor
    totalPV += pvExpense
    
    yearlyData.push({
      year,
      revenue: annualRevenue,
      directOverhead: directOverheadMillion,
      allocatedOverhead: allocatedOverheadMillion,
      operatingProfit,
      eat,
      pvFactor,
      pvExpense
    })
  }
  
  return {
    yearlyData,
    totalPV,
    annualRevenue,
    operatingProfit,
    eat,
    isProfit: eat > 0,
    totalPaymentToSupplier: totalPaymentToSupplier / 1000000,
    calculationMethod,
    procedures: procedures.map(proc => {
      if (calculationMethod === 'flatFee') {
        return {
          ...proc,
          annualRevenue: ((proc.tariff - (proc.flatFee || 0)) * proc.volume) / 1000000,
          annualPaymentToSupplier: ((proc.flatFee || 0) * proc.volume) / 1000000
        }
      } else {
        return {
          ...proc,
          annualRevenue: (proc.tariff * (rsShare / 100) * proc.volume) / 1000000,
          annualPaymentToSupplier: (proc.tariff * ((100 - rsShare) / 100) * proc.volume) / 1000000
        }
      }
    })
  }
}
```

### 3. Perubahan pada Form Input

Tambahkan:
- Radio button untuk memilih metode (Persentase / Flat Fee)
- Kolom "Flat Fee" pada tabel procedures (hanya muncul jika metode Flat Fee dipilih)
- Update template CSV sesuai metode yang dipilih
- Validasi input flat fee

### 4. Perubahan pada Tampilan Hasil

Tambahkan informasi:
- Metode perhitungan yang digunakan
- Total pembayaran ke supplier
- Breakdown per procedure (pendapatan RS vs pembayaran ke supplier)

