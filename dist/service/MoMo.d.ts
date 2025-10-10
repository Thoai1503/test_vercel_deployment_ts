import type IPaymentService from "./IPaymentService.js";
type MoMoConfig = {
    partnerCode?: string;
    accessKey?: string;
    secretKey?: string;
    redirectUrl?: string;
    ipnUrl?: string;
    endpoint?: string;
};
export default class MoMo implements IPaymentService {
    private readonly partnerCode;
    private readonly accessKey;
    private readonly secretKey;
    private readonly redirectUrl;
    private readonly ipnUrl;
    private readonly endpoint;
    constructor(config: MoMoConfig);
    createPayment(orderId: string, amount: number | string, options?: Record<string, unknown>): Promise<{
        payUrl: string;
        response: unknown;
    }>;
    returnPayment(queryParams: Record<string, string>): Promise<{
        params: Record<string, string>;
    }>;
}
export {};
//# sourceMappingURL=MoMo.d.ts.map