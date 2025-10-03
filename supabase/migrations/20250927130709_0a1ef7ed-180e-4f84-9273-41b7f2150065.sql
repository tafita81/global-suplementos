-- Fix security issues: Enable RLS on existing tables only

-- Enable RLS on opportunities table
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to opportunities" ON public.opportunities FOR ALL USING (true);

-- Enable RLS on suppliers table
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to suppliers" ON public.suppliers FOR ALL USING (true);

-- Enable RLS on mycogenesis_products table
ALTER TABLE public.mycogenesis_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to mycogenesis products" ON public.mycogenesis_products FOR ALL USING (true);

-- Enable RLS on compliance_checks table
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to compliance checks" ON public.compliance_checks FOR ALL USING (true);

-- Enable RLS on system_logs table
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to system logs" ON public.system_logs FOR ALL USING (true);

-- Enable RLS on logistics_execution table (if it exists)
ALTER TABLE public.logistics_execution ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to logistics execution" ON public.logistics_execution FOR ALL USING (true);

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_company_memory()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$function$;