import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Cpu, 
  Heart, 
  Sparkles, 
  Pill, 
  Globe, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Building,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface HighMarginSupplier {
  id: string;
  company_name: string;
  country: string;
  email: string;
  website?: string;
  phone?: string;
  contact_person?: string;
  industry: string;
  product_category: string;
  employee_count?: number;
  annual_revenue?: number;
  potential_value?: number;
  specialties?: string[];
  verification_status: string;
  accepts_usa_distributors: boolean;
  contract_types: string[];
  min_order_value?: number;
  commission_rate?: string;
  margin_percentage?: number;
}

interface GroupedSuppliers {
  [country: string]: HighMarginSupplier[];
}

const GlobalDistributionContracts = () => {
  const [suppliers, setSuppliers] = useState<HighMarginSupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    loadHighMarginSuppliers();
  }, []);

  const loadHighMarginSuppliers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('major-suppliers-populator', {
        body: { action: 'get_high_margin_suppliers' }
      });

      if (error) throw error;

      if (data?.suppliers) {
        setSuppliers(data.suppliers);
        toast({
          title: "Success",
          description: `Loaded ${data.suppliers.length} high-margin suppliers`,
        });
      }
    } catch (error) {
      console.error('Error loading suppliers:', error);
      toast({
        title: "Error",
        description: "Failed to load suppliers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const initiateContract = async (supplier: HighMarginSupplier) => {
    try {
      const { data, error } = await supabase.functions.invoke('global-distributor-engine', {
        body: {
          supplier_data: {
            company: supplier.company_name,
            email: supplier.email,
            contact_person: supplier.contact_person,
            country: supplier.country,
            industry: supplier.industry,
            product_category: supplier.product_category,
            specialties: supplier.specialties,
            commission_rate: supplier.commission_rate,
            min_order_value: supplier.min_order_value
          },
          contract_type: 'distribution_agreement'
        }
      });

      if (error) throw error;

      toast({
        title: "Contract Initiated",
        description: `Distribution contract initiated with ${supplier.company_name}`,
      });
    } catch (error) {
      console.error('Error initiating contract:', error);
      toast({
        title: "Error",
        description: "Failed to initiate contract",
        variant: "destructive",
      });
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.product_category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supplier.product_category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || supplier.country === selectedCountry;
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const groupedSuppliers: GroupedSuppliers = filteredSuppliers.reduce((acc, supplier) => {
    if (!acc[supplier.country]) {
      acc[supplier.country] = [];
    }
    acc[supplier.country].push(supplier);
    return acc;
  }, {} as GroupedSuppliers);

  const getCountryFlag = (country: string): string => {
    const flags: { [key: string]: string } = {
      'China': '🇨🇳', 'India': '🇮🇳', 'South Korea': '🇰🇷', 'Taiwan': '🇹🇼', 'Japan': '🇯🇵',
      'USA': '🇺🇸', 'Germany': '🇩🇪', 'United Kingdom': '🇬🇧', 'Canada': '🇨🇦',
      'Brazil': '🇧🇷', 'Australia': '🇦🇺', 'Netherlands': '🇳🇱', 'France': '🇫🇷'
    };
    return flags[country] || '🌍';
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Quantum') || category.includes('Semiconductor')) return <Cpu className="h-4 w-4" />;
    if (category.includes('Medical') || category.includes('Health')) return <Heart className="h-4 w-4" />;
    if (category.includes('Beauty') || category.includes('Cosmetics')) return <Sparkles className="h-4 w-4" />;
    if (category.includes('Supplements') || category.includes('Nutrition')) return <Pill className="h-4 w-4" />;
    return <Target className="h-4 w-4" />;
  };

  const formatRevenue = (revenue?: number): string => {
    if (!revenue) return 'N/A';
    if (revenue >= 1000000000) return `$${(revenue / 1000000000).toFixed(1)}B`;
    if (revenue >= 1000000) return `$${(revenue / 1000000).toFixed(1)}M`;
    return `$${(revenue / 1000).toFixed(0)}K`;
  };

  const formatPotentialValue = (value?: number): string => {
    if (!value) return 'N/A';
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const categories = Array.from(new Set(suppliers.map(s => s.product_category)));
  const countries = Array.from(new Set(suppliers.map(s => s.country)));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Global Distribution Contracts
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          High-margin suppliers approved for USA distribution and dropshipping partnerships. 
          Generate thousands in daily commissions with verified international suppliers.
        </p>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{suppliers.length}</p>
                <p className="text-sm text-muted-foreground">Suppliers</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{countries.length}</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">156%</p>
                <p className="text-sm text-muted-foreground">Max Margin</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">18%</p>
                <p className="text-sm text-muted-foreground">Max Commission</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Suppliers</label>
            <Input
              placeholder="Search by company, country, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {getCountryFlag(country)} {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Suppliers by Country */}
      <div className="space-y-8">
        {Object.entries(groupedSuppliers).map(([country, countrySuppliers]) => (
          <div key={country} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getCountryFlag(country)}</span>
              <h2 className="text-2xl font-bold">{country}</h2>
              <Badge variant="secondary">{countrySuppliers.length} suppliers</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countrySuppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getCategoryIcon(supplier.product_category)}
                          {supplier.company_name}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Building className="h-3 w-3" />
                            {supplier.industry}
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-3 w-3" />
                            {supplier.product_category}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant={supplier.verification_status === 'verified' ? 'default' : 'secondary'}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {supplier.verification_status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      {supplier.contact_person && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-3 w-3" />
                          {supplier.contact_person}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {supplier.email}
                      </div>
                      {supplier.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {supplier.phone}
                        </div>
                      )}
                    </div>

                    {/* Business Metrics */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Annual Revenue</p>
                        <p className="font-semibold">{formatRevenue(supplier.annual_revenue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Potential Value</p>
                        <p className="font-semibold text-primary">{formatPotentialValue(supplier.potential_value)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Commission</p>
                        <p className="font-semibold text-green-600">{supplier.commission_rate || 'Negotiable'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Min Order</p>
                        <p className="font-semibold">${supplier.min_order_value?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Specialties */}
                    {supplier.specialties && supplier.specialties.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">HIGH-MARGIN SPECIALTIES</p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.specialties.slice(0, 3).map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {supplier.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{supplier.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contract Types */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">AVAILABLE CONTRACTS</p>
                      <div className="flex gap-2">
                        {supplier.contract_types.map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => initiateContract(supplier)}
                        className="flex-1"
                        size="sm"
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Start Contract
                      </Button>
                      {supplier.website && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(supplier.website, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && !loading && (
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">No suppliers found matching your criteria.</p>
            <Button onClick={loadHighMarginSuppliers} className="mt-4">
              Reload Suppliers
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GlobalDistributionContracts;