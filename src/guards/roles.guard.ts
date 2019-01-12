import { CanActivate, ExecutionContext, Injectable, ReflectMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PhotoService } from '../services/photo.service';

export const Roles = (...roles: string[]) => ReflectMetadata('Roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private photoService: PhotoService
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('Roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    request.roles = roles;

    console.log('Roles =', roles);

    const photos = await this.photoService.findAll();
    console.log(photos);

    return true;
  }
}