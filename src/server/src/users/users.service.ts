import { User } from '@lib/entity/User';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';

@Injectable()
export class UsersService {
  async findOne(
    username: string,
  ): Promise<User | undefined> {
    return AppDataSource.manager.findOne(User, {
      where: {
        username,
      },
    });
  }

  async createUser(user: Partial<User>) {
    const newUser = AppDataSource.manager.create(
      User,
      user,
    );
    return AppDataSource.manager.save(newUser);
  }

  async isUsernameTaken(username: string) {
    if (!username) return false;

    const [users, num] =
      await AppDataSource.manager.findAndCount(User, {
        where: {
          username,
        },
      });

    if (num === 0) return false;
    return true;
  }
}
