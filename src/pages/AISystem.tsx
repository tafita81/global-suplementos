import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Cpu, Zap, TrendingUp, AlertTriangle, Settings, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AIModule {
  name: string;
  status: "active" | "inactive" | "training";
  performance: number;
  description: string;
  lastUpdate: string;
}

export default function AISystem() {
  const { t } = useTranslation();

  const aiModules: AIModule[] = [
    {
      name: t('aiSystem.modules.globalAiBrain.name'),
      status: "active",
      performance: 94,
      description: t('aiSystem.modules.globalAiBrain.description'),
      lastUpdate: "2024-01-15 14:30"
    },
    {
      name: t('aiSystem.modules.b2bAnalyzer.name'),
      status: "active", 
      performance: 87,
      description: t('aiSystem.modules.b2bAnalyzer.description'),
      lastUpdate: "2024-01-15 13:45"
    },
    {
      name: t('aiSystem.modules.b2cAnalyzer.name'),
      status: "active",
      performance: 91,
      description: t('aiSystem.modules.b2cAnalyzer.description'),
      lastUpdate: "2024-01-15 14:15"
    },
    {
      name: t('aiSystem.modules.mycogenesisAi.name'),
      status: "training",
      performance: 76,
      description: t('aiSystem.modules.mycogenesisAi.description'),
      lastUpdate: "2024-01-15 12:20"
    },
    {
      name: t('aiSystem.modules.complianceChecker.name'),
      status: "active",
      performance: 98,
      description: t('aiSystem.modules.complianceChecker.description'),
      lastUpdate: "2024-01-15 14:45"
    }
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "training": return "warning";
      case "inactive": return "destructive";
      default: return "secondary";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-success";
    if (performance >= 70) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Activity className="h-4 w-4" />;
      case "training": return <Brain className="h-4 w-4" />;
      case "inactive": return <AlertTriangle className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  const activeModules = aiModules.filter(m => m.status === "active").length;
  const avgPerformance = Math.round(aiModules.reduce((acc, m) => acc + m.performance, 0) / aiModules.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('aiSystem.title')}</h1>
          <p className="text-muted-foreground">
            {t('aiSystem.subtitle')}
          </p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          {t('aiSystem.configurations')}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('aiSystem.activeModules')}</p>
                <p className="text-2xl font-bold">{activeModules}</p>
              </div>
              <Brain className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('aiSystem.averagePerformance')}</p>
                <p className="text-2xl font-bold">{avgPerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('aiSystem.processing')}</p>
                <p className="text-2xl font-bold">{t('aiSystem.realTime')}</p>
              </div>
              <Zap className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('aiSystem.uptime')}</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">{t('aiSystem.tabs.modules')}</TabsTrigger>
          <TabsTrigger value="training">{t('aiSystem.tabs.training')}</TabsTrigger>
          <TabsTrigger value="logs">{t('aiSystem.tabs.logs')}</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid gap-4">
            {aiModules.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getStatusIcon(module.status)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(module.status) as any}>
                      {t(`aiSystem.status.${module.status}`)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">{t('aiSystem.performance')}</h4>
                      <div className="space-y-2">
                        <Progress value={module.performance} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className={getPerformanceColor(module.performance)}>
                            {module.performance}%
                          </span>
                          <span className="text-muted-foreground">
                            {t('aiSystem.lastUpdate')}: {module.lastUpdate}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        {t('aiSystem.configure')}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t('aiSystem.logs')}
                      </Button>
                      {module.status === "training" && (
                        <Button variant="outline" size="sm">
                          {t('aiSystem.stopTraining')}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>{t('aiSystem.training.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('aiSystem.training.description')}
              </p>
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                {t('aiSystem.training.startNew')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>{t('aiSystem.systemLogs.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                <div className="p-2 bg-muted rounded text-success">
                  [2024-01-15 14:45] ✅ Compliance Checker: Verificação concluída - 100% conforme
                </div>
                <div className="p-2 bg-muted rounded text-primary">
                  [2024-01-15 14:30] 🧠 Cérebro IA Global: Nova oportunidade identificada - Score: 94%
                </div>
                <div className="p-2 bg-muted rounded text-warning">
                  [2024-01-15 14:15] ⚠️ Mycogenesis AI: Iniciando nova sessão de treinamento
                </div>
                <div className="p-2 bg-muted rounded text-success">
                  [2024-01-15 14:00] ✅ B2C Analyzer: Análise de tendências completada
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}