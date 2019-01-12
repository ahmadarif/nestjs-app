import { Injectable, MiddlewareFunction, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return async (req: any, res: any, next) => {
      console.log('Logger fired!');
      console.log("Body=", req.bodyUsed);
      // return res.send({ message: 'asas' });

      next();
    };
  }
}