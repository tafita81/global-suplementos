-- Fix security issues: Enable RLS and create policies only if they don't exist

-- Enable RLS on all tables (no error if already enabled)
ALTER TABLE IF EXISTS public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.mycogenesis_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.logistics_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.compliance_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.logistics_execution ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow public access to opportunities" ON public.opportunities;
CREATE POLICY "Allow public access to opportunities" ON public.opportunities FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access to suppliers" ON public.suppliers;
CREATE POLICY "Allow public access to suppliers" ON public.suppliers FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access to mycogenesis products" ON public.mycogenesis_products;
CREATE POLICY "Allow public access to mycogenesis products" ON public.mycogenesis_products FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access to logistics operations" ON public.logistics_operations;
CREATE POLICY "Allow public access to logistics operations" ON public.logistics_operations FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access to compliance checks" ON public.compliance_checks;
CREATE POLICY "Allow public access to compliance checks" ON public.compliance_checks FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access to system logs" ON public.system_logs;
CREATE POLICY "Allow public access to system logs" ON public.system_logs FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access to logistics execution" ON public.logistics_execution;
CREATE POLICY "Allow public access to logistics execution" ON public.logistics_execution FOR ALL USING (true);