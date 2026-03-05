import { Lock } from "lucide-react";
import { editUserPassword } from "../../api/bank.api";
import { useState } from "react";
import { toast } from "react-toastify";
const ChangePassword = () => {


  const [formdata, setFormdata] = useState({
    confirmPassword: "",
    newPassword: "",
    oldPassword: ""
  })

  const [oldPassword, setOldPassword] = useState(false)
  const [newPassword, setNewPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!formdata.oldPassword || !formdata.newPassword || !formdata.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (formdata.newPassword !== formdata.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const res = await editUserPassword(formdata);

      if (res?.data?.success) {
        toast.success(res.data.message);

        // clear form after success
        setFormdata({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });

      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  const onHnadleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Change Password
      </h2>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-6 mx-auto max-w-6xl">
        <h3 className="text-lg font-semibold mb-6">Change Password</h3>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleChangePassword}>
          {/* Old Password */}
          <div>
            <label className="block mb-2 text-gray-700">Old Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={oldPassword ? "text" : "password"}
                placeholder="Old Password"
                onChange={onHnadleChange}
                name="oldPassword"
                value={formdata?.oldPassword}
                className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-purple"
              />
              <span onClick={(() => setOldPassword((prev) => !prev))}>{oldPassword ? "Hide" : "Show"}</span>
            </div>
          </div>

          {/* New Password & Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div>
              <label className="block mb-2 text-gray-700">New Password</label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={newPassword ? "text" : "password"}
                  placeholder="New Password"
                  onChange={onHnadleChange}
                  name="newPassword"
                  value={formdata?.newPassword}

                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-purple"
                />
                <span onClick={(() => setNewPassword((prev) => !prev))}>{newPassword ? "Hide" : "Show"}</span>

              </div>
            </div>

            {/* Re-enter Password */}
            <div>
              <label className="block mb-2 text-gray-700">
                Re-enter New Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={confirmPassword ? "text" : "password"}
                  placeholder="Re-Enter New Password"
                  onChange={onHnadleChange}
                  name="confirmPassword"
                  value={formdata?.confirmPassword}
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-purple"
                />
                <span onClick={(() => setConfirmPassword((prev) => !prev))}>{confirmPassword ? "Hide" : "Show"}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-crypto-purple hover:bg-crypto-dark-purple text-white font-semibold px-8 py-3 rounded-md transition"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
