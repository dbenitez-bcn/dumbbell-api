import { DumbbellError } from "./DumbbellError";
class BadParamsError extends DumbbellError {
    constructor(code: number, message: string) {
        super(code, message)
    }
}