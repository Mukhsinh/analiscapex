# Checklist Testing UI/UX - 03 Maret 2026

## Persiapan Testing

- [ ] Development server berjalan (`npm run dev`)
- [ ] Browser terbuka di `http://localhost:5173`
- [ ] Login dengan akun yang sudah ada
- [ ] Ada data analisis yang tersimpan (minimal 2-3 analisis)

---

## 1. Testing Kartu Skor di Halaman Laporan & Grafik

### Langkah Testing:

1. **Lakukan Analisis Baru**
   - [ ] Isi form Leasing dengan data lengkap
   - [ ] Isi form Purchase dengan data lengkap
   - [ ] Isi form Revenue Sharing dengan data lengkap
   - [ ] Klik "Hitung Semua Analisis"

2. **Navigasi ke Laporan & Grafik**
   - [ ] Klik menu "Laporan & Grafik" di sidebar
   - [ ] Halaman laporan terbuka

3. **Verifikasi Kartu Skor**
   - [ ] Kartu "Leasing" menampilkan score (bukan 0)
   - [ ] Kartu "Purchase" menampilkan score (bukan 0)
   - [ ] Kartu "Revenue Share" menampilkan score (bukan 0)
   - [ ] Progress bar terisi sesuai dengan nilai score
   - [ ] Warna kartu berbeda: Biru (Leasing), Hijau (Purchase), Ungu (Revenue Share)
   - [ ] Label status muncul: "Sangat Baik", "Baik", "Cukup", atau "Kurang Baik"

### Expected Results:
```
Leasing: Score 68/100 (Baik) - Warna Biru
Purchase: Score 0/100 (Kurang Baik) - Warna Hijau
Revenue Share: Score 100/100 (Sangat Baik) - Warna Ungu
```

### Screenshot Lokasi:
- Kartu skor berada di bawah header "Laporan Analisis & Grafik"
- Tiga kartu berjajar horizontal (desktop) atau vertikal (mobile)

---

## 2. Testing Riwayat Analisis - Format Compact

### Langkah Testing:

1. **Navigasi ke Riwayat Analisis**
   - [ ] Klik menu "Riwayat Analisis" di sidebar
   - [ ] Halaman riwayat terbuka

2. **Verifikasi Format Compact Row**
   - [ ] Setiap analisis ditampilkan dalam satu baris compact
   - [ ] Badge tipe analisis terlihat (Leasing/Purchase/Revenue Sharing)
   - [ ] Nama equipment dan hospital terlihat jelas
   - [ ] Tanggal ditampilkan format: "03 Mar 2026"
   - [ ] Waktu ditampilkan format: "14:30"
   - [ ] Total PV ditampilkan dalam badge biru di sebelah kanan

3. **Verifikasi Tombol Aksi**
   - [ ] Ada 3 tombol di setiap baris:
     - Download PDF (icon merah)
     - Expand/Collapse (icon biru)
     - Hapus (icon abu-abu)
   - [ ] Hover pada tombol menampilkan tooltip
   - [ ] Hover pada tombol hapus berubah warna merah

### Expected Results:
```
[Leasing] Alat CR - Radiologi | RSUD Bendan | 03 Mar 2026 14:30 | [1,234 jt] [PDF][▼][X]
```

---

## 3. Testing Expand/Collapse Detail

### Langkah Testing:

1. **Klik Tombol Expand**
   - [ ] Klik icon panah bawah (▼) pada salah satu baris
   - [ ] Detail muncul dengan animasi smooth
   - [ ] Icon berputar 180° menjadi panah atas (▲)
   - [ ] Background detail berwarna abu-abu muda

2. **Verifikasi Konten Detail**
   - [ ] Judul "Detail Input Data" terlihat dengan icon
   - [ ] Parameter input ditampilkan dalam badge berwarna:
     - Initial Cost (biru)
     - RS Share (ungu)
     - Tax Rate (hijau)
     - Lease Period (orange)
   - [ ] Tabel prosedur ditampilkan (jika ada)
   - [ ] Parameter spesifik per tipe analisis terlihat
   - [ ] Hasil analisis ditampilkan dengan status

