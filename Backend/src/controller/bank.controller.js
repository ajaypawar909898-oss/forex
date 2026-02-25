import db from "../utils/db.js";

/* ======================================================
   CREATE BANK (Admin only)
====================================================== */
export const createBank = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin only",
    });
  }

  // const db = db.promise();

  try {
    const {
      acc_holder_name,
      bank_name,
      acc_number,
      ifsc_number,
      upi_id,
      upi_name,
    } = req.body;

    if (!bank_name || !acc_number || !ifsc_number || !upi_id) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const qr_image = req.files?.qr_image?.[0]?.path || null;

    if (!qr_image) {
      return res.status(400).json({
        success: false,
        message: "QR image is required",
      });
    }

    const query = `
      INSERT INTO bank_details
      (acc_holder_name, bank_name, acc_number, ifsc_number, upi_id, upi_name, qr_code, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
    `;

    const [result] = await db.execute(query, [
      acc_holder_name,
      bank_name,
      acc_number,
      ifsc_number,
      upi_id,
      upi_name,
      qr_image,
    ]);

    return res.status(201).json({
      success: true,
      message: "Bank created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Create Bank Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   GET ALL BANKS (Active only by default)
====================================================== */
export const getAllBanks = async (req, res) => {
  // const db = db.promise();

  try {
    // const { status } = req.query; // active | inactive | all

    let query = "SELECT * FROM bank_details WHERE status='active' ";
    let params = [];

    // if (status && status !== "all") {
    //   query += " WHERE status = ?";
    //   params.push(status);
    // }

    query += " ORDER BY id DESC";

    const [rows] = await db.execute(query, params);

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get Banks Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   UPDATE BANK (Admin only)
====================================================== */
export const updateBank = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin only",
    });
  }

  const { id } = req.params;
  // const db = db.promise();

  try {
    /* 1️⃣ Fetch existing data */
    const [rows] = await db.execute(
      "SELECT * FROM bank_details WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bank not found",
      });
    }

    const existing = rows[0];

    /* 2️⃣ Merge old + new data */
    const {
      acc_holder_name = existing.acc_holder_name,
      bank_name = existing.bank_name,
      acc_number = existing.acc_number,
      ifsc_number = existing.ifsc_number,
      upi_id = existing.upi_id,
      upi_name = existing.upi_name,
      status = existing.status,
    } = req.body;

    const newQrImage = req.files?.qr_image?.[0]?.path;
    const finalQrImage = newQrImage || existing.qr_code;

    /* 3️⃣ Update safely */
    const query = `
      UPDATE bank_details SET
        acc_holder_name = ?,
        bank_name = ?,
        acc_number = ?,
        ifsc_number = ?,
        upi_id = ?,
        upi_name = ?,
        status = ?,
        qr_code = ?
      WHERE id = ?
    `;

    await db.execute(query, [
      acc_holder_name,
      bank_name,
      acc_number,
      ifsc_number,
      upi_id,
      upi_name,
      status,
      finalQrImage,
      id,
    ]);

    return res.status(200).json({
      success: true,
      message: "Bank updated successfully",
    });
  } catch (error) {
    console.error("Update Bank Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

/* ======================================================
   SOFT DELETE BANK (Admin only)
   → status = inactive
====================================================== */
export const deleteBank = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin only",
    });
  }

  const { id } = req.params;
  // const db = db.promise();

  try {
    const [result] = await db.execute(
      "UPDATE bank_details SET status = 'inactive' WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Bank not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bank deactivated successfully",
    });
  } catch (error) {
    console.error("Delete Bank Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
