# Panduan Import CSV - Setelah Perbaikan
**Update:** 3 Maret 2026

## 🎯 Apa yang Sudah Diperbaiki?

Import CSV sekarang **otomatis mendeteksi delimiter** yang digunakan di file Anda:
- ✅ Comma (`,`) - Format CSV standar
- ✅ Semicolon (`;`) - Format Excel Indonesia
- ✅ Tab (`\t`) - Format TSV

## 📋 Cara Menggunakan

### 1. Pilih Metode Perhitungan
Sebelum import, pastikan metode yang dipilih sesuai dengan file CSV:

**Metode Persentase** (3 kolom):
```
Nama Pemeriksaan, Tarif (Rp), Volume per Tahun
Darah Rutin, 150000, 68664
```

**Metode Flat Fee** (4 kolom):
```
Nama Pemeriksaan, Tarif (Rp), Volume per Tahun, Flat Fee (Rp)
Darah Rutin, 150000, 68664, 30000
```

### 2. Download Template
Klik tombol **"Unduh Template"** untuk mendapatkan template yang sesuai dengan metode yang dipilih.

### 3. Isi Data
- Buka template di Excel atau aplikasi spreadsheet lainnya
- Isi data pemeriksaan Anda
- **Jangan ubah header** (baris pertama)
- Simpan sebagai CSV

### 4. Import File
- Klik tombol **"Import Data"**
- Pilih file CSV yang sudah diisi
- Sistem akan otomatis mendeteksi format dan delimiter
- Data akan langsung muncul di tabel

## ⚠️ Tips Penting

### ✅ DO (Lakukan)
- Gunakan template yang disediakan
- Pastikan metode sesuai dengan jumlah kolom
- Isi semua kolom yang wajib (Nama, Tarif, Volume)
- Gunakan angka tanpa simbol mata uang

### ❌ DON'T (Jangan)
- Jangan ubah header template
- Jangan campur delimiter (comma dan semicolon)
- Jangan kosongkan kolom wajib
- Jangan gunakan format angka dengan huruf

## 🔍 Troubleshooting

### Error: "Format header tidak sesuai"
**Penyebab:** Jumlah kolom tidak sesuai dengan metode
**Solusi:** 
- Cek metode yang dipilih (Persentase = 3 kolom, Flat Fee = 4 kolom)
- Download ulang template yang sesuai

### Error: "Format tidak valid. Ditemukan X kolom"
**Penyebab:** Baris data tidak lengkap atau ada kolom yang hilang
**Solusi:**
- Pastikan setiap baris memiliki jumlah kolom yang sama dengan header
- Cek apakah ada baris yang tidak lengkap

### Error: "Tarif tidak valid"
**Penyebab:** Nilai tarif bukan angka atau negatif
**Solusi:**
- Gunakan angka positif tanpa simbol
- Contoh: `150000` bukan `Rp 150.000`

## 📊 Contoh File yang Benar

### Metode Persentase (Comma)
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
Creatinin,150000,32208
Urea / BUN,150000,30624
```

### Metode Flat Fee (Semicolon)
```csv
Nama Pemeriksaan;Tarif (Rp);Volume per Tahun;Flat Fee (Rp)
Darah Rutin;150000;68664;30000
Creatinin;150000;32208;30000
Urea / BUN;150000;30624;30000
```

## 🧪 Testing

Untuk memverifikasi import CSV bekerja dengan baik:
1. Buka `test_import_csv_delimiter_fix.html` di browser
2. Test berbagai format delimiter
3. Verifikasi data terparsing dengan benar

## 📞 Bantuan

Jika masih mengalami masalah:
1. Cek console log di browser (F12 → Console)
2. Lihat delimiter yang terdeteksi
3. Verifikasi format file CSV Anda
4. Gunakan template yang disediakan

---

**Catatan:** Perbaikan ini sudah menyelesaikan masalah import CSV dengan berbagai format delimiter. Import sekarang bekerja sempurna! ✅
