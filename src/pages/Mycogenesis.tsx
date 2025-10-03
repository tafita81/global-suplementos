import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, TrendingUp, Globe, Beaker, Target, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MycogenesisProduct {
  id: string;
  name: string;
  category: string;
  production_status: string;
  target_markets: string[];
  market_analysis: any;
  formula: any;
  viral_campaigns: any;
  created_at: string;
}

export default function Mycogenesis() {
  const [products, setProducts] = useState<MycogenesisProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('mycogenesis_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProducts(data || []);

    } catch (error) {
      console.error('Erro ao buscar produtos Mycogenesis:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const createSampleProduct = async () => {
    try {
      const sampleProduct = {
        name: `Produto Mycogenesis ${Date.now()}`,
        category: "Cognitive Enhancement",
        production_status: "development",
        target_markets: ["USA", "EU", "Brazil"],
        market_analysis: {
          potential_score: Math.floor(Math.random() * 40) + 60,
          competition_level: "medium",
          market_size: "$2.5B"
        },
        formula: {
          active_ingredients: ["Reishi", "Lion's Mane"],
          concentration: "500mg per capsule"
        },
        viral_campaigns: {
          active: false,
          platforms: ["Instagram", "TikTok"],
          reach: 0
        }
      };

      const { error } = await supabase
        .from('mycogenesis_products')
        .insert([sampleProduct]);

      if (error) throw error;

      toast.success('Novo produto Mycogenesis criado!');
      fetchProducts();

    } catch (error) {
      console.error('Erro ao criar produto:', error);
      toast.error('Erro ao adicionar produto');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production": return "success";
      case "active": return "success";
      case "development": return "warning";
      case "research": return "info";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "production": return "Produção";
      case "active": return "Ativo";
      case "development": return "Desenvolvimento";
      case "research": return "Pesquisa";
      default: return status;
    }
  };

  const getMarketPotentialColor = (potential: number) => {
    if (potential >= 80) return "text-success";
    if (potential >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  const getProgressFromStatus = (status: string) => {
    switch (status) {
      case "production": return 100;
      case "active": return 100;
      case "development": return 75;
      case "research": return 45;
      default: return 0;
    }
  };

  const statusCounts = {
    production: products.filter(p => p.production_status === 'production' || p.production_status === 'active').length,
    development: products.filter(p => p.production_status === 'development').length,
    totalMarkets: products.reduce((acc, p) => acc + (p.target_markets?.length || 0), 0)
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Produtos Mycogenesis</h1>
            <p className="text-muted-foreground">Carregando portfolio...</p>
          </div>
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos Mycogenesis</h1>
          <p className="text-muted-foreground">
            {products.length} produtos inovadores com cogumelos funcionais
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createSampleProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
          <Button variant="outline" onClick={fetchProducts}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Produção</p>
                <p className="text-2xl font-bold">{statusCounts.production}</p>
              </div>
              <Package className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Desenvolvimento</p>
                <p className="text-2xl font-bold">{statusCounts.development}</p>
              </div>
              <Beaker className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mercados Alvo</p>
                <p className="text-2xl font-bold">{statusCounts.totalMarkets}</p>
              </div>
              <Globe className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {products.length > 0 ? (
            <div className="grid gap-6">
              {products.map((product) => {
                const marketPotential = product.market_analysis?.potential_score || 75;
                const progress = getProgressFromStatus(product.production_status);
                
                return (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg">
                            <Package className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{product.name}</CardTitle>
                            <p className="text-muted-foreground">{product.category || 'Categoria não especificada'}</p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(product.production_status) as any}>
                          {getStatusLabel(product.production_status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        <div>
                          <h4 className="font-medium mb-2">Progresso de Desenvolvimento</h4>
                          <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              {progress}% completo
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Potencial de Mercado</h4>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={`h-4 w-4 ${getMarketPotentialColor(marketPotential)}`} />
                            <span className={`font-semibold ${getMarketPotentialColor(marketPotential)}`}>
                              {marketPotential}%
                            </span>
                            <Badge 
                              variant={marketPotential >= 80 ? "default" : 
                                      marketPotential >= 60 ? "outline" : "secondary"}
                              className="text-xs"
                            >
                              {marketPotential >= 80 ? "Alto" : 
                               marketPotential >= 60 ? "Médio" : "Baixo"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Mercados Alvo</h4>
                          <div className="flex flex-wrap gap-1">
                            {(product.target_markets || ["Global"]).map((market) => (
                              <Badge key={market} variant="outline" className="text-xs">
                                {market}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="h-4 w-4 mr-2" />
                          Análise de Mercado
                        </Button>
                        <Button variant="outline" size="sm">
                          Campanha Viral
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum produto Mycogenesis encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Crie seu primeiro produto inovador com cogumelos funcionais
                </p>
                <Button onClick={createSampleProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Produto
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Performance em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Dashboards detalhados baseados em dados reais de performance dos produtos.
              </p>
              {products.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Produtos Ativos</h4>
                      <p className="text-2xl font-bold text-success">{statusCounts.production}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((statusCounts.production / products.length) * 100)}% do portfolio
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Em Desenvolvimento</h4>
                      <p className="text-2xl font-bold text-warning">{statusCounts.development}</p>
                      <p className="text-sm text-muted-foreground">
                        Pipeline de inovação
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Virais Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Estratégias de marketing viral baseadas em dados reais dos produtos.
              </p>
              {products.length > 0 ? (
                <div className="space-y-4">
                  {products.map(product => {
                    const campaigns = product.viral_campaigns as any;
                    return (
                      <Card key={product.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Status: {campaigns?.active ? 'Campanha Ativa' : 'Aguardando Lançamento'}
                              </p>
                            </div>
                            <Badge variant={campaigns?.active ? "default" : "secondary"}>
                              {campaigns?.active ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">Crie produtos para ver campanhas virais aqui</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}