import { formatNumber } from '../utils/calculations'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'

function ExportButtons({ results, projectInfo }) {
  const exportToExcel = () => {
    if (!results) return
    
    try {
      const { leasing, purchase, revenueShare } = results
      
      // Create workbook
      const wb = XLSX.utils.book_new()
      
      // Sheet 1: Ringkasan
      const summaryData = [
        ['ANALISIS KEPUTUSAN CAPEX'],
        [projectInfo.hospitalName],
        [`${projectInfo.equipmentName} - ${projectInfo.department}`],
        [`Tanggal: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`],
        [projectInfo.copyright],
        [],
        ['RINGKASAN PERBANDINGAN'],
        ['Alternatif', 'Total PV Expense (juta Rp)'],
        ['Leasing', leasing.totalPV],
        ['Borrow & Purchase', purchase.totalPV],
        ['Revenue Sharing', revenueShare.totalPV],
        [],
        ['REKOMENDASI'],
        ['Alternatif Terbaik:', results.recommendation.best],
        ['Selisih dengan Alternatif Terburuk:', `Rp ${formatNumber(results.recommendation.difference)} juta`]
      ]
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryData)
      wsSummary['!cols'] = [{ wch: 30 }, { wch: 25 }]
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Ringkasan')
      
      // Sheet 2: Detail Leasing
      const leasingData = [
        ['DETAIL LEASING'],
        [],
        ['Tahun', 'Pembayaran (juta Rp)', 'PV Factor', 'PV Expense (juta Rp)']
      ]
      leasing.yearlyData.forEach(row => {
        leasingData.push([row.year, row.payment, row.pvFactor, row.pvExpense])
      })
      leasingData.push(['TOTAL', '', '', leasing.totalPV])
      const wsLeasing = XLSX.utils.aoa_to_sheet(leasingData)
      wsLeasing['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 20 }]
      XLSX.utils.book_append_sheet(wb, wsLeasing, 'Leasing')
      
      // Sheet 3: Detail Purchase
      const purchaseData = [
        ['DETAIL BORROW & PURCHASE'],
        [],
        ['Tahun', 'Principal (juta Rp)', 'Interest (juta Rp)', 'Maintenance (juta Rp)', 'Total Expense (juta Rp)', 'PV Factor', 'PV Expense (juta Rp)']
      ]
      purchase.yearlyData.filter(row => !row.type).forEach(row => {
        purchaseData.push([row.year, row.principal, row.interest, row.maintenance, row.totalExpense, row.pvFactor, row.pvExpense])
      })
      purchaseData.push(['Trade-in', '', '', '', '', '', -purchase.tradeInPV])
      purchaseData.push(['TOTAL', '', '', '', '', '', purchase.totalPV])
      const wsPurchase = XLSX.utils.aoa_to_sheet(purchaseData)
      wsPurchase['!cols'] = [{ wch: 10 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 20 }, { wch: 15 }, { wch: 20 }]
      XLSX.utils.book_append_sheet(wb, wsPurchase, 'Borrow & Purchase')
      
      // Sheet 4: Detail Revenue Sharing
      const revenueData = [
        ['DETAIL REVENUE SHARING'],
        [],
        ['Tahun', 'Revenue (juta Rp)', 'Direct Overhead (juta Rp)', 'Allocated Overhead (juta Rp)', 'Operating Profit (juta Rp)', 'EAT (juta Rp)', 'PV Factor', 'PV Expense (juta Rp)']
      ]
      revenueShare.yearlyData.forEach(row => {
        revenueData.push([row.year, row.revenue, row.directOverhead, row.allocatedOverhead, row.operatingProfit, row.eat, row.pvFactor, row.pvExpense])
      })
      revenueData.push(['TOTAL', '', '', '', '', '', '', revenueShare.totalPV])
      const wsRevenue = XLSX.utils.aoa_to_sheet(revenueData)
      wsRevenue['!cols'] = [{ wch: 10 }, { wch: 18 }, { wch: 20 }, { wch: 22 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }]
      XLSX.utils.book_append_sheet(wb, wsRevenue, 'Revenue Sharing')
      
      // Download file
      XLSX.writeFile(wb, `Analisis-Capex-${new Date().toISOString().split('T')[0]}.xlsx`)
      
      console.log('Excel file downloaded successfully')
    } catch (error) {
      console.error('Error exporting to Excel:', error)
      alert('Terjadi kesalahan saat mengunduh file Excel. Silakan coba lagi.')
    }
  }
  
  const exportToPDF = async () => {
    try {
      // Create loading indicator
      const loadingDiv = document.createElement('div')
      loadingDiv.id = 'pdf-loading'
      loadingDiv.innerHTML = '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:30px;border-radius:12px;box-shadow:0 8px 16px rgba(0,0,0,0.2);z-index:9999;text-align:center;"><div style="width:40px;height:40px;border:4px solid #f3f3f3;border-top:4px solid #3b82f6;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 15px;"></div><p style="margin:0;font-size:16px;color:#374151;font-weight:600;">Membuat PDF Komprehensif...</p><p style="margin:5px 0 0;font-size:12px;color:#6b7280;">Mohon tunggu sebentar</p></div><style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>'
      document.body.appendChild(loadingDiv)
      
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Create PDF with professional settings
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - (2 * margin)
      
      // ===== HALAMAN 1: COVER & RINGKASAN =====
      
      // Header dengan background biru
      pdf.setFillColor(37, 99, 235) // Blue-600
      pdf.rect(0, 0, pageWidth, 50, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(22)
      pdf.setFont(undefined, 'bold')
      pdf.text('LAPORAN ANALISIS KEPUTUSAN CAPEX', pageWidth / 2, 20, { align: 'center' })
      
      pdf.setFontSize(14)
      pdf.setFont(undefined, 'normal')
      pdf.text(projectInfo.hospitalName, pageWidth / 2, 30, { align: 'center' })
      
      pdf.setFontSize(11)
      pdf.text(`${projectInfo.equipmentName} - ${projectInfo.department}`, pageWidth / 2, 38, { align: 'center' })
      
      pdf.setTextColor(0, 0, 0)
      let yPos = 65
      
      // Info Box
      pdf.setFillColor(239, 246, 255) // Blue-50
      pdf.setDrawColor(147, 197, 253) // Blue-300
      pdf.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'FD')
      
      pdf.setFontSize(10)
      pdf.setTextColor(55, 65, 81)
      pdf.text(`Tanggal Laporan: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, margin + 5, yPos + 8)
      pdf.text(`Periode Analisis: ${results.leasing.yearlyData.length} Tahun`, margin + 5, yPos + 15)
      pdf.text(`Discount Rate: ${projectInfo.discountRate || 'N/A'}%`, margin + 5, yPos + 22)
      
      yPos += 35
      
      // Section: Ringkasan Perbandingan
      pdf.setFontSize(16)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(30, 64, 175) // Blue-800
      pdf.text('1. RINGKASAN PERBANDINGAN', margin, yPos)
      yPos += 10
      
      // Tabel Ringkasan dengan autoTable
      const summaryTableData = [
        ['Leasing', formatNumber(results.leasing.totalPV), results.leasing.totalPV === Math.min(results.leasing.totalPV, results.purchase.totalPV, results.revenueShare.totalPV) ? '✓ Terbaik' : ''],
        ['Borrow & Purchase', formatNumber(results.purchase.totalPV), results.purchase.totalPV === Math.min(results.leasing.totalPV, results.purchase.totalPV, results.revenueShare.totalPV) ? '✓ Terbaik' : ''],
        ['Revenue Sharing', formatNumber(results.revenueShare.totalPV), results.revenueShare.totalPV === Math.min(results.leasing.totalPV, results.purchase.totalPV, results.revenueShare.totalPV) ? '✓ Terbaik' : '']
      ]
      
      pdf.autoTable({
        startY: yPos,
        head: [['Alternatif', 'Total PV Expense (juta Rp)', 'Status']],
        body: summaryTableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [37, 99, 235],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 11,
          halign: 'center'
        },
        bodyStyles: { 
          fontSize: 10,
          textColor: [55, 65, 81]
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold' },
          1: { cellWidth: 70, halign: 'right' },
          2: { cellWidth: 40, halign: 'center', textColor: [21, 128, 61], fontStyle: 'bold' }
        },
        margin: { left: margin, right: margin }
      })
      
      yPos = pdf.lastAutoTable.finalY + 15
      
      // Statistik Komparatif
      pdf.setFontSize(12)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(30, 64, 175)
      pdf.text('Statistik Komparatif:', margin, yPos)
      yPos += 8
      
      const minPV = Math.min(results.leasing.totalPV, results.purchase.totalPV, results.revenueShare.totalPV)
      const maxPV = Math.max(results.leasing.totalPV, results.purchase.totalPV, results.revenueShare.totalPV)
      const avgPV = (results.leasing.totalPV + results.purchase.totalPV + results.revenueShare.totalPV) / 3
      
      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(55, 65, 81)
      pdf.text(`• Total PV Terendah: Rp ${formatNumber(minPV)} juta`, margin + 5, yPos)
      yPos += 6
      pdf.text(`• Total PV Tertinggi: Rp ${formatNumber(maxPV)} juta`, margin + 5, yPos)
      yPos += 6
      pdf.text(`• Rata-rata PV: Rp ${formatNumber(avgPV)} juta`, margin + 5, yPos)
      yPos += 6
      pdf.text(`• Selisih Min-Max: Rp ${formatNumber(maxPV - minPV)} juta (${((maxPV - minPV) / minPV * 100).toFixed(2)}%)`, margin + 5, yPos)
      yPos += 12
      
      // Rekomendasi Box
      pdf.setFillColor(240, 253, 244) // Green-50
      pdf.setDrawColor(34, 197, 94) // Green-500
      pdf.setLineWidth(1)
      pdf.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'FD')
      
      pdf.setFontSize(14)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(21, 128, 61) // Green-700
      pdf.text('🏆 REKOMENDASI', margin + 5, yPos + 10)
      
      pdf.setFontSize(11)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(22, 101, 52)
      pdf.text(`Alternatif Terbaik: ${results.recommendation.best}`, margin + 5, yPos + 18)
      pdf.text(`Penghematan: Rp ${formatNumber(results.recommendation.difference)} juta dibanding alternatif terburuk`, margin + 5, yPos + 25)
      
      // ===== HALAMAN 2: DETAIL LEASING =====
      pdf.addPage()
      yPos = margin
      
      pdf.setFontSize(16)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(30, 64, 175)
      pdf.text('2. DETAIL ANALISIS LEASING', margin, yPos)
      yPos += 10
      
      // Tabel Detail Leasing
      const leasingTableData = results.leasing.yearlyData.map(row => [
        row.year,
        formatNumber(row.payment),
        row.pvFactor.toFixed(4),
        formatNumber(row.pvExpense)
      ])
      
      pdf.autoTable({
        startY: yPos,
        head: [['Tahun', 'Pembayaran (juta Rp)', 'PV Factor', 'PV Expense (juta Rp)']],
        body: leasingTableData,
        foot: [['TOTAL', '', '', formatNumber(results.leasing.totalPV)]],
        theme: 'striped',
        headStyles: { 
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
          halign: 'center'
        },
        bodyStyles: { 
          fontSize: 9,
          textColor: [55, 65, 81]
        },
        footStyles: {
          fillColor: [219, 234, 254],
          textColor: [30, 64, 175],
          fontStyle: 'bold',
          fontSize: 10
        },
        columnStyles: {
          0: { cellWidth: 25, halign: 'center' },
          1: { cellWidth: 50, halign: 'right' },
          2: { cellWidth: 35, halign: 'center' },
          3: { cellWidth: 50, halign: 'right', fontStyle: 'bold' }
        },
        margin: { left: margin, right: margin },
        alternateRowStyles: { fillColor: [249, 250, 251] }
      })
      
      // ===== HALAMAN 3: DETAIL PURCHASE =====
      pdf.addPage()
      yPos = margin
      
      pdf.setFontSize(16)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(30, 64, 175)
      pdf.text('3. DETAIL ANALISIS BORROW & PURCHASE', margin, yPos)
      yPos += 10
      
      // Tabel Detail Purchase
      const purchaseTableData = results.purchase.yearlyData
        .filter(row => !row.type)
        .map(row => [
          row.year,
          formatNumber(row.principal),
          formatNumber(row.interest),
          formatNumber(row.maintenance),
          formatNumber(row.totalExpense),
          row.pvFactor.toFixed(4),
          formatNumber(row.pvExpense)
        ])
      
      pdf.autoTable({
        startY: yPos,
        head: [['Tahun', 'Principal', 'Interest', 'Maintenance', 'Total Expense', 'PV Factor', 'PV Expense']],
        body: purchaseTableData,
        foot: [
          ['Trade-in Value', '', '', '', '', '', formatNumber(-results.purchase.tradeInPV)],
          ['TOTAL NET PV', '', '', '', '', '', formatNumber(results.purchase.totalPV)]
        ],
        theme: 'striped',
        headStyles: { 
          fillColor: [34, 197, 94],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9,
          halign: 'center'
        },
        bodyStyles: { 
          fontSize: 8,
          textColor: [55, 65, 81]
        },
        footStyles: {
          fillColor: [220, 252, 231],
          textColor: [21, 128, 61],
          fontStyle: 'bold',
          fontSize: 9
        },
        columnStyles: {
          0: { cellWidth: 20, halign: 'center' },
          1: { cellWidth: 25, halign: 'right', fontSize: 8 },
          2: { cellWidth: 25, halign: 'right', fontSize: 8 },
          3: { cellWidth: 25, halign: 'right', fontSize: 8 },
          4: { cellWidth: 28, halign: 'right', fontSize: 8 },
          5: { cellWidth: 22, halign: 'center', fontSize: 8 },
          6: { cellWidth: 25, halign: 'right', fontStyle: 'bold', fontSize: 8 }
        },
        margin: { left: margin, right: margin },
        alternateRowStyles: { fillColor: [249, 250, 251] }
      })
      
      // ===== HALAMAN 4: DETAIL REVENUE SHARING =====
      pdf.addPage()
      yPos = margin
      
      pdf.setFontSize(16)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(30, 64, 175)
      pdf.text('4. DETAIL ANALISIS REVENUE SHARING', margin, yPos)
      yPos += 10
      
      // Tabel Detail Revenue Sharing
      const revenueTableData = results.revenueShare.yearlyData.map(row => [
        row.year,
        formatNumber(row.revenue),
        formatNumber(row.directOverhead),
        formatNumber(row.allocatedOverhead),
        formatNumber(row.operatingProfit),
        formatNumber(row.eat),
        row.pvFactor.toFixed(4),
        formatNumber(row.pvExpense)
      ])
      
      pdf.autoTable({
        startY: yPos,
        head: [['Thn', 'Revenue', 'Direct OH', 'Alloc OH', 'Op. Profit', 'EAT', 'PV Factor', 'PV Expense']],
        body: revenueTableData,
        foot: [['TOTAL', '', '', '', '', '', '', formatNumber(results.revenueShare.totalPV)]],
        theme: 'striped',
        headStyles: { 
          fillColor: [168, 85, 247],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'center'
        },
        bodyStyles: { 
          fontSize: 7,
          textColor: [55, 65, 81]
        },
        footStyles: {
          fillColor: [243, 232, 255],
          textColor: [107, 33, 168],
          fontStyle: 'bold',
          fontSize: 8
        },
        columnStyles: {
          0: { cellWidth: 15, halign: 'center' },
          1: { cellWidth: 22, halign: 'right' },
          2: { cellWidth: 22, halign: 'right' },
          3: { cellWidth: 22, halign: 'right' },
          4: { cellWidth: 22, halign: 'right' },
          5: { cellWidth: 22, halign: 'right' },
          6: { cellWidth: 20, halign: 'center' },
          7: { cellWidth: 23, halign: 'right', fontStyle: 'bold' }
        },
        margin: { left: margin, right: margin },
        alternateRowStyles: { fillColor: [249, 250, 251] }
      })
      
      // ===== HALAMAN 5: GRAFIK & VISUALISASI =====
      pdf.addPage()
      yPos = margin
      
      pdf.setFontSize(16)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(30, 64, 175)
      pdf.text('5. VISUALISASI & GRAFIK ANALISIS', margin, yPos)
      yPos += 10
      
      // Capture charts from the page
      const chartsContainer = document.querySelector('#analytics-report')
      if (chartsContainer) {
        try {
          // Find all chart canvases
          const charts = chartsContainer.querySelectorAll('canvas')
          
          if (charts.length > 0) {
            // Capture first chart (Trend)
            const trendChart = charts[0]
            if (trendChart) {
              const trendCanvas = await html2canvas(trendChart.parentElement, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
              })
              const trendImgData = trendCanvas.toDataURL('image/png')
              
              pdf.setFontSize(12)
              pdf.setFont(undefined, 'bold')
              pdf.text('5.1 Trend PV Expense per Tahun', margin, yPos)
              yPos += 8
              
              const chartWidth = contentWidth
              const chartHeight = (chartWidth * trendCanvas.height) / trendCanvas.width
              pdf.addImage(trendImgData, 'PNG', margin, yPos, chartWidth, Math.min(chartHeight, 80))
              yPos += Math.min(chartHeight, 80) + 15
            }
            
            // Capture second chart (Score Doughnut)
            if (charts.length > 1 && yPos < pageHeight - 100) {
              const scoreChart = charts[1]
              if (scoreChart) {
                const scoreCanvas = await html2canvas(scoreChart.parentElement, {
                  scale: 2,
                  backgroundColor: '#ffffff',
                  logging: false
                })
                const scoreImgData = scoreCanvas.toDataURL('image/png')
                
                pdf.setFontSize(12)
                pdf.setFont(undefined, 'bold')
                pdf.text('5.2 Perbandingan Score', margin, yPos)
                yPos += 8
                
                const chartWidth = contentWidth * 0.6
                const chartHeight = (chartWidth * scoreCanvas.height) / scoreCanvas.width
                pdf.addImage(scoreImgData, 'PNG', margin + (contentWidth - chartWidth) / 2, yPos, chartWidth, Math.min(chartHeight, 70))
              }
            }
            
            // Capture third chart (Radar) on new page
            if (charts.length > 2) {
              pdf.addPage()
              yPos = margin
              
              const radarChart = charts[2]
              if (radarChart) {
                const radarCanvas = await html2canvas(radarChart.parentElement, {
                  scale: 2,
                  backgroundColor: '#ffffff',
                  logging: false
                })
                const radarImgData = radarCanvas.toDataURL('image/png')
                
                pdf.setFontSize(12)
                pdf.setFont(undefined, 'bold')
                pdf.text('5.3 Analisis Multi-Kriteria', margin, yPos)
                yPos += 8
                
                const chartWidth = contentWidth * 0.8
                const chartHeight = (chartWidth * radarCanvas.height) / radarCanvas.width
                pdf.addImage(radarImgData, 'PNG', margin + (contentWidth - chartWidth) / 2, yPos, chartWidth, Math.min(chartHeight, 100))
              }
            }
          }
        } catch (chartError) {
          console.warn('Could not capture charts:', chartError)
          pdf.setFontSize(10)
          pdf.setTextColor(220, 38, 38)
          pdf.text('Grafik tidak dapat ditampilkan. Silakan lihat di aplikasi web.', margin, yPos)
        }
      }
      
      // ===== FOOTER DI SETIAP HALAMAN =====
      const totalPages = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        
        // Footer line
        pdf.setDrawColor(229, 231, 235)
        pdf.setLineWidth(0.5)
        pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15)
        
        // Footer text
        pdf.setFontSize(8)
        pdf.setFont(undefined, 'normal')
        pdf.setTextColor(107, 114, 128)
        pdf.text(projectInfo.copyright, margin, pageHeight - 8)
        pdf.text(`Halaman ${i} dari ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' })
      }
      
      // Save PDF
      const fileName = `Laporan-Analisis-Capex-${projectInfo.equipmentName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
      // Remove loading indicator
      const loader = document.getElementById('pdf-loading')
      if (loader) document.body.removeChild(loader)
      
      console.log('PDF komprehensif berhasil dibuat:', fileName)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      alert('Terjadi kesalahan saat mengunduh PDF. Silakan coba lagi.')
      
      // Remove loading indicator if exists
      const loader = document.getElementById('pdf-loading')
      if (loader) document.body.removeChild(loader)
    }
  }

  if (!results) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 no-print">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Unduh Analisis</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportToExcel}
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Unduh Excel
        </button>
        
        <button
          onClick={exportToPDF}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Unduh PDF
        </button>
      </div>
    </div>
  )
}

export default ExportButtons
