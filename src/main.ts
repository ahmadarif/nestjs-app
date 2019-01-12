import { ApplicationContext } from './app.context';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';
import { ConfigService } from './modules/config/config.service';
import { RedisIoAdapter } from './sockets/redis-io.adapter';

async function bootstrap() {
  const app = await ApplicationContext();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  
  // convert undefined response field to null
  app.set('json replacer', (_, value) => {
    return typeof value === "undefined" ? null : value;
  });

  await app.listen(app.get(ConfigService).get('APP_PORT'));
}

bootstrap();