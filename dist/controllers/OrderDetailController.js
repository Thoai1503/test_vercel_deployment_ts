import OrderDetailRepository from "../repository/orderDetail.js";
import {} from "express";
export default class OrderDetailController {
    orderDetailRepository;
    constructor() {
        this.orderDetailRepository = new OrderDetailRepository();
    }
    async getAllOrder(req, res) {
        const { order_id } = req.params;
        const list = await this.orderDetailRepository.findByOrderId(Number(order_id));
        return res.status(200).json(list);
    }
}
//# sourceMappingURL=OrderDetailController.js.map