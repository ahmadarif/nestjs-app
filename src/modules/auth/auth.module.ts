import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [
    HttpStrategy,
    AuthService,
    UserService,
  ],
})
export class AuthModule {}