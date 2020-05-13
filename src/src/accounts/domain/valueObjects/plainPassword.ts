import bycrypt from 'bcryptjs';
import InvalidPasswordLength from "../errors/invalidPasswordLength";
import InvalidPasswordFormat from "../errors/invalidPasswordFormat";
import Password from './password';
import HashedPassword from './hashedPassword';

export default class PlainPassword extends Password {
    constructor(value: string) {
        if (value.length < 8) {
            throw new InvalidPasswordLength();
        }
        if (!/^(?=.*?[a-zA-z])(?=.*?[0-9]).{1,}$/.test(value)) {
            throw new InvalidPasswordFormat();
        }
        super(value);
    }

    hash() {
        const hashedPassword = bycrypt.hashSync(this.value, 10);
        return new HashedPassword(hashedPassword);
    }
}