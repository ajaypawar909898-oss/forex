import db from "../utils/db.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  // const db = db.promise();
  const [rows] = await db.execute(
    `
      SELECT * 
        FROM users
        ORDER BY created_at DESC
        `
  );

  return res.json({
    success: true,
    data: rows,
  });
};

export const getAllUnApprovedUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  // const db = db.promise();
  const [rows] = await db.execute(
    `
      SELECT * 
        FROM users
        WHERE is_approved = 0
        ORDER BY created_at DESC
        `
  );

  return res.json({
    success: true,
    data: rows,
  });
};

export const editUserById = async (req, res) => {
  try {
    console.log("Body:", req.body);

    if (req.user.id !== req?.body?.user_id) {
      return res.status(403).json({
        success: false,
        message: "User Id Did not match With The login User Id",
      });
    }


    const { mobile, user_id } = req.body;



    // ✅ Validation
    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // ✅ 10 digit validation
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile must be exactly 10 digits",
      });
    }

    // ✅ Update query
    const [result] = await db.execute(
      `UPDATE users SET mobile = ? WHERE id = ?`,
      [mobile, user_id]
    );

    // ✅ Check if user exists
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });

  } catch (error) {
    console.error("Update Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




export const passwordChange = async (req, res) => {
  try {
    const userId = req.user.id;   // from JWT middleware
    const { oldPassword, newPassword, confirmPassword } = req.body;

    console.log("Password change request:", req.body);

    // ✅ Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    // ✅ Strong password check
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 🔍 Get current password from DB
    const [rows] = await db.execute(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const storedPassword = rows[0].password;

    // ✅ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // ❗ Prevent reusing old password
    const samePassword = await bcrypt.compare(newPassword, storedPassword);

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update password
    await db.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Password Change Error:", error);

    return res.status(500).json({
      success: false,
      message: "Password update failed",
    });
  }
};




// ✅ UPDATE USER STATUS (Active / Inactive)
export const updateUserStatus = async (req, res) => {
  try {
    // 🔒 Admin only
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    const userId = req.params.id;
    const { is_approved } = req.body;

    if (is_approved === undefined) {
      return res.status(400).json({
        success: false,
        message: "Status value required",
      });
    }

    // 🔍 Check user exists
    const [user] = await db.execute(
      "SELECT id FROM users WHERE id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update status
    await db.execute(
      "UPDATE users SET is_approved = ? WHERE id = ?",
      [is_approved, userId]
    );

    return res.status(200).json({
      success: true,
      message:
        is_approved === 1
          ? "User activated"
          : "User deactivated",
    });

  } catch (error) {
    console.error("Update Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};
