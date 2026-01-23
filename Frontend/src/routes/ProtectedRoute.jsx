// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   // ❌ Not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // ❌ Role not allowed
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ Authorized
//   return <Outlet />;
// };

// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return <Outlet />;
};

export default ProtectedRoute;
