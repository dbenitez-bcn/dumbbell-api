import Constants from "../../constants/constants";

export default class UnauthorizedAction extends Error {
    constructor() {
        super(Constants.UNAUTHORIZED);
    }
}