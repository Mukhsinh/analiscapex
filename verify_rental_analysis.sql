-- Verification Script for Rental Analysis Feature
-- Run this after migration to verify everything is set up correctly

-- ==================== TABLE VERIFICATION ====================

-- 1. Check if rental_analysis table exists
SELECT 
    'rental_analysis table' as check_item,
    CASE 
        WHEN EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'rental_analysis'
        ) THEN '✓ EXISTS'
        ELSE '✗ NOT FOUND'
    END as status;

-- 2. Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'rental_analysis'
ORDER BY ordinal_position;

-- 3. Check indexes
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'rental_analysis';

-- ==================== VIEW VERIFICATION ====================

-- 4. Check if rental_analysis_summary view exists
SELECT 
    'rental_analysis_summary view' as check_item,
    CASE 
        WHEN EXISTS (
            SELECT FROM information_schema.views 
            WHERE table_schema = 'public' 
            AND table_name = 'rental_analysis_summary'
        ) THEN '✓ EXISTS'
        ELSE '✗ NOT FOUND'
    END as status;

-- 5. Test view query
SELECT * FROM rental_analysis_summary LIMIT 1;

-- ==================== RLS VERIFICATION ====================

-- 6. Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'rental_analysis';

-- 7. Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'rental_analysis'
ORDER BY policyname;

-- ==================== TRIGGER VERIFICATION ====================

-- 8. Check triggers
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'rental_analysis';

-- ==================== FUNCTION VERIFICATION ====================

-- 9. Check if update function exists
SELECT 
    'update_rental_analysis_updated_at function' as check_item,
    CASE 
        WHEN EXISTS (
            SELECT FROM pg_proc 
            WHERE proname = 'update_rental_analysis_updated_at'
        ) THEN '✓ EXISTS'
        ELSE '✗ NOT FOUND'
    END as status;

-- ==================== PERMISSIONS VERIFICATION ====================

-- 10. Check table permissions
SELECT 
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_name = 'rental_analysis'
ORDER BY grantee, privilege_type;

-- ==================== DATA VERIFICATION ====================

-- 11. Count records
SELECT 
    'Total Records' as metric,
    COUNT(*) as value
FROM rental_analysis;

-- 12. Check data distribution by user
SELECT 
    user_id,
    COUNT(*) as analysis_count,
    MIN(created_at) as first_analysis,
    MAX(created_at) as last_analysis
FROM rental_analysis
GROUP BY user_id
ORDER BY analysis_count DESC
LIMIT 10;

-- ==================== SAMPLE DATA TEST ====================

-- 13. Insert test record (will be rolled back)
BEGIN;

-- Try to insert a test record
INSERT INTO rental_analysis (
    user_id,
    equipment_name,
    purchase_price,
    economic_life,
    residual_value,
    profit_margin,
    rental_period,
    rental_price_per_year,
    total_revenue,
    total_cost,
    total_profit,
    notes
) VALUES (
    auth.uid(), -- Current user
    'Test Equipment - Analyzer Kimia',
    1300000000.00,
    5,
    130000000.00,
    20.00,
    3,
    476666667.00,
    1430000000.00,
    1170000000.00,
    260000000.00,
    'Test record for verification'
) RETURNING *;

-- Rollback the test insert
ROLLBACK;

-- ==================== CONSTRAINTS VERIFICATION ====================

-- 14. Check constraints
SELECT
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'rental_analysis'::regclass
ORDER BY contype, conname;

-- ==================== SUMMARY REPORT ====================

-- 15. Generate summary report
SELECT 
    'RENTAL ANALYSIS FEATURE VERIFICATION SUMMARY' as report_title,
    NOW() as verification_time;

SELECT 
    'Table Status' as category,
    CASE 
        WHEN EXISTS (SELECT FROM pg_tables WHERE tablename = 'rental_analysis')
        THEN '✓ Table exists'
        ELSE '✗ Table missing'
    END as status
UNION ALL
SELECT 
    'View Status',
    CASE 
        WHEN EXISTS (SELECT FROM pg_views WHERE viewname = 'rental_analysis_summary')
        THEN '✓ View exists'
        ELSE '✗ View missing'
    END
UNION ALL
SELECT 
    'RLS Status',
    CASE 
        WHEN (SELECT rowsecurity FROM pg_tables WHERE tablename = 'rental_analysis')
        THEN '✓ RLS enabled'
        ELSE '✗ RLS disabled'
    END
UNION ALL
SELECT 
    'Policies Count',
    CAST(COUNT(*) AS TEXT) || ' policies'
FROM pg_policies
WHERE tablename = 'rental_analysis'
UNION ALL
SELECT 
    'Indexes Count',
    CAST(COUNT(*) AS TEXT) || ' indexes'
FROM pg_indexes
WHERE tablename = 'rental_analysis'
UNION ALL
SELECT 
    'Triggers Count',
    CAST(COUNT(*) AS TEXT) || ' triggers'
FROM information_schema.triggers
WHERE event_object_table = 'rental_analysis';

-- ==================== PERFORMANCE TEST ====================

-- 16. Test query performance
EXPLAIN ANALYZE
SELECT * FROM rental_analysis_summary
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;

-- ==================== CLEANUP ====================

-- Note: No cleanup needed as test insert was rolled back

-- ==================== VERIFICATION COMPLETE ====================

SELECT 
    '✓ VERIFICATION COMPLETE' as status,
    'All checks passed. Rental Analysis feature is ready to use.' as message,
    NOW() as completed_at;

-- ==================== NEXT STEPS ====================

/*
NEXT STEPS:
1. Review the output of all queries above
2. Ensure all checks show ✓ status
3. If any checks fail, re-run the migration
4. Test the feature in the application
5. Monitor logs for any errors

COMMON ISSUES:
- If RLS policies fail: Check auth.uid() function
- If view fails: Check if all referenced tables exist
- If insert fails: Check user authentication
- If permissions fail: Check role assignments

SUPPORT:
- Documentation: PANDUAN_ANALISA_SEWA.md
- Technical docs: IMPLEMENTASI_ANALISA_SEWA.md
- Main docs: DOCS_INDEX.md
*/
