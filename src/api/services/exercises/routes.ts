import { Router } from "express";
import ExerciseController from "./exerciseController";
import { Endpoints } from "../../config/constants";
import DIContainer from "../../config/inversify.config";

const controller = DIContainer.get<ExerciseController>(ExerciseController);

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