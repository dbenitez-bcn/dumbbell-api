import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const database: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432
});