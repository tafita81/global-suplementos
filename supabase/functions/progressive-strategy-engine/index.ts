import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StrategyEvolution {
  current_phase: 'dropshipping' | 'net_15_testing' | 'net_30_achieving' | 'advanced_arbitrage';
  phase_criteria: any;
  next_phase_requirements: string[];
  risk_level: 'zero' | 'minimal' | 'low';
  payment_terms_allowed: string[];
}

interface Transaction {
  id: string;
  date: string;
  customer: any;
  supplier: any;
  product: string;
  value: number;
  margin: number;
  payment_terms_customer: string;
  payment_terms_supplier: string;
  strategy_used: string;
  lessons_learned: string[];
  success_factors: string[];
}

interface SupplierNegotiation {
  supplier_name: string;
  initial_terms: string;
  net_15_possible: boolean;
  net_30_possible: boolean;
  minimum_volume_requirements: any;
  relationship_stage: 'new' | 'testing' | 'established' | 'preferred';
  last_contact: string;
  email_thread: any[];
}

class ProgressiveStrategyEngine {
  private supabase: any;
  private openaiApiKey: string;

  constructor(supabase: any, openaiApiKey: string) {
    this.supabase = supabase;
    this.openaiApiKey = openaiApiKey;
  }

  // Get current strategy based on transaction history
  async getCurrentStrategy(): Promise<StrategyEvolution> {
    const { data: memory } = await this.supabase
      .from('company_memory')
      .select('*')
      .eq('ein_number', '33-3939483')
      .single();

    const aiLearning = memory?.ai_learning_data || {};
    const successfulTransactions = aiLearning.successful_registrations || [];
    const totalValue = successfulTransactions.reduce((sum: number, t: any) => sum + (t.value || 0), 0);

    // Determine current phase based on history
    if (successfulTransactions.length === 0) {
      return {
        current_phase: 'dropshipping',
        phase_criteria: {
          transactions_needed: 3,
          min_value_per_transaction: 5000,
          success_rate_required: 100
        },
        next_phase_requirements: [
          '3 transações de dropshipping bem-sucedidas',
          'Valor mínimo $5K por transação',
          '100% de satisfação do cliente',
          'Pelo menos 2 fornecedores diferentes testados'
        ],
        risk_level: 'zero',
        payment_terms_allowed: ['100% advance payment only']
      };
    }

    if (successfulTransactions.length < 5 || totalValue < 50000) {
      return {
        current_phase: 'net_15_testing',
        phase_criteria: {
          transactions_needed: 5,
          min_total_value: 50000,
          supplier_relationships: 3
        },
        next_phase_requirements: [
          '5+ transações bem-sucedidas',
          'Volume total $50K+',
          'Relacionamento estabelecido com 3+ fornecedores',
          'Pelo menos 1 fornecedor aceitando NET-15'
        ],
        risk_level: 'minimal',
        payment_terms_allowed: ['100% advance payment', 'Test NET-15 with trusted suppliers']
      };
    }

    if (successfulTransactions.length < 15 || totalValue < 200000) {
      return {
        current_phase: 'net_30_achieving',
        phase_criteria: {
          transactions_needed: 15,
          min_total_value: 200000,
          net_15_success_rate: 90
        },
        next_phase_requirements: [
          '15+ transações concluídas',
          'Volume total $200K+',
          '90%+ sucesso com termos NET-15',
          'Múltiplos fornecedores aceitando NET-30'
        ],
        risk_level: 'low',
        payment_terms_allowed: ['100% advance', 'NET-15 with established suppliers', 'Test NET-30 carefully']
      };
    }

    return {
      current_phase: 'advanced_arbitrage',
      phase_criteria: {
        established_business: true,
        multiple_channels: true,
        risk_management: true
      },
      next_phase_requirements: ['Continue scaling with proven strategies'],
      risk_level: 'low',
      payment_terms_allowed: ['All terms available based on relationship']
    };
  }

