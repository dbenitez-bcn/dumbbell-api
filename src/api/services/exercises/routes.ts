import { Router } from "express";
import ExerciseController from "./exerciseController";
import { Endpoints } from "../../config/constants";
import DIContainer from "../../../core/iot/inversify.config";
import TokenMiddleware from "../../middlewares/tokens/tokenMiddleware";

const controller = DIContainer.get<ExerciseController>(ExerciseController);
const middleware = DIContainer.get<TokenMiddleware>(TokenMiddleware);

const router = Router();

router.get(
    Endpoints.EXERCISES,
    controller.getAll.bind(controller)
);

router.post(
    Endpoints.EXERCISE,
    middleware.validateToken.bind(middleware),
    controller.create.bind(controller)
);

router.get(
    Endpoints.EXERCISE + "/:id",
    controller.getById.bind(controller)
);

router.delete(
    Endpoints.EXERCISE + "/:id",
    middleware.validateToken.bind(middleware),
    controller.delete.bind(controller)
);

router.put(
    Endpoints.EXERCISE + "/:id",
    middleware.validateToken.bind(middleware),
    controller.update.bind(controller)
);

export default router;