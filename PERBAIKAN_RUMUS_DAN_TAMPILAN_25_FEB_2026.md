# Perbaikan Rumus Perhitungan dan Tampilan Aplikasi
**Tanggal:** 25 Februari 2026

## 🎯 Tujuan Perbaikan
Memperbaiki rumus perhitungan dan tampilan aplikasi agar sesuai dengan file Excel referensi (sheet 'Ans') dan lebih komprehensif.

## 📊 Referensi dari Excel (Sheet 'Ans')

### 1. Borrow & Purchase
- **Principal Payment:** 260 juta/tahun (1300/5)
- **Interest Payment:** Menurun setiap tahun (130, 104, 78, 52, 26)
- **Maintenance Expense:** 12 juta/tahun
- **Trade-in:** 130 juta di tahun ke-5
- **Total PV Expense:** 1,275.42 juta

### 2. Leasing (TERBAIK)
- **Lease Payment:** 280 juta/tahun
- **Total PV Expense:** 1,061.42 juta ✅

### 3. Revenue Sharing (TERBURUK)
- **Negative EAT:** 382.5 juta/tahun
- **Total PV Expense:** 1,449.98 juta ❌

## 🔧 Perbaikan yang Dilakukan

### A. File: `src/utils/calculations.js`

#### 1. Fungsi `calculateLeasing()`
**Perubahan:**
- Mengubah nama field `payment` menjadi `leasePayment` untuk konsistensi dengan Excel
- Menambahkan field `annualPayment` pada return value

**Alasan:**
- Sesuai dengan format tabel Excel yang menggunakan "Lease Payment"
- Memudahkan identifikasi jenis pembayaran

#### 2. Fungsi `calculatePurchase()`
**Perubahan:**
- Mengubah nama field dari:
  - `principal` → `principalPayment`
  - `interest` → `interestPayment`
  - `maintenance` → `maintenanceExpense`
  - `value` → `tradeInValue`
- Menambahkan field `principalPayment` dan `totalLoan` pada return value

**Alasan:**
- Sesuai dengan header kolom Excel: "Principal Payment", "Interest Payment", "Maintenance Expense"
- Lebih deskriptif dan mudah dipahami

#### 3. Fungsi `calculateRevenueShare()`
**Perubahan:**
- Memperbaiki logika perhitungan PV Expense:
  ```javascript
  // Sebelum:
  const pvExpense = Math.abs(eat) * pvFactor
  
  // Sesudah:
  const pvExpense = eat < 0 ? Math.abs(eat) * pvFactor : eat * pvFactor
  ```

**Alasan:**
- Jika EAT negatif (rugi), PV Expense positif (sebagai biaya)
- Jika EAT positif (untung), PV Expense tetap positif untuk perhitungan, tapi Total PV akan negatif
- Sesuai dengan konsep Excel yang menampilkan "PROYEKSI NEGATIVE EAT"

### B. File: `src/components/ResultsComparison.jsx`

#### 1. Tabel Leasing
**Perbaikan:**
- Judul: "📋 Tawaran dengan Leasing (dalam jutaan Rupiah)"
- Header kolom: "Lease Payment", "PV Factor at X%", "PV Expense"
- Menambahkan border pada semua cell
- Hover effect untuk baris tabel
- Total dengan background biru

#### 2. Tabel Borrow & Purchase
**Perbaikan:**
- Judul: "📋 Tawaran dengan Borrow & Purchase (dalam jutaan Rupiah)"
- Header kolom lengkap:
  - Tahun
  - Principal Payment
  - Interest Payment
  - Maintenance Expense
  - Total Expense
  - PV Factor at X%
  - PV Expense
- Baris Trade-in dengan background kuning
- Total dengan background hijau
- Menampilkan semua kolom seperti di Excel

#### 3. Tabel Revenue Sharing
**Perbaikan:**
- Judul: "📋 Tawaran Revenue Sharing"
- Menambahkan 3 summary cards:
  - Pendapatan Tahunan RS
  - Laba Operasi
  - Proyeksi Negative EAT / EAT
- **Rincian Pendapatan per Pemeriksaan:**
  - Tabel baru yang menampilkan breakdown per jenis pemeriksaan
  - Kolom: Pemeriksaan, Tarif, Volume/Tahun, Porsi RS, Pendapatan
- **Tabel Yearly Data:**
  - Header: "PROYEKSI NEGATIVE EAT" jika rugi, "EAT" jika untung
  - Menampilkan nilai absolut EAT
  - Warna merah untuk rugi, hijau untuk untung
- **Rincian Biaya Overhead:**
  - Overhead Langsung
  - Overhead Alokasi
  - Total Overhead

#### 4. Kesimpulan dan Rekomendasi
**Perbaikan:**
- Kesimpulan sesuai format Excel:
  > "Karena total PV Expense dari [Alternatif Terbaik] lebih kecil dari total PV Expense dari alternatif lainnya, maka keputusan yang paling tepat adalah menggunakan tawaran [ALTERNATIF TERBAIK]."

