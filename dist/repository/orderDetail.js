import OrderDetail from "../models/OrderDetail.js";
import prisma from "../prisma/client.js";
export default class OrderDetailRepository {
    async create(item) {
        try {
            const result = await prisma.order_detail.create({
                data: {
                    order_id: item.order_id,
                    variant_id: item.variant_id,
                    quantity: item.quantity,
                },
            });
            return result.id;
        }
        catch (error) {
            throw error;
        }
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    update(id, item) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    async findByOrderId(order_id) {
        try {
            const list = await prisma.order_detail.findMany({
                include: {},
                where: {
                    order_id: order_id,
                },
            });
            return list.map((item) => new OrderDetail(item.id, item.order_id, item.variant_id, item.quantity));
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=orderDetail.js.map