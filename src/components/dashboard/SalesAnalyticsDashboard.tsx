import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Mail,
  Users,
  Calendar,
  DollarSign,
  Target,
  Clock,
  Send,
  Eye,
  Reply,
  Handshake,
  CheckCircle2,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface SalesMetric {
  date: string;
  metric_name: string;
  metric_value: number;
  breakdown: any;
}

interface EmailSequence {
  id: string;
  stage: string;
  scheduled_for: string;
  status: string;
  template_name: string;
}

interface EmailAnalytic {
  action: string;
  details: any;
  timestamp: string;
}

export default function SalesAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<SalesMetric[]>([]);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [analytics, setAnalytics] = useState<EmailAnalytic[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [dashboardStats, setDashboardStats] = useState({
    totalSent: 0,
    openRate: 0,
    responseRate: 0,
    meetingRate: 0,
    closeRate: 0,
    avgDealValue: 0,
    pendingFollowUps: 0,
    dealsInPipeline: 0
  });

  useEffect(() => {
    loadSalesMetrics();
    loadEmailSequences();
    loadEmailAnalytics();
  }, []);

  const loadSalesMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('sales_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);

      if (error) throw error;
      if (data) {
        setMetrics(data);
        calculateDashboardStats(data);
      }
    } catch (error: any) {
      console.error('Error loading sales metrics:', error);
    }
  };

  const loadEmailSequences = async () => {
    try {
      const { data, error } = await supabase
        .from('email_sequences')
        .select('*')
        .order('scheduled_for', { ascending: true })
        .limit(20);

      if (error) throw error;
      if (data) setSequences(data);
    } catch (error: any) {
      console.error('Error loading email sequences:', error);
    }
  };

  const loadEmailAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('email_analytics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;
      if (data) setAnalytics(data);
    } catch (error: any) {
      console.error('Error loading email analytics:', error);
    }
  };

  const calculateDashboardStats = (metricsData: SalesMetric[]) => {
    const latest = metricsData.reduce((acc, metric) => {
      if (!acc[metric.metric_name] || metric.date > acc[metric.metric_name].date) {
        acc[metric.metric_name] = metric;
      }
      return acc;
    }, {} as Record<string, SalesMetric>);

    const totalSent = latest.emails_sent?.metric_value || 0;
    const totalOpened = latest.emails_opened?.metric_value || 0;
    const totalResponses = latest.responses_received?.metric_value || 0;
    const totalMeetings = latest.meetings_scheduled?.metric_value || 0;
    const totalDeals = latest.deals_closed?.metric_value || 0;
    const totalValue = latest.deals_closed?.breakdown?.total_value || 0;

    setDashboardStats({
      totalSent,
      openRate: totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0,
      responseRate: totalSent > 0 ? Math.round((totalResponses / totalSent) * 100) : 0,
      meetingRate: totalSent > 0 ? Math.round((totalMeetings / totalSent) * 100) : 0,
      closeRate: totalSent > 0 ? Math.round((totalDeals / totalSent) * 100) : 0,
      avgDealValue: totalDeals > 0 ? Math.round(totalValue / totalDeals) : 0,
      pendingFollowUps: sequences.filter(s => s.status === 'scheduled').length,
      dealsInPipeline: totalMeetings - totalDeals
    });
  };

  const processScheduledEmails = async () => {
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('email-automation', {
        body: { action: 'process_scheduled_emails' }
      });

      if (error) throw error;

      toast({
        title: "Emails Processados",
        description: `${data.processed} emails de follow-up enviados automaticamente.`,
      });

      // Recarregar dados
      await loadEmailSequences();
      await loadEmailAnalytics();
      
    } catch (error: any) {
      console.error('Error processing emails:', error);
      toast({
        title: "Erro no Processamento",
        description: "Falha ao processar emails agendados.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Preparar dados para gráficos
  const chartData = metrics
    .filter(m => ['emails_sent', 'responses_received', 'meetings_scheduled', 'deals_closed'].includes(m.metric_name))
    .reduce((acc, metric) => {
      const existing = acc.find(item => item.date === metric.date);
      if (existing) {
        existing[metric.metric_name] = metric.metric_value;
      } else {
        acc.push({
          date: metric.date,
          [metric.metric_name]: metric.metric_value
        });
      }
      return acc;
    }, [] as any[])
    .slice(0, 14)
    .reverse();

  const conversionFunnelData = [
    { name: 'Emails Enviados', value: dashboardStats.totalSent, color: '#3B82F6' },
    { name: 'Emails Abertos', value: Math.round(dashboardStats.totalSent * dashboardStats.openRate / 100), color: '#10B981' },
    { name: 'Respostas Recebidas', value: Math.round(dashboardStats.totalSent * dashboardStats.responseRate / 100), color: '#F59E0B' },
    { name: 'Reuniões Agendadas', value: Math.round(dashboardStats.totalSent * dashboardStats.meetingRate / 100), color: '#EF4444' },
    { name: 'Negócios Fechados', value: Math.round(dashboardStats.totalSent * dashboardStats.closeRate / 100), color: '#8B5CF6' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Analytics de Vendas B2B</h2>
          <p className="text-muted-foreground">
            Performance detalhada das campanhas de email e conversões
          </p>
        </div>
        <Button 
          onClick={processScheduledEmails} 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Processar Follow-ups
            </>
          )}
        </Button>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {dashboardStats.openRate}%
            </div>
            <Progress value={dashboardStats.openRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(dashboardStats.totalSent * dashboardStats.openRate / 100)} de {dashboardStats.totalSent} enviados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <Reply className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {dashboardStats.responseRate}%
            </div>
            <Progress value={dashboardStats.responseRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(dashboardStats.totalSent * dashboardStats.responseRate / 100)} respostas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Reuniões</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {dashboardStats.meetingRate}%
            </div>
            <Progress value={dashboardStats.meetingRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(dashboardStats.totalSent * dashboardStats.meetingRate / 100)} reuniões agendadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Fechamento</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {dashboardStats.closeRate}%
            </div>
            <Progress value={dashboardStats.closeRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              ${dashboardStats.avgDealValue.toLocaleString()} valor médio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
          <TabsTrigger value="sequences">Email Sequences</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Tab Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Atividade (14 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="emails_sent" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="responses_received" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="meetings_scheduled" stroke="#F59E0B" strokeWidth={2} />
                    <Line type="monotone" dataKey="deals_closed" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Follow-ups Pendentes</span>
                  <Badge variant="outline">{dashboardStats.pendingFollowUps}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Negócios no Pipeline</span>
                  <Badge variant="outline">{dashboardStats.dealsInPipeline}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Reuniões Esta Semana</span>
                  <Badge variant="outline">
                    {sequences.filter(s => 
                      s.status === 'scheduled' && 
                      new Date(s.scheduled_for) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    ).length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Valor Total Pipeline</span>
                  <Badge className="bg-green-500">
                    ${(dashboardStats.dealsInPipeline * dashboardStats.avgDealValue).toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Funil de Conversão */}
        <TabsContent value="funnel" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
                <CardDescription>
                  Jornada completa do lead até o fechamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={conversionFunnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Conversões</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={conversionFunnelData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {conversionFunnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  {conversionFunnelData.map((item, index) => (
                    <div key={item.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Email Sequences */}
        <TabsContent value="sequences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Follow-ups Agendados</CardTitle>
              <CardDescription>
                {sequences.filter(s => s.status === 'scheduled').length} emails programados para envio automático
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sequences.slice(0, 15).map((seq) => (
                  <div key={seq.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-semibold">{seq.template_name}</div>
                      <div className="text-sm text-muted-foreground">
                        Estágio: {seq.stage.replace('_', ' ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {new Date(seq.scheduled_for).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(seq.scheduled_for).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    <Badge 
                      variant={seq.status === 'scheduled' ? 'default' : 'secondary'}
                    >
                      {seq.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Performance */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Emails Enviados</span>
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">+12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Abertura</span>
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">+5.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Resposta</span>
                    <div className="flex items-center gap-1">
                      <ArrowDown className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">-2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Templates Mais Eficazes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Initial Contact</span>
                    <Badge>15.5% conversão</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Follow-up 2</span>
                    <Badge>12.8% conversão</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Follow-up 1</span>
                    <Badge>8.2% conversão</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximas Ações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">3 reuniões hoje</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-500" />
                    <span className="text-sm">8 follow-ups programados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">5 propostas enviadas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}