import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import B2BBuyerSourcesGuide from "@/components/premium/B2BBuyerSourcesGuide";
import { ArrowLeft, Globe, Users, Target, Zap, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function B2BBuyerGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-radial from-secondary/10 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-2">
              <Globe className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Estratégia B2B Global</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Guia Completo de Compradores B2B
            </h1>
            
            <p className="text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground">
              Estratégias reais utilizadas por pequenas empresas dos EUA para identificar demanda B2B internacional. 
              Acesse compradores qualificados em 20+ plataformas globais.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">20+ Plataformas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Target className="h-4 w-4 text-success" />
                <span className="text-sm">RFQs Reais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="h-4 w-4 text-warning" />
                <span className="text-sm">Calendário 2024</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-sm">Templates Prontos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm">Automação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">Plataformas Globais</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">$47M+</div>
              <div className="text-sm text-muted-foreground">Oportunidades Diárias</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">185</div>
              <div className="text-sm text-muted-foreground">Países Cobertos</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">94%</div>
              <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Guide */}
        <B2BBuyerSourcesGuide />

        {/* Success Cases */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-success/10 via-primary/5 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-center">
                💡 Caso de Sucesso: GreenTech Solutions LLC
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">📍 Empresa</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Austin, Texas - Sensores de irrigação para agricultura de precisão
                  </p>
                  
                  <h4 className="font-semibold mb-2">🎯 Estratégia 2024</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Monitora RFQs no Alibaba e ThomasNet diariamente</li>
                    <li>• Usa Export.gov para identificar países com subsídios agrícolas</li>
                    <li>• Responde com amostras e propostas técnicas</li>
                    <li>• Parceria com fabricante na China (private label)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">📈 Resultados Q1 2024</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Contratos fechados:</span>
                      <Badge variant="secondary">8 distribuidores</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mercados:</span>
                      <Badge variant="secondary">América Latina + Oriente Médio</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Receita adicional:</span>
                      <Badge variant="default">$2.4M</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Modelo:</span>
                      <Badge variant="outline">Fulfillment White-Label</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Takeaways */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Foco em Nicho Específico</h4>
              <p className="text-sm text-muted-foreground">
                Equipamentos médicos, peças agrícolas, suprimentos industriais
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="h-12 w-12 text-success mx-auto mb-4" />
              <h4 className="font-semibold mb-2">RFQs como Fonte de Demanda</h4>
              <p className="text-sm text-muted-foreground">
                Use pedidos reais ao invés de inventar produtos
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-warning mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Valor Além do Produto</h4>
              <p className="text-sm text-muted-foreground">
                Suporte técnico, compliance e logística
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}