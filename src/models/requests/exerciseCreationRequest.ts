import { Constants } from "../../config/constants";

export default class ExerciseCreationRequest {
    constructor(name: string, description: string, difficulty: number) {
        if (!name) {
            throw new Error(Constants.INVALID_NAME_PARAM);
        }
        if (!description) {
            throw new Error(Constants.INVALID_DESCRIPTION_PARAM);
        }
        if (difficulty < 1 || difficulty > 10) {
            throw new Error(Constants.INVALID_DIFFICULTY_PARAM);
        }

        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
    }

    readonly name: string;

    readonly description: string;

    readonly difficulty: number;
}