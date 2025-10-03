-- Tabela para compradores B2B detectados
CREATE TABLE public.b2b_buyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  industry TEXT,
  product_needs TEXT[],
  order_volume TEXT,
  budget_range TEXT,
  timeline TEXT,
  lead_score INTEGER,
  status TEXT DEFAULT 'new_lead',
  buying_history JSONB,
  decision_maker_level TEXT,
  company_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para negociações automáticas
CREATE TABLE public.negotiations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_company TEXT NOT NULL,
  opportunity_id UUID REFERENCES public.opportunities(id),
  contact_email TEXT,
  email_content TEXT,
  status TEXT DEFAULT 'sent',
  success_probability INTEGER,
  negotiation_stage TEXT DEFAULT 'initial_contact',
  response_received BOOLEAN DEFAULT false,
  response_content TEXT,
  next_action TEXT,
  next_action_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para parcerias de dropshipping
CREATE TABLE public.dropship_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_name TEXT NOT NULL,
  country TEXT NOT NULL,
  specialties TEXT[],
  contact_info JSONB,
  commission_rate NUMERIC,
  minimum_order_value NUMERIC,
  shipping_zones TEXT[],
  fulfillment_time_days INTEGER,
  rating NUMERIC DEFAULT 0,
  active BOOLEAN DEFAULT true,
  integration_status TEXT DEFAULT 'pending',
  api_credentials JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.b2b_buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.negotiations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dropship_partners ENABLE ROW LEVEL SECURITY;

-- Policies for public access
CREATE POLICY "Allow public access to b2b buyers" 
ON public.b2b_buyers 
FOR ALL 
USING (true);

CREATE POLICY "Allow public access to negotiations" 
ON public.negotiations 
FOR ALL 
USING (true);

CREATE POLICY "Allow public access to dropship partners" 
ON public.dropship_partners 
FOR ALL 
USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_b2b_buyers_updated_at
BEFORE UPDATE ON public.b2b_buyers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_negotiations_updated_at
BEFORE UPDATE ON public.negotiations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dropship_partners_updated_at
BEFORE UPDATE ON public.dropship_partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir alguns parceiros de dropshipping exemplo
INSERT INTO public.dropship_partners (partner_name, country, specialties, contact_info, commission_rate, minimum_order_value, shipping_zones, fulfillment_time_days, rating, integration_status) VALUES
('American Health Distributors', 'USA', ARRAY['Health Supplements', 'Organic Products'], 
 '{"email": "partnerships@americanhealth.com", "phone": "+1-888-555-0101", "api_endpoint": "https://api.americanhealth.com"}', 
 15.0, 500.00, ARRAY['USA', 'Canada', 'Mexico'], 3, 4.8, 'active'),

('NutriSource Fulfillment', 'USA', ARRAY['Nutritional Products', 'Sports Supplements'], 
 '{"email": "dropship@nutrisource.com", "phone": "+1-800-555-0202", "api_endpoint": "https://api.nutrisource.com"}', 
 12.0, 750.00, ARRAY['USA', 'International'], 2, 4.9, 'active'),

('Global Wellness Supply', 'USA', ARRAY['Organic Foods', 'Wellness Products'], 
 '{"email": "partners@globalwellness.com", "phone": "+1-877-555-0303", "warehouse": "Multiple US locations"}', 
 18.0, 300.00, ARRAY['Worldwide'], 5, 4.6, 'active'),

('Premium Nutrition Hub', 'USA', ARRAY['Premium Supplements', 'Functional Foods'], 
 '{"email": "business@premiumnutrition.com", "phone": "+1-855-555-0404", "specialization": "High-end products"}', 
 20.0, 1000.00, ARRAY['USA', 'Europe', 'Asia'], 1, 4.7, 'active');

-- Inserir alguns compradores B2B exemplo
INSERT INTO public.b2b_buyers (platform, company_name, contact_person, email, country, industry, product_needs, order_volume, budget_range, timeline, lead_score, status, decision_maker_level, company_size) VALUES
('LinkedIn Sales Navigator', 'HealthMart Distribution Inc', 'Sarah Johnson', 'procurement@healthmart-dist.com', 'USA', 'Health Supplements', ARRAY['Whey Protein', 'Vitamins', 'Organic Supplements'], '5000-10000 units/month', '$100k-500k', '30-45 days', 85, 'qualified', 'high', 'large'),

