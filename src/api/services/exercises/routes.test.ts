import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";


describe("ExercisesController", () => {
    let router: Router;

    beforeEach(() => {
        router = express();
        applyMiddleware(middleware, router);
        applyRoutes(routes, router);
        applyMiddleware(errorHandlers, router);
    });

    it("Should return 'Method not found.' message when wrong endpoint called", async () => {
        const response = await request(router).get("/imposible-endpoint")

        expect(response.status).toEqual(404);
        expect(response.text).toEqual("Method not found.");
    });
});