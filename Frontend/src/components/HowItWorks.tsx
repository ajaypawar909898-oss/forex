import { UserPlus, FileText, CreditCard, TrendingUp, Shield, Users } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <UserPlus className="h-5 w-5" />,
      title: "Register Your Account",
      description: "Complete our secure online registration form in under 5 minutes. Verify your identity with our KYC process for FCA compliance.",
      details: ["Email verification", "Identity verification", "Residence proof"],
      duration: "5-10 minutes"
    },
    {
      number: "02",
      icon: <FileText className="h-5 w-5" />,
      title: "Choose Your Account Type",
      description: "Select from Standard, Pro, or VIP accounts tailored to your trading style. All accounts come with negative balance protection.",
      details: ["Standard (Raw Spreads)", "Pro (ECN Premium)", "VIP (Institutional)"],
      duration: "2 minutes"
    },
    {
      number: "03",
      icon: <CreditCard className="h-5 w-5" />,
      title: "Fund Your Account",
      description: "Deposit funds using multiple secure methods. Minimum deposit $100 with instant processing for most payment methods.",
      details: ["Bank Transfer", "Credit/Debit Cards", "E-wallets & Crypto"],
      duration: "Instant - 24 hours"
    },
    {
      number: "04",
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Start Trading",
      description: "Access our trading platforms and begin trading 80+ currency pairs. Use demo account to practice before live trading.",
      details: ["MT5/MT4 Platforms", "Demo Account", "Real-time Charts"],
      duration: "Instant"
    },
    {
      number: "05",
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Your Trades",
      description: "Implement risk management strategies with stop-loss orders, take-profit levels, and our advanced risk management tools.",
      details: ["Risk Management Tools", "Trading Signals", "Market Analysis"],
      duration: "Ongoing"
    },
    {
      number: "06",
      icon: <Users className="h-5 w-5" />,
      title: "Join Our Community",
      description: "Access educational resources, trading signals, and connect with other traders in our exclusive community.",
      details: ["Daily Analysis", "Educational Webinars", "Expert Support"],
      duration: "24/5 Support"
    }
  ];

  return (
    <section id="how-it-works" className="pt-16 bg-gradient-to-b from-[#12141C] to-crypto-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
         
          
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            Start Trading <span className="text-gradient">Forex in Minutes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Our streamlined onboarding process gets you trading faster. From registration to your first trade, 
            we've simplified every step for a seamless experience.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:border-crypto-purple/50 hover:shadow-2xl hover:shadow-crypto-purple/10 transition-all duration-500 h-full animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-3 -left-3">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-crypto-purple to-crypto-dark-purple text-white font-bold text-sm px-3 py-1 rounded-md">
                      {step.number}
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 rounded-xl p-2.5 text-crypto-purple group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-crypto-purple transition-colors duration-300">
                      {step.title}
                    </h3>
                    <div className="text-sm text-gray-400 bg-white/5 rounded px-2 py-1 inline-block">
                      {step.duration}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="pt-4 border-t border-white/5">
                  {/* <h4 className="text-sm font-semibold text-gray-300 mb-3">INCLUDES:</h4> */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Connection Line for Mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <div className="h-6 w-px bg-gradient-to-b from-crypto-purple/20 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
       
      </div>
    </section>
  );
};

export default HowItWorks;