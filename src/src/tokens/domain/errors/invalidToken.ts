import Constants from "../../constants";

export default class InvalidToken extends Error {
    constructor() {
        super(Constants.INVALID_TOKEN);
    }
}