import bycrypt from 'bcryptjs';
import Password from './password';

export default class HashedPassword extends Password {
    constructor(value: string) {
        super(value);
    }

    isEqualTo(password: string) {
        return bycrypt.compareSync(password, this.value);
    }
}