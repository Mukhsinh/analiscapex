# 🧪 Testing Database Integration

## Panduan Testing Integrasi Database Supabase

### Prerequisites
- ✅ Database sudah dibuat dan dikonfigurasi
- ✅ Aplikasi sudah running (`npm run dev`)
- ✅ Browser sudah terbuka

## Test Scenarios

### 🔐 Test 1: Login & User Creation

**Objective:** Verify user auto-creation on login

**Steps:**
1. Buka aplikasi di browser
2. Login dengan:
   - Email: `mukhsin9@gmail.com`
   - Password: `Jlamprang233!!`
3. Perhatikan loading indicator
4. Setelah login berhasil, buka Console (F12)

**Expected Results:**
- ✅ Login berhasil tanpa error
- ✅ Redirect ke halaman utama
- ✅ User data tersimpan di localStorage
- ✅ Console tidak ada error

**Verification:**
```javascript
// Di Console browser, jalankan:
console.log(JSON.parse(localStorage.getItem('user')))
// Expected output: { id: "uuid", email: "mukhsin9@gmail.com", fullName: "Mukhsin Hadi" }
```

**Database Verification:**
```sql
-- Di Supabase SQL Editor:
SELECT * FROM users WHERE email = 'mukhsin9@gmail.com';
-- Expected: 1 row dengan data user
```

---

### 📊 Test 2: Save Analysis (Auto-Save)

**Objective:** Verify analysis auto-save to database

**Steps:**
1. Pastikan sudah login
2. Isi form Leasing dengan data:
   - Monthly Payment: 280
   - Period: 60
   - Discount Rate: 10
3. Isi form Purchase dengan data:
   - Loan Amount: 1300
   - Interest Rate: 10
   - Period: 5
   - Maintenance Cost: 20
   - Residual Value: 130
   - Discount Rate: 10
4. Isi form Revenue Sharing (gunakan default)
5. Klik tombol "Hitung & Bandingkan Semua Alternatif"
6. Perhatikan status indicators

**Expected Results:**
- ✅ Loading spinner muncul
- ✅ Perhitungan selesai
- ✅ Hasil ditampilkan
- ✅ Success message: "Analisis berhasil disimpan ke database"
- ✅ Console tidak ada error

**Verification:**
```sql
-- Di Supabase SQL Editor:
SELECT COUNT(*) FROM projects;
-- Expected: 1

SELECT COUNT(*) FROM analysis_results;
-- Expected: 3 (leasing, purchase, revenueShare)

SELECT * FROM analysis_summary ORDER BY created_at DESC LIMIT 3;
-- Expected: 3 rows dengan data analisis
```

---

### 📜 Test 3: View History

**Objective:** Verify history page displays saved analyses

**Steps:**
1. Klik menu "Riwayat Analisis" di sidebar
2. Tunggu loading selesai
3. Perhatikan list analisis yang ditampilkan

**Expected Results:**
- ✅ Loading indicator muncul
- ✅ List analisis ditampilkan (3 items)
- ✅ Setiap item menampilkan:
  - Type badge (Leasing/Purchase/Revenue Sharing)
  - Timestamp
  - Equipment name
  - Hospital name
  - Total PV
- ✅ Console tidak ada error

**Verification:**
- Hitung jumlah card yang ditampilkan (should be 3)
- Check timestamp format (should be readable)
- Check color coding (blue/green/purple)

---

### 👁️ Test 4: View Analysis Details

**Objective:** Verify detail view functionality

**Steps:**
1. Di halaman "Riwayat Analisis"
2. Klik icon mata (eye) pada salah satu analisis
3. Perhatikan detail yang muncul
4. Klik lagi untuk menutup

**Expected Results:**
- ✅ Detail section expand/collapse
- ✅ Input data ditampilkan dalam format JSON
- ✅ Data readable dan formatted
- ✅ Toggle works smoothly

---

### 🗑️ Test 5: Delete Analysis

**Objective:** Verify delete functionality

