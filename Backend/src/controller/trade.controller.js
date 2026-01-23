// import db from "../utils/db.js";

// export const tradeCreate = async (req, res) => {

//     if (req.user.role !== "admin") {
//         return res.status(403).json({
//             success: false,
//             message: "Admin only",
//         });
//     }
//     // const db = db.promise();

//     try {
//         const { order_date, currency_pair, quantity, order_price, user_id, type } =
//             req.body;

//         if (!order_date || !currency_pair || !quantity || !order_price || !user_id || !type) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         if (!["buy", "sell"].includes(type)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Type must be 'buy' or 'sell'",
//             });
//         }

//         const insertQuery = `
//       INSERT INTO orders
//       (order_date, currency_pair, quantity, order_price, status, isdelete, user_id, type)
//       VALUES (?, ?, ?, ?, 'open', 'active', ?, ?)
//     `;

//         const [result] = await db.execute(insertQuery, [
//             order_date,
//             currency_pair,
//             quantity,
//             order_price,
//             user_id,
//             type,
//         ]);

//         return res.status(201).json({
//             success: true,
//             message: "Trade created successfully",
//             orderId: result.insertId,
//         });
//     } catch (error) {
//         console.log("Trade Create Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

// export const completeTrade = async (req, res) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({
//             success: false,
//             message: "Admin only",
//         });
//     }

//     try {
//         const { id } = req.params;

//         const {
//             user_id,
//             order_date,
//             currency_pair,
//             quantity,
//             buy_price,
//             sell_price,
//             order_price,
//             type,
//             profit,
//             profit_type, // ✅ NEW
//         } = req.body;

//         if (!id || isNaN(Number(id))) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Valid trade id is required",
//             });
//         }

