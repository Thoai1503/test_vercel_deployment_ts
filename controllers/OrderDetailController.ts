import type Order from "../models/Order.js";
import OrderDetailRepository from "../repository/orderDetail.js";
import { type Request, type Response } from "express";

export default class OrderDetailController {
  private orderDetailRepository: OrderDetailRepository;
  constructor() {
    this.orderDetailRepository = new OrderDetailRepository();
  }

  async getAllOrder(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;
    const list = await this.orderDetailRepository.findByOrderId(
      Number(order_id)
    );

    return res.status(200).json(list);
  }
}
