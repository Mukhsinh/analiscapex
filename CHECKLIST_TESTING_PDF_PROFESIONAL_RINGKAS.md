# Checklist Testing PDF Profesional dan Ringkas
**Tanggal**: 3 Maret 2026  
**Status**: Ready for Testing

## Persiapan Testing

### 1. Jalankan Aplikasi
```bash
npm run dev
```

### 2. Buka Browser
- URL: http://localhost:5173
- Login dengan kredensial yang valid

## Checklist Testing - Halaman 1 (Cover & Ringkasan)

### Header Cover
- [ ] Tinggi header: 38mm (lebih ringkas dari 45mm)
- [ ] Font judul: 16pt (lebih kecil dari 18pt)
- [ ] Font nama RS: 10pt (lebih kecil dari 11pt)
- [ ] Font equipment: 8pt (lebih kecil dari 9pt)
- [ ] Font tanggal: 7pt (lebih kecil dari 8pt)
- [ ] Semua teks terbaca dengan jelas
- [ ] Warna biru header terlihat profesional

### Info Box
- [ ] Tinggi box: 13mm (lebih ringkas dari 16mm)
- [ ] Font: 7pt (lebih kecil dari 8pt)
- [ ] 3 baris informasi terlihat jelas
- [ ] Spasi antar baris: 4mm (lebih kompak)
- [ ] Background biru muda terlihat baik

### Section: Ringkasan Perbandingan
- [ ] Font header: 11pt (lebih kecil dari 13pt)
- [ ] Spasi setelah header: 5mm (lebih kompak dari 6mm)
- [ ] Tabel terlihat proporsional

### Tabel Ringkasan
- [ ] Header font: 9pt (lebih kecil dari 11pt)
- [ ] Body font: 8pt (lebih kecil dari 10pt)
- [ ] Cell padding: 2mm (lebih kompak dari 3mm)
- [ ] 3 kolom terlihat jelas
- [ ] Nilai Rupiah terformat dengan benar
- [ ] Status "✓ Terbaik" terlihat jelas

### Statistik Komparatif
- [ ] Header font: 10pt (lebih kecil dari 13pt)
- [ ] Body font: 8pt (lebih kecil dari 10pt)
- [ ] 4 bullet points terlihat jelas
- [ ] Spasi antar baris: 4mm (lebih kompak dari 5mm)
- [ ] Nilai terformat dengan benar

### Rekomendasi Box
- [ ] Tinggi box: 18mm (lebih ringkas dari 26mm)
- [ ] Font header: 11pt (lebih kecil dari 14pt)
- [ ] Font body: 9pt (lebih kecil dari 11pt)
- [ ] Background hijau muda terlihat baik
- [ ] Border hijau terlihat profesional
- [ ] 2 baris teks terlihat jelas

## Checklist Testing - Halaman 2 (Detail Leasing)

### Header Section
- [ ] Font judul: 12pt (lebih kecil dari 13pt)
- [ ] Spasi setelah judul: 6mm
- [ ] Warna biru terlihat konsisten

### Tabel Leasing
- [ ] Header font: 9pt
- [ ] Body font: 8pt
- [ ] Cell padding: 2mm (header), 1.5mm (body)
- [ ] 4 kolom terlihat jelas
- [ ] Nilai Rupiah terformat dengan benar
- [ ] PV Factor dengan 4 desimal
- [ ] Footer "TOTAL" terlihat jelas
- [ ] Striped rows terlihat baik

## Checklist Testing - Halaman 3 (Detail Purchase)

### Header Section
- [ ] Font judul: 12pt
- [ ] Spasi setelah judul: 6mm
- [ ] Warna biru terlihat konsisten

### Tabel Purchase
- [ ] Header font: 8pt (lebih kecil untuk 7 kolom)
- [ ] Body font: 7pt (lebih kecil untuk 7 kolom)
- [ ] Cell padding: 2mm (header), 1.5mm (body)
- [ ] 7 kolom terlihat jelas (tidak terlalu sesak)
- [ ] Semua nilai terformat dengan benar
- [ ] Trade-in value terlihat jelas
- [ ] Footer "TOTAL NET PV" terlihat jelas

## Checklist Testing - Halaman 4 (Detail Revenue Sharing)

### Header Section
- [ ] Font judul: 12pt
- [ ] Spasi setelah judul: 6mm
- [ ] Warna biru terlihat konsisten

### Tabel Revenue Sharing
- [ ] Header font: 7pt (lebih kecil untuk 8 kolom)
- [ ] Body font: 6-7pt (lebih kecil untuk 8 kolom)
- [ ] Cell padding: 1.5mm
- [ ] 8 kolom terlihat jelas (tidak terlalu sesak)
- [ ] Semua nilai terformat dengan benar
- [ ] Footer "TOTAL" terlihat jelas

