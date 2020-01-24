import { Pool } from "pg";
import { when, mock, anyString, instance } from "ts-mockito";
import { DumbbellDatabase } from "../../../models/database/dumbbellDatabase";
import { getExercises, createExercise } from "./exercisesProvider";

beforeEach(setUpDatabaseMock);

describe("ExerciseProvider", () => {
    describe("Get all exercises", () => {
        test("Should return all exercises", async () => {
            const result = await getExercises();
            expect(result).toEqual(["testResult"]);
        });
    });
    describe("Create exercise", () => {
        test("Should return the created exercise", async () => {
            const result = await createExercise("testName", "testDescription");
            expect(result).toBe("testResult");
        });
    });
});

function setUpDatabaseMock() {
    const poolMock: Pool = mock(Pool);
    when(poolMock.query(anyString())).thenReturn({ rows: ["testResult"] });
    const database = instance(poolMock);
    DumbbellDatabase.buildMockDatabase(database);
}
