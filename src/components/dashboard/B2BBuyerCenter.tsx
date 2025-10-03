import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SalesAnalyticsDashboard from "./SalesAnalyticsDashboard";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Globe, 
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Clock,
  Target,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from "lucide-react";

interface B2BBuyer {
  id: string;
  platform: string;
  company_name: string;
  contact_person: string;
  email: string;
  country: string;
  industry: string;
  product_needs: string[];
  order_volume: string;
  budget_range: string;
  timeline: string;
  lead_score: number;
  status: string;
  decision_maker_level: string;
  company_size: string;
  created_at: string;
}

interface Negotiation {
  id: string;
  buyer_company: string;
  contact_email: string;
  status: string;
  success_probability: number;
  negotiation_stage: string;
  email_content: string;
  created_at: string;
}

interface DropshipPartner {
  id: string;
  partner_name: string;
  country: string;
  specialties: string[];
  commission_rate: number;
  minimum_order_value: number;
  fulfillment_time_days: number;
  rating: number;
  integration_status: string;
  shipping_zones?: string[];
  coverage_notes?: string;
  regulatory_certifications?: string[];
  language_support?: string[];
  payment_methods?: string[];
}

export default function B2BBuyerCenter() {
  const [buyers, setBuyers] = useState<B2BBuyer[]>([]);
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [partners, setPartners] = useState<DropshipPartner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<DropshipPartner[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [stats, setStats] = useState({
    totalBuyers: 0,
    qualifiedLeads: 0,
    activeNegotiations: 0,
    conversionRate: 0
  });

  useEffect(() => {
    loadBuyersData();
    loadNegotiations();
    loadPartners();
  }, []);

  useEffect(() => {
    filterPartnersByRegion(selectedRegion);
  }, [partners]);

  const loadBuyersData = async () => {
    try {
      const { data, error } = await supabase
        .from('b2b_buyers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      if (data) {
        setBuyers(data);
        updateStats(data);
      }
    } catch (error: any) {
      console.error('Error loading buyers:', error);
    }
  };

  const loadNegotiations = async () => {
    try {
      const { data, error } = await supabase
        .from('negotiations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setNegotiations(data);
    } catch (error: any) {
      console.error('Error loading negotiations:', error);
    }
  };

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('dropship_partners')
        .select('*')
        .eq('active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      if (data) {
        setPartners(data);
        setFilteredPartners(data);
      }
    } catch (error: any) {
      console.error('Error loading partners:', error);
    }
  };

  // Filtrar parceiros por região
  const filterPartnersByRegion = (region: string) => {
    setSelectedRegion(region);
    if (region === 'all') {
      setFilteredPartners(partners);
    } else {
      const filtered = partners.filter(partner => {
        const regions = {
          'americas': ['USA', 'Canada', 'Brazil', 'Mexico'],
          'europe': ['Germany', 'Sweden', 'Italy', 'United Kingdom'],
          'asia': ['Singapore', 'Australia', 'Japan', 'South Korea', 'India'],
          'middle_east_africa': ['UAE', 'South Africa', 'Israel']
        };
        return regions[region as keyof typeof regions]?.includes(partner.country);
      });
      setFilteredPartners(filtered);
    }
  };

  // Obter estatísticas globais dos parceiros
  const getPartnerStats = () => {
    const continents = new Set();
    const totalZones = new Set();
    let avgCommission = 0;
    
    partners.forEach(partner => {
      // Classificar por continente
      if (['USA', 'Canada', 'Brazil', 'Mexico'].includes(partner.country)) {
        continents.add('Americas');
      } else if (['Germany', 'Sweden', 'Italy', 'United Kingdom'].includes(partner.country)) {
        continents.add('Europe');
      } else if (['Singapore', 'Australia', 'Japan', 'South Korea', 'India'].includes(partner.country)) {
        continents.add('Asia-Pacific');
      } else if (['UAE', 'South Africa', 'Israel'].includes(partner.country)) {
        continents.add('MEA');
      }
      
      // Zonas de envio
      partner.shipping_zones?.forEach(zone => totalZones.add(zone));
      avgCommission += partner.commission_rate;
    });
    
    return {
      continents: continents.size,
      countries: partners.length,
      shippingZones: totalZones.size,
      avgCommission: partners.length > 0 ? (avgCommission / partners.length).toFixed(1) : 0
    };
  };

  const updateStats = (buyersData: B2BBuyer[]) => {
    const qualified = buyersData.filter(b => b.lead_score >= 75).length;
    const activeNegs = negotiations.filter(n => n.status === 'sent' || n.status === 'in_progress').length;
    
    setStats({
      totalBuyers: buyersData.length,
      qualifiedLeads: qualified,
      activeNegotiations: activeNegs,
      conversionRate: buyersData.length > 0 ? Math.round((qualified / buyersData.length) * 100) : 0
    });
  };

  const startBuyerDetection = async () => {
    setIsScanning(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('b2b-buyer-detector', {
        body: { action: 'scan_all_platforms' }
      });

      if (error) throw error;

      toast({
        title: "Buyer Detection Started",
        description: `Found ${data.summary?.qualified || 0} qualified buyers and ${data.summary?.negotiations_started || 0} negotiations started.`,
      });

      // Recarrega os dados
      await loadBuyersData();
      await loadNegotiations();
      
    } catch (error: any) {
      console.error('Error detecting buyers:', error);
      toast({
        title: "Detection Error",
        description: "Failed to detect B2B buyers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot_lead': return 'bg-red-500';
      case 'qualified': return 'bg-green-500';
      case 'new_lead': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">B2B Buyer Center</h2>
          <p className="text-muted-foreground">
            Automatic detection and negotiation with global buyers
          </p>
        </div>
        <Button 
          onClick={startBuyerDetection} 
          disabled={isScanning}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Detect Buyers
            </>
          )}
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBuyers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.qualifiedLeads} qualified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.qualifiedLeads}
            </div>
            <p className="text-xs text-muted-foreground">
              Score ≥ 75 points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Negotiations</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.activeNegotiations}
            </div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.conversionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Leads → Qualified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="buyers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buyers">B2B Buyers</TabsTrigger>
          <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
          <TabsTrigger value="partners">Dropship Partners</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

        {/* Tab de Compradores */}
        <TabsContent value="buyers" className="space-y-4">
          <div className="grid gap-4">
            {buyers.map((buyer) => (
              <Card key={buyer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{buyer.company_name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {buyer.country} • {buyer.industry}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        className={`${getStatusColor(buyer.status)} text-white`}
                      >
                        {buyer.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`${getLeadScoreColor(buyer.lead_score)} border-current`}
                      >
                        Score: {buyer.lead_score}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Contact</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {buyer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {buyer.contact_person}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Needs</h4>
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {buyer.product_needs.map((need, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {need}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Volume: {buyer.order_volume}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Potential</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3" />
                          {buyer.budget_range}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {buyer.timeline}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {buyer.platform} • {buyer.company_size} company
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Negociações */}
        <TabsContent value="negotiations" className="space-y-4">
          <div className="grid gap-4">
            {negotiations.map((negotiation) => (
              <Card key={negotiation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {negotiation.buyer_company}
                      </CardTitle>
                      <CardDescription>
                        {negotiation.contact_email}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant={negotiation.status === 'sent' ? 'default' : 'secondary'}
                      >
                        {negotiation.status.toUpperCase()}
                      </Badge>
                        <Badge variant="outline">
                          {negotiation.success_probability}% success
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-semibold text-sm">Email Sent:</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                        {negotiation.email_content.split('\n').slice(0, 5).join('\n')}
                        {negotiation.email_content.split('\n').length > 5 && '...'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Stage: {negotiation.negotiation_stage.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(negotiation.created_at).toLocaleDateString('en-US')}
                      </div>
                    </div>
                    
                    <Progress 
                      value={negotiation.success_probability} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Parceiros Dropship */}
        <TabsContent value="partners" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Rede Global de Parceiros</h3>
              <p className="text-sm text-muted-foreground">
                {getPartnerStats().continents} continentes • {getPartnerStats().countries} países • {getPartnerStats().shippingZones} zonas de envio
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedRegion === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => filterPartnersByRegion('all')}
              >
                🌍 Todos ({partners.length})
              </Button>
              <Button 
                variant={selectedRegion === 'americas' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => filterPartnersByRegion('americas')}
              >
                🌎 Américas
              </Button>
              <Button 
                variant={selectedRegion === 'europe' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => filterPartnersByRegion('europe')}
              >
                🇪🇺 Europa
              </Button>
              <Button 
                variant={selectedRegion === 'asia' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => filterPartnersByRegion('asia')}
              >
                🌏 Ásia-Pacífico
              </Button>
              <Button 
                variant={selectedRegion === 'middle_east_africa' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => filterPartnersByRegion('middle_east_africa')}
              >
                🌍 MEA
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{partner.partner_name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {partner.country}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant={partner.integration_status === 'active' ? 'default' : 'secondary'}
                      >
                        {partner.integration_status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        ⭐ {partner.rating}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Especialidades */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Termos comerciais */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold text-green-600">Comissão:</span> {partner.commission_rate}%
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">Fulfillment:</span> {partner.fulfillment_time_days}d
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-purple-600">Mín. Pedido:</span> ${partner.minimum_order_value}
                    </div>
                  </div>

                  {/* Zonas de envio */}
                  {partner.shipping_zones && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Cobertura Global</h4>
                      <div className="flex flex-wrap gap-1">
                        {partner.shipping_zones.slice(0, 3).map((zone, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {zone}
                          </Badge>
                        ))}
                        {partner.shipping_zones.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{partner.shipping_zones.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certificações */}
                  {partner.regulatory_certifications && partner.regulatory_certifications.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Certificações</h4>
                      <div className="flex flex-wrap gap-1">
                        {partner.regulatory_certifications.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                            ✓ {cert}
                          </Badge>
                        ))}
                        {partner.regulatory_certifications.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{partner.regulatory_certifications.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Idiomas suportados */}
                  {partner.language_support && partner.language_support.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Idiomas</h4>
                      <div className="text-xs text-muted-foreground">
                        {partner.language_support.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Notas de cobertura */}
                  {partner.coverage_notes && (
                    <div className="bg-blue-50 p-2 rounded text-xs">
                      <strong>💡 Vantagem:</strong> {partner.coverage_notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumo estatístico */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">📊 Cobertura Global Completa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{getPartnerStats().continents}</div>
                  <div className="text-sm text-muted-foreground">Continentes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{getPartnerStats().countries}</div>
                  <div className="text-sm text-muted-foreground">Países Parceiros</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{getPartnerStats().shippingZones}+</div>
                  <div className="text-sm text-muted-foreground">Zonas de Envio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{getPartnerStats().avgCommission}%</div>
                  <div className="text-sm text-muted-foreground">Comissão Média</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-center text-muted-foreground">
                ✅ Cobertura mundial completa • 🚚 Fulfillment 1-8 dias • 💰 Comissões 10-22% • 🌍 Suporte multilíngue
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Analytics Avançado */}
        <TabsContent value="analytics" className="space-y-4">
          <SalesAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}