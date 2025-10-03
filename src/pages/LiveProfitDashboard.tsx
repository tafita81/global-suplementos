import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Target,
  Clock,
  CreditCard,
  Globe,
  Activity,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Wallet,
  Banknote
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfitData {
  timestamp: string;
  amount: number;
  source: string;
  type: "contract_payment" | "arbitrage_profit" | "commission" | "bonus";
  status: "pending" | "processing" | "completed";
}

interface LiveMetrics {
  totalToday: number;
  totalWeek: number;
  totalMonth: number;
  activeContracts: number;
  pendingPayments: number;
  averageMargin: number;
  profitVelocity: number; // $/hour
}

export default function LiveProfitDashboard() {
  const [profits, setProfits] = useState<ProfitData[]>([]);
  const [metrics, setMetrics] = useState<LiveMetrics>({
    totalToday: 0,
    totalWeek: 0,
    totalMonth: 0,
    activeContracts: 0,
    pendingPayments: 0,
    averageMargin: 0,
    profitVelocity: 0
  });
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    initializeProfitData();
    startLiveUpdates();
  }, []);

  const initializeProfitData = () => {
    const mockProfits: ProfitData[] = [
      {
        timestamp: new Date().toISOString(),
        amount: 2840000,
        source: "Department of Education - AI System",
        type: "contract_payment",
        status: "completed"
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        amount: 6750000,
        source: "Tesla Manufacturing - Supply Chain",
        type: "arbitrage_profit", 
        status: "processing"
      },
      {
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        amount: 1200000,
        source: "Microsoft Azure - Quantum Security",
        type: "commission",
        status: "completed"
      },
      {
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        amount: 890000,
        source: "Defense Contract - IoT Solutions", 
        type: "contract_payment",
        status: "pending"
      },
      {
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        amount: 3400000,
        source: "Supply Chain Arbitrage - Auto Parts",
        type: "arbitrage_profit",
        status: "completed"
      }
    ];

    setProfits(mockProfits);
    
    const totalToday = mockProfits.reduce((sum, p) => sum + p.amount, 0);
    setMetrics({
      totalToday,
      totalWeek: totalToday * 1.8,
      totalMonth: totalToday * 6.2,
      activeContracts: 12,
      pendingPayments: 3,
      averageMargin: 86.4,
      profitVelocity: totalToday / 24 // $/hour
    });
  };

  const startLiveUpdates = () => {
    const interval = setInterval(() => {
      // Simular novos lucros chegando
      if (Math.random() > 0.85) {
        addNewProfit();
      }
      
      // Atualizar métricas
      updateLiveMetrics();
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  };

  const addNewProfit = () => {
    const newProfit: ProfitData = {
      timestamp: new Date().toISOString(),
      amount: Math.floor(Math.random() * 5000000) + 500000,
      source: `🚨 NOVO: ${getRandomSource()}`,
      type: getRandomType(),
      status: "completed"
    };

    setProfits(prev => [newProfit, ...prev.slice(0, 9)]);
    setMetrics(prev => ({
      ...prev,
      totalToday: prev.totalToday + newProfit.amount,
      profitVelocity: (prev.totalToday + newProfit.amount) / 24
    }));
  };

  const getRandomSource = () => {
    const sources = [
      "NASA - Quantum Computing",
      "Amazon AWS - Cloud Infrastructure", 
      "Google Cloud - AI Services",
      "Department of Defense - Security",
      "Ford Motor - EV Components",
      "Boeing - Aerospace Tech",
      "Meta - VR Hardware",
      "Apple - Supply Chain"
    ];
    return sources[Math.floor(Math.random() * sources.length)];
  };

  const getRandomType = (): ProfitData['type'] => {
    const types: ProfitData['type'][] = ["contract_payment", "arbitrage_profit", "commission", "bonus"];
    return types[Math.floor(Math.random() * types.length)];
  };

  const updateLiveMetrics = () => {
    setMetrics(prev => ({
      ...prev,
      activeContracts: prev.activeContracts + (Math.random() > 0.9 ? 1 : 0),
      pendingPayments: Math.max(0, prev.pendingPayments + (Math.random() > 0.8 ? 1 : -1))
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract_payment": return <Banknote className="h-4 w-4" />;
      case "arbitrage_profit": return <TrendingUp className="h-4 w-4" />;
      case "commission": return <Wallet className="h-4 w-4" />;
      case "bonus": return <Zap className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "processing": return "text-blue-600 bg-blue-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-8 w-8 text-green-600" />
            Dashboard de Lucros em Tempo Real
          </h1>
          <p className="text-muted-foreground">
            Acompanhamento em tempo real dos lucros gerados automaticamente
          </p>
        </div>
        <Badge className={`px-4 py-2 ${isLive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          {isLive ? 'LIVE' : 'OFFLINE'}
        </Badge>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Lucro Hoje</p>
                <p className="text-3xl font-bold text-green-700">
                  ${metrics.totalToday.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +{((metrics.totalToday / metrics.totalWeek) * 100).toFixed(1)}% vs ontem
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Lucro Semanal</p>
                <p className="text-3xl font-bold text-blue-700">
                  ${metrics.totalWeek.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Tendência crescente
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Velocidade $/h</p>
                <p className="text-3xl font-bold text-purple-700">
                  ${Math.floor(metrics.profitVelocity).toLocaleString()}
                </p>
                <p className="text-xs text-purple-600">Por hora em média</p>
              </div>
              <Zap className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Margem Média</p>
                <p className="text-3xl font-bold text-orange-700">
                  {metrics.averageMargin}%
                </p>
                <p className="text-xs text-orange-600">{metrics.activeContracts} contratos ativos</p>
              </div>
              <Target className="h-12 w-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Feed de Lucros em Tempo Real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {profits.map((profit, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      {getTypeIcon(profit.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{profit.source}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(profit.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      +${profit.amount.toLocaleString()}
                    </p>
                    <Badge className={getStatusColor(profit.status)} variant="secondary">
                      {profit.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Estatísticas Avançadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Eficiência Diária</span>
                <span className="text-sm font-bold">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Contratos Executados</span>
                <span className="text-sm font-bold">87.5%</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Taxa de Sucesso</span>
                <span className="text-sm font-bold">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{metrics.activeContracts}</p>
                <p className="text-xs text-blue-600">Contratos Ativos</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{metrics.pendingPayments}</p>
                <p className="text-xs text-yellow-600">Pagamentos Pendentes</p>
              </div>
            </div>

            <Button className="w-full mt-4" variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Ver Relatório Completo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2">
              <CreditCard className="h-6 w-6" />
              Sacar Lucros
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Target className="h-6 w-6" />
              Acelerar Contratos
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="h-6 w-6" />
              Análise Detalhada
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}