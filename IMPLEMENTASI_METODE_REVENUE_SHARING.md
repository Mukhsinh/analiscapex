# Implementasi Metode Flat Fee Revenue Sharing

## Status
❌ **BELUM DIIMPLEMENTASIKAN DI UI**

Meskipun kode backend (`calculations.js` dan `App.jsx`) sudah mendukung metode Flat Fee, tampilan UI di `RevenueShareForm.jsx` belum menampilkan fitur ini.

## Yang Sudah Ada

### 1. Backend Support (✅ Sudah Ada)
- `src/utils/calculations.js` - Fungsi `calculateRevenueShare()` sudah support `calculationMethod`
- `src/App.jsx` - State `revenueShareData` sudah punya field `calculationMethod` dan `flatFee`

### 2. Dokumentasi (✅ Lengkap)
- `RINGKASAN_FITUR_FLAT_FEE.md`
- `ANALISIS_METODE_REVENUE_SHARING.md`
- `PENJELASAN_RUMUS_REVENUE_SHARING.md`
- `template_revenue_sharing_flatfee.csv`

## Yang Belum Ada di UI

### 1. Pilihan Metode Perhitungan (❌ Belum Ada)
Perlu tambahkan radio button untuk memilih antara:
- Metode Persentase (existing)
- Metode Flat Fee (baru)

**Lokasi:** Setelah "Pengaturan Umum" heading, sebelum input fields

```jsx
<div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
  <label className="block text-sm font-semibold text-gray-800 mb-3">
    Metode Perhitungan
  </label>
  <div className="flex flex-col sm:flex-row gap-4">
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="calculationMethod"
        value="percentage"
        checked={data.calculationMethod === 'percentage'}
        onChange={(e) => setData({ ...data, calculationMethod: e.target.value })}
        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
      />
      <span className="ml-2 text-sm text-gray-700">
        <span className="font-medium">Metode Persentase</span>
        <span className="block text-xs text-gray-500">RS mendapat % dari tarif</span>
      </span>
    </label>
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="calculationMethod"
        value="flatFee"
        checked={data.calculationMethod === 'flatFee'}
        onChange={(e) => setData({ ...data, calculationMethod: e.target.value })}
        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
      />
      <span className="ml-2 text-sm text-gray-700">
        <span className="font-medium">Metode Flat Fee</span>
        <span className="block text-xs text-gray-500">RS bayar nominal tetap per pemeriksaan</span>
      </span>
    </label>
  </div>
</div>
```

### 2. Conditional Input Porsi RS (❌ Belum Ada)
Input "Porsi RS (%)" hanya muncul jika metode Persentase dipilih

**Perubahan:**
```jsx
{data.calculationMethod === 'percentage' && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Porsi RS (%)
    </label>
    <input
      type="number"
      value={localValues.rsShare !== undefined ? localValues.rsShare : data.rsShare}
      onChange={(e) => handleChange('rsShare', e.target.value)}
      onBlur={() => handleBlur('rsShare')}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
)}
```

### 3. Kolom Flat Fee di Tabel (❌ Belum Ada)
Tambah kolom "Flat Fee (Rp)" di tabel procedures jika metode Flat Fee dipilih

**Perubahan di Table Header:**
```jsx
<thead className="bg-purple-50 border-b-2 border-purple-200">
  <tr>
    <th className="px-4 py-3 text-left font-semibold text-gray-700">No</th>
    <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama Pemeriksaan</th>
    <th className="px-4 py-3 text-right font-semibold text-gray-700">Tarif (Rp)</th>
    <th className="px-4 py-3 text-right font-semibold text-gray-700">Volume per Tahun</th>
    {data.calculationMethod === 'flatFee' && (
      <th className="px-4 py-3 text-right font-semibold text-gray-700">Flat Fee (Rp)</th>
    )}
    <th className="px-4 py-3 text-right font-semibold text-gray-700">
      {data.calculationMethod === 'flatFee' ? 'Pendapatan Bersih RS (Rp)' : 'Pendapatan RS (Rp)'}
    </th>
    <th className="px-4 py-3 text-center font-semibold text-gray-700">Aksi</th>
  </tr>
</thead>
```

