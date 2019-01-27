import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from '../guards/roles.guard';

@Controller('guard')
export class GuardController {

  @Get('none')
  async guard1() {
    return 'guard 1';
  }

  @Get('with')
  async guard2() {
    return 'guard 2';
  }

  @Roles('admin')
  @Get('role/1')
  async role1(@Req() req) {
    return { role: req.roles };
  }

  @Get('role/2')
  async role2(@Req() req) {
    return { role: req.roles || [] };
  }

  @Roles('user')
  @Get('role/3')
  async role3(@Req() req) {
    return { role: req.roles };
  }
}
