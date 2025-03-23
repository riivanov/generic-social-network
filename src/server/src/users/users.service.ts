import { User } from '@lib/entity/User';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return AppDataSource.manager.findOne(User, {
      where: {
        username,
      },
    });
  }

  async findOneByID(id: string): Promise<User | null> {
    return AppDataSource.manager.findOne(User, {
      where: {
        id,
      },
    });
  }

  async createUser(user: Partial<User>) {
    const newUser = AppDataSource.manager.create(User, user);
    return AppDataSource.manager.save(newUser);
  }

  async updateUser(user) {
    return await AppDataSource.manager.save(User, user);
  }

  async deleteUser(id: number) {

    return await AppDataSource.manager.delete(User, id);
  }

  async getRandomUser() {
    const user = await AppDataSource.createQueryBuilder(User, 'user')
      .select()
      .orderBy('RANDOM()')
      .getOne();
    if (!user) return null;
    return user;
  }

  async isUsernameTaken(username: string) {
    if (!username) return false;

    const [users, num] = await AppDataSource.manager.findAndCount(User, {
      where: {
        username,
      },
    });

    if (num === 0) return false;
    return true;
  }

  async isEmailTaken(email: string) {
    if (!email) return false;

    const [users, num] = await AppDataSource.manager.findAndCountBy(User, {
      email,
    });

    if (num === 0) return false;
    return true;
  }
}
