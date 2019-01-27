import { Controller, Get, Param } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';

@Controller()
export class AppController {
  constructor(private readonly conn: Connection) {}

  @Get()
  async test1() {
    const profile = new Profile();
    profile.gender = 'M';
    profile.photo = 'my-own-photo.jpeg';
    await profile.save();

    const user = new User();
    user.name = 'Tyring to use emoji = ❤️️';
    user.profile_id = profile.id;
    await user.save();

    return await User.findOne({
      where: { id: user.id },
      relations: ['profile_id'],
    });
  }

  @Get(':id')
  async test2(@Param('id') id: number) {
    return await this.conn.createQueryBuilder('users', 'user')
      .leftJoinAndMapOne('user.profile', 'profiles', 'profile', 'user.profile_id = profile.id')
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
