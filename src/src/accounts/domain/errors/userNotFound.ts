import Constants from "../../constants";

export default class UserNotFound extends Error {
    constructor() {
        super(Constants.USER_NOT_FOUND);
    }
}