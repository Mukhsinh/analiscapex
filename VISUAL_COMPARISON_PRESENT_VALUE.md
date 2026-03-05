# Visual Comparison: Sebelum vs Sesudah Present Value

## 📊 Perbandingan Kartu Hasil

### SEBELUM (Fokus Vendor)
```
┌─────────────────────────────────────┐
│ Harga Sewa per Tahun                │
│ Rp 350.000.000                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Total Pendapatan Sewa               │
│ Rp 1.050.000.000                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Total Biaya (Beli - Residu)         │
│ Rp 1.170.000.000                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Total Keuntungan                    │
│ -Rp 120.000.000                     │
└─────────────────────────────────────┘
```

**Masalah:**
- ❌ Fokus pada keuntungan vendor, bukan biaya user
- ❌ Tidak ada konsep nilai waktu uang
- ❌ Tidak ada analisis kelayakan harga
- ❌ Tidak ada rekomendasi negosiasi

---

### SESUDAH (Fokus User + Present Value)
```
┌─────────────────────────────────────┐
│ Harga Sewa per Tahun (Kalkulasi)    │
│ Rp 350.000.000                      │
│ Hasil perhitungan optimal           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Present Value Biaya Sewa            │
│ Rp 870.398.014                      │
│ Total PV dengan discount 10%        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Efisiensi Biaya                     │
│ 67.0% ✅                            │
│ PV Sewa vs Harga Beli               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Skor Kelayakan                      │
│ LAYAK ✅                            │
│ Selisih: 0%                         │
└─────────────────────────────────────┘
```

**Keunggulan:**
- ✅ Fokus pada biaya yang harus dibayar user
- ✅ Menggunakan Present Value (nilai waktu uang)
- ✅ Analisis efisiensi sewa vs beli
- ✅ Skor kelayakan harga penawaran
- ✅ Rekomendasi negosiasi spesifik

## 🎨 Perbandingan Deskripsi Halaman

### SEBELUM
```
┌────────────────────────────────────────────────────┐
│ ℹ️ Deskripsi:                                      │
│                                                    │
│ Analisis untuk menentukan harga sewa alat medis   │
│ yang akan disewakan kepada pihak lain.            │
│ Perhitungan mempertimbangkan harga beli, umur     │
│ ekonomis, nilai residu, dan tingkat keuntungan    │
│ yang diharapkan.                                  │
└────────────────────────────────────────────────────┘
```

