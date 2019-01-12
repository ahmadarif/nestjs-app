import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "../guards/roles.guard";

@Controller('guard')
export class GuardController {

  @Get('none')
  async guard1() {
    return 'guard 1';
  }
  
  @UseGuards(new AuthGuard('apanih'))
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
    return { role: req.roles };
  }
}