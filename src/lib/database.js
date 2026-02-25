import { supabase } from './supabase'

// ==================== USER OPERATIONS ====================

/**
 * Get or create user by email
 */
export async function getOrCreateUser(email, fullName = null) {
  try {
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      return { data: existingUser, error: null }
    }

    // Create new user if not exists
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: '$2a$10$dummy_hash_for_simple_auth',
          full_name: fullName || email.split('@')[0]
        }
      ])
      .select()
      .single()

    return { data: newUser, error: createError }
  } catch (error) {
    console.error('Error in getOrCreateUser:', error)
    return { data: null, error }
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { data: null, error }
  }
}

// ==================== PROJECT OPERATIONS ====================

/**
 * Create a new project
 */
export async function createProject(userId, projectData) {
  try {
    console.log('=== createProject START ===')
    console.log('userId:', userId)
    console.log('projectData:', projectData)
    
    const insertData = {
      user_id: userId,
      hospital_name: projectData.hospitalName,
      equipment_name: projectData.equipmentName,
      department: projectData.department,
      copyright: projectData.copyright || '© Copyright Mukhsin Hadi'
    }
    
    console.log('insertData:', insertData)
    
    const { data, error } = await supabase
      .from('projects')
      .insert([insertData])
      .select()
      .single()

    console.log('Supabase response:', { data, error })
    console.log('=== createProject END ===')
    
    return { data, error }
  } catch (error) {
    console.error('=== createProject EXCEPTION ===')
    console.error('Error creating project:', error)
    return { data: null, error }
  }
}

/**
 * Get all projects for a user
 */
export async function getUserProjects(userId) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  } catch (error) {
    console.error('Error fetching user projects:', error)
    return { data: null, error }
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(projectId) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    return { data, error }
  } catch (error) {
    console.error('Error fetching project:', error)
    return { data: null, error }
  }
}

/**
 * Update project information
 */
export async function updateProject(projectId, updates) {
  try {
    console.log('=== updateProject START ===')
    console.log('projectId:', projectId)
    console.log('updates:', updates)
    
    const updateData = {
      hospital_name: updates.hospitalName,
      equipment_name: updates.equipmentName,
      department: updates.department,
      copyright: updates.copyright
    }
    
    console.log('updateData:', updateData)
    
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select()
      .single()

    console.log('Supabase response:', { data, error })
    console.log('=== updateProject END ===')
    
    return { data, error }
  } catch (error) {
    console.error('=== updateProject EXCEPTION ===')
    console.error('Error updating project:', error)
    return { data: null, error }
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    return { error }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { error }
  }
}

// ==================== ANALYSIS OPERATIONS ====================

/**
 * Save analysis results with detailed breakdown
 */
export async function saveAnalysisResult(userId, projectId, analysisType, inputData, results) {
  try {
    // Save main analysis result
    const { data: analysisData, error: analysisError } = await supabase
      .from('analysis_results')
      .insert([
        {
          user_id: userId,
          project_id: projectId,
          analysis_type: analysisType,
          input_data: inputData,
          results: results
        }
      ])
      .select()
      .single()

    if (analysisError) {
      return { data: null, error: analysisError }
    }

    // Save yearly breakdown data
    if (results.yearlyData && results.yearlyData.length > 0) {
      const yearlyBreakdown = results.yearlyData.map(yearData => {
        const breakdown = {
          analysis_result_id: analysisData.id,
          year: yearData.year,
          pv_factor: yearData.pvFactor,
          pv_expense: yearData.pvExpense
        }

        // Add type-specific fields
        if (analysisType === 'leasing') {
          breakdown.payment = yearData.payment
        } else if (analysisType === 'purchase') {
          breakdown.principal = yearData.principal
          breakdown.interest = yearData.interest
          breakdown.maintenance = yearData.maintenance
          breakdown.total_expense = yearData.totalExpense
          breakdown.entry_type = yearData.type || 'normal'
        } else if (analysisType === 'revenueShare') {
          breakdown.revenue = yearData.revenue
          breakdown.direct_overhead = yearData.directOverhead
          breakdown.allocated_overhead = yearData.allocatedOverhead
          breakdown.operating_profit = yearData.operatingProfit
          breakdown.eat = yearData.eat
        }

        return breakdown
      })

      const { error: breakdownError } = await supabase
        .from('analysis_yearly_breakdown')
        .insert(yearlyBreakdown)

      if (breakdownError) {
        console.error('Error saving yearly breakdown:', breakdownError)
      }
    }

    // Save revenue share procedures if applicable
    if (analysisType === 'revenueShare' && results.procedures && results.procedures.length > 0) {
      const procedures = results.procedures.map(proc => ({
        analysis_result_id: analysisData.id,
        procedure_name: proc.name,
        tariff: proc.tariff,
        volume_per_year: proc.volume,
        annual_revenue: proc.annualRevenue
      }))

      const { error: proceduresError } = await supabase
        .from('revenue_share_procedures')
        .insert(procedures)

      if (proceduresError) {
        console.error('Error saving procedures:', proceduresError)
      }
    }

    return { data: analysisData, error: null }
  } catch (error) {
    console.error('Error saving analysis result:', error)
    return { data: null, error }
  }
}

