import { ConnectionOptions } from "typeorm";
import { getDatabaseHost } from "./getDatabaseHost";
import Secrets from "../config/secrets";

const dbHost = getDatabaseHost(Secrets.APP_ENV);

export const ciConnection: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "circleci",
    password: "Passw0rd",
    database: 'circleci',
    entities: ["src/api/models/entities/**/*.ts"],
    dropSchema: true,
    synchronize: true,
    logging: false
}