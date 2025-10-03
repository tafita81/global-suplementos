-- First create the logistics_operations table if it doesn't exist
CREATE TABLE IF NOT EXISTS logistics_operations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  operation_type text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  product_info jsonb,
  status text DEFAULT 'pending'::text,
  tracking_number text,
  estimated_delivery timestamp with time zone,
  cost_breakdown jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Now enable RLS on all tables that need it
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to opportunities" ON opportunities FOR ALL USING (true);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to suppliers" ON suppliers FOR ALL USING (true);

ALTER TABLE mycogenesis_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to mycogenesis products" ON mycogenesis_products FOR ALL USING (true);

ALTER TABLE compliance_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to compliance checks" ON compliance_checks FOR ALL USING (true);

ALTER TABLE logistics_execution ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to logistics execution" ON logistics_execution FOR ALL USING (true);

ALTER TABLE logistics_operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to logistics operations" ON logistics_operations FOR ALL USING (true);

ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to system logs" ON system_logs FOR ALL USING (true);

ALTER TABLE ai_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access to ai configs" ON ai_configs FOR ALL USING (true);