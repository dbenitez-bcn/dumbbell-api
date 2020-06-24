import { ConnectionOptions } from "typeorm";
import { getDatabaseHost } from "../utils/getDatabaseHost";
import Secrets from "../../core/secrets";

const dbHost = getDatabaseHost(Secrets.APP_ENV);

export const testConnection: ConnectionOptions = {
    type: "postgres",
    host: dbHost,
    port: 5432,
    username: Secrets.DB_USER,
    password: Secrets.DB_PASSWORD,
    database: 'template1',
    entities: ["dist/src/exercises/infrastructure/typeorm/entities/exercise.js", "dist/src/accounts/infrastructure/typeorm/entities/user.js"],
    dropSchema: true,
    synchronize: true,
    logging: false
}