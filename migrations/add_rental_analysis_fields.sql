-- Migration: Add new fields to rental_analysis table
-- Date: 2026-03-05
-- Description: Add discount_rate, vendor_quote, present_value_cost, and feasibility fields

-- Add new columns to rental_analysis table
ALTER TABLE rental_analysis
ADD COLUMN IF NOT EXISTS discount_rate DECIMAL(5,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS vendor_quote DECIMAL(15,2),
ADD COLUMN IF NOT EXISTS present_value_cost DECIMAL(15,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS feasibility_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS price_difference DECIMAL(15,2),
ADD COLUMN IF NOT EXISTS price_difference_percent DECIMAL(8,2);

-- Add comments to new columns
COMMENT ON COLUMN rental_analysis.discount_rate IS 'Discount rate untuk menghitung Present Value (%)';
COMMENT ON COLUMN rental_analysis.vendor_quote IS 'Harga penawaran sewa dari vendor per tahun (Rp)';
COMMENT ON COLUMN rental_analysis.present_value_cost IS 'Present Value dari total biaya sewa (Rp)';
COMMENT ON COLUMN rental_analysis.feasibility_status IS 'Status kelayakan: LAYAK atau TIDAK LAYAK';
COMMENT ON COLUMN rental_analysis.price_difference IS 'Selisih antara vendor quote dan kalkulasi (Rp)';
COMMENT ON COLUMN rental_analysis.price_difference_percent IS 'Persentase selisih harga (%)';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_rental_analysis_feasibility ON rental_analysis(feasibility_status);
CREATE INDEX IF NOT EXISTS idx_rental_analysis_vendor_quote ON rental_analysis(vendor_quote) WHERE vendor_quote IS NOT NULL;

-- Update existing records to have default values
UPDATE rental_analysis 
SET 
  discount_rate = 0,
  present_value_cost = 0
WHERE discount_rate IS NULL OR present_value_cost IS NULL;

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'rental_analysis'
  AND column_name IN ('discount_rate', 'vendor_quote', 'present_value_cost', 'feasibility_status', 'price_difference', 'price_difference_percent')
ORDER BY ordinal_position;
