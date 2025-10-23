import crypto from "crypto";
import qs from "qs";
export function sortParamsForSigning(obj: any) {
  const sorted: { [key: string]: string } = {};
  const str: string[] = [];
  let key: string;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (let i = 0; i < str.length; i++) {
    sorted[str[i]!] = encodeURIComponent(
      obj[decodeURIComponent(str[i]!)]
    ).replace(/%20/g, "+");
  }
  return sorted;
}

export function buildQuery(params: Record<string, unknown>): string {
  return qs.stringify(params, { encode: false });
}

export function hmacSha256(data: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest("hex");
}

export function hmacSha512(data: string, secret: string): string {
  return crypto
    .createHmac("sha512", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest("hex");
}

export function parseOrderInfo(str: string) {
  try {
    // 1️ Decode URL nhiều lần nếu bị double-encoded
    let restored = str.trim();
    while (restored.includes("%25")) {
      restored = decodeURIComponent(restored);
    }
    restored = decodeURIComponent(restored);

    // 2️ Loại bỏ ký tự không hợp lệ trong base64
    restored = restored.replace(/[^A-Za-z0-9+/=]/g, "");

    // 3️ Decode Base64
    let decodedInfo = Buffer.from(restored, "base64").toString("utf8").trim();

    // 4️ Xoá ký tự lạ không thuộc bảng ASCII chuẩn
    decodedInfo = decodedInfo.replace(/[^\x20-\x7E]+/g, "").trim();

    // 5️ Tìm JSON hợp lệ trong chuỗi (phòng ngừa dính ký tự dư)
    const jsonMatch = decodedInfo.match(/\{.*\}/);
    if (!jsonMatch) throw new Error("No JSON found in decoded string");

    console.log(" Decoded string:", jsonMatch[0]);

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("❌ Error verifying VNPAY return:", err, str);
    return null;
  }
}
