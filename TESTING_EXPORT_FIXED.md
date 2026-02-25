# Testing Export Functions - Setelah Perbaikan

## Persiapan Testing

1. Pastikan aplikasi berjalan:
```bash
npm run dev
```

2. Buka browser di `http://localhost:5173`

## Test Case 1: Export Excel

### Langkah Testing:
1. Isi semua form dengan data berikut:

**Leasing:**
- Monthly Payment: 280 juta Rp
- Period: 60 bulan
- Discount Rate: 10%

**Borrow & Purchase:**
- Loan Amount: 1300 juta Rp
- Interest Rate: 10%
- Period: 5 tahun
- Maintenance Cost: 20 juta Rp/tahun
- Residual Value: 130 juta Rp
- Discount Rate: 10%

**Revenue Sharing:**
- RS Share: 15%
- Supplier Share: 85%
- Direct Overhead: 1632 juta Rp
- Allocated Overhead: 240 juta Rp
- Tax Rate: 15%
- Discount Rate: 10%
- Period: 5 tahun

2. Klik tombol "Hitung & Bandingkan Semua Alternatif"
3. Scroll ke bagian "Unduh Analisis"
4. Klik tombol "Unduh Excel" (hijau)

### Expected Result:
✅ File dengan nama `Analisis-Capex-YYYY-MM-DD.xlsx` terunduh
✅ File berformat Excel (.xlsx), bukan CSV
✅ File memiliki 4 sheet:
   - Sheet 1: Ringkasan
   - Sheet 2: Leasing
   - Sheet 3: Borrow & Purchase
   - Sheet 4: Revenue Sharing
✅ Data terformat dengan baik dan kolom otomatis disesuaikan
✅ Angka ditampilkan dengan benar (tidak ada koma atau format aneh)

### Verifikasi Detail:
1. Buka file Excel yang terunduh
2. Periksa Sheet "Ringkasan":
   - Header dengan informasi proyek
   - Tabel perbandingan 3 alternatif
   - Rekomendasi keputusan
3. Periksa Sheet "Leasing":
   - Tabel dengan kolom: Tahun, Pembayaran, PV Factor, PV Expense
   - Baris total di akhir
4. Periksa Sheet "Borrow & Purchase":
   - Tabel lengkap dengan semua kolom
   - Baris Trade-in
   - Baris total
5. Periksa Sheet "Revenue Sharing":
   - Tabel lengkap dengan semua kolom
   - Baris total

## Test Case 2: Export PDF

### Langkah Testing:
1. Gunakan data yang sama dari Test Case 1
2. Pastikan hasil perhitungan sudah ditampilkan
3. Klik tombol "Unduh PDF" (merah)

### Expected Result:
✅ Muncul loading indicator "Membuat PDF..."
✅ File dengan nama `Analisis-Capex-YYYY-MM-DD.pdf` terunduh
✅ File berformat PDF, bukan membuka dialog print
✅ PDF memiliki struktur profesional:
   - Header dengan judul dan informasi proyek
   - Tabel ringkasan perbandingan
   - Rekomendasi keputusan
   - Detail perhitungan leasing
   - Footer dengan copyright
✅ Loading indicator hilang setelah PDF selesai

### Verifikasi Detail:
1. Buka file PDF yang terunduh
2. Periksa layout dan formatting:
   - Header centered dan bold
   - Tabel dengan border yang rapi
   - Font size yang sesuai
   - Spacing yang baik
3. Periksa konten:
   - Semua data sesuai dengan yang di aplikasi
   - Angka terformat dengan benar
   - Rekomendasi ditampilkan dengan jelas

## Test Case 3: Multiple Downloads

### Langkah Testing:
1. Unduh Excel
2. Tunggu selesai
3. Unduh PDF
4. Tunggu selesai
5. Unduh Excel lagi
6. Unduh PDF lagi

### Expected Result:
✅ Semua file terunduh dengan sukses
✅ Tidak ada error di console
✅ File memiliki nama yang unik (berdasarkan tanggal)
✅ Tidak ada konflik atau file yang tertimpa

## Test Case 4: Error Handling

### Langkah Testing:
1. Buka Developer Console (F12)
2. Coba unduh Excel dan PDF
3. Periksa console untuk error

### Expected Result:
✅ Tidak ada error di console
✅ Hanya ada log sukses: "Excel file downloaded successfully" dan "PDF file downloaded successfully"
✅ Jika ada error, muncul alert yang informatif

## Test Case 5: Data Validation

### Langkah Testing:
1. Ubah data input dengan nilai yang berbeda
2. Hitung ulang
3. Unduh Excel dan PDF
4. Verifikasi bahwa data di file sesuai dengan input terbaru

### Expected Result:
✅ Data di Excel dan PDF selalu sesuai dengan perhitungan terbaru
✅ Tidak ada data lama yang tertinggal
✅ Semua angka akurat

## Troubleshooting

### Masalah: File tidak terunduh
**Solusi:**
- Periksa browser settings untuk download
- Pastikan tidak ada popup blocker
- Cek console untuk error message

### Masalah: Excel masih berformat CSV
**Solusi:**
- Pastikan library xlsx terinstall: `npm list xlsx`
- Jika belum, install: `npm install xlsx`
- Restart dev server

### Masalah: PDF masih membuka print dialog
**Solusi:**
- Clear browser cache
- Restart dev server
- Periksa bahwa kode ExportButtons.jsx sudah terupdate

### Masalah: Data tidak sesuai
**Solusi:**
- Pastikan sudah klik "Hitung & Bandingkan" setelah mengubah data
- Refresh halaman dan coba lagi
- Periksa console untuk error

## Checklist Akhir

Sebelum menganggap testing selesai, pastikan:

- [ ] Excel terunduh dengan format .xlsx
- [ ] Excel memiliki 4 sheet yang terpisah
- [ ] Excel data terformat dengan baik
- [ ] PDF terunduh dengan format .pdf
- [ ] PDF tidak membuka print dialog
- [ ] PDF memiliki layout profesional
- [ ] Semua data akurat di kedua format
- [ ] Tidak ada error di console
- [ ] Multiple downloads berfungsi
- [ ] File naming konsisten

## Catatan Penting

1. **Browser Compatibility**: Testing dilakukan di Chrome/Edge. Untuk browser lain, mungkin ada perbedaan minor dalam rendering PDF.

2. **File Size**: File Excel biasanya 10-20 KB, PDF sekitar 50-100 KB tergantung jumlah data.

3. **Performance**: Export Excel instant, PDF membutuhkan 1-2 detik untuk generate.

4. **Encoding**: Excel menggunakan UTF-8 untuk support karakter Indonesia dengan baik.

## Hasil Testing

| Test Case | Status | Catatan |
|-----------|--------|---------|
| Export Excel | ⏳ Pending | Belum ditest |
| Export PDF | ⏳ Pending | Belum ditest |
| Multiple Downloads | ⏳ Pending | Belum ditest |
| Error Handling | ⏳ Pending | Belum ditest |
| Data Validation | ⏳ Pending | Belum ditest |

**Tester:** _____________
**Tanggal:** _____________
**Browser:** _____________
**OS:** _____________
