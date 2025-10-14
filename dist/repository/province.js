import Province from "../models/Province.js";
import { sql, getPool } from "../db/Mssql.js";
export default class ProviceRepository {
    constructor() { }
    async create(item) {
        throw new Error("Method not implemented.");
    }
    async findById(id) {
        throw new Error("Method not implemented.");
    }
    async findAll() {
        try {
            const pool = await getPool();
            const request = pool.request();
            const result = await request.query("select * from provinces");
            console.log("Result: " + result);
            return result.recordset.map((item) => new Province(item.id, item.name, item.code, item.status));
        }
        catch (error) {
            console.error("Error creating cart:", error);
            throw error;
        }
    }
    async update(id, item) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=province.js.map