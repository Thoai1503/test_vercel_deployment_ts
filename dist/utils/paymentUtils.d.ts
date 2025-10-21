export declare function sortParamsForSigning(obj: any): {
    [key: string]: string;
};
export declare function buildQuery(params: Record<string, unknown>): string;
export declare function hmacSha256(data: string, secret: string): string;
export declare function hmacSha512(data: string, secret: string): string;
export declare function parseOrderInfo(string: string): any;
//# sourceMappingURL=paymentUtils.d.ts.map