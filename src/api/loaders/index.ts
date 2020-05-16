import { Router } from "express";
import { expressAppLoader } from "./expressAppLoader";
import { routesLoader } from "./routesLoader";

export const init = (app: Router) => {
    expressAppLoader(app);
    routesLoader(app);
}