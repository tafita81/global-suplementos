-- Remove todas as políticas RLS de todas as tabelas
-- Como você é o único usuário, não há necessidade de restrições de segurança

-- Remover políticas da tabela target_suppliers
DROP POLICY IF EXISTS "suppliers_view_auth_only" ON public.target_suppliers;
DROP POLICY IF EXISTS "suppliers_insert_auth_only" ON public.target_suppliers;
DROP POLICY IF EXISTS "suppliers_update_auth_only" ON public.target_suppliers;
DROP POLICY IF EXISTS "suppliers_delete_auth_only" ON public.target_suppliers;

-- Remover políticas da tabela b2b_buyers
DROP POLICY IF EXISTS "secure_buyers_anonymous_lead_submission" ON public.b2b_buyers;
DROP POLICY IF EXISTS "secure_buyers_delete_authenticated" ON public.b2b_buyers;
DROP POLICY IF EXISTS "secure_buyers_insert_authenticated" ON public.b2b_buyers;
DROP POLICY IF EXISTS "secure_buyers_select_authenticated" ON public.b2b_buyers;
DROP POLICY IF EXISTS "secure_buyers_update_authenticated" ON public.b2b_buyers;

-- Desabilitar RLS em todas as tabelas para acesso completo
ALTER TABLE public.target_suppliers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_buyers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agent_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_configs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_memory DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_checks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributor_campaigns DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.dropship_partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_sequences DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.logistics_execution DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.logistics_operations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_analysis DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mycogenesis_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.negotiations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_suppliers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.viral_campaigns DISABLE ROW LEVEL SECURITY;

-- Comentário explicativo
COMMENT ON SCHEMA public IS 'RLS removido - aplicação de usuário único sem restrições de segurança';