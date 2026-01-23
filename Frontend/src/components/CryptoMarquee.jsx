import useCoinGeckoMarket from "../hooks/useCoinGeckoMarket";

export default function CryptoMarquee() {
    const { coins, loading } = useCoinGeckoMarket({
        limit: 25, // only show 20-30 coins in marquee
        vs_currency: "usd",
        refreshMs: 15000,
    });

    if (loading) {
        return (
            <div className="w-full bg-black/30 border-b border-white/10 py-2">
                <div className="container mx-auto px-4 text-gray-300 text-sm">
                    Loading market...
                </div>
            </div>
        );
    }

    // duplicate array for infinite smooth ticker
    const list = [...coins, ...coins];

    return (
        <div className="w-full bg-black/30 border-b border-white/10 overflow-hidden">
            <div className="relative">
                <div className="flex w-max animate-crypto-marquee">
                    {list.map((coin, idx) => {
                        const up = coin?.price_change_percentage_24h >= 0;

                        return (
                            <div
                                key={coin.id + "-" + idx}
                                className="flex items-center gap-2 px-6 py-2 text-sm text-white whitespace-nowrap"
                            >
                                <img
                                    src={coin.image}
                                    alt={coin.symbol}
                                    className="w-4 h-4 rounded-full"
                                />

                                <span className="font-semibold">
                                    {coin.symbol?.toUpperCase()}
                                </span>

                                <span className="text-gray-200">
                                    ${Number(coin.current_price).toLocaleString()}
                                </span>

                                <span
                                    className={`font-semibold ${up ? "text-green-400" : "text-red-400"
                                        }`}
                                >
                                    {up ? "+" : ""}
                                    {coin.price_change_percentage_24h?.toFixed(2)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tailwind custom animation */}
            <style>
                {`
          @keyframes crypto-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-crypto-marquee {
            animation: crypto-marquee 25s linear infinite;
          }
        `}
            </style>
        </div>
    );
}
