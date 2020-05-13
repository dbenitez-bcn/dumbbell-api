import Username from "../valueObjects/username";
import Email from "../valueObjects/email";
import Password from "../valueObjects/password";
import PlainPassword from "../valueObjects/plainPassword";

export default class User {
    constructor(username: string, email: string, password: string) {
        this.username = new Username(username);
        this.email = new Email(email);
        this._password = new PlainPassword(password);
    }

    readonly username: Username;
    readonly email: Email;
    private _password: Password;

    get password() {
        return this._password
    }
    
    hashPassword() {
        if (this._password instanceof PlainPassword) {
            this._password = this._password.hash();
        }
    }
}