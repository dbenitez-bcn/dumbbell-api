import InvalidPasswordLength from "../errors/invalidPasswordLength";
import InvalidPasswordFormat from "../errors/invalidPasswordFormat";

export default class Password {
    constructor(value: string) {
        if (value.length < 8) {
            throw new InvalidPasswordLength();
        }
        if (!/^(?=.*?[a-zA-z])(?=.*?[0-9]).{1,}$/.test(value)) {
            throw new InvalidPasswordFormat();
        }
        this.value = value;
    }

    readonly value: string;
}