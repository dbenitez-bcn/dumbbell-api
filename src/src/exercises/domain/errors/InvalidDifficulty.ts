import { Constants } from "../../config/constants";

export default class InvalidDifficulty extends Error {
    constructor() {
        super(Constants.INVALID_DIFFICULTY_PARAM);
    }
}