import { AlertTriangle, Pencil, Trash2, X } from "lucide-react";

const BankExistsModal = ({ bank, onEdit, onDelete, onClose }) => {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* ================= Header ================= */}
        <div className="flex items-start justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Bank Already Exists
              </h2>
              <p className="text-xs text-gray-500">
                Only one bank can be active at a time
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= Body ================= */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-600">
            You already have a bank added.  
            Please update or delete the existing bank before adding a new one.
          </p>

          {/* Bank Card */}
          <div className="rounded-xl border bg-slate-50 p-4 space-y-1">
            <p className="text-sm font-semibold text-gray-800">
              {bank.bank_name}
            </p>
            <p className="text-xs text-gray-500">
              Account Holder: {bank.acc_holder_name}
            </p>
            <p className="text-xs text-gray-500">
              Account No: {bank.acc_number}
            </p>
          </div>
        </div>

        {/* ================= Footer ================= */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">

          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onEdit(bank)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <Pencil size={16} />
            Edit Bank
          </button>

          <button
            onClick={() => onDelete(bank.id)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            <Trash2 size={16} />
            Delete Bank
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankExistsModal;
