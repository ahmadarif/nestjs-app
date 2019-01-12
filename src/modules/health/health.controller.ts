import { Controller, Get } from '@nestjs/common';
import * as moment from 'moment';

@Controller()
export class HealthController {

  @Get()
  check(): any {
    const started = moment().subtract(process.uptime(), 'second');
    return { status: 'UP', uptime: process.uptime(), started: started };
  }

}
