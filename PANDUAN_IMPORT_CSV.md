# Panduan Import CSV - Revenue Sharing

## 📋 Ringkasan

Import CSV memungkinkan Anda memasukkan data pemeriksaan dalam jumlah banyak sekaligus, menghemat waktu dibanding input manual satu per satu.

## 🚀 Langkah-Langkah Import

### 1. Pilih Metode Perhitungan

Sebelum import, pastikan Anda sudah memilih metode yang tepat:

- **Metode Persentase**: RS mendapat % dari tarif pemeriksaan
  - Format CSV: 3 kolom (Nama, Tarif, Volume)
  
- **Metode Flat Fee**: RS bayar nominal tetap per pemeriksaan
  - Format CSV: 4 kolom (Nama, Tarif, Volume, Flat Fee)

⚠️ **PENTING**: Metode harus dipilih SEBELUM import karena menentukan jumlah kolom yang dibutuhkan.

### 2. Download Template

Klik tombol **"Unduh Template"** untuk mendapatkan file CSV dengan format yang benar.

Template akan otomatis disesuaikan dengan metode yang Anda pilih:
- `template_revenue_sharing.csv` - untuk Metode Persentase
- `template_revenue_sharing_flatfee.csv` - untuk Metode Flat Fee

### 3. Isi Data di Excel/Spreadsheet

Buka file template dengan Excel, Google Sheets, atau aplikasi spreadsheet lainnya.

**Aturan Pengisian:**
- ✅ Jangan ubah atau hapus baris header (baris pertama)
- ✅ Mulai isi data dari baris ke-2
- ✅ Gunakan angka tanpa simbol (Rp, %, dll)
- ✅ Boleh gunakan pemisah ribuan titik (150.000) atau tanpa (150000)
- ✅ Nama pemeriksaan boleh mengandung koma atau karakter khusus

**Contoh Pengisian - Metode Persentase:**
```
Nama Pemeriksaan    | Tarif (Rp) | Volume per Tahun
Darah Rutin         | 150000     | 68664
Creatinin           | 150000     | 32208
Urea / BUN          | 150000     | 30624
```

**Contoh Pengisian - Metode Flat Fee:**
```
Nama Pemeriksaan    | Tarif (Rp) | Volume per Tahun | Flat Fee (Rp)
Darah Rutin         | 150000     | 68664            | 30000
Creatinin           | 150000     | 32208            | 30000
Urea / BUN          | 150000     | 30624            | 30000
```

### 4. Save as CSV

**Di Excel:**
1. File → Save As
2. Pilih "CSV (Comma delimited) (*.csv)"
3. Klik Save

**Di Google Sheets:**
1. File → Download
2. Pilih "Comma Separated Values (.csv)"

### 5. Import ke Aplikasi

1. Klik tombol **"Import Data"**
2. Pilih file CSV yang sudah Anda buat
3. Tunggu proses import
4. Jika berhasil, akan muncul notifikasi hijau
5. Jika error, akan muncul pesan error merah dengan penjelasan

## ❌ Troubleshooting - Pesan Error

### Error: "File harus memiliki header dan minimal 1 baris data"

**Penyebab:** File kosong atau hanya berisi header

**Solusi:**
- Pastikan ada minimal 1 baris data di bawah header
- Jangan hapus semua data

---

### Error: "Baris X: Format tidak valid. Ditemukan Y kolom, dibutuhkan Z kolom"

**Penyebab:** Jumlah kolom tidak sesuai dengan metode yang dipilih

**Solusi:**
- Metode Persentase: pastikan setiap baris punya 3 kolom
- Metode Flat Fee: pastikan setiap baris punya 4 kolom
- Periksa apakah ada kolom yang terhapus atau kosong
- Download ulang template jika perlu

**Contoh Error:**
```
Baris 2: Format tidak valid. Ditemukan 2 kolom, dibutuhkan 3 kolom 
(Nama Pemeriksaan, Tarif, Volume)
```

Artinya: Baris ke-2 hanya punya 2 kolom, padahal butuh 3 kolom.

---

### Error: "Baris X: Nama pemeriksaan tidak boleh kosong"

**Penyebab:** Kolom nama pemeriksaan kosong

