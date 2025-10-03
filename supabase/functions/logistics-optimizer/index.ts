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

interface ShippingQuote {
  carrier: string;
  service_type: string;
  cost: number;
  transit_days: number;
  reliability_score: number;
}

interface LogisticsRoute {
  origin: string;
  destination: string;
  quotes: ShippingQuote[];
  recommended_option: ShippingQuote;
  total_cost: number;
  insurance_cost: number;
  customs_data: any;
}

// Simulação de API DHL
async function getDHLQuote(origin: string, destination: string, weight: number, value: number): Promise<ShippingQuote> {
  console.log(`Getting DHL quote from ${origin} to ${destination}`);
  
  const baseCost = 45;
  const weightCost = weight * 2.5;
  const distanceMultiplier = getDistanceMultiplier(origin, destination);
  const cost = (baseCost + weightCost) * distanceMultiplier;
  
  return {
    carrier: 'DHL Express',
    service_type: 'International Express',
    cost: Math.round(cost * 100) / 100,
    transit_days: getTransitDays(origin, destination, 'express'),
    reliability_score: 95
  };
}

// Simulação de API FedEx  
async function getFedExQuote(origin: string, destination: string, weight: number, value: number): Promise<ShippingQuote> {
  console.log(`Getting FedEx quote from ${origin} to ${destination}`);
  
  const baseCost = 42;
  const weightCost = weight * 2.8;
  const distanceMultiplier = getDistanceMultiplier(origin, destination);
  const cost = (baseCost + weightCost) * distanceMultiplier;
  
  return {
    carrier: 'FedEx International',
    service_type: 'Priority Express',
    cost: Math.round(cost * 100) / 100,
    transit_days: getTransitDays(origin, destination, 'express'),
    reliability_score: 92
  };
}

// Simulação de frete marítimo via Freightos
async function getSeaFreightQuote(origin: string, destination: string, weight: number, value: number): Promise<ShippingQuote> {
  console.log(`Getting sea freight quote from ${origin} to ${destination}`);
  
  if (weight < 100) {
    // Para cargas pequenas, frete marítimo não é viável
    throw new Error('Minimum weight for sea freight is 100kg');
  }
  
  const baseCost = 15;
  const weightCost = weight * 0.5;
  const distanceMultiplier = getDistanceMultiplier(origin, destination) * 0.3; // Muito mais barato por mar
  const cost = (baseCost + weightCost) * distanceMultiplier;
  
  return {
    carrier: 'Sea Freight Network',
    service_type: 'LCL Container',
    cost: Math.round(cost * 100) / 100,
    transit_days: getTransitDays(origin, destination, 'sea'),
    reliability_score: 85
  };
}

function getDistanceMultiplier(origin: string, destination: string): number {
  const routes: Record<string, Record<string, number>> = {
    'China': {
      'USA': 2.5,
      'Germany': 2.2,
      'Japan': 1.3,
      'Brazil': 3.0,
      'Canada': 2.6
    },
    'India': {
      'USA': 2.8,
      'Germany': 2.0,
      'Japan': 1.8,
      'Brazil': 3.2,
      'Canada': 2.9
    },
    'Hong Kong': {
      'USA': 2.3,
      'Germany': 2.1,
      'Japan': 1.2,
      'Brazil': 2.8,
      'Canada': 2.4
    }
  };
  
  return routes[origin]?.[destination] || 2.0;
}

function getTransitDays(origin: string, destination: string, method: 'express' | 'standard' | 'sea'): number {
  const baseDays: Record<string, number> = {
    'express': 3,
    'standard': 7,
    'sea': 25
  };
  
  const multiplier = getDistanceMultiplier(origin, destination) * 0.5;
  return Math.round(baseDays[method] * multiplier);
}

// Cálculo de seguro internacional
function calculateInsurance(value: number, destination: string): number {
  const riskFactors: Record<string, number> = {
    'USA': 0.002,      // 0.2%
    'Germany': 0.0015, // 0.15%
    'Japan': 0.0018,   // 0.18%
    'Brazil': 0.0035,  // 0.35%
    'Canada': 0.002    // 0.2%
  };
  
  const rate = riskFactors[destination] || 0.003;
  return Math.round(value * rate * 100) / 100;
}

