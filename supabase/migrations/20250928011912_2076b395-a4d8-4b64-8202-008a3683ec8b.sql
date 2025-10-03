-- Atualizar o documento "Artigos de incorporação" para incluir uso automático quando solicitarem endereço
UPDATE public.company_documents 
SET 
  auto_use_for = jsonb_set(
    auto_use_for,
    '{3}',
    '"address_verification"'::jsonb,
    true
  ),
  usage_instructions = 'Artigos de incorporação detalhados contendo endereço oficial da empresa. Usar quando solicitado documentação completa da empresa ou comprovante de endereço.',
  priority = 3
WHERE document_name = 'Artigos de incorporação .pdf' 
  AND ein_number = '33-3939483';