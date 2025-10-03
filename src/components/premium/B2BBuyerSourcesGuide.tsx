import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Mail, Search, Target, Users, Zap, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function B2BBuyerSourcesGuide() {
  const [activeTab, setActiveTab] = useState("platforms");
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para área de transferência`,
    });
  };

  const platforms = [
    {
      category: "Plataformas de Comércio Global B2B",
      icon: <Globe className="h-5 w-5" />,
      items: [
        {
          name: "Alibaba.com RFQ Marketplace",
          description: "Monitore RFQs globais com especificações, volumes e prazos",
          url: "https://rfq.alibaba.com",
          features: ["RFQs públicas", "Compradores verificados", "Filtros por país"]
        },
        {
          name: "Global Sources",
          description: "Eletrônicos, hardware e produtos industriais",
          url: "https://www.globalsources.com",
          features: ["Buying leads", "Eventos virtuais B2B", "Verificação de fornecedores"]
        },
        {
          name: "ThomasNet.com",
          description: "Indústria, manufatura e MRO norte-americano",
          url: "https://www.thomasnet.com",
          features: ["RFQs industriais", "Fornecedores certificados", "Especificações técnicas"]
        },
        {
          name: "Kompass",
          description: "Banco de dados global com filtros por setor e país",
          url: "https://www.kompass.com",
          features: ["Diretório empresarial", "Filtros avançados", "Dados de contato"]
        }
      ]
    },
    {
      category: "Serviços Governamentais e Exportação",
      icon: <Target className="h-5 w-5" />,
      items: [
        {
          name: "Export.gov - Gold Key Service",
          description: "Conecta empresas a compradores pré-verificados",
          url: "https://www.export.gov",
          features: ["Relatórios de mercado", "Compradores verificados", "Assistência governamental"]
        },
        {
          name: "Trade.gov - International Buyer Program",
          description: "Delegações de compradores internacionais",
          url: "https://www.trade.gov",
          features: ["Matchmaking oficial", "Eventos governamentais", "Suporte técnico"]
        }
      ]
    },
    {
      category: "Feiras Virtuais e Físicas com Matchmaking",
      icon: <Calendar className="h-5 w-5" />,
      items: [
        {
          name: "CES Matchmaking (Las Vegas)",
          description: "Consumer Electronics - Janeiro",
          url: "https://www.ces.tech",
          features: ["Matchmaking digital", "Perfis de compradores", "Agendamento 1:1"]
        },
        {
          name: "IMTS+ Matchmaking (Chicago)",
          description: "Manufacturing - Setembro",
          url: "https://imtsplus.com",
          features: ["RFQs técnicas", "Buyer Intent", "Demandas industriais"]
        },
        {
          name: "ASD Market Week (Las Vegas)",
          description: "Produtos de consumo - Fev/Ago",
          url: "https://www.asdmarketweek.com",
          features: ["ASD Connect", "Listas de produtos procurados", "Alertas de interesse"]
        },
        {
          name: "Canton Fair Online",
          description: "Maior feira de exportação - Abr/Out",
          url: "https://www.cantonfair.org.cn",
          features: ["RFQs públicas permanentes", "Compradores globais", "Acesso gratuito"]
        }
      ]
    },
    {
      category: "LinkedIn Sales Navigator",
      icon: <Users className="h-5 w-5" />,
      items: [
        {
          name: "LinkedIn Sales Navigator",
          description: "Ferramenta profissional para identificar compradores",
          url: "https://www.linkedin.com/sales",
          features: ["Busca avançada", "Procurement officers", "Monitoramento de posts"]
        }
      ]
    },
    {
      category: "Plataformas de Lead B2B",
      icon: <Search className="h-5 w-5" />,
      items: [
        {
          name: "ZoomInfo",
          description: "Base de dados de contatos B2B",
          url: "https://www.zoominfo.com",
          features: ["Contatos verificados", "Dados de empresas", "Filtros por cargo"]
        },
        {
          name: "Apollo.io",
          description: "Plataforma de vendas e marketing B2B",
          url: "https://www.apollo.io",
          features: ["E-mails corporativos", "Sequências automáticas", "CRM integrado"]
        },
        {
          name: "Lusha",
          description: "Dados de contato para LinkedIn",
          url: "https://www.lusha.com",
          features: ["Extensão Chrome", "Dados em tempo real", "Verificação de e-mails"]
        }
      ]
    }
  ];

  const tradeshowCalendar = [
    { month: "Janeiro", events: [
      { name: "CES", location: "Las Vegas, EUA", focus: "Eletrônicos, IoT, Saúde Digital", platform: "CES Matchmaking", url: "ces.tech" },
      { name: "NRF Big Show", location: "Nova York, EUA", focus: "Varejo, Logística, Tecnologia", platform: "NRF Connect", url: "nrf.com" }
    ]},
    { month: "Fevereiro", events: [
      { name: "ASD Market Week", location: "Las Vegas, EUA", focus: "Produtos de Consumo", platform: "ASD Connect", url: "asdmarketweek.com" }
    ]},
    { month: "Abril", events: [
      { name: "Canton Fair (Fase 1)", location: "Guangzhou, China", focus: "Eletrônicos, Iluminação", platform: "Canton Fair Online", url: "cantonfair.org.cn" },
      { name: "Hannover Messe", location: "Hannover, Alemanha", focus: "Indústria 4.0, Automação", platform: "Deutsche Messe Matchmaking", url: "hannovermesse.de" }
    ]},
    { month: "Setembro", events: [
      { name: "IMTS", location: "Chicago, EUA", focus: "Manufatura, Máquinas", platform: "IMTS+ Matchmaking", url: "imts.com" },
      { name: "IFA Berlin", location: "Berlim, Alemanha", focus: "Eletrodomésticos", platform: "IFA Business Matching", url: "ifa-berlin.com" }
    ]},
    { month: "Outubro", events: [
      { name: "Canton Fair (Fase 2 & 3)", location: "Guangzhou, China", focus: "Casa, Presentes, Têxteis", platform: "Canton Fair Online", url: "cantonfair.org.cn" }
    ]}
  ];

  const emailTemplate = `Subject: Re: Your RFQ for [Product Name] – Ready to Supply with FCC/CE Certifications

Dear [Buyer's First Name],

I came across your request for [product, e.g., "10,000 units of solar phone chargers"] via [source: Canton Fair / IMTS / etc.], and I believe we can meet your specifications:

✅ **Product**: [Exact product name or model]  
✅ **Certifications**: FCC, CE, RoHS (full compliance documentation available)  
✅ **MOQ**: As low as [X] units  
✅ **Price**: $[X.XX]/unit FOB Shenzhen (or EXW / DDP USA — customizable)  
✅ **Lead Time**: [X] days after order confirmation  
✅ **Branding**: Private label / custom packaging available  

We're a U.S.-based supplier with direct partnerships with ISO-certified factories in [China/Vietnam/etc.], and we specialize in serving North American distributors like [mention similar client if possible].

I'd be glad to send samples or schedule a quick call to discuss your timeline.

Best regards,  
[Your Full Name]  
[Your Title]  
[Your Company Name]  
📞 [Phone] | 🌐 [Website]  
📍 [City, State, USA]  

P.S. We can deliver your first batch to [Buyer's Country] by [date] if confirmed by [date + 5 days].`;

  const realRFQs = [
    { product: "Carregadores solares portáteis (10W)", qty: "10,000 unidades", price: "US$ 8.50 FOB", location: "Texas, EUA", timeline: "60 dias", certs: "FCC, CE, RoHS" },
    { product: "Fones de ouvido Bluetooth TWS", qty: "25,000 pares", price: "US$ 12.00 FOB", location: "São Paulo, Brasil", timeline: "45 dias", certs: "ANATEL, CE" },
    { product: "Luminárias LED para escritório", qty: "5,000 unidades", price: "US$ 15.00 FOB", location: "Dubai, EAU", timeline: "30 dias", certs: "CE, UKCA" },
    { product: "Garrafas térmicas de aço inox (500ml)", qty: "30,000 unidades", price: "US$ 6.20 FOB", location: "Toronto, Canadá", timeline: "75 dias", certs: "FDA, LFGB" },
    { product: "Mini drones com câmera HD", qty: "8,000 unidades", price: "US$ 22.00 FOB", location: "Berlim, Alemanha", timeline: "60 dias", certs: "CE, REACH" }
  ];

  const automationSteps = [
    {
      step: 1,
      title: "Monitorar RFQs na Canton Fair",
      description: "Use Visualping para verificar mudanças na página de RFQs",
      tools: ["Visualping (gratuito)", "Canton Fair account"],
      action: "Verificação automática 1x por dia"
    },
    {
      step: 2,
      title: "Google Alerts para Palavras-Chave",
      description: "Capture oportunidades em tempo real",
      tools: ["Google Alerts (gratuito)"],
      action: "Alertas diários por e-mail"
    },
    {
      step: 3,
      title: "Rastrear Compradores no LinkedIn",
      description: "Monitor procurement managers posting requirements",
      tools: ["LinkedIn Sales Navigator (trial 30 dias)"],
      action: "Notificações de posts relevantes"
    },
    {
      step: 4,
      title: "Dashboard Centralizado",
      description: "Organize todos os leads em uma planilha",
      tools: ["Google Sheets (gratuito)"],
      action: "Tracking automático de follow-ups"
    }
  ];

  const checklist = [
    { day: 1, task: "Registrar-se como comprador na Canton Fair", status: "pending" },
    { day: 2, task: "Criar conta no IMTS+ e explorar 'Buyer Intent'", status: "pending" },
    { day: 3, task: "Configurar 3 Google Alerts com palavras-chave do seu nicho", status: "pending" },
    { day: 4, task: "Instalar Visualping e monitorar página de RFQs", status: "pending" },
    { day: 5, task: "Testar o modelo de e-mail com 1 RFQ real", status: "pending" },
    { day: 6, task: "Criar perfil profissional no LinkedIn", status: "pending" },
    { day: 7, task: "Montar planilha de leads no Google Sheets", status: "pending" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Guia Completo: Fontes de Compradores B2B Globais
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Estratégias reais utilizadas por pequenas empresas dos EUA para identificar demanda B2B internacional em 2024
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="platforms">Plataformas</TabsTrigger>
          <TabsTrigger value="calendar">Calendário 2024</TabsTrigger>
          <TabsTrigger value="email">E-mail Template</TabsTrigger>
          <TabsTrigger value="rfqs">RFQs Reais</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="checklist">Checklist 7 dias</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-6">
          {platforms.map((category, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.items.map((platform, pidx) => (
                  <div key={pidx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{platform.name}</h3>
                        <p className="text-muted-foreground mb-3">{platform.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {platform.features.map((feature, fidx) => (
                            <Badge key={fidx} variant="secondary">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="ml-4">
                        <a href={`https://${platform.url}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Acessar
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendário 2024: Feiras com Matchmaking B2B
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tradeshowCalendar.map((month, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-3">{month.month}</h3>
                    <div className="space-y-3">
                      {month.events.map((event, eidx) => (
                        <div key={eidx} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{event.name}</h4>
                              <p className="text-sm text-muted-foreground mb-1">📍 {event.location}</p>
                              <p className="text-sm mb-2">🎯 {event.focus}</p>
                              <Badge variant="outline">{event.platform}</Badge>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={`https://${event.url}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Site
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Modelo de E-mail Profissional para RFQs B2B
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap mb-4">
                {emailTemplate}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => copyToClipboard(emailTemplate, "Template de e-mail")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Template
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Dicas de Uso:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Substitua os colchetes [ ] com dados reais</li>
                  <li>Se não tiver certificações, diga: "Certifications in process — can provide test reports"</li>
                  <li>Incluir localização nos EUA aumenta confiança</li>
                  <li>Sempre mencione prazo específico no P.S.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                10 RFQs Reais - Canton Fair Abril/2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realRFQs.map((rfq, idx) => (
                  <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold">{rfq.product}</h4>
                        <p className="text-sm text-muted-foreground">Quantidade: {rfq.qty}</p>
                      </div>
                      <div>
                        <p className="text-sm"><strong>Preço:</strong> {rfq.price}</p>
                        <p className="text-sm"><strong>Destino:</strong> {rfq.location}</p>
                      </div>
                      <div>
                        <p className="text-sm"><strong>Prazo:</strong> {rfq.timeline}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rfq.certs.split(', ').map((cert, cidx) => (
                            <Badge key={cidx} variant="secondary" className="text-xs">{cert}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold mb-2">🔍 Como Usar Essas RFQs:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Escolha uma RFQ alinhada ao seu nicho</li>
                  <li>Pesquise fornecedores no Alibaba com essas especificações</li>
                  <li>Use o modelo de e-mail para contatar o comprador</li>
                  <li>Encontre o comprador via LinkedIn ou nome da empresa</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Fluxo de Automação para Monitorar RFQs Diariamente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {automationSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {step.tools.map((tool, tidx) => (
                          <Badge key={tidx} variant="outline">{tool}</Badge>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-green-700">📋 {step.action}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold mb-2">🛠️ Ferramentas Necessárias:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Google Alerts</strong> - Gratuito</li>
                  <li><strong>Visualping</strong> - Freemium (2 verificações/dia grátis)</li>
                  <li><strong>LinkedIn Sales Navigator</strong> - Trial 30 dias grátis</li>
                  <li><strong>Google Sheets</strong> - Gratuito para organizar leads</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Checklist de Primeiros Passos (7 Dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {item.day}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.task}</p>
                    </div>
                    <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                      {item.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">🚀 Resultado Esperado:</h4>
                <p className="text-sm">
                  Com esse sistema ativo, automatizado e baseado em demandas reais, você terá um pipeline 
                  consistente para gerar receita B2B em 2024 — sem inventar produtos, sem anúncios pagos, 
                  e sem estoque inicial.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}