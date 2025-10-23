import { sortParamsForSigning, buildQuery, hmacSha512, } from "../utils/paymentUtils.js";
export default class VNPay {
    tmnCode;
    hashSecret;
    vnpUrl;
    returnUrl;
    constructor(config) {
        this.tmnCode = String(config.tmnCode || "");
        this.hashSecret = String(config.hashSecret || "");
        this.vnpUrl = String(config.vnpUrl || "");
        this.returnUrl = String(config.returnUrl || "");
    }
    async createPayment(orderId, amount, options = {}) {
        const now = new Date(Date.now() + 7 * 60 * 60 * 1000);
        const pad = (n) => (n < 10 ? "0" + n : "" + n);
        const createDate = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        let params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: this.tmnCode,
            vnp_Locale: options.locale === "en" ? "en" : "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: orderId,
            vnp_OrderInfo: options.orderInfo,
            vnp_OrderType: options.orderType || "other",
            vnp_Amount: Math.round(Number(amount) * 100),
            vnp_ReturnUrl: this.returnUrl,
            // vnp_BankTranNo: "NCB20170829152730",
            vnp_IpAddr: options.ipAddress || "127.0.0.1",
            vnp_CreateDate: createDate,
        };
        if (options.bankCode) {
            params.vnp_BankCode = options.bankCode;
        }
        params = sortParamsForSigning(params);
        const signData = buildQuery(params);
        const signature = hmacSha512(signData, this.hashSecret);
        params.vnp_SecureHash = signature;
        const paymentUrl = `${this.vnpUrl}?${buildQuery(params)}`;
        return { paymentUrl };
    }
    async returnPayment(queryParams) {
        const receivedHash = queryParams.vnp_SecureHash;
        const params = { ...queryParams };
        delete params.vnp_SecureHash;
        delete params.vnp_SecureHashType;
        const sorted = sortParamsForSigning(params);
        const signData = buildQuery(sorted);
        const calculated = hmacSha512(signData, this.hashSecret);
        const isValid = receivedHash === calculated;
        return { isValid, params: sorted };
    }
}
//# sourceMappingURL=VNPay.js.map