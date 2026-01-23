import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const WithdrawMoney = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/wallet/wallet/balance`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setBalance(data.balance || 0);
        }
      } catch (error) {
        console.error("Failed to fetch wallet balance", error);
      }
    };

    fetchBalance();
  }, []);

  /* ================================
     WITHDRAW REQUEST
  ================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ BALANCE CHECK (ADDED)
    if (Number(amount) > Number(balance)) {
      alert("Withdrawal amount cannot be greater than available balance");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/wallet/wallet/withdraw`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            name,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Withdrawal request failed");
        return;
      }

      alert("Withdrawal request submitted successfully");
      setAmount("");
      setName("");
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Withdraw Money
      </h2>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Available Balance */}
        <div>
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ₹{balance}
          </p>
        </div>

        <hr />

        {/* Instruction */}
        <p className="text-sm text-gray-600">
          Click Withdraw Money Button and submit form for Withdrawal money.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          {/* Withdrawal Amount */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Withdrawal Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Withdrawal Amount"
              max={balance}              
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crypto-purple"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crypto-purple"
            />
          </div>

          {/* Submit Button */}
          <div className="md:mt-7">
            <button
              type="submit"
              className="w-full bg-crypto-purple hover:bg-crypto-dark-purple text-white font-semibold py-3 rounded-lg transition-all"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawMoney;