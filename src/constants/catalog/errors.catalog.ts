import { IError } from '../interfaces/errors.interface';
import { HttpStatus } from '@nestjs/common';

enum ErrorCode {
  E001 = 'E001',
  E002 = 'E002',
  E003 = 'E003',
}

const ERRORS: Record<ErrorCode, IError> = {
  [ErrorCode.E001]: {
    code: ErrorCode.E001,
    message: 'Ocurrió un error inesperado',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.E002]: {
    code: ErrorCode.E002,
    message: 'Codigo de error en el ticket',
    statusCode: HttpStatus.NOT_ACCEPTABLE,
  },
  [ErrorCode.E003]: {
    code: ErrorCode.E003,
    message: 'Error al obtener tickets',
    statusCode: HttpStatus.CONFLICT,
  },
};

export { ERRORS, ErrorCode };
