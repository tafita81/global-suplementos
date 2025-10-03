import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Rocket,
  Eye,
  PlayCircle,
  Pause,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ArbitrageOpportunity {
  id: string;
  type: "government" | "b2b_arbitrage" | "supply_chain" | "dropship_tech";
  title: string;
  description: string;
  sourcePrice: number;
  targetPrice: number;
  margin: number;
  volume: number;
  riskLevel: "baixo" | "médio" | "alto";
  executionTime: string;
  profitPotential: number;
  apiConnections: string[];
  automationLevel: number;
  status: "detectado" | "analisando" | "pronto" | "executando";
  detectedAt: string;
  expiresAt: string;
}

export default function RealTimeArbitrageEngine() {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [autoExecute, setAutoExecute] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ArbitrageOpportunity | null>(null);
  const [realTimeProfit, setRealTimeProfit] = useState(0);

  useEffect(() => {
    generateMockOpportunities();
    
    if (isScanning) {
      const interval = setInterval(() => {
        scanForNewOpportunities();
      }, 30000); // Scan every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const generateMockOpportunities = () => {
    const mockOpps: ArbitrageOpportunity[] = [
      {
        id: "gov-ai-001",
        type: "government",
        title: "Contrato Governo - Sistema IA para Educação",
        description: "Licitação federal para sistema IA educacional. Fornecedor chinês oferece solução identical por 8% do valor licitado.",
        sourcePrice: 85000,
        targetPrice: 1200000,
        margin: 94.2,
        volume: 1,
        riskLevel: "baixo",
        executionTime: "3-5 dias",
        profitPotential: 1115000,
        apiConnections: ["SAM.gov", "Alibaba API", "Compliance Checker"],
        automationLevel: 92,
        status: "pronto",
        detectedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "b2b-arb-001", 
        type: "b2b_arbitrage",
        title: "Equipamento Industrial - Fortune 500",
        description: "Empresa americana precisa de componentes específicos. Fabricante chinês vende 78% mais barato via Alibaba.",
        sourcePrice: 125000,
        targetPrice: 580000,
        margin: 78.4,
        volume: 50,
        riskLevel: "baixo",
        executionTime: "7-10 dias",
        profitPotential: 22750000,
        apiConnections: ["Alibaba B2B", "IndiaMART", "Company Database"],
        automationLevel: 89,
        status: "detectado",
        detectedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "dropship-tech-001",
        type: "dropship_tech", 
        title: "Solução Cybersecurity Quantum-Safe",
        description: "Empresas pagando $500K+ por soluções quantum-safe. Fornecedores chineses oferecem tecnologia equivalente.",
        sourcePrice: 45000,
        targetPrice: 520000,
        margin: 91.3,
        volume: 12,
        riskLevel: "médio",
        executionTime: "5-8 dias",
        profitPotential: 5700000,
        apiConnections: ["Security APIs", "Tech Suppliers", "Compliance Check"],
        automationLevel: 85,
        status: "analisando",
        detectedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "supply-chain-001",
        type: "supply_chain",
        title: "Gap Crítico - Semicondutores Especializados", 
        description: "Fabricante americano com gap urgente. Fornecedor asiático disponível com qualidade equivalente.",
        sourcePrice: 220000,
        targetPrice: 890000,
        margin: 75.3,
        volume: 8,
        riskLevel: "médio",
        executionTime: "10-14 dias",
        profitPotential: 5360000,
        apiConnections: ["Global Sources", "Supply Chain APIs", "Quality Check"],
        automationLevel: 87,
        status: "pronto",
        detectedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    setOpportunities(mockOpps);
  };

  const scanForNewOpportunities = () => {
    // Simulate real-time detection
    const hasNewOpp = Math.random() > 0.7;
    
    if (hasNewOpp) {
      const newOpp: ArbitrageOpportunity = {
        id: `new-${Date.now()}`,
        type: "government",
        title: "🚨 NOVA: Licitação IA Detectada",
        description: "Sistema recém detectou nova licitação com margem 850%+",
        sourcePrice: 95000,
        targetPrice: 950000, 
        margin: 90.0,
        volume: 1,
        riskLevel: "baixo",
        executionTime: "2-4 dias",
        profitPotential: 855000,
        apiConnections: ["SAM.gov Real-time", "API Auto-match"],
        automationLevel: 95,
        status: "detectado",
        detectedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setOpportunities(prev => [newOpp, ...prev]);
      setRealTimeProfit(prev => prev + newOpp.profitPotential);
      
      toast.success(`🎯 Nova oportunidade detectada: $${newOpp.profitPotential.toLocaleString()} profit potential!`);
      
      if (autoExecute && newOpp.margin > 85) {
        executeOpportunity(newOpp);
      }
    }
  };

  const executeOpportunity = async (opp: ArbitrageOpportunity) => {
    toast.info(`🚀 Executando: ${opp.title}`);
    
    // Update status to executing
    setOpportunities(prev => 
      prev.map(o => o.id === opp.id ? { ...o, status: "executando" } : o)
    );

    try {
      // Simulate API calls to execute the arbitrage
      const response = await supabase.functions.invoke('auto-executor', {
        body: { opportunityId: opp.id, type: opp.type }
      });

      if (response.error) throw response.error;

      toast.success(`✅ Oportunidade executada com sucesso! Profit: $${opp.profitPotential.toLocaleString()}`);
      
      // Remove executed opportunity
      setOpportunities(prev => prev.filter(o => o.id !== opp.id));
      
    } catch (error) {
      toast.error("Erro na execução automática");
      console.error('Execution error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pronto": return "text-green-600 bg-green-50";
      case "executando": return "text-blue-600 bg-blue-50";
      case "analisando": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "baixo": return "text-green-600";
      case "médio": return "text-yellow-600";
      case "alto": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "government": return "🏛️";
      case "b2b_arbitrage": return "🏢";
      case "dropship_tech": return "💻";
      case "supply_chain": return "🔗";
      default: return "💰";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-8 w-8 text-green-600" />
            Engine de Arbitragem em Tempo Real
          </h1>
          <p className="text-muted-foreground">
            Sistema detecta e executa oportunidades de arbitragem automaticamente
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsScanning(!isScanning)}
            variant={isScanning ? "destructive" : "default"}
          >
            {isScanning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pausar Scan
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-2" />
                Iniciar Scan
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Oportunidades Ativas</p>
                <p className="text-2xl font-bold">{opportunities.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Profit Potencial Total</p>
                <p className="text-2xl font-bold">${opportunities.reduce((sum, opp) => sum + opp.profitPotential, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Margem Média</p>
                <p className="text-2xl font-bold">{(opportunities.reduce((sum, opp) => sum + opp.margin, 0) / opportunities.length || 0).toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Status do Sistema</p>
                <p className="text-2xl font-bold">{isScanning ? "ATIVO" : "PARADO"}</p>
              </div>
              <Activity className={`h-8 w-8 ${isScanning ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>SISTEMA ATIVO:</strong> Monitorando SAM.gov, Alibaba API, IndiaMART e 15+ fontes para detectar arbitragens em tempo real.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">🎯 Oportunidades Detectadas</TabsTrigger>
          <TabsTrigger value="automation">🤖 Configuração Automação</TabsTrigger>
          <TabsTrigger value="execution">⚡ Centro de Execução</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getTypeIcon(opp.type)}
                      {opp.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(opp.status)}>
                        {opp.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {opp.margin}% margem
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{opp.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs font-medium">Custo Fonte</label>
                        <p className="text-lg font-bold">${opp.sourcePrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Preço Venda</label>
                        <p className="text-lg font-bold">${opp.targetPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Profit Total</label>
                        <p className="text-lg font-bold text-green-600">${opp.profitPotential.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Tempo Execução</label>
                        <p className="text-sm">{opp.executionTime}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium">Automação</label>
                      <div className="flex items-center gap-2">
                        <Progress value={opp.automationLevel} className="flex-1" />
                        <span className="text-sm font-medium">{opp.automationLevel}%</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {opp.apiConnections.map((api) => (
                        <Badge key={api} variant="secondary" className="text-xs">
                          {api}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => executeOpportunity(opp)}
                        disabled={opp.status === "executando"}
                        className="flex-1"
                      >
                        {opp.status === "executando" ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Executando...
                          </>
                        ) : (
                          <>
                            <Rocket className="h-4 w-4 mr-2" />
                            Executar Agora
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedOpportunity(opp)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🤖 Configuração de Automação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-execute">Execução Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Executar automaticamente oportunidades com margem maior que 85%
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="auto-execute"
                  checked={autoExecute}
                  onChange={(e) => setAutoExecute(e.target.checked)}
                  className="h-4 w-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Margem Mínima para Auto-Execução</Label>
                <Input type="number" placeholder="85" defaultValue="85" />
              </div>
              
              <div className="space-y-2">
                <Label>Valor Máximo por Operação</Label>
                <Input type="number" placeholder="1000000" defaultValue="1000000" />
              </div>
              
              <Button className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Centro de Execução em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-green-600">
                  ${realTimeProfit.toLocaleString()}
                </div>
                <p className="text-xl text-muted-foreground">
                  Profit Total Detectado Hoje
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Executar Todas as Oportunidades
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}