-- ============================================
-- VERIFIKASI DATABASE LENGKAP
-- Tanggal: 25 Februari 2026
-- ============================================

-- 1. CEK STRUKTUR TABEL PROJECTS (dengan kolom baru)
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'projects'
ORDER BY ordinal_position;

-- 2. CEK STRUKTUR TABEL REVENUE_SHARE_PROCEDURES (dengan kolom baru)
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'revenue_share_procedures'
ORDER BY ordinal_position;

-- 3. CEK STRUKTUR TABEL DETAILED_ANALYSIS_RESULTS (tabel baru)
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'detailed_analysis_results'
ORDER BY ordinal_position;

-- 4. CEK SEMUA TABEL DAN JUMLAH ROWS
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_schema = schemaname AND table_name = tablename) as column_count
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 5. CEK FOREIGN KEY CONSTRAINTS
SELECT
    tc.table_name, 
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 6. CEK INDEXES
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. CEK COMMENTS PADA TABEL DAN KOLOM
SELECT 
    c.table_name,
    c.column_name,
    pgd.description
FROM pg_catalog.pg_statio_all_tables AS st
INNER JOIN pg_catalog.pg_description pgd ON (pgd.objoid = st.relid)
INNER JOIN information_schema.columns c ON (
    pgd.objsubid = c.ordinal_position AND
    c.table_schema = st.schemaname AND
    c.table_name = st.relname
)
WHERE st.schemaname = 'public'
ORDER BY c.table_name, c.ordinal_position;

-- 8. TEST INSERT KE TABEL BARU (untuk verifikasi struktur)
-- CATATAN: Uncomment untuk test, tapi pastikan ada user_id yang valid

/*
-- Test insert ke detailed_analysis_results
INSERT INTO detailed_analysis_results (
    user_id,
    leasing_monthly_payment,
    leasing_period,
    leasing_discount_rate,
    leasing_total_pv,
    purchase_loan_amount,
    purchase_interest_rate,
    purchase_period,
    purchase_total_pv,
    revenue_share_rs_share,
    revenue_share_supplier_share,
    revenue_share_total_pv,
    recommended_option,
    worst_option,
    pv_difference
) VALUES (
    (SELECT id FROM users LIMIT 1), -- Ambil user pertama
    280, 60, 10, 15000,
    1300, 10, 5, 14500,
    15, 85, 16000,
    'Borrow & Purchase',
    'Revenue Sharing',
    1500
) RETURNING *;
*/

-- 9. CEK DATA YANG ADA
SELECT 
    'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'analysis_results', COUNT(*) FROM analysis_results
UNION ALL
SELECT 'form_inputs', COUNT(*) FROM form_inputs
UNION ALL
SELECT 'revenue_share_procedures', COUNT(*) FROM revenue_share_procedures
UNION ALL
SELECT 'analysis_recommendations', COUNT(*) FROM analysis_recommendations
UNION ALL
SELECT 'detailed_analysis_results', COUNT(*) FROM detailed_analysis_results
UNION ALL
SELECT 'analysis_yearly_breakdown', COUNT(*) FROM analysis_yearly_breakdown
ORDER BY table_name;

-- 10. CEK KOLOM SUPPLIER_SHARE DI PROJECTS
SELECT 
    id,
    hospital_name,
    equipment_name,
    supplier_share,
    analysis_metadata,
    created_at
FROM projects
ORDER BY created_at DESC
LIMIT 5;

-- 11. CEK PROCEDURES DENGAN RELASI BARU
SELECT 
    rsp.id,
    rsp.procedure_name,
    rsp.tariff,
    rsp.volume_per_year,
    rsp.annual_revenue,
    p.hospital_name,
    p.equipment_name,
    u.email
FROM revenue_share_procedures rsp
LEFT JOIN projects p ON rsp.project_id = p.id
LEFT JOIN users u ON rsp.user_id = u.id
ORDER BY rsp.created_at DESC
LIMIT 10;

-- 12. CEK DETAILED ANALYSIS RESULTS
SELECT 
    dar.id,
    dar.recommended_option,
    dar.worst_option,
    dar.pv_difference,
    dar.leasing_total_pv,
    dar.purchase_total_pv,
    dar.revenue_share_total_pv,
    p.hospital_name,
    p.equipment_name,
    u.email,
    dar.created_at
FROM detailed_analysis_results dar
LEFT JOIN projects p ON dar.project_id = p.id
LEFT JOIN users u ON dar.user_id = u.id
ORDER BY dar.created_at DESC
LIMIT 10;

-- 13. SUMMARY STATISTICS
SELECT 
    'Total Users' as metric, COUNT(*)::text as value FROM users
UNION ALL
SELECT 'Total Projects', COUNT(*)::text FROM projects
UNION ALL
SELECT 'Total Analyses', COUNT(*)::text FROM analysis_results
UNION ALL
SELECT 'Total Detailed Analyses', COUNT(*)::text FROM detailed_analysis_results
UNION ALL
SELECT 'Total Procedures', COUNT(*)::text FROM revenue_share_procedures
UNION ALL
SELECT 'Total Recommendations', COUNT(*)::text FROM analysis_recommendations
UNION ALL
SELECT 'Projects with Supplier Share', COUNT(*)::text FROM projects WHERE supplier_share IS NOT NULL
UNION ALL
SELECT 'Procedures with Project Link', COUNT(*)::text FROM revenue_share_procedures WHERE project_id IS NOT NULL;

-- 14. CEK INTEGRITAS DATA
-- Cek apakah ada orphaned records
SELECT 
    'Orphaned Analysis Results' as issue,
    COUNT(*) as count
FROM analysis_results ar
WHERE ar.project_id IS NOT NULL 
  AND NOT EXISTS (SELECT 1 FROM projects p WHERE p.id = ar.project_id)
UNION ALL
SELECT 
    'Orphaned Form Inputs',
    COUNT(*)
FROM form_inputs fi
WHERE fi.project_id IS NOT NULL 
  AND NOT EXISTS (SELECT 1 FROM projects p WHERE p.id = fi.project_id)
UNION ALL
SELECT 
    'Orphaned Procedures',
    COUNT(*)
FROM revenue_share_procedures rsp
WHERE rsp.project_id IS NOT NULL 
  AND NOT EXISTS (SELECT 1 FROM projects p WHERE p.id = rsp.project_id);

-- ============================================
-- HASIL YANG DIHARAPKAN:
-- ============================================
-- 1. Tabel projects harus punya kolom supplier_share dan analysis_metadata
-- 2. Tabel revenue_share_procedures harus punya kolom project_id, user_id, updated_at
-- 3. Tabel detailed_analysis_results harus ada dengan 30+ kolom
-- 4. Semua foreign keys harus terdefinisi dengan benar
-- 5. Indexes harus ada untuk performa
-- 6. Tidak ada orphaned records
-- ============================================
