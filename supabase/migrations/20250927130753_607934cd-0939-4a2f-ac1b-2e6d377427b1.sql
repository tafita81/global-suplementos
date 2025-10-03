-- Insert sample opportunities data (fixed)
INSERT INTO opportunities (product_name, source, type, estimated_value, margin_percentage, status, product_category, compliance_status, created_at) VALUES
('Whey Protein Isolate 25kg', 'Alibaba Network', 'B2B', 15000, 45, 'pending', 'Health Supplements', '{"status": "approved"}', NOW() - INTERVAL '2 hours'),
('Organic Spirulina Powder 10kg', 'Amazon Business', 'B2B', 8500, 38, 'pending', 'Organic Foods', '{"status": "pending"}', NOW() - INTERVAL '4 hours'),
('Collagen Peptides Bulk 50kg', 'SAM.gov', 'B2B', 25000, 52, 'approved', 'Government Nutrition', '{"status": "approved"}', NOW() - INTERVAL '6 hours'),
('Omega-3 Fish Oil Capsules', 'Alibaba Network', 'B2B', 12000, 41, 'executing', 'Supplement Retail', '{"status": "approved"}', NOW() - INTERVAL '1 day'),
('Vitamin D3 + K2 Complex', 'Amazon Business', 'B2B', 18500, 47, 'pending', 'Healthcare Distribution', '{"status": "approved"}', NOW() - INTERVAL '8 hours');

-- Insert sample suppliers data
INSERT INTO suppliers (name, country, category, contact_info, compliance_status, reliability_score, created_at) VALUES
('Hangzhou Nutrition Ltd', 'China', 'protein-powders', '{"email": "sales@hznutrition.com", "phone": "+86-571-8899-2234"}', '{"verified": true}', 88, NOW() - INTERVAL '3 months'),
('Green Algae Solutions', 'USA', 'organic-supplements', '{"email": "orders@greenalgae.com", "phone": "+1-555-0123"}', '{"verified": true}', 86, NOW() - INTERVAL '2 months'),
('Bio Marine Collagen', 'Norway', 'marine-collagen', '{"email": "gov.sales@biomarine.no", "phone": "+47-22-334-567"}', '{"verified": true}', 94, NOW() - INTERVAL '6 months'),
('Nordic Marine Products', 'Iceland', 'fish-oil', '{"email": "export@nordicmarine.is", "phone": "+354-555-7890"}', '{"verified": true}', 87, NOW() - INTERVAL '4 months');

-- Insert sample Mycogenesis products with correct array syntax
INSERT INTO mycogenesis_products (name, category, production_status, target_markets, formula, market_analysis, created_at) VALUES
('MycoBoost Immune Complex', 'functional-food', 'active', ARRAY['US', 'Canada', 'EU'], '{"main_compound": "Beta-glucan"}', '{"market_size": "$2.3B"}', NOW() - INTERVAL '1 month'),
('FungiPro Athletic Performance', 'supplement', 'development', ARRAY['US', 'Australia', 'Japan'], '{"main_compound": "Cordyceps Extract"}', '{"market_size": "$4.1B"}', NOW() - INTERVAL '2 weeks'),
('MycoBalance Digestive Health', 'probiotic', 'active', ARRAY['US', 'Canada', 'UK'], '{"main_compound": "Multi-strain Fungi"}', '{"market_size": "$1.8B"}', NOW() - INTERVAL '3 days');

-- Insert sample system logs
INSERT INTO system_logs (module, action, success, data, created_at) VALUES
('opportunity-detector', 'scan-alibaba', true, '{"opportunities_found": 12}', NOW() - INTERVAL '30 minutes'),
('compliance-checker', 'verify-supplier', true, '{"checks_passed": 8}', NOW() - INTERVAL '1 hour'),
('logistics-optimizer', 'route-calculation', true, '{"optimized_cost": 850}', NOW() - INTERVAL '45 minutes'),
('auto-executor', 'submit-bid', true, '{"bid_amount": 12500}', NOW() - INTERVAL '2 hours'),
('qa-assistant', 'process-query', true, '{"response_time": "1.2s"}', NOW() - INTERVAL '15 minutes');