let cachedData = null;
let lastFetchTime = 0;

export const getMarketData = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 100;

        // ✅ cache time = 15 seconds
        const CACHE_DURATION = 15000;

        const now = Date.now();
        if (cachedData && now - lastFetchTime < CACHE_DURATION) {
            return res.json({
                success: true,
                source: "cache",
                data: cachedData.slice(0, limit),
            });
        }

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=1h,24h,7d`;

        const response = await fetch(url);
        const data = await response.json();

        cachedData = data;
        lastFetchTime = now;

        return res.json({
            success: true,
            source: "coingecko",
            data,
        });
    } catch (error) {
        console.log("CoinGecko API Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch CoinGecko data",
        });
    }
};
