// Default values berdasarkan file Excel
export const DEFAULT_VALUES = {
  leasing: {
    monthlyPayment: 280,
    period: 60,
    discountRate: 10
  },
  purchase: {
    loanAmount: 1300,
    interestRate: 10,
    period: 5,
    maintenanceCost: 20,
    residualValue: 130,
    discountRate: 10
  },
  revenueShare: {
    tariff: 150000,
    rsShare: 15,
    supplierShare: 85,
    projectedVolume: 9180, // Total dari 77 jenis pemeriksaan
    directOverhead: 1632, // 34 personel × 4 juta × 12 bulan
    allocatedOverhead: 240,
    taxRate: 15,
    discountRate: 10,
    period: 5
  }
}

// Informasi pemeriksaan laboratorium (dari Excel)
export const LAB_TESTS = [
  { name: 'Albumin', volume: 5658 },
  { name: 'Analisa Sperma', volume: 6 },
  { name: 'Anti HCV', volume: 564 },
  { name: 'Anti HIV', volume: 4272 },
  { name: 'Analisa LCS', volume: 6 },
  { name: 'APTT / PTTK', volume: 5160 },
  { name: 'Bilirubin Direk', volume: 1980 },
  { name: 'Bilirubin Total', volume: 1980 },
  { name: 'Blood Gas Analisa (BGA)', volume: 2166 },
  { name: 'Cholesterol Total', volume: 11982 },
  { name: 'CK-MB', volume: 510 },
  { name: 'Creatinin', volume: 32208 },
  { name: 'CRP', volume: 1698 },
  { name: 'Darah Lengkap', volume: 5886 },
  { name: 'Darah Rutin', volume: 68664 },
  // ... dan seterusnya (77 jenis total)
]

// Warna untuk chart
export const CHART_COLORS = {
  leasing: {
    background: 'rgba(59, 130, 246, 0.8)',
    border: 'rgb(59, 130, 246)'
  },
  purchase: {
    background: 'rgba(34, 197, 94, 0.8)',
    border: 'rgb(34, 197, 94)'
  },
  revenueShare: {
    background: 'rgba(168, 85, 247, 0.8)',
    border: 'rgb(168, 85, 247)'
  }
}

// Validasi input
export const VALIDATION_RULES = {
  leasing: {
    monthlyPayment: { min: 0, max: 10000, required: true },
    period: { min: 1, max: 120, required: true },
    discountRate: { min: 0, max: 100, required: true }
  },
  purchase: {
    loanAmount: { min: 0, max: 100000, required: true },
    interestRate: { min: 0, max: 100, required: true },
    period: { min: 1, max: 30, required: true },
    maintenanceCost: { min: 0, max: 10000, required: true },
    residualValue: { min: 0, max: 100000, required: true },
    discountRate: { min: 0, max: 100, required: true }
  },
  revenueShare: {
    tariff: { min: 0, max: 10000000, required: true },
    rsShare: { min: 0, max: 100, required: true },
    projectedVolume: { min: 0, max: 1000000, required: true },
    directOverhead: { min: 0, max: 100000, required: true },
    allocatedOverhead: { min: 0, max: 100000, required: true },
    taxRate: { min: 0, max: 100, required: true },
    discountRate: { min: 0, max: 100, required: true },
    period: { min: 1, max: 30, required: true }
  }
}

// Metadata
export const APP_INFO = {
  name: 'Analisis Keputusan Capex',
  version: '1.0.0',
  description: 'Aplikasi untuk menganalisis keputusan investasi Capital Expenditure',
  authors: 'Johny Setyawan & Niven A. Setyawan',
  hospital: 'RS MIRACLES - YOGYAKARTA',
  equipment: 'Alat Analyzer Kimia - Laboratorium Klinik'
}
