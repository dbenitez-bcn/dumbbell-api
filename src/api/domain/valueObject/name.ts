import InvalidName from "../../errors/InvalidName";

export default class Name {
    constructor(value: string) {
        if (!value) {
            throw new InvalidName();
        }
        this.value = value;
    }

    readonly value: string;
} 