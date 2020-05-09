import Constants from "../../constants";

export default class InvalidUsernameFormat extends Error {
    constructor() {
        super(Constants.INVALID_USERNAME_FORMAT);
    }
}