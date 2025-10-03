import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || 'demo-key';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: any[];
  tool_call_id?: string;
}

// Available tools for the AI assistant
const availableTools = [
  {
    type: "function",
    function: {
      name: "query_opportunities",
      description: "Search and retrieve information about business opportunities in the database",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["pending", "approved", "executing", "rejected"],
            description: "Filter by opportunity status"
          },
          limit: {
            type: "number",
            description: "Maximum number of results to return (default: 10)"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "query_suppliers",
      description: "Search and retrieve information about suppliers in the database",
      parameters: {
        type: "object",
        properties: {
          country: {
            type: "string",
            description: "Filter by supplier country"
          },
          active: {
            type: "boolean",
            description: "Filter by active status"
          },
          limit: {
            type: "number",
            description: "Maximum number of results to return (default: 10)"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "query_mycogenesis_products",
      description: "Search and retrieve information about Mycogenesis products in the database",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["production", "development", "research", "active"],
            description: "Filter by production status"
          },
          limit: {
            type: "number",
            description: "Maximum number of results to return (default: 10)"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "query_logistics",
      description: "Search and retrieve information about logistics executions in the database",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["preparing", "in_transit", "delivered"],
            description: "Filter by logistics status"
          },
          limit: {
            type: "number",
            description: "Maximum number of results to return (default: 10)"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_system_stats",
      description: "Get overall system statistics and metrics",
      parameters: {
        type: "object",
        properties: {}
      }
    }
  }
];

// Tool execution functions
async function executeTools(toolCalls: any[]) {
  const results = [];

  for (const toolCall of toolCalls) {
    const { name, arguments: args } = toolCall.function;
    let result;

    try {
      const parsedArgs = JSON.parse(args);

      switch (name) {
        case 'query_opportunities':
          result = await queryOpportunities(parsedArgs);
          break;
        case 'query_suppliers':
          result = await querySuppliers(parsedArgs);
          break;
        case 'query_mycogenesis_products':
          result = await queryMycogenesisProducts(parsedArgs);
          break;
        case 'query_logistics':
          result = await queryLogistics(parsedArgs);
          break;
        case 'get_system_stats':
          result = await getSystemStats();
          break;
        default:
          result = { error: `Unknown function: ${name}` };
      }
    } catch (error) {
      result = { error: `Error executing ${name}: ${(error as Error).message}` };
    }

    results.push({
      tool_call_id: toolCall.id,
      role: 'tool',
      content: JSON.stringify(result)
    });
  }

  return results;
}

async function queryOpportunities(args: any) {
  let query = supabase.from('opportunities').select('*');
  
  if (args.status) {
    query = query.eq('status', args.status);
  }
  
  const limit = args.limit || 10;
  query = query.limit(limit).order('created_at', { ascending: false });

  const { data, error } = await query;
  
  if (error) throw error;
  
  return {
    count: data?.length || 0,
    opportunities: data?.map(opp => ({
      id: opp.id,
      product_name: opp.product_name,
      source: opp.source,
      estimated_value: opp.estimated_value,
      margin_percentage: opp.margin_percentage,
      status: opp.status,
      risk_score: opp.risk_score,
      target_country: opp.target_country
    })) || []
  };
}

async function querySuppliers(args: any) {
  let query = supabase.from('suppliers').select('*');
  
  if (args.country) {
    query = query.eq('country', args.country);
  }
  
  if (typeof args.active === 'boolean') {
    query = query.eq('active', args.active);
  }
  
  const limit = args.limit || 10;
  query = query.limit(limit).order('created_at', { ascending: false });

  const { data, error } = await query;
  
  if (error) throw error;
  
  return {
    count: data?.length || 0,
    suppliers: data?.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
      country: supplier.country,
      category: supplier.category,
      reliability_score: supplier.reliability_score,
      active: supplier.active
    })) || []
  };
}

async function queryMycogenesisProducts(args: any) {
  let query = supabase.from('mycogenesis_products').select('*');
  
  if (args.status) {
    query = query.eq('production_status', args.status);
  }
  
  const limit = args.limit || 10;
  query = query.limit(limit).order('created_at', { ascending: false });

  const { data, error } = await query;
  
  if (error) throw error;
  
  return {
    count: data?.length || 0,
    products: data?.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      production_status: product.production_status,
      target_markets: product.target_markets
    })) || []
  };
}

