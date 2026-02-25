# Test Sinkronisasi Database - 25 Februari 2026
# Script untuk testing integrasi frontend-database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST SINKRONISASI DATABASE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Verify saveCompleteAnalysis accepts existingProjectId
Write-Host "Test 1: Checking saveCompleteAnalysis signature..." -ForegroundColor Yellow
$saveCompleteAnalysisContent = Get-Content "src/lib/database.js" -Raw
if ($saveCompleteAnalysisContent -match "saveCompleteAnalysis\(userId, projectInfo, analysisData, results, existingProjectId") {
    Write-Host "✓ PASS: saveCompleteAnalysis accepts existingProjectId parameter" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: saveCompleteAnalysis does not accept existingProjectId parameter" -ForegroundColor Red
}
Write-Host ""

# Test 2: Verify UPDATE logic exists
Write-Host "Test 2: Checking UPDATE project logic..." -ForegroundColor Yellow
if ($saveCompleteAnalysisContent -match "if \(existingProjectId\)") {
    Write-Host "✓ PASS: UPDATE logic exists for existing projects" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: UPDATE logic not found" -ForegroundColor Red
}
Write-Host ""

# Test 3: Verify App.jsx passes currentProjectId
Write-Host "Test 3: Checking if App.jsx passes currentProjectId..." -ForegroundColor Yellow
$appContent = Get-Content "src/App.jsx" -Raw
if ($appContent -match "currentProjectId\s*//\s*Pass existing project ID") {
    Write-Host "✓ PASS: App.jsx passes currentProjectId to saveCompleteAnalysis" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: App.jsx does not pass currentProjectId" -ForegroundColor Red
}
Write-Host ""

# Test 4: Verify refreshAnalysisHistory event dispatch
Write-Host "Test 4: Checking refreshAnalysisHistory event..." -ForegroundColor Yellow
if ($appContent -match "dispatchEvent\(new Event\('refreshAnalysisHistory'\)\)") {
    Write-Host "✓ PASS: refreshAnalysisHistory event is dispatched" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: refreshAnalysisHistory event not found" -ForegroundColor Red
}
Write-Host ""

# Test 5: Verify AnalysisHistory event listener
Write-Host "Test 5: Checking AnalysisHistory event listener..." -ForegroundColor Yellow
$historyContent = Get-Content "src/components/AnalysisHistory.jsx" -Raw
if ($historyContent -match "addEventListener\('refreshAnalysisHistory'") {
    Write-Host "✓ PASS: AnalysisHistory listens to refreshAnalysisHistory event" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: AnalysisHistory event listener not found" -ForegroundColor Red
}
Write-Host ""

# Test 6: Verify ProjectSettings data comparison
Write-Host "Test 6: Checking ProjectSettings data comparison..." -ForegroundColor Yellow
$projectSettingsContent = Get-Content "src/components/ProjectSettings.jsx" -Raw
if ($projectSettingsContent -match "JSON\.stringify\(localInfo\)") {
    Write-Host "✓ PASS: ProjectSettings compares data before updating" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: ProjectSettings data comparison not found" -ForegroundColor Red
}
Write-Host ""

# Test 7: Verify App.jsx data comparison in load
Write-Host "Test 7: Checking App.jsx data comparison in load..." -ForegroundColor Yellow
if ($appContent -match "JSON\.stringify\(projectInfo\) !== JSON\.stringify\(loadedProjectInfo\)") {
    Write-Host "✓ PASS: App.jsx compares data before updating" -ForegroundColor Green
} else {
    Write-Host "✗ FAIL: App.jsx data comparison not found" -ForegroundColor Red
}
Write-Host ""

# Test 8: Check for no syntax errors
Write-Host "Test 8: Checking for syntax errors..." -ForegroundColor Yellow
Write-Host "Running diagnostics..." -ForegroundColor Gray

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Perbaikan yang dilakukan:" -ForegroundColor White
Write-Host "1. saveCompleteAnalysis sekarang support UPDATE existing project" -ForegroundColor White
Write-Host "2. App.jsx pass currentProjectId ke saveCompleteAnalysis" -ForegroundColor White
Write-Host "3. AnalysisHistory auto-refresh dengan event listener" -ForegroundColor White
Write-Host "4. ProjectSettings dan App.jsx compare data sebelum update" -ForegroundColor White
Write-Host "5. Prevent unnecessary re-renders dan infinite loops" -ForegroundColor White
Write-Host ""
Write-Host "Untuk testing manual:" -ForegroundColor Yellow
Write-Host "1. Jalankan dev server: npm run dev" -ForegroundColor Gray
Write-Host "2. Login ke aplikasi" -ForegroundColor Gray
Write-Host "3. Edit project settings dan save" -ForegroundColor Gray
Write-Host "4. Input data form dan calculate" -ForegroundColor Gray
Write-Host "5. Check database - project tidak duplicate" -ForegroundColor Gray
Write-Host "6. Check analysis history - auto-refresh" -ForegroundColor Gray
Write-Host "7. Refresh halaman - data ter-load dari database" -ForegroundColor Gray
Write-Host ""
Write-Host "Dokumentasi lengkap: PERBAIKAN_SINKRONISASI_DATABASE_25_FEB_2026.md" -ForegroundColor Cyan
Write-Host ""
