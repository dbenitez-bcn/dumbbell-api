import { Constants } from "../../config/constants";

export default class InvalidCreatedBy extends Error {
    constructor() {
        super(Constants.INVALID_USERNAME);
    }
}