-- Migration: Create rental_analysis table
-- Description: Tabel untuk menyimpan analisis perhitungan harga sewa alat medis
-- Created: 2026-03-05

-- Create rental_analysis table
CREATE TABLE IF NOT EXISTS rental_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    
    -- Input Data
    equipment_name VARCHAR(255) NOT NULL,
    purchase_price DECIMAL(15, 2) NOT NULL,
    economic_life INTEGER NOT NULL CHECK (economic_life > 0),
    residual_value DECIMAL(15, 2) DEFAULT 0,
    profit_margin DECIMAL(5, 2) NOT NULL CHECK (profit_margin >= 0),
    rental_period INTEGER NOT NULL CHECK (rental_period > 0),
    
    -- Calculated Results
    rental_price_per_year DECIMAL(15, 2) NOT NULL,
    total_revenue DECIMAL(15, 2) NOT NULL,
    total_cost DECIMAL(15, 2) NOT NULL,
    total_profit DECIMAL(15, 2) NOT NULL,
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_rental_analysis_user_id ON rental_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_rental_analysis_project_id ON rental_analysis(project_id);
CREATE INDEX IF NOT EXISTS idx_rental_analysis_created_at ON rental_analysis(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_rental_analysis_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_rental_analysis_updated_at
    BEFORE UPDATE ON rental_analysis
    FOR EACH ROW
    EXECUTE FUNCTION update_rental_analysis_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE rental_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own rental analyses
CREATE POLICY rental_analysis_select_policy ON rental_analysis
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own rental analyses
CREATE POLICY rental_analysis_insert_policy ON rental_analysis
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own rental analyses
CREATE POLICY rental_analysis_update_policy ON rental_analysis
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own rental analyses
CREATE POLICY rental_analysis_delete_policy ON rental_analysis
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create view for rental analysis summary
CREATE OR REPLACE VIEW rental_analysis_summary AS
SELECT 
    ra.id,
    ra.user_id,
    ra.project_id,
    ra.equipment_name,
    ra.purchase_price,
    ra.economic_life,
    ra.residual_value,
    ra.profit_margin,
    ra.rental_period,
    ra.rental_price_per_year,
    ra.total_revenue,
    ra.total_cost,
    ra.total_profit,
    ra.created_at,
    u.email as user_email,
    u.full_name as user_name,
    p.hospital_name,
    p.department
FROM rental_analysis ra
LEFT JOIN users u ON ra.user_id = u.id
LEFT JOIN projects p ON ra.project_id = p.id
ORDER BY ra.created_at DESC;

-- Grant permissions on view
GRANT SELECT ON rental_analysis_summary TO authenticated;

-- Comments for documentation
COMMENT ON TABLE rental_analysis IS 'Tabel untuk menyimpan analisis perhitungan harga sewa alat medis';
COMMENT ON COLUMN rental_analysis.purchase_price IS 'Harga beli alat dalam Rupiah';
COMMENT ON COLUMN rental_analysis.economic_life IS 'Umur ekonomis alat dalam tahun';
COMMENT ON COLUMN rental_analysis.residual_value IS 'Nilai residu alat di akhir umur ekonomis dalam Rupiah';
COMMENT ON COLUMN rental_analysis.profit_margin IS 'Tingkat keuntungan vendor dalam persen';
COMMENT ON COLUMN rental_analysis.rental_period IS 'Masa sewa dalam tahun';
COMMENT ON COLUMN rental_analysis.rental_price_per_year IS 'Harga sewa per tahun hasil perhitungan';
COMMENT ON COLUMN rental_analysis.total_revenue IS 'Total pendapatan dari sewa';
COMMENT ON COLUMN rental_analysis.total_cost IS 'Total biaya (harga beli - nilai residu)';
COMMENT ON COLUMN rental_analysis.total_profit IS 'Total keuntungan (revenue - cost)';
