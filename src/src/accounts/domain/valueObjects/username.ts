import InvalidUsernameLength from "../errors/invalidUsername";
import InvalidUsernameFormat from "../errors/invalidUsernameFormat";

export default class Username {
    constructor(value: string) {
        if (value.length < 4) {
            throw new InvalidUsernameLength();
        }
        if (!new RegExp('^[a-zA-Z0-9\-_]*$').test(value)) {
            throw new InvalidUsernameFormat();
        }
        this.value = value;
    }

    readonly value: string;
}