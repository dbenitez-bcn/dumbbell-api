import { Constants } from "../../config/constants";

export default class InvalidName extends Error {
    constructor() {
        super(Constants.INVALID_NAME_PARAM);
    }
}