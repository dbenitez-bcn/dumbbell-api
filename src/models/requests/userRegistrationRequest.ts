import { UserRegistrationBody } from "../bodies/userRegistrationBody";
import { MinLength, Matches, IsEmail } from 'class-validator';
import { Constants } from "../../config/constants";

export class UserRegistrationRequest {
    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @MinLength(4, {
        message: Constants.INVALID_USERNAME_LENGTH
    })
    @Matches(RegExp('^[a-zA-Z0-9\-_]*$'), {
        message: Constants.INVALID_USERNAME_CHARACTERS
    })
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @MinLength(8, {
        message: Constants.INVALID_PASSWORD_LENGTH
    })
    @Matches(RegExp('^(?=.*?[a-zA-z])(?=.*?[0-9]).{1,}$'), {
        message: Constants.INVALID_PASSWORD_FORMAT
    })
    readonly password: string;
}