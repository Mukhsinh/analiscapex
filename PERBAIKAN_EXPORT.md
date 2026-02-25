# Perbaikan Fungsi Export

## Perubahan yang Dilakukan

### 1. Export Excel
**Sebelum:**
- Menghasilkan file CSV (Comma Separated Values)
- Format sederhana tanpa sheet terpisah
- Tidak ada formatting khusus

**Sesudah:**
- Menghasilkan file Excel (.xlsx) yang sebenarnya
- Menggunakan library `xlsx` untuk membuat workbook
- Memiliki 4 sheet terpisah:
  - **Ringkasan**: Informasi umum dan perbandingan
  - **Leasing**: Detail perhitungan leasing
  - **Borrow & Purchase**: Detail perhitungan pembelian
  - **Revenue Sharing**: Detail perhitungan revenue sharing
- Kolom otomatis disesuaikan lebarnya untuk keterbacaan
- Format lebih rapi dan profesional

### 2. Export PDF
**Sebelum:**
- Hanya membuka dialog print browser
- Tidak menghasilkan file PDF langsung
- Bergantung pada user untuk save as PDF

**Sesudah:**
- Menghasilkan file PDF langsung yang bisa diunduh
- Menggunakan library `jsPDF` untuk membuat dokumen
- Format laporan profesional dengan:
  - Header dengan judul dan informasi proyek
  - Tabel ringkasan perbandingan
  - Rekomendasi keputusan
  - Detail perhitungan leasing
  - Footer dengan copyright
- Loading indicator saat PDF sedang dibuat
- File otomatis terunduh tanpa dialog print

## Library yang Digunakan

1. **xlsx** (v0.18.5) - Untuk membuat file Excel
2. **jsPDF** (v2.5.2) - Untuk membuat file PDF (sudah ada)
3. **html2canvas** (v1.4.1) - Untuk capture HTML (sudah ada, tidak digunakan dalam implementasi ini)

## Cara Menggunakan

1. Pastikan semua data sudah diisi di form
2. Klik tombol "Unduh Excel" untuk mendapatkan file .xlsx
3. Klik tombol "Unduh PDF" untuk mendapatkan file .pdf
4. File akan otomatis terunduh dengan nama format: `Analisis-Capex-YYYY-MM-DD.xlsx/pdf`

## Testing

Untuk menguji fungsi export:
1. Jalankan aplikasi dengan `npm run dev`
2. Isi semua form dengan data sample
3. Klik tombol "Unduh Excel" dan verifikasi:
   - File berformat .xlsx
   - Memiliki 4 sheet
   - Data terformat dengan baik
4. Klik tombol "Unduh PDF" dan verifikasi:
   - File berformat .pdf
   - Memiliki header, tabel, dan footer
   - Layout profesional dan rapi

## Catatan Teknis

- Export Excel menggunakan array of arrays (aoa_to_sheet) untuk fleksibilitas
- Export PDF menggunakan jsPDF dengan manual layout untuk kontrol penuh
- Kedua fungsi memiliki error handling yang baik
- Loading indicator ditampilkan saat PDF sedang dibuat
