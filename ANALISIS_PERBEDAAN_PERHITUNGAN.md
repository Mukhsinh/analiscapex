# Analisis Perbedaan Perhitungan Aplikasi vs Excel

## 🔍 Temuan dari Screenshot

### Hasil di Aplikasi:
- **Leasing:** 556.03 juta
- **Borrow & Purchase:** 539.38 juta
- **Revenue Sharing:** 12,240.29 juta

### Hasil di Excel (Sheet "Ans"):
- **Leasing:** 1,061.42 juta ✅
- **Borrow & Purchase:** 1,275.42 juta ✅
- **Revenue Sharing:** 1,449.98 juta ✅

## ❌ Masalah yang Ditemukan

### 1. LEASING - Input Per Bulan vs Per Tahun

**Di App.jsx:**
```javascript
monthlyPayment: 280000000  // 280 juta per BULAN
```

**Perhitungan di calculations.js:**
```javascript
const annualPayment = monthlyPayment * 12  // 280 juta × 12 = 3,360 juta/tahun
```

**Di Excel:**
```
Lease Payment = 280 juta per TAHUN (bukan per bulan!)
```

**KESIMPULAN:** 
- Aplikasi menghitung 280 juta × 12 = 3,360 juta/tahun
- Excel menggunakan 280 juta/tahun
- Perbedaan: 12x lipat!

**SOLUSI:**
Ubah input dari "per bulan" menjadi "per tahun" ATAU ubah default value menjadi 23.33 juta/bulan (280/12)

---

### 2. BORROW & PURCHASE - Maintenance Cost Salah

**Di App.jsx:**
```javascript
maintenanceCost: 20000000  // 20 juta per tahun
```

**Di Excel:**
```
Maintenance Expense = 12 juta per tahun
```

**KESIMPULAN:**
- Aplikasi: 20 juta
- Excel: 12 juta
- Perbedaan: 8 juta/tahun

**SOLUSI:**
Ubah default value menjadi 12 juta

---

### 3. REVENUE SHARING - Overhead Calculation

**Di App.jsx:**
```javascript
directOverhead: 1632000000     // 1.632 miliar
allocatedOverhead: 240000000   // 240 juta
Total Overhead: 1.872 miliar
```

**Perhitungan Revenue:**
```
Procedures:
- Darah Rutin: 150,000 × 15% × 68,664 = 1,544,940,000
- Creatinin: 150,000 × 15% × 32,208 = 724,680,000
- Urea/BUN: 150,000 × 15% × 30,624 = 689,040,000
Total Revenue = 2,958,660,000 (2,958.66 juta)
```

**Dari Excel - Reverse Engineering:**
```
Negative EAT = 382.5 juta
Tax Rate = 15% (asumsi, bisa juga 13%)

Jika Tax Rate = 15%:
EAT = Operating Profit × (1 - 0.15)
382.5 = Operating Profit × 0.85
Operating Profit = 382.5 / 0.85 = 450 juta (NEGATIF)

Operating Profit = Revenue - Total Overhead
-450 = Revenue - Total Overhead
Total Overhead = Revenue + 450

Jika Revenue = 2,958.66 juta:
Total Overhead = 2,958.66 + 450 = 3,408.66 juta

Tapi ini tidak masuk akal...
```

**Kemungkinan lain - Porsi RS berbeda:**

Jika di Excel menggunakan porsi RS = 25% (bukan 15%):
```
Revenue = (150,000 × 0.25 × 68,664) + (150,000 × 0.25 × 32,208) + (150,000 × 0.25 × 30,624)
= 2,574,900,000 + 1,207,800,000 + 1,148,400,000
= 4,931,100,000 (4,931.1 juta)

Operating Profit = -450 juta
Total Overhead = 4,931.1 + 450 = 5,381.1 juta

Atau jika Tax Rate = 13%:
382.5 = Operating Profit × 0.87
Operating Profit = 382.5 / 0.87 = 439.66 juta (NEGATIF)
Total Overhead = 4,931.1 + 439.66 = 5,370.76 juta
```

**KESIMPULAN:**
Ada ketidaksesuaian data antara aplikasi dan Excel. Perlu verifikasi:
1. Porsi RS: 15% atau 25%?
2. Tax Rate: 13% atau 15%?
3. Overhead: Berapa sebenarnya?

---

## 🔧 Perbaikan yang Diperlukan

### A. Perbaiki Input Leasing

**Opsi 1: Ubah ke input tahunan**
```javascript
// Di LeasingForm.jsx
<label>Pembayaran Leasing per Tahun (Rp)</label>

// Di calculations.js
const annualPayment = annualPaymentInput  // Langsung gunakan input tahunan
```

**Opsi 2: Ubah default value**
```javascript
// Di App.jsx
monthlyPayment: 23333333  // 280 juta / 12 bulan
```

### B. Perbaiki Maintenance Cost

```javascript
// Di App.jsx
maintenanceCost: 12000000  // 12 juta (sesuai Excel)
```

### C. Verifikasi dan Perbaiki Revenue Sharing

Perlu data yang benar dari Excel atau user:
1. Berapa porsi RS yang sebenarnya?
2. Berapa tax rate yang digunakan?
3. Berapa overhead langsung dan alokasi yang benar?

---

## 📊 Perhitungan Ulang dengan Data yang Benar

### Asumsi Data Excel:
- Leasing: 280 juta/tahun
- Purchase: Loan 1,300 juta, Interest 10%, Maintenance 12 juta, Trade-in 130 juta
- Revenue Sharing: Porsi RS 25%, Tax 13%, Overhead yang menghasilkan negative EAT 382.5 juta

### Leasing (Benar):
```
Tahun 1: 280 × 0.909091 = 254.545455
Tahun 2: 280 × 0.826446 = 231.404959
Tahun 3: 280 × 0.751315 = 210.368144
Tahun 4: 280 × 0.683013 = 191.243768
Tahun 5: 280 × 0.620921 = 173.857970
Total PV = 1,061.420295 juta ✅
```

### Purchase (Benar):
```
Principal = 1300 / 5 = 260 juta/tahun

Tahun 1: (260 + 130 + 12) × 0.909091 = 365.454545
Tahun 2: (260 + 104 + 12) × 0.826446 = 310.815876
Tahun 3: (260 + 78 + 12) × 0.751315 = 262.960250
Tahun 4: (260 + 52 + 12) × 0.683013 = 221.296213
Tahun 5: (260 + 26 + 12) × 0.620921 = 184.834146
Trade-in: -130 × 0.620921 = -80.719772
Total PV = 1,275.422258 juta ✅
```

---

## ✅ Action Items

1. **URGENT:** Ubah input Leasing dari per bulan ke per tahun
2. **URGENT:** Ubah default maintenance cost dari 20 juta ke 12 juta
3. **VERIFIKASI:** Konfirmasi data Revenue Sharing yang benar dengan user
4. **TEST:** Hitung ulang dengan data yang sudah diperbaiki
5. **VALIDASI:** Bandingkan hasil dengan Excel

---

## 🎯 Expected Results Setelah Perbaikan

Setelah perbaikan, hasil aplikasi harus sama dengan Excel:
- Leasing: **1,061.42 juta**
- Borrow & Purchase: **1,275.42 juta**
- Revenue Sharing: **1,449.98 juta**

Ranking:
1. 🥇 Leasing (terbaik)
2. 🥈 Borrow & Purchase
3. 🥉 Revenue Sharing (terburuk - negative EAT)