3. **Klik Tombol Collapse**
   - [ ] Klik icon panah atas (▲)
   - [ ] Detail tertutup dengan animasi smooth
   - [ ] Icon kembali ke panah bawah (▼)

### Expected Results:
- Detail expand/collapse bekerja smooth tanpa lag
- Hanya satu item yang dapat di-expand pada satu waktu
- Konten detail lengkap dan terformat dengan baik

---

## 4. Testing Download PDF Per Item

### Langkah Testing:

1. **Klik Tombol Download PDF**
   - [ ] Klik icon download (merah) pada salah satu baris
   - [ ] Browser menampilkan dialog save file
   - [ ] Nama file format: `Analisis-Leasing-Alat-CR-2026-03-03.pdf`

2. **Verifikasi Konten PDF**
   - [ ] Buka file PDF yang ter-download
   - [ ] Header berwarna biru dengan judul "LAPORAN ANALISIS CAPEX"
   - [ ] Nama hospital dan equipment terlihat
   - [ ] Tanggal dan waktu analisis terlihat
   - [ ] Tipe analisis terlihat jelas
   - [ ] Ringkasan hasil ditampilkan
   - [ ] Tabel detail input data terformat rapi
   - [ ] Tabel prosedur terformat rapi (jika ada)
   - [ ] Footer dengan nomor halaman

3. **Test Multiple Downloads**
   - [ ] Download PDF dari 2-3 item berbeda
   - [ ] Verifikasi setiap PDF memiliki konten yang sesuai
   - [ ] Verifikasi nama file berbeda sesuai item

### Expected Results:
- PDF ter-generate dalam 2-3 detik
- Format profesional dengan spacing yang tepat
- Semua data terlihat lengkap dan jelas
- Tidak ada data yang terpotong

---

## 5. Testing Download PDF Komprehensif (Laporan & Grafik)

### Langkah Testing:

1. **Navigasi ke Laporan & Grafik**
   - [ ] Klik menu "Laporan & Grafik"
   - [ ] Scroll ke bagian atas halaman

2. **Klik Tombol Unduh PDF**
   - [ ] Klik tombol "Unduh PDF" (merah) di bagian "Unduh Analisis"
   - [ ] Loading indicator muncul dengan progress
   - [ ] Status update terlihat: "Mempersiapkan PDF...", "Membuat halaman...", dll.

3. **Verifikasi Konten PDF Komprehensif**
   - [ ] PDF memiliki 5-6 halaman
   - [ ] **Halaman 1:** Cover & Ringkasan
     - Header biru dengan judul
     - Info box dengan tanggal dan discount rate
     - Tabel ringkasan perbandingan
     - Statistik komparatif
     - Box rekomendasi hijau
   - [ ] **Halaman 2:** Detail Leasing
     - Tabel yearly data lengkap
     - Total PV di footer
   - [ ] **Halaman 3:** Detail Purchase
     - Tabel yearly data dengan 7 kolom
     - Trade-in value
     - Total net PV
   - [ ] **Halaman 4:** Detail Revenue Sharing
     - Tabel yearly data dengan 8 kolom
     - Total PV
   - [ ] **Halaman 5-6:** Grafik & Visualisasi
     - Grafik trend line
     - Grafik score doughnut
     - Grafik radar multi-kriteria
     - Interpretasi grafik

4. **Verifikasi Format & Styling**
   - [ ] Font size formal (8-14pt)
   - [ ] Spacing tidak terlalu lebar
   - [ ] Tabel dengan border dan striped rows
   - [ ] Color coding konsisten
   - [ ] Footer di setiap halaman dengan nomor
   - [ ] Nilai dalam Rupiah penuh (bukan juta)

