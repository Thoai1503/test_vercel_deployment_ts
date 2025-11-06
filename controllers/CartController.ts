import { type Request, type Response } from "express";
import CartRepository from "../repository/cart.js";
import Cart from "../models/Cart.js";
import prisma from "../prisma/client.js";
export default class CartController {
  private cartRepository: CartRepository;
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async addToCart(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { user_id, variant_id, quantity, unit_price } = req.body;
      const newCartItem = new Cart(
        0,
        user_id,
        variant_id,
        quantity,
        unit_price
      );
      const cart = await this.cartRepository.create(newCartItem);
      return res.status(201).json(cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ error: "Failed to add item to cart" });
    }
  }
  async getCartByUserId(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const userId = parseInt(req.params.user_id!, 10);
      const cartItems = await this.cartRepository.findByUserId(userId);
      return res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      return res.status(500).json({ error: "Failed to retrieve cart items" });
    }
  }
  async updateQuantity(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const cartItemId = parseInt(req.params.id!, 10);
      const quantity = parseInt(req.body.quantity, 10);
      let result = false;
      if (quantity == 0) {
        result =
          (await prisma.cart.delete({ where: { id: cartItemId } })).id != 0;
      }
      result = await this.cartRepository.updateQuantity(cartItemId, quantity);
      console.log("update result: " + result);
      return res.status(200).json({ message: result });
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      return res.status(500).json({ error: "Failed to retrieve cart items" });
    }
  }

  async addListToCart(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { user_id, items } = req.body;
      const promiseArr = [];
      for (const item of items) {
        const newCartItem = new Cart(
          0,
          user_id,
          item.variant_id,
          item.quantity,
          item.unit_price
        );

        promiseArr.push(this.cartRepository.create(newCartItem));
      }
      await Promise.all(promiseArr);

      return res.status(201).json({ message: "Items added to cart" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ error: "Failed to add items to cart" });
    }
  }
  async clearCart(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const userId = parseInt(req.params.user_id!, 10);
      const result = await this.cartRepository.deleteByUserId(userId);
      return res.status(200).json({ message: result });
    } catch (error) {
      console.error("Error clearing cart items:", error);
      return res.status(500).json({ error: "Failed to clear cart items" });
    }
  }
}
