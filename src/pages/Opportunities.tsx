import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Eye, TrendingUp, Globe, Package, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  created_at: string;
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setOpportunities(data || []);

    } catch (error) {
      console.error('Erro ao buscar oportunidades:', error);
      toast.error('Erro ao carregar oportunidades');
    } finally {
      setLoading(false);
    }
  };

  const triggerNewDetection = async () => {
    setLoading(true);
    try {
      toast.info("🔍 Iniciando nova detecção de oportunidades...");
      
      const { data, error } = await supabase.functions.invoke('opportunity-detector', {
        body: { 
          categories: ['electronics', 'health-supplements', 'industrial'],
          auto_analyze: true 
        }
      });
      
      if (error) throw error;
      
      toast.success(`✅ ${data?.summary?.viable_found || 0} novas oportunidades detectadas!`);
      
      // Recarregar dados após detecção
      setTimeout(() => {
        fetchOpportunities();
      }, 2000);
      
    } catch (error) {
      console.error('Erro na detecção:', error);
      toast.error("❌ Erro na detecção de oportunidades");
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

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = (opp.product_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (opp.target_country || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Oportunidades</h1>
            <p className="text-muted-foreground">Carregando oportunidades reais...</p>
          </div>
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Oportunidades</h1>
          <p className="text-muted-foreground">
            {opportunities.length} oportunidades detectadas pelo sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={triggerNewDetection} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            Detectar Novas
          </Button>
          <Button variant="outline" onClick={fetchOpportunities}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por produto ou país..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="analyzing">Analisando</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="executing">Executando</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="B2B">B2B</SelectItem>
                <SelectItem value="B2C">B2C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {opportunity.source === "sam_gov" || opportunity.type === "B2B" ? (
                        <Package className="h-6 w-6 text-primary" />
                      ) : (
                        <Globe className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {opportunity.product_name || 'Produto não especificado'}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{opportunity.target_country || 'País não especificado'}</span>
                        <span>•</span>
                        <span>Fonte: {opportunity.source || 'N/A'}</span>
                        <span>•</span>
                        <span className={getRiskColor(opportunity.risk_score || 0)}>
                          Risco: {opportunity.risk_score || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ${(opportunity.estimated_value || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-success flex items-center justify-end">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {opportunity.margin_percentage || 0}% margem
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={opportunity.type === "B2B" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {opportunity.type || 'N/A'}
                      </Badge>
                      <Badge variant={getStatusColor(opportunity.status) as any}>
                        {getStatusText(opportunity.status)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Analisar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma oportunidade encontrada</h3>
              <p className="text-muted-foreground mb-4">
                {opportunities.length === 0 
                  ? "Execute o detector para buscar novas oportunidades"
                  : "Tente ajustar os filtros para ver mais resultados"
                }
              </p>
              <Button onClick={triggerNewDetection}>
                <Plus className="h-4 w-4 mr-2" />
                Detectar Oportunidades Agora
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}