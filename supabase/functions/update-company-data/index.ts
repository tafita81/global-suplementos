import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateRequest {
  ein_number: string;
  updates: {
    authentication_code?: string;
    [key: string]: any;
  };
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

    const { ein_number, updates }: UpdateRequest = await req.json();

    // Get current company data
    const { data: currentData, error: fetchError } = await supabase
      .from('company_memory')
      .select('company_data')
      .eq('ein_number', ein_number)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch company data: ${fetchError.message}`);
    }

    // Update the company_data object
    const updatedCompanyData = {
      ...currentData.company_data,
      ...updates
    };

    // Update the record
    const { data, error } = await supabase
      .from('company_memory')
      .update({ 
        company_data: updatedCompanyData,
        last_updated: new Date().toISOString()
      })
      .eq('ein_number', ein_number)
      .select();

    if (error) {
      throw new Error(`Failed to update company data: ${error.message}`);
    }

    console.log('Company data updated successfully:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Company data updated successfully',
      data 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error updating company data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);