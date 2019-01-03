import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';
import { RolesGuard } from './guards/roles.guard';
import { RedisIoAdapter } from './sockets/redis-io.adapter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(app.get('ConfigService').getInt('APP_PORT'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
