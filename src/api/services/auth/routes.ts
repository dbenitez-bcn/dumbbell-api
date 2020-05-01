import { Endpoints } from "../../config/constants";
import { loginHandler } from "./authController";

export default [
    {
        path: Endpoints.LOGIN,
        method: 'post',
        handler: loginHandler
    }
]