**Perubahan di Table Body:**
```jsx
<tbody>
  {data.procedures.map((proc, index) => {
    let revenue
    if (data.calculationMethod === 'flatFee') {
      const flatFee = proc.flatFee || 0
      revenue = (proc.tariff - flatFee) * proc.volume
    } else {
      revenue = (proc.tariff * (data.rsShare / 100) * proc.volume)
    }
    
    return (
      <tr key={proc.id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-3">{index + 1}</td>
        <td className="px-4 py-3">
          <input
            type="text"
            value={getProcedureDisplayValue(proc.id, 'name', proc.name)}
            onChange={(e) => handleProcedureChange(proc.id, 'name', e.target.value)}
            onBlur={() => handleProcedureBlur(proc.id, 'name')}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
          />
        </td>
        <td className="px-4 py-3 text-right">
          <input
            type="text"
            value={getProcedureDisplayValue(proc.id, 'tariff', proc.tariff)}
            onChange={(e) => handleProcedureChange(proc.id, 'tariff', e.target.value)}
            onBlur={() => handleProcedureBlur(proc.id, 'tariff')}
            className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-purple-500"
          />
        </td>
        <td className="px-4 py-3 text-right">
          <input
            type="text"
            value={getProcedureDisplayValue(proc.id, 'volume', proc.volume)}
            onChange={(e) => handleProcedureChange(proc.id, 'volume', e.target.value)}
            onBlur={() => handleProcedureBlur(proc.id, 'volume')}
            className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-purple-500"
          />
        </td>
        {data.calculationMethod === 'flatFee' && (
          <td className="px-4 py-3 text-right">
            <input
              type="text"
              value={getProcedureDisplayValue(proc.id, 'flatFee', proc.flatFee || 0)}
              onChange={(e) => handleProcedureChange(proc.id, 'flatFee', e.target.value)}
              onBlur={() => handleProcedureBlur(proc.id, 'flatFee')}
              className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-purple-500"
            />
          </td>
        )}
        <td className="px-4 py-3 text-right font-semibold text-purple-600">
          {formatInputNumber(Math.round(revenue))}
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={() => removeProcedure(proc.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Hapus"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </td>
      </tr>
    )
  })}
</tbody>
```

### 4. Update Template Download (❌ Belum Ada)
Template CSV harus berubah sesuai metode yang dipilih

**Perubahan di `downloadTemplate()`:**
```jsx
const downloadTemplate = () => {
  let headers, sampleData, filename
  
  if (data.calculationMethod === 'flatFee') {
    headers = ['Nama Pemeriksaan', 'Tarif (Rp)', 'Volume per Tahun', 'Flat Fee per Pemeriksaan (Rp)']
    sampleData = [
      ['Darah Rutin', '150000', '68664', '30000'],
      ['Creatinin', '150000', '32208', '30000'],
      ['Urea / BUN', '150000', '30624', '30000']
    ]
    filename = 'template_revenue_sharing_flatfee.csv'
  } else {
    headers = ['Nama Pemeriksaan', 'Tarif (Rp)', 'Volume per Tahun']
    sampleData = [
      ['Darah Rutin', '150000', '68664'],
      ['Creatinin', '150000', '32208'],
      ['Urea / BUN', '150000', '30624']
    ]
    filename = 'template_revenue_sharing.csv'
  }

  let csvContent = headers.join(',') + '\n'
  sampleData.forEach(row => {
    csvContent += row.join(',') + '\n'
  })

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

### 5. Update Import CSV (❌ Belum Ada)
Import harus support kedua format (3 kolom dan 4 kolom)

**Perubahan di `handleFileImport()`:**
```jsx
// Check if it's flat fee format (4 columns) or percentage format (3 columns)
const isFlatFeeFormat = parts.length >= 4

if (parts.length < 3) {
  setImportError(`Baris ${i + 2}: Format tidak valid (harus ada minimal 3 kolom)`)
  hasError = true
  break
}

const name = parts[0]
const tariff = parseFloat(parts[1])
const volume = parseFloat(parts[2])
const flatFee = isFlatFeeFormat ? parseFloat(parts[3]) : 0

if (!name || isNaN(tariff) || isNaN(volume) || (isFlatFeeFormat && isNaN(flatFee))) {
  setImportError(`Baris ${i + 2}: Data tidak valid`)
  hasError = true
  break
}

