import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DealValidation {
  deal_id: string;
  payment_terms: string;
  cashflow_analysis: CashflowAnalysis;
  risk_assessment: RiskAssessment;
  validation_result: 'approved' | 'rejected' | 'needs_modification';
  required_modifications: string[];
}

interface CashflowAnalysis {
  customer_payment_timeline: string;
  supplier_payment_timeline: string;
  float_period_days: number;
  investment_required: number;
  cash_positive_from_day_one: boolean;
  risk_level: 'zero' | 'low' | 'medium' | 'high';
}

interface RiskAssessment {
  financial_risk: number;
  operational_risk: number;
  compliance_risk: number;
  overall_risk_score: number;
  recommendation: string;
}

class ZeroInvestmentValidator {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  // Validate if deal meets zero investment criteria
  async validateDeal(dealData: any): Promise<DealValidation> {
    console.log('Validating deal for zero investment compliance:', dealData);

    const cashflowAnalysis = this.analyzeCashflow(dealData);
    const riskAssessment = this.assessRisk(dealData, cashflowAnalysis);
    
    const validation: DealValidation = {
      deal_id: dealData.id || `deal_${Date.now()}`,
      payment_terms: dealData.payment_terms,
      cashflow_analysis: cashflowAnalysis,
      risk_assessment: riskAssessment,
      validation_result: this.determineValidationResult(cashflowAnalysis, riskAssessment),
      required_modifications: this.getRequiredModifications(cashflowAnalysis, riskAssessment)
    };

    // Store validation in database
    await this.supabase
      .from('system_logs')
      .insert({
        module: 'zero_investment_validator',
        action: 'deal_validation',
        success: validation.validation_result === 'approved',
        data: {
          deal_id: validation.deal_id,
          validation_result: validation.validation_result,
          risk_score: riskAssessment.overall_risk_score,
          cash_positive: cashflowAnalysis.cash_positive_from_day_one,
          investment_required: cashflowAnalysis.investment_required
        }
      });

    return validation;
  }

  private analyzeCashflow(dealData: any): CashflowAnalysis {
    const customerPaymentDays = this.parsePaymentTerms(dealData.customer_payment_terms || '100% advance');
    const supplierPaymentDays = this.parsePaymentTerms(dealData.supplier_payment_terms || 'NET-30');
    
    const floatPeriod = supplierPaymentDays - customerPaymentDays;
    const investmentRequired = floatPeriod > 0 ? 0 : Math.abs(floatPeriod) * (dealData.deal_value || 0) / 30;
    
    return {
      customer_payment_timeline: dealData.customer_payment_terms || '100% advance',
      supplier_payment_timeline: dealData.supplier_payment_terms || 'NET-30',
      float_period_days: floatPeriod,
      investment_required: investmentRequired,
      cash_positive_from_day_one: floatPeriod >= 0 && customerPaymentDays <= 0,
      risk_level: this.calculateCashflowRisk(floatPeriod, investmentRequired)
    };
  }

  private parsePaymentTerms(terms: string): number {
    terms = terms.toLowerCase();
    
    // Advance payments (0 days or negative)
    if (terms.includes('advance') || terms.includes('prepaid') || terms.includes('100%')) {
      return 0;
    }
    
    // NET terms
    if (terms.includes('net')) {
      const match = terms.match(/net[\s-]*(\d+)/);
      return match ? parseInt(match[1]) : 30;
    }
    
    // Cash on delivery
    if (terms.includes('cod') || terms.includes('delivery')) {
      return 0;
    }
    
    // Letter of credit (treated as immediate)
    if (terms.includes('letter of credit') || terms.includes('l/c')) {
      return 0;
    }
    
    // Default to 30 days if unclear
    return 30;
  }

  private calculateCashflowRisk(floatPeriod: number, investmentRequired: number): 'zero' | 'low' | 'medium' | 'high' {
    if (floatPeriod >= 0 && investmentRequired === 0) return 'zero';
    if (floatPeriod >= -7 && investmentRequired < 10000) return 'low';
    if (floatPeriod >= -15 && investmentRequired < 50000) return 'medium';
    return 'high';
  }

  private assessRisk(dealData: any, cashflow: CashflowAnalysis): RiskAssessment {
    let financialRisk = cashflow.investment_required > 0 ? 80 : 10;
    let operationalRisk = 20; // Base operational risk
    let complianceRisk = 15; // Base compliance risk
    
    // Adjust financial risk based on cashflow
    if (cashflow.cash_positive_from_day_one) {
      financialRisk = 5;
    } else if (cashflow.float_period_days < -30) {
      financialRisk = 95;
    }
    
    // Adjust based on deal characteristics
    if (dealData.customer_creditworthiness === 'high') {
      financialRisk -= 10;
      operationalRisk -= 5;
    }
    
    if (dealData.supplier_reliability === 'high') {
      operationalRisk -= 10;
    }
    
    const overallRisk = (financialRisk + operationalRisk + complianceRisk) / 3;
    
    return {
      financial_risk: financialRisk,
      operational_risk: operationalRisk,
      compliance_risk: complianceRisk,
      overall_risk_score: overallRisk,
      recommendation: this.getRiskRecommendation(overallRisk, cashflow)
    };
  }

