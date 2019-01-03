import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException, BadGatewayException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      return response.json(exception.getResponse());
    } else if (exception instanceof BadGatewayException) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    return response.json(exception.getResponse());
  }
}