// Dados alfandegários por país
function getCustomsData(destination: string, productCategory: string, value: number) {
  const customsRules: Record<string, any> = {
    'USA': {
      duty_rate: 0.08, // 8%
      handling_fee: 25,
      required_documents: ['Commercial Invoice', 'Packing List', 'FDA Registration'],
      restrictions: productCategory === 'health-supplements' ? ['FDA approval required'] : []
    },
    'Germany': {
      duty_rate: 0.06, // 6%
      handling_fee: 20,
      vat_rate: 0.19, // 19%
      required_documents: ['Commercial Invoice', 'Packing List', 'CE Certificate'],
      restrictions: []
    },
    'Japan': {
      duty_rate: 0.05, // 5%
      handling_fee: 30,
      consumption_tax: 0.10, // 10%
      required_documents: ['Commercial Invoice', 'Packing List', 'Import License'],
      restrictions: productCategory === 'health-supplements' ? ['MHLW approval'] : []
    }
  };
  
  const rules = customsRules[destination] || {
    duty_rate: 0.10,
    handling_fee: 25,
    required_documents: ['Commercial Invoice', 'Packing List'],
    restrictions: []
  };
  
  const dutyAmount = value * rules.duty_rate;
  const vatAmount = rules.vat_rate ? (value + dutyAmount) * rules.vat_rate : 0;
  
  return {
    ...rules,
    estimated_duty: dutyAmount,
    estimated_vat: vatAmount,
    total_taxes: dutyAmount + vatAmount + rules.handling_fee
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      opportunity_id,
      origin_country,
      destination_country,
      product_weight_kg,
      product_value_usd,
      product_category,
      quantity
    } = await req.json();
    
    console.log(`📦 Optimizing logistics for opportunity ${opportunity_id}`);
    console.log(`Route: ${origin_country} → ${destination_country}`);
    
    const totalWeight = product_weight_kg * quantity;
    const totalValue = product_value_usd * quantity;
    
    // Obter cotações de diferentes transportadoras
    const quotes = [];
    
    try {
      quotes.push(await getDHLQuote(origin_country, destination_country, totalWeight, totalValue));
    } catch (error: any) {
      console.log('DHL quote failed:', error.message);
    }
    
    try {
      quotes.push(await getFedExQuote(origin_country, destination_country, totalWeight, totalValue));
    } catch (error: any) {
      console.log('FedEx quote failed:', error.message);
    }
    
    try {
      quotes.push(await getSeaFreightQuote(origin_country, destination_country, totalWeight, totalValue));
    } catch (error: any) {
      console.log('Sea freight not available:', error.message);
    }
    
    if (quotes.length === 0) {
      throw new Error('No shipping quotes available');
    }
    
    // Calcular seguro
    const insuranceCost = calculateInsurance(totalValue, destination_country);
    
    // Obter dados alfandegários
    const customsData = getCustomsData(destination_country, product_category, totalValue);
    
    // Encontrar melhor opção (balanceando custo e tempo)
    const scoredQuotes = quotes.map(quote => ({
      ...quote,
      total_cost: quote.cost + insuranceCost + customsData.total_taxes,
      score: calculateLogisticsScore(quote, insuranceCost + customsData.total_taxes)
    }));
    
    const recommendedOption = scoredQuotes.reduce((best, current) => 
      current.score > best.score ? current : best
    );
    
    const logisticsRoute: LogisticsRoute = {
      origin: origin_country,
      destination: destination_country,
      quotes: scoredQuotes,
      recommended_option: recommendedOption,
      total_cost: recommendedOption.total_cost,
      insurance_cost: insuranceCost,
      customs_data: customsData
    };
    
    // Salvar dados de logística
    const { data: logisticsData } = await supabase
      .from('logistics_execution')
      .insert({
        opportunity_id,
        status: 'planning',
        shipping_method: recommendedOption.carrier,
        tracking_info: {
          route: logisticsRoute,
          estimated_delivery: new Date(Date.now() + recommendedOption.transit_days * 24 * 60 * 60 * 1000).toISOString()
        },
        insurance_data: {
          required: true,
          cost: insuranceCost,
          coverage: totalValue
        },
        customs_data: customsData
      })
      .select()
      .single();
    
    // Atualizar oportunidade com dados de execução
    await supabase
      .from('opportunities')
      .update({
        execution_data: {
          logistics: logisticsRoute,
          total_logistics_cost: recommendedOption.total_cost,
          estimated_delivery_days: recommendedOption.transit_days,
          logistics_score: recommendedOption.score
        }
      })
      .eq('id', opportunity_id);
    
    // Log do sistema
    await supabase.from('system_logs').insert({
      module: 'logistics_optimizer',
      action: 'route_optimized',
      success: true,
      data: {
        opportunity_id,
        origin: origin_country,
        destination: destination_country,
        recommended_carrier: recommendedOption.carrier,
        total_cost: recommendedOption.total_cost
      }
    });
    
    return new Response(JSON.stringify({
      success: true,
      opportunity_id,
      logistics_result: {
        route: logisticsRoute,
        recommendation: {
          carrier: recommendedOption.carrier,
          service: recommendedOption.service_type,
          cost: recommendedOption.total_cost,
          transit_days: recommendedOption.transit_days,
          reliability: recommendedOption.reliability_score
        },
        breakdown: {
          shipping_cost: recommendedOption.cost,
          insurance_cost: insuranceCost,
          customs_taxes: customsData.total_taxes,
          total_cost: recommendedOption.total_cost
        },
        all_options: scoredQuotes.map(q => ({
          carrier: q.carrier,
          cost: q.total_cost,
          days: q.transit_days,
          score: q.score
        }))
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Logistics optimization error:', error);
    
    await supabase.from('system_logs').insert({
      module: 'logistics_optimizer',
      action: 'optimization_failed',
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

function calculateLogisticsScore(quote: ShippingQuote, additionalCosts: number): number {
  // Score baseado em custo, tempo e confiabilidade
  const totalCost = quote.cost + additionalCosts;
  const costScore = Math.max(0, 100 - (totalCost / 10)); // Penaliza custos altos
  const timeScore = Math.max(0, 100 - (quote.transit_days * 5)); // Penaliza tempos longos
  const reliabilityScore = quote.reliability_score;
  
  // Média ponderada: 40% custo, 30% tempo, 30% confiabilidade
  return Math.round(costScore * 0.4 + timeScore * 0.3 + reliabilityScore * 0.3);
}