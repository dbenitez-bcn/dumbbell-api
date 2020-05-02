import { Constants } from "../../config/constants";

export default class DatabaseFailure  extends Error {
    constructor() {
        super(Constants.DATABASE_ACCESS_FAILED);
    }
}