import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Building2, 
  Globe, 
  Mail, 
  DollarSign, 
  Users, 
  Award,
  Search,
  Filter,
  CheckCircle,
  Truck,
  PackageCheck,
  RefreshCw,
  Database,
  Loader2
} from 'lucide-react';

interface TargetSupplier {
  id: string;
  company_name: string;
  email: string;
  contact_person?: string;
  phone?: string;
  country: string;
  industry?: string;
  product_category?: string;
  website?: string;
  specialties?: string[];
  annual_revenue?: number;
  employee_count?: number;
  supplier_size?: string;
  verification_status?: string;
  potential_value?: number;
  data_source?: string;
  accepts_us_dropshipping?: string;
  accepts_us_distribution?: string;
}

const MajorSuppliersDatabase = () => {
  const [suppliers, setSuppliers] = useState<TargetSupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [populating, setPopulating] = useState(false);

  // Fetch suppliers from Supabase
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      console.log('Fetching suppliers...');
      
      const { data, error } = await supabase.functions.invoke('major-suppliers-populator', {
        body: { action: 'get_high_margin_suppliers' }
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Error fetching suppliers:', error);
        toast.error(`Erro ao carregar fornecedores: ${error.message}`);
        return;
      }

      if (data?.success) {
        const suppliers = data.suppliers || data.data?.suppliers || [];
        setSuppliers(suppliers);
        if (suppliers.length > 0) {
          toast.success(`${suppliers.length} fornecedores carregados com sucesso`);
        } else {
          toast.info('Base de dados vazia. Clique em "Popular Base de Dados" para carregar fornecedores.');
        }
      } else {
        console.log('No suppliers found in response:', data);
        setSuppliers([]);
        toast.info('Base de dados vazia. Clique em "Popular Base de Dados" para carregar fornecedores.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(`Erro ao conectar com o sistema: ${error.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Populate database with high-margin suppliers
  const populateDatabase = async () => {
    try {
      setPopulating(true);
      console.log('Starting database population...');
      toast.info('Populando base de dados com fornecedores premium...');

      const { data, error } = await supabase.functions.invoke('major-suppliers-populator', {
        body: { action: 'populate_high_margin_suppliers' }
      });

      console.log('Populate response:', { data, error });

      if (error) {
        console.error('Error populating database:', error);
        toast.error(`Erro ao popular base de dados: ${error.message}`);
        return;
      }

      if (data?.success) {
        const totalSuppliers = data.data?.inserted || data.inserted || data.total_suppliers || 'vários';
        toast.success(`✅ Base de dados populada com ${totalSuppliers} fornecedores premium!`);
        // Wait a moment then refresh the list
        setTimeout(() => {
          fetchSuppliers();
        }, 1000);
      } else {
        console.error('Population failed:', data);
        toast.error(`Erro ao popular base: ${data?.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Population error:', error);
      toast.error(`Erro ao conectar: ${error.message || 'Falha na conexão'}`);
    } finally {
      setPopulating(false);
    }
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      await fetchSuppliers();
      
      // Auto-populate if database is empty
      if (suppliers.length === 0) {
        console.log('Database empty, auto-populating...');
        await populateDatabase();
      }
    };
    
    initializeDatabase();
  }, []);

  // Filter suppliers based on search term and country
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = !searchTerm || 
      supplier.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.product_category && supplier.product_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (supplier.industry && supplier.industry.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCountry = !selectedCountry || selectedCountry === 'all' || supplier.country === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  // Group suppliers by country
  const suppliersByCountry = filteredSuppliers.reduce((acc, supplier) => {
    if (!acc[supplier.country]) {
      acc[supplier.country] = [];
    }
    acc[supplier.country].push(supplier);
    return acc;
  }, {} as Record<string, TargetSupplier[]>);

  const countries = Array.from(new Set(suppliers.map(s => s.country).filter(Boolean))).sort();
  
  const getTotalSuppliers = () => suppliers.length;

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'China': '🇨🇳',
      'Germany': '🇩🇪',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'Taiwan': '🇹🇼',
      'India': '🇮🇳',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'Mexico': '🇲🇽',
      'Argentina': '🇦🇷',
      'Chile': '🇨🇱',
      'Colombia': '🇨🇴',
      'Peru': '🇵🇪',
      'Italy': '🇮🇹',
      'France': '🇫🇷',
      'Netherlands': '🇳🇱',
      'Singapore': '🇸🇬',
      'Switzerland': '🇨🇭',
      'Israel': '🇮🇱',
      'Sweden': '🇸🇪',
      'Spain': '🇪🇸',
      'Portugal': '🇵🇹'
    };
    return flags[country] || '🌍';
  };

  const formatRevenue = (revenue?: number) => {
    if (!revenue) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(revenue);
  };

  const formatPotentialValue = (value?: number) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  // Create distribution campaign
  const createDistributionCampaign = async (supplier: TargetSupplier) => {
    try {
      toast.info(`🚀 Criando campanha de distribuição para ${supplier.company_name}...`);
      
      const { data, error } = await supabase.functions.invoke('global-distributor-engine', {
        body: {
          action: 'create_campaign',
          supplier_data: {
            id: supplier.id,
            company_name: supplier.company_name,
            email: supplier.email,
            country: supplier.country,
            contact_person: supplier.contact_person,
            product_category: supplier.product_category,
            potential_value: supplier.potential_value
          }
        }
      });

      if (error) {
        console.error('Campaign creation error:', error);
        toast.error(`❌ Erro ao criar campanha: ${error.message}`);
        return;
      }

      toast.success(`✅ Campanha criada! ID: ${data.campaign_id}`);
    } catch (error) {
      console.error('Campaign error:', error);
      toast.error('❌ Falha ao criar campanha de distribuição');
    }
  };

  // Detect opportunities
  const detectOpportunities = async (supplier: TargetSupplier) => {
    try {
      toast.info(`🎯 Detectando oportunidades para ${supplier.company_name}...`);
      
      const { data, error } = await supabase.functions.invoke('quantum-opportunity-detector', {
        body: {
          action: 'analyze_supplier',
          supplier_data: {
            id: supplier.id,
            company_name: supplier.company_name,
            country: supplier.country,
            product_category: supplier.product_category,
            specialties: supplier.specialties,
            potential_value: supplier.potential_value
          }
        }
      });

      if (error) {
        console.error('Opportunity detection error:', error);
        toast.error(`❌ Erro na detecção: ${error.message}`);
        return;
      }

      const opportunities = data.opportunities || [];
      toast.success(`✅ ${opportunities.length} oportunidades detectadas!`);
    } catch (error) {
      console.error('Detection error:', error);
      toast.error('❌ Falha na detecção de oportunidades');
    }
  };

  // Generate automatic contract
  const generateContract = async (supplier: TargetSupplier) => {
    try {
      toast.info(`📄 Gerando contrato automático para ${supplier.company_name}...`);
      
      const { data, error } = await supabase.functions.invoke('autonomous-negotiator', {
        body: {
          action: 'generate_contract',
          supplier_data: {
            id: supplier.id,
            company_name: supplier.company_name,
            email: supplier.email,
            country: supplier.country,
            contact_person: supplier.contact_person,
            accepts_us_distribution: supplier.accepts_us_distribution,
            accepts_us_dropshipping: supplier.accepts_us_dropshipping
          }
        }
      });

      if (error) {
        console.error('Contract generation error:', error);
        toast.error(`❌ Erro ao gerar contrato: ${error.message}`);
        return;
      }

      toast.success(`✅ Contrato gerado e enviado para ${supplier.email}`);
    } catch (error) {
      console.error('Contract error:', error);
      toast.error('❌ Falha ao gerar contrato automático');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
              <p className="text-xl text-white">Carregando base de fornecedores...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Database className="h-10 w-10 text-primary" />
            Base de Fornecedores Premium
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Base de dados integrada com {getTotalSuppliers()}+ fornecedores globais de alta margem, 
            conectada ao sistema de arbitragem quântica para oportunidades automáticas
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={fetchSuppliers}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar Lista
          </Button>
          
          <Button 
            onClick={populateDatabase}
            disabled={populating}
            className="bg-green-600 hover:bg-green-700"
          >
            {populating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Database className="h-4 w-4 mr-2" />
            )}
            Popular Base de Dados
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Filter className="h-5 w-5" />
              Filtros de Pesquisa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Pesquisar por empresa, categoria, indústria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Filtrar por país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os países</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {`${getCountryFlag(country)} ${country}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 text-center">
            <p className="text-lg text-slate-300">
              Exibindo {filteredSuppliers.length} de {getTotalSuppliers()} fornecedores
              {selectedCountry && selectedCountry !== 'all' && ` em ${selectedCountry}`}
            </p>
        </div>

        {/* Suppliers by Country */}
        <div className="space-y-8">
          {Object.entries(suppliersByCountry).map(([country, countrySuppliers]) => {
            const totalPotentialValue = countrySuppliers.reduce((sum, s) => sum + (s.potential_value || 0), 0);
            
            return (
              <Card key={country} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCountryFlag(country)}</span>
                      <span className="text-xl">{country}</span>
                      <Badge variant="secondary" className="bg-blue-600">
                        {countrySuppliers.length} fornecedores
                      </Badge>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-slate-300">Potencial Total:</div>
                      <div className="text-lg font-bold text-green-400">
                        {formatPotentialValue(totalPotentialValue)}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {countrySuppliers.map((supplier) => (
                      <Card key={supplier.id} className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-all">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Company Info */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                  <Building2 className="h-5 w-5 text-blue-400" />
                                  {supplier.company_name}
                                </h3>
                                {supplier.verification_status === 'verified' && (
                                  <Badge className="bg-green-600">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verificado
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-300">
                                  <Mail className="h-4 w-4 text-blue-400" />
                                  <a href={`mailto:${supplier.email}`} className="hover:text-blue-400">
                                    {supplier.email}
                                  </a>
                                </div>
                                
                                {supplier.contact_person && (
                                  <div className="flex items-center gap-2 text-slate-300">
                                    <Users className="h-4 w-4 text-green-400" />
                                    {supplier.contact_person}
                                  </div>
                                )}
                                
                                {supplier.website && (
                                  <div className="flex items-center gap-2 text-slate-300">
                                    <Globe className="h-4 w-4 text-purple-400" />
                                    <a 
                                      href={supplier.website} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="hover:text-purple-400"
                                    >
                                      {supplier.website}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Business Details */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-200">Detalhes do Negócio</h4>
                              <div className="space-y-2 text-sm text-slate-300">
                                {supplier.industry && (
                                  <div><span className="font-medium">Indústria:</span> {supplier.industry}</div>
                                )}
                                {supplier.product_category && (
                                  <div><span className="font-medium">Categoria:</span> {supplier.product_category}</div>
                                )}
                                {supplier.supplier_size && (
                                  <div><span className="font-medium">Porte:</span> {supplier.supplier_size}</div>
                                )}
                                {supplier.employee_count && (
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{supplier.employee_count.toLocaleString()} funcionários</span>
                                  </div>
                                )}
                                {supplier.annual_revenue && (
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Receita: {formatRevenue(supplier.annual_revenue)}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Partnership & Specialties */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-200">Parceria EUA & Especialidades</h4>
                              
                              {/* Action Buttons */}
                              <div className="flex gap-2 mb-3">
                                <Button 
                                  size="sm"
                                  onClick={() => createDistributionCampaign(supplier)}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  🚀 Campanha
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => detectOpportunities(supplier)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  🎯 Detectar
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => generateContract(supplier)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  📄 Contrato
                                </Button>
                              </div>
                              
                              {/* US Partnership Status */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <PackageCheck className="h-4 w-4" />
                                  <span className="text-sm font-medium">Dropshipping EUA:</span>
                                  <Badge 
                                    variant={supplier.accepts_us_dropshipping === 'SIM' ? 'default' : 'secondary'}
                                    className={supplier.accepts_us_dropshipping === 'SIM' ? 'bg-green-600' : 'bg-red-600'}
                                  >
                                    {supplier.accepts_us_dropshipping || 'NÃO'}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Truck className="h-4 w-4" />
                                  <span className="text-sm font-medium">Distribuição EUA:</span>
                                  <Badge 
                                    variant={supplier.accepts_us_distribution === 'SIM' ? 'default' : 'secondary'}
                                    className={supplier.accepts_us_distribution === 'SIM' ? 'bg-green-600' : 'bg-red-600'}
                                  >
                                    {supplier.accepts_us_distribution || 'NÃO'}
                                  </Badge>
                                </div>
                              </div>

                              {/* Specialties */}
                              {supplier.specialties && supplier.specialties.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Award className="h-4 w-4 text-yellow-400" />
                                    <span className="text-sm font-medium text-slate-200">Especialidades:</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {supplier.specialties.slice(0, 3).map((specialty, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs border-slate-500 text-slate-300">
                                        {specialty}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Potential Value */}
                              {supplier.potential_value && (
                                <div className="bg-slate-600/50 p-3 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-400" />
                                    <span className="font-semibold text-green-400">Potencial de Negócio:</span>
                                  </div>
                                  <div className="text-xl font-bold text-green-300">
                                    {formatPotentialValue(supplier.potential_value)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Database className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {suppliers.length === 0 ? 'Base de dados vazia' : 'Nenhum fornecedor encontrado'}
              </h3>
              <p className="text-slate-300 mb-6">
                {suppliers.length === 0 
                  ? 'Clique em "Popular Base de Dados" para carregar os fornecedores premium.'
                  : 'Tente ajustar os filtros de pesquisa ou país.'
                }
              </p>
              {suppliers.length === 0 && (
                <Button 
                  onClick={populateDatabase}
                  disabled={populating}
                  className="bg-primary hover:bg-primary/90"
                >
                  {populating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="h-4 w-4 mr-2" />
                  )}
                  Popular Base de Dados
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MajorSuppliersDatabase;