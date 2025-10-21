export default class OrderDetail {
    _id;
    _order_id;
    _variant_id;
    _quantity;
    constructor(id = 0, order_id = 0, variant_id = 0, quantity = 0) {
        this._id = Number(id) || 0;
        this._order_id = Number(order_id) || 0;
        this._variant_id = Number(variant_id) || 0;
        this._quantity = Math.max(0, Math.floor(Number(quantity) || 0));
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = Number(value) || 0;
    }
    get order_id() {
        return this._order_id;
    }
    set order_id(value) {
        this._order_id = Number(value) || 0;
    }
    get variant_id() {
        return this._variant_id;
    }
    set variant_id(value) {
        this._variant_id = Number(value) || 0;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = Math.max(0, Math.floor(Number(value) || 0));
    }
    toJSON() {
        return {
            id: this._id,
            order_id: this._order_id,
            variant_id: this._variant_id,
            quantity: this._quantity,
        };
    }
}
//# sourceMappingURL=OrderDetail.js.map