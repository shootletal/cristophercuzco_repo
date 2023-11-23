import { HttpStatus } from '@nestjs/common';

export interface IError {
  message: string;
  code: string;
  statusCode: HttpStatus;
}