async function queryLogistics(args: any) {
  let query = supabase.from('logistics_execution').select('*');
  
  if (args.status) {
    query = query.eq('status', args.status);
  }
  
  const limit = args.limit || 10;
  query = query.limit(limit).order('created_at', { ascending: false });

  const { data, error } = await query;
  
  if (error) throw error;
  
  return {
    count: data?.length || 0,
    executions: data?.map(exec => ({
      id: exec.id,
      opportunity_id: exec.opportunity_id,
      shipping_method: exec.shipping_method,
      status: exec.status
    })) || []
  };
}

async function getSystemStats() {
  const [opportunities, suppliers, products, logistics] = await Promise.all([
    supabase.from('opportunities').select('id, status, estimated_value'),
    supabase.from('suppliers').select('id, active, reliability_score'),
    supabase.from('mycogenesis_products').select('id, production_status'),
    supabase.from('logistics_execution').select('id, status')
  ]);

  const stats = {
    opportunities: {
      total: opportunities.data?.length || 0,
      pending: opportunities.data?.filter(o => o.status === 'pending').length || 0,
      approved: opportunities.data?.filter(o => o.status === 'approved').length || 0,
      total_value: opportunities.data?.reduce((sum, o) => sum + (o.estimated_value || 0), 0) || 0
    },
    suppliers: {
      total: suppliers.data?.length || 0,
      active: suppliers.data?.filter(s => s.active).length || 0,
      avg_reliability: suppliers.data && suppliers.data.length > 0 
        ? suppliers.data.reduce((sum, s) => sum + (s.reliability_score || 0), 0) / suppliers.data.length
        : 0
    },
    products: {
      total: products.data?.length || 0,
      in_production: products.data?.filter(p => p.production_status === 'production' || p.production_status === 'active').length || 0,
      in_development: products.data?.filter(p => p.production_status === 'development').length || 0
    },
    logistics: {
      total: logistics.data?.length || 0,
      in_transit: logistics.data?.filter(l => l.status === 'in_transit').length || 0,
      delivered: logistics.data?.filter(l => l.status === 'delivered').length || 0
    }
  };

  return stats;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversation_history = [] } = await req.json();

    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('QA Assistant request:', { message, history_length: conversation_history.length });

    // Prepare messages with system prompt
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `Você é um assistente inteligente especializado no sistema de arbitragem global e automação completa. 

        Você tem acesso completo aos dados reais do sistema através de ferramentas que podem consultar:
        - Oportunidades de negócio (opportunities)
        - Fornecedores globais (suppliers) 
        - Produtos Mycogenesis (mycogenesis_products)
        - Execuções logísticas (logistics_execution)
        - Estatísticas do sistema

        INSTRUÇÕES:
        1. Responda sempre em português brasileiro
        2. Seja preciso e use dados reais quando disponível
        3. Se precisar de dados específicos, use as ferramentas disponíveis
        4. Explique conceitos técnicos de forma clara
        5. Forneça insights acionáveis baseados nos dados
        6. Seja proativo em sugerir próximos passos

        CONTEXTO DO SISTEMA:
        - Sistema de arbitragem global com automação completa
        - Detecção automática de oportunidades em SAM.gov, Alibaba, etc.
        - Agentes de IA para cadastros e negociações automáticas  
        - Portfolio de produtos inovadores Mycogenesis
        - Rede global de fornecedores
        - Sistema logístico inteligente

        Responda de forma útil, precisa e sempre baseada em dados reais quando possível.`
      },
      ...conversation_history,
      {
        role: 'user',
        content: message
      }
    ];

    console.log('Sending request to OpenAI...');

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        tools: availableTools,
        tool_choice: 'auto',
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const completion = await response.json();
    console.log('OpenAI response received');

    let assistantMessage = completion.choices[0].message;
    const allMessages = [...messages, assistantMessage];

    // Handle tool calls if present
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      console.log('Executing tools:', assistantMessage.tool_calls.map((tc: any) => tc.function.name));
      
      const toolResults = await executeTools(assistantMessage.tool_calls);
      allMessages.push(...toolResults);

      // Make second call with tool results
      const toolResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: allMessages,
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      const toolCompletion = await toolResponse.json();
      assistantMessage = toolCompletion.choices[0].message;
    }

    console.log('QA Assistant response generated successfully');

    return new Response(JSON.stringify({
      response: assistantMessage.content,
      conversation_history: [...conversation_history, 
        { role: 'user', content: message },
        { role: 'assistant', content: assistantMessage.content }
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in QA Assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro interno do servidor',
      details: (error as Error).message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});