**Solusi:**
- Isi nama pemeriksaan di baris yang error
- Jangan biarkan kolom nama kosong

---

### Error: "Baris X: Tarif tidak valid (nilai). Harus berupa angka positif"

**Penyebab:** Tarif bukan angka atau bernilai negatif/nol

**Solusi:**
- Gunakan angka positif untuk tarif
- Hapus simbol Rp, $, atau karakter lain
- Contoh yang benar: 150000 atau 150.000
- Contoh yang salah: Rp 150.000, -150000, abc

---

### Error: "Baris X: Volume tidak valid (nilai). Harus berupa angka"

**Penyebab:** Volume bukan angka atau bernilai negatif

**Solusi:**
- Gunakan angka untuk volume
- Volume boleh 0 (nol)
- Hapus simbol atau karakter non-angka
- Contoh yang benar: 68664 atau 68.664
- Contoh yang salah: 68,664 (koma), abc, -100

---

### Error: "Baris X: Flat Fee tidak valid (nilai). Harus berupa angka"

**Penyebab:** Flat Fee bukan angka atau bernilai negatif (khusus Metode Flat Fee)

**Solusi:**
- Gunakan angka untuk flat fee
- Flat fee boleh 0 (nol)
- Hapus simbol atau karakter non-angka
- Contoh yang benar: 30000 atau 30.000
- Contoh yang salah: Rp 30.000, -30000, abc

---

### Error: "Gagal membaca file"

**Penyebab:** File rusak atau format tidak sesuai

**Solusi:**
- Pastikan file berformat CSV (bukan .xlsx atau .xls)
- Download ulang template
- Isi ulang data
- Save as CSV dengan benar

## ✅ Tips & Best Practices

### Format Angka
- ✅ **Boleh:** 150000, 150.000
- ❌ **Jangan:** Rp 150.000, 150,000, 150 ribu

### Nama Pemeriksaan
- ✅ **Boleh:** Darah Rutin, Creatinin, Urea / BUN, "Darah Rutin, Lengkap"
- ❌ **Jangan:** Kosong, hanya spasi

### Volume
- ✅ **Boleh:** 68664, 68.664, 0
- ❌ **Jangan:** -100, abc, kosong

### Baris Kosong
- Baris kosong di akhir file akan diabaikan
- Baris kosong di tengah akan menyebabkan error

### Encoding
- Gunakan UTF-8 encoding untuk karakter khusus
- Jika ada masalah dengan karakter Indonesia, save as "CSV UTF-8"

## 📊 Contoh File CSV yang Benar

### Metode Persentase (3 kolom)
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
Creatinin,150000,32208
Urea / BUN,150000,30624
Hemoglobin,100000,45000
Glukosa Darah,120000,52000
```

### Metode Flat Fee (4 kolom)
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee (Rp)
Darah Rutin,150000,68664,30000
Creatinin,150000,32208,30000
Urea / BUN,150000,30624,30000
Hemoglobin,100000,45000,20000
Glukosa Darah,120000,52000,25000
```

### Dengan Pemisah Ribuan
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150.000,68.664
Creatinin,150.000,32.208
```

### Nama dengan Koma (Quoted)
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
"Darah Rutin, Lengkap",150000,68664
"Creatinin, Serum",150000,32208
Urea / BUN,150000,30624
```

## 🔄 Mengganti Data yang Sudah Diimport

Jika Anda import data baru, data lama akan **diganti sepenuhnya** dengan data baru.

**Untuk menambah data:**
1. Export data yang sudah ada (jika perlu)
2. Tambahkan baris baru di file CSV
3. Import ulang file CSV lengkap

**Untuk mengedit data:**
1. Edit langsung di tabel aplikasi, atau
2. Export → Edit CSV → Import ulang

## 📞 Bantuan Lebih Lanjut

Jika masih mengalami kesulitan:
1. Periksa file `test_import_csv.html` untuk test format CSV
2. Baca dokumentasi lengkap di `PERBAIKAN_IMPORT_CSV_02_MAR_2026.md`
3. Hubungi administrator sistem

---

**Terakhir diupdate:** 02 Maret 2026  
**Versi:** 1.0
