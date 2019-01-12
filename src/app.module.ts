import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BullModule } from 'nest-bull';
import { PhotoController } from './controllers/photo.controller';
import { QueueController } from './controllers/queue.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { SampleQueue } from './queues/sample.queue';
import { PhotoService } from './services/photo.service';
import { SocketsModule } from './sockets/sockets.module';
import { GuardController } from './controllers/guard.controller';

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
    GuardController,
    QueueController
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
