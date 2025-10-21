export default class Order {
    id;
    user_id;
    discount;
    total;
    created_at;
    address_id;
    constructor(id = 0, user_id = 0, discount = 0, total = 1, address_id = 0, created_at = new Date(Date.now())) {
        this.id = id;
        this.user_id = user_id;
        this.discount = discount;
        this.total = total;
        this.created_at = created_at;
        this.address_id = address_id;
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
    getDiscount() {
        return this.discount;
    }
    setDiscount(discount) {
        this.discount = discount;
    }
    getTotal() {
        return this.total;
    }
    setTotal(total) {
        this.total = total;
    }
    getAddressId() {
        return this.address_id;
    }
    setAddressId(address_id) {
        this.address_id = address_id;
    }
}
//# sourceMappingURL=Order.js.map