import { Router, Request, Response, NextFunction } from "express";

export { Wrapper, Handler, Route }

type Wrapper = ((router: Router) => void);

type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

type Route = {
    path: string;
    method: string;
    handler: Handler | Handler[];
};
