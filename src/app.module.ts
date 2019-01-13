import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from 'nest-bull';
import { GuardController } from './controllers/guard.controller';
import { PhotoController } from './controllers/photo.controller';
import { QueueController } from './controllers/queue.controller';
import { RolesGuard } from './guards/roles.guard';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { SampleQueue } from './queues/sample.queue';
import { PhotoService } from './services/photo.service';
import { SocketsModule } from './sockets/sockets.module';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    HealthModule.forRoot({ endpoint: '/health' }),
    AuthModule,
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
    QueueController,
    AuthController,
  ],
  providers: [
    PhotoService,
    { provide: APP_GUARD, useClass: RolesGuard }, // apply guard for this module
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
