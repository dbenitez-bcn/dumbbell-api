import { Endpoints } from "../../config/constants";
import { userRegistrationHandler } from "./usersController";

export default [
    {
        path: Endpoints.REGISTER,
        method: "post",
        handler: userRegistrationHandler
    }
]