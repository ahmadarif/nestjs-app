import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../../entities/user';
import { Profile } from '../../entities/profile';

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
    //   .leftJoinAndMapOne('user.profile', Profile, 'profile', 'user.profile_id = profile.id')
    //   .where({ name: token })
    //   .getOne();

    return await User.findOne({
      where: { name: token },
      // relations: ['profile_id'],
    });
  }
}
