import { sql, getPool } from "../db/Mssql.js";
import District from "../models/District.js";
export default class DistrictRepository {
    constructor() { }
    async create(item) {
        throw new Error("Method not implemented.");
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
    getByProvinceId = async (province_id) => {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("province_id", sql.Int, province_id);
            const result = await request.query("select * from districts where province_id=@province_id");
            return result.recordset.map((item) => new District(item.id, item.name, item.code, item.province_id, item.status));
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };
}
//# sourceMappingURL=district.js.map