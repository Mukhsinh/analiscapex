# Fitur Analisis Kelayakan Harga Penawaran Sewa

## 📋 Deskripsi

Fitur ini menambahkan kemampuan untuk membandingkan hasil kalkulasi harga sewa dengan harga penawaran dari vendor, kemudian menentukan kelayakan berdasarkan perbandingan tersebut.

## 🎯 Tujuan

- Membantu pengguna membandingkan harga kalkulasi dengan penawaran vendor
- Memberikan rekomendasi kelayakan berdasarkan selisih harga
- Menyediakan panduan negosiasi yang jelas

## 📊 Logika Kelayakan

### Kriteria Kelayakan

**LAYAK**: Harga kalkulasi ≥ harga penawaran
- Artinya: Penawaran vendor lebih rendah atau sama dengan hasil kalkulasi
- Kesimpulan: Penawaran dapat diterima

**TIDAK LAYAK**: Harga kalkulasi < harga penawaran
- Artinya: Penawaran vendor lebih tinggi dari hasil kalkulasi
- Kesimpulan: Perlu negosiasi atau penolakan

## 🎨 Kategori Status

### 1. TIDAK LAYAK - PERLU NEGOSIASI ULANG (🔴 Merah)
- **Kondisi**: Penawaran > Kalkulasi + 15%
- **Warna**: Merah
- **Icon**: ⚠️
- **Rekomendasi**: 
  - Ajukan negosiasi dengan target maksimal kalkulasi + 10%
  - Minta breakdown detail biaya
  - Bandingkan dengan vendor lain

### 2. TIDAK LAYAK - DAPAT DINEGOSIASIKAN (🟡 Kuning)
- **Kondisi**: Penawaran > Kalkulasi + 5% hingga +15%
- **Warna**: Kuning
- **Icon**: 💡
- **Rekomendasi**:
  - Negosiasi untuk mendekati harga kalkulasi
  - Tanyakan kemungkinan diskon
  - Pertimbangkan value-added services

### 3. LAYAK - HARGA WAJAR (🟢 Hijau)
- **Kondisi**: Penawaran dalam range ±5% dari kalkulasi
- **Warna**: Hijau
- **Icon**: ✅
- **Rekomendasi**:
  - Harga kompetitif, lanjutkan ke kontrak
  - Pastikan terms & conditions sesuai
  - Review SLA dan support

### 4. LAYAK - HARGA SANGAT BAIK (🔵 Biru)
- **Kondisi**: Penawaran < Kalkulasi - 5% hingga -15%
- **Warna**: Biru
- **Icon**: 🎯
- **Rekomendasi**:
  - Segera lakukan kesepakatan
  - Pastikan tidak ada hidden cost
  - Verifikasi kualitas alat dan layanan

### 5. LAYAK - HARGA TERLALU RENDAH (🟠 Orange)
- **Kondisi**: Penawaran < Kalkulasi - 15%
- **Warna**: Orange
- **Icon**: 🔍
- **Rekomendasi**:
  - Tinjau detail kontrak dengan teliti
  - Pastikan tidak ada biaya tersembunyi
  - Verifikasi kualitas dan spesifikasi
  - Cek reputasi vendor

## 💻 Implementasi

### Input Form

```jsx
<div className="md:col-span-2">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Harga Penawaran dari Vendor (Rp/tahun)
    <span className="text-blue-500 ml-1 text-xs">(Opsional - untuk perbandingan)</span>
  </label>
  <input
    type="text"
    value={formatCurrency(data.vendorQuote || 0)}
    onChange={(e) => handleCurrencyChange('vendorQuote', e.target.value)}
    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
    placeholder="Contoh: 350.000.000"
  />
</div>
```

### Logika Perhitungan

```javascript
const vendorQuote = data.vendorQuote || 0
const priceDifference = vendorQuote - rentalPrice
const priceDifferencePercent = rentalPrice > 0 ? ((priceDifference / rentalPrice) * 100) : 0

const getFeasibilityAnalysis = () => {
  if (!vendorQuote || vendorQuote === 0) return null
  
  if (priceDifferencePercent > 15) {
    return {
      status: 'TIDAK LAYAK - PERLU NEGOSIASI ULANG',
      feasibility: 'TIDAK LAYAK',
      color: 'red',
      icon: '⚠️',
      message: '...',
      recommendation: '...'
    }
  }
  // ... kategori lainnya
}
```

### Tampilan Hasil

