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
import CartRepository from "../repository/cart.js";
import prisma from "../prisma/client.js";
const router = express.Router();
const orderRepository = new OrderRepository();
const orderDetailRepository = new OrderDetailRepository();
const cartRepository = new CartRepository();
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
const successfulVNPaymentResponse = async (verification, res) => {
    if (verification.isValid) {
        try {
            const params = verification.params;
            //parse dữ liệu JSON nhận từ   vnp_OrderInfo
            const orderData = parseOrderInfo(verification.params.vnp_OrderInfo);
            // lấy dữ liệu sau khi parse để tiến hành lưu vào db sau khi khách đã thanh toán
            const user_id = orderData.user_id;
            const pendingOrder = await orderRepository.getPendingByUserId(user_id);
            pendingOrder.setStatus(2); // paid ---> status ==2
            const update = await orderRepository.update(pendingOrder.getId(), pendingOrder);
            return res.redirect(`https://electric-commercial.vercel.app/successful?id=${params?.vnp_TxnRef}&amount=${params?.vnp_Amount}`);
        }
        catch (e) {
            console.error("Error processing successful payment redirect:", e);
            return res
                .status(500)
                .json({ error: "Failed to process successful payment" });
        }
    }
    return res.status(400).json({ code: "97", message: "Invalid signature" });
};
const failedVNPaymentResponse = async (verification, res) => {
    const orderData = parseOrderInfo(verification.params.vnp_OrderInfo);
    const user_id = orderData.user_id;
    const deleteCart = await cartRepository.deleteByUserId(user_id);
    return res.redirect(`https://electric-commercial.vercel.app/failed`);
};
router.get("/vnpay_return", async (req, res) => {
    try {
        const verification = await vnpService.returnPayment(req.query);
        if (verification.isValid) {
            if (verification.params.vnp_ResponseCode === "00") {
                return successfulVNPaymentResponse(verification, res);
            }
            return failedVNPaymentResponse(verification, res);
        }
        return res.status(400).json({ code: "97", message: "Invalid signature" });
    }
    catch (e) {
        console.error("Error verifying VNPAY return:", e);
        return res.status(500).json({ error: e.message });
    }
});
router.post("/create_payment_test", async (req, res) => {
    //order payload
    const orderId = req.body?.orderId || `${Date.now()}`;
    const userId = req.body?.user_id;
    const amount = req.body?.amount || 100000;
    const address_id = Number(req.body.address_id);
    let orderInfo = JSON.parse(req.body?.orderInfo);
    orderInfo = JSON.stringify(orderInfo);
    // end payload
    const cartItems = await prisma.cart.findMany({
        where: { user_id: userId },
    });
    const total = cartItems.reduce((sum, item) => sum + (item?.unit_price || 0) * (item.quantity || 0), 0);
    const deleteCart = await cartRepository.deleteByUserId(userId);
    const order_id = await orderRepository.create(new Order(0, userId, 0, amount, address_id, 1));
    const orderInfoBase64 = Buffer.from(orderInfo).toString("base64");
    const encodedOrderInfo = encodeURIComponent(orderInfoBase64);
    if (!order_id) {
        return res.status(404).json({
            success: false,
            message: "Lỗi tạo đơn hàng không thành công",
        });
    }
    const loop = await Promise.all(cartItems.map((item) => {
        const newOrderDetail = new OrderDetail(0, order_id, item.variant_id, item.quantity);
        return orderDetailRepository.create(newOrderDetail);
    }));
    if (loop.length == 0) {
        throw new Error("Lỗi cập nhật đơn hàng");
    }
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