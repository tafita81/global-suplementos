-- Add priority field to company_documents table
ALTER TABLE public.company_documents 
ADD COLUMN priority INTEGER DEFAULT 0,
ADD COLUMN usage_instructions TEXT DEFAULT NULL,
ADD COLUMN auto_use_for JSONB DEFAULT '[]'::jsonb;

-- Create index for priority ordering
CREATE INDEX idx_company_documents_priority ON public.company_documents(priority DESC, created_at ASC);

-- Update existing documents with appropriate priorities and usage instructions
UPDATE public.company_documents 
SET priority = 1, 
    usage_instructions = 'Certificado oficial de incorporação da empresa na Flórida. Usar em cadastros governamentais e verificações oficiais.',
    auto_use_for = '["government_registration", "official_verification", "incorporation_proof"]'::jsonb
WHERE document_type = 'incorporation_certificate';

UPDATE public.company_documents 
SET priority = 2,
    usage_instructions = 'Documento EIN (Employer Identification Number) oficial. Usar para verificações fiscais e financeiras.',
    auto_use_for = '["tax_verification", "financial_registration", "bank_setup"]'::jsonb
WHERE document_type = 'ein_document';

UPDATE public.company_documents 
SET priority = 3,
    usage_instructions = 'Artigos de incorporação detalhados. Usar quando solicitado documentação completa da empresa.',
    auto_use_for = '["detailed_registration", "legal_verification", "comprehensive_documentation"]'::jsonb
WHERE document_type = 'other' AND document_name LIKE '%incorporação%';

-- Create function to get documents by priority for automatic use
CREATE OR REPLACE FUNCTION public.get_priority_documents_for_use(
    usage_type TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    document_name TEXT,
    document_type TEXT,
    file_path TEXT,
    priority INTEGER,
    usage_instructions TEXT,
    content_type TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF usage_type IS NULL THEN
        -- Return all documents ordered by priority
        RETURN QUERY
        SELECT 
            cd.id,
            cd.document_name,
            cd.document_type,
            cd.file_path,
            cd.priority,
            cd.usage_instructions,
            cd.content_type
        FROM public.company_documents cd
        ORDER BY cd.priority DESC, cd.created_at ASC;
    ELSE
        -- Return documents that match the usage type
        RETURN QUERY
        SELECT 
            cd.id,
            cd.document_name,
            cd.document_type,
            cd.file_path,
            cd.priority,
            cd.usage_instructions,
            cd.content_type
        FROM public.company_documents cd
        WHERE cd.auto_use_for ? usage_type
        ORDER BY cd.priority DESC, cd.created_at ASC;
    END IF;
END;
$$;