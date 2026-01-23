// const BankList = ({ banks, loading, onEdit, onDelete }) => {
//   if (loading)
//     return <p className="text-center text-gray-500">Loading...</p>;

//   return (
//     <div className="overflow-x-auto bg-white rounded-xl shadow">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             <th className="p-3">Bank Name</th>
//             <th >Account Holder Name</th>
//             <th>Account</th>
//             <th>UPI</th>
//             <th>Status</th>
//             <th className="text-right p-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {banks.map((bank) => (
//             <tr key={bank.id} className="border-t hover:bg-gray-50">
//               <td className="p-3">
//                 <p className="font-medium">{bank.bank_name}</p>
//                 {/* <p className="text-gray-500 text-xs">
//                   {bank.acc_holder_name}
//                 </p> */}
//               </td>

//               <td>{bank.acc_holder_name}</td>
//               <td>{bank.acc_number}</td>
//               <td>{bank.upi_id}</td>

//               <td>
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     bank.status === "active"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {bank.status}
//                 </span>
//               </td>

//               <td className="p-3 flex gap-2 justify-end">
//                 <button
//                   onClick={() => onEdit(bank)}
//                   className="text-indigo-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(bank.id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BankList;


// import { Pencil, Trash2 } from "lucide-react";

// const BankList = ({ banks, loading, onEdit, onDelete }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl p-8 shadow text-center text-gray-500 text-sm">
//         Loading banks...
//       </div>
//     );
//   }

//   if (!banks.length) {
//     return (
//       <div className="bg-white rounded-xl p-10 shadow text-center">
//         <p className="text-gray-500 text-sm">
//           No bank records found
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto bg-white rounded-xl shadow">
//       <table className="w-full text-sm text-gray-700">
//         {/* ================= Header ================= */}
//         <thead className="bg-slate-50 border-b">
//           <tr>
//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
//               Bank
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
//               Account
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
//               UPI
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
//               Status
//             </th>
//             <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         {/* ================= Body ================= */}
//         <tbody>
//           {banks.map((bank) => (
//             <tr
//               key={bank.id}
//               className="border-b last:border-none hover:bg-slate-50 transition"
//             >
//               {/* Bank */}
//               <td className="px-6 py-4">
//                 <div className="flex flex-col">
//                   <span className="font-semibold text-gray-800">
//                     {bank.bank_name}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {bank.acc_holder_name}
//                   </span>
//                 </div>
//               </td>

//               {/* Account */}
//               <td className="px-6 py-4 text-sm font-medium">
//                 {bank.acc_number}
//               </td>

//               {/* UPI */}
//               <td className="px-6 py-4 text-sm">
//                 {bank.upi_id}
//               </td>

//               {/* Status */}
//               <td className="px-6 py-4">
//                 <span
//                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
//                     bank.status === "active"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {bank.status}
//                 </span>
//               </td>

//               {/* Actions */}
//               <td className="px-6 py-4">
//                 <div className="flex justify-end gap-2">
//                   {/* Edit */}
//                   <button
//                     onClick={() => onEdit(bank)}
//                     className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   >
//                     <Pencil size={14} />
//                     Edit
//                   </button>

//                   {/* Delete */}
//                   <button
//                     onClick={() => onDelete(bank.id)}
//                     className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     <Trash2 size={14} />
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BankList;


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
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bank.status === "active"
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
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  bank.status === "active"
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

