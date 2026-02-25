import { useState } from 'react'

function RevenueShareForm({ data, setData }) {
  const [showAddProcedure, setShowAddProcedure] = useState(false)
  const [newProcedure, setNewProcedure] = useState({ name: '', tariff: 150000, volume: 0 })
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState(null)
  const [importSuccess, setImportSuccess] = useState(false)
  const [localValues, setLocalValues] = useState({})
  const [procedureLocalValues, setProcedureLocalValues] = useState({})

  // Format angka dengan pemisah ribuan
  const formatInputNumber = (value) => {
    if (!value && value !== 0) return ''
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  // Parse angka dari format dengan pemisah ribuan
  const parseInputNumber = (value) => {
    if (!value) return 0
    return parseFloat(value.toString().replace(/\./g, '')) || 0
  }

  const handleChange = (field, value) => {
    // Update local state immediately for smooth typing
    setLocalValues({ ...localValues, [field]: value })
  }

  const handleBlur = (field) => {
    // Update parent state only when user finishes typing
    const value = localValues[field]
    if (value !== undefined) {
      const numValue = parseInputNumber(value)
      setData({ ...data, [field]: numValue })
      // Clear local value after syncing
      const newLocalValues = { ...localValues }
      delete newLocalValues[field]
      setLocalValues(newLocalValues)
    }
  }

  const getDisplayValue = (field) => {
    // Show local value if user is typing, otherwise show formatted data value
    if (localValues[field] !== undefined) {
      return localValues[field]
    }
    return formatInputNumber(data[field])
  }

  const handleProcedureChange = (id, field, value) => {
    // Update local state immediately for smooth typing
    const key = `${id}_${field}`
    setProcedureLocalValues({ ...procedureLocalValues, [key]: value })
  }

  const handleProcedureBlur = (id, field) => {
    // Update parent state only when user finishes typing
    const key = `${id}_${field}`
    const value = procedureLocalValues[key]
    if (value !== undefined) {
      const updatedProcedures = data.procedures.map(proc => {
        if (proc.id === id) {
          if (field === 'name') {
            return { ...proc, [field]: value }
          } else {
            return { ...proc, [field]: parseInputNumber(value) }
          }
        }
        return proc
      })
      setData({ ...data, procedures: updatedProcedures })
      // Clear local value after syncing
      const newLocalValues = { ...procedureLocalValues }
      delete newLocalValues[key]
      setProcedureLocalValues(newLocalValues)
    }
  }

  const getProcedureDisplayValue = (id, field, originalValue) => {
    // Show local value if user is typing, otherwise show formatted original value
    const key = `${id}_${field}`
    if (procedureLocalValues[key] !== undefined) {
      return procedureLocalValues[key]
    }
    if (field === 'name') {
      return originalValue
    }
    return formatInputNumber(originalValue)
  }

  const handleNewProcedureChange = (field, value) => {
    if (field === 'name') {
      setNewProcedure({ ...newProcedure, [field]: value })
    } else {
      setNewProcedure({ ...newProcedure, [field]: parseInputNumber(value) })
    }
  }

  const addProcedure = () => {
    if (newProcedure.name && newProcedure.volume > 0) {
      const newProc = {
        id: Date.now(),
        ...newProcedure
      }
      setData({ ...data, procedures: [...data.procedures, newProc] })
      setNewProcedure({ name: '', tariff: 150000, volume: 0 })
      setShowAddProcedure(false)
    }
  }

  const removeProcedure = (id) => {
    setData({ ...data, procedures: data.procedures.filter(proc => proc.id !== id) })
  }

  const downloadTemplate = () => {
    const headers = ['Nama Pemeriksaan', 'Tarif (Rp)', 'Volume per Tahun']
    const sampleData = [
      ['Darah Rutin', '150000', '68664'],
      ['Creatinin', '150000', '32208'],
      ['Urea / BUN', '150000', '30624']
    ]

    let csvContent = headers.join(',') + '\n'
    sampleData.forEach(row => {
      csvContent += row.join(',') + '\n'
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'template_revenue_sharing.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileImport = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setImporting(true)
    setImportError(null)
    setImportSuccess(false)

    try {
      const text = await file.text()
      const lines = text.split('\n').filter(line => line.trim())
      
      // Skip header row
      const dataLines = lines.slice(1)
      
      const importedProcedures = []
      let hasError = false
      
      for (let i = 0; i < dataLines.length; i++) {
        const line = dataLines[i].trim()
        if (!line) continue
        
        const parts = line.split(',').map(p => p.trim().replace(/"/g, ''))
        
        if (parts.length < 3) {
          setImportError(`Baris ${i + 2}: Format tidak valid (harus ada 3 kolom)`)
          hasError = true
          break
        }
        
        const name = parts[0]
        const tariff = parseFloat(parts[1])
        const volume = parseFloat(parts[2])
        
        if (!name || isNaN(tariff) || isNaN(volume)) {
          setImportError(`Baris ${i + 2}: Data tidak valid`)
          hasError = true
          break
        }
        
        importedProcedures.push({
          id: Date.now() + i,
          name,
          tariff,
          volume
        })
      }
      
      if (!hasError && importedProcedures.length > 0) {
        setData({ ...data, procedures: importedProcedures })
        setImportSuccess(true)
        setTimeout(() => setImportSuccess(false), 3000)
      } else if (!hasError) {
        setImportError('File tidak mengandung data yang valid')
      }
    } catch (error) {
      console.error('Error importing file:', error)
      setImportError('Gagal membaca file. Pastikan format CSV benar.')
    } finally {
      setImporting(false)
      event.target.value = '' // Reset input
    }
  }

  const totalVolume = data.procedures.reduce((sum, proc) => sum + proc.volume, 0)
  const totalRevenue = data.procedures.reduce((sum, proc) => sum + (proc.tariff * (data.rsShare / 100) * proc.volume), 0)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Deskripsi
        </h3>
        <p className="text-sm text-gray-700">
          Revenue sharing antara RS dengan Pemasok berdasarkan persentase dari tarif pelayanan. 
          Tambahkan berbagai jenis pemeriksaan atau tindakan dengan tarif dan volume masing-masing.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Pengaturan Umum</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biaya Overhead Langsung per Tahun (Rp)
            </label>
            <input
              type="text"
              value={getDisplayValue('directOverhead')}
              onChange={(e) => handleChange('directOverhead', e.target.value)}
              onBlur={() => handleBlur('directOverhead')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biaya Overhead Alokasian per Tahun (Rp)
            </label>
            <input
              type="text"
              value={getDisplayValue('allocatedOverhead')}
              onChange={(e) => handleChange('allocatedOverhead', e.target.value)}
              onBlur={() => handleBlur('allocatedOverhead')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={localValues.taxRate !== undefined ? localValues.taxRate : data.taxRate}
              onChange={(e) => handleChange('taxRate', e.target.value)}
              onBlur={() => handleBlur('taxRate')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Rate (%)
            </label>
            <input
              type="number"
              value={localValues.discountRate !== undefined ? localValues.discountRate : data.discountRate}
              onChange={(e) => handleChange('discountRate', e.target.value)}
              onBlur={() => handleBlur('discountRate')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode (tahun)
            </label>
            <input
              type="number"
              value={localValues.period !== undefined ? localValues.period : data.period}
              onChange={(e) => handleChange('period', e.target.value)}
              onBlur={() => handleBlur('period')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h4 className="font-semibold text-gray-800">Daftar Pemeriksaan atau Tindakan</h4>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center text-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Unduh Template
            </button>
            <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center text-sm cursor-pointer">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {importing ? 'Mengimpor...' : 'Import Data'}
              <input
                type="file"
                accept=".csv"
                onChange={handleFileImport}
                disabled={importing}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowAddProcedure(!showAddProcedure)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center text-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Manual
            </button>
          </div>
        </div>

        {importError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-700 text-sm font-medium">Error Import</p>
              <p className="text-red-600 text-sm">{importError}</p>
            </div>
          </div>
        )}

        {importSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-700 text-sm font-medium">Data berhasil diimpor!</span>
          </div>
        )}

        {showAddProcedure && (
          <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h5 className="font-medium text-gray-700 mb-3">Tambah Pemeriksaan Baru</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
            </div>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={addProcedure}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Simpan
              </button>
              <button
                onClick={() => setShowAddProcedure(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-purple-50 border-b-2 border-purple-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">No</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama Pemeriksaan</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Tarif (Rp)</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Volume per Tahun</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Pendapatan RS (Rp)</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.procedures.map((proc, index) => {
                const revenue = (proc.tariff * (data.rsShare / 100) * proc.volume)
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
            <tfoot className="bg-purple-100 font-semibold">
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right">TOTAL:</td>
                <td className="px-4 py-3 text-right">{formatInputNumber(totalVolume)}</td>
                <td className="px-4 py-3 text-right text-purple-700">{formatInputNumber(Math.round(totalRevenue))}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

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
          <div>
            <p className="text-xs text-gray-600 mb-1">Pendapatan RS per Tahun</p>
            <p className="text-sm md:text-base font-bold text-purple-700 break-words">Rp {formatInputNumber(Math.round(totalRevenue))}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Overhead</p>
            <p className="text-sm md:text-base font-bold text-purple-700 break-words">Rp {formatInputNumber(Math.round(data.directOverhead + data.allocatedOverhead))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueShareForm
