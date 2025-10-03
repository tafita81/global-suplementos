import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Globe, 
  Shield, 
  Settings, 
  BarChart3,
  Users,
  Rocket,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function QuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "detect-opportunities",
      title: "Detectar Oportunidades",
      description: "Scan mercados globais para novas oportunidades",
      icon: Target,
      color: "bg-blue-500",
      action: async () => {
        toast.info("🔍 Iniciando detecção de oportunidades...");
        try {
          const { data, error } = await supabase.functions.invoke('opportunity-detector', {
            body: { categories: ['health-supplements', 'functional-foods'] }
          });
          if (error) throw error;
          toast.success(`✅ ${data.summary?.viable_found || 0} oportunidades detectadas!`);
        } catch (error) {
          toast.error("❌ Erro na detecção");
        }
      }
    },
    {
      id: "market-analysis",
      title: "Análise de Mercado",
      description: "IA avançada para análise de tendências",
      icon: TrendingUp,
      color: "bg-green-500",
      action: () => navigate("/market-intelligence")
    },
    {
      id: "compliance-check",
      title: "Verificação de Compliance",
      description: "Auditoria automática de regulamentações",
      icon: Shield,
      color: "bg-orange-500",
      action: () => navigate("/compliance")
    },
    {
      id: "logistics-optimizer",
      title: "Otimizar Logística",
      description: "Calculadora de rotas e custos globais",
      icon: Globe,
      color: "bg-purple-500",
      action: () => navigate("/logistics")
    },
    {
      id: "profit-dashboard",
      title: "Dashboard de Lucros",
      description: "Análise em tempo real de rentabilidade",
      icon: BarChart3,
      color: "bg-indigo-500",
      action: () => navigate("/live-profit")
    },
    {
      id: "auto-execution",
      title: "Execução Automática",
      description: "Ativar piloto automático para negócios",
      icon: Rocket,
      color: "bg-red-500",
      action: () => navigate("/auto-execution")
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Ações Rápidas
        </CardTitle>
        <CardDescription>
          Ferramentas poderosas para maximizar seus lucros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex-col items-start gap-3 hover:shadow-lg transition-all duration-200"
              onClick={action.action}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`${action.color} p-2 rounded-lg`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{action.title}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-left w-full">
                {action.description}
              </p>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">Dica Pro</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Use a "Execução Automática" para deixar o sistema funcionar 24/7 
            detectando e executando oportunidades de arbitragem automaticamente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}