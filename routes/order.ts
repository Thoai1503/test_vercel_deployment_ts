import express from "express";
import OrderController from "../controllers/OrderController.js";
const router = express.Router();
const orderController = new OrderController();

router.route("").get(orderController.getAllOrder.bind(orderController));

export default router;
