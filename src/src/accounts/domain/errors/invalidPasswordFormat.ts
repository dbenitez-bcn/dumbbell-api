import Constants from "../../constants";

export default class InvalidPasswordFormat extends Error {
    constructor() {
        super(Constants.INVALID_PASSWORD_FORMAT);
    }
}