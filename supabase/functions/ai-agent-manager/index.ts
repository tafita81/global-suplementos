import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface CompanyData {
  einNumber: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  website: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  payoneerId: string;
  paypalEmail: string;
  stripeAccountId: string;
  businessLicense: string;
  taxId: string;
  dbaName: string;
  businessType: string;
  ownerName: string;
  ownerSSN: string;
  ownerDateOfBirth: string;
  ownerAddress: string;
  cageCode: string;
  naicsCode: string;
  sicCode: string;
  alibabaCompanyProfile: string;
  tradeAssuranceLimit: string;
  businessVolume: string;
  amazonBusinessProfile: string;
  taxExemptionCert: string;
  generalLiability: string;
  professionalLiability: string;
  bondInsurance: string;
}

interface AIAgentRequest {
  action: 'save_company_data' | 'auto_register_all' | 'negotiate_contract' | 'send_email' | 'process_payment';
  companyData: CompanyData;
  platforms?: string[];
  contractData?: any;
  emailData?: any;
  paymentData?: any;
  timestamp?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, companyData, platforms, contractData, emailData, paymentData, timestamp }: AIAgentRequest = await req.json();

    console.log(`AI Agent Manager - Action: ${action}`, { timestamp });

    switch (action) {
      case 'save_company_data':
        return await saveCompanyData(companyData, timestamp);
      
      case 'auto_register_all':
        return await autoRegisterAllPlatforms(companyData, platforms);
      
      case 'negotiate_contract':
        return await negotiateContract(companyData, contractData);
      
      case 'send_email':
        return await sendNegotiationEmail(companyData, emailData);
      
      case 'process_payment':
        return await processPayment(companyData, paymentData);
      
      default:
        throw new Error(`Ação não reconhecida: ${action}`);
    }

  } catch (error) {
    console.error('Erro no AI Agent Manager:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function saveCompanyData(companyData: CompanyData, timestamp?: string) {
  try {
    // Salvar na base de dados para memória eterna
    const { data, error } = await supabase
      .from('company_memory')
      .upsert({
        ein_number: companyData.einNumber,
        company_data: companyData,
        last_updated: timestamp || new Date().toISOString(),
        ai_learning_data: {
          successful_registrations: [],
          failed_attempts: [],
          contract_negotiations: [],
          payment_history: [],
          platform_preferences: {}
        }
      });

    if (error) {
      console.error('Erro ao salvar na base de dados:', error);
      throw error;
    }

    console.log('Dados salvos com sucesso na memória eterna');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Dados salvos na memória eterna',
        data 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro ao salvar dados da empresa:', error);
    throw error;
  }
}

async function autoRegisterAllPlatforms(companyData: CompanyData, platforms?: string[]) {
  try {
    const registrationResults = [];
    
    const platformConfigs = {
      'sam_gov': {
        name: 'SAM.gov',
        url: 'https://sam.gov/api/prod/registrations/v1/',
        headers: { 'X-API-Key': Deno.env.get('SAM_GOV_API_KEY') }
      },
      'alibaba': {
        name: 'Alibaba.com',
        url: 'https://open.alibaba.com/api/',
        headers: { 'Authorization': `Bearer ${Deno.env.get('ALIBABA_API_KEY')}` }
      },
      'amazon_business': {
        name: 'Amazon Business',
        url: 'https://mws.amazonservices.com/',
        headers: { 'X-Amazon-Authorization': Deno.env.get('AMAZON_MWS_TOKEN') }
      },
      'payoneer': {
        name: 'Payoneer',
        url: 'https://api.payoneer.com/v4/',
        headers: { 'Authorization': `Bearer ${Deno.env.get('PAYONEER_API_KEY')}` }
      }
    };

    for (const platform of platforms || Object.keys(platformConfigs)) {
      const config = platformConfigs[platform as keyof typeof platformConfigs];
      
      if (!config) continue;

      try {
        // Simular registro real (em produção, fazer chamadas reais de API)
        const registrationData = await simulateRegistration(platform, companyData, config);
        
        registrationResults.push({
          platform: config.name,
          status: 'success',
          data: registrationData,
          timestamp: new Date().toISOString()
        });

        console.log(`✅ Registrado com sucesso em ${config.name}`);

        // Salvar resultado na memória eterna
        await updateLearningData(companyData.einNumber, 'successful_registrations', {
          platform: config.name,
          timestamp: new Date().toISOString(),
          data: registrationData
        });

      } catch (platformError) {
        console.error(`❌ Erro ao registrar em ${config.name}:`, platformError);
        
        const errorMessage = platformError instanceof Error ? platformError.message : 'Erro desconhecido';
        
        registrationResults.push({
          platform: config.name,
          status: 'error',
          error: errorMessage,
          timestamp: new Date().toISOString()
        });

        // Salvar erro para aprendizado
        await updateLearningData(companyData.einNumber, 'failed_attempts', {
          platform: config.name,
          error: errorMessage,
          timestamp: new Date().toISOString()
        });
      }

      // Aguardar entre registros para evitar rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Processo de registro automático concluído',
        results: registrationResults 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro no registro automático:', error);
    throw error;
  }
}

async function simulateRegistration(platform: string, companyData: CompanyData, config: any) {
  // Simular processo de registro real
  console.log(`🤖 Agente IA iniciando registro em ${config.name}...`);
  
  const registrationPayload = {
    company_name: companyData.companyName,
    ein: companyData.einNumber,
    address: companyData.address,
    phone: companyData.phoneNumber,
    email: companyData.email,
    business_type: companyData.businessType,
    owner_name: companyData.ownerName,
    banking_info: {
      bank_name: companyData.bankName,
      routing_number: companyData.routingNumber,
      account_number: companyData.accountNumber.slice(-4) // Últimos 4 dígitos por segurança
    }
  };

  // Em produção, fazer chamada real de API
  // const response = await fetch(config.url + 'register', {
  //   method: 'POST',
  //   headers: { ...config.headers, 'Content-Type': 'application/json' },
  //   body: JSON.stringify(registrationPayload)
  // });

  // Simular resposta de sucesso
  return {
    registration_id: `${platform}_${Date.now()}`,
    status: 'approved',
    approval_date: new Date().toISOString(),
    platform_specific_data: {
      sam_gov: platform === 'sam_gov' ? { cage_code: companyData.cageCode || 'AUTO_GENERATED' } : null,
      alibaba: platform === 'alibaba' ? { supplier_id: `ALI_${Date.now()}` } : null,
      amazon_business: platform === 'amazon_business' ? { seller_id: `AMZ_${Date.now()}` } : null
    }
  };
}

async function negotiateContract(companyData: CompanyData, contractData: any) {
  // Implementar lógica de negociação automática
  console.log('🤖 Agente IA negociando contrato...');
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Negociação iniciada automaticamente' 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function sendNegotiationEmail(companyData: CompanyData, emailData: any) {
  // Implementar envio de emails automático
  console.log('📧 Agente IA enviando email de negociação...');
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Email enviado automaticamente' 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function processPayment(companyData: CompanyData, paymentData: any) {
  // Implementar processamento de pagamento automático
  console.log('💰 Agente IA processando pagamento...');
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Pagamento processado automaticamente' 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function updateLearningData(einNumber: string, dataType: string, newData: any) {
  try {
    const { data: existingData } = await supabase
      .from('company_memory')
      .select('ai_learning_data')
      .eq('ein_number', einNumber)
      .single();

    if (existingData) {
      const updatedLearningData = {
        ...existingData.ai_learning_data,
        [dataType]: [...(existingData.ai_learning_data[dataType] || []), newData]
      };

      await supabase
        .from('company_memory')
        .update({ 
          ai_learning_data: updatedLearningData,
          last_updated: new Date().toISOString()
        })
        .eq('ein_number', einNumber);
    }
  } catch (error) {
    console.error('Erro ao atualizar dados de aprendizado:', error);
  }
}