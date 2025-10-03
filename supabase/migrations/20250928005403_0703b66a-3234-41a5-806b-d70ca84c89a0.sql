-- Create storage bucket for company documents
INSERT INTO storage.buckets (id, name, public) VALUES ('company-documents', 'company-documents', false);

-- Create RLS policies for company documents
CREATE POLICY "Company documents are accessible to authenticated users" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'company-documents');

CREATE POLICY "Users can upload company documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'company-documents');

CREATE POLICY "Users can update company documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'company-documents');

CREATE POLICY "Users can delete company documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'company-documents');

-- Create table to track company documents
CREATE TABLE public.company_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ein_number TEXT NOT NULL,
  document_type TEXT NOT NULL,
  document_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  content_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on company_documents
ALTER TABLE public.company_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for company_documents
CREATE POLICY "Full access to company documents" 
ON public.company_documents 
FOR ALL 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_company_documents_updated_at
BEFORE UPDATE ON public.company_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();