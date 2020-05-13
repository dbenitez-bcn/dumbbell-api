import { Constants } from "../../config/constants";

export default class InvalidExerciseId extends Error {
    constructor() {
        super(Constants.INVALID_ID)
    }
}