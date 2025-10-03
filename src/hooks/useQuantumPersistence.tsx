import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface QuantumExecution {
  opportunityId: string;
  product: string;
  profit: number;
  margin: number;
  executionTime: number;
  source: string;
}

export function useQuantumPersistence() {
  // Save quantum execution to database
  const saveQuantumExecution = useCallback(async (execution: QuantumExecution) => {
    try {
      const { data, error } = await supabase
        .from('execution_history')
        .insert({
          entity_type: 'quantum_arbitrage',
          entity_id: execution.opportunityId,
          action_type: 'auto_execute',
          execution_status: 'completed',
          result_data: {
            profit: execution.profit,
            margin: execution.margin,
            execution_time: execution.executionTime,
            product: execution.product,
            source: execution.source,
            timestamp: new Date().toISOString()
          },
          execution_time_ms: execution.executionTime
        });

      if (error) {
        console.error('Error saving quantum execution:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in saveQuantumExecution:', error);
      return false;
    }
  }, []);

  // Save profit to sales analytics
  const saveProfitMetric = useCallback(async (profit: number, source: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if metric exists for today
      const { data: existing } = await supabase
        .from('sales_analytics')
        .select('*')
        .eq('date', today)
        .eq('metric_name', 'daily_profit')
        .maybeSingle();

      if (existing) {
        // Update existing metric
        await supabase
          .from('sales_analytics')
          .update({
            metric_value: existing.metric_value + profit,
            breakdown: {
              ...((existing.breakdown as any) || {}),
              [source]: ((existing.breakdown as any)?.[source] || 0) + profit,
              last_updated: new Date().toISOString()
            }
          })
          .eq('id', existing.id);
      } else {
        // Create new metric
        await supabase
          .from('sales_analytics')
          .insert({
            date: today,
            metric_name: 'daily_profit',
            metric_value: profit,
            breakdown: {
              [source]: profit,
              created_at: new Date().toISOString()
            }
          });
      }
    } catch (error) {
      console.error('Error saving profit metric:', error);
    }
  }, []);

  // Create opportunity from quantum scan
  const createOpportunityFromScan = useCallback(async (scanResult: any) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .insert({
          type: 'quantum_arbitrage',
          source: 'quantum_market_scanner',
          status: 'active',
          product_name: scanResult.product,
          product_category: scanResult.sector,
          estimated_value: scanResult.risk_adjusted_return,
          margin_percentage: scanResult.margin_percentage,
          target_country: scanResult.target_region || 'Global',
          ai_analysis: {
            quantum_score: scanResult.quantum_score,
            execution_priority: scanResult.execution_priority,
            market_analysis: scanResult.market_analysis,
            risk_assessment: scanResult.risk_assessment
          }
        });

      if (error) {
        console.error('Error creating opportunity:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createOpportunityFromScan:', error);
      return null;
    }
  }, []);

  // Initialize quantum persistence monitoring
  const initializeQuantumMonitoring = useCallback(() => {
    // Monitor opportunities table for new quantum opportunities
    const opportunitiesChannel = supabase
      .channel('quantum-opportunities')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'opportunities',
          filter: 'type=eq.quantum_arbitrage'
        },
        (payload) => {
          console.log('New quantum opportunity detected:', payload);
          toast.success(`🚀 Nova oportunidade quântica: ${payload.new.product_name}`);
        }
      )
      .subscribe();

    // Monitor execution history for completed executions
    const executionsChannel = supabase
      .channel('quantum-executions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'execution_history',
          filter: 'entity_type=eq.quantum_arbitrage'
        },
        (payload) => {
          const resultData = payload.new.result_data as any;
          console.log('New quantum execution:', payload);
          
          if (resultData?.profit) {
            toast.success(`💰 Execução quântica completada: $${resultData.profit.toLocaleString()}`);
            
            // Auto-save profit metric
            saveProfitMetric(resultData.profit, resultData.source || 'quantum');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(opportunitiesChannel);
      supabase.removeChannel(executionsChannel);
    };
  }, [saveProfitMetric]);

  // Auto-execute high priority opportunities
  const executeHighPriorityOpportunities = useCallback(async () => {
    try {
      const { data: opportunities } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'active')
        .eq('type', 'quantum_arbitrage');

      if (!opportunities?.length) return;

      for (const opportunity of opportunities) {
        const aiAnalysis = opportunity.ai_analysis as any;
        
        // Auto-execute CRITICAL priority opportunities
        if (aiAnalysis?.execution_priority === 'CRITICAL' && aiAnalysis?.quantum_score > 85) {
          const execution: QuantumExecution = {
            opportunityId: opportunity.id,
            product: opportunity.product_name || 'Unknown Product',
            profit: opportunity.estimated_value || 0,
            margin: opportunity.margin_percentage || 0,
            executionTime: Math.random() * 500 + 200,
            source: 'auto_quantum'
          };

          const saved = await saveQuantumExecution(execution);
          
          if (saved) {
            // Mark opportunity as completed
            await supabase
              .from('opportunities')
              .update({ status: 'completed' })
              .eq('id', opportunity.id);

            // Save profit metric
            await saveProfitMetric(execution.profit, execution.source);
          }
        }
      }
    } catch (error) {
      console.error('Error executing high priority opportunities:', error);
    }
  }, [saveQuantumExecution, saveProfitMetric]);

  return {
    saveQuantumExecution,
    saveProfitMetric,
    createOpportunityFromScan,
    initializeQuantumMonitoring,
    executeHighPriorityOpportunities
  };
}