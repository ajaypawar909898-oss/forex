import { useState, useEffect, useRef } from 'react';
import { Star, TrendingUp, Shield, Clock, Award } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote: "Switching to this platform was the best trading decision I've made. The raw spreads and lightning-fast execution improved my profitability by 30%. The resources are exceptional.",
      author: "James Wilson",
      role: "Professional Forex Trader",
      experience: "7 years trading",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400",
      rating: 5,
      tradingStyle: "Day Trading",
      verified: true
    },
    {
      quote: "As an institutional trader, I need reliability and precision. The platform's stability during high volatility and the advanced charting tools have been game-changers for our fund's.",
      author: "Sarah Chen",
      role: "Fund Manager",
      experience: "12 years trading",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&h=400",
      rating: 5,
      tradingStyle: "Swing Trading",
      verified: true
    },
    {
      quote: "The zero commission structure and educational resources helped me transition from demo to live trading smoothly. The customer support team is incredibly responsive and knowledgeable.",
      author: "Michael Rodriguez",
      role: "Retail Trader",
      experience: "2 years trading",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400",
      rating: 5,
      tradingStyle: "Scalping",
      verified: true
    },
    {
      quote: "The VPS hosting for my EAs has been flawless. Uptime is exceptional, and the platform's API integration allows for sophisticated algorithmic trading.",
      author: "Alex Thompson",
      role: "Algorithmic Trader",
      experience: "5 years trading",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?auto=format&fit=crop&w=400&h=400",
      rating: 5,
      tradingStyle: "Automated Trading",
      verified: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section id="testimonials" className="pt-16 bg-gradient-to-b from-crypto-blue to-[#12141C]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
        
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Trusted by <span className="text-gradient">Professional Traders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Hear from traders who have achieved success with our platform. From retail traders to institutional funds, 
            our community spans all experience levels and trading styles.
          </p>
        </div>

        <div className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl px-4 mx-auto">
            <div className="text-center bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
             
              <div className="text-sm text-gray-400">Platform Rating</div>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
             
              <div className="text-sm text-gray-400">Active Traders</div>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">99.7%</div>
             
              <div className="text-sm text-gray-400">Order Execution</div>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">24/5</div>
             
              <div className="text-sm text-gray-400">Support Response</div>
            </div>
          </div>
        </div>

        <div 
          className="relative max-w-7xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-crypto-purple/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    
                    <div className="relative">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
                        <div className="mb-6 md:mb-0 md:mr-8">
                          <div className="flex items-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                            ))}
                            <span className="ml-2 text-sm text-gray-400">({testimonial.rating}.0)</span>
                          </div>
                          <h3 className="text-xl md:text-xl font-bold text-white mb-1 leading-relaxed">
                            "{testimonial.quote}"
                          </h3>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="text-center">
                              <div className="text-xs text-gray-400 mb-2">TRADING STYLE</div>
                              <div className="flex items-center justify-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-crypto-purple" />
                                <span className="text-white font-semibold">{testimonial.tradingStyle}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="relative">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.author} 
                                className="w-14 h-14 rounded-full object-cover border-2 border-crypto-purple"
                              />
                              {testimonial.verified && (
                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                  <Shield className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <p className="font-bold text-white text-lg">{testimonial.author}</p>
                                <Award className="h-4 w-4 text-yellow-500 ml-2" />
                              </div>
                              <p className="text-gray-300">{testimonial.role}</p>
                              <div className="flex items-center text-sm text-gray-400 mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                {testimonial.experience} experience
                              </div>
                            </div>
                          </div>
                          
                          <div className="hidden md:block">
                            <div className="text-right">
                              <div className="text-xs text-gray-400 mb-1">PERFORMANCE METRICS</div>
                              <div className="flex items-center space-x-4">
                                <div className="text-center">
                                  <div className="text-green-500 font-bold">+42%</div>
                                  <div className="text-xs text-gray-400">Avg. ROI</div>
                                </div>
                                <div className="h-8 w-px bg-white/10"></div>
                                <div className="text-center">
                                  <div className="text-white font-bold">1:3</div>
                                  <div className="text-xs text-gray-400">Risk/Reward</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 hover:bg-crypto-purple ${currentIndex === index ? 'w-8 bg-gradient-to-r from-crypto-purple to-crypto-dark-purple' : 'w-2 bg-gray-500'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

      </div>

       <div className="mt-6 w-[97%] mx-auto border-t border-white/10">
         
        </div>
    </section>
  );
};

// Add missing Users component
const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 5.197a4 4 0 00-8 0 4 4 0 008 0z" />
  </svg>
);

export default Testimonials;