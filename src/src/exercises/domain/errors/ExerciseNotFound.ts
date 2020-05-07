import { Constants } from "../../config/constants";

export default class ExerciseNotFound extends Error {
    constructor() {
        super(Constants.NO_EXERCISE_FOUND);
    }
}