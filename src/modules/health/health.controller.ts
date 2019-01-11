import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check(): any {
    return { status: 'UP', uptime: process.uptime(), started: new Date().toISOString() };
  }
}
