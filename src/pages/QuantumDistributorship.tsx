import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Crown,
  Mail,
  Globe,
  TrendingUp,
  Target,
  Zap,
  Brain,
  Users,
  Building,
  Send,
  Copy,
  CheckCircle,
  Star,
  Rocket,
  Shield
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SupplierData {
  name: string;
  email: string;
  country: string;
  product_category: string;
  supplier_size: string;
  annual_revenue?: number;
  employee_count?: number;
  potential_value?: number;
}

interface DistributorCampaign {
  campaign_id: string;
  strategy: any;
  email_sequence: any[];
  success_probability: number;
  expected_timeline: string;
}

export default function QuantumDistributorship() {
  const [supplierData, setSupplierData] = useState<SupplierData>({
    name: "",
    email: "",
    country: "",
    product_category: "",
    supplier_size: "",
    potential_value: 1000000
  });
  const [activeCampaigns, setActiveCampaigns] = useState<DistributorCampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [selectedEmailType, setSelectedEmailType] = useState("initial_contact");

  const countries = [
    { value: "china", label: "🇨🇳 China" },
    { value: "usa", label: "🇺🇸 Estados Unidos" },
    { value: "germany", label: "🇩🇪 Alemanha" },
    { value: "japan", label: "🇯🇵 Japão" },
    { value: "india", label: "🇮🇳 Índia" },
    { value: "south_korea", label: "🇰🇷 Coreia do Sul" },
    { value: "italy", label: "🇮🇹 Itália" },
    { value: "brazil", label: "🇧🇷 Brasil" },
    { value: "uae", label: "🇦🇪 Emirados Árabes Unidos" },
    { value: "saudi_arabia", label: "🇸🇦 Arábia Saudita" },
    { value: "qatar", label: "🇶🇦 Qatar" },
    { value: "kuwait", label: "🇰🇼 Kuwait" },
    { value: "oman", label: "🇴🇲 Omã" },
    { value: "bahrain", label: "🇧🇭 Bahrein" }
  ];

  const supplierSizes = [
    { value: "startup", label: "Startup (< $10M)" },
    { value: "medium", label: "Média ($10M - $100M)" },
    { value: "enterprise", label: "Grande ($100M - $1B)" },
    { value: "multinational", label: "Multinacional (> $1B)" }
  ];

  const emailTypes = [
    { value: "initial_contact", label: "🎯 Contato Inicial" },
    { value: "value_demonstration", label: "💎 Demonstração de Valor" },
    { value: "relationship_building", label: "🤝 Construção de Relacionamento" },
    { value: "objection_handling", label: "⚡ Tratamento de Objeções" },
    { value: "urgency_creation", label: "🔥 Criação de Urgência" },
    { value: "closing_sequence", label: "🏆 Sequência de Fechamento" }
  ];

  const productCategories = [
    "Advanced Semiconductors (67.8% margin)",
    "Medical Devices & Equipment (45.2% margin)", 
    "Renewable Energy Systems (52.6% margin)",
    "Quantum Hardware (156.7% margin)",
    "Industrial Automation (38.9% margin)",
    "Health Supplements & Nutraceuticals",
    "Beauty & Cosmetics Products",
    "Health Gadgets & Smartwatches",
    "Massage Equipment & Wellness Devices",
    "Professional Medical Equipment",
    "Premium Electronics & Technology",
    "High-End Consumer Goods"
  ];

  const launchDistributorCampaign = async () => {
    if (!supplierData.name || !supplierData.email || !supplierData.country) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('quantum-distributorship-engine', {
        body: {
          action: 'launch_distributor_campaign',
          supplier_data: supplierData
        }
      });

      if (error) throw error;

      const campaign = data.campaign;
      setActiveCampaigns(prev => [...prev, campaign]);
      
      toast.success(`🚀 Campanha Quântica lançada para ${supplierData.name}!`);
      toast.info(`${campaign.email_sequence.length} emails estratégicos criados`);

      // Reset form
      setSupplierData({
        name: "",
        email: "",
        country: "",
        product_category: "",
        supplier_size: "",
        potential_value: 1000000
      });
    } catch (error) {
      console.error('Error launching campaign:', error);
      toast.error('Erro ao lançar campanha');
    } finally {
      setLoading(false);
    }
  };

  const generateCustomEmail = async () => {
    if (!supplierData.name || !supplierData.country) {
      toast.error("Preencha nome e país do fornecedor");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('quantum-distributorship-engine', {
        body: {
          action: 'generate_custom_email',
          supplier_data: supplierData,
          email_type: selectedEmailType
        }
      });

      if (error) throw error;

      setGeneratedEmail(data.email_content);
      toast.success("Email Quântico gerado com sucesso!");
    } catch (error) {
      console.error('Error generating email:', error);
      toast.error('Erro ao gerar email');
    } finally {
      setLoading(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast.success("Email copiado para área de transferência!");
  };

  const getCountryFlag = (country: string) => {
    const flags: any = {
      'china': '🇨🇳',
      'usa': '🇺🇸', 
      'germany': '🇩🇪',
      'japan': '🇯🇵',
      'india': '🇮🇳',
      'south_korea': '🇰🇷',
      'italy': '🇮🇹',
      'brazil': '🇧🇷',
      'uae': '🇦🇪',
      'saudi_arabia': '🇸🇦',
      'qatar': '🇶🇦',
      'kuwait': '🇰🇼',
      'oman': '🇴🇲',
      'bahrain': '🇧🇭'
    };
    return flags[country] || '🌍';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-50';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Crown className="h-8 w-8 text-purple-600" />
            Quantum Distributorship Engine
          </h1>
          <p className="text-muted-foreground">
            Psicologia avançada + IA quântica para conquistar grandes fornecedores como distribuidor oficial
          </p>
        </div>
        <Badge className="bg-purple-50 text-purple-700 border-purple-200">
          <Brain className="h-3 w-3 mr-1" />
          Powered by GPT-5 Quantum
        </Badge>
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <Crown className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>🎯 REGRA ZERO - COMUNICAÇÃO MULTILÍNGUE:</strong> SEMPRE comunicar com cada fornecedor/comprador 
          no idioma oficial do país ou no idioma que responderem. Sistema detecta automaticamente e responde 
          em 47+ idiomas. <strong>ESTRATÉGIA SUPREMA:</strong> "Eu consigo clientes para vocês em produtos de alta margem 
          (semicondutores 67.8%, dispositivos médicos 45.2%, hardware quantum 156.7%), suplementos, beleza, 
          gadgets de saúde, equipamentos médicos, smartwatches, aparelhos de massagem. Zero custo - vocês armazenam, 
          entregam e ganham. Eu trago os compradores." LinkedIn intelligence para tomadores de decisão corretos.
        </AlertDescription>
      </Alert>

      {/* Supplier Data Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Dados do Fornecedor Alvo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="supplier-name">Nome do Fornecedor *</Label>
              <Input
                id="supplier-name"
                value={supplierData.name}
                onChange={(e) => setSupplierData({...supplierData, name: e.target.value})}
                placeholder="Ex: Shanghai Medical Technology Co."
              />
            </div>
            <div>
              <Label htmlFor="supplier-email">Email de Contato *</Label>
              <Input
                id="supplier-email"
                type="email"
                value={supplierData.email}
                onChange={(e) => setSupplierData({...supplierData, email: e.target.value})}
                placeholder="sales@supplier.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="country">País *</Label>
              <Select value={supplierData.country} onValueChange={(value) => setSupplierData({...supplierData, country: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size">Porte da Empresa</Label>
              <Select value={supplierData.supplier_size} onValueChange={(value) => setSupplierData({...supplierData, supplier_size: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o porte" />
                </SelectTrigger>
                <SelectContent>
                  {supplierSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Categoria do Produto</Label>
              <Select value={supplierData.product_category} onValueChange={(value) => setSupplierData({...supplierData, product_category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="potential-value">Valor Potencial Anual (USD)</Label>
            <Input
              id="potential-value"
              type="number"
              value={supplierData.potential_value}
              onChange={(e) => setSupplierData({...supplierData, potential_value: parseInt(e.target.value)})}
              placeholder="1000000"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={launchDistributorCampaign} 
              disabled={loading}
              className="flex-1"
            >
              <Rocket className="h-4 w-4 mr-2" />
              {loading ? 'Criando Campanha...' : 'Lançar Campanha Quântica'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Email Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Gerador de Email Quântico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="email-type">Tipo de Email</Label>
              <Select value={selectedEmailType} onValueChange={setSelectedEmailType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {emailTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={generateCustomEmail} 
                disabled={loading}
              >
                <Zap className="h-4 w-4 mr-2" />
                {loading ? 'Gerando...' : 'Gerar Email'}
              </Button>
            </div>
          </div>

          {generatedEmail && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Email Gerado:</Label>
                <Button variant="outline" size="sm" onClick={copyEmailToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </div>
              <Textarea
                value={generatedEmail}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      {activeCampaigns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Campanhas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={campaign.campaign_id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">
                        {getCountryFlag(campaign.strategy?.supplier_country)}
                      </span>
                      <div>
                        <div className="font-semibold">Campanha #{index + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          {campaign.strategy?.supplier_country?.toUpperCase()} • {campaign.strategy?.supplier_size}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getProbabilityColor(campaign.success_probability)}>
                        {campaign.success_probability}% sucesso
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {campaign.expected_timeline}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Emails na Sequência:</strong> {campaign.email_sequence?.length || 0}
                    </div>
                    <div>
                      <strong>Abordagem Cultural:</strong> {campaign.strategy?.cultural_approach?.split(',')[0]}
                    </div>
                    <div>
                      <strong>Categoria:</strong> {campaign.strategy?.product_category}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-medium mb-2">Progresso da Campanha:</div>
                    <Progress value={20} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Email inicial preparado • Aguardando execução
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strategy Overview with Complete Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            🧠 ESTRATÉGIA COMPLETA DE FACILITAÇÃO COMERCIAL MILIONÁRIA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* RULE ZERO - Multilingual Communication */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border-4 border-red-300 shadow-xl">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
                🚨 REGRA ZERO - COMUNICAÇÃO MULTILÍNGUE OBRIGATÓRIA
              </h3>
              <div className="space-y-4">
                <div className="bg-red-100 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2">📋 PROTOCOLO FUNDAMENTAL:</h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li><strong>🌍 SEMPRE comunicar no idioma oficial do país do fornecedor/comprador</strong></li>
                    <li><strong>🔄 Se responderem em outro idioma, mudar imediatamente para esse idioma</strong></li>
                    <li><strong>🤖 Sistema detecta automaticamente o idioma da resposta</strong></li>
                    <li><strong>📧 Todos os emails subsequentes no idioma detectado</strong></li>
                    <li><strong>🎯 Personalização cultural específica para cada idioma</strong></li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-red-700 mb-2">🗣️ IDIOMAS SUPORTADOS (47+):</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div>• 🇨🇳 中文 (Mandarim)</div>
                      <div>• 🇺🇸 English</div>
                      <div>• 🇩🇪 Deutsch</div>
                      <div>• 🇯🇵 日本語</div>
                      <div>• 🇮🇳 हिन्दी</div>
                      <div>• 🇰🇷 한국어</div>
                      <div>• 🇮🇹 Italiano</div>
                      <div>• 🇧🇷 Português</div>
                      <div>• 🇦🇪 العربية</div>
                      <div>• 🇸🇦 العربية</div>
                      <div>• 🇪🇸 Español</div>
                      <div>• 🇫🇷 Français</div>
                      <div>• 🇷🇺 Русский</div>
                      <div>• 🇳🇱 Nederlands</div>
                      <div>• 🇵🇱 Polski</div>
                      <div>• 🇹🇷 Türkçe</div>
                      <div>• 🇺🇦 Українська</div>
                      <div>• 🇹🇭 ไทย</div>
                      <div>• 🇻🇳 Tiếng Việt</div>
                      <div>• 🇮🇩 Bahasa</div>
                      <div>+ 27 outros idiomas</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-red-700 mb-2">🧠 ADAPTAÇÃO CULTURAL AUTOMÁTICA:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>Formalidade:</strong> Ajuste por cultura (japonês formal vs americano casual)</li>
                      <li>• <strong>Estrutura:</strong> Direta (alemão) vs indireta (asiático)</li>
                      <li>• <strong>Relacionamento:</strong> Business-first vs relationship-first</li>
                      <li>• <strong>Hierarquia:</strong> Respeito por posições e títulos</li>
                      <li>• <strong>Tempo:</strong> Urgência vs paciência cultural</li>
                      <li>• <strong>Valores:</strong> Individuais vs coletivos</li>
                      <li>• <strong>Contexto:</strong> Alto vs baixo contexto comunicativo</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm font-medium text-yellow-800">
                    <strong>💡 VANTAGEM COMPETITIVA:</strong> Comunicação no idioma nativo aumenta taxa de resposta 
                    em <span className="text-green-600 font-bold">340%</span> e taxa de conversão em 
                    <span className="text-green-600 font-bold">580%</span>. Fornecedores sentem respeito e confiança 
                    imediatos, facilitando negociações milionárias.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}