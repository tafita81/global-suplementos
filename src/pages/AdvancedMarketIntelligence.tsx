import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Building, 
  FileText, 
  Calendar,
  DollarSign,
  Target,
  Zap,
  Brain,
  Rocket,
  Crown,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GovernmentContract {
  id: string;
  title: string;
  agency: string;
  value: number;
  posted_date: string;
  deadline: string;
  naics_code: string;
  set_aside: string;
  opportunity_type: "licitação" | "contrato_aberto" | "gsa_schedule" | "idiq";
  ai_match_score: number;
  predicted_win_probability: number;
  compliance_requirements: string[];
  estimated_competition: number;
}

interface MarketTrend {
  sector: string;
  growth_rate: number;
  market_size: number;
  trend_direction: "crescendo" | "estável" | "declinando";
  disruption_probability: number;
  key_drivers: string[];
  opportunity_window: string;
}

const mockGovernmentContracts: GovernmentContract[] = [
  {
    id: "contract-1",
    title: "AI-Powered Supply Chain Optimization Platform",
    agency: "Department of Defense",
    value: 15000000,
    posted_date: "2025-01-15",
    deadline: "2025-03-15",
    naics_code: "541511",
    set_aside: "Small Business",
    opportunity_type: "licitação",
    ai_match_score: 94,
    predicted_win_probability: 78,
    compliance_requirements: ["DFARS", "NIST SP 800-171", "FedRAMP Moderate"],
    estimated_competition: 12
  },
  {
    id: "contract-2", 
    title: "ESG Compliance Automation Software",
    agency: "General Services Administration",
    value: 8500000,
    posted_date: "2025-01-20",
    deadline: "2025-04-10",
    naics_code: "541512",
    set_aside: "8(a) Program",
    opportunity_type: "gsa_schedule",
    ai_match_score: 91,
    predicted_win_probability: 82,
    compliance_requirements: ["FedRAMP High", "Section 508", "TAA Compliant"],
    estimated_competition: 8
  },
  {
    id: "contract-3",
    title: "Quantum-Safe Cryptography Implementation",
    agency: "National Security Agency",
    value: 25000000,
    posted_date: "2025-01-10",
    deadline: "2025-02-28",
    naics_code: "541330",
    set_aside: "Unrestricted",
    opportunity_type: "contrato_aberto",
    ai_match_score: 96,
    predicted_win_probability: 65,
    compliance_requirements: ["Top Secret Clearance", "NIST PQC Standards", "FIPS 140-3"],
    estimated_competition: 6
  }
];

const marketTrends: MarketTrend[] = [
  {
    sector: "ESG & Sustainability Tech",
    growth_rate: 127,
    market_size: 15000000000,
    trend_direction: "crescendo",
    disruption_probability: 85,
    key_drivers: ["EU CSRD Mandate", "SEC Climate Rules", "Investor Pressure"],
    opportunity_window: "Q1 2025 - Q4 2026"
  },
  {
    sector: "Post-Quantum Cryptography",
    growth_rate: 156,
    market_size: 8500000000,
    trend_direction: "crescendo",
    disruption_probability: 92,
    key_drivers: ["NIST PQC Standards", "Quantum Computing Threat", "Government Mandates"],
    opportunity_window: "Q2 2025 - Q3 2027"
  },
  {
    sector: "GovTech AI Solutions",
    growth_rate: 98,
    market_size: 22000000000,
    trend_direction: "crescendo",
    disruption_probability: 76,
    key_drivers: ["AI in Government Act", "Digital Transformation", "Efficiency Mandates"],
    opportunity_window: "Q1 2025 - Q4 2028"
  }
];

