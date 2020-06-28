import { Constants } from "../../config/constants";

export default class ExistingUsername extends Error {
    constructor() {
        super(Constants.USERNAME_ALREADY_EXIST);
    }
}