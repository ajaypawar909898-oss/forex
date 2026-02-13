import db from "../utils/db.js";
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