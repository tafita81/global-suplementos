import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CantonFairTracker } from '@/components/dashboard/CantonFairTracker';
import { CantonFairStrategy } from '@/components/dashboard/CantonFairStrategy';
import { ArrowLeft, ExternalLink, Globe, Calendar, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CantonFairDashboard() {
  const quickLinks = [
    {
      title: "Canton Fair Online Platform",
      description: "Acesse RFQs e compradores verificados",
      url: "https://www.cantonfair.org.cn/en-US/Online",
      icon: Globe,
      status: "Ativo"
    },
    {
      title: "RFQ Marketplace",
      description: "Monitore pedidos de compradores globais",
      url: "https://www.cantonfair.org.cn/en-US/Online/TradeServices/RFQ",
      icon: Target,
      status: "Novo"
    },
    {
      title: "Buyer Directory",
      description: "Lista de compradores por categoria",
      url: "https://www.cantonfair.org.cn/en-US/Online/TradeServices/BuyerDirectory",
      icon: CheckCircle2,
      status: "Verificado"
    }
  ];

  const nextSteps = [
    {
      step: 1,
      title: "Verificar Email de Confirmação",
      description: "Check seu email para ativar a conta Canton Fair",
      completed: true
    },
    {
      step: 2,
      title: "Completar Perfil da Empresa",
      description: "Adicione logo, certificações e produtos de interesse",
      completed: false
    },
    {
      step: 3,
      title: "Configurar Alertas de RFQ",
      description: "Receba notificações para produtos do seu nicho",
      completed: false
    },
    {
      step: 4,
      title: "Responder Primeira RFQ",
      description: "Use nosso template para responder uma oportunidade",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Canton Fair Dashboard</h1>
              <p className="text-muted-foreground">Gerencie suas oportunidades da maior feira B2B do mundo</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-white gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Cadastrado
          </Badge>
        </div>

        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">🎉 Cadastro Realizado com Sucesso!</h3>
                <p className="text-green-700 text-sm mt-1">
                  <strong>Buyer ID:</strong> 138432533908 | <strong>Empresa:</strong> CONSULTORIA EM TECNOLOGIA DA INFORMAÇÃO CORP<br/>
                  <strong>Endereço:</strong> 6200 Metrowest Blvd, 201 G, Orlando, Florida<br/>
                  Agora você pode acessar fornecedores verificados 24/7 e ganhar dinheiro com B2B imediatamente!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credibility Badge */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-600 text-white text-xs">ID: 138432533908</Badge>
              <div>
                <h3 className="font-semibold text-blue-800">🏆 Use seu Buyer ID para Credibilidade Instantânea</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Sempre mencione "Sou comprador registrado na Canton Fair (ID: 138432533908)" ao contatar fornecedores.
                  Isso aumenta sua credibilidade e melhora taxas de resposta em +70%.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <link.icon className="h-6 w-6 text-primary" />
                  <Badge variant={link.status === 'Ativo' ? 'default' : link.status === 'Novo' ? 'destructive' : 'secondary'}>
                    {link.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button 
                  asChild 
                  className="w-full gap-2"
                  variant={index === 0 ? 'default' : 'outline'}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Acessar Plataforma
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Passos (Primeiros 7 Dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-4 p-3 rounded-lg border">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? '✓' : step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${step.completed ? 'text-green-700 line-through' : 'text-foreground'}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Canton Fair Strategy */}
        <CantonFairStrategy />

        {/* Canton Fair Tracker */}
        <CantonFairTracker />

        {/* Tips Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              💡 Dicas para Maximizar Resultados
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 space-y-2 text-sm">
            <p><strong>✅ Check RFQs diariamente:</strong> Novas oportunidades são postadas constantemente</p>
            <p><strong>📧 Responda rapidamente:</strong> Compradores B2B valorizam agilidade na resposta</p>
            <p><strong>📋 Use nosso template:</strong> Email profissional aumenta taxa de resposta em 300%</p>
            <p><strong>🎯 Foque no nicho:</strong> Especialize-se em 2-3 categorias de produtos</p>
            <p><strong>📊 Acompanhe métricas:</strong> Use este dashboard para monitorar progresso</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}