('ThomasNet', 'American Wellness Corp', 'Michael Rodriguez', 'sourcing@americanwellness.com', 'USA', 'Nutritional Products', ARRAY['Protein Powders', 'Health Bars', 'Functional Foods'], '10000+ units/month', '$250k-1M', '60 days', 90, 'hot_lead', 'high', 'large'),

('Global Sources', 'European Health Imports Ltd', 'Emma Thompson', 'import@eurohealth.co.uk', 'UK', 'Organic Foods', ARRAY['Organic Spirulina', 'Superfoods', 'Natural Supplements'], '2000-5000 units/month', '$50k-200k', '45-60 days', 75, 'qualified', 'medium', 'medium'),

('Alibaba RFQ', 'Asia Pacific Nutrition', 'David Chen', 'purchasing@apnutrition.com.sg', 'Singapore', 'Health Products', ARRAY['Collagen Peptides', 'Marine Supplements'], '3000-8000 units/month', '$75k-300k', '30 days', 80, 'qualified', 'high', 'medium'),

('TradeKey', 'Canada Natural Products', 'Lisa Wang', 'buyer@canadanatural.ca', 'Canada', 'Natural Products', ARRAY['Organic Protein', 'Plant-based Supplements'], '1000-3000 units/month', '$25k-100k', '21 days', 70, 'new_lead', 'medium', 'small');

-- Inserir algumas negociações exemplo
INSERT INTO public.negotiations (buyer_company, opportunity_id, contact_email, email_content, status, success_probability, negotiation_stage) VALUES
('HealthMart Distribution Inc', 
 (SELECT id FROM opportunities WHERE product_name LIKE '%Whey Protein%' LIMIT 1),
 'procurement@healthmart-dist.com',
 'Dear Sarah Johnson,

I hope this email finds you well. I am reaching out from Global Supplements Solutions, a leading American distributor specializing in premium health supplements.

I noticed your company''s interest in sourcing high-quality whey protein products. We have an excellent opportunity that aligns perfectly with your requirements:

🏆 PREMIUM WHEY PROTEIN ISOLATE 25KG
• Superior 90%+ protein content
• Third-party tested for purity
• Made in FDA-approved facilities
• Competitive pricing: $45/kg (within your budget range)
• Available for immediate shipment
• Full dropshipping support with 2-3 day fulfillment

SPECIAL OFFER FOR HEALTHMART:
• 15% discount on orders over 5,000 units
• Net 30 payment terms for qualified accounts
• Free samples and quality certificates
• Dedicated account management

We understand you''re looking for 5,000-10,000 units monthly. Our capacity easily supports this volume with room for growth.

Would you be available for a brief call this week to discuss how we can support HealthMart''s expansion goals?

Best regards,
James Miller
Senior Sales Director
Global Supplements Solutions
Direct: +1-855-SUPPLEMENTS
james.miller@globalsupplements.site',
 'sent', 85, 'initial_contact'),

('American Wellness Corp',
 (SELECT id FROM opportunities WHERE product_name LIKE '%Collagen%' LIMIT 1),
 'sourcing@americanwellness.com',
 'Dear Michael Rodriguez,

Thank you for your inquiry regarding bulk collagen peptides. As a premier American nutrition supplier, we are excited to present our premium offering that meets your exact specifications.

🥇 MARINE COLLAGEN PEPTIDES - BULK 50KG
• Pharmaceutical-grade quality
• Type I & III collagen blend  
• 98% protein content
• Neutral taste and odor
• Competitive wholesale pricing: $85/kg
• Immediate availability from US warehouses

PARTNERSHIP BENEFITS:
• Volume pricing tiers up to 25% discount
• Private labeling services available
• Complete fulfillment and dropshipping
• Quality assurance and certificates
• Flexible payment terms (Net 45 for qualified partners)

Given your monthly requirement of 10,000+ units and $250k-1M budget range, we can structure a strategic partnership that delivers significant value and growth opportunities.

I''d love to schedule a call to discuss your specific needs and how we can become your trusted collagen supplier.

Best regards,
Amanda Foster
Strategic Partnerships Director
amanda.foster@globalsupplements.site
Phone: +1-888-555-PARTNER',
 'sent', 90, 'initial_contact');