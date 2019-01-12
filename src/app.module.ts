import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BullModule } from 'nest-bull';
import { PhotoController } from './controllers/photo.controller';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { SampleQueue } from './queues/sample.queue';
import { PhotoService } from './services/photo.service';
import { SocketsModule } from './sockets/sockets.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    HealthModule.forRoot({ endpoint: '/health' }),
    SocketsModule,
    BullModule.forRoot({
      name: 'store',
      options: {
        redis: {
          host: 'localhost',
          port: 6379,
        },
      },
      processors: [
        { name: 'sample', callback: SampleQueue }
      ],
    }),
  ],
  controllers: [
    PhotoController,
  ],
  providers: [
    PhotoService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/health');
  }
}
