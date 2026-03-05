import { useState, useEffect } from 'react'
import { getUserDetailedAnalyses, deleteProject } from '../lib/database'

function AnalysisHistory({ user }) {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedRows, setExpandedRows] = useState(new Set())

  useEffect(() => {
    loadAnalyses()
    
    const handleRefresh = () => {
      loadAnalyses()
    }
    
    window.addEventListener('refreshAnalysisHistory', handleRefresh)
    
    return () => {
      window.removeEventListener('refreshAnalysisHistory', handleRefresh)
    }
  }, [user])

  const loadAnalyses = async () => {
    if (!user || !user.id) {
      setError('User not logged in')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await getUserDetailedAnalyses(user.id, 50)
      
      if (fetchError) {
        console.error('Error loading analyses:', fetchError)
        setError(fetchError.message)
      } else {
        setAnalyses(data || [])
      }
    } catch (err) {
      console.error('Exception loading analyses:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const handleDelete = async (projectId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus analisis ini?')) {
      return
    }

    try {
      const { error: deleteError } = await deleteProject(projectId)
      
      if (deleteError) {
        alert(`Gagal menghapus: ${deleteError.message}`)
      } else {
        loadAnalyses()
      }
    } catch (err) {
      console.error('Exception deleting analysis:', err)
      alert(`Error: ${err.message}`)
    }
  }

  const downloadPDF = (analysis) => {
    alert('Fitur download PDF akan segera tersedia')
  }

  const formatCurrency = (value) => {
    if (!value) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRecommendationBadge = (option) => {
    const colors = {
      'Leasing': 'bg-blue-100 text-blue-800',
      'Borrow & Purchase': 'bg-green-100 text-green-800',
      'Revenue Sharing': 'bg-purple-100 text-purple-800'
    }
    return colors[option] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat riwayat analisis...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadAnalyses}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  if (analyses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Riwayat Analisis</h3>
        <p className="text-gray-500">Lakukan analisis pertama Anda untuk melihat riwayat di sini</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Riwayat Analisis CAPEX</h2>
        <p className="text-blue-100">Total {analyses.length} analisis tersimpan</p>
      </div>

      <div className="space-y-4">
        {analyses.map((analysis) => (
          <div key={analysis.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleRow(analysis.id)}
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(analysis.created_at)}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Rumah Sakit</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {analysis.projects?.hospital_name || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Alat</p>
                  <p className="text-sm text-gray-700">
                    {analysis.projects?.equipment_name || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Rekomendasi</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRecommendationBadge(analysis.recommended_option)}`}>
                    {analysis.recommended_option}
                  </span>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadPDF(analysis)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download Laporan"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(analysis.project_id)
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedRows.has(analysis.id) ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {expandedRows.has(analysis.id) && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Leasing
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pembayaran/Tahun:</span>
                        <span className="font-semibold">{formatCurrency(analysis.leasing_monthly_payment * 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Periode:</span>
                        <span className="font-semibold">{analysis.leasing_period} tahun</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount Rate:</span>
                        <span className="font-semibold">{analysis.leasing_discount_rate}%</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-semibold">Total PV:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(analysis.leasing_total_pv)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Borrow & Purchase
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah Pinjaman:</span>
                        <span className="font-semibold">{formatCurrency(analysis.purchase_loan_amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bunga:</span>
                        <span className="font-semibold">{analysis.purchase_interest_rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance:</span>
                        <span className="font-semibold">{formatCurrency(analysis.purchase_maintenance_cost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nilai Residu:</span>
                        <span className="font-semibold">{formatCurrency(analysis.purchase_residual_value)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-semibold">Total PV:</span>
                        <span className="font-bold text-green-600">{formatCurrency(analysis.purchase_total_pv)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Revenue Sharing
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">RS Share:</span>
                        <span className="font-semibold">{analysis.revenue_share_rs_share}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Supplier Share:</span>
                        <span className="font-semibold">{analysis.revenue_share_supplier_share}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Prosedur:</span>
                        <span className="font-semibold">{analysis.revenue_share_total_procedures}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Revenue:</span>
                        <span className="font-semibold">{formatCurrency(analysis.revenue_share_total_revenue)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-semibold">Total PV:</span>
                        <span className="font-bold text-purple-600">{formatCurrency(analysis.revenue_share_total_pv)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalysisHistory
