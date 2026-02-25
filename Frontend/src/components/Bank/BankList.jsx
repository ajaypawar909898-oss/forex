import { Pencil, Trash2 } from "lucide-react";

const BankList = ({ banks, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow text-center text-gray-500 text-sm">
        Loading banks...
      </div>
    );
  }

  if (!banks.length) {
    return (
      <div className="bg-white rounded-xl p-10 shadow text-center">
        <p className="text-gray-500 text-sm">
          No bank records found
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ================= DESKTOP / TABLET TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-800">
                Bank
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-800">
                Account Holder Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-800">
                Account No.
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-800">
                IFSC NO.
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-800">
                UPI
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-800">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-800">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {banks.map((bank) => (
              <tr
                key={bank.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {bank.bank_name}
                </td>

                <td className="px-6 py-4">
                  {bank.acc_holder_name}
                </td>

                <td className="px-6 py-4">
                  {bank.acc_number}
                </td>

                <td className="px-6 py-4">
                  {bank.ifsc_number}
                </td>

                <td className="px-6 py-4">
                  {bank.upi_id}
                  <div className="text-xs text-gray-500">
                    {bank.upi_name}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${bank.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {bank.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(bank)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(bank.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Bank Name</p>
                <p className="text-sm font-semibold text-gray-800">
                  {bank.bank_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Account Holder Name</p>
                <p className="text-sm text-gray-800">
                  {bank.acc_holder_name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Account No.</p>
                <p className="font-medium">{bank.acc_number}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">IFSC</p>
                <p className="font-medium">{bank.ifsc_number}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">UPI ID</p>
                <p className="font-medium">{bank.upi_id}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">UPI Name</p>
                <p className="font-medium">{bank.upi_name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${bank.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {bank.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(bank)}
                  className="p-2 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(bank.id)}
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BankList;

