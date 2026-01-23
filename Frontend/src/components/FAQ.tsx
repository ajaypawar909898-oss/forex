import React, { useState } from "react";
import { HelpCircle, ChevronDown, Shield, CreditCard, TrendingUp, Users, Globe, Cpu } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      category: "account",
      icon: <Users className="h-5 w-5" />,
      question: "How do I open a trading account?",
      answer: "Opening an account takes about 5 minutes. Click 'Open Account' in the top navigation, complete the registration form with your personal details, verify your identity through our secure KYC process, choose your preferred account type, and make your initial deposit. Accounts are typically verified within 24 hours during business days."
    },
    {
      category: "trading",
      icon: <TrendingUp className="h-5 w-5" />,
      question: "What trading platforms do you support?",
      answer: "We support MetaTrader 5, MetaTrader 4, and our proprietary WebTrader platform. All platforms are available on Windows, Mac, iOS, Android, and through your web browser. We also offer VPS hosting for automated trading and API access for institutional clients."
    },
    {
      category: "security",
      icon: <Shield className="h-5 w-5" />,
      question: "Is my money safe with you?",
      answer: "Yes, we're regulated by the FCA (Financial Conduct Authority) with license number 123456. Client funds are held in segregated accounts at top-tier banks, separate from our operational funds. We implement 256-bit SSL encryption, two-factor authentication, and offer negative balance protection to all retail clients."
    },
    {
      category: "fees",
      icon: <CreditCard className="h-5 w-5" />,
      question: "What are your fees and spreads?",
      answer: "We offer raw spreads starting from 0.0 pips on major pairs for VIP accounts, 0.2 pips for Professional accounts, and 1.0 pips for Standard accounts. There are no commission fees on standard accounts. Professional and VIP accounts also receive free VPS hosting. All fees are transparent and displayed in real-time on our platform."
    },
    {
      category: "trading",
      icon: <Cpu className="h-5 w-5" />,
      question: "Can I use Expert Advisors (EAs) and automated trading?",
      answer: "Yes, we fully support automated trading including Expert Advisors, algorithmic strategies, and copy trading. We offer free VPS hosting for Professional and VIP accounts to ensure 24/7 operation. All popular trading robots and indicators are compatible with our MT5 and MT4 platforms."
    },
    {
      category: "account",
      icon: <CreditCard className="h-5 w-5" />,
      question: "What deposit and withdrawal methods do you accept?",
      answer: "We accept bank transfers, credit/debit cards (Visa, MasterCard), e-wallets (Skrill, Neteller, PayPal), and cryptocurrency (Bitcoin, Ethereum, USDT). Deposits are typically instant for cards and e-wallets, while bank transfers take 1-3 business days. Withdrawals are processed within 24 hours."
    },
    {
      category: "trading",
      icon: <Globe className="h-5 w-5" />,
      question: "What markets can I trade?",
      answer: "You can trade 80+ currency pairs (major, minor, and exotic), 12 major indices, commodities (gold, silver, oil), cryptocurrencies, and shares CFDs. We offer 24/5 trading on forex markets with leverage up to 1:500 for eligible clients."
    },
    {
      category: "security",
      icon: <Shield className="h-5 w-5" />,
      question: "Do you offer negative balance protection?",
      answer: "Yes, we provide negative balance protection to all retail clients as per FCA regulations. This means you cannot lose more than your deposited amount. For professional clients, this protection may not apply if they opt-out and meet the criteria for professional classification."
    }
  ];

  const categories = [
    { id: "all", label: "All Questions", count: faqItems.length },
    { id: "account", label: "Account", count: faqItems.filter(item => item.category === "account").length },
    { id: "trading", label: "Trading", count: faqItems.filter(item => item.category === "trading").length },
    { id: "security", label: "Security", count: faqItems.filter(item => item.category === "security").length },
    { id: "fees", label: "Fees & Costs", count: faqItems.filter(item => item.category === "fees").length }
  ];

  const filteredItems = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <section
      id="faq"
      className="py-16 bg-gradient-to-b from-[#12141C] to-crypto-blue"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Find answers to common questions about forex trading, account management, 
            platform features, and security. Can't find what you're looking for? 
            Contact our 24/5 support team.
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-crypto-purple to-crypto-dark-purple text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="font-medium">{category.label}</span>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredItems.map((item, index) => {
              const isOpen = openIndex === index;
              const itemIndex = faqItems.findIndex(faq => faq.question === item.question);

              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20 animate-on-scroll group"
                  style={{ animationDelay: `${itemIndex * 0.05}s` }}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggle(itemIndex)}
                    className="w-full px-6 py-6 flex justify-between items-center text-left group-hover:bg-white/2 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        item.category === "account" ? "bg-blue-500/20 text-blue-400" :
                        item.category === "trading" ? "bg-green-500/20 text-green-400" :
                        item.category === "security" ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-white group-hover:text-crypto-purple transition-colors">
                          {item.question}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-crypto-purple" : ""
                      }`}
                    />
                  </button>

                  {/* Content */}
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-14">
                      <div className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </div>
                      {item.category === "account" && (
                        <div className="mt-4 p-3 bg-white/5 rounded-lg">
                          <p className="text-sm text-gray-400">
                            <strong>Note:</strong> Account verification typically takes 24 hours during business days.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Support CTA */}
        <div className="mt-10 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-crypto-purple/10 to-crypto-blue/10 rounded-2xl p-8 md:p-10 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
                <p className="text-gray-400">
                  Our expert support team is available 24/5 to help you with any trading questions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-crypto-purple to-crypto-dark-purple hover:from-crypto-purple/90 hover:to-crypto-dark-purple/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Contact Support
                </button>
                <button className="border border-white/20 hover:bg-white/5 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Live Chat
                </button>
              </div>
            </div>
            
            {/* Support Channels */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-white font-bold mb-2">24/5 Phone</div>
                  <div className="text-gray-400 text-sm">+1 (555) 123-4567</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold mb-2">Email</div>
                  <div className="text-gray-400 text-sm">support@forextrading.com</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold mb-2">Response Time</div>
                  <div className="text-green-400 text-sm">Under 5 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default FAQ;