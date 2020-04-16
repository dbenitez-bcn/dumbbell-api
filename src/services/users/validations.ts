import { UserRegistrationBody } from "../../models/bodies/userRegistrationBody";
import { UserRegistrationRequest } from "../../models/requests/userRegistrationRequest";
import { validate } from "class-validator";
import { Constants } from "../../config/constants";

export const parseUserRegistrationBody = async (body: UserRegistrationBody): Promise<UserRegistrationRequest> => {
    const request = new UserRegistrationRequest(body);
    const errors = await validate(request);
    if (errors.length > 0) {
        const key = Object.keys(errors[0].constraints)[0];
        if (key === 'isEmail') throw new Error(Constants.INVALID_EMAIL_PARAM)
        throw new Error(`${errors[0].constraints[key]}`);
    }
    return request;
}