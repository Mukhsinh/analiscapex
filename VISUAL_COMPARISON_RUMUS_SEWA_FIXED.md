# Perbandingan Visual: Rumus Lama vs Rumus Baru (FIXED)

## 📊 Perbandingan Rumus

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RUMUS LAMA                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Harga Sewa = ((Harga Beli × (1 + Tingkat Keuntungan))            │
│                - Nilai Residu) / Masa Sewa                         │
│                                                                     │
│  Konsep: Keuntungan dihitung SEKALI terhadap harga beli           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         RUMUS BARU                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Harga Sewa = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa)│
│                - Nilai Residu) / Masa Sewa                         │
│                                                                     │
│  Konsep: Keuntungan DIKALIKAN dengan masa sewa                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 💰 Contoh Perhitungan Detail

### Data Input:
```
Harga Beli        : Rp 1.300.000.000
Nilai Residu      : Rp   130.000.000
Tingkat Keuntungan: 20%
Masa Sewa         : 3 tahun
```

### Perhitungan Rumus LAMA:

```
Step 1: Hitung keuntungan
        1.300.000.000 × (1 + 0,20)
        = 1.300.000.000 × 1,20
        = 1.560.000.000

Step 2: Kurangi nilai residu
        1.560.000.000 - 130.000.000
        = 1.430.000.000

Step 3: Bagi dengan masa sewa
        1.430.000.000 / 3
        = Rp 476.666.667 per tahun

┌────────────────────────────────────┐
│  HASIL RUMUS LAMA                  │
│  Rp 476.666.667 per tahun          │
└────────────────────────────────────┘
```

### Perhitungan Rumus BARU:

```
Step 1: Hitung keuntungan × masa sewa
        1.300.000.000 × (1 + 0,20) × 3
        = 1.300.000.000 × 1,20 × 3
        = 1.300.000.000 × 3,60
        = 4.680.000.000

Step 2: Kurangi nilai residu
        4.680.000.000 - 130.000.000
        = 4.550.000.000

Step 3: Bagi dengan masa sewa
        4.550.000.000 / 3
        = Rp 1.516.666.667 per tahun

┌────────────────────────────────────┐
│  HASIL RUMUS BARU                  │
│  Rp 1.516.666.667 per tahun        │
└────────────────────────────────────┘
```

## 📈 Analisis Selisih

```
┌─────────────────────────────────────────────────────────────┐
│                    PERBANDINGAN HASIL                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Rumus Lama    : Rp   476.666.667 per tahun                │
│  Rumus Baru    : Rp 1.516.666.667 per tahun                │
│                                                             │
│  Selisih       : Rp 1.040.000.000 per tahun                │
│  Persentase    : 218% lebih tinggi                         │
│                                                             │
│  Total 3 Tahun:                                            │
│  - Rumus Lama  : Rp 1.430.000.000                          │
│  - Rumus Baru  : Rp 4.550.000.000                          │
│  - Selisih     : Rp 3.120.000.000                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Grafik Perbandingan

```
Harga Sewa per Tahun (dalam juta rupiah)

1600┤                                    ╭─── Rumus Baru
    │                                    │    Rp 1.516,7 jt
1400┤                                    ●
    │                                    │
1200┤                                    │
    │                                    │
1000┤                                    │
    │                                    │
 800┤                                    │
    │                                    │
 600┤                                    │
    │                        ●───────────╯
 400┤                        │    Rumus Lama
    │                        │    Rp 476,7 jt
 200┤                        │
    │                        │
   0┼────────────────────────┴─────────────────────────
         Selisih: Rp 1.040 jt (218% lebih tinggi)
```

## 🔍 Perbandingan Berbagai Skenario

### Skenario 1: Masa Sewa 1 Tahun
```
Input: Harga Beli Rp 1.000.000.000, Margin 20%, Masa 1 tahun

Rumus Lama: ((1.000.000.000 × 1,20) - 0) / 1 = Rp 1.200.000.000
Rumus Baru: ((1.000.000.000 × 1,20 × 1) - 0) / 1 = Rp 1.200.000.000

Selisih: Rp 0 (SAMA untuk masa sewa 1 tahun)
```

### Skenario 2: Masa Sewa 3 Tahun
```
Input: Harga Beli Rp 1.000.000.000, Margin 20%, Masa 3 tahun