//         if (
//             !user_id ||
//             !order_date ||
//             !currency_pair ||
//             !quantity ||
//             buy_price === undefined ||
//             sell_price === undefined ||
//             !order_price ||
//             !type ||
//             profit === undefined ||
//             !profit_type
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         if (!["buy", "sell"].includes(type)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Type must be 'buy' or 'sell'",
//             });
//         }

//         if (!["profit", "loss"].includes(profit_type)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "profit_type must be 'profit' or 'loss'",
//             });
//         }

//         // ✅ check trade exists and open only
//         const [checkRows] = await db.execute(
//             `SELECT id, status FROM orders WHERE id = ? AND isdelete = 'active'`,
//             [id]
//         );

//         if (checkRows.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Trade not found",
//             });
//         }

//         if (checkRows[0].status === "close") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Trade already closed",
//             });
//         }

//         // ✅ Update trade
//         const updateTradeQuery = `
//       UPDATE orders
//       SET 
//         user_id = ?,
//         order_date = ?,
//         currency_pair = ?,
//         quantity = ?,
//         buy_price = ?,
//         sell_price = ?,
//         order_price = ?,
//         status='close',
//         type = ?,
//         profit_loss = ?,
//         result_type = ?,
//         updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//         await db.execute(updateTradeQuery, [
//             Number(user_id),
//             order_date,
//             currency_pair,
//             Number(quantity),
//             Number(buy_price),
//             Number(sell_price),
//             order_price,
//             type,
//             Number(profit),
//             profit_type,
//             Number(id),
//         ]);

//         // ✅ Insert wallet transaction (profit/loss)
//         await db.execute(
//             `
//       INSERT INTO user_wallet_transactions
//       (user_id, amount, transaction_type, status, admin_remark, approved_by, approved_at)
//       VALUES (?, ?, ?, 'approved', ?, ?, NOW())
//       `,
//             [
//                 Number(user_id),
//                 Number(profit),
//                 profit_type, // profit OR loss
//                 `Trade Completed: Order #${id}`,
//                 req.user.id,
//             ]
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Trade completed successfully ✅",
//         });
//     } catch (error) {
//         console.log("Complete Trade Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

// export const deleteTrade = async (req, res) => {
//     if (req?.user?.role !== "admin") {
//         return res.status(403).json({
//             success: false,
//             message: "Admin only",
//         });
//     }

//     // const db = db.promise();

//     try {
//         const { id } = req.params;

//         if (!id || isNaN(Number(id))) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Valid trade id is required",
//             });
//         }

//         // ✅ check trade exists
//         const [checkRows] = await db.execute(
//             `SELECT id FROM orders WHERE id = ? AND isdelete = 'active'`,
//             [id]
//         );

//         if (checkRows.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Trade not found",
//             });
//         }

//         const updateQuery = `
//       UPDATE orders
//       SET isdelete = 'inactive',
//           updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//         await db.execute(updateQuery, [id]);

//         return res.status(200).json({
//             success: true,
//             message: "Trade deleted successfully",
//         });
//     } catch (error) {
//         console.log("Delete Trade Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

// export const updateTrade = async (req, res) => {
//     // ✅ Admin Only
//     if (req?.user?.role !== "admin") {
//         return res.status(403).json({
//             success: false,
//             message: "Admin only",
//         });
//     }

//     const { id } = req.params;
//     // const db = db.promise();

//     try {
//         const { order_date, currency_pair, quantity, order_price, user_id, type } =
//             req.body;

//         // ✅ Validate ID
//         if (!id || isNaN(Number(id))) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Valid trade id is required",
//             });
//         }

//         // ✅ Validate required fields
//         if (
//             !order_date ||
//             !currency_pair ||
//             quantity === undefined ||
//             !order_price ||
//             !user_id ||
//             !type
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         // ✅ Validate type
//         if (!["buy", "sell"].includes(type)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Type must be 'buy' or 'sell'",
//             });
//         }

//         // ✅ Check trade exists
//         const [checkRows] = await db.execute(
//             `SELECT id FROM orders WHERE id = ? AND isdelete = 'active'`,
//             [id]
//         );

//         if (checkRows.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Trade not found",
//             });
//         }

//         // ✅ Update query
//         const updateQuery = `
//       UPDATE orders
//       SET
//         user_id = ?,
//         order_date = ?,
//         currency_pair = ?,
//         quantity = ?,
//         order_price = ?,
//         type = ?,
//         updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//         const [result] = await db.execute(updateQuery, [
//             user_id,
//             order_date,
//             currency_pair,
//             quantity,
//             order_price,
//             type,
//             id,
//         ]);

//         return res.status(200).json({
//             success: true,
//             message: "Trade updated successfully",
//         });
//     } catch (error) {
//         console.log("Update Trade Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

// export const tradeGetAll = async (req, res) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({
//             success: false,
//             message: "Admin only",
//         });
//     }

//     // const db = db.promise();

//     try {
//         const selectQuery = `SELECT * FROM orders WHERE isdelete='active'`;
//         const [rows] = await db.execute(selectQuery);

//         return res.status(200).json({
//             success: true,
//             message: "fetch successfully",
//             count: rows.length,
//             data: rows, // ✅ FIXED
//         });
//     } catch (error) {
//         console.log("Trade GetAll Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

// export const getTradeByUser = async (req, res) => {
//     const userId = req?.user?.id;


//     console.log(userId);


//     if (!userId) {
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized",
//         });
//     }

//     // const db = db.promise();

//     try {
//         const selectQuery = `
//       SELECT *
//       FROM orders
//       WHERE user_id = ?
//         AND isdelete = 'active'
//       ORDER BY created_at DESC
//     `;

//         const [rows] = await db.execute(selectQuery, [userId]);

//         return res.status(200).json({
//             success: true,
//             message: "Fetched successfully",
//             count: rows.length,
//             data: rows,
//         });
//     } catch (error) {
//         console.log("Get Trade By User Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

// export const updateTradeFull = async (req, res) => {
//     if (req?.user?.role !== "admin") {
//         return res.status(403).json({
//             success: false,
//             message: "Admin only",
//         });
//     }

//     // const db = db.promise();

//     try {
//         const { id } = req.params;

//         const {
//             user_id,
//             order_date,
//             currency_pair,
//             quantity,
//             order_price,
//             buy_price,
//             sell_price,
//             profit,
//             type,
//             status,
//         } = req.body;

//         if (!id || isNaN(Number(id))) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Valid trade id is required",
//             });
//         }

//         if (
//             !user_id ||
//             !order_date ||
//             !currency_pair ||
//             quantity === undefined ||
//             !order_price ||
//             !type ||
//             !status
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All required fields are missing",
//             });
//         }

//         if (!["buy", "sell"].includes(type)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Type must be 'buy' or 'sell'",
//             });
//         }

//         if (!["open", "close"].includes(status)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Status must be 'open' or 'close'",
//             });
//         }

//         // ✅ if close then buy/sell/profit required
//         if (status === "close") {
//             if (
//                 buy_price === undefined ||
//                 sell_price === undefined ||
//                 profit === undefined
//             ) {
//                 return res.status(400).json({
//                     success: false,
//                     message:
//                         "buy_price, sell_price and profit are required when status is close",
//                 });
//             }
//         }

//         // ✅ Check trade exists
//         const [checkRows] = await db.execute(
//             `SELECT id FROM orders WHERE id=? AND isdelete='active'`,
//             [id]
//         );

//         if (checkRows.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Trade not found",
//             });
//         }

//         const updateQuery = `
//       UPDATE orders
//       SET
//         user_id=?,
//         order_date=?,
//         currency_pair=?,
//         quantity=?,
//         order_price=?,
//         buy_price=?,
//         sell_price=?,
//         profit_loss=?,
//         type=?,
//         status=?,
//         updated_at=CURRENT_TIMESTAMP
//       WHERE id=?
//     `;

//         await db.execute(updateQuery, [
//             user_id,
//             order_date,
//             currency_pair,
//             quantity,
//             order_price,
//             status === "close" ? buy_price : null,
//             status === "close" ? sell_price : null,
//             status === "close" ? profit : null,
//             type,
//             status,
//             id,
//         ]);

//         return res.status(200).json({
//             success: true,
//             message: "Trade updated successfully",
//         });
//     } catch (error) {
//         console.log("updateTradeFull Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };




import db from "../utils/db.js";

/* ==========================
   CREATE TRADE (OPEN)
========================== */
export const tradeCreate = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }

    try {
        const { order_date, currency_pair, quantity, order_price, user_id, type } =
            req.body;

        if (
            !order_date ||
            !currency_pair ||
            !quantity ||
            !order_price ||
            !user_id ||
            !type
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!["buy", "sell"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be 'buy' or 'sell'",
            });
        }

        const insertQuery = `
      INSERT INTO orders
      (order_date, currency_pair, quantity, order_price, status, isdelete, user_id, type)
      VALUES (?, ?, ?, ?, 'open', 'active', ?, ?)
    `;

        const [result] = await db.execute(insertQuery, [
            order_date,
            currency_pair,
            Number(quantity),
            order_price,
            Number(user_id),
            type,
        ]);

        return res.status(201).json({
            success: true,
            message: "Trade created successfully",
            orderId: result.insertId,
        });
    } catch (error) {
        console.log("Trade Create Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ==========================
   UPDATE OPEN TRADE
========================== */
export const updateTrade = async (req, res) => {
    if (req?.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }

    const { id } = req.params;

    try {
        const { order_date, currency_pair, quantity, order_price, user_id, type } =
            req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid trade id is required",
            });
        }

        if (!order_date || !currency_pair || !order_price || !user_id || !type) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!["buy", "sell"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be 'buy' or 'sell'",
            });
        }

        // ✅ check exists & open only
        const [checkRows] = await db.execute(
            `SELECT id, status FROM orders WHERE id=? AND isdelete='active'`,
            [id]
        );

        if (checkRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trade not found",
            });
        }

        if (checkRows[0].status !== "open") {
            return res.status(400).json({
                success: false,
                message: "Only open trade can be updated here",
            });
        }

        const updateQuery = `
      UPDATE orders
      SET
        user_id=?,
        order_date=?,
        currency_pair=?,
        quantity=?,
        order_price=?,
        type=?,
        updated_at=CURRENT_TIMESTAMP
      WHERE id=?
    `;

        await db.execute(updateQuery, [
            Number(user_id),
            order_date,
            currency_pair,
            Number(quantity),
            order_price,
            type,
            Number(id),
        ]);

        return res.status(200).json({
            success: true,
            message: "Open trade updated successfully ✅",
        });
    } catch (error) {
        console.log("Update Open Trade Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ==========================
   COMPLETE TRADE (CLOSE)
   + Insert wallet profit/loss
========================== */
export const completeTrade = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }

    try {
        const { id } = req.params;

        const {
            user_id,
            order_date,
            currency_pair,
            quantity,
            buy_price,
            sell_price,
            order_price,
            type,
            profit,
            profit_type,
        } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid trade id is required",
            });
        }

        if (
            !user_id ||
            !order_date ||
            !currency_pair ||
            quantity === undefined ||
            buy_price === undefined ||
            sell_price === undefined ||
            !order_price ||
            !type ||
            profit === undefined ||
            !profit_type
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!["buy", "sell"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be 'buy' or 'sell'",
            });
        }

        if (!["profit", "loss"].includes(profit_type)) {
            return res.status(400).json({
                success: false,
                message: "profit_type must be 'profit' or 'loss'",
            });
        }

        const [checkRows] = await db.execute(
            `SELECT id, status FROM orders WHERE id=? AND isdelete='active'`,
            [id]
        );

        if (checkRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trade not found",
            });
        }

        if (checkRows[0].status === "close") {
            return res.status(400).json({
                success: false,
                message: "Trade already closed",
            });
        }

        // ✅ close trade
        await db.execute(
            `
      UPDATE orders
      SET 
        user_id=?,
        order_date=?,
        currency_pair=?,
        quantity=?,
        buy_price=?,
        sell_price=?,
        order_price=?,
        type=?,
        profit_loss=?,
        result_type=?,
        status='close',
        updated_at=CURRENT_TIMESTAMP
      WHERE id=?
      `,
            [
                Number(user_id),
                order_date,
                currency_pair,
                Number(quantity),
                Number(buy_price),
                Number(sell_price),
                order_price,
                type,
                Number(profit),
                profit_type,
                Number(id),
            ]
        );

        // ✅ wallet insert
        await db.execute(
            `
      INSERT INTO user_wallet_transactions
      (user_id, amount, transaction_type, status, admin_remark, approved_by, approved_at)
      VALUES (?, ?, ?, 'approved', ?, ?, NOW())
      `,
            [
                Number(user_id),
                Number(profit),
                profit_type,
                `Trade Completed: Order #${id}`,
                req.user.id,
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Trade completed successfully ✅",
        });
    } catch (error) {
        console.log("Complete Trade Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ==========================
   UPDATE CLOSED TRADE
   + Fix wallet transaction
========================== */
export const updateClosedTrade = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }

    try {
        const { id } = req.params;

        const { user_id, buy_price, sell_price, profit_loss, result_type } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid trade id is required",
            });
        }

        if (
            !user_id ||
            buy_price === undefined ||
            sell_price === undefined ||
            profit_loss === undefined ||
            !result_type
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!["profit", "loss"].includes(result_type)) {
            return res.status(400).json({
                success: false,
                message: "result_type must be profit or loss",
            });
        }

        const [rows] = await db.execute(
            `SELECT id, status FROM orders WHERE id=? AND isdelete='active'`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trade not found",
            });
        }

        if (rows[0].status !== "close") {
            return res.status(400).json({
                success: false,
                message: "Trade must be closed to edit close data",
            });
        }

        // ✅ Update orders
        await db.execute(
            `
      UPDATE orders
      SET buy_price=?,
          sell_price=?,
          profit_loss=?,
          result_type=?,
          updated_at=CURRENT_TIMESTAMP
      WHERE id=?
      `,
            [
                Number(buy_price),
                Number(sell_price),
                Number(profit_loss),
                result_type,
                Number(id),
            ]
        );

        // ✅ Update wallet transaction for that order
        await db.execute(
            `
      UPDATE user_wallet_transactions
      SET amount=?,
          transaction_type=?,
          admin_remark=?,
          approved_by=?,
          approved_at=NOW()
      WHERE user_id=?
        AND status='approved'
        AND admin_remark = ?
      `,
            [
                Number(profit_loss),
                result_type,
                `Trade Updated: Order #${id}`,
                req.user.id,
                Number(user_id),
                `Trade Completed: Order #${id}`,
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Closed trade updated and wallet corrected ✅",
        });
    } catch (error) {
        console.log("updateClosedTrade Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ==========================
   DELETE TRADE
========================== */
export const deleteTrade = async (req, res) => {
    if (req?.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }

    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid trade id is required",
            });
        }

        const [checkRows] = await db.execute(
            `SELECT id FROM orders WHERE id = ? AND isdelete = 'active'`,
            [id]
        );

        if (checkRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trade not found",
            });
        }

        await db.execute(
            `
      UPDATE orders
      SET isdelete = 'inactive',
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Trade deleted successfully ✅",
        });
    } catch (error) {
        console.log("Delete Trade Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ==========================
   GET ALL TRADES (ADMIN)
========================== */
export const tradeGetAll = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }

    try {
        const [rows] = await db.execute(
            `SELECT * FROM orders WHERE isdelete='active' ORDER BY id DESC`
        );

        return res.status(200).json({
            success: true,
            message: "fetch successfully",
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.log("Trade GetAll Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ==========================
   GET USER TRADES
========================== */
export const getTradeByUser = async (req, res) => {
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    try {
        const [rows] = await db.execute(
            `
      SELECT *
      FROM orders
      WHERE user_id = ?
        AND isdelete = 'active'
      ORDER BY created_at DESC
      `,
            [userId]
        );

        return res.status(200).json({
            success: true,
            message: "Fetched successfully",
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.log("Get Trade By User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
