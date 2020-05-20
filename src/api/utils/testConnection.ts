import { ConnectionOptions } from "typeorm";
import { getDatabaseHost } from "../utils/getDatabaseHost";
import Secrets from "../config/secrets";

const dbHost = getDatabaseHost(Secrets.APP_ENV);

export const testConnection: ConnectionOptions = {
    type: "postgres",
    host: dbHost,
    port: 5432,
    username: Secrets.DB_USER,
    password: Secrets.DB_PASSWORD,
    database: 'template1',
    entities: ["dist/api/models/entities/**/*.js"],
    dropSchema: true,
    synchronize: true,
    logging: false
}