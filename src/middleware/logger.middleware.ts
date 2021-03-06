import { Injectable, MiddlewareFunction, NestMiddleware, Logger } from '@nestjs/common';
import { PhotoService } from '../services/photo.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private photoService: PhotoService) {}

  resolve(...args: any[]): MiddlewareFunction {
    return async (req: any, res: any, next) => {
      Logger.log('LoggerMiddleware = ' + req.query);
      // const photos = await this.photoService.findAll();
      // return res.send({ message: 'asas' });

      next();
    };
  }
}