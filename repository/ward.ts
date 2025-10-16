import Ward from "../models/Ward.js";
import type IRepository from "./IRepository.js";
import { sql, getPool } from "../db/Mssql.js";

export default class ProviceRepository implements IRepository<Ward> {
  constructor() {}

  async create(item: Ward): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<Ward | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Ward[]> {
    try {
      const pool = await getPool();
      const request = pool.request();
      const result = await request.query("select * from wards");
      console.log("Result: " + result);
      return result.recordset.map(
        (item) => new Ward(item.id, item.name, item.code, item.status)
      );
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  async update(id: number, item: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getByDistrictId = async (District_id: number) => {
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input("District_id", sql.Int, District_id);
      const result = await request.query(
        "select * from wards where district_id=@district_id"
      );
      return result.recordset.map(
        (item) =>
          new Ward(item.id, item.name, item.code, item.district_id, item.status)
      );
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
}
