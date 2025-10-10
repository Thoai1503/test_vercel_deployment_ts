import Brand, { type BrandData } from "../models/Brand.js";
import type IRepository from "./IRepository.js";
import { sql, getPool } from "../db/Mssql.js";

export default class BrandRepository implements IRepository<Brand> {
  constructor() {}

  async create(brand: Brand): Promise<number> {
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input("name", sql.NVarChar, brand.getName());
      request.input("slug", sql.NVarChar, brand.getSlug());
      request.input("status", sql.Int, brand.getStatus());
      const result = await request.query(
        "INSERT INTO brands (name, slug, status) VALUES (@name, @slug, @status); SELECT SCOPE_IDENTITY() AS id"
      );
      return result.recordset[0].id;
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  }
  async findById(id: number): Promise<Brand | null> {
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input("id", sql.Int, id);
      const result = await request.query("SELECT * FROM brands WHERE id = @id");
      if (result.recordset.length > 0) {
        const brand = result.recordset[0];
        return new Brand({
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          status: brand.status,
        });
      }
      return null;
    } catch (error) {
      console.error("Error finding brand by id:", error);
      throw error;
    }
  }
  async findAll(): Promise<Brand[]> {
    try {
      const pool = await getPool();
      const request = pool.request();
      const result = await request.query(
        "SELECT * FROM brands ORDER BY id DESC"
      );
      return result.recordset.map(
        (brand: any) =>
          new Brand({
            id: brand.id,
            name: brand.name,
            slug: brand.slug,
            status: brand.status,
          })
      );
    } catch (error) {
      console.error("Error finding all brands:", error);
      throw error;
    }
  }

  async update(id: number, item: any): Promise<boolean> {
    try {
      const pool = await getPool();
      const request = pool.request();

      // Build dynamic update query based on provided fields
      const updateFields: string[] = [];
      const params: any = { id };

      if (item.name !== undefined) {
        updateFields.push("name = @name");
        request.input("name", sql.NVarChar, item.name);
        params.name = item.name;
      }
      if (item.slug !== undefined) {
        updateFields.push("slug = @slug");
        request.input("slug", sql.NVarChar, item.slug);
        params.slug = item.slug;
      }
      if (item.status !== undefined) {
        updateFields.push("status = @status");
        request.input("status", sql.Int, item.status);
        params.status = item.status;
      }

      if (updateFields.length === 0) {
        return false; // No fields to update
      }

      request.input("id", sql.Int, id);
      const query = `UPDATE brands SET ${updateFields.join(
        ", "
      )} WHERE id = @id`;
      const result = await request.query(query);
      if (result.rowsAffected[0]) return result.rowsAffected[0] > 0;
      return false;
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input("id", sql.Int, id);
      const result = await request.query("DELETE FROM brands WHERE id = @id");
      return result.rowsAffected[0]! > 0;
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw error;
    }
  }
}