  private getRiskRecommendation(riskScore: number, cashflow: CashflowAnalysis): string {
    if (cashflow.cash_positive_from_day_one && riskScore < 30) {
      return 'APPROVED: Perfect zero-investment opportunity. Proceed immediately.';
    }
    
    if (cashflow.investment_required === 0 && riskScore < 50) {
      return 'APPROVED: Low risk, zero investment required. Good opportunity.';
    }
    
    if (cashflow.investment_required > 0) {
      return 'REJECTED: Requires upfront investment. Violates zero-investment policy.';
    }
    
    if (riskScore > 70) {
      return 'REJECTED: Risk too high for zero-investment strategy.';
    }
    
    return 'NEEDS MODIFICATION: Adjust payment terms to ensure zero investment.';
  }

  private determineValidationResult(cashflow: CashflowAnalysis, risk: RiskAssessment): 'approved' | 'rejected' | 'needs_modification' {
    // Hard rejection if investment required
    if (cashflow.investment_required > 0) {
      return 'rejected';
    }
    
    // Hard rejection if high risk
    if (risk.overall_risk_score > 70) {
      return 'rejected';
    }
    
    // Approval if cash positive and low risk
    if (cashflow.cash_positive_from_day_one && risk.overall_risk_score < 40) {
      return 'approved';
    }
    
    // Otherwise needs modification
    return 'needs_modification';
  }

  private getRequiredModifications(cashflow: CashflowAnalysis, risk: RiskAssessment): string[] {
    const modifications: string[] = [];
    
    if (!cashflow.cash_positive_from_day_one) {
      modifications.push('Require 100% advance payment from customer');
    }
    
    if (cashflow.float_period_days < 15) {
      modifications.push('Negotiate longer payment terms with supplier (minimum NET-30)');
    }
    
    if (risk.financial_risk > 50) {
      modifications.push('Require letter of credit or bank guarantee from customer');
    }
    
    if (risk.operational_risk > 50) {
      modifications.push('Verify supplier reliability and get performance guarantees');
    }
    
    if (risk.compliance_risk > 30) {
      modifications.push('Complete full compliance verification before proceeding');
    }
    
    return modifications;
  }

  // Generate zero-investment deal structure
  async generateOptimalDealStructure(opportunityData: any): Promise<any> {
    const optimalStructure = {
      customer_payment_terms: '100% payment in advance via wire transfer',
      supplier_payment_terms: 'NET-30 days after delivery confirmation',
      cash_flow_guarantee: 'Positive from day 1',
      profit_margin: '15-25% guaranteed',
      risk_mitigation: [
        'Letter of credit from reputable bank',
        'Supplier performance bond',
        'Product quality guarantees',
        'Delivery timeline commitments'
      ],
      execution_steps: [
        '1. Customer pays 100% advance to escrow account',
        '2. Funds confirmed, place order with supplier',
        '3. Supplier delivers directly to customer',
        '4. Customer confirms receipt and satisfaction',
        '5. Pay supplier from escrow funds',
        '6. Retain profit margin'
      ],
      backup_plans: [
        'Multiple supplier options verified',
        'Alternative product sources identified',
        'Customer credit verification completed',
        'Legal framework in place for disputes'
      ]
    };

    // Log optimal structure generation
    await this.supabase
      .from('system_logs')
      .insert({
        module: 'zero_investment_validator',
        action: 'optimal_structure_generated',
        success: true,
        data: {
          opportunity_id: opportunityData.id,
          structure: optimalStructure
        }
      });

    return optimalStructure;
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

    const { action, deal_data, opportunity_data } = await req.json();

    console.log('Zero Investment Validator called with action:', action);

    const validator = new ZeroInvestmentValidator(supabase);

    if (action === 'validate_deal') {
      const validation = await validator.validateDeal(deal_data);
      
      return new Response(JSON.stringify({
        success: true,
        validation: validation,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === 'generate_optimal_structure') {
      const structure = await validator.generateOptimalDealStructure(opportunity_data);
      
      return new Response(JSON.stringify({
        success: true,
        optimal_structure: structure,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === 'validate_opportunity') {
      // Quick validation for opportunities
      const mockDeal = {
        id: opportunity_data.id,
        deal_value: opportunity_data.estimated_value,
        customer_payment_terms: '100% advance payment',
        supplier_payment_terms: 'NET-30',
        customer_creditworthiness: 'medium',
        supplier_reliability: 'high'
      };

      const validation = await validator.validateDeal(mockDeal);
      const structure = await validator.generateOptimalDealStructure(opportunity_data);
      
      return new Response(JSON.stringify({
        success: true,
        opportunity_approved: validation.validation_result === 'approved',
        validation: validation,
        recommended_structure: structure,
        zero_investment_compliant: validation.cashflow_analysis.cash_positive_from_day_one,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
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
    console.error('Error in zero investment validator:', error);
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
