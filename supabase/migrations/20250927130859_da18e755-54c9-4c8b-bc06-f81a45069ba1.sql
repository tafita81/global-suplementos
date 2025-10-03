-- Insert sample logistics operations data
INSERT INTO logistics_operations (operation_type, origin, destination, product_info, status, tracking_number, estimated_delivery, cost_breakdown, created_at) VALUES
('international-shipping', 'Hangzhou, China', 'Miami, FL, USA', '{"product": "Whey Protein Isolate", "quantity": "500kg", "value": "$4250"}', 'in-transit', 'MSK-2025-0927-001', NOW() + INTERVAL '5 days', '{"shipping": 850, "customs": 125, "insurance": 89, "handling": 45}', NOW() - INTERVAL '3 days'),
('domestic-distribution', 'Miami, FL, USA', 'Orlando, FL, USA', '{"product": "Organic Spirulina", "quantity": "200kg", "value": "$2400"}', 'delivered', 'FDX-2025-0925-047', NOW() - INTERVAL '1 day', '{"shipping": 120, "handling": 25}', NOW() - INTERVAL '5 days'),
('express-delivery', 'Oslo, Norway', 'Washington, DC, USA', '{"product": "Marine Collagen", "quantity": "100kg", "value": "$1575"}', 'processing', 'DHL-2025-0927-089', NOW() + INTERVAL '2 days', '{"shipping": 450, "customs": 87, "express_fee": 125}', NOW() - INTERVAL '1 hour');

-- Fix function search path security by updating the functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_company_memory()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$function$;