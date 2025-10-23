export default class Cart {
    id;
    user_id;
    variant_id;
    quantity;
    unit_price;
    constructor(id = 0, user_id = 0, variant_id = 0, quantity = 1, unit_price = 0) {
        this.id = id;
        this.user_id = user_id;
        this.variant_id = variant_id;
        this.quantity = quantity;
        this.unit_price = unit_price;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getUserId() {
        return this.user_id;
    }
    setUserId(user_id) {
        this.user_id = user_id;
    }
    getVariantId() {
        return this.variant_id;
    }
    setVariantId(variant_id) {
        this.variant_id = variant_id;
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    getUnitPrice() {
        return this.unit_price;
    }
    setUnitPrice(quantity) {
        this.unit_price = quantity;
    }
}
//# sourceMappingURL=Cart.js.map