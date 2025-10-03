import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, Globe, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Opportunity {
  id: string;
  type: string;
  product_name: string;
  target_country: string;
  estimated_value: number;
  margin_percentage: number;
  status: string;
  risk_score: number;
  source: string;
}

export function RecentOpportunities() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealOpportunities();
  }, []);

  const fetchRealOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        setOpportunities(data);
      } else {
        // Se não há dados reais, mostrar mensagem informativa
        setOpportunities([]);
      }

    } catch (error) {
      console.error('Erro ao buscar oportunidades reais:', error);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "success";
      case "analyzing": return "warning";
      case "executing": return "info";
      case "rejected": return "destructive";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 20) return "text-success";
    if (risk <= 40) return "text-warning";
    return "text-destructive";
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "approved": return "Aprovado";
      case "analyzing": return "Analisando";
      case "executing": return "Executando";
      case "rejected": return "Rejeitado";
      default: return status;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando Oportunidades...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Oportunidades Recentes</CardTitle>
          <CardDescription>
            {opportunities.length > 0 
              ? `${opportunities.length} oportunidades detectadas pelo sistema`
              : "Aguardando detecção de oportunidades"
            }
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/opportunities")}
        >
          Ver Todas
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {opportunity.type === "B2B" || opportunity.source === "sam_gov" ? (
                    <Package className="h-4 w-4 text-primary" />
                  ) : (
                    <Globe className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{opportunity.product_name || 'Produto não especificado'}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{opportunity.target_country || 'País não especificado'}</span>
                    <span>•</span>
                    <span className={getRiskColor(opportunity.risk_score || 0)}>
                      Risco: {opportunity.risk_score || 0}%
                    </span>
                    <span>•</span>
                    <span>Fonte: {opportunity.source || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium">
                    ${(opportunity.estimated_value || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-success flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {opportunity.margin_percentage || 0}% margem
                  </div>
                </div>
                <Badge variant={getStatusColor(opportunity.status) as any}>
                  {getStatusText(opportunity.status)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nenhuma oportunidade detectada</p>
            <p className="text-sm">Execute o detector de oportunidades para ver dados reais aqui</p>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/')}
            >
              Detectar Oportunidades Agora
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}