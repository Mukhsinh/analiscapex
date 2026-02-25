# Test Database Insert Script
# Untuk memverifikasi bahwa data berhasil disimpan ke database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Test Database Insert - Supabase" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load environment variables
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1]
            $value = $matches[2]
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
    Write-Host "✓ Environment variables loaded" -ForegroundColor Green
} else {
    Write-Host "✗ .env file not found!" -ForegroundColor Red
    exit 1
}

$SUPABASE_URL = $env:VITE_SUPABASE_URL
$SUPABASE_KEY = $env:VITE_SUPABASE_ANON_KEY

if (-not $SUPABASE_URL -or -not $SUPABASE_KEY) {
    Write-Host "✗ Supabase credentials not found in .env" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Supabase URL: $SUPABASE_URL" -ForegroundColor Green
Write-Host ""

# Function to make Supabase API call
function Invoke-SupabaseQuery {
    param(
        [string]$Table,
        [string]$Method = "GET",
        [string]$Body = $null,
        [string]$Select = "*"
    )
    
    $headers = @{
        "apikey" = $SUPABASE_KEY
        "Authorization" = "Bearer $SUPABASE_KEY"
        "Content-Type" = "application/json"
        "Prefer" = "return=representation"
    }
    
    $url = "$SUPABASE_URL/rest/v1/$Table"
    if ($Method -eq "GET") {
        $url += "?select=$Select"
    }
    
    try {
        if ($Body) {
            $response = Invoke-RestMethod -Uri $url -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri $url -Method $Method -Headers $headers
        }
        return $response
    } catch {
        Write-Host "Error: $_" -ForegroundColor Red
        return $null
    }
}

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  1. Checking Users" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$users = Invoke-SupabaseQuery -Table "users" -Select "id,email,full_name"
if ($users) {
    Write-Host "✓ Found $($users.Count) user(s)" -ForegroundColor Green
    $users | ForEach-Object {
        Write-Host "  - $($_.email) ($($_.full_name))" -ForegroundColor Cyan
        Write-Host "    ID: $($_.id)" -ForegroundColor Gray
    }
    $USER_ID = $users[0].id
} else {
    Write-Host "✗ No users found" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  2. Checking Projects" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$projects = Invoke-SupabaseQuery -Table "projects" -Select "id,hospital_name,equipment_name,created_at" `
    | Where-Object { $_.user_id -eq $USER_ID } `
    | Sort-Object -Property created_at -Descending `
    | Select-Object -First 5

if ($projects) {
    Write-Host "✓ Found $($projects.Count) project(s)" -ForegroundColor Green
    $projects | ForEach-Object {
        Write-Host "  - $($_.hospital_name) - $($_.equipment_name)" -ForegroundColor Cyan
        Write-Host "    ID: $($_.id)" -ForegroundColor Gray
        Write-Host "    Created: $($_.created_at)" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠ No projects found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  3. Checking Form Inputs" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$formInputs = Invoke-SupabaseQuery -Table "form_inputs" -Select "id,form_type,updated_at"
if ($formInputs) {
    Write-Host "✓ Found $($formInputs.Count) form input(s)" -ForegroundColor Green
    $formInputs | Group-Object -Property form_type | ForEach-Object {
        Write-Host "  - $($_.Name): $($_.Count) record(s)" -ForegroundColor Cyan
    }
} else {
    Write-Host "⚠ No form inputs found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  4. Checking Analysis Results" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$analysisResults = Invoke-SupabaseQuery -Table "analysis_results" -Select "id,analysis_type,created_at"
if ($analysisResults) {
    Write-Host "✓ Found $($analysisResults.Count) analysis result(s)" -ForegroundColor Green
    $analysisResults | Group-Object -Property analysis_type | ForEach-Object {
        Write-Host "  - $($_.Name): $($_.Count) record(s)" -ForegroundColor Cyan
    }
} else {
    Write-Host "⚠ No analysis results found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  5. Checking Detailed Analysis" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$detailedAnalysis = Invoke-SupabaseQuery -Table "detailed_analysis_results" -Select "id,recommended_option,created_at"
if ($detailedAnalysis) {
    Write-Host "✓ Found $($detailedAnalysis.Count) detailed analysis" -ForegroundColor Green
    $detailedAnalysis | ForEach-Object {
        Write-Host "  - Recommended: $($_.recommended_option)" -ForegroundColor Cyan
        Write-Host "    Created: $($_.created_at)" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠ No detailed analysis found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  6. Checking Recommendations" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$recommendations = Invoke-SupabaseQuery -Table "analysis_recommendations" -Select "id,best_alternative,created_at"
if ($recommendations) {
    Write-Host "✓ Found $($recommendations.Count) recommendation(s)" -ForegroundColor Green
    $recommendations | ForEach-Object {
        Write-Host "  - Best: $($_.best_alternative)" -ForegroundColor Cyan
        Write-Host "    Created: $($_.created_at)" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠ No recommendations found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  7. Checking Revenue Share Procedures" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$procedures = Invoke-SupabaseQuery -Table "revenue_share_procedures" -Select "id,procedure_name,tariff,volume_per_year"
if ($procedures) {
    Write-Host "✓ Found $($procedures.Count) procedure(s)" -ForegroundColor Green
    $procedures | Select-Object -First 5 | ForEach-Object {
        Write-Host "  - $($_.procedure_name)" -ForegroundColor Cyan
        Write-Host "    Tariff: $($_.tariff), Volume: $($_.volume_per_year)" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠ No procedures found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Users: $($users.Count)" -ForegroundColor White
Write-Host "Projects: $(if ($projects) { $projects.Count } else { 0 })" -ForegroundColor White
Write-Host "Form Inputs: $(if ($formInputs) { $formInputs.Count } else { 0 })" -ForegroundColor White
Write-Host "Analysis Results: $(if ($analysisResults) { $analysisResults.Count } else { 0 })" -ForegroundColor White
Write-Host "Detailed Analysis: $(if ($detailedAnalysis) { $detailedAnalysis.Count } else { 0 })" -ForegroundColor White
Write-Host "Recommendations: $(if ($recommendations) { $recommendations.Count } else { 0 })" -ForegroundColor White
Write-Host "Procedures: $(if ($procedures) { $procedures.Count } else { 0 })" -ForegroundColor White
Write-Host ""

# Overall status
$hasData = ($projects -and $projects.Count -gt 0) -or 
           ($analysisResults -and $analysisResults.Count -gt 0) -or
           ($detailedAnalysis -and $detailedAnalysis.Count -gt 0)

if ($hasData) {
    Write-Host "✓ Database has data - Integration working!" -ForegroundColor Green
} else {
    Write-Host "⚠ Database is empty - Please test the application" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Start the dev server: npm run dev" -ForegroundColor White
    Write-Host "2. Login to the application" -ForegroundColor White
    Write-Host "3. Fill in the forms and click 'Hitung & Bandingkan'" -ForegroundColor White
    Write-Host "4. Run this script again to verify data is saved" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
