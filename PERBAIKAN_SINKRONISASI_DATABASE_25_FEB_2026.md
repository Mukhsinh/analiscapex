# Perbaikan Sinkronisasi Database - 25 Februari 2026

## Masalah yang Ditemukan

### 1. **saveCompleteAnalysis Selalu Membuat Project Baru**
- **Masalah**: Fungsi `saveCompleteAnalysis()` selalu melakukan INSERT project baru, tidak menggunakan `currentProjectId` yang sudah ada
- **Dampak**: Setiap kali user klik "Hitung & Bandingkan", project baru dibuat di database, menyebabkan duplikasi data
- **Lokasi**: `src/lib/database.js` - fungsi `saveCompleteAnalysis()`

### 2. **Tidak Ada Sinkronisasi ProjectSettings dengan handleCalculate**
- **Masalah**: ProjectSettings dan handleCalculate bekerja independen, tidak saling update
- **Dampak**: Data yang disimpan di ProjectSettings tidak ter-update saat Calculate, dan sebaliknya
- **Lokasi**: `src/components/ProjectSettings.jsx` dan `src/App.jsx`

### 3. **localStorage vs Database Mismatch**
- **Masalah**: Data di localStorage bisa berbeda dengan database, tidak ada mekanisme cache invalidation
- **Dampak**: User bisa melihat data lama dari localStorage padahal database sudah ter-update
- **Lokasi**: Multiple files - `src/App.jsx`, `src/components/ProjectSettings.jsx`

### 4. **AnalysisHistory Tidak Auto-Refresh**
- **Masalah**: Setelah save analysis, history tidak otomatis refresh
- **Dampak**: User harus manual refresh halaman untuk melihat data baru
- **Lokasi**: `src/components/AnalysisHistory.jsx`

### 5. **Race Condition pada Load Data**
- **Masalah**: Multiple async operations bisa menyebabkan data tidak konsisten
- **Dampak**: Data bisa ter-overwrite dengan data lama jika callback return tidak berurutan
- **Lokasi**: `src/App.jsx` - useEffect untuk load data

## Perbaikan yang Dilakukan

### 1. **Update saveCompleteAnalysis untuk Support Existing Project**

**File**: `src/lib/database.js`

```javascript
export async function saveCompleteAnalysis(userId, projectInfo, analysisData, results, existingProjectId = null) {
  // ... validation code ...
  
  let project = null

  // Use existing project or create new
  if (existingProjectId) {
    console.log('Using existing project ID:', existingProjectId)
    
    // Update existing project
    const { data: updatedProject, error: updateError } = await supabase
      .from('projects')
      .update({
        hospital_name: projectInfo.hospitalName,
        equipment_name: projectInfo.equipmentName,
        department: projectInfo.department,
        copyright: projectInfo.copyright || '© Copyright Mukhsin Hadi',
        supplier_share: analysisData.revenueShare?.supplierShare || 85
      })
      .eq('id', existingProjectId)
      .eq('user_id', userId)
      .select()
      .single()
    
    project = updatedProject
  } else {
    // Create new project
    // ... create code ...
  }
  
  // ... rest of save logic ...
}
```

**Perubahan**:
- Tambah parameter `existingProjectId` (optional)
- Jika `existingProjectId` ada, lakukan UPDATE bukan INSERT
- Jika tidak ada, baru buat project baru

### 2. **Pass currentProjectId ke saveCompleteAnalysis**

**File**: `src/App.jsx`

```javascript
const { data, error } = await saveCompleteAnalysis(
  user.id,
  projectInfo,
  analysisData,
  calculatedResults,
  currentProjectId // Pass existing project ID
)
```

**Perubahan**:
- Pass `currentProjectId` sebagai parameter ke-5
- Ini memastikan project yang sama di-update, bukan dibuat baru

### 3. **Update currentProjectId Setelah Save**

**File**: `src/App.jsx`

```javascript
if (data && data.project) {
  console.log('Successfully saved! Project ID:', data.project.id)
  setCurrentProjectId(data.project.id)
  localStorage.setItem('currentProjectId', data.project.id)
  setSaveStatus('saved')
  
  // Trigger refresh event for AnalysisHistory component
  window.dispatchEvent(new Event('refreshAnalysisHistory'))
  
  setTimeout(() => setSaveStatus(null), 3000)
}
```