## Checklist Testing - Footer (Semua Halaman)

### Footer Elements
- [ ] Garis pemisah terlihat jelas
- [ ] Copyright text: 7-8pt
- [ ] Nomor halaman terlihat jelas
- [ ] Format: "Halaman X dari 4"
- [ ] Konsisten di semua halaman

## Checklist Testing - Poin 5 (Grafik)

### Verifikasi Penghapusan
- [ ] **TIDAK ADA** halaman 5 dengan grafik
- [ ] Total halaman: **4 halaman** (bukan 5)
- [ ] Tidak ada error grafik yang ditampilkan
- [ ] Tidak ada pesan "Grafik trend tidak dapat ditampilkan"

## Checklist Testing - Keseluruhan

### Konsistensi
- [ ] Semua header section menggunakan font 12pt
- [ ] Semua tabel menggunakan font yang konsisten
- [ ] Spasi vertikal konsisten di semua halaman
- [ ] Warna konsisten di semua halaman

### Readability
- [ ] Semua teks mudah dibaca (tidak terlalu kecil)
- [ ] Tidak ada teks yang terpotong
- [ ] Tidak ada overlap antar elemen
- [ ] White space cukup (tidak terlalu sesak)

### Professional Look
- [ ] Tampilan terlihat bersih dan terorganisir
- [ ] Hierarki visual jelas (header > subheader > body)
- [ ] Warna harmonis dan profesional
- [ ] Layout seimbang dan proporsional

### File Output
- [ ] Nama file: `Laporan-Analisis-Capex-[Equipment]-[Date].pdf`
- [ ] Ukuran file reasonable (tidak terlalu besar)
- [ ] PDF dapat dibuka dengan berbagai PDF reader
- [ ] Dapat di-print dengan baik

## Testing dengan Berbagai Data

### Test Case 1: Data Normal
- [ ] Periode: 5 tahun
- [ ] Semua nilai positif
- [ ] Hasil: PDF tergenerate dengan baik

### Test Case 2: Data Periode Panjang
- [ ] Periode: 10 tahun
- [ ] Tabel tidak overflow
- [ ] Hasil: PDF tergenerate dengan baik

### Test Case 3: Revenue Sharing Negatif
- [ ] EAT negatif
- [ ] Nilai negatif terformat dengan benar
- [ ] Hasil: PDF tergenerate dengan baik

### Test Case 4: Nilai Besar
- [ ] Nilai > 1 miliar
- [ ] Format Rupiah tetap terbaca
- [ ] Hasil: PDF tergenerate dengan baik

## Perbandingan Sebelum vs Sesudah

### Ukuran Font
| Elemen | Sebelum | Sesudah | Status |
|--------|---------|---------|--------|
| Judul Utama | 18pt | 16pt | [ ] OK |
| Section Header | 13pt | 11-12pt | [ ] OK |
| Table Header | 11pt | 8-9pt | [ ] OK |
| Table Body | 10pt | 7-8pt | [ ] OK |
| Body Text | 10pt | 8-9pt | [ ] OK |

### Spasi Vertikal
| Elemen | Sebelum | Sesudah | Status |
|--------|---------|---------|--------|
| Header Height | 45mm | 38mm | [ ] OK |
| Info Box | 16mm | 13mm | [ ] OK |
| Section Spacing | 10-12mm | 7-8mm | [ ] OK |
| Line Spacing | 5-6mm | 4mm | [ ] OK |
| Rekomendasi Box | 26mm | 18mm | [ ] OK |

### Jumlah Halaman
| Laporan | Sebelum | Sesudah | Status |
|---------|---------|---------|--------|
| Analisis Capex | 5 halaman | 4 halaman | [ ] OK |
| Poin 5 (Grafik) | Ada | **Dihapus** | [ ] OK |

## Issues Found

### Critical Issues
- [ ] Tidak ada

### Major Issues
- [ ] Tidak ada

### Minor Issues
- [ ] Tidak ada

## Sign-off

### Developer
- [ ] Semua perbaikan diimplementasi
- [ ] Testing lokal passed
- [ ] Dokumentasi lengkap

### QA
- [ ] Semua checklist passed
- [ ] Tidak ada critical/major issues
- [ ] Ready for production

### User
- [ ] Tampilan lebih profesional
- [ ] Ukuran huruf sesuai
- [ ] Spasi lebih kompak
- [ ] Poin 5 sudah dihapus

---
**Catatan**: Centang semua item setelah verifikasi. Jika ada issue, catat di bagian "Issues Found".
