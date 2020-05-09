import Username from "../valueObjects/username";
import Email from "../valueObjects/email";
import Password from "../valueObjects/password";

export default class User {
    constructor(username: string, email: string, password: string) {
        this.username = new Username(username);
        this.email = new Email(email);
        this.password = new Password(password);
    }

    readonly username: Username;
    readonly email: Email;
    readonly password: Password;
}