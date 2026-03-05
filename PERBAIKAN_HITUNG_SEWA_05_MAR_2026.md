# Perbaikan Halaman Hitung Sewa - 5 Maret 2026

## Masalah yang Ditemukan

1. **Field yang hilang di form**:
   - Harga Penawaran Sewa dari vendor tidak muncul
   - Analisa Komparasi tidak ditampilkan
   - Label masih menggunakan "Pendapatan" dan "ROI" (seharusnya "Biaya" dan "Feasibility")

2. **Riwayat tidak muncul**:
   - Data yang disimpan tidak muncul di halaman Riwayat Kalkulasi
   - Event listener untuk refresh tidak berfungsi optimal

3. **Database tidak lengkap**:
   - Field `discount_rate`, `vendor_quote`, `present_value_cost` belum ada
   - Field analisis kelayakan (`feasibility_status`, `price_difference`, dll) belum ada

## Perbaikan yang Dilakukan

### 1. Database Migration

**File**: `migrations/add_rental_analysis_fields.sql`

Menambahkan kolom baru ke tabel `rental_analysis`:
- `discount_rate` - Tingkat diskonto untuk PV (%)
- `vendor_quote` - Harga penawaran sewa dari vendor (Rp/tahun)
- `present_value_cost` - Present Value total biaya sewa (Rp)
- `feasibility_status` - Status kelayakan (LAYAK/TIDAK LAYAK)
- `price_difference` - Selisih harga (Rp)
- `price_difference_percent` - Persentase selisih (%)

**Cara menjalankan**:
```powershell
.\apply_rental_analysis_migration.ps1
```

### 2. Update Fungsi Database

**File**: `src/lib/database.js`

Fungsi `saveRentalAnalysis` diperbarui untuk menyimpan field baru:
```javascript
const insertData = {
  // ... field existing
  discount_rate: rentalData.discountRate || 0,
  vendor_quote: rentalData.vendorQuote || null,
  rental_price_per_year: calculatedResults.rentalPrice,
  present_value_cost: calculatedResults.presentValueCost || 0,
  feasibility_status: calculatedResults.feasibilityStatus || null,
  price_difference: calculatedResults.priceDifference || null,
  price_difference_percent: calculatedResults.priceDifferencePercent || null,
  // ...
}
```

### 3. Update Form Component

**File**: `src/components/RentalAnalysisForm.jsx`

**Perubahan**:
- Field "Harga Penawaran Sewa" sudah ada dan berfungsi dengan baik
- Analisa Komparasi ditampilkan dengan status kelayakan
- Label diperbarui:
  - "Total Pendapatan" → "Present Value Biaya Sewa"
  - "ROI" → "Feasibility Score"
- Fungsi `handleSaveAnalysis` diperbarui untuk menghitung dan menyimpan:
  - Present Value Cost
  - Feasibility Status
  - Price Difference
  - Price Difference Percent

### 4. Update History Component

**File**: `src/components/RentalAnalysisHistory.jsx`

**Perubahan**:
- Event listener untuk `refreshRentalHistory` sudah ada
- Tampilan card diperbarui menampilkan:
  - Harga Sewa/Tahun (Kalkulasi)
  - Present Value Biaya
  - Feasibility Status
- Menambahkan section "Analisis Perbandingan Harga" jika ada vendor quote
- Detail lengkap menampilkan semua field termasuk discount rate

## Fitur Baru

### 1. Analisis Kelayakan Harga Penawaran

Sistem sekarang dapat:
- Membandingkan harga kalkulasi dengan harga penawaran vendor
- Menentukan status kelayakan (LAYAK/TIDAK LAYAK)
- Memberikan rekomendasi negosiasi

**Logika Kelayakan**:
- **LAYAK**: Harga kalkulasi ≥ harga penawaran (penawaran lebih rendah/sama)
- **TIDAK LAYAK**: Harga kalkulasi < harga penawaran (penawaran lebih tinggi)

**Kategori**:
- Selisih > 15%: TIDAK LAYAK - Perlu Negosiasi Ulang
- Selisih 5-15%: TIDAK LAYAK - Dapat Dinegosiasikan
- Selisih ±5%: LAYAK - Harga Wajar
- Selisih -5 s/d -15%: LAYAK - Harga Sangat Baik
- Selisih < -15%: LAYAK - Harga Terlalu Rendah (Perlu Verifikasi)

### 2. Present Value Analysis

Sistem menghitung Present Value dari biaya sewa:
```
PV = Σ (Biaya Sewa Tahun ke-n / (1 + Discount Rate)^n)
```

