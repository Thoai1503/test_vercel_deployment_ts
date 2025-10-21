export default class Order {
    private id;
    private user_id;
    private discount;
    private total;
    private created_at;
    private address_id;
    constructor(id?: number, user_id?: number, discount?: number, total?: number, address_id?: number, created_at?: Date);
    getId(): number;
    setId(id: number): void;
    getUserId(): number;
    setUserId(user_id: number): void;
    getDiscount(): number;
    setDiscount(discount: number): void;
    getTotal(): number;
    setTotal(total: number): void;
    getAddressId(): number;
    setAddressId(address_id: number): void;
}
//# sourceMappingURL=Order.d.ts.map