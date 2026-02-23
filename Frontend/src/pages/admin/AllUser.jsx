import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUser, updateUser } from "../../api/bank.api";
import AdminSidebar from "./AdminSidebar";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Fetch Users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await getAllUser();

            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 🔹 Change Status
    const handleStatusChange = async (userId, value) => {
        try {
            await updateUser(userId, value);
            toast.success("Status updated");

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId
                        ? { ...user, is_approved: value }
                        : user
                )
            );
        } catch (error) {
            toast.error("Failed to update status");
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Content */}
            <div className="flex-1 w-full md:ml-64 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                    All Users
                </h2>

                {/* Loading */}
                {loading ? (
                    <div className="bg-white p-6 rounded shadow text-center">
                        Loading users...
                    </div>
                ) : (
                    <div className="bg-white shadow rounded-lg">
                        {/* Responsive table wrapper */}
                        <div className="overflow-x-auto">
                            <table className="min-w-[800px] w-full border">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="p-3 border text-sm">#</th>
                                        <th className="p-3 border text-sm">Name</th>
                                        <th className="p-3 border text-sm">Email</th>
                                        <th className="p-3 border text-sm">Mobile</th>
                                        <th className="p-3 border text-sm">Role</th>
                                        <th className="p-3 border text-sm">Verified</th>
                                        <th className="p-3 border text-sm">Status</th>
                                        <th className="p-3 border text-sm">Created</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3 border text-sm">
                                                {index + 1}
                                            </td>

                                            <td className="p-3 border text-sm">
                                                {user.name}
                                            </td>

                                            <td className="p-3 border text-sm break-all">
                                                {user.email}
                                            </td>

                                            <td className="p-3 border text-sm">
                                                {user.mobile}
                                            </td>

                                            <td className="p-3 border text-sm capitalize">
                                                {user.role}
                                            </td>

                                            <td className="p-3 border text-sm">
                                                {user.is_verified ? (
                                                    <span className="text-green-600 font-semibold">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500 font-semibold">
                                                        Not Verified
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status Dropdown */}
                                            <td className="p-3 border text-sm">
                                                <select
                                                    value={user.is_approved}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            user.id,
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    className="border rounded px-2 py-1 text-sm"
                                                >
                                                    <option value={1}>Active</option>
                                                    <option value={0}>Inactive</option>
                                                </select>
                                            </td>

                                            <td className="p-3 border text-sm">
                                                {user.created_at
                                                    ? new Date(
                                                        user.created_at
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}

                                    {users.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center p-6 text-gray-500"
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUser;