import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, Mail, Calendar, MapPin, DollarSign, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CantonFairRFQ {
  id: string;
  product_name: string;
  quantity: number;
  target_price: number;
  buyer_location: string;
  deadline_days: number;
  certifications: string[];
  status: 'new' | 'contacted' | 'sample_sent' | 'negotiating' | 'closed' | 'lost';
  buyer_company?: string;
  notes?: string;
  found_date: string;
  last_action?: string;
}

export function CantonFairTracker() {
  const [rfqs, setRfqs] = useState<CantonFairRFQ[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRfq, setNewRfq] = useState({
    product_name: '',
    quantity: '',
    target_price: '',
    buyer_location: '',
    deadline_days: '',
    certifications: '',
    buyer_company: '',
    notes: ''
  });
  const { toast } = useToast();

  // Sample RFQs for demonstration
  useEffect(() => {
    const sampleRfqs: CantonFairRFQ[] = [
      {
        id: '1',
        product_name: 'Carregadores Solares Portáteis 10W',
        quantity: 10000,
        target_price: 8.50,
        buyer_location: 'Texas, EUA',
        deadline_days: 60,
        certifications: ['FCC', 'CE', 'RoHS'],
        status: 'new',
        buyer_company: 'GreenTech Solutions LLC',
        found_date: '2024-01-15',
        notes: 'Prioridade alta - mercado em crescimento'
      },
      {
        id: '2',
        product_name: 'Fones Bluetooth TWS',
        quantity: 25000,
        target_price: 12.00,
        buyer_location: 'São Paulo, Brasil',
        deadline_days: 45,
        certifications: ['ANATEL', 'CE'],
        status: 'contacted',
        buyer_company: 'AudioBrasil Importadora',
        found_date: '2024-01-12',
        last_action: 'Email enviado em 16/01/2024'
      },
      {
        id: '3',
        product_name: 'Cabos USB-C Trançados 2m',
        quantity: 50000,
        target_price: 1.80,
        buyer_location: 'Los Angeles, EUA',
        deadline_days: 40,
        certifications: ['FCC', 'CE'],
        status: 'sample_sent',
        buyer_company: 'TechCables USA',
        found_date: '2024-01-10',
        last_action: 'Amostras enviadas em 18/01/2024'
      }
    ];
    setRfqs(sampleRfqs);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'sample_sent': return 'bg-purple-500';
      case 'negotiating': return 'bg-orange-500';
      case 'closed': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Nova';
      case 'contacted': return 'Contatado';
      case 'sample_sent': return 'Amostra Enviada';
      case 'negotiating': return 'Negociando';
      case 'closed': return 'Fechado';
      case 'lost': return 'Perdido';
      default: return status;
    }
  };

  const handleAddRfq = () => {
    if (!newRfq.product_name || !newRfq.quantity || !newRfq.target_price) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha produto, quantidade e preço alvo.",
        variant: "destructive"
      });
      return;
    }

    const rfq: CantonFairRFQ = {
      id: Date.now().toString(),
      product_name: newRfq.product_name,
      quantity: parseInt(newRfq.quantity),
      target_price: parseFloat(newRfq.target_price),
      buyer_location: newRfq.buyer_location,
      deadline_days: parseInt(newRfq.deadline_days) || 30,
      certifications: newRfq.certifications.split(',').map(c => c.trim()).filter(c => c),
      status: 'new',
      buyer_company: newRfq.buyer_company,
      notes: newRfq.notes,
      found_date: new Date().toISOString().split('T')[0]
    };

    setRfqs(prev => [rfq, ...prev]);
    setNewRfq({
      product_name: '',
      quantity: '',
      target_price: '',
      buyer_location: '',
      deadline_days: '',
      certifications: '',
      buyer_company: '',
      notes: ''
    });
    setShowAddForm(false);

    toast({
      title: "RFQ Adicionada",
      description: "Oportunidade adicionada ao tracker com sucesso!"
    });
  };

  const updateStatus = async (id: string, newStatus: CantonFairRFQ['status']) => {
    setRfqs(prev => prev.map(rfq => 
      rfq.id === id 
        ? { ...rfq, status: newStatus, last_action: `Status alterado para ${getStatusText(newStatus)} em ${new Date().toLocaleDateString()}` }
        : rfq
    ));

    toast({
      title: "Status Atualizado",
      description: `RFQ marcada como ${getStatusText(newStatus)}`
    });
  };

  const copyEmailTemplate = (rfq: CantonFairRFQ) => {
    const template = `Subject: Re: Your RFQ for ${rfq.product_name} – Ready to Supply with ${rfq.certifications.join('/')} Certifications

Hi ${rfq.buyer_company || 'Team'},

I'm Rafael from Consultoria em Tecnologia da Informação Corp (U.S. buyer, Canton Fair ID: 138432533908).

I came across your request for ${rfq.quantity.toLocaleString()} units of ${rfq.product_name} via Canton Fair, and I believe we can meet your specifications:

✅ Product: ${rfq.product_name}
✅ Certifications: ${rfq.certifications.join(', ')} (full compliance documentation available)
✅ MOQ: As low as ${Math.floor(rfq.quantity * 0.1).toLocaleString()} units
✅ Price: $${rfq.target_price}/unit FOB Shenzhen (negotiable for larger volumes)
✅ Lead Time: ${rfq.deadline_days} days after order confirmation
✅ Branding: Private label / custom packaging available

We're a U.S.-based distributor with direct partnerships with ISO-certified factories, and we specialize in serving North American distributors.

I'd be glad to send samples or schedule a quick call to discuss your timeline.

Best regards,
Rafael Roberto Rodrigues de Oliveira
Consultoria em Tecnologia da Informação Corp
📞 [Phone] | 🌐 contact@globalsupplements.site
📍 Orlando, Florida, USA

P.S. We can deliver your first batch to ${rfq.buyer_location} by [date] if confirmed by [date + 5 days].`;

    navigator.clipboard.writeText(template);
    toast({
      title: "Template Copiado!",
      description: "Email template copiado para a área de transferência."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Canton Fair Tracker</h2>
          <p className="text-muted-foreground">Monitore e gerencie RFQs da Canton Fair</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova RFQ
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Novas</p>
                <p className="text-2xl font-bold">{rfqs.filter(r => r.status === 'new').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Em Progresso</p>
                <p className="text-2xl font-bold">{rfqs.filter(r => ['contacted', 'sample_sent', 'negotiating'].includes(r.status)).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Fechadas</p>
                <p className="text-2xl font-bold">{rfqs.filter(r => r.status === 'closed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  ${rfqs.reduce((acc, rfq) => acc + (rfq.quantity * rfq.target_price), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add RFQ Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova RFQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Produto *</label>
                <Input
                  value={newRfq.product_name}
                  onChange={(e) => setNewRfq(prev => ({ ...prev, product_name: e.target.value }))}
                  placeholder="Ex: Carregadores Solares 10W"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Empresa Compradora</label>
                <Input
                  value={newRfq.buyer_company}
                  onChange={(e) => setNewRfq(prev => ({ ...prev, buyer_company: e.target.value }))}
                  placeholder="Ex: GreenTech Solutions LLC"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Quantidade *</label>
                <Input
                  type="number"
                  value={newRfq.quantity}
                  onChange={(e) => setNewRfq(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="10000"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Preço Alvo (USD) *</label>
                <Input
                  type="number"
                  step="0.01"
                  value={newRfq.target_price}
                  onChange={(e) => setNewRfq(prev => ({ ...prev, target_price: e.target.value }))}
                  placeholder="8.50"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Localização do Comprador</label>
                <Input
                  value={newRfq.buyer_location}
                  onChange={(e) => setNewRfq(prev => ({ ...prev, buyer_location: e.target.value }))}
                  placeholder="Texas, EUA"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Prazo (dias)</label>
                <Input
                  type="number"
                  value={newRfq.deadline_days}
                  onChange={(e) => setNewRfq(prev => ({ ...prev, deadline_days: e.target.value }))}
                  placeholder="60"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Certificações (separadas por vírgula)</label>
              <Input
                value={newRfq.certifications}
                onChange={(e) => setNewRfq(prev => ({ ...prev, certifications: e.target.value }))}
                placeholder="FCC, CE, RoHS"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notas</label>
              <Textarea
                value={newRfq.notes}
                onChange={(e) => setNewRfq(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Observações sobre a oportunidade..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddRfq}>Adicionar RFQ</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RFQ List */}
      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <Card key={rfq.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{rfq.product_name}</h3>
                    <Badge className={`${getStatusColor(rfq.status)} text-white`}>
                      {getStatusText(rfq.status)}
                    </Badge>
                  </div>
                  
                  {rfq.buyer_company && (
                    <p className="text-muted-foreground mb-2">📊 {rfq.buyer_company}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{rfq.quantity.toLocaleString()} unidades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">${rfq.target_price}/unidade</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{rfq.buyer_location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{rfq.deadline_days} dias</span>
                    </div>
                  </div>

                  {rfq.certifications.length > 0 && (
                    <div className="flex gap-1 mb-3">
                      {rfq.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {rfq.notes && (
                    <p className="text-sm text-muted-foreground mb-3">💡 {rfq.notes}</p>
                  )}

                  {rfq.last_action && (
                    <p className="text-xs text-muted-foreground">🔄 {rfq.last_action}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyEmailTemplate(rfq)}
                    className="gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Template
                  </Button>
                  
                  <select
                    value={rfq.status}
                    onChange={(e) => updateStatus(rfq.id, e.target.value as CantonFairRFQ['status'])}
                    className="text-xs p-1 border rounded"
                  >
                    <option value="new">Nova</option>
                    <option value="contacted">Contatado</option>
                    <option value="sample_sent">Amostra Enviada</option>
                    <option value="negotiating">Negociando</option>
                    <option value="closed">Fechado</option>
                    <option value="lost">Perdido</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rfqs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma RFQ encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Adicione RFQs encontradas na Canton Fair para começar a rastrear oportunidades.
            </p>
            <Button onClick={() => setShowAddForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Primeira RFQ
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}