  // Send email to supplier asking about payment terms (simplified for now)
  async inquireSupplierTerms(supplierEmail: string, supplierName: string, productCategory: string): Promise<any> {
    const strategy = await this.getCurrentStrategy();
    
    // Store the inquiry in negotiations table
    const { data: negotiation, error } = await this.supabase
      .from('negotiations')
      .insert({
        buyer_company: supplierName,
        contact_email: supplierEmail,
        negotiation_stage: 'initial_contact',
        email_content: `Inquiry sent to ${supplierName} about ${productCategory} - checking NET-15/NET-30 terms`,
        status: 'sent',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    console.log('Supplier inquiry logged:', negotiation);
    return { success: true, negotiation_id: negotiation?.id };
  }

  // Generate AI-powered supplier inquiry email
  async generateSupplierInquiry(supplierName: string, productCategory: string, strategy: StrategyEvolution): Promise<string> {
    const prompt = `Generate a professional B2B email inquiry to ${supplierName} about ${productCategory}. 

Current business stage: ${strategy.current_phase}
Allowed payment terms: ${strategy.payment_terms_allowed.join(', ')}

The email should:
1. Introduce our company (Global Supplements Trading, EIN 33-3939483)
2. Express interest in ${productCategory} 
3. Ask about minimum order quantities
4. Inquire about payment terms (specifically ask about NET-15 and NET-30 availability)
5. Request product catalog and pricing
6. Mention our US market distribution capabilities
7. Ask about dropshipping possibilities
8. Be professional but show growth potential

Keep it concise and business-focused.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional B2B communication specialist with expertise in international trade.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating email content:', error);
      return this.getFallbackSupplierEmail(supplierName, productCategory);
    }
  }

  private getFallbackSupplierEmail(supplierName: string, productCategory: string): string {
    return `
Dear ${supplierName} Team,

I hope this email finds you well. My name is [Your Name] from Global Supplements Trading (EIN: 33-3939483), a US-based distribution company specializing in health and wellness products.

We are currently expanding our ${productCategory} product line and are interested in establishing a partnership with your company. We have researched your products and believe they would be an excellent fit for the US market.

Could you please provide information on:

1. Product catalog and pricing for ${productCategory}
2. Minimum order quantities
3. Payment terms available (specifically NET-15 and NET-30 options)
4. Dropshipping capabilities for US customers
5. Lead times and shipping options
6. Quality certifications and compliance documentation

We are committed to building long-term partnerships and expect to start with regular monthly orders. Our distribution network covers major US markets and we're prepared to invest in marketing and promotion.

Would you be available for a brief call to discuss this opportunity further?

Best regards,

Global Supplements Trading
Business Development Department
Email: partnerships@globalsupplements.site
EIN: 33-3939483
`;
  }

  // Record completed transaction and update strategy
  async recordTransaction(transactionData: any): Promise<any> {
    const transaction: Transaction = {
      id: `trans_${Date.now()}`,
      date: new Date().toISOString(),
      customer: transactionData.customer,
      supplier: transactionData.supplier,
      product: transactionData.product,
      value: transactionData.value,
      margin: transactionData.margin,
      payment_terms_customer: transactionData.payment_terms_customer,
      payment_terms_supplier: transactionData.payment_terms_supplier,
      strategy_used: transactionData.strategy_used || 'dropshipping',
      lessons_learned: transactionData.lessons_learned || [],
      success_factors: transactionData.success_factors || []
    };

    // Update company memory with new transaction
    const { data: memory } = await this.supabase
      .from('company_memory')
      .select('*')
      .eq('ein_number', '33-3939483')
      .single();

    const currentLearning = memory?.ai_learning_data || {};
    const updatedLearning = {
      ...currentLearning,
      successful_registrations: [
        ...(currentLearning.successful_registrations || []),
        transaction
      ],
      total_transactions: (currentLearning.total_transactions || 0) + 1,
      total_volume: (currentLearning.total_volume || 0) + transaction.value,
      total_profit: (currentLearning.total_profit || 0) + transaction.margin,
      last_transaction_date: transaction.date
    };

    await this.supabase
      .from('company_memory')
      .update({
        ai_learning_data: updatedLearning,
        last_updated: new Date().toISOString()
      })
      .eq('ein_number', '33-3939483');

    // Get updated strategy
    const newStrategy = await this.getCurrentStrategy();

    // Log the transaction and strategy evolution
    await this.supabase
      .from('system_logs')
      .insert({
        module: 'progressive_strategy_engine',
        action: 'transaction_recorded',
        success: true,
        data: {
          transaction_id: transaction.id,
          value: transaction.value,
          margin: transaction.margin,
          new_phase: newStrategy.current_phase,
          total_transactions: updatedLearning.total_transactions
        }
      });

    return {
      transaction,
      updated_strategy: newStrategy,
      phase_progress: this.calculatePhaseProgress(newStrategy, updatedLearning)
    };
  }

  private calculatePhaseProgress(strategy: StrategyEvolution, learning: any): any {
    const transactions = learning.successful_registrations || [];
    const totalValue = learning.total_volume || 0;

    if (strategy.current_phase === 'dropshipping') {
      return {
        transactions_progress: `${transactions.length}/3`,
        value_progress: `$${totalValue.toLocaleString()}/$15,000`,
        next_milestone: 'Complete 3 successful dropshipping transactions'
      };
    }

    if (strategy.current_phase === 'net_15_testing') {
      return {
        transactions_progress: `${transactions.length}/5`,
        value_progress: `$${totalValue.toLocaleString()}/$50,000`,
        next_milestone: 'Establish NET-15 relationship with first supplier'
      };
    }

    return {
      phase: strategy.current_phase,
      status: 'Advanced phase - continue scaling'
    };
  }

  // Analyze supplier response and update relationship
  async processSupplierResponse(negotiationId: string, responseContent: string): Promise<any> {
    // Use AI to analyze supplier response
    const analysis = await this.analyzeSupplierResponse(responseContent);
    
    // Update negotiation record
    await this.supabase
      .from('negotiations')
      .update({
        response_received: true,
        response_content: responseContent,
        negotiation_stage: 'qualification',
        updated_at: new Date().toISOString()
      })
      .eq('id', negotiationId);

    // Generate follow-up email based on analysis
    const followUp = await this.generateFollowUpEmail(analysis);
    
    return {
      analysis,
      recommended_next_steps: analysis.next_steps,
      follow_up_email: followUp,
      payment_terms_available: analysis.payment_terms
    };
  }

  private async analyzeSupplierResponse(responseContent: string): Promise<any> {
    const prompt = `Analyze this supplier response and extract key information:

"${responseContent}"

Extract and categorize:
1. Payment terms mentioned (NET-15, NET-30, advance payment requirements)
2. Minimum order quantities
3. Pricing information
4. Dropshipping capabilities
5. Lead times
6. Quality certifications
7. Overall willingness to work with us
8. Next steps they suggest
9. Red flags or concerns

Provide structured JSON response with these categories.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 600,
          temperature: 0.3
        }),
      });

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing supplier response:', error);
      return {
        payment_terms: ['advance_payment_required'],
        minimum_orders: 'unknown',
        dropshipping: 'unknown',
        next_steps: ['Request more detailed information']
      };
    }
  }

  private async generateFollowUpEmail(analysis: any): Promise<string> {
    // Generate appropriate follow-up based on supplier's response
    const strategy = await this.getCurrentStrategy();
    
    if (analysis.payment_terms?.includes('net_30') && strategy.current_phase !== 'dropshipping') {
      return "Excellent! We're interested in exploring NET-30 terms. Could we start with a smaller test order to establish the relationship?";
    }
    
    if (analysis.dropshipping === true) {
      return "Perfect! Dropshipping capability is exactly what we need. Could you provide details on your dropshipping process and any setup requirements?";
    }
    
    return "Thank you for the information. We'd like to proceed with a test order. What would be the best way to start our partnership?";
  }
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

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openaiApiKey) {
      throw new Error('Required API keys not configured');
    }

    const { action, ...params } = await req.json();
    
    console.log('Progressive Strategy Engine called with action:', action);

    const engine = new ProgressiveStrategyEngine(supabase, openaiApiKey);

    if (action === 'get_current_strategy') {
      const strategy = await engine.getCurrentStrategy();
      
      return new Response(JSON.stringify({
        success: true,
        current_strategy: strategy,
        timestamp: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === 'inquire_supplier') {
      const { supplier_email, supplier_name, product_category } = params;
      const result = await engine.inquireSupplierTerms(supplier_email, supplier_name, product_category);
      
      return new Response(JSON.stringify({
        success: true,
        inquiry_logged: result,
        message: 'Consulta ao fornecedor registrada (email manual necessário)',
        supplier_email: params.supplier_email,
        next_steps: ['Envie email manual perguntando sobre NET-15/NET-30', 'Aguarde resposta e registre no sistema'],
        timestamp: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === 'record_transaction') {
      const result = await engine.recordTransaction(params.transaction_data);
      
      return new Response(JSON.stringify({
        success: true,
        transaction_recorded: result,
        strategy_updated: true,
        timestamp: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === 'process_supplier_response') {
      const { negotiation_id, response_content } = params;
      const result = await engine.processSupplierResponse(negotiation_id, response_content);
      
      return new Response(JSON.stringify({
        success: true,
        analysis: result,
        timestamp: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Invalid action specified' 
    }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in progressive strategy engine:', error);
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