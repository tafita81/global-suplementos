import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Key, AlertCircle, Copy, Eye, EyeOff, ChevronDown, ChevronRight, Info, Zap } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

interface APICredential {
  name: string;
  status: "connected" | "missing" | "error";
  required: boolean;
  category: string;
}

const apiCredentials: APICredential[] = [
  // IA e Análise
  { name: "OPENAI_API_KEY", status: "connected", required: true, category: "ai" },
  { name: "GOOGLE_AI_API_KEY", status: "connected", required: false, category: "ai" },
  
  // Google Workspace e Cloud
  { name: "GMAIL_API_KEY", status: "missing", required: true, category: "google" },
  { name: "GOOGLE_DRIVE_API_KEY", status: "missing", required: true, category: "google" },
  { name: "GOOGLE_SHEETS_API_KEY", status: "missing", required: true, category: "google" },
  { name: "GOOGLE_CALENDAR_API_KEY", status: "missing", required: false, category: "google" },
  { name: "GOOGLE_MAPS_API_KEY", status: "missing", required: false, category: "google" },
  { name: "GOOGLE_TRANSLATE_API_KEY", status: "missing", required: false, category: "google" },
  { name: "YOUTUBE_API_KEY", status: "missing", required: false, category: "google" },
  { name: "GOOGLE_CLOUD_STORAGE_API_KEY", status: "missing", required: false, category: "google" },
  
  // Marketplaces B2B
  { name: "ALIBABA_API_KEY", status: "missing", required: true, category: "marketplace" },
  { name: "ALIBABA_SECRET_KEY", status: "missing", required: true, category: "marketplace" },
  { name: "INDIAMART_API_KEY", status: "missing", required: true, category: "marketplace" },
  { name: "GLOBALSOURCES_API_KEY", status: "missing", required: true, category: "marketplace" },
  { name: "MADE_IN_CHINA_API_KEY", status: "missing", required: false, category: "marketplace" },
  
  // Marketplaces B2C e Dropshipping
  { name: "AMAZON_MWS_ACCESS_KEY", status: "missing", required: true, category: "ecommerce" },
  { name: "AMAZON_MWS_SECRET_KEY", status: "missing", required: true, category: "ecommerce" },
  { name: "EBAY_APP_ID", status: "missing", required: false, category: "ecommerce" },
  { name: "SHOPIFY_API_KEY", status: "missing", required: false, category: "ecommerce" },
  { name: "ALIEXPRESS_API_KEY", status: "missing", required: true, category: "ecommerce" },
  { name: "ALIEXPRESS_SECRET_KEY", status: "missing", required: true, category: "ecommerce" },
  { name: "ALIBABA_DROPSHIP_API_KEY", status: "missing", required: true, category: "ecommerce" },
  { name: "ALIBABA_DROPSHIP_SECRET", status: "missing", required: true, category: "ecommerce" },
  
  // Programas de Afiliados
  { name: "IHERB_AFFILIATE_ID", status: "missing", required: true, category: "affiliate" },
  { name: "VITACOST_AFFILIATE_ID", status: "missing", required: true, category: "affiliate" },
  { name: "AMAZON_ASSOCIATES_ACCESS_KEY", status: "missing", required: false, category: "affiliate" },
  { name: "COMMISSION_JUNCTION_API_KEY", status: "missing", required: false, category: "affiliate" },
  { name: "SHAREASALE_API_KEY", status: "missing", required: false, category: "affiliate" },
  
  // Logística e Frete
  { name: "DHL_API_KEY", status: "missing", required: true, category: "logistics" },
  { name: "FEDEX_API_KEY", status: "missing", required: true, category: "logistics" },
  { name: "UPS_API_KEY", status: "missing", required: false, category: "logistics" },
  { name: "FREIGHTOS_API_KEY", status: "missing", required: false, category: "logistics" },
  { name: "CHINA_POST_API_KEY", status: "missing", required: false, category: "logistics" },
  { name: "ARAMEX_API_KEY", status: "missing", required: false, category: "logistics" },
  
  // Compliance e Regulamentação
  { name: "OFAC_API_KEY", status: "missing", required: true, category: "compliance" },
  { name: "FDA_API_KEY", status: "missing", required: false, category: "compliance" },
  { name: "EU_SANCTIONS_API_KEY", status: "missing", required: false, category: "compliance" },
  { name: "ANVISA_API_KEY", status: "missing", required: true, category: "compliance" },
  { name: "INMETRO_API_KEY", status: "missing", required: false, category: "compliance" },
  
  // Financeiro e Pagamentos
  { name: "STRIPE_SECRET_KEY", status: "missing", required: true, category: "payments" },
  { name: "PAYONEER_API_KEY", status: "missing", required: true, category: "payments" },
  { name: "WISE_API_KEY", status: "missing", required: false, category: "payments" },
  { name: "PAYPAL_CLIENT_ID", status: "missing", required: false, category: "payments" },
  { name: "EXCHANGE_RATE_API_KEY", status: "missing", required: true, category: "payments" },
  { name: "PIC_PAY_API_KEY", status: "missing", required: false, category: "payments" },
  { name: "MERCADO_PAGO_ACCESS_TOKEN", status: "missing", required: false, category: "payments" },
  
  // Redes Sociais e Marketing
  { name: "FACEBOOK_ACCESS_TOKEN", status: "missing", required: false, category: "social" },
  { name: "INSTAGRAM_ACCESS_TOKEN", status: "missing", required: false, category: "social" },
  { name: "LINKEDIN_ACCESS_TOKEN", status: "missing", required: false, category: "social" },
  { name: "TWITTER_API_KEY", status: "missing", required: false, category: "social" },
  { name: "TIKTOK_ACCESS_TOKEN", status: "missing", required: false, category: "social" },
  { name: "WHATSAPP_API_KEY", status: "missing", required: false, category: "social" },
  { name: "YOUTUBE_DATA_API_KEY", status: "missing", required: false, category: "social" },
  { name: "YOUTUBE_ANALYTICS_API_KEY", status: "missing", required: false, category: "social" },
  { name: "YOUTUBE_REPORTING_API_KEY", status: "missing", required: false, category: "social" },
  { name: "YOUTUBE_CHANNEL_ID", status: "missing", required: false, category: "social" },
  
  // Business Intelligence
  { name: "TRADEMAP_API_KEY", status: "missing", required: true, category: "intelligence" },
  { name: "COMTRADE_API_KEY", status: "missing", required: true, category: "intelligence" },
  { name: "WORLDBANK_API_KEY", status: "missing", required: false, category: "intelligence" },
  { name: "IMF_API_KEY", status: "missing", required: false, category: "intelligence" },
  
  // CRM e Automação
  { name: "HUBSPOT_API_KEY", status: "missing", required: false, category: "crm" },
  { name: "SALESFORCE_API_KEY", status: "missing", required: false, category: "crm" },
  { name: "ZAPIER_API_KEY", status: "missing", required: false, category: "crm" },
  { name: "MAKE_API_KEY", status: "missing", required: false, category: "crm" },
  
  // APIs por País/Região
  { name: "BRAZIL_RECEITA_FEDERAL_API", status: "missing", required: true, category: "country" },
  { name: "BRAZIL_SISCOMEX_API", status: "missing", required: true, category: "country" },
  { name: "USA_CUSTOMS_API_KEY", status: "missing", required: false, category: "country" },
  { name: "EU_EORI_API_KEY", status: "missing", required: false, category: "country" },
  { name: "CHINA_CUSTOMS_API_KEY", status: "missing", required: false, category: "country" },
  { name: "INDIA_DGFT_API_KEY", status: "missing", required: false, category: "country" }
];

