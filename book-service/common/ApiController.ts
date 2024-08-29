import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class ApiController {
  responseMessage(status: number, message: string, @Res() res: Response) {
    return res.status(status).send({
      status: status,
      message: message,
    });
  }

  responseData(status: number, data: any, @Res() res: Response) {
    return res.status(status).send({
      status: status,
      data: data,
    });
  }

  responseDataAndMessage(
    status: number,
    message: string,
    data: any,
    @Res() res: Response,
  ) {
    return res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
  }

  responseException(message: string, @Res() res: Response) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message,
    });
  }
}