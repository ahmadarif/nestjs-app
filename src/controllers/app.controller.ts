import { Controller, Get, Param, Query } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';

@Controller()
export class AppController {
  constructor(private conn: Connection) {}

  @Get()
  async test1(@Query() query) {
    const trx = this.conn.createQueryRunner();
    await trx.startTransaction();

    try {
      const profile = new Profile();
      profile.gender = 'M';
      profile.photo = 'my-own-photo.jpeg';
      await trx.manager.save(profile);

      const user = new User();
      user.name = query.name;
      user.profile_id = profile.id;
      await trx.manager.save(user);

      await trx.commitTransaction();

      return await User.findOne({
        where: { id: user.id },
        relations: ['profile_id'],
      });
    } catch (e) {
      await trx.rollbackTransaction();
      return { message: 'Error' };
    } finally {
      await trx.release();
    }
  }

  @Get(':id')
  async test2(@Param('id') id: number) {
    return await this.conn.createQueryBuilder('users', 'user')
      .leftJoinAndMapOne('user.profile', 'profiles', 'profile', 'user.profile_id = profile.id')
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
