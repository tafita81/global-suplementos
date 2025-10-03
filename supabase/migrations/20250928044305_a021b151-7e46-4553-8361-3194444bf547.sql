-- Add new columns to target_suppliers table for US partnership acceptance
ALTER TABLE target_suppliers 
ADD COLUMN IF NOT EXISTS accepts_us_dropshipping text DEFAULT 'NÃO',
ADD COLUMN IF NOT EXISTS accepts_us_distribution text DEFAULT 'SIM';