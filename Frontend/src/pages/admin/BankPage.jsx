import { useEffect, useState } from "react";
import { fetchBanks, deleteBank } from "../../api/bank.api.js";
import BankList from "../../components/Bank/BankList.jsx";
import BankModal from "../../components/Bank/BankModal.jsx";
import BankExistsModal from "../../components/Bank/BankExistsModal.jsx";
import AdminSidebar from "./AdminSidebar";

const BankPage = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showExistsModal, setShowExistsModal] = useState(false);

  const loadBanks = async () => {
    try {
      setLoading(true);
      const { data } = await fetchBanks();
      setBanks(data.data);
    } catch (error) {
      console.error("Failed to load banks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Deactivate this bank?")) return;
    await deleteBank(id);
    setShowExistsModal(false);
    loadBanks();
  };

  const handleAddClick = () => {
    if (banks.length > 0) {
      setShowExistsModal(true);
    } else {
      setEditData(null);
      setOpenModal(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Bank Management
              </h1>
              <p className="text-sm text-gray-500">
                Manage bank accounts & QR payment details
              </p>
            </div>

            <button
              onClick={handleAddClick}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow"
            >
              + Add Bank
            </button>
          </div>

          <BankList
            banks={banks}
            loading={loading}
            onEdit={(bank) => {
              setEditData(bank);
              setOpenModal(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      {openModal && (
        <BankModal
          editData={editData}
          onClose={() => setOpenModal(false)}
          refresh={loadBanks}
        />
      )}

      {/* Existing Bank Modal */}
      {showExistsModal && banks.length > 0 && (
        <BankExistsModal
          bank={banks[0]}
          onEdit={(bank) => {
            setShowExistsModal(false);
            setEditData(bank);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
          onClose={() => setShowExistsModal(false)}
        />
      )}
    </div>
  );
};

export default BankPage;
