import { UserRegistrationBody } from "../bodies/userRegistrationBody";
import { MinLength, Matches, IsEmail } from 'class-validator';
import { Constants } from "../../config/constants";

export class UserRegistrationRequest {
    constructor(body: UserRegistrationBody) {
        this.username = body.username;
        this.email = body.email;
        this.password = body.password;
    }

    @MinLength(4, {
        message: Constants.INVALID_USERNAME_LENGTH
    })
    @Matches(RegExp('^[a-zA-Z0-9-_]*$'), {
        message: Constants.INVALID_USERNAME_CHARACTERS
    })
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @MinLength(8, {
        message: Constants.INVALID_PASSWORD_LENGTH
    })
    @Matches(RegExp('^([a-zA-Z]+[0-9]+)$'), {
        message: Constants.INVALID_PASSWORD_FORMAT
    })
    readonly password: string;
}