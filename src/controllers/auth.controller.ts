import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(AuthGuard())
  profile(@Req() req) {
    return req.user;
  }
}