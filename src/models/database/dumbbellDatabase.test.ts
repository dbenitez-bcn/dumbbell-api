import { DumbbellDatabase } from "./dumbbellDatabase";
import { Pool } from "pg";

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

    it ("Should destroy the instance", () => {
        const firstDatabase: Pool = new Pool();
        DumbbellDatabase.buildMockDatabase(firstDatabase);

        DumbbellDatabase.destroy();

        expect(firstDatabase).not.toEqual(DumbbellDatabase.database());
    })
});