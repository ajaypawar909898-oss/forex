import { Menu, Bell, Search } from "lucide-react";

const UserNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-15 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-between px-4 text-white">
      
      {/* Mobile Menu */}
      <button onClick={onMenuClick} className="lg:hidden">
        <Menu size={24} />
      </button>

      {/* Right Icons */}
      <div className="flex items-center gap-4 ml-auto">
        {/* <button className="bg-white/10 p-2 rounded-lg">
          <Search size={18} />
        </button> */}
        <button className="bg-white/10 p-2 rounded-lg">
          <Bell size={18} />
        </button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
          alt="profile"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </header>
  );
};

export default UserNavbar;
