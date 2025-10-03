-- Insert simple sample data without complex arrays or constraints issues
INSERT INTO opportunities (product_name, source, type, estimated_value, margin_percentage, status, created_at) VALUES
('Whey Protein Isolate 25kg', 'Alibaba Network', 'B2B', 15000, 45, 'pending', NOW() - INTERVAL '2 hours'),
('Organic Spirulina Powder 10kg', 'Amazon Business', 'B2B', 8500, 38, 'pending', NOW() - INTERVAL '4 hours'),
('Collagen Peptides Bulk 50kg', 'SAM.gov', 'B2B', 25000, 52, 'approved', NOW() - INTERVAL '6 hours'),
('Omega-3 Fish Oil Capsules', 'Alibaba Network', 'B2B', 12000, 41, 'executing', NOW() - INTERVAL '1 day'),
('Vitamin D3 + K2 Complex', 'Amazon Business', 'B2B', 18500, 47, 'pending', NOW() - INTERVAL '8 hours');

-- Insert simple suppliers data
INSERT INTO suppliers (name, country, reliability_score, created_at) VALUES
('Hangzhou Nutrition Ltd', 'China', 88, NOW() - INTERVAL '3 months'),
('Green Algae Solutions', 'USA', 86, NOW() - INTERVAL '2 months'),
('Bio Marine Collagen', 'Norway', 94, NOW() - INTERVAL '6 months'),
('Nordic Marine Products', 'Iceland', 87, NOW() - INTERVAL '4 months');

-- Insert simple Mycogenesis products
INSERT INTO mycogenesis_products (name, production_status, created_at) VALUES
('MycoBoost Immune Complex', 'active', NOW() - INTERVAL '1 month'),
('FungiPro Athletic Performance', 'development', NOW() - INTERVAL '2 weeks'),
('MycoBalance Digestive Health', 'active', NOW() - INTERVAL '3 days');

-- Insert sample system logs
INSERT INTO system_logs (module, action, success, created_at) VALUES
('opportunity-detector', 'scan-alibaba', true, NOW() - INTERVAL '30 minutes'),
('compliance-checker', 'verify-supplier', true, NOW() - INTERVAL '1 hour'),
('logistics-optimizer', 'route-calculation', true, NOW() - INTERVAL '45 minutes'),
('auto-executor', 'submit-bid', true, NOW() - INTERVAL '2 hours'),
('qa-assistant', 'process-query', true, NOW() - INTERVAL '15 minutes');