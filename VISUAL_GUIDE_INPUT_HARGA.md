# 🎨 Visual Guide: Input Harga Beli vs Harga Penawaran Sewa

## 📍 Lokasi Field di Form

```
┌─────────────────────────────────────────────────────────┐
│  Analisa Harga Sewa Alat                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Nama Alat                                    ]         │
│                                                          │
│  [Harga Beli Alat (Rp) *]  [Umur Ekonomis (tahun) *]   │
│   Contoh: 5.000.000.000     Contoh: 10                  │
│                                                          │
│  [Nilai Residu (Rp)]       [Tingkat Keuntungan (%) *]   │
│   Contoh: 500.000.000       Contoh: 15                  │
│                                                          │
│  [Masa Sewa (tahun) *]                                  │
│   Contoh: 5                                             │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ ⚠️ HARGA PENAWARAN SEWA DARI VENDOR           │    │
│  │ (Rp/tahun) - Opsional                         │    │
│  │                                                │    │
│  │ [                                            ] │    │
│  │  Contoh: 1.200.000.000                        │    │
│  │                                                │    │
│  │ 💡 Ini harga SEWA per tahun, BUKAN harga beli│    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  [Hitung Harga Sewa]                                    │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Identifikasi Visual

### Field "Harga Beli Alat"
```
┌─────────────────────────────────────┐
│ Harga Beli Alat (Rp) *              │
├─────────────────────────────────────┤
│ Contoh: 1.300.000.000               │
└─────────────────────────────────────┘
  ↑ Background: Putih
  ↑ Border: Abu-abu
  ↑ Wajib diisi (ada tanda *)
