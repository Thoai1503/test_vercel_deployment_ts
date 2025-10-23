import {} from "express";
import CartRepository from "../repository/cart.js";
import Cart from "../models/Cart.js";
import prisma from "../prisma/client.js";
export default class CartController {
    cartRepository;
    constructor() {
        this.cartRepository = new CartRepository();
    }
    async addToCart(req, res) {
        try {
            const { user_id, variant_id, quantity, unit_price } = req.body;
            const newCartItem = new Cart(0, user_id, variant_id, quantity, unit_price);
            const cart = await this.cartRepository.create(newCartItem);
            return res.status(201).json(cart);
        }
        catch (error) {
            console.error("Error adding to cart:", error);
            return res.status(500).json({ error: "Failed to add item to cart" });
        }
    }
    async getCartByUserId(req, res) {
        try {
            const userId = parseInt(req.params.user_id, 10);
            const cartItems = await this.cartRepository.findByUserId(userId);
            return res.status(200).json(cartItems);
        }
        catch (error) {
            console.error("Error retrieving cart items:", error);
            return res.status(500).json({ error: "Failed to retrieve cart items" });
        }
    }
    async updateQuantity(req, res) {
        try {
            const cartItemId = parseInt(req.params.id, 10);
            const quantity = parseInt(req.body.quantity, 10);
            let result = false;
            if (quantity == 0) {
                result =
                    (await prisma.cart.delete({ where: { id: cartItemId } })).id != 0;
            }
            result = await this.cartRepository.updateQuantity(cartItemId, quantity);
            console.log("update result: " + result);
            return res.status(200).json({ message: result });
        }
        catch (error) {
            console.error("Error retrieving cart items:", error);
            return res.status(500).json({ error: "Failed to retrieve cart items" });
        }
    }
}
//# sourceMappingURL=CartController.js.map