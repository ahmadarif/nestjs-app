import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import Response from '../class/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Response<string[]> {
    const res = new Response<string[]>();
    res.message = 'Ok';
    res.data = [...this.appService.getHello()];
    return res;
  }
}
