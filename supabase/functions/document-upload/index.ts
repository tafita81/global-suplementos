import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DocumentUploadRequest {
  ein_number: string;
  document_type: string;
  document_name: string;
  file_data: string; // base64 encoded
  content_type: string;
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

    const { ein_number, document_type, document_name, file_data, content_type }: DocumentUploadRequest = await req.json();

    // Convert base64 to Uint8Array
    const buffer = Uint8Array.from(atob(file_data), c => c.charCodeAt(0));

    // Sanitize file name to remove spaces and special characters
    const sanitized_document_name = document_name
      .replace(/\s+/g, '_')  // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9._-]/g, '')  // Remove special characters except dots, underscores, and hyphens
      .toLowerCase();

    // Create file path
    const file_path = `${ein_number}/${document_type}/${sanitized_document_name}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('company-documents')
      .upload(file_path, buffer, {
        contentType: content_type,
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // Save document record
    const { data: documentRecord, error: recordError } = await supabase
      .from('company_documents')
      .insert({
        ein_number,
        document_type,
        document_name,
        file_path,
        file_size: buffer.length,
        content_type
      })
      .select()
      .single();

    if (recordError) {
      console.error('Record insert error:', recordError);
      // Clean up uploaded file if record insert fails
      await supabase.storage
        .from('company-documents')
        .remove([file_path]);
      throw new Error(`Document record creation failed: ${recordError.message}`);
    }

    console.log('Document uploaded successfully:', {
      path: file_path,
      size: buffer.length,
      type: content_type
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Document uploaded successfully',
      document: documentRecord,
      storage_path: uploadData.path
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error uploading document:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);