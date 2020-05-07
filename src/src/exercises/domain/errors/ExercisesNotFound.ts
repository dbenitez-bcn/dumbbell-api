import { Constants } from "../../config/constants";

export default class ExercisesNotFound extends Error {
    constructor() {
        super(Constants.NO_EXERCISES_FOUND);
    }
}