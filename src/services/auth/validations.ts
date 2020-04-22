import { validate } from "class-validator";
import LoginRequest from "../../models/requests/loginRequest";
import { LoginBody } from "../../models/bodies/loginBody";
import { Constants } from "../../config/constants";

export const parseLoginBody = async (body: LoginBody): Promise<LoginRequest> => {
    const request = new LoginRequest(body.email, body.password);
    const errors = await validate(request);
    if (errors.length > 0) {
        if (errors[0].constraints['isNotEmpty']) {
            if (errors[0].property == 'email') {
                throw new Error(Constants.MISSING_EMAIL);
            } else {
                throw new Error(Constants.MISSING_PASSWORD);
            }
        } else {
            throw new Error(Constants.INVALID_EMAIL_PARAM);
        }
    }
    return request;
}