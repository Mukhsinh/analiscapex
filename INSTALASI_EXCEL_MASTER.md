# Instalasi Excel Master MCP

## Status Instalasi

✅ UV/UVX - Terinstall  
✅ Konfigurasi MCP - Terupdate  
⚠️ Python - Perlu diinstall  
⚠️ XLwings - Akan otomatis terinstall oleh uvx  

## Langkah Instalasi Python

### Opsi 1: Microsoft Store (Termudah)
1. Buka Microsoft Store
2. Cari "Python 3.12" atau "Python 3.11"
3. Klik Install
4. Restart terminal setelah instalasi

### Opsi 2: Download dari Python.org
1. Kunjungi: https://www.python.org/downloads/
2. Download Python 3.11 atau 3.12 (Windows installer)
3. Jalankan installer
4. ✅ PENTING: Centang "Add Python to PATH"
5. Klik "Install Now"
6. Restart terminal

### Opsi 3: Menggunakan Winget
```powershell
winget install Python.Python.3.12
```

## Verifikasi Instalasi

Setelah install Python, jalankan di terminal:
```powershell
python --version
pip --version
uv --version
```

## Aktivasi Excel Master

Setelah Python terinstall:

1. **Restart Kiro** atau
2. **Reconnect MCP Servers:**
   - Tekan `Ctrl+Shift+P`
   - Ketik "MCP"
   - Pilih "Reconnect MCP Servers"

## Penggunaan Excel Master

### Fitur Utama:
- Baca/tulis file Excel (.xlsx, .xls, .xlsm)
- Manipulasi data dengan pandas
- Formatting cells (warna, font, borders)
- Formula dan kalkulasi
- Charts dan visualisasi
- Macro support (xlsm)
- Multiple sheets handling

### Contoh Perintah:

**Membaca file Excel:**
```
Baca semua data dari file "Analisis Keputusan Capex - Borrow-Purchase atau Leasing-KSO atau Revenue Sharing.xlsx"
```

**Analisis data:**
```
Analisis sheet pertama dan berikan summary statistik
```

**Manipulasi data:**
```
Tambahkan kolom baru "Total Cost" yang menghitung sum dari kolom A dan B
```

**Export ke format lain:**
```
Convert sheet "Data Capex" ke format CSV
```

**Integrasi dengan Supabase:**
```
Baca data dari Excel sheet "Analysis" dan import ke tabel Supabase "capex_data"
```

## Troubleshooting

### Error: Python not found
- Pastikan Python sudah terinstall: `python --version`
- Restart terminal setelah instalasi Python
- Cek PATH environment variable

### Error: xlwings not found
- uvx akan otomatis install dependencies
- Jika manual diperlukan: `pip install xlwings pandas openpyxl`

### Excel Master tidak connect
1. Cek MCP Server view di Kiro
2. Lihat logs untuk error details
3. Pastikan Python dan pip berfungsi
4. Reconnect dari Command Palette

### Permission denied saat akses Excel
- Tutup file Excel jika sedang terbuka
- Pastikan file tidak read-only
- Jalankan Kiro sebagai administrator jika perlu

## Konfigurasi Saat Ini

File: `C:\Users\Asus\.kiro\settings\mcp.json`

```json
{
  "mcpServers": {
    "excel-master": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/lipdog/excel-master-mcp.git",
        "excel-master-mcp"
      ],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    },
    "supabase": {
      "url": "https://mcp.supabase.com/mcp?project_ref=jmiqufimgejqkcboorfy",
      "autoApprove": [...]
    }
  }
}
```

## Backup

Backup konfigurasi tersimpan di:
`C:\Users\Asus\.kiro\settings\mcp.json.backup`

## Next Steps

1. ✅ Install Python (pilih salah satu opsi di atas)
2. ✅ Restart terminal
3. ✅ Restart Kiro atau reconnect MCP servers
4. ✅ Test dengan perintah: "List semua sheets di file Excel saya"
