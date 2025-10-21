export default class OrderDetail {
    private _id;
    private _order_id;
    private _variant_id;
    private _quantity;
    constructor(id?: number, order_id?: number, variant_id?: number, quantity?: number);
    get id(): number;
    set id(value: number);
    get order_id(): number;
    set order_id(value: number);
    get variant_id(): number;
    set variant_id(value: number);
    get quantity(): number;
    set quantity(value: number);
    toJSON(): {
        id: number;
        order_id: number;
        variant_id: number;
        quantity: number;
    };
}
//# sourceMappingURL=OrderDetail.d.ts.map