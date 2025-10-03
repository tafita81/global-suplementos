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

interface ExecutionPlan {
  opportunity_id: string;
  execution_steps: ExecutionStep[];
  total_timeline_days: number;
  success_probability: number;
}

interface ExecutionStep {
  step_number: number;
  action: string;
  description: string;
  estimated_days: number;
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

async function createExecutionPlan(opportunity: any): Promise<ExecutionPlan> {
  const steps: ExecutionStep[] = [];
  let totalDays = 0;
  
  // Step 1: Supplier Contact & Negotiation
  steps.push({
    step_number: 1,
    action: 'supplier_negotiation',
    description: 'Contact supplier and negotiate terms, pricing, and minimum order quantities',
    estimated_days: 3,
    dependencies: [],
    status: 'pending'
  });
  totalDays += 3;
  
  // Step 2: Quality Samples
  steps.push({
    step_number: 2,
    action: 'quality_samples',
    description: 'Request and evaluate product samples for quality assurance',
    estimated_days: 7,
    dependencies: ['supplier_negotiation'],
    status: 'pending'
  });
  totalDays += 7;
  
  // Step 3: Compliance Documentation
  if (opportunity.compliance_status?.critical_issues > 0) {
    steps.push({
      step_number: 3,
      action: 'compliance_resolution',
      description: 'Resolve compliance issues and obtain required certifications',
      estimated_days: 14,
      dependencies: ['quality_samples'],
      status: 'pending'
    });
    totalDays += 14;
  }
  
  // Step 4: Market Research Validation
  steps.push({
    step_number: 4,
    action: 'market_validation',
    description: 'Validate target market demand through surveys and competitive analysis',
    estimated_days: 5,
    dependencies: ['quality_samples'],
    status: 'pending'
  });
  totalDays += 5;
  
  // Step 5: Logistics Setup
  steps.push({
    step_number: 5,
    action: 'logistics_setup',
    description: 'Finalize shipping arrangements, insurance, and customs documentation',
    estimated_days: 4,
    dependencies: ['compliance_resolution', 'market_validation'],
    status: 'pending'
  });
  totalDays += 4;
  
  // Step 6: Initial Order Placement
  steps.push({
    step_number: 6,
    action: 'order_placement',
    description: 'Place initial order with supplier including payment and delivery terms',
    estimated_days: 2,
    dependencies: ['logistics_setup'],
    status: 'pending'
  });
  totalDays += 2;
  
  // Step 7: Marketing & Sales Channel Setup
  if (opportunity.type === 'B2C') {
    steps.push({
      step_number: 7,
      action: 'sales_channel_setup',
      description: 'Set up e-commerce listings, marketing materials, and sales funnels',
      estimated_days: 6,
      dependencies: ['order_placement'],
      status: 'pending'
    });
    totalDays += 6;
  } else {
    steps.push({
      step_number: 7,
      action: 'b2b_channel_setup',
      description: 'Contact B2B buyers, distributors, and establish wholesale agreements',
      estimated_days: 10,
      dependencies: ['order_placement'],
      status: 'pending'
    });
    totalDays += 10;
  }
  
  // Calculate success probability based on opportunity data
  const riskScore = opportunity.risk_score || 50;
  const complianceScore = opportunity.compliance_status?.overall_score || 50;
  const marginScore = opportunity.margin_percentage || 0;
  
  const successProbability = Math.round(
    (((100 - riskScore) * 0.3) + (complianceScore * 0.4) + (Math.min(marginScore, 50) * 0.3))
  );
  
  return {
    opportunity_id: opportunity.id,
    execution_steps: steps,
    total_timeline_days: totalDays,
    success_probability: successProbability
  };
}

async function simulateStepExecution(step: ExecutionStep, opportunityId: string): Promise<boolean> {
  console.log(`Executing step: ${step.action} for opportunity ${opportunityId}`);
  
  // Simulação de execução baseada no tipo de ação
  const successRates: Record<string, number> = {
    'supplier_negotiation': 0.90,
    'quality_samples': 0.85,
    'compliance_resolution': 0.75,
    'market_validation': 0.88,
    'logistics_setup': 0.92,
    'order_placement': 0.95,
    'sales_channel_setup': 0.80,
    'b2b_channel_setup': 0.70
  };
  
  const successRate = successRates[step.action] || 0.80;
  const randomValue = Math.random();
  
  // Simula tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return randomValue <= successRate;
}

async function executeOpportunity(opportunityId: string): Promise<any> {
  console.log(`🚀 Starting auto-execution for opportunity ${opportunityId}`);
  
  // Buscar dados da oportunidade
  const { data: opportunity, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', opportunityId)
    .single();
    
  if (error || !opportunity) {
    throw new Error(`Opportunity ${opportunityId} not found`);
  }
  
  // Verificar se a oportunidade está aprovada para execução
  if (opportunity.status !== 'approved') {
    throw new Error(`Opportunity ${opportunityId} is not approved for execution`);
  }
  
  // Criar plano de execução
  const executionPlan = await createExecutionPlan(opportunity);
  
  // Atualizar status da oportunidade
  await supabase
    .from('opportunities')
    .update({ 
      status: 'executing',
      execution_data: {
        ...opportunity.execution_data,
        execution_plan: executionPlan,
        started_at: new Date().toISOString()
      }
    })
    .eq('id', opportunityId);
  
  const executionResults = [];
  let currentStep = 0;
  
  // Executar cada step sequencialmente
  for (const step of executionPlan.execution_steps) {
    currentStep++;
    
    try {
      // Marcar step como em progresso
      step.status = 'in_progress';
      
      await supabase
        .from('opportunities')
        .update({
          execution_data: {
            ...opportunity.execution_data,
            execution_plan: executionPlan,
            current_step: currentStep,
            last_updated: new Date().toISOString()
          }
        })
        .eq('id', opportunityId);
      
      // Simular execução do step
      const stepSuccess = await simulateStepExecution(step, opportunityId);
      
      if (stepSuccess) {
        step.status = 'completed';
        executionResults.push({
          step: currentStep,
          action: step.action,
          status: 'success',
          completed_at: new Date().toISOString()
        });
        
        console.log(`✅ Step ${currentStep} completed: ${step.action}`);
      } else {
        step.status = 'failed';
        executionResults.push({
          step: currentStep,
          action: step.action,
          status: 'failed',
          failed_at: new Date().toISOString(),
          reason: 'Execution failure in simulation'
        });
        
        console.log(`❌ Step ${currentStep} failed: ${step.action}`);
        
        // Se um step crítico falha, parar execução
        if (['supplier_negotiation', 'order_placement'].includes(step.action)) {
          throw new Error(`Critical step failed: ${step.action}`);
        }
      }
      
    } catch (error) {
      console.error(`Error in step ${currentStep}:`, error);
      step.status = 'failed';
      executionResults.push({
        step: currentStep,
        action: step.action,
        status: 'error',
        error: (error as Error).message,
        failed_at: new Date().toISOString()
      });
      break;
    }
  }
  
  // Determinar resultado final
  const completedSteps = executionResults.filter(r => r.status === 'success').length;
  const totalSteps = executionPlan.execution_steps.length;
  const successRate = completedSteps / totalSteps;
  
  let finalStatus;
  if (successRate >= 0.8) {
    finalStatus = 'completed';
  } else if (successRate >= 0.5) {
    finalStatus = 'partial_success';
  } else {
    finalStatus = 'failed';
  }
  
  // Atualizar oportunidade com resultado final
  await supabase
    .from('opportunities')
    .update({
      status: finalStatus,
      execution_data: {
        ...opportunity.execution_data,
        execution_plan: executionPlan,
        execution_results: executionResults,
        final_status: finalStatus,
        success_rate: successRate,
        completed_at: new Date().toISOString()
      }
    })
    .eq('id', opportunityId);
  
  return {
    opportunity_id: opportunityId,
    final_status: finalStatus,
    success_rate: successRate,
    completed_steps: completedSteps,
    total_steps: totalSteps,
    execution_results: executionResults
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { opportunity_id, auto_execute } = await req.json();
    
    if (auto_execute) {
      // Execução automática completa
      const result = await executeOpportunity(opportunity_id);
      
      // Log do resultado
      await supabase.from('system_logs').insert({
        module: 'auto_executor',
        action: 'auto_execution_completed',
        success: result.final_status !== 'failed',
        data: {
          opportunity_id,
          final_status: result.final_status,
          success_rate: result.success_rate
        }
      });
      
      return new Response(JSON.stringify({
        success: true,
        message: `Auto-execution completed with ${result.final_status} status`,
        result: result
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
      
    } else {
      // Apenas criar plano de execução
      const { data: opportunity } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', opportunity_id)
        .single();
        
      if (!opportunity) {
        throw new Error('Opportunity not found');
      }
      
      const executionPlan = await createExecutionPlan(opportunity);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Execution plan created',
        execution_plan: executionPlan
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    console.error('Auto-executor error:', error);
    
    await supabase.from('system_logs').insert({
      module: 'auto_executor',
      action: 'execution_failed',
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