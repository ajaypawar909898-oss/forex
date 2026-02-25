import { useEffect, useState } from "react";
import { fetchBanks } from "../../api/bank.api";
import { Copy, Download } from "lucide-react";
import { toast } from "react-toastify";

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
          setBank(data.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch bank", error);
      }
    };

    loadBank();
  }, []);

  /* ===============================
     COPY UPI DETAILS
  =============================== */
  const copyUPI = async () => {
    if (!bank) return;

    const text = `${bank.upi_id}`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("UPI details copied!");
    } catch (err) {
      toast.error("Copy failed");
      console.error(err);
    }
  };

  const copyName = async () => {
    if (!bank) return;

    const text = `${bank.upi_name}`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("UPI details copied!");
    } catch (err) {
      toast.error("Copy failed");
      console.error(err);
    }
  };

  /* ===============================
     DOWNLOAD QR IMAGE
  =============================== */
  const downloadQR = async () => {
    if (!bank?.qr_code) return;

    try {
      const response = await fetch(
        `${API_BASE_URL_IMAGE}/${bank.qr_code}`
      );
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("QR downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

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

      alert("Top-up request sent successfully");
      setAmount("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  /* ===============================
     TAB CONTENT
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
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
              <img
                src={`${API_BASE_URL_IMAGE}/${bank.qr_code}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 bg-crypto-purple text-white px-4 py-2 rounded hover:bg-crypto-dark-purple"
            >
              <Download size={18} />
              Download QR
            </button>
          </div>
        );

      case "UPI ID":
        return (
          <div className="space-y-4 py-4 text-gray-700">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div>
                <p className="font-semibold">UPI ID</p>
                <p>{bank.upi_id}</p>
              </div>

              <button
                onClick={copyUPI}
                className="text-crypto-purple hover:text-crypto-dark-purple"
              >
                <Copy size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div>
                <p className="font-semibold">UPI Name</p>
                <p>{bank.upi_name}</p>
              </div>

              <button
                onClick={copyName}
                className="text-crypto-purple hover:text-crypto-dark-purple"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3 py-4 text-gray-700">
            <p>
              <strong>Account Holder Name:</strong>{" "}
              {bank.acc_holder_name}
            </p>
            <p>
              <strong>Bank Name:</strong> {bank.bank_name}
            </p>
            <p>
              <strong>Account No:</strong> {bank.acc_number}
            </p>
            <p>
              <strong>IFSC:</strong> {bank.ifsc_number}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Invest Money
      </h2>

      {/* Tabs Card */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold whitespace-nowrap
                ${activeTab === tab
                  ? "bg-crypto-purple text-white"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-6">{renderTabContent()}</div>
      </div>

      {/* Deposit Form */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h3 className="text-lg font-semibold">
          After depositing money, upload screenshot and submit.
        </h3>

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

        <div>
          <label className="block mb-2 text-sm font-medium">
            Upload Screenshot
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-crypto-purple hover:bg-crypto-dark-purple text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default InvestMoney;