import { 
  Globe, 
  Building2, 
  TrendingUp, 
  Award,
  Users,
  Shield,
  Star,
  DollarSign
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "10,847",
    label: "Global Suppliers",
    description: "Verified premium manufacturers",
    color: "text-blue-500"
  },
  {
    icon: Globe,
    value: "52",
    label: "Countries",
    description: "Active market presence",
    color: "text-green-500"
  },
  {
    icon: DollarSign,
    value: "$2.8B",
    label: "Annual Volume",
    description: "Transactions processed 2024",
    color: "text-purple-500"
  },
  {
    icon: Award,
    value: "99.7%",
    label: "Success Rate",
    description: "Contract completion rate",
    color: "text-orange-500"
  },
  {
    icon: Users,
    value: "2,400+",
    label: "Enterprise Clients",
    description: "Fortune 500 & Government",
    color: "text-indigo-500"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Compliance",
    description: "FDA, CE, GMP certified",
    color: "text-emerald-500"
  },
  {
    icon: Star,
    value: "A+",
    label: "BBB Rating",
    description: "Better Business Bureau",
    color: "text-yellow-500"
  },
  {
    icon: TrendingUp,
    value: "347%",
    label: "Avg ROI",
    description: "Client return on investment",
    color: "text-red-500"
  }
];

export function PublicStats() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Orlando-based global network has processed billions in transactions, 
            connecting premium suppliers with Fortune 500 companies and government agencies.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-')}/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
                </div>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-gray-700">FDA Registered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-700">ISO 9001:2015</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">GMP Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <span className="font-semibold text-gray-700">DUNS Listed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}