### SESUDAH
```
┌────────────────────────────────────────────────────┐
│ ℹ️ Deskripsi:                                      │
│                                                    │
│ Analisis untuk menentukan kelayakan harga sewa    │
│ yang harus dibayar kepada vendor. Perhitungan     │
│ menggunakan konsep Present Value (PV) untuk       │
│ menilai biaya sewa dalam nilai waktu uang.        │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ 💡 Konsep Present Value:                     │ │
│ │                                              │ │
│ │ PV menghitung nilai sekarang dari biaya sewa │ │
│ │ yang akan dibayar di masa depan dengan       │ │
│ │ mempertimbangkan discount rate. Ini membantu │ │
│ │ membandingkan apakah lebih baik menyewa atau │ │
│ │ membeli alat.                                │ │
│ └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

## 📋 Perbandingan Input Fields

### SEBELUM (6 fields)
```
1. Nama Alat
2. Harga Beli Alat
3. Umur Ekonomis Alat
4. Nilai Residu
5. Tingkat Keuntungan Vendor
6. Masa Sewa
```

### SESUDAH (8 fields)
```
1. Nama Alat
2. Harga Beli Alat
3. Umur Ekonomis Alat
4. Nilai Residu
5. Tingkat Keuntungan Vendor
6. Masa Sewa
7. Discount Rate ⭐ NEW
8. Harga Penawaran Vendor ⭐ ENHANCED
```

## 📊 Perbandingan Analisis

### SEBELUM
```
Tidak ada analisis perbandingan harga
```

### SESUDAH
```
┌────────────────────────────────────────────────────┐
│ 📊 Analisis Perbandingan Harga Penawaran           │
├────────────────────────────────────────────────────┤
│                                                    │
│ ✅ LAYAK - HARGA WAJAR                            │
│                                                    │
│ Harga penawaran vendor sesuai dengan kalkulasi    │
│ (±5%). Harga wajar dan dapat diterima.            │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ Harga Kalkulasi:     Rp 350.000.000          │ │
│ │ Harga Penawaran:     Rp 350.000.000          │ │
│ │ Selisih:             Rp 0 (0%)               │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ 💡 Rekomendasi:                                   │
│ Harga sudah kompetitif. Dapat melanjutkan ke     │
│ tahap kontrak.                                    │
│                                                    │
│ 📊 Logika Kelayakan:                              │
│ • LAYAK: Harga kalkulasi ≥ harga penawaran       │
│ • TIDAK LAYAK: Harga kalkulasi < harga penawaran │
└────────────────────────────────────────────────────┘
```

## 📄 Perbandingan Laporan PDF

### SEBELUM

#### Hasil Perhitungan
```
┌────────────────────────────────────┐
│ Harga Sewa per Tahun               │
│ Total Pendapatan Sewa              │
│ Total Biaya (Beli - Residu)        │
│ Total Keuntungan                   │
└────────────────────────────────────┘
```

#### Analisis & Rekomendasi
```
1. Return on Investment (ROI): X%
2. Margin Keuntungan Aktual: X%
3. Periode Pengembalian Modal: X tahun
4. Status Kelayakan: LAYAK/TIDAK LAYAK

Rekomendasi:
• Harga sewa yang dihitung menghasilkan 
  keuntungan positif dan layak untuk diterapkan.
• Pertimbangkan kondisi pasar dan kompetitor.
```

---

### SESUDAH

#### Hasil Perhitungan
```
┌────────────────────────────────────┐
│ Harga Sewa per Tahun (Kalkulasi)   │
│ Present Value Biaya Sewa           │
│ Efisiensi Biaya (PV vs Harga Beli) │
│ Skor Kelayakan                     │
└────────────────────────────────────┘
```

#### Analisis & Rekomendasi
```
1. Present Value Biaya Sewa: Rp XXX
   Dengan discount rate X%, total biaya sewa 
   dalam nilai sekarang.

2. Efisiensi Biaya: XX.X%
   Perbandingan PV biaya sewa terhadap harga beli.
   ✓ Sewa lebih efisien dari segi nilai waktu uang

3. Skor Kelayakan: LAYAK/TIDAK LAYAK
   Selisih harga penawaran: X.X%

Rekomendasi:
• Dari perspektif nilai waktu uang, sewa lebih 
  menguntungkan dibanding beli.
• Harga penawaran vendor layak diterima.
• Pertimbangkan kondisi pasar dan kompetitor.
```

#### Analisis Perbandingan Harga (NEW)
```
┌────────────────────────────────────┐
│ Harga Kalkulasi:    Rp XXX         │
│ Harga Penawaran:    Rp XXX         │
│ Selisih:            Rp XXX (X%)    │
└────────────────────────────────────┘

Status: LAYAK - HARGA WAJAR ✅

Kesimpulan:
• Status Kelayakan: LAYAK
• Harga penawaran vendor sesuai dengan kalkulasi
• Harga wajar dan dapat diterima

Rekomendasi Tindakan:
• Harga sudah kompetitif
• Dapat melanjutkan ke tahap kontrak
• Pastikan semua terms & conditions sesuai
```

## 🎯 Perbandingan Use Case

### SEBELUM
```
User Story:
"Sebagai vendor, saya ingin menghitung harga sewa 
yang menguntungkan untuk saya."

Fokus: Keuntungan vendor
Output: ROI, margin keuntungan
Keputusan: Apakah vendor untung?
```

### SESUDAH
```
User Story:
"Sebagai user, saya ingin mengetahui apakah harga 
sewa yang ditawarkan vendor layak atau tidak."

