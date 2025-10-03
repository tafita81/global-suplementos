import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  ExternalLink, 
  DollarSign,
  Settings,
  CheckCircle,
  Zap
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface ConfigurationIssue {
  id: string;
  title: string;
  description: string;
  severity: 'CRÍTICO' | 'IMPORTANTE' | 'AVISO';
  impact: string;
  steps: string[];
  actionLink?: string;
  configured: boolean;
}

export function AlertaCredenciais() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<ConfigurationIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAllConfigurations();
  }, []);

  const checkAllConfigurations = async () => {
    try {
      const configurationIssues: ConfigurationIssue[] = [];

      // Verificar dados da empresa
      const { data: companyData } = await supabase
        .from('company_memory')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!companyData) {
        configurationIssues.push({
          id: 'company-setup',
          title: 'Company Data Not Configured',
          description: 'Basic company information required for operation',
          severity: 'CRÍTICO',
          impact: 'Blocking all operations',
          steps: [
            '1. Go to "Practical Implementation"',
            '2. Fill out company data',
            '3. Configure EIN/CNPJ',
            '4. Save settings'
          ],
          actionLink: '/practical-implementation',
          configured: false
        });
      } else {
        const data = companyData.company_data as any;
        
        // Verificar Payoneer
        if (!data?.payoneerId) {
          configurationIssues.push({
            id: 'payoneer',
          title: 'Payoneer Account Not Configured',
          description: 'Required to receive international payments',
          severity: 'CRÍTICO',
          impact: '$50K+ blocked',
          steps: [
            '1. Access your Payoneer account',
            '2. Copy your Payoneer ID',
            '3. Go to "Practical Implementation"',
            '4. Paste the ID and save'
          ],
            actionLink: '/practical-implementation',
            configured: false
          });
        }

        // Verificar SAM.gov
        if (!data?.samGovCredentials) {
          configurationIssues.push({
            id: 'sam-gov',
          title: 'SAM.gov Registration Incomplete',
          description: 'Configure to access government contracts',
          severity: 'CRÍTICO',
          impact: '$200K+/year lost',
          steps: [
            '1. Go to sam.gov',
            '2. Complete company registration',
            '3. Configure credentials in the system',
            '4. Enable automatic detection'
          ],
            actionLink: '/practical-implementation',
            configured: false
          });
        }

        // Verificar Alibaba
        if (!data?.alibabaCredentials) {
          configurationIssues.push({
            id: 'alibaba',
          title: 'Alibaba B2B Account Not Configured',
          description: 'Required for product arbitrage',
          severity: 'IMPORTANTE',
          impact: 'Limiting arbitrage opportunities',
          steps: [
            '1. Create a business account on Alibaba',
            '2. Configure API credentials',
            '3. Add to the system',
            '4. Test connection'
          ],
            actionLink: '/suppliers',
            configured: false
          });
        }
      }

      // Verificar APIs configuradas
      const apiIssues = await checkAPIConfigurations();
      configurationIssues.push(...apiIssues);

      setIssues(configurationIssues);
    } catch (error) {
      console.error('Error checking configurations:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAPIConfigurations = async (): Promise<ConfigurationIssue[]> => {
    const apiIssues: ConfigurationIssue[] = [];

    // Verificar ElevenLabs API
    try {
      const { data, error } = await supabase.functions.invoke('test-api-keys', {
        body: { api: 'elevenlabs' }
      });

      if (error || !data?.success) {
        apiIssues.push({
          id: 'elevenlabs',
          title: 'ELEVENLABS_API_KEY API Issue',
          description: 'Check API configuration',
          severity: 'IMPORTANTE',
          impact: 'Audio features limited',
          steps: [
            '1. Go to "API Setup"',
            '2. Verify ElevenLabs key',
            '3. Test the connection',
            '4. Update if necessary'
          ],
          actionLink: '/api-setup',
          configured: false
        });
      }
    } catch (error) {
      // API pode não estar disponível - adicionar mesmo assim para mostrar
      apiIssues.push({
        id: 'elevenlabs',
        title: 'ELEVENLABS_API_KEY API Issue',
        description: 'Check API configuration',
        severity: 'IMPORTANTE',
        impact: 'Audio features limited',
        steps: [
          '1. Go to "API Setup"',
          '2. Verify ElevenLabs key',
          '3. Test the connection',
          '4. Update if necessary'
        ],
        actionLink: '/api-setup',
        configured: false
      });
    }

    return apiIssues;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRÍTICO':
        return 'bg-red-500 text-white';
      case 'IMPORTANTE':
        return 'bg-black text-white';
      case 'AVISO':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityBorderColor = (severity: string) => {
    switch (severity) {
      case 'CRÍTICO':
        return 'border-l-red-500';
      case 'IMPORTANTE':
        return 'border-l-black';
      case 'AVISO':
        return 'border-l-yellow-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const renderSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'CRÍTICO':
        return 'CRITICAL';
      case 'IMPORTANTE':
        return 'IMPORTANT';
      case 'AVISO':
        return 'WARNING';
      default:
        return severity;
    }
  };

  const handleActionClick = (actionLink?: string) => {
    if (actionLink) {
      navigate(actionLink);
    }
  };

  if (loading) {
    return (
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/30">
        <CardContent className="p-6">
          <div className="text-center">Checking configurations...</div>
        </CardContent>
      </Card>
    );
  }

  if (issues.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-800 dark:text-green-200">
              ✅ All Configurations Complete
            </CardTitle>
          </div>
          <CardDescription className="text-green-700 dark:text-green-300">
            System operating at maximum profit capacity
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <CardTitle className="text-red-800 dark:text-red-200 text-xl">
            ⚠️ Actions Required to Maximize Profits
          </CardTitle>
        </div>
        <CardDescription className="text-red-700 dark:text-red-300 text-base">
          {issues.length} critical configurations blocking revenue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {issues.map((issue, index) => (
          <div 
            key={issue.id} 
            className={`p-5 bg-white dark:bg-gray-800 rounded-lg border-l-4 ${getSeverityBorderColor(issue.severity)} shadow-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {issue.title}
                  </h4>
                  <Badge className={`${getSeverityColor(issue.severity)} text-sm px-3 py-1`}>
                    {renderSeverityLabel(issue.severity)}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {issue.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    {issue.impact}
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => handleActionClick(issue.actionLink)}
                size="sm" 
                variant="outline"
                className="ml-4 flex-shrink-0"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
              <strong className="text-sm text-gray-700 dark:text-gray-300 block mb-2">
                📋 Setup steps:
              </strong>
              <ul className="space-y-1">
                {issue.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-blue-500 font-medium flex-shrink-0">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 mt-4">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Configure the options marked as "CRITICAL" first to maximize profit potential immediately.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}