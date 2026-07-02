import express from "express";
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import { get } from "mongoose";

const router = express.Router();

router.route("/")
.post(protect, createOrder)
.get(protect, admin,getAllOrders);

router.get("/myorders", protect, getMyOrders)

router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect,admin, updateOrderStatus);

export default router;