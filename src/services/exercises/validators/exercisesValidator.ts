import { Request, Response, NextFunction } from "express"
import { Constants } from "../../../config/constants";
import { Middleware } from "../../../models/types";
import { isNumber } from "util";

export const exerciceValidator: Middleware = (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    const id = req.url.split('/')[1];
    const hasValidParams = getErrorMessageOrPassValidation(params);
    
    switch(req.method) {
        case "GET":
            if (!parseInt(id)) {
                return res.status(422).send(Constants.INVALID_ID)
            }
            break;
        case "POST":
            if (hasValidParams !== true) {
                return res.status(422).send(hasValidParams)
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
            if (hasValidParams !== true) {
                return res.status(422).send(hasValidParams)
            }
            break;
    }

    next();
}

function getErrorMessageOrPassValidation(params: any): String | Boolean {
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

    return true;
}

function hasMissingParams(params: any): Boolean {
    return params.name == null || params.description == null || params.difficulty == null;
}

function isValidDifficultty(difficulty: any): Boolean {
    return isNumber(Number(difficulty)) && difficulty >= 1 && difficulty <= 10
}