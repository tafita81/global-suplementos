import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import { Building2, Globe, Shield, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function B2BDistribution() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    businessType: "",
    volume: "",
    message: "",
    products: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted!",
      description: "Our B2B team will contact you within 24 hours.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductChange = (product: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        products: [...formData.products, product]
      });
    } else {
      setFormData({
        ...formData,
        products: formData.products.filter(p => p !== product)
      });
    }
  };

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Header Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Wholesale & Distribution Partnerships
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto">
              Become an authorized distributor of Global Supplement + Tech products in your region.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <Card className="premium-glass border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Request Partnership Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="businessType">Type of Business *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="spa">Spa</SelectItem>
                          <SelectItem value="pharmacy">Pharmacy</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Products of Interest *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {["Supplements", "Skincare Analyzer", "Gua Sha", "Charger", "Bundles"].map((product) => (
                          <div key={product} className="flex items-center space-x-2">
                            <Checkbox
                              id={product.toLowerCase()}
                              checked={formData.products.includes(product)}
                              onCheckedChange={(checked) => handleProductChange(product, checked as boolean)}
                            />
                            <Label htmlFor={product.toLowerCase()}>{product}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="volume">Estimated Monthly Volume *</Label>
                      <Select value={formData.volume} onValueChange={(value) => setFormData({...formData, volume: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select volume range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100-500">100–500 units</SelectItem>
                          <SelectItem value="500-1000">500–1,000 units</SelectItem>
                          <SelectItem value="1000+">1,000+ units</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your business and distribution goals..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full gold-accent text-primary font-bold" size="lg">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="space-y-8">
              <Card className="premium-glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    All B2B Partners Receive
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Private Label Options</h4>
                      <p className="text-sm text-muted-foreground">Custom branding and packaging solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">FCC/CE/FDA-Compliant Documentation</h4>
                      <p className="text-sm text-muted-foreground">All necessary regulatory certifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Dedicated Account Manager</h4>
                      <p className="text-sm text-muted-foreground">Personal support for your business growth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">FOB Shenzhen or DDP USA Pricing</h4>
                      <p className="text-sm text-muted-foreground">Flexible shipping and pricing options</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    Global Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">52</div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$2.8B</div>
                      <div className="text-sm text-muted-foreground">Annual Volume</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">10K+</div>
                      <div className="text-sm text-muted-foreground">Global Suppliers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">2,400+</div>
                      <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Verified Business
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>📍 Company: Consultoria em Tecnologia da Informação Corp</div>
                    <div>🏢 Address: 6200 Metrowest Blvd, 201 G, Orlando, Florida, USA</div>
                    <div>🎯 Canton Fair Buyer ID: 138432533908</div>
                    <div>✅ Verified Overseas Buyer Status</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicSiteLayout>
  );
}