# Visual Guide: Analisa Sewa dengan Present Value

## 🎨 Perubahan UI/UX

### 1. Input Form - Tambahan Field Discount Rate

```
┌─────────────────────────────────────────────────────────────┐
│  Masa Sewa (tahun) *                                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 3                                                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Discount Rate / Tingkat Diskonto (%) * ✨ BARU!           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 10                                                    │  │
│  └───────────────────────────────────────────────────────┘  │
│  Tingkat diskonto untuk menghitung Present Value biaya sewa │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. Hasil Perhitungan - Layout Baru

#### SEBELUM (Old Layout)
```
┌──────────────────────────────────┬──────────────────────────────────┐
│ Harga Sewa per Tahun             │ Harga Sewa per Bulan             │
│ Rp 1.850.000                     │ Rp 154.167                       │
├──────────────────────────────────┼──────────────────────────────────┤
│ Total Pendapatan Sewa            │ ROI                              │
│ Rp 5.550.000                     │ -20.71%                          │
└──────────────────────────────────┴──────────────────────────────────┘
```

#### SESUDAH (New Layout) ✨
```
┌──────────────────────────────────┬──────────────────────────────────┐
│ Harga Sewa per Tahun (Kalkulasi) │ Present Value Biaya Sewa         │
│ Rp 356.666.667                   │ Rp 870.489.105                   │
│ Hasil perhitungan optimal        │ Total PV dengan discount 10%     │
├──────────────────────────────────┼──────────────────────────────────┤
│ Feasibility Score ⭐             │ Savings Potential 💰             │
│ B (Wajar) ✅                     │ Rp 20.000.000                    │
│ Selisih: 1.9%                    │ Potensi penghematan total        │
└──────────────────────────────────┴──────────────────────────────────┘
```

---

### 3. Feasibility Score - Visual Indicators

#### Score A+ (Verifikasi)
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ A+ (Verifikasi) 🔍                  │ ← Orange
│ Selisih: 18.5%                      │
│                                     │
│ Penawaran terlalu rendah            │
│ Perlu verifikasi kualitas           │
└─────────────────────────────────────┘
```

#### Score A (Sangat Baik)
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ A (Sangat Baik) 🎯                  │ ← Blue
│ Selisih: 8.5%                       │
│                                     │
│ Penawaran sangat kompetitif         │
│ Segera lakukan kesepakatan          │
└─────────────────────────────────────┘
```

#### Score B (Wajar)
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ B (Wajar) ✅                        │ ← Green
│ Selisih: 1.9%                       │
│                                     │
│ Harga wajar dan dapat diterima      │
│ Lanjutkan ke tahap kontrak          │
└─────────────────────────────────────┘
```

#### Score C (Negosiasi)
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ C (Negosiasi) 💡                    │ ← Yellow
│ Selisih: 10.0%                      │
│                                     │
│ Dapat dinegosiasikan                │
│ Coba negosiasi untuk harga lebih    │
│ mendekati kalkulasi                 │
└─────────────────────────────────────┘
```

#### Score D (Tidak Layak)
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ D (Tidak Layak) ⚠️                  │ ← Red
│ Selisih: 28.6%                      │
│                                     │
│ Harga terlalu tinggi                │
│ Sangat disarankan negosiasi ulang   │
└─────────────────────────────────────┘
```