export default function AdvancedMarketIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContract, setSelectedContract] = useState<GovernmentContract | null>(null);
  const [marketAnalysis, setMarketAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAdvancedAnalysis = async (contract: GovernmentContract) => {
    setIsAnalyzing(true);
    setSelectedContract(contract);
    
    try {
      // Simulate advanced AI analysis
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const analysis = {
        competitive_landscape: {
          top_competitors: ["Palantir", "Booz Allen", "CACI", "SAIC"],
          competitive_advantages: [
            "Especialização em compliance regulatório",
            "Experiência com implementations similares", 
            "Partnerships estratégicas",
            "Certificações de segurança"
          ],
          winning_strategy: generateWinningStrategy(contract)
        },
        technical_requirements: {
          core_technologies: ["AI/ML", "Cloud Infrastructure", "APIs", "Security"],
          implementation_complexity: "Alta",
          estimated_timeline: "12-18 meses",
          key_deliverables: generateDeliverables(contract)
        },
        financial_projections: {
          contract_value: contract.value,
          estimated_profit_margin: "25-35%",
          implementation_cost: contract.value * 0.65,
          potential_extensions: "3-5 anos, $50M+ total"
        },
        risk_assessment: {
          technical_risk: "Médio",
          compliance_risk: "Alto", 
          competition_risk: "Médio",
          execution_risk: "Médio-Alto",
          overall_risk_score: 72
        },
        next_steps: generateNextSteps(contract)
      };
      
      setMarketAnalysis(analysis);
      toast.success("🎯 Análise avançada completa!");
      
    } catch (error) {
      toast.error("Erro na análise");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateWinningStrategy = (contract: GovernmentContract) => {
    const strategies = {
      "AI-Powered": "Demonstrar ROI através de case studies + pilot program gratuito",
      "ESG Compliance": "Certificações ESG + partnerships com Big 4 consulting",
      "Quantum-Safe": "Patents + university partnerships + security clearances"
    };
    
    const key = Object.keys(strategies).find(k => contract.title.includes(k)) || "AI-Powered";
    return strategies[key as keyof typeof strategies];
  };

  const generateDeliverables = (contract: GovernmentContract) => {
    return [
      "Sistema core implementado e testado",
      "Documentação completa de compliance",
      "Treinamento de usuários finais",
      "Maintenance & support por 12 meses",
      "Integration com sistemas existentes"
    ];
  };

  const generateNextSteps = (contract: GovernmentContract) => {
    return [
      "Registrar no SAM.gov como government contractor",
      "Obter certificações de segurança necessárias",
      "Formar partnerships estratégicas",
      "Desenvolver proposal winning strategy",
      "Preparar capability statement detalhado"
    ];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case "crescendo": return "text-green-600";
      case "estável": return "text-yellow-600";
      case "declinando": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Search className="h-8 w-8 text-blue-600" />
            Advanced Market Intelligence
          </h1>
          <p className="text-muted-foreground">
            AI-powered analysis de contratos governamentais e tendências B2B
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Crown className="h-3 w-3 mr-1" />
          $50M+ em contratos ativos
        </Badge>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>INTELIGÊNCIA EXCLUSIVA:</strong> Sistema monitora 500+ agências governamentais em tempo real. 
          Detecta oportunidades 60-90 dias antes dos concorrentes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">🏛️ Contratos Governamentais</TabsTrigger>
          <TabsTrigger value="trends">📈 Tendências de Mercado</TabsTrigger>
          <TabsTrigger value="analysis">🧠 Análise Detalhada</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>🎯 Oportunidades Governamentais High-Value</CardTitle>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Mais
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Buscar por palavra-chave</Label>
                    <Input
                      id="search"
                      placeholder="Ex: AI, blockchain, cybersecurity..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {mockGovernmentContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        ${(contract.value / 1000000).toFixed(1)}M
                      </Badge>
                      <Badge variant="outline" className={getScoreColor(contract.ai_match_score)}>
                        Match: {contract.ai_match_score}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {contract.agency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Deadline: {new Date(contract.deadline).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Win Rate: {contract.predicted_win_probability}%
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {contract.compliance_requirements.map((req) => (
                        <Badge key={req} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">NAICS:</span> {contract.naics_code}
                      </div>
                      <div>
                        <span className="font-medium">Set-Aside:</span> {contract.set_aside}
                      </div>
                      <div>
                        <span className="font-medium">Competição:</span> ~{contract.estimated_competition} empresas
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => runAdvancedAnalysis(contract)}
                        disabled={isAnalyzing}
                        className="flex-1"
                      >
                        {isAnalyzing ? (
                          <>
                            <Brain className="h-4 w-4 mr-2 animate-spin" />
                            Analisando...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Análise Avançada
                          </>
                        )}
                      </Button>
                      
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Edital
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4">
            {marketTrends.map((trend, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{trend.sector}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        ${(trend.market_size / 1000000000).toFixed(1)}B mercado
                      </Badge>
                      <Badge variant="outline" className={getTrendColor(trend.trend_direction)}>
                        {trend.growth_rate}% CAGR
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">🚀 Drivers de Crescimento</h4>
                        <ul className="text-sm space-y-1">
                          {trend.key_drivers.map((driver, i) => (
                            <li key={i}>• {driver}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">⏰ Janela de Oportunidade</h4>
                        <p className="text-sm">{trend.opportunity_window}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Disrupção: {trend.disruption_probability}% probabilidade
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Rocket className="h-4 w-4 mr-2" />
                      Explorar Oportunidades neste Setor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {selectedContract && marketAnalysis ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Análise Competitiva: {selectedContract.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">🏆 Principais Competidores</h4>
                      <ul className="space-y-2">
                        {marketAnalysis.competitive_landscape.top_competitors.map((competitor: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            {competitor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">💪 Vantagens Competitivas</h4>
                      <ul className="space-y-2">
                        {marketAnalysis.competitive_landscape.competitive_advantages.map((advantage: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>💰 Projeções Financeiras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Valor do Contrato:</span>
                        <span className="font-bold">${marketAnalysis.financial_projections.contract_value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Margem de Lucro:</span>
                        <span className="font-bold text-green-600">{marketAnalysis.financial_projections.estimated_profit_margin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Custo de Implementação:</span>
                        <span className="font-bold">${marketAnalysis.financial_projections.implementation_cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extensões Potenciais:</span>
                        <span className="font-bold text-purple-600">{marketAnalysis.financial_projections.potential_extensions}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>⚠️ Avaliação de Riscos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(marketAnalysis.risk_assessment).filter(([key]) => key !== 'overall_risk_score').map(([risk, level]) => (
                        <div key={risk} className="flex justify-between">
                          <span className="capitalize">{risk.replace('_', ' ')}:</span>
                          <Badge variant="outline" className={
                            level === "Alto" ? "text-red-600" : 
                            level === "Médio" || level === "Médio-Alto" ? "text-yellow-600" : 
                            "text-green-600"
                          }>
                            {level as string}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>🎯 Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketAnalysis.next_steps.map((step: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Selecione um contrato para análise competitiva detalhada
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}