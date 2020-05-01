import { IsNotEmpty, IsEmail } from "class-validator";

export default class LoginRequest {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}