import express from "express";
import CartController from "../controllers/CartController.js";
const router = express.Router();
const cartController = new CartController();
router.route("/").post(cartController.addToCart.bind(cartController));
router
    .route("/user/:user_id")
    .get(cartController.getCartByUserId.bind(cartController));
export default router;
//# sourceMappingURL=cart.js.map