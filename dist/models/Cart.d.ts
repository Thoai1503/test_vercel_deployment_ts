export default class Cart {
    private id;
    private user_id;
    private variant_id;
    private quantity;
    private unit_price;
    constructor(id?: number, user_id?: number, variant_id?: number, quantity?: number, unit_price?: number);
    getId(): number;
    setId(id: number): void;
    getUserId(): number;
    setUserId(user_id: number): void;
    getVariantId(): number;
    setVariantId(variant_id: number): void;
    getQuantity(): number;
    setQuantity(quantity: number): void;
    getUnitPrice(): number;
    setUnitPrice(quantity: number): void;
}
//# sourceMappingURL=Cart.d.ts.map