**Steps:**
1. Di halaman "Riwayat Analisis"
2. Klik icon trash pada salah satu analisis
3. Confirm deletion di dialog
4. Tunggu refresh

**Expected Results:**
- ✅ Confirmation dialog muncul
- ✅ Setelah confirm, item hilang dari list
- ✅ List di-refresh otomatis
- ✅ Console tidak ada error

**Verification:**
```sql
-- Di Supabase SQL Editor:
SELECT COUNT(*) FROM analysis_results;
-- Expected: 2 (berkurang 1)
```

---

### ⚙️ Test 6: Update Project Settings

**Objective:** Verify project update functionality

**Steps:**
1. Klik menu "Pengaturan Proyek"
2. Edit informasi:
   - Hospital Name: "RS Test Hospital"
   - Equipment Name: "Test Equipment"
   - Department: "Test Department"
   - Copyright: "© Test Copyright"
3. Klik "Simpan Perubahan"
4. Perhatikan status

**Expected Results:**
- ✅ Loading indicator muncul
- ✅ Success message: "Pengaturan berhasil disimpan ke database"
- ✅ Data tersimpan
- ✅ Console tidak ada error

**Verification:**
```sql
-- Di Supabase SQL Editor:
SELECT * FROM projects ORDER BY updated_at DESC LIMIT 1;
-- Expected: 1 row dengan data yang baru diupdate
```

---

### 🔄 Test 7: Refresh History

**Objective:** Verify refresh functionality

**Steps:**
1. Di halaman "Riwayat Analisis"
2. Klik tombol "Refresh"
3. Perhatikan loading dan data

**Expected Results:**
- ✅ Loading indicator muncul
- ✅ Data di-reload dari database
- ✅ List updated
- ✅ Console tidak ada error

---

### 🔁 Test 8: Multiple Analyses

**Objective:** Verify multiple analyses can be saved

**Steps:**
1. Kembali ke menu "Analisis Capex"
2. Ubah beberapa nilai input
3. Klik "Hitung & Bandingkan" lagi
4. Ulangi 2-3 kali
5. Check history page

**Expected Results:**
- ✅ Setiap analisis tersimpan
- ✅ History menampilkan semua analisis
- ✅ Sorted by created_at DESC (terbaru di atas)
- ✅ No duplicate entries

**Verification:**
```sql
-- Di Supabase SQL Editor:
SELECT COUNT(*) FROM analysis_results;
-- Expected: 9+ (3 per analisis)

SELECT 
  analysis_type,
  COUNT(*) as count
FROM analysis_results
GROUP BY analysis_type;
-- Expected: Equal counts for each type
```

---

### 🚪 Test 9: Logout & Re-login

**Objective:** Verify data persistence after logout

**Steps:**
1. Klik tombol "Keluar" di sidebar
2. Login kembali
3. Check history page

**Expected Results:**
- ✅ Logout berhasil
- ✅ Redirect ke login page
- ✅ Re-login berhasil
- ✅ History masih menampilkan data sebelumnya
- ✅ Data tidak hilang

---

### 🌐 Test 10: Browser Refresh

**Objective:** Verify data persistence after page refresh

**Steps:**
1. Di halaman "Riwayat Analisis"
2. Tekan F5 atau Ctrl+R untuk refresh
3. Login kembali jika diminta
4. Check history

**Expected Results:**
- ✅ Page reload successfully
- ✅ User tetap login (atau diminta login)
- ✅ History data tetap ada
- ✅ No data loss

---

## Error Testing

### ❌ Test 11: Network Error Simulation

**Objective:** Verify error handling

**Steps:**
1. Buka DevTools (F12)
2. Go to Network tab
3. Set throttling to "Offline"
4. Try to save analysis
5. Observe error message

**Expected Results:**
- ✅ Error message ditampilkan
- ✅ User informed about the issue
- ✅ App doesn't crash
- ✅ Can retry after going online

---

### ❌ Test 12: Invalid Data

**Objective:** Verify validation

**Steps:**
1. Try to save with empty project info
2. Try to save with invalid numbers
3. Observe validation

