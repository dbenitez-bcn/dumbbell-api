import InvalidDifficulty from "../../errors/InvalidDifficulty";

export default class Difficulty {
    constructor(value: number) {
        if (value < 1 || value > 10) {
            throw new InvalidDifficulty();
        }
        this.value = value;
    }

    readonly value: number;
} 