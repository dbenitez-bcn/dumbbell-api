import { Router } from "express";
import { Endpoints } from "../../config/constants";
import UsersController from "./usersController";
import DIContainer from "../../../core/iot/inversify.config";

const controller = DIContainer.get<UsersController>(UsersController);


const router = Router();

router.post(
    Endpoints.REGISTER,
    controller.registration.bind(controller)
)

export default router;