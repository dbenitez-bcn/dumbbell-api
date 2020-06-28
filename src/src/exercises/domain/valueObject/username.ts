import InvalidCreatedBy from "../errors/InvalidCreatedBy";
import InvalidUsername from "../errors/InvalidUsername";

export default class Username {
    constructor(value: string) {
        if (!value) {
            throw new InvalidUsername();
        }
        this.value = value;
    }

    readonly value: string;
}