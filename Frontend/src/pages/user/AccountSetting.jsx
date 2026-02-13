// import React from "react";

// const AccountSetting = () => {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Page Title */}
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">
//         Edit Profile
//       </h2>

//       <div className="grid grid-cols-1 gap-6">
//         {/* LEFT PROFILE CARD */}
//         {/* <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-crypto-purple shadow mb-4">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="profile"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <p className="text-gray-700 font-medium">User Name:</p>
//           <p className="text-lg font-semibold text-crypto-dark-purple">
//             Amzad Amzad
//           </p>
//         </div> */}

//         {/* RIGHT FORM */}
//         <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
//           <form className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {/* First Name */}
//             <div>
//               <label className="text-sm text-gray-600">First Name</label>
//               <input
//                 type="text"
//                 value="amzad"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* Last Name */}
//             <div>
//               <label className="text-sm text-gray-600">Last Name</label>
//               <input
//                 type="text"
//                 value="amzad"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* Gender */}
//          <div>
//   <label className="text-sm text-gray-600 block">
//     Gender
//   </label>
//   <select 
//     className="w-full px-3 py-3.5 mt-2 text-sm border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//   >
//     <option value="">Select Gender</option>
//     <option value="male">Male</option>
//     <option value="female">Female</option>
//     <option value="other">Other</option>

//   </select>
// </div>

//             {/* Mobile Number */}
//             <div>
//               <label className="text-sm text-gray-600">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 value="7300883900"
//                 className="w-full mt-1 p-3 rounded-md border focus:outline-none"
//               />
//             </div>

//             {/* Aadhaar */}
//             <div>
//               <label className="text-sm text-gray-600">
//                 Aadhar Number
//               </label>
//               <input
//                 type="text"
//                 value="832404720386"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* DOB */}
//             <div>
//               <label className="text-sm text-gray-600">DOB</label>
//               <input
//                 type="date"
//                 value="2003-08-27"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="text-sm text-gray-600">Address</label>
//               <textarea
//                 rows={1}
//                 className="w-full mt-1 p-3 rounded-md border focus:outline-none"
//                 defaultValue="Madhya Pradesh, India"
//               />
//             </div>

//             {/* Bank Name */}
//             <div>
//               <label className="text-sm text-gray-600">Bank Name</label>
//               <input
//                 type="text"
//                 value="INDIAN BANK"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* Account Holder */}
//             <div>
//               <label className="text-sm text-gray-600">
//                 Account Holder Name
//               </label>
//               <input
//                 type="text"
//                 value="amzad"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* Account Number */}
//             <div>
//               <label className="text-sm text-gray-600">
//                 Account Number
//               </label>
//               <input
//                 type="text"
//                 value="8172280628"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* IFSC */}
//             <div>
//               <label className="text-sm text-gray-600">IFSC CODE</label>
//               <input
//                 type="text"
//                 value="IDIB000T081"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* PAN */}
//             <div>
//               <label className="text-sm text-gray-600">Pan Card</label>
//               <input
//                 type="text"
//                 value="DSHPA459M"
//                 className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
//                 disabled
//               />
//             </div>

//             {/* File Upload */}
//             {/* <div className="md:col-span-2">
//               <label className="text-sm text-gray-600">Upload Profile Picture</label>
//               <input
//                 type="file"
//                 className="w-full mt-1 p-3 rounded-md border bg-white focus:outline-none"
//               />
//             </div> */}

//             {/* Submit */}
//             <div className="md:col-span-2 mt-4">
//               <button
//                 type="submit"
//                 className="bg-crypto-purple hover:bg-crypto-dark-purple text-white px-8 py-3 rounded-md font-semibold transition"
//               >
//                 SUBMIT
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSetting;




import React, { useEffect, useState } from "react";
import { editUserProdile } from "../../api/bank.api";


const AccountSetting = () => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserdata(user);
  }, []);

  console.log(userdata);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await editUserProdile(userdata)
    if (res?.data?.success) {
      alert("Profile Updated Successfully")
    }
    console.log(userdata);
  }




  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Profile
      </h2>

      <div className="grid grid-cols-1 gap-6">


        {/* RIGHT FORM */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* First Name */}
            <div>
              <label className="text-sm text-gray-600">Username Name</label>
              <input
                type="text"
                value={userdata?.name}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="text-sm text-gray-600">
                Mobile Number
              </label>
              <input
                type="number"
                value={userdata?.mobile}
                className="w-full mt-1 p-3 rounded-md border focus:outline-none"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // numbers only

                  if (value.length <= 10) {
                    setUserdata((prev) => ({
                      ...prev,
                      mobile: value
                    }));
                  }
                }}

                maxLength={10}
              />
            </div>

            {/* Aadhaar */}
            <div>
              <label className="text-sm text-gray-600">
                Aadhar Number
              </label>
              <input
                type="text"
                value={userdata?.aadhaar_number}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* Bank Name */}
            <div>
              <label className="text-sm text-gray-600">Bank Branch</label>
              <input
                type="text"
                value={userdata?.bank_branch}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* Account Holder */}
            <div>
              <label className="text-sm text-gray-600">
                Account Holder Name
              </label>
              <input
                type="text"
                value={userdata?.account_holder_name}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="text-sm text-gray-600">
                Account Number
              </label>
              <input
                type="text"
                value={userdata?.bank_account_number}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* IFSC */}
            <div>
              <label className="text-sm text-gray-600">IFSC CODE</label>
              <input
                type="text"
                value={userdata?.bank_ifsc_code}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* PAN */}
            <div>
              <label className="text-sm text-gray-600">Pan Card</label>
              <input
                type="text"
                value={userdata?.pan_number}
                className="w-full mt-1 p-3 rounded-md border bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="bg-crypto-purple hover:bg-crypto-dark-purple text-white px-8 py-3 rounded-md font-semibold transition"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
