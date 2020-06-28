import Username from "../valueObject/username";
import UserRole from "../valueObject/userRole";

export default class User {
    constructor(username: string, role: string) {
        this.username = new Username(username);
        switch(role) {
            case UserRole.USER:
                this.role = UserRole.USER
            case UserRole.OPERATOR:
                this.role = UserRole.OPERATOR
            default:
                this.role = UserRole.USER
        }
    }

    readonly username: Username;
    readonly role: UserRole;
}