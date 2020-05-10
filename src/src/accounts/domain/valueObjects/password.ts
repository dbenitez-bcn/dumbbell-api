import bycrypt from 'bcryptjs';
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
        this.value = bycrypt.hashSync(value, 10);
    }

    readonly value: string;

    compare(password: string) {
        return bycrypt.compareSync(password, this.value);
    }
}