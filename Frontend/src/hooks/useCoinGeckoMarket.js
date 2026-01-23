import { useEffect, useRef, useState } from "react";

export default function useCoinGeckoMarket({
    limit = 30,
    vs_currency = "usd",
    refreshMs = 15000,
} = {}) {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const timerRef = useRef(null);

    const fetchCoins = async () => {
        try {
            console.log("FGHJKL");

            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`;

            const res = await fetch(url);
            const data = await res.json();

            if (Array.isArray(data)) {
                setCoins(data);
            }
            setLoading(false);
        } catch (err) {
            console.log("CoinGecko fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoins();


        console.log("gujyg");


        timerRef.current = setInterval(fetchCoins, refreshMs);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [limit, vs_currency, refreshMs]);

    return { coins, loading };
}
