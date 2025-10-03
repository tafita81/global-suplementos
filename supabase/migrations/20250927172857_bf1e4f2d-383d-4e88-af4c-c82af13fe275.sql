-- Adicionar parceiros de dropshipping globais
INSERT INTO public.dropship_partners (partner_name, country, specialties, contact_info, commission_rate, minimum_order_value, shipping_zones, fulfillment_time_days, rating, integration_status) VALUES

-- EUROPA
('European Health Hub', 'Germany', ARRAY['Health Supplements', 'Organic Products', 'Sports Nutrition'], 
 '{"email": "partnerships@europeanhealth.de", "phone": "+49-30-555-0101", "warehouse": "Berlin, Hamburg, Munich"}', 
 14.0, 400.00, ARRAY['EU', 'UK', 'Switzerland', 'Norway'], 2, 4.7, 'active'),

('Nordic Wellness Distribution', 'Sweden', ARRAY['Functional Foods', 'Natural Supplements', 'Eco Products'], 
 '{"email": "business@nordicwellness.se", "phone": "+46-8-555-0202", "certifications": "EU Organic, ISO 22000"}', 
 16.0, 600.00, ARRAY['Scandinavia', 'Baltic States', 'Finland'], 3, 4.8, 'active'),

('Mediterranean Nutra Supply', 'Italy', ARRAY['Mediterranean Supplements', 'Herbal Products'], 
 '{"email": "export@mednutra.it", "phone": "+39-02-555-0303", "specialization": "Traditional European formulas"}', 
 18.0, 350.00, ARRAY['Southern Europe', 'North Africa', 'Middle East'], 4, 4.5, 'active'),

-- ÁSIA-PACÍFICO
('Asia Pacific Health Network', 'Singapore', ARRAY['Asian Superfoods', 'Traditional Medicine', 'Marine Products'], 
 '{"email": "partnerships@aphealthnet.sg", "phone": "+65-6555-0401", "coverage": "ASEAN + ANZ"}', 
 12.0, 800.00, ARRAY['Southeast Asia', 'Australia', 'New Zealand', 'Japan'], 5, 4.9, 'active'),

('Australian Natural Products', 'Australia', ARRAY['Organic Supplements', 'Native Superfoods', 'Sports Nutrition'], 
 '{"email": "export@ausnatural.com.au", "phone": "+61-2-555-0501", "certifications": "TGA Approved"}', 
 15.0, 500.00, ARRAY['Australia', 'New Zealand', 'Pacific Islands'], 3, 4.6, 'active'),

('Japan Premium Wellness', 'Japan', ARRAY['Premium Supplements', 'Functional Foods', 'Beauty Supplements'], 
 '{"email": "global@jpwellness.co.jp", "phone": "+81-3-555-0601", "quality": "Pharmaceutical grade"}', 
 22.0, 1200.00, ARRAY['Japan', 'Korea', 'Taiwan', 'Hong Kong'], 2, 4.8, 'active'),

-- AMÉRICA LATINA
('Latin America Health Solutions', 'Brazil', ARRAY['Tropical Superfoods', 'Plant-based Supplements', 'Natural Products'], 
 '{"email": "export@lahealthsol.com.br", "phone": "+55-11-555-0701", "expertise": "Amazon botanicals"}', 
 13.0, 300.00, ARRAY['Brazil', 'Argentina', 'Chile', 'Colombia', 'Mexico'], 6, 4.4, 'active'),

('Mexican Natural Export', 'Mexico', ARRAY['Herbal Supplements', 'Traditional Medicine', 'Organic Foods'], 
 '{"email": "ventas@mexnatural.mx", "phone": "+52-55-555-0801", "border": "US-Mexico border advantage"}', 
 11.0, 250.00, ARRAY['Mexico', 'Central America', 'Caribbean', 'USA Southwest'], 4, 4.3, 'active'),

-- ORIENTE MÉDIO E ÁFRICA
('Middle East Wellness Hub', 'UAE', ARRAY['Halal Supplements', 'Premium Health Products', 'Desert Botanicals'], 
 '{"email": "business@mewellness.ae", "phone": "+971-4-555-0901", "hub": "Dubai free zone"}', 
 17.0, 750.00, ARRAY['GCC', 'Middle East', 'North Africa', 'Central Asia'], 3, 4.6, 'active'),

