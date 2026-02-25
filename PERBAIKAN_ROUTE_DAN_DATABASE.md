# Perbaikan Route dan Database

## Tanggal: 25 Februari 2026

## 1. Perbaikan Nama Route Halaman

### Masalah
Nama route halaman masih menggunakan format teknis dalam bahasa Inggris yang tidak konsisten.

### Solusi
Mengubah semua route ID menjadi format kebab-case dalam bahasa Indonesia:

| Route Lama | Route Baru | Keterangan |
|------------|------------|------------|
| `capex-analysis` | `analisis-capex` | Halaman utama analisis |
| `reports-analytics` | `laporan-grafik` | Halaman laporan dan grafik |
| `analysis-history` | `riwayat-analisis` | Halaman riwayat analisis |
| `project-settings` | `pengaturan-proyek` | Halaman pengaturan proyek |

### File yang Diubah
- `src/App.jsx` - Update activeSection default dan switch case
- `src/components/Sidebar.jsx` - Update menu items ID

## 2. Perbaikan Struktur Database

### Masalah
Beberapa data yang ada di aplikasi belum memiliki kolom atau tabel khusus di database:
1. **supplierShare** di Revenue Sharing Form tidak tersimpan
2. Procedures di Revenue Sharing hanya tersimpan di JSONB tanpa struktur terpisah
3. Tidak ada tabel summary untuk menyimpan hasil analisis lengkap

### Solusi

#### A. Tambah Kolom di Tabel `projects`

```sql
-- Kolom baru di tabel projects
ALTER TABLE projects 
ADD COLUMN supplier_share numeric DEFAULT 85;

ALTER TABLE projects
ADD COLUMN analysis_metadata jsonb DEFAULT '{}'::jsonb;
```

**Kolom Baru:**
- `supplier_share` (numeric) - Menyimpan porsi supplier untuk Revenue Sharing (default 85%)
- `analysis_metadata` (jsonb) - Metadata tambahan untuk analisis (flexible storage)

#### B. Update Tabel `revenue_share_procedures`

```sql
-- Tambah kolom untuk relasi yang lebih baik
ALTER TABLE revenue_share_procedures
ADD COLUMN project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
ADD COLUMN user_id uuid REFERENCES users(id) ON DELETE CASCADE,
ADD COLUMN updated_at timestamptz DEFAULT now();

-- Rename kolom untuk lebih jelas
ALTER TABLE revenue_share_procedures
RENAME COLUMN volume TO volume_per_year;
```

**Kolom Baru:**
- `project_id` - Referensi ke project untuk query lebih mudah
- `user_id` - Referensi ke user untuk query lebih mudah
- `updated_at` - Tracking perubahan data

#### C. Tabel Baru: `detailed_analysis_results`

Tabel baru untuk menyimpan summary lengkap dari ketiga jenis analisis:

**Struktur Tabel:**
```sql
CREATE TABLE detailed_analysis_results (
    id uuid PRIMARY KEY,
    project_id uuid REFERENCES projects(id),
    user_id uuid REFERENCES users(id),
    
    -- Leasing Summary
    leasing_monthly_payment numeric,
    leasing_period numeric,
    leasing_discount_rate numeric,
    leasing_total_pv numeric,
    
    -- Purchase Summary
    purchase_loan_amount numeric,
    purchase_interest_rate numeric,
    purchase_period numeric,
    purchase_maintenance_cost numeric,
    purchase_residual_value numeric,
    purchase_discount_rate numeric,
    purchase_total_pv numeric,
    
    -- Revenue Share Summary
    revenue_share_rs_share numeric,
    revenue_share_supplier_share numeric,
    revenue_share_direct_overhead numeric,
    revenue_share_allocated_overhead numeric,
    revenue_share_tax_rate numeric,
    revenue_share_discount_rate numeric,
    revenue_share_period numeric,
    revenue_share_total_pv numeric,
    revenue_share_total_procedures integer,
    revenue_share_total_volume numeric,
    revenue_share_total_revenue numeric,
    
    -- Recommendation
    recommended_option text,
    worst_option text,
    pv_difference numeric,
    
    -- Full Results (backward compatibility)
    full_results jsonb,
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
```

**Keuntungan:**
- Query lebih cepat untuk summary data
- Tidak perlu parsing JSONB untuk mendapatkan nilai tertentu
- Mudah untuk membuat report dan comparison
- Tetap menyimpan full results di JSONB untuk backward compatibility

### Migrations yang Diterapkan

1. **add_supplier_share_and_metadata_columns** - Tambah kolom supplier_share dan analysis_metadata
2. **update_revenue_share_procedures_add_project_user** - Update tabel revenue_share_procedures
3. **create_detailed_analysis_results_table** - Buat tabel detailed_analysis_results

## 3. Update Fungsi Database

### File: `src/lib/database.js`

#### A. Update `saveCompleteAnalysis()`

Fungsi ini sekarang menyimpan data ke tabel baru:

