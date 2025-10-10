import Cart from "../models/Cart.js";
import type IRepository from "./IRepository.js";
export default class CartRepository implements IRepository<Cart> {
    constructor();
    create(cart: Cart): Promise<number>;
    findById(id: number): Promise<Cart | null>;
    findAll(): Promise<Cart[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findByUserId(user_id: number): Promise<Cart[]>;
}
//# sourceMappingURL=cart.d.ts.map