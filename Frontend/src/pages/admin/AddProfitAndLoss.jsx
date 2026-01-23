import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddProfitAndLoss = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("profit");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===============================
     FETCH ALL USERS
  =============================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  /* ===============================
     SUBMIT PROFIT / LOSS
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !amount) {
      alert("Please select user and enter amount");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/wallet/admin/wallet/profit-loss`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: selectedUser,
            amount: parseInt(amount),
            type,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Operation failed");
      }

      alert("Profit / Loss added successfully");
      setAmount("");
      setSelectedUser("");
      setType("profit");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Add Profit / Loss</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto space-y-5"
        >
          {/* USER SELECT */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loadingUsers}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* TYPE */}
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="profit">Profit</option>
              <option value="loss">Loss</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${isSubmitting
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProfitAndLoss;