#### Tanpa Penawaran
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ N/A                                 │ ← Gray
│ Masukkan harga penawaran            │
└─────────────────────────────────────┘
```

---

### 4. Savings Potential - Visual Indicators

#### Penghematan (Positif)
```
┌─────────────────────────────────────┐
│ Savings Potential                   │
│                                     │
│ Rp 90.000.000 💰                    │ ← Green
│ Potensi penghematan total           │
│                                     │
│ ✓ Penawaran lebih murah             │
│ ✓ Hemat Rp 30 juta/tahun            │
└─────────────────────────────────────┘
```

#### Biaya Tambahan (Negatif)
```
┌─────────────────────────────────────┐
│ Savings Potential                   │
│                                     │
│ Rp 150.000.000 ⚠️                   │ ← Red
│ Potensi biaya tambahan              │
│                                     │
│ ✗ Penawaran lebih mahal             │
│ ✗ Tambahan Rp 50 juta/tahun         │
└─────────────────────────────────────┘
```

#### Tanpa Penawaran
```
┌─────────────────────────────────────┐
│ Savings Potential                   │
│                                     │
│ N/A                                 │ ← Gray
│ Perbandingan dengan penawaran       │
└─────────────────────────────────────┘
```

---

### 5. Complete View - Full Page Layout

```
╔═══════════════════════════════════════════════════════════════════╗
║                    HITUNG HARGA SEWA                              ║
╚═══════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────┐
│ ℹ️ Deskripsi:                                                     │
│ Analisis untuk menentukan harga sewa alat medis yang akan        │
│ disewakan kepada pihak lain. Perhitungan mempertimbangkan        │
│ harga beli, umur ekonomis, nilai residu, dan tingkat             │
│ keuntungan yang diharapkan.                                       │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┬─────────────────────────────────┐
│ Nama Alat *                     │ Harga Beli Alat (Rp) *          │
│ CT Scan 64 Slice                │ Rp 1.300.000.000                │
├─────────────────────────────────┼─────────────────────────────────┤
│ Umur Ekonomis Alat (tahun) *    │ Nilai Residu (Rp)               │
│ 5                               │ Rp 130.000.000                  │
├─────────────────────────────────┼─────────────────────────────────┤
│ Tingkat Keuntungan Vendor (%) * │ Masa Sewa (tahun) *             │
│ 20                              │ 3                               │
├─────────────────────────────────┼─────────────────────────────────┤
│ Discount Rate (%) * ✨ BARU!    │                                 │
│ 10                              │                                 │
│ Tingkat diskonto untuk PV       │                                 │
└─────────────────────────────────┴─────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ 💰 Harga Penawaran SEWA dari Vendor (Rp/tahun) (Opsional)        │
│                                                                   │
│ ⚠️ PENTING: Ini adalah harga SEWA per tahun yang ditawarkan     │
│ vendor, BUKAN harga beli alat!                                    │
│                                                                   │
│ Rp 350.000.000                                                    │
│                                                                   │
│ 💡 Untuk apa field ini?                                          │
│ • Membandingkan harga kalkulasi dengan penawaran vendor          │
│ • Menentukan apakah penawaran LAYAK atau TIDAK LAYAK            │
│ • Mendapatkan rekomendasi negosiasi yang spesifik               │
└───────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════╗
║                      HASIL PERHITUNGAN                            ║
╚═══════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────┬──────────────────────────────────┐
│ Harga Sewa per Tahun (Kalkulasi) │ Present Value Biaya Sewa         │
│                                  │                                  │
│ Rp 356.666.667                   │ Rp 870.489.105                   │
│ Hasil perhitungan optimal        │ Total PV dengan discount 10%     │
├──────────────────────────────────┼──────────────────────────────────┤
│ Feasibility Score ⭐             │ Savings Potential 💰             │
│                                  │                                  │
│ B (Wajar) ✅                     │ Rp 20.000.000                    │
│ Selisih: 1.9%                    │ Potensi penghematan total        │
└──────────────────────────────────┴──────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ Rumus Perhitungan:                                                │
│ Harga Sewa = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa)│
│               - Nilai Residu) / Masa Sewa                         │
│                                                                   │
│ = ((Rp 1.300.000.000 × (1 + 20%)) - Rp 130.000.000) / 3 tahun   │
└───────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════╗
║           ANALISIS PERBANDINGAN HARGA PENAWARAN                   ║
╚═══════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────┐
│ 🎯 LAYAK - HARGA WAJAR                                           │
│                                                                   │
│ ✅ Harga penawaran vendor sesuai dengan kalkulasi (±5%).         │
│    Harga wajar dan dapat diterima.                               │
│                                                                   │
│ ┌─────────────────┬─────────────────┬─────────────────┐          │
│ │ Harga Kalkulasi │ Harga Penawaran │ Selisih         │          │
│ │ Rp 356.666.667  │ Rp 350.000.000  │ Rp 6.666.667    │          │
│ │                 │                 │ (1.9%)          │          │
│ └─────────────────┴─────────────────┴─────────────────┘          │
│                                                                   │
│ 💡 Rekomendasi:                                                  │
│ Harga sudah kompetitif. Dapat melanjutkan ke tahap kontrak.     │
│                                                                   │
│ 📊 Logika Kelayakan:                                             │
│ • LAYAK: Harga kalkulasi ≥ harga penawaran                      │
│ • TIDAK LAYAK: Harga kalkulasi < harga penawaran                │
└───────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┬──────────────────────────────────┐
│ [💾 Simpan Analisis]             │ [📄 Unduh PDF]                   │
└──────────────────────────────────┴──────────────────────────────────┘
```

---

### 6. Color Palette

#### Feasibility Score Colors
```
A+ (Verifikasi)  : #EA580C (Orange-600)
A (Sangat Baik)  : #2563EB (Blue-600)
B (Wajar)        : #16A34A (Green-600)
C (Negosiasi)    : #CA8A04 (Yellow-600)
D (Tidak Layak)  : #DC2626 (Red-600)
N/A              : #9CA3AF (Gray-400)
```

#### Savings Potential Colors
```
Penghematan      : #15803D (Green-700)
Biaya Tambahan   : #B91C1C (Red-700)
N/A              : #9CA3AF (Gray-400)
```

#### Other Elements
```
Present Value    : #7C3AED (Purple-700)
Harga Kalkulasi  : #15803D (Green-700)
```

---

### 7. Responsive Behavior

#### Desktop (≥1024px)
```
┌────────────────┬────────────────┐
│ Kalkulasi      │ Present Value  │
├────────────────┼────────────────┤
│ Feasibility    │ Savings        │
└────────────────┴────────────────┘
```

#### Tablet (768px - 1023px)
```
┌────────────────┬────────────────┐
│ Kalkulasi      │ Present Value  │
├────────────────┴────────────────┤
│ Feasibility    │ Savings        │
└────────────────┴────────────────┘
```

#### Mobile (<768px)
```
┌────────────────────────────────┐
│ Kalkulasi                      │
├────────────────────────────────┤
│ Present Value                  │
├────────────────────────────────┤
│ Feasibility                    │
├────────────────────────────────┤
│ Savings                        │
└────────────────────────────────┘
```

---

### 8. Interactive States

#### Hover State
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │ ← Shadow meningkat
│                                     │   Transform scale(1.02)
│ B (Wajar) ✅                        │
│ Selisih: 1.9%                       │
└─────────────────────────────────────┘
```

