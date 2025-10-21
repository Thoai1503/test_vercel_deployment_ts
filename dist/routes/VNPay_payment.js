import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import express, {} from "express";
import VNPay from "../service/VNPay.js";
import MoMo from "../service/MoMo.js";
import { parseOrderInfo } from "../utils/paymentUtils.js";
import OrderRepository from "../repository/order.js";
import Order from "../models/Order.js";
import OrderDetailRepository from "../repository/orderDetail.js";
import OrderDetail from "../models/OrderDetail.js";
const router = express.Router();
const orderRepository = new OrderRepository();
const orderDetailRepository = new OrderDetailRepository();
function getClientIp(req) {
    return (req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket?.remoteAddress ||
        "127.0.0.1");
}
const vnpService = new VNPay({
    tmnCode: process.env.vnp_TmnCode,
    hashSecret: process.env.vnp_HashSecret,
    vnpUrl: process.env.vnp_Url,
    returnUrl: process.env.vnp_ReturnUrl,
});
router.post("/create_payment_url", async (req, res) => {
    try {
        const orderId = req.body?.orderId || `${Date.now()}`;
        const amount = req.body?.amount || 100000;
        const payment = await vnpService.createPayment(orderId, amount, {
            ipAddress: getClientIp(req),
            orderInfo: req.body?.orderInfo,
            bankCode: req.body?.bankCode,
            orderType: req.body?.orderType,
            locale: req.body?.language,
        });
        return res.status(200).json({ url: payment.paymentUrl });
    }
    catch (e) {
        console.error("Error creating VNPAY url:", e);
        return res.status(500).json({ error: "Failed to create payment URL" });
    }
});
router.get("/vnpay_return", async (req, res) => {
    try {
        const verification = await vnpService.returnPayment(req.query);
        if (verification.isValid) {
            const params = verification.params;
            const orderData = parseOrderInfo(verification.params.vnp_OrderInfo);
            const total = orderData.reduce((sum, item) => sum + (item?.price || 0) * (item.quantity || 0), 0);
            const address_id = orderData[1].id;
            const user_id = orderData[0].id;
            const order = new Order(0, user_id, 0, total, address_id);
            const orderId = await orderRepository.create(order);
            if (orderId && orderId > 0) {
                await orderData.forEach(async (item) => {
                    const newOrderDetail = new OrderDetail(0, orderId, item.variant_id, item.quantity);
                    const re = await orderDetailRepository.create(newOrderDetail);
                    console.log("Id: " + re);
                });
            }
            return res.json({
                code: String(params?.vnp_ResponseCode ?? ""),
                orderId: String(params?.vnp_TxnRef ?? ""),
                amount: String(params?.vnp_Amount ?? ""),
            });
        }
        return res.status(400).json({ code: "97", message: "Invalid signature" });
    }
    catch (e) {
        console.error("Error verifying VNPAY return:", e);
        return res.status(500).json({ error: "Payment verification failed" });
    }
});
router.post("/create_payment_test", async (req, res) => {
    const orderId = req.body?.orderId || `${Date.now()}`;
    const amount = req.body?.amount || 100000;
    const orderInfo = JSON.parse(req.body?.orderInfo);
    const stringifyInfo = Buffer.from(JSON.stringify(orderInfo)).toString("base64");
    console.log("info: " + stringifyInfo);
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
                orderInfo: stringifyInfo,
                bankCode: req.body?.bankCode,
                orderType: req.body?.orderType,
                locale: req.body?.language || "vn",
            });
            return res.status(200).json({ success: true, url: payment.paymentUrl });
        case "momo":
            const momoService = new MoMo({
                partnerCode: process.env.momo_PartnerCode,
                accessKey: process.env.momo_AccessKey,
                secretKey: process.env.momo_SecretKey,
                redirectUrl: process.env.momo_RedirectUrl,
                ipnUrl: process.env.momo_IpnUrl,
                endpoint: process.env.momo_Endpoint,
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
//# sourceMappingURL=VNPay_payment.js.map