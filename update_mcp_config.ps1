$configPath = "C:\Users\Asus\.kiro\settings\mcp.json"

$config = @{
    mcpServers = @{
        fetch = @{
            args = @("mcp-server-fetch")
            env = @{}
            command = "uvx"
            autoApprove = @()
            disabled = $true
        }
        supabase = @{
            url = "https://mcp.supabase.com/mcp?project_ref=jmiqufimgejqkcboorfy"
            autoApprove = @(
                "apply_migration",
                "list_migrations",
                "execute_sql",
                "list_tables",
                "get_advisors",
                "get_logs"
            )
        }
        "excel-master" = @{
            command = "uvx"
            args = @("--from", "git+https://github.com/lipdog/excel-master-mcp.git", "excel-master-mcp")
            env = @{
                FASTMCP_LOG_LEVEL = "ERROR"
            }
            disabled = $false
            autoApprove = @()
        }
    }
}

$config | ConvertTo-Json -Depth 10 | Set-Content -Path $configPath -Encoding UTF8
Write-Host "Konfigurasi MCP berhasil diupdate!" -ForegroundColor Green
