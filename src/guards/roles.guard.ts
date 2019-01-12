import { CanActivate, ExecutionContext, Injectable, ReflectMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => ReflectMetadata('Roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('Roles', context.getHandler());
    console.log('Roles =', roles);
    
    const request = context.switchToHttp().getRequest();
    request.roles = roles;

    if (!roles) {
      return true;
    }
    return true;
  }
}