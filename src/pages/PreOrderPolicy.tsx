import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, RefreshCw, MapPin } from "lucide-react";

export default function PreOrderPolicy() {
  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pre-Order Terms & Conditions
              </h1>
              <p className="text-xl text-muted-foreground">
                Important information about your pre-order purchase
              </p>
            </div>

            <Card className="premium-glass border-primary/20 mb-8">
              <CardContent className="p-8">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="font-semibold text-xl mb-6">
                    By placing a pre-order on globalsupplements.site, you agree to the following:
                  </p>
                  
                  <div className="grid gap-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">1. Production Timeline</h3>
                        <p>Production of your order begins after payment confirmation.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">2. Delivery Time</h3>
                        <p>Estimated delivery time: 60 calendar days from order date.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">3. Refund Policy</h3>
                        <p>Full refund will be issued automatically if delivery is not completed within 75 days.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">4. Quality Standards</h3>
                        <p>All products are manufactured by certified partners in compliance with FCC, CE, FDA, and GMP standards.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">5. Company Information</h3>
                        <p>Company: Consultoria em Tecnologia da Informação Corp<br />
                        Address: 6200 Metrowest Blvd, 201 G, Orlando, Florida, UNITED STATES.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">6. Verification</h3>
                        <p>Buyer ID: 138432533908 (Canton Fair Verified Overseas Buyer).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="premium-glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Customer Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• SSL secured payment processing</li>
                    <li>• Verified U.S. business entity</li>
                    <li>• Canton Fair verified buyer status</li>
                    <li>• Automatic refund protection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="premium-glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Production starts: Upon payment</li>
                    <li>• Expected delivery: 60 days</li>
                    <li>• Refund deadline: 75 days</li>
                    <li>• Support available: 24/7</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                For questions about your pre-order, contact us at: 
                <a href="mailto:contact@globalsupplements.site" className="text-primary hover:underline ml-1">
                  contact@globalsupplements.site
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}