import OrderRepository from "../repository/order.js";
import {} from "express";
export default class OrderController {
    orderRepository;
    constructor() {
        this.orderRepository = new OrderRepository();
    }
    async getAllOrder(req, res) {
        const list = await this.orderRepository.findAll();
        return res.status(200).json(list);
    }
}
//# sourceMappingURL=OrderController.js.map