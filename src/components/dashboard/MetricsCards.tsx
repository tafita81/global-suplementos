import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  status?: "success" | "warning" | "error" | "info";
}

interface MetricsData {
  activeOpportunities: number;
  totalValue: number;
  activeProducts: number;
  complianceScore: number;
}

function MetricCard({ title, value, change, trend, icon, status }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "success": return "bg-success/10 text-success border-success/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "error": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${getStatusColor()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground/70">{title}</CardTitle>
        <div className="h-5 w-5 opacity-70">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`text-xs flex items-center mt-1 ${
            trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          }`}>
            {trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
            {trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MetricsCards() {
  const [metrics, setMetrics] = useState<MetricsData>({
    activeOpportunities: 0,
    totalValue: 0,
    activeProducts: 0,
    complianceScore: 0
  });

  useEffect(() => {
    fetchRealMetrics();
  }, []);

  const fetchRealMetrics = async () => {
    try {
      // Fetch ALL opportunities (total accumulated)
      const { data: allOpportunities } = await supabase
        .from('opportunities')
        .select('estimated_value, status');

      // Fetch all Mycogenesis products
      const { data: allProducts } = await supabase
        .from('mycogenesis_products')
        .select('id');

      // Check company configurations for compliance score
      const { data: companyData } = await supabase
        .from('company_memory')
        .select('*')
        .limit(1)
        .maybeSingle();

      const activeOpportunities = allOpportunities?.length || 0;
      const totalValue = allOpportunities?.reduce((sum, opp) => sum + (Number(opp.estimated_value) || 0), 0) || 0;
      const activeProducts = allProducts?.length || 0;
      
      // Calculate compliance score based on configurations
      let complianceScore = 0;
      if (companyData?.company_data) {
        const data = companyData.company_data as any;
        if (data.payoneerId) complianceScore += 25;
        if (data.samGovCredentials) complianceScore += 25;
        if (data.alibabaCredentials) complianceScore += 25;
        if (data.ein_number) complianceScore += 25;
      }

      setMetrics({
        activeOpportunities,
        totalValue,
        activeProducts,
        complianceScore
      });

    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Opportunities"
        value={metrics.activeOpportunities.toString()}
        change="Detected in real time"
        trend={metrics.activeOpportunities > 0 ? "up" : "neutral"}
        icon={<TrendingUp className="h-4 w-4" />}
        status={metrics.activeOpportunities > 0 ? "success" : "warning"}
      />
      <MetricCard
        title="Value Under Analysis"
        value={`$${(metrics.totalValue / 1000).toFixed(0)}K`}
        change="Total value detected"
        trend={metrics.totalValue > 0 ? "up" : "neutral"}
        icon={<DollarSign className="h-4 w-4" />}
        status="info"
      />
      <MetricCard
        title="Active Products"
        value={metrics.activeProducts.toString()}
        change="Mycogenesis Portfolio"
        trend="neutral"
        icon={<Package className="h-4 w-4" />}
        status="success"
      />
      <MetricCard
        title="Compliance Score"
        value={`${metrics.complianceScore}%`}
        change={metrics.complianceScore === 0 ? "Requires attention" : "Configured"}
        trend={metrics.complianceScore >= 90 ? "up" : "down"}
        icon={metrics.complianceScore === 0 ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
        status={metrics.complianceScore >= 90 ? "success" : "warning"}
      />
    </div>
  );
}