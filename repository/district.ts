import { sql, getPool } from "../db/Mssql.js";
import District from "../models/District.js";
import type IRepository from "./IRepository.js";
export default class DistrictRepository implements IRepository<District> {
  constructor() {}
  async create(item: District): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<District | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<District[]> {
    throw new Error("Method not implemented.");
  }
  async update(id: number, item: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getByProvinceId = async (province_id: number) => {
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input("province_id", sql.Int, province_id);
      const result = await request.query(
        "select * from districts where province_id=@province_id"
      );
      return result.recordset.map(
        (item) =>
          new District(
            item.id,
            item.name,
            item.code,
            item.province_id,
            item.status
          )
      );
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
}
