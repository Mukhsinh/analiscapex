import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

function RentalAnalysis({ user }) {
  const [formData, setFormData] = useState({
    equipmentName: '',
    purchasePrice: '',
    economicLife: '',
    residualValue: '',
    vendorProfitRate: '',
    rentalPeriod: ''
  })

  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadHistory()
    }
  }, [user])

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('rental_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (!error && data) {
        setHistory(data)
      }
    } catch (error) {
      console.error('Error loading history:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const calculateRental = async () => {
    // Validate inputs
    if (!formData.equipmentName || !formData.purchasePrice || !formData.economicLife || 
        !formData.residualValue || !formData.vendorProfitRate || !formData.rentalPeriod) {
      alert('Mohon lengkapi semua field')
      return
    }

    const purchasePrice = parseFloat(formData.purchasePrice)
    const economicLife = parseInt(formData.economicLife)
    const residualValue = parseFloat(formData.residualValue)
    const vendorProfitRate = parseFloat(formData.vendorProfitRate) / 100
    const rentalPeriod = parseInt(formData.rentalPeriod)

    // Formula: ((harga beli * (1 + tingkat keuntungan)) - nilai residu) / masa sewa
    const annualRentalPrice = ((purchasePrice * (1 + vendorProfitRate)) - residualValue) / rentalPeriod
    const monthlyRentalPrice = annualRentalPrice / 12
    const totalRentalRevenue = annualRentalPrice * rentalPeriod

    const calculatedResult = {
      annualRentalPrice,
      monthlyRentalPrice,
      totalRentalRevenue,
      totalInvestment: purchasePrice * (1 + vendorProfitRate),
      netProfit: totalRentalRevenue - purchasePrice,
      roi: ((totalRentalRevenue - purchasePrice) / purchasePrice) * 100
    }

    setResult(calculatedResult)

    // Save to database
    if (user) {
      setLoading(true)
      setSaveStatus('saving')
      
      try {
        const { data, error } = await supabase
          .from('rental_analysis')
          .insert([{
            user_id: user.id,
            equipment_name: formData.equipmentName,
            purchase_price: purchasePrice,
            economic_life: economicLife,
            residual_value: residualValue,
            vendor_profit_rate: parseFloat(formData.vendorProfitRate),
            rental_period: rentalPeriod,
            annual_rental_price: annualRentalPrice,
            monthly_rental_price: monthlyRentalPrice,
            total_rental_revenue: totalRentalRevenue
          }])
          .select()

        if (error) {
          console.error('Error saving:', error)
          setSaveStatus('error')
        } else {
          setSaveStatus('saved')
          loadHistory()
        }
      } catch (error) {
        console.error('Exception:', error)
        setSaveStatus('error')
      } finally {
        setLoading(false)
        setTimeout(() => setSaveStatus(null), 3000)
      }
    }
  }

  const deleteAnalysis = async (id) => {
    if (!confirm('Yakin ingin menghapus analisis ini?')) return

    try {
      const { error } = await supabase
        .from('rental_analysis')
        .delete()
        .eq('id', id)

      if (!error) {
        loadHistory()
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const generatePDFReport = async () => {
    if (!result || !formData.equipmentName) {
      alert('Mohon lakukan perhitungan terlebih dahulu')
      return
    }

    setPdfLoading(true)

    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = 210
      const pageHeight = 297
      let yPos = 20

      // Header
      pdf.setFillColor(79, 70, 229) // Indigo
      pdf.rect(0, 0, pageWidth, 40, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('LAPORAN ANALISIS HARGA SEWA', pageWidth / 2, 20, { align: 'center' })
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Analisis Perhitungan Harga Sewa Alat Medis', pageWidth / 2, 30, { align: 'center' })

      yPos = 50

      // Info Dokumen
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Tanggal: ${new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}`, 15, yPos)
      pdf.text(`User: ${user?.email || 'N/A'}`, 15, yPos + 5)
      
      yPos += 15

      // Section 1: Data Input
      pdf.setFillColor(243, 244, 246)
      pdf.rect(15, yPos, pageWidth - 30, 8, 'F')
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(31, 41, 55)
      pdf.text('1. DATA INPUT', 20, yPos + 5.5)
      
      yPos += 12

      const inputData = [
        ['Nama Alat', formData.equipmentName],
        ['Harga Beli Alat', formatCurrency(parseFloat(formData.purchasePrice))],
        ['Umur Ekonomis', `${formData.economicLife} tahun`],
        ['Nilai Residu', formatCurrency(parseFloat(formData.residualValue))],
        ['Tingkat Keuntungan Vendor', `${formData.vendorProfitRate}%`],
        ['Masa Sewa', `${formData.rentalPeriod} tahun`]
      ]

      autoTable(pdf, {
        startY: yPos,
        head: [['Parameter', 'Nilai']],
        body: inputData,
        theme: 'grid',
        headStyles: {
          fillColor: [79, 70, 229],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9
        },
        columnStyles: {
          0: { cellWidth: 70, fontStyle: 'bold' },
          1: { cellWidth: 110 }
        },
        margin: { left: 15, right: 15 }
      })

      yPos = pdf.lastAutoTable.finalY + 10

      // Section 2: Hasil Perhitungan
      pdf.setFillColor(243, 244, 246)
      pdf.rect(15, yPos, pageWidth - 30, 8, 'F')
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('2. HASIL PERHITUNGAN', 20, yPos + 5.5)
      
      yPos += 12

      const resultData = [
        ['Harga Sewa per Tahun', formatCurrency(result.annualRentalPrice)],
        ['Harga Sewa per Bulan', formatCurrency(result.monthlyRentalPrice)],
        ['Total Pendapatan Sewa', formatCurrency(result.totalRentalRevenue)],
        ['Total Investasi', formatCurrency(result.totalInvestment)],
        ['Keuntungan Bersih', formatCurrency(result.netProfit)],
        ['Return on Investment (ROI)', `${result.roi.toFixed(2)}%`]
      ]

      autoTable(pdf, {
        startY: yPos,
        head: [['Indikator', 'Nilai']],
        body: resultData,
        theme: 'grid',
        headStyles: {
          fillColor: [16, 185, 129],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9
        },
        columnStyles: {
          0: { cellWidth: 70, fontStyle: 'bold' },
          1: { cellWidth: 110, halign: 'right' }
        },
        margin: { left: 15, right: 15 }
      })

      yPos = pdf.lastAutoTable.finalY + 10

      // Section 3: Rumus Perhitungan
      pdf.setFillColor(243, 244, 246)
      pdf.rect(15, yPos, pageWidth - 30, 8, 'F')
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('3. RUMUS PERHITUNGAN', 20, yPos + 5.5)
      
      yPos += 12

      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Harga Sewa Tahunan = ((Harga Beli × (1 + Tingkat Keuntungan)) - Nilai Residu) / Masa Sewa', 20, yPos)
      
      yPos += 8
      
      const purchasePrice = parseFloat(formData.purchasePrice)
      const profitRate = parseFloat(formData.vendorProfitRate) / 100
      const residualValue = parseFloat(formData.residualValue)
      const rentalPeriod = parseInt(formData.rentalPeriod)
      
      pdf.setFont('courier', 'normal')
      pdf.text(`= ((${formatCurrency(purchasePrice)} × (1 + ${formData.vendorProfitRate}%)) - ${formatCurrency(residualValue)}) / ${rentalPeriod}`, 20, yPos)
      yPos += 5
      pdf.text(`= ((${formatCurrency(purchasePrice)} × ${(1 + profitRate).toFixed(2)}) - ${formatCurrency(residualValue)}) / ${rentalPeriod}`, 20, yPos)
      yPos += 5
      pdf.text(`= (${formatCurrency(purchasePrice * (1 + profitRate))} - ${formatCurrency(residualValue)}) / ${rentalPeriod}`, 20, yPos)
      yPos += 5
      pdf.text(`= ${formatCurrency((purchasePrice * (1 + profitRate)) - residualValue)} / ${rentalPeriod}`, 20, yPos)
      yPos += 5
      pdf.setFont('courier', 'bold')
      pdf.text(`= ${formatCurrency(result.annualRentalPrice)}`, 20, yPos)

      yPos += 15

      // Section 4: Kesimpulan
      if (yPos > pageHeight - 60) {
        pdf.addPage()
        yPos = 20
      }

      pdf.setFillColor(243, 244, 246)
      pdf.rect(15, yPos, pageWidth - 30, 8, 'F')
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('4. KESIMPULAN', 20, yPos + 5.5)
      
      yPos += 12

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      const conclusionText = [
        `Berdasarkan analisis perhitungan harga sewa untuk ${formData.equipmentName}, dengan`,
        `harga beli sebesar ${formatCurrency(purchasePrice)} dan tingkat keuntungan vendor`,
        `${formData.vendorProfitRate}%, maka harga sewa yang optimal adalah:`,
        '',
        `• Harga Sewa per Tahun: ${formatCurrency(result.annualRentalPrice)}`,
        `• Harga Sewa per Bulan: ${formatCurrency(result.monthlyRentalPrice)}`,
        '',
        `Dengan masa sewa ${rentalPeriod} tahun, total pendapatan yang akan diperoleh adalah`,
        `${formatCurrency(result.totalRentalRevenue)} dengan keuntungan bersih sebesar`,
        `${formatCurrency(result.netProfit)} (ROI: ${result.roi.toFixed(2)}%).`
      ]

      conclusionText.forEach(line => {
        pdf.text(line, 20, yPos)
        yPos += 5
      })

      // Footer
      const footerY = pageHeight - 20
      pdf.setFontSize(8)
      pdf.setTextColor(128, 128, 128)
      pdf.text('Dokumen ini dibuat secara otomatis oleh Capex Analyzer', pageWidth / 2, footerY, { align: 'center' })
      pdf.text(`© ${new Date().getFullYear()} Capex Analyzer - Professional Edition`, pageWidth / 2, footerY + 4, { align: 'center' })

      // Save PDF
      const fileName = `Laporan_Analisis_Sewa_${formData.equipmentName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)

      alert('PDF berhasil diunduh!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Gagal membuat PDF: ' + error.message)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Analisa Harga Sewa Alat</h2>
        <p className="text-purple-100">Hitung harga sewa optimal untuk alat yang akan disewakan</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Data Input</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Alat
            </label>
            <input
              type="text"
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: CT Scan 64 Slice"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga Beli Alat (Rp)
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: 5000000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Umur Ekonomis Alat (Tahun)
            </label>
            <input
              type="number"
              name="economicLife"
              value={formData.economicLife}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: 10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nilai Residu (Rp)
            </label>
            <input
              type="number"
              name="residualValue"
              value={formData.residualValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: 500000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Keuntungan Vendor (%)
            </label>
            <input
              type="number"
              name="vendorProfitRate"
              value={formData.vendorProfitRate}
              onChange={handleInputChange}
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: 15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Masa Sewa (Tahun)
            </label>
            <input
              type="number"
              name="rentalPeriod"
              value={formData.rentalPeriod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: 5"
            />
          </div>
        </div>

        <button
          onClick={calculateRental}
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Hitung Harga Sewa'}
        </button>

        {saveStatus === 'saved' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-700 text-sm font-medium">Analisis berhasil disimpan</span>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Hasil Perhitungan</h3>
            <button
              onClick={generatePDFReport}
              disabled={pdfLoading}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pdfLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Membuat PDF...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Unduh PDF
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600 font-medium mb-1">Harga Sewa per Tahun</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(result.annualRentalPrice)}</p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="text-sm text-indigo-600 font-medium mb-1">Harga Sewa per Bulan</p>
              <p className="text-2xl font-bold text-indigo-900">{formatCurrency(result.monthlyRentalPrice)}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Total Pendapatan Sewa</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.totalRentalRevenue)}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium mb-1">ROI</p>
              <p className="text-2xl font-bold text-green-900">{result.roi.toFixed(2)}%</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Rumus Perhitungan:</h4>
            <p className="text-sm text-gray-600 font-mono">
              Harga Sewa Tahunan = ((Harga Beli × (1 + Tingkat Keuntungan)) - Nilai Residu) / Masa Sewa
            </p>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Riwayat Analisis</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Alat</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Harga Beli</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Sewa/Tahun</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Sewa/Bulan</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.equipment_name}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      {formatCurrency(item.purchase_price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-purple-600">
                      {formatCurrency(item.annual_rental_price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      {formatCurrency(item.monthly_rental_price)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => deleteAnalysis(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default RentalAnalysis
