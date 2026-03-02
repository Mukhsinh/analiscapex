# Patch: Implementasi UI Metode Flat Fee Revenue Sharing

## Ringkasan Masalah

Fitur metode Flat Fee sudah ada di backend (`calculations.js` dan `App.jsx`), tetapi UI di `RevenueShareForm.jsx` belum menampilkan pilihan metode dan input Flat Fee.

## Solusi

File `src/components/RevenueShareForm.jsx` perlu diupdate dengan 11 perubahan berikut:

### Perubahan 1: Update State newProcedure
**Lokasi:** Baris ~6  
**Dari:**
```jsx
const [newProcedure, setNewProcedure] = useState({ name: '', tariff: 150000, volume: 0 })
```
**Menjadi:**
```jsx
const [newProcedure, setNewProcedure] = useState({ name: '', tariff: 150000, volume: 0, flatFee: 0 })
```

### Perubahan 2: Update Deskripsi
**Lokasi:** Baris ~120 (di dalam return statement)  
**Dari:**
```jsx
<p className="text-sm text-gray-700">
  Revenue sharing antara RS dengan Pemasok berdasarkan persentase dari tarif pelayanan. 
  Tambahkan berbagai jenis pemeriksaan atau tindakan dengan tarif dan volume masing-masing.
</p>
```
**Menjadi:**
```jsx
<p className="text-sm text-gray-700">
  Revenue sharing antara RS dengan Pemasok. Pilih metode: Persentase (berbagi % tarif) atau Flat Fee (bayar nominal tetap per pemeriksaan).
</p>
```

### Perubahan 3: Tambah Pilihan Metode
**Lokasi:** Setelah `<h4 className="font-semibold text-gray-800 mb-4">Pengaturan Umum</h4>`  
**Tambahkan:**
```jsx
{/* Pilihan Metode Perhitungan */}
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

### Perubahan 4: Conditional Porsi RS Input
**Lokasi:** Input "Porsi RS (%)"  
**Wrap dengan conditional:**
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

### Perubahan 5: Update downloadTemplate Function
**Lokasi:** Function `downloadTemplate`  
**Ganti seluruh function dengan:**
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

### Perubahan 6: Update handleFileImport
**Lokasi:** Di dalam loop `for (let i = 0; i < dataLines.length; i++)`  
**Ganti bagian parsing dengan:**
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

### Perubahan 7: Update addProcedure Function
**Lokasi:** Function `addProcedure`  
**Ganti dengan:**
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

### Perubahan 8: Update Form Tambah Manual
**Lokasi:** Di dalam `{showAddProcedure && (...)}`, bagian grid inputs  
**Ganti dengan:**
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

### Perubahan 9: Update Table Header
**Lokasi:** `<thead>` di dalam table  
**Ganti dengan:**
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

### Perubahan 10: Update Table Body
**Lokasi:** `<tbody>` di dalam table  
**Ganti perhitungan revenue dan tambah kolom Flat Fee:**
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

### Perubahan 11: Update Total Calculations dan Footer
**Lokasi:** Sebelum `return` statement, setelah function definitions  
**Ganti:**
```jsx
const totalVolume = data.procedures.reduce((sum, proc) => sum + proc.volume, 0)
const totalRevenue = data.procedures.reduce((sum, proc) => sum + (proc.tariff * (data.rsShare / 100) * proc.volume), 0)
```
**Menjadi:**
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

**Dan update `<tfoot>` dengan:**
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

## Testing

Setelah menerapkan semua perubahan:

1. Refresh browser
2. Pilih tab "C. Revenue Sharing"
3. Cek apakah radio button "Metode Perhitungan" muncul
4. Pilih "Metode Flat Fee"
5. Cek apakah kolom "Flat Fee" muncul di tabel
6. Download template → harus ada 4 kolom
7. Tambah procedure manual → harus ada input Flat Fee
8. Calculate → harus menghitung dengan benar

## Hasil yang Diharapkan

- ✅ Radio button metode perhitungan muncul
- ✅ Kolom Flat Fee muncul saat metode Flat Fee dipilih
- ✅ Template CSV berubah sesuai metode
- ✅ Import CSV support kedua format
- ✅ Perhitungan benar untuk kedua metode
- ✅ Total menampilkan "Total Bayar ke Pihak Ketiga" untuk metode Flat Fee

