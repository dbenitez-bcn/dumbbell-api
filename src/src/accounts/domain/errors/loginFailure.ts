import Constants from "../../constants";

export default class LoginFailure extends Error {
    constructor() {
        super(Constants.LOGIN_FAILURE);
    }
}