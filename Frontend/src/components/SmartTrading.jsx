import { Download, Smartphone, Zap, TrendingUp, BarChart3, Bell, Globe, Shield } from 'lucide-react';

const SmartTrading = () => {
  return (
    <section className="pt-6 bg-gradient-to-b from-crypto-blue to-[#12141C] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crypto-light-purple/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 animate-fade-in-left">
           
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Smart Trading.<br />
              <span className="text-gradient">Anywhere. Anytime.</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Discover the power of the Growth Global platform — built by expert traders, for traders. 
              Enjoy seamless access to forex, commodities, and indices with lightning-fast execution 
              and real-time analytics.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-white">Lightning-Fast</h3>
                </div>
                <p className="text-sm text-gray-400">Execute trades in under 5ms with our advanced technology</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-white">Secure Trading</h3>
                </div>
                <p className="text-sm text-gray-400">Bank-level security with 256-bit encryption safety</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                    <BarChart3 className="h-5 w-5 text-crypto-purple" />
                  </div>
                  <h3 className="font-semibold text-white">Real-Time Charts</h3>
                </div>
                <p className="text-sm text-gray-400">Advanced charting with 100+ indicators</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg mr-3">
                    <Globe className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h3 className="font-semibold text-white">Global Markets</h3>
                </div>
                <p className="text-sm text-gray-400">Trade 80+ currency pairs worldwide</p>
              </div>
            </div>
            
            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-black/30 hover:bg-black/50 border border-white/20 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center transition-all duration-300 hover:scale-105">
                <div className="mr-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.518.754-3.334 1.701-.735.85-1.378 2.207-1.195 3.514 1.26.091 2.544-.6 3.358-1.675z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="bg-black/30 hover:bg-black/50 border border-white/20 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center transition-all duration-300 hover:scale-105">
                <div className="mr-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.5 3.78 2.5H15.37C15.8 2.5 16.13 2.91 16.13 3.5V20.5C16.13 21.09 15.8 21.5 15.37 21.5H3.78C3.34 21.5 3 21.09 3 20.5ZM6.17 18.5H13V5.5H6.17V18.5ZM21 18.5H17.83V5.5H21C21.55 5.5 22 5.95 22 6.5V17.5C22 18.05 21.55 18.5 21 18.5Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Content - Trading Dashboard */}
          <div className="lg:w-1/2 animate-fade-in-right">
            <div className="relative max-w-md mx-auto">
              {/* Main Phone Mockup */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 border border-white/20 shadow-2xl overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                
                {/* Phone Screen */}
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-crypto-purple/20 to-crypto-blue/20 p-4 border-b border-white/10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-crypto-purple/30 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-crypto-purple" />
                        </div>
                        <span className="text-white font-bold">Growth Global</span>
                      </div>
                      <div className="text-xs text-gray-300">14:30 • 100%</div>
                    </div>
                  </div>
                  
                  {/* Trading Dashboard */}
                  <div className="p-4">
                    {/* Instrument Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-bold">€/$</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">EURUSD</h3>
                            <p className="text-xs text-gray-400">Euro / US Dollar</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">1.17579</div>
                        <div className="text-xs text-green-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +0.24% • 2 Lots
                        </div>
                      </div>
                    </div>
                    
                    {/* Navigation Tabs */}
                    <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
                      {['OVERVIEW', 'POSITIONS', 'ORDERS', 'PRICE ALERTS'].map((tab, index) => (
                        <button 
                          key={index} 
                          className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                            index === 0 
                              ? 'bg-crypto-purple text-white' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    
                    {/* Watchlist */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-semibold text-white">WATCHLIST</h4>
                        <div className="text-xs text-gray-400">3/17</div>
                      </div>
                      
                      <div className="space-y-3">
                        {/* EURUSD Watchlist Item */}
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-blue-400 text-sm font-bold">€/$</span>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">EURUSD</div>
                                <div className="text-xs text-gray-400">1.17504 / 1.17505</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-green-500">+0.37%</div>
                              <div className="text-xs text-gray-400">1.17579</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* APPLE Watchlist Item */}
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-red-400 text-sm font-bold">A</span>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">APPLE</div>
                                <div className="text-xs text-gray-400">199.99 / 200.01</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-green-500">+1.95%</div>
                              <div className="text-xs text-gray-400">199.99</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* GOLD Watchlist Item */}
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-yellow-400 text-sm font-bold">₿</span>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">GOLD</div>
                                <div className="text-xs text-gray-400">1,800.50 / 1,801.00</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-red-500">-0.42%</div>
                              <div className="text-xs text-gray-400">1,800.75</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold text-sm">
                        BUY
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm">
                        SELL
                      </button>
                      <button className="w-12 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors">
                        <Bell className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -right-6 -bottom-11 bg-crypto-purple/20 backdrop-blur-md rounded-lg p-3 border border-crypto-purple/30 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Active Traders</p>
                    <p className="text-lg font-bold text-white">10K+</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-6 -top-10 bg-crypto-purple/20 backdrop-blur-md rounded-lg p-3 border border-crypto-purple/30 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Avg. Execution</p>
                    <p className="text-lg font-bold text-white">5ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Border Section */}
        <div className="mt-2 border-t border-white/10">
         
        </div>
      </div>
    </section>
  );
};

export default SmartTrading;