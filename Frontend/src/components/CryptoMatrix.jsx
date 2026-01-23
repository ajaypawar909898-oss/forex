import useCoinGeckoMarket from "../hooks/useCoinGeckoMarket";

export default function CryptoMatrix() {
    const { coins, loading } = useCoinGeckoMarket({
        limit: 50, // matrix looks good with 40-60
        vs_currency: "usd",
        refreshMs: 15000,
    });

    if (loading) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300">
                Loading matrix...
            </div>
        );
    }

    return (
        <div className="bg-black/30 border border-white/10 rounded-xl p-4 overflow-x-auto">
            <div className="text-white font-bold text-lg mb-3">Market Matrix</div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {coins.map((coin) => {
                    const up = coin?.price_change_percentage_24h >= 0;

                    return (
                        <div
                            key={coin.id}
                            className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-crypto-purple/60 transition"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    className="w-6 h-6 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-semibold">
                                        {coin.symbol?.toUpperCase()}
                                    </span>
                                    <span className="text-gray-900 text-xs">{coin.name}</span>
                                </div>
                            </div>

                            <div className="mt-2 text-white font-bold text-sm">
                                ${Number(coin.current_price).toLocaleString()}
                            </div>

                            <div
                                className={`mt-1 text-xs font-semibold ${up ? "text-green-900" : "text-red-900"
                                    }`}
                            >
                                24h: {up ? "+" : ""}
                                {coin.price_change_percentage_24h?.toFixed(2)}%
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
