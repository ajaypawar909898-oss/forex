// import React, { useEffect, useMemo, useState } from "react";
// import { toast } from "react-toastify";
// import { FaInfoCircle, FaEdit } from "react-icons/fa";
// import AdminSidebar from "./AdminSidebar";

// const AddTrade = () => {
//   const API_URL = import.meta.env.VITE_API_BASE_URL;

//   const [users, setUsers] = useState([]);
//   const [allTrade, setAllTrade] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [loadingTrade, setLoadingTrade] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [switchTab, setSwitchTab] = useState(false);

//   // ✅ Create / Update mode
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingTradeId, setEditingTradeId] = useState(null);

//   // ✅ Complete Modal
//   const [showCompleteModal, setShowCompleteModal] = useState(false);
//   const [completingTrade, setCompletingTrade] = useState(null);
//   const [completeLoading, setCompleteLoading] = useState(false);

//   // ✅ Details Modal
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [detailsTrade, setDetailsTrade] = useState(null);

//   // ✅ Full Update Modal (Works for open+close)
//   const [showFullUpdateModal, setShowFullUpdateModal] = useState(false);
//   const [fullUpdateLoading, setFullUpdateLoading] = useState(false);

//   // ✅ Form for Create/Update (open trade)
//   const [formData, setFormData] = useState({
//     user_id: "",
//     order_date: "",
//     currency_pair: "",
//     quantity: 1,
//     order_price: "",
//     type: "buy",
//   });

//   // ✅ Complete form (extra fields)
//   const [completeForm, setCompleteForm] = useState({
//     user_id: "",
//     order_date: "",
//     currency_pair: "",
//     quantity: 1,
//     order_price: "",
//     type: "buy",
//     buy_price: "",
//     sell_price: "",
//     profit: "",
//     profit_type: "profit", // ✅ NEW
//   });

//   // ✅ Full update form (open/close)
//   const [fullUpdateForm, setFullUpdateForm] = useState({
//     user_id: "",
//     order_date: "",
//     currency_pair: "",
//     quantity: 1,
//     order_price: "",
//     type: "buy",
//     status: "open",
//     buy_price: "",
//     sell_price: "",
//     profit: "",
//     profit_type: "profit", // ✅ NEW
//   });

//   /* ==========================
//        DATE FORMATTER
//        dd/mm/yyyy hh:mm AM/PM
//     ========================== */
//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return "-";
//     const d = new Date(dateStr);
//     if (isNaN(d.getTime())) return "-";

//     return d.toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   /* ==========================
//        HANDLE CHANGE (CREATE/UPDATE)
//     ========================== */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ==========================
//        HANDLE CHANGE (COMPLETE)
//     ========================== */
//   const handleCompleteChange = (e) => {
//     const { name, value } = e.target;
//     setCompleteForm((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ==========================
//        HANDLE CHANGE (FULL UPDATE)
//     ========================== */
//   const handleFullUpdateChange = (e) => {
//     const { name, value } = e.target;
//     setFullUpdateForm((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ==========================
//        AUTO PROFIT CALC (Complete modal)
//     ========================== */
//   // useEffect(() => {
//   //   const buy = Number(completeForm.buy_price);
//   //   const sell = Number(completeForm.sell_price);
//   //   const qty = Number(completeForm.quantity);

//   //   if (!isNaN(buy) && !isNaN(sell) && !isNaN(qty) && buy > 0 && sell > 0) {
//   //     const profit = (sell - buy) * qty;
//   //     setCompleteForm((prev) => ({
//   //       ...prev,
//   //       profit: profit.toFixed(2),
//   //     }));
//   //   }
//   // }, [completeForm.buy_price, completeForm.sell_price, completeForm.quantity]);

//   /* ==========================
//        AUTO PROFIT CALC (Full update modal)
//     ========================== */
//   // useEffect(() => {
//   //   const buy = Number(fullUpdateForm.buy_price);
//   //   const sell = Number(fullUpdateForm.sell_price);
//   //   const qty = Number(fullUpdateForm.quantity);

//   //   if (!isNaN(buy) && !isNaN(sell) && !isNaN(qty) && buy > 0 && sell > 0) {
//   //     const profit = (sell - buy) * qty;
//   //     setFullUpdateForm((prev) => ({
//   //       ...prev,
//   //       profit: profit.toFixed(2),
//   //     }));
//   //   }
//   // }, [
//   //   fullUpdateForm.buy_price,
//   //   fullUpdateForm.sell_price,
//   //   fullUpdateForm.quantity,
//   // ]);

//   /* ==========================
//        FETCH USERS
//     ========================== */
//   const fetchAllUserData = async () => {
//     try {
//       setLoadingUsers(true);
//       const res = await fetch(`${API_URL}/user`, {
//         method: "GET",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data?.success) setUsers(data.data || []);
//       else toast.error(data?.message || "Failed to fetch users");
//     } catch {
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   /* ==========================
//        FETCH TRADES
//     ========================== */
//   const fetchAllTradeData = async () => {
//     try {
//       setLoadingTrade(true);
//       const res = await fetch(`${API_URL}/trade`, {
//         method: "GET",
//         credentials: "include",
//       });
//       const data = await res.json();

