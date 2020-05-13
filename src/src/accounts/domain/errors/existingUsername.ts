import Constants from "../../constants";

export default class ExistingUsername extends Error {
    constructor() {
        super(Constants.USERNAME_ALREADY_EXIST);
    }
}