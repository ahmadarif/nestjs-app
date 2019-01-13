import { Injectable } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { User } from "../../entities/user";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    // private readonly connection: Connection,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async findOneByToken(token: string): Promise<any> {
    // return await this.connection
    //   .getRepository(User)
    //   .createQueryBuilder('user')
    //   .where({ name: token })
    //   .leftJoinAndSelect('user.profile', 'profile')
    //   .getOne();

    return await this.userRepository.findOne({
      where: {name: token},
      relations: ['profile']
    });
  }
}