//       if (data?.success) setAllTrade(Array.isArray(data.data) ? data.data : []);
//       else toast.error(data?.message || "Failed to fetch trades");
//     } catch {
//       toast.error("Failed to fetch trades");
//     } finally {
//       setLoadingTrade(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllUserData();
//     fetchAllTradeData();
//   }, []);

//   /* ==========================
//        RESET FORM
//     ========================== */
//   const resetForm = () => {
//     setFormData({
//       user_id: "",
//       order_date: "",
//       currency_pair: "",
//       quantity: 1,
//       order_price: "",
//       type: "buy",
//     });
//     setIsEditMode(false);
//     setEditingTradeId(null);
//   };

//   /* ==========================
//        CREATE OR UPDATE (open trade)
//     ========================== */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.user_id ||
//       !formData.order_date ||
//       !formData.currency_pair ||
//       !formData.quantity ||
//       !formData.order_price ||
//       !formData.type
//     ) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const url = isEditMode
//         ? `${API_URL}/trade/${editingTradeId}/update`
//         : `${API_URL}/trade`;

//       const method = isEditMode ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: Number(formData.user_id),
//           order_date: formData.order_date,
//           currency_pair: formData.currency_pair,
//           quantity: Number(formData.quantity),
//           order_price: formData.order_price,
//           type: formData.type,
//         }),
//       });

//       const data = await res.json();

//       if (data?.success) {
//         toast.success(isEditMode ? "Trade updated ✅" : "Trade created ✅");
//         resetForm();
//         fetchAllTradeData();
//         setSwitchTab(true);
//       } else {
//         toast.error(data?.message || "Something went wrong");
//       }
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   /* ==========================
//        UPDATE (open trade)
//     ========================== */
//   const handleOpenUpdate = (trade) => {
//     setSwitchTab(false);
//     setIsEditMode(true);
//     setEditingTradeId(trade.id);

//     setFormData({
//       user_id: trade.user_id || "",
//       order_date: trade.order_date ? trade.order_date.split("T")[0] : "",
//       currency_pair: trade.currency_pair || "",
//       quantity: trade.quantity || 1,
//       order_price: trade.order_price || "",
//       type: trade.type || "buy",
//     });
//   };

//   /* ==========================
//        OPEN COMPLETE MODAL
//     ========================== */
//   const handleOpenCompleteModal = (trade) => {
//     setCompletingTrade(trade);

//     setCompleteForm({
//       user_id: trade.user_id || "",
//       order_date: trade.order_date ? trade.order_date.split("T")[0] : "",
//       currency_pair: trade.currency_pair || "",
//       quantity: trade.quantity || 1,
//       order_price: trade.order_price || "",
//       type: trade.type || "buy",
//       buy_price: trade.buy_price || "",
//       sell_price: trade.sell_price || "",
//       profit: trade.profit || "",
//       profit_type: trade.result_type || "profit", // ✅ NEW
//     });

//     setShowCompleteModal(true);
//   };

//   const closeCompleteModal = () => {
//     setShowCompleteModal(false);
//     setCompletingTrade(null);
//   };

//   /* ==========================
//        SUBMIT COMPLETE
//     ========================== */
//   const handleCompleteSubmit = async (e) => {
//     e.preventDefault();

//     if (!completingTrade?.id) return toast.error("Trade id missing");

//     if (
//       !completeForm.user_id ||
//       !completeForm.order_date ||
//       !completeForm.currency_pair ||
//       !completeForm.quantity ||
//       completeForm.buy_price === "" ||
//       completeForm.sell_price === "" ||
//       !completeForm.order_price ||
//       !completeForm.type ||
//       completeForm.profit === ""
//     ) {
//       toast.error("All fields are required in complete trade");
//       return;
//     }

//     if (!["profit", "loss"].includes(completeForm.profit_type)) {
//       toast.error("Please select Profit or Loss");
//       return;
//     }


//     try {
//       setCompleteLoading(true);

//       const res = await fetch(`${API_URL}/trade/${completingTrade.id}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: Number(completeForm.user_id),
//           order_date: completeForm.order_date,
//           currency_pair: completeForm.currency_pair,
//           quantity: Number(completeForm.quantity),
//           buy_price: Number(completeForm.buy_price),
//           sell_price: Number(completeForm.sell_price),
//           order_price: completeForm.order_price,
//           type: completeForm.type,
//           profit: Number(completeForm.profit),
//           profit_type: completeForm.profit_type, // ✅ NEW
//         }),

//       });

//       const data = await res.json();

//       if (data?.success) {
//         toast.success("Trade completed ✅");
//         closeCompleteModal();
//         fetchAllTradeData();
//       } else toast.error(data?.message || "Failed to complete trade");
//     } catch {
//       toast.error("Failed to complete trade");
//     } finally {
//       setCompleteLoading(false);
//     }
//   };

//   /* ==========================
//        DELETE TRADE
//     ========================== */
//   const handleDeleteTrade = async (tradeId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`${API_URL}/trade/${tradeId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (data?.success) {
//         toast.success("Trade deleted ✅");
//         fetchAllTradeData();
//       } else toast.error(data?.message || "Delete failed");
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   /* ==========================
//        DETAILS MODAL
//     ========================== */
//   const openDetailsModal = (trade) => {
//     setDetailsTrade(trade);
//     setShowDetailsModal(true);
//   };

//   const closeDetailsModal = () => {
//     setDetailsTrade(null);
//     setShowDetailsModal(false);
//   };

