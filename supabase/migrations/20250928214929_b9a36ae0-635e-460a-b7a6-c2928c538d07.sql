-- Adicionar colunas para validação profunda
ALTER TABLE target_suppliers 
ADD COLUMN IF NOT EXISTS real_data_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS last_verification timestamp with time zone,
ADD COLUMN IF NOT EXISTS verification_notes text,
ADD COLUMN IF NOT EXISTS company_exists boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS deep_validation_score integer DEFAULT 0;

-- Índice para performance
CREATE INDEX IF NOT EXISTS idx_target_suppliers_validation 
ON target_suppliers(real_data_verified, company_exists, data_source);