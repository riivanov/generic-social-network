import { User } from '@lib/entity/User';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'test',
//   password: 'test',
//   database: 'gsn',
//   synchronize: true,
//   logging: true,
//   entities: [User],
//   subscribers: [],
//   migrations: [],
// });

@Injectable()
export class AppDataSource extends DataSource {
  constructor() {
    super({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'gsn',
      synchronize: true,
      logging: true,
      entities: [User],
      subscribers: [],
      migrations: [],
    });
  }
}
