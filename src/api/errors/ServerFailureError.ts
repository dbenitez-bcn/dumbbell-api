import { DumbbellError } from "./DumbbellError";
export class ServerFailureError extends DumbbellError {
    constructor(code: number, message: string) {
        super(code, message)
    }
}