import crypto from "crypto";
import qs from "qs";
export function sortParamsForSigning(obj) {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (let i = 0; i < str.length; i++) {
        sorted[str[i]] = encodeURIComponent(obj[decodeURIComponent(str[i])]).replace(/%20/g, "+");
    }
    return sorted;
}
export function buildQuery(params) {
    return qs.stringify(params, { encode: false });
}
export function hmacSha256(data, secret) {
    return crypto
        .createHmac("sha256", secret)
        .update(Buffer.from(data, "utf-8"))
        .digest("hex");
}
export function hmacSha512(data, secret) {
    return crypto
        .createHmac("sha512", secret)
        .update(Buffer.from(data, "utf-8"))
        .digest("hex");
}
//# sourceMappingURL=paymentUtils.js.map