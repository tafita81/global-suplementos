import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NegotiationSession {
  id: string;
  opportunity_id: string;
  buyer_profile: any;
  supplier_profile: any;
  current_stage: 'initial_contact' | 'qualification' | 'proposal' | 'negotiation' | 'closing' | 'completed';
  messages: NegotiationMessage[];
  deal_parameters: DealParameters;
  ai_strategy: NegotiationStrategy;
}

interface NegotiationMessage {
  timestamp: string;
  sender: 'ai_agent' | 'buyer' | 'supplier';
  message_type: 'email' | 'proposal' | 'counter_offer' | 'contract';
  content: string;
  parameters?: any;
}

interface DealParameters {
  product: string;
  quantity: number;
  base_price: number;
  target_price: number;
  minimum_acceptable_price: number;
  delivery_timeline: string;
  payment_terms: string;
  quality_requirements: string[];
  compliance_certifications: string[];
}

interface NegotiationStrategy {
  personality_profile: string;
  negotiation_style: 'aggressive' | 'collaborative' | 'analytical' | 'diplomatic';
  key_selling_points: string[];
  concession_strategy: any;
  closing_tactics: string[];
  risk_assessment: any;
}

// Advanced AI-powered negotiation engine
class AutonomousNegotiator {
  private openaiApiKey: string;
  private supabase: any;

  constructor(openaiApiKey: string, supabase: any) {
    this.openaiApiKey = openaiApiKey;
    this.supabase = supabase;
  }

  // Generate intelligent negotiation responses using GPT-4
  async generateNegotiationResponse(session: NegotiationSession, context: any): Promise<string> {
    const prompt = this.buildNegotiationPrompt(session, context);
    
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
      content: `You are an expert B2B negotiator with 20+ years of experience in international trade and arbitrage. 
              CRITICAL RULE: You operate on ZERO INVESTMENT principle - NEVER close any deal unless payment is received 100% in advance.
              Your goal is to maximize profit while building long-term business relationships with ZERO FINANCIAL RISK.
              You have deep knowledge of market dynamics, cultural business practices, and negotiation psychology.
              Always be professional, data-driven, and strategic in your responses.
              MANDATORY: All deals must have 100% advance payment or confirmed letter of credit before supplier commitment.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating negotiation response:', error);
      return this.getFallbackResponse(session);
    }
  }

  private buildNegotiationPrompt(session: NegotiationSession, context: any): string {
    return `
NEGOTIATION CONTEXT:
- Product: ${session.deal_parameters.product}
- Quantity: ${session.deal_parameters.quantity.toLocaleString()} units
- Target Price: $${session.deal_parameters.target_price.toLocaleString()}
- Current Stage: ${session.current_stage}
- Buyer Profile: ${JSON.stringify(session.buyer_profile)}
- Strategy: ${session.ai_strategy.negotiation_style}

CONVERSATION HISTORY:
${session.messages.slice(-3).map(msg => `${msg.sender}: ${msg.content}`).join('\n')}

CURRENT SITUATION:
${context.situation_description}

INSTRUCTIONS:
Generate a professional, strategic response that:
1. Advances the negotiation toward a profitable deal with ZERO INVESTMENT RISK
2. Addresses the buyer's specific needs and concerns
3. Uses appropriate negotiation tactics for the current stage
4. Maintains professional relationship while maximizing value
5. ALWAYS insists on 100% advance payment or confirmed letter of credit
6. Explains why advance payment is standard in international trade
7. Includes specific next steps or calls to action

CRITICAL: Never agree to any payment terms that require upfront investment from our side.
Response format should be a professional business email or proposal.
`;
  }

  private getFallbackResponse(session: NegotiationSession): string {
    const fallbackResponses = {
      'initial_contact': `Thank you for your interest in ${session.deal_parameters.product}. We have exclusive access to high-quality units and can offer competitive pricing. Let's schedule a call to discuss your specific requirements.`,
      'qualification': `Based on your requirements, we can provide exactly what you need. Our suppliers are certified and we guarantee delivery within your timeline. What's your target price point for this volume?`,
      'proposal': `We're prepared to offer ${session.deal_parameters.quantity.toLocaleString()} units at $${session.deal_parameters.target_price.toLocaleString()} per unit, including quality certifications and expedited shipping.`,
      'negotiation': `We understand your budget constraints. Given the current market conditions and exclusive nature of this product, we can adjust our pricing to $${(session.deal_parameters.target_price * 0.95).toLocaleString()} per unit for immediate commitment.`,
      'closing': `This is an excellent opportunity for both parties. Shall we proceed with the contract at the agreed terms? We can have everything finalized within 24 hours.`,
      'completed': `Thank you for your partnership. The contract has been executed and we're now proceeding with delivery arrangements.`
    };

