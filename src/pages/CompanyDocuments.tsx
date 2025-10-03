import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DocumentManager from '@/components/dashboard/DocumentManager';

const CompanyDocuments: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              Documentos da Empresa
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie todos os documentos utilizados nos cadastros automáticos
            </p>
          </div>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Upload className="h-5 w-5" />
              Sistema de Documentos Automático
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-700">
              <p className="mb-3">
                ✅ <strong>Certificado da Flórida já carregado:</strong> Documento oficial de incorporação salvo automaticamente
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">📋 Documentos Utilizados Para:</p>
                  <ul className="space-y-1">
                    <li>• Cadastros automáticos em plataformas B2B</li>
                    <li>• Verificações governamentais (SAM.gov, GSA)</li>
                    <li>• Validações financeiras e bancárias</li>
                    <li>• Processos de compliance internacional</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">🔒 Segurança:</p>
                  <ul className="space-y-1">
                    <li>• Armazenamento criptografado no Supabase</li>
                    <li>• Acesso restrito e auditado</li>
                    <li>• Backup automático</li>
                    <li>• Conformidade com LGPD/GDPR</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Manager Component */}
      <DocumentManager />

      {/* Usage Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-gray-800">💡 Como Funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-blue-600">1. Upload Automático</div>
              <p className="text-gray-600">
                O sistema automaticamente carrega e organiza seus documentos por categoria
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-green-600">2. Uso nos Cadastros</div>
              <p className="text-gray-600">
                Documentos são enviados automaticamente quando necessário para verificações
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-purple-600">3. Sincronização</div>
              <p className="text-gray-600">
                Atualizações são propagadas para todas as plataformas registradas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDocuments;