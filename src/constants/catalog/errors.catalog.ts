import { IError } from "../interfaces/errors.interface";

enum ErrorCode {
    E001 = "E001",
}

const ERRORS: Record<ErrorCode, IError> = {
    [ErrorCode.E001]: {
        code: ErrorCode.E001,
        message: "Ocurrió un error inesperado",
        statusCode: "Internal server error"
    }
}


export { ERRORS, ErrorCode };