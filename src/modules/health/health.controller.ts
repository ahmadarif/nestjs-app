import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {

  @Get()
  check(): any {
    return { status: 'UP', uptime: process.uptime(), started: new Date().toISOString() };
  }
  
}