const apiInstructions = {
  // === IA E ANÁLISE ===
  OPENAI_API_KEY: {
    title: "OpenAI ChatGPT API",
    description: "Para análise inteligente de oportunidades e geração de insights",
    steps: [
      "1. Vá para https://platform.openai.com",
      "2. Clique em 'Sign up' ou 'Log in' se já tem conta",
      "3. Entre na sua conta do ChatGPT/OpenAI",
      "4. Clique no seu nome (canto superior direito) → 'View API keys'",
      "5. Clique em '+ Create new secret key'",
      "6. Dê um nome como 'Arbitragem System' e clique 'Create secret key'",
      "7. COPIE a chave que aparece (começa com 'sk-')",
      "8. IMPORTANTE: Salve em local seguro - não aparecerá novamente!"
    ],
    link: "https://platform.openai.com/api-keys",
    cost: "A partir de $5 em créditos",
    format: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  },
  
  GOOGLE_AI_API_KEY: {
    title: "Google Gemini AI API",
    description: "IA adicional para análise de mercado e tradução",
    steps: [
      "1. Vá para https://aistudio.google.com",
      "2. Clique 'Get started' e faça login com conta Google",
      "3. Aceite os termos de uso do Google AI Studio",
      "4. No menu lateral, clique em 'Get API key'",
      "5. Clique 'Create API key in new project'",
      "6. COPIE a chave que aparece",
      "7. Salve em local seguro"
    ],
    link: "https://aistudio.google.com/app/apikey",
    cost: "Gratuito até certo limite",
    format: "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  },

  // === GOOGLE WORKSPACE E CLOUD ===
  GMAIL_API_KEY: {
    title: "Gmail API",
    description: "Acesso para ler, enviar e gerenciar emails",
    steps: [
      "1. Vá para https://console.cloud.google.com/",
      "2. Crie um novo projeto ou selecione existente",
      "3. Vá em 'APIs e Serviços' → 'Biblioteca'",
      "4. Procure por 'Gmail API' e clique 'ATIVAR'",
      "5. Vá em 'APIs e Serviços' → 'Credenciais'",
      "6. Clique 'Criar credenciais' → 'Chave de API'",
      "7. COPIE a chave gerada",
      "8. IMPORTANTE: Configure OAuth2 para acesso completo"
    ],
    link: "https://console.cloud.google.com/apis/library/gmail.googleapis.com",
    cost: "Gratuito até 1 bilhão de cotas/dia",
    format: "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  },

  // === ALIEXPRESS DROPSHIPPING ===
  ALIEXPRESS_API_KEY: {
    title: "AliExpress Dropshipping API",
    description: "Acesso aos produtos e preços para dropshipping",
    steps: [
      "1. Vá para https://developers.aliexpress.com",
      "2. Registre-se como desenvolvedor",
      "3. Crie uma aplicação para dropshipping",
      "4. Aguarde aprovação (1-3 dias úteis)",
      "5. No painel, vá em 'My Apps'",
      "6. Clique na sua aplicação",
      "7. COPIE o 'App Key' (API Key)",
      "8. COPIE também o 'App Secret'"
    ],
    link: "https://developers.aliexpress.com/",
    cost: "Gratuito com limitações",
    format: "App Key: 12345678 / App Secret: abcdef..."
  },

  ALIEXPRESS_SECRET_KEY: {
    title: "AliExpress App Secret",
    description: "Chave secreta para autenticação na API AliExpress",
    steps: [
      "1. No painel de desenvolvedor AliExpress",
      "2. Vá em 'My Apps' → sua aplicação",
      "3. Na seção 'App Info'",
      "4. COPIE o 'App Secret'",
      "5. Use junto com o App Key para autenticação",
      "6. IMPORTANTE: Mantenha esta chave secreta"
    ],
    link: "https://developers.aliexpress.com/",
    cost: "Incluído na conta de desenvolvedor",
    format: "Chave alfanumérica de 32 caracteres"
  },

  // === ALIBABA DROPSHIPPING ===
  ALIBABA_DROPSHIP_API_KEY: {
    title: "Alibaba Dropshipping API",
    description: "API específica para dropshipping automático da Alibaba",
    steps: [
      "1. Vá para https://www.alibaba.com/dropshipping",
      "2. Registre-se no programa de dropshipping",
      "3. Complete verificação da empresa",
      "4. Vá para https://developers.alibaba.com",
      "5. Solicite acesso à 'Dropshipping API'",
      "6. Preencha formulário específico para dropshipping",
      "7. Aguarde aprovação especializada (3-7 dias)",
      "8. COPIE credenciais específicas para dropshipping",
      "9. Configure webhook para sincronização de estoque"
    ],
    link: "https://www.alibaba.com/dropshipping",
    cost: "Gratuito + comissão por venda",
    format: "Dropship Key: DS_xxxxxxxxxxxxxxxx"
  },

  ALIBABA_DROPSHIP_SECRET: {
    title: "Alibaba Dropshipping Secret",
    description: "Chave secreta para operações de dropshipping",
    steps: [
      "1. No painel de dropshipping Alibaba",
      "2. Vá em 'Developer Settings'",
      "3. Na seção 'Dropshipping Credentials'",
      "4. COPIE o 'Dropship Secret'",
      "5. Use para autenticação de pedidos automáticos",
      "6. Configure rate limits apropriados",
      "7. CRÍTICO: Use apenas para dropshipping aprovado"
    ],
    link: "https://www.alibaba.com/dropshipping",
    cost: "Incluído no programa de dropshipping",
    format: "Secret: DS_SEC_xxxxxxxxxxxxxxxxxxxxxxxx"
  },

  // === PROGRAMAS DE AFILIADOS ===
  IHERB_AFFILIATE_ID: {
    title: "iHerb Programa de Afiliados",
    description: "Ganhe comissões vendendo suplementos e produtos naturais",
    steps: [
      "1. Vá para https://www.iherb.com/info/affiliate-program",
      "2. Clique 'Join Now' para se inscrever",
      "3. Preencha formulário com dados pessoais/empresa",
      "4. Aguarde aprovação (1-2 dias)",
      "5. Após aprovado, faça login no painel de afiliado",
      "6. Vá em 'My Account' → 'Affiliate Settings'",
      "7. COPIE seu 'Affiliate ID' (código único)",
      "8. Use este ID nos links de produtos"
    ],
    link: "https://www.iherb.com/info/affiliate-program",
    cost: "Gratuito - comissão 5-10%",
    format: "Código alfanumérico (ex: ABC1234)"
  },

  VITACOST_AFFILIATE_ID: {
    title: "Vitacost Programa de Afiliados",
    description: "Afiliação para produtos de saúde e bem-estar",
    steps: [
      "1. Vá para https://www.vitacost.com/affiliates",
      "2. Clique 'Apply to Join'",
      "3. Registre-se através da ShareASale ou CJ Affiliate",
      "4. Complete o perfil do afiliado",
      "5. Aguarde aprovação da Vitacost",
      "6. Após aprovado, acesse seu painel",
      "7. COPIE seu 'Affiliate ID'",
      "8. Configure tracking de links"
    ],
    link: "https://www.vitacost.com/affiliates",
    cost: "Gratuito - comissão 3-8%",
    format: "ID numérico (ex: 123456)"
  },

  // === PAGAMENTOS ===
  PAYONEER_API_KEY: {
    title: "Payoneer API para Pagamentos Globais",
    description: "Receba e envie pagamentos internacionais",
    steps: [
      "1. Vá para https://payouts.payoneer.com/partners/api",
      "2. Registre-se como parceiro comercial",
      "3. Complete verificação KYC/AML",
      "4. Solicite acesso à API via email: APISupport@payoneer.com",
      "5. Informe o tipo de integração (marketplace/e-commerce)",
      "6. Aguarde aprovação e documentação técnica",
      "7. COPIE as credenciais fornecidas (API Key + Secret)",
      "8. Configure endpoints de sandbox e produção"
    ],
    link: "https://payouts.payoneer.com/partners/api",
    cost: "Taxa por transação varia por região",
    format: "API Key + Secret Key fornecidos por email"
  },

  PIC_PAY_API_KEY: {
    title: "PicPay API - Pagamentos Brasil",
    description: "Gateway de pagamento brasileiro com PIX",
    steps: [
      "1. Vá para https://developers.picpay.com",
      "2. Crie conta de desenvolvedor",
      "3. Complete verificação da empresa (CNPJ obrigatório)",
      "4. Vá em 'Minhas Aplicações'",
      "5. Clique 'Nova Aplicação'",
      "6. Preencha dados da integração",
      "7. COPIE 'PicPay-Token' gerado",
      "8. Configure webhook para notificações"
    ],
    link: "https://developers.picpay.com/",
    cost: "Taxa por transação: 3,99% + R$0,39",
    format: "Token: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  },

  MERCADO_PAGO_ACCESS_TOKEN: {
    title: "Mercado Pago API - Pagamentos América Latina",
    description: "Gateway de pagamento para Argentina, Brasil, Chile, etc.",
    steps: [
      "1. Vá para https://developers.mercadopago.com",
      "2. Crie conta de desenvolvedor",
      "3. Complete verificação da conta",
      "4. Vá em 'Suas integrações'",
      "5. Clique 'Criar aplicação'",
      "6. Escolha 'Pagamentos online'",
      "7. COPIE 'Access Token' de produção",
      "8. Configure webhooks para notificações"
    ],
    link: "https://developers.mercadopago.com/",
    cost: "Taxa varia por país: 2,9% - 5,9%",
    format: "Access Token: APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  },

  // === APIS POR PAÍS ===
  BRAZIL_RECEITA_FEDERAL_API: {
    title: "API Receita Federal do Brasil",
    description: "Consulta CNPJ, CPF e situação fiscal",
    steps: [
      "1. Vá para https://servicos.receita.fazenda.gov.br",
      "2. Acesse 'Pessoa Jurídica' → 'Cartão CNPJ'",
      "3. Para API oficial, entre em contato: atendimento.receita@fazenda.gov.br",
      "4. Solicite certificado digital A1 ou A3",
      "5. Configure acesso via e-CAC",
      "6. Alternativamente, use APIs não oficiais como:",
      "   - ReceitaWS: https://receitaws.com.br/",
      "   - BrasilAPI: https://brasilapi.com.br/",
      "7. COPIE token de acesso da API escolhida"
    ],
    link: "https://brasilapi.com.br/docs",
    cost: "APIs não oficiais: gratuitas com limitações",
    format: "Token ou chave de acesso conforme provedor"
  },

  BRAZIL_SISCOMEX_API: {
    title: "SISCOMEX - Sistema Integrado de Comércio Exterior",
    description: "API para operações de importação e exportação",
    steps: [
      "1. Obtenha certificado digital A1 ou A3",
      "2. Cadastre-se no Portal Único de Comércio Exterior",
      "3. Vá para https://portalunico.siscomex.gov.br",
      "4. Solicite habilitação para API via:",
      "   Email: suporte.portalunico@mdic.gov.br",
      "5. Informe CNPJ e tipo de operação",
      "6. Aguarde liberação (5-10 dias úteis)",
      "7. COPIE credenciais de acesso fornecidas",
      "8. Configure endpoints de produção"
    ],
    link: "https://portalunico.siscomex.gov.br/",
    cost: "Gratuito para empresas habilitadas",
    format: "Certificado digital + credenciais específicas"
  },

  USA_CUSTOMS_API_KEY: {
    title: "US Customs and Border Protection API",
    description: "Dados de importação/exportação dos EUA",
    steps: [
      "1. Vá para https://www.cbp.gov/trade/automation",
      "2. Registre-se no ACE (Automated Commercial Environment)",
      "3. Complete formulário CBP Form 5106",
      "4. Obtenha FIRMS (Facilities Information and Resources Management System) code",
      "5. Solicite acesso API via: ACE.Support@cbp.dhs.gov",
      "6. Aguarde aprovação (10-15 dias úteis)",
      "7. COPIE credenciais de acesso",
      "8. Configure certificados SSL"
    ],
    link: "https://www.cbp.gov/trade/automation/ace",
    cost: "Gratuito para importadores registrados",
    format: "Certificado + FIRMS code + credenciais"
  },

  // Continuar com outras APIs...
  EXCHANGE_RATE_API_KEY: {
    title: "Exchange Rate API",
    description: "Cotações de moedas em tempo real para cálculos",
    steps: [
      "1. Vá para https://app.exchangerate-api.com",
      "2. Clique 'Get Free Key'",
      "3. Preencha email e confirme",
      "4. Escolha plano gratuito (1,500 calls/mês)",
      "5. Confirme email clicando no link",
      "6. COPIE a chave (formato UUID)",
      "7. Teste fazendo uma chamada de exemplo"
     ],
     link: "https://app.exchangerate-api.com/sign-up",
     cost: "1,500 chamadas/mês gratuitas",
     format: "12345678-1234-1234-1234-123456789012"
   },

   // === YOUTUBE SOCIAL MEDIA APIS ===
   YOUTUBE_DATA_API_KEY: {
     title: "YouTube Data API v3",
     description: "Acesso completo a dados do YouTube - vídeos, canais, playlists",
     steps: [
       "1. Vá para https://console.cloud.google.com/",
       "2. Crie um projeto ou selecione existente",
       "3. Vá em 'APIs e Serviços' → 'Biblioteca'",
       "4. Procure 'YouTube Data API v3' e clique 'ATIVAR'",
       "5. Vá em 'Credenciais' → 'Criar credenciais'",
       "6. Selecione 'Chave de API'",
       "7. COPIE a chave gerada",
       "8. Configure quotas e restrições se necessário"
     ],
     link: "https://console.cloud.google.com/apis/library/youtube.googleapis.com",
     cost: "Gratuito até 10,000 unidades/dia",
     format: "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   },

   YOUTUBE_ANALYTICS_API_KEY: {
     title: "YouTube Analytics API",
     description: "Dados analíticos detalhados do seu canal YouTube",
     steps: [
       "1. No Google Cloud Console do mesmo projeto",
       "2. Vá em 'APIs e Serviços' → 'Biblioteca'", 
       "3. Procure 'YouTube Analytics API' e ative",
       "4. Use a mesma chave API do YouTube Data API",
       "5. Configure OAuth2 para acesso aos seus dados",
       "6. No YouTube Studio, habilite acesso de API",
       "7. IMPORTANTE: Precisa ser dono do canal"
     ],
     link: "https://console.cloud.google.com/apis/library/youtubeanalytics.googleapis.com",
     cost: "Gratuito - mesma quota do Data API",
     format: "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   },

   YOUTUBE_REPORTING_API_KEY: {
     title: "YouTube Reporting API",
     description: "Relatórios bulk de dados históricos do canal",
     steps: [
       "1. No Google Cloud Console",
       "2. Ative 'YouTube Reporting API' na biblioteca",
       "3. Use a mesma chave do projeto YouTube",
       "4. Configure acesso OAuth2 avançado",
       "5. Solicite aprovação para dados históricos",
       "6. Configure webhook para relatórios automáticos"
     ],
     link: "https://console.cloud.google.com/apis/library/youtubereporting.googleapis.com", 
     cost: "Gratuito com limitações",
     format: "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   },

   YOUTUBE_CHANNEL_ID: {
     title: "YouTube Channel ID",
     description: "ID único do seu canal para automações",
     steps: [
       "1. Vá para https://studio.youtube.com",
       "2. Faça login na sua conta do canal",
       "3. Clique na foto do perfil → 'Seu canal'",
       "4. Na URL, copie o ID após '/channel/'",
       "5. OU vá em Configurações → Canal → Informações avançadas",
       "6. COPIE o 'ID do canal' que aparece",
       "7. Formato: UCxxxxxxxxxxxxxxxxxxxxxxx"
     ],
     link: "https://studio.youtube.com",
     cost: "Gratuito",
     format: "UCxxxxxxxxxxxxxxxxxxxxxxx"
   }
 };

export default function APISetup() {
  const { toast: showToast } = useToast();
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [testKey, setTestKey] = useState("");
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [expandedAPIs, setExpandedAPIs] = useState<Record<string, boolean>>({});

  const handleSaveApiKey = async (apiName: string, apiKey: string) => {
    if (!apiKey.trim()) {
      toast.error("Digite uma chave API válida");
      return;
    }

    try {
      toast.info(`💾 Salvando ${apiName}...`);
      
      const { data, error } = await supabase.functions.invoke('api-configurator', {
        body: {
          action: 'save_api_key',
          api_name: apiName,
          api_key: apiKey
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success(data.message);
        setApiKeys(prev => ({ ...prev, [apiName]: apiKey }));
        setTestKey(""); // Limpar campo após salvar
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error('Save API key error:', error);
      toast.error(`❌ Erro ao salvar: ${error.message}`);
    }
  };

  const handleTestApiKey = async (apiName: string, apiKey: string) => {
    if (!apiKey.trim()) {
      toast.error("Digite uma chave API para testar");
      return;
    }

    setTesting(prev => ({ ...prev, [apiName]: true }));
    
    try {
      toast.info(`🧪 Testando ${apiName}...`);
      
      const { data, error } = await supabase.functions.invoke('api-configurator', {
        body: {
          action: 'test_single',
          api_name: apiName,
          api_key: apiKey
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error('Test API key error:', error);
      toast.error(`❌ Erro no teste: ${error.message}`);
    } finally {
      setTesting(prev => ({ ...prev, [apiName]: false }));
    }
  };

  const handleTestAllAPIs = async () => {
    try {
      toast.info("🧪 Testando todas as APIs configuradas...");
      
      const { data, error } = await supabase.functions.invoke('api-configurator', {
        body: { action: 'test_all' }
      });

      if (error) throw error;

      const { summary, results } = data;
      
      if (summary.overall_status === 'all_passed') {
        toast.success(`✅ Todas as ${summary.successful_tests} APIs funcionando!`);
      } else if (summary.overall_status === 'partial_success') {
        toast.warning(`⚠️ ${summary.successful_tests}/${summary.total_tests} APIs funcionando`);
      } else {
        toast.error(`❌ Nenhuma API funcionando corretamente`);
      }

      // Mostrar resultados detalhados
      console.log('Detailed API test results:', results);
      
    } catch (error: any) {
      console.error('Test all APIs error:', error);
      toast.error(`❌ Erro nos testes: ${error.message}`);
    }
  };

  const handleTriggerZapier = async () => {
    if (!zapierWebhook) {
      showToast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook do Zapier",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Triggering Zapier webhook:", zapierWebhook);
      
      const apiStatus = apiCredentials.reduce((acc, cred) => {
        acc[cred.name] = cred.status;
        return acc;
      }, {} as Record<string, string>);

      const response = await fetch(zapierWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          event: "api_configuration_update",
          api_status: apiStatus,
          total_apis: apiCredentials.length,
          connected_apis: apiCredentials.filter(c => c.status === "connected").length
        }),
      });

      showToast({
        title: "Zapier Webhook Acionado",
        description: "A solicitação foi enviada para o Zapier. Verifique o histórico do seu Zap para confirmar o acionamento.",
      });
      
      toast.success("🔗 Webhook do Zapier disparado com sucesso!");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      showToast({
        title: "Erro",
        description: "Falha ao acionar o webhook do Zapier. Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const toggleKeyVisibility = (key: string) => {
    setShowKey(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para área de transferência!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "default";
      case "missing": return "destructive";  
      case "error": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected": return <CheckCircle className="h-4 w-4" />;
      case "missing": return <AlertCircle className="h-4 w-4" />;
      case "error": return <AlertCircle className="h-4 w-4" />;
      default: return <Key className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "ai": return "🤖 Inteligência Artificial";
      case "google": return "🔵 Google Workspace & Cloud";
      case "marketplace": return "🏪 Marketplaces B2B";
      case "ecommerce": return "🛒 E-commerce & Dropshipping";
      case "affiliate": return "💰 Programas de Afiliados";
      case "logistics": return "📦 Logística e Frete";
      case "compliance": return "🛡️ Compliance e Regulamentação";
      case "payments": return "💳 Pagamentos e Financeiro";
      case "social": return "📱 Redes Sociais e Marketing";
      case "intelligence": return "📊 Business Intelligence";
      case "crm": return "🤝 CRM e Automação";
      case "country": return "🌍 APIs por País/Região";
      default: return "🔧 Outros";
    }
  };

  const categories = ["ai", "google", "social", "intelligence", "crm", "marketplace", "ecommerce", "affiliate", "logistics", "compliance", "payments", "country"];

  const toggleAPIExpansion = (apiName: string) => {
    setExpandedAPIs(prev => ({ ...prev, [apiName]: !prev[apiName] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuração de APIs</h1>
          <p className="text-muted-foreground">
            Configure todas as credenciais necessárias para automação completa de arbitragem internacional
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>IMPORTANTE:</strong> Todas as credenciais são salvas de forma segura e criptografada no Supabase. 
          Nunca compartilhe suas chaves API com terceiros. Este sistema suporta {apiCredentials.length} integrações diferentes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">📊 Visão Geral</TabsTrigger>
          <TabsTrigger value="setup">🔧 Configurar APIs</TabsTrigger>
          <TabsTrigger value="test">🧪 Testar Conexões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {categories.map(category => {
              const categoryCredentials = apiCredentials.filter(cred => cred.category === category);
              const connected = categoryCredentials.filter(c => c.status === "connected").length;
              const total = categoryCredentials.length;
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{getCategoryTitle(category)}</CardTitle>
                      <Badge variant={connected === total ? "default" : "destructive"}>
                        {connected}/{total} configuradas
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoryCredentials.map(cred => (
                        <div key={cred.name} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(cred.status)}
                            <span className="text-sm">{cred.name}</span>
                            {cred.required && <Badge variant="outline" className="text-xs">Obrigatório</Badge>}
                          </div>
                          <Badge variant={getStatusColor(cred.status) as any}>
                            {cred.status === "connected" ? "Conectado" : "Não configurado"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          {Object.entries(apiInstructions).map(([key, instruction]) => (
            <Card key={key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{instruction.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAPIExpansion(key)}
                    >
                      {expandedAPIs[key] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={instruction.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Acessar
                      </a>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{instruction.description}</p>
              </CardHeader>
              
              <CardContent className={expandedAPIs[key] ? "block" : "hidden"}>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold">💰 Custo: {instruction.cost}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">📋 Passo a passo:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {instruction.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="mt-4 p-2 bg-background border rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Formato esperado:</span>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {instruction.format}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(instruction.format)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`key-${key}`} className="text-sm font-semibold">
                        🔑 Cole sua chave aqui:
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            id={`key-${key}`}
                            type={showKey[key] ? "text" : "password"}
                            placeholder="Cole sua API key aqui..."
                            className="pr-10"
                            value={testKey}
                            onChange={(e) => setTestKey(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => toggleKeyVisibility(key)}
                          >
                            {showKey[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <Button 
                          onClick={() => handleSaveApiKey(key, testKey)}
                          disabled={!testKey}
                        >
                          Salvar
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleTestApiKey(key, testKey)}
                          disabled={!testKey}
                        >
                          Testar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🧪 Testar Todas as Conexões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button className="flex-1" onClick={handleTestAllAPIs}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Testar Todas as APIs
                </Button>
                <Button variant="outline">
                  Gerar Relatório de Status
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4">
            {categories.map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{getCategoryTitle(category)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {apiCredentials
                      .filter(cred => cred.category === category)
                      .map(cred => (
                        <div key={cred.name} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{cred.name}</span>
                          <div className="flex gap-2">
                            <Badge variant={getStatusColor(cred.status) as any}>
                              {cred.status === "connected" ? "Conectado" : "Não configurado"}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTestApiKey(cred.name, '')}
                            >
                              Testar
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Zapier Integration Section */}
          <Card>
            <CardHeader>
              <CardTitle>🔗 Automação com Zapier</CardTitle>
              <p className="text-sm text-muted-foreground">
                Conecte o sistema com o Zapier para automatizar workflows
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="zapier-webhook">Webhook URL do Zapier</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="zapier-webhook"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={zapierWebhook}
                    onChange={(e) => setZapierWebhook(e.target.value)}
                  />
                  <Button onClick={handleTriggerZapier} disabled={!zapierWebhook}>
                    Disparar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Cole aqui a URL do webhook criado no seu Zap
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}