/**
 * Get all analysis results for a user
 */
export async function getUserAnalyses(userId, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('analysis_results')
      .select(`
        *,
        projects (
          hospital_name,
          equipment_name,
          department
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  } catch (error) {
    console.error('Error fetching user analyses:', error)
    return { data: null, error }
  }
}

/**
 * Get analysis results for a specific project
 */
export async function getProjectAnalyses(projectId) {
  try {
    const { data, error } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    return { data, error }
  } catch (error) {
    console.error('Error fetching project analyses:', error)
    return { data: null, error }
  }
}

/**
 * Get a single analysis result
 */
export async function getAnalysisResult(analysisId) {
  try {
    const { data, error } = await supabase
      .from('analysis_results')
      .select(`
        *,
        projects (
          hospital_name,
          equipment_name,
          department,
          copyright
        ),
        users (
          email,
          full_name
        )
      `)
      .eq('id', analysisId)
      .single()

    return { data, error }
  } catch (error) {
    console.error('Error fetching analysis result:', error)
    return { data: null, error }
  }
}

/**
 * Delete an analysis result
 */
export async function deleteAnalysisResult(analysisId) {
  try {
    const { error } = await supabase
      .from('analysis_results')
      .delete()
      .eq('id', analysisId)

    return { error }
  } catch (error) {
    console.error('Error deleting analysis result:', error)
    return { error }
  }
}

/**
 * Get analysis summary (using the view)
 */
export async function getAnalysisSummary(userId = null, limit = 20) {
  try {
    let query = supabase
      .from('analysis_summary')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (userId) {
      // Note: We need to join with users table to filter by user_id
      // Since this is a view, we'll use a different approach
      const { data, error } = await supabase
        .from('analysis_results')
        .select(`
          id,
          analysis_type,
          created_at,
          results,
          projects (
            hospital_name,
            equipment_name,
            department
          ),
          users (
            email,
            full_name
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      return { data, error }
    }

    const { data, error } = await query

    return { data, error }
  } catch (error) {
    console.error('Error fetching analysis summary:', error)
    return { data: null, error }
  }
}

// ==================== FORM INPUT OPERATIONS ====================

/**
 * Save form input data
 */
export async function saveFormInput(userId, projectId, formType, inputData) {
  try {
    // Check if form input already exists
    const { data: existing, error: fetchError } = await supabase
      .from('form_inputs')
      .select('id')
      .eq('user_id', userId)
      .eq('project_id', projectId)
      .eq('form_type', formType)
      .single()

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('form_inputs')
        .update({ input_data: inputData })
        .eq('id', existing.id)
        .select()
        .single()

      return { data, error }
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('form_inputs')
        .insert([
          {
            user_id: userId,
            project_id: projectId,
            form_type: formType,
            input_data: inputData
          }
        ])
        .select()
        .single()

      return { data, error }
    }
  } catch (error) {
    console.error('Error saving form input:', error)
    return { data: null, error }
  }
}

/**
 * Get form inputs for a project
 */
export async function getProjectFormInputs(projectId) {
  try {
    const { data, error } = await supabase
      .from('form_inputs')
      .select('*')
      .eq('project_id', projectId)

    return { data, error }
  } catch (error) {
    console.error('Error fetching form inputs:', error)
    return { data: null, error }
  }
}

/**
 * Get latest form inputs for a user
 */
