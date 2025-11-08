import Order from "../models/Order.js";
import type IRepository from "./IRepository.js";
export default class OrderRepository implements IRepository<Order> {
    constructor();
    create(item: Order): Promise<number>;
    findById(id: number): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByUserId(user_id: number): Promise<Order[]>;
}
//# sourceMappingURL=order.d.ts.map