//   /* ==========================
//        FULL UPDATE MODAL (open+close)
//     ========================== */
//   const openFullUpdateModal = (trade) => {
//     setEditingTradeId(trade.id);

//     setFullUpdateForm({
//       user_id: trade.user_id || "",
//       order_date: trade.order_date ? trade.order_date.split("T")[0] : "",
//       currency_pair: trade.currency_pair || "",
//       quantity: trade.quantity || 1,
//       order_price: trade.order_price || "",
//       type: trade.type || "buy",
//       status: trade.status || "open",
//       buy_price: trade.buy_price || "",
//       sell_price: trade.sell_price || "",
//       profit: trade.profit || "",
//     });

//     setShowFullUpdateModal(true);
//   };

//   const closeFullUpdateModal = () => {
//     setShowFullUpdateModal(false);
//     setEditingTradeId(null);
//   };

//   const handleFullUpdateSubmit = async (e) => {
//     e.preventDefault();

//     if (!editingTradeId) return toast.error("Trade id missing");

//     if (
//       !fullUpdateForm.user_id ||
//       !fullUpdateForm.order_date ||
//       !fullUpdateForm.currency_pair ||
//       !fullUpdateForm.quantity ||
//       !fullUpdateForm.order_price ||
//       !fullUpdateForm.type ||
//       !fullUpdateForm.status
//     ) {
//       toast.error("All fields are required");
//       return;
//     }

//     // ✅ if status close => need buy/sell/profit
//     if (fullUpdateForm.status === "close") {
//       if (
//         fullUpdateForm.buy_price === "" ||
//         fullUpdateForm.sell_price === "" ||
//         fullUpdateForm.profit === ""
//       ) {
//         toast.error("Buy price, sell price and profit are required for close");
//         return;
//       }
//     }

//     try {
//       setFullUpdateLoading(true);

//       const res = await fetch(
//         `${API_URL}/trade/${editingTradeId}/full-update`,
//         {
//           method: "PUT",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             user_id: Number(fullUpdateForm.user_id),
//             order_date: fullUpdateForm.order_date,
//             currency_pair: fullUpdateForm.currency_pair,
//             quantity: Number(fullUpdateForm.quantity),
//             order_price: fullUpdateForm.order_price,
//             buy_price:
//               fullUpdateForm.status === "close"
//                 ? Number(fullUpdateForm.buy_price)
//                 : null,
//             sell_price:
//               fullUpdateForm.status === "close"
//                 ? Number(fullUpdateForm.sell_price)
//                 : null,
//             profit:
//               fullUpdateForm.status === "close"
//                 ? Number(fullUpdateForm.profit)
//                 : null,
//             type: fullUpdateForm.type,
//             status: fullUpdateForm.status,
//           }),
//         },
//       );

//       const data = await res.json();

//       if (data?.success) {
//         toast.success("Trade updated ✅");
//         closeFullUpdateModal();
//         fetchAllTradeData();
//       } else toast.error(data?.message || "Failed to update trade");
//     } catch {
//       toast.error("Failed to update trade");
//     } finally {
//       setFullUpdateLoading(false);
//     }
//   };

//   /* ==========================
//        USER NAME MAP
//     ========================== */
//   const userMap = useMemo(() => {
//     const map = {};
//     users.forEach((u) => (map[u.id] = u));
//     return map;
//   }, [users]);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* ✅ Sidebar (handles header + hamburger internally) */}
//       <AdminSidebar />

//       {/* Main content */}
//       <div className="flex-1 px-4 py-4">
//         <div className="max-w-6xl mx-auto">

//           <div className="flex gap-2 bg-gray-200 p-2 rounded-lg mb-4">
//             <button
//               className={`flex-1 p-2 rounded-md font-medium ${!switchTab ? "bg-black text-white" : "bg-white"
//                 }`}
//               onClick={() => setSwitchTab(false)}
//             >
//               Form
//             </button>

//             <button
//               className={`flex-1 p-2 rounded-md font-medium ${switchTab ? "bg-black text-white" : "bg-white"
//                 }`}
//               onClick={() => {
//                 setSwitchTab(true);
//                 resetForm();
//               }}
//             >
//               Table
//             </button>
//           </div>

//           {/* FORM */}
//           {!switchTab ? (
//             <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-bold">
//                   {isEditMode ? "Update Trade" : "Add Trade"}
//                 </h2>

