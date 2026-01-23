import { useEffect, useState } from "react";
import { createBank, updateBank } from "../../api/bank.api";

const API_URL_Image = import.meta.env.VITE_API_BASE_URL_IMAGE;

/* ===============================
   Build Image URL
=============================== */
const buildImageUrl = (path) => {
  if (!path) return null;
  return `${API_URL_Image}/${path}`;
};

const BankForm = ({ editData, onClose, refresh }) => {
  const [form, setForm] = useState({
    acc_holder_name: editData?.acc_holder_name || "",
    bank_name: editData?.bank_name || "",
    acc_number: editData?.acc_number || "",
    ifsc_number: editData?.ifsc_number || "",
    upi_id: editData?.upi_id || "",
    upi_name: editData?.upi_name || "",
  });

  const [qrFile, setQrFile] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     Load QR in edit mode
  =============================== */
  useEffect(() => {
    if (editData?.qr_code) {
      setQrPreview(buildImageUrl(editData.qr_code));
    }
  }, [editData]);

  /* ===============================
     QR Change
  =============================== */
  const handleQrChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setQrFile(file);
    setQrPreview(URL.createObjectURL(file));
  };

  /* ===============================
     Cleanup blob URL
  =============================== */
  useEffect(() => {
    return () => {
      if (qrPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(qrPreview);
      }
    };
  }, [qrPreview]);

  /* ===============================
     Submit
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (qrFile) fd.append("qr_image", qrFile);

      editData ? await updateBank(editData.id, fd) : await createBank(fd);

      refresh();
      onClose();
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     Input Component
  =============================== */
  const renderInput = (label, name, placeholder) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        value={form[name]}
        placeholder={placeholder}
        onChange={(e) =>
          setForm({ ...form, [name]: e.target.value })
        }
        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        required
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-h-[80vh]"
    >
      {/* ================= Scrollable Content ================= */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-6">
        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput(
            "Account Holder Name",
            "acc_holder_name",
            "Enter account holder name"
          )}
          {renderInput(
            "Bank Name",
            "bank_name",
            "Enter bank name"
          )}
          {renderInput(
            "Account Number",
            "acc_number",
            "Enter account number"
          )}
          {renderInput(
            "IFSC Code",
            "ifsc_number",
            "Enter IFSC code"
          )}
          {renderInput(
            "UPI ID",
            "upi_id",
            "example@upi"
          )}
          {renderInput(
            "UPI Name",
            "upi_name",
            "Enter UPI holder name"
          )}
        </div>

        {/* ================= QR Upload ================= */}
        <div className="border rounded-xl p-4 bg-slate-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Code
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleQrChange}
            className="text-sm"
          />

          {qrPreview ? (
            <div className="mt-4 flex justify-center">
              <img
                src={qrPreview}
                alt="QR Preview"
                className="w-40 h-40 object-contain border rounded-lg bg-white shadow"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-3 text-center">
              Upload QR code image
            </p>
          )}
        </div>
      </div>

      {/* ================= Sticky Footer ================= */}
      <div className="pt-4 mt-4 border-t bg-white sticky bottom-0">
        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : editData
            ? "Update Bank"
            : "Create Bank"}
        </button>
      </div>
    </form>
  );
};

export default BankForm;
