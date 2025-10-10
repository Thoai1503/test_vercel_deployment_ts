import Cart from "../models/Cart.js";
import { sql, getPool } from "../db/Mssql.js";
export default class CartRepository {
    constructor() { }
    async create(cart) {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("user_id", sql.Int, cart.getUserId());
            request.input("variant_id", sql.Int, cart.getVariantId());
            request.input("quantity", sql.Int, cart.getQuantity());
            const result = await request.query("INSERT INTO carts (user_id, variant_id, quantity) VALUES (@user_id, @variant_id, @quantity); SELECT SCOPE_IDENTITY() AS id");
            return result.recordset[0].id;
        }
        catch (error) {
            console.error("Error creating cart:", error);
            throw error;
        }
    }
    async findById(id) {
        throw new Error("Method not implemented.");
    }
    async findAll() {
        throw new Error("Method not implemented.");
    }
    async update(id, item) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
    async findByUserId(user_id) {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("user_id", sql.Int, user_id);
            const result = await request.query("SELECT * FROM carts  WHERE user_id = @user_id");
            return result.recordset.map((cart) => new Cart(cart.id, cart.user_id, cart.variant_id, cart.quantity));
        }
        catch (error) {
            console.error("Error finding carts by user_id:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=cart.js.map