import { Injectable, CanActivate, ExecutionContext, ReflectMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const Auth = () => ReflectMetadata('Auth', null);

@Injectable()
export class AuthGuard implements CanActivate {
  name: string;

  // constructor(private readonly reflector: Reflector) {}
  constructor(name: string) {
    this.name = name;
  }
  
  canActivate(context: ExecutionContext) : boolean {
    console.log('AuthGuard name =', this.name);
    // const auth = this.reflector.get('Auth', context.getHandler());
    // if (!auth) {
    //   return true;
    // }

    console.log('auth dipanggil');
    return true;
  }
}