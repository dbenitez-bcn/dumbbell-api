import { Router } from "express";
import { Endpoints } from "../../config/constants";
import AuthController from "./authController";
import DIContainer from "../../../core/iot/inversify.config";

const controller: AuthController = DIContainer.get<AuthController>(AuthController);

const router = Router();

router.post(
    Endpoints.LOGIN,
    controller.login.bind(controller)
);

router.post(
    Endpoints.ADMIN + Endpoints.LOGIN,
    controller.loginInAdmin.bind(controller)
);

export default router;