

import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL_IMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================================
     FETCH WALLET LEDGER
  ================================= */
  useEffect(() => {
    const fetchLedger = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/wallet/wallet/ledger`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response (check API URL)");
        }

        const data = await res.json();

        if (data.success) {
          setTransactions(Array.isArray(data.table) ? data.table : []);
        }
      } catch (error) {
        console.error("Failed to fetch wallet ledger:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLedger();
  }, []);

  /* ================================
     HELPERS
  ================================= */
  const statusBadge = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const typeBadge = (type) => {
    switch (type) {
      case "topup":
        return "bg-blue-100 text-blue-700";
      case "profit":
        return "bg-green-100 text-green-700";
      case "withdrawal":
        return "bg-orange-100 text-orange-700";
      case "loss":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const typeLabel = (type) => {
    switch (type) {
      case "topup":
        return "TOPUP";
      case "profit":
        return "PROFIT";
      case "withdrawal":
        return "WITHDRAWAL";
      case "loss":
        return "LOSS";
      default:
        return type?.toUpperCase();
    }
  };

  // ✅ sort newest first
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [transactions]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Your All Transactions
      </h2>

      {/* ✅ Loading */}
      {loading ? (
        <div className="bg-white rounded-lg shadow p-6 text-gray-500">
          Loading transactions...
        </div>
      ) : sortedTransactions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Type</th>
                  <th className="p-3 border-b">Amount</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Remark</th>
                  <th className="p-3 border-b">Payment Proof</th>
                </tr>
              </thead>

              <tbody>
                {sortedTransactions.map((item) => {
                  const isCredit = ["topup", "profit"].includes(
                    item.transaction_type
                  );

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {/* DATE */}
                      <td className="p-3 border-b text-sm text-gray-700">
                        {new Date(item.created_at).toLocaleString()}
                      </td>

                      {/* TYPE */}
                      <td className="p-3 border-b">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${typeBadge(
                            item.transaction_type
                          )}`}
                        >
                          {typeLabel(item.transaction_type)}
                        </span>
                      </td>

                      {/* AMOUNT */}
                      <td className="p-3 border-b font-semibold">
                        <span
                          className={`${isCredit ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {isCredit ? "+" : "-"}₹{Number(item.amount).toFixed(2)}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="p-3 border-b">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${statusBadge(
                            item.status
                          )}`}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </td>

                      {/* REMARK */}
                      <td className="p-3 border-b text-sm text-gray-600">
                        {item.admin_remark ? item.admin_remark : "-"}
                      </td>

                      {/* PAYMENT IMAGE */}
                      <td className="p-3 border-b">
                        {item.payment_image ? (
                          <a
                            href={`${API_BASE_URL_IMAGE}/${item.payment_image}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Proof
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ✅ LEGEND */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
              TOPUP = Money Added
            </span>
            <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
              PROFIT = Trade Profit
            </span>
            <span className="px-2 py-1 rounded bg-orange-100 text-orange-700 font-semibold">
              WITHDRAWAL = Money Withdrawn
            </span>
            <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-semibold">
              LOSS = Trade Loss
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