('African Natural Resources', 'South Africa', ARRAY['African Superfoods', 'Traditional Remedies', 'Mineral Supplements'], 
 '{"email": "exports@afrinatural.co.za", "phone": "+27-21-555-1001", "unique": "Indigenous ingredients"}', 
 14.0, 400.00, ARRAY['Southern Africa', 'East Africa', 'West Africa'], 7, 4.2, 'active'),

-- CANADÁ
('Canadian Premium Health', 'Canada', ARRAY['Clean Label Products', 'Maple-based Supplements', 'Cold Climate Nutrition'], 
 '{"email": "partnerships@canhealth.ca", "phone": "+1-416-555-1101", "regulation": "Health Canada approved"}', 
 16.0, 500.00, ARRAY['Canada', 'Northern USA', 'Arctic regions'], 2, 4.7, 'active'),

-- COREIA DO SUL
('K-Health Global', 'South Korea', ARRAY['K-Beauty Supplements', 'Ginseng Products', 'Fermented Foods'], 
 '{"email": "global@khealthglobal.kr", "phone": "+82-2-555-1201", "trend": "K-wellness innovation"}', 
 19.0, 600.00, ARRAY['Korea', 'Japan', 'China', 'Southeast Asia'], 3, 4.8, 'active'),

-- INDIA
('Ayurvedic Wellness International', 'India', ARRAY['Ayurvedic Supplements', 'Turmeric Products', 'Herbal Medicines'], 
 '{"email": "exports@ayurwellness.in", "phone": "+91-22-555-1301", "tradition": "5000 years Ayurveda"}', 
 10.0, 200.00, ARRAY['India', 'South Asia', 'Middle East', 'Southeast Asia'], 8, 4.5, 'active'),

-- REINO UNIDO (pós-Brexit)
('British Isles Health Distribution', 'United Kingdom', ARRAY['Premium Supplements', 'Organic Products', 'Sports Nutrition'], 
 '{"email": "partnerships@bihealthdist.co.uk", "phone": "+44-20-555-1401", "post_brexit": "Direct EU access"}', 
 17.0, 650.00, ARRAY['UK', 'Ireland', 'Channel Islands'], 2, 4.6, 'active'),

-- ISRAEL (tech + health)
('Israeli Health Innovation', 'Israel', ARRAY['Biotech Supplements', 'Dead Sea Products', 'Clinical Nutrition'], 
 '{"email": "business@israelhealth.co.il", "phone": "+972-3-555-1501", "innovation": "Cutting-edge research"}', 
 20.0, 800.00, ARRAY['Israel', 'Eastern Europe', 'Balkans'], 4, 4.7, 'active');

-- Atualizar tabela para incluir mais informações sobre cobertura global
ALTER TABLE public.dropship_partners 
ADD COLUMN IF NOT EXISTS coverage_notes TEXT,
ADD COLUMN IF NOT EXISTS regulatory_certifications TEXT[],
ADD COLUMN IF NOT EXISTS language_support TEXT[],
ADD COLUMN IF NOT EXISTS payment_methods TEXT[];

-- Atualizar parceiros existentes com informações extras
UPDATE public.dropship_partners SET
  coverage_notes = 'Complete North America coverage with expedited shipping',
  regulatory_certifications = ARRAY['FDA', 'NSF', 'GMP'],
  language_support = ARRAY['English', 'Spanish'],
  payment_methods = ARRAY['Wire Transfer', 'PayPal', 'Stripe', 'ACH']
WHERE country = 'USA';

-- Atualizar parceiros globais recém-adicionados
UPDATE public.dropship_partners SET
  coverage_notes = 'EU-wide distribution with customs handling',
  regulatory_certifications = ARRAY['EU Novel Foods', 'ISO 22000', 'BRC'],
  language_support = ARRAY['German', 'English', 'French'],
  payment_methods = ARRAY['SEPA', 'Wire Transfer', 'PayPal']
WHERE partner_name = 'European Health Hub';

UPDATE public.dropship_partners SET
  coverage_notes = 'Asia-Pacific hub with regulatory expertise',
  regulatory_certifications = ARRAY['HACCP', 'Halal', 'Singapore Health Authority'],
  language_support = ARRAY['English', 'Mandarin', 'Malay', 'Thai'],
  payment_methods = ARRAY['Wire Transfer', 'DBS Bank', 'PayNow']
WHERE partner_name = 'Asia Pacific Health Network';