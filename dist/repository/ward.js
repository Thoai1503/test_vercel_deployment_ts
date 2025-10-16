import Ward from "../models/Ward.js";
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
            const result = await request.query("select * from wards");
            console.log("Result: " + result);
            return result.recordset.map((item) => new Ward(item.id, item.name, item.code, item.status));
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    async update(id, item) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
    getByDistrictId = async (District_id) => {
        try {
            const pool = await getPool();
            const request = pool.request();
            request.input("District_id", sql.Int, District_id);
            const result = await request.query("select * from wards where district_id=@district_id");
            return result.recordset.map((item) => new Ward(item.id, item.name, item.code, item.district_id, item.status));
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };
}
//# sourceMappingURL=ward.js.map