import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Shield,
  Award,
  Star,
  Building2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Global Supplements</h3>
                <p className="text-sm text-gray-400">Premium Worldwide Network</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Leading global supplier network connecting businesses, governments, and consumers 
              to premium supplement manufacturers through advanced AI technology and strategic partnerships.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary" className="bg-yellow-500 text-black">
                <Star className="h-3 w-3 mr-1" />
                A+ BBB Rating
              </Badge>
              <Badge variant="secondary" className="bg-green-600">
                <Shield className="h-3 w-3 mr-1" />
                FDA Registered
              </Badge>
              <Badge variant="secondary" className="bg-blue-600">
                <Award className="h-3 w-3 mr-1" />
                ISO 9001
              </Badge>
              <Badge variant="secondary" className="bg-purple-600">
                <Building2 className="h-3 w-3 mr-1" />
                GMP Certified
              </Badge>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">B2B Trading</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Government Contracts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Private Label</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Quality Assurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Logistics Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Regulatory Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Global Headquarters</p>
                  <p className="text-sm text-gray-400">6200 Metrowest<br />Orlando, FL 32835, USA</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-gray-300">+1 2029498397</p>
                  <p className="text-sm text-gray-400">24/7 Business Line</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-gray-300">contact@globalsupplements.com</p>
                  <p className="text-sm text-gray-400">Business Inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} Global Supplements Corporation. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Certifications</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}