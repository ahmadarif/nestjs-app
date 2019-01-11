import { Module } from '@nestjs/common';
import { PhotoController } from './controllers/photo.controller';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { PhotoService } from './services/photo.service';
import { SocketsModule } from './sockets/sockets.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    HealthModule,
    SocketsModule,
  ],
  controllers: [
    PhotoController,
  ],
  providers: [
    PhotoService
  ],
})
export class AppModule {}
