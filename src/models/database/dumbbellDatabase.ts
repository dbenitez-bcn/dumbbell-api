import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export class DumbbellDatabase {
    private static instance?: DumbbellDatabase;

    private constructor(
        private _database: Pool
    ) { }

    static database(): Pool {
        if (this.instance != undefined) return this.instance._database;
        else return new DumbbellDatabase(defaultDatabase)._database;
    }

    static buildMockDatabase(database: Pool) {
        this.instance = new DumbbellDatabase(database);
    }

    static destroy() {
        if (this.instance != undefined) this.instance = undefined;
    }
}

export function getDatabaseHost() {
    switch (process.env.APP_ENV) {
        case 'dev':
            return process.env.DB_HOST_DEV;
        case 'alpha':
            return process.env.DB_HOST_ALPHA;
        default:
            return process.env.DB_HOST_DEV;
    }
}

const defaultDatabase: Pool = new Pool({
    user: process.env.DB_USER,
    host: getDatabaseHost(),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432
});