import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckCircle, FileText, Globe, Users, Gavel } from "lucide-react";

interface ComplianceCheck {
  id: string;
  opportunity_id: string;
  check_type: string;
  status: string;
  result: any;
  created_at: string;
}

const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: "1",
    opportunity_id: "opp-1",
    check_type: "Sanctions Check",
    status: "passed",
    result: { score: 100, details: "Nenhuma sanção encontrada" },
    created_at: "2024-01-15"
  },
  {
    id: "2",
    opportunity_id: "opp-2", 
    check_type: "ESG Validation",
    status: "passed",
    result: { score: 95, details: "Conformidade ESG verificada" },
    created_at: "2024-01-15"
  },
  {
    id: "3",
    opportunity_id: "opp-3",
    check_type: "Patent Check",
    status: "warning",
    result: { score: 78, details: "Possível conflito de patente - revisar" },
    created_at: "2024-01-14"
  },
  {
    id: "4",
    opportunity_id: "opp-4",
    check_type: "Quality Certification",
    status: "passed", 
    result: { score: 98, details: "Certificações de qualidade válidas" },
    created_at: "2024-01-14"
  }
];

export default function Compliance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "success";
      case "warning": return "warning";
      case "failed": return "destructive";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "passed": return "Aprovado";
      case "warning": return "Atenção";
      case "failed": return "Reprovado";
      case "pending": return "Pendente";
      default: return status;
    }
  };

  const getCheckIcon = (checkType: string) => {
    switch (checkType) {
      case "Sanctions Check": return <Gavel className="h-4 w-4" />;
      case "ESG Validation": return <Globe className="h-4 w-4" />;
      case "Patent Check": return <FileText className="h-4 w-4" />;
      case "Quality Certification": return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const passedChecks = mockComplianceChecks.filter(c => c.status === "passed").length;
  const warningChecks = mockComplianceChecks.filter(c => c.status === "warning").length;
  const overallScore = Math.round(mockComplianceChecks.reduce((acc, c) => acc + c.result.score, 0) / mockComplianceChecks.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Compliance</h1>
          <p className="text-muted-foreground">
            Monitoramento automático de conformidade regulatória
          </p>
        </div>
        <Button>
          <Shield className="h-4 w-4 mr-2" />
          Nova Verificação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verificações Aprovadas</p>
                <p className="text-2xl font-bold">{passedChecks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Requer Atenção</p>
                <p className="text-2xl font-bold">{warningChecks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Score Geral</p>
                <p className="text-2xl font-bold">{overallScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Países Cobertos</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <Globe className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="checks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checks">Verificações</TabsTrigger>
          <TabsTrigger value="regulations">Regulamentações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="checks" className="space-y-4">
          <div className="grid gap-4">
            {mockComplianceChecks.map((check) => (
              <Card key={check.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getCheckIcon(check.check_type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{check.check_type}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Oportunidade: {check.opportunity_id}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(check.status) as any}>
                      {getStatusLabel(check.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h4 className="font-medium mb-2">Score de Conformidade</h4>
                      <div className="space-y-2">
                        <Progress value={check.result.score} className="h-2" />
                        <p className={`text-sm font-medium ${
                          check.result.score >= 90 ? "text-success" : 
                          check.result.score >= 70 ? "text-warning" : "text-destructive"
                        }`}>
                          {check.result.score}%
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Detalhes da Verificação</h4>
                      <p className="text-sm text-muted-foreground">
                        {check.result.details}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Data da Verificação</h4>
                      <p className="text-sm">
                        {new Date(check.created_at).toLocaleDateString('pt-BR')}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        ID: {check.id}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      Relatório
                    </Button>
                    {check.status === "warning" && (
                      <Button variant="outline" size="sm" className="text-warning">
                        Resolver
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regulations">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Sanções Internacionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Verificação automática contra listas de sanções OFAC, UE, UN.
                </p>
                <div className="space-y-2">
                  <Badge variant="default">OFAC - Atualizado</Badge>
                  <Badge variant="default">EU Sanctions - Atualizado</Badge>
                  <Badge variant="default">UN Sanctions - Atualizado</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Compliance ESG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Validação de critérios ambientais, sociais e de governança.
                </p>
                <div className="space-y-2">
                  <Badge variant="default">Environmental - OK</Badge>
                  <Badge variant="default">Social - OK</Badge>
                  <Badge variant="default">Governance - OK</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Propriedade Intelectual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Verificação de patentes e direitos autorais.
                </p>
                <div className="space-y-2">
                  <Badge variant="default">USPTO - Verificado</Badge>
                  <Badge variant="outline">EPO - Atenção</Badge>
                  <Badge variant="default">WIPO - Verificado</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Certificações de Qualidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Validação de certificados ISO, FDA, CE, etc.
                </p>
                <div className="space-y-2">
                  <Badge variant="default">ISO 9001 - Válido</Badge>
                  <Badge variant="default">FDA - Aprovado</Badge>
                  <Badge variant="default">CE Mark - Válido</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gere relatórios detalhados de conformidade para auditoria.
              </p>
              <div className="flex gap-2">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Relatório Mensal
                </Button>
                <Button variant="outline">
                  Relatório Anual
                </Button>
                <Button variant="outline">
                  Relatório Personalizado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}