```jsx
{negotiationAnalysis && (
  <div className={`rounded-lg p-5 border-2 bg-${color}-50 border-${color}-300`}>
    <div className="flex items-start mb-3">
      <span className="text-3xl mr-3">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-lg font-bold">{status}</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            feasibility === 'LAYAK' 
              ? 'bg-green-200 text-green-800' 
              : 'bg-red-200 text-red-800'
          }`}>
            {feasibility}
          </span>
        </div>
        <p className="text-sm mb-2">{message}</p>
      </div>
    </div>
    
    {/* Grid perbandingan harga */}
    {/* Rekomendasi */}
    {/* Penjelasan logika */}
  </div>
)}
```

## 📄 Export PDF

PDF akan menampilkan:
1. **Tabel Perbandingan**
   - Harga Kalkulasi
   - Harga Penawaran Vendor
   - Selisih (nominal dan persentase)

2. **Status Kelayakan**
   - Badge berwarna dengan status
   - Penjelasan logika kelayakan

3. **Kesimpulan & Rekomendasi**
   - Status kelayakan (LAYAK/TIDAK LAYAK)
   - Analisis kondisi
   - Rekomendasi tindakan spesifik

## 🧪 Testing

### Skenario Test

1. **Penawaran Jauh Lebih Tinggi (>15%)**
   - Input: Kalkulasi = 300 juta, Penawaran = 350 juta
   - Expected: TIDAK LAYAK - PERLU NEGOSIASI ULANG (Merah)

2. **Penawaran Sedikit Lebih Tinggi (5-15%)**
   - Input: Kalkulasi = 300 juta, Penawaran = 320 juta
   - Expected: TIDAK LAYAK - DAPAT DINEGOSIASIKAN (Kuning)

3. **Penawaran Wajar (±5%)**
   - Input: Kalkulasi = 300 juta, Penawaran = 305 juta
   - Expected: LAYAK - HARGA WAJAR (Hijau)

4. **Penawaran Lebih Rendah (5-15%)**
   - Input: Kalkulasi = 300 juta, Penawaran = 270 juta
   - Expected: LAYAK - HARGA SANGAT BAIK (Biru)

5. **Penawaran Jauh Lebih Rendah (>15%)**
   - Input: Kalkulasi = 300 juta, Penawaran = 240 juta
   - Expected: LAYAK - HARGA TERLALU RENDAH (Orange)

## 📝 Contoh Penggunaan

### Langkah-langkah:

1. **Input Data Dasar**
   - Nama Alat: CT Scan 64 Slice
   - Harga Beli: Rp 5.000.000.000
   - Umur Ekonomis: 10 tahun
   - Nilai Residu: Rp 500.000.000
   - Tingkat Keuntungan: 15%
   - Masa Sewa: 5 tahun

2. **Sistem Menghitung**
   - Harga Sewa Kalkulasi: Rp 1.050.000.000/tahun

3. **Input Harga Penawaran**
   - Harga Penawaran Vendor: Rp 1.200.000.000/tahun

4. **Sistem Menganalisis**
   - Selisih: +Rp 150.000.000 (+14.3%)
   - Status: TIDAK LAYAK - DAPAT DINEGOSIASIKAN
   - Rekomendasi: Negosiasi untuk mendekati Rp 1.050.000.000

## 🔧 File yang Dimodifikasi

- `src/components/RentalAnalysisForm.jsx`
  - Tambah input `vendorQuote`
  - Tambah fungsi `getFeasibilityAnalysis()`
  - Tambah tampilan analisis kelayakan
  - Update PDF dengan status kelayakan

## 📚 Referensi

- Logika kelayakan berdasarkan perbandingan harga pasar
- Threshold persentase disesuaikan dengan praktik industri
- Rekomendasi berdasarkan best practice procurement

## ✅ Checklist Implementasi

- [x] Tambah input harga penawaran vendor
- [x] Implementasi logika kelayakan
- [x] Tambah tampilan analisis perbandingan
- [x] Update PDF dengan status kelayakan
- [x] Tambah badge LAYAK/TIDAK LAYAK
- [x] Tambah penjelasan logika kelayakan
- [x] Dokumentasi lengkap

## 🎉 Hasil

Fitur ini memberikan panduan yang jelas kepada pengguna untuk:
- Menilai kelayakan harga penawaran vendor
- Memahami posisi negosiasi mereka
- Mengambil keputusan yang tepat berdasarkan data
- Mendapatkan rekomendasi tindakan yang spesifik
