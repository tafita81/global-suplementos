-- Create missing tables and fix relationships for complete arbitrage system

-- 1. Create orders/executions table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE,
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE SET NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  quantity integer NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  total_amount numeric(12,2) NOT NULL,
  profit_margin numeric(5,2),
  order_date timestamp with time zone DEFAULT now(),
  delivery_date timestamp with time zone,
  tracking_info jsonb,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Create opportunity_suppliers junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS public.opportunity_suppliers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE,
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE CASCADE,
  quoted_price numeric(10,2),
  lead_time_days integer,
  minimum_order_quantity integer,
  quote_valid_until timestamp with time zone,
  supplier_notes text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blacklisted')),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(opportunity_id, supplier_id)
);

-- 3. Create execution_history table for tracking all system actions
CREATE TABLE IF NOT EXISTS public.execution_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type text NOT NULL CHECK (entity_type IN ('opportunity', 'order', 'supplier', 'compliance', 'logistics')),
  entity_id uuid NOT NULL,
  action_type text NOT NULL,
  action_details jsonb,
  executed_by text DEFAULT 'system',
  execution_status text DEFAULT 'completed' CHECK (execution_status IN ('pending', 'completed', 'failed', 'cancelled')),
  result_data jsonb,
  execution_time_ms numeric(8,2),
  created_at timestamp with time zone DEFAULT now()
);

-- 4. Create market_analysis table for tracking market data
CREATE TABLE IF NOT EXISTS public.market_analysis (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_category text NOT NULL,
  market_region text NOT NULL,
  analysis_date timestamp with time zone DEFAULT now(),
  market_size_usd numeric(15,2),
  growth_rate_percent numeric(5,2),
  competition_level text CHECK (competition_level IN ('low', 'medium', 'high')),
  price_trends jsonb,
  demand_forecast jsonb,
  key_insights text[],
  data_sources text[],
  confidence_score integer CHECK (confidence_score >= 0 AND confidence_score <= 100),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 5. Create viral_campaigns table for Mycogenesis products
CREATE TABLE IF NOT EXISTS public.viral_campaigns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.mycogenesis_products(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  campaign_type text CHECK (campaign_type IN ('social_media', 'influencer', 'content_marketing', 'paid_ads')),
  target_audience jsonb,
  budget_usd numeric(10,2),
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
  performance_metrics jsonb,
  roi_percent numeric(5,2),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 6. Create notifications table for system alerts
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  entity_type text,
  entity_id uuid,
  read_status boolean DEFAULT false,
  action_required boolean DEFAULT false,
  action_url text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- 7. Add foreign keys to existing tables where missing
ALTER TABLE public.compliance_checks 
DROP CONSTRAINT IF EXISTS compliance_checks_opportunity_id_fkey,
ADD CONSTRAINT compliance_checks_opportunity_id_fkey 
FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(id) ON DELETE CASCADE;

ALTER TABLE public.logistics_execution 
DROP CONSTRAINT IF EXISTS logistics_execution_opportunity_id_fkey,
ADD CONSTRAINT logistics_execution_opportunity_id_fkey 
FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(id) ON DELETE CASCADE;

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_opportunity_id ON public.orders(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_orders_supplier_id ON public.orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON public.orders(order_date DESC);

CREATE INDEX IF NOT EXISTS idx_opportunity_suppliers_opportunity_id ON public.opportunity_suppliers(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_opportunity_suppliers_supplier_id ON public.opportunity_suppliers(supplier_id);

CREATE INDEX IF NOT EXISTS idx_execution_history_entity_type ON public.execution_history(entity_type);
CREATE INDEX IF NOT EXISTS idx_execution_history_entity_id ON public.execution_history(entity_id);
CREATE INDEX IF NOT EXISTS idx_execution_history_created_at ON public.execution_history(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_market_analysis_product_category ON public.market_analysis(product_category);
CREATE INDEX IF NOT EXISTS idx_market_analysis_analysis_date ON public.market_analysis(analysis_date DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_read_status ON public.notifications(read_status);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- 9. Create update triggers for new tables
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_market_analysis_updated_at
  BEFORE UPDATE ON public.market_analysis
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_viral_campaigns_updated_at
  BEFORE UPDATE ON public.viral_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();