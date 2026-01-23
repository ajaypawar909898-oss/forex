import React, { useEffect } from 'react';

const RecentMovement = () => {
  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full py-2">
      <div className="w-full max-w-7xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Card Body */}
          <div className="p-4 sm:p-6">
            {/* Title */}
            <h5 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Recent Movement
            </h5>

            {/* TradingView Widget Container */}
            <div 
              className="tradingview-widget-container w-full rounded-md overflow-hidden"
              style={{ height: '373px' }}
            >
              <iframe
                scrolling="no"
                allowTransparency="true"
                frameBorder="0"
                src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22NASDAQ%3AAAPL%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A373%2C%22range%22%3A%22YTD%22%2C%22allow_symbol_change%22%3Atrue%2C%22details%22%3Atrue%2C%22hotlist%22%3Atrue%2C%22show_popup_button%22%3Atrue%2C%22popup_width%22%3A%221000%22%2C%22popup_height%22%3A%22650%22%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%2C%22utm_source%22%3A%22octafxcurrency.org%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22advanced-chart%22%2C%22page-uri%22%3A%22octafxcurrency.org%2Fuser%2F%22%7D"
                title="Advanced Chart TradingView Widget"
                lang="en"
                className="block w-full"
                style={{ 
                  userSelect: 'none', 
                  boxSizing: 'border-box',
                  height: 'calc(100% - 32px)'
                }}
              />
              
              {/* TradingView Copyright */}
              <div className="tradingview-widget-copyright">
                <a 
                  href="https://www.tradingview.com/?utm_source=octafxcurrency.org&utm_medium=widget_new&utm_campaign=advanced-chart" 
                  rel="noopener nofollow" 
                  target="_blank"
                >
                  <span className="blue-text"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tradingview-widget-copyright {
          font-size: 13px !important;
          line-height: 32px !important;
          text-align: center !important;
          vertical-align: middle !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
          color: #B2B5BE !important;
        }
        .tradingview-widget-copyright .blue-text {
          color: #2962FF !important;
        }
        .tradingview-widget-copyright a {
          text-decoration: none !important;
          color: #B2B5BE !important;
        }
        .tradingview-widget-copyright a:visited {
          color: #B2B5BE !important;
        }
        .tradingview-widget-copyright a:hover .blue-text {
          color: #1E53E5 !important;
        }
        .tradingview-widget-copyright a:active .blue-text {
          color: #1848CC !important;
        }
        .tradingview-widget-copyright a:visited .blue-text {
          color: #2962FF !important;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .tradingview-widget-container {
            height: 300px !important;
          }
        }

        @media (max-width: 480px) {
          .tradingview-widget-container {
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RecentMovement;