import { Router } from "express";
import ExerciseController from "./exerciseController";
import TypeormExerciseRepository from "../../../src/exercises/infrastructure/typeormExerciseRepository";
import ExerciseService from "../../../src/exercises/services/exerciseService";

const repo = new TypeormExerciseRepository();
const service = new ExerciseService(repo);
const controller = new ExerciseController(service);

const router = Router();

router.post(
    '/',
    controller.create.bind(controller)
);

export default router;