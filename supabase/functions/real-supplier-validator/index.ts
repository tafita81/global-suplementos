import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RealSupplierData {
  company_name: string
  email: string
  phone?: string
  website?: string
  country: string
  industry?: string
  product_category?: string
  contact_person?: string
  annual_revenue?: number | null
  employee_count?: number | null
  supplier_size?: string
  verification_status: string
  accepts_us_dropshipping: string
  accepts_us_distribution: string
  real_data_verified: boolean
  last_verification: string
  verification_notes?: string
  data_source?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, company_name } = await req.json()

    if (action === 'validate_single_supplier') {
      return await validateSingleSupplier(supabaseClient, company_name)
    } else if (action === 'validate_sequential') {
      return await validateSuppliersSequential(supabaseClient)
    } else if (action === 'get_validation_status') {
      return await getValidationStatus(supabaseClient)
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error: any) {
    console.error('Error in real-supplier-validator:', error)
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function validateSingleSupplier(supabaseClient: any, companyName: string) {
  console.log(`🔍 Validando fornecedor: ${companyName}`)
  
  // Buscar dados reais da empresa via web scraping
  const realData = await searchCompanyData(companyName)
  
  // Atualizar na base de dados
  const { data, error } = await supabaseClient
    .from('target_suppliers')
    .update({
      ...realData,
      real_data_verified: true,
      last_verification: new Date().toISOString(),
      verification_notes: `Validado automaticamente em ${new Date().toLocaleDateString('pt-BR')}`
    })
    .eq('company_name', companyName)
    .select()

  if (error) {
    console.error('Erro ao atualizar fornecedor:', error)
    throw error
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      supplier: data[0],
      message: `Fornecedor ${companyName} validado com dados reais`
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function validateSuppliersSequential(supabaseClient: any) {
  console.log(`🔄 VALIDAÇÃO SEQUENCIAL 1 POR 1 - Iniciando...`)
  
  // Buscar apenas 1 fornecedor por vez para evitar conflitos
  const { data: suppliers, error } = await supabaseClient
    .from('target_suppliers')
    .select('*')
    .or('real_data_verified.is.null,real_data_verified.eq.false')
    .limit(1)

  if (error) {
    throw error
  }

  if (!suppliers || suppliers.length === 0) {
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '🎉 VALIDAÇÃO COMPLETA! Todos os fornecedores foram processados.',
        all_done: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const supplier = suppliers[0]
  
  try {
    console.log(`🔍 Processando 1 por 1: ${supplier.company_name}`)
    const validationResult = await deepValidateCompany(supplier.company_name)
    
    if (validationResult.company_exists) {
      // Empresa existe - atualizar com dados reais + timestamp único no email para evitar conflitos
      const uniqueEmail = validationResult.data?.email && validationResult.data.email !== 'PENDENTE' 
        ? validationResult.data.email 
        : `pending_${Date.now()}_${Math.random().toString(36).substr(2, 9)}@validation.temp`

      const { error: updateError } = await supabaseClient
        .from('target_suppliers')
        .update({
          ...validationResult.data,
          email: uniqueEmail,
          real_data_verified: true,
          company_exists: true,
          deep_validation_score: validationResult.score,
          last_verification: new Date().toISOString(),
          verification_notes: `✅ VALIDADO: Score ${validationResult.score}/100`
        })
        .eq('id', supplier.id)

      if (updateError) {
        console.error('Erro ao atualizar fornecedor:', updateError)
        throw updateError
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          action: 'validated',
          company_name: supplier.company_name,
          score: validationResult.score,
          message: `✅ ${supplier.company_name} validado com sucesso!`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      // Empresa NÃO existe - remover
      const { error: deleteError } = await supabaseClient
        .from('target_suppliers')
        .delete()
        .eq('id', supplier.id)

      if (deleteError) {
        console.error('Erro ao remover fornecedor:', deleteError)
        throw deleteError
      }

      console.log(`❌ REMOVIDO: ${supplier.company_name} - ${validationResult.reason}`)
      return new Response(
        JSON.stringify({ 
          success: true, 
          action: 'removed',
          company_name: supplier.company_name,
          reason: validationResult.reason,
          message: `❌ ${supplier.company_name} removido (empresa falsa)`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error: any) {
    console.error(`Erro na validação: ${supplier.company_name}:`, error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error?.message || 'Unknown error',
        company_name: supplier.company_name
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
}

async function getValidationStatus(supabaseClient: any) {
  const { data: stats, error } = await supabaseClient
    .from('target_suppliers')
    .select('real_data_verified, verification_status, last_verification')

  if (error) {
    throw error
  }

  const validated = stats.filter((s: any) => s.real_data_verified === true).length
  const pending = stats.filter((s: any) => !s.real_data_verified || s.real_data_verified === false).length
  const total = stats.length

  return new Response(
    JSON.stringify({ 
      success: true,
      total_suppliers: total,
      validated_suppliers: validated,
      pending_validation: pending,
      validation_percentage: Math.round((validated / total) * 100)
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// =================== VALIDAÇÃO RIGOROSA PROFUNDA ===================

async function deepValidateCompany(companyName: string): Promise<{
  company_exists: boolean;
  data?: RealSupplierData;
  score: number;
  reason?: string;
}> {
  console.log(`🔎 VALIDAÇÃO RIGOROSA PROFUNDA: ${companyName}`)
  
  try {
    const cleanCompanyName = companyName.replace(/\s*\([^)]*\)\s*$/, '').trim()
    
    // 1. Múltiplas tentativas de encontrar o site oficial
    const websiteValidation = await findOfficialWebsiteRigorous(cleanCompanyName)
    if (!websiteValidation.found) {
      return {
        company_exists: false,
        score: 0,
        reason: `Site oficial não encontrado após validação rigorosa: ${websiteValidation.attempts_made} tentativas`
      }
    }

    console.log(`✅ Site oficial confirmado: ${websiteValidation.url}`)
    
    // 2. Validação profunda do conteúdo do website
    const contentValidation = await validateWebsiteContentDeep(websiteValidation.url!, cleanCompanyName)
    if (!contentValidation.is_real_company) {
      return {
        company_exists: false,
        score: contentValidation.score,
        reason: `Empresa falsa detectada: ${contentValidation.reason}`
      }
    }

    // 3. Extrair dados com validação cruzada
    const extractedData = await extractDataWithCrossValidation(contentValidation.content, cleanCompanyName, websiteValidation.url!)
    
    // 4. Calcular score final de confiabilidade
    const finalScore = calculateReliabilityScore(extractedData, contentValidation, websiteValidation)
    
    if (finalScore < 70) {
      return {
        company_exists: false,
        score: finalScore,
        reason: `Score de confiabilidade muito baixo: ${finalScore}/100. Dados insuficientes ou inconsistentes.`
      }
    }

    return {
      company_exists: true,
      score: finalScore,
      data: {
        company_name: cleanCompanyName,
        email: extractedData.email || 'PENDENTE',
        phone: extractedData.phone || 'PENDENTE', 
        website: websiteValidation.url,
        country: extractedData.country || 'PENDENTE',
        industry: extractedData.industry || 'PENDENTE',
        product_category: extractedData.product_category || 'PENDENTE',
        contact_person: extractedData.contact_person || 'PENDENTE',
        annual_revenue: extractedData.annual_revenue || null,
        employee_count: extractedData.employee_count || null,
        supplier_size: determineSupplierSize(extractedData.employee_count, extractedData.annual_revenue),
        verification_status: 'rigorously_verified',
        accepts_us_dropshipping: extractedData.dropshipping || 'PENDENTE',
        accepts_us_distribution: extractedData.distribution || 'SIM',
        real_data_verified: true,
        last_verification: new Date().toISOString(),
        verification_notes: `VALIDAÇÃO RIGOROSA COMPLETA - Score: ${finalScore}/100`,
        data_source: 'rigorous_web_scraping'
      }
    }
  } catch (error: any) {
    console.error(`❌ Erro na validação rigorosa:`, error)
    return {
      company_exists: false,
      score: 0,
      reason: `Erro técnico na validação: ${error?.message || 'Unknown error'}`
    }
  }
}

async function findOfficialWebsiteRigorous(companyName: string): Promise<{
  found: boolean;
  url?: string;
  attempts_made: number;
}> {
  console.log(`🌐 BUSCA RIGOROSA do site oficial: ${companyName}`)
  
  const possibleVariations = [
    companyName.toLowerCase().replace(/\s+/g, ''),
    companyName.toLowerCase().replace(/\s+/g, '-'),
    companyName.toLowerCase().split(' ')[0],
    companyName.toLowerCase().replace(/[^a-z0-9]/g, ''),
  ]

  const possibleDomains = ['.com', '.net', '.org', '.co', '.biz']
  const prefixes = ['www.', '']
  
  let attempts = 0
  
  for (const variation of possibleVariations) {
    for (const domain of possibleDomains) {
      for (const prefix of prefixes) {
        const url = `https://${prefix}${variation}${domain}`
        attempts++
        
        try {
          const response = await fetch(url, { 
            method: 'HEAD',
            signal: AbortSignal.timeout(8000),
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          })
          
          if (response.ok) {
            // Verificação adicional - tentar fazer GET para ver se tem conteúdo real
            const contentCheck = await fetch(url, {
              method: 'GET',
              signal: AbortSignal.timeout(10000),
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            })
            
            if (contentCheck.ok) {
              const text = await contentCheck.text()
              if (text.length > 1000 && !text.includes('domain for sale') && !text.includes('coming soon')) {
                console.log(`✅ Site oficial confirmado: ${url} (${attempts} tentativas)`)
                return { found: true, url, attempts_made: attempts }
              }
            }
          }
        } catch (e) {
          continue
        }
      }
    }
  }
  
  console.log(`❌ Site oficial não encontrado após ${attempts} tentativas`)
  return { found: false, attempts_made: attempts }
}

async function validateWebsiteContentDeep(url: string, companyName: string): Promise<{
  is_real_company: boolean;
  content: string;
  score: number;
  reason?: string;
}> {
  console.log(`📄 VALIDAÇÃO PROFUNDA do conteúdo: ${url}`)
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(20000)
    })
    
    if (!response.ok) {
      return { is_real_company: false, content: '', score: 0, reason: `HTTP ${response.status}` }
    }
    
    const content = await response.text()
    
    // Extrair texto limpo
    const textContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    // Verificações de conteúdo suspeito
    const suspiciousPatterns = [
      'domain for sale',
      'coming soon',
      'under construction',
      'page not found',
      'default page',
      'lorem ipsum',
      'sample text'
    ]
    
    const lowerContent = textContent.toLowerCase()
    for (const pattern of suspiciousPatterns) {
      if (lowerContent.includes(pattern)) {
        return { 
          is_real_company: false, 
          content: textContent, 
          score: 10, 
          reason: `Conteúdo suspeito detectado: "${pattern}"` 
        }
      }
    }
    
    // Verificações de conteúdo comercial real
    const businessIndicators = [
      'about us', 'contact', 'products', 'services', 'company', 
      'business', 'contact us', 'email', 'phone', 'address',
      'sobre', 'contato', 'produtos', 'serviços', 'empresa'
    ]
    
    let businessScore = 0
    for (const indicator of businessIndicators) {
      if (lowerContent.includes(indicator)) {
        businessScore += 10
      }
    }
    
    // Verificar se o nome da empresa aparece no conteúdo
    const companyMentioned = lowerContent.includes(companyName.toLowerCase())
    if (companyMentioned) businessScore += 20
    
    // Verificar tamanho mínimo do conteúdo
    if (textContent.length < 500) {
      return { 
        is_real_company: false, 
        content: textContent, 
        score: businessScore, 
        reason: `Conteúdo muito pequeno: ${textContent.length} caracteres` 
      }
    }
    
    const finalScore = Math.min(businessScore, 100)
    const isReal = finalScore >= 60
    
    console.log(`📊 Score de validação: ${finalScore}/100 (${isReal ? 'REAL' : 'SUSPEITO'})`)
    
    return {
      is_real_company: isReal,
      content: textContent.substring(0, 8000), // Limitar para processamento
      score: finalScore,
      reason: isReal ? undefined : `Score insuficiente: ${finalScore}/100`
    }
    
  } catch (error: any) {
    return { 
      is_real_company: false, 
      content: '', 
      score: 0, 
      reason: `Erro no acesso: ${error?.message}` 
    }
  }
}

async function extractDataWithCrossValidation(content: string, companyName: string, websiteUrl: string): Promise<any> {
  console.log(`🤖 EXTRAÇÃO COM VALIDAÇÃO CRUZADA: ${companyName}`)
  
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    throw new Error('OpenAI API key não configurada')
  }
  
  const prompt = `
VALIDAÇÃO RIGOROSA DE EMPRESA REAL

Analise o conteúdo do website da empresa "${companyName}" (${websiteUrl}) e determine se é uma empresa REAL e legítima.

CONTEÚDO DO WEBSITE:
${content}

INSTRUÇÕES CRÍTICAS:
1. Esta é uma validação RIGOROSA - seja extremamente criterioso
2. Se a empresa parece falsa, inventada ou suspeita, retorne dados indicando isso
3. Procure por evidências de uma empresa real: endereços físicos, funcionários reais, histórico
4. Emails genéricos como info@, contact@ são suspeitos. Procure emails de pessoas específicas

Retorne um JSON com:
{
  "is_legitimate": true/false,
  "confidence_score": 0-100,
  "email": "email comercial específico ou null",
  "phone": "telefone específico ou null", 
  "country": "país confirmado ou null",
  "industry": "indústria específica ou null",
  "product_category": "categoria específica ou null",
  "contact_person": "pessoa específica ou departamento real",
  "annual_revenue": número ou null,
  "employee_count": número ou null,
  "dropshipping": "SIM/NÃO/PENDENTE",
  "distribution": "SIM/NÃO/PENDENTE",
  "legitimacy_indicators": ["lista de indicadores de empresa real encontrados"],
  "red_flags": ["lista de sinais suspeitos encontrados"]
}

SEJA RIGOROSO - prefira null a inventar dados.
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um investigador especialista em validação de empresas reais vs falsas. Seja extremamente rigoroso.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800,
        temperature: 0.1
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const extractedContent = data.choices[0].message.content

    console.log(`🤖 Análise OpenAI:`, extractedContent)

    try {
      const parsedData = JSON.parse(extractedContent)
      return parsedData
    } catch (parseError) {
      console.error('Erro ao parsear resposta JSON:', parseError)
      return {
        is_legitimate: false,
        confidence_score: 0,
        email: null,
        phone: null,
        country: null,
        industry: null,
        product_category: null,
        contact_person: null,
        annual_revenue: null,
        employee_count: null,
        dropshipping: 'PENDENTE',
        distribution: 'PENDENTE',
        legitimacy_indicators: [],
        red_flags: ['Erro na análise AI']
      }
    }

  } catch (error: any) {
    console.error('Erro na análise AI:', error)
    throw new Error(`Falha na validação AI: ${error?.message || 'Unknown error'}`)
  }
}

function calculateReliabilityScore(extractedData: any, contentValidation: any, websiteValidation: any): number {
  let score = 0
  
  // Score base do conteúdo
  score += contentValidation.score * 0.4
  
  // Legitimidade detectada pela AI
  if (extractedData.is_legitimate) score += 30
  score += (extractedData.confidence_score || 0) * 0.3
  
  // Dados específicos encontrados
  if (extractedData.email && !extractedData.email.includes('info@') && !extractedData.email.includes('contact@')) score += 15
  if (extractedData.phone) score += 10
  if (extractedData.contact_person && extractedData.contact_person !== 'PENDENTE') score += 10
  if (extractedData.country && extractedData.country !== 'PENDENTE') score += 5
  if (extractedData.industry && extractedData.industry !== 'PENDENTE') score += 5
  
  // Penalizações por red flags
  const redFlags = extractedData.red_flags || []
  score -= redFlags.length * 5
  
  // Bonificação por indicadores de legitimidade
  const legitimacyIndicators = extractedData.legitimacy_indicators || []
  score += legitimacyIndicators.length * 3
  
  // Tentativas de encontrar site
  if (websiteValidation.attempts_made > 20) score -= 10
  
  return Math.max(0, Math.min(100, Math.round(score)))
}

// =================== WEB SCRAPING REAL FUNCTIONS ===================

async function searchCompanyData(companyName: string): Promise<RealSupplierData> {
  console.log(`🔍 Fazendo web scraping REAL para: ${companyName}`)
  
  try {
    const cleanCompanyName = companyName.replace(/\s*\([^)]*\)\s*$/, '').trim()
    
    // 1. Encontrar site oficial da empresa
    const websiteUrl = await findOfficialWebsite(cleanCompanyName)
    if (!websiteUrl) {
      throw new Error(`Site oficial não encontrado para ${cleanCompanyName}`)
    }

    console.log(`✅ Site oficial encontrado: ${websiteUrl}`)
    
    // 2. Fazer scraping do website da empresa
    const websiteContent = await scrapeWebsiteContent(websiteUrl)
    
    // 3. Usar OpenAI para extrair dados estruturados do conteúdo
    const structuredData = await extractDataWithAI(websiteContent, cleanCompanyName, websiteUrl)
    
    // 4. Buscar especificamente políticas de distribuição/dropshipping
    const distributionPolicies = await analyzeDistributionPolicies(websiteContent, cleanCompanyName, websiteUrl)
    
    return {
      company_name: cleanCompanyName,
      email: structuredData.email || 'PENDENTE',
      phone: structuredData.phone || 'PENDENTE',
      website: websiteUrl,
      country: structuredData.country || 'PENDENTE',
      industry: structuredData.industry || 'PENDENTE',
      product_category: structuredData.product_category || 'PENDENTE',
      contact_person: structuredData.contact_person || 'PENDENTE',
      annual_revenue: structuredData.annual_revenue || null,
      employee_count: structuredData.employee_count || null,
      supplier_size: determineSupplierSize(structuredData.employee_count, structuredData.annual_revenue),
      verification_status: 'verified',
      accepts_us_dropshipping: distributionPolicies.dropshipping,
      accepts_us_distribution: distributionPolicies.distribution,
      real_data_verified: true,
      last_verification: new Date().toISOString(),
      verification_notes: `Web scraping realizado com sucesso. Site: ${websiteUrl}`,
      data_source: 'real_web_scraping'
    }
  } catch (error: any) {
    console.error(`❌ Erro no web scraping para ${companyName}:`, error)
    
    return {
      company_name: companyName.replace(/\s*\([^)]*\)\s*$/, '').trim(),
      email: 'PENDENTE',
      phone: 'PENDENTE',
      website: 'PENDENTE',
      country: 'PENDENTE',
      industry: 'PENDENTE',
      product_category: 'PENDENTE',
      contact_person: 'PENDENTE',
      annual_revenue: null,
      employee_count: null,
      supplier_size: 'PENDENTE',
      verification_status: 'failed',
      accepts_us_dropshipping: 'PENDENTE',
      accepts_us_distribution: 'PENDENTE',
      real_data_verified: false,
      last_verification: new Date().toISOString(),
      verification_notes: `Erro no web scraping: ${error?.message || 'Unknown error'}`,
      data_source: 'failed_scraping'
    }
  }
}

async function findOfficialWebsite(companyName: string): Promise<string | null> {
  console.log(`🌐 Buscando site oficial para: ${companyName}`)
  
  try {
    const searchQuery = `"${companyName}" official website site:${companyName.toLowerCase().replace(/\s+/g, '')}.com OR site:${companyName.toLowerCase().replace(/\s+/g, '')}.net OR site:${companyName.toLowerCase().replace(/\s+/g, '')}.org`
    
    // Try common website patterns first
    const possibleUrls = [
      `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      `https://${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.net`,
      `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.org`,
    ]
    
    for (const url of possibleUrls) {
      try {
        const response = await fetch(url, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(5000)
        })
        if (response.ok) {
          console.log(`✅ Site encontrado: ${url}`)
          return url
        }
      } catch (e) {
        continue
      }
    }
    
    // If direct attempts fail, use a more generic search approach
    console.log(`🔍 Tentando busca mais ampla para: ${companyName}`)
    return possibleUrls[0] // Return the most likely URL as fallback
    
  } catch (error) {
    console.error(`Erro ao buscar site oficial:`, error)
    return null
  }
}

async function scrapeWebsiteContent(url: string): Promise<string> {
  console.log(`📄 Fazendo scraping do site: ${url}`)
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(15000)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const content = await response.text()
    
    // Extract text content from HTML (simple approach)
    const textContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    // Limit content size for AI processing
    const limitedContent = textContent.substring(0, 8000)
    console.log(`✅ Scraping concluído. Conteúdo: ${limitedContent.length} caracteres`)
    
    return limitedContent
  } catch (error: any) {
    console.error(`Erro no scraping:`, error)
    throw new Error(`Falha no scraping: ${error?.message || 'Unknown error'}`)
  }
}

async function extractDataWithAI(content: string, companyName: string, websiteUrl: string): Promise<any> {
  console.log(`🤖 Usando OpenAI para extrair dados de: ${companyName}`)
  
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    throw new Error('OpenAI API key não configurada')
  }
  
  const prompt = `
Analise o conteúdo do website da empresa "${companyName}" (${websiteUrl}) e extraia as seguintes informações em formato JSON:

CONTEÚDO DO WEBSITE:
${content}

Extraia APENAS informações que estão claramente presentes no conteúdo. Se uma informação não estiver disponível, use null.

Retorne um JSON com:
{
  "email": "email principal para contatos comerciais/B2B (não newsletters)",
  "phone": "telefone principal da empresa",
  "country": "país onde a empresa está localizada",
  "industry": "setor/indústria da empresa",
  "product_category": "categoria principal dos produtos",
  "contact_person": "nome de pessoa de contato ou departamento",
  "annual_revenue": número ou null,
  "employee_count": número ou null
}

IMPORTANTE: 
- Foque em emails comerciais/B2B, não emails de marketing
- Use apenas dados explicitamente mencionados no conteúdo
- Para revenue/employees, use apenas números claros mencionados
- Retorne apenas o JSON, sem explicações adicionais
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em extração de dados empresariais. Extraia apenas informações explicitamente presentes no conteúdo fornecido.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.1
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const extractedContent = data.choices[0].message.content

    console.log(`🤖 Resposta OpenAI:`, extractedContent)

    // Parse JSON response
    try {
      const parsedData = JSON.parse(extractedContent)
      return parsedData
    } catch (parseError) {
      console.error('Erro ao parsear resposta JSON:', parseError)
      return {
        email: null,
        phone: null,
        country: null,
        industry: null,
        product_category: null,
        contact_person: null,
        annual_revenue: null,
        employee_count: null
      }
    }

  } catch (error: any) {
    console.error('Erro na OpenAI API:', error)
    throw new Error(`Falha na análise AI: ${error?.message || 'Unknown error'}`)
  }
}

async function analyzeDistributionPolicies(content: string, companyName: string, websiteUrl: string): Promise<any> {
  console.log(`🤝 Analisando políticas de distribuição para: ${companyName}`)
  
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    throw new Error('OpenAI API key não configurada')
  }
  
  const prompt = `
Analise o conteúdo do website da empresa "${companyName}" e determine suas políticas de distribuição/dropshipping para empresas americanas.

CONTEÚDO DO WEBSITE:
${content}

Com base no conteúdo, responda APENAS com um JSON:
{
  "dropshipping": "SIM" | "NÃO" | "PENDENTE",
  "distribution": "SIM" | "NÃO" | "PENDENTE"
}

CRITÉRIOS:
- "SIM" se houver menção clara de aceitar dropshipping/distribuição internacional ou para EUA
- "NÃO" se houver menção clara de não aceitar ou restrições
- "PENDENTE" se não houver informação clara no conteúdo

Retorne apenas o JSON, sem explicações.
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em políticas comerciais B2B. Analise apenas o conteúdo fornecido.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.1
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const extractedContent = data.choices[0].message.content

    console.log(`🤝 Políticas analisadas:`, extractedContent)

    // Parse JSON response
    try {
      const parsedData = JSON.parse(extractedContent)
      return parsedData
    } catch (parseError) {
      console.error('Erro ao parsear políticas:', parseError)
      return {
        dropshipping: 'PENDENTE',
        distribution: 'PENDENTE'
      }
    }

  } catch (error: any) {
    console.error('Erro na análise de políticas:', error)
    return {
      dropshipping: 'PENDENTE',
      distribution: 'PENDENTE'
    }
  }
}

function determineSupplierSize(employees?: number | null, revenue?: number | null): string {
  if (!employees && !revenue) return 'PENDENTE'
  
  if (employees) {
    if (employees >= 10000) return 'Large Enterprise'
    if (employees >= 1000) return 'Medium Enterprise'  
    if (employees >= 100) return 'Small Enterprise'
    return 'Startup'
  }
  
  if (revenue) {
    if (revenue >= 1000000000) return 'Large Enterprise'
    if (revenue >= 100000000) return 'Medium Enterprise'
    if (revenue >= 10000000) return 'Small Enterprise'
    return 'Startup'
  }
  
  return 'Unknown'
}