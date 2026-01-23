import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Image = import.meta.env.VITE_API_BASE_URL_IMAGE;

const ApproveTopup = () => {
  const [topups, setTopups] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH PENDING TOPUPS
  =============================== */
  const fetchTopups = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/wallet/admin/wallet/pending`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Filter only TOPUP requests (CORRECT KEY)
        const onlyTopups = data.data.filter(
          (item) => item.transaction_type === "topup",
        );
        setTopups(onlyTopups);
      }
    } catch (error) {
      console.error("Failed to fetch topups", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopups();
  }, []);

  /* ===============================
     APPROVE / REJECT TOPUP
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
        },
      );

      const data = await res.json();

      if (data.success) {
        // ✅ Remove approved/rejected item
        setTopups((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6">Approve Topup Requests</h2>

        {loading && <p className="text-gray-500">Loading topup requests...</p>}

        {!loading && topups.length === 0 && (
          <p className="text-gray-500">No pending topup requests</p>
        )}

        <div className="space-y-4">
          {topups.map((topup) => (
            <div
              key={topup.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* LEFT INFO */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">
                  User ID: {topup.user_id}
                </p>
                <p className="text-sm text-gray-600">
                  Name: <span className="font-medium">{topup.name}</span>
                </p>
                <p className="text-sm text-gray-600">Email: {topup.email}</p>
                <p className="text-lg font-bold text-gray-900">
                  Amount: ₹{topup.amount}
                </p>
                <p className="text-xs text-yellow-600 capitalize">
                  Status: {topup.status}
                </p>
                <p className="text-xs text-gray-500">
                  Requested On: {new Date(topup.created_at).toLocaleString()}
                </p>

                {/* PAYMENT IMAGE */}
                {topup.payment_image && (
                  <img
                    src={`${Image}/${topup.payment_image}`}
                    alt="Payment Proof"
                    className="mt-2 w-32 rounded border"
                  />
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleAction(topup.id, "approved")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleAction(topup.id, "rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproveTopup;
