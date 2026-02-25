import React, { useState } from 'react'

function LeasingForm({ data, setData }) {
  const [localValues, setLocalValues] = useState({})

  // Format angka dengan pemisah ribuan
  const formatInputNumber = (value) => {
    if (!value) return ''
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

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Deskripsi:</h3>
        <p className="text-sm text-gray-600">
          Pembayaran leasing per tahun selama periode tertentu (termasuk biaya pemeliharaan)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pembayaran Leasing per Tahun (Rp)
          </label>
          <input
            type="text"
            value={getDisplayValue('annualPayment')}
            onChange={(e) => handleChange('annualPayment', e.target.value)}
            onBlur={() => handleBlur('annualPayment')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}

export default LeasingForm
