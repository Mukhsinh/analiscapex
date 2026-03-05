import { useState, useEffect } from 'react'
import { getUserRentalAnalyses, deleteRentalAnalysis } from '../lib/database'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

function RentalAnalysisHistory({ user }) {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)

  useEffect(() => {
    if (user) {
      loadAnalyses()
    }
    
    // Listen for refresh events
    const handleRefresh = () => {
      if (user) {
        loadAnalyses()
      }
    }
    
    window.addEventListener('refreshRentalHistory', handleRefresh)
    
    return () => {
      window.removeEventListener('refreshRentalHistory', handleRefresh)
    }
  }, [user])

  const loadAnalyses = async () => {
    setLoading(true)
    try {
      const { data, error } = await getUserRentalAnalyses(user.id)
      if (!error && data) {
        setAnalyses(data)
      }
    } catch (error) {
      console.error('Error loading analyses:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus analisis ini?')) return

    try {
      const { error } = await deleteRentalAnalysis(id)
      if (!error) {
        loadAnalyses()
        if (selectedAnalysis?.id === id) {
          setSelectedAnalysis(null)
        }
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const generateDetailPDF = (analysis) => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210
    let yPos = 20

    // Header
    pdf.setFillColor(79, 70, 229)
    pdf.rect(0, 0, pageWidth, 40, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('LAPORAN ANALISIS HARGA SEWA', pageWidth / 2, 20, { align: 'center' })
    
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Analisis Perhitungan Harga Sewa Alat Medis', pageWidth / 2, 30, { align: 'center' })

    yPos = 50

    // Info
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(10)
    pdf.text(`Tanggal Analisis: ${new Date(analysis.created_at).toLocaleDateString('id-ID')}`, 15, yPos)
    pdf.text(`User: ${user?.email || 'N/A'}`, 15, yPos + 5)
    
    yPos += 15

    // Data Input
    pdf.setFillColor(243, 244, 246)
    pdf.rect(15, yPos, pageWidth - 30, 8, 'F')
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('DATA INPUT', 20, yPos + 5.5)
    
    yPos += 12

    const inputData = [
      ['Nama Alat', analysis.equipment_name],
      ['Harga Beli', formatCurrency(analysis.purchase_price)],
      ['Umur Ekonomis', `${analysis.economic_life} tahun`],
      ['Nilai Residu', formatCurrency(analysis.residual_value)],
      ['Tingkat Keuntungan', `${analysis.profit_margin}%`],
      ['Masa Sewa', `${analysis.rental_period} tahun`]
    ]

    autoTable(pdf, {
      startY: yPos,
      head: [['Parameter', 'Nilai']],
      body: inputData,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
      margin: { left: 15, right: 15 }
    })

    yPos = pdf.lastAutoTable.finalY + 10

    // Hasil
    pdf.setFillColor(243, 244, 246)
    pdf.rect(15, yPos, pageWidth - 30, 8, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.text('HASIL PERHITUNGAN', 20, yPos + 5.5)
    
    yPos += 12

    const resultData = [
      ['Harga Sewa per Tahun', formatCurrency(analysis.rental_price_per_year)],
      ['Total Pendapatan', formatCurrency(analysis.total_revenue)],
      ['Total Keuntungan', formatCurrency(analysis.total_profit)]
    ]

    autoTable(pdf, {
      startY: yPos,
      head: [['Indikator', 'Nilai']],
      body: resultData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      columnStyles: { 1: { halign: 'right' } },
      margin: { left: 15, right: 15 }
    })

    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(128, 128, 128)
    pdf.text('© Capex Analyzer - Professional Edition', pageWidth / 2, 287, { align: 'center' })

    pdf.save(`Laporan_Sewa_${analysis.equipment_name.replace(/\s+/g, '_')}.pdf`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Riwayat Kalkulasi Harga Sewa</h2>
        <p className="text-purple-100">Daftar semua analisis harga sewa yang pernah dilakukan</p>
      </div>

      {analyses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Riwayat</h3>
          <p className="text-gray-500">Belum ada analisis harga sewa yang tersimpan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{analysis.equipment_name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(analysis.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => generateDetailPDF(analysis)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Unduh PDF"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedAnalysis(selectedAnalysis?.id === analysis.id ? null : analysis)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(analysis.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-purple-600 font-medium mb-1">Harga Beli</p>
                  <p className="text-sm font-bold text-purple-900">{formatCurrency(analysis.purchase_price)}</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-xs text-indigo-600 font-medium mb-1">Sewa/Tahun (Kalkulasi)</p>
                  <p className="text-sm font-bold text-indigo-900">{formatCurrency(analysis.rental_price_per_year)}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium mb-1">Present Value Biaya</p>
                  <p className="text-sm font-bold text-blue-900">{formatCurrency(analysis.present_value_cost || 0)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-600 font-medium mb-1">Feasibility</p>
                  <p className={`text-sm font-bold ${
                    analysis.feasibility_status === 'LAYAK' ? 'text-green-900' : 
                    analysis.feasibility_status === 'TIDAK LAYAK' ? 'text-red-900' : 
                    'text-gray-500'
                  }`}>
                    {analysis.feasibility_status || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Tampilkan analisis perbandingan jika ada vendor quote */}
              {analysis.vendor_quote && analysis.vendor_quote > 0 && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h5 className="text-sm font-bold text-gray-800 mb-3">📊 Analisis Perbandingan Harga</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">Harga Penawaran Vendor</p>
                      <p className="text-base font-bold text-blue-700">{formatCurrency(analysis.vendor_quote)}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">Selisih Harga</p>
                      <p className={`text-base font-bold ${
                        (analysis.price_difference || 0) > 0 ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {(analysis.price_difference || 0) > 0 ? '+' : ''}{formatCurrency(Math.abs(analysis.price_difference || 0))}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">Persentase Selisih</p>
                      <p className={`text-base font-bold ${
                        (analysis.price_difference_percent || 0) > 0 ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {(analysis.price_difference_percent || 0) > 0 ? '+' : ''}{(analysis.price_difference_percent || 0).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className={`mt-3 p-3 rounded-lg ${
                    analysis.feasibility_status === 'LAYAK' 
                      ? 'bg-green-100 border border-green-300' 
                      : 'bg-red-100 border border-red-300'
                  }`}>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Status Kelayakan:</p>
                    <p className={`text-sm font-bold ${
                      analysis.feasibility_status === 'LAYAK' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {analysis.feasibility_status || 'Belum Ada Data'}
                    </p>
                  </div>
                </div>
              )}

              {selectedAnalysis?.id === analysis.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Detail Lengkap</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Umur Ekonomis:</span>
                      <span className="font-semibold">{analysis.economic_life} tahun</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nilai Residu:</span>
                      <span className="font-semibold">{formatCurrency(analysis.residual_value)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tingkat Keuntungan:</span>
                      <span className="font-semibold">{analysis.profit_margin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Masa Sewa:</span>
                      <span className="font-semibold">{analysis.rental_period} tahun</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount Rate:</span>
                      <span className="font-semibold">{analysis.discount_rate || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Biaya:</span>
                      <span className="font-semibold">{formatCurrency(analysis.total_cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Pendapatan:</span>
                      <span className="font-semibold">{formatCurrency(analysis.total_revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Keuntungan:</span>
                      <span className="font-semibold">{formatCurrency(analysis.total_profit)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RentalAnalysisHistory
