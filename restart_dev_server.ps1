# Script untuk restart development server
# Gunakan setelah mengubah file .env

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Restart Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cek apakah file .env ada
if (Test-Path ".env") {
    Write-Host "[OK] File .env ditemukan" -ForegroundColor Green
    Write-Host ""
    Write-Host "Isi file .env:" -ForegroundColor Yellow
    Get-Content ".env"
    Write-Host ""
} else {
    Write-Host "[ERROR] File .env tidak ditemukan!" -ForegroundColor Red
    Write-Host "Buat file .env terlebih dahulu dengan isi:" -ForegroundColor Yellow
    Write-Host "VITE_SUPABASE_URL=https://mwrlfsdyblxqxetqxwhp.supabase.co"
    Write-Host "VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cmxmc2R5Ymx4cXhldHF4d2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzA5NTksImV4cCI6MjA4NzU0Njk1OX0.8tUPNjjbVdXJX-2c0TC9Nlg-CJWArTtVl4Ib7K0CwC0"
    Write-Host ""
    exit 1
}

Write-Host "Menghentikan proses Node.js yang sedang berjalan..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "[OK] Proses dihentikan" -ForegroundColor Green
Write-Host ""

Write-Host "Memulai development server..." -ForegroundColor Yellow
Write-Host "Tekan Ctrl+C untuk menghentikan server" -ForegroundColor Cyan
Write-Host ""

# Jalankan npm run dev
npm run dev
