import InvalidCreatedBy from "../errors/InvalidCreatedBy";

export default class CreatedBy {
    constructor(value: string) {
        if (!value) {
            throw new InvalidCreatedBy();
        }
        this.value = value;
    }

    readonly value: string;
}