export async function getLatestFormInputs(userId) {
  try {
    const { data, error } = await supabase
      .from('form_inputs')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(3)

    return { data, error }
  } catch (error) {
    console.error('Error fetching latest form inputs:', error)
    return { data: null, error }
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Save complete analysis session (project + form inputs + results + recommendation)
 */
export async function saveCompleteAnalysis(userId, projectInfo, analysisData, results, existingProjectId = null) {
  try {
    console.log('saveCompleteAnalysis called with:', { userId, projectInfo, analysisData, results, existingProjectId })
    
    // Validate inputs
    if (!userId) {
      throw new Error('User ID is required')
    }
    if (!projectInfo || !projectInfo.hospitalName || !projectInfo.equipmentName) {
      throw new Error('Project info is incomplete')
    }
    if (!analysisData || !analysisData.leasing || !analysisData.purchase || !analysisData.revenueShare) {
      throw new Error('Analysis data is incomplete')
    }
    if (!results || !results.leasing || !results.purchase || !results.revenueShare) {
      throw new Error('Results data is incomplete')
    }

    let project = null

    // Use existing project or create/update
    if (existingProjectId) {
      console.log('Using existing project ID:', existingProjectId)
      
      // Update existing project
      const { data: updatedProject, error: updateError } = await supabase
        .from('projects')
        .update({
          hospital_name: projectInfo.hospitalName,
          equipment_name: projectInfo.equipmentName,
          department: projectInfo.department,
          copyright: projectInfo.copyright || '© Copyright Mukhsin Hadi',
          supplier_share: analysisData.revenueShare?.supplierShare || 85
        })
        .eq('id', existingProjectId)
        .eq('user_id', userId)
        .select()
        .single()
      
      if (updateError) {
        console.error('Project update error:', updateError)
        return { data: null, error: updateError }
      }
      
      project = updatedProject
      console.log('Project updated:', project)
    } else {
      // Create new project
      console.log('Creating new project...')
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            user_id: userId,
            hospital_name: projectInfo.hospitalName,
            equipment_name: projectInfo.equipmentName,
            department: projectInfo.department,
            copyright: projectInfo.copyright || '© Copyright Mukhsin Hadi',
            supplier_share: analysisData.revenueShare?.supplierShare || 85
          }
        ])
        .select()
        .single()
      
      if (projectError) {
        console.error('Project creation error:', projectError)
        return { data: null, error: projectError }
      }

      project = newProject
      console.log('Project created:', project)
    }

    // Save form inputs for each type
    console.log('Saving form inputs...')
    const formTypes = ['leasing', 'purchase', 'revenueShare']
    for (const type of formTypes) {
      const { error: formError } = await saveFormInput(userId, project.id, type, analysisData[type])
      if (formError) {
        console.error(`Error saving ${type} form input:`, formError)
      }
    }

    // Save all three analysis types with detailed breakdown
    console.log('Saving analysis results...')
    const analysisTypes = ['leasing', 'purchase', 'revenueShare']
    const savedAnalyses = []

    for (const type of analysisTypes) {
      const { data: analysis, error: analysisError } = await saveAnalysisResult(
        userId,
        project.id,
        type,
        analysisData[type],
        results[type]
      )

      if (analysisError) {
        console.error(`Error saving ${type} analysis:`, analysisError)
      } else {
        savedAnalyses.push(analysis)
        console.log(`${type} analysis saved:`, analysis)
      }
    }

    // Save detailed analysis results to new table
    console.log('Saving detailed analysis results...')
    const { error: detailedError } = await supabase
      .from('detailed_analysis_results')
      .insert([
        {
          project_id: project.id,
          user_id: userId,
          
          // Leasing
          leasing_monthly_payment: analysisData.leasing.monthlyPayment,
          leasing_period: analysisData.leasing.period,
          leasing_discount_rate: analysisData.leasing.discountRate,
          leasing_total_pv: results.leasing.totalPV,
          
          // Purchase
          purchase_loan_amount: analysisData.purchase.loanAmount,
          purchase_interest_rate: analysisData.purchase.interestRate,
          purchase_period: analysisData.purchase.period,
          purchase_maintenance_cost: analysisData.purchase.maintenanceCost,
          purchase_residual_value: analysisData.purchase.residualValue,
          purchase_discount_rate: analysisData.purchase.discountRate,
          purchase_total_pv: results.purchase.totalPV,
          
          // Revenue Share
          revenue_share_rs_share: analysisData.revenueShare.rsShare,
          revenue_share_supplier_share: analysisData.revenueShare.supplierShare || (100 - analysisData.revenueShare.rsShare),
          revenue_share_direct_overhead: analysisData.revenueShare.directOverhead,
          revenue_share_allocated_overhead: analysisData.revenueShare.allocatedOverhead,
          revenue_share_tax_rate: analysisData.revenueShare.taxRate,
          revenue_share_discount_rate: analysisData.revenueShare.discountRate,
          revenue_share_period: analysisData.revenueShare.period,
          revenue_share_total_pv: results.revenueShare.totalPV,
          revenue_share_total_procedures: analysisData.revenueShare.procedures?.length || 0,
          revenue_share_total_volume: analysisData.revenueShare.procedures?.reduce((sum, p) => sum + p.volume, 0) || 0,
          revenue_share_total_revenue: results.revenueShare.annualRevenue || 0,
          
          // Recommendation
          recommended_option: results.recommendation.best,
          worst_option: results.recommendation.worst,
          pv_difference: results.recommendation.difference,
          
          // Full results
          full_results: results
        }
      ])

    if (detailedError) {
      console.error('Error saving detailed analysis:', detailedError)
    } else {
      console.log('Detailed analysis saved successfully')
    }

    // Save revenue share procedures to dedicated table
    if (analysisData.revenueShare?.procedures && analysisData.revenueShare.procedures.length > 0) {
      console.log('Saving revenue share procedures...')
      const procedures = analysisData.revenueShare.procedures.map(proc => ({
        project_id: project.id,
        user_id: userId,
        procedure_name: proc.name,
        tariff: proc.tariff,
        volume_per_year: proc.volume,
        annual_revenue: (proc.tariff * (analysisData.revenueShare.rsShare / 100) * proc.volume) / 1000000
      }))

      const { error: proceduresError } = await supabase
        .from('revenue_share_procedures')
        .insert(procedures)

      if (proceduresError) {
        console.error('Error saving procedures to dedicated table:', proceduresError)
      } else {
        console.log('Procedures saved successfully')
      }
    }

    // Save recommendation
    if (results.recommendation) {
      console.log('Saving recommendation...')
      const alternatives = [
        { name: 'Leasing', pv: results.leasing.totalPV },
        { name: 'Borrow & Purchase', pv: results.purchase.totalPV },
        { name: 'Revenue Sharing', pv: results.revenueShare.totalPV }
      ].sort((a, b) => a.pv - b.pv)

      const { error: recommendationError } = await supabase
        .from('analysis_recommendations')
        .insert([
          {
            project_id: project.id,
            user_id: userId,
            best_alternative: alternatives[0].name,
            second_alternative: alternatives[1].name,
            worst_alternative: alternatives[2].name,
            best_pv: alternatives[0].pv,
            second_pv: alternatives[1].pv,
            worst_pv: alternatives[2].pv,
            best_vs_second_diff: alternatives[1].pv - alternatives[0].pv,
            best_vs_worst_diff: alternatives[2].pv - alternatives[0].pv,
            leasing_total_pv: results.leasing.totalPV,
            purchase_total_pv: results.purchase.totalPV,
            revenue_share_total_pv: results.revenueShare.totalPV,
            revenue_share_is_profit: results.revenueShare.isProfit,
            revenue_share_eat: results.revenueShare.eat,
            revenue_share_annual_revenue: results.revenueShare.annualRevenue,
            purchase_trade_in_pv: results.purchase.tradeInPV
          }
        ])

      if (recommendationError) {
        console.error('Error saving recommendation:', recommendationError)
      } else {
        console.log('Recommendation saved successfully')
      }
    }

    console.log('All data saved successfully!')
    return {
      data: {
        project,
        analyses: savedAnalyses,
        recommendation: results.recommendation
      },
      error: null
    }
  } catch (error) {
    console.error('Error in saveCompleteAnalysis:', error)
    return { data: null, error }
  }
}

