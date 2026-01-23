import express from "express";
import { getMarketData } from "../controller/crypto.controller.js";

const cryptoRoutes = express.Router();

// example: /api/crypto/markets?limit=100
cryptoRoutes.get("/markets", getMarketData);

export default cryptoRoutes;
