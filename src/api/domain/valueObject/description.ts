import InvalidDescription from "../../errors/InvalidDescription";

export default class Description {
    constructor(value: string) {
        if (!value) {
            throw new InvalidDescription();
        }
        this.value = value;
    }

    readonly value: string;
} 