**Perubahan**:
- Update `currentProjectId` setelah save berhasil
- Dispatch event `refreshAnalysisHistory` untuk trigger refresh di AnalysisHistory
- Simpan ke localStorage untuk persistence

### 4. **Improve ProjectSettings Data Loading**

**File**: `src/components/ProjectSettings.jsx`

```javascript
useEffect(() => {
  const loadProjectData = async () => {
    if (user && user.id && currentProjectId) {
      // ... load from database ...
      
      if (data) {
        const loadedInfo = {
          hospitalName: data.hospital_name,
          equipmentName: data.equipment_name,
          department: data.department,
          copyright: data.copyright
        }
        
        // Only update if data is different to avoid unnecessary re-renders
        const currentInfo = JSON.stringify(localInfo)
        const newInfo = JSON.stringify(loadedInfo)
        
        if (currentInfo !== newInfo) {
          console.log('Project data changed, updating state')
          setLocalInfo(loadedInfo)
          setProjectInfo(loadedInfo)
          localStorage.setItem('projectInfo', JSON.stringify(loadedInfo))
        } else {
          console.log('Project data unchanged, skipping update')
        }
      }
    }
  }

  loadProjectData()
}, [currentProjectId, user?.id])
```

**Perubahan**:
- Tambah check untuk hanya update jika data berbeda
- Ini mencegah unnecessary re-renders dan infinite loops
- Log untuk debugging

### 5. **Add Auto-Refresh untuk AnalysisHistory**

**File**: `src/components/AnalysisHistory.jsx`

```javascript
// Add event listener for custom refresh event
useEffect(() => {
  const handleRefresh = () => {
    console.log('Received refresh event, reloading analyses...')
    loadAnalyses()
  }

  window.addEventListener('refreshAnalysisHistory', handleRefresh)
  
  return () => {
    window.removeEventListener('refreshAnalysisHistory', handleRefresh)
  }
}, [user])
```

**Perubahan**:
- Tambah event listener untuk `refreshAnalysisHistory` event
- Saat event diterima, reload analyses dari database
- Cleanup listener saat component unmount

### 6. **Improve Data Loading dari Database**

**File**: `src/App.jsx`

```javascript
useEffect(() => {
  let isMounted = true
  
  const loadDataFromDatabase = async () => {
    if (user && user.id) {
      // ... load logic ...
      
      // Only update if different to prevent unnecessary re-renders
      if (JSON.stringify(projectInfo) !== JSON.stringify(loadedProjectInfo)) {
        setProjectInfo(loadedProjectInfo)
        localStorage.setItem('projectInfo', JSON.stringify(loadedProjectInfo))
      }
      
      if (inputsByType.leasing && JSON.stringify(leasingData) !== JSON.stringify(inputsByType.leasing)) {
        setLeasingData(inputsByType.leasing)
      }
      // ... similar for purchase and revenueShare ...
    }
  }

  loadDataFromDatabase()
  
  return () => {
    isMounted = false
  }
}, [user?.id])
```

**Perubahan**:
- Tambah check untuk hanya update state jika data berbeda
- Ini mencegah infinite loops dan unnecessary re-renders
- Gunakan `isMounted` flag untuk cleanup

## Alur Data Setelah Perbaikan

### 1. **User Login**
```
Login → getOrCreateUser() → localStorage + state
→ Load project dari database (jika ada)
→ Load form inputs dari database (jika ada)
→ Update state dengan data database
```

### 2. **User Edit Project Settings**
```
ProjectSettings form → localInfo state
→ User klik Save → handleSave()
→ If currentProjectId: updateProject()
→ Else: createProject()
→ Update parent state + localStorage
→ setCurrentProjectId()
```

### 3. **User Input Form Data**
```
Form input → setData() → state update
→ Auto-save to localStorage (immediate)
→ No database save (wait for Calculate)
```

