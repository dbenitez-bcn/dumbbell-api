import { Request, Response, NextFunction, Router } from "express";

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    res.status(404).send("Method not found.")
  });
};

export default [handle404Error];