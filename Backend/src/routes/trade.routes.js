// import express from "express";
// import { deleteTrade, getTradeByUser, tradeCreate, tradeGetAll, completeTrade, updateTrade, updateTradeFull } from "../controller/trade.controller.js";
// import { isAuthenticated } from "../middleware/auth.middleware.js";
// const tradeRoutes = express.Router();
// tradeRoutes.post("/", isAuthenticated, tradeCreate);
// tradeRoutes.get("/", isAuthenticated, tradeGetAll);
// tradeRoutes.put("/:id/update", isAuthenticated, updateTrade);
// tradeRoutes.get("/user", isAuthenticated, getTradeByUser);
// tradeRoutes.put("/:id", isAuthenticated, completeTrade);
// tradeRoutes.delete("/:id", isAuthenticated, deleteTrade);
// tradeRoutes.put("/:id/full-update", isAuthenticated, updateTradeFull);

// export default tradeRoutes;



import express from "express";
import {
    deleteTrade,
    getTradeByUser,
    tradeCreate,
    tradeGetAll,
    completeTrade,
    updateTrade,
    updateClosedTrade, // ✅ NEW
} from "../controller/trade.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

const tradeRoutes = express.Router();

tradeRoutes.post("/", isAuthenticated, tradeCreate);
tradeRoutes.get("/", isAuthenticated, tradeGetAll);

tradeRoutes.put("/:id/update", isAuthenticated, updateTrade); // ✅ OPEN EDIT
tradeRoutes.put("/:id", isAuthenticated, completeTrade); // ✅ COMPLETE TRADE
tradeRoutes.put("/:id/close-edit", isAuthenticated, updateClosedTrade); // ✅ CLOSE EDIT

tradeRoutes.get("/user", isAuthenticated, getTradeByUser);
tradeRoutes.delete("/:id", isAuthenticated, deleteTrade);

export default tradeRoutes;
