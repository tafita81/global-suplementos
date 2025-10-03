-- Tabelas para automação de email avançada
CREATE TABLE public.email_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  negotiation_id UUID REFERENCES public.negotiations(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'scheduled',
  template_name TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.email_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  negotiation_id UUID REFERENCES public.negotiations(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- sent, opened, clicked, response_received, meeting_scheduled
  details JSONB,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  stage TEXT NOT NULL,
  industry TEXT,
  language TEXT DEFAULT 'en',
  conversion_rate NUMERIC DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.sales_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for public access
CREATE POLICY "Allow public access to email sequences" 
ON public.email_sequences 
FOR ALL 
USING (true);

CREATE POLICY "Allow public access to email analytics" 
ON public.email_analytics 
FOR ALL 
USING (true);

CREATE POLICY "Allow public access to email templates" 
ON public.email_templates 
FOR ALL 
USING (true);

CREATE POLICY "Allow public access to sales analytics" 
ON public.sales_analytics 
FOR ALL 
USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir templates iniciais
INSERT INTO public.email_templates (name, subject, content, stage, industry, conversion_rate) VALUES
('health_supplements_initial', '🏆 Premium {product_name} - American Quality at Competitive Prices', 
'Dear {contact_person},

I hope this message finds you well. I am reaching out from {company_name}, a leading American distributor specializing in premium health supplements.

🏆 **PREMIUM {product_name}**
• FDA-compliant pharmaceutical-grade quality
• Competitive wholesale pricing: ${price_per_unit}/unit
• Immediate availability with dropshipping support
• Volume discounts up to 25%

Given your requirement of {order_volume} and budget of {budget_range}, we can offer significant value.

Best regards,
{sales_person_name}', 'initial_contact', 'health_supplements', 15.5),

('health_supplements_follow_up_1', 'Re: {product_name} Partnership - Quick Question', 
'Hi {contact_person},

Following up on our {product_name} opportunity for {buyer_company}.

What''s your biggest challenge with current {product_category} suppliers?

Our partner {similar_company} increased margins by 35% after switching to us.

Best regards,
{sales_person_name}', 'follow_up_1', 'health_supplements', 8.2),

('health_supplements_follow_up_2', '⏰ Final Opportunity: {product_name} Partnership', 
'{contact_person},

Final follow-up on {product_name} for {buyer_company}.

**THE NUMBERS:**
• Annual savings: ~${annual_savings}
• ROI: {roi_percentage}%

Reply YES, NO, or MORE INFO within 48 hours.

Best regards,
{sales_person_name}', 'follow_up_2', 'health_supplements', 12.8);

-- Adicionar campos extras à tabela negotiations
ALTER TABLE public.negotiations 
ADD COLUMN IF NOT EXISTS last_contact_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS response_received BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS meeting_scheduled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS contract_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deal_closed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deal_value NUMERIC;

-- Inserir dados analíticos iniciais
INSERT INTO public.sales_analytics (date, metric_name, metric_value, breakdown) VALUES
(CURRENT_DATE, 'emails_sent', 45, '{"initial_contact": 25, "follow_up_1": 15, "follow_up_2": 5}'),
(CURRENT_DATE, 'emails_opened', 32, '{"open_rate": 71.1}'),
(CURRENT_DATE, 'responses_received', 12, '{"response_rate": 26.7}'),
(CURRENT_DATE, 'meetings_scheduled', 8, '{"meeting_rate": 17.8}'),
(CURRENT_DATE, 'deals_closed', 3, '{"close_rate": 6.7, "total_value": 125000}'),
(CURRENT_DATE - INTERVAL '1 day', 'emails_sent', 38, '{"initial_contact": 20, "follow_up_1": 12, "follow_up_2": 6}'),
(CURRENT_DATE - INTERVAL '1 day', 'emails_opened', 28, '{"open_rate": 73.7}'),
(CURRENT_DATE - INTERVAL '1 day', 'responses_received', 9, '{"response_rate": 23.7}'),
(CURRENT_DATE - INTERVAL '1 day', 'meetings_scheduled', 6, '{"meeting_rate": 15.8}'),
(CURRENT_DATE - INTERVAL '1 day', 'deals_closed', 2, '{"close_rate": 5.3, "total_value": 85000}');

-- Inserir dados de sequências de email agendadas
INSERT INTO public.email_sequences (negotiation_id, stage, scheduled_for, status, template_name) VALUES
((SELECT id FROM negotiations LIMIT 1 OFFSET 0), 'follow_up_1', NOW() + INTERVAL '2 days', 'scheduled', 'health_supplements_follow_up_1'),
((SELECT id FROM negotiations LIMIT 1 OFFSET 1), 'follow_up_1', NOW() + INTERVAL '1 day', 'scheduled', 'health_supplements_follow_up_1'),
((SELECT id FROM negotiations LIMIT 1 OFFSET 0), 'follow_up_2', NOW() + INTERVAL '6 days', 'scheduled', 'health_supplements_follow_up_2');