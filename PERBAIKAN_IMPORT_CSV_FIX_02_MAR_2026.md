# Perbaikan Bug Import CSV - 02 Maret 2026

## 🐛 Masalah yang Ditemukan

User melaporkan error saat import CSV:
```
Error Import
Baris 2: Format tidak valid. Ditemukan 2 kolom, dibutuhkan 4 kolom 
(Nama Pemeriksaan, Tarif, Volume, Flat Fee)
```

Padahal file CSV sudah menggunakan template yang sesuai dengan 4 kolom.

## 🔍 Root Cause Analysis

Masalah terjadi pada fungsi `handleFileImport` di `RevenueShareForm.jsx`:

```javascript
// KODE LAMA (BERMASALAH)
const parts = []
// ... parsing CSV ...
parts.push(current.trim())

// Filter out empty parts ❌ INI YANG BERMASALAH
const filteredParts = parts.filter(p => p !== '')

// Validasi menggunakan filteredParts
if (filteredParts.length < minColumns) {
  // Error: kolom tidak cukup
}
```

**Masalah:**
- Kode memfilter kolom kosong dengan `filter(p => p !== '')`
- Jika ada kolom dengan nilai `0` atau kosong (`""`), kolom tersebut dihapus
- Akibatnya, CSV dengan 4 kolom bisa menjadi 2-3 kolom setelah difilter
- Validasi gagal karena jumlah kolom tidak sesuai

## ✅ Solusi yang Diterapkan

### 1. Menghapus Filter Kolom Kosong

```javascript
// KODE BARU (DIPERBAIKI)
const parts = []
// ... parsing CSV ...
parts.push(current.trim())

// TIDAK filter kolom kosong - langsung validasi
const minColumns = isFlatFee ? 4 : 3
if (parts.length < minColumns) {
  // Error dengan informasi yang jelas
}
```

### 2. Memperbaiki Parsing Nilai

```javascript
// Gunakan || 0 untuk handle nilai kosong
const tariff = parseFloat(tariffStr) || 0
const volume = parseFloat(volumeStr) || 0
const flatFee = parseFloat(flatFeeStr) || 0
```

### 3. Menambahkan Logging untuk Debugging

```javascript
console.log('📁 File import dimulai:', file.name)
console.log('📊 Total baris:', lines.length)
console.log('🔧 Metode aktif:', data.calculationMethod)
console.log('📋 Header:', lines[0])
console.log('🎯 Ekspektasi kolom:', isFlatFee ? 4 : 3)

for (let i = 0; i < dataLines.length; i++) {
  // ...
  console.log(`📝 Baris ${i + 2}: ${parts.length} kolom ->`, parts)
}

console.log('✅ Import berhasil:', importedProcedures.length, 'data')
```

### 4. Memperbaiki Error Messages

```javascript
// Error message lebih informatif
if (isNaN(tariff) || tariff <= 0) {
  setImportError(`Baris ${i + 2}: Tarif tidak valid ("${parts[1]}"). Harus berupa angka positif.`)
}

if (isFlatFee && (isNaN(flatFee) || flatFee < 0)) {
  setImportError(`Baris ${i + 2}: Flat Fee tidak valid ("${parts[3] || 'kosong'}"). Harus berupa angka.`)
}
```

## 📝 File yang Dimodifikasi

### src/components/RevenueShareForm.jsx

**Perubahan:**
1. ❌ Hapus: `const filteredParts = parts.filter(p => p !== '')`
2. ✅ Ubah: Gunakan `parts` langsung untuk validasi
3. ✅ Tambah: Logging untuk debugging
4. ✅ Perbaiki: Error handling untuk nilai kosong
5. ✅ Perbaiki: Error messages lebih informatif

## 🧪 Testing

### Test File
- `test_import_csv_fix.html` - Test suite lengkap untuk validasi perbaikan

### Test Cases

1. **CSV Flat Fee Normal (4 kolom)**
   - Input: `Nama,Tarif,Volume,FlatFee` dengan nilai lengkap
   - Expected: ✅ Import berhasil

2. **CSV Flat Fee dengan Flat Fee = 0**
   - Input: `Nama,Tarif,Volume,0`
   - Expected: ✅ Import berhasil (sebelumnya gagal)

3. **CSV Flat Fee dengan kolom kosong**
   - Input: `Nama,Tarif,Volume,` (kolom 4 kosong)
   - Expected: ✅ Import berhasil dengan flatFee = 0

4. **CSV Persentase (3 kolom)**
   - Input: `Nama,Tarif,Volume`
   - Expected: ✅ Import berhasil

5. **CSV dengan format angka Indonesia**
   - Input: `Nama,150.000,68.664,30.000`
   - Expected: ✅ Import berhasil, titik dihapus

6. **CSV Error - Kurang kolom**
   - Input: `Nama,Tarif` (hanya 2 kolom)
   - Expected: ❌ Error dengan pesan jelas

## 📊 Cara Testing

### 1. Buka Test File
```bash
# Buka di browser
start test_import_csv_fix.html
```

### 2. Test di Aplikasi
1. Jalankan dev server: `npm run dev`
2. Buka halaman Analisis Capex
3. Pilih metode "Revenue Sharing"
4. Pilih "Metode Flat Fee"
5. Klik "Unduh Template"
6. Edit template (bisa kosongkan kolom Flat Fee)
7. Klik "Import Data"
8. Buka Console (F12) untuk melihat log

### 3. Verifikasi Log
Console akan menampilkan:
```
📁 File import dimulai: template_revenue_sharing_flatfee.csv
📊 Total baris: 4
🔧 Metode aktif: flatFee
📋 Header: Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee (Rp)
🎯 Ekspektasi kolom: 4
📝 Baris 2: 4 kolom -> ["Darah Rutin", "150000", "68664", "0"]
📝 Baris 3: 4 kolom -> ["Creatinin", "150000", "32208", "0"]
✅ Import berhasil: 2 data
```

## 🎯 Hasil

### Sebelum Perbaikan
- ❌ CSV dengan kolom kosong atau nilai 0 gagal diimport
- ❌ Error message tidak jelas
- ❌ Tidak ada logging untuk debugging
- ❌ User bingung kenapa template yang benar ditolak

### Setelah Perbaikan
- ✅ CSV dengan kolom kosong atau nilai 0 berhasil diimport
- ✅ Error message informatif dengan nomor baris dan nilai yang bermasalah
- ✅ Logging lengkap untuk debugging
- ✅ User dapat import data dengan lancar

## 📚 Dokumentasi Terkait

- `PANDUAN_IMPORT_CSV.md` - Panduan lengkap import CSV
- `template_revenue_sharing_flatfee.csv` - Template untuk metode Flat Fee
- `template_revenue_sharing_example.csv` - Template untuk metode Persentase
- `test_import_csv_fix.html` - Test suite untuk validasi

## 🔄 Next Steps

1. ✅ Perbaikan sudah diterapkan
2. ⏳ User testing dengan file CSV asli
3. ⏳ Monitoring error di production
4. ⏳ Update dokumentasi jika ada feedback

## 📞 Support

Jika masih ada masalah dengan import CSV:
1. Buka Console (F12) dan screenshot log
2. Share file CSV yang bermasalah
3. Screenshot error message
4. Informasi metode yang dipilih (Persentase/Flat Fee)
