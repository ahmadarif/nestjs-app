import { NestApplication } from '@nestjs/core';
import { IoAdapter } from '@nestjs/websockets';
import * as redisIoAdapter from 'socket.io-redis';
import { ConfigService } from '../modules/config/config.service';

export class RedisIoAdapter extends IoAdapter {
  constructor(private app: NestApplication) {
    super();
  }

  createIOServer(port: number, options?: any): any {
    const host = this.app.get(ConfigService).get('REDIS_HOST');
    const redisPort = this.app.get(ConfigService).getInt('REDIS_PORT');

    const server = super.createIOServer(port, options);
    server.adapter(redisIoAdapter({ host: host, port: redisPort }));
    return server;
  }
}