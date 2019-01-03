import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../../entities/photo';
import { Profile } from '../../entities/profile';
import { User } from '../../entities/user';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        synchronize: true,
        keepConnectionAlive: true,
        entities: [__dirname + '../../../entities/*{.ts,.js}']
      })
    }),
    TypeOrmModule.forFeature([
      User,
      Profile,
      Photo,
    ]),
  ],
})
export class DatabaseModule {}
