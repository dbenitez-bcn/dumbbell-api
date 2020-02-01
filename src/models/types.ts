import { Router, Request, Response, NextFunction } from "express";

export { Wrapper, Middleware, Route }

type Wrapper = ((router: Router) => void);

type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

type Route = {
    path: string;
    method: string;
    handler: Middleware | Middleware[];
};
