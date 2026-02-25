import React, { useState, useEffect } from 'react'
import { updateProject, createProject, getProject } from '../lib/database'

function ProjectSettings({ projectInfo, setProjectInfo, user, currentProjectId, setCurrentProjectId }) {
  const [localInfo, setLocalInfo] = useState(projectInfo)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load project data from database ONCE when component mounts or when projectId changes
  useEffect(() => {
    const loadProjectData = async () => {
      if (user && user.id && currentProjectId) {
        try {
          setLoading(true)
          console.log('Loading project data from database, ID:', currentProjectId)
          
          const { data, error: fetchError } = await getProject(currentProjectId)
          
          if (fetchError) {
            console.error('Error loading project:', fetchError)
            setError('Gagal memuat data dari database')
            setTimeout(() => setError(null), 3000)
            setLoading(false)
            return
          }

          if (data) {
            console.log('Project data loaded:', data)
            const loadedInfo = {
              hospitalName: data.hospital_name,
              equipmentName: data.equipment_name,
              department: data.department,
              copyright: data.copyright
            }
            
            // Only update if data is different to avoid unnecessary re-renders
            const currentInfo = JSON.stringify(localInfo)
            const newInfo = JSON.stringify(loadedInfo)
            
            if (currentInfo !== newInfo) {
              console.log('Project data changed, updating state')
              setLocalInfo(loadedInfo)
              
              // Update parent state
              setProjectInfo(loadedInfo)
              
              // Update localStorage
              localStorage.setItem('projectInfo', JSON.stringify(loadedInfo))
            } else {
              console.log('Project data unchanged, skipping update')
            }
          }
        } catch (err) {
          console.error('Exception loading project:', err)
          setError('Error memuat data')
          setTimeout(() => setError(null), 3000)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
        // Initialize from projectInfo prop if no project ID
        if (JSON.stringify(localInfo) !== JSON.stringify(projectInfo)) {
          setLocalInfo(projectInfo)
        }
      }
    }

    loadProjectData()
  }, [currentProjectId, user?.id]) // Re-run when project ID or user changes

  const handleSave = async () => {
    setSaved(false)
    setError(null)

    console.log('=== SAVE PROJECT START ===')
    console.log('User:', user)
    console.log('User ID:', user?.id)
    console.log('Current Project ID:', currentProjectId)
    console.log('Local Info:', localInfo)

    // Save to database if user is logged in
    if (user && user.id) {
      try {
        setSaving(true)
        console.log('User is logged in, saving to database...')

        if (currentProjectId) {
          // Update existing project
          console.log('Updating existing project:', currentProjectId)
          const { data, error: updateError } = await updateProject(currentProjectId, localInfo)
          
          console.log('Update response:', { data, error: updateError })
          
          if (updateError) {
            console.error('Update error:', updateError)
            throw updateError
          }
          
          console.log('Project updated successfully:', data)
          
          // Update parent state FIRST, then localStorage
          setProjectInfo(localInfo)
          localStorage.setItem('projectInfo', JSON.stringify(localInfo))
          
          // Force re-render by updating local state
          setLocalInfo({...localInfo})
        } else {
          // Create new project
          console.log('Creating new project for user:', user.id)
          const { data, error: createError } = await createProject(user.id, localInfo)
          
          console.log('Create response:', { data, error: createError })
          
          if (createError) {
            console.error('Create error:', createError)
            throw createError
          }
          
          console.log('Project created successfully:', data)
          
          if (data) {
            console.log('Setting current project ID:', data.id)
            setCurrentProjectId(data.id)
            localStorage.setItem('currentProjectId', data.id)
            
            // Update parent state FIRST, then localStorage
            setProjectInfo(localInfo)
            localStorage.setItem('projectInfo', JSON.stringify(localInfo))
            
            // Force re-render by updating local state
            setLocalInfo({...localInfo})
          } else {
            console.error('No data returned from createProject')
            throw new Error('No data returned from createProject')
          }
        }

        console.log('=== SAVE PROJECT SUCCESS ===')
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } catch (err) {
        console.error('=== SAVE PROJECT ERROR ===')
        console.error('Error saving project:', err)
        console.error('Error details:', {
          message: err.message,
          code: err.code,
          details: err.details,
          hint: err.hint
        })
        setError(`Gagal menyimpan ke database: ${err.message || JSON.stringify(err)}`)
        setTimeout(() => setError(null), 5000)
      } finally {
        setSaving(false)
      }
    } else {
      console.log('User not logged in, saving to localStorage only')
      // Just update local state if not logged in
      setProjectInfo(localInfo)
      localStorage.setItem('projectInfo', JSON.stringify(localInfo))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleReset = () => {
    const defaultInfo = {
      hospitalName: 'RS MIRACLES - YOGYAKARTA',
      equipmentName: 'Alat Analyzer Kimia',
      department: 'Laboratorium Klinik',
      copyright: '© Copyright Mukhsin Hadi'
    }
    setLocalInfo(defaultInfo)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin w-8 h-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Memuat data proyek...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan Proyek</h2>
        <p className="text-gray-600">Sesuaikan informasi proyek analisis Capex Anda</p>
        {user && currentProjectId && (
          <p className="text-xs text-gray-500 mt-2">Project ID: {currentProjectId}</p>
        )}
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Rumah Sakit / Institusi
            </label>
            <input
              type="text"
              value={localInfo.hospitalName}
              onChange={(e) => setLocalInfo({ ...localInfo, hospitalName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: RS MIRACLES - YOGYAKARTA"
            />
            <p className="text-xs text-gray-500 mt-1">Nama institusi yang akan melakukan investasi</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Alat / Equipment
            </label>
            <input
              type="text"
              value={localInfo.equipmentName}
              onChange={(e) => setLocalInfo({ ...localInfo, equipmentName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Alat Analyzer Kimia"
            />
            <p className="text-xs text-gray-500 mt-1">Nama alat atau equipment yang akan diinvestasikan</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Departemen / Unit
            </label>
            <input
              type="text"
              value={localInfo.department}
              onChange={(e) => setLocalInfo({ ...localInfo, department: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Laboratorium Klinik"
            />
            <p className="text-xs text-gray-500 mt-1">Departemen atau unit yang akan menggunakan alat</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Copyright / Pemilik Analisis
            </label>
            <input
              type="text"
              value={localInfo.copyright}
              onChange={(e) => setLocalInfo({ ...localInfo, copyright: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: © Copyright Mukhsin Hadi"
            />
            <p className="text-xs text-gray-500 mt-1">Nama pemilik atau pembuat analisis</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            disabled={saving}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            Reset ke Default
          </button>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-700 font-medium">
              Pengaturan berhasil disimpan{user && user.id ? ' ke database' : ''}!
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h4 className="text-2xl font-bold text-gray-800 mb-2">Analisis Keputusan Capex</h4>
          <p className="text-lg text-gray-700">{localInfo.equipmentName} - {localInfo.department}</p>
          <p className="text-sm text-gray-600 mt-2">{localInfo.hospitalName}</p>
          <p className="text-xs text-gray-500 mt-4">{localInfo.copyright}</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Informasi Penting</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Pengaturan ini akan diterapkan pada semua laporan dan analisis</li>
              <li>• Perubahan akan langsung terlihat di header aplikasi</li>
              {user && user.id ? (
                <>
                  <li>• Data disimpan ke database Supabase dan dapat diakses dari perangkat lain</li>
                  <li>• Saat refresh halaman, data akan dimuat otomatis dari database</li>
                </>
              ) : (
                <li>• Data pengaturan disimpan di browser (localStorage)</li>
              )}
              <li>• Gunakan tombol "Reset ke Default" untuk mengembalikan pengaturan awal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSettings
