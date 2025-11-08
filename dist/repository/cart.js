import Cart from "../models/Cart.js";
import { sql, getPool } from "../db/Mssql.js";
import prisma from "../prisma/client.js";
export default class CartRepository {
    constructor() { }
    async create(cart) {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("user_id", sql.Int, cart.getUserId());
            request.input("variant_id", sql.Int, cart.getVariantId());
            request.input("quantity", sql.Int, cart.getQuantity());
            request.input("unit_price", sql.Decimal, cart.getUnitPrice());
            const result = await request.query("INSERT INTO cart (user_id, variant_id, quantity,unit_price) VALUES (@user_id, @variant_id, @quantity,@unit_price); SELECT SCOPE_IDENTITY() AS id");
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
        try {
            const result = await prisma.cart.delete({
                where: {
                    id: id,
                },
            });
            console.log(result);
            return result.id != 0;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteByUserId(user_id) {
        try {
            const result = await prisma.cart.deleteMany({
                where: {
                    user_id: user_id,
                },
            });
            console.log(result.count);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async updateQuantity(id, quantity) {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("id", sql.Int, id);
            request.input("quantity", sql.Int, quantity);
            const result = await request.query(`UPDATE cart 
         SET quantity = @quantity 
         WHERE id = @id`);
            return result.rowsAffected[0] > 0;
        }
        catch (error) {
            console.error(`Error updating cart quantity ${id}:`, error);
            throw error;
        }
    }
    async findByUserId(user_id) {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("user_id", sql.Int, user_id);
            const result = await request.query("select * from cart c join product_variants pv on c.variant_id = pv.id join product_image pim on pim.variant_id= c.variant_id where  c.user_id=@user_id");
            return result.recordset.map((cart) => new Cart(cart.id, cart.user_id, cart.variant_id, cart.quantity, cart.unit_price));
        }
        catch (error) {
            console.error("Error finding carts by user_id:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=cart.js.map