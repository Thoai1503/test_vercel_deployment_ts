import express, {} from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import MoMo from "../service/MoMo.js";
const router = express.Router();
const momoService = new MoMo({
    partnerCode: process.env.momo_PartnerCode,
    accessKey: process.env.momo_AccessKey,
    secretKey: process.env.momo_SecretKey,
    redirectUrl: process.env.momo_RedirectUrl,
    ipnUrl: process.env.momo_IpnUrl,
    endpoint: process.env.momo_Endpoint,
});
router.post("/create_payment", async (req, res) => {
    try {
        const orderId = req.body?.orderId || `${Date.now()}`;
        const amount = req.body?.amount || "50000";
        const result = await momoService.createPayment(orderId, amount, {
            requestType: req.body?.requestType,
            orderInfo: req.body?.orderInfo,
            extraData: req.body?.extraData,
            lang: req.body?.lang,
        });
        return res.status(200).json({ url: result.payUrl });
    }
    catch (e) {
        console.error("Error creating MoMo payment:", e);
        return res.status(500).json({ error: "Failed to create MoMo payment" });
    }
});
export default router;
//# sourceMappingURL=MOMO_payment.js.map