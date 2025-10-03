-- Fix security warning: Set search_path for the function
DROP FUNCTION IF EXISTS public.get_priority_documents_for_use(TEXT);

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
SET search_path = public
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