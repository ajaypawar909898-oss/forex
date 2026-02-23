// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// const AdminSidebar = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleLogout = async () => {
//     // call logout api if you have
//     navigate("/login");
//   };

//   const navLinkClasses = ({ isActive }) =>
//     `block px-4 py-3 rounded-lg transition-all duration-200 
//      ${isActive
//       ? "bg-purple-600 text-white shadow-md"
//       : "text-gray-300 hover:bg-gray-800 hover:text-purple-400"
//     }`;

//   return (
//     <>
//       {/* Mobile Header */}
//       <div className="md:hidden h-fit flex items-center justify-between bg-gray-900 text-white p-4">

//         <button onClick={() => setOpen(!open)}>
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static top-0 left-0 z-40 w-64 min-h-screen bg-gray-900 text-white p-6
//         transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <h2 className="text-xl font-bold mb-8 text-purple-400 hidden md:block">
//           Admin Panel
//         </h2>

//         <nav className="space-y-2">
//           <NavLink to="/admin/dashboard" className={navLinkClasses}>
//             Dashboard
//           </NavLink>

//           <NavLink to="/admin/approve-users" className={navLinkClasses}>
//             Pending Users
//           </NavLink>

//           <NavLink to="/admin/approve-withdrawal" className={navLinkClasses}>
//             Approve Withdrawal
//           </NavLink>

//           <NavLink to="/admin/approve-topup" className={navLinkClasses}>
//             Approve Topup
//           </NavLink>

//           <NavLink to="/admin/profit-loss" className={navLinkClasses}>
//             Add Profit / Loss
//           </NavLink>
//           <NavLink to="/admin/trade" className={navLinkClasses}>
//             Add Trade
//           </NavLink>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="mt-10 w-full bg-red-600 hover:bg-red-700 transition-colors py-3 rounded-lg font-semibold"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Overlay for mobile */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 md:hidden"
//         />
//       )}
//     </>
//   );
// };

// export default AdminSidebar;




import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  // if you have a VITE_API_BASE_URL, this will use it, otherwise it'll call the same origin
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include", // critical: sends the httpOnly cookie to server
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // show message returned by server if present
        toast.error(data.message || "Logout failed");
        setLoadingLogout(false);
        return;
      }

      // success: clear client-side auth state
      // adjust keys if your app stores different keys
      try {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

      } catch (e) {
        // ignore if localStorage unavailable
      }

      toast.success(data.message || "Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Network error while logging out");
    } finally {
      setLoadingLogout(false);
      setOpen(false);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition-all duration-200 
     ${isActive
      ? "bg-purple-600 text-white shadow-md"
      : "text-gray-300 hover:bg-gray-800 hover:text-purple-400"
    }`;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden h-fit flex items-center justify-between bg-gray-900 text-white p-4">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 w-64 min-h-screen bg-gray-900 text-white p-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-bold mb-8 text-purple-400 hidden md:block">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/approve-users" className={navLinkClasses}>
            Pending Users
          </NavLink>

          <NavLink to="/admin/approve-withdrawal" className={navLinkClasses}>
            Approve Withdrawal
          </NavLink>

          <NavLink to="/admin/approve-topup" className={navLinkClasses}>
            Approve Topup
          </NavLink>

          <NavLink to="/admin/profit-loss" className={navLinkClasses}>
            Add Profit / Loss
          </NavLink>
          <NavLink to="/admin/trade" className={navLinkClasses}>
            Add Trade
          </NavLink>
          <NavLink to="/admin/bankDetail" className={navLinkClasses}>
            Bank Detail
          </NavLink>
          <NavLink to="/admin/all-user" className={navLinkClasses}>
            All Users
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          disabled={loadingLogout}
          className={`mt-10 w-full transition-colors py-3 rounded-lg font-semibold ${loadingLogout ? "bg-red-400 cursor-wait" : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {loadingLogout ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default AdminSidebar;
