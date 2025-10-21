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
}
//# sourceMappingURL=orderDetail.js.map