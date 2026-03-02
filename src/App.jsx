import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Login from './components/Login'
import LeasingForm from './components/LeasingForm'
import PurchaseForm from './components/PurchaseForm'
import RevenueShareForm from './components/RevenueShareForm'
import ResultsComparison from './components/ResultsComparison'
import AnalyticsReport from './components/AnalyticsReport'
import ProjectSettings from './components/ProjectSettings'
import AnalysisHistory from './components/AnalysisHistory'
import { calculateLeasing, calculatePurchase, calculateRevenueShare } from './utils/calculations'
import { saveCompleteAnalysis, createProject, updateProject, getLatestFormInputs, getProject, saveFormInput } from './lib/database'

function MainApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('leasing')
  const [results, setResults] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [saveStatus, setSaveStatus] = useState(null)
  
  const [projectInfo, setProjectInfo] = useState({
    hospitalName: 'RS MIRACLES - YOGYAKARTA',
    equipmentName: 'Alat Analyzer Kimia',
    department: 'Laboratorium Klinik',
    copyright: '© Copyright Mukhsin Hadi'
  })

  // Log projectInfo changes for debugging
  useEffect(() => {
    console.log('=== projectInfo changed in App.jsx ===')
    console.log('New projectInfo:', projectInfo)
  }, [projectInfo])
  
  const [leasingData, setLeasingData] = useState({
    annualPayment: 280000000, // 280 juta per TAHUN dalam Rupiah
    period: 5, // 5 tahun
    discountRate: 10
  })
  
  const [purchaseData, setPurchaseData] = useState({
    loanAmount: 1300000000, // 1.3 miliar dalam Rupiah
    interestRate: 10,
    period: 5,
    maintenanceCost: 12000000, // 12 juta dalam Rupiah (sesuai Excel)
    residualValue: 130000000, // 130 juta dalam Rupiah
    discountRate: 10
  })
  
  const [revenueShareData, setRevenueShareData] = useState({
    calculationMethod: 'percentage', // 'percentage' atau 'flatFee'
    rsShare: 25, // 25% (sesuai Excel, bukan 15%)
    supplierShare: 75,
    directOverhead: 5000000000, // 5 miliar dalam Rupiah
    allocatedOverhead: 370760000, // 370.76 juta dalam Rupiah
    taxRate: 13, // 13% (sesuai Excel, bukan 15%)
    discountRate: 10,
    period: 5,
    procedures: [
      { id: 1, name: 'Darah Rutin', tariff: 150000, volume: 68664, flatFee: 0 },
      { id: 2, name: 'Creatinin', tariff: 150000, volume: 32208, flatFee: 0 },
      { id: 3, name: 'Urea / BUN', tariff: 150000, volume: 30624, flatFee: 0 }
    ]
  })

  // Auto-save data to localStorage whenever it changes
  // Database save is disabled to prevent infinite loops - only save on Calculate
  useEffect(() => {
    localStorage.setItem('leasingData', JSON.stringify(leasingData))
  }, [leasingData])

  useEffect(() => {
    localStorage.setItem('purchaseData', JSON.stringify(purchaseData))
  }, [purchaseData])

  useEffect(() => {
    localStorage.setItem('revenueShareData', JSON.stringify(revenueShareData))
  }, [revenueShareData])

  // Don't auto-save projectInfo to localStorage - let ProjectSettings handle it
  // This prevents overwriting changes made in ProjectSettings
  // useEffect(() => {
  //   localStorage.setItem('projectInfo', JSON.stringify(projectInfo))
  // }, [projectInfo])

  useEffect(() => {
    if (currentProjectId) {
      localStorage.setItem('currentProjectId', currentProjectId)
    }
  }, [currentProjectId])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Load saved data from localStorage first (as fallback)
    const savedProjectInfo = localStorage.getItem('projectInfo')
    const savedLeasingData = localStorage.getItem('leasingData')
    const savedPurchaseData = localStorage.getItem('purchaseData')
    const savedRevenueShareData = localStorage.getItem('revenueShareData')
    const savedProjectId = localStorage.getItem('currentProjectId')

    if (savedProjectInfo) setProjectInfo(JSON.parse(savedProjectInfo))
    if (savedLeasingData) setLeasingData(JSON.parse(savedLeasingData))
    if (savedPurchaseData) setPurchaseData(JSON.parse(savedPurchaseData))
    if (savedRevenueShareData) setRevenueShareData(JSON.parse(savedRevenueShareData))
    if (savedProjectId) setCurrentProjectId(savedProjectId)
  }, [])

  // Load data from database when user logs in - this will override localStorage data
  // Only run once when user is set
  useEffect(() => {
    let isMounted = true
    
    const loadDataFromDatabase = async () => {
      if (user && user.id) {
        try {
          console.log('Loading data from database for user:', user.id)
          
          // First, check if we have a saved project ID
          const savedProjectId = localStorage.getItem('currentProjectId')
          
          if (savedProjectId) {
            // Load the specific project
            console.log('Loading project from ID:', savedProjectId)
            const { data: project, error: projectError } = await getProject(savedProjectId)
            
            if (!projectError && project && isMounted) {
              console.log('Project loaded:', project)
              const loadedProjectInfo = {
                hospitalName: project.hospital_name,
                equipmentName: project.equipment_name,
                department: project.department,
                copyright: project.copyright
              }
              
              // Only update if different
              if (JSON.stringify(projectInfo) !== JSON.stringify(loadedProjectInfo)) {
                setProjectInfo(loadedProjectInfo)
                localStorage.setItem('projectInfo', JSON.stringify(loadedProjectInfo))
              }
              
              // Load form inputs for this project
              const { data: formInputs } = await getLatestFormInputs(user.id)
              if (formInputs && formInputs.length > 0 && isMounted) {
                const inputsByType = {}
                formInputs.forEach(input => {
                  inputsByType[input.form_type] = input.input_data
                })
                
                if (inputsByType.leasing && JSON.stringify(leasingData) !== JSON.stringify(inputsByType.leasing)) {
                  setLeasingData(inputsByType.leasing)
                }
                if (inputsByType.purchase && JSON.stringify(purchaseData) !== JSON.stringify(inputsByType.purchase)) {
                  setPurchaseData(inputsByType.purchase)
                }
                if (inputsByType.revenueShare && JSON.stringify(revenueShareData) !== JSON.stringify(inputsByType.revenueShare)) {
                  setRevenueShareData(inputsByType.revenueShare)
                }
              }
              return
            }
          }
          
          // If no saved project ID or project not found, try to load latest form inputs
          const { data: formInputs, error } = await getLatestFormInputs(user.id)
          
          if (!error && formInputs && formInputs.length > 0 && isMounted) {
            console.log('Form inputs loaded:', formInputs)
            
            // Group by form type
            const inputsByType = {}
            formInputs.forEach(input => {
              inputsByType[input.form_type] = input.input_data
            })

            // Update state with database data if available and different
            if (inputsByType.leasing && JSON.stringify(leasingData) !== JSON.stringify(inputsByType.leasing)) {
              setLeasingData(inputsByType.leasing)
            }
            if (inputsByType.purchase && JSON.stringify(purchaseData) !== JSON.stringify(inputsByType.purchase)) {
              setPurchaseData(inputsByType.purchase)
            }
            if (inputsByType.revenueShare && JSON.stringify(revenueShareData) !== JSON.stringify(inputsByType.revenueShare)) {
              setRevenueShareData(inputsByType.revenueShare)
            }

            // Load project info if we have a project_id
            if (formInputs[0].project_id && isMounted) {
              const { data: project } = await getProject(formInputs[0].project_id)
              if (project && isMounted) {
                console.log('Project loaded from form inputs:', project)
                const loadedProjectInfo = {
                  hospitalName: project.hospital_name,
                  equipmentName: project.equipment_name,
                  department: project.department,
                  copyright: project.copyright
                }
                
                if (JSON.stringify(projectInfo) !== JSON.stringify(loadedProjectInfo)) {
                  setProjectInfo(loadedProjectInfo)
                  localStorage.setItem('projectInfo', JSON.stringify(loadedProjectInfo))
                }
                
                if (currentProjectId !== project.id) {
                  setCurrentProjectId(project.id)
                  localStorage.setItem('currentProjectId', project.id)
                }
              }
            }
          } else {
            // No existing data, create a new project only if we don't have one
            if (!currentProjectId && isMounted) {
              console.log('No existing project, creating new one')
              const savedProjectInfo = localStorage.getItem('projectInfo')
              const projectData = savedProjectInfo ? JSON.parse(savedProjectInfo) : projectInfo
              
              const { data: newProject, error: createError } = await createProject(user.id, projectData)
              if (!createError && newProject && isMounted) {
                console.log('New project created:', newProject)
                setCurrentProjectId(newProject.id)
                localStorage.setItem('currentProjectId', newProject.id)
              }
            }
          }
        } catch (error) {
          console.error('Error loading data from database:', error)
        }
      }
    }

    loadDataFromDatabase()
    
    return () => {
      isMounted = false
    }
  }, [user?.id]) // Only depend on user.id, not the whole user object

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setResults(null)
    navigate('/login')
  }

  // Get active section from URL
  const getActiveSection = () => {
    const path = location.pathname
    if (path.includes('/analisis_capex')) return 'analisis_capex'
    if (path.includes('/laporan_grafik')) return 'laporan_grafik'
    if (path.includes('/riwayat_analisis')) return 'riwayat_analisis'
    if (path.includes('/pengaturan')) return 'pengaturan'
    return 'analisis_capex'
  }

  const activeSection = getActiveSection()

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  const handleCalculate = async () => {
    const leasingResult = calculateLeasing(leasingData)
    const purchaseResult = calculatePurchase(purchaseData)
    const revenueResult = calculateRevenueShare(revenueShareData)
    
    // Calculate recommendation
    const alternatives = [
      { name: 'Leasing', pv: leasingResult.totalPV },
      { name: 'Borrow & Purchase', pv: purchaseResult.totalPV },
      { name: 'Revenue Sharing', pv: revenueResult.totalPV }
    ].sort((a, b) => a.pv - b.pv)
    
    const recommendation = {
      best: alternatives[0].name,
      worst: alternatives[2].name,
      difference: alternatives[2].pv - alternatives[0].pv
    }
    
    const calculatedResults = {
      leasing: leasingResult,
      purchase: purchaseResult,
      revenueShare: revenueResult,
      recommendation
    }
    
    setResults(calculatedResults)

    // Save to localStorage
    localStorage.setItem('projectInfo', JSON.stringify(projectInfo))
    localStorage.setItem('leasingData', JSON.stringify(leasingData))
    localStorage.setItem('purchaseData', JSON.stringify(purchaseData))
    localStorage.setItem('revenueShareData', JSON.stringify(revenueShareData))

    // Save to database if user is logged in
    if (user && user.id) {
      try {
        setSaveStatus('saving')
        console.log('Starting to save analysis to database...')
        console.log('User ID:', user.id)
        console.log('Current Project ID:', currentProjectId)
        console.log('Project Info:', projectInfo)
        
        const analysisData = {
          leasing: leasingData,
          purchase: purchaseData,
          revenueShare: revenueShareData
        }

        console.log('Analysis Data:', analysisData)
        console.log('Calculated Results:', calculatedResults)

        const { data, error } = await saveCompleteAnalysis(
          user.id,
          projectInfo,
          analysisData,
          calculatedResults,
          currentProjectId // Pass existing project ID
        )

        console.log('Save response:', { data, error })

        if (error) {
          console.error('Error saving analysis:', error)
          alert(`Gagal menyimpan ke database: ${error.message || JSON.stringify(error)}`)
          setSaveStatus('error')
          setTimeout(() => setSaveStatus(null), 5000)
        } else if (data && data.project) {
          console.log('Successfully saved! Project ID:', data.project.id)
          setCurrentProjectId(data.project.id)
          localStorage.setItem('currentProjectId', data.project.id)
          setSaveStatus('saved')
          
          // Trigger refresh event for AnalysisHistory component
          window.dispatchEvent(new Event('refreshAnalysisHistory'))
          
          setTimeout(() => setSaveStatus(null), 3000)
        } else {
          console.error('No data returned from save operation')
          alert('Gagal menyimpan: Tidak ada data yang dikembalikan')
          setSaveStatus('error')
          setTimeout(() => setSaveStatus(null), 5000)
        }
      } catch (error) {
        console.error('Exception while saving analysis:', error)
        alert(`Error saat menyimpan: ${error.message}`)
        setSaveStatus('error')
        setTimeout(() => setSaveStatus(null), 5000)
      }
    } else {
      console.warn('User not logged in or user ID missing')
      alert('Anda harus login untuk menyimpan data ke database')
    }
  }

  const AnalysisCapexPage = () => (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="flex border-b mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('leasing')}
                  className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'leasing'
                      ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    A. Leasing
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('purchase')}
                  className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'purchase'
                      ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    B. Borrow & Purchase
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('revenueShare')}
                  className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'revenueShare'
                      ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    C. Revenue Sharing
                  </span>
                </button>
              </div>

              <div className="mb-6">
                {activeTab === 'leasing' && (
                  <LeasingForm data={leasingData} setData={setLeasingData} />
                )}
                {activeTab === 'purchase' && (
                  <PurchaseForm data={purchaseData} setData={setPurchaseData} />
                )}
                {activeTab === 'revenueShare' && (
                  <RevenueShareForm data={revenueShareData} setData={setRevenueShareData} />
                )}
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={saveStatus === 'saving'}
              >
                <span className="flex items-center justify-center">
                  {saveStatus === 'saving' ? (
                    <>
                      <svg className="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Hitung & Bandingkan Semua Alternatif
                    </>
                  )}
                </span>
              </button>

              {saveStatus === 'saved' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 text-sm font-medium">Analisis berhasil disimpan ke database</span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-red-700 text-sm font-medium">Gagal menyimpan ke database</span>
                </div>
              )}
            </div>

            {results && (
              <>
                <ResultsComparison results={results} projectInfo={projectInfo} />
              </>
            )}
          </>
  )

  const LaporanGrafikPage = () => results ? (
    <AnalyticsReport results={results} projectInfo={projectInfo} />
  ) : (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Data Analisis</h3>
      <p className="text-gray-500 mb-6">Silakan lakukan perhitungan terlebih dahulu di menu Analisis</p>
      <button
        onClick={() => navigate('/analisis_capex')}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Ke Menu Analisis
      </button>
    </div>
  )

  const RiwayatAnalisisPage = () => <AnalysisHistory user={user} />

  const PengaturanPage = () => (
    <ProjectSettings 
      projectInfo={projectInfo} 
      setProjectInfo={setProjectInfo}
      user={user}
      currentProjectId={currentProjectId}
      setCurrentProjectId={setCurrentProjectId}
    />
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        activeSection={activeSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          projectInfo={projectInfo}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          user={user}
        />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <Routes>
              <Route path="/analisis_capex" element={<AnalysisCapexPage />} />
              <Route path="/laporan_grafik" element={<LaporanGrafikPage />} />
              <Route path="/riwayat_analisis" element={<RiwayatAnalisisPage />} />
              <Route path="/pengaturan" element={<PengaturanPage />} />
              <Route path="/" element={<Navigate to="/analisis_capex" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={(user) => {
          localStorage.setItem('user', JSON.stringify(user))
          window.location.href = '/analisis_capex'
        }} />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
