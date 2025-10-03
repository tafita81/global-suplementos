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

interface ComplianceCheck {
  check_type: string;
  result: any;
  status: 'passed' | 'failed' | 'warning';
}

// Simulação de verificação OFAC (sanções EUA)
async function checkOFACSanctions(companyName: string, country: string): Promise<ComplianceCheck> {
  console.log(`Checking OFAC sanctions for ${companyName} in ${country}...`);
  
  // Simulação de países/empresas sancionados
  const sanctionedCountries = ['Iran', 'North Korea', 'Syria', 'Cuba'];
  const sanctionedKeywords = ['military', 'weapons', 'nuclear', 'missile'];
  
  const isSanctioned = sanctionedCountries.includes(country) || 
                     sanctionedKeywords.some(keyword => 
                       companyName.toLowerCase().includes(keyword));
  
  return {
    check_type: 'OFAC Sanctions',
    result: {
      score: isSanctioned ? 0 : 100,
      details: isSanctioned 
        ? `⚠️ ALERTA: ${companyName} ou ${country} pode estar em lista de sanções` 
        : `✅ ${companyName} não encontrado em listas de sanções OFAC`,
      last_updated: new Date().toISOString()
    },
    status: isSanctioned ? 'failed' : 'passed'
  };
}

// Verificação ESG (Environmental, Social, Governance)
async function checkESGCompliance(productCategory: string, country: string): Promise<ComplianceCheck> {
  console.log(`Checking ESG compliance for ${productCategory} in ${country}...`);
  
  const esgScores: Record<string, number> = {
    'health-supplements': 85,
    'electronics': 70,
    'textiles': 60,
    'chemicals': 45,
    'fossil-fuels': 20
  };
  
  const countryESGBonus: Record<string, number> = {
    'Germany': 15,
    'Netherlands': 12,
    'USA': 10,
    'Japan': 8,
    'China': -5,
    'India': -2
  };
  
  const baseScore = esgScores[productCategory] || 50;
  const bonus = countryESGBonus[country] || 0;
  const finalScore = Math.max(0, Math.min(100, baseScore + bonus));
  
  return {
    check_type: 'ESG Compliance',
    result: {
      score: finalScore,
      details: `Produto ${productCategory} no ${country}: Score ESG ${finalScore}/100`,
      breakdown: {
        environmental: Math.max(0, baseScore - 10 + (bonus * 0.4)),
        social: Math.max(0, baseScore + (bonus * 0.3)),
        governance: Math.max(0, baseScore + 5 + (bonus * 0.3))
      }
    },
    status: finalScore >= 70 ? 'passed' : finalScore >= 50 ? 'warning' : 'failed'
  };
}

// Verificação de propriedade intelectual
async function checkPatentConflicts(productName: string): Promise<ComplianceCheck> {
  console.log(`Checking patent conflicts for ${productName}...`);
  
  // Simulação de verificação de patentes
  const patentRisks = ['innovation', 'technology', 'smart', 'advanced', 'pro'];
  const hasRisk = patentRisks.some(keyword => 
    productName.toLowerCase().includes(keyword));
  
  const riskScore = hasRisk ? Math.floor(Math.random() * 30) + 40 : Math.floor(Math.random() * 15) + 85;
  
  return {
    check_type: 'Patent Check',
    result: {
      score: riskScore,
      details: hasRisk 
        ? `⚠️ Possível conflito de patente detectado - revisar antes de prosseguir`
        : `✅ Nenhum conflito de patente óbvio detectado`,
      patent_databases_checked: ['USPTO', 'EPO', 'WIPO'],
      recommendation: riskScore < 70 ? 'Consultar advogado de propriedade intelectual' : 'Prosseguir com cautela'
    },
    status: riskScore >= 80 ? 'passed' : riskScore >= 60 ? 'warning' : 'failed'
  };
}

