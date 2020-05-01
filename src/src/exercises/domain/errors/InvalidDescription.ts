import { Constants } from "../../config/constants";

export default class InvalidDescription extends Error {
    constructor() {
        super(Constants.INVALID_DESCRIPTION_PARAM);
    }
}