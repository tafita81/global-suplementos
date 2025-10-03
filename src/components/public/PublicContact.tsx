import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Globe,
  Building2,
  Send,
  CheckCircle,
  Star,
  Shield,
  Users
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";


export function PublicContact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const quickActions = [
    {
      title: t('public.contact.quickActions.requestQuote.title'),
      description: t('public.contact.quickActions.requestQuote.description'),
      action: t('public.contact.quickActions.requestQuote.action'),
      urgent: false
    },
    {
      title: t('public.contact.quickActions.partnership.title'),
      description: t('public.contact.quickActions.partnership.description'),
      action: t('public.contact.quickActions.partnership.action'),
      urgent: false
    },
    {
      title: t('public.contact.quickActions.government.title'),
      description: t('public.contact.quickActions.government.description'),
      action: t('public.contact.quickActions.government.action'),
      urgent: true
    },
    {
      title: t('public.contact.quickActions.emergency.title'),
      description: t('public.contact.quickActions.emergency.description'),
      action: t('public.contact.quickActions.emergency.action'),
      urgent: true
    }
  ];
  
  const contactMethods = [
    {
      icon: Phone,
      title: t('public.contact.businessLine'),
      primary: "+1 2029498397",
      secondary: t('public.contact.contactMethods.immediateResponse'),
      color: "text-blue-500"
    },
    {
      icon: Mail,
      title: t('public.contact.businessInquiries'),
      primary: "contact@globalsupplements.com",
      secondary: t('public.contact.contactMethods.enterpriseSolutions'),
      color: "text-green-500"
    },
    {
      icon: MapPin,
      title: t('public.contact.globalHeadquarters'),
      primary: "6200 Metrowest",
      secondary: t('public.contact.contactMethods.orlandoAddress'),
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: t('public.contact.businessHours'),
      primary: "24/7 Operations",
      secondary: t('public.contact.contactMethods.allTimezones'),
      color: "text-orange-500"
    }
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will contact you within 1 hour during business hours.",
      duration: 5000,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      inquiryType: 'general'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickAction = (actionType: string) => {
    toast({
      title: "Connecting you now...",
      description: `Our ${actionType} specialist will contact you within 15 minutes.`,
      duration: 5000,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 mb-4">
            <Phone className="h-3 w-3 mr-1" />
            {t('public.contact.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('public.contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('public.contact.description')}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={() => handleQuickAction(action.title)}
              className={`p-6 h-auto flex flex-col items-center space-y-2 ${
                action.urgent 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
              } text-white transition-all duration-300 transform hover:scale-105`}
            >
              <div className="font-semibold">{action.action}</div>
              <div className="text-xs opacity-90 text-center">{action.description}</div>
              {action.urgent && (
                <Badge className="bg-yellow-400 text-black text-xs">
                  Priority Response
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {t('public.contact.subtitle')}
              </CardTitle>
              <p className="text-gray-600">
                {t('public.contact.form.responseTime')}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your company"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 2029498397"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="government">Government Contracts</option>
                    <option value="supplier">Become a Supplier</option>
                    <option value="buyer">Find Suppliers</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your supplement business needs, target markets, volume requirements, or any specific questions..."
                    rows={5}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Guaranteed response within 1 hour</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Your information is secure and confidential</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-lg font-bold text-gray-800">{method.primary}</p>
                      <p className="text-sm text-gray-600">{method.secondary}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Trust Indicators */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose Global Supplements?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <div>
                      <div className="font-semibold">A+ BBB Rating</div>
                      <div className="text-sm opacity-90">Trusted since 2008</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-semibold">FDA Registered</div>
                      <div className="text-sm opacity-90">Full compliance guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-blue-300" />
                    <div>
                      <div className="font-semibold">Fortune 500 Trusted</div>
                      <div className="text-sm opacity-90">2,400+ enterprise clients</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-purple-300" />
                    <div>
                      <div className="font-semibold">Global Network</div>
                      <div className="text-sm opacity-90">52 countries, 10K+ suppliers</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-red-800">Emergency Support</h3>
                    <p className="text-red-700 mb-2">
                      Urgent supply chain issues? Call our 24/7 emergency line:
                    </p>
                    <p className="text-xl font-bold text-red-800">+1 2029498397</p>
                    <p className="text-sm text-red-600">
                      Available for existing clients with active contracts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}