/**
 * Get statistics for user's analyses
 */
export async function getUserStatistics(userId) {
  try {
    const { data: analyses, error } = await supabase
      .from('analysis_results')
      .select('analysis_type, results, created_at')
      .eq('user_id', userId)

    if (error) {
      return { data: null, error }
    }

    const stats = {
      totalAnalyses: analyses.length,
      byType: {
        leasing: analyses.filter(a => a.analysis_type === 'leasing').length,
        purchase: analyses.filter(a => a.analysis_type === 'purchase').length,
        revenueShare: analyses.filter(a => a.analysis_type === 'revenueShare').length
      },
      recentAnalyses: analyses.slice(0, 5),
      firstAnalysis: analyses.length > 0 ? analyses[analyses.length - 1].created_at : null,
      lastAnalysis: analyses.length > 0 ? analyses[0].created_at : null
    }

    return { data: stats, error: null }
  } catch (error) {
    console.error('Error fetching user statistics:', error)
    return { data: null, error }
  }
}

/**
 * Get detailed analysis with yearly breakdown and procedures
 */
export async function getDetailedAnalysis(analysisId) {
  try {
    // Get main analysis
    const { data: analysis, error: analysisError } = await getAnalysisResult(analysisId)
    
    if (analysisError || !analysis) {
      return { data: null, error: analysisError }
    }

    // Get yearly breakdown
    const { data: yearlyBreakdown, error: breakdownError } = await supabase
      .from('analysis_yearly_breakdown')
      .select('*')
      .eq('analysis_result_id', analysisId)
      .order('year', { ascending: true })

    if (breakdownError) {
      console.error('Error fetching yearly breakdown:', breakdownError)
    }

    // Get procedures if revenue share
    let procedures = null
    if (analysis.analysis_type === 'revenueShare') {
      const { data: proceduresData, error: proceduresError } = await supabase
        .from('revenue_share_procedures')
        .select('*')
        .eq('analysis_result_id', analysisId)

      if (proceduresError) {
        console.error('Error fetching procedures:', proceduresError)
      } else {
        procedures = proceduresData
      }
    }

    return {
      data: {
        ...analysis,
        yearlyBreakdown: yearlyBreakdown || [],
        procedures: procedures || []
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching detailed analysis:', error)
    return { data: null, error }
  }
}

/**
 * Get latest recommendation for a project
 */
export async function getLatestRecommendation(projectId) {
  try {
    const { data, error } = await supabase
      .from('analysis_recommendations')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    return { data, error }
  } catch (error) {
    console.error('Error fetching recommendation:', error)
    return { data: null, error }
  }
}

/**
 * Get all recommendations for a user
 */
export async function getUserRecommendations(userId, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('analysis_recommendations')
      .select(`
        *,
        projects (
          hospital_name,
          equipment_name,
          department
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  } catch (error) {
    console.error('Error fetching user recommendations:', error)
    return { data: null, error }
  }
}

/**
 * Get procedures for a revenue share analysis
 */
export async function getAnalysisProcedures(analysisId) {
  try {
    const { data, error } = await supabase
      .from('revenue_share_procedures')
      .select('*')
      .eq('analysis_result_id', analysisId)
      .order('procedure_name', { ascending: true })

    return { data, error }
  } catch (error) {
    console.error('Error fetching procedures:', error)
    return { data: null, error }
  }
}

/**
 * Get procedures for a project (from dedicated table)
 */
export async function getProjectProcedures(projectId) {
  try {
    const { data, error } = await supabase
      .from('revenue_share_procedures')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    return { data, error }
  } catch (error) {
    console.error('Error fetching project procedures:', error)
    return { data: null, error }
  }
}

/**
 * Get detailed analysis results for a project
 */
export async function getProjectDetailedAnalysis(projectId) {
  try {
    const { data, error } = await supabase
      .from('detailed_analysis_results')
      .select(`
        *,
        projects (
          hospital_name,
          equipment_name,
          department,
          copyright
        )
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    return { data, error }
  } catch (error) {
    console.error('Error fetching detailed analysis:', error)
    return { data: null, error }
  }
}

/**
 * Get all detailed analysis results for a user
 */
export async function getUserDetailedAnalyses(userId, limit = 20) {
  try {
    const { data, error } = await supabase
      .from('detailed_analysis_results')
      .select(`
        *,
        projects (
          hospital_name,
          equipment_name,
          department
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  } catch (error) {
    console.error('Error fetching user detailed analyses:', error)
    return { data: null, error }
  }
}

/**
 * Get yearly breakdown for an analysis
 */
export async function getYearlyBreakdown(analysisId) {
  try {
    const { data, error } = await supabase
      .from('analysis_yearly_breakdown')
      .select('*')
      .eq('analysis_result_id', analysisId)
      .order('year', { ascending: true })

    return { data, error }
  } catch (error) {
    console.error('Error fetching yearly breakdown:', error)
    return { data: null, error }
  }
}
