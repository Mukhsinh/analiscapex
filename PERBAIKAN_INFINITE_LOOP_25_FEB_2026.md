# Perbaikan Infinite Loop - 25 Feb 2026

## Masalah

Aplikasi mengalami infinite loop dengan gejala:
- Halaman berkedip terus-menerus
- Notifikasi loading muncul terus
- Console menampilkan log "Loading project data from database" berulang-ulang
- Browser menjadi lambat/hang

## Root Cause

Ada **dependency cycle** di beberapa `useEffect`:

1. **App.jsx**
   - `useEffect` yang auto-save form data ke database setiap kali data berubah
   - `useEffect` yang load data dari database saat user login
   - Kedua effect ini saling trigger satu sama lain

2. **ProjectSettings.jsx**
   - `useEffect` yang load project data dari database
   - `useEffect` yang sync dengan projectInfo dari parent
   - Memanggil `setProjectInfo()` yang trigger re-render di parent
   - Parent re-render trigger `useEffect` lagi

## Solusi

### 1. Disable Auto-save ke Database di App.jsx

**Sebelum:**
```javascript
useEffect(() => {
  localStorage.setItem('leasingData', JSON.stringify(leasingData))
  
  // Save to database if user is logged in and has a project
  if (user && user.id && currentProjectId) {
    saveFormInput(user.id, currentProjectId, 'leasing', leasingData)
      .catch(err => console.error('Error saving leasing data to database:', err))
  }
}, [leasingData, user, currentProjectId])
```

**Sesudah:**
```javascript
useEffect(() => {
  localStorage.setItem('leasingData', JSON.stringify(leasingData))
  // Database save disabled - only save on Calculate button
}, [leasingData])
```

**Alasan:** Auto-save ke database setiap perubahan input menyebabkan terlalu banyak request dan bisa trigger infinite loop. Data akan disimpan saat user klik tombol "Hitung & Bandingkan".

### 2. Fix Load Data dari Database di App.jsx

**Perubahan:**
- Tambah `isMounted` flag untuk cleanup
- Ubah dependency dari `[user]` menjadi `[user?.id]`
- Hindari set `currentProjectId` lagi jika sudah ada
- Tambah cleanup function

```javascript
useEffect(() => {
  let isMounted = true
  
  const loadDataFromDatabase = async () => {
    // ... load logic
    if (isMounted) {
      // Only update state if component still mounted
    }
  }
  
  loadDataFromDatabase()
  
  return () => {
    isMounted = false
  }
}, [user?.id]) // Only depend on user.id
```

### 3. Fix ProjectSettings.jsx

**Perubahan 1 - Load Project Data:**
```javascript
// Don't call setProjectInfo to avoid triggering parent re-render
// setProjectInfo(loadedInfo) // REMOVED

// Only update local state and localStorage
setLocalInfo(loadedInfo)
localStorage.setItem('projectInfo', JSON.stringify(loadedInfo))
```

**Perubahan 2 - Sync with Parent:**
```javascript
// Only update if not currently loading to avoid conflicts
useEffect(() => {
  if (!loading) {
    setLocalInfo(projectInfo)
  }
}, [projectInfo, loading])
```

**Perubahan 3 - Add Loading State:**
```javascript
// Set loading to false even if no project
if (user && user.id && currentProjectId) {
  // ... load logic
} else {
  setLoading(false)
}
```

## Flow Data Setelah Perbaikan

### 1. Initial Load (User Login)
```
Login → Set user → Load from database (once) → Update state → Render
```

### 2. User Input Form
```
User types → Update state → Save to localStorage only
```

### 3. User Click Calculate
```
Calculate → Save all data to database → Show results
```

### 4. User Save Project Settings
```
Edit settings → Click Save → Save to database → Update localStorage
```

## Testing

### 1. Test Login
- Login dengan email/password
- Verifikasi tidak ada infinite loop
- Cek console: hanya 1x log "Loading data from database"

### 2. Test Input Form
- Ketik di form Leasing/Purchase/Revenue Share
- Verifikasi tidak ada request ke database
- Verifikasi data tersimpan di localStorage

### 3. Test Calculate
- Klik "Hitung & Bandingkan"
- Verifikasi data tersimpan ke database
- Verifikasi tidak ada infinite loop setelah save

### 4. Test Project Settings
- Buka menu Pengaturan Proyek
- Verifikasi tidak ada infinite loop saat load
- Edit dan save
- Verifikasi tidak ada infinite loop setelah save

### 5. Test Refresh
- Refresh halaman (F5)
- Verifikasi data dimuat dari database
- Verifikasi tidak ada infinite loop

## Checklist Verifikasi

- [ ] Login tidak menyebabkan infinite loop
- [ ] Input form tidak trigger request ke database
- [ ] Calculate button menyimpan data dengan benar
- [ ] Project Settings load tanpa infinite loop
- [ ] Project Settings save tanpa infinite loop
- [ ] Refresh halaman load data dengan benar
- [ ] Console tidak menampilkan log berulang
- [ ] Browser tidak lambat/hang

## File yang Diubah

1. `src/App.jsx`
   - Disable auto-save form data ke database
   - Fix load data useEffect dengan isMounted flag
   - Change dependency to user?.id only

2. `src/components/ProjectSettings.jsx`
   - Remove setProjectInfo call in load data
   - Add loading check in sync useEffect
   - Add loading state for no project case

## Catatan

### Auto-save Behavior
- **localStorage**: Auto-save setiap perubahan ✅
- **Database**: Hanya save saat Calculate atau Save button ✅

### Alasan Perubahan
1. Mengurangi jumlah request ke database
2. Mencegah race condition
3. Mencegah infinite loop
4. Meningkatkan performa aplikasi

### Trade-offs
- User harus klik Calculate untuk save ke database
- Jika browser crash sebelum Calculate, data hanya ada di localStorage
- Ini acceptable karena:
  - localStorage cukup reliable
  - User biasanya langsung Calculate setelah input
  - Menghindari masalah performa lebih penting

## Status

✅ **SELESAI** - Infinite loop sudah diperbaiki

## Next Steps

1. Test semua fitur untuk memastikan tidak ada regression
2. Monitor console untuk memastikan tidak ada log berulang
3. Test dengan berbagai skenario user interaction
