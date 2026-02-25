# Panduan Fitur Export

## Fitur Unduh Analisis

Aplikasi Capex Analyzer menyediakan dua metode untuk mengunduh hasil analisis:

### 1. Unduh Excel (Format .xlsx)

**Cara Menggunakan:**
1. Lakukan perhitungan analisis terlebih dahulu dengan mengklik tombol "Hitung & Bandingkan Semua Alternatif"
2. Setelah hasil muncul, klik tombol **"Unduh Excel"** (tombol hijau)
3. File Excel (.xlsx) akan otomatis terunduh dengan nama: `Analisis-Capex-YYYY-MM-DD.xlsx`

**Format File:**
- File dalam format Excel (.xlsx) - format native Microsoft Excel
- Kompatibel dengan Microsoft Excel, Google Sheets, LibreOffice Calc, dan aplikasi spreadsheet lainnya
- Multi-sheet workbook dengan 4 sheet terpisah:
  - **Ringkasan:** Perbandingan total PV semua alternatif
  - **Leasing:** Detail perhitungan leasing per tahun
  - **Borrow & Purchase:** Detail perhitungan pembelian dengan pinjaman
  - **Revenue Sharing:** Detail perhitungan revenue sharing
- Kolom dengan lebar otomatis untuk kemudahan membaca
- Format angka yang rapi dan konsisten

**Membuka File di Excel:**
1. Double-click file yang telah diunduh
2. File akan langsung terbuka di Microsoft Excel atau aplikasi spreadsheet default
3. Navigasi antar sheet menggunakan tab di bagian bawah

**Keunggulan Format Excel:**
- Format native Excel (.xlsx) bukan CSV
- Multi-sheet untuk organisasi data yang lebih baik
- Kolom dengan lebar yang sudah disesuaikan
- Mudah untuk analisis lebih lanjut
- Dapat langsung diedit dan dimodifikasi

### 2. Unduh PDF (Format Profesional)

**Cara Menggunakan:**
1. Lakukan perhitungan analisis terlebih dahulu
2. Klik tombol **"Unduh PDF"** (tombol merah)
3. File PDF akan otomatis terunduh dengan nama: `Analisis-Capex-YYYY-MM-DD.pdf`

**Format PDF:**
- Dokumen PDF profesional dengan layout formal
- Multi-halaman dengan struktur yang sistematis:
  - **Halaman 1:** Header, informasi proyek, dan ringkasan perbandingan + detail leasing
  - **Halaman 2:** Detail Borrow & Purchase
  - **Halaman 3:** Detail Revenue Sharing
- Header dengan informasi lengkap:
  - Judul analisis
  - Nama rumah sakit
  - Nama alat dan departemen
  - Tanggal pembuatan
  - Copyright
- Tabel dengan grid dan warna header yang profesional
- Format angka yang rapi dan mudah dibaca
- Siap untuk presentasi atau laporan formal

**Fitur PDF:**
- Unduhan langsung tanpa dialog print
- Format profesional dan modern
- Tabel dengan styling grid yang rapi
- Header berwarna untuk setiap bagian
- Alignment yang konsisten (angka rata kanan, teks rata tengah)
- Font size yang disesuaikan untuk keterbacaan optimal
- Automatic page breaks untuk konten yang panjang

**Keunggulan PDF:**
- Tidak perlu membuka dialog print browser
- File langsung terunduh dan siap dibuka
- Format yang konsisten di semua perangkat
- Cocok untuk laporan formal dan presentasi
- Ukuran file yang optimal

### Troubleshooting

**Excel tidak membuka file dengan benar:**
- Pastikan menggunakan Microsoft Excel 2007 atau lebih baru (mendukung .xlsx)
- Coba buka dengan Google Sheets atau LibreOffice Calc sebagai alternatif
- Jika ada error, pastikan file tidak corrupt dengan mencoba download ulang

**PDF tidak terunduh:**
- Periksa pop-up blocker browser Anda
- Pastikan browser mengizinkan download otomatis
- Coba gunakan browser lain (Chrome atau Edge recommended)
- Periksa ruang penyimpanan di komputer Anda

**Tombol tidak berfungsi:**
- Pastikan perhitungan sudah dilakukan terlebih dahulu
- Refresh halaman dan coba lagi
- Periksa console browser untuk error (F12)
- Pastikan JavaScript enabled di browser

**File tidak bisa dibuka:**
- Pastikan Anda memiliki aplikasi yang sesuai (Excel untuk .xlsx, PDF reader untuk .pdf)
- Download ulang file jika corrupt
- Coba browser lain jika masalah berlanjut

### Format Data Excel

File Excel (.xlsx) yang diunduh memiliki struktur multi-sheet:

**Sheet 1: Ringkasan**
```
ANALISIS KEPUTUSAN CAPEX
[Nama Rumah Sakit]
[Nama Alat] - [Departemen]
Tanggal: [Tanggal Lengkap]
[Copyright]

RINGKASAN PERBANDINGAN
Alternatif | Total PV Expense (juta Rp)
Leasing | [nilai]
Borrow & Purchase | [nilai]
Revenue Sharing | [nilai]
```

**Sheet 2: Leasing**
```
DETAIL LEASING

Tahun | Pembayaran (juta Rp) | PV Factor | PV Expense (juta Rp)
[data per tahun]
TOTAL | | | [total]
```

**Sheet 3: Borrow & Purchase**
```
DETAIL BORROW & PURCHASE

Tahun | Principal | Interest | Maintenance | Total Expense | PV Factor | PV Expense
[data per tahun]
Trade-in | | | | | | [nilai]
TOTAL | | | | | | [total]
```

**Sheet 4: Revenue Sharing**
```
DETAIL REVENUE SHARING

Tahun | Revenue | Direct OH | Allocated OH | Operating Profit | EAT | PV Factor | PV Expense
[data per tahun]
TOTAL | | | | | | | [total]
```

### Keamanan Data

- Semua proses export dilakukan di browser (client-side)
- Tidak ada data yang dikirim ke server
- File disimpan langsung di komputer Anda
- Aman untuk data sensitif rumah sakit
- Tidak ada tracking atau logging

### Dukungan Browser

**Fully Supported:**
- Google Chrome (Recommended)
- Microsoft Edge
- Firefox
- Safari

**Minimum Requirements:**
- Browser modern dengan dukungan ES6
- JavaScript enabled
- Pop-up blocker disabled untuk download

### Library yang Digunakan

- **Excel Export:** xlsx (SheetJS) - library standar industri untuk manipulasi Excel
- **PDF Export:** jsPDF + jsPDF-AutoTable - library profesional untuk generasi PDF

---

**Catatan:** Fitur export ini dirancang untuk memberikan fleksibilitas dalam berbagi dan menyimpan hasil analisis. Pilih format yang sesuai dengan kebutuhan Anda:
- **Excel (.xlsx):** Untuk analisis lebih lanjut, editing, dan manipulasi data
- **PDF:** Untuk laporan formal, presentasi, dan dokumentasi


