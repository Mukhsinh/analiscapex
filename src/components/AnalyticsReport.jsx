import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2'
import { formatNumber, formatCurrency } from '../utils/calculations'

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
  
  // Calculate scores with proper handling when all values are equal
  const scores = alternatives.map(alt => {
    // If all PVs are equal, give all 100 score
    if (maxPV === minPV) {
      return { name: alt.name, score: 100 }
    }
    // Otherwise calculate based on relative position
    const score = Math.round(100 - ((alt.pv - minPV) / (maxPV - minPV)) * 100)
    return { name: alt.name, score: score }
  })

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
    try {
      // Import libraries dynamically
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      // Show loading indicator
      const loadingDiv = document.createElement('div')
      loadingDiv.id = 'pdf-loading'
      loadingDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:30px 50px;border-radius:10px;z-index:9999;font-size:18px;'
      loadingDiv.innerHTML = '⏳ Membuat laporan PDF...<br><small style="font-size:14px;opacity:0.8;">Mohon tunggu sebentar</small>'
      document.body.appendChild(loadingDiv)

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = 210
      const pageHeight = 297
      const margin = 15
      const contentWidth = pageWidth - (margin * 2)
      let currentPage = 1

      // ============ HALAMAN 1: COVER & EXECUTIVE SUMMARY ============
      
      // Header/Cover
      pdf.setFillColor(37, 99, 235) // Blue
      pdf.rect(0, 0, pageWidth, 60, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('LAPORAN ANALISIS KEPUTUSAN CAPEX', pageWidth / 2, 25, { align: 'center' })
      
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'normal')
      pdf.text(projectInfo.hospitalName, pageWidth / 2, 38, { align: 'center' })
      pdf.text(`${projectInfo.equipmentName} - ${projectInfo.department}`, pageWidth / 2, 48, { align: 'center' })
      
      // Date & Info
      pdf.setTextColor(100, 100, 100)
      pdf.setFontSize(10)
      const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      pdf.text(`Tanggal: ${dateStr}`, pageWidth / 2, 70, { align: 'center' })
      
      // Executive Summary Box
      let yPos = 85
      pdf.setFillColor(240, 253, 244) // Light green
      pdf.setDrawColor(34, 197, 94) // Green border
      pdf.setLineWidth(0.5)
      pdf.rect(margin, yPos, contentWidth, 45, 'FD')
      
      pdf.setTextColor(21, 128, 61)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RINGKASAN EKSEKUTIF', margin + 5, yPos + 8)
      
      // Determine best alternative
      const alternatives = [
        { name: 'Leasing', pv: leasing.totalPV },
        { name: 'Borrow & Purchase', pv: purchase.totalPV },
        { name: 'Revenue Sharing', pv: revenueShare.totalPV }
      ].sort((a, b) => a.pv - b.pv)
      
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const summaryText = `Berdasarkan analisis Present Value (PV) terhadap tiga alternatif pembiayaan, metode ${alternatives[0].name} menghasilkan total PV Expense terendah sebesar ${formatNumber(alternatives[0].pv)} juta Rupiah. Metode ini lebih efisien dibandingkan ${alternatives[1].name} (${formatNumber(alternatives[1].pv)} juta) dan ${alternatives[2].name} (${formatNumber(alternatives[2].pv)} juta).`
      
      const summaryLines = pdf.splitTextToSize(summaryText, contentWidth - 10)
      pdf.text(summaryLines, margin + 5, yPos + 18)
      
      // Recommendation
      yPos += 50
      pdf.setFillColor(240, 253, 244) // Light green
      pdf.setDrawColor(34, 197, 94) // Green border
      pdf.setLineWidth(1)
      pdf.rect(margin, yPos, contentWidth, 22, 'FD')
      
      pdf.setTextColor(21, 128, 61)
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('REKOMENDASI KEPUTUSAN:', margin + 5, yPos + 8)
      
      pdf.setFontSize(16)
      pdf.setTextColor(22, 163, 74) // Brighter green
      pdf.text(alternatives[0].name.toUpperCase(), margin + 5, yPos + 17)
      
      // Comparison Table
      yPos += 30
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('PERBANDINGAN ALTERNATIF PEMBIAYAAN', margin, yPos)
      
      yPos += 8
      
      // Table header
      pdf.setFillColor(59, 130, 246)
      pdf.setTextColor(255, 255, 255)
      pdf.rect(margin, yPos, contentWidth, 10, 'F')
      pdf.setFontSize(10)
      pdf.text('Ranking', margin + 3, yPos + 7)
      pdf.text('Metode', margin + 25, yPos + 7)
      pdf.text('Total PV Expense', margin + 90, yPos + 7)
      pdf.text('Selisih', margin + 145, yPos + 7)
      
      yPos += 10
      
      // Table rows
      alternatives.forEach((alt, idx) => {
        const rowColor = idx % 2 === 0 ? [249, 250, 251] : [255, 255, 255]
        pdf.setFillColor(...rowColor)
        pdf.rect(margin, yPos, contentWidth, 10, 'F')
        
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(10)
        
        // Ranking number with professional styling
        if (idx === 0) {
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(34, 197, 94) // Green for best
        } else {
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(0, 0, 0)
        }
        
        pdf.text(`${idx + 1}`, margin + 8, yPos + 7, { align: 'center' })
        
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(0, 0, 0)
        pdf.text(alt.name, margin + 25, yPos + 7)
        pdf.text(`${formatNumber(alt.pv)} juta`, margin + 90, yPos + 7)
        
        if (idx > 0) {
          const diff = alt.pv - alternatives[0].pv
          const pct = (diff / alternatives[0].pv * 100).toFixed(1)
          pdf.setTextColor(220, 38, 38) // Red for higher cost
          pdf.text(`+${formatNumber(diff)} juta (+${pct}%)`, margin + 145, yPos + 7)
        } else {
          pdf.setTextColor(34, 197, 94) // Green for best
          pdf.setFont('helvetica', 'bold')
          pdf.text('TERBAIK', margin + 145, yPos + 7)
        }
        
        yPos += 10
      })
      
      // Add border to table
      pdf.setDrawColor(200, 200, 200)
      pdf.setLineWidth(0.1)
      pdf.rect(margin, yPos - 40, contentWidth, 40, 'S')
      
      // Footer
      pdf.setTextColor(150, 150, 150)
      pdf.setFontSize(8)
      pdf.text(projectInfo.copyright, pageWidth / 2, pageHeight - 10, { align: 'center' })
      pdf.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
      
      // ============ HALAMAN 2: GRAFIK ANALISIS ============
      pdf.addPage()
      currentPage++
      
      // Get analytics report element
      const reportElement = document.getElementById('analytics-report')
      if (!reportElement) {
        throw new Error('Analytics report element not found')
      }

      // Hide no-print elements
      const noPrintElements = reportElement.querySelectorAll('.no-print')
      noPrintElements.forEach(el => el.style.display = 'none')

      // Capture charts
      const chartElements = [
        { id: 'chart-trend', title: 'Trend PV Expense per Tahun' },
        { id: 'chart-score', title: 'Perbandingan Score' },
        { id: 'chart-radar', title: 'Analisis Multi-Kriteria' }
      ]
      
      // Header
      pdf.setFillColor(37, 99, 235)
      pdf.rect(0, 0, pageWidth, 25, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('VISUALISASI & ANALISIS GRAFIK', pageWidth / 2, 15, { align: 'center' })
      
      yPos = 35
      
      // Capture and add first two charts
      for (let i = 0; i < 2; i++) {
        const chartInfo = chartElements[i]
        const chartEl = document.getElementById(chartInfo.id)
        
        if (chartEl) {
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'bold')
          pdf.text(chartInfo.title, margin, yPos)
          
          yPos += 5
          
          const canvas = await html2canvas(chartEl, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          })
          
          const imgData = canvas.toDataURL('image/png')
          const imgWidth = contentWidth
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          
          pdf.addImage(imgData, 'PNG', margin, yPos, imgWidth, Math.min(imgHeight, 100))
          yPos += Math.min(imgHeight, 100) + 10
        }
      }
      
      // Footer
      pdf.setTextColor(150, 150, 150)
      pdf.setFontSize(8)
      pdf.text(projectInfo.copyright, pageWidth / 2, pageHeight - 10, { align: 'center' })
      pdf.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
      
      // ============ HALAMAN 3: RADAR CHART & STATISTICS ============
      pdf.addPage()
      currentPage++
      
      // Header
      pdf.setFillColor(37, 99, 235)
      pdf.rect(0, 0, pageWidth, 25, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('ANALISIS MULTI-KRITERIA & STATISTIK', pageWidth / 2, 15, { align: 'center' })
      
      yPos = 35
      
      // Radar chart
      const radarEl = document.getElementById('chart-radar')
      if (radarEl) {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Analisis Multi-Kriteria', margin, yPos)
        
        yPos += 5
        
        const canvas = await html2canvas(radarEl, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        })
        
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = contentWidth
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        pdf.addImage(imgData, 'PNG', margin, yPos, imgWidth, Math.min(imgHeight, 110))
        yPos += Math.min(imgHeight, 110) + 15
      }
      
      // Statistics Summary
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RINGKASAN STATISTIK', margin, yPos)
      
      yPos += 8
      
      const maxPV = Math.max(leasing.totalPV, purchase.totalPV, revenueShare.totalPV)
      const minPV = Math.min(leasing.totalPV, purchase.totalPV, revenueShare.totalPV)
      const avgPV = (leasing.totalPV + purchase.totalPV + revenueShare.totalPV) / 3
      
      const stats = [
        { label: 'Total PV Terendah', value: `${formatNumber(minPV)} juta`, bgColor: [219, 234, 254], textColor: [30, 64, 175], borderColor: [59, 130, 246] },
        { label: 'Total PV Tertinggi', value: `${formatNumber(maxPV)} juta`, bgColor: [254, 226, 226], textColor: [153, 27, 27], borderColor: [239, 68, 68] },
        { label: 'Selisih Min-Max', value: `${formatNumber(maxPV - minPV)} juta`, bgColor: [220, 252, 231], textColor: [21, 128, 61], borderColor: [34, 197, 94] },
        { label: 'Rata-rata PV', value: `${formatNumber(avgPV)} juta`, bgColor: [243, 232, 255], textColor: [107, 33, 168], borderColor: [168, 85, 247] },
        { label: 'Periode Analisis', value: `${leasing.yearlyData.length} tahun`, bgColor: [254, 249, 195], textColor: [161, 98, 7], borderColor: [234, 179, 8] }
      ]
      
      const boxWidth = (contentWidth - 10) / 2
      const boxHeight = 20
      
      stats.forEach((stat, idx) => {
        const col = idx % 2
        const row = Math.floor(idx / 2)
        const xPos = margin + (col * (boxWidth + 10))
        const yPosBox = yPos + (row * (boxHeight + 5))
        
        pdf.setFillColor(...stat.bgColor)
        pdf.setDrawColor(...stat.borderColor)
        pdf.setLineWidth(0.5)
        pdf.rect(xPos, yPosBox, boxWidth, boxHeight, 'FD')
        
        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.text(stat.label, xPos + 3, yPosBox + 7)
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(...stat.textColor)
        pdf.text(stat.value, xPos + 3, yPosBox + 15)
      })
      
      // Footer
      pdf.setTextColor(150, 150, 150)
      pdf.setFontSize(8)
      pdf.text(projectInfo.copyright, pageWidth / 2, pageHeight - 10, { align: 'center' })
      pdf.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
      
      // ============ HALAMAN 4+: DETAIL TABEL ============
      
      // Get results comparison element for detailed tables
      const resultsElement = document.querySelector('#results-comparison')
      if (resultsElement) {
        // Get specific table sections
        const tableSections = [
          { id: 'table-leasing', title: 'DETAIL PERHITUNGAN LEASING' },
          { id: 'table-purchase', title: 'DETAIL PERHITUNGAN BORROW & PURCHASE' },
          { id: 'table-revenue-share', title: 'DETAIL PERHITUNGAN REVENUE SHARING' }
        ]
        
        for (const section of tableSections) {
          const tableEl = document.getElementById(section.id)
          if (!tableEl) continue
          
          pdf.addPage()
          currentPage++
          
          // Header
          pdf.setFillColor(37, 99, 235)
          pdf.rect(0, 0, pageWidth, 25, 'F')
          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.text(section.title, pageWidth / 2, 15, { align: 'center' })
          
          yPos = 35
          
          // Capture table section
          const canvas = await html2canvas(tableEl, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          })
          
          const imgData = canvas.toDataURL('image/png')
          const imgWidth = contentWidth
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          
          // Handle multi-page tables
          let remainingHeight = imgHeight
          let sourceY = 0
          
          while (remainingHeight > 0) {
            const availableHeight = pageHeight - yPos - 20
            const heightToAdd = Math.min(remainingHeight, availableHeight)
            
            // Create a temporary canvas for cropping
            const tempCanvas = document.createElement('canvas')
            const tempCtx = tempCanvas.getContext('2d')
            tempCanvas.width = canvas.width
            tempCanvas.height = (heightToAdd / imgWidth) * canvas.width
            
            tempCtx.drawImage(
              canvas,
              0, (sourceY / imgWidth) * canvas.width,
              canvas.width, tempCanvas.height,
              0, 0,
              canvas.width, tempCanvas.height
            )
            
            pdf.addImage(tempCanvas.toDataURL('image/png'), 'PNG', margin, yPos, imgWidth, heightToAdd)
            
            remainingHeight -= heightToAdd
            sourceY += heightToAdd
            
            // Footer
            pdf.setTextColor(150, 150, 150)
            pdf.setFontSize(8)
            pdf.text(projectInfo.copyright, pageWidth / 2, pageHeight - 10, { align: 'center' })
            pdf.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
            
            if (remainingHeight > 0) {
              pdf.addPage()
              currentPage++
              yPos = 15
            }
          }
        }
      }
      
      // ============ HALAMAN AKHIR: KESIMPULAN & CATATAN ============
      pdf.addPage()
      currentPage++
      
      // Header
      pdf.setFillColor(37, 99, 235)
      pdf.rect(0, 0, pageWidth, 25, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('KESIMPULAN & REKOMENDASI', pageWidth / 2, 15, { align: 'center' })
      
      yPos = 40
      
      // Main Conclusion Box
      pdf.setFillColor(240, 253, 244)
      pdf.setDrawColor(34, 197, 94)
      pdf.setLineWidth(1)
      pdf.rect(margin, yPos, contentWidth, 60, 'FD')
      
      pdf.setTextColor(21, 128, 61)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('KESIMPULAN AKHIR', margin + 5, yPos + 10)
      
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      
      const conclusionText = `Berdasarkan analisis Present Value (PV) yang telah dilakukan terhadap tiga alternatif pembiayaan (Leasing, Borrow & Purchase, dan Revenue Sharing), dapat disimpulkan bahwa metode ${alternatives[0].name} merupakan pilihan terbaik dengan total PV Expense sebesar ${formatNumber(alternatives[0].pv)} juta Rupiah.`
      
      const conclusionLines = pdf.splitTextToSize(conclusionText, contentWidth - 10)
      pdf.text(conclusionLines, margin + 5, yPos + 20)
      
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(21, 128, 61)
      pdf.text(`Rekomendasi: ${alternatives[0].name.toUpperCase()}`, margin + 5, yPos + 50)
      
      yPos += 70
      
      // Additional Notes
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('CATATAN PENTING', margin, yPos)
      
      yPos += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(60, 60, 60)
      
      const notes = [
        '1. Analisis ini menggunakan metode Present Value (PV) dengan discount rate yang telah ditentukan.',
        '2. Perhitungan mempertimbangkan seluruh biaya operasional, maintenance, dan overhead.',
        '3. Untuk Revenue Sharing, perhitungan mencakup proyeksi pendapatan dan pembagian porsi.',
        '4. Keputusan akhir sebaiknya juga mempertimbangkan faktor non-finansial seperti fleksibilitas operasional dan strategi jangka panjang rumah sakit.',
        '5. Akurasi analisis dapat ditingkatkan dengan data historis yang lebih detail.'
      ]
      
      notes.forEach((note, idx) => {
        const noteLines = pdf.splitTextToSize(note, contentWidth - 5)
        pdf.text(noteLines, margin, yPos)
        yPos += noteLines.length * 6 + 3
      })
      
      // Special note for Revenue Sharing if negative
      if (!revenueShare.isProfit) {
        yPos += 5
        pdf.setFillColor(254, 242, 242)
        pdf.setDrawColor(220, 38, 38)
        pdf.setLineWidth(0.5)
        pdf.rect(margin, yPos, contentWidth, 35, 'FD')
        
        pdf.setTextColor(153, 27, 27)
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.text('PERHATIAN: Revenue Sharing', margin + 5, yPos + 8)
        
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        const warningText = 'Analisis menunjukkan bahwa opsi Revenue Sharing menghasilkan Negative EAT (Earning After Tax) karena biaya overhead (langsung dan alokasi) melebihi pendapatan yang diperoleh. Hal ini menyebabkan PV Expense menjadi yang tertinggi di antara ketiga alternatif.'
        const warningLines = pdf.splitTextToSize(warningText, contentWidth - 10)
        pdf.text(warningLines, margin + 5, yPos + 16)
        
        yPos += 40
      }
      
      // Methodology note
      yPos += 10
      pdf.setFillColor(239, 246, 255)
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(0.5)
      pdf.rect(margin, yPos, contentWidth, 25, 'FD')
      
      pdf.setTextColor(30, 64, 175)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text('METODOLOGI', margin + 5, yPos + 8)
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(60, 60, 60)
      const methodText = 'Laporan ini menggunakan metode analisis Present Value (PV) untuk membandingkan nilai ekonomis dari berbagai alternatif pembiayaan. Semua arus kas masa depan didiskontokan ke nilai sekarang menggunakan discount rate yang sesuai dengan cost of capital rumah sakit.'
      const methodLines = pdf.splitTextToSize(methodText, contentWidth - 10)
      pdf.text(methodLines, margin + 5, yPos + 16)
      
      // Final Footer
      yPos = pageHeight - 40
      pdf.setDrawColor(200, 200, 200)
      pdf.setLineWidth(0.5)
      pdf.line(margin, yPos, pageWidth - margin, yPos)
      
      yPos += 8
      pdf.setTextColor(100, 100, 100)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'italic')
      pdf.text('Laporan ini dihasilkan secara otomatis oleh Capex Analyzer Professional Edition', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 6
      pdf.setFontSize(8)
      pdf.text(projectInfo.copyright, pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 5
      pdf.text(`Dicetak pada: ${new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}`, pageWidth / 2, yPos, { align: 'center' })
      
      pdf.setTextColor(150, 150, 150)
      pdf.text(`Halaman ${currentPage}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
      
      // Restore visibility
      noPrintElements.forEach(el => el.style.display = '')

      // Remove loading indicator
      document.body.removeChild(loadingDiv)

      // Generate filename
      const filename = `Laporan_Analisis_Capex_${projectInfo.equipmentName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      
      // Download the PDF
      pdf.save(filename)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      const loadingDiv = document.getElementById('pdf-loading')
      if (loadingDiv) document.body.removeChild(loadingDiv)
      alert('Gagal mengunduh PDF. Silakan coba lagi.')
    }
  }

  return (
    <div id="analytics-report" className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8 no-print">
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
      
      {/* Print Header - Only visible when printing */}
      <div className="print-header">
        <h1>LAPORAN ANALISIS KEPUTUSAN CAPEX</h1>
        <p className="subtitle">{projectInfo.hospitalName}</p>
        <p className="subtitle">{projectInfo.equipmentName} - {projectInfo.department}</p>
        <p className="date">Tanggal: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scores.map((item, index) => {
          const colorClasses = [
            { border: 'border-blue-500', text: 'text-blue-600', bg: 'bg-blue-500' },
            { border: 'border-green-500', text: 'text-green-600', bg: 'bg-green-500' },
            { border: 'border-purple-500', text: 'text-purple-600', bg: 'bg-purple-500' }
          ]
          const colorClass = colorClasses[index]
          return (
            <div key={item.name} className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${colorClass.border} avoid-break`}>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">{item.name}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      Score
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold ${colorClass.text}`}>
                      {item.score}
                    </span>
                    <span className="text-sm text-gray-500">/100</span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${item.score}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorClass.bg} transition-all duration-500`}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {item.score >= 80 ? 'Sangat Baik' : item.score >= 60 ? 'Baik' : item.score >= 40 ? 'Cukup' : 'Kurang Baik'}
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <div id="chart-trend" className="bg-white rounded-xl shadow-lg p-6 avoid-break">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Trend PV Expense per Tahun</h3>
          <div className="chart-container" style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Line 
              data={trendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1000
                },
                plugins: {
                  legend: { 
                    position: 'bottom',
                    labels: {
                      font: { size: 12 },
                      padding: 15
                    }
                  },
                  title: { display: false }
                },
                scales: {
                  y: { 
                    beginAtZero: true, 
                    title: { 
                      display: true, 
                      text: 'PV Expense (juta Rp)',
                      font: { size: 12, weight: 'bold' }
                    },
                    ticks: {
                      font: { size: 11 }
                    }
                  },
                  x: {
                    ticks: {
                      font: { size: 11 }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Score Doughnut */}
        <div id="chart-score" className="bg-white rounded-xl shadow-lg p-6 avoid-break">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Perbandingan Score</h3>
          <div className="chart-container" style={{ position: 'relative', height: '300px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut 
              data={scoreData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1000
                },
                plugins: {
                  legend: { 
                    position: 'bottom',
                    labels: {
                      font: { size: 12 },
                      padding: 15
                    }
                  },
                  title: { display: false }
                }
              }}
            />
          </div>
        </div>

        {/* Radar Chart */}
        <div id="chart-radar" className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 avoid-break">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Analisis Multi-Kriteria</h3>
          <div className="chart-container" style={{ position: 'relative', height: '350px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Radar 
              data={radarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1000
                },
                plugins: {
                  legend: { 
                    position: 'bottom',
                    labels: {
                      font: { size: 12 },
                      padding: 15
                    }
                  }
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      stepSize: 20,
                      font: { size: 11 }
                    },
                    pointLabels: {
                      font: { size: 12, weight: 'bold' }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6 avoid-break">
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
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-300 avoid-break">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 no-print">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">REKOMENDASI</h3>
            <p className="text-lg text-gray-700 mb-4">
              Berdasarkan analisis Present Value dan scoring multi-kriteria, alternatif terbaik adalah:
            </p>
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-2xl font-bold text-green-700 mb-2">
                {scores.sort((a, b) => b.score - a.score)[0].name}
              </p>
              <p className="text-gray-600">
                Score: <span className="font-bold text-green-600">{scores.sort((a, b) => b.score - a.score)[0].score}/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="print-footer">
        <p>{projectInfo.copyright}</p>
        <p>Generated on {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
      </div>
      
      <div className="text-center text-sm text-gray-500 pt-4 border-t no-print">
        <p>{projectInfo.copyright}</p>
        <p className="mt-1">Generated on {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
      </div>
    </div>
  )
}

export default AnalyticsReport
