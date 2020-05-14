import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import servicesRoutes from "../services";
import { methodNotFound } from "./methodNotFoundLoader";
import swaggerDocument from "../config/swagger.json";
import { Endpoints } from "../config/constants";

export const routesLoader = (app: Router) => {
    app.use(servicesRoutes);
    app.use(Endpoints.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(methodNotFound);
}