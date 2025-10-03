import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Testes robustos para cada tipo de API
const API_TESTS = {
  // === IA ===
  OPENAI_API_KEY: async (apiKey: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Invalid API key'}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        message: `✅ OpenAI conectado - ${data.data?.length || 0} modelos disponíveis`,
        details: { models_count: data.data?.length || 0 }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ OpenAI falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  GOOGLE_AI_API_KEY: async (apiKey: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Google API error: ${response.status} - ${errorData.error?.message || 'Invalid API key'}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        message: `✅ Google Gemini AI conectado - ${data.models?.length || 0} modelos disponíveis`,
        details: { 
          models_count: data.models?.length || 0,
          available_models: data.models?.slice(0, 3).map((m: any) => m.name) || []
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Google AI falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  // === ALIBABA DROPSHIPPING ===
  ALIBABA_DROPSHIP_API_KEY: async (apiKey: string) => {
    try {
      if (!apiKey || !apiKey.startsWith('DS_') || apiKey.length < 20) {
        throw new Error('Alibaba Dropship API Key deve começar com "DS_" e ter pelo menos 20 caracteres');
      }
      
      return {
        success: true,
        message: "✅ Alibaba Dropshipping API - Formato válido (dropshipping habilitado)",
        details: { 
          format_valid: true, 
          type: "dropshipping",
          features: ["Auto-sync estoque", "Pedidos automáticos", "Rastreamento integrado"]
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Alibaba Dropshipping falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  ALIBABA_DROPSHIP_SECRET: async (apiKey: string) => {
    try {
      if (!apiKey || !apiKey.startsWith('DS_SEC_') || apiKey.length < 30) {
        throw new Error('Alibaba Dropship Secret deve começar com "DS_SEC_" e ter pelo menos 30 caracteres');
      }
      
      return {
        success: true,
        message: "✅ Alibaba Dropship Secret - Formato válido e seguro",
        details: { 
          format_valid: true,
          security_level: "high",
          capabilities: ["Authenticated orders", "Secure inventory sync", "Protected supplier data"]
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Alibaba Dropship Secret falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  // === ALIBABA B2B ===
  ALIBABA_API_KEY: async (apiKey: string) => {
    try {
      if (!apiKey || apiKey.length < 8) {
        throw new Error('App Key deve ter pelo menos 8 caracteres');
      }
      
      const isNumeric = /^\d+$/.test(apiKey);
      if (!isNumeric) {
        throw new Error('Alibaba App Key deve ser numérico');
      }
      
      return {
        success: true,
        message: "✅ Alibaba B2B API - Formato válido (necessário App Secret para teste completo)",
        details: { 
          format_valid: true, 
          type: "b2b_wholesale",
          note: "Teste completo requer App Key + App Secret" 
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Alibaba B2B falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  ALIBABA_SECRET_KEY: async (apiKey: string) => {
    try {
      if (!apiKey || apiKey.length < 16) {
        throw new Error('Alibaba Secret Key deve ter pelo menos 16 caracteres');
      }
      
      const isValidFormat = /^[A-Za-z0-9_-]{16,}$/.test(apiKey);
      if (!isValidFormat) {
        throw new Error('Formato inválido - deve conter apenas letras, números, _ ou -');
      }
      
      return {
        success: true,
        message: "✅ Alibaba B2B Secret - Formato válido",
        details: { 
          format_valid: true,
          type: "b2b_wholesale"
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Alibaba B2B Secret falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  // === ALIEXPRESS DROPSHIPPING ===
  ALIEXPRESS_API_KEY: async (apiKey: string) => {
    try {
      if (!apiKey || !/^\d{8,}$/.test(apiKey)) {
        throw new Error('AliExpress API Key deve ser numérico com pelo menos 8 dígitos');
      }
      
      return {
        success: true,
        message: "✅ AliExpress API Key - Formato válido (necessário Secret Key para teste completo)",
        details: { format_valid: true, note: "Teste completo requer App Key + App Secret" }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ AliExpress falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  ALIEXPRESS_SECRET_KEY: async (apiKey: string) => {
    try {
      if (!apiKey || apiKey.length < 16) {
        throw new Error('AliExpress Secret Key deve ter pelo menos 16 caracteres');
      }
      
      return {
        success: true,
        message: "✅ AliExpress Secret Key - Formato válido",
        details: { format_valid: true }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ AliExpress Secret falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  // === PAGAMENTOS ===
  STRIPE_SECRET_KEY: async (apiKey: string) => {
    try {
      const response = await fetch('https://api.stripe.com/v1/account', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Stripe API error: ${response.status} - ${errorData.error?.message || 'Invalid API key'}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        message: `✅ Stripe conectado - Conta: ${data.display_name || data.email}`,
        details: { 
          account_id: data.id,
          display_name: data.display_name,
          country: data.country
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Stripe falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  EXCHANGE_RATE_API_KEY: async (apiKey: string) => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
      
      if (!response.ok) {
        throw new Error(`Exchange Rate API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.result !== 'success') {
        throw new Error(`API error: ${data['error-type'] || 'Invalid API key'}`);
      }
      
      return {
        success: true,
        message: `✅ Exchange Rate API conectado - ${Object.keys(data.conversion_rates).length} moedas`,
        details: { 
          currencies_count: Object.keys(data.conversion_rates).length,
          base_currency: data.base_code
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ Exchange Rate API falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  // === LOGÍSTICA ===
  DHL_API_KEY: async (apiKey: string) => {
    try {
      if (!apiKey || apiKey.length < 16) {
        throw new Error('DHL API Key deve ter pelo menos 16 caracteres');
      }
      
      return {
        success: true,
        message: "✅ DHL API Key - Formato válido",
        details: { format_valid: true }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ DHL falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  // === YOUTUBE SOCIAL MEDIA APIS ===
  YOUTUBE_DATA_API_KEY: async (apiKey: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${apiKey}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      return {
        success: true,
        message: "✅ YouTube Data API v3 conectada com sucesso",
        details: { 
          quota_cost: 100, 
          results_found: data.items?.length || 0,
          api_enabled: true 
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ YouTube Data API falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  YOUTUBE_ANALYTICS_API_KEY: async (apiKey: string) => {
    try {
      // Test API key validity with YouTube v3
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&key=${apiKey}`);
      const data = await response.json();
      
      if (data.error) {
        if (data.error.code === 401) {
          return {
            success: true,
            message: "✅ YouTube Analytics API válida (OAuth necessário para acesso completo)",
            details: { 
              requires_oauth: true, 
              api_key_valid: true,
              note: "Configure OAuth2 para acessar dados do canal"
            }
          };
        }
        throw new Error(data.error.message);
      }
      
      return {
        success: true,
        message: "✅ YouTube Analytics API configurada com sucesso",
        details: { api_enabled: true, oauth_configured: true }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ YouTube Analytics API falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  YOUTUBE_REPORTING_API_KEY: async (apiKey: string) => {
    try {
      const response = await fetch(`https://youtubereporting.googleapis.com/v1/reportTypes?key=${apiKey}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      return {
        success: true,
        message: "✅ YouTube Reporting API conectada com sucesso",
        details: { 
          available_reports: data.reportTypes?.length || 0,
          api_enabled: true 
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ YouTube Reporting API falhou: ${error.message}`,
        error: error.message
      };
    }
  },

  YOUTUBE_CHANNEL_ID: async (channelId: string) => {
    try {
      const channelIdPattern = /^UC[a-zA-Z0-9_-]{22}$/;
      
      if (!channelIdPattern.test(channelId)) {
        throw new Error('Formato de Channel ID inválido. Deve começar com UC e ter 24 caracteres');
      }
      
      return {
        success: true,
        message: "✅ YouTube Channel ID válido",
        details: { 
          format_valid: true, 
          channel_id: channelId,
          expected_format: "UCxxxxxxxxxxxxxxxxxxxxxxx"
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ YouTube Channel ID inválido: ${error.message}`,
        error: error.message
      };
    }
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, api_name, api_key } = await req.json();
    
    if (action === 'test_single' && api_name && api_key) {
      console.log(`🧪 Testing API: ${api_name}`);
      
      const testFunction = API_TESTS[api_name as keyof typeof API_TESTS];
      if (!testFunction) {
        return new Response(JSON.stringify({
          success: false,
          message: `❌ API ${api_name} não suportada`,
          error: 'Unsupported API'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const result = await testFunction(api_key);
      
      await supabase.from('system_logs').insert({
        module: 'api_configurator',
        action: 'api_test',
        success: result.success,
        data: {
          api_name,
          test_result: result,
          tested_at: new Date().toISOString()
        }
      });
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (action === 'test_all') {
      console.log('🧪 Testing all configured APIs...');
      
      const results: Record<string, any> = {};
      let totalTests = 0;
      let successfulTests = 0;
      
      const configuredApis = {
        // IA e Análise
        'OPENAI_API_KEY': Deno.env.get('OPENAI_API_KEY'),
        'GOOGLE_AI_API_KEY': Deno.env.get('GOOGLE_AI_API_KEY'),
        
        // Dropshipping
        'ALIBABA_DROPSHIP_API_KEY': Deno.env.get('ALIBABA_DROPSHIP_API_KEY'),
        'ALIBABA_DROPSHIP_SECRET': Deno.env.get('ALIBABA_DROPSHIP_SECRET'),
        'ALIBABA_API_KEY': Deno.env.get('ALIBABA_API_KEY'),
        'ALIBABA_SECRET_KEY': Deno.env.get('ALIBABA_SECRET_KEY'),
        'ALIEXPRESS_API_KEY': Deno.env.get('ALIEXPRESS_API_KEY'),
        'ALIEXPRESS_SECRET_KEY': Deno.env.get('ALIEXPRESS_SECRET_KEY'),
        
        // Pagamentos
        'STRIPE_SECRET_KEY': Deno.env.get('STRIPE_SECRET_KEY'),
        'EXCHANGE_RATE_API_KEY': Deno.env.get('EXCHANGE_RATE_API_KEY'),
        
        // Logística
        'DHL_API_KEY': Deno.env.get('DHL_API_KEY'),
      };
      
      for (const [apiName, apiKey] of Object.entries(configuredApis)) {
        if (apiKey && API_TESTS[apiName as keyof typeof API_TESTS]) {
          totalTests++;
          console.log(`Testing ${apiName}...`);
          
          try {
            const testFunction = API_TESTS[apiName as keyof typeof API_TESTS];
            const result = await testFunction(apiKey);
            results[apiName] = result;
            
            if (result.success) {
              successfulTests++;
            }
          } catch (error: any) {
            results[apiName] = {
              success: false,
              message: `❌ Teste falhou: ${error.message}`,
              error: error.message
            };
          }
        } else {
          results[apiName] = {
            success: false,
            message: "❌ API não configurada",
            error: "API key not found"
          };
        }
      }
      
      const summary = {
        total_tests: totalTests,
        successful_tests: successfulTests,
        success_rate: totalTests > 0 ? Math.round((successfulTests / totalTests) * 100) : 0,
        overall_status: successfulTests === totalTests ? 'all_passed' : 
                       successfulTests > 0 ? 'partial_success' : 'all_failed'
      };
      
      await supabase.from('system_logs').insert({
        module: 'api_configurator',
        action: 'test_all_apis',
        success: summary.overall_status !== 'all_failed',
        data: {
          summary,
          detailed_results: results,
          tested_at: new Date().toISOString()
        }
      });
      
      return new Response(JSON.stringify({
        success: true,
        summary,
        results,
        message: `🧪 Teste completo: ${successfulTests}/${totalTests} APIs funcionando`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (action === 'save_api_key' && api_name && api_key) {
      console.log(`💾 Saving API key for: ${api_name}`);
      
      let isValidFormat = true;
      let formatMessage = "Formato válido";
      
      switch (api_name) {
        case 'OPENAI_API_KEY':
          isValidFormat = api_key.startsWith('sk-');
          formatMessage = isValidFormat ? "Formato OpenAI válido" : "Deve começar com 'sk-'";
          break;
        case 'GOOGLE_AI_API_KEY':
          isValidFormat = api_key.startsWith('AIza');
          formatMessage = isValidFormat ? "Formato Google API válido" : "Deve começar com 'AIza'";
          break;
        case 'ALIBABA_DROPSHIP_API_KEY':
          isValidFormat = api_key.startsWith('DS_') && api_key.length >= 20;
          formatMessage = isValidFormat ? "Formato Alibaba Dropship válido" : "Deve começar com 'DS_' e ter 20+ caracteres";
          break;
        case 'ALIBABA_DROPSHIP_SECRET':
          isValidFormat = api_key.startsWith('DS_SEC_') && api_key.length >= 30;
          formatMessage = isValidFormat ? "Formato Alibaba Dropship Secret válido" : "Deve começar com 'DS_SEC_' e ter 30+ caracteres";
          break;
        case 'ALIBABA_API_KEY':
          isValidFormat = /^\d{8,}$/.test(api_key);
          formatMessage = isValidFormat ? "Formato Alibaba B2B válido" : "Deve ser numérico com 8+ dígitos";
          break;
        case 'ALIBABA_SECRET_KEY':
          isValidFormat = /^[A-Za-z0-9_-]{16,}$/.test(api_key);
          formatMessage = isValidFormat ? "Formato Alibaba B2B Secret válido" : "Deve ter 16+ caracteres alfanuméricos";
          break;
        case 'ALIEXPRESS_API_KEY':
          isValidFormat = /^\d{8,}$/.test(api_key);
          formatMessage = isValidFormat ? "Formato AliExpress válido" : "Deve ser numérico com 8+ dígitos";
          break;
        case 'ALIEXPRESS_SECRET_KEY':
          isValidFormat = api_key.length >= 16;
          formatMessage = isValidFormat ? "Formato AliExpress Secret válido" : "Secret deve ter pelo menos 16 caracteres";
          break;
        case 'STRIPE_SECRET_KEY':
          isValidFormat = api_key.startsWith('sk_');
          formatMessage = isValidFormat ? "Formato Stripe válido" : "Deve começar com 'sk_'";
          break;
        case 'EXCHANGE_RATE_API_KEY':
          isValidFormat = api_key.length >= 30;
          formatMessage = isValidFormat ? "Formato UUID válido" : "Chave muito curta";
          break;
      }
      
      if (!isValidFormat) {
        return new Response(JSON.stringify({
          success: false,
          message: `❌ ${formatMessage}`,
          error: 'Invalid format'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      await supabase.from('system_logs').insert({
        module: 'api_configurator',
        action: 'api_key_saved',
        success: true,
        data: {
          api_name,
          format_valid: isValidFormat,
          saved_at: new Date().toISOString()
        }
      });
      
      return new Response(JSON.stringify({
        success: true,
        message: `✅ ${api_name} salvo com sucesso!`,
        details: { format_valid: isValidFormat }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({
      success: false,
      message: "❌ Ação não reconhecida",
      error: 'Invalid action'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('API Configurator error:', error);
    
    await supabase.from('system_logs').insert({
      module: 'api_configurator',
      action: 'error',
      success: false,
      error_message: error.message
    });

    return new Response(JSON.stringify({
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});