    return fallbackResponses[session.current_stage] || fallbackResponses['initial_contact'];
  }

  // Advanced buyer profiling and strategy adaptation
  async analyzeBuyerProfile(buyerData: any): Promise<any> {
    return {
      company_size: buyerData.size || 'Medium',
      buying_power: buyerData.buyingPower || 'Medium',
      urgency_level: buyerData.urgency || 'Medium',
      price_sensitivity: this.calculatePriceSensitivity(buyerData),
      decision_making_style: this.analyzDecisionMakingStyle(buyerData),
      negotiation_leverage: this.calculateNegotiationLeverage(buyerData),
      preferred_communication: 'email', // Could be enhanced with real data
      cultural_considerations: this.getCulturalConsiderations(buyerData.country)
    };
  }

  private calculatePriceSensitivity(buyerData: any): 'high' | 'medium' | 'low' {
    if (buyerData.buyingPower === 'High' && buyerData.size === 'Enterprise') return 'low';
    if (buyerData.urgency === 'High') return 'low';
    return 'medium';
  }

  private analyzDecisionMakingStyle(buyerData: any): string {
    if (buyerData.size === 'Enterprise') return 'committee_based';
    if (buyerData.urgency === 'High') return 'fast_decision';
    return 'analytical';
  }

  private calculateNegotiationLeverage(buyerData: any): 'high' | 'medium' | 'low' {
    if (buyerData.urgency === 'High' && buyerData.buyingPower === 'High') return 'high';
    if (buyerData.urgency === 'Low') return 'low';
    return 'medium';
  }

  private getCulturalConsiderations(country: string): any {
    const culturalMap: any = {
      'USA': { communication_style: 'direct', relationship_importance: 'medium', negotiation_pace: 'fast' },
      'Germany': { communication_style: 'direct', relationship_importance: 'low', negotiation_pace: 'methodical' },
      'Japan': { communication_style: 'indirect', relationship_importance: 'high', negotiation_pace: 'slow' },
      'Brazil': { communication_style: 'relationship_first', relationship_importance: 'high', negotiation_pace: 'medium' },
      'China': { communication_style: 'indirect', relationship_importance: 'high', negotiation_pace: 'patient' }
    };

    return culturalMap[country] || culturalMap['USA'];
  }

  // Execute complete negotiation cycle
  async executeNegotiationCycle(opportunityId: string, buyerProfile: any): Promise<any> {
    console.log(`Starting negotiation cycle for opportunity ${opportunityId}`);

    // Create negotiation session
    const session: NegotiationSession = {
      id: `nego_${Date.now()}`,
      opportunity_id: opportunityId,
      buyer_profile: await this.analyzeBuyerProfile(buyerProfile),
      supplier_profile: await this.getSupplierProfile(opportunityId),
      current_stage: 'initial_contact',
      messages: [],
      deal_parameters: await this.buildDealParameters(opportunityId),
      ai_strategy: await this.buildNegotiationStrategy(buyerProfile)
    };

    // Execute negotiation stages
    const results = [];
    const stages = ['initial_contact', 'qualification', 'proposal', 'negotiation', 'closing'];

    for (const stage of stages) {
      session.current_stage = stage as any;
      
      const context = {
        situation_description: this.getStageDescription(stage),
        market_conditions: 'favorable',
        competition_level: 'medium',
        time_pressure: session.buyer_profile.urgency_level
      };

      const response = await this.generateNegotiationResponse(session, context);
      
      const message: NegotiationMessage = {
        timestamp: new Date().toISOString(),
        sender: 'ai_agent',
        message_type: 'email',
        content: response,
        parameters: { stage, confidence: Math.random() * 30 + 70 }
      };

      session.messages.push(message);
      results.push({
        stage,
        message: response,
        timestamp: message.timestamp
      });

      // Store in database
      await this.supabase
        .from('negotiations')
        .upsert({
          id: session.id,
          opportunity_id: opportunityId,
          buyer_company: buyerProfile.company,
          negotiation_stage: stage,
          email_content: response,
          status: stage === 'closing' ? 'completed' : 'in_progress',
          deal_value: session.deal_parameters.target_price * session.deal_parameters.quantity,
          success_probability: this.calculateSuccessProbability(session),
          updated_at: new Date().toISOString()
        });

      // Simulate time delay between stages (in real implementation, this would be event-driven)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {
      session_id: session.id,
      negotiation_results: results,
      final_deal_probability: this.calculateSuccessProbability(session),
      estimated_close_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      deal_value: session.deal_parameters.target_price * session.deal_parameters.quantity
    };
  }

  private getStageDescription(stage: string): string {
    const descriptions: any = {
      'initial_contact': 'First outreach to the buyer, establishing interest and credibility',
      'qualification': 'Understanding buyer needs, budget, timeline, and decision-making process',
      'proposal': 'Presenting formal offer with pricing, terms, and value proposition',
      'negotiation': 'Active price and terms negotiation based on buyer feedback',
      'closing': 'Final push to secure agreement and move to contract execution'
    };
    return descriptions[stage] || 'Standard business negotiation stage';
  }

  private async buildDealParameters(opportunityId: string): Promise<DealParameters> {
    // Get opportunity details from database
    const { data: opportunity } = await this.supabase
      .from('opportunities')
      .select('*')
      .eq('id', opportunityId)
      .single();

    const basePrice = opportunity?.estimated_value / (opportunity?.quantity || 1) || 25000;
    
    return {
      product: opportunity?.product_name || 'Industrial Equipment',
      quantity: opportunity?.quantity || 1000,
      base_price: basePrice,
      target_price: basePrice * 1.1, // 10% markup
      minimum_acceptable_price: basePrice * 1.05, // 5% minimum margin
      delivery_timeline: '4-6 weeks',
      // ZERO INVESTMENT RULE: ALWAYS get paid before paying supplier
      payment_terms: '100% payment in advance via wire transfer or letter of credit',
      quality_requirements: ['ISO 9001 certification', 'Quality testing reports', 'Warranty coverage'],
      compliance_certifications: ['CE marking', 'FCC compliance', 'Environmental standards']
    };
  }

  private async buildNegotiationStrategy(buyerProfile: any): Promise<NegotiationStrategy> {
    const strategy = buyerProfile.urgency === 'High' ? 'aggressive' : 
                    buyerProfile.size === 'Enterprise' ? 'diplomatic' : 'collaborative';

    return {
      personality_profile: `${buyerProfile.company} - ${buyerProfile.size} company with ${buyerProfile.buyingPower} buying power`,
      negotiation_style: strategy,
      key_selling_points: [
        'Exclusive access to high-demand products',
        'Guaranteed quality and compliance',
        'Competitive market pricing',
        'Reliable supply chain and delivery',
        'Full technical support included'
      ],
      concession_strategy: {
        price_flexibility: 10, // Maximum 10% price reduction
        term_flexibility: 'payment_terms', // Can adjust payment terms
        volume_discounts: true,
        timeline_acceleration: true
      },
      closing_tactics: [
        'Limited time availability',
        'Market price increases expected',
        'Exclusive supplier relationship offer',
        'Bulk discount incentives',
        'Fast-track delivery option'
      ],
      risk_assessment: {
        buyer_creditworthiness: 'medium',
        market_volatility: 'low',
        supplier_reliability: 'high',
        regulatory_compliance: 'verified'
      }
    };
  }

  private async getSupplierProfile(opportunityId: string): Promise<any> {
    // Mock supplier profile - in real implementation, this would come from supplier database
    return {
      name: 'Global Manufacturing Solutions',
      country: 'China',
      reliability_score: 94,
      quality_rating: 'A+',
      capacity: '10,000+ units/month',
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
      payment_terms: 'Flexible',
      lead_time: '3-4 weeks'
    };
  }

  private calculateSuccessProbability(session: NegotiationSession): number {
    let probability = 70; // Base probability

    // Adjust based on buyer profile
    if (session.buyer_profile.urgency_level === 'High') probability += 15;
    if (session.buyer_profile.buying_power === 'High') probability += 10;
    if (session.buyer_profile.price_sensitivity === 'low') probability += 10;

    // Adjust based on negotiation progress
    probability += session.messages.length * 2; // More engagement = higher probability

    // Adjust based on deal terms
    const margin = (session.deal_parameters.target_price - session.deal_parameters.base_price) / session.deal_parameters.base_price;
    if (margin > 0.15) probability -= 10; // High margins reduce probability

    return Math.min(95, Math.max(30, probability));
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { action, opportunity_id, buyer_profile, negotiation_id } = await req.json();

    console.log(`Autonomous Negotiator called with action: ${action}`);

    const negotiator = new AutonomousNegotiator(openaiApiKey, supabase);

    if (action === 'start_negotiation') {
      if (!opportunity_id || !buyer_profile) {
        throw new Error('Opportunity ID and buyer profile required');
      }

      const result = await negotiator.executeNegotiationCycle(opportunity_id, buyer_profile);

      // Log the negotiation initiation
      await supabase
        .from('system_logs')
        .insert({
          module: 'autonomous_negotiator',
          action: 'negotiation_started',
          success: true,
          data: {
            opportunity_id,
            session_id: result.session_id,
            buyer_company: buyer_profile.company,
            estimated_deal_value: result.deal_value
          }
        });

      return new Response(JSON.stringify({
        success: true,
        negotiation_result: result,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'continue_negotiation') {
      // Handle ongoing negotiation responses
      const { message, context } = await req.json();
      
      // Get existing negotiation session
      const { data: negotiation } = await supabase
        .from('negotiations')
        .select('*')
        .eq('id', negotiation_id)
        .single();

      if (!negotiation) {
        throw new Error('Negotiation session not found');
      }

      const session = {
        id: negotiation.id,
        opportunity_id: negotiation.opportunity_id,
        buyer_profile: { company: negotiation.buyer_company },
        current_stage: negotiation.negotiation_stage,
        messages: [{ sender: 'buyer', content: message, timestamp: new Date().toISOString() }],
        deal_parameters: {
          product: 'Product',
          target_price: negotiation.deal_value / 1000 // Estimate
        }
      } as NegotiationSession;

      const response = await negotiator.generateNegotiationResponse(session, context || {});

      // Update negotiation in database
      await supabase
        .from('negotiations')
        .update({
          email_content: response,
          updated_at: new Date().toISOString(),
          response_received: true,
          response_content: message
        })
        .eq('id', negotiation_id);

      return new Response(JSON.stringify({
        success: true,
        response: response,
        negotiation_id: negotiation_id,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'get_negotiation_status') {
      const { data: negotiations } = await supabase
        .from('negotiations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      return new Response(JSON.stringify({
        success: true,
        active_negotiations: negotiations?.length || 0,
        negotiations: negotiations || [],
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      error: 'Invalid action specified',
      available_actions: ['start_negotiation', 'continue_negotiation', 'get_negotiation_status']
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Autonomous Negotiator error:', error);
    
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});