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
