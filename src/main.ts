import { Reflector } from '@nestjs/core';
import { ApplicationContext } from './app.context';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';
import { RolesGuard } from './guards/roles.guard';
import { ConfigService } from './modules/config/config.service';
import { RedisIoAdapter } from './sockets/redis-io.adapter';

async function bootstrap() {
  const app = await ApplicationContext();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(app.get(ConfigService).get('APP_PORT'));
}

bootstrap();