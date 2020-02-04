import { Request, Response, NextFunction } from "express"
import { Constants } from "../../../config/constants";
import { Middleware } from "../../../models/types";

export const exerciceValidator: Middleware = (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    const id = req.url.split('/')[1];
    const validParams = validateParams(params);
    
    switch(req.method) {
        case "GET":
            if (!parseInt(id)) {
                return res.status(422).send(Constants.INVALID_ID)
            }
            break;
        case "POST":
            if (validParams !== null) {
                return res.status(422).send(validParams)
            }
            break;
        case "DELETE":
            if (!parseInt(id)) {
                return res.status(422).send(Constants.INVALID_ID)
            }
            break;
        case "PUT":
            if (!parseInt(id)) {
                return res.status(422).send(Constants.INVALID_ID)
            }
            if (validParams !== null) {
                return res.status(422).send(validParams)
            }
            break;
    }

    next();
}

function validateParams(params: any): String | null {
    if (hasMissingParams(params)) {
        return Constants.MISSING_PARAMS;
    } else {
        if(params.name.length == 0) {
            return Constants.INVALID_NAME_PARAM
        }
        if(params.description.length == 0) {
            return Constants.INVALID_DESCRIPTION_PARAM
        }
        if(!isValidDifficultty(params.difficulty)) {
            return Constants.INVALID_DIFFICULTY_PARAM
        }
    }

    return null;
}

function hasMissingParams(params: any): Boolean {
    return params.name == null || params.description == null || params.difficulty == null;
}

function isValidDifficultty(difficulty: any): Boolean {
    return Number.isInteger(difficulty) && difficulty > 1 && difficulty < 10
}