**Expected Results:**
- ✅ Validation prevents invalid data
- ✅ Error messages shown
- ✅ Database integrity maintained

---

## Performance Testing

### ⚡ Test 13: Load Time

**Objective:** Measure query performance

**Steps:**
1. Open DevTools Network tab
2. Load history page
3. Measure time to load

**Expected Results:**
- ✅ Initial load < 1 second
- ✅ Subsequent loads < 500ms
- ✅ Smooth scrolling
- ✅ No lag

---

### ⚡ Test 14: Large Dataset

**Objective:** Test with many records

**Steps:**
1. Create 20+ analyses
2. Load history page
3. Observe performance

**Expected Results:**
- ✅ Page loads smoothly
- ✅ Scrolling is smooth
- ✅ No memory leaks
- ✅ Pagination works (if implemented)

---

## Database Verification Queries

### Check All Data
```sql
-- Summary of all data
SELECT 
  'Users' as table_name,
  COUNT(*) as count
FROM users
UNION ALL
SELECT 
  'Projects' as table_name,
  COUNT(*) as count
FROM projects
UNION ALL
SELECT 
  'Analysis Results' as table_name,
  COUNT(*) as count
FROM analysis_results;
```

### Check Latest Analysis
```sql
-- Latest analysis with details
SELECT 
  ar.id,
  ar.analysis_type,
  ar.created_at,
  p.hospital_name,
  p.equipment_name,
  u.email,
  ar.results->>'totalPV' as total_pv
FROM analysis_results ar
JOIN projects p ON ar.project_id = p.id
JOIN users u ON ar.user_id = u.id
ORDER BY ar.created_at DESC
LIMIT 5;
```

### Check Data Integrity
```sql
-- Check for orphaned records
SELECT 
  'Orphaned Projects' as issue,
  COUNT(*) as count
FROM projects
WHERE user_id NOT IN (SELECT id FROM users)
UNION ALL
SELECT 
  'Orphaned Analyses' as issue,
  COUNT(*) as count
FROM analysis_results
WHERE user_id NOT IN (SELECT id FROM users)
   OR project_id NOT IN (SELECT id FROM projects);
-- Expected: 0 for all
```

---

## Test Results Template

### Test Execution Log

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Login & User Creation | ⏳ | |
| 2 | Save Analysis | ⏳ | |
| 3 | View History | ⏳ | |
| 4 | View Details | ⏳ | |
| 5 | Delete Analysis | ⏳ | |
| 6 | Update Settings | ⏳ | |
| 7 | Refresh History | ⏳ | |
| 8 | Multiple Analyses | ⏳ | |
| 9 | Logout & Re-login | ⏳ | |
| 10 | Browser Refresh | ⏳ | |
| 11 | Network Error | ⏳ | |
| 12 | Invalid Data | ⏳ | |
| 13 | Load Time | ⏳ | |
| 14 | Large Dataset | ⏳ | |

**Legend:**
- ⏳ Not Tested
- ✅ Passed
- ❌ Failed
- ⚠️ Partial

---

## Troubleshooting

### Issue: "Failed to save to database"
**Solution:**
1. Check browser console for errors
2. Verify Supabase connection in `src/lib/supabase.js`
3. Check network tab for failed requests
4. Verify user is logged in and has ID

### Issue: "History page shows no data"
**Solution:**
1. Verify analyses were saved (check console)
2. Check database directly with SQL query
3. Verify user ID matches
4. Try refresh button

### Issue: "Delete doesn't work"
**Solution:**
1. Check console for errors
2. Verify foreign key constraints
3. Check RLS policies (should be disabled)
4. Try manual delete in SQL editor

---

## Success Criteria

**All tests should pass with:**
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Data persistence
- ✅ Proper error handling
- ✅ Fast load times
- ✅ Data integrity maintained

**If all tests pass, integration is SUCCESSFUL! 🎉**

---

**Testing Date:** _____________
**Tested By:** _____________
**Overall Result:** ⏳ Pending / ✅ Passed / ❌ Failed
