import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class ApiController {
  protected responseMessage(status: number, message: string, @Res() res: Response) {
    res.status(status).send({
      status: status,
      message: message,
    });
  }

  protected responseData(status: number, data: any, @Res() res: Response) {
    res.status(status).send({
      status: status,
      data: data,
    });
  }

  protected responseDataAndMessage(
    status: number,
    message: string,
    data: any,
    @Res() res: Response,
  ) {
    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
  }

  protected responseException(message: string, @Res() res: Response) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message,
    });
  }
}