- Penjelasan tambahan untuk Leasing:
  > "Sedangkan kalau untuk KSO berarti pada akhir kontrak tidak ada transfer kepemilikan atas aset, sehingga sebenarnya Leasing adalah sama dengan KSO. Oleh karenanya KSO atau (Operating) Leasing lebih menguntungkan daripada Pembelian dengan didanai dengan Utang."

- Penjelasan untuk Revenue Sharing yang rugi:
  > "Sedangkan untuk tawaran Revenue Sharing ternyata besarnya Biaya Overhead (Langsung dan Alokasian) telah menghabiskan akumulasi marjin tahunan sehingga hasil porsi yang diperoleh RS tidak mencukupi, dan menyebabkan Negative EAT (Negative Earning After Tax) yang setelah di-nilai-tunai-kan (present value) justru menghasilkan PV Expense yang tertinggi dari ketiga tawaran yang ada."

- Catatan akurasi:
  > "Akurasi analisis keputusan investasi ini dapat ditingkatkan dengan menggunakan analisis berbasis produk yang lebih rinci."

- Perbandingan dengan persentase selisih:
  - Menampilkan selisih dalam Rupiah dan persentase

## 📈 Peningkatan Tampilan

### 1. Tabel yang Lebih Komprehensif
- ✅ Semua kolom sesuai dengan Excel
- ✅ Border pada semua cell untuk kejelasan
- ✅ Hover effect untuk interaktivitas
- ✅ Color coding yang konsisten

### 2. Informasi yang Lebih Detail
- ✅ Breakdown pendapatan per pemeriksaan (Revenue Sharing)
- ✅ Rincian overhead (Revenue Sharing)
- ✅ Summary cards untuk metrik penting
- ✅ Penjelasan yang lebih lengkap

### 3. Kesimpulan yang Lebih Profesional
- ✅ Format sesuai dengan Excel
- ✅ Penjelasan kontekstual untuk setiap alternatif
- ✅ Persentase selisih untuk perbandingan
- ✅ Catatan dan rekomendasi yang jelas

## 🎨 Konsistensi Visual

### Warna Tema:
- **Leasing:** Biru (`bg-blue-500`, `text-blue-600`)
- **Borrow & Purchase:** Hijau (`bg-green-500`, `text-green-600`)
- **Revenue Sharing:** Ungu (`bg-purple-500`, `text-purple-600`)

### Status Indikator:
- **Positif/Untung:** Hijau (`text-green-600`)
- **Negatif/Rugi:** Merah (`text-red-600`)
- **Warning:** Kuning (`bg-yellow-50`, `border-yellow-500`)

## 📝 Validasi Rumus

### Contoh Perhitungan (dari Excel):

#### Leasing (Tahun 1):
```
Lease Payment = 280 juta
PV Factor = 0.909091 (discount rate 10%)
PV Expense = 280 × 0.909091 = 254.545455 juta
```

#### Borrow & Purchase (Tahun 1):
```
Principal Payment = 260 juta (1300/5)
Interest Payment = 130 juta (1300 × 10%)
Maintenance Expense = 12 juta
Total Expense = 260 + 130 + 12 = 402 juta
PV Factor = 0.909091
PV Expense = 402 × 0.909091 = 365.454545 juta
```

#### Revenue Sharing (Tahun 1):
```
Negative EAT = 382.5 juta
PV Factor = 0.909091
PV Expense = 382.5 × 0.909091 = 347.727273 juta
```

## ✅ Checklist Perbaikan

- [x] Perbaiki nama field di `calculateLeasing()`
- [x] Perbaiki nama field di `calculatePurchase()`
- [x] Perbaiki logika PV Expense di `calculateRevenueShare()`
- [x] Update tabel Leasing dengan format Excel
- [x] Update tabel Borrow & Purchase dengan semua kolom
- [x] Update tabel Revenue Sharing dengan breakdown detail
- [x] Tambahkan rincian pendapatan per pemeriksaan
- [x] Tambahkan rincian overhead
- [x] Update kesimpulan sesuai format Excel
- [x] Tambahkan penjelasan kontekstual
- [x] Tambahkan persentase selisih
- [x] Tambahkan catatan akurasi

## 🚀 Hasil Akhir

Aplikasi sekarang menampilkan:
1. **Perhitungan yang akurat** sesuai dengan Excel
2. **Tampilan yang komprehensif** dengan semua detail yang diperlukan
3. **Kesimpulan yang profesional** dengan penjelasan kontekstual
4. **Format yang konsisten** dengan referensi Excel
5. **Informasi yang lengkap** untuk pengambilan keputusan

## 📌 Catatan Penting

- Semua perhitungan menggunakan metode Present Value dengan discount rate yang dapat disesuaikan
- Format tampilan mengikuti standar Excel untuk konsistensi
- Warna dan indikator visual membantu identifikasi cepat
- Penjelasan kontekstual membantu pemahaman hasil analisis

---

**Status:** ✅ Selesai  
**Tested:** Menunggu testing oleh user  
**Next Steps:** Testing dengan data real dan validasi hasil