importedProcedures.push({
  id: Date.now() + i,
  name,
  tariff,
  volume,
  flatFee: flatFee || 0
})
```

### 6. Update Form Tambah Manual (❌ Belum Ada)
Form tambah procedure harus punya input Flat Fee jika metode Flat Fee dipilih

**Perubahan:**
```jsx
<div className={`grid grid-cols-1 ${data.calculationMethod === 'flatFee' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-3`}>
  <input
    type="text"
    placeholder="Nama Pemeriksaan"
    value={newProcedure.name}
    onChange={(e) => handleNewProcedureChange('name', e.target.value)}
    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
  />
  <input
    type="text"
    placeholder="Tarif (Rp)"
    value={formatInputNumber(newProcedure.tariff)}
    onChange={(e) => handleNewProcedureChange('tariff', e.target.value)}
    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
  />
  <input
    type="text"
    placeholder="Volume per Tahun"
    value={formatInputNumber(newProcedure.volume)}
    onChange={(e) => handleNewProcedureChange('volume', e.target.value)}
    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
  />
  {data.calculationMethod === 'flatFee' && (
    <input
      type="text"
      placeholder="Flat Fee (Rp)"
      value={formatInputNumber(newProcedure.flatFee || 0)}
      onChange={(e) => handleNewProcedureChange('flatFee', e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
    />
  )}
</div>
```

### 7. Update State newProcedure (❌ Belum Ada)
```jsx
const [newProcedure, setNewProcedure] = useState({ 
  name: '', 
  tariff: 150000, 
  volume: 0, 
  flatFee: 0 
})
```

### 8. Update addProcedure() (❌ Belum Ada)
```jsx
const addProcedure = () => {
  if (newProcedure.name && newProcedure.volume > 0) {
    const newProc = {
      id: Date.now(),
      ...newProcedure,
      flatFee: newProcedure.flatFee || 0
    }
    setData({ ...data, procedures: [...data.procedures, newProc] })
    setNewProcedure({ name: '', tariff: 150000, volume: 0, flatFee: 0 })
    setShowAddProcedure(false)
  }
}
```

### 9. Update Total Calculation (❌ Belum Ada)
```jsx
const totalVolume = data.procedures.reduce((sum, proc) => sum + proc.volume, 0)

let totalRevenue, totalPaymentToSupplier
if (data.calculationMethod === 'flatFee') {
  totalRevenue = data.procedures.reduce((sum, proc) => {
    const flatFee = proc.flatFee || 0
    return sum + ((proc.tariff - flatFee) * proc.volume)
  }, 0)
  totalPaymentToSupplier = data.procedures.reduce((sum, proc) => {
    const flatFee = proc.flatFee || 0
    return sum + (flatFee * proc.volume)
  }, 0)
} else {
  totalRevenue = data.procedures.reduce((sum, proc) => sum + (proc.tariff * (data.rsShare / 100) * proc.volume), 0)
  totalPaymentToSupplier = data.procedures.reduce((sum, proc) => sum + (proc.tariff * ((100 - data.rsShare) / 100) * proc.volume), 0)
}
```

### 10. Update Footer Tabel (❌ Belum Ada)
```jsx
<tfoot className="bg-purple-100 font-semibold">
  <tr>
    <td colSpan="3" className="px-4 py-3 text-right">TOTAL:</td>
    <td className="px-4 py-3 text-right">{formatInputNumber(totalVolume)}</td>
    {data.calculationMethod === 'flatFee' && (
      <td className="px-4 py-3 text-right text-red-600">{formatInputNumber(Math.round(totalPaymentToSupplier))}</td>
    )}
    <td className="px-4 py-3 text-right text-purple-700">{formatInputNumber(Math.round(totalRevenue))}</td>
    <td></td>
  </tr>
</tfoot>
```

### 11. Update Summary Box (❌ Belum Ada)
Tambahkan info Total Pembayaran ke Pihak Ketiga jika metode Flat Fee

```jsx
<div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-300">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
    <div>
      <p className="text-xs text-gray-600 mb-1">Total Pemeriksaan</p>
      <p className="text-xl font-bold text-purple-700">{data.procedures.length}</p>
    </div>
    <div>
      <p className="text-xs text-gray-600 mb-1">Total Volume per Tahun</p>
      <p className="text-sm md:text-base font-bold text-purple-700 break-words">{formatInputNumber(totalVolume)}</p>
    </div>
    {data.calculationMethod === 'flatFee' && (
      <div>
        <p className="text-xs text-gray-600 mb-1">Total Bayar ke Pihak Ketiga</p>
        <p className="text-sm md:text-base font-bold text-red-700 break-words">Rp {formatInputNumber(Math.round(totalPaymentToSupplier))}</p>
      </div>
    )}
    <div>
      <p className="text-xs text-gray-600 mb-1">
        {data.calculationMethod === 'flatFee' ? 'Pendapatan Bersih RS' : 'Pendapatan RS per Tahun'}
      </p>
      <p className="text-sm md:text-base font-bold text-purple-700 break-words">Rp {formatInputNumber(Math.round(totalRevenue))}</p>
    </div>
    <div>
      <p className="text-xs text-gray-600 mb-1">Total Overhead</p>
      <p className="text-sm md:text-base font-bold text-purple-700 break-words">Rp {formatInputNumber(Math.round(data.directOverhead + data.allocatedOverhead))}</p>
    </div>
  </div>
</div>
```

## Cara Implementasi

1. Buka file `src/components/RevenueShareForm.jsx`
2. Terapkan perubahan di atas satu per satu
3. Test dengan:
   - Pilih Metode Persentase → pastikan tampilan seperti sekarang
   - Pilih Metode Flat Fee → pastikan kolom Flat Fee muncul
   - Download template → pastikan template berubah sesuai metode
   - Import CSV → pastikan support kedua format
   - Tambah manual → pastikan bisa input Flat Fee
   - Calculate → pastikan perhitungan benar

## Testing Checklist

- [ ] Radio button metode perhitungan muncul
- [ ] Input Porsi RS hanya muncul di metode Persentase
- [ ] Kolom Flat Fee muncul di tabel saat metode Flat Fee dipilih
- [ ] Template CSV berubah sesuai metode
- [ ] Import CSV support kedua format (3 dan 4 kolom)
- [ ] Form tambah manual punya input Flat Fee
- [ ] Total calculation benar untuk kedua metode
- [ ] Footer tabel menampilkan Total Pembayaran ke Pihak Ketiga
- [ ] Summary box menampilkan info yang benar
- [ ] Perhitungan EAT dan PV Expense benar

## Referensi

- Backend: `src/utils/calculations.js` - fungsi `calculateRevenueShare()`
- State: `src/App.jsx` - `revenueShareData`
- Dokumentasi: `ANALISIS_METODE_REVENUE_SHARING.md`
- Template: `template_revenue_sharing_flatfee.csv`