```

### Field "Harga Penawaran Sewa dari Vendor"
```
┌─────────────────────────────────────────────┐
│ ⚠️ HARGA PENAWARAN SEWA DARI VENDOR        │
│ (Rp/tahun) - Opsional                      │
├─────────────────────────────────────────────┤
│ Contoh: 350.000.000                        │
│                                             │
│ 💡 Ini harga SEWA per tahun, BUKAN harga  │
│    beli!                                    │
└─────────────────────────────────────────────┘
  ↑ Background: KUNING (#fffbeb)
  ↑ Border: KUNING (#fbbf24)
  ↑ Opsional (tidak wajib)
  ↑ Ada icon warning ⚠️
```

## 🔍 Cara Menemukan Field

### Langkah 1: Scroll ke Bawah
Field "Harga Penawaran Sewa" berada di bagian bawah form, setelah field "Masa Sewa"

### Langkah 2: Cari Background Kuning
Field ini memiliki background kuning yang mencolok untuk membedakan dari field lain

### Langkah 3: Lihat Icon Warning
Ada icon ⚠️ di label field untuk menarik perhatian

## 📊 Perbandingan Visual

```
HARGA BELI ALAT
═══════════════════════════════════════
│ Rp 5.000.000.000                    │
│                                     │
│ ✓ Dibayar SEKALI                   │
│ ✓ Untuk MEMBELI alat               │
│ ✓ Nilai BESAR (miliaran)           │
═══════════════════════════════════════

         ↓ SISTEM MENGHITUNG ↓

HARGA SEWA KALKULASI (Hasil)
═══════════════════════════════════════
│ Rp 1.050.000.000/tahun             │
│                                     │
│ ✓ Harga sewa yang SEHARUSNYA       │
│ ✓ Berdasarkan perhitungan          │
═══════════════════════════════════════

         ↓ BANDINGKAN DENGAN ↓

HARGA PENAWARAN SEWA (Input Opsional)
═══════════════════════════════════════
│ Rp 1.200.000.000/tahun             │
│                                     │
│ ✓ Dibayar BERKALA per tahun        │
│ ✓ Untuk MENYEWA alat               │
│ ✓ Nilai LEBIH KECIL dari beli      │
│ ✓ Dari VENDOR/pihak ketiga         │
═══════════════════════════════════════

         ↓ SISTEM MENGANALISIS ↓

HASIL ANALISIS KELAYAKAN
═══════════════════════════════════════
│ Status: TIDAK LAYAK                │
│ Selisih: +Rp 150 juta (+14.3%)    │
│ Rekomendasi: Negosiasi             │
═══════════════════════════════════════
```

## 🎨 Color Coding

### Harga Beli Alat
- Background: `#FFFFFF` (Putih)
- Border: `#D1D5DB` (Abu-abu)
- Focus: `#3B82F6` (Biru)

### Harga Penawaran Sewa
- Background: `#FFFBEB` (Kuning Muda)
- Border: `#FBBF24` (Kuning)
- Focus: `#F59E0B` (Kuning Gelap)
- Icon: ⚠️ (Warning)

## 📱 Responsive Layout

### Desktop (>768px)
```
┌──────────────────┬──────────────────┐
│ Harga Beli       │ Umur Ekonomis    │
├──────────────────┼──────────────────┤
│ Nilai Residu     │ Tingkat Untung   │
├──────────────────┴──────────────────┤
│ Masa Sewa                           │
├─────────────────────────────────────┤
│ ⚠️ HARGA PENAWARAN SEWA (Full Width)│
└─────────────────────────────────────┘
```

### Mobile (<768px)
```
┌─────────────────────────────────────┐
│ Harga Beli                          │
├─────────────────────────────────────┤
│ Umur Ekonomis                       │
├─────────────────────────────────────┤
│ Nilai Residu                        │
├─────────────────────────────────────┤
│ Tingkat Keuntungan                  │
├─────────────────────────────────────┤
│ Masa Sewa                           │
├─────────────────────────────────────┤
│ ⚠️ HARGA PENAWARAN SEWA            │
└─────────────────────────────────────┘
```

## 💡 Tips Visual

### 1. Cari Background Kuning
Field penawaran sewa memiliki background kuning yang sangat mencolok

### 2. Lihat Posisi
Selalu di bagian paling bawah dari form input

### 3. Perhatikan Label
Label lebih panjang dan ada penjelasan tambahan

### 4. Cek Icon
Ada icon ⚠️ di awal label

### 5. Baca Helper Text
Ada teks kecil di bawah input yang menjelaskan fungsi field

## 🖼️ Screenshot Contoh

### Tampilan Normal
```
┌─────────────────────────────────────────────────────────┐
│ Masa Sewa (tahun) *                                     │
│ ┌─────────────────────────────────────────────────┐    │
│ │ 5                                                │    │
│ └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⚠️ Harga Penawaran Sewa dari Vendor (Rp/tahun)         │
│ (Opsional - untuk analisis kelayakan)                  │
│                                                          │
│ ⚠️ Catatan: Ini adalah harga SEWA per tahun yang       │
│ ditawarkan vendor, BUKAN harga beli alat.              │
│                                                          │
│ ┌─────────────────────────────────────────────────┐    │
│ │ Rp 1.200.000.000                                 │    │
│ └─────────────────────────────────────────────────┘    │
│                                                          │
│ 💡 Masukkan harga penawaran sewa dari vendor untuk     │
│ membandingkan dengan hasil kalkulasi                    │
└─────────────────────────────────────────────────────────┘
```

## ✅ Checklist Visual

Saat melihat form, pastikan:

- [ ] Ada field dengan background kuning
- [ ] Field tersebut di bagian paling bawah
- [ ] Ada icon ⚠️ di label
- [ ] Ada teks "SEWA" dalam label
- [ ] Ada penjelasan "BUKAN harga beli"
- [ ] Ada helper text di bawah input
- [ ] Border berwarna kuning

Jika semua checklist terpenuhi, Anda sudah menemukan field yang benar!

---

**Dibuat**: 5 Maret 2026  
**Tujuan**: Membantu user menemukan dan memahami field input yang benar
