# Perbaikan Import CSV - 02 Maret 2026

## Masalah yang Ditemukan

Error "Format tidak valid (harus ada 4 kolom)" muncul saat import data CSV di form Revenue Sharing.

### Penyebab Masalah

1. **Pesan error tidak informatif**: Error message tidak menjelaskan format yang diharapkan dengan jelas
2. **Template header tidak konsisten**: Template flat fee menggunakan header yang berbeda dari yang diharapkan kode
3. **Tidak ada indikator metode aktif**: User tidak tahu metode perhitungan mana yang sedang aktif saat import
4. **Handling kolom kosong**: CSV dengan kolom kosong di akhir baris tidak ditangani dengan baik

## Perbaikan yang Dilakukan

### 1. Pesan Error yang Lebih Informatif

**File**: `src/components/RevenueShareForm.jsx`

```javascript
// Sebelum
setImportError(`Baris ${i + 2}: Format tidak valid (harus ada ${minColumns} kolom)`)

// Sesudah
const expectedFormat = isFlatFee 
  ? 'Nama Pemeriksaan, Tarif, Volume, Flat Fee' 
  : 'Nama Pemeriksaan, Tarif, Volume'
setImportError(`Baris ${i + 2}: Format tidak valid. Ditemukan ${filteredParts.length} kolom, dibutuhkan ${minColumns} kolom (${expectedFormat})`)
```

### 2. Validasi Data yang Lebih Detail

Pesan error sekarang menunjukkan kolom mana yang bermasalah:

```javascript
if (!name || name.trim() === '') {
  setImportError(`Baris ${i + 2}: Nama pemeriksaan tidak boleh kosong`)
}

if (isNaN(tariff) || tariff <= 0) {
  setImportError(`Baris ${i + 2}: Tarif tidak valid (${parts[1]}). Harus berupa angka positif.`)
}

if (isNaN(volume) || volume < 0) {
  setImportError(`Baris ${i + 2}: Volume tidak valid (${parts[2]}). Harus berupa angka.`)
}

if (isFlatFee && (isNaN(flatFee) || flatFee < 0)) {
  setImportError(`Baris ${i + 2}: Flat Fee tidak valid (${parts[3]}). Harus berupa angka.`)
}
```

### 3. Indikator Metode Aktif

Ditambahkan indikator di bagian header tabel:

```jsx
<div>
  <h4 className="font-semibold text-gray-800">Daftar Pemeriksaan atau Tindakan</h4>
  <p className="text-xs text-gray-500 mt-1">
    Metode aktif: <span className="font-semibold text-purple-600">
      {data.calculationMethod === 'flatFee' ? 'Flat Fee (4 kolom)' : 'Persentase (3 kolom)'}
    </span>
  </p>
</div>
```

### 4. Tip Tambahan di Error Message

```jsx
{importError && (
  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-700 text-sm font-medium">Error Import</p>
    <p className="text-red-600 text-sm">{importError}</p>
    <p className="text-red-500 text-xs mt-2">
      💡 Tip: Pastikan metode perhitungan yang dipilih sesuai dengan format file CSV. 
      Unduh template yang sesuai untuk memastikan format yang benar.
    </p>
  </div>
)}
```

### 5. Perbaikan Template CSV

**File**: `template_revenue_sharing_flatfee.csv`

```csv
# Sebelum
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee per Pemeriksaan (Rp)

# Sesudah
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee (Rp)
```

### 6. Handling Kolom Kosong

Ditambahkan filter untuk menghapus kolom kosong:

```javascript
// Filter out empty parts
const filteredParts = parts.filter(p => p !== '')

const minColumns = isFlatFee ? 4 : 3
if (filteredParts.length < minColumns) {
  // error handling
}
```

### 7. Validasi File Kosong

```javascript
if (lines.length < 2) {
  setImportError('File kosong atau tidak memiliki data')
  setImporting(false)
  event.target.value = ''
  return
}
```

## File Test

Dibuat file `test_csv_import.html` untuk testing validasi CSV:

- Test format persentase (3 kolom)
- Test format flat fee (4 kolom)
- Test format salah (2 kolom)

## Cara Testing

1. Buka aplikasi di browser
2. Pilih metode "Revenue Sharing"
3. Pilih metode perhitungan (Persentase atau Flat Fee)
4. Perhatikan indikator metode aktif di bawah judul tabel
5. Klik "Unduh Template" untuk mendapatkan template yang sesuai
6. Edit template atau buat file CSV sendiri
7. Klik "Import Data" dan pilih file CSV
8. Jika ada error, pesan akan menunjukkan:
   - Baris mana yang bermasalah
   - Kolom apa yang salah
   - Format yang diharapkan
   - Tip untuk memperbaiki

## Format CSV yang Benar

### Metode Persentase (3 kolom)
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun
Darah Rutin,150000,68664
Creatinin,150000,32208
```

### Metode Flat Fee (4 kolom)
```csv
Nama Pemeriksaan,Tarif (Rp),Volume per Tahun,Flat Fee (Rp)
Darah Rutin,150000,68664,30000
Creatinin,150000,32208,30000
```

## Catatan Penting

1. **Pastikan metode perhitungan sesuai**: Pilih metode yang sesuai dengan format file CSV Anda
2. **Gunakan template**: Unduh template yang sesuai untuk menghindari kesalahan format
3. **Perhatikan separator**: Gunakan koma (,) sebagai separator
4. **Format angka**: Angka bisa menggunakan pemisah ribuan (.) atau tanpa pemisah
5. **Header wajib**: Baris pertama harus berisi header kolom

## Status

✅ Perbaikan selesai
✅ Template diperbarui
✅ File test dibuat
✅ Dokumentasi lengkap

## Testing Checklist

- [ ] Import CSV format persentase (3 kolom)
- [ ] Import CSV format flat fee (4 kolom)
- [ ] Import CSV dengan format salah (harus muncul error informatif)
- [ ] Import CSV dengan data tidak valid (harus muncul error spesifik)
- [ ] Import CSV kosong (harus muncul error)
- [ ] Unduh template persentase
- [ ] Unduh template flat fee
- [ ] Verifikasi indikator metode aktif muncul
- [ ] Verifikasi tip muncul saat error
