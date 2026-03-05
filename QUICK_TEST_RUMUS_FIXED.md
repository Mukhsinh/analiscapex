# Quick Test - Rumus Perhitungan Baru (FIXED)

## 🎯 Tujuan
Memverifikasi bahwa rumus perhitungan baru sudah berfungsi dengan benar.

## 📊 Test Case

### Test Case 1: Data Standar
**Input:**
- Nama Alat: CT Scan 64 Slice
- Harga Beli: Rp 1.300.000.000
- Umur Ekonomis: 5 tahun
- Nilai Residu: Rp 130.000.000
- Tingkat Keuntungan: 20%
- Masa Sewa: 3 tahun
- Discount Rate: 10%

**Expected Output (Rumus Baru):**
```
Perhitungan:
= ((1.300.000.000 × (1 + 0,20) × 3) - 130.000.000) / 3
= ((1.300.000.000 × 1,20 × 3) - 130.000.000) / 3
= (4.680.000.000 - 130.000.000) / 3
= Rp 1.516.666.667 per tahun
```

**Verifikasi Manual:**
1. 1 + 0,20 = 1,20
2. 1,20 × 3 = 3,60
3. 1.300.000.000 × 3,60 = 4.680.000.000
4. 4.680.000.000 - 130.000.000 = 4.550.000.000
5. 4.550.000.000 / 3 = 1.516.666.666,67

### Test Case 2: Masa Sewa 1 Tahun
**Input:**
- Harga Beli: Rp 1.000.000.000
- Nilai Residu: Rp 100.000.000
- Tingkat Keuntungan: 15%
- Masa Sewa: 1 tahun

**Expected Output:**
```
= ((1.000.000.000 × (1 + 0,15) × 1) - 100.000.000) / 1
= ((1.000.000.000 × 1,15 × 1) - 100.000.000) / 1
= (1.150.000.000 - 100.000.000) / 1
= Rp 1.050.000.000 per tahun
```

### Test Case 3: Masa Sewa 5 Tahun
**Input:**
- Harga Beli: Rp 500.000.000
- Nilai Residu: Rp 50.000.000
- Tingkat Keuntungan: 25%
- Masa Sewa: 5 tahun

**Expected Output:**
```
= ((500.000.000 × (1 + 0,25) × 5) - 50.000.000) / 5
= ((500.000.000 × 1,25 × 5) - 50.000.000) / 5
= (3.125.000.000 - 50.000.000) / 5
= Rp 615.000.000 per tahun
```

### Test Case 4: Tanpa Nilai Residu
**Input:**
- Harga Beli: Rp 1.000.000.000
- Nilai Residu: Rp 0
- Tingkat Keuntungan: 20%
- Masa Sewa: 3 tahun

**Expected Output:**
```
= ((1.000.000.000 × (1 + 0,20) × 3) - 0) / 3
= ((1.000.000.000 × 1,20 × 3) - 0) / 3
= 3.600.000.000 / 3
= Rp 1.200.000.000 per tahun
```

**Catatan Penting:** Dengan rumus baru, harga sewa per tahun adalah **KONSTAN** = Harga Beli × (1 + Margin), tidak peduli berapa lama masa sewa!

## ✅ Checklist Verifikasi

### 1. UI Display
- [ ] Rumus ditampilkan dengan benar di bagian "Hasil Perhitungan"
- [ ] Format rumus: `((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa) - Nilai Residu) / Masa Sewa`
- [ ] Perhitungan contoh menampilkan perkalian dengan benar (bukan pangkat)

### 2. Calculation Logic
- [ ] Hasil perhitungan sesuai dengan expected output
- [ ] Untuk masa sewa berbeda dengan input sama, keuntungan per tahun tetap konstan
- [ ] Tidak ada error di console browser

### 3. PDF Export
- [ ] Rumus di PDF menampilkan format baru (dengan perkalian, bukan pangkat)
- [ ] Perhitungan contoh di PDF benar
- [ ] Layout PDF tidak rusak

### 4. Database Save
- [ ] Data tersimpan dengan hasil perhitungan yang benar
- [ ] Field `rental_price` berisi nilai yang sesuai
- [ ] Tidak ada error saat save

### 5. Verifikasi Konsistensi
- [ ] Harga sewa per tahun konstan untuk berbagai masa sewa (dengan input sama)
- [ ] Hasil jauh lebih tinggi dari rumus lama (untuk masa sewa > 1)
- [ ] Untuk masa sewa = 1, hasil sama dengan rumus lama

## 🧪 Langkah Testing

### Step 1: Buka Aplikasi
```bash
# Pastikan dev server berjalan
npm run dev
```

### Step 2: Navigate ke Analisa Sewa
1. Login ke aplikasi
2. Klik menu "Analisa Sewa"
3. Isi form dengan Test Case 1

### Step 3: Verifikasi Hasil
1. Lihat hasil perhitungan
2. Bandingkan dengan expected output
3. Screenshot hasil untuk dokumentasi

### Step 4: Test Konsistensi
1. Gunakan input yang sama tapi ubah masa sewa
2. Verifikasi bahwa harga sewa per tahun tetap sama
3. Contoh:
   - Masa 1 tahun: Rp 1.200.000.000/tahun
   - Masa 3 tahun: Rp 1.200.000.000/tahun
   - Masa 5 tahun: Rp 1.200.000.000/tahun

### Step 5: Test PDF Export
1. Klik tombol "Unduh PDF"
2. Buka PDF yang diunduh
3. Verifikasi rumus dan perhitungan di PDF

### Step 6: Test Database Save
1. Klik tombol "Simpan Analisis"
2. Cek di Riwayat Analisa Sewa
3. Verifikasi data tersimpan dengan benar

### Step 7: Test dengan Test Case Lainnya
1. Ulangi dengan Test Case 2, 3, dan 4
2. Verifikasi semua hasil sesuai

## 📝 Hasil Testing

### Test Case 1:
- [ ] PASS / [ ] FAIL
- Hasil: _______________
- Catatan: _______________

### Test Case 2:
- [ ] PASS / [ ] FAIL
- Hasil: _______________
- Catatan: _______________

### Test Case 3:
- [ ] PASS / [ ] FAIL
- Hasil: _______________
- Catatan: _______________

### Test Case 4:
- [ ] PASS / [ ] FAIL
- Hasil: _______________
- Catatan: _______________

### PDF Export:
- [ ] PASS / [ ] FAIL
- Catatan: _______________

### Database Save:
- [ ] PASS / [ ] FAIL
- Catatan: _______________

### Konsistensi Harga:
- [ ] PASS / [ ] FAIL
- Catatan: _______________

## 🐛 Issues Found

| No | Issue | Severity | Status |
|----|-------|----------|--------|
| 1  |       |          |        |
| 2  |       |          |        |

## 💡 Insight Penting

Dengan rumus baru:
```
Harga Sewa per Tahun = Harga Beli × (1 + Margin)
```

Ini berarti harga sewa per tahun adalah **KONSTAN** dan tidak bergantung pada masa sewa. Vendor mendapat keuntungan yang sama setiap tahun, yang lebih masuk akal secara bisnis.

## ✅ Sign Off

- Tested by: _______________
- Date: _______________
- Status: [ ] APPROVED / [ ] NEEDS FIX

---

**Note**: Pastikan semua test case PASS dan harga sewa per tahun konsisten sebelum deploy ke production.
