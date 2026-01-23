import { useState } from 'react';
import { Check, TrendingUp, Shield, Zap, BarChart3, Users, Globe, LineChart, Cpu } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const pricingPlans = [
    {
      name: "Standard",
      price: { monthly: "$0", annual: "$0" },
      description: "Perfect for beginners starting their forex trading journey",
      features: [
        "Raw spreads from 1.0 pips",
        "Maximum leverage 1:200",
        "MT5 & MT4 platforms",
        "Basic charting tools",
        "Email support",
        "Demo account included",
        
      ],
      highlighted: false,
      buttonText: "Start Trading Free",
      icon: <LineChart className="h-6 w-6" />,
      recommendedFor: "Beginners",
      minimumDeposit: "$100"
    },
    {
      name: "Professional",
      price: { monthly: "$29", annual: "$278" },
      description: "Advanced features for serious traders",
      features: [
        "Raw spreads from 0.2 pips",
        "Maximum leverage 1:400",
        "Advanced charting tools",
        "Priority support",
        "VPS hosting (1 month free)",
        "Economic calendar",
       
        
      ],
      highlighted: true,
      buttonText: "Upgrade to Pro",
      icon: <TrendingUp className="h-6 w-6" />,
      recommendedFor: "Active Traders",
      minimumDeposit: "$1,000"
    },
    {
      name: "VIP",
      price: { monthly: "$99", annual: "$950" },
      description: "Institutional-grade features for expert traders",
      features: [
        "Raw spreads from 0.0 pips",
        "Maximum leverage 1:500",
        "Dedicated account manager",
        "Premium VPS hosting",
        "Custom API access",
        "Advanced analytics",
        
       
      ],
      highlighted: false,
      buttonText: "Go VIP",
      icon: <Shield className="h-6 w-6" />,
      recommendedFor: "Institutional Traders",
      minimumDeposit: "$10,000"
    }
  ];

  const getAnnualSavings = (monthlyPrice: string) => {
    const monthly = parseInt(monthlyPrice.replace('$', ''));
    const annual = monthly * 12;
    const discounted = monthly * 10; // 2 months free
    return annual - discounted;
  };

  return (
    <section id="pricing" className="pt-16 pb-6 bg-gradient-to-b from-[#12141C] to-crypto-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
         
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Choose Your <span className="text-gradient">Trading Account</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Select the account type that matches your trading style and experience level. 
            All accounts come with FCA regulation and segregated client funds.
          </p>
          
          <div className="inline-flex items-center p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <button
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-crypto-purple to-crypto-dark-purple text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              <span>Monthly Billing</span>
            </button>
            <button
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center ${
                billingCycle === 'annual' 
                  ? 'bg-gradient-to-r from-crypto-purple to-crypto-dark-purple text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setBillingCycle('annual')}
            >
              <span>Annual Billing</span>
              <span className="ml-2 text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative group animate-on-scroll ${
                plan.highlighted ? 'md:-mt-6 md:mb-6' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              
              
              <div 
                className={`h-full bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-crypto-purple/50 ${
                  plan.highlighted 
                    ? 'border-crypto-purple shadow-xl shadow-crypto-purple/20' 
                    : 'border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${
                        plan.name === "Standard" ? "bg-blue-500/20 text-blue-400" :
                        plan.name === "Professional" ? "bg-crypto-purple/20 text-crypto-purple" :
                        "bg-purple-500/20 text-purple-400"
                      }`}>
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <div className="text-sm text-gray-400 bg-white/5 rounded-full px-3 py-1 inline-block mt-1">
                          Min. deposit: {plan.minimumDeposit}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="mb-4 p-3 bg-white/5 rounded-xl">
                    <div className="flex items-baseline">
                      <span className="text-4xl md:text-3xl font-bold text-white">
                        {billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                      </span>
                      <span className="text-gray-400 ml-2">
                        {plan.price.monthly !== "$0" ? "/month" : "forever"}
                      </span>
                    </div>
                    {plan.price.monthly !== "$0" && billingCycle === 'annual' && (
                      <div className="mt-2 text-sm text-green-400">
                        Save ${getAnnualSavings(plan.price.monthly)} annually
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">{plan.description}</p>

                  {/* CTA Button */}
                  <button 
                    className={`w-full mb-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                      plan.highlighted 
                        ? 'bg-gradient-to-r from-crypto-purple to-crypto-dark-purple hover:from-crypto-purple/90 hover:to-crypto-dark-purple/90 hover:shadow-lg hover:shadow-crypto-purple/20' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  {/* Features List */}
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                        Account Features
                      </p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start group/feature">
                            <div className="mt-1 mr-3">
                              <Check className="h-5 w-5 text-green-500 shrink-0" />
                            </div>
                            <span className="text-gray-300 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Plan Footer */}
                <div className="border-t border-white/10 p-3 bg-black/20">
                  <div className="text-center">
                    
                    <div className="text-lg font-semibold text-white">{plan.recommendedFor}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Account Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-gray-400 font-medium">Feature</th>
                  {pricingPlans.map((plan, index) => (
                    <th key={index} className="pb-4 text-white text-center">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-gray-300">Spreads from</td>
                  <td className="py-4 text-center text-white">1.0 pips</td>
                  <td className="py-4 text-center text-crypto-purple font-bold">0.2 pips</td>
                  <td className="py-4 text-center text-white">0.0 pips</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-gray-300">Leverage</td>
                  <td className="py-4 text-center text-white">1:200</td>
                  <td className="py-4 text-center text-crypto-purple font-bold">1:400</td>
                  <td className="py-4 text-center text-white">1:500</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-gray-300">Commission</td>
                  <td className="py-4 text-center text-white">None</td>
                  <td className="py-4 text-center text-crypto-purple font-bold">None</td>
                  <td className="py-4 text-center text-white">None</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-gray-300">Support</td>
                  <td className="py-4 text-center text-white">Email</td>
                  <td className="py-4 text-center text-crypto-purple font-bold">Priority</td>
                  <td className="py-4 text-center text-white">24/5 Phone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* All Plans Include */}
        <div className="mt-10 bg-white/5 rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 text-center">All Trading Accounts Include</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-green-500/20 rounded-full mb-4">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h4 className="text-white font-semibold mb-2">FCA Regulated</h4>
              <p className="text-gray-400 text-sm">Client funds segregated at top-tier banks</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 bg-blue-500/20 rounded-full mb-4">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h4 className="text-white font-semibold mb-2">Fast Execution</h4>
              <p className="text-gray-400 text-sm">Average execution speed under 5ms</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 bg-purple-500/20 rounded-full mb-4">
                <Globe className="h-6 w-6 text-purple-500" />
              </div>
              <h4 className="text-white font-semibold mb-2">Global Access</h4>
              <p className="text-gray-400 text-sm">Trade 80+ currency pairs worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;