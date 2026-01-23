import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    
  });

  return {
    date: `${day}-${month}-${year}`,
    time,
  };
};

const ApproveUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/unapprove`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/approve/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Pending Users
        </h2>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600 text-left">
                <th className="p-4">Name</th>
                <th className="p-4 hidden md:table-cell">Email</th>
                <th className="p-4 hidden lg:table-cell">Mobile</th>
                <th className="p-4">Requested At</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const { date, time } = formatDateTime(u.created_at);

                return (
                  <tr
                    key={u.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {u.name}
                    </td>

                    <td className="p-4 text-gray-600 hidden md:table-cell">
                      {u.email}
                    </td>

                    <td className="p-4 text-gray-600 hidden lg:table-cell">
                      {u.mobile}
                    </td>

                    <td className="p-4 text-gray-600">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-600">{time}</span>
                        <span className="font-medium">{date}</span>
                        
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => approveUser(u.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition active:scale-95"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500"
                  >
                    No pending users to approve
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveUser;
