import Username from "../valueObjects/username";
import Email from "../valueObjects/email";
import Password from "../valueObjects/password";
import PlainPassword from "../valueObjects/plainPassword";
import UserRole from "../valueObjects/userRole";

export default class User {
    constructor(username: string, email: string, password: Password, role: UserRole) {
        this.username = new Username(username);
        this.email = new Email(email);
        this._password = password;
        this.role = role
    }

    readonly username: Username;
    readonly email: Email;
    private _password: Password;
    readonly role: UserRole;

    get password() {
        return this._password
    }
    
    hashPassword() {
        if (this._password instanceof PlainPassword) {
            this._password = this._password.hash();
        }
    }

    static newUser(username: string, email: string, password: string): User {
        return new User(username, email, new PlainPassword(password), UserRole.USER);
    }
}