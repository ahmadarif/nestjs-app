import { IoAdapter } from '@nestjs/websockets';
import * as dotenv from 'dotenv';
import * as redisIoAdapter from 'socket.io-redis';
dotenv.config();

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisIoAdapter({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }));
    return server;
  }
}