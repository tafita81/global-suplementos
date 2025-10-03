import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Globe, 
  Bot,
  Bolt,
  Gauge,
  Target,
  Clock,
  ArrowUpRight,
  Play,
  Pause,
  BarChart3,
  DollarSign,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";

interface ExecutionMetric {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  color: string;
}

interface LiveOrder {
  id: string;
  product: string;
  supplier: string;
  country: string;
  value: number;
  margin: number;
  status: "executing" | "completed" | "analyzing";
  timestamp: string;
}

export default function RealTimeExecution() {
  const [isExecutionActive, setIsExecutionActive] = useState(true);
  const [activeOrders, setActiveOrders] = useState(247);
  const [realTimeProfit, setRealTimeProfit] = useState(1847293);

  const executionMetrics: ExecutionMetric[] = [
    {
      name: "Active Executions",
      value: "247",
      change: "+23%",
      trend: "up",
      color: "text-success"
    },
    {
      name: "Real-Time Profit",
      value: "$1.84M",
      change: "+18.7%", 
      trend: "up",
      color: "text-success"
    },
    {
      name: "Success Rate",
      value: "98.7%",
      change: "+0.3%",
      trend: "up", 
      color: "text-success"
    },
    {
      name: "Avg Response",
      value: "0.23s",
      change: "-15%",
      trend: "up",
      color: "text-success"
    },
    {
      name: "Global Markets",
      value: "185",
      change: "+12",
      trend: "up",
      color: "text-primary"
    },
    {
      name: "Volume Today",
      value: "$12.7M", 
      change: "+34%",
      trend: "up",
      color: "text-primary"
    }
  ];

  const liveOrders: LiveOrder[] = [
    {
      id: "EX001",
      product: "Omega-3 Premium 1000mg",
      supplier: "Nordic Naturals (Norway)",
      country: "🇺🇸 USA",
      value: 45600,
      margin: 67,
      status: "executing",
      timestamp: "2s ago"
    },
    {
      id: "EX002", 
      product: "Vitamin D3 5000IU",
      supplier: "Solgar Vitamins (UK)",
      country: "🇩🇪 Germany", 
      value: 23400,
      margin: 54,
      status: "completed",
      timestamp: "5s ago"
    },
    {
      id: "EX003",
      product: "Turmeric Curcumin Complex",
      supplier: "Himalaya Wellness (India)",
      country: "🇨🇦 Canada",
      value: 67800, 
      margin: 78,
      status: "analyzing",
      timestamp: "8s ago"
    },
    {
      id: "EX004",
      product: "Collagen Peptides Powder",
      supplier: "Vital Proteins (USA)",
      country: "🇦🇺 Australia",
      value: 89200,
      margin: 83,
      status: "executing", 
      timestamp: "12s ago"
    },
    {
      id: "EX005",
      product: "Probiotics 50 Billion CFU",
      supplier: "Garden of Life (Canada)",
      country: "🇬🇧 UK",
      value: 34500,
      margin: 71,
      status: "completed",
      timestamp: "15s ago"
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isExecutionActive) {
        setActiveOrders(prev => prev + Math.floor(Math.random() * 3) - 1);
        setRealTimeProfit(prev => prev + Math.floor(Math.random() * 10000));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isExecutionActive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "executing": return <Zap className="h-4 w-4 text-warning animate-pulse" />;
      case "completed": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "analyzing": return <Activity className="h-4 w-4 text-primary animate-pulse" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "executing": return "border-l-warning bg-warning/5";
      case "completed": return "border-l-success bg-success/5";
      case "analyzing": return "border-l-primary bg-primary/5";
      default: return "border-l-muted-foreground bg-muted/5";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-900 via-red-900 to-orange-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-radial from-orange-400/20 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-radial from-red-400/20 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-8 py-3">
              <Bolt className="h-5 w-5 text-orange-300 animate-pulse" />
              <span className="text-sm font-medium">Real-Time Execution Engine</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
              Lightning Speed
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
              Execute global arbitrage opportunities in <span className="font-bold text-orange-300">milliseconds</span>, 
              with <span className="font-bold text-orange-300">${realTimeProfit.toLocaleString()}</span> in 
              real-time profit and <span className="font-bold text-orange-300">{activeOrders} active</span> executions
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-4"
                onClick={() => setIsExecutionActive(!isExecutionActive)}
              >
                {isExecutionActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                {isExecutionActive ? "Pause Execution" : "Resume Execution"}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Real-Time Metrics */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Live Execution Metrics</h2>
              <p className="text-muted-foreground">Real-time performance data updated every second</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isExecutionActive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
              <span className="text-sm font-medium">
                {isExecutionActive ? 'Live Execution Active' : 'Execution Paused'}
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {executionMetrics.map((metric, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold">{metric.value}</p>
                        <div className={`flex items-center gap-1 text-sm font-medium ${metric.color}`}>
                          {metric.trend === "up" && <ArrowUpRight className="h-4 w-4" />}
                          <span>{metric.change}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                      {index % 6 === 0 && <Zap className="h-6 w-6 text-primary" />}
                      {index % 6 === 1 && <DollarSign className="h-6 w-6 text-success" />}
                      {index % 6 === 2 && <Target className="h-6 w-6 text-success" />}
                      {index % 6 === 3 && <Gauge className="h-6 w-6 text-primary" />}
                      {index % 6 === 4 && <Globe className="h-6 w-6 text-secondary" />}
                      {index % 6 === 5 && <BarChart3 className="h-6 w-6 text-secondary" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Order Stream */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Live Order Execution Stream</h2>
              <p className="text-muted-foreground">Real-time order processing across global markets</p>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              <Activity className="h-4 w-4 mr-1" />
              {activeOrders} Active Orders
            </Badge>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {liveOrders.map((order, index) => (
              <Card key={`${order.id}-${index}`} className={`border-l-4 ${getStatusColor(order.status)} transition-all duration-300`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <h4 className="font-semibold text-sm">{order.product}</h4>
                        <p className="text-xs text-muted-foreground">{order.supplier}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="font-bold text-lg">{order.country}</div>
                        <div className="text-xs text-muted-foreground">Target Market</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-bold text-lg">${order.value.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Order Value</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-bold text-lg text-success">{order.margin}%</div>
                        <div className="text-xs text-muted-foreground">Margin</div>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {order.timestamp}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Execution Performance */}
        <section className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Opportunity Detection</span>
                  <span className="font-mono text-sm">0.18s</span>
                </div>
                <Progress value={18} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Price Analysis</span>
                  <span className="font-mono text-sm">0.09s</span>
                </div>
                <Progress value={9} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Risk Assessment</span>
                  <span className="font-mono text-sm">0.12s</span>
                </div>
                <Progress value={12} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Order Execution</span>
                  <span className="font-mono text-sm">0.06s</span>
                </div>
                <Progress value={6} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Execution Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-success">98.7%</div>
                <p className="text-muted-foreground">
                  Success rate across all executions in the last 30 days
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2,847,293</div>
                    <div className="text-xs text-muted-foreground">Total Executions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">2,811,045</div>
                    <div className="text-xs text-muted-foreground">Successful</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technology Stack */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Execution Technology Stack</h2>
            <p className="text-xl text-muted-foreground">
              Advanced infrastructure powering millisecond execution speeds
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Quantum AI Engine</h4>
                <p className="text-sm text-muted-foreground">Advanced ML algorithms for opportunity detection</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Bolt className="h-12 w-12 text-warning mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Edge Computing</h4>
                <p className="text-sm text-muted-foreground">Global edge nodes for ultra-low latency</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-success mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Global Network</h4>
                <p className="text-sm text-muted-foreground">Distributed infrastructure across 185 countries</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Gauge className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Real-Time Analytics</h4>
                <p className="text-sm text-muted-foreground">Instant performance monitoring and optimization</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-900 via-red-900 to-orange-900 text-white rounded-3xl p-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Experience Lightning-Fast Execution
            </h2>
            
            <p className="text-xl text-white/90">
              Join the elite network of partners leveraging our real-time execution engine 
              to capture market opportunities in milliseconds, not minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Zap className="h-5 w-5 mr-2" />
                Start Live Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Target className="h-5 w-5 mr-2" />
                Schedule Integration
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Bolt className="h-4 w-4 text-orange-300" />
                <span>Sub-second Execution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-300" />
                <span>98.7% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-300" />
                <span>185 Global Markets</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}