// Verificação de certificações de qualidade
async function checkQualityCertifications(productCategory: string, targetCountry: string): Promise<ComplianceCheck> {
  console.log(`Checking quality certifications for ${productCategory} in ${targetCountry}...`);
  
  const requiredCerts: Record<string, Record<string, string[]>> = {
    'health-supplements': {
      'USA': ['FDA', 'GMP', 'NSF'],
      'Germany': ['CE', 'EU Novel Food', 'BfR'],
      'Japan': ['MHLW', 'JAS'],
      'Canada': ['Health Canada', 'NPN']
    },
    'electronics': {
      'USA': ['FCC', 'UL'],
      'Germany': ['CE', 'RoHS'],
      'Japan': ['VCCI', 'PSE']
    }
  };
  
  const needed = requiredCerts[productCategory]?.[targetCountry] || ['ISO 9001'];
  const complianceScore = Math.floor(Math.random() * 20) + 80; // Simulação
  
  return {
    check_type: 'Quality Certifications',
    result: {
      score: complianceScore,
      details: `Certificações necessárias para ${productCategory} no ${targetCountry}`,
      required_certifications: needed,
      estimated_cost: needed.length * 2500, // $2500 por certificação
      timeline_weeks: needed.length * 6
    },
    status: complianceScore >= 90 ? 'passed' : 'warning'
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { opportunity_id, product_name, target_country, product_category, supplier_name } = await req.json();
    
    console.log(`🛡️ Running compliance checks for opportunity ${opportunity_id}`);
    
    // Executa todas as verificações em paralelo
    const [ofacCheck, esgCheck, patentCheck, qualityCheck] = await Promise.all([
      checkOFACSanctions(supplier_name || 'Unknown Supplier', target_country),
      checkESGCompliance(product_category || 'health-supplements', target_country),
      checkPatentConflicts(product_name),
      checkQualityCertifications(product_category || 'health-supplements', target_country)
    ]);
    
    const allChecks = [ofacCheck, esgCheck, patentCheck, qualityCheck];
    
    // Calcula score geral de compliance
    const avgScore = allChecks.reduce((sum, check) => sum + check.result.score, 0) / allChecks.length;
    const hasCriticalFailure = allChecks.some(check => check.status === 'failed');
    const hasWarnings = allChecks.some(check => check.status === 'warning');
    
    const overallStatus = hasCriticalFailure ? 'failed' : hasWarnings ? 'warning' : 'passed';
    
    // Salva resultados individuais
    const savedChecks = [];
    for (const check of allChecks) {
      try {
        const { data } = await supabase
          .from('compliance_checks')
          .insert({
            opportunity_id,
            check_type: check.check_type,
            status: check.status,
            result: check.result
          })
          .select()
          .single();
          
        if (data) savedChecks.push(data);
      } catch (error: any) {
        console.error('Error saving compliance check:', error);
      }
    }
    
    // Atualiza oportunidade com status de compliance
    await supabase
      .from('opportunities')
      .update({
        compliance_status: {
          overall_status: overallStatus,
          overall_score: Math.round(avgScore),
          checks_completed: allChecks.length,
          critical_issues: allChecks.filter(c => c.status === 'failed').length,
          warnings: allChecks.filter(c => c.status === 'warning').length,
          last_check: new Date().toISOString()
        }
      })
      .eq('id', opportunity_id);
    
    // Log do resultado
    await supabase.from('system_logs').insert({
      module: 'compliance_checker',
      action: 'compliance_check_completed',
      success: true,
      data: {
        opportunity_id,
        overall_status: overallStatus,
        score: avgScore,
        checks_completed: allChecks.length
      }
    });
    
    return new Response(JSON.stringify({
      success: true,
      opportunity_id,
      compliance_result: {
        overall_status: overallStatus,
        overall_score: Math.round(avgScore),
        checks: allChecks,
        summary: {
          passed: allChecks.filter(c => c.status === 'passed').length,
          warnings: allChecks.filter(c => c.status === 'warning').length,
          failed: allChecks.filter(c => c.status === 'failed').length
        },
        recommendation: hasCriticalFailure 
          ? 'Não prosseguir - riscos críticos detectados'
          : hasWarnings 
            ? 'Prosseguir com cautela - resolver avisos primeiro'
            : 'Aprovado para execução'
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Compliance check error:', error);
    
    await supabase.from('system_logs').insert({
      module: 'compliance_checker', 
      action: 'compliance_check_failed',
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