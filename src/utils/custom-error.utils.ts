import { IError } from "src/constants/interfaces/errors.interface";

class CustomError extends Error {
    constructor(public error: IError) {
        super(error.message);
        this.name = error.statusCode;
    }
}

export { CustomError }