# 🚀 Quick Test Guide - Verifikasi Integrasi Database

## ⚡ Testing Cepat (5 Menit)

### 1. Jalankan Script Testing
```powershell
.\test_database_integration.ps1
```

### 2. Test di Browser
File `test_complete_analysis_save.html` akan otomatis terbuka.

**Klik tombol**:
- 🚀 **Test Full Flow** - Test kalkulasi dan penyimpanan lengkap
- 📊 **Check Existing Data** - Cek data yang sudah tersimpan

**Lihat hasil**:
- ✅ Hijau = Berhasil
- ❌ Merah = Error
- ⚠️ Kuning = Warning

### 3. Test di Aplikasi
```powershell
npm run dev
```

Buka: http://localhost:5173

**Langkah cepat**:
1. Login (mukhsin9@gmail.com)
2. Isi ketiga form (Leasing, Purchase, Revenue Share)
3. Klik "Hitung & Bandingkan"
4. Cek hasil muncul
5. Buka "Riwayat Analisis"
6. Verifikasi data tersimpan

---

## 📋 Checklist Cepat

### Input Form
- [ ] Leasing form terisi dan tersimpan
- [ ] Purchase form terisi dan tersimpan
- [ ] Revenue Share form terisi (min 3 prosedur)
- [ ] Refresh halaman - data masih ada

### Kalkulasi
- [ ] Klik "Hitung & Bandingkan"
- [ ] Hasil muncul (tabel + grafik)
- [ ] Notifikasi "berhasil disimpan" muncul
- [ ] Console log tidak ada error

### Riwayat
- [ ] Menu "Riwayat Analisis" menampilkan data
- [ ] Detail analisis bisa dibuka
- [ ] Tombol refresh berfungsi

### Database
- [ ] Login ke Supabase Dashboard
- [ ] Tabel `analysis_results` ada data
- [ ] Tabel `detailed_analysis_results` ada data
- [ ] Tabel `analysis_recommendations` ada data

---

## 🔍 Cek Status Cepat

### Cek Console Log (F12)
**Yang Baik**:
```
✓ Project updated successfully
✓ leasing form saved
✓ purchase form saved
✓ revenueShare form saved
✓ leasing analysis saved
✓ purchase analysis saved
✓ revenueShare analysis saved
✓ Detailed analysis saved
✓ Recommendation saved
✅ All data saved successfully!
```

**Yang Bermasalah**:
```
✗ Error saving...
❌ Exception in saveCompleteAnalysis...
```

### Cek Network Tab (F12)
**Yang Baik**:
- Request ke Supabase: Status 200/201
- Response body berisi data

**Yang Bermasalah**:
- Status 400/401/403/500
- Error message di response

---

## 🎯 Expected Results

### Setelah Kalkulasi
1. ✅ Hasil muncul di UI (tabel perbandingan)
2. ✅ Grafik ditampilkan
3. ✅ Rekomendasi muncul
4. ✅ Notifikasi hijau "berhasil disimpan"
5. ✅ Console log menunjukkan sukses

### Setelah Refresh
1. ✅ Data form masih ada
2. ✅ Project settings masih ada
3. ✅ Hasil kalkulasi bisa dilihat di Riwayat

### Di Database
1. ✅ `analysis_results`: 3 records (leasing, purchase, revenueShare)
2. ✅ `analysis_yearly_breakdown`: 15+ records (5 tahun × 3 tipe)
3. ✅ `detailed_analysis_results`: 1 record
4. ✅ `analysis_recommendations`: 1 record

---

## 🔧 Quick Fix

### Data Tidak Tersimpan?
1. Cek console log untuk error
2. Verifikasi user sudah login
3. Cek koneksi internet
4. Refresh halaman (Ctrl+F5)

### Data Tidak Muncul?
1. Hard refresh (Ctrl+F5)
2. Clear browser cache
3. Cek Supabase Dashboard
4. Verifikasi user_id match

### Error Saat Kalkulasi?
1. Pastikan semua field terisi
2. Cek format angka (tidak ada huruf)
3. Minimal 1 prosedur di Revenue Share
4. Cek console log untuk detail error

---

## 📞 Need Help?

### Dokumentasi Lengkap
- **RINGKASAN_VERIFIKASI_INTEGRASI.md** - Overview lengkap
- **CHECKLIST_VERIFIKASI_INTEGRASI_LENGKAP.md** - Testing detail
- **LAPORAN_VERIFIKASI_DATABASE_02_MAR_2026.md** - Analisis teknis

### Tools Testing
- **test_complete_analysis_save.html** - Test isolated
- **test_database_integration.ps1** - Script otomatis

### Database
- **Supabase Dashboard**: https://supabase.com
- **Table Editor**: Lihat data langsung
- **SQL Editor**: Run query manual

---

## ✅ Success Indicators

Jika semua ini ✅, maka integrasi BERHASIL:

1. ✅ Form input tersimpan dan dimuat kembali
2. ✅ Kalkulasi menghasilkan output yang benar
3. ✅ Hasil tersimpan ke database
4. ✅ Riwayat analisis menampilkan data
5. ✅ Refresh halaman tidak menghilangkan data
6. ✅ Database berisi semua data yang diperlukan
7. ✅ Console log tidak ada error
8. ✅ Network requests sukses (200/201)

---

*Quick Test Guide - 2 Maret 2026*
*Untuk verifikasi cepat integrasi database & frontend*
