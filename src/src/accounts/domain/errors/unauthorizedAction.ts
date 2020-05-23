import Constants from "../../constants";

export default class UnauthorizedAction extends Error {
    constructor() {
        super(Constants.UNAUTHORIZED);
    }
}