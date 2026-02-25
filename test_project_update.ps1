# Test Project Update Script
# Tests if project updates are working correctly

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Test Project Update - 25 Feb 2026" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$projectId = "5720e2c6-b9da-4803-935f-8103689cb304"
$supabaseUrl = "https://mwrlfsdyblxqxetqxwhp.supabase.co"
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cmxmc2R5Ymx4cXhldHF4d2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzA5NTksImV4cCI6MjA4NzU0Njk1OX0.8tUPNjjbVdXJX-2c0TC9Nlg-CJWArTtVl4Ib7K0CwC0"

# Test 1: Get current project data
Write-Host "Test 1: Getting current project data..." -ForegroundColor Yellow
$headers = @{
    "apikey" = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/projects?id=eq.$projectId&select=*" -Method Get -Headers $headers
    Write-Host "✓ Current data retrieved successfully" -ForegroundColor Green
    Write-Host "  Hospital: $($response.hospital_name)" -ForegroundColor Gray
    Write-Host "  Equipment: $($response.equipment_name)" -ForegroundColor Gray
    Write-Host "  Department: $($response.department)" -ForegroundColor Gray
    Write-Host "  Copyright: $($response.copyright)" -ForegroundColor Gray
    Write-Host "  Updated: $($response.updated_at)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to get current data" -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    exit 1
}

# Test 2: Update project
Write-Host "Test 2: Updating project..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "HH:mm:ss"
$updateData = @{
    hospital_name = "RS TEST UPDATE - $timestamp"
    equipment_name = "Test Equipment - $timestamp"
    department = "Test Department"
    copyright = "© Test Copyright - $timestamp"
} | ConvertTo-Json

try {
    $updateResponse = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/projects?id=eq.$projectId" -Method Patch -Headers $headers -Body $updateData
    Write-Host "✓ Project updated successfully" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ Failed to update project" -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    exit 1
}

# Test 3: Verify update
Write-Host "Test 3: Verifying update..." -ForegroundColor Yellow
Start-Sleep -Seconds 1

try {
    $verifyResponse = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/projects?id=eq.$projectId&select=*" -Method Get -Headers $headers
    Write-Host "✓ Update verified successfully" -ForegroundColor Green
    Write-Host "  Hospital: $($verifyResponse.hospital_name)" -ForegroundColor Gray
    Write-Host "  Equipment: $($verifyResponse.equipment_name)" -ForegroundColor Gray
    Write-Host "  Department: $($verifyResponse.department)" -ForegroundColor Gray
    Write-Host "  Copyright: $($verifyResponse.copyright)" -ForegroundColor Gray
    Write-Host "  Updated: $($verifyResponse.updated_at)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to verify update" -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    exit 1
}

# Test 4: Check if data changed
Write-Host "Test 4: Checking if data changed..." -ForegroundColor Yellow
if ($response.hospital_name -ne $verifyResponse.hospital_name) {
    Write-Host "✓ Data changed successfully!" -ForegroundColor Green
    Write-Host "  Before: $($response.hospital_name)" -ForegroundColor Gray
    Write-Host "  After:  $($verifyResponse.hospital_name)" -ForegroundColor Gray
} else {
    Write-Host "✗ Data did not change" -ForegroundColor Red
    Write-Host "  This might indicate an issue with the update" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "All tests completed!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open the application in browser" -ForegroundColor Gray
Write-Host "2. Go to 'Pengaturan Proyek' menu" -ForegroundColor Gray
Write-Host "3. Try updating a field" -ForegroundColor Gray
Write-Host "4. Check if UI updates without refresh" -ForegroundColor Gray
Write-Host "5. Refresh page and verify data persists" -ForegroundColor Gray
Write-Host ""
