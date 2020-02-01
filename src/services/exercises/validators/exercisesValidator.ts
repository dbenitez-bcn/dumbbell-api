import { Request, Response, NextFunction } from "express"
import { Constants } from "../../../config/constants";
import { Middleware } from "../../../models/types";

export const exerciceValidator: Middleware = (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    switch(req.method) {
        case "GET":
            break;
        case "POST":
            // TODO: Check each field and return specific errors
            if (params.name == null || params.description == null || params.difficulty == null) {
                return res.status(422).send(Constants.MISSING_PARAMS);
            }
            break;
    }

    next();
}