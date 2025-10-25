import express from "express";
import OrderDetailController from "../controllers/OrderDetailController.js";
const router = express.Router();

const orderDetailController = new OrderDetailController();

router.get(
  "/order/:order_id",
  orderDetailController.getAllOrder.bind(orderDetailController)
);
export default router;
