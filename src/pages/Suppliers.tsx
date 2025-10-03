import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Building2, MapPin, Star, ExternalLink, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  country: string;
  category: string;
  reliability_score: number;
  contact_info: any;
  active: boolean;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setSuppliers(data || []);

    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      toast.error('Erro ao carregar fornecedores');
    } finally {
      setLoading(false);
    }
  };

  const createSampleSupplier = async () => {
    try {
      const sampleSupplier = {
        name: `Fornecedor Global ${Date.now()}`,
        country: "China",
        category: "Manufacturing",
        reliability_score: Math.floor(Math.random() * 40) + 60, // 60-100
        contact_info: {
          platform: "alibaba.com",
          verified: true,
          email: "contact@supplier.com"
        },
        active: true
      };

      const { error } = await supabase
        .from('suppliers')
        .insert([sampleSupplier]);

      if (error) throw error;

      toast.success('Novo fornecedor adicionado!');
      fetchSuppliers();

    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      toast.error('Erro ao adicionar fornecedor');
    }
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getReliabilityBadge = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(suppliers.map(s => s.category))].filter(Boolean);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
            <p className="text-muted-foreground">Carregando fornecedores reais...</p>
          </div>
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <p className="text-muted-foreground">
            {suppliers.length} fornecedores na sua rede global
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createSampleSupplier}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Fornecedor
          </Button>
          <Button variant="outline" onClick={fetchSuppliers}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar fornecedor ou país..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {supplier.country}
                      </div>
                    </div>
                  </div>
                  <Badge variant={supplier.active ? "default" : "secondary"}>
                    {supplier.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <Badge variant="outline">{supplier.category || 'Não especificado'}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium mb-1">Confiabilidade</p>
                      <div className="flex items-center space-x-2">
                        <Star className={`h-4 w-4 ${getReliabilityColor(supplier.reliability_score || 0)}`} />
                        <span className={`font-medium ${getReliabilityColor(supplier.reliability_score || 0)}`}>
                          {supplier.reliability_score || 0}%
                        </span>
                        <Badge variant={
                          (supplier.reliability_score || 0) >= 80 ? "default" : 
                          (supplier.reliability_score || 0) >= 60 ? "outline" : "destructive"
                        } className="text-xs">
                          {(supplier.reliability_score || 0) >= 80 ? "Excelente" : 
                           (supplier.reliability_score || 0) >= 60 ? "Bom" : "Regular"}
                        </Badge>
                      </div>
                    </div>
                    
                    {supplier.contact_info?.verified && (
                      <Badge variant="default" className="text-xs">
                        Verificado
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2">
            <Card>
              <CardContent className="p-12 text-center">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum fornecedor encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {suppliers.length === 0 
                    ? "Adicione fornecedores para começar a operar"
                    : "Tente ajustar os filtros para ver mais resultados"
                  }
                </p>
                <Button onClick={createSampleSupplier}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Fornecedor
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}