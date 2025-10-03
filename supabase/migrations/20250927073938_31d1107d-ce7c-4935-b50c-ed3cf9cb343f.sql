-- Criar tabela para memória eterna da empresa e aprendizado de IA
CREATE TABLE IF NOT EXISTS public.company_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ein_number TEXT NOT NULL UNIQUE,
  company_data JSONB NOT NULL,
  ai_learning_data JSONB DEFAULT '{"successful_registrations": [], "failed_attempts": [], "contract_negotiations": [], "payment_history": [], "platform_preferences": {}}'::jsonb,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.company_memory ENABLE ROW LEVEL SECURITY;

-- Política para acesso total aos dados da empresa
CREATE POLICY "Full access to company data" 
ON public.company_memory 
FOR ALL 
USING (true);

-- Criar tabela para logs de agentes IA
CREATE TABLE IF NOT EXISTS public.ai_agent_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ein_number TEXT NOT NULL,
  agent_type TEXT NOT NULL,
  action TEXT NOT NULL,
  payload JSONB,
  result JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (ein_number) REFERENCES public.company_memory(ein_number)
);

-- Habilitar RLS
ALTER TABLE public.ai_agent_logs ENABLE ROW LEVEL SECURITY;

-- Política para logs de agentes
CREATE POLICY "Full access to agent logs" 
ON public.ai_agent_logs 
FOR ALL 
USING (true);

-- Criar função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_company_memory()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualização automática
CREATE TRIGGER update_company_memory_updated_at
  BEFORE UPDATE ON public.company_memory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_company_memory();

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_company_memory_ein ON public.company_memory(ein_number);
CREATE INDEX IF NOT EXISTS idx_ai_agent_logs_ein ON public.ai_agent_logs(ein_number);
CREATE INDEX IF NOT EXISTS idx_ai_agent_logs_timestamp ON public.ai_agent_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_ai_agent_logs_status ON public.ai_agent_logs(status);