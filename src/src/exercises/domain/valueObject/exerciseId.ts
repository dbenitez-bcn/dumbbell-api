import InvalidExerciseId from "../errors/InvalidExerciseId";

export default class ExerciseId {
    constructor(value: number) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new InvalidExerciseId();
        }
        this.value = value;
    }

    readonly value: number
}