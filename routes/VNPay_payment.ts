import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import express, { type Request, type Response } from "express";
import VNPay from "../service/VNPay.js";
import MoMo from "../service/MoMo.js";
import { parseOrderInfo } from "../utils/paymentUtils.js";
import OrderRepository from "../repository/order.js";
import Order from "../models/Order.js";
import OrderDetailRepository from "../repository/orderDetail.js";
import OrderDetail from "../models/OrderDetail.js";
import CartRepository from "../repository/cart.js";
import prisma from "../prisma/client.js";
import type Cart from "../models/Cart.js";
const router = express.Router();
const orderRepository = new OrderRepository();
const orderDetailRepository = new OrderDetailRepository();
const cartRepository = new CartRepository();

function getClientIp(req: Request): string {
  return (
    (req.headers["x-forwarded-for"] as string) ||
    (req.connection as any).remoteAddress ||
    (req.socket as any).remoteAddress ||
    (req.connection as any).socket?.remoteAddress ||
    "127.0.0.1"
  );
}

const vnpService = new VNPay({
  tmnCode: process.env.vnp_TmnCode,
  hashSecret: process.env.vnp_HashSecret,
  vnpUrl: process.env.vnp_Url,
  returnUrl: process.env.vnp_ReturnUrl,
});

// router.post("/create_payment_url", async (req: Request, res: Response) => {
//   try {
//     const orderId = (req.body?.orderId as string) || `${Date.now()}`;
//     const amount = (req.body?.amount as number) || 100000;
//     const payment = await vnpService.createPayment(orderId, amount, {
//       ipAddress: getClientIp(req),
//       orderInfo: req.body?.orderInfo,
//       bankCode: req.body?.bankCode,
//       orderType: req.body?.orderType,
//       locale: req.body?.language,
//     });
//     return res.status(200).json({ url: payment.paymentUrl });
//   } catch (e) {
//     console.error("Error creating VNPAY url:", e);
//     return res.status(500).json({ error: "Failed to create payment URL" });
//   }
// });

router.get("/vnpay_return", async (req: Request, res: Response) => {
  try {
    const verification = await vnpService.returnPayment(req.query as any);
    if (verification.isValid) {
      const params = verification.params as Record<string, unknown> | undefined;

      const orderData = parseOrderInfo(
        verification.params.vnp_OrderInfo as string
      );

      const address_id = orderData.address_id;
      const user_id = orderData.user_id;
      const cartItems = await prisma.cart.findMany({
        where: { user_id: user_id },
      });
      const total = cartItems.reduce(
        (sum: number, item: any) =>
          sum + (item?.unit_price || 0) * (item.quantity || 0),
        0
      );
      const order = new Order(0, user_id, 0, total, address_id);
      const orderId = await orderRepository.create(order);
      if (!orderId || orderId <= 0) {
        return res.status(500).json({ message: "Failed to create order" });
      }

      const loop = await Promise.all(
        cartItems.map((item) => {
          const newOrderDetail = new OrderDetail(
            0,
            orderId,
            item.variant_id,
            item.quantity
          );
          return orderDetailRepository.create(newOrderDetail);
        })
      );
      console.log("Loop:" + loop);
      if (loop.length == 0) {
        throw new Error("Lỗi cập nhật đơn hàng");
      }
      const deleteCart = await cartRepository.deleteByUserId(user_id);

      return res.redirect(
        `http://localhost:5173/successful?id=${params?.vnp_TxnRef}&amount=${params?.vnp_Amount}`
      );
    }
    return res.status(400).json({ code: "97", message: "Invalid signature" });
  } catch (e: any) {
    console.error("Error verifying VNPAY return:", e);
    return res.status(500).json({ error: e.message });
  }
});
router.post("/create_payment_test", async (req: Request, res: Response) => {
  const orderId = (req.body?.orderId as string) || `${Date.now()}`;
  const amount = (req.body?.amount as number) || 100000;
  let orderInfo = JSON.parse(req.body?.orderInfo);
  orderInfo = JSON.stringify(orderInfo);
  const orderInfoBase64 = Buffer.from(orderInfo).toString("base64");
  const encodedOrderInfo = encodeURIComponent(orderInfoBase64);
  console.log("info: " + encodedOrderInfo);
  const { method } = req.body;
  switch (method) {
    case "vnpay":
      const vnpService = new VNPay({
        tmnCode: process.env.vnp_TmnCode,
        hashSecret: process.env.vnp_HashSecret,
        vnpUrl: process.env.vnp_Url,
        returnUrl: process.env.vnp_ReturnUrl,
      });
      const payment = await vnpService.createPayment(orderId, amount, {
        ipAddress: getClientIp(req),
        orderInfo: encodedOrderInfo,
        bankCode: req.body?.bankCode,
        orderType: req.body?.orderType,
        locale: req.body?.language || "vn",
      });
      return res.status(200).json({ success: true, url: payment.paymentUrl });

    case "momo":
      const momoService = new MoMo({
        partnerCode: process.env.momo_PartnerCode!,
        accessKey: process.env.momo_AccessKey!,
        secretKey: process.env.momo_SecretKey!,
        redirectUrl: process.env.momo_RedirectUrl!,
        ipnUrl: process.env.momo_IpnUrl!,
        endpoint: process.env.momo_Endpoint!,
      });
      const result = await momoService.createPayment(orderId, amount, {
        requestType: req.body?.requestType,
        orderInfo: req.body?.orderInfo || orderId,
        extraData: req.body?.extraData,
        lang: req.body?.lang,
      });
      return res.status(200).json({ success: true, url: result.payUrl });
    case "":
      return res.status(200).json({
        success: false,
        message: "Vui lòng chọn phương thức thanh toán",
      });
  }
});

export default router;
