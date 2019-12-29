import { Router } from "express";
import { Wrapper, Route } from "./types";

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};