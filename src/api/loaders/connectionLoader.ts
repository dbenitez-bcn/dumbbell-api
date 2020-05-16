import { createConnection } from "typeorm"
import { getDatabaseHost } from "../utils/getDatabaseHost";

const dbHost = getDatabaseHost();

export const connectionLoader = async () => {
    return await createConnection({
        type: "postgres",
        host: dbHost,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ["dist/api/models/entities/**/*.js"]
      })
}