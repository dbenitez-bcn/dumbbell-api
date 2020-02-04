import express, { Router } from "express";
import request from "supertest";
import { when, mock, anyString, instance } from "ts-mockito";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";
import { DumbbellDatabase } from "../../models/database/dumbbellDatabase";
import { Pool } from "pg";
import { Constants, Endpoints } from "../../config/constants";


describe("ExercisesController", () => {
    let router: Router;

    beforeEach(() => {
        router = express();
        applyMiddleware(middleware, router);
        applyRoutes(routes, router);
        applyMiddleware(errorHandlers, router);
    });

    afterEach(() => {
        DumbbellDatabase.destroy();
    });

    describe("Get all exercises", () => {
        it("Should return a success response", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: ["testResult"] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock))

            const response = await request(router).get(Endpoints.EXERCISES)

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(["testResult"]);
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router).get(Endpoints.EXERCISES);

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });

        it("Should return a notFound when no results are returned", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router).get(Endpoints.EXERCISES);

            expect(response.status).toEqual(404);
            expect(response.text).toEqual(Constants.NO_EXERCISES_FOUND);
        });

    });
    describe("Create exercise", () => {
        const params = {
            name: "a name",
            description: "a description",
            difficulty: 5
        };

        it("Should return a success response", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [params] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock))

            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send(params)

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                name: "a name",
                description: "a description",
                difficulty: 5
            });
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send(params)

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });

        it("Should return a unsuccess response when non params are send", async () => {
            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send({})

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.MISSING_PARAMS);
        });

        it("Should return a unsuccess response with message when empty name is send", async () => {
            const noNameParams = {
                name: "",
                description: "a description",
                difficulty: 5
            };

            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_NAME_PARAM);
        });

        it("Should return a unsuccess response with message when empty description is send", async () => {
            const noNameParams = {
                name: "a name",
                description: "",
                difficulty: 5
            };

            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_DESCRIPTION_PARAM);
        });

        it("Should return a unsuccess response with message when difficulty invalid is send", async () => {
            const noNameParams = {
                name: "a name",
                description: "a description",
                difficulty: 100
            };

            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_DIFFICULTY_PARAM);
        });

        it("Should return a unsuccess response with message when difficulty invalid is send", async () => {
            const noNameParams = {
                name: "a name",
                description: "a description",
                difficulty: "a difficulty"
            };

            const response = await request(router)
                .post(Endpoints.EXERCISE)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_DIFFICULTY_PARAM);
        });
    });

    describe("Get exercise", () => {
        it("Should return a single exercice when an id is passed", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: ["testResult"] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock))

            const response = await request(router)
                .get(`${Endpoints.EXERCISE}/1`);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual("testResult");
        });

        it("Should return a message when no exercise found", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock))

            const response = await request(router)
                .get(`${Endpoints.EXERCISE}/1`);

            expect(response.status).toEqual(404);
            expect(response.text).toEqual(Constants.NO_EXERCISE_FOUND);
        });

        it("Should return an error when an invalid id is passed", async () => {
            const response = await request(router)
                .get(`${Endpoints.EXERCISE}/invalid`);

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_ID);
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .get(`${Endpoints.EXERCISE}/5`);

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });
    });

    describe("Delete exercise", () => {
        it("Should delete a exercise", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .delete(`${Endpoints.EXERCISE}/5`);

            expect(response.status).toEqual(204);
        });

        it("Should return an error when an invalid id is passed", async () => {
            const response = await request(router)
                .delete(`${Endpoints.EXERCISE}/invalid`);

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_ID);
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .delete(`${Endpoints.EXERCISE}/5`);

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });
    });

    describe("Update exercise", () => {
        const params = {
            name: "a name",
            description: "a description",
            difficulty: 5
        };

        it("Should return a success response", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [params] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock))

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(params)

            expect(response.status).toEqual(204);
        });

        it("Should return an error when an invalid id is passed", async () => {
            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/invalid`);

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_ID);
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(params)

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });

        it("Should return a unsuccess response when non params are send", async () => {
            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send({})

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.MISSING_PARAMS);
        });

        it("Should return a unsuccess response with message when empty name is send", async () => {
            const noNameParams = {
                name: "",
                description: "a description",
                difficulty: 5
            };

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_NAME_PARAM);
        });

        it("Should return a unsuccess response with message when empty description is send", async () => {
            const noNameParams = {
                name: "a name",
                description: "",
                difficulty: 5
            };

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_DESCRIPTION_PARAM);
        });

        it("Should return a unsuccess response with message when difficulty invalid is send", async () => {
            const noNameParams = {
                name: "a name",
                description: "a description",
                difficulty: 100
            };

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_DIFFICULTY_PARAM);
        });

        it("Should return a unsuccess response with message when difficulty invalid is send", async () => {
            const noNameParams = {
                name: "a name",
                description: "a description",
                difficulty: "a difficulty"
            };

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(noNameParams)

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.INVALID_DIFFICULTY_PARAM);
        });

        it("Should return a notFound when no results are returned", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .put(`${Endpoints.EXERCISE}/5`)
                .send(params);

            expect(response.status).toEqual(404);
            expect(response.text).toEqual(Constants.NO_EXERCISE_FOUND);
        });

    })
});