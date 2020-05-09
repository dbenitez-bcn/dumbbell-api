import Constants from "../../constants";

export default class InvalidUsernameLength extends Error {
    constructor() {
        super(Constants.INVALID_USERNAME_LENGTH);
    }
}