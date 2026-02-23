import { Activity, Lock, Zap, Compass, LineChart, Shield, TrendingUp, Cpu, Globe, PieChart, Bell, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Real-time Market Execution",
      description: "Ultra-fast order execution with latency under 5ms. Trade major, minor, and exotic currency pairs with institutional-grade precision."
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Advanced Charting Tools",
      description: "Professional trading charts with 100+ technical indicators and customizable drawing tools for precise analysis."
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Regulated Security",
      description: "FCA regulated broker with segregated client funds, negative balance protection, and enterprise-grade encryption."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Zero Commission Trading",
      description: "Trade with raw spreads starting from 0.0 pips on major pairs. No hidden fees or commission on standard accounts."
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Automated Trading",
      description: "Support for Expert Advisors (EAs), algorithmic trading, and copy trading with our advanced VPS hosting solutions."
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Market Access",
      description: "Access 80+ currency pairs, commodities, indices, and cryptocurrencies from a single trading account."
    },
   
  ];

  return (
    <section id="features" className="pt-16 bg-gradient-to-b from-crypto-blue to-[#12141C]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
         
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Professional <span className="text-gradient">Trade Bull Forex</span> Features
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Equip yourself with institutional-grade tools and features designed for serious forex traders. 
            From advanced charting to automated trading, we provide everything you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:border-crypto-purple/50 hover:shadow-2xl hover:shadow-crypto-purple/10 transition-all duration-500 group animate-on-scroll"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderTop: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div className="relative mb-4">
                <div className="bg-gradient-to-br from-crypto-purple/10 to-crypto-blue/10 rounded-xl w-12 h-12 flex items-center justify-center text-crypto-purple group-hover:from-crypto-purple/20 group-hover:to-crypto-blue/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-crypto-purple/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {feature.icon}
                </div>
                <div className="absolute -top-2 -right-2 bg-crypto-purple text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-crypto-purple transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Available on all account types
                  </span>
                </div>
              </div> */}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;