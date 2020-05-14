import { Router } from "express";
import { Wrapper } from "../models/types";

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};