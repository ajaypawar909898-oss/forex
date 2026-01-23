import { Lock } from "lucide-react";

const ChangePassword = () => {
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
        <form className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block mb-2 text-gray-700">Old Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                placeholder="Old Password"
                className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-purple"
              />
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
                  type="password"
                  placeholder="New Password"
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-purple"
                />
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
                  type="password"
                  placeholder="Re-Enter New Password"
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-purple"
                />
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
