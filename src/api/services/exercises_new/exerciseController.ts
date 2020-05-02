import { Request, Response } from "express";
import ExerciseService from "../../../src/exercises/services/exerciseService";
import InvalidName from "../../../src/exercises/domain/errors/InvalidName";
import InvalidDescription from "../../../src/exercises/domain/errors/InvalidDescription";
import InvalidDifficulty from "../../../src/exercises/domain/errors/InvalidDifficulty";

export default class ExerciseController {
    constructor(private service: ExerciseService) { }

    async create(req: Request, res: Response) {
        try {
            const id = await this.service.create(req.body.name, req.body.description, req.body.difficulty);
            res.status(201).send(id);
        } catch (e) {
            if (this.isParamError(e)) {
                res.status(422).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    }

    private isParamError(e: Error): boolean {
        return e instanceof InvalidName || e instanceof InvalidDescription || e instanceof InvalidDifficulty;
    }
}