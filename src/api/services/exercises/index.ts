import { Router } from "express";
import ExerciseController from "./exerciseController";
import TypeormExerciseRepository from "../../../src/exercises/infrastructure/typeormExerciseRepository";
import ExerciseService from "../../../src/exercises/services/exerciseService";
import { Endpoints } from "../../config/constants";

const repo = new TypeormExerciseRepository();
const service = new ExerciseService(repo);
const controller = new ExerciseController(service);

const router = Router();

router.get(
    Endpoints.EXERCISES,
    controller.getAll.bind(controller)
);

router.post(
    Endpoints.EXERCISE,
    controller.create.bind(controller)
);

router.get(
    Endpoints.EXERCISE + "/:id",
    controller.getById.bind(controller)
);

router.delete(
    Endpoints.EXERCISE + "/:id",
    controller.delete.bind(controller)
);

router.put(
    Endpoints.EXERCISE + "/:id",
    controller.update.bind(controller)
);

export default router;