Rumus Lama: ((1.000.000.000 × 1,20) - 0) / 3 = Rp 400.000.000
Rumus Baru: ((1.000.000.000 × 1,20 × 3) - 0) / 3 = Rp 1.200.000.000

Selisih: Rp 800.000.000 (200% lebih tinggi)
```

### Skenario 3: Masa Sewa 5 Tahun
```
Input: Harga Beli Rp 1.000.000.000, Margin 20%, Masa 5 tahun

Rumus Lama: ((1.000.000.000 × 1,20) - 0) / 5 = Rp 240.000.000
Rumus Baru: ((1.000.000.000 × 1,20 × 5) - 0) / 5 = Rp 1.200.000.000

Selisih: Rp 960.000.000 (400% lebih tinggi)
```

## 📈 Tabel Perbandingan Lengkap

| Masa Sewa | Rumus Lama | Rumus Baru | Selisih | % Kenaikan |
|-----------|------------|------------|---------|------------|
| 1 tahun   | 1.200 jt   | 1.200 jt   | 0 jt    | 0%         |
| 2 tahun   | 600 jt     | 1.200 jt   | 600 jt  | 100%       |
| 3 tahun   | 400 jt     | 1.200 jt   | 800 jt  | 200%       |
| 4 tahun   | 300 jt     | 1.200 jt   | 900 jt  | 300%       |
| 5 tahun   | 240 jt     | 1.200 jt   | 960 jt  | 400%       |

*Asumsi: Harga Beli Rp 1.000.000.000, Margin 20%, Tanpa Residu*

## 💡 Kesimpulan

### Pola Perbedaan:
```
┌─────────────────────────────────────────────────────────┐
│  Masa Sewa = 1 tahun  →  Tidak ada perbedaan (0%)      │
│  Masa Sewa = 2 tahun  →  Perbedaan 100%                │
│  Masa Sewa = 3 tahun  →  Perbedaan 200%                │
│  Masa Sewa = n tahun  →  Perbedaan (n-1) × 100%        │
└─────────────────────────────────────────────────────────┘
```

### Mengapa Rumus Baru Lebih Masuk Akal?

1. **Proporsional dengan Durasi**
   - Vendor menginvestasikan modal lebih lama
   - Keuntungan harus sebanding dengan durasi investasi

2. **Lebih Adil untuk Vendor**
   - Memperhitungkan opportunity cost
   - Risiko lebih besar untuk kontrak lebih panjang

3. **Konsisten dengan Praktik Bisnis**
   - Harga sewa per tahun tetap sama berapa pun masa sewa
   - Vendor mendapat keuntungan yang proporsional

### Dampak untuk User

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️  PERHATIAN                                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Harga sewa yang dihitung akan JAUH LEBIH TINGGI       │
│  dibanding sebelumnya, terutama untuk:                 │
│                                                         │
│  • Masa sewa yang panjang (≥3 tahun)                   │
│  • Tingkat keuntungan yang tinggi (≥20%)               │
│                                                         │
│  Ini NORMAL karena rumus baru memperhitungkan          │
│  durasi investasi vendor dengan lebih adil.            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🧮 Penjelasan Matematis

### Rumus Lama:
```
Harga Sewa = ((HB × (1 + M)) - NR) / T

Dimana:
- HB = Harga Beli
- M = Margin (%)
- NR = Nilai Residu
- T = Masa Sewa (tahun)

Keuntungan Total = HB × M
Keuntungan per Tahun = (HB × M) / T
```

### Rumus Baru:
```
Harga Sewa = ((HB × (1 + M) × T) - NR) / T

Dimana:
- HB = Harga Beli
- M = Margin (%)
- T = Masa Sewa (tahun)
- NR = Nilai Residu

Keuntungan Total = HB × M × T
Keuntungan per Tahun = HB × M (KONSTAN!)
```

### Insight Penting:
Dengan rumus baru, **keuntungan per tahun adalah konstan** (HB × M), tidak peduli berapa lama masa sewa. Ini lebih masuk akal karena vendor seharusnya mendapat keuntungan yang sama per tahun, bukan keuntungan yang mengecil seiring bertambahnya masa sewa.

---

**Catatan**: Rumus baru membuat harga sewa per tahun konsisten dan proporsional dengan durasi investasi vendor.
