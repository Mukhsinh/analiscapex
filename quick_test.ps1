# Quick Test Script - Verifikasi Setup Database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Quick Test - Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Test 1: File .env
Write-Host "[1/5] Checking .env file..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "  [OK] File .env exists" -ForegroundColor Green
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "VITE_SUPABASE_URL") {
        Write-Host "  [OK] VITE_SUPABASE_URL found" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] VITE_SUPABASE_URL not found" -ForegroundColor Red
        $allGood = $false
    }
    if ($envContent -match "VITE_SUPABASE_ANON_KEY") {
        Write-Host "  [OK] VITE_SUPABASE_ANON_KEY found" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] VITE_SUPABASE_ANON_KEY not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  [ERROR] File .env not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Test 2: supabase.js
Write-Host "[2/5] Checking src/lib/supabase.js..." -ForegroundColor Yellow
if (Test-Path "src/lib/supabase.js") {
    Write-Host "  [OK] File exists" -ForegroundColor Green
    $supabaseContent = Get-Content "src/lib/supabase.js" -Raw
    if ($supabaseContent -match "import\.meta\.env\.VITE_SUPABASE_URL") {
        Write-Host "  [OK] Uses import.meta.env.VITE_SUPABASE_URL" -ForegroundColor Green
    } else {
        Write-Host "  [WARNING] Not using import.meta.env" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [ERROR] File not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Test 3: database.js
Write-Host "[3/5] Checking src/lib/database.js..." -ForegroundColor Yellow
if (Test-Path "src/lib/database.js") {
    Write-Host "  [OK] File exists" -ForegroundColor Green
    $dbContent = Get-Content "src/lib/database.js" -Raw
    if ($dbContent -match "createProject") {
        Write-Host "  [OK] createProject function found" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] createProject function not found" -ForegroundColor Red
        $allGood = $false
    }
    if ($dbContent -match "updateProject") {
        Write-Host "  [OK] updateProject function found" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] updateProject function not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  [ERROR] File not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Test 4: ProjectSettings.jsx
Write-Host "[4/5] Checking src/components/ProjectSettings.jsx..." -ForegroundColor Yellow
if (Test-Path "src/components/ProjectSettings.jsx") {
    Write-Host "  [OK] File exists" -ForegroundColor Green
    $psContent = Get-Content "src/components/ProjectSettings.jsx" -Raw
    if ($psContent -match "createProject") {
        Write-Host "  [OK] Imports createProject" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] Does not import createProject" -ForegroundColor Red
        $allGood = $false
    }
    if ($psContent -match "console\.log") {
        Write-Host "  [OK] Has console.log for debugging" -ForegroundColor Green
    } else {
        Write-Host "  [WARNING] No console.log found" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [ERROR] File not found!" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Test 5: Test HTML
Write-Host "[5/5] Checking test files..." -ForegroundColor Yellow
if (Test-Path "test_insert_debug.html") {
    Write-Host "  [OK] test_insert_debug.html exists" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] test_insert_debug.html not found" -ForegroundColor Yellow
}
if (Test-Path "PANDUAN_DEBUGGING_INSERT.md") {
    Write-Host "  [OK] PANDUAN_DEBUGGING_INSERT.md exists" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] PANDUAN_DEBUGGING_INSERT.md not found" -ForegroundColor Yellow
}
if (Test-Path "CHECKLIST_VERIFIKASI_INSERT.md") {
    Write-Host "  [OK] CHECKLIST_VERIFIKASI_INSERT.md exists" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] CHECKLIST_VERIFIKASI_INSERT.md not found" -ForegroundColor Yellow
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "  ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Restart development server: .\restart_dev_server.ps1"
    Write-Host "2. Open browser: http://localhost:5173"
    Write-Host "3. Open Developer Tools (F12)"
    Write-Host "4. Login to the app"
    Write-Host "5. Go to 'Pengaturan Proyek'"
    Write-Host "6. Fill the form and click 'Simpan Perubahan'"
    Write-Host "7. Check console logs"
    Write-Host "8. Verify data in Supabase Dashboard"
} else {
    Write-Host "  SOME TESTS FAILED!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the errors above before proceeding." -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