### 4. **User Calculate & Save**
```
Calculate button → handleCalculate()
→ Calculate results
→ saveCompleteAnalysis(userId, projectInfo, analysisData, results, currentProjectId)
→ If currentProjectId: UPDATE project
→ Else: INSERT project
→ INSERT/UPDATE form_inputs
→ INSERT analysis_results
→ INSERT detailed_analysis_results
→ INSERT recommendations
→ INSERT procedures
→ setCurrentProjectId(project.id)
→ Dispatch refreshAnalysisHistory event
→ AnalysisHistory auto-refresh
```

### 5. **User View History**
```
AnalysisHistory mount → loadAnalyses()
→ getUserAnalyses() → fetch from database
→ Display in table
→ Listen for refreshAnalysisHistory event
→ Auto-reload when event received
```

## Testing Checklist

### Test 1: Create New Project
- [ ] Login dengan user baru
- [ ] Edit project settings
- [ ] Klik Save
- [ ] Verify: Project tersimpan di database
- [ ] Verify: currentProjectId ter-set
- [ ] Verify: localStorage ter-update

### Test 2: Update Existing Project
- [ ] Login dengan user yang sudah punya project
- [ ] Edit project settings
- [ ] Klik Save
- [ ] Verify: Project ter-update (bukan create new)
- [ ] Verify: Data di database match dengan form
- [ ] Verify: Tidak ada duplicate project

### Test 3: Calculate & Save Analysis
- [ ] Input data di form Leasing, Purchase, Revenue Share
- [ ] Klik "Hitung & Bandingkan"
- [ ] Verify: Results ditampilkan
- [ ] Verify: Data tersimpan ke database
- [ ] Verify: Project ter-update (bukan create new)
- [ ] Verify: Analysis history ter-update otomatis

### Test 4: Load Data After Refresh
- [ ] Login dan input data
- [ ] Calculate & save
- [ ] Refresh halaman
- [ ] Verify: Data ter-load dari database
- [ ] Verify: Form inputs match dengan database
- [ ] Verify: Project info match dengan database

### Test 5: Multi-Device Sync
- [ ] Login di device A
- [ ] Edit project settings
- [ ] Save
- [ ] Login di device B dengan user yang sama
- [ ] Verify: Data ter-load dari database (bukan localStorage)
- [ ] Verify: Project info match dengan device A

### Test 6: Analysis History Auto-Refresh
- [ ] Buka halaman Riwayat Analisis
- [ ] Switch ke halaman Analisis Capex
- [ ] Calculate & save
- [ ] Switch kembali ke Riwayat Analisis
- [ ] Verify: History ter-update otomatis (tanpa manual refresh)

## Masalah yang Masih Perlu Diperbaiki (Future Work)

### 1. **Transaction Support**
- Saat ini saveCompleteAnalysis menyimpan ke multiple tables tanpa transaction
- Jika salah satu INSERT gagal, data bisa partial
- **Solusi**: Implement database transaction atau rollback logic

### 2. **Optimistic Updates**
- UI menunggu response dari database sebelum update
- Jika network lambat, UX jelek
- **Solusi**: Implement optimistic updates dengan rollback on error

### 3. **Real-time Sync**
- Tidak ada real-time sync antar devices
- User harus refresh untuk lihat perubahan dari device lain
- **Solusi**: Implement Supabase Realtime subscriptions

### 4. **Conflict Resolution**
- Jika user edit di 2 device bersamaan, last-write-wins
- Tidak ada conflict detection
- **Solusi**: Implement version control atau timestamp check

### 5. **Form Input Auto-Save**
- Form inputs hanya save ke localStorage, tidak ke database
- Jika user close browser sebelum Calculate, data hilang
- **Solusi**: Implement auto-save ke database dengan debounce

## Kesimpulan

Perbaikan ini mengatasi masalah utama ketidaksinkronan antara frontend dan database:

1. ✅ Project tidak lagi duplicate setiap kali Calculate
2. ✅ Data ter-update dengan benar (UPDATE bukan INSERT)
3. ✅ AnalysisHistory auto-refresh setelah save
4. ✅ Data loading dari database lebih robust
5. ✅ Prevent unnecessary re-renders dan infinite loops

Aplikasi sekarang memiliki integrasi database yang lebih solid dan data tetap sinkron antara UI dan database.
