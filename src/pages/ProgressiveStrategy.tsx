import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Mail,
  CheckCircle,
  Clock,
  Target,
  DollarSign,
  Users,
  Building,
  Send,
  History,
  Shield,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface StrategyPhase {
  current_phase: string;
  risk_level: string;
  payment_terms_allowed: string[];
  next_phase_requirements: string[];
  phase_criteria: any;
}

interface Transaction {
  id: string;
  date: string;
  value: number;
  margin: number;
  strategy_used: string;
  customer: any;
  supplier: any;
}

export default function ProgressiveStrategy() {
  const [currentStrategy, setCurrentStrategy] = useState<StrategyPhase | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    customer: "",
    supplier: "",
    product: "",
    value: "",
    margin: "",
    payment_terms_customer: "100% advance",
    payment_terms_supplier: "100% advance",
    lessons_learned: "",
    success_factors: ""
  });

  useEffect(() => {
    loadCurrentStrategy();
    loadTransactionHistory();
  }, []);

  const loadCurrentStrategy = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('progressive-strategy-engine', {
        body: { action: 'get_current_strategy' }
      });

      if (error) throw error;
      setCurrentStrategy(data.current_strategy);
    } catch (error) {
      console.error('Error loading strategy:', error);
      toast.error('Erro ao carregar estratégia atual');
    }
  };

  const loadTransactionHistory = async () => {
    try {
      const { data: memory } = await supabase
        .from('company_memory')
        .select('ai_learning_data')
        .eq('ein_number', '33-3939483')
        .single();

      if (memory?.ai_learning_data && typeof memory.ai_learning_data === 'object') {
        const learningData = memory.ai_learning_data as any;
        if (learningData.successful_registrations) {
          setTransactions(learningData.successful_registrations);
        }
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const sendSupplierInquiry = async () => {
    if (!supplierEmail || !supplierName || !productCategory) {
      toast.error('Preencha todos os campos do fornecedor');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('progressive-strategy-engine', {
        body: {
          action: 'inquire_supplier',
          supplier_email: supplierEmail,
          supplier_name: supplierName,
          product_category: productCategory
        }
      });

      if (error) throw error;

      toast.success('Email enviado para fornecedor! Aguardando resposta...');
      setSupplierEmail("");
      setSupplierName("");
      setProductCategory("");
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast.error('Erro ao enviar email para fornecedor');
    } finally {
      setLoading(false);
    }
  };

  const recordTransaction = async () => {
    if (!newTransaction.customer || !newTransaction.supplier || !newTransaction.value) {
      toast.error('Preencha os campos obrigatórios da transação');
      return;
    }

    setLoading(true);
    try {
      const transactionData = {
        ...newTransaction,
        value: parseFloat(newTransaction.value),
        margin: parseFloat(newTransaction.margin),
        lessons_learned: newTransaction.lessons_learned.split(',').map(l => l.trim()),
        success_factors: newTransaction.success_factors.split(',').map(f => f.trim())
      };

      const { data, error } = await supabase.functions.invoke('progressive-strategy-engine', {
        body: {
          action: 'record_transaction',
          transaction_data: transactionData
        }
      });

      if (error) throw error;

      toast.success('Transação registrada! Estratégia atualizada.');
      
      // Reset form
      setNewTransaction({
        customer: "",
        supplier: "",
        product: "",
        value: "",
        margin: "",
        payment_terms_customer: "100% advance",
        payment_terms_supplier: "100% advance",
        lessons_learned: "",
        success_factors: ""
      });

      // Reload data
      loadCurrentStrategy();
      loadTransactionHistory();
    } catch (error) {
      console.error('Error recording transaction:', error);
      toast.error('Erro ao registrar transação');
    } finally {
      setLoading(false);
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'dropshipping': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'net_15_testing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'net_30_achieving': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'advanced_arbitrage': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPhaseTitle = (phase: string) => {
    switch (phase) {
      case 'dropshipping': return '🚀 Fase 1: Dropshipping Zero Risco';
      case 'net_15_testing': return '⚡ Fase 2: Testando NET-15';
      case 'net_30_achieving': return '💎 Fase 3: Conquistando NET-30';
      case 'advanced_arbitrage': return '👑 Fase 4: Arbitragem Avançada';
      default: return 'Estratégia Evolutiva';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'zero': return <Badge className="bg-green-50 text-green-700">Risco ZERO</Badge>;
      case 'minimal': return <Badge className="bg-blue-50 text-blue-700">Risco Mínimo</Badge>;
      case 'low': return <Badge className="bg-yellow-50 text-yellow-700">Risco Baixo</Badge>;
      default: return <Badge variant="outline">Risco {risk}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            Estratégia Evolutiva - Passo a Passo
          </h1>
          <p className="text-muted-foreground">
            Começando do zero, evoluindo conforme histórico e feedback do mercado
          </p>
        </div>
        {currentStrategy && getRiskBadge(currentStrategy.risk_level)}
      </div>

      {/* Current Strategy Phase */}
      {currentStrategy && (
        <Card className={`border-2 ${getPhaseColor(currentStrategy.current_phase)}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{getPhaseTitle(currentStrategy.current_phase)}</span>
              <Target className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📋 Termos de Pagamento Permitidos:</h4>
              <div className="flex flex-wrap gap-2">
                {currentStrategy.payment_terms_allowed.map((term, index) => (
                  <Badge key={index} variant="outline" className="bg-white">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">🎯 Requisitos para Próxima Fase:</h4>
              <ul className="space-y-1">
                {currentStrategy.next_phase_requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supplier Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Comunicação com Fornecedores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>SEMPRE PERGUNTE:</strong> Antes de qualquer negociação, pergunte sobre NET-15 e NET-30. 
              Sistema envia emails automáticos e guarda histórico completo.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="supplier-name">Nome do Fornecedor</Label>
              <Input
                id="supplier-name"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Ex: Shanghai Medical Co."
              />
            </div>
            <div>
              <Label htmlFor="supplier-email">Email do Fornecedor</Label>
              <Input
                id="supplier-email"
                type="email"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                placeholder="sales@supplier.com"
              />
            </div>
            <div>
              <Label htmlFor="product-category">Categoria do Produto</Label>
              <Input
                id="product-category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="Ex: Suplementos, Equipamentos"
              />
            </div>
          </div>

          <Button 
            onClick={sendSupplierInquiry} 
            disabled={loading}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {loading ? 'Enviando...' : 'Enviar Email de Consulta'}
          </Button>
        </CardContent>
      </Card>

      {/* Transaction Recording */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Registrar Nova Transação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer">Cliente *</Label>
              <Input
                id="customer"
                value={newTransaction.customer}
                onChange={(e) => setNewTransaction({...newTransaction, customer: e.target.value})}
                placeholder="Nome da empresa cliente"
              />
            </div>
            <div>
              <Label htmlFor="supplier">Fornecedor *</Label>
              <Input
                id="supplier"
                value={newTransaction.supplier}
                onChange={(e) => setNewTransaction({...newTransaction, supplier: e.target.value})}
                placeholder="Nome do fornecedor"
              />
            </div>
            <div>
              <Label htmlFor="product">Produto *</Label>
              <Input
                id="product"
                value={newTransaction.product}
                onChange={(e) => setNewTransaction({...newTransaction, product: e.target.value})}
                placeholder="Descrição do produto"
              />
            </div>
            <div>
              <Label htmlFor="value">Valor Total ($) *</Label>
              <Input
                id="value"
                type="number"
                value={newTransaction.value}
                onChange={(e) => setNewTransaction({...newTransaction, value: e.target.value})}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="margin">Margem de Lucro ($)</Label>
              <Input
                id="margin"
                type="number"
                value={newTransaction.margin}
                onChange={(e) => setNewTransaction({...newTransaction, margin: e.target.value})}
                placeholder="15000"
              />
            </div>
            <div>
              <Label htmlFor="customer-terms">Termos - Cliente</Label>
              <Input
                id="customer-terms"
                value={newTransaction.payment_terms_customer}
                onChange={(e) => setNewTransaction({...newTransaction, payment_terms_customer: e.target.value})}
                placeholder="100% advance"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="supplier-terms">Termos - Fornecedor</Label>
            <Input
              id="supplier-terms"
              value={newTransaction.payment_terms_supplier}
              onChange={(e) => setNewTransaction({...newTransaction, payment_terms_supplier: e.target.value})}
              placeholder="100% advance ou NET-15"
            />
          </div>

          <div>
            <Label htmlFor="lessons">Lições Aprendidas (separar por vírgula)</Label>
            <Textarea
              id="lessons"
              value={newTransaction.lessons_learned}
              onChange={(e) => setNewTransaction({...newTransaction, lessons_learned: e.target.value})}
              placeholder="Cliente preferiu dropshipping, fornecedor foi pontual, documentação completa necessária"
            />
          </div>

          <div>
            <Label htmlFor="success-factors">Fatores de Sucesso (separar por vírgula)</Label>
            <Textarea
              id="success-factors"
              value={newTransaction.success_factors}
              onChange={(e) => setNewTransaction({...newTransaction, success_factors: e.target.value})}
              placeholder="Comunicação rápida, preços competitivos, entrega no prazo"
            />
          </div>

          <Button 
            onClick={recordTransaction} 
            disabled={loading}
            className="w-full"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {loading ? 'Registrando...' : 'Registrar Transação'}
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-purple-600" />
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma transação registrada ainda</p>
              <p className="text-sm">Registre sua primeira transação para começar a evolução!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.length > 0 && transactions.slice(-5).reverse().map((transaction, index) => (
                <div key={transaction.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{transaction.id}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        ${transaction.value?.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Lucro: ${transaction.margin?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Cliente:</strong> {transaction.customer?.name || transaction.customer}
                    </div>
                    <div>
                      <strong>Fornecedor:</strong> {transaction.supplier?.name || transaction.supplier}
                    </div>
                    <div className="col-span-2">
                      <strong>Estratégia:</strong> {transaction.strategy_used}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}