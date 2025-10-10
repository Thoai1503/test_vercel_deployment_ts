import type IPaymentService from "./IPaymentService.js";
type VNPayConfig = {
    tmnCode: string | undefined;
    hashSecret: string | undefined;
    vnpUrl: string | undefined;
    returnUrl: string | undefined;
};
export default class VNPay implements IPaymentService {
    private readonly tmnCode;
    private readonly hashSecret;
    private readonly vnpUrl;
    private readonly returnUrl;
    constructor(config: VNPayConfig);
    createPayment(orderId: string, amount: number | string, options?: Record<string, unknown>): Promise<{
        paymentUrl: string;
    }>;
    returnPayment(queryParams: Record<string, string>): Promise<{
        isValid: boolean;
        params: Record<string, unknown>;
    }>;
}
export {};
//# sourceMappingURL=VNPay.d.ts.map