// import { useState } from "react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// const tabs = ["QR CODE", "BANK DETAILS", "UPI ID"];

// const InvestMoney = () => {
//   const [activeTab, setActiveTab] = useState("BANK DETAILS");
//   const [amount, setAmount] = useState("");
//   const [file, setFile] = useState(null);

//   // ✅ SUBMIT HANDLER (added)
//   const handleSubmit = async () => {
//     if (!amount || !file) {
//       alert("Please enter amount and upload screenshot");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("amount", amount);
//       formData.append("image", file);

//       const response = await fetch(
//         `${API_BASE_URL}/wallet/wallet/topup`,
//         {
//           method: "POST",
//           body: formData,
//           credentials: "include", // ✅ required for isAuthenticated
//         }
//       );

//       const data = await response.json();

//       if (!data.success) {
//         alert(data.message || "Top-up request failed");
//         return;
//       }

//       alert("Top-up request sent to admin successfully");
//       setAmount("");
//       setFile(null);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "QR CODE":
//         return (
//           <div className="flex justify-center py-6">
//             <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400">
//               QR IMAGE
//             </div>
//           </div>
//         );

//       case "UPI ID":
//         return (
//           <div className="space-y-3 py-4 text-gray-700">
//             <p><strong>UPI ID :-</strong> example@upi</p>
//             <p><strong>UPI Name :-</strong> Company Name</p>
//           </div>
//         );

//       default:
//         return (
//           <div className="space-y-3 py-4 text-gray-700">
//             <p><strong>Account Holder Name :-</strong> Company Name</p>
//             <p><strong>Bank Name :-</strong> HDFC Bank</p>
//             <p><strong>Bank Account No. :-</strong> 1234567890</p>
//             <p><strong>Bank IFSC Code :-</strong> HDFC0000123</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Page Title */}
//       <h2 className="text-xl font-semibold text-gray-800">
//         Invest Money
//       </h2>

//       {/* Payment Info Card */}
//       <div className="bg-white rounded-lg shadow">
//         {/* Tabs */}
//         <div className="flex border-b">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-3 text-sm font-semibold transition
//                 ${
//                   activeTab === tab
//                     ? "bg-crypto-purple text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="px-6">
//           {renderTabContent()}
//         </div>
//       </div>

//       {/* Deposit Form */}
//       <div className="bg-white rounded-lg shadow p-6 space-y-6">
//         <h3 className="text-lg font-semibold">
//           Please After Deposit Money, Fill The Form And Click On Submit.
//         </h3>

//         {/* Deposit Amount */}
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Deposit Amount
//           </label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Deposit Amount"
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crypto-purple"
//           />
//         </div>

//         {/* Screenshot Upload */}
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Add Deposit Amount Screenshot
//           </label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit} // ✅ connected
//           className="bg-crypto-purple hover:bg-crypto-dark-purple text-white font-semibold px-8 py-3 rounded-lg transition-all"
//         >
//           SUBMIT
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InvestMoney;






import { useEffect, useState } from "react";
import { fetchBanks } from "../../api/bank.api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL_IMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;

const tabs = ["QR CODE", "BANK DETAILS", "UPI ID"];

const InvestMoney = () => {
  const [activeTab, setActiveTab] = useState("BANK DETAILS");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [bank, setBank] = useState(null);

  /* ===============================
     FETCH BANK DATA
  =============================== */
  useEffect(() => {
    const loadBank = async () => {
      try {
        const { data } = await fetchBanks();
        if (data?.data?.length) {
          setBank(data.data[0]); // only one active bank
        }
      } catch (error) {
        console.error("Failed to fetch bank", error);
      }
    };

    loadBank();
  }, []);

  /* ===============================
     SUBMIT HANDLER
  =============================== */
  const handleSubmit = async () => {
    if (!amount || !file) {
      alert("Please enter amount and upload screenshot");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("image", file);

      const response = await fetch(
        `${API_BASE_URL}/wallet/wallet/topup`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Top-up request failed");
        return;
      }

      alert("Top-up request sent to admin successfully");
      setAmount("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  /* ===============================
     TAB CONTENT (UI UNCHANGED)
  =============================== */
  const renderTabContent = () => {
    if (!bank) {
      return (
        <div className="py-6 text-center text-gray-400">
          No bank details available
        </div>
      );
    }

    switch (activeTab) {
      case "QR CODE":
        return (
          <div className="flex justify-center py-6">
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
              <img
                src={`${API_BASE_URL_IMAGE}/${bank.qr_code}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        );

      case "UPI ID":
        return (
          <div className="space-y-3 py-4 text-gray-700">
            <p>
              <strong>UPI ID :-</strong> {bank.upi_id}
            </p>
            <p>
              <strong>UPI Name :-</strong> {bank.upi_name}
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-3 py-4 text-gray-700">
            <p>
              <strong>Account Holder Name :-</strong>{" "}
              {bank.acc_holder_name}
            </p>
            <p>
              <strong>Bank Name :-</strong> {bank.bank_name}
            </p>
            <p>
              <strong>Bank Account No. :-</strong>{" "}
              {bank.acc_number}
            </p>
            <p>
              <strong>Bank IFSC Code :-</strong>{" "}
              {bank.ifsc_number}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        Invest Money
      </h2>

      {/* Payment Info Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold transition
                ${
                  activeTab === tab
                    ? "bg-crypto-purple text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Deposit Form */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h3 className="text-lg font-semibold">
          Please After Deposit Money, Fill The Form And Click On Submit.
        </h3>

        {/* Deposit Amount */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Deposit Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Deposit Amount"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crypto-purple"
          />
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Add Deposit Amount Screenshot
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-crypto-purple hover:bg-crypto-dark-purple text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default InvestMoney;
