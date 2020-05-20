import { Router } from "express";
import { Endpoints } from "../../config/constants";
import AuthController from "./authController";
import DIContainer from "../../config/inversify.config";

const controller: AuthController = DIContainer.get<AuthController>(AuthController);

const router = Router();

router.post(
    Endpoints.LOGIN,
    controller.login.bind(controller)
);

export default router;