### Expected Results:
- PDF ter-generate dalam 10-15 detik
- Grafik ter-capture dengan jelas
- Semua halaman terformat profesional
- Tidak ada konten yang terpotong atau overlap

---

## 6. Testing Responsiveness

### Desktop (1920x1080)
- [ ] Kartu skor berjajar horizontal (3 kolom)
- [ ] Riwayat analisis terlihat compact
- [ ] Semua tombol terlihat jelas
- [ ] Detail expand tidak overflow

### Tablet (768x1024)
- [ ] Kartu skor berjajar horizontal atau 2 kolom
- [ ] Riwayat analisis tetap compact
- [ ] Tombol aksi terlihat
- [ ] Tabel prosedur scrollable horizontal

### Mobile (375x667)
- [ ] Kartu skor vertikal (1 kolom)
- [ ] Riwayat analisis stack vertikal
- [ ] Tombol aksi tetap accessible
- [ ] Detail expand tidak overflow

---

## 7. Testing Edge Cases

### Riwayat Kosong
- [ ] Navigasi ke Riwayat Analisis (user baru)
- [ ] Verifikasi pesan "Belum Ada Riwayat Analisis"
- [ ] Icon dan teks terlihat jelas

### Banyak Riwayat (50+ items)
- [ ] Scroll halaman riwayat
- [ ] Verifikasi performa tetap smooth
- [ ] Expand/collapse tetap responsive

### Data Incomplete
- [ ] Analisis tanpa prosedur
- [ ] Verifikasi tabel prosedur tidak muncul
- [ ] PDF tetap ter-generate dengan baik

### Network Error
- [ ] Matikan koneksi internet
- [ ] Coba refresh riwayat
- [ ] Verifikasi error message muncul
- [ ] Tombol "Coba Lagi" berfungsi

---

## 8. Testing Browser Compatibility

### Chrome/Edge (Chromium)
- [ ] Semua fitur berfungsi
- [ ] PDF download bekerja
- [ ] Grafik ter-render dengan baik

### Firefox
- [ ] Semua fitur berfungsi
- [ ] PDF download bekerja
- [ ] Grafik ter-render dengan baik

### Safari (jika tersedia)
- [ ] Semua fitur berfungsi
- [ ] PDF download bekerja
- [ ] Grafik ter-render dengan baik

---

## 9. Testing Performance

### Load Time
- [ ] Halaman Laporan & Grafik load < 2 detik
- [ ] Halaman Riwayat Analisis load < 2 detik
- [ ] Expand detail < 0.5 detik

### PDF Generation
- [ ] PDF per item generate < 3 detik
- [ ] PDF komprehensif generate < 15 detik
- [ ] Tidak ada freeze UI saat generate

### Memory Usage
- [ ] Buka DevTools > Performance
- [ ] Monitor memory saat generate PDF
- [ ] Verifikasi tidak ada memory leak

---

## 10. Testing Accessibility

### Keyboard Navigation
- [ ] Tab untuk navigasi antar tombol
- [ ] Enter untuk klik tombol
- [ ] Escape untuk close detail (jika applicable)

### Screen Reader (jika tersedia)
- [ ] Tombol memiliki aria-label atau title
- [ ] Konten terstruktur dengan heading
- [ ] Tabel memiliki header yang jelas

### Color Contrast
- [ ] Teks terlihat jelas di background
- [ ] Badge memiliki contrast ratio > 4.5:1
- [ ] Icon terlihat jelas

---

## Hasil Testing

### Summary
- Total Test Cases: ___
- Passed: ___
- Failed: ___
- Skipped: ___

### Issues Found
1. 
2. 
3. 

### Notes
- 
- 
- 

---

## Sign-off

**Tester:** _______________  
**Date:** _______________  
**Status:** [ ] Approved [ ] Needs Revision  

---

**Catatan:**
- Checklist ini harus dilakukan secara menyeluruh
- Screenshot atau screen recording direkomendasikan untuk dokumentasi
- Laporkan semua bug atau unexpected behavior
- Test di environment production sebelum deploy
