import Constants from "../../constants";

export default class InvalidEmail extends Error {
    constructor() {
        super(Constants.INVALID_EMAIL);
    }
}