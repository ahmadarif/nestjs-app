import { DynamicModule, Module } from '@nestjs/common';
import { HealthModuleOptions } from './health-module-options.interface';
import { HealthController } from './health.controller';

@Module({})
export class HealthModule {
  static forRoot(option: HealthModuleOptions): DynamicModule {
    const endpoint = option.endpoint || 'health';
    Reflect.defineMetadata('path', endpoint, HealthController);

    return {
      module: HealthModule,
      controllers: [HealthController],
    };
  }
}
