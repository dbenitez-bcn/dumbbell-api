import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";
import { Endpoints } from "../config/constants";

export const handleAPIDocs = (router: Router) =>
  router.use(Endpoints.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));