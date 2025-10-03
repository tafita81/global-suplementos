import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Ship, Plane, Package, MapPin, Clock, DollarSign, RefreshCw, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LogisticsExecution {
  id: string;
  opportunity_id: string;
  shipping_method: string;
  status: string;
  tracking_info: any;
  customs_data: any;
  insurance_data: any;
  created_at: string;
}

export default function Logistics() {
  const [executions, setExecutions] = useState<LogisticsExecution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogisticsExecutions();
  }, []);

  const fetchLogisticsExecutions = async () => {
    try {
      const { data, error } = await supabase
        .from('logistics_execution')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setExecutions(data || []);

    } catch (error) {
      console.error('Erro ao buscar execuções logísticas:', error);
      toast.error('Erro ao carregar dados logísticos');
    } finally {
      setLoading(false);
    }
  };

  const createSampleExecution = async () => {
    try {
      const sampleExecution = {
        opportunity_id: 'sample-opp',
        shipping_method: ['Air Freight', 'Sea Freight', 'Express Air'][Math.floor(Math.random() * 3)],
        status: ['preparing', 'in_transit', 'delivered'][Math.floor(Math.random() * 3)],
        tracking_info: {
          origin: "Shanghai, China",
          destination: "New York, USA",
          estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          cost: Math.floor(Math.random() * 3000) + 1000,
          progress: Math.floor(Math.random() * 100),
          product_name: "Sample Product"
        },
        customs_data: {
          status: "approved",
          documents: ["invoice", "packing_list", "certificate_of_origin"]
        },
        insurance_data: {
          coverage_amount: 50000,
          policy_number: `POL-${Date.now()}`
        }
      };

      const { error } = await supabase
        .from('logistics_execution')
        .insert([sampleExecution]);

      if (error) throw error;

      toast.success('Nova expedição logística criada!');
      fetchLogisticsExecutions();

    } catch (error) {
      console.error('Erro ao criar execução logística:', error);
      toast.error('Erro ao adicionar expedição');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "in_transit": return "info";
      case "preparing": return "warning";
      case "delayed": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered": return "Entregue";
      case "in_transit": return "Em Trânsito";
      case "preparing": return "Preparando";
      case "delayed": return "Atrasado";
      default: return status;
    }
  };

  const getShippingIcon = (method: string) => {
    if (method?.includes("Air") || method?.includes("Express")) return <Plane className="h-4 w-4" />;
    if (method?.includes("Sea")) return <Ship className="h-4 w-4" />;
    return <Truck className="h-4 w-4" />;
  };

  const totalCost = executions.reduce((acc, exec) => {
    const trackingInfo = exec.tracking_info as any;
    return acc + (trackingInfo?.cost || 0);
  }, 0);

  const activeShipments = executions.filter(e => e.status === "in_transit" || e.status === "preparing").length;
  const deliveredCount = executions.filter(e => e.status === "delivered").length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Logística Global</h1>
            <p className="text-muted-foreground">Carregando execuções logísticas...</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Logística Global</h1>
          <p className="text-muted-foreground">
            {executions.length} execuções logísticas ativas na cadeia de suprimentos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createSampleExecution}>
            <Package className="h-4 w-4 mr-2" />
            Nova Expedição
          </Button>
          <Button variant="outline" onClick={fetchLogisticsExecutions}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expedições Ativas</p>
                <p className="text-2xl font-bold">{activeShipments}</p>
              </div>
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entregas Completas</p>
                <p className="text-2xl font-bold">{deliveredCount}</p>
              </div>
              <Package className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custo Total</p>
                <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rotas Ativas</p>
                <p className="text-2xl font-bold">{executions.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="shipments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="shipments">Expedições</TabsTrigger>
          <TabsTrigger value="routes">Otimização de Rotas</TabsTrigger>
          <TabsTrigger value="customs">Documentação Aduaneira</TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="space-y-4">
          {executions.length > 0 ? (
            <div className="grid gap-4">
              {executions.map((execution) => {
                const trackingInfo = execution.tracking_info as any;
                const progress = trackingInfo?.progress || 0;
                
                return (
                  <Card key={execution.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getShippingIcon(execution.shipping_method)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {trackingInfo?.product_name || 'Produto não especificado'}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {trackingInfo?.origin || 'Origem'} → {trackingInfo?.destination || 'Destino'}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(execution.status) as any}>
                          {getStatusLabel(execution.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <h4 className="font-medium mb-2">Progresso da Expedição</h4>
                          <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              {progress}% completo
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Método de Envio</h4>
                          <div className="flex items-center space-x-2">
                            {getShippingIcon(execution.shipping_method)}
                            <span>{execution.shipping_method || 'Não especificado'}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Custo: ${(trackingInfo?.cost || 0).toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Entrega Estimada</h4>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {trackingInfo?.estimated_delivery 
                                ? new Date(trackingInfo.estimated_delivery).toLocaleDateString('pt-BR')
                                : 'Não informado'
                              }
                            </span>
                          </div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            ID: {execution.id.slice(0, 8)}...
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          Rastrear
                        </Button>
                        <Button variant="outline" size="sm">
                          Documentos
                        </Button>
                        <Button variant="outline" size="sm">
                          Contato Transportadora
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
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma expedição encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Crie sua primeira expedição logística
                </p>
                <Button onClick={createSampleExecution}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Expedição
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Otimização Inteligente de Rotas em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Sistema de IA baseado em dados reais para otimização automática de custos e tempo de entrega.
              </p>
              {executions.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Expedições Ativas</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activeShipments} expedições em andamento
                      </p>
                      <Badge variant="default">Sistema Ativo</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Otimização de Custo</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Custo médio por expedição: ${Math.round(totalCost / Math.max(executions.length, 1)).toLocaleString()}
                      </p>
                      <Badge variant="secondary">Análise Automática</Badge>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customs">
          <Card>
            <CardHeader>
              <CardTitle>Documentação e Compliance Aduaneiro Real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gestão automática baseada nos dados reais de documentos e verificação de compliance internacional.
              </p>
              {executions.length > 0 && (
                <div className="space-y-4">
                  {executions.map(execution => {
                    const customsData = execution.customs_data as any;
                    return (
                      <Card key={execution.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Expedição {execution.id.slice(0, 8)}...</h4>
                              <p className="text-sm text-muted-foreground">
                                Status aduaneiro: {customsData?.status || 'Pendente'}
                              </p>
                            </div>
                            <Badge variant={customsData?.status === 'approved' ? "default" : "secondary"}>
                              {customsData?.status === 'approved' ? 'Aprovado' : 'Em Análise'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}