//                 {isEditMode && (
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="px-3 py-1 bg-gray-200 rounded"
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* USER */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Select User
//                   </label>
//                   <select
//                     name="user_id"
//                     value={formData.user_id}
//                     onChange={handleChange}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                     disabled={loadingUsers}
//                   >
//                     <option value="">Select User</option>
//                     {users?.map((item) => (
//                       <option key={item.id} value={item.id}>
//                         {item.name} ({item.email})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* ORDER DATE */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Order Date
//                   </label>
//                   <input
//                     name="order_date"
//                     type="date"
//                     value={formData.order_date}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 {/* CURRENCY */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Currency Pair
//                   </label>
//                   <input
//                     name="currency_pair"
//                     type="text"
//                     value={formData.currency_pair}
//                     onChange={handleChange}
//                     placeholder="DKK-HKD"
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 {/* Quantity */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Quantity
//                   </label>
//                   <input
//                     name="quantity"
//                     type="number"
//                     min={1}
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 {/* Order price */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Order Price
//                   </label>
//                   <input
//                     name="order_price"
//                     type="text"
//                     value={formData.order_price}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>

//                 {/* type */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Type</label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   >
//                     <option value="buy">BUY</option>
//                     <option value="sell">SELL</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
//                 >
//                   {submitting ? "Saving..." : isEditMode ? "Update" : "Submit"}
//                 </button>
//               </form>
//             </div>
//           ) : (
//             <div className="bg-white p-4 rounded-lg shadow">
//               {/* TABLE */}
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-lg font-bold">All Trades</h2>
//                 <button
//                   onClick={fetchAllTradeData}
//                   className="px-3 py-2 bg-black text-white rounded-md text-sm"
//                 >
//                   Refresh
//                 </button>
//               </div>

//               {loadingTrade ? (
//                 <p className="text-gray-500">Loading trades...</p>
//               ) : allTrade.length === 0 ? (
//                 <p className="text-gray-500">No trades found</p>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[1100px] border">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="border p-2 text-left">Details</th>
//                         <th className="border p-2 text-left">User</th>
//                         <th className="border p-2 text-left">Order Date</th>
//                         <th className="border p-2 text-left">Currency</th>
//                         <th className="border p-2 text-left">Qty</th>
//                         <th className="border p-2 text-left">Order Price</th>
//                         <th className="border p-2 text-left">Status</th>
//                         <th className="border p-2 text-left">Type</th>
//                         <th className="border p-2 text-left">Profit</th>
//                         <th className="border p-2 text-left">Actions</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {allTrade.map((item) => (
//                         <tr key={item.id} className="hover:bg-gray-50">
//                           <td className="border p-2">
//                             <button
//                               onClick={() => openDetailsModal(item)}
//                               className="text-blue-600 hover:text-blue-800"
//                               title="View Details"
//                             >
//                               <FaInfoCircle />
//                             </button>
//                           </td>

//                           <td className="border p-2">
//                             {userMap[item.user_id]?.name || item.user_id}
//                           </td>

//                           <td className="border p-2">
//                             {item.order_date?.split("T")[0] || item.order_date}
//                           </td>

//                           <td className="border p-2">{item.currency_pair}</td>
//                           <td className="border p-2">{item.quantity}</td>
//                           <td className="border p-2">{item.order_price}</td>

//                           <td className="border p-2">
//                             <span
//                               className={`px-2 py-1 rounded text-xs font-medium ${item.status === "open"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-green-100 text-green-800"
//                                 }`}
//                             >
//                               {item.status}
//                             </span>
//                           </td>

//                           <td className="border p-2">{item.type}</td>
//                           <td className="border p-2">
//                             {item.profit_loss ? (
//                               <span
//                                 className={`px-2 py-1 rounded text-xs font-semibold ${item.result_type === "profit"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-red-100 text-red-800"
//                                   }`}
//                               >
//                                 {item.result_type?.toUpperCase()} ₹{item.profit_loss}
//                               </span>
//                             ) : (
//                               "-"
//                             )}
//                           </td>


//                           <td className="border p-2">
//                             <div className="flex flex-wrap gap-2">
//                               {/* ✅ FULL UPDATE (works open/close both) */}
//                               {item.status === "open" && (
//                                 <button
//                                   onClick={() => openFullUpdateModal(item)}
//                                   className="px-3 py-1 bg-indigo-600 text-white rounded text-sm flex items-center gap-1"
//                                 >
//                                   <FaEdit /> Edit
//                                 </button>
//                               )}


//                               <button
//                                 onClick={() => handleDeleteTrade(item.id)}
//                                 className="px-3 py-1 bg-red-600 text-white rounded text-sm"
//                               >
//                                 Delete
//                               </button>

//                               {item.status === "open" ? (
//                                 <button
//                                   onClick={() => handleOpenCompleteModal(item)}
//                                   className="px-3 py-1 bg-green-600 text-white rounded text-sm"
//                                 >
//                                   Complete
//                                 </button>
//                               ) : (
//                                 <button
//                                   disabled
//                                   className="px-3 py-1 bg-gray-400 text-white rounded text-sm cursor-not-allowed"
//                                 >
//                                   Closed
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ✅ COMPLETE MODAL */}
//           {showCompleteModal && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
//               <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-bold text-lg">Complete Trade</h3>
//                   <button
//                     onClick={closeCompleteModal}
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <form onSubmit={handleCompleteSubmit} className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Buy Price</label>
//                     <input
//                       name="buy_price"
//                       type="number"
//                       step="0.000001"
//                       value={completeForm.buy_price}
//                       onChange={handleCompleteChange}
//                       className="w-full border rounded px-3 py-2"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Sell Price</label>
//                     <input
//                       name="sell_price"
//                       type="number"
//                       step="0.000001"
//                       value={completeForm.sell_price}
//                       onChange={handleCompleteChange}
//                       className="w-full border rounded px-3 py-2"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Result Type</label>
//                     <select
//                       name="profit_type"
//                       value={completeForm.profit_type}
//                       onChange={handleCompleteChange}
//                       className="w-full border rounded px-3 py-2"
//                       required
//                     >
//                       <option value="profit">Profit</option>
//                       <option value="loss">Loss</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Profit / Loss Amount
//                     </label>
//                     <input
//                       name="profit"
//                       type="number"
//                       step="0.01"
//                       value={completeForm.profit}
//                       onChange={handleCompleteChange}
//                       className="w-full border rounded px-3 py-2"
//                       required
//                     />
//                   </div>


//                   <button
//                     type="submit"
//                     disabled={completeLoading}
//                     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                   >
//                     {completeLoading ? "Completing..." : "Complete Trade"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* ✅ DETAILS MODAL */}
//           {showDetailsModal && detailsTrade && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
//               <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-bold text-lg">Trade Details</h3>
//                   <button
//                     onClick={closeDetailsModal}
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <div className="space-y-2 text-sm">
//                   <p>
//                     <b>User:</b>{" "}
//                     {userMap[detailsTrade.user_id]?.name || detailsTrade.user_id}
//                   </p>
//                   <p>
//                     <b>Order Date:</b> {detailsTrade.order_date?.split("T")[0]}
//                   </p>
//                   <p>
//                     <b>Currency Pair:</b> {detailsTrade.currency_pair}
//                   </p>
//                   <p>
//                     <b>Quantity:</b> {detailsTrade.quantity}
//                   </p>
//                   <p>
//                     <b>Order Price:</b> {detailsTrade.order_price}
//                   </p>
//                   <p>
//                     <b>Status:</b> {detailsTrade.status}
//                   </p>
//                   <p>
//                     <b>Type:</b> {detailsTrade.type}
//                   </p>

//                   <p>
//                     <b>Buy Price:</b> {detailsTrade.buy_price || "-"}
//                   </p>
//                   <p>
//                     <b>Sell Price:</b> {detailsTrade.sell_price || "-"}
//                   </p>
//                   <p>
//                     <b>Profit:</b> {detailsTrade.profit || "-"}
//                   </p>

//                   <p>
//                     <b>Created At:</b> {formatDateTime(detailsTrade.created_at)}
//                   </p>
//                   <p>
//                     <b>Updated At:</b> {formatDateTime(detailsTrade.updated_at)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ✅ FULL UPDATE MODAL */}
//           {showFullUpdateModal && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
//               <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-bold text-lg">Edit Trade</h3>
//                   <button
//                     onClick={closeFullUpdateModal}
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <form onSubmit={handleFullUpdateSubmit} className="space-y-3">
//                   {/* Status */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Status
//                     </label>
//                     <select
//                       name="status"
//                       value={fullUpdateForm.status}
//                       onChange={handleFullUpdateChange}
//                       className="w-full border rounded px-3 py-2"
//                     >
//                       <option value="open">OPEN</option>
//                       <option value="close">CLOSE</option>
//                     </select>
//                   </div>

//                   {/* Buy/Sell/Profit only when close */}
//                   {fullUpdateForm.status === "close" && (
//                     <>
//                       <div>
//                         <label className="block text-sm font-medium mb-1">
//                           Buy Price
//                         </label>
//                         <input
//                           name="buy_price"
//                           type="number"
//                           step="0.000001"
//                           value={fullUpdateForm.buy_price}
//                           onChange={handleFullUpdateChange}
//                           className="w-full border rounded px-3 py-2"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-1">
//                           Sell Price
//                         </label>
//                         <input
//                           name="sell_price"
//                           type="number"
//                           step="0.000001"
//                           value={fullUpdateForm.sell_price}
//                           onChange={handleFullUpdateChange}
//                           className="w-full border rounded px-3 py-2"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-1">
//                           Profit
//                         </label>
//                         <input
//                           name="profit"
//                           type="number"
//                           step="0.01"
//                           value={fullUpdateForm.profit}
//                           onChange={handleFullUpdateChange}
//                           className="w-full border rounded px-3 py-2"
//                           required
//                         />
//                       </div>
//                     </>
//                   )}

//                   <button
//                     disabled={fullUpdateLoading}
//                     className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//                   >
//                     {fullUpdateLoading ? "Updating..." : "Update Trade"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>

//   );
// };

// export default AddTrade;




import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const AddTrade = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [users, setUsers] = useState([]);
  const [allTrade, setAllTrade] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTrade, setLoadingTrade] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [switchTab, setSwitchTab] = useState(false);

  // ✅ Create / Update mode (OPEN EDIT)
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTradeId, setEditingTradeId] = useState(null);

  // ✅ Complete Modal
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completingTrade, setCompletingTrade] = useState(null);
  const [completeLoading, setCompleteLoading] = useState(false);

  // ✅ Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsTrade, setDetailsTrade] = useState(null);

  // ✅ Close Edit Modal (for closed trades)
  const [showCloseEditModal, setShowCloseEditModal] = useState(false);
  const [closeEditLoading, setCloseEditLoading] = useState(false);

  // ✅ Form for Create/Update (open trade)
  const [formData, setFormData] = useState({
    user_id: "",
    order_date: "",
    currency_pair: "",
    quantity: 1,
    order_price: "",
    type: "buy",
  });

  // ✅ Complete form (manual profit/loss)
  const [completeForm, setCompleteForm] = useState({
    user_id: "",
    order_date: "",
    currency_pair: "",
    quantity: 1,
    order_price: "",
    type: "buy",
    buy_price: "",
    sell_price: "",
    profit: "",
    profit_type: "profit", // ✅ profit or loss
  });

  // ✅ Close Edit Form
  const [closeEditForm, setCloseEditForm] = useState({
    id: "",
    user_id: "",
    buy_price: "",
    sell_price: "",
    profit_loss: "",
    result_type: "profit",
  });

  /* ==========================
       DATE FORMATTER
       dd/mm/yyyy hh:mm AM/PM
    ========================== */
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-";

    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* ==========================
       HANDLE CHANGE (CREATE/UPDATE)
    ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ==========================
       HANDLE CHANGE (COMPLETE)
    ========================== */
  const handleCompleteChange = (e) => {
    const { name, value } = e.target;
    setCompleteForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ==========================
       HANDLE CHANGE (CLOSE EDIT)
    ========================== */
  const handleCloseEditChange = (e) => {
    const { name, value } = e.target;
    setCloseEditForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ==========================
       FETCH USERS
    ========================== */
  const fetchAllUserData = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch(`${API_URL}/user`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data?.success) setUsers(data.data || []);
      else toast.error(data?.message || "Failed to fetch users");
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  /* ==========================
       FETCH TRADES
    ========================== */
  const fetchAllTradeData = async () => {
    try {
      setLoadingTrade(true);
      const res = await fetch(`${API_URL}/trade`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (data?.success) setAllTrade(Array.isArray(data.data) ? data.data : []);
      else toast.error(data?.message || "Failed to fetch trades");
    } catch {
      toast.error("Failed to fetch trades");
    } finally {
      setLoadingTrade(false);
    }
  };

  useEffect(() => {
    fetchAllUserData();
    fetchAllTradeData();
  }, []);

  /* ==========================
       RESET FORM
    ========================== */
  const resetForm = () => {
    setFormData({
      user_id: "",
      order_date: "",
      currency_pair: "",
      quantity: 1,
      order_price: "",
      type: "buy",
    });
    setIsEditMode(false);
    setEditingTradeId(null);
  };

  /* ==========================
       CREATE OR UPDATE (open trade)
    ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.user_id ||
      !formData.order_date ||
      !formData.currency_pair ||
      !formData.quantity ||
      !formData.order_price ||
      !formData.type
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setSubmitting(true);

      const url = isEditMode
        ? `${API_URL}/trade/${editingTradeId}/update`
        : `${API_URL}/trade`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(formData.user_id),
          order_date: formData.order_date,
          currency_pair: formData.currency_pair,
          quantity: Number(formData.quantity),
          order_price: formData.order_price,
          type: formData.type,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        toast.success(isEditMode ? "Open trade updated ✅" : "Trade created ✅");
        resetForm();
        fetchAllTradeData();
        setSwitchTab(true);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  /* ==========================
       EDIT OPEN TRADE
    ========================== */
  const handleOpenUpdate = (trade) => {
    setSwitchTab(false);
    setIsEditMode(true);
    setEditingTradeId(trade.id);

    setFormData({
      user_id: trade.user_id || "",
      order_date: trade.order_date ? trade.order_date.split("T")[0] : "",
      currency_pair: trade.currency_pair || "",
      quantity: trade.quantity || 1,
      order_price: trade.order_price || "",
      type: trade.type || "buy",
    });
  };

  /* ==========================
       OPEN COMPLETE MODAL
    ========================== */
  const handleOpenCompleteModal = (trade) => {
    setCompletingTrade(trade);

    setCompleteForm({
      user_id: trade.user_id || "",
      order_date: trade.order_date ? trade.order_date.split("T")[0] : "",
      currency_pair: trade.currency_pair || "",
      quantity: trade.quantity || 1,
      order_price: trade.order_price || "",
      type: trade.type || "buy",
      buy_price: "",
      sell_price: "",
      profit: "",
      profit_type: "profit",
    });

    setShowCompleteModal(true);
  };

  const closeCompleteModal = () => {
    setShowCompleteModal(false);
    setCompletingTrade(null);
  };

  /* ==========================
       SUBMIT COMPLETE
    ========================== */
  const handleCompleteSubmit = async (e) => {
    e.preventDefault();

    if (!completingTrade?.id) return toast.error("Trade id missing");

    if (
      completeForm.buy_price === "" ||
      completeForm.sell_price === "" ||
      completeForm.profit === ""
    ) {
      toast.error("Buy price, sell price & profit/loss amount required");
      return;
    }

    if (!["profit", "loss"].includes(completeForm.profit_type)) {
      toast.error("Please select Profit or Loss");
      return;
    }

    try {
      setCompleteLoading(true);

      const res = await fetch(`${API_URL}/trade/${completingTrade.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(completeForm.user_id),
          order_date: completeForm.order_date,
          currency_pair: completeForm.currency_pair,
          quantity: Number(completeForm.quantity),
          buy_price: Number(completeForm.buy_price),
          sell_price: Number(completeForm.sell_price),
          order_price: completeForm.order_price,
          type: completeForm.type, // ✅ BUY/SELL dropdown
          profit: Number(completeForm.profit),
          profit_type: completeForm.profit_type,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("Trade completed ✅");
        closeCompleteModal();
        fetchAllTradeData();
      } else toast.error(data?.message || "Failed to complete trade");
    } catch {
      toast.error("Failed to complete trade");
    } finally {
      setCompleteLoading(false);
    }
  };

  /* ==========================
       DELETE TRADE
    ========================== */
  const handleDeleteTrade = async (tradeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/trade/${tradeId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("Trade deleted ✅");
        fetchAllTradeData();
      } else toast.error(data?.message || "Delete failed");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ==========================
       DETAILS MODAL
    ========================== */
  const openDetailsModal = (trade) => {
    setDetailsTrade(trade);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setDetailsTrade(null);
    setShowDetailsModal(false);
  };

  /* ==========================
       OPEN CLOSE EDIT MODAL
    ========================== */
  const openCloseEditModal = (trade) => {
    setCloseEditForm({
      id: trade.id,
      user_id: trade.user_id,
      buy_price: trade.buy_price || "",
      sell_price: trade.sell_price || "",
      profit_loss: trade.profit_loss || "",
      result_type: trade.result_type || "profit",
    });

    setShowCloseEditModal(true);
  };

  const closeCloseEditModal = () => {
    setShowCloseEditModal(false);
  };

  /* ==========================
       SUBMIT CLOSE EDIT
    ========================== */
  const handleCloseEditSubmit = async (e) => {
    e.preventDefault();

    if (!closeEditForm.id) return toast.error("Trade id missing");

    if (
      closeEditForm.buy_price === "" ||
      closeEditForm.sell_price === "" ||
      closeEditForm.profit_loss === "" ||
      !closeEditForm.result_type
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setCloseEditLoading(true);

      const res = await fetch(
        `${API_URL}/trade/${closeEditForm.id}/close-edit`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: Number(closeEditForm.user_id),
            buy_price: Number(closeEditForm.buy_price),
            sell_price: Number(closeEditForm.sell_price),
            profit_loss: Number(closeEditForm.profit_loss),
            result_type: closeEditForm.result_type,
          }),
        }
      );

      const data = await res.json();

      if (data?.success) {
        toast.success("Closed trade updated ✅");
        closeCloseEditModal();
        fetchAllTradeData();
      } else {
        toast.error(data?.message || "Failed");
      }
    } catch {
      toast.error("Failed to update closed trade");
    } finally {
      setCloseEditLoading(false);
    }
  };

  /* ==========================
       USER NAME MAP
    ========================== */
  const userMap = useMemo(() => {
    const map = {};
    users.forEach((u) => (map[u.id] = u));
    return map;
  }, [users]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 bg-gray-200 p-2 rounded-lg mb-4">
            <button
              className={`flex-1 p-2 rounded-md font-medium ${!switchTab ? "bg-black text-white" : "bg-white"
                }`}
              onClick={() => setSwitchTab(false)}
            >
              Form
            </button>

            <button
              className={`flex-1 p-2 rounded-md font-medium ${switchTab ? "bg-black text-white" : "bg-white"
                }`}
              onClick={() => {
                setSwitchTab(true);
                resetForm();
              }}
            >
              Table
            </button>
          </div>

          {/* FORM */}
          {!switchTab ? (
            <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  {isEditMode ? "Update Open Trade" : "Add Trade"}
                </h2>

                {isEditMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* USER */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select User
                  </label>
                  <select
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    disabled={loadingUsers}
                  >
                    <option value="">Select User</option>
                    {users?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* ORDER DATE */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Order Date
                  </label>
                  <input
                    name="order_date"
                    type="date"
                    value={formData.order_date}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                {/* CURRENCY */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Currency Pair
                  </label>
                  <input
                    name="currency_pair"
                    type="text"
                    value={formData.currency_pair}
                    onChange={handleChange}
                    placeholder="DKK-HKD"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    min={1}
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                {/* Order price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Order Price
                  </label>
                  <input
                    name="order_price"
                    type="text"
                    value={formData.order_price}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                {/* type */}
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="buy">BUY</option>
                    <option value="sell">SELL</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                >
                  {submitting ? "Saving..." : isEditMode ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow">
              {/* TABLE */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold">All Trades</h2>
                <button
                  onClick={fetchAllTradeData}
                  className="px-3 py-2 bg-black text-white rounded-md text-sm"
                >
                  Refresh
                </button>
              </div>

              {loadingTrade ? (
                <p className="text-gray-500">Loading trades...</p>
              ) : allTrade.length === 0 ? (
                <p className="text-gray-500">No trades found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px] border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Details</th>
                        <th className="border p-2 text-left">User</th>
                        <th className="border p-2 text-left">Order Date</th>
                        <th className="border p-2 text-left">Currency</th>
                        <th className="border p-2 text-left">Qty</th>
                        <th className="border p-2 text-left">Order Price</th>
                        <th className="border p-2 text-left">Status</th>
                        <th className="border p-2 text-left">Type</th>
                        <th className="border p-2 text-left">Profit/Loss</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allTrade.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border p-2">
                            <button
                              onClick={() => openDetailsModal(item)}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Details"
                            >
                              <FaInfoCircle />
                            </button>
                          </td>

                          <td className="border p-2">
                            {userMap[item.user_id]?.name || item.user_id}
                          </td>

                          <td className="border p-2">
                            {item.order_date?.split("T")[0] || item.order_date}
                          </td>

                          <td className="border p-2">{item.currency_pair}</td>
                          <td className="border p-2">{item.quantity}</td>
                          <td className="border p-2">{item.order_price}</td>

                          <td className="border p-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${item.status === "open"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                                }`}
                            >
                              {item.status}
                            </span>
                          </td>

                          <td className="border p-2">{item.type}</td>

                          <td className="border p-2">
                            {item.profit_loss ? (
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${item.result_type === "profit"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {item.result_type?.toUpperCase()} ₹
                                {item.profit_loss}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>

                          <td className="border p-2">
                            <div className="flex flex-wrap gap-2">
                              {/* ✅ EDIT OPEN */}
                              {item.status === "open" && (
                                <button
                                  onClick={() => handleOpenUpdate(item)}
                                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm flex items-center gap-1"
                                >
                                  <FaEdit /> Edit Open
                                </button>
                              )}

                              {/* ✅ EDIT CLOSE */}
                              {item.status === "close" && (
                                <button
                                  onClick={() => openCloseEditModal(item)}
                                  className="px-3 py-1 bg-purple-600 text-white rounded text-sm flex items-center gap-1"
                                >
                                  <FaEdit /> Edit Close
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteTrade(item.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                              >
                                Delete
                              </button>

                              {item.status === "open" ? (
                                <button
                                  onClick={() => handleOpenCompleteModal(item)}
                                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                                >
                                  Complete
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="px-3 py-1 bg-gray-400 text-white rounded text-sm cursor-not-allowed"
                                >
                                  Closed
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ✅ COMPLETE MODAL */}
          {showCompleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
              <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">Complete Trade</h3>
                  <button
                    onClick={closeCompleteModal}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCompleteSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Buy Price
                    </label>
                    <input
                      name="buy_price"
                      type="number"
                      step="0.000001"
                      value={completeForm.buy_price}
                      onChange={handleCompleteChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sell Price
                    </label>
                    <input
                      name="sell_price"
                      type="number"
                      step="0.000001"
                      value={completeForm.sell_price}
                      onChange={handleCompleteChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  {/* ✅ BUY/SELL dropdown */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Trade Type
                    </label>
                    <select
                      name="type"
                      value={completeForm.type}
                      onChange={handleCompleteChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="buy">BUY</option>
                      <option value="sell">SELL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Result Type
                    </label>
                    <select
                      name="profit_type"
                      value={completeForm.profit_type}
                      onChange={handleCompleteChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="profit">Profit</option>
                      <option value="loss">Loss</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Profit / Loss Amount
                    </label>
                    <input
                      name="profit"
                      type="number"
                      step="0.01"
                      value={completeForm.profit}
                      onChange={handleCompleteChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={completeLoading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    {completeLoading ? "Completing..." : "Complete Trade"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ✅ DETAILS MODAL */}
          {showDetailsModal && detailsTrade && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
              <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">Trade Details</h3>
                  <button
                    onClick={closeDetailsModal}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <b>User:</b>{" "}
                    {userMap[detailsTrade.user_id]?.name || detailsTrade.user_id}
                  </p>
                  <p>
                    <b>Order Date:</b> {detailsTrade.order_date?.split("T")[0]}
                  </p>
                  <p>
                    <b>Currency Pair:</b> {detailsTrade.currency_pair}
                  </p>
                  <p>
                    <b>Quantity:</b> {detailsTrade.quantity}
                  </p>
                  <p>
                    <b>Order Price:</b> {detailsTrade.order_price}
                  </p>
                  <p>
                    <b>Status:</b> {detailsTrade.status}
                  </p>
                  <p>
                    <b>Type:</b> {detailsTrade.type}
                  </p>

                  <p>
                    <b>Buy Price:</b> {detailsTrade.buy_price || "-"}
                  </p>
                  <p>
                    <b>Sell Price:</b> {detailsTrade.sell_price || "-"}
                  </p>

                  {/* ✅ Profit/Loss show */}
                  <p>
                    <b>Profit/Loss:</b>{" "}
                    {detailsTrade.profit_loss ? (
                      <span
                        className={`font-semibold ${detailsTrade.result_type === "profit"
                            ? "text-green-600"
                            : "text-red-600"
                          }`}
                      >
                        {detailsTrade.result_type?.toUpperCase()} ₹
                        {detailsTrade.profit_loss}
                      </span>
                    ) : (
                      "-"
                    )}
                  </p>

                  <p>
                    <b>Created At:</b> {formatDateTime(detailsTrade.created_at)}
                  </p>
                  <p>
                    <b>Updated At:</b> {formatDateTime(detailsTrade.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ✅ CLOSE EDIT MODAL */}
          {showCloseEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
              <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">Edit Closed Trade</h3>
                  <button
                    onClick={closeCloseEditModal}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCloseEditSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Buy Price
                    </label>
                    <input
                      name="buy_price"
                      type="number"
                      step="0.000001"
                      value={closeEditForm.buy_price}
                      onChange={handleCloseEditChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sell Price
                    </label>
                    <input
                      name="sell_price"
                      type="number"
                      step="0.000001"
                      value={closeEditForm.sell_price}
                      onChange={handleCloseEditChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Result Type
                    </label>
                    <select
                      name="result_type"
                      value={closeEditForm.result_type}
                      onChange={handleCloseEditChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="profit">Profit</option>
                      <option value="loss">Loss</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Profit/Loss Amount
                    </label>
                    <input
                      name="profit_loss"
                      type="number"
                      step="0.01"
                      value={closeEditForm.profit_loss}
                      onChange={handleCloseEditChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={closeEditLoading}
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                  >
                    {closeEditLoading ? "Updating..." : "Update Closed Trade"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTrade;
