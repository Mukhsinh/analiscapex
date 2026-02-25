-- ============================================
-- CAPEX Analysis - Database Verification Script
-- ============================================
-- Run this in Supabase SQL Editor to verify database setup

-- 1. CHECK DATABASE STRUCTURE
-- ============================================

SELECT '=== DATABASE STRUCTURE ===' as section;

-- Count tables
SELECT 
  'Tables' as type,
  COUNT(*) as count,
  '3 expected' as expected
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- Count indexes
SELECT 
  'Indexes' as type,
  COUNT(*) as count,
  '9 expected' as expected
FROM pg_indexes 
WHERE schemaname = 'public';

-- Count triggers
SELECT 
  'Triggers' as type,
  COUNT(*) as count,
  '2 expected' as expected
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Count views
SELECT 
  'Views' as type,
  COUNT(*) as count,
  '1 expected' as expected
FROM information_schema.views 
WHERE table_schema = 'public';

-- 2. CHECK TABLE STRUCTURES
-- ============================================

SELECT '=== TABLE STRUCTURES ===' as section;

-- Users table
SELECT 
  'users' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

-- Projects table
SELECT 
  'projects' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'projects'
ORDER BY ordinal_position;

-- Analysis results table
SELECT 
  'analysis_results' as table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'analysis_results'
ORDER BY ordinal_position;

-- 3. CHECK FOREIGN KEYS
-- ============================================

SELECT '=== FOREIGN KEY CONSTRAINTS ===' as section;

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
ORDER BY tc.table_name;

-- 4. CHECK INDEXES
-- ============================================

SELECT '=== INDEXES ===' as section;

SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 5. CHECK TRIGGERS
-- ============================================

SELECT '=== TRIGGERS ===' as section;

SELECT
  trigger_schema,
  trigger_name,
  event_object_table,
  action_timing,
  event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 6. CHECK DATA COUNTS
-- ============================================

SELECT '=== DATA COUNTS ===' as section;

SELECT 
  (SELECT COUNT(*) FROM users) as users_count,
  (SELECT COUNT(*) FROM projects) as projects_count,
  (SELECT COUNT(*) FROM analysis_results) as analysis_results_count;

-- 7. CHECK USERS
-- ============================================

SELECT '=== USERS ===' as section;

SELECT 
  id,
  email,
  full_name,
  created_at,
  updated_at
FROM users
ORDER BY created_at DESC;

-- 8. CHECK PROJECTS
-- ============================================

SELECT '=== PROJECTS ===' as section;

SELECT 
  p.id,
  p.hospital_name,
  p.equipment_name,
  p.department,
  p.copyright,
  u.email as user_email,
  p.created_at,
  p.updated_at
FROM projects p
LEFT JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;

-- 9. CHECK ANALYSIS RESULTS
-- ============================================

SELECT '=== ANALYSIS RESULTS ===' as section;

SELECT 
  ar.id,
  ar.analysis_type,
  p.equipment_name,
  u.email as user_email,
  ar.created_at
FROM analysis_results ar
LEFT JOIN projects p ON ar.project_id = p.id
LEFT JOIN users u ON ar.user_id = u.id
ORDER BY ar.created_at DESC;

-- 10. CHECK ANALYSIS SUMMARY VIEW
-- ============================================

SELECT '=== ANALYSIS SUMMARY VIEW ===' as section;

SELECT * FROM analysis_summary
ORDER BY created_at DESC
LIMIT 10;

-- 11. CHECK DATA INTEGRITY
-- ============================================

SELECT '=== DATA INTEGRITY CHECKS ===' as section;

-- Check for orphaned projects
SELECT 
  'Orphaned Projects' as check_name,
  COUNT(*) as count,
  CASE WHEN COUNT(*) = 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM projects
WHERE user_id NOT IN (SELECT id FROM users);

-- Check for orphaned analyses (user)
SELECT 
  'Orphaned Analyses (User)' as check_name,
  COUNT(*) as count,
  CASE WHEN COUNT(*) = 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM analysis_results
WHERE user_id NOT IN (SELECT id FROM users);

-- Check for orphaned analyses (project)
SELECT 
  'Orphaned Analyses (Project)' as check_name,
  COUNT(*) as count,
  CASE WHEN COUNT(*) = 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM analysis_results
WHERE project_id NOT IN (SELECT id FROM projects);

-- 12. CHECK RLS STATUS
-- ============================================

SELECT '=== ROW LEVEL SECURITY STATUS ===' as section;

SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 13. SAMPLE QUERIES
-- ============================================

SELECT '=== SAMPLE QUERIES ===' as section;

-- Get user with their project count
SELECT 
  u.email,
  u.full_name,
  COUNT(DISTINCT p.id) as project_count,
  COUNT(ar.id) as analysis_count
FROM users u
LEFT JOIN projects p ON u.id = p.user_id
LEFT JOIN analysis_results ar ON u.id = ar.user_id
GROUP BY u.id, u.email, u.full_name;

-- Get analysis by type
SELECT 
  analysis_type,
  COUNT(*) as count
FROM analysis_results
GROUP BY analysis_type
ORDER BY analysis_type;

-- Get latest analyses per user
SELECT 
  u.email,
  COUNT(ar.id) as total_analyses,
  MAX(ar.created_at) as last_analysis_date
FROM users u
LEFT JOIN analysis_results ar ON u.id = ar.user_id
GROUP BY u.id, u.email
ORDER BY last_analysis_date DESC;

-- 14. PERFORMANCE CHECKS
-- ============================================

SELECT '=== PERFORMANCE CHECKS ===' as section;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage (will show 0 for new database)
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan as times_used,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- 15. FINAL SUMMARY
-- ============================================

SELECT '=== FINAL SUMMARY ===' as section;

SELECT 
  'Database Setup' as check_item,
  CASE 
    WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') = 3
    THEN '✅ COMPLETE'
    ELSE '❌ INCOMPLETE'
  END as status;

SELECT 
  'Indexes Created' as check_item,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public') >= 9
    THEN '✅ COMPLETE'
    ELSE '❌ INCOMPLETE'
  END as status;

SELECT 
  'Triggers Created' as check_item,
  CASE 
    WHEN (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public') = 2
    THEN '✅ COMPLETE'
    ELSE '❌ INCOMPLETE'
  END as status;

SELECT 
  'Foreign Keys' as check_item,
  CASE 
    WHEN (SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND table_schema = 'public') >= 3
    THEN '✅ COMPLETE'
    ELSE '❌ INCOMPLETE'
  END as status;

SELECT 
  'Data Integrity' as check_item,
  CASE 
    WHEN (
      SELECT COUNT(*) FROM projects WHERE user_id NOT IN (SELECT id FROM users)
    ) = 0
    AND (
      SELECT COUNT(*) FROM analysis_results WHERE user_id NOT IN (SELECT id FROM users) OR project_id NOT IN (SELECT id FROM projects)
    ) = 0
    THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status;

-- ============================================
-- END OF VERIFICATION SCRIPT
-- ============================================

SELECT '=== VERIFICATION COMPLETE ===' as section;
SELECT 'If all checks show ✅, database is ready!' as message;
