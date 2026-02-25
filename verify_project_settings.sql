-- Verifikasi Project Settings - 25 Februari 2026
-- Query untuk memverifikasi data project tersimpan dengan benar

-- 1. Cek semua project terbaru
SELECT 
  id,
  user_id,
  hospital_name,
  equipment_name,
  department,
  copyright,
  supplier_share,
  created_at,
  updated_at
FROM projects
ORDER BY updated_at DESC
LIMIT 10;

-- 2. Cek project untuk user tertentu (ganti dengan user_id Anda)
-- SELECT 
--   id,
--   hospital_name,
--   equipment_name,
--   department,
--   copyright,
--   created_at,
--   updated_at
-- FROM projects
-- WHERE user_id = 'YOUR_USER_ID_HERE'
-- ORDER BY updated_at DESC;

-- 3. Cek apakah ada project yang baru diupdate (dalam 5 menit terakhir)
SELECT 
  id,
  user_id,
  hospital_name,
  equipment_name,
  department,
  updated_at,
  EXTRACT(EPOCH FROM (NOW() - updated_at)) / 60 as minutes_ago
FROM projects
WHERE updated_at > NOW() - INTERVAL '5 minutes'
ORDER BY updated_at DESC;

-- 4. Cek jumlah project per user
SELECT 
  user_id,
  users.email,
  users.full_name,
  COUNT(*) as total_projects,
  MAX(projects.updated_at) as last_updated
FROM projects
JOIN users ON projects.user_id = users.id
GROUP BY user_id, users.email, users.full_name
ORDER BY last_updated DESC;

-- 5. Cek project dengan form inputs terkait
SELECT 
  p.id as project_id,
  p.hospital_name,
  p.equipment_name,
  p.updated_at as project_updated,
  COUNT(fi.id) as form_inputs_count,
  MAX(fi.updated_at) as last_form_input_update
FROM projects p
LEFT JOIN form_inputs fi ON p.id = fi.project_id
GROUP BY p.id, p.hospital_name, p.equipment_name, p.updated_at
ORDER BY p.updated_at DESC
LIMIT 10;

-- 6. Cek detail project dengan semua data terkait
-- SELECT 
--   p.id,
--   p.hospital_name,
--   p.equipment_name,
--   p.department,
--   p.copyright,
--   p.created_at,
--   p.updated_at,
--   u.email as user_email,
--   u.full_name as user_name,
--   COUNT(DISTINCT ar.id) as analysis_count,
--   COUNT(DISTINCT fi.id) as form_input_count
-- FROM projects p
-- JOIN users u ON p.user_id = u.id
-- LEFT JOIN analysis_results ar ON p.id = ar.project_id
-- LEFT JOIN form_inputs fi ON p.id = fi.project_id
-- WHERE p.id = 'YOUR_PROJECT_ID_HERE'
-- GROUP BY p.id, p.hospital_name, p.equipment_name, p.department, p.copyright, 
--          p.created_at, p.updated_at, u.email, u.full_name;

-- 7. Cek apakah ada duplikasi project untuk user yang sama
SELECT 
  user_id,
  hospital_name,
  equipment_name,
  COUNT(*) as duplicate_count
FROM projects
GROUP BY user_id, hospital_name, equipment_name
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 8. Cek project yang tidak memiliki analysis atau form inputs (orphaned projects)
SELECT 
  p.id,
  p.hospital_name,
  p.equipment_name,
  p.created_at,
  p.updated_at,
  CASE 
    WHEN ar.id IS NULL AND fi.id IS NULL THEN 'No data'
    WHEN ar.id IS NULL THEN 'No analysis'
    WHEN fi.id IS NULL THEN 'No form inputs'
    ELSE 'Has data'
  END as status
FROM projects p
LEFT JOIN analysis_results ar ON p.id = ar.project_id
LEFT JOIN form_inputs fi ON p.id = fi.project_id
WHERE ar.id IS NULL OR fi.id IS NULL
ORDER BY p.updated_at DESC
LIMIT 10;
