// const User = require("../model/User");
import User from "../models/User.js";
import { sql, getPool } from "../db/Mssql.js";

export default class UserRepository {
  constructor() {}
  async getAllUsers() {
    const pool = await getPool();
    const request = pool.request();
    const result = await request.query("SELECT * FROM users");
    return result.recordset;
  }
  async getUserByEmail(email: string) {
    const pool = await getPool();
    const request = pool.request();
    request.input("email", sql.NVarChar, email);
    const result = await request.query(
      "SELECT * FROM users WHERE email = @email"
    );
    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      return new User({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
        status: user.status,
      });
    }

    return null;
  }
  async getUserById(id: number): Promise<User | null> {
    const pool = await getPool();
    const request = pool.request();
    request.input("id", sql.Int, id);
    const result = await request.query("SELECT * FROM users WHERE id = @id");
    //return result.recordset[0];

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      return new User({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
        status: user.status,
      });
    }
    return null;
  }
  async createUser(user: User) {
    const pool = await getPool();
    const request = pool.request();
    request.input("name", sql.NVarChar, user.getName());
    request.input("email", sql.NVarChar, user.getEmail());
    request.input("phone", sql.NVarChar, user.getPhone());
    request.input("password", sql.NVarChar, user.getPassword());
    request.input("role", sql.Int, user.getRole());
    request.input("status", sql.Int, user.getStatus());
    const result = await request.query(
      "INSERT INTO users (full_name, email, phone, password, role, status) VALUES (@name, @email, @phone, @password, @role, @status); SELECT SCOPE_IDENTITY() AS id"
    );

    const userRs = new User({
      id: result.recordset[0].id as number,
      name: user.getName(),
      email: user.getEmail(),
      phone: user.getPhone(),
      password: user.getPassword(),
      role: user.getRole(),
      status: user.getStatus(),
    });
    return userRs;
  }
  async updateUser(id: number, user: User) {
    const pool = await getPool();
    const request = pool.request();
    request.input("id", sql.Int, id);
    request.input("name", sql.NVarChar, user.getName());
    request.input("email", sql.NVarChar, user.getEmail());
    request.input("phone", sql.NVarChar, user.getPhone());
    request.input("password", sql.NVarChar, user.getPassword());
    request.input("role", sql.Int, user.getRole());
    request.input("status", sql.Int, user.getStatus());
    await request.query(
      "UPDATE users SET name = @name, email = @email, phone = @phone, password = @password, role = @role, status = @status WHERE id = @id"
    );
    return { id };
  }
}
