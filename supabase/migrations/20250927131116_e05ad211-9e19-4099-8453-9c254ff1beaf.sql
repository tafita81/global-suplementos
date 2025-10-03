-- Enable RLS on all new tables and create policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to orders" ON public.orders FOR ALL USING (true);

ALTER TABLE public.opportunity_suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to opportunity suppliers" ON public.opportunity_suppliers FOR ALL USING (true);

ALTER TABLE public.execution_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to execution history" ON public.execution_history FOR ALL USING (true);

ALTER TABLE public.market_analysis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to market analysis" ON public.market_analysis FOR ALL USING (true);

ALTER TABLE public.viral_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to viral campaigns" ON public.viral_campaigns FOR ALL USING (true);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to notifications" ON public.notifications FOR ALL USING (true);