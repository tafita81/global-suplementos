-- Add unique constraint required by edge function upsert
ALTER TABLE public.target_suppliers
ADD CONSTRAINT target_suppliers_email_unique UNIQUE (email);

-- Optional: performance index for filtering by data_source and ordering by potential_value
CREATE INDEX IF NOT EXISTS idx_target_suppliers_data_source ON public.target_suppliers (data_source);
CREATE INDEX IF NOT EXISTS idx_target_suppliers_country ON public.target_suppliers (country);
