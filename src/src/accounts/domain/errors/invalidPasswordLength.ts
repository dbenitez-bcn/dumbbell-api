import Constants from "../../constants";

export default class InvalidPasswordLength extends Error {
    constructor() {
        super(Constants.INVALID_PASSWORD_LENGTH);
    }
}