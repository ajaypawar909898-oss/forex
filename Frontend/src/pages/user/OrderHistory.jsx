import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [activeTab, setActiveTab] = useState("live");
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===========================
     FETCH USER TRADES
  =========================== */
  const fetchUserTrades = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/trade/user`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);


      if (data?.success) {
        setTrades(Array.isArray(data.data) ? data.data : []);
      } else {
        toast.error(data?.message || "Failed to fetch trades");
      }
    } catch {
      toast.error("Failed to fetch trades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTrades();
  }, []);

  /* ===========================
     FILTER LIVE + BOOKED
  =========================== */
  const liveTrades = useMemo(() => {
    return trades.filter((t) => t.status === "open");
  }, [trades]);

  const bookedTrades = useMemo(() => {
    return trades.filter((t) => t.status === "close");
  }, [trades]);


  useEffect(() => {
    console.log(bookedTrades);

  }, [bookedTrades])

  /* ===========================
     FORMAT DATE
  =========================== */
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-";
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  return (
    <div className="p-4 md:p-6">
      {/* Page Title */}
      <div className="flex justify-between items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Order History</h2>

        <button
          onClick={fetchUserTrades}
          className="px-3 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900"
        >
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg overflow-hidden border mb-6">
        <button
          onClick={() => setActiveTab("live")}
          className={`flex-1 py-3 text-center font-semibold transition
            ${activeTab === "live"
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-black"
            }`}
        >
          Live Trade ({liveTrades.length})
        </button>

        <button
          onClick={() => setActiveTab("booked")}
          className={`flex-1 py-3 text-center font-semibold transition
            ${activeTab === "booked"
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-black"
            }`}
        >
          Booked Trade ({bookedTrades.length})
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-gradient-to-br from-[#1a1f2c] to-[#0f1320] rounded-xl p-4 md:p-6 shadow-lg min-h-[220px]">
        {loading ? (
          <p className="text-gray-300">Loading trades...</p>
        ) : activeTab === "live" ? (
          /* ✅ LIVE TRADES */
          liveTrades.length === 0 ? (
            <p className="text-gray-300">No live trades found</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liveTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="bg-black/70 rounded-lg p-4 text-white space-y-2"
                >
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    <span className="text-gray-300">{trade.id}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Order Date:</span>{" "}
                    <span className="text-gray-300">
                      {formatDate(trade.order_date)}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Currency:</span>{" "}
                    <span className="text-gray-300">{trade.currency_pair}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    <span className="text-gray-300">{trade.quantity}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Order Price:</span>{" "}
                    <span className="text-gray-300">{trade.order_price}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-green-400 font-semibold">
                      {trade.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )
        ) : (
          /* ✅ BOOKED TRADES */
          bookedTrades.length === 0 ? (
            <p className="text-gray-300">No booked trades found</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bookedTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="bg-black/70 rounded-lg p-4 text-white space-y-2"
                >
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    <span className="text-gray-300">{trade.id}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Order Date:</span>{" "}
                    <span className="text-gray-300">
                      {formatDate(trade.order_date)}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Currency:</span>{" "}
                    <span className="text-gray-300">{trade.currency_pair}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    <span className="text-gray-300">{trade.quantity}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Buy Price:</span>{" "}
                    <span className="text-gray-300">
                      {Number(trade.buy_price).toFixed(3) ?? "-"}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Sell Price:</span>{" "}
                    <span className="text-gray-300">
                      {Number(trade.sell_price).toFixed(3) ?? "-"}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Order Price:</span>{" "}
                    <span className="text-gray-300">{trade.order_price}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-red-400 font-semibold">
                      {trade.status.toUpperCase()}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    <span className="text-gray-300">
                      {trade.type?.toUpperCase()}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Result:</span>{" "}
                    {trade?.profit_loss ? (
                      <span
                        className={`font-semibold ${trade?.result_type === "profit" ? "text-green-400" : "text-red-400"
                          }`}
                      >
                        {trade?.result_type?.toUpperCase()} ₹{trade.profit_loss}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </p>

                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