#### Loading State
```
┌─────────────────────────────────────┐
│ Feasibility Score                   │
│                                     │
│ ⏳ Menghitung...                    │ ← Skeleton loading
│                                     │
└─────────────────────────────────────┘
```

---

### 9. Accessibility Features

#### Screen Reader Text
```html
<div aria-label="Feasibility Score: B (Wajar), Selisih 1.9%, Status Layak">
  B (Wajar) ✅
</div>
```

#### Keyboard Navigation
```
Tab Order:
1. Input Discount Rate
2. Input Harga Penawaran
3. Button Simpan Analisis
4. Button Unduh PDF
```

#### Color Contrast
```
All text meets WCAG AA standards:
- Score text: 4.5:1 minimum
- Helper text: 4.5:1 minimum
- Background contrast: 3:1 minimum
```

---

### 10. Animation & Transitions

#### Card Entrance
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card {
  animation: fadeInUp 0.3s ease-out;
}
```

#### Score Change
```css
.score-value {
  transition: all 0.3s ease;
}

.score-value.changed {
  animation: pulse 0.5s ease;
}
```

---

## 📱 Mobile Screenshots (Conceptual)

### Before
```
┌─────────────────────────┐
│ Total Pendapatan Sewa   │
│ Rp 5.550.000            │
│                         │
│ ROI                     │
│ -20.71%                 │
└─────────────────────────┘
```

### After
```
┌─────────────────────────┐
│ Feasibility Score ⭐    │
│ B (Wajar) ✅            │
│ Selisih: 1.9%           │
│                         │
│ Savings Potential 💰    │
│ Rp 20.000.000           │
│ Potensi penghematan     │
└─────────────────────────┘
```

---

## 🎯 Key Visual Improvements

1. **Clearer Information Hierarchy**
   - Score lebih prominent
   - Warna sesuai severity
   - Icon untuk quick recognition

2. **Better Data Visualization**
   - Savings dalam rupiah konkret
   - Persentase selisih jelas
   - Status LAYAK/TIDAK LAYAK explicit

3. **Improved User Experience**
   - Tidak perlu interpretasi ROI
   - Langsung tahu kelayakan
   - Actionable insights

4. **Professional Look**
   - Consistent color scheme
   - Clean layout
   - Modern card design

---

**Note**: Ini adalah representasi visual konseptual. Implementasi aktual menggunakan Tailwind CSS dengan komponen React.
