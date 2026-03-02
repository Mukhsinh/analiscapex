# Patch untuk RevenueShareForm.jsx

## Perubahan yang Perlu Diterapkan

File ini berisi instruksi step-by-step untuk menambahkan fitur metode Flat Fee ke RevenueShareForm.jsx

### Step 1: Tambahkan calculationMethod di state

**Lokasi:** Baris 5 (setelah `const [procedureLocalValues, setProcedureLocalValues] = useState({})`)

**Tambahkan:**
```javascript
  // Metode perhitungan: 'percentage' atau 'flatFee'
  const calculationMethod = data.calculationMethod || 'percentage'
```

### Step 2: Update newProcedure state

**Lokasi:** Baris 4

**Dari:**
```javascript
const [newProcedure, setNewProcedure] = useState({ name: '', tariff: 150000, volume: 0 })
```

**Menjadi:**
```javascript
const [newProcedure, setNewProcedure] = useState({ name: '', tariff: 150000, volume: 0, flatFee: 0 })
```

### Step 3: Update addProcedure function

**Lokasi:** Sekitar baris 100-110

**Dari:**
```javascript
const addProcedure = () => {
  if (newProcedure.name && newProcedure.volume > 0) {
    const newProc = {
      id: Date.now(),
      ...newProcedure
    }
    setData({ ...data, procedures: [...data.procedures, newProc] })
    setNewProcedure({ name: '', tariff: 150000, volume: 0 })
    setShowAddProcedure(false)
  }
}
```

**Menjadi:**
```javascript
const addProcedure = () => {
  if (newProcedure.name && newProcedure.volume > 0) {
    const newProc = {
      id: Date.now(),
      ...newProcedure,
      flatFee: newProcedure.flatFee || 0
    }
    setData({ ...data, procedures: [...data.procedures, newProc] })
    setNewProcedure({ name: '', tariff: 150000, volume: 0, flatFee: 0 })
    setShowAddProcedure(false)
  }
}
```

