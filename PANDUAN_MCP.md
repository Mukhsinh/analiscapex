# Panduan MCP - Supabase & Excel

## Instalasi Prasyarat

### 1. Install UV (Python Package Manager)
MCP Excel memerlukan `uvx` yang merupakan bagian dari `uv`. Pilih salah satu cara instalasi:

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Atau menggunakan pip:**
```bash
pip install uv
```

**Atau menggunakan Scoop:**
```bash
scoop install uv
```

Setelah instalasi, restart terminal Anda.

### 2. Aktivasi MCP Servers
- Restart Kiro, atau
- Buka Command Palette (Ctrl+Shift+P) → cari "MCP" → pilih "Reconnect MCP Servers"

## MCP Supabase

### Fitur Utama:
- Kelola database tables, extensions, migrations
- Execute SQL queries
- Deploy Edge Functions
- Manage development branches
- Monitor logs dan advisors
- Generate TypeScript types

### Contoh Penggunaan:

**Melihat daftar tabel:**
```
Tampilkan semua tabel di database Supabase saya
```

**Execute SQL:**
```
Jalankan query: SELECT * FROM users LIMIT 10
```

**Membuat migration:**
```
Buat migration untuk menambahkan kolom 'email' ke tabel users
```

## MCP Excel

### Fitur Utama:
- Baca data dari file Excel (.xlsx, .xls)
- Tulis data ke Excel
- Manipulasi sheets
- Analisis data spreadsheet

### Contoh Penggunaan dengan File Anda:

**Membaca data:**
```
Baca data dari file "Analisis Keputusan Capex - Borrow-Purchase atau Leasing-KSO atau Revenue Sharing.xlsx"
```

**Analisis data:**
```
Analisis sheet pertama dari file Excel saya dan berikan ringkasan datanya
```

**Export ke Supabase:**
```
Baca data dari Excel saya dan import ke tabel Supabase
```

## Workflow Terintegrasi

### Contoh: Excel → Supabase

1. **Baca data dari Excel:**
   ```
   Ekstrak data dari sheet "Data Capex" di file Excel saya
   ```

2. **Buat tabel di Supabase:**
   ```
   Buat tabel 'capex_analysis' di Supabase dengan kolom sesuai data Excel
   ```

3. **Import data:**
   ```
   Import data Excel ke tabel capex_analysis di Supabase
   ```

## Tips Penggunaan

1. **Auto-approve tools:** Tambahkan tool names ke `autoApprove` array jika Anda ingin skip konfirmasi manual
2. **Disable server:** Set `"disabled": true` untuk menonaktifkan server tanpa menghapus konfigurasi
3. **Logs:** Ubah `FASTMCP_LOG_LEVEL` ke "DEBUG" jika perlu troubleshooting

## Troubleshooting

**Error: uvx command not found**
- Pastikan UV sudah terinstall: `uv --version`
- Restart terminal setelah instalasi

**MCP server tidak connect**
- Cek MCP Server view di Kiro feature panel
- Lihat error logs di panel tersebut
- Reconnect server dari Command Palette

**Excel file tidak terbaca**
- Pastikan path file benar (gunakan path relatif atau absolut)
- File tidak sedang dibuka di Excel
- Format file didukung (.xlsx, .xls)

## Lokasi Konfigurasi

- **Workspace:** `.kiro/settings/mcp.json` (konfigurasi saat ini)
- **User/Global:** `~/.kiro/settings/mcp.json` (berlaku untuk semua workspace)

## Command Palette MCP

Buka Command Palette (Ctrl+Shift+P) dan ketik "MCP" untuk melihat semua perintah terkait:
- Open MCP Server View
- Reconnect MCP Servers
- Configure MCP Settings
- View MCP Logs