Ini membantu membandingkan apakah lebih baik menyewa atau membeli alat dari perspektif nilai waktu uang.

### 3. Feasibility Score

Menampilkan skor kelayakan dalam bentuk grade:
- **A+**: Harga sangat rendah (perlu verifikasi)
- **A**: Harga sangat baik
- **B**: Harga wajar
- **C**: Perlu negosiasi
- **D**: Tidak layak
- **N/A**: Belum ada data penawaran

## Testing

### 1. Test Form Input

1. Buka halaman "Hitung Sewa"
2. Isi semua field termasuk:
   - Harga Beli Alat
   - Umur Ekonomis
   - Nilai Residu
   - Tingkat Keuntungan Vendor
   - Masa Sewa
   - **Discount Rate** (baru)
   - **Harga Penawaran Sewa** (baru)
3. Klik "Hitung" atau field akan auto-calculate
4. Verifikasi hasil menampilkan:
   - Harga Sewa per Tahun (Kalkulasi)
   - Present Value Biaya Sewa
   - Feasibility Score
   - Savings Potential

### 2. Test Analisis Komparasi

1. Masukkan Harga Penawaran Sewa
2. Verifikasi muncul section "Analisis Perbandingan Harga Penawaran"
3. Cek status kelayakan (LAYAK/TIDAK LAYAK)
4. Cek rekomendasi negosiasi

### 3. Test Save & History

1. Klik "Simpan Analisis"
2. Verifikasi muncul notifikasi sukses
3. Buka halaman "Riwayat Kalkulasi"
4. Verifikasi data muncul dengan:
   - Semua field baru
   - Analisis perbandingan (jika ada vendor quote)
   - Detail lengkap saat diklik

### 4. Test PDF Export

1. Setelah hitung, klik "Unduh PDF"
2. Verifikasi PDF berisi:
   - Data input lengkap termasuk discount rate dan vendor quote
   - Hasil perhitungan dengan PV
   - Analisis perbandingan (jika ada)
   - Rekomendasi negosiasi

## Checklist Verifikasi

- [ ] Migration database berhasil dijalankan
- [ ] Field baru muncul di form
- [ ] Harga Penawaran Sewa dapat diinput
- [ ] Analisa Komparasi muncul setelah input vendor quote
- [ ] Present Value dihitung dengan benar
- [ ] Feasibility Status ditentukan dengan benar
- [ ] Data tersimpan ke database dengan lengkap
- [ ] Riwayat menampilkan data baru
- [ ] Event refresh berfungsi (data muncul tanpa reload)
- [ ] PDF export mencakup semua field baru
- [ ] Detail lengkap menampilkan semua informasi

## Catatan Penting

1. **Backward Compatibility**: Data lama yang tidak memiliki field baru akan menampilkan nilai default (0 atau N/A)

2. **Vendor Quote Optional**: Field harga penawaran vendor bersifat opsional. Jika tidak diisi, analisis komparasi tidak akan ditampilkan.

3. **Discount Rate**: Default 0% jika tidak diisi, namun disarankan mengisi sesuai cost of capital perusahaan.

4. **Database Index**: Migration menambahkan index untuk performa query yang lebih baik.

## File yang Dimodifikasi

1. `src/lib/database.js` - Update fungsi saveRentalAnalysis
2. `src/components/RentalAnalysisForm.jsx` - Update form dan save logic
3. `src/components/RentalAnalysisHistory.jsx` - Update tampilan riwayat
4. `migrations/add_rental_analysis_fields.sql` - Migration database
5. `apply_rental_analysis_migration.ps1` - Script untuk apply migration

## Langkah Deployment

1. Jalankan migration database:
   ```powershell
   .\apply_rental_analysis_migration.ps1
   ```

2. Restart development server (jika perlu):
   ```powershell
   npm run dev
   ```

3. Test semua fitur sesuai checklist

4. Commit dan push ke repository

## Troubleshooting

### Data tidak muncul di riwayat
- Cek console browser untuk error
- Verifikasi user sudah login
- Cek network tab untuk response API
- Pastikan event listener terpasang

### Migration gagal
- Cek koneksi ke Supabase
- Verifikasi SUPABASE_SERVICE_ROLE_KEY di .env
- Jalankan migration manual via Supabase Dashboard

### Field baru tidak tersimpan
- Cek console untuk error saat save
- Verifikasi migration sudah dijalankan
- Cek struktur tabel di Supabase Dashboard

---

**Tanggal**: 5 Maret 2026  
**Status**: ✅ Selesai  
**Testing**: Pending
