import { Constants } from "../../config/constants";

export default class InvalidUsername extends Error {
    constructor() {
        super(Constants.INVALID_USERNAME);
    }
}