import { Injectable } from "@nestjs/common";
import { User } from "../../entities/user";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(token: string): Promise<any> {
    return await this.userService.findOneByToken(token);
  }
}