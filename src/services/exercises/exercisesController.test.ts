import express, { Router } from "express";
import request from "supertest";
import { when, mock, anyString, instance } from "ts-mockito";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";
import { DumbbellDatabase } from "../../models/database/dumbbellDatabase";
import { Pool } from "pg";
import { Constants } from "../../config/constants";


describe("ExercicesController", () => {
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

            const response = await request(router).get("/exercises")

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(["testResult"]);
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router).get("/exercises");

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });

        it("Should return a notFound when no results are returned", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router).get("/exercises");

            expect(response.status).toEqual(404);
            expect(response.text).toEqual(Constants.NO_EXERCICES_FOUND);
        });

    });
    describe("Create exercise", () => {
        const params = {
            name: "a name",
            description: "a description"
        };

        it("Should return a success response", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenReturn({ rows: [params] });
            DumbbellDatabase.buildMockDatabase(instance(poolMock))

            const response = await request(router)
                .post("/exercise")
                .send(params)

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                name: "a name",
                description: "a description"
            });
        });

        it("Should return an error when a serverException is thrown", async () => {
            const poolMock: Pool = mock(Pool);
            when(poolMock.query(anyString())).thenThrow(new Error());
            DumbbellDatabase.buildMockDatabase(instance(poolMock));

            const response = await request(router)
                .post("/exercise")
                .send(params)

            expect(response.status).toEqual(500);
            expect(response.text).toEqual(Constants.DATABASE_ACCESS_FAILED);
        });

        it("Should return a unsuccess response when non params are send", async () => {
            const response = await request(router)
                .post("/exercise")
                .send({})

            expect(response.status).toEqual(422);
            expect(response.text).toEqual(Constants.MISSING_PARAMS);
        });
    });
});