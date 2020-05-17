import { ConnectionOptions } from "typeorm";
import { getDatabaseHost } from "../utils/getDatabaseHost";
import Secrets from "../config/secrets";

const dbHost = getDatabaseHost();

export const testConnection: ConnectionOptions = {
    type: "postgres",
    host: dbHost,
    port: 5432,
    username: Secrets.DB_USER,
    password: Secrets.DB_PASSWORD,
    database: 'dumbbell-test',
    entities: ["dist/api/models/entities/**/*.js"],
    migrations: ["src/api/database/migrations/**/*.ts"],
    dropSchema: true,
    synchronize: true,
    logging: false
}