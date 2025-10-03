import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DocumentRequest {
  usage_type?: string;
  ein_number?: string;
  required_types?: string[];
  limit?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { usage_type, ein_number = '33-3939483', required_types, limit }: DocumentRequest = await req.json();

    console.log('Auto document provider request:', { usage_type, ein_number, required_types, limit });

    let query = supabase
      .from('company_documents')
      .select('*')
      .eq('ein_number', ein_number);

    // If specific usage type is requested, filter by auto_use_for
    if (usage_type) {
      query = query.contains('auto_use_for', [usage_type]);
    }

    // If specific document types are required
    if (required_types && required_types.length > 0) {
      query = query.in('document_type', required_types);
    }

    // Order by priority (highest first) then by creation date
    query = query.order('priority', { ascending: false }).order('created_at', { ascending: true });

    // Apply limit if specified
    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const { data: documents, error } = await query;

    if (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }

    // Generate download URLs for each document
    const documentsWithUrls = await Promise.all(
      (documents || []).map(async (doc) => {
        try {
          const { data: urlData } = await supabase.storage
            .from('company-documents')
            .createSignedUrl(doc.file_path, 3600); // 1 hour expiry

          return {
            ...doc,
            download_url: urlData?.signedUrl || null,
            usage_instructions: doc.usage_instructions || null,
            auto_use_for: doc.auto_use_for || [],
            priority: doc.priority || 0
          };
        } catch (urlError) {
          console.error(`Error creating signed URL for ${doc.file_path}:`, urlError);
          return {
            ...doc,
            download_url: null,
            usage_instructions: doc.usage_instructions || null,
            auto_use_for: doc.auto_use_for || [],
            priority: doc.priority || 0
          };
        }
      })
    );

    // Create response with metadata
    const response = {
      success: true,
      documents: documentsWithUrls,
      total_count: documentsWithUrls.length,
      usage_type: usage_type || 'all',
      auto_selection_order: documentsWithUrls.map((doc, index) => ({
        order: index + 1,
        document_name: doc.document_name,
        document_type: doc.document_type,
        priority: doc.priority,
        usage_instructions: doc.usage_instructions
      })),
      instructions: {
        message: 'Documentos ordenados por prioridade para uso automático',
        priority_explanation: 'Prioridade 1 = mais importante, usar primeiro. Prioridade 0 = sem prioridade específica.',
        usage_guide: 'Use os documentos na ordem fornecida para melhor compatibilidade com requisitos de cadastro.'
      }
    };

    console.log('Auto document provider response:', {
      total_documents: documentsWithUrls.length,
      usage_type,
      top_priority: documentsWithUrls[0]?.priority || 0
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in auto document provider:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        message: 'Erro ao buscar documentos automaticamente'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);