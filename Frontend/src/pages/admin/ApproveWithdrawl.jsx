import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ApproveWithdrawl = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH PENDING WITHDRAWALS
  =============================== */
  useEffect(() => {
    const fetchPendingWithdrawals = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/wallet/admin/wallet/pending`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          // setRequests(data.data || []);
          setRequests(() =>
            data?.data?.filter(item =>
              item?.transaction_type?.toLowerCase().includes("withdrawal")
            )
          );
        }
      } catch (error) {
        console.error("Error fetching pending withdrawals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingWithdrawals();
  }, []);

  /* ===============================
     APPROVE / REJECT HANDLER
  =============================== */
  const handleAction = async (id, status) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/wallet/admin/wallet/approve/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // remove approved/rejected item from UI
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6">Approve Withdrawal</h2>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="bg-white shadow p-6 rounded text-center text-gray-500">
            No pending withdrawal requests
          </div>
        ) : (
          requests.map((r) => (
            <div
              key={r.id}
              className="bg-white shadow p-4 rounded mb-4 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* LEFT INFO */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">
                  User ID: {r.user_id}
                </p>
                <p className="text-sm text-gray-600">
                  Name: <span className="font-medium">{r.name}</span>
                </p>
                <p className="text-sm text-gray-600">Email: {r.email}</p>
                <p className="text-lg font-bold text-gray-900">
                  Amount: ₹{r.amount}
                </p>
                <p className="text-sm text-yellow-600 capitalize">
                  Status: {r.status}
                </p>
                <p className="text-xs text-gray-500">
                  Requested On:{" "}
                  {new Date(r.created_at).toLocaleString()}
                </p>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleAction(r.id, "approved")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(r.id, "rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApproveWithdrawl;
