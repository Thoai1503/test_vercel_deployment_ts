import Province from "../models/Province.js";
import type IRepository from "./IRepository.js";
import { sql, getPool } from "../db/Mssql.js";

export default class ProviceRepository implements IRepository<Province> {
  constructor() {}

  async create(item: Province): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<Province | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Province[]> {
    try {
      const pool = await getPool();
      const request = pool.request();
      const result = await request.query("select * from provinces");
      console.log("Result: " + result);
      return result.recordset.map(
        (item) => new Province(item.id, item.name, item.code, item.status)
      );
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }
  async update(id: number, item: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
