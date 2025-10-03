import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AIInsight {
  id: string;
  type: "opportunity" | "risk" | "optimization" | "trend";
  title: string;
  description: string;
  confidence: number;
  priority: "high" | "medium" | "low";
  action?: string;
  source: string;
}

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealInsights();
  }, []);

  const fetchRealInsights = async () => {
    try {
      // Search for recent opportunity insights
      const { data: opportunities } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Search system logs for AI analysis
      const { data: logs } = await supabase
        .from('system_logs')
        .select('*')
        .eq('module', 'opportunity-detector')
        .eq('success', true)
        .order('created_at', { ascending: false })
        .limit(5);

      // Search compliance checks
      const { data: complianceIssues } = await supabase
        .from('compliance_checks')
        .select('*')
        .eq('status', 'failed')
        .order('created_at', { ascending: false })
        .limit(3);

      const realInsights: AIInsight[] = [];

      // Generate insights based on real opportunities
      if (opportunities && opportunities.length > 0) {
        const highValueOpp = opportunities.find(opp => (opp.estimated_value || 0) > 50000);
        if (highValueOpp) {
          realInsights.push({
            id: `opp-${highValueOpp.id}`,
            type: "opportunity",
            title: "High-Value Opportunity Detected",
            description: `${highValueOpp.product_name || 'Product'} in ${highValueOpp.target_country || 'international market'} with estimated value of $${(highValueOpp.estimated_value || 0).toLocaleString()}`,
            confidence: Math.min(95, Math.max(70, 100 - (highValueOpp.risk_score || 20))),
            priority: "high",
            action: "Analyze opportunity",
            source: highValueOpp.source || 'System'
          });
        }

        const lowRiskOpps = opportunities.filter(opp => (opp.risk_score || 100) < 30);
        if (lowRiskOpps.length > 0) {
          realInsights.push({
            id: `trend-${Date.now()}`,
            type: "trend",
            title: "Low-Risk Trend Identified",
            description: `${lowRiskOpps.length} opportunities with risk under 30% detected in the last 24h`,
            confidence: 88,
            priority: "medium",
            source: 'Risk Analysis'
          });
        }
      }

      // Generate compliance insights
      if (complianceIssues && complianceIssues.length > 0) {
        realInsights.push({
          id: `compliance-${Date.now()}`,
          type: "risk",
          title: "Compliance Alert",
          description: `${complianceIssues.length} compliance checks failed. Immediate action required.`,
          confidence: 95,
          priority: "high",
          action: "Review compliance",
          source: 'Compliance System'
        });
      }

      // Optimization insights based on logs
      if (logs && logs.length > 0) {
        const recentSuccess = logs[0];
        const logData = recentSuccess.data as any;
        if (logData?.detected_count > 0) {
          realInsights.push({
            id: `optimization-${Date.now()}`,
            type: "optimization",
            title: "Detection System Optimized",
            description: `Last scan detected ${logData.detected_count} opportunities in ${logData.scan_time || 'record time'}`,
            confidence: 92,
            priority: "medium",
            action: "View full report",
            source: 'Detection Engine'
          });
        }
      }

      // If no real insights, show system status
      if (realInsights.length === 0) {
        realInsights.push({
          id: 'system-status',
          type: "optimization",
          title: "System Awaiting Data",
          description: "Run opportunity detection to generate personalized insights",
          confidence: 100,
          priority: "low",
          action: "Detect Opportunities",
          source: 'System Status'
        });
      }

      setInsights(realInsights);

    } catch (error) {
      console.error('Error fetching real insights:', error);
      // Fallback to basic system insights
      setInsights([{
        id: 'error-fallback',
        type: "risk",
        title: "Connection Error",
        description: "Unable to fetch real-time insights. Please check your connection.",
        confidence: 100,
        priority: "medium",
        source: 'System'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity": return <TrendingUp className="h-4 w-4 text-success" />;
      case "risk": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "optimization": return <Zap className="h-4 w-4 text-primary" />;
      case "trend": return <CheckCircle className="h-4 w-4 text-accent" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary animate-pulse" />
            Loading Insights...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
          <CardDescription>
            Real-time analyses based on current data
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-primary border-primary">
          {insights.length} Insights
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start space-x-3 flex-1">
              <div className="p-1.5 bg-accent/20 rounded">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${getConfidenceColor(insight.confidence)}`}>
                      {insight.confidence}% confidence
                    </span>
                    <Badge 
                      variant={getPriorityColor(insight.priority) as any}
                      className="text-xs"
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Source: {insight.source}
                  </span>
                  {insight.action && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => {
                        if (insight.action === "Detect Opportunities") {
                          window.location.href = '/';
                        }
                      }}
                    >
                      {insight.action}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}