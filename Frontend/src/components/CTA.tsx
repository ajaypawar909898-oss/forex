import { ArrowRight, Shield, TrendingUp, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-gradient-to-b from-crypto-blue to-[#12141C] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crypto-light-purple/10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Trust Badges */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="inline-flex p-2 bg-green-500/20 rounded-full mb-3">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-white font-bold mb-1">FCA Regulated</div>
              <div className="text-xs text-gray-400">License #123456</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="inline-flex p-2 bg-blue-500/20 rounded-full mb-3">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-white font-bold mb-1">50K+ Traders</div>
              <div className="text-xs text-gray-400">Global Community</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="inline-flex p-2 bg-purple-500/20 rounded-full mb-3">
                <Zap className="h-5 w-5 text-crypto-purple" />
              </div>
              <div className="text-white font-bold mb-1">5ms Execution</div>
              <div className="text-xs text-gray-400">Average Speed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="inline-flex p-2 bg-yellow-500/20 rounded-full mb-3">
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-white font-bold mb-1">
                Best Platform 2024
              </div>
              <div className="text-xs text-gray-400">Forex Awards</div>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
          {/* Animated background elements inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-crypto-purple/5 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-crypto-blue/5 to-transparent rounded-full translate-y-32 -translate-x-32"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white animate-fade-in leading-tight">
              Start Your <span className="text-gradient">Forex Trading</span>{" "}
              Journey Today
            </h2>
            <p
              className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Join 50,000+ successful traders worldwide. Get started with a
              risk-free demo account or open a live account with raw spreads
              from 0.0 pips and zero commission.
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Link to={"/signup"}>
                <button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:scale-105">
                  Open Live Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <button className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 hover:scale-105">
                Try Free Demo Account
                <TrendingUp className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Key Features */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      $100
                    </div>
                    <div className="text-xs text-gray-400">Min. Deposit</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      0.0 pips
                    </div>
                    <div className="text-xs text-gray-400">Raw Spreads</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      1:500
                    </div>
                    <div className="text-xs text-gray-400">Max Leverage</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      24/5
                    </div>
                    <div className="text-xs text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-2" />
                <span>FCA Regulated & Protected</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/10"></div>
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Negative Balance Protection</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/10"></div>
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No Hidden Fees</span>
              </div>
            </div>

            <p
              className="mt-8 text-sm text-gray-400 animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              Open an account in 5 minutes. No credit card required for demo
              accounts. Funds are segregated at top-tier banks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
