import { Router, Request, Response, NextFunction } from "express";

export { Wrapper, Middleware }

type Wrapper = ((router: Router) => void);

type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void | Response;
