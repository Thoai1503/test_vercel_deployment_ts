import type Order from "../models/Order.js";
import OrderRepository from "../repository/order.js";
import { type Request, type Response } from "express";

export default class OrderController {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async getAllOrder(req: Request, res: Response): Promise<Response> {
    const list = await this.orderRepository.findAll();

    return res.status(200).json(list);
  }
}
