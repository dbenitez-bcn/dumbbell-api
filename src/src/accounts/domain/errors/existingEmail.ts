import Constants from "../../constants";

export default class ExistingEmail extends Error {
    constructor() {
        super(Constants.EMAIL_ALREADY_EXIST);
    }
}