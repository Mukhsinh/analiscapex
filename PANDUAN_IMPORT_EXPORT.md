# Panduan Import/Export Data Revenue Sharing

## Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Cara Mengunduh Template](#cara-mengunduh-template)
3. [Format File CSV](#format-file-csv)
4. [Cara Mengisi Template](#cara-mengisi-template)
5. [Cara Import Data](#cara-import-data)
6. [Troubleshooting](#troubleshooting)

## Pengenalan

Fitur Import/Export memungkinkan Anda untuk:
- Mengunduh template CSV untuk data pemeriksaan
- Mengisi data dalam jumlah besar menggunakan Excel atau text editor
- Mengimport data kembali ke aplikasi dengan cepat
- Berbagi data dengan tim atau menyimpan backup

## Cara Mengunduh Template

1. Buka aplikasi Capex Analyzer
2. Login dengan akun Anda
3. Pilih menu **"Analisis Capex"** di sidebar
4. Klik tab **"C. Revenue Sharing"**
5. Scroll ke bagian **"Daftar Pemeriksaan atau Tindakan"**
6. Klik tombol **"Unduh Template"** (tombol hijau dengan icon download)
7. File `template_revenue_sharing.csv` akan terunduh ke komputer Anda

## Format File CSV

Template CSV memiliki format sebagai berikut:

```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
Creatinin,150000,32208
Urea / BUN,150000,30624
```

### Struktur Kolom:

| Kolom | Deskripsi | Tipe Data | Contoh |
|-------|-----------|-----------|--------|
| Nama Pemeriksaan | Nama jenis pemeriksaan atau tindakan | Text | Darah Rutin |
| Tarif (Rp) | Tarif per pemeriksaan dalam Rupiah | Angka | 150000 |
| Volume per Tahun | Jumlah pemeriksaan per tahun | Angka | 68664 |

### Aturan Format:

✅ **DO:**
- Gunakan koma (,) sebagai pemisah kolom
- Baris pertama adalah header (jangan dihapus)
- Gunakan angka tanpa titik atau koma untuk tarif dan volume
- Simpan file dengan encoding UTF-8

❌ **DON'T:**
- Jangan gunakan titik koma (;) sebagai pemisah
- Jangan gunakan format angka dengan pemisah ribuan (contoh: 150.000)
- Jangan gunakan tanda kutip kecuali diperlukan
- Jangan menambah atau mengurangi jumlah kolom

## Cara Mengisi Template

### Menggunakan Microsoft Excel:

1. Buka file CSV dengan Excel
2. Isi data mulai dari baris ke-2 (setelah header)
3. Kolom A: Nama Pemeriksaan
4. Kolom B: Tarif (angka saja, tanpa Rp atau titik)
5. Kolom C: Volume per tahun (angka saja)
6. Simpan file dengan format **CSV (Comma delimited) (*.csv)**

**Contoh:**
```
A                 | B      | C
Nama Pemeriksaan  | Tarif  | Volume
Darah Rutin       | 150000 | 68664
Hemoglobin        | 100000 | 45000
Glukosa Darah     | 120000 | 52000
```

### Menggunakan Google Sheets:

1. Upload file CSV ke Google Drive
2. Buka dengan Google Sheets
3. Edit data sesuai kebutuhan
4. Download sebagai CSV: File → Download → Comma Separated Values (.csv)

### Menggunakan Text Editor (Notepad, VS Code):

1. Buka file CSV dengan text editor
2. Tambahkan baris baru dengan format:
   ```
   Nama Pemeriksaan,Tarif,Volume
   ```
3. Contoh:
   ```csv
   Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
   Darah Rutin,150000,68664
   Creatinin,150000,32208
   Kolesterol,130000,38000
   ```
4. Simpan file

## Cara Import Data

1. Pastikan file CSV sudah diisi dengan benar
2. Buka aplikasi Capex Analyzer
3. Pilih menu **"Analisis Capex"** → Tab **"C. Revenue Sharing"**
4. Klik tombol **"Import Data"** (tombol biru dengan icon upload)
5. Pilih file CSV yang sudah Anda isi
6. Tunggu proses import selesai
7. Jika berhasil, akan muncul notifikasi **"Data berhasil diimpor!"**
8. Data lama akan diganti dengan data baru dari file CSV

### Catatan Penting:

⚠️ **PERHATIAN:**
- Import data akan **mengganti semua data** yang ada sebelumnya
- Pastikan Anda sudah backup data lama jika diperlukan
- Periksa kembali data sebelum import

## Troubleshooting

### Error: "Format file tidak didukung"
**Penyebab:** File bukan format CSV
**Solusi:** 
- Pastikan file berekstensi `.csv`
- Jika menggunakan Excel, simpan sebagai "CSV (Comma delimited)"

### Error: "Baris X: Format tidak valid"
**Penyebab:** Jumlah kolom tidak sesuai (kurang dari 3 kolom)
**Solusi:**
- Periksa baris yang error
- Pastikan setiap baris memiliki 3 kolom (Nama, Tarif, Volume)
- Hapus baris kosong

### Error: "Baris X: Data tidak valid"
**Penyebab:** Data tarif atau volume bukan angka
**Solusi:**
- Periksa kolom Tarif dan Volume
- Pastikan hanya berisi angka
- Hapus karakter non-angka (Rp, titik, koma, dll)

### Error: "Tidak ada data valid yang ditemukan"
**Penyebab:** File kosong atau semua data tidak valid
**Solusi:**
- Periksa isi file CSV
- Pastikan ada minimal 1 baris data setelah header
- Unduh template baru dan isi ulang

### Data tidak muncul setelah import
**Penyebab:** Browser cache atau error JavaScript
**Solusi:**
- Refresh halaman (F5)
- Clear browser cache
- Coba import ulang
- Periksa console browser untuk error

### Karakter aneh muncul (encoding issue)
**Penyebab:** File tidak menggunakan UTF-8 encoding
**Solusi:**
- Buka file dengan Notepad++
- Pilih Encoding → Convert to UTF-8
- Simpan file
- Import ulang

## Tips & Trik

### 1. Backup Data
Sebelum import, export data lama dengan cara:
- Screenshot tabel data
- Atau copy-paste ke Excel

### 2. Validasi Data
Sebelum import, periksa:
- ✅ Tidak ada baris kosong
- ✅ Semua tarif dan volume adalah angka
- ✅ Nama pemeriksaan tidak kosong
- ✅ Format CSV benar

### 3. Import Bertahap
Jika data banyak:
- Import dalam batch kecil (10-20 baris)
- Verifikasi setiap batch
- Lanjutkan jika tidak ada error

### 4. Template Kustom
Anda bisa membuat template sendiri:
- Simpan data yang sering digunakan
- Buat variasi untuk berbagai skenario
- Share dengan tim

## Contoh File CSV Lengkap

```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
Creatinin,150000,32208
Urea / BUN,150000,30624
Hemoglobin,100000,45000
Glukosa Darah,120000,52000
Kolesterol Total,130000,38000
Trigliserida,130000,35000
Asam Urat,110000,42000
SGOT,140000,28000
SGPT,140000,28000
Albumin,120000,25000
Bilirubin Total,130000,22000
Protein Total,115000,20000
Elektrolit,180000,35000
Ureum,125000,30000
```

## Dukungan

Jika mengalami masalah yang tidak tercantum di panduan ini:
1. Periksa console browser (F12) untuk error detail
2. Coba dengan file template baru
3. Hubungi administrator sistem
4. Laporkan bug dengan screenshot error

---

**Versi:** 1.0  
**Terakhir Diperbarui:** 25 Februari 2026  
**Penulis:** Tim Capex Analyzer
