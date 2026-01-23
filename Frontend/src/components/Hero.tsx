import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.pexels.com/photos/11798250/pexels-photo-11798250.jpeg",
      title: "Advanced Trading Platform",
      description:
        "Professional-grade MetaTrader 5 with advanced charting tools",
      color: "from-blue-500/10 to-purple-500/10",
    },
    {
      image:
        "https://images.pexels.com/photos/6770775/pexels-photo-6770775.jpeg",
      title: "Real-time Market Analysis",
      description: "Live streaming quotes and comprehensive market insights",
      color: "from-blue-500/10 to-purple-500/10",
    },
    {
      image:
        "https://images.pexels.com/photos/27459645/pexels-photo-27459645.jpeg",
      title: "Risk Management Tools",
      description: "Advanced stop-loss and take-profit automation",
      color: "from-blue-500/10 to-purple-500/10",
    },
    {
      image:
        "https://images.pexels.com/photos/2068664/pexels-photo-2068664.jpeg",
      title: "Mobile Trading",
      description: "Trade on-the-go with our award-winning mobile app",
      color: "from-blue-500/10 to-purple-500/10",
    },
  ];

  // Auto slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-hero hero-glow">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-crypto-light-purple/10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 animate-fade-in-left">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-6 leading-tight">
              <span className="text-gradient">Master Forex Markets</span> <br />{" "}
              with Precision Tools
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-lg">
              Trade 80+ currency pairs with institutional-grade execution,
              advanced charting tools, and real-time market analysis. No hidden
              fees, transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={"/signup"}>
                <button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:scale-105">
                  Open Live Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <button className="border border-gray-700 text-white hover:bg-white/5 py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300">
                Start Free Demo
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 flex items-center space-x-6">
              <div>
                <p className="text-2xl font-bold text-white">0.0 pips</p>
                <p className="text-sm text-gray-400">Raw Spreads from</p>
              </div>
              <div className="h-12 w-px bg-gray-700"></div>
              <div>
                <p className="text-2xl font-bold text-white">1:500</p>
                <p className="text-sm text-gray-400">Maximum Leverage</p>
              </div>
              <div className="h-12 w-px bg-gray-700"></div>
              <div>
                <p className="text-2xl font-bold text-white">24/5</p>
                <p className="text-sm text-gray-400">Market Support</p>
              </div>
            </div>

            <div className="mt-8 flex items-center text-sm text-gray-400">
              <span className="flex items-center mr-4">
                <svg
                  className="w-4 h-4 text-green-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                FCA Regulated
              </span>
              <span className="flex items-center mr-4">
                <svg
                  className="w-4 h-4 text-green-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Negative Balance Protection
              </span>
            </div>
          </div>

          <div className="lg:w-1/2 w-full mt-12 md:mr-10 lg:mt-0 animate-fade-in-right">
            <div className="relative animate-float max-w-2xl mx-auto">
              {/* Slide Content Overlay */}
              <div className="absolute top-6 left-6 right-6 z-20">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-gray-200 text-sm">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Image Slider */}
              <div className="relative h-96 w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${slide.color}`}
                    ></div>
                  </div>
                ))}

                {/* Slide Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                >
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Live Trading Stats */}
              <div className="absolute -bottom-4 -right-4 bg-crypto-purple/20 backdrop-blur-md rounded-lg p-4 border border-crypto-purple/30 shadow-lg z-20">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Live Trades</p>
                    <p className="text-lg font-bold text-white">4,287</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Hours Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-gray-300">Sydney</span>
            <span className="text-gray-500 ml-2">Closed</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-gray-300">Tokyo</span>
            <span className="text-gray-500 ml-2">Open</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-gray-300">London</span>
            <span className="text-gray-500 ml-2">Opening soon</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-gray-300">New York</span>
            <span className="text-gray-500 ml-2">Closed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
