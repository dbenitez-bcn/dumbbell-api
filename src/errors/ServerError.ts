import { DumbbellError } from "./DumbbellError";
class ServerError extends DumbbellError {
    constructor(code: number, message: string) {
        super(code, message)
    }
}