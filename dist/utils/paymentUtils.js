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
export function parseOrderInfo(string) {
    let decodedInfo = Buffer.from(string, "base64").toString("utf-8").trim();
    decodedInfo = decodedInfo.replace(/[^\x20-\x7E]+/g, "").trim();
    console.log("Decoded string:", decodedInfo);
    return JSON.parse(decodedInfo);
}
//# sourceMappingURL=paymentUtils.js.map