import { Pool } from "pg";
import { DumbbellDatabase } from "./dumbbellDatabase";
import { getDatabaseHost } from "../../utils/getDatabaseHost";

afterEach(() => {
    DumbbellDatabase.destroy();
});

describe("DumbbellDatabase", () => {
    it("Should construct from a default database", () => {
        expect(DumbbellDatabase.database()).not.toBeUndefined()
    });

    it("Should create a database from a custom pool", () => {
        const pool: Pool = new Pool();
        DumbbellDatabase.buildMockDatabase(pool);

        expect(DumbbellDatabase.database()).toBe(pool)
    });

    it("Should return the same database", () => {
        const firstDatabase = DumbbellDatabase.database();

        expect(firstDatabase).toBe(DumbbellDatabase.database())
    });

    it("Should destroy the instance", () => {
        const firstDatabase: Pool = new Pool();
        DumbbellDatabase.buildMockDatabase(firstDatabase);

        DumbbellDatabase.destroy();

        expect(firstDatabase).not.toEqual(DumbbellDatabase.database());
    });

    it("Should return dev host when app env is dev", () => {
        process.env.APP_ENV = 'dev';
        process.env.DB_HOST_DEV = 'expected';
        
        const result = getDatabaseHost();

        expect(result).toBe('expected');
    });

    it("Should return alpha host when app env is alpha", () => {
        process.env.APP_ENV = 'alpha';
        process.env.DB_HOST_ALPHA = 'expected';
        
        const result = getDatabaseHost();

        expect(result).toBe('expected');
    });
});