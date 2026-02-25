import { VALIDATION_RULES } from './constants'

// Validasi single field
export const validateField = (type, field, value) => {
  const rules = VALIDATION_RULES[type]?.[field]
  
  if (!rules) return { valid: true }
  
  const errors = []
  
  if (rules.required && (value === null || value === undefined || value === '')) {
    errors.push('Field ini wajib diisi')
  }
  
  const numValue = parseFloat(value)
  
  if (isNaN(numValue)) {
    errors.push('Harus berupa angka')
  } else {
    if (rules.min !== undefined && numValue < rules.min) {
      errors.push(`Nilai minimum adalah ${rules.min}`)
    }
    
    if (rules.max !== undefined && numValue > rules.max) {
      errors.push(`Nilai maksimum adalah ${rules.max}`)
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Validasi semua field dalam form
export const validateForm = (type, data) => {
  const rules = VALIDATION_RULES[type]
  const errors = {}
  let isValid = true
  
  Object.keys(rules).forEach(field => {
    const validation = validateField(type, field, data[field])
    if (!validation.valid) {
      errors[field] = validation.errors
      isValid = false
    }
  })
  
  return { isValid, errors }
}

// Validasi logika bisnis
export const validateBusinessLogic = (type, data) => {
  const warnings = []
  
  switch (type) {
    case 'leasing':
      if (data.monthlyPayment * 12 * (data.period / 12) > 20000) {
        warnings.push('Total pembayaran leasing sangat tinggi (> 20 miliar)')
      }
      break
      
    case 'purchase':
      if (data.residualValue > data.loanAmount * 0.3) {
        warnings.push('Nilai residu terlalu tinggi (> 30% dari harga beli)')
      }
      if (data.interestRate > 15) {
        warnings.push('Bunga pinjaman sangat tinggi (> 15%)')
      }
      break
      
    case 'revenueShare':
      const annualRevenue = (data.tariff * (data.rsShare / 100) * data.projectedVolume) / 1000000
      const totalOverhead = data.directOverhead + data.allocatedOverhead
      
      if (annualRevenue < totalOverhead) {
        warnings.push('⚠️ Pendapatan tahunan lebih kecil dari total overhead - akan menghasilkan kerugian!')
      }
      
      if (data.rsShare < 10) {
        warnings.push('Porsi RS sangat kecil (< 10%)')
      }
      
      if (data.projectedVolume < 1000) {
        warnings.push('Volume proyeksi sangat rendah - pertimbangkan alternatif lain')
      }
      break
  }
  
  return warnings
}

// Export semua validator
export default {
  validateField,
  validateForm,
  validateBusinessLogic
}
