import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Building2,
  TrendingUp,
  Users,
  Quote
} from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    position: "Chief Procurement Officer",
    company: "HealthTech Solutions",
    country: "United States",
    rating: 5,
    content: "Global Supplements has transformed our procurement process. Their AI-powered system identified suppliers we never knew existed, resulting in 45% cost savings and premium quality products. The Orlando team's expertise in international regulations saved us months of compliance work.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b278?w=100&h=100&fit=crop&crop=face",
    results: "$2.3M saved annually",
    logo: "🏥"
  },
  {
    name: "Dr. Marcus Thompson",
    position: "Director of Government Contracts",
    company: "Federal Health Services",
    country: "United States",
    rating: 5,
    content: "Working with Global Supplements on government contracts has been exceptional. Their SAM.gov integration and automated compliance checks have helped us secure $50M in contracts. The transparency and documentation quality exceed all government requirements.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    results: "$50M contracts secured",
    logo: "🏛️"
  },
  {
    name: "Elena Rodriguez",
    position: "VP of International Trade",
    company: "MediCorp Global",
    country: "Spain",
    rating: 5,
    content: "The global network reach is incredible. From our headquarters in Madrid, we now access premium suppliers in Asia, Americas, and Europe seamlessly. The quality assurance and regulatory compliance support has been flawless across all 15 countries we operate in.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    results: "300% market expansion",
    logo: "🌍"
  },
  {
    name: "James Chen",
    position: "CEO",
    company: "Asia Pacific Nutrition",
    country: "Singapore",
    rating: 5,
    content: "Global Supplements connected us with FDA-certified manufacturers in the US, opening doors to American markets we couldn't access before. The Orlando team understands both Asian business culture and American regulations perfectly. Revenue grew 400% in 18 months.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    results: "400% revenue growth",
    logo: "🚀"
  },
  {
    name: "Amanda Foster",
    position: "Chief Operations Officer",
    company: "Premium Wellness Group",
    country: "Canada",
    rating: 5,
    content: "The private label solutions exceeded our expectations. From custom formulations to complete branding and distribution, everything was handled professionally. The Canadian regulatory compliance was seamless, and our products launched 3 months ahead of schedule.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    results: "3 months ahead of schedule",
    logo: "⭐"
  }
];

export function PublicTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-yellow-500 text-black mb-4">
            <Star className="h-3 w-3 mr-1" />
            CLIENT SUCCESS STORIES
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            Trusted by Global Industry Leaders
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            From Fortune 500 companies to government agencies, see how our Orlando-based 
            global network delivers exceptional results across 52 countries.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Avatar and Company Info */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="relative inline-block mb-4">
                    <img 
                      src={current.avatar} 
                      alt={current.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-lg">
                      {current.logo}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{current.name}</h3>
                    <p className="text-blue-200">{current.position}</p>
                    <p className="text-sm text-gray-300">{current.company}</p>
                    <p className="text-sm text-gray-400">{current.country}</p>
                  </div>
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Badge className="bg-green-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {current.results}
                  </Badge>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <Quote className="h-8 w-8 text-blue-300 mb-4" />
                  <blockquote className="text-lg leading-relaxed text-gray-100 mb-6">
                    "{current.content}"
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">2,400+</div>
            <div className="text-lg font-semibold mb-1">Enterprise Clients</div>
            <div className="text-sm text-blue-200">Fortune 500 & Government</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">98.3%</div>
            <div className="text-lg font-semibold mb-1">Client Satisfaction</div>
            <div className="text-sm text-blue-200">Based on annual surveys</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">$2.8B</div>
            <div className="text-lg font-semibold mb-1">Total Volume 2024</div>
            <div className="text-sm text-blue-200">Global transactions processed</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            See how our global network can transform your supplement business with 
            premium suppliers, regulatory compliance, and guaranteed results.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-lg px-8 py-6 rounded-full hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Users className="h-5 w-5 mr-2" />
            Start Your Success Story
          </Button>
        </div>
      </div>
    </section>
  );
}