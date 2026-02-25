import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { formatCurrency, formatNumber } from '../utils/calculations'
import ExportButtons from './ExportButtons'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

function ResultsComparison({ results, projectInfo }) {
  const { leasing, purchase, revenueShare } = results
  
  // Determine ranking
  const alternatives = [
    { name: 'Leasing', pv: leasing.totalPV, color: 'bg-blue-500' },
    { name: 'Borrow & Purchase', pv: purchase.totalPV, color: 'bg-green-500' },
    { name: 'Revenue Sharing', pv: revenueShare.totalPV, color: 'bg-purple-500' }
  ].sort((a, b) => a.pv - b.pv)
  
  // Chart data for comparison
  const comparisonData = {
    labels: ['Leasing', 'Borrow & Purchase', 'Revenue Sharing'],
    datasets: [{
      label: 'Total PV Expense (juta Rp)',
      data: [leasing.totalPV, purchase.totalPV, revenueShare.totalPV],
      backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(34, 197, 94, 0.8)', 'rgba(168, 85, 247, 0.8)'],
      borderColor: ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(168, 85, 247)'],
      borderWidth: 2
    }]
  }
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Perbandingan Total PV Expense', font: { size: 16 } }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Juta Rupiah' } }
    }
  }

  return (
    <div className="space-y-6">
      {/* Print Header - Only visible when printing */}
      <div className="print-header">
        <h1>ANALISIS KEPUTUSAN CAPEX</h1>
        <div className="subtitle">{projectInfo.hospitalName}</div>
        <div className="subtitle">{projectInfo.equipmentName} - {projectInfo.department}</div>
        <div className="date">Tanggal: {new Date().toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
        <div className="date">{projectInfo.copyright}</div>
      </div>

      {/* Export Buttons */}
      <ExportButtons results={results} projectInfo={projectInfo} />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 avoid-break">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Leasing</h3>
          <p className="text-3xl font-bold text-blue-600">{formatNumber(leasing.totalPV)} jt</p>
          <p className="text-sm text-gray-500 mt-2">Total PV Expense</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Borrow & Purchase</h3>
          <p className="text-3xl font-bold text-green-600">{formatNumber(purchase.totalPV)} jt</p>
          <p className="text-sm text-gray-500 mt-2">Total PV Expense</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue Sharing</h3>
          <p className="text-3xl font-bold text-purple-600">{formatNumber(revenueShare.totalPV)} jt</p>
          <p className="text-sm text-gray-500 mt-2">Total PV Expense</p>
          {!revenueShare.isProfit && (
            <p className="text-xs text-red-600 mt-1">⚠️ Menghasilkan kerugian</p>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6 avoid-break">
        <Bar data={comparisonData} options={chartOptions} />
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-2 border-green-300 recommendation avoid-break">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Rekomendasi Keputusan</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🥇</span>
            <div>
              <p className="font-bold text-lg text-green-700">{alternatives[0].name}</p>
              <p className="text-sm text-gray-600">
                Total PV Expense: <span className="font-semibold">{formatNumber(alternatives[0].pv)} juta Rp</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-green-600">
            <p className="text-gray-700 mb-3">
              <strong>KESIMPULAN:</strong>
            </p>
            <p className="text-gray-700 mb-2">
              Karena total PV Expense dari <strong className="text-blue-700">{alternatives[0].name}</strong> lebih kecil 
              dari total PV Expense dari alternatif lainnya, maka keputusan yang paling tepat adalah menggunakan 
              tawaran <strong className="text-green-700 uppercase">{alternatives[0].name}</strong>.
            </p>
            {alternatives[0].name === 'Leasing' && (
              <p className="text-gray-700 mt-2">
                Sedangkan kalau untuk KSO berarti pada akhir kontrak tidak ada transfer kepemilikan atas aset, 
                sehingga sebenarnya Leasing adalah sama dengan KSO. Oleh karenanya KSO atau (Operating) Leasing 
                lebih menguntungkan daripada Pembelian dengan didanai dengan Utang.
              </p>
            )}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm font-semibold text-blue-900 mb-2">Perbandingan Alternatif:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              {alternatives.map((alt, idx) => (
                <li key={idx}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} {alt.name}: {formatNumber(alt.pv)} juta Rp
                  {idx > 0 && ` (selisih: ${formatNumber(alt.pv - alternatives[0].pv)} juta Rp atau ${formatNumber((alt.pv - alternatives[0].pv) / alternatives[0].pv * 100)}%)`}
                </li>
              ))}
            </ul>
          </div>
          
          {!revenueShare.isProfit && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-800 mb-2">
                <strong>⚠️ Catatan Penting tentang Revenue Sharing:</strong>
              </p>
              <p className="text-sm text-red-800">
                Sedangkan untuk tawaran Revenue Sharing ternyata besarnya Biaya Overhead (Langsung dan Alokasian) 
                telah menghabiskan akumulasi marjin tahunan sehingga hasil porsi yang diperoleh RS tidak mencukupi, 
                dan menyebabkan Negative EAT (Negative Earning After Tax) yang setelah di-nilai-tunai-kan (present value) 
                justru menghasilkan PV Expense yang tertinggi dari ketiga tawaran yang ada.
              </p>
            </div>
          )}

          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="text-sm text-gray-700">
              <strong>💡 Catatan:</strong> Akurasi analisis keputusan investasi ini dapat ditingkatkan dengan 
              menggunakan analisis berbasis produk yang lebih rinci.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="space-y-6">
        {/* Leasing Detail */}
        <div className="bg-white rounded-lg shadow-lg p-6 avoid-break">
          <h3 className="text-xl font-bold text-blue-600 mb-4">📋 Tawaran dengan Leasing (dalam jutaan Rupiah)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-2 text-left border">Tahun</th>
                  <th className="p-2 text-right border">Lease Payment</th>
                  <th className="p-2 text-right border">PV Factor at {leasing.yearlyData[0] ? (1/(1+leasing.yearlyData[0].pvFactor)*100-100).toFixed(0) : '10'}%</th>
                  <th className="p-2 text-right border">PV Expense</th>
                </tr>
              </thead>
              <tbody>
                {leasing.yearlyData.map((row) => (
                  <tr key={row.year} className="border-b hover:bg-blue-50">
                    <td className="p-2 border">{row.year}</td>
                    <td className="p-2 text-right border">{formatNumber(row.leasePayment)}</td>
                    <td className="p-2 text-right border">{formatNumber(row.pvFactor, 6)}</td>
                    <td className="p-2 text-right font-semibold border">{formatNumber(row.pvExpense)}</td>
                  </tr>
                ))}
                <tr className="bg-blue-100 font-bold">
                  <td colSpan="3" className="p-2 border text-right">TOTAL</td>
                  <td className="p-2 text-right border">{formatNumber(leasing.totalPV)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Detail */}
        <div className="bg-white rounded-lg shadow-lg p-6 avoid-break">
          <h3 className="text-xl font-bold text-green-600 mb-4">📋 Tawaran dengan Borrow & Purchase (dalam jutaan Rupiah)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-2 text-left border">Tahun</th>
                  <th className="p-2 text-right border">Principal Payment</th>
                  <th className="p-2 text-right border">Interest Payment</th>
                  <th className="p-2 text-right border">Maintenance Expense</th>
                  <th className="p-2 text-right border">Total Expense</th>
                  <th className="p-2 text-right border">PV Factor at {purchase.yearlyData[0] ? (1/(1+purchase.yearlyData[0].pvFactor)*100-100).toFixed(0) : '10'}%</th>
                  <th className="p-2 text-right border">PV Expense</th>
                </tr>
              </thead>
              <tbody>
                {purchase.yearlyData.filter(row => !row.type).map((row) => (
                  <tr key={row.year} className="border-b hover:bg-green-50">
                    <td className="p-2 border">{row.year}</td>
                    <td className="p-2 text-right border">{formatNumber(row.principalPayment)}</td>
                    <td className="p-2 text-right border">{formatNumber(row.interestPayment)}</td>
                    <td className="p-2 text-right border">{formatNumber(row.maintenanceExpense)}</td>
                    <td className="p-2 text-right border">{formatNumber(row.totalExpense)}</td>
                    <td className="p-2 text-right border">{formatNumber(row.pvFactor, 6)}</td>
                    <td className="p-2 text-right font-semibold border">{formatNumber(row.pvExpense)}</td>
                  </tr>
                ))}
                <tr className="border-b bg-yellow-50">
                  <td className="p-2 border">{purchase.yearlyData[purchase.yearlyData.length-1].year}</td>
                  <td className="p-2 border" colSpan="4">Trade-in ({formatNumber(Math.abs(purchase.yearlyData[purchase.yearlyData.length-1].tradeInValue))})</td>
                  <td className="p-2 text-right border">{formatNumber(purchase.yearlyData[purchase.yearlyData.length-1].pvFactor, 6)}</td>
                  <td className="p-2 text-right font-semibold text-green-600 border">
                    {formatNumber(purchase.yearlyData[purchase.yearlyData.length-1].pvExpense)}
                  </td>
                </tr>
                <tr className="bg-green-100 font-bold">
                  <td colSpan="6" className="p-2 border text-right">TOTAL</td>
                  <td className="p-2 text-right border">{formatNumber(purchase.totalPV)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Revenue Share Detail */}
      <div className="bg-white rounded-lg shadow-lg p-6 avoid-break">
        <h3 className="text-xl font-bold text-purple-600 mb-4">📋 Tawaran Revenue Sharing</h3>
        
        {/* Summary Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <p className="text-sm text-gray-600">Pendapatan Tahunan RS</p>
            <p className="text-xl font-bold text-purple-700">{formatNumber(revenueShare.annualRevenue)} juta</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <p className="text-sm text-gray-600">Laba Operasi</p>
            <p className={`text-xl font-bold ${revenueShare.operatingProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatNumber(revenueShare.operatingProfit)} juta
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <p className="text-sm text-gray-600">{revenueShare.eat < 0 ? 'Proyeksi Negative EAT' : 'EAT (Earning After Tax)'}</p>
            <p className={`text-xl font-bold ${revenueShare.eat < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatNumber(Math.abs(revenueShare.eat))} juta
            </p>
          </div>
        </div>

        {/* Breakdown Procedures */}
        {revenueShare.procedures && revenueShare.procedures.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">Rincian Pendapatan per Pemeriksaan:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 text-left border">Pemeriksaan</th>
                    <th className="p-2 text-right border">Tarif (Rp)</th>
                    <th className="p-2 text-right border">Volume/Tahun</th>
                    <th className="p-2 text-right border">Porsi RS</th>
                    <th className="p-2 text-right border">Pendapatan (juta)</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueShare.procedures.map((proc, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-100">
                      <td className="p-2 border">{proc.name}</td>
                      <td className="p-2 text-right border">{formatCurrency(proc.tariff)}</td>
                      <td className="p-2 text-right border">{formatNumber(proc.volume, 0)}</td>
                      <td className="p-2 text-right border">{proc.rsShare || revenueShare.yearlyData[0]?.rsShare || '-'}%</td>
                      <td className="p-2 text-right font-semibold border">{formatNumber(proc.annualRevenue)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-200 font-bold">
                    <td colSpan="4" className="p-2 border text-right">TOTAL PENDAPATAN</td>
                    <td className="p-2 text-right border">{formatNumber(revenueShare.annualRevenue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Yearly Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-purple-50">
              <tr>
                <th className="p-2 text-left border">Tahun</th>
                <th className="p-2 text-right border">{revenueShare.eat < 0 ? 'PROYEKSI NEGATIVE EAT' : 'EAT'}</th>
                <th className="p-2 text-right border">PV Factor at {revenueShare.yearlyData[0] ? (1/(1+revenueShare.yearlyData[0].pvFactor)*100-100).toFixed(0) : '10'}%</th>
                <th className="p-2 text-right border">PV Expense</th>
              </tr>
            </thead>
            <tbody>
              {revenueShare.yearlyData.map((row) => (
                <tr key={row.year} className="border-b hover:bg-purple-50">
                  <td className="p-2 border">{row.year}</td>
                  <td className={`p-2 text-right border ${row.eat < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatNumber(Math.abs(row.eat))}
                  </td>
                  <td className="p-2 text-right border">{formatNumber(row.pvFactor, 6)}</td>
                  <td className="p-2 text-right font-semibold border">{formatNumber(row.pvExpense)}</td>
                </tr>
              ))}
              <tr className="bg-purple-100 font-bold">
                <td colSpan="3" className="p-2 border text-right">TOTAL</td>
                <td className="p-2 text-right border">{formatNumber(revenueShare.totalPV)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Overhead Breakdown */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Rincian Biaya Overhead (per tahun):</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-gray-600">Overhead Langsung:</p>
              <p className="font-semibold">{formatNumber(revenueShare.yearlyData[0].directOverhead)} juta</p>
            </div>
            <div>
              <p className="text-gray-600">Overhead Alokasi:</p>
              <p className="font-semibold">{formatNumber(revenueShare.yearlyData[0].allocatedOverhead)} juta</p>
            </div>
            <div>
              <p className="text-gray-600">Total Overhead:</p>
              <p className="font-semibold text-red-600">
                {formatNumber(revenueShare.yearlyData[0].directOverhead + revenueShare.yearlyData[0].allocatedOverhead)} juta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Footer - Only visible when printing */}
      <div className="print-footer">
        <p>Dokumen ini dihasilkan secara otomatis oleh Capex Analyzer Professional Edition</p>
        <p>{projectInfo.copyright} | {projectInfo.hospitalName}</p>
        <p>Dicetak pada: {new Date().toLocaleString('id-ID')}</p>
      </div>
    </div>
  )
}

export default ResultsComparison
