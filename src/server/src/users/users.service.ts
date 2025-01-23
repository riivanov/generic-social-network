import { User } from '@lib/entity/User';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';

@Injectable()
export class UsersService {
  constructor(private db: AppDataSource) {}

  async findOne(
    username: string,
  ): Promise<User | undefined> {
    return this.db.manager.findOne(User, {
      where: {
        username: 'Joe',
      },
    });
  }
}
