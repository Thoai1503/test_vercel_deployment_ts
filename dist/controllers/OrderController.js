import OrderRepository from "../repository/order.js";
import {} from "express";
export default class OrderController {
    orderRepository;
    constructor() {
        this.orderRepository = new OrderRepository();
    }
    async getAllOrder(req, res) {
        const { page, search } = req.query;
        const searchStr = typeof search === "string" ? search.trim() : "";
        const limit = 8; // Items per page
        const start = (Number(page) - 1) * limit;
        const end = start + limit;
        let list = await this.orderRepository.findAll();
        console.log("phones=", list.map((i) => i.getUser()?.getPhone()));
        if (search != "") {
            list = list.filter((item) => {
                const phone = (item.getUser()?.getPhone() || "").trim();
                return phone.includes(searchStr);
            });
        }
        const count = list.length;
        const totalPages = Math.ceil(count / limit);
        list = list.slice(start, end);
        return res
            .status(200)
            .json({ list, page: Number(page), totalPages: totalPages });
    }
}
//# sourceMappingURL=OrderController.js.map