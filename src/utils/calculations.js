// Fungsi untuk menghitung PV Factor
export const calculatePVFactor = (rate, year) => {
  return 1 / Math.pow(1 + rate / 100, year)
}

// Perhitungan Leasing
export const calculateLeasing = (data) => {
  const { annualPayment, period, discountRate } = data
  
  // Konversi ke juta untuk perhitungan
  const annualPaymentMillion = annualPayment / 1000000
  
  const yearlyData = []
  let totalPV = 0
  
  for (let year = 1; year <= period; year++) {
    const pvFactor = calculatePVFactor(discountRate, year)
    const pvExpense = annualPaymentMillion * pvFactor
    totalPV += pvExpense
    
    yearlyData.push({
      year,
      leasePayment: annualPaymentMillion,
      pvFactor,
      pvExpense
    })
  }
  
  return {
    yearlyData,
    totalPV,
    totalPayment: annualPaymentMillion * period,
    annualPayment: annualPaymentMillion
  }
}

// Perhitungan Borrow & Purchase
export const calculatePurchase = (data) => {
  const { loanAmount, interestRate, period, maintenanceCost, residualValue, discountRate } = data
  
  // Konversi ke juta untuk perhitungan
  const loanAmountMillion = loanAmount / 1000000
  const maintenanceCostMillion = maintenanceCost / 1000000
  const residualValueMillion = residualValue / 1000000
  
  const principalPayment = loanAmountMillion / period
  
  const yearlyData = []
  let remainingLoan = loanAmountMillion
  let totalPV = 0
  
  for (let year = 1; year <= period; year++) {
    const interest = remainingLoan * (interestRate / 100)
    const totalExpense = principalPayment + interest + maintenanceCostMillion
    const pvFactor = calculatePVFactor(discountRate, year)
    const pvExpense = totalExpense * pvFactor
    
    totalPV += pvExpense
    remainingLoan -= principalPayment
    
    yearlyData.push({
      year,
      principalPayment,
      interestPayment: interest,
      maintenanceExpense: maintenanceCostMillion,
      totalExpense,
      pvFactor,
      pvExpense
    })
  }
  
  // Trade-in value di tahun terakhir
  const tradeInPVFactor = calculatePVFactor(discountRate, period)
  const tradeInPV = residualValueMillion * tradeInPVFactor
  totalPV -= tradeInPV
  
  yearlyData.push({
    year: period,
    type: 'Trade-in',
    tradeInValue: -residualValueMillion,
    pvFactor: tradeInPVFactor,
    pvExpense: -tradeInPV
  })
  
  return {
    yearlyData,
    totalPV,
    tradeInPV,
    principalPayment,
    totalLoan: loanAmountMillion
  }
}

// Perhitungan Revenue Sharing
export const calculateRevenueShare = (data) => {
  const { 
    rsShare, 
    procedures,
    directOverhead, 
    allocatedOverhead, 
    taxRate, 
    discountRate,
    period 
  } = data
  
  // Hitung total pendapatan RS per tahun dari semua procedures (dalam Rupiah)
  const annualRevenueRp = procedures.reduce((sum, proc) => {
    return sum + (proc.tariff * (rsShare / 100) * proc.volume)
  }, 0)
  
  // Konversi ke juta untuk perhitungan
  const annualRevenue = annualRevenueRp / 1000000
  
  // Overhead sudah dalam Rupiah, konversi ke juta
  const directOverheadMillion = directOverhead / 1000000
  const allocatedOverheadMillion = allocatedOverhead / 1000000
  
  // Hitung laba operasi (dalam juta)
  const operatingProfit = annualRevenue - directOverheadMillion - allocatedOverheadMillion
  
  // Hitung EAT (Earning After Tax) dalam juta
  const eat = operatingProfit * (1 - taxRate / 100)
  
  const yearlyData = []
  let totalPV = 0
  
  for (let year = 1; year <= period; year++) {
    const pvFactor = calculatePVFactor(discountRate, year)
    // PV Expense untuk Revenue Sharing dihitung sebagai nilai absolut
    // Karena kita ingin membandingkan "biaya" dari ketiga alternatif
    // Baik untung maupun rugi, kita hitung sebagai expense untuk konsistensi
    const pvExpense = Math.abs(eat) * pvFactor
    totalPV += pvExpense
    
    yearlyData.push({
      year,
      revenue: annualRevenue,
      directOverhead: directOverheadMillion,
      allocatedOverhead: allocatedOverheadMillion,
      operatingProfit,
      eat,
      pvFactor,
      pvExpense
    })
  }
  
  return {
    yearlyData,
    totalPV,
    annualRevenue,
    operatingProfit,
    eat,
    isProfit: eat > 0,
    procedures: procedures.map(proc => ({
      ...proc,
      annualRevenue: (proc.tariff * (rsShare / 100) * proc.volume) / 1000000
    }))
  }
}

// Format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Format number
export const formatNumber = (value, decimals = 2) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}
