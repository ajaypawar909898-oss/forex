import BankForm from "./BankForm";

const BankModal = ({ onClose, refresh, editData }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Bank" : "Add Bank"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <BankForm editData={editData} onClose={onClose} refresh={refresh} />
      </div>
    </div>
  );
};

export default BankModal;
