import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2'
import { formatNumber } from '../utils/calculations'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend)

function AnalyticsReport({ results, projectInfo }) {
  const { leasing, purchase, revenueShare } = results
  
  // Calculate scores (0-100)
  const alternatives = [
    { name: 'Leasing', pv: leasing.totalPV },
    { name: 'Purchase', pv: purchase.totalPV },
    { name: 'Revenue Share', pv: revenueShare.totalPV }
  ]
  
  const maxPV = Math.max(...alternatives.map(a => a.pv))
  const minPV = Math.min(...alternatives.map(a => a.pv))
  
  const scores = alternatives.map(alt => ({
    name: alt.name,
    score: Math.round(100 - ((alt.pv - minPV) / (maxPV - minPV)) * 100)
  }))

  // Trend Chart Data
  const trendData = {
    labels: leasing.yearlyData.map(d => `Tahun ${d.year}`),
    datasets: [
      {
        label: 'Leasing',
        data: leasing.yearlyData.map(d => d.pvExpense),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Purchase',
        data: purchase.yearlyData.filter(d => !d.type).map(d => d.pvExpense),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'Revenue Share',
        data: revenueShare.yearlyData.map(d => d.pvExpense),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4
      }
    ]
  }

  // Score Doughnut
  const scoreData = {
    labels: scores.map(s => s.name),
    datasets: [{
      data: scores.map(s => s.score),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  // Radar Chart for comparison
  const radarData = {
    labels: ['Biaya Rendah', 'Fleksibilitas', 'Kepemilikan', 'Cash Flow', 'Risiko Rendah'],
    datasets: [
      {
        label: 'Leasing',
        data: [85, 90, 20, 80, 85],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)'
      },
      {
        label: 'Purchase',
        data: [70, 60, 100, 50, 70],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        pointBackgroundColor: 'rgb(34, 197, 94)'
      },
      {
        label: 'Revenue Share',
        data: [revenueShare.isProfit ? 90 : 30, 95, 0, 100, revenueShare.isProfit ? 80 : 40],
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderColor: 'rgb(168, 85, 247)',
        pointBackgroundColor: 'rgb(168, 85, 247)'
      }
    ]
  }

  const downloadPDF = async () => {
    // Simplified PDF download - just print for now
    window.print()
  }

  return (
    <div id="analytics-report" className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Laporan Analisis & Grafik</h2>
            <p className="text-blue-100">{projectInfo.hospitalName}</p>
            <p className="text-sm text-blue-200">{projectInfo.equipmentName} - {projectInfo.department}</p>
          </div>
          <button
            onClick={downloadPDF}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scores.map((item, index) => {
          const colors = ['blue', 'green', 'purple']
          const color = colors[index]
          return (
            <div key={item.name} className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500`}>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">{item.name}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      Score
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold text-${color}-600`}>
                      {item.score}
                    </span>
                    <span className="text-sm text-gray-500">/100</span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${item.score}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500 transition-all duration-500`}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {item.score >= 80 ? '🏆 Sangat Baik' : item.score >= 60 ? '✅ Baik' : item.score >= 40 ? '⚠️ Cukup' : '❌ Kurang Baik'}
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Trend PV Expense per Tahun</h3>
          <Line 
            data={trendData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                title: { display: false }
              },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'PV Expense (juta Rp)' } }
              }
            }}
          />
        </div>

        {/* Score Doughnut */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Perbandingan Score</h3>
          <Doughnut 
            data={scoreData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                title: { display: false }
              }
            }}
          />
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Analisis Multi-Kriteria</h3>
          <Radar 
            data={radarData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' }
              },
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Ringkasan Statistik</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Total PV Terendah</p>
            <p className="text-2xl font-bold text-blue-600">{formatNumber(Math.min(leasing.totalPV, purchase.totalPV, revenueShare.totalPV))} jt</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Selisih Min-Max</p>
            <p className="text-2xl font-bold text-green-600">{formatNumber(maxPV - minPV)} jt</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Rata-rata PV</p>
            <p className="text-2xl font-bold text-purple-600">{formatNumber((leasing.totalPV + purchase.totalPV + revenueShare.totalPV) / 3)} jt</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Periode Analisis</p>
            <p className="text-2xl font-bold text-yellow-600">{leasing.yearlyData.length} tahun</p>
          </div>
        </div>
      </div>

      {/* Recommendation Box */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-300">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Rekomendasi Final</h3>
            <p className="text-lg text-gray-700 mb-4">
              Berdasarkan analisis Present Value dan scoring multi-kriteria, alternatif terbaik adalah:
            </p>
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-2xl font-bold text-green-700 mb-2">
                🏆 {scores.sort((a, b) => b.score - a.score)[0].name}
              </p>
              <p className="text-gray-600">
                Score: <span className="font-bold text-green-600">{scores.sort((a, b) => b.score - a.score)[0].score}/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        <p>{projectInfo.copyright}</p>
        <p className="mt-1">Generated on {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
      </div>
    </div>
  )
}

export default AnalyticsReport
