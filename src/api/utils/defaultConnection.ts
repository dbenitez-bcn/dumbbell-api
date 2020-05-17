import { ConnectionOptions } from "typeorm";
import { getDatabaseHost } from "../utils/getDatabaseHost";
import Secrets from "../config/secrets";

const dbHost = getDatabaseHost(Secrets.APP_ENV);

export const defaultConnection: ConnectionOptions = {
    type: "postgres",
    host: dbHost,
    port: 5432,
    username: Secrets.DB_USER,
    password: Secrets.DB_PASSWORD,
    database: Secrets.DB_DATABASE,
    entities: ["dist/api/models/entities/**/*.js"]
}