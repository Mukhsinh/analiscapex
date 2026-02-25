import { useState, useEffect } from 'react'
import { getUserAnalyses, deleteAnalysisResult } from '../lib/database'

function AnalysisHistory({ user }) {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)

  const loadAnalyses = async () => {
    if (!user || !user.id) return

    try {
      setLoading(true)
      const { data, error } = await getUserAnalyses(user.id, 50)
      
      if (error) throw error
      
      setAnalyses(data || [])
    } catch (err) {
      console.error('Error loading analyses:', err)
      setError('Gagal memuat riwayat analisis')
    } finally {
      setLoading(false)
    }
  }

  // Reload analyses when user changes or component mounts
  useEffect(() => {
    loadAnalyses()
  }, [user])

  // Add event listener for custom refresh event
  useEffect(() => {
    const handleRefresh = () => {
      console.log('Received refresh event, reloading analyses...')
      loadAnalyses()
    }

    window.addEventListener('refreshAnalysisHistory', handleRefresh)
    
    return () => {
      window.removeEventListener('refreshAnalysisHistory', handleRefresh)
    }
  }, [user])

  const handleDelete = async (analysisId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus analisis ini?')) return

    try {
      const { error } = await deleteAnalysisResult(analysisId)
      if (error) throw error
      
      // Reload analyses
      await loadAnalyses()
    } catch (err) {
      console.error('Error deleting analysis:', err)
      alert('Gagal menghapus analisis')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getAnalysisTypeLabel = (type) => {
    const labels = {
      leasing: 'Leasing',
      purchase: 'Borrow & Purchase',
      revenueShare: 'Revenue Sharing'
    }
    return labels[type] || type
  }

  const getAnalysisTypeColor = (type) => {
    const colors = {
      leasing: 'bg-blue-100 text-blue-800',
      purchase: 'bg-green-100 text-green-800',
      revenueShare: 'bg-purple-100 text-purple-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg className="animate-spin w-12 h-12 mx-auto text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-600">Memuat riwayat analisis...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{error}</h3>
        <button
          onClick={loadAnalyses}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
        <p className="text-gray-500">Hasil analisis Anda akan tersimpan di sini</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Riwayat Analisis</h2>
            <p className="text-gray-600">Total {analyses.length} analisis tersimpan</p>
          </div>
          <button
            onClick={loadAnalyses}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Analysis List */}
      <div className="grid gap-4">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAnalysisTypeColor(analysis.analysis_type)}`}>
                    {getAnalysisTypeLabel(analysis.analysis_type)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(analysis.created_at)}
                  </span>
                </div>

                {analysis.projects && (
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {analysis.projects.equipment_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {analysis.projects.hospital_name} - {analysis.projects.department}
                    </p>
                  </div>
                )}

                {analysis.results && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Total PV</p>
                      <p className="text-lg font-bold text-gray-800">
                        Rp {(analysis.results.totalPV || 0).toLocaleString('id-ID')} juta
                      </p>
                    </div>
                    {analysis.results.totalCost && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Total Cost</p>
                        <p className="text-lg font-bold text-gray-800">
                          Rp {(analysis.results.totalCost || 0).toLocaleString('id-ID')} juta
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-2 ml-4">
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

            {/* Expanded Details */}
            {selectedAnalysis?.id === analysis.id && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Detail Input Data
                </h4>
                
                {analysis.input_data && (
                  <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {analysis.input_data.initialCost && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-600 font-semibold mb-1">Initial Cost</p>
                          <p className="text-lg font-bold text-blue-900">
                            Rp {(analysis.input_data.initialCost || 0).toLocaleString('id-ID')}
                          </p>
                        </div>
                      )}
                      
                      {analysis.input_data.rsShare !== undefined && (
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <p className="text-xs text-purple-600 font-semibold mb-1">RS Share</p>
                          <p className="text-lg font-bold text-purple-900">
                            {analysis.input_data.rsShare}%
                          </p>
                        </div>
                      )}
                      
                      {analysis.input_data.taxRate !== undefined && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <p className="text-xs text-green-600 font-semibold mb-1">Tax Rate</p>
                          <p className="text-lg font-bold text-green-900">
                            {analysis.input_data.taxRate}%
                          </p>
                        </div>
                      )}
                      
                      {analysis.input_data.leasePeriod && (
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <p className="text-xs text-orange-600 font-semibold mb-1">Lease Period</p>
                          <p className="text-lg font-bold text-orange-900">
                            {analysis.input_data.leasePeriod} tahun
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Procedures Table */}
                    {analysis.input_data.procedures && analysis.input_data.procedures.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
                          <h5 className="font-semibold text-white flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Daftar Prosedur ({analysis.input_data.procedures.length})
                          </h5>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Prosedur</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Tarif (Rp)</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Volume</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {analysis.input_data.procedures.map((proc, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{proc.name || '-'}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">
                                    {(proc.tariff || 0).toLocaleString('id-ID')}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                    {(proc.volume || 0).toLocaleString('id-ID')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Additional Parameters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Leasing Specific */}
                      {analysis.analysis_type === 'leasing' && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Parameter Leasing
                          </h5>
                          <div className="space-y-2 text-sm">
                            {analysis.input_data.annualPayment && (
                              <div className="flex justify-between">
                                <span className="text-blue-700">Annual Payment:</span>
                                <span className="font-semibold text-blue-900">
                                  Rp {(analysis.input_data.annualPayment || 0).toLocaleString('id-ID')}
                                </span>
                              </div>
                            )}
                            {analysis.input_data.leasePeriod && (
                              <div className="flex justify-between">
                                <span className="text-blue-700">Periode:</span>
                                <span className="font-semibold text-blue-900">
                                  {analysis.input_data.leasePeriod} tahun
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Purchase Specific */}
                      {analysis.analysis_type === 'purchase' && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Parameter Purchase
                          </h5>
                          <div className="space-y-2 text-sm">
                            {analysis.input_data.interestRate !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-green-700">Interest Rate:</span>
                                <span className="font-semibold text-green-900">
                                  {analysis.input_data.interestRate}%
                                </span>
                              </div>
                            )}
                            {analysis.input_data.loanPeriod && (
                              <div className="flex justify-between">
                                <span className="text-green-700">Loan Period:</span>
                                <span className="font-semibold text-green-900">
                                  {analysis.input_data.loanPeriod} tahun
                                </span>
                              </div>
                            )}
                            {analysis.input_data.maintenanceCost && (
                              <div className="flex justify-between">
                                <span className="text-green-700">Maintenance Cost:</span>
                                <span className="font-semibold text-green-900">
                                  Rp {(analysis.input_data.maintenanceCost || 0).toLocaleString('id-ID')}
                                </span>
                              </div>
                            )}
                            {analysis.input_data.tradeInValue && (
                              <div className="flex justify-between">
                                <span className="text-green-700">Trade-in Value:</span>
                                <span className="font-semibold text-green-900">
                                  Rp {(analysis.input_data.tradeInValue || 0).toLocaleString('id-ID')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Revenue Share Specific */}
                      {analysis.analysis_type === 'revenueShare' && (
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h5 className="font-semibold text-purple-900 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Parameter Revenue Share
                          </h5>
                          <div className="space-y-2 text-sm">
                            {analysis.input_data.rsShare !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-purple-700">RS Share:</span>
                                <span className="font-semibold text-purple-900">
                                  {analysis.input_data.rsShare}%
                                </span>
                              </div>
                            )}
                            {analysis.input_data.directOverhead && (
                              <div className="flex justify-between">
                                <span className="text-purple-700">Direct Overhead:</span>
                                <span className="font-semibold text-purple-900">
                                  Rp {(analysis.input_data.directOverhead || 0).toLocaleString('id-ID')}
                                </span>
                              </div>
                            )}
                            {analysis.input_data.allocatedOverhead && (
                              <div className="flex justify-between">
                                <span className="text-purple-700">Allocated Overhead:</span>
                                <span className="font-semibold text-purple-900">
                                  Rp {(analysis.input_data.allocatedOverhead || 0).toLocaleString('id-ID')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Results Summary */}
                      {analysis.results && (
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-300">
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Hasil Analisis
                          </h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Total PV:</span>
                              <span className="font-bold text-gray-900">
                                Rp {(analysis.results.totalPV || 0).toLocaleString('id-ID')} juta
                              </span>
                            </div>
                            {analysis.results.totalCost && (
                              <div className="flex justify-between">
                                <span className="text-gray-700">Total Cost:</span>
                                <span className="font-bold text-gray-900">
                                  Rp {(analysis.results.totalCost || 0).toLocaleString('id-ID')} juta
                                </span>
                              </div>
                            )}
                            {analysis.results.isProfit !== undefined && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-700">Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  analysis.results.isProfit 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {analysis.results.isProfit ? '✓ Profit' : '✗ Loss'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalysisHistory
