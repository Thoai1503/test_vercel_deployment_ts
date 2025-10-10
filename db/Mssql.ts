import mssql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(process.cwd(), "config/config.env") });

//dotenv.config();

const DBConnect: mssql.config = {
  user: process.env.USER || "John333_SQLLogin_1",
  password: process.env.PASSWORD || "1etw5yoon4",
  server: process.env.DB_SERVER || "Catalog_ElectricStoreDB.mssql.somee.com",
  database: process.env.DB || "Catalog_ElectricStoreDB",
  port: parseInt(process.env.DB_PORT!) || 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

let pool: mssql.ConnectionPool | null = null;

export async function getPool(): Promise<mssql.ConnectionPool> {
  if (pool) return pool;

  try {
    console.log("Connecting to MSSQL...");
    console.log("DB server: " + process.env.DB_SERVER);
    pool = await mssql.connect(DBConnect);
    console.log(" Connected to MSSQL");
    return pool;
  } catch (err) {
    console.error("Error connecting to MSSQL:", err);
    pool = null;
    throw err;
  }
}

export { mssql as sql };
