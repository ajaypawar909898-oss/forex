import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../pages/user/UserSidebar";
import UserNavbar from "../pages/user/UserNavbar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex max-h-screen bg-gray-100">
      <UserSidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <UserNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden"
        />
      )}
    </div>
  );
};

export default UserLayout;
