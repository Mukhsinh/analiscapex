# Script untuk fix Excel MCP configuration

$configPath = "C:\Users\Asus\.kiro\settings\mcp.json"

# Backup dulu
Copy-Item $configPath "$configPath.backup2" -Force

# Baca config
$config = Get-Content $configPath -Raw | ConvertFrom-Json

# Disable excel-master yang bermasalah
$config.mcpServers.'excel-master'.disabled = $true

# Tambah excel server yang lebih sederhana menggunakan npx
if (-not $config.mcpServers.excel) {
    $config.mcpServers | Add-Member -NotePropertyName "excel" -NotePropertyValue @{
        command = "npx"
        args = @("-y", "@modelcontextprotocol/server-excel")
        env = @{}
        disabled = $false
        autoApprove = @()
    }
} else {
    $config.mcpServers.excel.disabled = $false
}

# Simpan
$config | ConvertTo-Json -Depth 10 | Set-Content $configPath -Encoding UTF8

Write-Host "✓ Konfigurasi berhasil diupdate"
Write-Host "✓ Backup tersimpan di: $configPath.backup2"
Write-Host ""
Write-Host "Langkah selanjutnya:"
Write-Host "1. Tekan Ctrl+Shift+P"
Write-Host "2. Ketik 'MCP: Reconnect'"
Write-Host "3. Pilih 'Reconnect MCP Servers'"
