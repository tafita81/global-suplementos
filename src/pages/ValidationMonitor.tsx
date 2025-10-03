import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, CheckCircle, Clock, AlertCircle, Eye, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface ValidationStats {
  total_suppliers: number;
  validated_suppliers: number;
  pending_suppliers: number;
  validation_percentage: number;
  current_validating?: string;
}

interface RecentValidation {
  company_name: string;
  email: string;
  website: string;
  country: string;
  accepts_us_dropshipping: string;
  accepts_us_distribution: string;
  data_source: string;
  deep_validation_score?: number;
  verification_notes?: string;
  updated_at: string;
}

const ValidationMonitor: React.FC = () => {
  const [stats, setStats] = useState<ValidationStats>({
    total_suppliers: 300,
    validated_suppliers: 0,
    pending_suppliers: 300,
    validation_percentage: 0
  });
  const [recentValidations, setRecentValidations] = useState<RecentValidation[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast } = useToast();

  // Função para buscar estatísticas atuais
  const fetchValidationStats = async () => {
    try {
      const { data: directData, error: directError } = await supabase
        .from('target_suppliers')
        .select('real_data_verified, company_exists, deep_validation_score, data_source, updated_at')
        .order('updated_at', { ascending: false });

      if (directError) throw directError;

      const total = directData.length;
      const validated = directData.filter(item => item.real_data_verified === true && item.company_exists === true).length;
      const removed = directData.filter(item => item.company_exists === false).length;
      const pending = total - validated - removed;
      const percentage = total > 0 ? (validated / total) * 100 : 0;

      setStats({
        total_suppliers: total,
        validated_suppliers: validated,
        pending_suppliers: pending,
        validation_percentage: Math.round(percentage * 100) / 100
      });
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  // Função para buscar validações recentes
  const fetchRecentValidations = async () => {
    try {
      const { data, error } = await supabase
        .from('target_suppliers')
        .select('company_name, email, website, country, accepts_us_dropshipping, accepts_us_distribution, data_source, deep_validation_score, verification_notes, updated_at')
        .eq('real_data_verified', true)
        .eq('company_exists', true)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setRecentValidations(data);
    } catch (error) {
      console.error('Erro ao buscar validações recentes:', error);
    }
  };

  // Iniciar validação automática
  const startValidation = async () => {
    try {
      setIsMonitoring(true);
      
      const { data, error } = await supabase.functions.invoke('real-supplier-validator', {
        body: { 
          action: 'validate_sequential'
        }
      });

      if (error) throw error;
      
      if (data?.all_done) {
        toast({
          title: "🎉 Validação Completa!",
          description: "Todos os fornecedores foram processados com sucesso",
          duration: 5000,
        });
        setIsMonitoring(false);
      } else if (data?.action === 'validated') {
        toast({
          title: "✅ Fornecedor Validado",
          description: `${data.company_name} - Score: ${data.score}/100`,
          duration: 3000,
        });
        // Continue processando automaticamente após delay
        setTimeout(() => startValidation(), 3000);
      } else if (data?.action === 'removed') {
        toast({
          title: "❌ Fornecedor Removido",
          description: `${data.company_name} - ${data.reason}`,
          duration: 3000,
          variant: "destructive",
        });
        // Continue processando automaticamente após delay
        setTimeout(() => startValidation(), 3000);
      }
      
    } catch (error: any) {
      console.error('Erro ao validar:', error);
      toast({
        title: "❌ Erro na Validação",
        description: error?.message || "Falha no processamento",
        variant: "destructive",
      });
      setIsMonitoring(false);
    }
  };

  useEffect(() => {
    // Buscar dados iniciais
    fetchValidationStats();
    fetchRecentValidations();

    // Configurar monitoramento em tempo real
    const channel = supabase
      .channel('validation-monitor')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'target_suppliers'
        },
        (payload) => {
          console.log('Fornecedor atualizado:', payload);
          fetchValidationStats();
          fetchRecentValidations();
          
          if (payload.new?.real_data_verified === true && payload.new?.company_exists === true) {
            toast({
              title: "✅ Fornecedor Validado",
              description: `${payload.new.company_name} - dados reais confirmados${payload.new.deep_validation_score ? ` (Score: ${payload.new.deep_validation_score}/100)` : ''}`,
              duration: 3000,
            });
          } else if (payload.new?.company_exists === false) {
            toast({
              title: "❌ Fornecedor Removido",
              description: `${payload.new.company_name} - empresa falsa detectada e removida`,
              duration: 3000,
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    // Atualizar a cada 5 segundos também
    const interval = setInterval(() => {
      if (isMonitoring && stats.validation_percentage < 100) {
        fetchValidationStats();
        fetchRecentValidations();
      }
    }, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [isMonitoring, stats.validation_percentage]);

  // Iniciar validação automaticamente ao carregar
  useEffect(() => {
    if (stats.validated_suppliers === 0 && stats.total_suppliers > 0) {
      startValidation();
    }
  }, [stats.total_suppliers]);

  // Parar monitoramento quando 100% concluído
  useEffect(() => {
    if (stats.validation_percentage >= 100 && isMonitoring) {
      setIsMonitoring(false);
      toast({
        title: "🎉 VALIDAÇÃO COMPLETA!",
        description: `Todos os ${stats.total_suppliers} fornecedores foram validados com dados reais`,
        duration: 10000,
      });
    }
  }, [stats.validation_percentage, isMonitoring]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔎 Monitor de Validação Rigorosa dos Fornecedores
        </h1>
        <p className="text-gray-600">
          Validação profunda em tempo real - removendo fornecedores falsos e mantendo apenas empresas reais com dados verificados
        </p>
      </div>

      {/* Status Principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-3xl font-bold text-blue-900">
                  {stats.validation_percentage.toFixed(1)}%
                </div>
                <div className="text-sm text-blue-700">Progresso Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-3xl font-bold text-green-900">
                  {stats.validated_suppliers}
                </div>
                <div className="text-sm text-green-700">Validados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-3xl font-bold text-orange-900">
                  {stats.pending_suppliers}
                </div>
                <div className="text-sm text-orange-700">Pendentes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-3xl font-bold text-purple-900">
                  {stats.total_suppliers}
                </div>
                <div className="text-sm text-purple-700">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Progresso Principal */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className={`h-5 w-5 ${isMonitoring && stats.validation_percentage < 100 ? 'animate-spin text-blue-600' : 'text-green-600'}`} />
            Progresso da Validação em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress 
              value={stats.validation_percentage} 
              className="h-6"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-semibold">
                {stats.validated_suppliers} de {stats.total_suppliers} fornecedores validados
              </span>
              <span>
                Última atualização: {formatTime(lastUpdate)}
              </span>
            </div>
            {stats.validation_percentage < 100 && (
              <div className="flex gap-2">
                <Button 
                  onClick={startValidation} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isMonitoring}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isMonitoring ? 'Processando 1 por 1...' : 'Iniciar Validação Sequencial'}
                </Button>
                <Button 
                  onClick={() => setIsMonitoring(!isMonitoring)} 
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {isMonitoring ? 'Pausar Processamento' : 'Retomar Monitor'}
                </Button>
              </div>
            )}
            
            <div className="text-center">
              {stats.validation_percentage < 100 ? (
                <div className="text-blue-600 font-medium animate-pulse">
                  🔄 Processamento sequencial 1 por 1 - Aguarde até 100%
                </div>
              ) : (
                <div className="text-green-600 font-bold text-lg">
                  ✅ VALIDAÇÃO COMPLETA - 100% DOS FORNECEDORES VALIDADOS!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status de Conclusão */}
      {stats.validation_percentage >= 100 && (
        <Card className="mb-8 border-green-500 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">
                  🎉 VALIDAÇÃO COMPLETA!
                </h2>
                <p className="text-green-800">
                  Todos os {stats.total_suppliers} fornecedores foram validados com dados reais de web scraping.
                  Emails comerciais, políticas de distribuição e informações de contato confirmadas!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Fornecedores Recém-Validados ({recentValidations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentValidations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>Nenhuma validação concluída ainda...</p>
                <p className="text-sm">O processo começará em breve</p>
              </div>
            ) : (
              recentValidations.map((validation, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{validation.company_name}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>📧 {validation.email}</div>
                      <div>🌐 {validation.website}</div>
                      <div>🌍 {validation.country}</div>
                      {validation.verification_notes && (
                        <div className="text-xs text-blue-600 mt-1">
                          📝 {validation.verification_notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    {validation.deep_validation_score && (
                      <div className="text-xs mb-1">
                        <span className={`px-2 py-1 rounded ${validation.deep_validation_score >= 80 ? 'bg-green-100 text-green-800' : validation.deep_validation_score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          Score: {validation.deep_validation_score}/100
                        </span>
                      </div>
                    )}
                    <div className="text-xs">
                      <span className={`px-2 py-1 rounded ${validation.accepts_us_dropshipping === 'SIM' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        Dropship: {validation.accepts_us_dropshipping}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className={`px-2 py-1 rounded ${validation.accepts_us_distribution === 'SIM' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        Distrib: {validation.accepts_us_distribution}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(validation.updated_at).toLocaleTimeString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationMonitor;