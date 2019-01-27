import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../../entities/user';

@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneByToken(token: string): Promise<any> {
    // return await this.connection
    //   .getRepository(User)
    //   .createQueryBuilder('user')
    //   .where({ name: token })
    //   .leftJoinAndSelect('user.profile', 'profile')
    //   .getOne();

    // return await this.userRepository.findOne({
    //   where: {name: token},
    //   relations: ['profile']
    // });

    return await User.findOne({
      where: { name: token },
      relations: ['profile'],
    });
  }
}
