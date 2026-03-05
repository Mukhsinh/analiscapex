import { useState } from 'react'
import { formatCurrency, parseCurrency } from '../utils/validators'
import { saveRentalAnalysis } from '../lib/database'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

function RentalAnalysisForm({ data, setData, user, currentProjectId }) {
  const [errors, setErrors] = useState({})
  const [saveStatus, setSaveStatus] = useState(null)
  const [pdfGenerating, setPdfGenerating] = useState(false)

  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleCurrencyChange = (field, value) => {
    const numericValue = parseCurrency(value)
    handleChange(field, numericValue)
  }

  const calculateRentalPrice = () => {
    const { purchasePrice, economicLife, residualValue, profitMargin, rentalPeriod } = data
    
    if (!purchasePrice || !economicLife || economicLife === 0) {
      return 0
    }
    
    const residual = residualValue || 0
    const margin = (profitMargin || 0) / 100
    const period = rentalPeriod || 1
    
    // Rumus: ((harga beli * (1 + tingkat keuntungan) * masa sewa) - nilai residu) / masa sewa
    const rentalPrice = ((purchasePrice * (1 + margin) * period) - residual) / period
    
    return rentalPrice
  }

  // Fungsi untuk menghitung PV Factor
  const calculatePVFactor = (rate, year) => {
    return 1 / Math.pow(1 + rate / 100, year)
  }

  // Hitung Present Value dari biaya sewa yang harus dibayar
  const calculatePresentValue = () => {
    const discountRate = data.discountRate || 0
    const rentalPeriod = data.rentalPeriod || 0
    const vendorQuote = data.vendorQuote || 0
    
    if (!vendorQuote || !rentalPeriod || vendorQuote === 0) {
      return 0
    }
    
    let totalPV = 0
    for (let year = 1; year <= rentalPeriod; year++) {
      const pvFactor = calculatePVFactor(discountRate, year)
      const pvExpense = vendorQuote * pvFactor
      totalPV += pvExpense
    }
    
    return totalPV
  }

  const rentalPrice = calculateRentalPrice()
  const totalRevenue = rentalPrice * (data.rentalPeriod || 0)
  const totalCost = (data.purchasePrice || 0) - (data.residualValue || 0)
  const totalProfit = totalRevenue - totalCost
  const presentValueCost = calculatePresentValue()

  // Analisis perbandingan dengan harga penawaran vendor
  const vendorQuote = data.vendorQuote || 0
  const priceDifference = vendorQuote - rentalPrice
  const priceDifferencePercent = rentalPrice > 0 ? ((priceDifference / rentalPrice) * 100) : 0
  
  // Analisis kelayakan berdasarkan perbandingan
  const getFeasibilityAnalysis = () => {
    if (!vendorQuote || vendorQuote === 0) return null
    
    // Logika kelayakan:
    // - LAYAK jika hasil kalkulasi >= penawaran (penawaran lebih rendah atau sama)
    // - TIDAK LAYAK jika hasil kalkulasi < penawaran (penawaran lebih tinggi)
    const isFeasible = rentalPrice >= vendorQuote
    
    if (priceDifferencePercent > 15) {
      return {
        status: 'TIDAK LAYAK - PERLU NEGOSIASI ULANG',
        feasibility: 'TIDAK LAYAK',
        color: 'red',
        icon: '⚠️',
        message: 'Harga penawaran vendor terlalu tinggi (>15% dari kalkulasi). Sangat disarankan untuk negosiasi ulang.',
        recommendation: 'Ajukan negosiasi dengan target harga maksimal ' + formatCurrency(rentalPrice * 1.10) + ' (kalkulasi + 10%)'
      }
    } else if (priceDifferencePercent > 5) {
      return {
        status: 'TIDAK LAYAK - DAPAT DINEGOSIASIKAN',
        feasibility: 'TIDAK LAYAK',
        color: 'yellow',
        icon: '💡',
        message: 'Harga penawaran vendor sedikit lebih tinggi (5-15% dari kalkulasi). Masih dapat dinegosiasikan.',
        recommendation: 'Coba negosiasi untuk mendapatkan harga lebih mendekati ' + formatCurrency(rentalPrice)
      }
    } else if (priceDifferencePercent >= -5) {
      return {
        status: 'LAYAK - HARGA WAJAR',
        feasibility: 'LAYAK',
        color: 'green',
        icon: '✅',
        message: 'Harga penawaran vendor sesuai dengan kalkulasi (±5%). Harga wajar dan dapat diterima.',
        recommendation: 'Harga sudah kompetitif. Dapat melanjutkan ke tahap kontrak.'
      }
    } else if (priceDifferencePercent >= -15) {
      return {
        status: 'LAYAK - HARGA SANGAT BAIK',
        feasibility: 'LAYAK',
        color: 'blue',
        icon: '🎯',
        message: 'Harga penawaran vendor lebih rendah 5-15% dari kalkulasi. Penawaran sangat baik!',
        recommendation: 'Harga sangat kompetitif. Segera lakukan kesepakatan sebelum vendor mengubah penawaran.'
      }
    } else {
      return {
        status: 'LAYAK - HARGA TERLALU RENDAH (PERLU VERIFIKASI)',
        feasibility: 'LAYAK',
        color: 'orange',
        icon: '🔍',
        message: 'Harga penawaran vendor jauh lebih rendah (>15% dari kalkulasi). Perlu verifikasi kualitas layanan.',
        recommendation: 'Pastikan tidak ada hidden cost atau penurunan kualitas layanan. Tinjau detail kontrak dengan teliti.'
      }
    }
  }

  const negotiationAnalysis = getFeasibilityAnalysis()

  const handleSaveAnalysis = async () => {
    if (!user || !user.id) {
      alert('Anda harus login untuk menyimpan analisis')
      return
    }

    if (rentalPrice <= 0) {
      alert('Silakan lengkapi data terlebih dahulu')
      return
    }

    try {
      setSaveStatus('saving')
      
      // Hitung Present Value
      const presentValueCost = calculatePresentValue()
      
      // Analisis kelayakan
      const negotiationAnalysis = getFeasibilityAnalysis()
      
      const calculatedResults = {
        rentalPrice,
        presentValueCost,
        totalRevenue,
        totalCost,
        totalProfit,
        feasibilityStatus: negotiationAnalysis?.feasibility || null,
        priceDifference: vendorQuote ? (vendorQuote - rentalPrice) : null,
        priceDifferencePercent: vendorQuote && rentalPrice > 0 ? (((vendorQuote - rentalPrice) / rentalPrice) * 100) : null
      }

      const { data: savedData, error } = await saveRentalAnalysis(
        user.id,
        currentProjectId,
        data,
        calculatedResults
      )

      if (error) {
        console.error('Error saving rental analysis:', error)
        alert(`Gagal menyimpan analisis: ${error.message || JSON.stringify(error)}`)
        setSaveStatus('error')
      } else {
        console.log('Rental analysis saved successfully:', savedData)
        setSaveStatus('saved')
        
        // Trigger refresh event for history page
        window.dispatchEvent(new Event('refreshRentalHistory'))
        
        setTimeout(() => setSaveStatus(null), 3000)
      }
    } catch (error) {
      console.error('Exception while saving rental analysis:', error)
      alert(`Error saat menyimpan: ${error.message}`)
      setSaveStatus('error')
    } finally {
      setTimeout(() => {
        if (saveStatus !== 'saved') setSaveStatus(null)
      }, 5000)
    }
  }

  const generatePDF = () => {
    if (rentalPrice <= 0) {
      alert('Silakan lengkapi data dan hitung terlebih dahulu')
      return
    }

    try {
      setPdfGenerating(true)
      
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      let yPos = 20

      // Header
      doc.setFillColor(79, 70, 229) // Indigo
      doc.rect(0, 0, pageWidth, 35, 'F')
      
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('LAPORAN ANALISIS HARGA SEWA', pageWidth / 2, 15, { align: 'center' })
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Analisis Perhitungan Harga Sewa Alat Medis', pageWidth / 2, 25, { align: 'center' })

      yPos = 45

      // Informasi Umum
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('I. INFORMASI UMUM', 14, yPos)
      yPos += 10

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      
      const infoData = [
        ['Tanggal Analisis', new Date().toLocaleDateString('id-ID', { 
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        })],
        ['Nama Alat', data.equipmentName || 'Alat Medis'],
        ['Analis', user?.full_name || user?.email || 'User']
      ]

      doc.autoTable({
        startY: yPos,
        head: [],
        body: infoData,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 50 },
          1: { cellWidth: 'auto' }
        }
      })

      yPos = doc.lastAutoTable.finalY + 15

      // Data Input
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('II. DATA INPUT', 14, yPos)
      yPos += 10

      const inputData = [
        ['Harga Beli Alat', formatCurrency(data.purchasePrice || 0)],
        ['Umur Ekonomis Alat', `${data.economicLife || 0} tahun`],
        ['Nilai Residu', formatCurrency(data.residualValue || 0)],
        ['Tingkat Keuntungan Vendor', `${data.profitMargin || 0}%`],
        ['Masa Sewa', `${data.rentalPeriod || 0} tahun`],
        ['Discount Rate', `${data.discountRate || 0}%`]
      ]

      doc.autoTable({
        startY: yPos,
        head: [],
        body: inputData,
        theme: 'striped',
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 70, fillColor: [243, 244, 246] },
          1: { cellWidth: 'auto', halign: 'right' }
        },
        headStyles: { fillColor: [79, 70, 229] }
      })

      yPos = doc.lastAutoTable.finalY + 15

      // Hasil Perhitungan
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('III. HASIL PERHITUNGAN', 14, yPos)
      yPos += 10

      const resultsData = [
        ['Harga Sewa per Tahun (Kalkulasi)', formatCurrency(rentalPrice)],
        ['Present Value Biaya Sewa', formatCurrency(presentValueCost)],
        ['Efisiensi Biaya (PV vs Harga Beli)', presentValueCost > 0 && (data.purchasePrice || 0) > 0 
          ? `${((presentValueCost / (data.purchasePrice || 1)) * 100).toFixed(1)}%` 
          : 'N/A'],
        ['Skor Kelayakan', negotiationAnalysis?.feasibility || 'Belum Ada Data']
      ]

      doc.autoTable({
        startY: yPos,
        head: [],
        body: resultsData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 5, fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 70, fillColor: [219, 234, 254] },
          1: { cellWidth: 'auto', halign: 'right', fillColor: [254, 249, 195] }
        }
      })

      yPos = doc.lastAutoTable.finalY + 15

      // Rumus Perhitungan
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('IV. RUMUS PERHITUNGAN', 14, yPos)
      yPos += 10

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      
      doc.setFillColor(249, 250, 251)
      doc.rect(14, yPos, pageWidth - 28, 25, 'F')
      
      yPos += 7
      doc.setFont('helvetica', 'bold')
      doc.text('Rumus:', 18, yPos)
      yPos += 6
      doc.setFont('helvetica', 'normal')
      doc.text('Harga Sewa = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa) - Nilai Residu) / Masa Sewa', 18, yPos)
      
      yPos += 8
      doc.setFont('helvetica', 'bold')
      doc.text('Perhitungan:', 18, yPos)
      yPos += 6
      doc.setFont('helvetica', 'normal')
      const calculation = `= ((${formatCurrency(data.purchasePrice || 0)} × (1 + ${data.profitMargin || 0}%) × ${data.rentalPeriod || 0}) - ${formatCurrency(data.residualValue || 0)}) / ${data.rentalPeriod || 0} tahun`
      doc.text(calculation, 18, yPos)

      yPos += 15

      // Analisis & Rekomendasi
      if (yPos > pageHeight - 60) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('V. ANALISIS & REKOMENDASI', 14, yPos)
      yPos += 10

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      
      const roi = ((totalProfit / (data.purchasePrice || 1)) * 100).toFixed(2)
      const profitMarginActual = ((totalProfit / totalRevenue) * 100).toFixed(2)
      const efficiencyRatio = presentValueCost > 0 && (data.purchasePrice || 0) > 0 
        ? ((presentValueCost / (data.purchasePrice || 1)) * 100).toFixed(1)
        : 'N/A'
      
      const analysisText = [
        `1. Present Value Biaya Sewa: ${formatCurrency(presentValueCost)}`,
        `   Dengan discount rate ${data.discountRate || 0}%, total biaya sewa dalam nilai sekarang.`,
        '',
        `2. Efisiensi Biaya: ${efficiencyRatio}%`,
        `   Perbandingan PV biaya sewa terhadap harga beli alat.`,
        `   ${efficiencyRatio !== 'N/A' && parseFloat(efficiencyRatio) < 100 
          ? '✓ Sewa lebih efisien dari segi nilai waktu uang (PV < Harga Beli)' 
          : efficiencyRatio !== 'N/A' 
            ? '⚠ Sewa kurang efisien (PV > Harga Beli)' 
            : ''}`,
        '',
        `3. Skor Kelayakan: ${negotiationAnalysis?.feasibility || 'Belum Ada Data'}`,
        `   ${negotiationAnalysis 
          ? `Selisih harga penawaran: ${Math.abs(priceDifferencePercent).toFixed(1)}%` 
          : 'Masukkan harga penawaran vendor untuk analisis kelayakan'}`,
        '',
        'Rekomendasi:',
        presentValueCost > 0 && presentValueCost < (data.purchasePrice || 0)
          ? '• Dari perspektif nilai waktu uang, sewa lebih menguntungkan dibanding beli.'
          : '• Pertimbangkan pembelian langsung jika memungkinkan.',
        negotiationAnalysis?.feasibility === 'LAYAK'
          ? '• Harga penawaran vendor layak diterima berdasarkan kalkulasi.'
          : negotiationAnalysis?.feasibility === 'TIDAK LAYAK'
            ? '• Harga penawaran vendor tidak layak, perlu negosiasi ulang.'
            : '• Lakukan perbandingan dengan beberapa vendor untuk mendapat harga terbaik.',
        '• Pertimbangkan kondisi pasar dan kompetitor dalam penetapan harga final.',
        '• Lakukan evaluasi berkala terhadap biaya operasional dan pemeliharaan.'
      ]

      analysisText.forEach(line => {
        if (yPos > pageHeight - 20) {
          doc.addPage()
          yPos = 20
        }
        doc.text(line, 18, yPos)
        yPos += 6
      })

      // Analisis Perbandingan Harga Penawaran
      if (data.vendorQuote && data.vendorQuote > 0) {
        yPos += 5
        
        if (yPos > pageHeight - 80) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('VI. ANALISIS PERBANDINGAN HARGA PENAWARAN', 14, yPos)
        yPos += 10

        const vendorQuote = data.vendorQuote
        const priceDiff = vendorQuote - rentalPrice
        const priceDiffPercent = ((priceDiff / rentalPrice) * 100).toFixed(2)

        // Tabel Perbandingan
        const comparisonData = [
          ['Harga Kalkulasi', formatCurrency(rentalPrice)],
          ['Harga Penawaran Vendor', formatCurrency(vendorQuote)],
          ['Selisih', `${formatCurrency(Math.abs(priceDiff))} (${priceDiffPercent}%)`]
        ]

        doc.autoTable({
          startY: yPos,
          head: [],
          body: comparisonData,
          theme: 'grid',
          styles: { fontSize: 10, cellPadding: 4 },
          columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 70, fillColor: [243, 244, 246] },
            1: { cellWidth: 'auto', halign: 'right', fillColor: [254, 249, 195] }
          }
        })

        yPos = doc.lastAutoTable.finalY + 10

        // Status Kelayakan dan Negosiasi
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        
        let statusColor, statusText, statusBg, feasibilityText, feasibilityColor
        if (priceDiffPercent > 15) {
          statusColor = [220, 38, 38] // red
          statusBg = [254, 226, 226]
          statusText = 'TIDAK LAYAK - PERLU NEGOSIASI ULANG'
          feasibilityText = 'TIDAK LAYAK'
          feasibilityColor = [220, 38, 38]
        } else if (priceDiffPercent > 5) {
          statusColor = [202, 138, 4] // yellow
          statusBg = [254, 249, 195]
          statusText = 'TIDAK LAYAK - DAPAT DINEGOSIASIKAN'
          feasibilityText = 'TIDAK LAYAK'
          feasibilityColor = [202, 138, 4]
        } else if (priceDiffPercent >= -5) {
          statusColor = [22, 163, 74] // green
          statusBg = [220, 252, 231]
          statusText = 'LAYAK - HARGA WAJAR'
          feasibilityText = 'LAYAK'
          feasibilityColor = [22, 163, 74]
        } else if (priceDiffPercent >= -15) {
          statusColor = [37, 99, 235] // blue
          statusBg = [219, 234, 254]
          statusText = 'LAYAK - HARGA SANGAT BAIK'
          feasibilityText = 'LAYAK'
          feasibilityColor = [37, 99, 235]
        } else {
          statusColor = [234, 88, 12] // orange
          statusBg = [255, 237, 213]
          statusText = 'LAYAK - HARGA TERLALU RENDAH (PERLU VERIFIKASI)'
          feasibilityText = 'LAYAK'
          feasibilityColor = [234, 88, 12]
        }

        // Box untuk status kelayakan
        doc.setFillColor(...statusBg)
        doc.rect(14, yPos - 3, pageWidth - 28, 15, 'F')
        
        // Status utama
        doc.setTextColor(...statusColor)
        doc.text(`Status: ${statusText}`, 18, yPos + 3)
        
        // Badge kelayakan
        yPos += 8
        doc.setFontSize(9)
        doc.setFillColor(...feasibilityColor)
        doc.roundedRect(18, yPos - 3, 25, 6, 1, 1, 'F')
        doc.setTextColor(255, 255, 255)
        doc.text(feasibilityText, 20, yPos + 1)
        
        yPos += 8
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')

        // Penjelasan logika kelayakan
        doc.setFillColor(249, 250, 251)
        doc.rect(14, yPos, pageWidth - 28, 18, 'F')
        yPos += 5
        doc.setFont('helvetica', 'bold')
        doc.text('Logika Kelayakan:', 18, yPos)
        yPos += 5
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.text('• LAYAK: Harga kalkulasi ≥ harga penawaran (penawaran lebih rendah atau sama)', 18, yPos)
        yPos += 4
        doc.text('• TIDAK LAYAK: Harga kalkulasi < harga penawaran (penawaran lebih tinggi)', 18, yPos)
        
        yPos += 10
        doc.setFontSize(10)

        // Rekomendasi Negosiasi
        const negotiationRec = []
        if (priceDiffPercent > 15) {
          negotiationRec.push(
            'Kesimpulan:',
            '• Status Kelayakan: TIDAK LAYAK',
            '• Harga penawaran vendor terlalu tinggi (>15% dari kalkulasi).',
            '• Sangat disarankan untuk melakukan negosiasi ulang.',
            '',
            'Rekomendasi Tindakan:',
            `• Target negosiasi: maksimal ${formatCurrency(rentalPrice * 1.10)} (kalkulasi + 10%)`,
            '• Minta breakdown detail biaya dari vendor.',
            '• Bandingkan dengan penawaran vendor lain jika memungkinkan.'
          )
        } else if (priceDiffPercent > 5) {
          negotiationRec.push(
            'Kesimpulan:',
            '• Status Kelayakan: TIDAK LAYAK',
            '• Harga penawaran vendor sedikit lebih tinggi (5-15% dari kalkulasi).',
            '• Masih dalam range wajar namun dapat dinegosiasikan.',
            '',
            'Rekomendasi Tindakan:',
            `• Coba negosiasi untuk mendekati harga ${formatCurrency(rentalPrice)}`,
            '• Tanyakan kemungkinan diskon atau benefit tambahan.',
            '• Pertimbangkan value-added services yang ditawarkan.'
          )
        } else if (priceDiffPercent >= -5) {
          negotiationRec.push(
            'Kesimpulan:',
            '• Status Kelayakan: LAYAK',
            '• Harga penawaran vendor sesuai dengan kalkulasi (±5%).',
            '• Harga wajar dan dapat diterima.',
            '',
            'Rekomendasi Tindakan:',
            '• Harga sudah kompetitif, dapat melanjutkan ke tahap kontrak.',
            '• Pastikan semua terms & conditions sudah sesuai.',
            '• Review SLA dan support yang disediakan.'
          )
        } else if (priceDiffPercent >= -15) {
          negotiationRec.push(
            'Kesimpulan:',
            '• Status Kelayakan: LAYAK',
            '• Harga penawaran vendor lebih rendah 5-15% dari kalkulasi.',
            '• Penawaran sangat baik dan kompetitif!',
            '',
            'Rekomendasi Tindakan:',
            '• Segera lakukan kesepakatan sebelum vendor mengubah penawaran.',
            '• Pastikan tidak ada hidden cost atau biaya tambahan.',
            '• Verifikasi kualitas alat dan layanan yang ditawarkan.'
          )
        } else {
          negotiationRec.push(
            'Kesimpulan:',
            '• Status Kelayakan: LAYAK (dengan catatan)',
            '• Harga penawaran vendor jauh lebih rendah (>15% dari kalkulasi).',
            '• Perlu verifikasi detail untuk memastikan tidak ada trade-off kualitas.',
            '',
            'Rekomendasi Tindakan:',
            '• Tinjau detail kontrak dengan sangat teliti.',
            '• Pastikan tidak ada hidden cost atau biaya tersembunyi.',
            '• Verifikasi kualitas alat, spesifikasi, dan layanan support.',
            '• Cek reputasi dan track record vendor.'
          )
        }

        negotiationRec.forEach(line => {
          if (yPos > pageHeight - 20) {
            doc.addPage()
            yPos = 20
          }
          if (line.startsWith('•')) {
            doc.text(line, 22, yPos)
          } else {
            if (line === 'Kesimpulan:' || line === 'Rekomendasi Tindakan:') {
              doc.setFont('helvetica', 'bold')
            }
            doc.text(line, 18, yPos)
            doc.setFont('helvetica', 'normal')
          }
          yPos += line === '' ? 3 : 6
        })
      }

      // Footer
      const footerY = pageHeight - 15
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text('© Copyright Mukhsin Hadi - Capex Analyzer Professional Edition', pageWidth / 2, footerY, { align: 'center' })
      doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, pageWidth / 2, footerY + 4, { align: 'center' })

      // Save PDF
      const fileName = `Laporan_Analisis_Sewa_${new Date().getTime()}.pdf`
      doc.save(fileName)
      
      setPdfGenerating(false)
      alert('PDF berhasil diunduh!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Gagal membuat PDF: ' + error.message)
      setPdfGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Deskripsi:</h3>
            <p className="text-sm text-blue-700 mb-2">
              Analisis untuk menentukan kelayakan harga sewa yang harus dibayar kepada vendor. 
              Perhitungan menggunakan konsep <strong>Present Value (PV)</strong> untuk menilai biaya sewa dalam nilai waktu uang.
            </p>
            <div className="bg-blue-100 rounded p-2 mt-2">
              <p className="text-xs text-blue-800 font-semibold mb-1">💡 Konsep Present Value:</p>
              <p className="text-xs text-blue-700">
                PV menghitung nilai sekarang dari biaya sewa yang akan dibayar di masa depan dengan mempertimbangkan 
                discount rate. Ini membantu membandingkan apakah lebih baik menyewa atau membeli alat.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Alat
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={data.equipmentName || ''}
            onChange={(e) => handleChange('equipmentName', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.equipmentName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: CT Scan 64 Slice"
          />
          {errors.equipmentName && (
            <p className="mt-1 text-sm text-red-600">{errors.equipmentName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Harga Beli Alat (Rp)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={formatCurrency(data.purchasePrice || 0)}
            onChange={(e) => handleCurrencyChange('purchasePrice', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: 1.300.000.000"
          />
          {errors.purchasePrice && (
            <p className="mt-1 text-sm text-red-600">{errors.purchasePrice}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Umur Ekonomis Alat (tahun)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={data.economicLife || ''}
            onChange={(e) => handleChange('economicLife', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.economicLife ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: 5"
            min="1"
          />
          {errors.economicLife && (
            <p className="mt-1 text-sm text-red-600">{errors.economicLife}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nilai Residu (Rp)
          </label>
          <input
            type="text"
            value={formatCurrency(data.residualValue || 0)}
            onChange={(e) => handleCurrencyChange('residualValue', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Contoh: 130.000.000"
          />
          <p className="mt-1 text-xs text-gray-500">Nilai alat di akhir umur ekonomis</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tingkat Keuntungan Vendor (%)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={data.profitMargin || ''}
            onChange={(e) => handleChange('profitMargin', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.profitMargin ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: 20"
            min="0"
            step="0.1"
          />
          {errors.profitMargin && (
            <p className="mt-1 text-sm text-red-600">{errors.profitMargin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Masa Sewa (tahun)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={data.rentalPeriod || ''}
            onChange={(e) => handleChange('rentalPeriod', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.rentalPeriod ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: 3"
            min="1"
          />
          {errors.rentalPeriod && (
            <p className="mt-1 text-sm text-red-600">{errors.rentalPeriod}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Discount Rate / Tingkat Diskonto (%)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={data.discountRate || ''}
            onChange={(e) => handleChange('discountRate', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Contoh: 10"
            min="0"
            step="0.1"
          />
          <p className="mt-1 text-xs text-gray-500">Tingkat diskonto untuk menghitung Present Value biaya sewa</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Discount Rate / Tingkat Diskonto (%)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={data.discountRate || ''}
            onChange={(e) => handleChange('discountRate', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.discountRate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: 10"
            min="0"
            step="0.1"
          />
          {errors.discountRate && (
            <p className="mt-1 text-sm text-red-600">{errors.discountRate}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Untuk menghitung Present Value biaya sewa</p>
        </div>

        <div className="md:col-span-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-lg p-5 shadow-md">
          <div className="flex items-start mb-3">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <label className="block text-base font-bold text-gray-800 mb-1">
                💰 Harga Penawaran SEWA dari Vendor (Rp/tahun)
                <span className="text-blue-600 ml-2 text-sm font-normal">(Opsional)</span>
              </label>
              <div className="bg-orange-100 border-l-4 border-orange-500 p-2 rounded mb-2">
                <p className="text-xs text-orange-800 font-semibold">
                  ⚠️ PENTING: Ini adalah harga SEWA per tahun yang ditawarkan vendor, BUKAN harga beli alat!
                </p>
              </div>
            </div>
          </div>
          <input
            type="text"
            value={formatCurrency(data.vendorQuote || 0)}
            onChange={(e) => handleCurrencyChange('vendorQuote', e.target.value)}
            className="w-full px-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-lg font-semibold"
            placeholder="Contoh: 350.000.000 (harga SEWA per tahun dari vendor)"
          />
          <div className="mt-3 bg-white rounded-lg p-3 border border-orange-200">
            <p className="text-xs text-gray-700 mb-2">
              <strong>💡 Untuk apa field ini?</strong>
            </p>
            <ul className="text-xs text-gray-600 space-y-1 ml-4">
              <li>• Membandingkan harga kalkulasi Anda dengan penawaran vendor</li>
              <li>• Menentukan apakah penawaran <strong className="text-green-600">LAYAK</strong> atau <strong className="text-red-600">TIDAK LAYAK</strong></li>
              <li>• Mendapatkan rekomendasi negosiasi yang spesifik</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hasil Perhitungan */}
      {rentalPrice > 0 && (
        <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Hasil Perhitungan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Harga Sewa per Tahun (Kalkulasi)</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(rentalPrice)}</p>
              <p className="text-xs text-gray-500 mt-1">Hasil perhitungan optimal</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Present Value Biaya Sewa</p>
              <p className="text-2xl font-bold text-purple-700">{formatCurrency(presentValueCost)}</p>
              <p className="text-xs text-gray-500 mt-1">Total PV dengan discount {data.discountRate || 0}%</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Feasibility Score</p>
              <p className={`text-2xl font-bold ${
                !negotiationAnalysis ? 'text-gray-400' :
                priceDifferencePercent <= -15 ? 'text-orange-600' :
                priceDifferencePercent <= -5 ? 'text-blue-600' :
                priceDifferencePercent <= 5 ? 'text-green-600' :
                priceDifferencePercent <= 15 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {!negotiationAnalysis ? 'N/A' :
                  priceDifferencePercent <= -15 ? 'A+ (Verifikasi)' :
                  priceDifferencePercent <= -5 ? 'A (Sangat Baik)' :
                  priceDifferencePercent <= 5 ? 'B (Wajar)' :
                  priceDifferencePercent <= 15 ? 'C (Negosiasi)' :
                  'D (Tidak Layak)'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {negotiationAnalysis ? `Selisih: ${Math.abs(priceDifferencePercent).toFixed(1)}%` : 'Masukkan harga penawaran'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Savings Potential</p>
              <p className={`text-2xl font-bold ${
                !negotiationAnalysis ? 'text-gray-400' :
                priceDifference < 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {!negotiationAnalysis ? 'N/A' :
                  formatCurrency(Math.abs(priceDifference * (data.rentalPeriod || 0)))}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {!negotiationAnalysis ? 'Perbandingan dengan penawaran' :
                  priceDifference < 0 ? 'Potensi penghematan total' : 'Potensi biaya tambahan'}
              </p>
            </div>
          </div>

          {/* Bagian ini dihapus karena sudah ada di bawah dengan negotiationAnalysis */}

          <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-2">Rumus Perhitungan:</p>
            <p className="text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded">
              Harga Sewa = ((Harga Beli × (1 + Tingkat Keuntungan) × Masa Sewa) - Nilai Residu) / Masa Sewa
            </p>
            <p className="text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded mt-2">
              = (({formatCurrency(data.purchasePrice || 0)} × (1 + {data.profitMargin || 0}%) × {data.rentalPeriod || 0}) - {formatCurrency(data.residualValue || 0)}) / {data.rentalPeriod || 0} tahun
            </p>
          </div>

          {/* Analisis Perbandingan Harga Penawaran */}
          {negotiationAnalysis && (
            <div className={`mt-4 rounded-lg p-5 border-2 ${
              negotiationAnalysis.color === 'red' ? 'bg-red-50 border-red-300' :
              negotiationAnalysis.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
              negotiationAnalysis.color === 'green' ? 'bg-green-50 border-green-300' :
              negotiationAnalysis.color === 'blue' ? 'bg-blue-50 border-blue-300' :
              'bg-orange-50 border-orange-300'
            }`}>
              <div className="flex items-start mb-3">
                <span className="text-3xl mr-3">{negotiationAnalysis.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`text-lg font-bold ${
                      negotiationAnalysis.color === 'red' ? 'text-red-800' :
                      negotiationAnalysis.color === 'yellow' ? 'text-yellow-800' :
                      negotiationAnalysis.color === 'green' ? 'text-green-800' :
                      negotiationAnalysis.color === 'blue' ? 'text-blue-800' :
                      'text-orange-800'
                    }`}>
                      {negotiationAnalysis.status}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      negotiationAnalysis.feasibility === 'LAYAK' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {negotiationAnalysis.feasibility}
                    </span>
                  </div>
                  <p className={`text-sm mb-2 ${
                    negotiationAnalysis.color === 'red' ? 'text-red-700' :
                    negotiationAnalysis.color === 'yellow' ? 'text-yellow-700' :
                    negotiationAnalysis.color === 'green' ? 'text-green-700' :
                    negotiationAnalysis.color === 'blue' ? 'text-blue-700' :
                    'text-orange-700'
                  }`}>
                    {negotiationAnalysis.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-600 mb-1">Harga Kalkulasi</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(rentalPrice)}</p>
                  <p className="text-xs text-gray-500 mt-1">Hasil perhitungan</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-600 mb-1">Harga Penawaran Vendor</p>
                  <p className="text-lg font-bold text-indigo-700">{formatCurrency(vendorQuote)}</p>
                  <p className="text-xs text-gray-500 mt-1">Penawaran yang diterima</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-600 mb-1">Selisih</p>
                  <p className={`text-lg font-bold ${priceDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {priceDifference > 0 ? '+' : ''}{formatCurrency(Math.abs(priceDifference))}
                    <span className="text-sm ml-1">({Math.abs(priceDifferencePercent).toFixed(1)}%)</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {priceDifference > 0 ? 'Penawaran lebih tinggi' : 'Penawaran lebih rendah'}
                  </p>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${
                negotiationAnalysis.color === 'red' ? 'bg-red-100' :
                negotiationAnalysis.color === 'yellow' ? 'bg-yellow-100' :
                negotiationAnalysis.color === 'green' ? 'bg-green-100' :
                negotiationAnalysis.color === 'blue' ? 'bg-blue-100' :
                'bg-orange-100'
              }`}>
                <p className="text-xs font-semibold text-gray-700 mb-1">💡 Rekomendasi:</p>
                <p className={`text-sm ${
                  negotiationAnalysis.color === 'red' ? 'text-red-800' :
                  negotiationAnalysis.color === 'yellow' ? 'text-yellow-800' :
                  negotiationAnalysis.color === 'green' ? 'text-green-800' :
                  negotiationAnalysis.color === 'blue' ? 'text-blue-800' :
                  'text-orange-800'
                }`}>
                  {negotiationAnalysis.recommendation}
                </p>
              </div>

              {/* Penjelasan Logika Kelayakan */}
              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">📊 Logika Kelayakan:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <span className="font-semibold text-green-700">LAYAK</span>: Harga kalkulasi ≥ harga penawaran (penawaran lebih rendah atau sama)</li>
                  <li>• <span className="font-semibold text-red-700">TIDAK LAYAK</span>: Harga kalkulasi &lt; harga penawaran (penawaran lebih tinggi)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleSaveAnalysis}
              disabled={saveStatus === 'saving'}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saveStatus === 'saving' ? (
                <>
                  <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Simpan Analisis
                </>
              )}
            </button>

            <button
              onClick={generatePDF}
              disabled={pdfGenerating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {pdfGenerating ? (
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

          {saveStatus === 'saved' && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-700 text-sm font-medium">Analisis berhasil disimpan ke database</span>
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-red-700 text-sm font-medium">Gagal menyimpan ke database</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RentalAnalysisForm
