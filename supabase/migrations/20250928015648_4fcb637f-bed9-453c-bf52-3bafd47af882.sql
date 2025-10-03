-- Create table for storing target suppliers
CREATE TABLE public.target_suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  product_category TEXT,
  supplier_size TEXT,
  annual_revenue BIGINT,
  employee_count INTEGER,
  potential_value BIGINT,
  website TEXT,
  phone TEXT,
  contact_person TEXT,
  industry TEXT,
  specialties TEXT[],
  data_source TEXT, -- 'manual', 'scraped', 'api'
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'invalid'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for distributor campaigns
CREATE TABLE public.distributor_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID REFERENCES public.target_suppliers(id),
  campaign_type TEXT NOT NULL, -- 'automated_mass', 'targeted', 'follow_up'
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'completed', 'failed'
  email_sequence JSONB, -- Array of email objects with timing
  current_stage INTEGER DEFAULT 1,
  success_probability INTEGER,
  expected_timeline TEXT,
  cultural_strategy JSONB,
  response_received BOOLEAN DEFAULT false,
  response_content TEXT,
  next_email_date TIMESTAMP WITH TIME ZONE,
  total_emails_sent INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  replied_count INTEGER DEFAULT 0,
  deal_value BIGINT,
  deal_status TEXT DEFAULT 'prospecting', -- 'prospecting', 'negotiating', 'closed_won', 'closed_lost'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for automated execution logs
CREATE TABLE public.automation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  execution_type TEXT NOT NULL, -- 'supplier_discovery', 'campaign_launch', 'email_send', 'follow_up'
  target_countries TEXT[],
  target_categories TEXT[],
  suppliers_found INTEGER,
  campaigns_launched INTEGER,
  emails_sent INTEGER,
  success_rate NUMERIC,
  execution_data JSONB,
  status TEXT DEFAULT 'completed', -- 'running', 'completed', 'failed'
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.target_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributor_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Full access to target suppliers" 
ON public.target_suppliers 
FOR ALL 
USING (true);

CREATE POLICY "Full access to distributor campaigns" 
ON public.distributor_campaigns 
FOR ALL 
USING (true);

CREATE POLICY "Full access to automation logs" 
ON public.automation_logs 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE TRIGGER update_target_suppliers_updated_at
BEFORE UPDATE ON public.target_suppliers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_distributor_campaigns_updated_at
BEFORE UPDATE ON public.distributor_campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_target_suppliers_country ON public.target_suppliers(country);
CREATE INDEX idx_target_suppliers_category ON public.target_suppliers(product_category);
CREATE INDEX idx_target_suppliers_verification ON public.target_suppliers(verification_status);
CREATE INDEX idx_distributor_campaigns_status ON public.distributor_campaigns(status);
CREATE INDEX idx_distributor_campaigns_next_email ON public.distributor_campaigns(next_email_date);
CREATE INDEX idx_automation_logs_execution_type ON public.automation_logs(execution_type);