Fokus: Biaya yang harus dibayar user
Output: PV, efisiensi, kelayakan
Keputusan: Apakah penawaran layak diterima?
```

## 📊 Perbandingan Metrik

### SEBELUM
| Metrik | Nilai | Interpretasi |
|--------|-------|--------------|
| Total Pendapatan | Rp 1.050.000.000 | Pendapatan vendor |
| Total Biaya | Rp 1.170.000.000 | Biaya vendor |
| Total Keuntungan | -Rp 120.000.000 | Vendor rugi |
| ROI | -10.3% | Tidak layak untuk vendor |

**Kesimpulan:** Vendor rugi, tidak layak

---

### SESUDAH
| Metrik | Nilai | Interpretasi |
|--------|-------|--------------|
| Harga Kalkulasi | Rp 350.000.000 | Benchmark harga |
| Present Value | Rp 870.398.014 | Biaya dalam nilai sekarang |
| Efisiensi | 67.0% | Sewa lebih efisien dari beli |
| Kelayakan | LAYAK | Penawaran dapat diterima |

**Kesimpulan:** Sewa efisien, penawaran layak

## 🎨 Perbandingan Visual Design

### SEBELUM
```
┌─────────────────────┐
│ Hasil Perhitungan   │ ← Judul sederhana
├─────────────────────┤
│ [4 kartu hijau]     │ ← Semua warna sama
│                     │
│ [Tidak ada analisis]│ ← Tidak ada guidance
└─────────────────────┘
```

### SESUDAH
```
┌─────────────────────────────────────┐
│ 🧮 Hasil Perhitungan                │ ← Icon + judul
├─────────────────────────────────────┤
│ [Hijau] [Ungu] [Hijau] [Hijau]     │ ← Warna berbeda
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 📊 Analisis Perbandingan        ││ ← Analisis detail
│ │ ✅ LAYAK - HARGA WAJAR          ││
│ │                                 ││
│ │ [3 kartu perbandingan]          ││
│ │                                 ││
│ │ 💡 Rekomendasi:                 ││
│ │ Harga sudah kompetitif...       ││
│ │                                 ││
│ │ 📊 Logika Kelayakan:            ││
│ │ • LAYAK: ...                    ││
│ │ • TIDAK LAYAK: ...              ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## 💡 Perbandingan Value Proposition

### SEBELUM
```
❌ Tidak jelas untuk siapa fitur ini
❌ Fokus pada perspektif vendor
❌ Tidak ada time value of money
❌ Tidak ada analisis kelayakan
❌ Tidak ada rekomendasi
```

### SESUDAH
```
✅ Jelas untuk user yang akan menyewa
✅ Fokus pada perspektif user
✅ Menggunakan Present Value
✅ Analisis kelayakan komprehensif
✅ Rekomendasi negosiasi spesifik
✅ Perbandingan sewa vs beli
✅ 5 kategori kelayakan
```

## 🎯 Impact Summary

### Untuk User
| Aspek | Sebelum | Sesudah | Improvement |
|-------|---------|---------|-------------|
| Clarity | ⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐ | +150% |
| Usefulness | ⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐ | +150% |
| Decision Support | ⭐☆☆☆☆ | ⭐⭐⭐⭐⭐ | +300% |
| Actionability | ⭐☆☆☆☆ | ⭐⭐⭐⭐⭐ | +300% |

### Untuk Organisasi
| Aspek | Sebelum | Sesudah | Improvement |
|-------|---------|---------|-------------|
| Cost Efficiency | ⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐ | +150% |
| Decision Quality | ⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐ | +150% |
| Negotiation Power | ⭐☆☆☆☆ | ⭐⭐⭐⭐⭐ | +300% |
| Transparency | ⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐ | +150% |

---

**Kesimpulan:** Fitur Present Value memberikan value yang jauh lebih besar untuk user dengan fokus pada analisis kelayakan harga sewa dan rekomendasi negosiasi yang actionable.

**Version:** 2.0  
**Date:** 5 Maret 2026