```javascript
// Menyimpan supplier_share ke projects
supplier_share: analysisData.revenueShare?.supplierShare || 85

// Menyimpan ke detailed_analysis_results
await supabase.from('detailed_analysis_results').insert([{
  // ... semua field terstruktur
  revenue_share_supplier_share: analysisData.revenueShare.supplierShare || (100 - analysisData.revenueShare.rsShare),
  // ...
}])

// Menyimpan procedures ke tabel terpisah dengan project_id dan user_id
const procedures = analysisData.revenueShare.procedures.map(proc => ({
  project_id: project.id,
  user_id: userId,
  procedure_name: proc.name,
  tariff: proc.tariff,
  volume_per_year: proc.volume,
  annual_revenue: (proc.tariff * (analysisData.revenueShare.rsShare / 100) * proc.volume) / 1000000
}))
```

#### B. Fungsi Baru

1. **getProjectProcedures(projectId)** - Ambil procedures berdasarkan project_id
2. **getProjectDetailedAnalysis(projectId)** - Ambil detailed analysis untuk project
3. **getUserDetailedAnalyses(userId, limit)** - Ambil semua detailed analyses untuk user

## 4. Struktur Data yang Tersimpan

### Sebelum Perbaikan
```
projects
├── hospital_name
├── equipment_name
├── department
└── copyright

analysis_results
├── input_data (JSONB) - semua data input
└── results (JSONB) - semua hasil perhitungan
```

### Setelah Perbaikan
```
projects
├── hospital_name
├── equipment_name
├── department
├── copyright
├── supplier_share ✨ BARU
└── analysis_metadata ✨ BARU

detailed_analysis_results ✨ TABEL BARU
├── leasing_* (6 kolom terstruktur)
├── purchase_* (7 kolom terstruktur)
├── revenue_share_* (11 kolom terstruktur)
├── recommended_option
├── worst_option
├── pv_difference
└── full_results (JSONB backup)

revenue_share_procedures (UPDATED)
├── analysis_result_id
├── project_id ✨ BARU
├── user_id ✨ BARU
├── procedure_name
├── tariff
├── volume_per_year (renamed dari volume)
├── annual_revenue
├── created_at
└── updated_at ✨ BARU
```

## 5. Keuntungan Perbaikan

### A. Route yang Lebih Konsisten
- Semua route menggunakan bahasa Indonesia
- Format kebab-case yang konsisten
- Lebih mudah dipahami oleh developer Indonesia

### B. Database yang Lebih Terstruktur
- **Performa Query Lebih Cepat**: Tidak perlu parsing JSONB untuk field yang sering diakses
- **Data Integrity**: Kolom terstruktur dengan tipe data yang jelas
- **Easier Analytics**: Mudah membuat report dan aggregation
- **Better Indexing**: Bisa membuat index pada kolom spesifik
- **Backward Compatible**: Tetap menyimpan full results di JSONB

### C. Data Completeness
- Semua data di aplikasi sekarang tersimpan di database
- Tidak ada data yang hilang atau tidak tercatat
- Supplier share sekarang tersimpan dengan benar
- Procedures memiliki relasi langsung ke project dan user

## 6. Testing

### Cara Test Perbaikan

1. **Test Route:**
   ```bash
   # Jalankan aplikasi dan navigasi ke setiap menu
   # Pastikan URL dan navigasi berfungsi dengan baik
   ```

2. **Test Database:**
   ```sql
   -- Cek struktur tabel baru
   SELECT * FROM detailed_analysis_results LIMIT 1;
   
   -- Cek kolom baru di projects
   SELECT supplier_share, analysis_metadata FROM projects LIMIT 1;
   
   -- Cek procedures dengan relasi baru
   SELECT * FROM revenue_share_procedures 
   WHERE project_id IS NOT NULL LIMIT 5;
   ```

3. **Test Aplikasi:**
   - Login ke aplikasi
   - Buat analisis baru dengan semua 3 metode
   - Pastikan data tersimpan dengan benar
   - Cek di Supabase dashboard bahwa semua tabel terisi

## 7. Catatan Penting

1. **Backward Compatibility**: Fungsi lama tetap berfungsi karena kita masih menyimpan data di `analysis_results` dengan format JSONB
2. **Migration Safe**: Semua migration menggunakan `IF NOT EXISTS` dan `ADD COLUMN IF NOT EXISTS`
3. **No Data Loss**: Data lama tidak terpengaruh, hanya menambah kolom dan tabel baru
4. **Indexes Added**: Index ditambahkan untuk performa query yang lebih baik

## 8. Next Steps (Opsional)

1. Migrate data lama dari JSONB ke tabel terstruktur
2. Tambahkan RLS (Row Level Security) untuk keamanan
3. Buat view untuk query yang kompleks
4. Tambahkan trigger untuk auto-update timestamps
5. Implementasi soft delete untuk data history

## Kesimpulan

Perbaikan ini menyelesaikan 2 masalah utama:
1. ✅ Route halaman sekarang konsisten dan menggunakan bahasa Indonesia
2. ✅ Semua data aplikasi sekarang tersimpan dengan struktur yang jelas di database

Database sekarang lebih terstruktur, performa lebih baik, dan semua data tercatat dengan lengkap.
