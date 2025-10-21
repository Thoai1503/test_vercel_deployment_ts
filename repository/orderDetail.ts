import type OrderDetail from "../models/OrderDetail.js";
import prisma from "../prisma/client.js";
import type IRepository from "./IRepository.js";

export default class OrderDetailRepository implements IRepository<OrderDetail> {
  async create(item: OrderDetail): Promise<number> {
    try {
      const result = await prisma.order_detail.create({
        data: {
          order_id: item.order_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
        },
      });
      return result.id;
    } catch (error) {
      throw error;
    }
  }
  findById(id: number): Promise<OrderDetail | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<OrderDetail[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, item: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
