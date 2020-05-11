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
        this._value = value;
    }

    private _value: string;

    get value(): string {
        return this._value;
    }

    hash() {
        this._value = bycrypt.hashSync(this._value, 10);
    }

    compare(password: string) {
        return bycrypt.compareSync(password, this._value);
    }
}