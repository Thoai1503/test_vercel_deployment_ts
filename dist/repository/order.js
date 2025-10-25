import Order from "../models/Order.js";
import prisma from "../prisma/client.js";
export default class OrderRepository {
    constructor() { }
    async create(item) {
        try {
            const result = await prisma.orders.create({
                data: {
                    user_id: item.getUserId(),
                    discount: item.getDiscount(),
                    total: item.getTotal(),
                    address_id: item.getAddressId(),
                    created_at: new Date(Date.now()),
                },
            });
            return result.id;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        throw new Error("Method not implemented.");
    }
    async findAll() {
        try {
            const list = await prisma.orders.findMany();
            const mappingList = list.map((item) => new Order(item.id, item.user_id, Number(item.discount), Number(item.total), item.address_id || undefined));
            return mappingList;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=order.js.map