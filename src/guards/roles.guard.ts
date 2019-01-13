import { CanActivate, ExecutionContext, Injectable, ReflectMetadata, HttpException } from '@nestjs/common';
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

    console.log('RoleGuard =', roles);
    
    const request = context.switchToHttp().getRequest();
    request.roles = roles;
    console.log('Request query =', request.query);

    const photos = await this.photoService.findAll();
    // console.log(photos);

    if (roles.indexOf('admin') === -1) {
      throw new HttpException({ message: 'You are not admin.' }, 403);
    }

    return true;
  }
}