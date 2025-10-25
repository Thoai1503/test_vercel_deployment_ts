import OrderDetail from "../models/OrderDetail.js";
import type IRepository from "./IRepository.js";
export default class OrderDetailRepository implements IRepository<OrderDetail> {
    create(item: OrderDetail): Promise<number>;
    findById(id: number): Promise<OrderDetail | null>;
    findAll(): Promise<OrderDetail[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findByOrderId(order_id: number): Promise<OrderDetail[]>;
}
//# sourceMappingURL=orderDetail.d.ts.map