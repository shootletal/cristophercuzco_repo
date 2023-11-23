import { IError } from 'src/constants/interfaces/errors.interface';
import { HttpException } from '@nestjs/common';

class CustomError extends HttpException {
  constructor(public error: IError) {
    super(
      { message: error.message, status: error.statusCode },
      error.statusCode,
    );
  }
}

export { CustomError };
